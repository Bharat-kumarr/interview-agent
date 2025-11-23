// public/script.js
import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const VERCEL_URL = "https://interview-agent-inky.vercel.app/api"; // <--- FIXED URL

function getVercelApiBase() {
  return VERCEL_URL.replace(/\/+$/, '');
}
const API_BASE = getVercelApiBase();

const startBtn = document.getElementById('startBtn');
const sendBtn  = document.getElementById('sendBtn');
const signoutBtn = document.getElementById('signoutBtn');
const roleEl = document.getElementById('role');
const jobTitleEl = document.getElementById('jobTitle');
const jobDescEl = document.getElementById('jobDesc');
const experienceEl = document.getElementById('experience');
const skillsEl = document.getElementById('skills');
const messagesEl = document.getElementById('messages');
const textInput = document.getElementById('textInput');
const feedbackDiv = document.getElementById('feedback');

let sessionId = null;
let currentUID = null;
let recognition = null;
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

onAuthStateChanged(auth, user => {
  if (!user) window.location.href = 'login.html';
  else currentUID = user.uid;
});

function appendMessage(text, who='bot') {
  const d = document.createElement('div');
  d.className = 'msg ' + (who === 'user' ? 'user' : 'bot');
  d.textContent = (who === 'user' ? 'You: ' : 'Bot: ') + text;
  messagesEl.appendChild(d);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

async function saveProfileToFirestore(uid, profile) {
  try {
    await setDoc(doc(db, "users", uid, "profile", "current"), {
      ...profile,
      savedAt: serverTimestamp()
    });
  } catch (e) { console.error("saveProfile error", e); }
}

async function createSession(profile) {
  const res = await fetch(`${API_BASE}/createSession`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ profile })
  });
  return res.json();
}

async function askBackend(payload) {
  const res = await fetch(`${API_BASE}/ask`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}

startBtn.addEventListener('click', async () => {
  const profile = {
    role: roleEl.value,
    jobTitle: jobTitleEl.value,
    jobDesc: jobDescEl.value,
    experience: experienceEl.value,
    skills: (skillsEl.value || "").split(',').map(s=>s.trim()).filter(Boolean)
  };
  if (!profile.role || !profile.jobTitle) return alert('Select role and job title');

  appendMessage('Starting session...', 'bot');
  if (currentUID) await saveProfileToFirestore(currentUID, profile);

  try {
    const data = await createSession(profile);
    sessionId = data.sessionId || data.id || null;
    appendMessage(data.bot || data.message || 'No response', 'bot');
  } catch (e) {
    console.error(e);
    appendMessage('Failed to start session', 'bot');
  }
});

sendBtn.addEventListener('click', async () => {
  const text = textInput.value.trim(); if (!text) return;
  if (!sessionId) return alert('Start a session first');
  appendMessage(text, 'user'); textInput.value = '';

  try {
    const payload = { sessionId, userMessage: text };
    const res = await askBackend(payload);
    if (res.bot) appendMessage(res.bot, 'bot');
    if (res.feedback) { feedbackDiv.style.display='block'; feedbackDiv.innerText = res.feedback; }
  } catch (e) {
    console.error(e);
    appendMessage('Error contacting backend', 'bot');
  }
});

document.getElementById('startMic').addEventListener('click', () => {
  if (!SR) return alert('SpeechRecognition not supported (use Chrome)');
  if (recognition) recognition.stop();
  recognition = new SR();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.onresult = e => { textInput.value = e.results[0][0].transcript; };
  recognition.start();
});
document.getElementById('stopMic').addEventListener('click', () => { if (recognition) recognition.stop(); recognition = null; });

signoutBtn.addEventListener('click', async ()=>{ await signOut(auth); window.location.href='login.html'; });
