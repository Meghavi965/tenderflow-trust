import React, { useState } from 'react';
import { Trophy, Shield, Download, Eye, Star, Calendar, DollarSign, User, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export function AwardsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Mock awarded tender data
  const awardedTenders = [
    {
      id: 'tender-004',
      title: 'Hospital Equipment Procurement',
      category: 'Healthcare',
      estimatedValue: 3200000,
      actualValue: 3100000,
      awardedAt: new Date('2023-12-15'),
      awardedTo: {
        id: 'bidder-002',
        name: 'MedEquip Solutions Ltd.',
        organization: 'MedEquip Solutions Ltd.',
        contactEmail: 'contracts@medequip.com',
        avatar: null
      },
      evaluationScore: {
        technical: 95,
        financial: 88,
        overall: 92.2
      },
      nftCertificate: {
        tokenId: 'NFT-001',
        contractAddress: '0x742d35Cc6634C0532925a3b8d0bC64Ca24a3b8e0',
        metadataURI: 'ipfs://QmF6GhTsS7dDeWy0hU1lZbB6xT2uP4rN3fM0eL0kD9jI6'
      },
      blockchainHash: '0x5a1c3b9d6e4f7c0a2b5d8e1f4a7c9b2d5e8f1a7c4b9d2e5f',
      ipfsHash: 'QmF6GhTsS7dDeWy0hU1lZbB6xT2uP4rN3fM0eL0kD9jI6',
      documents: [
        {
          id: 'award-doc-001',
          name: 'Award Letter.pdf',
          type: 'award_letter',
          ipfsHash: 'QmA1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V'
        },
        {
          id: 'award-doc-002',
          name: 'Contract Agreement.pdf',
          type: 'contract',
          ipfsHash: 'QmZ9Y8X7W6V5U4T3S2R1Q0P9O8N7M6L5K4J3I2H1G0F9E'
        }
      ],
      milestones: [
        { id: 1, name: 'Project Kickoff', dueDate: new Date('2024-01-01'), status: 'completed' },
        { id: 2, name: 'Phase 1 Delivery', dueDate: new Date('2024-03-15'), status: 'in_progress' },
        { id: 3, name: 'Phase 2 Delivery', dueDate: new Date('2024-06-30'), status: 'pending' },
        { id: 4, name: 'Final Delivery', dueDate: new Date('2024-09-30'), status: 'pending' }
      ]
    },
    {
      id: 'tender-006',
      title: 'Green Energy Infrastructure',
      category: 'Environment',
      estimatedValue: 4500000,
      actualValue: 4200000,
      awardedAt: new Date('2023-11-20'),
      awardedTo: {
        id: 'bidder-003',
        name: 'EcoEnergy Corp',
        organization: 'EcoEnergy Corporation',
        contactEmail: 'projects@ecoenergy.com',
        avatar: null
      },
      evaluationScore: {
        technical: 90,
        financial: 85,
        overall: 88.0
      },
      nftCertificate: {
        tokenId: 'NFT-002',
        contractAddress: '0x742d35Cc6634C0532925a3b8d0bC64Ca24a3b8e0',
        metadataURI: 'ipfs://QmG7HiUtT8eEfXz1iV2mAcC7yU3vQ5sO4gN1fM1lE0kJ7'
      },
      blockchainHash: '0x4a0b2c8e5f6d9c1a3e7b4f8d1e5a9c2b6e9f2a8c5f1b4e7d',
      ipfsHash: 'QmG7HiUtT8eEfXz1iV2mAcC7yU3vQ5sO4gN1fM1lE0kJ7',
      documents: [
        {
          id: 'award-doc-003',
          name: 'Award Certificate.pdf',
          type: 'award_letter',
          ipfsHash: 'QmB2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W'
        }
      ],
      milestones: [
        { id: 1, name: 'Site Assessment', dueDate: new Date('2023-12-01'), status: 'completed' },
        { id: 2, name: 'Equipment Installation', dueDate: new Date('2024-02-28'), status: 'completed' },
        { id: 3, name: 'System Testing', dueDate: new Date('2024-04-15'), status: 'in_progress' },
        { id: 4, name: 'Go Live', dueDate: new Date('2024-05-30'), status: 'pending' }
      ]
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const getMilestoneStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const downloadNFTCertificate = async (tender: any) => {
    toast({
      title: "Downloading NFT Certificate",
      description: "Generating blockchain-verified award certificate..."
    });

    // Simulate download
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: `NFT Certificate for ${tender.title} downloaded successfully.`
      });
    }, 2000);
  };

  const filteredTenders = awardedTenders.filter(tender => {
    const matchesSearch = tender.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tender.awardedTo.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || tender.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const AwardCard = ({ tender }: { tender: any }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              <span>{tender.title}</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">{tender.category}</Badge>
              <Badge className="bg-green-100 text-green-800">
                <Shield className="h-3 w-3 mr-1" />
                NFT Certified
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              {formatCurrency(tender.actualValue)}
            </div>
            <div className="text-sm text-muted-foreground">Award Amount</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Winner Information */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm flex items-center">
            <User className="h-4 w-4 mr-2" />
            Awarded To
          </h4>
          <div className="bg-muted p-4 rounded-lg">
            <div className="font-medium">{tender.awardedTo.name}</div>
            <div className="text-sm text-muted-foreground">{tender.awardedTo.organization}</div>
            <div className="text-sm text-muted-foreground">{tender.awardedTo.contactEmail}</div>
          </div>
        </div>

        {/* Evaluation Scores */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm flex items-center">
            <Star className="h-4 w-4 mr-2" />
            Evaluation Results
          </h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{tender.evaluationScore.technical}</div>
              <div className="text-xs text-muted-foreground">Technical</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{tender.evaluationScore.financial}</div>
              <div className="text-xs text-muted-foreground">Financial</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{tender.evaluationScore.overall}</div>
              <div className="text-xs text-muted-foreground">Overall</div>
            </div>
          </div>
        </div>

        {/* Project Milestones */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Project Milestones
          </h4>
          <div className="space-y-2">
            {tender.milestones.map((milestone: any) => (
              <div key={milestone.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    milestone.status === 'completed' ? 'bg-green-500' :
                    milestone.status === 'in_progress' ? 'bg-blue-500' : 'bg-gray-300'
                  }`}></div>
                  <span className="text-sm">{milestone.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground">
                    {formatDate(milestone.dueDate)}
                  </span>
                  <Badge className={getMilestoneStatusColor(milestone.status)}>
                    {milestone.status.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NFT Certificate */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            NFT Certificate
          </h4>
          <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-4 rounded-lg border border-amber-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-amber-800">Token #{tender.nftCertificate.tokenId}</div>
                <div className="text-xs text-amber-600">
                  Contract: {tender.nftCertificate.contractAddress.slice(0, 10)}...
                </div>
              </div>
              <Button 
                onClick={() => downloadNFTCertificate(tender)}
                size="sm"
                variant="outline"
                className="border-amber-300 text-amber-700 hover:bg-amber-100"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>

        {/* Blockchain Verification */}
        <div className="bg-card border rounded-lg p-3 space-y-2">
          <h4 className="font-semibold text-sm flex items-center">
            <Shield className="h-4 w-4 mr-2 text-accent" />
            Blockchain Verification
          </h4>
          <div className="text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Award Hash:</span>
              <code className="bg-muted px-1 rounded text-xs">
                {tender.blockchainHash.slice(0, 10)}...{tender.blockchainHash.slice(-6)}
              </code>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">IPFS Hash:</span>
              <code className="bg-muted px-1 rounded text-xs">
                {tender.ipfsHash.slice(0, 10)}...{tender.ipfsHash.slice(-6)}
              </code>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Awarded:</span>
              <span>{formatDate(tender.awardedAt)}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <FileText className="h-4 w-4 mr-2" />
            Documents
          </Button>
          {user?.role === 'admin' && (
            <Button size="sm" className="flex-1">
              Manage Project
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center space-x-3">
          <Trophy className="h-8 w-8 text-amber-500" />
          <span>Tender Awards</span>
        </h1>
        <p className="text-muted-foreground mt-1">
          Track awarded tenders and their NFT certificates
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Trophy className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">{awardedTenders.length}</div>
                <p className="text-xs text-muted-foreground">Total Awards</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">
                  {formatCurrency(awardedTenders.reduce((sum, t) => sum + t.actualValue, 0))}
                </div>
                <p className="text-xs text-muted-foreground">Total Value</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">{awardedTenders.length}</div>
                <p className="text-xs text-muted-foreground">NFT Certificates</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">
                  {awardedTenders.filter(t => 
                    t.milestones.some(m => m.status === 'in_progress')
                  ).length}
                </div>
                <p className="text-xs text-muted-foreground">Active Projects</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search awards by tender title or winner..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Healthcare">Healthcare</SelectItem>
                <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Environment">Environment</SelectItem>
                <SelectItem value="Education">Education</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Awards Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredTenders.map((tender) => (
          <AwardCard key={tender.id} tender={tender} />
        ))}
      </div>

      {filteredTenders.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No awards found</h3>
            <p className="text-muted-foreground">
              No awarded tenders match your current search criteria
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}