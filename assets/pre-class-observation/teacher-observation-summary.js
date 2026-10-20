// Each row corresponds to one question; keys identify its selected option, not a child type.
(() => {
  const responses = [
    {observer:'先介紹環境與流程，允許旁觀，再邀請一個小步驟。',explorer:'先說明工具界線，再提供一個可立即探索的小任務。',sensitive:'先建立熟悉感、說明接下來的安排，確認孩子願意開始的方式。',sharer:'先用簡短對話建立連結，再介紹活動與同伴。'},
    {observer:'留時間讓孩子整理問題；詢問要自己試、看示範或一起做。',explorer:'先聽替代方案，再選一種方法試做，保留原作品供比較。',sensitive:'先回應失望或挫折，等孩子準備好再提供一個小選擇。',sharer:'先請孩子說原本想做到什麼，確認理解後再討論調整。'},
    {observer:'一次給一個建議，留回應時間，不把沉默視為拒絕。',explorer:'把建議說成可試做的選項，再確認孩子是否理解。',sensitive:'用描述代替好壞評價，私下溫和提醒並觀察反應。',sharer:'先聽孩子的想法、回應具體努力，再提出一項建議。'},
    {observer:'允許用指認、動作或慢慢說表達，不急著代答。',explorer:'先記下想法，再請孩子選一個當下要做的步驟。',sensitive:'先描述看到的表情並詢問感受，不直接猜定原因。',sharer:'安排短對話接住想法，再邀請把其中一點做出來。'},
    {observer:'從作品的一個細節提問，每次只問一件事。',explorer:'記下延伸點子，請孩子挑一個最想保留的方向。',sensitive:'先採一對一、可選擇不公開的分享，不突然要求展示。',sharer:'用具體問題回應作品故事，約定分享與動手的轉換。'},
    {observer:'提供流程或小範例，確認理解後讓孩子自行決定起點。',explorer:'先提供可試作的材料區，再一起選一個小完成目標。',sensitive:'先說明可以修改、沒有唯一答案，從試作而非成品開始。',sharer:'先聊主題或角色，再把故事的一個部分轉成創作步驟。'},
    {observer:'允許先觀察團體，再用明確邀請加入，不突然點名。',explorer:'以新材料或主題帶入，同時清楚說明活動順序。',sensitive:'避免公開比較，拆小步驟並留意跟不上時的反應。',sharer:'安排具體回饋或作品交流，讓被看見的機會有明確順序。'},
    {observer:'讓孩子選擇靠近或先看，提供低壓力的雙人活動。',explorer:'先聽玩法，再約定輪流提出想法與使用材料。',sensitive:'先核對孩子如何理解同伴反應，不直接判定被排斥。',sharer:'可安排簡短合作與輪流分享，觀察彼此接話的情況。'},
    {observer:'主動走近確認是否需要協助，提供不必公開開口的求助方式。',explorer:'先問已試過什麼，再決定提示程度，不直接接手。',sensitive:'先安定當下情緒，再把困難拆成一個可求助的小問題。',sharer:'明確回應已注意到需求，說清楚何時會來協助。'},
    {observer:'先示範安全使用方式，再讓孩子試一小塊。',explorer:'先交代安全界線，再給短時間探索與比較效果。',sensitive:'提供練習材料與可清理的環境，讓試錯不影響正式作品。',sharer:'先共同試一小步，給具體回饋後逐步放手。'},
    {observer:'保留分段完成時間，確認目前進度，不用速度比較。',explorer:'共同選定本次要完成的部分，其他點子另行記下。',sensitive:'先問不滿意哪裡，約定一次小調整或暫停，不要求立刻滿意。',sharer:'預留完成後介紹作品的時間，先說明收尾順序。'}
  ];
  const labels=['新環境','成果不如預期','接受提醒','表達想法','說明作品','開始創作','團體參與','同儕互動','求助','新材料／任務','完成節奏'];
  function build({formData,questionSet,age,recordId,saved,full=false,date=new Date()}) {
    const field=(name,limit=120)=>{
      const raw=String(formData.get(name)||'').trim();
      if(!raw)return '未提供';
      return !full&&raw.length>limit?raw.slice(0,limit)+'…（原文見完整紀錄）':raw;
    };
    const items=questionSet.questions.map((q,i)=>{
      const selected=q.choices.find(([key])=>key===formData.get('q'+(i+1)));
      return {number:i+1,area:q.area,label:labels[i]||'家長期待',answer:selected?.[1]||'未提供有效回答',action:selected&&responses[i]?.[selected[0]]};
    });
    const evidence=items.slice(0,11).map(i=>`Q${i.number} ${i.label}：${i.answer}`).join('\n');
    const act=indices=>indices.map(n=>{const i=items[n-1];return `・依 Q${n} ${i.label}：${i.action||'資訊不足，課前先向家長確認，不推測。'}`;}).join('\n');
    const review=[
      `Q1：實際如何進入活動？哪個邀請有效？`,
      `Q2／Q3／Q9：遇到困難或提醒時如何反應？提供哪種協助後能繼續？`,
      `Q7／Q8／Q11：團體互動及完成節奏如何？與家長描述有何差異？`
    ].join('\n');
    return [
      '【老師課前準備摘要｜依逐題填答】',
      `① 基本資料\n孩子：${field('childName',40)}｜約 ${age??'未提供'} 歲｜${questionSet.label}\n${field('campus',30)}｜${field('status',30)}\n填寫日期：${date.toLocaleDateString('zh-TW',{timeZone:'Asia/Taipei'})}\n紀錄編號：${recordId}`+(saved===true?'\n完整資料已保存':saved===false?'\n尚未確認存檔，請協助確認':''),
      `② 家長描述的狀態（原選項，不是課堂已證實的表現）\n${evidence}`,
      '③ 第一堂課帶入（建議先試，再看反應）\n'+act([1,6,10]),
      '④ 困難、提醒與求助時的準備\n'+act([2,3,9]),
      '⑤ 表達、互動與節奏的提醒\n'+act([4,5,7,8,11]),
      `⑥ 家長優先期待與補充\nQ12 希望老師留意：${items[11].answer}（這是家長期待，不當成孩子的行為證據）\n最近喜歡：${field('interest')}\n容易卡住：${field('stuckPoint')}\n特別留意：${field('teacherNote')}\n補充原文優先與家長核對；若與選項不同，先詢問情境差異，不自行合併成定論。`,
      '⑦ 課後核對\n'+review,
      '依家長此次回報整理，不是診斷或能力評分；未取得頻率、持續時間與跨情境資料，不能推論固定特質。請記錄實際情境、使用的協助及孩子的反應，再更新準備方式。'
    ].join('\n\n');
  }
  window.BGT_TEACHER_OBSERVATION={build};
})();
