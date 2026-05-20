const AuthService = require('../services/authService');
const User = require('../models/User');

/**
 * Authentication Controller
 */
class AuthController {
  static async register(req, res) {
    try {
      const { name, email, password, confirmPassword, age, userType } = req.body;

      // Validation
      if (!name || !email || !password || !age) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
      }

      if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
      }

      const result = await AuthService.register({ name, email, password, age, userType });

      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(400).json({ error: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
      }

      const result = await AuthService.login(email, password);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(401).json({ error: error.message });
    }
  }

  static async getProfile(req, res) {
    try {
      const user = await User.findById(req.user.id);
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateProfile(req, res) {
    try {
      const userId = req.user.id;
      const updateData = req.body;

      // Don't allow updating certain fields
      delete updateData.password;
      delete updateData.email;
      delete updateData.userType;

      const user = await AuthService.updateProfile(userId, updateData);

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = AuthController;
