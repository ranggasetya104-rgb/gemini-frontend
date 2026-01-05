import { useState } from "react";

function App() {
  const [apiKey, setApiKey] = useState("");
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!apiKey || !prompt) {
      setReply("API Key dan pesan wajib diisi");
      return;
    }

    setLoading(true);
    setReply("");

    try {
      const response = await fetch(
        "https://gemini-backend-p1o2.vercel.app/api/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            apiKey,
            message: prompt,
          }),
        }
      );

      const data = await response.json();
      setReply(data.reply);
    } catch {
      setReply("Gagal menghubungi server");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h2>Gemini App</h2>

      <input
        type="password"
        placeholder="Masukkan API Key Gemini"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />

      <textarea
        placeholder="Tulis pesan..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: "100%", height: 120, padding: 10 }}
      />

      <button onClick={sendMessage} style={{ marginTop: 10 }}>
        {loading ? "Mengirim..." : "Kirim"}
      </button>

      {reply && (
        <div style={{ marginTop: 20 }}>
          <strong>Balasan:</strong>
          <p>{reply}</p>
        </div>
      )}
    </div>
  );
}

export default App;
