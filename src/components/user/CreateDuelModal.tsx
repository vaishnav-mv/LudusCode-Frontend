import React, { useState } from 'react';
import { Icon } from '../common/Icons';
import { Difficulty } from '../../models';

interface CreateDuelModalProps {
    onClose: () => void;
    onCreate: (difficulty: Difficulty, wager: number) => void;
}

const CreateDuelModal: React.FC<CreateDuelModalProps> = ({ onClose, onCreate }) => {
    const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Easy);
    const [wager, setWager] = useState(10);
    const wagerOptions = [0, 10, 25, 50, 100];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCreate(difficulty, wager);
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl w-full max-w-md">
                <form onSubmit={handleSubmit}>
                    <div className="p-6 border-b border-gray-700">
                        <h2 className="text-2xl font-orbitron font-bold text-red-400">Create a Duel</h2>
                    </div>
                    <div className="p-6 space-y-6">
                        <div>
                            <label className="block text-lg font-semibold mb-2 text-gray-300">Problem Difficulty</label>
                            <div className="grid grid-cols-3 gap-2 bg-gray-900 p-1 rounded-lg">
                                {Object.values(Difficulty).map(d => (
                                    <button
                                        type="button"
                                        key={d}
                                        onClick={() => setDifficulty(d)}
                                        className={`px-4 py-2 rounded-md font-bold transition-colors text-sm ${difficulty === d ? 'bg-red-500 text-white' : 'bg-transparent text-gray-400 hover:bg-gray-700'}`}
                                    >
                                        {d}
                                    </button>
                                ))}
                            </div>
                        </div>
                         <div>
                            <label className="block text-lg font-semibold mb-2 text-gray-300">Wager</label>
                            <div className="grid grid-cols-5 gap-2 bg-gray-900 p-1 rounded-lg">
                                {wagerOptions.map(w => (
                                    <button
                                        type="button"
                                        key={w}
                                        onClick={() => setWager(w)}
                                        className={`px-4 py-2 rounded-md font-bold transition-colors text-sm ${wager === w ? 'bg-yellow-500 text-white' : 'bg-transparent text-gray-400 hover:bg-gray-700'}`}
                                    >
                                        ${w}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-900/50 flex justify-end gap-3 rounded-b-lg">
                        <button type="button" onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">Cancel</button>
                        <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                            <Icon name="swords" />
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateDuelModal;