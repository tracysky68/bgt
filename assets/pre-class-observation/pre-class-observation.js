const questionSets = {
  preschool: {
    label: "幼兒版｜3-6 歲",
    questions: [
      {
        area: "情緒狀態",
        text: "孩子第一次來到不熟悉的環境時，通常會：",
        choices: [
          ["observer", "先靠近大人或在旁邊看一看，熟悉後才慢慢加入"],
          ["explorer", "很快被新東西吸引，想立刻摸摸看或試試看"],
          ["sensitive", "容易緊張、哭泣，或需要大人陪在旁邊"],
          ["sharer", "會看老師或其他孩子的反應，再決定要不要加入"]
        ]
      },
      {
        area: "情緒狀態",
        text: "孩子遇到作品不如預期，例如畫錯、貼歪、材料弄壞時，通常會：",
        choices: [
          ["observer", "停下來看一看，等大人示範或陪伴後再繼續"],
          ["explorer", "想換方法、換材料，或直接做成別的樣子"],
          ["sensitive", "容易難過、生氣，或說自己不會"],
          ["sharer", "希望有人看見發生什麼事，並給他回應或鼓勵"]
        ]
      },
      {
        area: "情緒狀態",
        text: "孩子被提醒或修正時，通常會：",
        choices: [
          ["observer", "需要一點時間聽懂和消化"],
          ["explorer", "會想知道還可以怎麼做，接著再試一次"],
          ["sensitive", "對語氣很敏感，可能馬上失落或退縮"],
          ["sharer", "如果先被肯定，會比較願意聽老師說"]
        ]
      },
      {
        area: "表達方式",
        text: "孩子最常用什麼方式表達自己的想法？",
        choices: [
          ["observer", "先想一想，慢慢說或用動作表達"],
          ["explorer", "想到什麼就立刻說、立刻做"],
          ["sensitive", "情緒會比語言更快出現"],
          ["sharer", "喜歡拿給大人看，或邊做邊說給別人聽"]
        ]
      },
      {
        area: "表達方式",
        text: "孩子說明自己的作品或遊戲內容時，通常會：",
        choices: [
          ["observer", "需要大人慢慢問，才比較說得出來"],
          ["explorer", "有很多點子，常常越說越多"],
          ["sensitive", "擔心說錯或被笑，有時不太敢說"],
          ["sharer", "很喜歡被聽見，也喜歡別人問他問題"]
        ]
      },
      {
        area: "表達方式",
        text: "孩子開始創作時比較像：",
        choices: [
          ["observer", "先看老師或同學怎麼做，再開始"],
          ["explorer", "先做再說，邊做邊冒出新的想法"],
          ["sensitive", "會很在意好不好看、像不像"],
          ["sharer", "喜歡有人陪他討論作品裡的故事"]
        ]
      },
      {
        area: "互動習慣",
        text: "孩子在團體課中通常會：",
        choices: [
          ["observer", "先觀察老師和同學，熟了才互動"],
          ["explorer", "主動靠近材料或活動，容易被新鮮感帶動"],
          ["sensitive", "如果跟不上或被比較，情緒會受影響"],
          ["sharer", "喜歡老師或同學看見自己的作品"]
        ]
      },
      {
        area: "互動習慣",
        text: "孩子和其他孩子一起活動時，通常會：",
        choices: [
          ["observer", "慢慢靠近，先保持一點距離"],
          ["explorer", "很快加入，也可能想主導玩法"],
          ["sensitive", "容易在意別人的表情、語氣或反應"],
          ["sharer", "喜歡一起分享、聊天或合作完成"]
        ]
      },
      {
        area: "互動習慣",
        text: "孩子需要幫忙時，通常會：",
        choices: [
          ["observer", "先自己想一想，不一定馬上說"],
          ["explorer", "直接開口，或自己試別的方法"],
          ["sensitive", "卡住時可能先出現情緒"],
          ["sharer", "希望大人注意到他，並給具體回應"]
        ]
      },
      {
        area: "學習節奏",
        text: "孩子面對新的創作材料時，通常會：",
        choices: [
          ["observer", "先看怎麼用，再慢慢開始"],
          ["explorer", "很想立刻摸摸看、試試看"],
          ["sensitive", "擔心弄錯、弄髒，或做不好"],
          ["sharer", "喜歡有人一起探索，或邊做邊得到回饋"]
        ]
      },
      {
        area: "學習節奏",
        text: "孩子完成作品的方式比較像：",
        choices: [
          ["observer", "需要時間，一步一步慢慢完成"],
          ["explorer", "速度快，想法常常一直變"],
          ["sensitive", "容易卡在不滿意的地方"],
          ["sharer", "做完後很想分享作品故事"]
        ]
      },
      {
        area: "學習節奏",
        text: "第一堂課你最希望老師留意的是：",
        choices: [
          ["observer", "給孩子暖身時間，不要太快催促"],
          ["explorer", "保留創意空間，也幫孩子慢慢收斂"],
          ["sensitive", "多留意孩子的情緒與挫折反應"],
          ["sharer", "多給孩子被看見和分享的機會"]
        ]
      }
    ]
  },
  child: {
    label: "兒童版｜7-15 歲",
    questions: [
      {
        area: "情緒狀態",
        text: "孩子進入新的課程、社團或團體時，通常會：",
        choices: [
          ["observer", "先觀察規則和氣氛，確認安全後再參與"],
          ["explorer", "很快投入，對新內容或新工具有興趣"],
          ["sensitive", "容易緊張，會擔心自己表現不好"],
          ["sharer", "會透過和老師或同學互動來熟悉環境"]
        ]
      },
      {
        area: "情緒狀態",
        text: "孩子遇到作品不如預期，例如構圖失敗、被修正、成果和想像不同時，通常會：",
        choices: [
          ["observer", "先停下來分析問題，需要時間整理後再繼續"],
          ["explorer", "會想嘗試其他做法，對新的可能性有興趣"],
          ["sensitive", "很容易受挫，可能沉默、煩躁，或覺得自己做不好"],
          ["sharer", "會想說明自己的想法，也希望老師理解他原本想做什麼"]
        ]
      },
      {
        area: "情緒狀態",
        text: "孩子被提醒、修正或給建議時，通常會：",
        choices: [
          ["observer", "需要一點時間消化，不一定馬上回應"],
          ["explorer", "會把建議變成新的嘗試方向"],
          ["sensitive", "對語氣或用字很敏感，可能覺得被否定"],
          ["sharer", "如果先聽見他的想法，會更願意接受建議"]
        ]
      },
      {
        area: "表達方式",
        text: "孩子最常用什麼方式表達自己的想法？",
        choices: [
          ["observer", "先在心裡整理，再慢慢說出來"],
          ["explorer", "想到就說，也會邊做邊修正想法"],
          ["sensitive", "情緒和表情常比語言更快出現"],
          ["sharer", "喜歡透過分享、展示或討論來表達"]
        ]
      },
      {
        area: "表達方式",
        text: "孩子說明作品或創作想法時，通常會：",
        choices: [
          ["observer", "需要一點引導，才能把想法說完整"],
          ["explorer", "想法很多，常常延伸出新的方向"],
          ["sensitive", "擔心說錯、被評論，會比較保留"],
          ["sharer", "喜歡被聽見，也享受被提問和回應"]
        ]
      },
      {
        area: "表達方式",
        text: "孩子開始創作時比較像：",
        choices: [
          ["observer", "先看範例、流程或別人的做法，再開始"],
          ["explorer", "先做再說，邊做邊找出自己的方法"],
          ["sensitive", "容易先想到成果好不好、會不會被比較"],
          ["sharer", "喜歡有人一起討論作品主題和故事"]
        ]
      },
      {
        area: "互動習慣",
        text: "孩子在團體課中通常會：",
        choices: [
          ["observer", "先觀察老師和同學，熟悉後才比較放開"],
          ["explorer", "主動參與，也容易被新材料、新主題吸引"],
          ["sensitive", "如果跟不上、被比較或被點名，情緒會受影響"],
          ["sharer", "喜歡老師或同學看見他的想法和作品"]
        ]
      },
      {
        area: "互動習慣",
        text: "孩子和同儕一起活動時，通常會：",
        choices: [
          ["observer", "慢慢靠近，先確認自己適不適合加入"],
          ["explorer", "很快加入，也可能提出自己的玩法或規則"],
          ["sensitive", "容易在意別人的反應，或擔心被排除"],
          ["sharer", "喜歡聊天、合作、互相看作品"]
        ]
      },
      {
        area: "互動習慣",
        text: "孩子需要幫忙時，通常會：",
        choices: [
          ["observer", "先自己想，不一定馬上求助"],
          ["explorer", "直接問，或先嘗試其他解法"],
          ["sensitive", "卡住時情緒會先出來，可能說自己不會"],
          ["sharer", "希望老師注意到他，並給明確回應"]
        ]
      },
      {
        area: "學習節奏",
        text: "孩子面對新的創作材料、工具或任務時，通常會：",
        choices: [
          ["observer", "先理解規則和使用方式，再開始"],
          ["explorer", "很想立刻嘗試，看看會產生什麼效果"],
          ["sensitive", "擔心用錯、失敗，或作品不好看"],
          ["sharer", "喜歡有人一起討論、示範或給回饋"]
        ]
      },
      {
        area: "學習節奏",
        text: "孩子完成作品的方式比較像：",
        choices: [
          ["observer", "需要時間，一步一步穩定完成"],
          ["explorer", "想法變化快，常常邊做邊改"],
          ["sensitive", "容易卡在不滿意或覺得不夠好的地方"],
          ["sharer", "完成後很想說明作品故事或創作想法"]
        ]
      },
      {
        area: "學習節奏",
        text: "第一堂課你最希望老師留意的是：",
        choices: [
          ["observer", "給孩子觀察與暖身時間，不要太快催促"],
          ["explorer", "保留創意空間，也協助孩子收斂完成"],
          ["sensitive", "留意孩子被修正、比較或卡住時的情緒"],
          ["sharer", "多給孩子被看見、被提問和分享的機會"]
        ]
      }
    ]
  }
};

