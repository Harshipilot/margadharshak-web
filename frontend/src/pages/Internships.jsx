import React from 'react';

export default function Internships() {
  const internships = [
    {
      id: 1,
      name: "Google Winter Internship 2026",
      company: "Google",
      description: "Application Engineering Intern program for Computer Science students. 22-24 weeks duration starting January 2026.",
      link: "https://careers.google.com/jobs/results/",
      location: "Bengaluru, Karnataka",
      duration: "22-24 weeks",
      stipend: "Competitive"
    },
    {
      id: 2,
      name: "Goldman Sachs Summer Analyst",
      company: "Goldman Sachs",
      description: "9-10 week summer internship for students pursuing bachelor's/graduate degree in engineering.",
      link: "https://www.goldmansachs.com/careers/students/programs-and-internships/",
      location: "Bengaluru, Hyderabad",
      duration: "9-10 weeks",
      stipend: "₹80,000/month"
    },
    {
      id: 3,
      name: "Microsoft Internship Program",
      company: "Microsoft",
      description: "Software engineering internships for students in Computer Science and related fields.",
      link: "https://careers.microsoft.com/students/us/en/search-results?category=internships",
      location: "Bengaluru, Hyderabad",
      duration: "12 weeks",
      stipend: "₹75,000/month"
    },
    {
      id: 4,
      name: "Amazon Engineering Internships",
      company: "Amazon",
      description: "Software Development Engineer Intern positions for university students.",
      link: "https://amazon.jobs/en/teams/internships-for-students",
      location: "Bengaluru, Chennai",
      duration: "10-12 weeks",
      stipend: "₹70,000/month"
    },
    {
      id: 5,
      name: "Internshala Engineering Internships",
      company: "Various Companies",
      description: "Find 1100+ engineering internships across different companies and domains.",
      link: "https://internshala.com/internships/engineering-internship/",
      location: "All over India",
      duration: "2-6 months",
      stipend: "₹5,000-₹50,000/month"
    },
    {
      id: 6,
      name: "Indeed Engineering Internships",
      company: "Various Companies",
      description: "Browse 100+ engineering student internship opportunities in Bengaluru and other cities.",
      link: "https://in.indeed.com/q-internship-engineering-student-jobs.html",
      location: "Bengaluru, Mumbai, Delhi",
      duration: "3-6 months",
      stipend: "₹10,000-₹60,000/month"
    },
    {
      id: 7,
      name: "LinkedIn Engineering Internships",
      company: "Various Companies",
      description: "Explore 374+ engineering internship opportunities posted on LinkedIn.",
      link: "https://in.linkedin.com/jobs/engineering-internship-jobs",
      location: "Major cities",
      duration: "3-4 months",
      stipend: "Varies"
    },
    {
      id: 8,
      name: "HCL TechBee Program",
      company: "HCL Technologies",
      description: "Early career program offering paid internships for students and freshers.",
      link: "https://www.skillindiadigital.gov.in/hcl-internship/interest-form",
      location: "Multiple locations",
      duration: "6-12 months",
      stipend: "₹15,000-₹25,000/month"
    }
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '30px' }}>
        Engineering Internship Opportunities
      </h1>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', 
        gap: '20px' 
      }}>
        {internships.map((internship) => (
          <div key={internship.id} style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '20px',
            backgroundColor: '#f8f9fa',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s ease-in-out'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <h3 style={{ color: '#8e44ad', marginBottom: '5px' }}>{internship.name}</h3>
            <h4 style={{ color: '#7f8c8d', marginBottom: '10px', fontSize: '16px' }}>
              {internship.company}
            </h4>
            <p style={{ color: '#555', marginBottom: '15px', lineHeight: '1.5' }}>
              {internship.description}
            </p>
            <div style={{ marginBottom: '15px' }}>
              <p style={{ margin: '5px 0', fontSize: '14px' }}>
                <strong>Location:</strong> <span style={{ color: '#2980b9' }}>{internship.location}</span>
              </p>
              <p style={{ margin: '5px 0', fontSize: '14px' }}>
                <strong>Duration:</strong> <span style={{ color: '#27ae60' }}>{internship.duration}</span>
              </p>
              <p style={{ margin: '5px 0', fontSize: '14px' }}>
                <strong>Stipend:</strong> <span style={{ color: '#e67e22' }}>{internship.stipend}</span>
              </p>
            </div>
            <a 
              href={internship.link} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '10px 20px',
                backgroundColor: '#9b59b6',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '5px',
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#8e44ad'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#9b59b6'}
            >
              Apply Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
