import React, { useState } from 'react';
import { Eye, Clock, CheckCircle, AlertCircle, Trophy, FileText, Shield, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { mockTenders, mockBids } from '@/data/mockData';
import { Link } from 'react-router-dom';

export function MyBidsPage() {
  const [selectedTab, setSelectedTab] = useState('active');

  // Mock data for current user's bids
  const myBids = [
    {
      id: 'bid-001',
      tenderId: 'tender-001',
      tenderTitle: 'Municipal Road Infrastructure Development',
      status: 'revealed',
      bidAmount: 2350000,
      submittedAt: new Date('2024-01-08'),
      revealedAt: new Date('2024-01-11'),
      commitHash: '0x9f7e5d3b1a8c6e4f2a7d9b5e8c1f6a4b9d2e7f5c8a1b6e4f',
      revealHash: '0x8e6d4c2a9b7f5e3c1a8d6b4f9e2c7f5a2b8e6d9c4f1a7b5d',
      isWinner: false,
      evaluation: {
        technicalScore: 85,
        financialScore: 92,
        overallScore: 88.5,
        feedback: 'Strong technical proposal with competitive pricing.'
      }
    },
    {
      id: 'bid-002',
      tenderId: 'tender-002',
      tenderTitle: 'Smart City IoT Implementation',
      status: 'committed',
      bidAmount: null,
      submittedAt: new Date('2024-01-09'),
      commitHash: '0x7d5b3f1a9e8c6f4b2d7a9c5e8f1b6d4a9e2f7c5a8b1d6f4e',
      revealDeadline: new Date('2024-01-16'),
      isWinner: null
    },
    {
      id: 'bid-003',
      tenderId: 'tender-004',
      tenderTitle: 'Hospital Equipment Procurement',
      status: 'revealed',
      bidAmount: 3100000,
      submittedAt: new Date('2023-11-25'),
      revealedAt: new Date('2023-12-02'),
      commitHash: '0x6c4a2e8d7b5f3e1c9a7d5b3f8e1c6f4a8d2e7b5c9f1a6d4e',
      revealHash: '0x5b3a1d7c6e4f2e0c8a6d4b2f7e0c5f3a7d1e6b4c8f0a5d3e',
      isWinner: true,
      awardedAt: new Date('2023-12-15'),
      nftTokenId: 'NFT-001'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'committed': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'revealed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'evaluated': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'awarded': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string, isWinner?: boolean | null) => {
    if (isWinner === true) return <Trophy className="h-4 w-4" />;
    if (isWinner === false) return <AlertCircle className="h-4 w-4" />;
    
    switch (status) {
      case 'committed': return <Clock className="h-4 w-4" />;
      case 'revealed': return <Eye className="h-4 w-4" />;
      case 'evaluated': return <CheckCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const formatCurrency = (amount: number | null) => {
    if (!amount) return 'Hidden';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getDaysUntilReveal = (deadline: Date) => {
    const now = new Date();
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const activeBids = myBids.filter(bid => bid.status === 'committed' || bid.status === 'revealed');
  const completedBids = myBids.filter(bid => bid.isWinner !== null);
  const winningBids = myBids.filter(bid => bid.isWinner === true);

  const BidCard = ({ bid }: { bid: any }) => (
    <Card key={bid.id} className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <CardTitle className="text-lg">{bid.tenderTitle}</CardTitle>
            <div className="flex items-center space-x-2">
              <Badge className={getStatusColor(bid.isWinner === true ? 'awarded' : bid.status)}>
                <div className="flex items-center space-x-1">
                  {getStatusIcon(bid.status, bid.isWinner)}
                  <span>
                    {bid.isWinner === true ? 'Won' : 
                     bid.isWinner === false ? 'Not Selected' :
                     bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                  </span>
                </div>
              </Badge>
              {bid.nftTokenId && (
                <Badge variant="outline" className="text-green-600 border-green-300">
                  <Shield className="h-3 w-3 mr-1" />
                  NFT Certified
                </Badge>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              {formatCurrency(bid.bidAmount)}
            </div>
            <div className="text-sm text-muted-foreground">Your Bid</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Bid Timeline */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-muted-foreground">Submitted:</span>
            <span>{formatDate(bid.submittedAt)}</span>
          </div>
          
          {bid.revealedAt && (
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-muted-foreground">Revealed:</span>
              <span>{formatDate(bid.revealedAt)}</span>
            </div>
          )}
          
          {bid.awardedAt && (
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-gold rounded-full"></div>
              <span className="text-muted-foreground">Awarded:</span>
              <span>{formatDate(bid.awardedAt)}</span>
            </div>
          )}
        </div>

        {/* Commit/Reveal Phase Info */}
        {bid.status === 'committed' && bid.revealDeadline && (
          <Alert>
            <Clock className="h-4 w-4" />
            <AlertDescription>
              Reveal phase begins soon. You have {getDaysUntilReveal(bid.revealDeadline)} days to reveal your bid.
            </AlertDescription>
          </Alert>
        )}

        {/* Evaluation Results */}
        {bid.evaluation && (
          <div className="bg-muted p-4 rounded-lg space-y-3">
            <h4 className="font-semibold text-sm">Evaluation Results</h4>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-muted-foreground">Technical</div>
                <div className="flex items-center space-x-2">
                  <Progress value={bid.evaluation.technicalScore} className="h-2" />
                  <span className="text-sm font-medium">{bid.evaluation.technicalScore}/100</span>
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Financial</div>
                <div className="flex items-center space-x-2">
                  <Progress value={bid.evaluation.financialScore} className="h-2" />
                  <span className="text-sm font-medium">{bid.evaluation.financialScore}/100</span>
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Overall</div>
                <div className="flex items-center space-x-2">
                  <Progress value={bid.evaluation.overallScore} className="h-2" />
                  <span className="text-sm font-medium">{bid.evaluation.overallScore}/100</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground italic">"{bid.evaluation.feedback}"</p>
          </div>
        )}

        {/* Blockchain Verification */}
        <div className="bg-card border rounded-lg p-3 space-y-2">
          <h4 className="font-semibold text-sm flex items-center">
            <Shield className="h-4 w-4 mr-2 text-accent" />
            Blockchain Verification
          </h4>
          <div className="text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Commit Hash:</span>
              <code className="bg-muted px-1 rounded text-xs">
                {bid.commitHash.slice(0, 10)}...{bid.commitHash.slice(-6)}
              </code>
            </div>
            {bid.revealHash && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Reveal Hash:</span>
                <code className="bg-muted px-1 rounded text-xs">
                  {bid.revealHash.slice(0, 10)}...{bid.revealHash.slice(-6)}
                </code>
              </div>
            )}
            {bid.nftTokenId && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">NFT Token:</span>
                <code className="bg-muted px-1 rounded text-xs">
                  {bid.nftTokenId}
                </code>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Button asChild variant="outline" size="sm">
            <Link to={`/tender/${bid.tenderId}`}>
              <Eye className="h-4 w-4 mr-2" />
              View Tender
            </Link>
          </Button>
          
          {bid.status === 'committed' && (
            <Button size="sm">
              Reveal Bid
            </Button>
          )}
          
          <Button asChild variant="outline" size="sm">
            <Link to={`/verification?hash=${bid.commitHash}`}>
              <Shield className="h-4 w-4 mr-2" />
              Verify
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">My Bids</h1>
        <p className="text-muted-foreground mt-1">
          Track your submitted bids and their status
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">{myBids.length}</div>
                <p className="text-xs text-muted-foreground">Total Bids</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">{activeBids.length}</div>
                <p className="text-xs text-muted-foreground">Active Bids</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Trophy className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">{winningBids.length}</div>
                <p className="text-xs text-muted-foreground">Won Bids</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">
                  {completedBids.length > 0 ? Math.round((winningBids.length / completedBids.length) * 100) : 0}%
                </div>
                <p className="text-xs text-muted-foreground">Win Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="active">Active Bids ({activeBids.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedBids.length})</TabsTrigger>
          <TabsTrigger value="won">Won Bids ({winningBids.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          {activeBids.length > 0 ? (
            <div className="space-y-4">
              {activeBids.map((bid) => (
                <BidCard key={bid.id} bid={bid} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No active bids</h3>
                <p className="text-muted-foreground mb-4">
                  You don't have any active bids at the moment
                </p>
                <Button asChild>
                  <Link to="/tenders">Browse Available Tenders</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          {completedBids.length > 0 ? (
            <div className="space-y-4">
              {completedBids.map((bid) => (
                <BidCard key={bid.id} bid={bid} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No completed bids</h3>
                <p className="text-muted-foreground">
                  Your completed bid evaluations will appear here
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="won" className="space-y-6">
          {winningBids.length > 0 ? (
            <div className="space-y-4">
              {winningBids.map((bid) => (
                <BidCard key={bid.id} bid={bid} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No winning bids yet</h3>
                <p className="text-muted-foreground mb-4">
                  Keep participating in tenders to increase your success rate
                </p>
                <Button asChild>
                  <Link to="/tenders">Find New Opportunities</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}