const appConfig = window.BGT_PRECLASS_CONFIG || {};
const submissionEndpoint = appConfig.submissionEndpoint || "";

const profiles = {
  observer: {
    name: "觀察暖身型",
    short: "慢熟、需要安全感，先觀察再投入。",
    text:
      "孩子進入新環境或新任務時，通常需要先觀察、確認節奏，再慢慢投入。這不是不願意學，而是他正在用自己的方式建立安全感。當大人給他一點時間，他會更穩定地展開自己的想法。",
    supportTip: "需要暖身時間、清楚流程，以及不被催促的開始。",
    teacherTip: "先用材料示範、二選一提問和小步驟任務建立安全感。",
    firstClassTip: "第一堂課可先安排固定座位、簡單材料探索，再邀請孩子做小選擇。",
    avoidTip: "避免一開始就要求立刻表達、公開示範，或催促孩子快一點。"
  },
  explorer: {
    name: "創意探索型",
    short: "想法多、喜歡嘗試，需要空間也需要收斂。",
    text:
      "孩子對新鮮材料和新方法很有興趣，常常想立刻試試看，也容易冒出很多點子。這份探索力是很珍貴的創作能量，只要再加上一點階段任務，就能從發散慢慢走向完成。",
    supportTip: "需要保留創意空間，同時有人協助他整理下一步。",
    teacherTip: "給孩子選擇權，再用短任務幫他把點子收斂成作品。",
    firstClassTip: "第一堂課可準備兩到三種材料選項，並設定一個小完成目標。",
    avoidTip: "避免完全放任到失焦，也避免太早否定或限制孩子的想法。"
  },
  sensitive: {
    name: "情緒敏感型",
    short: "感受細膩，容易受挫折、比較或語氣影響。",
    text:
      "孩子對挫折、語氣、比較或作品結果比較有感覺。這份敏感其實也是細膩的感受力，只是需要大人先接住情緒，再陪他找到可以繼續的方式。",
    supportTip: "需要被理解、被接住，並用小步驟重新建立信心。",
    teacherTip: "先肯定具體努力，再用溫和語氣給一個可做到的小修正。",
    firstClassTip: "第一堂課先安排容易成功的任務，觀察孩子卡住時的表情和身體反應。",
    avoidTip: "避免公開比較、直接評論好不好或像不像，也避免在情緒未穩時急著修正。"
  },
  sharer: {
    name: "互動分享型",
    short: "喜歡被看見，透過分享與互動建立學習動力。",
    text:
      "孩子很需要被聽見、被看見，也常透過分享和互動建立學習動力。當大人願意聽他說作品裡的故事，他會更有投入感，也更願意把想法轉成創作。",
    supportTip: "需要具體回應、被看見的機會，以及清楚的分享邊界。",
    teacherTip: "安排短分享，問作品故事、角色、心情與想法。",
    firstClassTip: "第一堂課可給孩子一個 30 秒作品分享機會，並搭配明確的完成順序。",
    avoidTip: "避免只給籠統稱讚，也避免讓分享時間完全沒有界線。"
  }
};

