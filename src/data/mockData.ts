import { Tender, Bid, Evaluation, AuditEntry, Notification } from '@/types/tender';

export const mockTenders: Tender[] = [
  {
    id: 'tender-001',
    title: 'Municipal Road Infrastructure Development',
    description: 'Complete reconstruction of major city roads including drainage systems, street lighting, and pedestrian walkways. Project covers 15km of primary roads and 8km of secondary roads.',
    category: 'Infrastructure',
    estimatedValue: 2500000,
    currency: 'USD',
    status: 'bidding',
    publishDate: new Date('2024-01-01'),
    bidDeadline: new Date('2024-01-15'),
    evaluationDeadline: new Date('2024-01-25'),
    documents: [
      {
        id: 'doc-001',
        name: 'Technical Specifications.pdf',
        type: 'application/pdf',
        size: 2450000,
        ipfsHash: 'QmX7YzKjK9vVwQq2zN3dRtS8pL4mH6jG5xF2wE9cV1bA8',
        uploadedAt: new Date('2024-01-01'),
        uploadedBy: 'admin-001'
      },
      {
        id: 'doc-002',
        name: 'Site Survey Report.pdf',
        type: 'application/pdf',
        size: 1800000,
        ipfsHash: 'QmY8ZaLjL0wWxRr3aN4eStU9qM5nI7kH6yG3xF0dW2cB9',
        uploadedAt: new Date('2024-01-01'),
        uploadedBy: 'admin-001'
      }
    ],
    bids: [],
    evaluations: [],
    blockchainHash: '0x8d4f6a2b9c7e8f1a3b5d2c9e7f1a4b6d8e2f9a7c3b5d1e8f',
    ipfsHash: 'QmZ9AbMkM1xXyRs4bO5fTuV0rN6oJ8lI7zH4yG4eX3dC0',
    createdBy: 'admin-001'
  },
  {
    id: 'tender-002',
    title: 'Smart City IoT Implementation',
    description: 'Deployment of IoT sensors for traffic monitoring, air quality assessment, and smart parking systems across the metropolitan area.',
    category: 'Technology',
    estimatedValue: 1800000,
    currency: 'USD',
    status: 'evaluation',
    publishDate: new Date('2023-12-15'),
    bidDeadline: new Date('2024-01-10'),
    evaluationDeadline: new Date('2024-01-20'),
    documents: [
      {
        id: 'doc-003',
        name: 'IoT Requirements.pdf',
        type: 'application/pdf',
        size: 1200000,
        ipfsHash: 'QmA1BcNmN2yYzSt5cP6gUvW1sO7pK9mI8aH5zG5fY4eD1',
        uploadedAt: new Date('2023-12-15'),
        uploadedBy: 'admin-001'
      }
    ],
    bids: [],
    evaluations: [],
    blockchainHash: '0x7c3e5a1b8d6f9e2a4c7b5d8f2e6a9c1b4e7f0a8c6b4d2f9e',
    ipfsHash: 'QmB2CdOpO3zZaSu6dQ7hVwX2tP8qL0nJ9bI6aH6gZ5fE2',
    createdBy: 'admin-001'
  },
  {
    id: 'tender-003',
    title: 'Public School Technology Upgrade',
    description: 'Complete technology infrastructure upgrade for 12 public schools including computers, networking equipment, and educational software.',
    category: 'Education',
    estimatedValue: 950000,
    currency: 'USD',
    status: 'open',
    publishDate: new Date('2024-01-05'),
    bidDeadline: new Date('2024-01-20'),
    evaluationDeadline: new Date('2024-01-30'),
    documents: [
      {
        id: 'doc-004',
        name: 'School Tech Requirements.pdf',
        type: 'application/pdf',
        size: 900000,
        ipfsHash: 'QmC3DeQpP4aAbTv7eR8iWyY3uQ9rM1oK0cJ7bI7hA6gF3',
        uploadedAt: new Date('2024-01-05'),
        uploadedBy: 'admin-001'
      }
    ],
    bids: [],
    evaluations: [],
    blockchainHash: '0x6b2d4a0c7e5f8d1a3c6b4e7f1d5a8c0b3e6f9d7c4b1d0e8f',
    ipfsHash: 'QmD4EfRqQ5bBcUw8fS9jXzZ4vR0sN2pL1dK8cJ8iB7hG4',
    createdBy: 'admin-001'
  },
  {
    id: 'tender-004',
    title: 'Hospital Equipment Procurement',
    description: 'Procurement of advanced medical equipment including MRI machines, CT scanners, and surgical instruments for regional hospital.',
    category: 'Healthcare',
    estimatedValue: 3200000,
    currency: 'USD',
    status: 'awarded',
    publishDate: new Date('2023-11-01'),
    bidDeadline: new Date('2023-12-01'),
    evaluationDeadline: new Date('2023-12-15'),
    documents: [
      {
        id: 'doc-005',
        name: 'Medical Equipment Specs.pdf',
        type: 'application/pdf',
        size: 1500000,
        ipfsHash: 'QmE5FgSrR6cCdVx9gT0kYaA5wS1tO3qM2eL9dK9jC8iH5',
        uploadedAt: new Date('2023-11-01'),
        uploadedBy: 'admin-001'
      }
    ],
    bids: [],
    evaluations: [],
    blockchainHash: '0x5a1c3b9d6e4f7c0a2b5d8e1f4a7c9b2d5e8f1a7c4b9d2e5f',
    ipfsHash: 'QmF6GhTsS7dDeWy0hU1lZbB6xT2uP4rN3fM0eL0kD9jI6',
    createdBy: 'admin-001',
    awardedTo: 'bidder-002',
    nftTokenId: 'NFT-001'
  }
];

