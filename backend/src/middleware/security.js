/**
 * CORS and security middleware
 */
const cors = require('cors');
const helmet = require('helmet');

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
};

const securityMiddleware = [
  helmet(),
  cors(corsOptions),
  // Additional security headers
  (req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  },
];

module.exports = securityMiddleware;
