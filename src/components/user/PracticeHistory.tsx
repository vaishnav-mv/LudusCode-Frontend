import React from 'react';

interface PracticeHistoryProps {
  submissions: [];
  onSelectSubmission: (submission:any) => void;
}

const PracticeHistory: React.FC<PracticeHistoryProps> = ({ submissions, onSelectSubmission }) => {
  // Show the 5 most recent submissions
  const recentSubmissions = submissions.slice(0, 5);

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg">
      <h3 className="text-xl font-orbitron font-bold p-4 border-b border-gray-700">Recent Practice</h3>
        <p className="text-gray-400 p-4 text-center">No recent practice sessions. Go solve a problem!</p>
    </div>
  );
};

export default PracticeHistory;