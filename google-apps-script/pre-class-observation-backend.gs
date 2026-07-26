const SHEET_NAME = "課前小觀察";
const DEFAULT_TEACHER_KEY = "請改成老師查詢密碼";

const COLUMNS = [
  "填寫時間",
  "孩子姓名",
  "出生年月日",
  "年齡",
  "版本",
  "教室",
  "目前狀態",
  "家長姓名",
  "聯絡電話",
  "LINE 顯示名稱",
  "主要類型",
  "輔助特質",
  "分型紀錄",
  "第一堂課建議",
  "需要避免",
  "孩子最近喜歡",
  "容易卡住",
  "家長補充",
  "老師摘要",
  "完整題目答案 JSON"
];

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || "{}");
    const sheet = getSheet_();
    ensureHeader_(sheet);

    sheet.appendRow([
      new Date(),
      payload.childName || "",
      payload.birthdate || "",
      payload.age || "",
      payload.version || "",
      payload.campus || "",
      payload.status || "",
      payload.parentName || "",
      payload.phone || "",
      payload.lineName || "",
      payload.primaryType || "",
      payload.secondaryType || "",
      payload.scoreLine || "",
      payload.firstClassTip || "",
      payload.avoidTip || "",
      payload.interest || "",
      payload.stuckPoint || "",
      payload.teacherNote || "",
      payload.teacherSummary || "",
      JSON.stringify(payload.answers || [])
    ]);

    return json_({ ok: true });
  } catch (error) {
    return json_({ ok: false, error: String(error) });
  }
}

function doGet(e) {
  const params = e.parameter || {};

  if (params.action !== "list") {
    return jsonp_(params.callback, { ok: false, error: "Unknown action" });
  }

  if (!isValidTeacherKey_(params.key)) {
    return jsonp_(params.callback, { ok: false, error: "Invalid teacher key" });
  }

  const sheet = getSheet_();
  ensureHeader_(sheet);
  const values = sheet.getDataRange().getValues();
  const headers = values.shift() || [];
  const rows = values
    .filter((row) => row.some((cell) => cell !== ""))
    .map((row, index) => {
      const item = { id: index + 1 };
      headers.forEach((header, columnIndex) => {
        item[header] = formatValue_(row[columnIndex]);
      });
      return item;
    })
    .reverse();

  return jsonp_(params.callback, { ok: true, rows });
}

function setupPreClassObservationSheet() {
  const sheet = getSheet_();
  ensureHeader_(sheet);
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, COLUMNS.length);

  const properties = PropertiesService.getScriptProperties();
  if (!properties.getProperty("TEACHER_KEY")) {
    properties.setProperty("TEACHER_KEY", DEFAULT_TEACHER_KEY);
  }
}

function getSheet_() {
  const properties = PropertiesService.getScriptProperties();
  const sheetId = properties.getProperty("SHEET_ID");
  const spreadsheet = sheetId
    ? SpreadsheetApp.openById(sheetId)
    : SpreadsheetApp.getActiveSpreadsheet();

  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);
  return sheet;
}

function ensureHeader_(sheet) {
  const firstRow = sheet.getRange(1, 1, 1, COLUMNS.length).getValues()[0];
  const hasHeader = firstRow.some((cell) => cell !== "");
  if (!hasHeader) {
    sheet.getRange(1, 1, 1, COLUMNS.length).setValues([COLUMNS]);
    sheet.setFrozenRows(1);
  }
}

function isValidTeacherKey_(key) {
  const storedKey = PropertiesService.getScriptProperties().getProperty("TEACHER_KEY") || DEFAULT_TEACHER_KEY;
  return Boolean(key) && key === storedKey;
}

function json_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function jsonp_(callback, data) {
  const safeCallback = /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(callback || "") ? callback : "callback";
  return ContentService
    .createTextOutput(`${safeCallback}(${JSON.stringify(data)});`)
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function formatValue_(value) {
  if (value instanceof Date) {
    return Utilities.formatDate(value, "Asia/Taipei", "yyyy/MM/dd HH:mm:ss");
  }
  return value === null || value === undefined ? "" : String(value);
}
