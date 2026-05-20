const express = require('express');
const { authMiddleware, authorize } = require('../middleware/auth');
const AdminSettings = require('../models/AdminSettings');

const router = express.Router();

/**
 * Get all settings
 */
router.get('/settings', authMiddleware, authorize('admin'), async (req, res) => {
  try {
    const settings = await AdminSettings.find().select('-password');

    res.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Update setting
 */
router.put('/settings/:key', authMiddleware, authorize('admin'), async (req, res) => {
  try {
    const { key } = req.params;
    const { settingValue, description } = req.body;

    let setting = await AdminSettings.findOne({ settingKey: key });

    if (!setting) {
      setting = new AdminSettings({
        settingKey: key,
        settingValue,
        description,
        lastModifiedBy: req.user.id,
      });
    } else {
      setting.settingValue = settingValue;
      setting.description = description;
      setting.lastModifiedBy = req.user.id;
    }

    await setting.save();

    res.json({
      success: true,
      data: setting,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * Get dashboard stats
 */
router.get('/stats', authMiddleware, authorize('admin'), async (req, res) => {
  try {
    const User = require('../models/User');
    const Challenge = require('../models/Challenge');

    const totalUsers = await User.countDocuments();
    const totalChallenges = await Challenge.countDocuments();
    const students = await User.countDocuments({ userType: 'student' });
    const adults = await User.countDocuments({ userType: 'adult' });

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalChallenges,
        students,
        adults,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
