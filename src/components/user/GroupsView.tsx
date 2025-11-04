// components/GroupsView.tsx
import React, { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState, AppDispatch } from '../../redux/store';
import type { Group } from '../../models';
import { isUserInGroup, createGroup } from '../../services/groupService';
import { fetchGroups } from '../../redux/slices/groupSlice';

import { Icon } from '../common/Icons';
import Skeleton from './Skeleton';

const GroupCardSkeleton: React.FC = () => (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-5 flex flex-col">
        <div className="flex-grow">
            <div className="flex justify-between items-start">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-5 w-12" />
            </div>
            <Skeleton className="h-4 w-full mt-3" />
            <Skeleton className="h-4 w-5/6 mt-1" />
            <div className="flex flex-wrap gap-2 mt-4">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-5 w-14 rounded-full" />
            </div>
        </div>
        <div className="border-t border-gray-700 mt-4 pt-4 flex justify-between items-center">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-10 w-20" />
        </div>
    </div>
);

const GroupCard: React.FC<{group: Group, onSelectGroup: (group: Group) => void, isMember: boolean}> = ({ group, onSelectGroup, isMember }) => {
    return (
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-5 flex flex-col hover:border-cyan-500 transition-all duration-300">
            <div className="flex-grow">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold font-orbitron text-cyan-400">{group.name}</h3>
                    {isMember && <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded-full font-bold">Joined</span>}
                </div>
                <p className="text-gray-400 text-sm mt-2 mb-4">{group.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {group.topics.map(topic => (
                        <span key={topic} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">{topic}</span>
                    ))}
                </div>
            </div>
            <div className="border-t border-gray-700 pt-4 flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Icon name="users" className="w-5 h-5" />
                    <span>{group.members.length} Members</span>
                </div>
                <button onClick={() => onSelectGroup(group)} className="bg-gray-700 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors">
                    View
                </button>
            </div>
        </div>
    )
}

const CreateGroupModal: React.FC<{ isOpen: boolean; onClose: () => void; onCreate: (data: { name: string; description: string; topics: string[] }) => void }> = ({ isOpen, onClose, onCreate }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [topics, setTopics] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const topicsArray = topics.split(',').map(t => t.trim()).filter(t => t);
        onCreate({ name, description, topics: topicsArray });
        setName('');
        setDescription('');
        setTopics('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Create New Group</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Group Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full mb-3 p-2 bg-gray-700 rounded"
                        required
                    />
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full mb-3 p-2 bg-gray-700 rounded"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Topics (comma-separated)"
                        value={topics}
                        onChange={(e) => setTopics(e.target.value)}
                        className="w-full mb-3 p-2 bg-gray-700 rounded"
                    />
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 rounded">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-cyan-600 rounded">Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const GroupsView: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const currentUser = useSelector((state: RootState) => state.auth.user)!;
    const { groups, listStatus } = useSelector((state: RootState) => state.groups);
    const isLoading = listStatus === 'loading';

    const [searchTerm, setSearchTerm] = useState('');
    const [memberships, setMemberships] = useState<Record<string, boolean>>({});
    const [filter, setFilter] = useState<'all' | 'available' | 'my'>('all');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (listStatus === 'idle') {
            dispatch(fetchGroups());
        }
    }, [dispatch, listStatus]);

    const filteredGroups = useMemo(() => {
        let filtered = groups.filter(group => 
            group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            group.topics.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
        );

        if (filter === 'available') {
            filtered = filtered.filter(group => !memberships[group.id]);
        } else if (filter === 'my') {
            filtered = filtered.filter(group => 
                group.members.some(member => member.id === currentUser.id) || 
                group.leader.id === currentUser.id
            );
        }

        return filtered;
    }, [groups, searchTerm, filter, memberships, currentUser.id]);

    useEffect(() => {
        if (!groups.length) {
            setMemberships({});
            return;
        }

        let isMounted = true;

        const fetchMemberships = async () => {
            const entries = await Promise.all(
                groups.map(async (group) => {
                    const isMember = await isUserInGroup(group.id, currentUser.id);
                    return [group.id, isMember] as const;
                })
            );

            if (isMounted) {
                setMemberships(Object.fromEntries(entries));
            }
        };

        fetchMemberships();

        return () => {
            isMounted = false;
        };
    }, [groups, currentUser.id]);

    const handleCreateGroup = async (data: { name: string; description: string; topics: string[] }) => {
        await createGroup(data);
        dispatch(fetchGroups());
    };

    return (
        <div className="max-w-6xl mx-auto animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-3xl font-orbitron font-bold mb-2">Groups</h2>
                    <p className="text-gray-400">Join communities and compete together.</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg">
                    Create Group
                </button>
            </div>

            <div className="flex gap-4 mb-6">
                <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-cyan-600' : 'bg-gray-700'}`}>All Groups</button>
                <button onClick={() => setFilter('available')} className={`px-4 py-2 rounded ${filter === 'available' ? 'bg-cyan-600' : 'bg-gray-700'}`}>Available Groups</button>
                <button onClick={() => setFilter('my')} className={`px-4 py-2 rounded ${filter === 'my' ? 'bg-cyan-600' : 'bg-gray-700'}`}>My Groups</button>
            </div>
            
            <div className="relative mb-6">
                <input 
                    type="text"
                    placeholder="Search by name, topic, or description..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 pl-10 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
                <Icon name="search" className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <GroupCardSkeleton />
                    <GroupCardSkeleton />
                    <GroupCardSkeleton />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredGroups.map(group => (
                        <GroupCard 
                            key={group.id}
                            group={group}
                            onSelectGroup={(group) => navigate(`/groups/${group.id}`)}
                            isMember={memberships[group.id] || false}
                        />
                    ))}
                     {filteredGroups.length === 0 && (
                        <div className="text-center col-span-full py-16 bg-gray-800/30 rounded-lg">
                            <p className="text-lg text-gray-400">No groups found.</p>
                        </div>
                    )}
                </div>
            )}

            <CreateGroupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreate={handleCreateGroup} />
        </div>
    );
};

export default GroupsView;