const typeOrder = ["observer", "explorer", "sensitive", "sharer"];
const typeLabels = {
  observer: "觀察暖身型",
  explorer: "創意探索型",
  sensitive: "情緒敏感型",
  sharer: "互動分享型"
};

const questionList = document.querySelector("#questionList");
const form = document.querySelector("#assessmentForm");
const resultPanel = document.querySelector("#resultPanel");
const resultTitle = document.querySelector("#resultTitle");
const resultText = document.querySelector("#resultText");
const supportTip = document.querySelector("#supportTip");
const teacherTip = document.querySelector("#teacherTip");
const firstClassTip = document.querySelector("#firstClassTip");
const avoidTip = document.querySelector("#avoidTip");
const teacherSummary = document.querySelector("#teacherSummary");
const restartButton = document.querySelector("#restartButton");
const copySummaryButton = document.querySelector("#copySummaryButton");
const birthdateInput = document.querySelector("#birthdateInput");
const versionNotice = document.querySelector("#versionNotice");
const questionSetLabel = document.querySelector("#questionSetLabel");
const typeChips = document.querySelector("#typeChips");
const submissionStatus = document.querySelector("#submissionStatus");
const submitButton = document.querySelector("#submitButton");

let currentVersion = "preschool";

function getAge(birthdate) {
  if (!birthdate) return null;
  const today = new Date();
  const birthday = new Date(`${birthdate}T00:00:00+08:00`);
  if (Number.isNaN(birthday.getTime())) return null;

  let age = today.getFullYear() - birthday.getFullYear();
  const hasHadBirthday =
    today.getMonth() > birthday.getMonth() ||
    (today.getMonth() === birthday.getMonth() && today.getDate() >= birthday.getDate());

  if (!hasHadBirthday) age -= 1;
  return age;
}

