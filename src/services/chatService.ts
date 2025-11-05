
import type { ChatMessage, User } from '../types';
import { MOCK_USERS } from './mockData';

// This is a simple in-memory store for chat messages, grouped by group ID.
const messagesByGroupId: Record<string, ChatMessage[]> = {};

// A simple event emitter to simulate real-time updates.
type Listener = (messages: ChatMessage[]) => void;
const listenersByGroupId: Record<string, Set<Listener>> = {};
const botIntervals: Record<string, ReturnType<typeof setInterval>> = {};

// Function to notify all listeners for a specific group.
const broadcast = (groupId: string) => {
    if (listenersByGroupId[groupId]) {
        listenersByGroupId[groupId].forEach(listener => {
            // Return a new array to trigger React state updates
            listener([...(messagesByGroupId[groupId] || [])]);
        });
    }
};

// Simulate other users talking in the chat.
const startBotConversation = (groupId: string) => {
    if (botIntervals[groupId]) return; // Already running

    const intervalId = setInterval(() => {
        const otherUsers = MOCK_USERS.filter(u => u.id !== 'user-1'); // Anyone but Alice
        if (otherUsers.length > 0 && (messagesByGroupId[groupId]?.length ?? 0) < 20) {
            const randomUser = otherUsers[Math.floor(Math.random() * otherUsers.length)];
            const randomMessage = [
                "Hey, anyone up for a duel?",
                "Just solved the 'Two Sum' problem in O(n)!",
                "What's the best approach for graph traversals?",
                "I'm stuck on this medium problem, any hints?",
                "Let's schedule a group competition for this weekend."
            ][Math.floor(Math.random() * 5)];

            const newMessage: ChatMessage = {
                id: new Date().toISOString() + Math.random(),
                user: randomUser,
                text: randomMessage,
                timestamp: new Date().toISOString(),
            };
            if (!messagesByGroupId[groupId]) {
                messagesByGroupId[groupId] = [];
            }
            messagesByGroupId[groupId].push(newMessage);
            broadcast(groupId);
        }
    }, 8000 + Math.random() * 7000); // Bots talk at random intervals
    botIntervals[groupId] = intervalId;
};

const stopBotConversation = (groupId: string) => {
    if (botIntervals[groupId]) {
        clearInterval(botIntervals[groupId]);
        delete botIntervals[groupId];
    }
};

// Initialize some mock chat history
['group-1', 'group-2', 'group-3', 'group-4'].forEach(groupId => {
    if(!messagesByGroupId[groupId]) {
        messagesByGroupId[groupId] = [
            {
                id: new Date().toISOString() + Math.random(),
                user: MOCK_USERS[Math.floor(Math.random() * (MOCK_USERS.length -1)) + 1],
                text: `Welcome to the group chat!`,
                timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
            }
        ];
    }
});


export const chatService = {
    // Get initial messages for a group.
    getMessages(groupId: string): ChatMessage[] {
        return messagesByGroupId[groupId] || [];
    },

    // Subscribe to new messages for a group.
    subscribe(groupId: string, callback: Listener): () => void {
        if (!listenersByGroupId[groupId]) {
            listenersByGroupId[groupId] = new Set();
        }

        if (listenersByGroupId[groupId].size === 0) {
            startBotConversation(groupId);
        }
        listenersByGroupId[groupId].add(callback);

        // Return an unsubscribe function.
        return () => {
            listenersByGroupId[groupId]?.delete(callback);
            if (listenersByGroupId[groupId]?.size === 0) {
                stopBotConversation(groupId);
            }
        };
    },

    // Send a new message.
    sendMessage(groupId: string, user: User, text: string) {
        if (!text.trim()) return;

        const newMessage: ChatMessage = {
            id: new Date().toISOString(),
            user,
            text,
            timestamp: new Date().toISOString(),
        };

        if (!messagesByGroupId[groupId]) {
            messagesByGroupId[groupId] = [];
        }
        messagesByGroupId[groupId].push(newMessage);
        broadcast(groupId);
    }
};
