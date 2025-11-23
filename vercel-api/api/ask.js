// vercel-api/api/ask.js
import Groq from "groq-sdk";

/*
 Expected POST body: { sessionId, userMessage, profile?, transcript? }
 Returns: { bot } or { feedback } when Q/A >= 10 (you can implement transcript-based evaluation)
*/

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    const { sessionId, userMessage, profile, transcript } = req.body;
    if (!sessionId || !userMessage) return res.status(400).json({ error: 'Missing sessionId or userMessage' });

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const messages = [
      { role: "system", content: "You are an interview assistant that asks focused follow-up questions." },
      { role: "user", content:
        `Role: ${profile?.role || "Candidate"}
Last user answer: ${userMessage}
Provide a single concise follow-up question only.`}
    ];

    const resp = await groq.chat.completions.create({
      model: "mixtral-8x7b-32768",
      messages,
      temperature: 0.7
    });

    const bot = resp.choices?.[0]?.message?.content?.trim() || "Could not generate follow-up.";
    return res.status(200).json({ bot });
  } catch (err) {
    console.error("ask error:", err);
    return res.status(500).json({ error: err.message || String(err) });
  }
}
