# 🌍 Margadarshak – AI-Powered Career & Guidance Platform

<div align="center">

<!-- MAIN DASHBOARD IMAGE -->
<p align="center">
  <img width="1920" height="1037" alt="Main Dashboard" src="https://github.com/user-attachments/assets/908488f2-f938-43bf-9c63-7aba26e9d717" width="100%" />
</p>

![Tech Stack](https://img.shields.io/badge/MERN-Stack-green?style=for-the-badge)
![AI Powered](https://img.shields.io/badge/AI-Powered-blue?style=for-the-badge)
![Offline Support](https://img.shields.io/badge/Offline-AI-orange?style=for-the-badge)
![Open Source](https://img.shields.io/badge/Open%20Source-Community-red?style=for-the-badge)

### 🚀 Empowering Students & Professionals Through AI, Opportunities & Offline Accessibility

</div>

---

# 📌 Overview

**Margadarshak** is a modern AI-powered guidance and opportunity platform designed to help students and professionals discover internships, jobs, hackathons, challenges, and career guidance in a single ecosystem.

The platform combines:

- 🌐 Web-based dashboard
- 🤖 AI-powered guidance system
- 📞 Voice-based assistant (**Sahayak**)
- 📴 Offline AI support
- 📚 Learning challenges & XP system
- 💼 Opportunity aggregation
- 🔐 Secure authentication system

The project is built using the **MERN Stack** with optional offline AI integrations like **Ollama**, **Whisper STT**, and **Coqui TTS**.

---

# ✨ Key Features

## 🎯 Smart Opportunity Platform
- Internship listings
- Hackathons
- Job opportunities
- Student-focused resources
- Professional career support

---

## 🤖 AI Career Assistant
- AI-powered career guidance
- Personalized suggestions
- Resume and growth recommendations
- Learning roadmap support

---

## 📞 Sahayak – Voice AI Assistant

<!-- SAHAYAK IMAGE -->
<p align="center">
  <img width="1920" height="1038" alt="Image" src="https://github.com/user-attachments/assets/0da91464-8485-4f0a-99ce-f5f5f1565d2b" alt="sahayak AI" />
</p>

An intelligent voice-based assistant designed for accessibility and offline usage.

### Features:
- 🎤 Speech-to-Text using Whisper
- 🧠 AI response generation with Ollama
- 🔊 Text-to-Speech using Coqui TTS
- 🌍 Multi-language support
- 📡 Future rural accessibility support
- ☎️ Asterisk PBX integration

---

## 📴 Offline AI Support
Margadarshak supports offline AI capabilities for low-connectivity regions.

### Includes:
- Ollama Local LLM
- Whisper STT
- Coqui TTS
- Local inference support
- Edge-compatible deployment

---

## 🏆 Gamified Learning System
- XP & level progression
- Challenge submission system
- Skill-building tasks
- Achievement tracking

---

## 🔐 Authentication & Security
- JWT Authentication
- Secure password hashing
- Protected APIs
- Role-based user system
- CORS & middleware security

---

## 📊 Dashboard System

<!-- SECOND DASHBOARD IMAGE -->
<p align="center">
 <p align="center">
  <img 
    src="https://github.com/user-attachments/assets/cb033c04-a407-4e5a-96c0-5a3b39556673"
    width="45%"
    alt="Dashboard Preview 1"
    style="display:inline-block; margin-right:10px;"
  />

  <img 
    src="https://github.com/user-attachments/assets/41210a79-337e-4331-8728-c5554f3a2544"
    width="45%"
    alt="Dashboard Preview 2"
    style="display:inline-block;"
  />
</p>
</p>

### Student Dashboard
- Challenges
- Learning resources
- Internships
- Career recommendations

### Professional Dashboard
- Jobs
- Advanced opportunities
- Networking
- Guidance system

---

# 🏗️ System Architecture

```text
Client Layer (React / Web / Mobile)
            │
            ▼
 REST API & WebSocket Layer
            │
            ▼
 Backend Services (Node.js + Express)
 ├── Authentication Service
 ├── Challenge Service
 ├── Opportunities Service
 ├── AI Service
 └── Sahayak Voice Service
            │
            ▼
 Database & Infrastructure
 ├── MongoDB
 ├── Redis Cache
 └── RabbitMQ Queue
```

---

# ⚡ Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS

## Backend
- Node.js
- Express.js

## Database
- MongoDB
- Redis

## AI Stack
- Ollama
- Whisper
- Coqui TTS

## Deployment
- Docker
- AWS EC2
- Nginx
- PM2

---

# 📂 Project Structure

```bash
margadarshak/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── assets/
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── middleware/
│   └── config/
│
├── ai/
│   ├── whisper/
│   ├── ollama/
│   └── tts/
│
└── README.md
```

---

# 🚀 Installation Guide

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-repo/margadarshak
cd margadarshak
```

---

## 2️⃣ Backend Setup

```bash
cd backend

npm install

cp .env.example .env

npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 🗄️ MongoDB Setup

## Local MongoDB

```bash
mongod
```

## MongoDB Atlas
1. Create MongoDB Atlas account
2. Create cluster
3. Copy connection string
4. Add it inside `.env`

```env
MONGODB_URI=your_connection_string
```

---

# 🤖 Offline AI Setup

## Install Ollama

```bash
ollama pull tinyllama
ollama serve
```

---

## Install Whisper

```bash
pip install openai-whisper
```

---

## Install Coqui TTS

```bash
pip install TTS
```

---

# 🔥 API Endpoints

## Authentication
```bash
/api/auth
```

## Challenges
```bash
/api/challenges
```

## Opportunities
```bash
/api/opportunities
```

## AI Services
```bash
/api/ai
```

## Sahayak
```bash
/api/sahayak
```

---

# 📞 Sahayak Call Flow

```text
User Calls Sahayak
        ↓
Asterisk PBX
        ↓
Speech-to-Text (Whisper)
        ↓
AI Processing (Ollama)
        ↓
Text-to-Speech (Coqui)
        ↓
Voice Response to User
```

---

# 🧪 Testing

## Health Check

```bash
curl http://localhost:5000/health
```

---

## Test API

```bash
curl http://localhost:5000/api/challenges
```

---

# 🐳 Docker Deployment

```bash
docker-compose up -d
```

---

# ☁️ Production Deployment

Supported platforms:

- AWS EC2
- DigitalOcean
- Elastic Beanstalk
- Docker Containers

---

# 📈 Scaling Features

- Horizontal backend scaling
- Redis caching
- MongoDB replication
- Load balancing
- Async queue processing

---

# 🔒 Security Features

- JWT Authentication
- Password Hashing
- Rate Limiting
- HTTPS Support
- Secure Middleware
- Environment Variable Protection

---

# 🌟 Future Enhancements

- 📱 Mobile Application
- 🌍 Rural AI Communication
- 🛰️ Offline Syncing
- 🧠 Advanced AI Models
- 📡 LoRa Communication Support
- 🎓 Smart Skill Recommendation Engine

---

# 👨‍💻 Development Commands

## Backend

```bash
npm run dev
```

## Frontend

```bash
npm run dev
```

## Production Build

```bash
npm run build
```

---

# 🤝 Contribution

Contributions are welcome!

```bash
Fork → Clone → Create Branch → Commit → Push → Pull Request
```

---

# 📜 License

This project is licensed under the MIT License.

---

# 💡 Vision

> “Margadarshak aims to bridge the gap between opportunities, education, and accessibility using AI-powered technologies — even in low-connectivity environments.”

---

# ❤️ Built With Passion

Developed to empower:
- Students
- Rural communities
- Professionals
- Learners
- Innovators

---

<div align="center">

## 🌟 If you like this project, give it a star ⭐

</div>