function getVersionByAge(age) {
  if (age !== null && age >= 7 && age <= 15) return "child";
  return "preschool";
}

function renderQuestions(versionKey = currentVersion) {
  currentVersion = versionKey;
  const questionSet = questionSets[currentVersion];

  questionSetLabel.textContent = questionSet.label;
  questionList.innerHTML = "";

  questionSet.questions.forEach((question, index) => {
    const card = document.createElement("article");
    card.className = "question-card";

    const area = document.createElement("p");
    area.className = "question-area";
    area.textContent = question.area;

    const title = document.createElement("h3");
    title.textContent = `${index + 1}. ${question.text}`;

    const grid = document.createElement("div");
    grid.className = "choice-grid";

    question.choices.forEach(([value, label], choiceIndex) => {
      const choice = document.createElement("label");
      choice.className = "choice";
      choice.innerHTML = `
        <input type="radio" name="q${index + 1}" value="${value}" required />
        <span>${String.fromCharCode(65 + choiceIndex)}. ${label}</span>
      `;
      grid.append(choice);
    });

    card.append(area, title, grid);
    questionList.append(card);
  });
}

function updateVersionNotice() {
  const age = getAge(birthdateInput.value);
  const version = getVersionByAge(age);
  renderQuestions(version);

  if (age === null) {
    versionNotice.textContent = "請選擇孩子出生年月日，系統會自動帶入適合的觀察題目。";
    return;
  }

  if (age >= 3 && age <= 6) {
    versionNotice.textContent = `孩子目前約 ${age} 歲，已自動帶入幼兒版課前小觀察。`;
    return;
  }

  if (age >= 7 && age <= 15) {
    versionNotice.textContent = `孩子目前約 ${age} 歲，已自動帶入兒童版課前小觀察。`;
    return;
  }

  versionNotice.textContent = `孩子目前約 ${age} 歲。此測試頁先顯示幼兒版題目，正式上線時可加入年齡確認提醒。`;
}

