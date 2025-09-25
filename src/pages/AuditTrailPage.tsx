import React, { useState } from 'react';
import { History, Filter, Download, Eye, Shield, User, FileText, Gavel, Star, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { mockAuditEntries } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export function AuditTrailPage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [entityFilter, setEntityFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  // Extended mock audit data for demonstration
  const extendedAuditEntries = [
    ...mockAuditEntries,
    {
      id: 'audit-005',
      action: 'Tender Published',
      entity: 'tender' as const,
      entityId: 'tender-002',
      userId: 'admin-001',
      userName: 'Sarah Johnson',
      timestamp: new Date('2023-12-15T09:00:00Z'),
      blockchainHash: '0x7c3e5a1b8d6f9e2a4c7b5d8f2e6a9c1b4e7f0a8c6b4d2f9e',
      ipfsHash: 'QmB2CdOpO3zZaSu6dQ7hVwX2tP8qL0nJ9bI6aH6gZ5fE2',
      details: {
        tenderTitle: 'Smart City IoT Implementation',
        estimatedValue: 1800000,
        category: 'Technology'
      }
    },
    {
      id: 'audit-006',
      action: 'Bid Evaluated',
      entity: 'evaluation' as const,
      entityId: 'eval-002',
      userId: 'evaluator-001',
      userName: 'Dr. Emily Rodriguez',
      timestamp: new Date('2024-01-13T11:20:00Z'),
      blockchainHash: '0x3a8b6c4d2e9f1a7b5c8d6e4f9a2b7c5d8e1f6a9b4c7d5e8f',
      details: {
        tenderId: 'tender-001',
        bidId: 'bid-002',
        overallScore: 86.5,
        technicalScore: 82,
        financialScore: 92
      }
    },
    {
      id: 'audit-007',
      action: 'Award Finalized',
      entity: 'tender' as const,
      entityId: 'tender-004',
      userId: 'admin-001',
      userName: 'Sarah Johnson',
      timestamp: new Date('2023-12-15T16:30:00Z'),
      blockchainHash: '0x5a1c3b9d6e4f7c0a2b5d8e1f4a7c9b2d5e8f1a7c4b9d2e5f',
      ipfsHash: 'QmF6GhTsS7dDeWy0hU1lZbB6xT2uP4rN3fM0eL0kD9jI6',
      details: {
        tenderTitle: 'Hospital Equipment Procurement',
        awardedTo: 'MedEquip Solutions Ltd.',
        awardAmount: 3100000,
        nftTokenId: 'NFT-001'
      }
    },
    {
      id: 'audit-008',
      action: 'Document Uploaded',
      entity: 'tender' as const,
      entityId: 'tender-003',
      userId: 'admin-001',
      userName: 'Sarah Johnson',
      timestamp: new Date('2024-01-05T08:45:00Z'),
      blockchainHash: '0x6b2d4a0c7e5f8d1a3c6b4e7f1d5a8c0b3e6f9d7c4b1d0e8f',
      ipfsHash: 'QmD4EfRqQ5bBcUw8fS9jXzZ4vR0sN2pL1dK8cJ8iB7hG4',
      details: {
        fileName: 'School Tech Requirements.pdf',
        fileSize: 900000,
        documentType: 'technical_specification'
      }
    }
  ];

  const getActionIcon = (action: string) => {
    if (action.includes('Tender')) return <FileText className="h-4 w-4" />;
    if (action.includes('Bid')) return <Gavel className="h-4 w-4" />;
    if (action.includes('Evaluation') || action.includes('Evaluated')) return <Star className="h-4 w-4" />;
    if (action.includes('Award')) return <Shield className="h-4 w-4" />;
    return <History className="h-4 w-4" />;
  };

  const getActionColor = (action: string) => {
    if (action.includes('Created') || action.includes('Published')) return 'bg-blue-100 text-blue-800';
    if (action.includes('Submitted')) return 'bg-green-100 text-green-800';
    if (action.includes('Revealed') || action.includes('Evaluated')) return 'bg-purple-100 text-purple-800';
    if (action.includes('Award') || action.includes('Finalized')) return 'bg-amber-100 text-amber-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getEntityIcon = (entity: string) => {
    switch (entity) {
      case 'tender': return <FileText className="h-4 w-4" />;
      case 'bid': return <Gavel className="h-4 w-4" />;
      case 'evaluation': return <Star className="h-4 w-4" />;
      default: return <History className="h-4 w-4" />;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    }).format(date);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const exportAuditLog = () => {
    toast({
      title: "Exporting Audit Log",
      description: "Generating comprehensive audit report..."
    });

    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Audit log exported successfully as PDF"
      });
    }, 2000);
  };

  const filteredEntries = extendedAuditEntries.filter(entry => {
    const matchesSearch = 
      entry.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.entityId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAction = actionFilter === 'all' || entry.action.toLowerCase().includes(actionFilter.toLowerCase());
    const matchesEntity = entityFilter === 'all' || entry.entity === entityFilter;
    
    let matchesDate = true;
    if (dateFilter !== 'all') {
      const now = new Date();
      const entryDate = entry.timestamp;
      switch (dateFilter) {
        case 'today':
          matchesDate = entryDate.toDateString() === now.toDateString();
          break;
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          matchesDate = entryDate >= weekAgo;
          break;
        case 'month':
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          matchesDate = entryDate >= monthAgo;
          break;
      }
    }
    
    return matchesSearch && matchesAction && matchesEntity && matchesDate;
  });

  const AuditEntryCard = ({ entry }: { entry: any }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="text-sm">
                {entry.userName.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </div>
          
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge className={getActionColor(entry.action)}>
                  {getActionIcon(entry.action)}
                  <span className="ml-1">{entry.action}</span>
                </Badge>
                <Badge variant="outline">
                  {getEntityIcon(entry.entity)}
                  <span className="ml-1 capitalize">{entry.entity}</span>
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                {formatDate(entry.timestamp)}
              </div>
            </div>

            <div>
              <p className="text-sm">
                <span className="font-medium">{entry.userName}</span> performed action on{' '}
                <code className="bg-muted px-1 rounded text-xs">{entry.entityId}</code>
              </p>
            </div>

            {/* Action Details */}
            <div className="bg-muted p-3 rounded-lg space-y-2">
              <h4 className="font-semibold text-sm">Action Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                {Object.entries(entry.details).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </span>
                    <span className="font-medium">
                      {typeof value === 'number' && key.toLowerCase().includes('value') || key.toLowerCase().includes('amount')
                        ? formatCurrency(value as number)
                        : String(value)
                      }
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Blockchain Verification */}
            <div className="flex items-center justify-between bg-card border rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium">Blockchain Verified</span>
              </div>
              <div className="text-right">
                <code className="text-xs bg-muted px-2 py-1 rounded">
                  {entry.blockchainHash.slice(0, 10)}...{entry.blockchainHash.slice(-6)}
                </code>
                <Button variant="ghost" size="sm" className="ml-2 h-6 w-6 p-0">
                  <Eye className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center space-x-3">
            <History className="h-8 w-8 text-primary" />
            <span>Audit Trail</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive log of all system activities with blockchain verification
          </p>
        </div>
        
        <Button onClick={exportAuditLog} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Log
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <History className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">{extendedAuditEntries.length}</div>
                <p className="text-xs text-muted-foreground">Total Entries</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">100%</div>
                <p className="text-xs text-muted-foreground">Verified</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Active Users</p>
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
                  {extendedAuditEntries.filter(e => {
                    const today = new Date();
                    return e.timestamp.toDateString() === today.toDateString();
                  }).length}
                </div>
                <p className="text-xs text-muted-foreground">Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by action, user, or entity ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-full lg:w-[200px]">
                <SelectValue placeholder="Filter by action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="created">Created</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="evaluated">Evaluated</SelectItem>
                <SelectItem value="awarded">Awarded</SelectItem>
              </SelectContent>
            </Select>

            <Select value={entityFilter} onValueChange={setEntityFilter}>
              <SelectTrigger className="w-full lg:w-[150px]">
                <SelectValue placeholder="Filter by entity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Entities</SelectItem>
                <SelectItem value="tender">Tenders</SelectItem>
                <SelectItem value="bid">Bids</SelectItem>
                <SelectItem value="evaluation">Evaluations</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-full lg:w-[150px]">
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            Showing {filteredEntries.length} of {extendedAuditEntries.length} entries
          </span>
        </div>

        {filteredEntries.length > 0 ? (
          <div className="space-y-4">
            {filteredEntries.map((entry) => (
              <AuditEntryCard key={entry.id} entry={entry} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No audit entries found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or filters
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}