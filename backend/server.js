const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const { connectDB } = require('./src/config/database');
const securityMiddleware = require('./src/middleware/security');
const { errorHandler } = require('./src/middleware/auth');

// Import routes
const authRoutes = require('./src/routes/authRoutes');
const challengeRoutes = require('./src/routes/challengeRoutes');
const opportunitiesRoutes = require('./src/routes/opportunitiesRoutes');
const aiRoutes = require('./src/routes/aiRoutes');
const sahayakRoutes = require('./src/routes/sahayakRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const platformRoutes = require('./src/routes/platformRoutes');

const app = express();

const apiManifest = [
  { method: 'GET', path: '/health' },
  { method: 'POST', path: '/api/auth/register' },
  { method: 'POST', path: '/api/auth/login' },
  { method: 'GET', path: '/api/auth/profile' },
  { method: 'PUT', path: '/api/auth/profile' },
  { method: 'GET', path: '/api/challenges' },
  { method: 'GET', path: '/api/challenges/:id' },
  { method: 'POST', path: '/api/challenges' },
  { method: 'POST', path: '/api/challenges/:challengeId/submit' },
  { method: 'POST', path: '/api/challenges/:challengeId/bookmark' },
  { method: 'GET', path: '/api/opportunities/internships' },
  { method: 'GET', path: '/api/opportunities/jobs' },
  { method: 'GET', path: '/api/opportunities/hackathons' },
  { method: 'GET', path: '/api/opportunities/scholarships' },
  { method: 'GET', path: '/api/opportunities/stats' },
  { method: 'POST', path: '/api/ai/message' },
  { method: 'POST', path: '/api/ai/analyze-skills' },
  { method: 'POST', path: '/api/ai/translate' },
  { method: 'POST', path: '/api/ai/roadmap-generate' },
  { method: 'GET', path: '/api/ai/offline-status' },
  { method: 'POST', path: '/api/sahayak/incoming' },
  { method: 'POST', path: '/api/sahayak/process-voice' },
  { method: 'POST', path: '/api/sahayak/end-call' },
  { method: 'POST', path: '/api/sahayak/escalate' },
  { method: 'GET', path: '/api/sahayak/call-history' },
  { method: 'GET', path: '/api/admin/settings' },
  { method: 'GET', path: '/api/platform/features' },
  { method: 'GET', path: '/api/platform/overview' },
];

const printApiManifest = () => {
  console.log('\n🚀 Available backend APIs');
  apiManifest.forEach(({ method, path }) => {
    console.log(`  ${method.padEnd(6)} ${path}`);
  });
  console.log('');
};

// ============ MIDDLEWARE ============
app.use(...securityMiddleware);
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use((req, res, next) => {
  const startedAt = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - startedAt;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
  });

  next();
});

// Connect to database
connectDB();

// ============ HEALTH CHECK ============
app.get('/health', (req, res) => {
  res.json({ status: 'API is running ✅' });
});

// ============ ROUTES ============
app.use('/api/auth', authRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/opportunities', opportunitiesRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/sahayak', sahayakRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/platform', platformRoutes);

// ============ 404 HANDLER ============
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ============ ERROR HANDLER ============
app.use(errorHandler);

// ============ START SERVER ============
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   🌍 MARGADARSHAK BACKEND SERVER 🌍   ║
║   Port: ${PORT}                      
║   Environment: ${process.env.NODE_ENV || 'development'}
╚════════════════════════════════════════╝
  `);

  printApiManifest();
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Please stop the running process and try again.`);
    console.error('   Kill it with: lsof -ti :5000 | xargs kill -9');
    console.error('   Or: fuser -k 5000/tcp');
    process.exit(1);
  }

  console.error('❌ Server startup error:', error.message);
  process.exit(1);
});

module.exports = app;
