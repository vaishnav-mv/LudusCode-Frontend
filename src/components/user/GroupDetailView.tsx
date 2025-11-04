// components/GroupDetailView.tsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import type { RootState, AppDispatch } from '../../redux/store';
import { fetchGroupById } from '../../redux/slices/groupSlice';
import type { Competition, User } from '../../models';
import { isUserInGroup, joinGroup, leaveGroup } from '../../services/groupService';

import { Icon } from '../common/Icons';
import GroupChat from './GroupChat';
// import { getCompetitionsForGroup, createCompetition } from '../../services/competitionService';
// import type { CreateCompetitionData } from '../../services/competitionService';
import { CompetitionStatus } from '../../models';
import CreateCompetitionModal from './CreateCompetitionModal';
import Spinner from '../common/Spinner';
import { formatDistanceToNow } from '../../utils';

const CompetitionCard: React.FC<{ competition: Competition; onClick?: () => void }> = ({ competition, onClick }) => {
    const statusColors: Record<CompetitionStatus, string> = {
        [CompetitionStatus.Active]: 'border-green-500 bg-green-900/30',
        [CompetitionStatus.Upcoming]: 'border-cyan-500 bg-cyan-900/30',
        [CompetitionStatus.Completed]: 'border-gray-600 bg-gray-900/30',
    };
    const statusTextColors: Record<CompetitionStatus, string> = {
        [CompetitionStatus.Active]: 'text-green-300',
        [CompetitionStatus.Upcoming]: 'text-cyan-300',
        [CompetitionStatus.Completed]: 'text-gray-400',
    };

    const startsIn = formatDistanceToNow(competition.startTime);

    return (
        <div 
            className={`p-3 rounded-lg border-l-4 transition-colors ${statusColors[competition.status]} ${onClick ? 'cursor-pointer hover:bg-gray-800' : ''}`}
            onClick={onClick}
        >
            <div className="flex justify-between items-center">
                <p className="font-bold">{competition.title}</p>
                <span className={`px-2 py-1 text-xs font-bold rounded-full ${statusColors[competition.status]} ${statusTextColors[competition.status]}`}>{competition.status}</span>
            </div>
            <div className="text-xs text-gray-400 mt-1 flex items-center gap-4">
                <div className="flex items-center gap-1">
                    <Icon name="calendar" className="w-3 h-3" />
                    <span>{competition.status === CompetitionStatus.Upcoming ? `Starts ${startsIn}` : new Date(competition.startTime).toLocaleString()}</span>
                </div>
                 <div className="flex items-center gap-1">
                    <Icon name="terminal" className="w-3 h-3" />
                    <span>{competition.problems.length} Problems</span>
                </div>
                {competition.status === CompetitionStatus.Active && onClick && <span className="ml-auto font-bold text-green-400 text-xs">JOIN NOW</span>}
            </div>
        </div>
    )
};


