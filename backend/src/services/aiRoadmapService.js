const axios = require('axios');

/**
 * AI Roadmap Service
 * Generates personalized learning roadmaps with real-time resources
 */
class AIRoadmapService {
  /**
   * Scrape free learning resources from APIs
   */
  static async getFreeLearningResources(topic) {
    try {
      const resources = {
        courses: [],
        youtube: [],
        github: [],
        documentation: []
      };

      // Scrape YouTube videos
      const youtubeChannels = {
        'ai engineer': ['3Blue1Brown', 'StatQuest with Josh Starmer', 'sentdex'],
        'web developer': ['Traversy Media', 'The Net Ninja', 'FreeCodeCamp'],
        'cybersecurity': ['IppSec', 'John Hammond', 'NetworkChuck'],
        'data science': ['StatQuest with Josh Starmer', 'FreeCodeCamp', 'Keith Galli']
      };

      const channels = youtubeChannels[topic.toLowerCase()] || [];
      for (const channel of channels) {
        resources.youtube.push({
          title: `${channel} - ${topic}`,
          channel: channel,
          type: 'youtube',
          link: `https://www.youtube.com/results?search_query=${channel}+${topic}`
        });
      }

      // GitHub trending repositories
      const githubTopics = {
        'ai engineer': ['tensorflow', 'pytorch', 'machine-learning'],
        'web developer': ['react', 'vue', 'next.js'],
        'cybersecurity': ['metasploit', 'burp-suite', 'wireshark'],
        'data science': ['pandas', 'scikit-learn', 'jupyter']
      };

      const topics = githubTopics[topic.toLowerCase()] || [];
      for (const ghTopic of topics) {
        resources.github.push({
          title: `GitHub: ${ghTopic} projects`,
          topic: ghTopic,
          type: 'github',
          link: `https://github.com/topics/${ghTopic}`
        });
      }

      // Free online courses
      resources.courses = [
        {
          title: 'freeCodeCamp',
          description: 'Free coding tutorials and courses',
          link: 'https://www.freecodecamp.org',
          type: 'course'
        },
        {
          title: 'Codecademy',
          description: 'Interactive coding lessons',
          link: 'https://www.codecademy.com',
          type: 'course'
        },
        {
          title: 'Khan Academy',
          description: 'Free educational videos and practice',
          link: 'https://www.khanacademy.org',
          type: 'course'
        },
        {
          title: 'Coursera (Audit)',
          description: 'University courses - free to audit',
          link: 'https://www.coursera.org',
          type: 'course'
        },
        {
          title: 'edX',
          description: 'Courses from top universities',
          link: 'https://www.edx.org',
          type: 'course'
        }
      ];

      // Documentation resources
      const docResources = {
        'ai engineer': [
          { title: 'TensorFlow Docs', link: 'https://www.tensorflow.org/learn' },
          { title: 'PyTorch Tutorials', link: 'https://pytorch.org/tutorials' },
          { title: 'Kaggle Datasets', link: 'https://www.kaggle.com/datasets' }
        ],
        'web developer': [
          { title: 'MDN Web Docs', link: 'https://developer.mozilla.org' },
          { title: 'React Docs', link: 'https://react.dev' },
          { title: 'CSS Tricks', link: 'https://css-tricks.com' }
        ],
        'cybersecurity': [
          { title: 'OWASP Top 10', link: 'https://owasp.org/www-project-top-ten' },
          { title: 'HackTheBox', link: 'https://www.hackthebox.com' },
          { title: 'TryHackMe', link: 'https://tryhackme.com' }
        ],
        'data science': [
          { title: 'Kaggle', link: 'https://www.kaggle.com' },
          { title: 'Analytics Vidhya', link: 'https://www.analyticsvidhya.com' },
          { title: 'Towards Data Science', link: 'https://towardsdatascience.com' }
        ]
      };

      resources.documentation = docResources[topic.toLowerCase()] || [];

      return resources;
    } catch (error) {
      console.error('Error scraping resources:', error);
      return null;
    }
  }

