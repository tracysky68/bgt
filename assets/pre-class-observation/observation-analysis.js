(() => {
  const data=window.BGT_OBSERVATION_DATA;
  const known = id => !['unknown','varies',null,undefined,''].includes(id);
  const frequencies=['1 次','2～3 次','4 次以上','不確定'];
  function followupKind(qid,value){
    if(value==='varies')return 'context';
    return ({q1:['adult'],q5:['pause','upset'],q6:['withdraw'],q8:['wait','emotion']}[qid]||[]).includes(value)?'support':null;
  }
  function read(form){
    return data.questions.map(q=>{
      const option=q.options.find(o=>o.id===form.get(q.id))||q.options.find(o=>o.id==='unknown');
      const kind=followupKind(q.id,option.id);
      const clean=name=>String(form.get(name)||'').trim();
      return {...q,value:option.id,answer:option.label,tip:option.tip,followup:kind?{
        kind,frequency:kind==='support'&&frequencies.includes(form.get(q.id+'_frequency'))?form.get(q.id+'_frequency'):'未提供',
        context:clean(q.id+'_context')||'未提供',help:kind==='support'?(clean(q.id+'_help')||'未提供'):null
      }:null};
    });
  }
  // Rules combine observable situations only. Q2 is reported effective support, not a trait.
  const rules=[
    {id:'explore-frustration-help',sources:['q3','q5','q8'],match:a=>a.q3==='explore'&&a.q5==='upset'&&a.q8==='wait',
      summary:'孩子面對新材料時願意嘗試，但結果不如預期時可能較難繼續，也不一定主動求助。探索的動力和遇到困難時需要的支持，可以同時存在。',
      home:'保留孩子自己試的空間；停下來時問：「你想再想一下，還是要我陪你試一小步？」',
      teacher:'先提供可探索的材料，再主動巡看停頓時刻，約定求助方式；卡住時先回應感受，再給一個小選擇。',check:'主動探索後在哪一刻停下？是在思考、需要幫忙，還是想休息？'},
    {id:'explore-frustration',sources:['q3','q5'],match:a=>a.q3==='explore'&&a.q5==='upset',
      summary:'孩子可能願意探索新材料，但當成果不如預期時，會需要更多時間或陪伴才能繼續。開始投入與跨過挫折，是兩個不同的時刻。',
      home:'開始前讓孩子選材料；遇到不如預期的結果，先聽他的感受，再一起選下一小步。',teacher:'保留材料選擇權，預備一個可降低難度的步驟，不在情緒明顯時連續要求修改。',check:'哪種回應能讓孩子願意繼續？'},
    {id:'help-hidden',sources:['q5','q8'],match:a=>['pause','upset'].includes(a.q5)&&a.q8==='wait',
      summary:'孩子遇到不如預期的結果時可能停下，而需要協助時又不一定主動說。大人可以主動確認，避免只靠孩子開口才知道他需要什麼。',
      home:'一起約定簡單的求助動作；看到孩子停下時，先問是否需要幫忙，不急著接手。',teacher:'事先約定求助方式，活動中主動確認停頓原因，再依需求提供提示。',check:'約定求助方式後，孩子是否較容易表達需求？'},
    {id:'warmup-supported',sources:['q1','q2'],match:a=>a.q1==='watch'&&['time','preview','adult'].includes(a.q2),
      summary:'孩子在陌生環境中傾向先觀察，家長也提供了曾幫助他加入的方法。進入活動可能需要一段準備過程，可以先沿用已有效的協助，再觀察當天反應。',
      home:'出發前簡單聊聊會做什麼，讓孩子知道可以先看看，不必立即表現。',teacher:'先向家長核對 Q2 的有效方法，安排暖身與低壓力邀請，不催促立即參與。',check:'沿用家長的方法後，孩子如何開始靠近或加入？'},
    {id:'context-difference',sources:['q3','q9'],match:a=>a.q3==='explore'&&a.q9==='watch',
      summary:'孩子在材料探索時較主動，但加入同伴活動時可能先保持距離觀察。這是不同情境的表現，不需要把孩子固定說成主動或慢熟。',
      home:'可以先一起玩熟悉的材料，再逐步加入和別人輪流的小活動。',teacher:'以材料引起興趣，同時保留同儕互動的暖身時間，不把動手快等同於已適應團體。',check:'材料投入與同伴互動的節奏是否不同？'},
    {id:'ideas-finishing',sources:['q4','q10'],match:a=>a.q4==='own'&&a.q10==='change',
      summary:'孩子能從自己的想法開始，也可能在過程中不斷冒出新方向。支持的重點可以放在共同選擇這次要完成的部分，讓新點子仍有被保留的空間。',
      home:'開始時選一個小目標，把中途想到的新點子記下，留待下一次再試。',teacher:'約定本次小目標及收尾時間，另外保留點子區，不直接否定改變中的想法。',check:'小目標與預告時間能否協助收尾？'},
    {id:'dialogue-start',sources:['q4','q7'],match:a=>a.q4==='talk'&&a.q7==='talk',
      summary:'孩子常透過說明、展示或討論表達，開始創作時也受益於對話。被聽見可能是進入動手活動的一個起點。',
      home:'先聽孩子說一個角色或想法，再問：「我們先把哪一小部分做出來？」',teacher:'先安排短對話，回應一個具體想法，再接到明確動手步驟。',check:'哪種提問能讓討論自然接到創作？'},
    {id:'talk-not-help',sources:['q7','q8'],match:a=>a.q7==='talk'&&a.q8==='wait',
      summary:'孩子願意分享想法，但需要幫忙時未必同樣主動。分享和求助是不同的情境，仍可以另外建立容易使用的求助方式。',
      home:'平常分享時，也練習一句「我想請你幫忙看這裡」，不把求助當成做不好。',teacher:'不要以願意說話推定會主動求助，停頓時主動確認需要。',check:'孩子能否區分分享想法與提出協助需求？'},
    {id:'feedback-frustration',sources:['q5','q6'],match:a=>a.q5==='upset'&&a.q6==='withdraw',
      summary:'家長描述孩子在結果不如預期、接受修正這兩種情境下都可能較難繼續。老師可以先了解孩子的期待，再嘗試調整回應方式。',
      home:'先問「你原本想做成什麼樣子？」再一起選一個可以改的小地方。',teacher:'先理解期待，用描述代替好壞評價，一次提供一項可選擇的調整。',check:'在不同語氣和提示方式下，孩子反應是否有差異？'},
    {id:'try-alternatives',sources:['q5','q6'],match:a=>a.q5==='change'&&a.q6==='try',
      summary:'孩子在成果不如預期時會嘗試替代做法，也願意試試大人的建議。可以保留他自己選擇方法的空間，再一起看看效果。',
      home:'一起試兩種做法，請孩子說說哪一種比較接近自己的想法。',teacher:'提供可比較的小嘗試，不直接給唯一答案，觀察孩子如何使用建議。',check:'孩子會如何比較並選擇不同做法？'}
  ];
  function analyze(form){
    const answers=read(form),a=Object.fromEntries(answers.map(x=>[x.id,x.value]));
    const selected=[];
    for(const rule of rules){if(rule.match(a)&&!selected.some(r=>rule.sources.every(s=>r.sources.includes(s))))selected.push(rule);if(selected.length===3)break;}
    const domainViews=data.domains.map(name=>{
      const items=answers.filter(x=>x.domain===name);
      const observed=items.filter(x=>known(x.value));
      return {name,items,observed,text:observed.length?observed.map(x=>`Q${x.number}：${x.answer}`).join('；'):'目前沒有足夠的明確觀察，先保留判斷。'};
    });
    const uncertain=answers.filter(x=>!known(x.value));
    const activeRules=selected.map(r=>({...r,evidence:r.sources.map(id=>answers.find(x=>x.id===id))}));
    // Without a supported combination, report the observation instead of inventing a relationship.
    const fallback=domainViews.filter(d=>d.observed.length).slice(0,3).map(d=>({id:'observation-'+d.name,sources:d.observed.map(x=>x.id),evidence:d.observed,
      summary:`在「${d.name}」方面，家長描述：${d.observed.map(x=>x.answer).join('；')}。這部分先保留為情境描述，還不能推論其他場合也會如此。`,
      teacher:d.observed.map(x=>x.tip).join(' '),home:'選一個最近遇到的情境，先聽孩子怎麼想，再一起試一個小步驟。',check:`課堂中的「${d.name}」與家長描述有哪些相同或不同？`}));
    const patterns=activeRules.length?activeRules:fallback;
    const knownCount=answers.filter(x=>known(x.value)).length;
    const unknownNote=uncertain.length?`有 ${uncertain.length} 題選擇依情境不同或尚未觀察，相關情境仍需確認；不代表孩子有困難。`:'';
    const parent={title:knownCount?'理解孩子怎麼開始，以及什麼時候需要支持':'先保留判斷，一起觀察孩子的起點',
      summary:knownCount?patterns.map(x=>x.summary).join('\n\n'):'目前提供的明確行為資訊不足，還不能整理孩子的學習狀態。可以先記下一次具體經驗，或由老師在第一堂課觀察。',
      support:patterns.length?patterns.map(x=>x.teacher).join('\n\n'):'先觀察孩子如何開始、何時停下、如何表達需求，再討論支持方式。',
      home:patterns.length?[...new Set(patterns.map(x=>x.home))].slice(0,2).join('\n\n'):'選一次日常遊戲，記下發生什麼、您如何回應，以及孩子接著怎麼做。',
      classPlan:patterns.length?patterns.map(x=>x.teacher).join('\n\n'):'先介紹環境與簡單活動，留意孩子自然參與的方式，不預先分類。',
      verify:patterns.length?patterns.map(x=>x.check).join('\n'):'哪些情境容易投入？哪種邀請能幫助開始？',unknownNote};
    return {answers,domainViews,patterns,parent,knownCount,uncertain,ruleIds:activeRules.map(x=>x.id),ruleVersion:data.ruleVersion,schemaVersion:data.version};
  }
  function teacher({formData,analysis,age,versionLabel,recordId,saved,full=false,date=new Date()}){
    const clip=(v,n=120)=>{v=String(v||'').trim()||'未提供';return !full&&v.length>n?v.slice(0,n)+'…（原文見完整紀錄）':v;};
    const proof=p=>p.evidence.map(x=>`Q${x.number} ${x.answer}`).join('；');
    const details=analysis.answers.filter(x=>x.followup).map(x=>{
      const f=x.followup;return `Q${x.number} ${f.kind==='support'?'近一月次數：'+f.frequency+'；':''}情境：${clip(f.context,70)}${f.kind==='support'?'；曾試過／有效協助：'+clip(f.help,70):''}`;
    });
    const sections=[
      '【老師課前準備｜情境綜合觀察】',
      `孩子：${clip(formData.get('childName'),40)}｜${age??'未提供'} 歲｜${versionLabel}\n${clip(formData.get('campus'),30)}｜${clip(formData.get('status'),30)}\n填寫：${date.toLocaleDateString('zh-TW',{timeZone:'Asia/Taipei'})}\n紀錄編號：${recordId}\n${data.version}／${data.ruleVersion}`+(saved===true?'\n資料已保存':saved===false?'\n尚未確認存檔':''),
      '① 綜合理解（家長回報，待課堂核對）\n'+(analysis.patterns.length?analysis.patterns.map((p,i)=>`${i+1}. ${p.summary}\n依據：${proof(p)}`).join('\n\n'):'明確資訊不足，不推論固定特質。'),
      '② 進班先準備\n'+analysis.parent.classPlan,
      '③ 家長期待與具體經驗（原文）\nQ11 最近一次經驗：'+clip(formData.get('recentExample'))+'\nQ12 最希望老師留意：'+clip(formData.get('teacherNote'))+'\n最近喜歡：'+clip(formData.get('interest'))+'\n容易卡住：'+clip(formData.get('stuckPoint')),
      '④ 追問補充（未提供不作推論）\n'+(details.join('\n')||'本次沒有需展開的追問；不代表各情境都已充分觀察。'),
      '⑤ 第一堂課核對\n'+analysis.parent.verify+'\n請記錄：符合的描述／不同的表現／使用的協助及孩子的反應。',
      '⑥ 資訊界線\n'+(analysis.parent.unknownNote||'本次描述仍需以課堂觀察核對。')+' 家長期待與自由文字不當成已證實的行為；若與選項不同，先詢問情境差異。這不是診斷或經信效度驗證的量表。'
    ];
    // Full record includes all domain evidence; compact LINE message cites the selected combinations.
    if(full)sections.push('五個面向的完整回答\n'+analysis.domainViews.map(d=>d.name+'\n'+d.items.map(x=>`Q${x.number} ${x.text}\n家長選擇：${x.answer}`).join('\n')).join('\n\n'));
    else sections.push('其他面向與原始答案請至老師查詢頁，以紀錄編號查閱。');
    return sections.join('\n\n');
  }
  window.BGT_OBSERVATION_V2={data,frequencies,followupKind,read,analyze,teacher};
})();
