const teacherConfig = window.BGT_PRECLASS_CONFIG || {};
const teacherEndpoint = teacherConfig.teacherEndpoint || teacherConfig.submissionEndpoint || "";
const keyInput = document.querySelector("#teacherKeyInput");
const loadButton = document.querySelector("#loadObservationsButton");
const statusText = document.querySelector("#teacherStatus");
const searchInput = document.querySelector("#teacherSearchInput");
const toolsPanel = document.querySelector(".teacher-tools");
const observationList = document.querySelector("#observationList");

let observations = [];

function setTeacherStatus(message) {
  statusText.textContent = message;
}

function loadJsonp(url) {
  return new Promise((resolve, reject) => {
    const callbackName = `bgtTeacherCallback_${Date.now()}`;
    const script = document.createElement("script");
    const separator = url.includes("?") ? "&" : "?";

    window[callbackName] = (data) => {
      delete window[callbackName];
      script.remove();
      resolve(data);
    };

    script.onerror = () => {
      delete window[callbackName];
      script.remove();
      reject(new Error("讀取失敗"));
    };

    script.src = `${url}${separator}callback=${callbackName}`;
    document.body.append(script);
  });
}

async function loadObservations() {
  const teacherKey = keyInput.value.trim();

  if (!teacherEndpoint) {
    setTeacherStatus("尚未填入 Google Apps Script 後端網址。請先完成後端部署，再回到設定檔貼上網址。");
    return;
  }

  if (!teacherKey) {
    setTeacherStatus("請先輸入老師查詢密碼。");
    return;
  }

  loadButton.disabled = true;
  loadButton.textContent = "讀取中...";
  setTeacherStatus("正在讀取 Google Sheet 資料...");

  try {
    const url = `${teacherEndpoint}?action=list&key=${encodeURIComponent(teacherKey)}`;
    const result = await loadJsonp(url);

    if (!result.ok) {
      setTeacherStatus(result.error === "Invalid teacher key" ? "老師查詢密碼不正確。" : "讀取失敗，請稍後再試。");
      return;
    }

    observations = result.rows || [];
    toolsPanel.hidden = observations.length === 0;
    renderObservations();
    setTeacherStatus(`已讀取 ${observations.length} 筆課前觀察資料。`);
  } catch (error) {
    console.error(error);
    setTeacherStatus("讀取失敗，請確認後端網址與網路狀態。");
  } finally {
    loadButton.disabled = false;
    loadButton.textContent = "讀取資料";
  }
}

function renderObservations() {
  const keyword = (searchInput.value || "").trim().toLowerCase();
  const filtered = observations.filter((item) => {
    if (!keyword) return true;
    return Object.values(item).join(" ").toLowerCase().includes(keyword);
  });

  observationList.innerHTML = "";

  if (filtered.length === 0) {
    observationList.innerHTML = '<article class="teacher-card"><p class="teacher-status">目前沒有符合的資料。</p></article>';
    return;
  }

  filtered.forEach((item) => {
    const card = document.createElement("article");
    card.className = "teacher-card";
    card.innerHTML = `
      <header>
        <div>
          <h3>${escapeHtml(item["孩子姓名"] || "未填姓名")}</h3>
          <div class="teacher-meta">
            <span>${escapeHtml(item["教室"] || "未填教室")}</span>
            <span>${escapeHtml(item["年齡"] || "未填年齡")} 歲</span>
            <span>${escapeHtml(item["主要類型"] || "未分型")}</span>
            <span>輔助：${escapeHtml(item["輔助特質"] || "未分型")}</span>
          </div>
        </div>
        <time>${escapeHtml(item["填寫時間"] || "")}</time>
      </header>
      <div class="teacher-note-grid">
        <article><span>第一堂課建議</span><strong>${escapeHtml(item["第一堂課建議"] || "未填")}</strong></article>
        <article><span>需要避免</span><strong>${escapeHtml(item["需要避免"] || "未填")}</strong></article>
        <article><span>孩子最近喜歡</span><strong>${escapeHtml(item["孩子最近喜歡"] || "未填")}</strong></article>
        <article><span>容易卡住</span><strong>${escapeHtml(item["容易卡住"] || "未填")}</strong></article>
      </div>
      <div class="teacher-meta">
        <span>家長：${escapeHtml(item["家長姓名"] || "未填")}</span>
        <span>電話：${escapeHtml(item["聯絡電話"] || "未填")}</span>
        <span>LINE：${escapeHtml(item["LINE 顯示名稱"] || "未填")}</span>
        <span>${escapeHtml(item["目前狀態"] || "未填狀態")}</span>
      </div>
      <pre class="teacher-summary-text">${escapeHtml(item["老師摘要"] || "")}</pre>
      <button type="button">複製摘要</button>
    `;

    card.querySelector("button").addEventListener("click", async () => {
      await navigator.clipboard.writeText(item["老師摘要"] || "");
      card.querySelector("button").textContent = "已複製";
      window.setTimeout(() => {
        card.querySelector("button").textContent = "複製摘要";
      }, 1600);
    });

    observationList.append(card);
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

loadButton.addEventListener("click", loadObservations);
searchInput.addEventListener("input", renderObservations);
