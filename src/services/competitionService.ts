export interface CreateCompetitionData {
    groupId: string;
    title: string;
    startTime: string;
    durationMinutes: number;
    problemCounts: {
        easy: number;
        medium: number;
        hard: number;
    };
}