import React, { useEffect, useState, useMemo } from "react";
import DatePicker, { YearPicker } from "./datePicker.jsx";
import TimePicker from "./timePicker.jsx";

//
function splitDateTime(value) {
    if (!value) return { date: { start: null, end: null }, time: "" };
    const [dateStr, time] = value.split("T");

    // Let's assume for now the value is a single date, not a range
    // when coming from the parent.
    return {
        date: { start: dateStr, end: null },
        time: time || "",
    };
}

function combineDateTime(date, time) {
    if (!date.start) return "";
    const t = time || "00:00:00";
    // If it's a range, we might want to handle this differently,
    // but for now, we'll just use the start date.
    return `${date.start}T${t}`;
}

function buildThemeStyle(theme = {}) {
    return {
        "--dtp-primary": theme.primary ?? "#0f766e",
        "--dtp-primary-hover": theme.primaryHover ?? "#115e59",
        "--dtp-bg": theme.bg ?? "#0b1120",
        "--dtp-bg-soft": theme.bgSoft ?? "#020617",
        "--dtp-border": theme.border ?? "#1f2933",
        "--dtp-text": theme.text ?? "#e5e7eb",
        "--dtp-muted": theme.muted ?? "#9ca3af",
    };
}

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function DateTimePicker({ value, onChange, className = "", theme, side = "right" }) {
    const [{ date, time }, setState] = useState({ date: { start: null, end: null }, time: "" });
    const [isTimeOpen, setIsTimeOpen] = useState(false);

    const startDate = useMemo(() => (date.start ? new Date(date.start) : null), [date.start]);
    const endDate = useMemo(() => (date.end ? new Date(date.end) : null), [date.end]);

    const [viewDate, setViewDate] = useState(() => startDate || endDate || new Date());
    const [isPickingYear, setIsPickingYear] = useState(false);

    useEffect(() => {
        setState(splitDateTime(value));
    }, [value]);

    useEffect(() => {
        const latestDate = startDate || endDate;
        if (latestDate) setViewDate(latestDate);
    }, [startDate, endDate]);

    const handleDateChange = (newDateRange) => {
        const newState = { date: newDateRange, time };
        setState(newState);
        onChange?.(combineDateTime(newState.date, newState.time));
    };

    const handleTimeChange = (newTime) => {
        const newState = { date, time: newTime };
        setState(newState);
        onChange?.(combineDateTime(newState.date, newState.time));
    };

    const handleSelectYear = (selectedYear) => {
        setViewDate(new Date(Date.UTC(selectedYear, viewDate.getUTCMonth(), 1)));
        setIsPickingYear(false);
    };

    const gotoPrevMonth = () => {
        setViewDate((prev) => new Date(Date.UTC(prev.getUTCFullYear(), prev.getUTCMonth() - 1, 1)));
    };

    const gotoNextMonth = () => {
        setViewDate((prev) => new Date(Date.UTC(prev.getUTCFullYear(), prev.getUTCMonth() + 1, 1)));
    };

    const year = viewDate.getUTCFullYear();
    const month = viewDate.getUTCMonth();
    const themeStyle = buildThemeStyle(theme);

    return (
        <div className={`dtp-root ${className}`} style={themeStyle}>
            <div className="dtp-main-content">
                <div className="dtp-display-panel">
                    <button type="button" className="dtp-display-nav" onClick={gotoPrevMonth}>
                        ‹
                    </button>
                    <button type="button" className="dtp-display-title" onClick={() => setIsPickingYear((p) => !p)}>
                        {monthNames[month]} {year}
                    </button>
                    <button type="button" className="dtp-display-nav" onClick={gotoNextMonth}>
                        ›
                    </button>
                    <div className="dtp-time-toggle-placeholder">
                        <button type="button" className="dtp-icon-btn" onClick={() => setIsTimeOpen(p => !p)}>
                            {isTimeOpen ? '‹‹' : '››'}
                        </button>
                    </div>
                </div>

                <div className="dtp-main-panel">
                    {isPickingYear ? (
                        <YearPicker viewDate={viewDate} onSelectYear={handleSelectYear} />
                    ) : (
                        <DatePicker value={date} onChange={handleDateChange} viewDate={viewDate} />
                    )}
                </div>

                <div className="dtp-footer">
                    <button type="button" className="dtp-close-btn" onClick={() => setIsTimeOpen(false)}>
                        Done
                    </button>
                </div>
            </div>

            <div className={["dtp-time-panel", isTimeOpen ? "dtp-time-panel--open" : ""].join(" ")}>
                <div className="dtp-time-panel-inner">
                    <TimePicker value={time} onChange={handleTimeChange} />
                </div>
            </div>
        </div>
    );
}
