import React, { useState } from 'react';
import { Icon } from '../common/Icons';
import Spinner from '../common/Spinner';
import type { CreateCompetitionData } from '../../services/competitionService';
import { Difficulty } from '../../models';

interface CreateCompetitionModalProps {
    groupId: string;
    onClose: () => void;
    onCreate: (data: CreateCompetitionData) => Promise<void>;
}

const NumberInput: React.FC<{ label: string; value: number; onChange: (value: number) => void }> = ({ label, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">{label}</label>
        <div className="flex items-center gap-2">
            <button type="button" onClick={() => onChange(Math.max(0, value - 1))} className="p-2 bg-gray-700 rounded-md hover:bg-gray-600"><Icon name="minus" className="w-4 h-4" /></button>
            <input type="number" value={value} readOnly className="w-12 text-center bg-gray-900 rounded-md py-1" />
            <button type="button" onClick={() => onChange(value + 1)} className="p-2 bg-gray-700 rounded-md hover:bg-gray-600"><Icon name="plus" className="w-4 h-4" /></button>
        </div>
    </div>
);

const CreateCompetitionModal: React.FC<CreateCompetitionModalProps> = ({ groupId, onClose, onCreate }) => {
    const [title, setTitle] = useState('');
    
    const oneHourFromNow = new Date(Date.now() + 60 * 60 * 1000);
    // Format for datetime-local input (YYYY-MM-DDTHH:mm)
    const defaultDateTime = oneHourFromNow.toISOString().slice(0, 16);
    
    const [startTime, setStartTime] = useState(defaultDateTime);
    const [durationMinutes, setDurationMinutes] = useState(60);
    const [problemCounts, setProblemCounts] = useState({ easy: 1, medium: 0, hard: 0 });
    const [isCreating, setIsCreating] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !startTime || durationMinutes <= 0) {
            alert("Please fill all fields correctly.");
            return;
        }
        setIsCreating(true);
        await onCreate({
            groupId,
            title,
            startTime: new Date(startTime).toISOString(),
            durationMinutes,
            problemCounts
        });
        setIsCreating(false);
    }

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl w-full max-w-lg">
                <form onSubmit={handleSubmit}>
                    <div className="p-6 border-b border-gray-700">
                        <h2 className="text-2xl font-orbitron font-bold text-cyan-400">Create New Competition</h2>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                            <input
                                id="title"
                                type="text"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                placeholder="e.g., Weekly Challenge #5"
                                className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="startTime" className="block text-sm font-medium text-gray-300 mb-1">Start Time</label>
                                <input
                                    id="startTime"
                                    type="datetime-local"
                                    value={startTime}
                                    onChange={e => setStartTime(e.target.value)}
                                    className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                                    required
                                />
                            </div>
                             <div>
                                <label htmlFor="duration" className="block text-sm font-medium text-gray-300 mb-1">Duration (minutes)</label>
                                <input
                                    id="duration"
                                    type="number"
                                    value={durationMinutes}
                                    onChange={e => setDurationMinutes(parseInt(e.target.value, 10))}
                                    className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                                    required
                                    min="10"
                                />
                            </div>
                        </div>
                        <div>
                            <p className="block text-sm font-medium text-gray-300 mb-2">Problems</p>
                            <div className="flex justify-around bg-gray-900/50 p-3 rounded-lg">
                               <NumberInput label={Difficulty.Easy} value={problemCounts.easy} onChange={v => setProblemCounts(p => ({...p, easy: v}))} />
                               <NumberInput label={Difficulty.Medium} value={problemCounts.medium} onChange={v => setProblemCounts(p => ({...p, medium: v}))} />
                               <NumberInput label={Difficulty.Hard} value={problemCounts.hard} onChange={v => setProblemCounts(p => ({...p, hard: v}))} />
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-900/50 flex justify-end gap-3 rounded-b-lg">
                        <button type="button" onClick={onClose} disabled={isCreating} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">Cancel</button>
                        <button type="submit" disabled={isCreating} className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50">
                            {isCreating ? <><Spinner /> Creating...</> : 'Create Competition'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCompetitionModal;
