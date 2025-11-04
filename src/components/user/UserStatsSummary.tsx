import React from 'react';
import type { User } from '../../types';
import { Icon } from '../common/Icons';

interface UserStatsSummaryProps {
  user: User;
}

const Stat: React.FC<{ icon: React.ComponentProps<typeof Icon>['name'], value: string | number, label: string, color: string }> = ({ icon, value, label, color }) => (
    <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full bg-${color}-500/20`}>
            <Icon name={icon} className={`w-5 h-5 text-${color}-400`} />
        </div>
        <div>
            <p className={`text-xl font-orbitron font-bold text-white`}>{value}</p>
            <p className="text-xs text-gray-400">{label}</p>
        </div>
    </div>
);

const UserStatsSummary: React.FC<UserStatsSummaryProps> = ({ user }) => {
        
    return (
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
            <Stat icon="trending-up" value={55} label="Elo Rating" color="cyan" />
            <Stat icon="trophy" value={67} label="Current Rank" color="yellow" />
            <Stat icon="swords" value={67} label="Duel Win Rate" color="green" />
            <Stat icon="check" value={8} label="Duels Won" color="purple" />
        </div>
    );
};

export default UserStatsSummary;
