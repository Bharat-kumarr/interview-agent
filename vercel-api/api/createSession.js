// vercel-api/api/createSession.js
import Groq from "groq-sdk";

/*
 Expected POST body: { profile: { role, jobTitle, jobDesc, experience, skills } }
 Returns: { sessionId, bot }
*/

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    const { profile } = req.body;
    if (!profile) return res.status(400).json({ error: 'Missing profile' });

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const skillStr = Array.isArray(profile.skills) ? profile.skills.join(", ") : (profile.skills || "");

    const messages = [
      { role: "system", content: "You are an expert interviewer. Ask concise role-appropriate questions." },
      { role: "user", content:
        `Generate a single FIRST interview question for:
Role: ${profile.role}
Job Title: ${profile.jobTitle}
Experience: ${profile.experience}
Skills: ${skillStr}
Job Description: ${profile.jobDesc}
Return only the question.`}
    ];

    const resp = await groq.chat.completions.create({
      model: "mixtral-8x7b-32768",
      messages,
      temperature: 0.7
    });

    const bot = resp.choices?.[0]?.message?.content?.trim() || "Could not generate question.";
    // create a simple session id (Vercel is stateless — you can store in Firestore if needed)
    const sessionId = "s_" + Date.now();

    return res.status(200).json({ sessionId, bot });
  } catch (err) {
    console.error("createSession error:", err);
    return res.status(500).json({ error: err.message || String(err) });
  }
}
