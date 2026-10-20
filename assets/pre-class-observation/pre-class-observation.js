const engine=window.BGT_OBSERVATION_V2;
const appConfig=window.BGT_PRECLASS_CONFIG||{};
const submissionEndpoint=appConfig.submissionEndpoint||'';
const $=id=>document.getElementById(id);
const form=$('assessmentForm'),submitButton=$('submitButton'),resultPanel=$('resultPanel');
let parentSummary='',busy=false;
function getAge(value){
  if(!value)return null;
  const birth=new Date(value+'T00:00:00+08:00');
  if(Number.isNaN(birth.getTime()))return null;
  const now=new Date();let age=now.getFullYear()-birth.getFullYear();
  if(now.getMonth()<birth.getMonth()||(now.getMonth()===birth.getMonth()&&now.getDate()<birth.getDate()))age--;
  return age;
}
const versionLabel=age=>`${engine.data.version}｜${age<=6?'幼兒生活／遊戲情境（3–6歲）':'兒童生活／創作情境（7–15歲）'}`;
function labeledControl(parent,labelText,tag,name,placeholder=''){
  const label=document.createElement('label');label.textContent=labelText;
  const input=document.createElement(tag);input.name=name;
  if(tag==='textarea'){input.rows=2;input.maxLength=600;input.placeholder=placeholder;}
  label.append(input);parent.append(label);return input;
}
function renderQuestions(){
  const list=$('questionList');list.replaceChildren();
  for(const q of engine.data.questions){
    const card=document.createElement('article');card.className='question-card';
    const area=document.createElement('p');area.className='question-area';area.textContent=q.domain;
    const title=document.createElement('h3');title.id=q.id+'-title';title.textContent=`${q.number}. ${q.text}`;
    const grid=document.createElement('div');grid.className='choice-grid';grid.setAttribute('role','radiogroup');grid.setAttribute('aria-labelledby',title.id);
    for(const option of q.options){
      const label=document.createElement('label');label.className='choice';
      const input=document.createElement('input');input.type='radio';input.name=q.id;input.value=option.id;input.required=true;
      const text=document.createElement('span');text.textContent=option.label;label.append(input,text);grid.append(label);
    }
    const box=document.createElement('div');box.className='observation-followup';box.hidden=true;
    const caption=document.createElement('p');caption.textContent='再補充一點情境，讓老師更好準備。沒觀察過的地方可以留白或填「不確定」。';box.append(caption);
    const frequency=labeledControl(box,'最近一個月，這種情況大約發生幾次？','select',q.id+'_frequency');
    for(const [v,t] of [['','請選擇（可不填）'],...engine.frequencies.map(v=>[v,v])]){const o=document.createElement('option');o.value=v;o.textContent=t;frequency.append(o);}
    labeledControl(box,'通常在什麼情境？若依情境不同，可以說說差異。','textarea',q.id+'_context','例如：在家能開始，在陌生教室需要先看一看。');
    const help=labeledControl(box,'曾試過什麼協助？哪個比較有效？','textarea',q.id+'_help','可填「還沒找到方法」或「不確定」，不用猜測。');
    const update=()=>{
      const value=form.querySelector(`input[name="${q.id}"]:checked`)?.value;
      const kind=engine.followupKind(q.id,value);box.hidden=!kind;
      for(const el of box.querySelectorAll('select,textarea'))el.disabled=!kind;
      for(const el of [frequency,help]){el.closest('label').hidden=kind!=='support';el.disabled=kind!=='support';}
    };
    grid.addEventListener('change',update);
    card.append(area,title,grid,box);list.append(card);update();
  }
}
function updateAge(){
  const age=getAge($('birthdateInput').value);const valid=age!==null&&age>=3&&age<=15;
  $('birthdateInput').setCustomValidity(age===null?'':valid?'':'這份問卷適用約 3–15 歲，其他年齡請先透過官方 LINE 與我們確認。');
  $('versionNotice').textContent=valid?`孩子約 ${age} 歲。${age<=6?'可參考最近一個月的生活與遊戲經驗。':'可參考最近一個月的生活、創作或團體活動經驗。'} 請依實際觀察回答，不必選看起來較好的選項。`:'請選擇出生年月日。這份觀察目前適用約 3–15 歲。';
  $('questionSetLabel').textContent=valid?versionLabel(age):'五個面向，不做人格分類';
}
function setSubmissionState(state,message){
  $('submissionStatus').textContent=message;$('resultSubmissionStatus').textContent=message;
  submitButton.disabled=state==='submitting';submitButton.textContent=state==='submitting'?'正在保存…':'送出並看孩子的整體觀察';
}
function buildPayload(formData,age,analysis,recordId){
  const text=name=>String(formData.get(name)||'').trim();
  const summary=engine.teacher({formData,analysis,age,versionLabel:versionLabel(age),recordId,full:true});
  const answers=analysis.answers.map(q=>({number:q.number,area:q.domain,question:q.text,selectedId:q.value,answer:q.answer,followup:q.followup}));
  answers.push({number:11,area:'具體經驗',question:'最近一次具體例子',answer:text('recentExample')||'未提供'},
    {number:12,area:'家長期待',question:'第一堂課最希望老師留意的事',answer:text('teacherNote')||'未提供'},
    {kind:'analysis',schemaVersion:analysis.schemaVersion,ruleVersion:analysis.ruleVersion,ruleIds:analysis.ruleIds,observationWindow:'最近一個月',parentReport:analysis.parent});
  return {submissionId:recordId,submittedAt:new Date().toISOString(),source:'bgtkidart.com.tw/pre-class-observation.html',
    childName:text('childName'),birthdate:text('birthdate'),age,version:versionLabel(age),campus:text('campus'),status:text('status'),
    parentName:text('parentName'),phone:text('phone')?"'"+text('phone').replace(/^'/,''):'',lineName:text('lineName'),
    interest:text('interest'),stuckPoint:text('stuckPoint'),teacherNote:text('teacherNote'),
    primaryType:'情境觀察（不分型）',secondaryType:'',scores:{},scoreLine:'不採分型計分',
    supportTip:analysis.parent.support,teacherTip:analysis.parent.classPlan,firstClassTip:analysis.parent.classPlan,
    avoidTip:'不把情境差異合併為固定特質；未觀察的內容先保留判斷。',teacherSummary:summary,answers};
}
async function submitObservation(payload) {
  if (!submissionEndpoint) {
    return { ok: false, skipped: true };
  }

  const response = await fetch(submissionEndpoint, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(30000)
  });
  if (!response.ok) throw new Error("Observation submission failed");
  const receipt = await response.json();
  if (receipt.ok !== true) throw new Error("Observation was not saved");
  return { ok: true };
}

