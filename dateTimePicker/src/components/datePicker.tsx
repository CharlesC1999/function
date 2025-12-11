import React, { useEffect, useMemo, useRef } from "react";

function formatDate(date: Date | null | undefined): string {
  if (!date) return "";
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseDateString(str: string | null | undefined): Date | null {
  if (!str) return null;
  const [y, m, d] = str.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(Date.UTC(y, m - 1, d));
}

interface YearPickerProps {
  viewDate: Date;
  onSelectYear: (year: number) => void;
}

export function YearPicker({ viewDate, onSelectYear }: YearPickerProps) {
  const listRef = useRef<HTMLDivElement | null>(null);
  const selectedYearRef = useRef<HTMLButtonElement | null>(null);
  const currentYear = viewDate.getUTCFullYear();

  const years = useMemo(() => {
    const end = new Date().getUTCFullYear() + 10;
    const start = end - 110;
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, []);

  useEffect(() => {
    if (listRef.current && selectedYearRef.current) {
      listRef.current.scrollTop =
        selectedYearRef.current.offsetTop -
        listRef.current.offsetTop -
        listRef.current.clientHeight / 2 +
        selectedYearRef.current.clientHeight / 2;
    }
  }, []);

  return (
    <div ref={listRef} className="dtp-year-picker">
      {years.map((year) => {
        const isSelected = year === currentYear;
        return (
          <button
            key={year}
            ref={isSelected ? selectedYearRef : null}
            className={[
              "dtp-year-item",
              isSelected ? "dtp-year-item--selected" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => onSelectYear(year)}
          >
            {year}
          </button>
        );
      })}
    </div>
  );
}

interface DatePickerProps {
  value?: {
    start: string | null;
    end: string | null;
  } | null;
  onChange?: (range: { start: string; end: string | null }) => void;
  viewDate: Date;
  className?: string;
  lang?: string;
}

export default function DatePicker({
  value,
  onChange,
  viewDate,
  className = "",
  lang = "en-US",
}: DatePickerProps) {
  const startDate = useMemo(() => parseDateString(value?.start), [value]);
  const endDate = useMemo(() => parseDateString(value?.end), [value]);

  const year = viewDate.getUTCFullYear();
  const month = viewDate.getUTCMonth(); // 0-11

  const weekdayLabels = useMemo(() => {
    if (lang === "zh-TW") {
      return ["日", "一", "二", "三", "四", "五", "六"];
    }
    const labels = [];
    // Get weekdays starting from Sunday
    for (let i = 0; i < 7; i++) {
      const day = new Date(Date.UTC(2023, 0, 1 + i)); // A known Sunday
      labels.push(
        day.toLocaleString(lang, { weekday: "short", timeZone: "UTC" })
      );
    }
    return labels;
  }, [lang]);

  const firstDayOfMonth = new Date(Date.UTC(year, month, 1));
  const startWeekday = firstDayOfMonth.getUTCDay();
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();

  const calendarCells: (Date | null)[] = [];
  for (let i = 0; i < startWeekday; i++) {
    calendarCells.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarCells.push(new Date(Date.UTC(year, month, day)));
  }
  while (calendarCells.length < 42) {
    calendarCells.push(null);
  }

  const handleSelectDay = (date: Date | null) => {
    if (!date) return;
    onChange?.({ start: formatDate(date), end: null });
  };

  const today = new Date();

  return (
    <div className={`dtp-calendar ${className}`}>
      <div className="dtp-calendar-weekdays">
        {weekdayLabels.map((w, i) => (
          <div key={i} className="dtp-calendar-weekday">
            {w}
          </div>
        ))}
      </div>

      <div className="dtp-calendar-grid">
        {calendarCells.map((date, idx) => {
          if (!date) {
            return <div key={idx} className="dtp-calendar-cell--empty" />;
          }

          const day = date.getUTCDate();
          const isSelectedStart = startDate && +date === +startDate;
          const isSelectedEnd = endDate && +date === +endDate;
          const isInRange =
            startDate && endDate && date > startDate && date < endDate;
          const isToday =
            date.getUTCFullYear() === today.getFullYear() &&
            date.getUTCMonth() === today.getMonth() &&
            date.getUTCDate() === today.getDate();

          return (
            <button
              key={idx}
              type="button"
              className={[
                "dtp-calendar-cell",
                isToday ? "dtp-calendar-cell--today" : "",
                isSelectedStart ? "dtp-calendar-cell--selected-start" : "",
                isSelectedEnd ? "dtp-calendar-cell--selected-end" : "",
                isInRange ? "dtp-calendar-cell--in-range" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => handleSelectDay(date)}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
