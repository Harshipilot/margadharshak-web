// backend/seed.js
const db = require('./db');

// Clear old data (optional, but good for hackathon demo)
db.prepare('DELETE FROM competitions').run();
db.prepare('DELETE FROM internships').run();

// sample comp
const competitions = [
  { title: 'Smart India Hackathon', description: 'Nationwide innovation hackathon' },
  { title: 'CodeFest 2025', description: 'College coding competition' },
  { title: 'AI Challenge', description: 'Solve AI/ML problems for fun' }
];

//sample intrnsips
const internships = [
  { company: 'TechNova', role: 'Frontend Intern', description: 'Work with React & UI design' },
  { company: 'DataWorks', role: 'Data Science Intern', description: 'Analyze datasets and build ML models' },
  { company: 'CloudNet', role: 'Cloud Engineer Intern', description: 'Work on AWS & deployment pipelines' }
];

//insert comps
const insertComp = db.prepare('INSERT INTO competitions (title, description) VALUES (?, ?)');
competitions.forEach(c => insertComp.run(c.title, c.description));

// insert intenrships
const insertIntern = db.prepare('INSERT INTO internships (company, role, description) VALUES (?, ?, ?)');
internships.forEach(i => insertIntern.run(i.company, i.role, i.description));

console.log(' Demo data seeded successfully....');
