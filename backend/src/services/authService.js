const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const User = require('../models/User');

/**
 * Authentication Service
 */
class AuthService {
  /**
   * Register a new user
   */
  static async register(userData) {
    try {
      const { name, email, password, age, userType } = userData;

      // Check if user exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User already exists');
      }

      // Hash password
      const hashedPassword = await bcryptjs.hash(password, 10);

      // Create user
      const user = new User({
        name,
        email,
        password: hashedPassword,
        age,
        userType: userType || 'student',
      });

      await user.save();

      return this.generateToken(user);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Login user
   */
  static async login(email, password) {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('User not found');
      }

      const isPasswordValid = await bcryptjs.compare(password, user.password);

      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }

      // Update last login
      user.lastLogin = new Date();
      await user.save();

      return this.generateToken(user);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Generate JWT token
   */
  static generateToken(user) {
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        userType: user.userType,
        age: user.age,
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        age: user.age,
      },
    };
  }

  /**
   * Verify token
   */
  static async verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  /**
   * Update user profile
   */
  static async updateProfile(userId, updateData) {
    try {
      const user = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
        runValidators: true,
      });

      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthService;
