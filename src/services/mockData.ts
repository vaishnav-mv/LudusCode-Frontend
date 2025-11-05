import { Role, User } from '../types'

export const MOCK_USERS: User[] = [
  { id: 'user-1', name: 'Alice', email: 'alice@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=user-1', rank: 'Diamond Coder', elo: 2450, duelsWon: 88, duelsLost: 20, role: Role.User, isAdmin: true, isBanned: false, isPremium: false },
  { id: 'user-2', name: 'Bob', email: 'bob@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=user-2', rank: 'Platinum Coder', elo: 2100, duelsWon: 65, duelsLost: 35, role: Role.User, isBanned: false, isPremium: true },
  { id: 'user-3', name: 'Charlie', email: 'charlie@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=user-3', rank: 'Gold Coder', elo: 1850, duelsWon: 40, duelsLost: 30, role: Role.User, isBanned: false, isPremium: false },
  { id: 'user-4', name: 'Diana', email: 'diana@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=user-4', rank: 'Silver Coder', elo: 1600, duelsWon: 25, duelsLost: 28, role: Role.User, isBanned: true, isPremium: false },
  { id: 'user-5', name: 'Eve', email: 'eve@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=user-5', rank: 'Bronze Coder', elo: 1350, duelsWon: 15, duelsLost: 25, role: Role.User, isBanned: false, isPremium: false },
];

