# 🚀 Quick Start Guide

## Installation & Setup (5 minutes)

### Step 1: Clone & Navigate
```bash
git clone https://github.com/your-repo/margadarshak
cd margadarshak-webb
```

### Step 2: Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update .env with MongoDB URI and other config

# Start server
npm run dev
```

**Expected Output:**
```
╔════════════════════════════════════════╗
║   🌍 MARGADARSHAK BACKEND SERVER 🌍   ║
║   Port: 5000                      
║   Environment: development
╚════════════════════════════════════════╝
```

### Step 3: Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Expected Output:**
```
  VITE v5.0.0  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### Step 4: Access Application
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/health

---

## 🧪 Testing

### Health Check
```bash
curl http://localhost:5000/health
# Response: { "status": "API is running ✅" }
```

### Test Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "age": 16,
    "userType": "student"
  }'
```

### Test Challenges API
```bash
curl http://localhost:5000/api/challenges
```

---

## 📦 Database Setup (MongoDB)

### Local MongoDB
```bash
# Start MongoDB service
mongod

# Verify connection
mongo
> use margadarshak
> show collections
```

### MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

---

## 🤖 Offline AI Setup (Optional)

### Ollama
```bash
# Download from https://ollama.ai
# Or install via package manager

# Pull a small model
ollama pull tinyllama

# Start Ollama (runs on http://localhost:11434)
ollama serve
```

### Whisper (STT)
```bash
pip install openai-whisper
# First run will download model automatically
```

### Coqui TTS
```bash
pip install TTS
# Or use pre-built TTS server
```

---

## 🌐 Accessing Features

### As a Student
1. Go to http://localhost:5173
2. Click "Get Started"
3. Register as Student (Age 13-17)
4. Access dashboard with challenges and resources

### As a Professional
1. Register as Professional (Age 18+)
2. Access internships, jobs, hackathons
3. Get career guidance from AI

### Sahayak (AI Calling)
1. Go to http://localhost:5173/sahayak
2. Select language
3. Click "Call Sahayak Now"
4. (Requires Asterisk setup for real calls)

---

## 📊 Default Credentials (Demo)

```
Email: demo@margadarshak.in
Password: demo123
```

(Update in production!)

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
lsof -i :5000

# Check MongoDB connection
npm run dev
# Look for connection error
```

### Frontend shows blank page
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### API calls fail
```bash
# Check CORS configuration
# Verify frontend URL in backend .env
# Check network tab in browser dev tools
```

### Offline AI not working
```bash
# Verify Ollama is running
curl http://localhost:11434/api/tags

# Check LLM configuration in .env
# Verify model is pulled
ollama list
```

---

## 📚 Next Steps

1. **Customize branding:** Update colors in `tailwind.config.js`
2. **Add real data:** Seed database with real challenges/opportunities
3. **Deploy:** Follow deployment guide in main README
4. **Enable Asterisk:** Setup PBX for calling system
5. **Setup scraping:** Configure web scrapers for real job data

---

## 🎯 Project Structure Tour

```
Backend Routes:
/api/auth         → User authentication
/api/challenges   → Educational challenges
/api/opportunities → Jobs, internships, hackathons
/api/ai           → AI chat and analysis
/api/sahayak      → Calling system
/api/admin        → Admin settings

Frontend Pages:
/                 → Landing page
/login            → Login page
/register         → Registration
/dashboard        → Main dashboard
/sahayak          → Calling interface
```

---

## 💡 Tips

- **Enable Hot Reload:** Frontend auto-reloads on file changes
- **Backend Restart:** Manually restart for config changes
- **Check Logs:** Watch console for detailed error messages
- **Database:** Use MongoDB Compass for easy data management
- **Test Endpoints:** Use Postman or Insomnia for API testing

---

## 🎉 Success!

Your Margadarshak instance is now running! Navigate to http://localhost:5173 and start exploring.

For more details, see the main [README.md](../README.md)
