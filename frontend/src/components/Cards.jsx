import React from 'react';
import { Card, Badge } from './UI';

/**
 * Challenge Card Component
 */
export const ChallengeCard = ({ challenge, onSubmit }) => {
  return (
    <Card className="cursor-pointer hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-bold">{challenge.title}</h3>
        <Badge variant={challenge.difficulty === 'easy' ? 'green' : challenge.difficulty === 'medium' ? 'yellow' : 'red'}>
          {challenge.difficulty}
        </Badge>
      </div>

      <p className="text-gray-600 text-sm mb-3">{challenge.description}</p>

      <div className="flex gap-2 mb-3">
        <Badge variant="blue">{challenge.category}</Badge>
        <Badge variant="gray">{challenge.points} XP</Badge>
      </div>

      <button
        onClick={() => onSubmit(challenge._id)}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        View Challenge
      </button>
    </Card>
  );
};

/**
 * Opportunity Card Component (Internship/Job/Hackathon)
 */
export const OpportunityCard = ({ opportunity }) => {
  return (
    <Card className="border-l-4 border-l-blue-600">
      <h3 className="text-lg font-bold mb-2">{opportunity.title}</h3>
      <p className="text-gray-600 text-sm mb-3">{opportunity.company || opportunity.source}</p>

      {opportunity.location && <p className="text-sm">📍 {opportunity.location}</p>}
      {opportunity.stipend && (
        <p className="text-sm">
          💰 ₹{opportunity.stipend.min} - ₹{opportunity.stipend.max}
        </p>
      )}
      {opportunity.salary && (
        <p className="text-sm">
          💰 ₹{opportunity.salary.min} - ₹{opportunity.salary.max}
        </p>
      )}
      {opportunity.deadline && (
        <p className="text-sm text-red-600 mt-2">
          ⏰ Deadline: {new Date(opportunity.deadline).toLocaleDateString()}
        </p>
      )}

      <a
        href={opportunity.applyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition text-center"
      >
        Apply Now →
      </a>
    </Card>
  );
};

export default { ChallengeCard, OpportunityCard };
