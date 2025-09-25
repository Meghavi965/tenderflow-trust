import React, { useState } from 'react';
import { Shield, Search, CheckCircle, AlertTriangle, Clock, Hash, FileText, Link } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { blockchainData } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export function VerificationPage() {
  const { toast } = useToast();
  const [verificationHash, setVerificationHash] = useState('');
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Mock verification results
  const mockVerificationData = {
    '0x8d4f6a2b9c7e8f1a3b5d2c9e7f1a4b6d8e2f9a7c3b5d1e8f': {
      type: 'tender',
      title: 'Municipal Road Infrastructure Development',
      status: 'verified',
      blockNumber: 18945672,
      timestamp: new Date('2024-01-01T10:00:00Z'),
      gasUsed: 142580,
      confirmations: 125847,
      ipfsHash: 'QmZ9AbMkM1xXyRs4bO5fTuV0rN6oJ8lI7zH4yG4eX3dC0',
      metadata: {
        estimatedValue: 2500000,
        category: 'Infrastructure',
        publisher: 'Department of Public Works'
      }
    },
    '0x9f7e5d3b1a8c6e4f2a7d9b5e8c1f6a4b9d2e7f5c8a1b6e4f': {
      type: 'bid',
      title: 'Bid for Municipal Road Infrastructure',
      status: 'verified',
      blockNumber: 18946105,
      timestamp: new Date('2024-01-08T14:30:00Z'),
      gasUsed: 98420,
      confirmations: 124892,
      ipfsHash: 'QmG7HiUtT8eEfXz1iV2mAcC7yU3vQ5sO4gN1fM1lE0kJ7',
      metadata: {
        bidder: 'TechBuild Solutions Ltd.',
        tenderId: 'tender-001',
        commitPhase: true
      }
    },
    '0x4b9d7f2e5a8c1f6d4b9e2f7a5c8d1e6f9b2e5a7c4f1d8b6e': {
      type: 'evaluation',
      title: 'Evaluation for Smart City IoT Implementation',
      status: 'verified',
      blockNumber: 18946890,
      timestamp: new Date('2024-01-12T16:45:00Z'),
      gasUsed: 156720,
      confirmations: 123485,
      ipfsHash: 'QmH8JjVuU9fFgYa2jW3nBdD8zV4wR6tP5hO2gN2mF1lK8',
      metadata: {
        evaluator: 'Dr. Emily Rodriguez',
        overallScore: 88.5,
        tenderId: 'tender-002'
      }
    }
  };

  const handleVerification = async () => {
    if (!verificationHash.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter a transaction hash to verify",
        variant: "destructive"
      });
      return;
    }

    setIsVerifying(true);
    setVerificationResult(null);

    try {
      // Simulate blockchain verification
      await new Promise(resolve => setTimeout(resolve, 2000));

      const result = mockVerificationData[verificationHash as keyof typeof mockVerificationData];
      
      if (result) {
        setVerificationResult(result);
        toast({
          title: "Verification Complete",
          description: `${result.type.charAt(0).toUpperCase() + result.type.slice(1)} verified successfully on blockchain`,
          variant: "default"
        });
      } else {
        setVerificationResult({
          status: 'not_found',
          message: 'Transaction hash not found or not yet confirmed'
        });
        toast({
          title: "Verification Failed",
          description: "Transaction hash not found on blockchain",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Verification Error",
        description: "Failed to verify hash. Please try again",
        variant: "destructive"
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    }).format(date);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending': return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'not_found': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default: return <Shield className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'not_found': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const recentVerifications = [
    {
      hash: '0x8d4f6a2b9c7e8f1a3b5d2c9e7f1a4b6d8e2f9a7c3b5d1e8f',
      type: 'tender',
      title: 'Municipal Road Infrastructure Development',
      verifiedAt: new Date('2024-01-13T10:30:00Z')
    },
    {
      hash: '0x9f7e5d3b1a8c6e4f2a7d9b5e8c1f6a4b9d2e7f5c8a1b6e4f',
      type: 'bid',
      title: 'Bid Submission Verification',
      verifiedAt: new Date('2024-01-13T09:15:00Z')
    },
    {
     hash: '0x4b9d7f2e5a8c1f6d4b9e2f7a5c8d1e6f9b2e5a7c4f1d8b6e',
      type: 'evaluation',
      title: 'Evaluation Result Verification',
      verifiedAt: new Date('2024-01-12T16:45:00Z')
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center space-x-3">
          <Shield className="h-8 w-8 text-accent" />
          <span>Blockchain Verification</span>
        </h1>
        <p className="text-muted-foreground mt-1">
          Verify the authenticity and integrity of tender data on the blockchain
        </p>
      </div>

      {/* Network Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-accent" />
            <span>Network Status</span>
          </CardTitle>
          <CardDescription>Real-time blockchain network information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${blockchainData.networkStatus.isHealthy ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm font-medium">Network Health</span>
              </div>
              <div className="text-2xl font-bold text-accent">
                {blockchainData.networkStatus.isHealthy ? 'Healthy' : 'Issues'}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-sm font-medium text-muted-foreground">Latest Block</span>
              <div className="text-2xl font-bold">
                {formatNumber(blockchainData.networkStatus.lastBlock)}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-sm font-medium text-muted-foreground">Gas Price</span>
              <div className="text-2xl font-bold">
                {blockchainData.networkStatus.gasPrice}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-sm font-medium text-muted-foreground">TPS</span>
              <div className="text-2xl font-bold">
                {blockchainData.networkStatus.tps}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Verification Tool */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="h-5 w-5" />
                <span>Hash Verification</span>
              </CardTitle>
              <CardDescription>
                Enter a transaction hash to verify its authenticity on the blockchain
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hash">Transaction Hash</Label>
                <div className="flex space-x-2">
                  <Input
                    id="hash"
                    placeholder="0x8d4f6a2b9c7e8f1a3b5d2c9e7f1a4b6d8e2f9a7c3b5d1e8f"
                    value={verificationHash}
                    onChange={(e) => setVerificationHash(e.target.value)}
                    className="font-mono text-sm"
                  />
                  <Button 
                    onClick={handleVerification}
                    disabled={isVerifying}
                  >
                    {isVerifying ? 'Verifying...' : 'Verify'}
                  </Button>
                </div>
              </div>

              {isVerifying && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Verifying on blockchain...</span>
                    <span>Please wait</span>
                  </div>
                  <Progress value={75} />
                </div>
              )}

              {/* Quick Verify Options */}
              <div className="space-y-2">
                <Label className="text-sm">Quick Verify (Demo)</Label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setVerificationHash('0x8d4f6a2b9c7e8f1a3b5d2c9e7f1a4b6d8e2f9a7c3b5d1e8f')}
                  >
                    Tender Hash
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setVerificationHash('0x9f7e5d3b1a8c6e4f2a7d9b5e8c1f6a4b9d2e7f5c8a1b6e4f')}
                  >
                    Bid Hash
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setVerificationHash('0x4b9d7f2e5a8c1f6d4b9e2f7a5c8d1e6f9b2e5a7c4f1d8b6e')}
                  >
                    Evaluation Hash
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Verification Results */}
          {verificationResult && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {getStatusIcon(verificationResult.status)}
                  <span>Verification Result</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {verificationResult.status === 'verified' ? (
                  <>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(verificationResult.status)}>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified on Blockchain
                      </Badge>
                      <Badge variant="outline">{verificationResult.type}</Badge>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-lg mb-2">{verificationResult.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          This {verificationResult.type} has been successfully verified on the blockchain
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <span className="text-sm font-medium">Block Number</span>
                          <div className="text-lg font-mono">
                            #{formatNumber(verificationResult.blockNumber)}
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <span className="text-sm font-medium">Confirmations</span>
                          <div className="text-lg font-mono text-green-600">
                            {formatNumber(verificationResult.confirmations)}
                          </div>
                        </div>

                        <div className="space-y-1">
                          <span className="text-sm font-medium">Gas Used</span>
                          <div className="text-lg font-mono">
                            {formatNumber(verificationResult.gasUsed)}
                          </div>
                        </div>

                        <div className="space-y-1">
                          <span className="text-sm font-medium">IPFS Hash</span>
                          <div className="text-sm font-mono bg-muted p-2 rounded">
                            {verificationResult.ipfsHash}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="text-sm font-medium">Timestamp</span>
                        <div className="text-sm">
                          {formatDate(verificationResult.timestamp)}
                        </div>
                      </div>

                      {/* Metadata */}
                      <div className="bg-muted p-4 rounded-lg space-y-2">
                        <h5 className="font-semibold text-sm">Transaction Metadata</h5>
                        {Object.entries(verificationResult.metadata).map(([key, value]) => (
                          <div key={key} className="flex justify-between text-sm">
                            <span className="text-muted-foreground capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}:
                            </span>
                            <span>{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      {verificationResult.message || 'Unable to verify this hash on the blockchain'}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Verifications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Verifications</CardTitle>
              <CardDescription>Latest blockchain verifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentVerifications.map((verification, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {verification.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(verification.verifiedAt)}
                    </span>
                  </div>
                  <div className="text-sm">{verification.title}</div>
                  <code className="text-xs bg-muted p-1 rounded block">
                    {verification.hash.slice(0, 20)}...
                  </code>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Contract Addresses */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Smart Contracts</CardTitle>
              <CardDescription>Deployed contract addresses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(blockchainData.contractAddresses).map(([name, address]) => (
                <div key={name} className="space-y-1">
                  <div className="text-sm font-medium capitalize">{name} Contract</div>
                  <code className="text-xs bg-muted p-2 rounded block break-all">
                    {address}
                  </code>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Verification Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Verification Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Total Transactions</span>
                <span className="font-medium">
                  {formatNumber(blockchainData.verificationStats.totalTransactions)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Verified Tenders</span>
                <span className="font-medium">
                  {formatNumber(blockchainData.verificationStats.verifiedTenders)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Verified Bids</span>
                <span className="font-medium">
                  {formatNumber(blockchainData.verificationStats.verifiedBids)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Verification Rate</span>
                <span className="font-medium text-green-600">
                  {blockchainData.verificationStats.verificationRate}%
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}