async function showResult(formData,age,analysis,recordId,saved){
  const p=analysis.parent;
  $('resultTitle').textContent=p.title;$('resultText').textContent=p.summary;
  $('teacherTip').textContent=p.classPlan;
  $('firstClassTip').textContent=p.home;$('avoidTip').textContent=p.verify;
  $('uncertaintyNote').textContent=p.unknownNote;
  const domains=$('domainOverview');domains.replaceChildren();
  for(const d of analysis.domainViews){const card=document.createElement('article'),h=document.createElement('h3'),t=document.createElement('p');h.textContent=d.name;t.textContent=d.text;card.append(h,t);domains.append(card);}
  parentSummary=['大綠地藝術｜孩子的整體觀察','孩子：'+formData.get('childName'),'紀錄編號：'+recordId,p.title,p.summary,p.unknownNote,
    '在家可以試試\n'+p.home,'老師會先準備\n'+p.classPlan,'第一堂課再確認\n'+p.verify,
    '這是依最近一個月家長回報整理的課前參考，不是能力評分或診斷。'].filter(Boolean).join('\n\n');
  $('recordId').textContent='紀錄編號：'+recordId;$('copySummaryButton').textContent='複製陪伴建議';
  const message=engine.teacher({formData,analysis,age,versionLabel:versionLabel(age),recordId,saved});
  $('sendToLine').href='https://line.me/R/oaMessage/%40wjy4797e/?'+encodeURIComponent(message);
  form.hidden=true;resultPanel.hidden=false;resultPanel.scrollIntoView({behavior:'smooth'});
  $('restartButton').disabled=true;$('lineManualFallback').hidden=false;
  $('lineDeliveryStatus').textContent=saved?'正在回傳摘要到開啟表單的 LINE 對話…':'尚未確認存檔，未自動傳送 LINE 摘要。';
  const delivery=await window.BGT_OBSERVATION_LINE.send(recordId,message,saved);
  if(delivery.status==='sent'){$('lineDeliveryStatus').textContent='摘要已傳回 LINE 對話，謝謝您完成課前小觀察。';$('lineManualFallback').hidden=true;}
  else if(delivery.status==='unconfirmed')$('lineDeliveryStatus').textContent='資料已保存，但尚未確認 LINE 是否收到；請先查看官方 LINE 對話，避免重複傳送。';
  else if(delivery.status==='unavailable')$('lineDeliveryStatus').textContent='資料已保存。這次開啟方式無法自動回傳，請使用下方按鈕傳到官方 LINE。下次請從大綠地官方 LINE 選單進入。';
  $('restartButton').disabled=false;
}
$('birthdateInput').addEventListener('change',updateAge);
form.addEventListener('submit',async event=>{
  event.preventDefault();if(busy)return;updateAge();if(!form.reportValidity())return;
  busy=true;const formData=new FormData(form),age=getAge(formData.get('birthdate'));
  const analysis=engine.analyze(formData),recordId='BGT-'+crypto.randomUUID(),payload=buildPayload(formData,age,analysis,recordId);
  let saved=false;setSubmissionState('submitting','正在保存課前資料，請稍候…');
  try{const receipt=await submitObservation(payload);saved=receipt.ok===true;
    setSubmissionState('idle',saved?'課前資料已保存，老師會依這份資訊準備第一堂課。':'整體觀察已產生，但資料尚未送出，請透過官方 LINE 聯絡我們。');
  }catch{setSubmissionState('idle','整體觀察已產生，但尚未確認資料是否保存。請用下方按鈕傳到官方 LINE，先不用重複填寫。');}
  try{await showResult(formData,age,analysis,recordId,saved);}finally{busy=false;$('restartButton').disabled=false;}
});
$('restartButton').addEventListener('click',()=>{
  if(busy)return;parentSummary='';form.reset();renderQuestions();updateAge();form.hidden=false;resultPanel.hidden=true;
  setSubmissionState('idle','送出後會產生家長版整體觀察，並保存老師課前準備資料。');window.scrollTo({top:0,behavior:'smooth'});
});
$('copySummaryButton').addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText(parentSummary);$('copySummaryButton').textContent='已複製陪伴建議';}
  catch{$('copySummaryButton').textContent='無法複製，請截圖保存建議';}
  setTimeout(()=>{$('copySummaryButton').textContent='複製陪伴建議';},2500);
});
renderQuestions();updateAge();window.BGT_OBSERVATION_LINE.init();
