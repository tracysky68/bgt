# 課前小觀察 Google Sheet 後端設定

## 1. 建立 Google Sheet

建立一份新的 Google Sheet，名稱可用：

`大綠地藝術_課前小觀察_老師端資料庫`

## 2. 開啟 Apps Script

在 Google Sheet 上方選單選：

`擴充功能` -> `Apps Script`

把 `pre-class-observation-backend.gs` 的內容貼到 Apps Script 編輯器。

## 3. 設定老師查詢密碼

在 Apps Script 左側選「專案設定」->「指令碼屬性」，新增：

`TEACHER_KEY` = 你想給老師使用的查詢密碼

如果 Apps Script 不是從 Google Sheet 裡開啟，也要新增：

`SHEET_ID` = Google Sheet 網址中 `/d/` 和 `/edit` 中間那串 ID

## 4. 初始化表格

回到 Apps Script 編輯器，在函式下拉選單選：

`setupPreClassObservationSheet`

按「執行」，第一次會要求授權。

## 5. 部署 Web App

選：

`部署` -> `新增部署作業` -> 類型選 `網頁應用程式`

設定：

- 執行身分：我
- 誰可以存取：任何人

部署後複製 Web App URL。

## 6. 貼回官網設定檔

打開：

`assets/pre-class-observation/pre-class-observation-config.js`

把網址貼入：

```js
window.BGT_PRECLASS_CONFIG = {
  submissionEndpoint: "你的 Web App URL",
  teacherEndpoint: "你的 Web App URL"
};
```

更新官網後，家長送出會寫入 Google Sheet，老師端可用查詢密碼讀取資料。

老師端隱藏網址：

`https://bgtkidart.com.tw/teacher-observations.html`
