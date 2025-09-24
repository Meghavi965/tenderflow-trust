export type UserRole = "admin" | "bidder" | "evaluator";

export type TenderStatus = "draft" | "open" | "bidding" | "evaluation" | "awarded" | "archived";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organization: string;
  avatar?: string;
}

export interface Tender {
  id: string;
  title: string;
  description: string;
  category: string;
  estimatedValue: number;
  currency: string;
  status: TenderStatus;
  publishDate: Date;
  bidDeadline: Date;
  evaluationDeadline: Date;
  documents: TenderDocument[];
  bids: Bid[];
  evaluations: Evaluation[];
  blockchainHash?: string;
  ipfsHash?: string;
  createdBy: string;
  awardedTo?: string;
  nftTokenId?: string;
}

export interface TenderDocument {
  id: string;
  name: string;
  type: string;
  size: number;
  ipfsHash: string;
  uploadedAt: Date;
  uploadedBy: string;
}

export interface Bid {
  id: string;
  tenderId: string;
  bidderId: string;
  bidderName: string;
  bidderOrganization: string;
  commitHash: string;
  revealHash?: string;
  bidAmount?: number;
  documents: TenderDocument[];
  submittedAt: Date;
  status: "committed" | "revealed" | "evaluated";
  isWinner?: boolean;
}

export interface Evaluation {
  id: string;
  tenderId: string;
  bidId: string;
  evaluatorId: string;
  technicalScore: number;
  financialScore: number;
  overallScore: number;
  comments: string;
  evaluatedAt: Date;
  blockchainHash: string;
}

export interface AuditEntry {
  id: string;
  action: string;
  entity: "tender" | "bid" | "evaluation";
  entityId: string;
  userId: string;
  userName: string;
  timestamp: Date;
  blockchainHash: string;
  ipfsHash?: string;
  details: Record<string, any>;
}

export interface Notification {
  id: string;
  userId: string;
  type: "deadline" | "status_change" | "evaluation" | "award";
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  relatedEntity?: {
    type: "tender" | "bid";
    id: string;
  };
}