export const mockBids: Bid[] = [
  {
    id: 'bid-001',
    tenderId: 'tender-001',
    bidderId: 'bidder-001',
    bidderName: 'TechBuild Solutions Ltd.',
    bidderOrganization: 'TechBuild Solutions Ltd.',
    commitHash: '0x9f7e5d3b1a8c6e4f2a7d9b5e8c1f6a4b9d2e7f5c8a1b6e4f',
    revealHash: '0x8e6d4c2a9b7f5e3c1a8d6b4f9e2c7f5a2b8e6d9c4f1a7b5d',
    bidAmount: 2350000,
    documents: [
      {
        id: 'bid-doc-001',
        name: 'Technical Proposal.pdf',
        type: 'application/pdf',
        size: 1800000,
        ipfsHash: 'QmG7HiUtT8eEfXz1iV2mAcC7yU3vQ5sO4gN1fM1lE0kJ7',
        uploadedAt: new Date('2024-01-08'),
        uploadedBy: 'bidder-001'
      }
    ],
    submittedAt: new Date('2024-01-08'),
    status: 'revealed'
  },
  {
    id: 'bid-002',
    tenderId: 'tender-001',
    bidderId: 'bidder-002',
    bidderName: 'InfraCorp Engineering',
    bidderOrganization: 'InfraCorp Engineering',
    commitHash: '0x7d5b3f1a9e8c6f4b2d7a9c5e8f1b6d4a9e2f7c5a8b1d6f4e',
    revealHash: '0x6c4a2e8d7b5f3e1c9a7d5b3f8e1c6f4a8d2e7b5c9f1a6d4e',
    bidAmount: 2280000,
    documents: [
      {
        id: 'bid-doc-002',
        name: 'Engineering Proposal.pdf',
        type: 'application/pdf',
        size: 2100000,
        ipfsHash: 'QmH8JjVuU9fFgYa2jW3nBdD8zV4wR6tP5hO2gN2mF1lK8',
        uploadedAt: new Date('2024-01-09'),
        uploadedBy: 'bidder-002'
      }
    ],
    submittedAt: new Date('2024-01-09'),
    status: 'revealed'
  }
];

export const mockEvaluations: Evaluation[] = [
  {
    id: 'eval-001',
    tenderId: 'tender-002',
    bidId: 'bid-001',
    evaluatorId: 'evaluator-001',
    technicalScore: 85,
    financialScore: 92,
    overallScore: 88.5,
    comments: 'Strong technical proposal with competitive pricing. Good track record and timeline feasibility.',
    evaluatedAt: new Date('2024-01-12'),
    blockchainHash: '0x4b9d7f2e5a8c1f6d4b9e2f7a5c8d1e6f9b2e5a7c4f1d8b6e'
  }
];