function score(formData) {
  const scores = { observer: 0, explorer: 0, sensitive: 0, sharer: 0 };
  const questions = questionSets[currentVersion].questions;

  for (let i = 1; i <= questions.length; i += 1) {
    const answer = formData.get(`q${i}`);
    if (answer) scores[answer] += 1;
  }

  const ranked = Object.entries(scores).sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    return typeOrder.indexOf(a[0]) - typeOrder.indexOf(b[0]);
  });

  return {
    scores,
    primary: ranked[0][0],
    secondary: ranked[1][0],
    ranked
  };
}

function renderTypeChips(result) {
  typeChips.innerHTML = "";
  result.ranked.forEach(([type, count], index) => {
    const chip = document.createElement("span");
    chip.className = index === 0 ? "active" : "";
    chip.textContent = `${typeLabels[type]} ${count}`;
    typeChips.append(chip);
  });
}

function buildTeacherSummary(formData, age, result) {
  const primaryProfile = profiles[result.primary];
  const secondaryProfile = profiles[result.secondary];
  const scoreLine = result.ranked
    .map(([type, count]) => `${typeLabels[type]} ${count}`)
    .join(" / ");

  return [
    `孩子姓名：${formData.get("childName")}`,
    `年齡：約 ${age ?? "未填"} 歲`,
    `版本：${questionSets[currentVersion].label}`,
    `教室：${formData.get("campus")}`,
    `目前狀態：${formData.get("status")}`,
    `家長姓名：${formData.get("parentName")}`,
    `聯絡電話：${formData.get("phone")}`,
    `LINE 顯示名稱：${formData.get("lineName") || "未填"}`,
    `主要類型：${primaryProfile.name}`,
    `輔助特質：${secondaryProfile.name}`,
    `分型紀錄：${scoreLine}`,
    `第一堂課建議：${primaryProfile.firstClassTip}`,
    `需要避免：${primaryProfile.avoidTip}`,
    `孩子最近喜歡：${formData.get("interest") || "未填"}`,
    `容易卡住：${formData.get("stuckPoint") || "未填"}`,
    `家長補充：${formData.get("teacherNote") || "無"}`
  ].join("\n");
}

