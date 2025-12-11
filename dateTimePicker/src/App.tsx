import { useState } from "react";
import { DateTimePicker } from "./components";

function App() {
  const [value, setValue] = useState("2025-12-10");
  const [lang, setLang] = useState('zh-TW');

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "#020617",
        color: "#e5e7eb",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center", 
      }}
    >
      <h1 style={{ marginBottom: 16 }}>DateTimePicker Plugin Demo</h1>

      <DateTimePicker
        value={value}
        onChange={setValue}
        lang={lang}
        onLangChange={setLang}
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

      <p style={{ marginTop: 24, textAlign: "center" }}>
        Current Value: <code>{value || "(Not Selected)"}</code>
        <br/>
        <span style={{ fontSize: '12px', color: '#9ca3af' }}>
          Current Language: <strong>{lang}</strong>
        </span>
      </p>
    </div>
  );
}

export default App;