# 🏛️ Architecture & Deployment Guide

## System Architecture

### Microservices Overview

```
┌─────────────────────────────────────────────────────┐
│           CLIENT LAYER (React/Web/Mobile)           │
└────────────────┬────────────────────────────────────┘
                 │ REST API / WebSocket
┌────────────────▼────────────────────────────────────┐
│        API GATEWAY & LOAD BALANCER (Optional)       │
└────────────────┬────────────────────────────────────┘
                 │
    ┌────────────┼────────────┐
    │            │            │
    ▼            ▼            ▼
┌────────┐ ┌──────────┐ ┌─────────────┐
│ Auth   │ │Challenge │ │Opportunities│
│Service │ │Service   │ │ Service     │
└────┬───┘ └────┬─────┘ └─────┬───────┘
     │          │              │
     └──────────┼──────────────┘
                │
     ┌──────────┼──────────┐
     ▼          ▼          ▼
  ┌───────┐ ┌──────┐ ┌──────────┐
  │MongoDB│ │Redis │ │Message Q │
  │       │ │ Cache│ │ (RabbitMQ)
  └───────┘ └──────┘ └──────────┘
```

---

## Data Flow

### Authentication Flow
```
User Input
    ↓
Form Validation (Frontend)
    ↓
POST /api/auth/login
    ↓
AuthController.login()
    ↓
AuthService.login(email, password)
    ↓
MongoDB: Query User by Email
    ↓
bcryptjs: Compare Password
    ↓
Generate JWT Token
    ↓
Return Token + User Data
    ↓
Store in localStorage
    ↓
Redirect to Dashboard
```

### Challenge Submission Flow
```
User Submits Solution
    ↓
POST /challenges/:id/submit
    ↓
ChallengeController.submitChallenge()
    ↓
ChallengeService.evaluate()
    ↓
Calculate XP Earned
    ↓
Update User Level
    ↓
Add to Completed Challenges
    ↓
Return Success + XP Earned
    ↓
Update Frontend UI
```

### Sahayak Call Flow
```
User Calls Sahayak Number
    ↓
Asterisk PBX Receives Call
    ↓
POST /sahayak/incoming
    ↓
Create CallLog Entry in MongoDB
    ↓
Initialize STT/TTS/LLM
    ↓
User Speaks
    ↓
Whisper STT: Audio → Text
    ↓
Ollama LLM: Generate Response
    ↓
Coqui TTS: Response → Audio
    ↓
User Hears Response
    ↓
POST /sahayak/process-voice (for transcript)
    ↓
Update CallLog with Conversation
    ↓
Repeat until call ends
```

---

## Deployment Strategies

### Development Deployment
```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm run dev
```

### Staging Deployment

**Using Docker Compose:**

```yaml
version: '3.9'

services:
  mongodb:
    image: mongo:7.0
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/margadarshak
      - NODE_ENV=staging
    depends_on:
      - mongodb

  frontend:
    build: ./frontend
    ports:
      - "80:3000"
    environment:
      - REACT_APP_API_URL=http://localhost:5000

volumes:
  mongo_data:
```

Run:
```bash
docker-compose up -d
```

### Production Deployment

#### Option 1: AWS EC2

**Step 1: Launch EC2 Instance**
- AMI: Ubuntu 22.04 LTS
- Type: t3.medium (4GB RAM, 2 vCPU)
- Security: Open ports 80, 443, 5000

**Step 2: Install Dependencies**
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install nodejs npm mongodb-org nginx -y

# Enable MongoDB service
sudo systemctl enable mongod
sudo systemctl start mongod
```

**Step 3: Deploy Application**
```bash
git clone https://github.com/your-repo/margadarshak
cd margadarshak-webb/backend

# Install and build
npm ci --only=production
npm run build

# Start with PM2 (process manager)
npm install -g pm2
pm2 start server.js --name "margadarshak-api"
pm2 startup
pm2 save
```

**Step 4: Setup Frontend**
```bash
cd ../frontend
npm ci --only=production
npm run build

