// public/firebase-config.js (ES Module)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// YOUR FIREBASE CONFIG (you provided this)
const firebaseConfig = {
  apiKey: "AIzaSyCiR2X08bn-tvaaRqQFfH0Wqr4Zji3nQ5U",
  authDomain: "interview-agent-925d6.firebaseapp.com",
  projectId: "interview-agent-925d6",
  storageBucket: "interview-agent-925d6.firebasestorage.app",
  messagingSenderId: "831334899472",
  appId: "1:831334899472:web:d2aa8f46acb80073474f95"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
