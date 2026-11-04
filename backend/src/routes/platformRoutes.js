const express = require('express');

const router = express.Router();

const platformFeatures = {
  overview: {
    name: 'Margadarshak',
    tagline: 'AI-powered career guidance and opportunity platform',
    status: 'active',
    modules: [
      'Authentication',
      'Challenges',
      'Internships',
      'Jobs',
      'Hackathons',
      'Scholarships',
      'AI Career Guidance',
      'Offline AI Support',
      'Sahayak Voice Assistant',
      'Admin Dashboard'
    ],
    highlights: [
      'Personalized AI roadmap generation',
      'Career opportunity aggregation',
      'Gamified challenge system',
      'Voice-driven accessibility support',
      'Low-connectivity offline capabilities'
    ]
  },
  features: [
    {
      id: 'ai-guidance',
      name: 'AI Career Guidance',
      description: 'Smart recommendations and personalized career assistance.'
    },
    {
      id: 'offline-ai',
      name: 'Offline AI Support',
      description: 'Local AI processing support for low-connectivity environments.'
    },
    {
      id: 'career-tracker',
      name: 'Opportunity Dashboard',
      description: 'Track internships, jobs, hackathons, and scholarships in one place.'
    },
    {
      id: 'voice-assistant',
      name: 'Sahayak Voice Assistant',
      description: 'Voice-guided guidance with call handling and escalation support.'
    },
    {
      id: 'skill-analytics',
      name: 'Skill Analysis',
      description: 'Analyze skills and provide improvement recommendations.'
    },
    {
      id: 'admin-console',
      name: 'Admin Controls',
      description: 'Manage platform settings and operational insights.'
    }
  ]
};

router.get('/overview', (req, res) => {
  res.json({
    success: true,
    data: platformFeatures.overview
  });
});

router.get('/features', (req, res) => {
  res.json({
    success: true,
    data: platformFeatures.features
  });
});

module.exports = router;