# Copy to nginx
sudo cp -r dist /var/www/margadarshak
```

**Step 5: Configure Nginx**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        root /var/www/margadarshak;
        try_files $uri /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Step 6: Enable HTTPS**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

#### Option 2: AWS Elastic Beanstalk

```bash
# Create Elastic Beanstalk app
eb init -p node.js-18 margadarshak

# Create environment
eb create production-env

# Deploy
eb deploy
```

#### Option 3: DigitalOcean App Platform

1. Connect GitHub repository
2. Configure build & run commands:
   ```
   Build: npm install && npm run build
   Run: npm start
   ```
3. Set environment variables
4. Deploy automatically

---

## Scaling Considerations

### Horizontal Scaling

```
┌──────────────────────────────────────┐
│      Load Balancer (NGINX/HAProxy)   │
└────────────────┬─────────────────────┘
       ┌─────────┼─────────┐
       ▼         ▼         ▼
    Backend1  Backend2  Backend3
    (5000)    (5001)    (5002)
       │         │         │
       └─────────┼─────────┘
               │
         ┌─────▼─────┐
         │  MongoDB  │
         │(Replica)  │
         └───────────┘
```

**Steps:**
1. Run multiple backend instances on different ports
2. Setup load balancer to distribute requests
3. Use MongoDB Replica Set for data consistency
4. Implement Redis caching for frequently accessed data

### Database Optimization

```javascript
// Create indexes for faster queries
db.users.createIndex({ email: 1 });
db.challenges.createIndex({ category: 1, difficulty: 1 });
db.opportunities.createIndex({ deadline: -1 });
db.calllogs.createIndex({ userId: 1, createdAt: -1 });
```

---

## Monitoring & Logging

### Application Monitoring

```javascript
// backend/src/config/monitoring.js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

module.exports = logger;
```

### Health Checks

```bash
# Endpoint: /health
curl http://localhost:5000/health

# Response:
{
  "status": "API is running ✅",
  "mongodb": "connected",
  "ollama": "available",
  "uptime": 3600
}
```

---

## Disaster Recovery

### Database Backup

```bash
# Automated daily backup
0 2 * * * mongodump --uri="mongodb://localhost:27017/margadarshak" --out=/backups/$(date +\%Y\%m\%d)

# Restore
mongorestore --uri="mongodb://localhost:27017/margadarshak" /backups/20260515
```

### Application Backup
```bash
# Backup entire application
tar -czf margadarshak-backup-$(date +%Y%m%d).tar.gz /app

# Upload to S3
aws s3 cp margadarshak-backup-*.tar.gz s3://your-bucket/backups/
```

---

## Performance Optimization

### Frontend
- Lazy load components
- Optimize images
- Implement code splitting
- Cache API responses

### Backend
- Use database indexes
- Implement caching (Redis)
- Batch operations
- Optimize queries

### Infrastructure
- Use CDN for static files
- Enable gzip compression
- Implement rate limiting
- Use async/await for I/O operations

---

## Security Checklist

- [ ] Enable HTTPS/SSL
- [ ] Use strong JWT secret
- [ ] Implement rate limiting
- [ ] Validate all inputs
- [ ] Use parameterized queries
- [ ] Implement CORS properly
- [ ] Add helmet middleware
- [ ] Use environment variables for secrets
- [ ] Enable MongoDB authentication
- [ ] Regular security updates
- [ ] Implement audit logging
- [ ] Use VPN for admin access

---

## CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy Margadarshak

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run tests
        run: npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to production
        run: |
          ssh production@your-server.com 'cd /app && git pull && npm install && pm2 restart all'
```

---

## Support & Troubleshooting

### Common Issues

**MongoDB Connection Error:**
```
Solution: Check MONGODB_URI in .env, ensure mongod is running
```

**Port Already in Use:**
```bash
lsof -i :5000
kill -9 <PID>
```

**CORS Error:**
```javascript
// Check frontend URL in backend/src/middleware/security.js
corsOptions = {
  origin: 'http://localhost:5173'  // Update to your domain
}
```

**Memory Leak:**
```bash
# Monitor memory usage
free -h
ps aux | grep node

# Use node debugger
node --inspect server.js
```

---

*For more deployment strategies and advanced configurations, contact the development team.*
