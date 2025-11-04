
export enum Role {
    User = 'USER',
    Leader = 'LEADER',
    Admin = 'ADMIN',
}

export interface User {
    id: string;
    username: string;
    name: string;
    email: string;
    role: Role;
    isVerified: boolean;
    createdAt: string;
}

export enum GroupStatus {
    Pending = 'PENDING',
    Approved = 'APPROVED',
    Rejected = 'REJECTED',
}

export interface Group {
    id: string;
    name: string;
    leader: User | null;
    status: GroupStatus;
    createdAt: string;
}