function buildSubmissionPayload(formData, age, result, summary) {
  const primaryProfile = profiles[result.primary];
  const secondaryProfile = profiles[result.secondary];
  const questions = questionSets[currentVersion].questions;
  const answers = questions.map((question, index) => {
    const value = formData.get(`q${index + 1}`);
    const selected = question.choices.find(([choiceValue]) => choiceValue === value);

    return {
      number: index + 1,
      area: question.area,
      question: question.text,
      type: value,
      typeLabel: typeLabels[value],
      answer: selected ? selected[1] : ""
    };
  });

  return {
    submittedAt: new Date().toISOString(),
    source: "bgtkidart.com.tw/pre-class-observation.html",
    childName: formData.get("childName"),
    birthdate: formData.get("birthdate"),
    age,
    version: questionSets[currentVersion].label,
    campus: formData.get("campus"),
    status: formData.get("status"),
    parentName: formData.get("parentName"),
    phone: formData.get("phone"),
    lineName: formData.get("lineName") || "",
    interest: formData.get("interest") || "",
    stuckPoint: formData.get("stuckPoint") || "",
    teacherNote: formData.get("teacherNote") || "",
    primaryType: primaryProfile.name,
    secondaryType: secondaryProfile.name,
    scores: result.scores,
    scoreLine: result.ranked.map(([type, count]) => `${typeLabels[type]} ${count}`).join(" / "),
    supportTip: primaryProfile.supportTip,
    teacherTip: primaryProfile.teacherTip,
    firstClassTip: primaryProfile.firstClassTip,
    avoidTip: primaryProfile.avoidTip,
    teacherSummary: summary,
    answers
  };
}

async function submitObservation(payload) {
  if (!submissionEndpoint) {
    return { ok: false, skipped: true };
  }

  await fetch(submissionEndpoint, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(payload)
  });

  return { ok: true };
}

function setSubmissionState(state, message) {
  if (submissionStatus) submissionStatus.textContent = message;
  if (!submitButton) return;

  submitButton.disabled = state === "submitting";
  submitButton.textContent = state === "submitting" ? "送出中..." : "送出並看孩子的藝術學習畫像";
}

function showResult(formData, age, result, summary) {
  const childName = formData.get("childName");
  const primaryProfile = profiles[result.primary];

  resultTitle.textContent = `${childName}目前比較像是「${primaryProfile.name}」`;
  resultText.textContent = primaryProfile.text;
  supportTip.textContent = primaryProfile.supportTip;
  teacherTip.textContent = primaryProfile.teacherTip;
  firstClassTip.textContent = primaryProfile.firstClassTip;
  avoidTip.textContent = primaryProfile.avoidTip;
  teacherSummary.textContent = summary;
  renderTypeChips(result);

  form.hidden = true;
  resultPanel.hidden = false;
  resultPanel.scrollIntoView({ behavior: "smooth" });
}

birthdateInput.addEventListener("change", updateVersionNotice);

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const age = getAge(formData.get("birthdate"));
  const result = score(formData);
  const summary = buildTeacherSummary(formData, age, result);
  const payload = buildSubmissionPayload(formData, age, result, summary);

  setSubmissionState("submitting", "正在送出給老師端...");

  try {
    const submitResult = await submitObservation(payload);
    if (submitResult.skipped) {
      setSubmissionState(
        "idle",
        "目前尚未填入 Google Apps Script 後端網址，結果只會在本頁顯示。"
      );
    } else {
      setSubmissionState("idle", "已送出，老師端稍後即可看到這筆課前觀察。");
    }
  } catch (error) {
    console.error(error);
    setSubmissionState("idle", "送出時遇到網路問題，請稍後再試或截圖提供給老師。");
  }

  showResult(formData, age, result, summary);
});

restartButton.addEventListener("click", () => {
  form.reset();
  currentVersion = "preschool";
  renderQuestions();
  updateVersionNotice();
  form.hidden = false;
  resultPanel.hidden = true;
  setSubmissionState("idle", "送出後會產生孩子藝術學習畫像，並同步提供給老師作為課前參考。");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

copySummaryButton.addEventListener("click", async () => {
  await navigator.clipboard.writeText(teacherSummary.textContent);
  copySummaryButton.textContent = "已複製";
  window.setTimeout(() => {
    copySummaryButton.textContent = "複製老師摘要";
  }, 1800);
});

renderQuestions();
