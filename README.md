📘 Interview Practice Partner
An interactive mock interview system with role-based predefined questions, voice input, a modern UI, and automatic feedback generation.
This project simulates a real interview experience by asking 10 structured follow-up questions based on the chosen job role.

🚀 Features
🎯 Role-Based Interview Questions
Choose from:


Software Engineer


Data Analyst


Sales Associate


Each role contains 10 professionally written follow-up questions designed to replicate real interview flow.

💬 Interactive Chat UI


Smooth chat-style interface


Bot asks questions


User answers


Automatic scrolling


Clean modern UI with cards, gradients & shadows



🎤 Speech-to-Text (Voice Input)


Uses browser SpeechRecognition API


Converts spoken answers to text


Auto inserts into chat


Works best on Chrome



📊 Final Interview Feedback
After 10 questions:


Strengths


Improvements


Suggestions


Overall summary


Feedback is automatically generated based on interview flow.

📁 Project Structure
interview-agent/
│
├── index.html          # Main UI with role selection and chat interface
├── script.js           # Interview logic, follow-up questions, STT, feedback
├── style.css           # (Optional) external styling if separated
├── firebase-config.js  # (Optional) for future Firebase integration
│
└── README.md


🛠️ Technologies Used
Frontend


HTML5


CSS3


JavaScript


Web Speech API (SpeechRecognition)


Vercel (Hosting)


Backend (optional future upgrade)
If expanded with LLM or Firebase:


Groq / OpenAI


Firebase Authentication


Firestore Database


Vercel Serverless API


(Current version works fully on predefined questions.)

🔧 How to Run Locally


Clone the repo:


git clone https://github.com/YOUR-USERNAME/interview-practice-partner.git



Open the folder:


cd interview-practice-partner



Open index.html in Chrome.


No build steps required.

🌐 Deployment (Vercel)
To deploy manually:
npm install -g vercel
vercel

Or connect GitHub → automatic CI/CD deployment.

🖼️ Screenshots
(Add here once deployed)
/screenshots
  ├── ui.png
  ├── chat.png
  ├── feedback.png


📌 Future Enhancements


AI-powered dynamic follow-up questions


Personalized scoring


Resume upload + ATS analysis


Saving interview history


Multi-round interviews


Mobile app version



🙌 Acknowledgements
Built as part of the Eightfold AI Interview Assignment.
Created with passion to help candidates practice and improve interview performance.

⭐ Support
If you like this project, please give it a star ⭐ on GitHub!

Let me know if you want:


Badges (Vercel, Firebase, Tech Stacks)


A GitHub project banner


A GIF demo preview


I can generate them too!
