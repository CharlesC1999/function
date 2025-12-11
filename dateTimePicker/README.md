# React DateTime Picker

# React 日期時間選擇器

A feature-rich, themeable, and multi-language supported DateTime Picker component for React.
這是一個功能豐富、可自訂主題且支援多國語言的 React 日期時間選擇器元件。

[![NPM](https://img.shields.io/npm/v/[your-package-name].svg)](https://www.npmjs.com/package/[your-package-name])
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

---

## ✨ Features

## ✨ 功能特色

- **Date & Year Selection**: An intuitive calendar interface.
- **日期與年份選擇**：方便直觀的日曆介面。

- **Time Selection**: Capable of selecting hours, minutes, and seconds.
- **時間選擇**：可選擇時、分、秒。

- **Smart Formatting**: Returns in `YYYY-MM-DD` format if no time is selected, and automatically switches to `YYYY-MM-DDTHH:mm:ss` format after a time has been selected.
- **智慧格式化**：未選擇時間時，回傳 `YYYY-MM-DD` 格式；選擇時間後，自動切換為 `YYYY-MM-DDTHH:mm:ss` 格式。

- **Multi-Language Support**: Built-in UI switcher for English (`en-US`), Traditional Chinese (`zh-TW`), and Japanese (`ja-JP`).
- **多國語言支援**：內建 UI 切換器，支援英語 (`en-US`)、繁體中文 (`zh-TW`) 和日語 (`ja-JP`)。

- **Themeable**: Easily customize the color scheme to fit your brand identity via the `theme` prop.
- **可自訂主題**：透過 `theme` prop 輕鬆調整配色，以符合您的品牌風格。

- **Zero Dependencies**: Does not rely on any third-party date utility libraries apart from React.
- **零依賴**：除了 React 之外，不依賴任何第三方日期處理函式庫。

---

## 📦 Installation

## 📦 安裝

```bash
npm install [your-package-name]
```

Or with Yarn:
或者使用 Yarn:

```bash
yarn add [your-package-name]
```

---

## 🚀 Usage

## 🚀 使用方式

In your React application, import the `DateTimePicker` component and its corresponding CSS stylesheet.
在您的 React 應用程式中，引入 `DateTimePicker` 元件和其對應的 CSS 樣式表。

```jsx
import React, { useState } from "react";

// 1. Import the component
// 1. 引入元件
import { DateTimePicker } from "[your-package-name]";

// 2. Import the stylesheet (path may vary depending on your build setup)
// 2. 引入樣式表 (路徑取決於您的打包設定)
import "[your-package-name]/dist/style.css";

function App() {
  // You can provide an initial value with time, or just a date
  // 可以給定一個包含時間的初始值，或只給定日期
  const [value, setValue] = useState("2025-12-10");

  return <DateTimePicker value={value} onChange={setValue} lang="zh-TW" />;
}

export default App;
```

**Important**: You must import the CSS file `dist/style.css` manually for the component's styles to apply correctly.
**重要提示**: 您必須手動引入 CSS 檔案 `dist/style.css` 才能讓元件樣式正常顯示。

---

## ⚙️ Props API

## ⚙️ Props API

Here are the props you can pass to the `DateTimePicker` component:
以下是您可以傳遞給 `DateTimePicker` 元件的 props：

| Prop (屬性)    | Type (類型)               | Default (預設值) | Description (描述)                                                                                                                                            |
| -------------- | ------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `value`        | `string`                  | `undefined`      | The current value of the component. Accepts `YYYY-MM-DD` or `YYYY-MM-DDTHH:mm:ss` format.<br/>元件的目前值。接受 `YYYY-MM-DD` 或 `YYYY-MM-DDTHH:mm:ss` 格式。 |
| `onChange`     | `(value: string) => void` | `undefined`      | Callback function triggered when the date or time changes. It receives the latest value string.<br/>當日期或時間改變時觸發的回呼函式，會回傳最新的值字串。    |
| `lang`         | `string`                  | `'en-US'`        | Sets the display language. Supported: `'en-US'`, `'zh-TW'`, `'ja-JP'`.<br/>設定顯示語言。目前支援: `'en-US'`, `'zh-TW'`, `'ja-JP'`。                          |
| `onLangChange` | `(lang: string) => void`  | `undefined`      | Callback function triggered when the user changes the language via the UI.<br/>當使用者透過 UI 切換語言時觸發的回呼函式。                                     |
| `theme`        | `object`                  | `{}`             | An object to customize the color scheme. See the "Custom Styling" section below.<br/>一個用來自訂配色的物件。詳見下方的「自訂樣式」章節。                     |

---

## 🎨 Custom Styling

## 🎨 自訂樣式

You can customize the primary colors of the component by passing a `theme` object.
您可以透過傳遞 `theme` 物件來客製化元件的主要顏色。

### Example (範例)

```jsx
<DateTimePicker
  theme={{
    primary: "#f97316",
    primaryHover: "#ea580c",
    bg: "#020617",
    bgSoft: "#020617",
    border: "#1f2937",
    text: "#e5e7eb",
    muted: "#9ca3af",
  }}
/>
```

### Available Properties (可用屬性)

| Property (屬性) | Default (預設值) | Description (描述)                                                            |
| --------------- | ---------------- | ----------------------------------------------------------------------------- |
| `primary`       | `#0f766e`        | Primary color for buttons, current date, etc.<br/>主要顏色 (按鈕、當前日期)。 |
| `primaryHover`  | `#115e59`        | Primary color on hover.<br/>主要顏色滑鼠懸停效果。                            |
| `bg`            | `#0b1120`        | Overall background color.<br/>整體背景顏色。                                  |
| `bgSoft`        | `#020617`        | Softer background color for panels.<br/>較柔和的背景色 (例如面板)。           |
| `border`        | `#1f2937`        | Border color.<br/>邊框顏色。                                                  |
| `text`          | `#e5e7eb`        | Primary text color.<br/>主要文字顏色。                                        |
| `muted`         | `#9ca3af`        | Muted/secondary text color.<br/>次要/靜音文字顏色。                           |

### Full Default Styles

### 完整的預設樣式

If you cannot or prefer not to import the `dist/style.css` file, you can copy the following CSS content directly into your project. Be aware that this approach might not leverage bundler optimizations.
如果您無法或不想引入 `dist/style.css` 檔案，您可以在您的專案中直接複製以下 CSS 內容。請注意，這樣做可能無法利用打包工具的最佳化。

```css
.dtp-root,
.dtp-root * {
  box-sizing: border-box;
}

/* ===== 基本容器 / 變數 ===== */

:root {
  --dtp-text: #e5e7eb;
  --dtp-text-muted: #9ca3af;
  --dtp-bg: transparent;
  --dtp-bg-soft: transparent;
  --dtp-border: #334155;
  --dtp-border-rgb: 51, 65, 85; /* RGB values for #334155 */
  --dtp-primary: #34d399;
  --dtp-primary-hover: #10b981;
  --dtp-radius: 12px;
  --dtp-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* ===== 整體佈局 ===== */

.dtp-root {
  position: relative;
  display: inline-flex; /* Use Flexbox for the root */
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  color: var(--dtp-text);
  border-radius: var(--dtp-radius);
  border: 1px solid var(--dtp-border);
}

.dtp-main-content {
  padding: 12px;
}

.dtp-display-panel {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--dtp-border);
}

.dtp-display-title {
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: background-color 0.2s;
  background: none;
  border: none;
  color: var(--dtp-text);
  flex-grow: 1;
  text-align: center;
}
.dtp-display-title:hover {
  background-color: var(--dtp-bg);
}

.dtp-display-nav {
  border: none;
  background: transparent;
  color: var(--dtp-text);
  cursor: pointer;
  font-size: 18px; /* Slightly reduced */
  width: 28px; /* Slightly reduced */
  height: 28px; /* Slightly reduced */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  flex-shrink: 0;
}
.dtp-display-nav:hover {
  background-color: var(--dtp-bg);
}

.dtp-main-panel {
  width: 244px; /* (34px * 7) + (6 * 1px) - Adjusted for actual grid width */
}

.dtp-time-toggle-placeholder {
  flex-shrink: 0;
  border-left: 1px solid var(--dtp-border);
  margin-left: 8px;
  padding-left: 8px;
}

.dtp-icon-btn {
  border: none;
  background: transparent;
  color: var(--dtp-text-muted);
  cursor: pointer;
  font-size: 16px; /* Slightly reduced */
  width: 28px; /* Slightly reduced */
  height: 28px; /* Slightly reduced */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}
.dtp-icon-btn:hover {
  background-color: var(--dtp-bg);
  color: var(--dtp-text);
}

/* ===== 月曆 (僅外框) ===== */

.dtp-calendar {
  display: flex;
  flex-direction: column;
}

/* 星期列 */

.dtp-calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 6px;
}

.dtp-calendar-weekday {
  width: 34px; /* Adjusted */
  font-size: 12px;
  text-align: center;
  color: var(--dtp-text-muted);
  font-weight: 500;
  padding: 4px 0;
  border: 1px solid transparent; /* Align with cells */
}

/* 日期格 */

.dtp-calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
}

.dtp-calendar-cell {
  position: relative;
  width: 34px; /* Adjusted */
  height: 32px; /* Adjusted */
  border-radius: 4px; /* Slightly rounded corners */
  border: 1px solid rgba(var(--dtp-border-rgb), 0.3); /* Light border */
  font-size: 14px;
  cursor: pointer;
  background: transparent;
  color: var(--dtp-text);
  transition:
    background-color 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease;
}

.dtp-calendar-cell:hover {
  background-color: var(--dtp-bg);
  border-radius: 4px; /* Consistent with other cells */
}

.dtp-calendar-cell--empty {
  cursor: default;
  visibility: hidden;
  width: 34px; /* Adjusted */
  height: 32px; /* Adjusted */
  border: 1px solid transparent; /* To maintain alignment */
}

.dtp-calendar-cell--today::after {
  content: "";
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: var(--dtp-primary);
}

/* Range selection styles */
.dtp-calendar-cell--in-range,
.dtp-calendar-cell--in-hover-range {
  background-color: rgba(52, 211, 153, 0.15);
  border-radius: 0;
  border: none; /* No individual border for in-range */
}

.dtp-calendar-cell--selected-start,
.dtp-calendar-cell--selected-end {
  background-color: var(--dtp-primary);
  color: var(--dtp-bg);
  font-weight: 600;
  border-radius: 4px; /* Consistent with other cells */
  border: 1px solid rgba(var(--dtp-border-rgb), 0.5); /* Darker border */
  box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.5); /* Sinking effect */
}
.dtp-calendar-cell--selected-start.dtp-calendar-cell--in-range,
.dtp-calendar-cell--selected-start.dtp-calendar-cell--in-hover-range {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.dtp-calendar-cell--selected-end.dtp-calendar-cell--in-range,
.dtp-calendar-cell--selected-end.dtp-calendar-cell--in-hover-range {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.dtp-calendar-cell--selected-start:hover,
.dtp-calendar-cell--selected-end:hover {
  background-color: var(--dtp-primary-hover);
}

/* ===== Year Picker ===== */

.dtp-year-picker {
  height: 258px; /* Match weekday + grid height */
  overflow-y: auto;
  padding: 0 4px;
  display: flex;
  flex-direction: column;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}
.dtp-year-picker::-webkit-scrollbar {
  width: 0;
  height: 0;
}
.dtp-year-picker::-webkit-scrollbar-track {
  background: transparent;
}
.dtp-year-picker::-webkit-scrollbar-thumb {
  background: var(--dtp-border);
  border-radius: 999px;
}

.dtp-year-item {
  width: 100%;
  border: none;
  background: transparent;
  color: var(--dtp-text);
  font-size: 15px;
  padding: 8px 0;
  text-align: center;
  cursor: pointer;
  border-radius: 8px;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.dtp-year-item:hover {
  background-color: var(--dtp-bg);
}

.dtp-year-item--selected {
  background-color: var(--dtp-primary);
  color: var(--dtp-bg);
  font-weight: 600;
}

.dtp-year-item--selected:hover {
  background-color: var(--dtp-primary-hover);
}

/* ===== Time Picker Panel (Flexbox sliding) ===== */

.dtp-time-panel {
  width: 0;
  overflow: hidden;
  border-left: 1px solid transparent;
  transition:
    width 0.25s ease-out,
    border-color 0.25s ease-out;
  flex-shrink: 0;
}

.dtp-time-panel--open {
  width: 210px; /* Adjusted to be slightly narrower */
  border-left-color: var(--dtp-border);
}

.dtp-time-panel-inner {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
}

.dtp-time-picker {
  display: flex;
  flex-direction: column;
  gap: 6px;
  /* No flex-grow */
  min-height: 0;
}

.dtp-time-wheel {
  display: flex;
  gap: 8px;
  /* No flex-grow */
  min-height: 0;
}

.dtp-wheel {
  flex: 1;
  background: var(--dtp-bg);
  border-radius: 8px;
  border: 1px solid var(--dtp-border);
  padding: 6px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-width: 0; /* Important for flex shrink */
}

.dtp-wheel-title {
  font-size: 11px;
  color: var(--dtp-text-muted);
  text-align: center;
  margin-bottom: 4px;
}

.dtp-label-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-block: 8px; /* Maintain vertical spacing for the label */
}

.dtp-wheel-list {
  max-height: 280px;
  overflow-y: auto;
  padding: 0 2px;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}
.dtp-wheel-list::-webkit-scrollbar {
  width: 0;
  height: 0;
}
.dtp-wheel-list::-webkit-scrollbar-track {
  background: transparent;
}
.dtp-wheel-list::-webkit-scrollbar-thumb {
  background: var(--dtp-border);
  border-radius: 999px;
}

.dtp-wheel-item {
  width: 100%;
  border: none;
  background: transparent;
  color: var(--dtp-text);
  font-size: 14px;
  padding: 4px 0;
  text-align: center;
  cursor: pointer;
  border-radius: 6px;
}

.dtp-wheel-item:hover {
  background-color: var(--dtp-bg);
}

.dtp-wheel-item--selected {
  background-color: var(--dtp-primary);
  color: var(--dtp-bg);
  font-weight: 600;
}
.dtp-wheel-item--selected:hover {
  background-color: var(--dtp-primary-hover);
}

.dtp-time-reset-icon-btn {
  border: none;
  background: transparent;
  color: var(--dtp-text-muted);
  cursor: pointer;
  font-size: 14px; /* Slightly smaller icon */
  width: 24px; /* Smaller size */
  height: 24px; /* Smaller size */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
  flex-shrink: 0;
}
.dtp-time-reset-icon-btn:hover {
  background-color: var(--dtp-bg);
  color: var(--dtp-text);
}

/* ===== Footer & Controls ===== */

.dtp-footer {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--dtp-border);
  display: flex;
  align-items: center;
}

.dtp-lang-switcher {
  display: flex;
  gap: 4px;
}

.dtp-lang-switcher-btn {
  border: 1px solid var(--dtp-border);
  background-color: transparent;
  color: var(--dtp-text-muted);
  border-radius: 6px;
  padding: 0;
  width: 28px;
  height: 28px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.dtp-lang-switcher-btn:hover {
  border-color: var(--dtp-text-muted);
  color: var(--dtp-text);
}

.dtp-lang-switcher-btn--current {
  border-color: var(--dtp-primary);
  color: var(--dtp-primary);
  font-weight: 700;
}

.dtp-done-btn {
  border: none;
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  background: var(--dtp-primary);
  color: var(--dtp-bg);
  transition: background-color 0.2s ease;
  white-space: nowrap;
}

.dtp-done-btn:hover {
  background-color: var(--dtp-primary-hover);
}



---

## 📄 License

## 📄 授權

[MIT](LICENSE) © [Your Name]
```
