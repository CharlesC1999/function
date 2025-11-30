// src/TimePicker.jsx
import React from "react";

export default function TimePicker({ value, onChange, label = "時間", className = "", ...rest }) {
    return (
        <div className={`dtp-field ${className}`}>
            {label && <label className="dtp-label">{label}</label>}
            <input type="time" className="dtp-input" value={value || ""} onChange={(e) => onChange && onChange(e.target.value)} {...rest} />
        </div>
    );
}
