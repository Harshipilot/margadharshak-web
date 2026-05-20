const jwt = require('jsonwebtoken');

/**
 * Authentication middleware
 * Verifies JWT token and attaches user to request
 */
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

/**
 * Authorization middleware for specific user types
 */
const authorize = (...allowedTypes) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    if (!allowedTypes.includes(req.user.userType)) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    next();
  };
};

/**
 * Error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error('[ERROR]', err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  res.status(500).json({ error: 'Internal server error' });
};

module.exports = { authMiddleware, authorize, errorHandler };