export const mockAuditEntries: AuditEntry[] = [
  {
    id: 'audit-001',
    action: 'Tender Created',
    entity: 'tender',
    entityId: 'tender-001',
    userId: 'admin-001',
    userName: 'Sarah Johnson',
    timestamp: new Date('2024-01-01T10:00:00Z'),
    blockchainHash: '0x8d4f6a2b9c7e8f1a3b5d2c9e7f1a4b6d8e2f9a7c3b5d1e8f',
    ipfsHash: 'QmZ9AbMkM1xXyRs4bO5fTuV0rN6oJ8lI7zH4yG4eX3dC0',
    details: {
      tenderTitle: 'Municipal Road Infrastructure Development',
      estimatedValue: 2500000,
      category: 'Infrastructure'
    }
  },
  {
    id: 'audit-002',
    action: 'Bid Submitted',
    entity: 'bid',
    entityId: 'bid-001',
    userId: 'bidder-001',
    userName: 'Michael Chen',
    timestamp: new Date('2024-01-08T14:30:00Z'),
    blockchainHash: '0x9f7e5d3b1a8c6e4f2a7d9b5e8c1f6a4b9d2e7f5c8a1b6e4f',
    details: {
      tenderId: 'tender-001',
      commitHash: '0x9f7e5d3b1a8c6e4f2a7d9b5e8c1f6a4b9d2e7f5c8a1b6e4f',
      organization: 'TechBuild Solutions Ltd.'
    }
  },
  {
    id: 'audit-003',
    action: 'Bid Revealed',
    entity: 'bid',
    entityId: 'bid-001',
    userId: 'bidder-001',
    userName: 'Michael Chen',
    timestamp: new Date('2024-01-11T09:15:00Z'),
    blockchainHash: '0x8e6d4c2a9b7f5e3c1a8d6b4f9e2c7f5a2b8e6d9c4f1a7b5d',
    details: {
      tenderId: 'tender-001',
      revealHash: '0x8e6d4c2a9b7f5e3c1a8d6b4f9e2c7f5a2b8e6d9c4f1a7b5d',
      bidAmount: 2350000
    }
  },
  {
    id: 'audit-004',
    action: 'Evaluation Completed',
    entity: 'evaluation',
    entityId: 'eval-001',
    userId: 'evaluator-001',
    userName: 'Dr. Emily Rodriguez',
    timestamp: new Date('2024-01-12T16:45:00Z'),
    blockchainHash: '0x4b9d7f2e5a8c1f6d4b9e2f7a5c8d1e6f9b2e5a7c4f1d8b6e',
    details: {
      tenderId: 'tender-002',
      bidId: 'bid-001',
      overallScore: 88.5,
      technicalScore: 85,
      financialScore: 92
    }
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'notif-001',
    userId: 'admin-001',
    type: 'deadline',
    title: 'Tender Deadline Approaching',
    message: 'Municipal Road Infrastructure Development tender closes in 3 days.',
    isRead: false,
    createdAt: new Date('2024-01-12T10:00:00Z'),
    relatedEntity: {
      type: 'tender',
      id: 'tender-001'
    }
  },
  {
    id: 'notif-002',
    userId: 'bidder-001',
    type: 'status_change',
    title: 'Bid Status Updated',
    message: 'Your bid for Smart City IoT Implementation is now under evaluation.',
    isRead: false,
    createdAt: new Date('2024-01-11T14:30:00Z'),
    relatedEntity: {
      type: 'bid',
      id: 'bid-001'
    }
  },
  {
    id: 'notif-003',
    userId: 'evaluator-001',
    type: 'evaluation',
    title: 'New Evaluation Required',
    message: 'Smart City IoT Implementation tender requires your evaluation.',
    isRead: true,
    createdAt: new Date('2024-01-10T09:00:00Z'),
    relatedEntity: {
      type: 'tender',
      id: 'tender-002'
    }
  }
];

export const blockchainData = {
  networkStatus: {
    isHealthy: true,
    lastBlock: 18945672,
    gasPrice: '15 gwei',
    tps: 14.3,
    lastSync: new Date()
  },
  contractAddresses: {
    tender: '0x742d35Cc6634C0532925a3b8d0bC64Ca24a3b8e0',
    bidding: '0x8d4f6a2b9c7e8f1a3b5d2c9e7f1a4b6d8e2f9a7c',
    evaluation: '0x5a1c3b9d6e4f7c0a2b5d8e1f4a7c9b2d5e8f1a7c'
  },
  verificationStats: {
    totalTransactions: 1247,
    verifiedTenders: 89,
    verifiedBids: 234,
    verificationRate: 100
  }
};