// pages/Dashboard/DashboardPage.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState, AppDispatch } from '../../redux/store';

import { Icon } from '../../components/common/Icons';
import PracticeHistory from '../../components/user/PracticeHistory';
import UserStatsSummary from '../../components/user/UserStatsSummary';
import Spinner from '@/src/components/common/Spinner';

interface NavCardProps {
    icon: React.ComponentProps<typeof Icon>['name'];
    title: string;
    description: string;
    onClick: () => void;
    color: string;
}

const NavCard: React.FC<NavCardProps> = ({ icon, title, description, onClick, color }) => (
    <button onClick={onClick} className={`bg-gray-800/50 p-6 rounded-lg border border-gray-700 text-left hover:border-${color}-500 hover:bg-gray-800 transition-all group h-full`}>
        <div className={`mb-4 w-12 h-12 rounded-lg bg-${color}-500/20 flex items-center justify-center`}>
            <Icon name={icon} className={`w-7 h-7 text-${color}-400`} />
        </div>
        <h3 className={`text-xl font-orbitron font-bold text-white mb-1`}>{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
    </button>
);

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const {user} = useSelector((state: RootState) => state.auth);
    const submissions: any[] = []; 
  
    if (!user) {
        return <div className="text-center"><Spinner/></div>
    }

    return (
        <div className="max-w-7xl mx-auto animate-fade-in space-y-12">
            <div>
                <h1 className="text-4xl font-orbitron font-black">Welcome, <span className="text-cyan-400">{user.username}</span></h1>
                <p className="text-gray-400 mt-2">Your coding journey continues here. What will you conquer today?</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                         <div className="h-full bg-gray-800/50 border-2 border-cyan-500 rounded-lg flex items-center justify-center p-6 shadow-lg shadow-cyan-500/10">
                            <Spinner />
                            <span className="ml-3 text-cyan-300">Loading Problem of the Day...</span>
                         </div>
                </div>
                <div className="flex flex-col justify-center">
                    <UserStatsSummary user={user} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <NavCard 
                    icon="code"
                    title="Practice"
                    description="Sharpen your skills with AI-generated problems."
                    onClick={() => navigate('/practice')}
                    color="cyan"
                />
                 <NavCard 
                    icon="swords"
                    title="1v1 Duels"
                    description="Challenge others in real-time coding battles."
                    onClick={() => navigate('/duels')}
                    color="red"
                />
                <NavCard 
                    icon="users"
                    title="Groups"
                    description="Join communities and compete together."
                    onClick={() => navigate('/groups')}
                    color="yellow"
                />
                 <NavCard 
                    icon="trophy"
                    title="Leaderboard"
                    description="See how you rank against every player."
                    onClick={() => navigate('/leaderboard')}
                    color="purple"
                />
            </div>

            <div>
                <div className="flex justify-between items-center mb-4">
                     <h3 className="text-2xl font-orbitron font-bold">Recent Practice</h3>
                     <button onClick={() => navigate('/history')} className="text-sm font-semibold text-cyan-400 hover:text-cyan-300">View All</button>
                </div>
                <PracticeHistory 
                    submissions={[]}
                    onSelectSubmission={(sub) => navigate(`/submission/${sub.id}`)}
                />
            </div>
        </div>
    );
};

export default DashboardPage;
