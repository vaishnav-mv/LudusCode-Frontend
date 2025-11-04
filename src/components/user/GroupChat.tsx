import React, { useState, useEffect, useRef } from 'react';
import type { ChatMessage, User } from '../../models';
import { chatService } from '../../services/chatService';
import { Icon } from '../common/Icons';

interface GroupChatProps {
    groupId: string;
    currentUser: User;
}

const GroupChat: React.FC<GroupChatProps> = ({ groupId, currentUser }) => {
    const [messages, setMessages] = useState<ChatMessage[]>(() => chatService.getMessages(groupId));
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        const handleNewMessages = (updatedMessages: ChatMessage[]) => {
            setMessages(updatedMessages);
        };

        const unsubscribe = chatService.subscribe(groupId, handleNewMessages);
        
        scrollToBottom();

        return () => {
            unsubscribe();
        };
    }, [groupId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim()) {
            chatService.sendMessage(groupId, currentUser, newMessage);
            setNewMessage('');
        }
    };

    return (
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg flex flex-col h-[500px]">
            <h3 className="text-lg font-bold font-orbitron p-3 border-b border-gray-700 text-center">Group Chat</h3>
            <div className="flex-grow p-4 overflow-y-auto space-y-4">
                {messages.map((msg) => {
                    const isCurrentUser = msg.user.id === currentUser.id;
                    return (
                        <div key={msg.id} className={`flex items-start gap-3 ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
                            <img src={msg.user.avatarUrl} alt={msg.user.name} className="w-8 h-8 rounded-full" />
                            <div className={`p-3 rounded-lg max-w-xs ${isCurrentUser ? 'bg-cyan-600' : 'bg-gray-700'}`}>
                                {!isCurrentUser && <p className="text-xs font-bold text-cyan-300">{msg.user.name}</p>}
                                <p className="text-white text-sm whitespace-pre-wrap break-words">{msg.text}</p>
                                <p className="text-xs text-gray-400 mt-1 text-right">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-700 flex items-center gap-2">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-grow bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
                <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white p-2 rounded-lg transition-colors disabled:opacity-50" aria-label="Send Message" disabled={!newMessage.trim()}>
                    <Icon name="send" className="w-5 h-5" />
                </button>
            </form>
        </div>
    );
};

export default GroupChat;
