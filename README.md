# 🏥 PRANAVA AI — Intelligent Healthcare Platform

<div align="center">

![PRANAVA AI Banner](https://img.shields.io/badge/PRANAVA-AI%20Healthcare-0891B2?style=for-the-badge&logo=heart&logoColor=white)
&nbsp;
![Status](https://img.shields.io/badge/Status-Active-22D3EE?style=for-the-badge)
&nbsp;
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Advanced AI consultations · Real-time diagnostics · Personalised treatment guidance**

[Features](#-features) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [Screenshots](#-screenshots) · [Environment Setup](#-environment-variables)

</div>

---

## 📖 Overview

PRANAVA AI is a full-stack AI-powered healthcare platform that brings intelligent medical assistance to anyone, anywhere — 24/7. It combines a conversational AI doctor, cough pattern analysis using MATLAB, real doctor consultation booking, a personal health dashboard, and hospital locator into one seamless experience.

> ⚠️ **Medical Disclaimer**: PRANAVA AI is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider.

---

## ✨ Features

### 🤖 AI Health Chatbot
- Conversational AI powered by **Google Gemini**
- Symptom analysis, wellness guidance, medication information
- Persistent chat history with session management
- Available 24 hours a day, 7 days a week

### 🫁 Cough Analysis (MATLAB Integration)
- Record or upload cough audio directly in the browser
- AI analyses acoustic patterns and frequency signatures
- Identifies respiratory conditions (bronchitis, asthma, etc.)
- No hardware required — works in any modern browser

### 👨‍⚕️ Doctor Consultation
- AI-powered symptom triage
- Connect with verified, licensed doctors via **Google Places API**
- In-person visits, specialist referrals, trusted second opinions
- Real-time doctor availability

### 🏥 Nearby Hospitals
- Live map integration using **Google Maps**
- Distance info and one-tap directions
- Locates hospitals, clinics, and emergency centres

### 📊 Health Dashboard
- Personal health records and history
- Vitals tracking over time
- AI-generated health insights
- Medication reminders

### 🔐 Authentication System
- Secure JWT-based login / register
- bcrypt password hashing
- Session management with express-session
- Protected routes via auth middleware

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **Vanilla HTML / CSS / JS** | All 11 pages, no framework |
| **WebGL (GLSL)** | Plasma background animation on hero |
| **Roboto Flex** (variable font) | Mouse-proximity weight morphing on headings |
| **IntersectionObserver API** | Scroll-triggered character animations |
| **Canvas API** | Floating particle background on chat/cough pages |
| **localStorage** | Persistent user feedback / reviews |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js + Express 5** | REST API server |
| **MongoDB + Mongoose** | Database for users, records, doctors |
| **Google Gemini AI** | AI chat & diagnosis engine |
| **MATLAB** | Cough frequency analysis |
| **JWT + bcryptjs** | Authentication & password security |
| **Google Places API** | Real doctor & hospital search |
| **Multer** | Audio file upload handling |

---

## 📁 Project Structure

```
PRANAVA-AI/
├── FRONTEND/                  # All HTML pages + shared JS/CSS
│   ├── welcome.html           # Landing page (hero + animations + feedback)
│   ├── ai-chat.html           # AI chatbot interface
│   ├── ai-doctor.html         # AI doctor consultation
│   ├── indexcough.html        # Cough analysis recorder
│   ├── doctor-options.html    # Choose AI or real doctor
│   ├── online-consultation.html  # Book a real doctor
│   ├── hospital.html          # Nearby hospitals map
│   ├── health-dashboard.html  # Personal health dashboard
│   ├── login.html             # Authentication
│   ├── register.html          # Registration
│   ├── doctor-register.html   # Doctor registration
│   ├── bento-glow.css/js      # Purple card glow effect
│   ├── gooey-buttons.css/js   # Pill button + particle burst
│   └── particles-bg.js        # Floating particle canvas
│
├── BACKEND/                   # Node.js API server
│   ├── server.js              # Express app entry point
│   ├── config.js              # Environment config
│   ├── database.js            # MongoDB connection
│   ├── auth-middleware.js     # JWT verification
│   ├── models/                # Mongoose schemas
│   ├── google-places-doctors.js  # Doctor search integration
│   ├── mongodb-doctors.js     # Doctor DB operations
│   ├── cough_analysis.m       # MATLAB cough analysis
│   ├── cough_analysis_wrapper.m  # MATLAB wrapper script
│   └── .env                   # Environment variables (not committed)
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [MATLAB](https://www.mathworks.com/products/matlab.html) R2023b+ (optional, for cough analysis)
- Google API Keys (Places, Gemini)

### 1. Clone the Repository
```bash
git clone https://github.com/mariyappamadhukumar-cmyk/PRANAVA-AI.git
cd PRANAVA-AI
```

### 2. Install Backend Dependencies
```bash
cd BACKEND
npm install
```

### 3. Configure Environment Variables
Create a `.env` file inside the `BACKEND/` folder:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/health-ai
GEMINI_API_KEY=your_gemini_api_key_here
GOOGLE_PLACES_API_KEY=your_google_places_key_here
JWT_SECRET=your_jwt_secret_here
MATLAB_PATH=C:\Program Files\MATLAB\R2025b\bin\matlab.exe
```

### 4. Start the Backend Server
```bash
cd BACKEND
npm run dev       # development (nodemon)
# or
npm start         # production
```

### 5. Open the Frontend
Serve the `FRONTEND/` folder with any static server:
```bash
# Using VS Code Live Server extension (recommended)
# Or using npx:
npx serve FRONTEND
```

Then open `http://localhost:3000/welcome.html` (or whatever port the server uses).

---

## 🔑 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `MONGODB_URI` | ✅ | MongoDB connection string |
| `GEMINI_API_KEY` | ✅ | Google Gemini AI API key — [Get it here](https://makersuite.google.com/app/apikey) |
| `GOOGLE_PLACES_API_KEY` | ✅ | Google Places API key for doctor/hospital search |
| `JWT_SECRET` | ✅ | Secret string for signing JWT tokens |
| `PORT` | ❌ | Server port (default: 5000) |
| `MATLAB_PATH` | ❌ | Full path to MATLAB executable |

---

## 🎨 UI & Design System

All pages share a consistent dark design system:

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#080808` | Page background |
| `--surface` | `#1a1a1a` | Cards, inputs |
| `--teal` | `#0891B2` | Primary accent |
| `--teal-lt` | `#22D3EE` | Highlights, glows |
| `--muted` | `rgba(255,255,255,.5)` | Body text |

**Effects active across the platform:**
- 🟣 **Bento Glow** — purple border glow follows mouse over cards
- 💊 **Gooey Buttons** — pill buttons with teal particle burst on click
- 🌊 **Plasma WebGL** — animated background in the hero section
- ✨ **SplitText** — char-by-char fly-in on scroll for all headings
- 🔤 **Variable Proximity** — Roboto Flex weight morphs near mouse cursor
- 🫧 **Particles** — floating dot network on chat/doctor/cough pages

---

## 📸 Screenshots

| Page | Description |
|---|---|
| **Welcome** | Dark hero with plasma bg, animated headings, how it works, feedback |
| **AI Chat** | Full chat UI with particles background, dark inputs |
| **Cough Analysis** | Audio recorder + real-time frequency visualiser |
| **Doctor Options** | Glassmorphism cards — AI vs Real Doctor |
| **Dashboard** | Health stats, records, vitals tracking |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute.

---

<div align="center">

Made with ❤️ by [Madhukumar](https://github.com/mariyappamadhukumar-cmyk)

**PRANAVA AI** — Healthcare for everyone, not just those who can afford it.

</div>
