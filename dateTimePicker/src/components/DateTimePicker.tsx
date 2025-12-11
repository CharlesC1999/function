import React, { useEffect, useState, useMemo, CSSProperties } from "react";
import DatePicker, { YearPicker } from "./datePicker";
import TimePicker from "./timePicker";

// Define interfaces first
interface DateRange {
  start: string | null;
  end: string | null;
}

interface DateTimeState {
  date: DateRange;
  time: string;
}

interface Theme {
  primary?: string;
  primaryHover?: string;
  bg?: string;
  bgSoft?: string;
  border?: string;
  text?: string;
  muted?: string;
}

interface DateTimePickerProps {
  value?: string | null;
  onChange?: (value: string) => void;
  className?: string;
  theme?: Theme;
  lang?: string;
  onLangChange?: (lang: string) => void;
  side?: "left" | "right";
}

//
function splitDateTime(value: string | null | undefined): DateTimeState {
  if (!value) return { date: { start: null, end: null }, time: "" };
  const [dateStr, time] = value.split("T");

  // Let's assume for now the value is a single date, not a range
  // when coming from the parent.
  return {
    date: { start: dateStr, end: null },
    time: time || "",
  };
}

function combineDateTime(
  date: DateRange,
  time: string,
  isTimeSet: boolean
): string {
  if (!date.start) return "";
  if (isTimeSet) {
    const t = time || "00:00:00";
    return `${date.start}T${t}`;
  }
  return date.start;
}

function buildThemeStyle(theme: Theme = {}): CSSProperties {
  return {
    "--dtp-primary": theme.primary ?? "#0f766e",
    "--dtp-primary-hover": theme.primaryHover ?? "#115e59",
    "--dtp-bg": theme.bg ?? "#0b1120",
    "--dtp-bg-soft": theme.bgSoft ?? "#020617",
    "--dtp-border": theme.border ?? "#1f2933",
    "--dtp-text": theme.text ?? "#e5e7eb",
    "--dtp-muted": theme.muted ?? "#9ca3af",
  } as CSSProperties;
}

export default function DateTimePicker({
  value,
  onChange,
  className = "",
  theme,
  lang = "en-US",
  onLangChange,
  side = "right",
}: DateTimePickerProps) {
  const [{ date, time }, setState] = useState<DateTimeState>({
    date: { start: null, end: null },
    time: "",
  });
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [isLangMenuExpanded, setIsLangMenuExpanded] = useState(false);
  const [isTimeSet, setIsTimeSet] = useState(false);

  const startDate = useMemo(
    () => (date.start ? new Date(date.start) : null),
    [date.start]
  );
  const endDate = useMemo(
    () => (date.end ? new Date(date.end) : null),
    [date.end]
  );

  const [viewDate, setViewDate] = useState<Date>(
    () => startDate || endDate || new Date()
  );
  const [isPickingYear, setIsPickingYear] = useState(false);

  useEffect(() => {
    const s = splitDateTime(value);
    setState(s);
    setIsTimeSet(!!s.time);
  }, [value]);

  useEffect(() => {
    const latestDate = startDate || endDate;
    if (latestDate) setViewDate(latestDate);
  }, [startDate, endDate]);

  const handleDateChange = (newDateRange: DateRange) => {
    const newState = { date: newDateRange, time };
    setState(newState);
    onChange?.(combineDateTime(newState.date, newState.time, isTimeSet));
  };

  const handleTimeChange = (newTime: string) => {
    const newState = { date, time: newTime };
    setState(newState);
    if (!isTimeSet) {
      setIsTimeSet(true);
    }
    onChange?.(combineDateTime(newState.date, newState.time, true));
  };

  const handleSelectYear = (selectedYear: number) => {
    setViewDate(new Date(Date.UTC(selectedYear, viewDate.getUTCMonth(), 1)));
    setIsPickingYear(false);
  };

  const handleLangSelect = (newLang: string) => {
    onLangChange?.(newLang);
    setIsLangMenuExpanded(false);
  };

  const gotoPrevMonth = () => {
    setViewDate(
      (prev) =>
        new Date(Date.UTC(prev.getUTCFullYear(), prev.getUTCMonth() - 1, 1))
    );
  };

  const gotoNextMonth = () => {
    setViewDate(
      (prev) =>
        new Date(Date.UTC(prev.getUTCFullYear(), prev.getUTCMonth() + 1, 1))
    );
  };

  const toggleTimePanel = () => {
    setIsTimeOpen((p) => !p);
  };

  const year = viewDate.getUTCFullYear();
  const themeStyle = buildThemeStyle(theme);

  const langShortNames: { [key: string]: string } = {
    "en-US": "En",
    "zh-TW": "中",
    "ja-JP": "日",
  };
  const langOrder = ["zh-TW", "ja-JP", "en-US"];
  const doneButtonTexts: { [key: string]: string } = {
    "en-US": "Done",
    "zh-TW": "完成",
    "ja-JP": "完了",
  };

  return (
    <div className={`dtp-root ${className}`} style={themeStyle}>
      <div className="dtp-main-content">
        <div className="dtp-display-panel">
          <button
            type="button"
            className="dtp-display-nav"
            onClick={gotoPrevMonth}
          >
            ‹
          </button>
          <button
            type="button"
            className="dtp-display-title"
            onClick={() => setIsPickingYear((p) => !p)}
          >
            {viewDate.toLocaleString(lang, {
              month: "long",
              timeZone: "UTC",
            })}{" "}
            {year}
          </button>
          <button
            type="button"
            className="dtp-display-nav"
            onClick={gotoNextMonth}
          >
            ›
          </button>
          <div className="dtp-time-toggle-placeholder">
            <button
              type="button"
              className="dtp-icon-btn"
              onClick={toggleTimePanel}
            >
              {isTimeOpen ? "‹‹" : "››"}
            </button>
          </div>
        </div>

        <div className="dtp-main-panel">
          {isPickingYear ? (
            <YearPicker viewDate={viewDate} onSelectYear={handleSelectYear} />
          ) : (
            <DatePicker
              value={date}
              onChange={handleDateChange}
              viewDate={viewDate}
              lang={lang}
            />
          )}
        </div>

        <div className="dtp-footer">
          <div className="dtp-lang-switcher">
            {langOrder.map((langCode) => {
              const isCurrent = lang === langCode;
              if (!isCurrent && !isLangMenuExpanded) return null;

              return (
                <button
                  key={langCode}
                  type="button"
                  className={`dtp-lang-switcher-btn ${
                    isCurrent ? "dtp-lang-switcher-btn--current" : ""
                  }`}
                  onClick={() =>
                    isCurrent
                      ? setIsLangMenuExpanded((p) => !p)
                      : handleLangSelect(langCode)
                  }
                >
                  {langShortNames[langCode]}
                </button>
              );
            })}
          </div>
          <div style={{ flex: 1 }}></div>{" "}
          {/* This spacer pushes the following items to the right */}
          <button
            type="button"
            className="dtp-done-btn"
            onClick={() => setIsTimeOpen(false)}
          >
            {doneButtonTexts[lang]}
          </button>
        </div>
      </div>

      <div
        className={["dtp-time-panel", isTimeOpen ? "dtp-time-panel--open" : ""]
          .join(" ")
          .trim()}
      >
        <div className="dtp-time-panel-inner">
          <TimePicker value={time} onChange={handleTimeChange} />
        </div>
      </div>
    </div>
  );
}