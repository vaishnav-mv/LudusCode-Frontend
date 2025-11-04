import React, { useState } from 'react';
import { Difficulty } from '../../models';
import { Icon } from '../../components/common/Icons';
import CreateDuelModal from '../../components/user/CreateDuelModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const DuelLobbyPage: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user!);
    
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [eloFilter, setEloFilter] = useState([1000, 2500]);
    const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | 'Any'>('Any');
    const [wagerFilter, setWagerFilter] = useState<number | 'Any'>('Any');
    

    const handleCreateDuel = (difficulty: Difficulty, wager: number) => {
        setShowCreateModal(false);
    }

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-orbitron font-bold">Duel Lobby</h2>
            </div>
            <p className="text-gray-400 mb-6">Challenge another player to a real-time coding battle. The winner takes the glory (and the wager)!</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
                <div>
                    <label className="text-sm font-semibold">ELO Range: <span className="font-bold text-cyan-400">{eloFilter[0]} - {eloFilter[1]}</span></label>
                    <input type="range" min="1000" max="3000" value={eloFilter[1]} onChange={e => setEloFilter([eloFilter[0], parseInt(e.target.value)])} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
                </div>
                <div>
                    <label className="text-sm font-semibold">Difficulty</label>
                    <select onChange={e => setDifficultyFilter(e.target.value as any)} value={difficultyFilter} className="w-full mt-1 bg-gray-900 border border-gray-600 rounded-lg px-2 py-1.5 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none">
                        <option>Any</option>
                        {Object.values(Difficulty).map(d => <option key={d}>{d}</option>)}
                    </select>
                </div>
                <div>
                    <label className="text-sm font-semibold">Wager</label>
                     <select onChange={e => setWagerFilter(e.target.value === 'Any' ? 'Any' : parseInt(e.target.value))} value={wagerFilter} className="w-full mt-1 bg-gray-900 border border-gray-600 rounded-lg px-2 py-1.5 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none">
                        <option>Any</option>
                        <option value={0}>$0</option>
                        <option value={10}>$10</option>
                        <option value={25}>$25</option>
                        <option value={50}>$50</option>
                        <option value={100}>$100</option>
                    </select>
                </div>
            </div>


            <div className="flex justify-end mb-4">
                <button onClick={() => setShowCreateModal(true)} className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-all">
                    <Icon name="plus" />
                    Create Challenge
                </button>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg">
                 <h3 className="text-xl font-orbitron font-bold p-4 border-b border-gray-700">Open Challenges</h3>
                 <div className="space-y-2 p-3">
                     <p className="text-center text-gray-500 py-4">No open challenges match your filters.</p>
                 </div>
            </div>
            {showCreateModal && <CreateDuelModal onClose={() => setShowCreateModal(false)} onCreate={handleCreateDuel} />}
        </div>
    );
};

export default DuelLobbyPage;
