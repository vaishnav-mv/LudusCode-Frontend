export enum Role {
  User = 'USER',
  Leader = 'LEADER',
  Admin = 'ADMIN',
}

export enum GroupStatus {
  Pending = 'PENDING',
  Approved = 'APPROVED',
  Rejected = 'REJECTED',
}

export enum Difficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}

export enum ProblemStatus {
  Pending = 'Pending',
  Approved = 'Approved',
}

export enum DuelStatus {
  Waiting = 'Waiting',
  InProgress = 'In Progress',
  Finished = 'Finished',
}

export enum CompetitionStatus {
  Upcoming = 'Upcoming',
  Active = 'Active',
  Completed = 'Completed',
}

export enum SubmissionStatus {
  Accepted = 'Accepted',
  WrongAnswer = 'Wrong Answer',
  TimeLimitExceeded = 'Time Limit Exceeded',
  RuntimeError = 'Runtime Error',
  Disqualified = 'Disqualified',
}

export enum TransactionType {
  Deposit = 'Deposit',
  Withdrawal = 'Withdrawal',
  DuelWager = 'Duel Wager',
  DuelWin = 'Duel Win',
}

export enum TransactionStatus {
  Completed = 'Completed',
  Pending = 'Pending',
  Failed = 'Failed',
}

export enum AchievementRarity {
  Common = 'Common',
  Rare = 'Rare',
  Epic = 'Epic',
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: AchievementRarity;
}

export interface UserAchievement {
  achievementId: string;
  unlockedAt: string;
}

export interface User {
  id: string;
  username?: string;
  name: string;
  email: string;
  avatarUrl?: string;
  rank?: string;
  elo?: number;
  duelsWon?: number;
  duelsLost?: number;
  role: Role;
  isVerified?: boolean;
  isAdmin?: boolean;
  isBanned?: boolean;
  isPremium?: boolean;
  createdAt?: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  topics: string[];
  members: User[];
  leader: User | null;
  status: GroupStatus;
  rejectionReason?: string;
  createdAt: string;
}

export interface TestCase {
  input: string;
  output: string;
  isSample: boolean;
}

export interface Solution {
  language: string;
  code: string;
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  constraints: string[];
  inputFormat: string;
  outputFormat: string;
  testCases: TestCase[];
  solution: Solution;
  status: ProblemStatus;
}

export interface DuelPlayer {
  user: User;
  warnings: number;
}

export interface Duel {
  id: string;
  problem: Problem;
  player1: DuelPlayer;
  player2: DuelPlayer;
  status: DuelStatus;
  startTime: number;
  winner?: User | null;
  wager?: number;
}

export interface CompetitionProblem {
  problem: Problem;
  points: number;
}

export interface TestCaseResult {
  testCase: TestCase;
  status: SubmissionStatus;
  userOutput: string;
}

export interface SubmissionResult {
  overallStatus: SubmissionStatus;
  results: TestCaseResult[];
  executionTime: number;
  memoryUsage: number;
}

export interface Submission {
  id: string;
  problem: Problem;
  userCode: string;
  result: SubmissionResult;
  submittedAt: string;
}

export interface ParticipantProblemStatus {
  solved: boolean;
  score: number;
  attempts: number;
  bestSubmission?: Submission;
}

export interface CompetitionParticipant {
  user: User;
  score: number;
  rank: number;
  problemStatus: Record<string, ParticipantProblemStatus>;
}

export interface Competition {
  id: string;
  groupId: string;
  title: string;
  startTime: string;
  durationMinutes: number;
  problems: CompetitionProblem[];
  participants: CompetitionParticipant[];
  status: CompetitionStatus;
}

export interface UserProfile {
  user: User;
  submissionStats: {
    total: number;
    accepted: number;
    acceptanceRate: number;
  };
  recentDuels: Duel[];
  joinedGroups: Group[];
  unlockedAchievements: UserAchievement[];
}

export interface AIPerformanceAnalysis {
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

export interface AICodeReview {
  complexityAnalysis: string;
  readabilityScore: number;
  readabilityFeedback: string;
  suggestions: string[];
}

export interface Transaction {
  id: string;
  type: TransactionType;
  status: TransactionStatus;
  amount: number;
  description: string;
  timestamp: string;
}

export interface Wallet {
  userId: string;
  balance: number;
  currency: string;
  transactions: Transaction[];
}

export interface ChatMessage {
  id: string;
  user: User;
  text: string;
  timestamp: string;
}
