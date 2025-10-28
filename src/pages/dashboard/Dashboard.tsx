import React from 'react';
import Card from '../../components/common/Card';
import { useAppSelector } from '../../redux/hooks';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const { user } = useAppSelector((state) => state.auth);
  return (
    <div>
      <h1 className="text-3xl font-bold text-text-primary mb-6">
        Welcome back, {user?.username}!
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:border-highlight border-2 border-transparent transition-all">
          <h2 className="text-xl font-semibold text-highlight mb-2">Start a Duel</h2>
          <p className="text-text-secondary">Challenge a friend or a random opponent in a real-time coding battle.</p>
        </Card>
        <Card className="hover:border-highlight border-2 border-transparent transition-all">
          <h2 className="text-xl font-semibold text-highlight mb-2">Practice Problems</h2>
          <p className="text-text-secondary">Hone your skills with our AI-generated problem sets.</p>
        </Card>
        <Link to="/my-groups">
            <Card className="hover:border-highlight border-2 border-transparent transition-all h-full">
            <h2 className="text-xl font-semibold text-highlight mb-2">My Groups</h2>
            <p className="text-text-secondary">Create a new group or manage existing ones.</p>
            </Card>
        </Link>
         <Card className="md:col-span-2 hover:border-highlight border-2 border-transparent transition-all">
          <h2 className="text-xl font-semibold text-highlight mb-2">Recent Activity</h2>
          <p className="text-text-secondary">No recent duels. Time to start a new challenge!</p>
        </Card>
         <Card className="hover:border-highlight border-2 border-transparent transition-all">
          <h2 className="text-xl font-semibold text-highlight mb-2">My Wallet</h2>
          <p className="text-text-secondary">You have 1,250 LC Coins.</p>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;