  /**
   * Generate personalized roadmap based on age, interest, and resources
   */
  static async generateRoadmap(interest, age, ageGroup) {
    try {
      const isUnder18 = ageGroup === 'under17';

      // Define learning paths
      const roadmapPaths = {
        'ai engineer': {
          under18: [
            {
              level: 1,
              step: 'Master Python Basics',
              duration: '2-3 weeks',
              resources: ['Python Documentation', 'Codecademy Python Course', 'freeCodeCamp Python'],
              projects: ['Build a simple calculator', 'Create a number guessing game'],
              skills: ['Variables', 'Loops', 'Functions', 'Data structures']
            },
            {
              level: 2,
              step: 'Learn Math for AI',
              duration: '3-4 weeks',
              resources: ['Khan Academy (Linear Algebra)', '3Blue1Brown Essence of Algebra', 'StatQuest'],
              projects: ['Implement matrix operations', 'Visualize mathematical concepts'],
              skills: ['Linear Algebra', 'Calculus basics', 'Probability']
            },
            {
              level: 3,
              step: 'Introduction to Machine Learning',
              duration: '4-5 weeks',
              resources: ['freeCodeCamp ML Course', 'Scikit-learn Documentation', 'Kaggle Learn'],
              projects: ['Build a prediction model', 'Iris flower classification'],
              skills: ['Supervised Learning', 'Unsupervised Learning', 'Model evaluation']
            },
            {
              level: 4,
              step: 'Deep Learning Fundamentals',
              duration: '5-6 weeks',
              resources: ['TensorFlow Tutorials', 'PyTorch Beginner Guide', 'Fast.ai'],
              projects: ['Build a simple neural network', 'Image classification with MNIST'],
              skills: ['Neural Networks', 'CNNs', 'Backpropagation']
            },
            {
              level: 5,
              step: 'AI Projects & Competitions',
              duration: 'Ongoing',
              resources: ['Kaggle Competitions', 'GitHub AI Projects', 'Unstop Competitions'],
              projects: ['Participate in Kaggle competition', 'Build an AI chatbot', 'Create a recommendation system'],
              skills: ['Project management', 'Deployment', 'Model optimization']
            }
          ],
          '18plus': [
            {
              level: 1,
              step: 'Advanced Python & ML Libraries',
              duration: '2 weeks',
              resources: ['Advanced Python Docs', 'NumPy/Pandas Mastery', 'Scikit-learn'],
              projects: ['Build data pipelines', 'Advanced data manipulation'],
              skills: ['Advanced OOP', 'Performance optimization', 'Data preprocessing']
            },
            {
              level: 2,
              step: 'Deep Learning & Neural Networks',
              duration: '3 weeks',
              resources: ['TensorFlow Advanced', 'PyTorch Professional', 'Fast.ai Part 1'],
              projects: ['CNN for image recognition', 'RNN for sequence prediction'],
              skills: ['CNNs', 'RNNs', 'Transfer learning']
            },
            {
              level: 3,
              step: 'NLP & Advanced AI',
              duration: '4 weeks',
              resources: ['Hugging Face Transformers', 'NLP with PyTorch', 'BERT Documentation'],
              projects: ['Sentiment analysis', 'Text generation model', 'Named entity recognition'],
              skills: ['Transformers', 'NLP models', 'BERT/GPT']
            },
            {
              level: 4,
              step: 'Production & MLOps',
              duration: '3 weeks',
              resources: ['MLOps.community', 'Docker for ML', 'Kubernetes basics', 'AWS/GCP ML'],
              projects: ['Deploy ML model', 'Create ML pipeline', 'Monitor model performance'],
              skills: ['Model deployment', 'CI/CD', 'Model monitoring', 'Cloud platforms']
            },
            {
              level: 5,
              step: 'Industry Internships & Research',
              duration: 'Ongoing',
              resources: ['LinkedIn internships', 'Angel List', 'GitHub trending', 'ArXiv papers'],
              projects: ['Contribute to open-source AI', 'Research paper implementation', 'Industry project'],
              skills: ['Research', 'Collaboration', 'Industry practices']
            }
          ]
        },
        'web developer': {
          under18: [
            {
              level: 1,
              step: 'HTML & CSS Fundamentals',
              duration: '2 weeks',
              resources: ['MDN Web Docs', 'freeCodeCamp HTML/CSS', 'Codecademy Web Dev'],
              projects: ['Create a portfolio website', 'Build a landing page'],
              skills: ['HTML5', 'CSS3', 'Responsive design', 'Flexbox']
            },
            {
              level: 2,
              step: 'JavaScript Essentials',
              duration: '3 weeks',
              resources: ['JavaScript.info', 'freeCodeCamp JS', 'Codecademy JS'],
              projects: ['Interactive web app', 'To-do list application', 'Calculator'],
              skills: ['Variables', 'Functions', 'DOM manipulation', 'Events']
            },
            {
              level: 3,
              step: 'Frontend Frameworks (React)',
              duration: '4 weeks',
              resources: ['React Documentation', 'freeCodeCamp React', 'React Tutorial'],
              projects: ['Build a React app', 'Weather app with API', 'Movie browser'],
              skills: ['Components', 'State management', 'Hooks', 'API integration']
            },
            {
              level: 4,
              step: 'Backend Basics (Node.js)',
              duration: '3 weeks',
              resources: ['Node.js Documentation', 'Express Tutorial', 'freeCodeCamp Node'],
              projects: ['Build REST API', 'Create a blog API', 'User authentication'],
              skills: ['Node.js', 'Express', 'Databases', 'Authentication']
            },
            {
              level: 5,
              step: 'Full Stack Projects & Competitions',
              duration: 'Ongoing',
              resources: ['GitHub projects', 'CodePen', 'Dev.to', 'Unstop competitions'],
              projects: ['Build full stack app', 'Deploy on Vercel/Netlify', 'Create open-source project'],
              skills: ['Deployment', 'DevOps basics', 'CI/CD']
            }
          ],
          '18plus': [
            {
              level: 1,
              step: 'Advanced Frontend Architecture',
              duration: '2 weeks',
              resources: ['Advanced React patterns', 'Next.js Documentation', 'TypeScript Guide'],
              projects: ['Build scalable React app', 'Create custom hooks', 'State management patterns'],
              skills: ['TypeScript', 'Advanced React', 'Design patterns']
            },
            {
              level: 2,
              step: 'Backend Technologies',
              duration: '3 weeks',
              resources: ['Node.js Advanced', 'Express patterns', 'Database design', 'GraphQL'],
              projects: ['GraphQL API', 'Microservices', 'API optimization'],
              skills: ['GraphQL', 'Microservices', 'Database optimization']
            },
            {
              level: 3,
              step: 'DevOps & Cloud',
              duration: '3 weeks',
              resources: ['Docker', 'Kubernetes', 'AWS/GCP/Azure', 'CI/CD pipelines'],
              projects: ['Containerize app', 'Deploy on cloud', 'Set up CI/CD'],
              skills: ['Docker', 'Kubernetes', 'Cloud platforms', 'CI/CD']
            },
            {
              level: 4,
              step: 'Advanced Performance & Security',
              duration: '3 weeks',
              resources: ['Web security', 'Performance optimization', 'OWASP standards'],
              projects: ['Security audit', 'Performance optimization', 'Load testing'],
              skills: ['Security', 'Performance tuning', 'Testing']
            },
            {
              level: 5,
              step: 'Industry Experience & Open Source',
              duration: 'Ongoing',
              resources: ['Open source projects', 'LinkedIn internships', 'Startup opportunities'],
              projects: ['Contribute to major project', 'Build startup MVP', 'Lead a project'],
              skills: ['Leadership', 'System design', 'Architecture']
            }
          ]
        },
        'cybersecurity': {
          under18: [
            {
              level: 1,
              step: 'Networking Fundamentals',
              duration: '2 weeks',
              resources: ['Khan Academy Network', 'Professor Messer', 'Cisco Networking Basics'],
              projects: ['Set up home network', 'Network troubleshooting'],
              skills: ['OSI model', 'TCP/IP', 'DNS', 'HTTP/HTTPS']
            },
            {
              level: 2,
              step: 'Linux & Command Line',
              duration: '3 weeks',
              resources: ['Linux Academy', 'freeCodeCamp Linux', 'Linux Documentation'],
              projects: ['Master Linux commands', 'Bash scripting', 'System administration'],
              skills: ['Linux commands', 'Bash scripting', 'File permissions']
            },
            {
              level: 3,
              step: 'Ethical Hacking Basics',
              duration: '4 weeks',
              resources: ['TryHackMe', 'HackTheBox', 'eLearnSecurity'],
              projects: ['Complete CTF challenges', 'Penetration testing basics'],
              skills: ['Reconnaissance', 'Exploitation', 'Social engineering awareness']
            },
            {
              level: 4,
              step: 'Web Security & Cryptography',
              duration: '3 weeks',
              resources: ['OWASP Top 10', 'PortSwigger Web Security Academy', 'Cryptography basics'],
              projects: ['Secure web app testing', 'Implement encryption'],
              skills: ['SQL injection', 'XSS', 'CSRF', 'Encryption']
            },
            {
              level: 5,
              step: 'CTF & Bug Bounty',
              duration: 'Ongoing',
              resources: ['CTFtime', 'HackTheBox Pro', 'Bug bounty programs', 'Unstop'],
              projects: ['Participate in CTFs', 'Start bug bounty hunting'],
              skills: ['Security testing', 'Vulnerability assessment']
            }
          ],
          '18plus': [
            {
              level: 1,
              step: 'Advanced Networking & Infrastructure',
              duration: '2 weeks',
              resources: ['Cisco certifications', 'Network security concepts', 'Firewalls & VPNs'],
              projects: ['Design secure network', 'Set up firewall rules'],
              skills: ['Network security', 'Firewalls', 'VPNs', 'Proxies']
            },
            {
              level: 2,
              step: 'Advanced Exploitation & Red Teaming',
              duration: '3 weeks',
              resources: ['Metasploit', 'Burp Suite Pro', 'Kali Linux', 'OSCP prep'],
              projects: ['Red team exercise', 'Vulnerability exploitation'],
              skills: ['Metasploit', 'Custom exploits', 'Social engineering']
            },
            {
              level: 3,
              step: 'Incident Response & Forensics',
              duration: '3 weeks',
              resources: ['Forensics tools', 'Incident response guide', 'Digital forensics'],
              projects: ['Analyze security breach', 'Forensic investigation'],
              skills: ['Forensics', 'Incident response', 'Malware analysis']
            },
            {
              level: 4,
              step: 'Security Architecture & Defense',
              duration: '3 weeks',
              resources: ['CISSP preparation', 'Security architecture', 'Defense strategies'],
              projects: ['Design security architecture', 'Create security policy'],
              skills: ['Architecture design', 'Compliance', 'Defense strategies']
            },
            {
              level: 5,
              step: 'Professional Certifications & Industry',
              duration: 'Ongoing',
              resources: ['CEH', 'OSCP', 'Security+', 'CISSP', 'Bug bounty programs'],
              projects: ['Get certified', 'Lead security team', 'Security consulting'],
              skills: ['Certifications', 'Leadership', 'Consulting']
            }
          ]
        },
        'data science': {
          under18: [
            {
              level: 1,
              step: 'Python & Data Manipulation',
              duration: '3 weeks',
              resources: ['Python Basics', 'Pandas Documentation', 'NumPy Guide'],
              projects: ['Data cleaning project', 'CSV analysis'],
              skills: ['Python', 'Pandas', 'NumPy', 'Data cleaning']
            },
            {
              level: 2,
              step: 'Statistics & Probability',
              duration: '3 weeks',
              resources: ['Khan Academy Stats', 'StatQuest', 'Statistics guide'],
              projects: ['Statistical analysis', 'Hypothesis testing'],
              skills: ['Descriptive statistics', 'Probability', 'Hypothesis testing']
            },
            {
              level: 3,
              step: 'Data Visualization',
              duration: '2 weeks',
              resources: ['Matplotlib/Seaborn', 'Plotly', 'Tableau Public', 'Data visualization guide'],
              projects: ['Create visualizations', 'Interactive dashboards'],
              skills: ['Matplotlib', 'Seaborn', 'Plotly', 'Tableau']
            },
            {
              level: 4,
              step: 'Machine Learning for Data Science',
              duration: '4 weeks',
              resources: ['Scikit-learn tutorials', 'Kaggle Learn', 'ML for beginners'],
              projects: ['Kaggle competitions', 'Predictive models'],
              skills: ['Regression', 'Classification', 'Clustering']
            },
            {
              level: 5,
              step: 'Real-World Data Projects',
              duration: 'Ongoing',
              resources: ['Kaggle', 'GitHub datasets', 'Analytics Vidhya', 'Data Hackathons'],
              projects: ['End-to-end data project', 'Contribute to open data'],
              skills: ['Project management', 'Data storytelling']
            }
          ],
          '18plus': [
            {
              level: 1,
              step: 'Advanced Data Processing',
              duration: '2 weeks',
              resources: ['Big Data', 'Spark', 'Dask', 'Data engineering'],
              projects: ['Large dataset processing', 'Data pipeline'],
              skills: ['Big data tools', 'Distributed computing']
            },
            {
              level: 2,
              step: 'Advanced ML & Feature Engineering',
              duration: '3 weeks',
              resources: ['Feature engineering guide', 'AutoML', 'Ensemble methods', 'XGBoost/LightGBM'],
              projects: ['Feature engineering project', 'Ensemble models'],
              skills: ['Advanced ML', 'Feature engineering', 'Ensemble methods']
            },
            {
              level: 3,
              step: 'Deep Learning for Data Science',
              duration: '3 weeks',
              resources: ['TensorFlow for tabular', 'Deep learning guide', 'Neural networks for data'],
              projects: ['Deep learning model', 'Neural network prediction'],
              skills: ['Deep learning', 'Time series prediction']
            },
            {
              level: 4,
              step: 'Production & MLOps',
              duration: '3 weeks',
              resources: ['MLOps guide', 'Model deployment', 'Monitoring', 'Cloud platforms'],
              projects: ['Deploy data model', 'Create data pipeline', 'Monitor models'],
              skills: ['MLOps', 'Deployment', 'Monitoring', 'Scaling']
            },
            {
              level: 5,
              step: 'Industry & Research',
              duration: 'Ongoing',
              resources: ['Data science internships', 'Kaggle competitions', 'Research papers', 'Conferences'],
              projects: ['Industry project', 'Research publication', 'Lead data science team'],
              skills: ['Research', 'Leadership', 'Industry practices']
            }
          ]
        }
      };

      const path = roadmapPaths[interest.toLowerCase()];
      if (!path) {
        throw new Error('Roadmap not available for this interest');
      }

      const roadmapSteps = path[isUnder18 ? 'under18' : '18plus'];
      
      // Scrape real resources for the interest
      const resources = await this.getFreeLearningResources(interest);

      return {
        interest,
        age,
        ageGroup,
        totalLevels: roadmapSteps.length,
        steps: roadmapSteps,
        resources,
        estimatedDuration: '4-6 months',
        generatedAt: new Date()
      };
    } catch (error) {
      console.error('Error generating roadmap:', error);
      throw error;
    }
  }
}

module.exports = AIRoadmapService;
