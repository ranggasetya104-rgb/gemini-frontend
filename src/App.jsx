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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 space-y-4">

        <h1 className="text-2xl font-semibold text-center">
          Gemini Chat
        </h1>

        <input
          type="password"
          placeholder="API Key Gemini"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring"
        />

        <textarea
          placeholder="Tulis pertanyaan..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          className="w-full border rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring"
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Mengirim..." : "Kirim"}
        </button>

        {reply && (
          <div className="bg-gray-50 border rounded-lg p-4 text-sm whitespace-pre-wrap">
            {reply}
          </div>
        )}

      </div>
    </div>
  );
}


export default App;