const GroupDetailView: React.FC = () => {
    const { groupId } = useParams<{ groupId: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const user = useSelector((state: RootState) => state.auth.user);
    const { selectedGroup: group, detailStatus } = useSelector((state: RootState) => state.groups);

    const [isMember, setIsMember] = React.useState(false);
    const [isUpdatingMembership, setIsUpdatingMembership] = React.useState(false);
    const [competitions, setCompetitions] = useState<Competition[]>([]);
    const [isLoadingComps, setIsLoadingComps] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    
    useEffect(() => {
        if (groupId) {
            dispatch(fetchGroupById(groupId));
        }
    }, [groupId, dispatch]);

    useEffect(() => {
    const checkMembership = async () => {
        if (group && user?.id) {
            const result = await isUserInGroup(group.id, user.id);
            setIsMember(result);
        }
    };

    checkMembership();
}, [group, user?.id]);

    // const fetchCompetitions = async () => {
    //     if (!groupId) return;
    //     setIsLoadingComps(true);
    //     const comps = await getCompetitionsForGroup(groupId);
    //     setCompetitions(comps);
    //     setIsLoadingComps(false);
    // };

    // useEffect(() => {
    //     if (isMember) {
    //         fetchCompetitions();
    //     }
    // }, [isMember, groupId]);

    const handleJoin = async () => {
        if (!groupId) return;
        setIsUpdatingMembership(true);
        await joinGroup(groupId, user.id);
        setIsMember(true);
        setIsUpdatingMembership(false);
    }

    const handleLeave = async () => {
        if (!groupId) return;
        setIsUpdatingMembership(true);
        await leaveGroup(groupId, user.id);
        setIsMember(false);
        setIsUpdatingMembership(false);
    }
    
    // const handleCreateCompetition = async (data: CreateCompetitionData) => {
    //     await createCompetition(data);
    //     setShowCreateModal(false);
    //     await fetchCompetitions(); // Refresh the list
    // };
    
    if (detailStatus === 'loading') {
        return <div className="text-center p-16"><Spinner /><p>Loading Group...</p></div>;
    }
    
    if (!group) {
        return <div className="text-center p-16 text-red-400">Group not found.</div>;
    }

    const isLeader = group.members[0]?.id === user.id;
    const activeComps = competitions.filter(c => c.status === CompetitionStatus.Active);
    const upcomingComps = competitions.filter(c => c.status === CompetitionStatus.Upcoming);
    const completedComps = competitions.filter(c => c.status === CompetitionStatus.Completed);

    return (
        <div className="max-w-6xl mx-auto animate-fade-in">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <button onClick={() => navigate('/groups')} className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 mb-2">
                        <Icon name="arrow-left" className="w-4 h-4" />
                        Back to Groups
                    </button>
                    <h2 className="text-4xl font-orbitron font-bold text-cyan-400">{group.name}</h2>
                    <p className="text-gray-400 mt-1">{group.description}</p>
                </div>
                {isMember ? (
                     <button onClick={handleLeave} disabled={isUpdatingMembership} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50">
                        Leave Group
                    </button>
                ) : (
                     <button onClick={handleJoin} disabled={isUpdatingMembership} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50">
                        Join Group
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                         <h3 className="font-bold font-orbitron mb-3 text-lg">Members ({group.members.length})</h3>
                         <div className="space-y-2">
                             {group.members.map(member => (
                                 <div key={member.id} onClick={() => navigate(`/profile/${member.id}`)} className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-800 cursor-pointer">
                                     <img src={member.avatarUrl} alt={member.name} className="w-8 h-8 rounded-full" />
                                     <div>
                                         <p className="font-semibold">{member.name}</p>
                                         <p className="text-xs text-yellow-400">{member.rank}</p>
                                     </div>
                                 </div>
                             ))}
                         </div>
                    </div>
                </div>
                <div className="lg:col-span-2 space-y-8">
                   {isMember ? (
                      <>
                        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="font-bold font-orbitron text-lg flex items-center gap-2"><Icon name="swords" /> Competitions</h3>
                                {isLeader && (
                                    <button onClick={() => setShowCreateModal(true)} className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-1 px-3 rounded-lg flex items-center gap-2 text-sm transition-colors">
                                        <Icon name="plus" className="w-4 h-4" />
                                        Create New
                                    </button>
                                )}
                            </div>
                            {isLoadingComps ? <div className="flex justify-center p-4"><Spinner/></div> : (
                                <div className="space-y-4">
                                    {activeComps.length > 0 && <div className="space-y-2"> <h4 className="text-sm font-bold text-green-400">Active</h4> {activeComps.map(c => <CompetitionCard key={c.id} competition={c} onClick={() => navigate(`/groups/${groupId}/competition/${c.id}`)} />)}</div>}
                                    {upcomingComps.length > 0 && <div className="space-y-2"> <h4 className="text-sm font-bold text-cyan-400">Upcoming</h4> {upcomingComps.map(c => <CompetitionCard key={c.id} competition={c} />)}</div>}
                                    {completedComps.length > 0 && <div className="space-y-2"> <h4 className="text-sm font-bold text-gray-500">Past</h4> {completedComps.map(c => <CompetitionCard key={c.id} competition={c} />)}</div>}
                                    {competitions.length === 0 && <p className="text-sm text-gray-500 text-center py-2">No competitions scheduled yet.</p>}
                                </div>
                            )}
                        </div>
                        <GroupChat groupId={group.id} currentUser={user } />
                      </>
                   ) : (
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg flex flex-col h-[500px] items-center justify-center text-center p-4">
                          <Icon name="users" className="w-12 h-12 text-gray-500 mb-4" />
                          <h3 className="text-xl font-bold">Join the conversation</h3>
                          <p className="text-gray-400">Become a member to access group chat and competitions.</p>
                      </div>
                   )}
                </div>
            </div>
            {/* {showCreateModal && isLeader && (
                <CreateCompetitionModal
                    groupId={group.id}
                    onClose={() => setShowCreateModal(false)}
                    onCreate={handleCreateCompetition}
                />
            )} */}
        </div>
    );
};

export default GroupDetailView;
