// src/DateTimePicker.jsx
import React, { useEffect, useState } from "react";
import DatePicker from "./datePicker.jsx";
import TimePicker from "./timePicker.jsx";

function splitDateTime(value) {
    if (!value) return { date: "", time: "" };
    const [date, time] = value.split("T");
    return { date: date || "", time: time || "" };
}

function combineDateTime(date, time) {
    if (!date && !time) return "";
    if (!date) return "";
    const t = time || "00:00";
    return `${date}T${t}`;
}

// ★ 把專案的 theme 映射到套件自己的 CSS 變數
function buildThemeStyle(theme = {}) {
    return {
        // 這裡左邊是套件自己用的變數名稱
        // 右邊可以吃專案自己的 CSS 變數 或真的顏色值
        "--dtp-primary": theme.primary ?? "var(--primary-color, #0f766e)",
        "--dtp-primary-hover": theme.primaryHover ?? "var(--primary-color-hover, #115e59)",
        "--dtp-bg": theme.bg ?? "var(--background-color, #0b1120)",
        "--dtp-bg-soft": theme.bgSoft ?? "var(--background-soft, #020617)",
        "--dtp-border": theme.border ?? "var(--border-color, #1f2933)",
        "--dtp-text": theme.text ?? "var(--text-color, #e5e7eb)",
        "--dtp-muted": theme.muted ?? "var(--text-muted-color, #9ca3af)",
    };
}

/**
 * props:
 * - value: string ("YYYY-MM-DDTHH:mm")
 * - onChange: (value: string) => void
 * - enableTime?: boolean
 * - side?: "right" | "left"
 * - className?: string
 * - theme?: {
 *     primary?: string;
 *     primaryHover?: string;
 *     bg?: string;
 *     bgSoft?: string;
 *     border?: string;
 *     text?: string;
 *     muted?: string;
 *   }
 */
export default function DateTimePicker({ value, onChange, enableTime = true, side = "right", className = "", theme }) {
    const [{ date, time }, setState] = useState({ date: "", time: "" });
    const [isTimeOpen, setIsTimeOpen] = useState(false);

    useEffect(() => {
        setState(splitDateTime(value));
    }, [value]);

    const handleDateChange = (newDate) => {
        setState((prev) => {
            const next = { ...prev, date: newDate };
            const combined = combineDateTime(next.date, next.time);
            onChange && onChange(combined);
            return next;
        });
    };

    const handleTimeChange = (newTime) => {
        setState((prev) => {
            const next = { ...prev, time: newTime };
            const combined = combineDateTime(next.date, next.time);
            onChange && onChange(combined);
            return next;
        });
    };

    const toggleTimePanel = () => {
        if (!enableTime) return;
        setIsTimeOpen((prev) => !prev);
    };

    const themeStyle = buildThemeStyle(theme);

    return (
        <div className={`dtp-root ${className}`} style={themeStyle}>
            {/* 主區塊：日期 + 按鈕 */}
            <div className="dtp-main">
                <DatePicker value={date} onChange={handleDateChange} />

                {enableTime && (
                    <button type="button" className="dtp-toggle-btn" onClick={toggleTimePanel}>
                        {isTimeOpen ? "隱藏時間" : time ? `時間：${time}` : "選擇時間"}
                    </button>
                )}
            </div>

            {/* 側邊滑出的時間面板 */}
            {enableTime && (
                <div className={["dtp-time-panel", `dtp-time-panel--${side}`, isTimeOpen ? "dtp-time-panel--open" : ""].join(" ")}>
                    <div className="dtp-time-panel-inner">
                        <TimePicker value={time} onChange={handleTimeChange} />
                        <button type="button" className="dtp-close-btn" onClick={toggleTimePanel}>
                            完成
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
