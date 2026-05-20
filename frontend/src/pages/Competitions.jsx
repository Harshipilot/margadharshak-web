import React from 'react';

export default function Competitions() {
  const competitions = [
    {
      id: 1,
      name: "Smart India Hackathon 2025",
      description: "National hackathon for students to solve real-world problems. Win prizes up to ₹1 Lakh!",
      link: "https://cse.noticebard.com/hackathon/upcoming-hackathon-2025-in-india/",
      prize: "₹1,00,000",
      deadline: "Aug-Sept 2025"
    },
    {
      id: 2,
      name: "HackIndia 2025 - Web3 & AI",
      description: "India's biggest Web3 & AI hackathon series with $150k prize pool across 15 cities.",
      link: "https://hackindia.xyz",
      prize: "$150,000",
      deadline: "Sept 2025"
    },
    {
      id: 3,
      name: "ICPC World Finals 2025",
      description: "The world's premier programming contest for university students.",
      link: "https://icpc.global",
      prize: "International Recognition",
      deadline: "Regional contests in Fall 2024"
    },
    {
      id: 4,
      name: "Meta HackerCup 2025",
      description: "Global coding contest with 30,000+ participants competing for top prizes.",
      link: "https://www.facebook.com/codingcompetitions/hacker-cup",
      prize: "$20,000",
      deadline: "Qualification rounds ongoing"
    },
    {
      id: 5,
      name: "Manipal Hackathon 2025",
      description: "Premier student hackathon bringing brilliant minds together for 36-hour coding challenge.",
      link: "https://hackathon.manipal.edu",
      prize: "₹5,00,000+ Prize Pool",
      deadline: "8-10 October 2025"
    },
    {
      id: 6,
      name: "CodeChef Contests",
      description: "Monthly coding contests including Long Challenge, Cook-Off, and Lunchtime.",
      link: "https://www.codechef.com/contests",
      prize: "CodeChef goodies & certificates",
      deadline: "Monthly contests"
    },
    {
      id: 7,
      name: "HackerRank Contests",
      description: "Regular coding competitions and programming challenges with global participation.",
      link: "https://www.hackerrank.com/contests",
      prize: "HackerRank merchandise",
      deadline: "Weekly/Monthly"
    },
    {
      id: 8,
      name: "IEEEXtreme Programming Competition",
      description: "24-hour programming competition for IEEE student members worldwide.",
      link: "https://ieeextreme.org",
      prize: "$300 cash award",
      deadline: "Annual competition"
    }
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '30px' }}>
        Programming Competitions & Hackathons
      </h1>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
        gap: '20px' 
      }}>
        {competitions.map((comp) => (
          <div key={comp.id} style={{
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
            <h3 style={{ color: '#2980b9', marginBottom: '10px' }}>{comp.name}</h3>
            <p style={{ color: '#555', marginBottom: '15px', lineHeight: '1.5' }}>
              {comp.description}
            </p>
            <div style={{ marginBottom: '15px' }}>
              <p style={{ margin: '5px 0', fontSize: '14px' }}>
                <strong>Prize:</strong> <span style={{ color: '#27ae60' }}>{comp.prize}</span>
              </p>
              <p style={{ margin: '5px 0', fontSize: '14px' }}>
                <strong>Deadline:</strong> <span style={{ color: '#e74c3c' }}>{comp.deadline}</span>
              </p>
            </div>
            <a 
              href={comp.link} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '10px 20px',
                backgroundColor: '#3498db',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '5px',
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#3498db'}
            >
              Learn More & Register
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
