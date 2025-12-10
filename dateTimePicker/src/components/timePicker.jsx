import React, { useEffect, useMemo, useState } from "react";

function parseTimeString(str) {
  if (!str) return { hour: 0, minute: 0, second: 0 };
  const [h, m, s] = str.split(":").map((v) => parseInt(v ?? "0", 10));
  return {
    hour: Number.isNaN(h) ? 0 : h,
    minute: Number.isNaN(m) ? 0 : m,
    second: Number.isNaN(s) ? 0 : s,
  };
}

function formatTime(hour, minute, second) {
  const h = String(hour).padStart(2, "0");
  const m = String(minute).padStart(2, "0");
  const s = String(second).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

const hours = Array.from({ length: 24 }, (_, i) => i);
const minutes = Array.from({ length: 60 }, (_, i) => i);
const seconds = Array.from({ length: 60 }, (_, i) => i);

export default function TimePicker({
  value,
  onChange,
  label = "Time",
  className = "",
}) {
  const {
    hour: initialHour,
    minute: initialMinute,
    second: initialSecond,
  } = useMemo(() => parseTimeString(value), [value]);

  const [hour, setHour] = useState(initialHour);
  const [minute, setMinute] = useState(initialMinute);
  const [second, setSecond] = useState(initialSecond);

  useEffect(() => {
    setHour(initialHour);
    setMinute(initialMinute);
    setSecond(initialSecond);
  }, [initialHour, initialMinute, initialSecond]);

  const updateTime = (nextHour, nextMinute, nextSecond) => {
    const formatted = formatTime(nextHour, nextMinute, nextSecond);
    onChange && onChange(formatted);
  };

  const handleSelectHour = (h) => {
    setHour(h);
    updateTime(h, minute, second);
  };

  const handleSelectMinute = (m) => {
    setMinute(m);
    updateTime(hour, m, second);
  };

  const handleSelectSecond = (s) => {
    setSecond(s);
    updateTime(hour, minute, s);
  };

  const handleReset = () => {
    onChange?.('');
  };

  return (
    <div className={`dtp-time-picker ${className}`}>
      <div className="dtp-label-container">
        {label && <div className="dtp-label">{label}</div>}
        <button type="button" className="dtp-time-reset-icon-btn" onClick={handleReset} title="Reset Time">
          ↻
        </button>
      </div>

      <div className="dtp-time-wheel">
        <div className="dtp-wheel">
          <div className="dtp-wheel-title">H</div>
          <div className="dtp-wheel-list">
            {hours.map((h) => (
              <button
                key={h}
                type="button"
                className={[
                  "dtp-wheel-item",
                  h === hour ? "dtp-wheel-item--selected" : "",
                ].join(" ")}
                onClick={() => handleSelectHour(h)}
              >
                {String(h).padStart(2, "0")}
              </button>
            ))}
          </div>
        </div>

        <div className="dtp-wheel">
          <div className="dtp-wheel-title">M</div>
          <div className="dtp-wheel-list">
            {minutes.map((m) => (
              <button
                key={m}
                type="button"
                className={[
                  "dtp-wheel-item",
                  m === minute ? "dtp-wheel-item--selected" : "",
                ].join(" ")}
                onClick={() => handleSelectMinute(m)}
              >
                {String(m).padStart(2, "0")}
              </button>
            ))}
          </div>
        </div>

        <div className="dtp-wheel">
          <div className="dtp-wheel-title">S</div>
          <div className="dtp-wheel-list">
            {seconds.map((s) => (
              <button
                key={s}
                type="button"
                className={[
                  "dtp-wheel-item",
                  s === second ? "dtp-wheel-item--selected" : "",
                ].join(" ")}
                onClick={() => handleSelectSecond(s)}
              >
                {String(s).padStart(2, "0")}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
