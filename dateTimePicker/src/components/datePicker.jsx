// src/DatePicker.jsx
import React from "react";

export default function DatePicker({ value, onChange, label = "日期", className = "", ...rest }) {
    return (
        <div className={`dtp-field ${className}`}>
            {label && <label className="dtp-label">{label}</label>}
            <input type="date" className="dtp-input" value={value || ""} onChange={(e) => onChange && onChange(e.target.value)} {...rest} />
        </div>
    );
}
