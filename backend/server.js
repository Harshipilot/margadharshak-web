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

const app = express();

// ============ MIDDLEWARE ============
app.use(...securityMiddleware);
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

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

// ============ 404 HANDLER ============
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ============ ERROR HANDLER ============
app.use(errorHandler);

// ============ START SERVER ============
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   🌍 MARGADARSHAK BACKEND SERVER 🌍   ║
║   Port: ${PORT}                      
║   Environment: ${process.env.NODE_ENV || 'development'}
╚════════════════════════════════════════╝
  `);
});

module.exports = app;
