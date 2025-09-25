import React, { useState } from 'react';
import { Star, FileText, User, DollarSign, Clock, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

export function EvaluationPage() {
  const { toast } = useToast();
  const [selectedTender, setSelectedTender] = useState<string | null>(null);
  const [evaluationData, setEvaluationData] = useState({
    technicalScore: [75],
    financialScore: [80],
    comments: ''
  });

  // Mock data for tenders requiring evaluation
  const pendingTenders = [
    {
      id: 'tender-002',
      title: 'Smart City IoT Implementation',
      category: 'Technology',
      estimatedValue: 1800000,
      bidDeadline: new Date('2024-01-10'),
      evaluationDeadline: new Date('2024-01-20'),
      bids: [
        {
          id: 'bid-003',
          bidderName: 'TechSolutions Inc.',
          bidAmount: 1650000,
          submittedAt: new Date('2024-01-09'),
          documents: ['Technical Proposal.pdf', 'Company Portfolio.pdf'],
          status: 'revealed',
          technicalStrength: 'Strong IoT expertise, proven track record',
          financialNotes: 'Competitive pricing, good value proposition'
        },
        {
          id: 'bid-004',
          bidderName: 'SmartCity Corp',
          bidAmount: 1720000,
          submittedAt: new Date('2024-01-08'),
          documents: ['IoT Architecture.pdf', 'Implementation Plan.pdf'],
          status: 'revealed',
          technicalStrength: 'Innovative approach, scalable solution',
          financialNotes: 'Higher cost but comprehensive service'
        }
      ],
      assignedTo: 'evaluator-001',
      priority: 'high'
    },
    {
      id: 'tender-005',
      title: 'Public Transportation Upgrade',
      category: 'Transportation',
      estimatedValue: 2200000,
      bidDeadline: new Date('2024-01-12'),
      evaluationDeadline: new Date('2024-01-22'),
      bids: [
        {
          id: 'bid-005',
          bidderName: 'Metro Solutions Ltd.',
          bidAmount: 2100000,
          submittedAt: new Date('2024-01-11'),
          documents: ['Transport Plan.pdf', 'Safety Assessment.pdf'],
          status: 'revealed',
          technicalStrength: 'Extensive transport experience',
          financialNotes: 'Reasonable pricing, proven efficiency'
        }
      ],
      assignedTo: 'evaluator-001',
      priority: 'medium'
    }
  ];

  const completedEvaluations = [
    {
      id: 'eval-001',
      tenderTitle: 'Municipal Road Infrastructure',
      evaluatedAt: new Date('2024-01-12'),
      winningBid: 'InfraCorp Engineering',
      winningAmount: 2280000,
      myScore: { technical: 92, financial: 88, overall: 90 },
      status: 'awarded'
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
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const getDaysUntilDeadline = (deadline: Date) => {
    const now = new Date();
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const calculateOverallScore = () => {
    const technical = evaluationData.technicalScore[0];
    const financial = evaluationData.financialScore[0];
    return Math.round((technical * 0.6 + financial * 0.4) * 10) / 10;
  };

  const handleSubmitEvaluation = async (bidId: string) => {
    try {
      toast({
        title: "Submitting Evaluation",
        description: "Recording evaluation on blockchain..."
      });

      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Evaluation Submitted",
        description: `Evaluation recorded successfully. Hash: 0x4b9d...6e`,
        variant: "default"
      });

      // Reset form
      setEvaluationData({
        technicalScore: [75],
        financialScore: [80],
        comments: ''
      });
      setSelectedTender(null);

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit evaluation. Please try again.",
        variant: "destructive"
      });
    }
  };

  const TenderEvaluationCard = ({ tender }: { tender: any }) => {
    const daysLeft = getDaysUntilDeadline(tender.evaluationDeadline);
    const isUrgent = daysLeft <= 2;

    return (
      <Card className={`hover:shadow-lg transition-shadow ${isUrgent ? 'border-destructive' : ''}`}>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <CardTitle className="text-lg">{tender.title}</CardTitle>
              <div className="flex items-center space-x-2">
                <Badge className={getPriorityColor(tender.priority)}>
                  {tender.priority.charAt(0).toUpperCase() + tender.priority.slice(1)} Priority
                </Badge>
                <Badge variant="outline">{tender.category}</Badge>
                {isUrgent && (
                  <Badge variant="destructive" className="animate-pulse">
                    <Clock className="h-3 w-3 mr-1" />
                    Due Soon
                  </Badge>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                {formatCurrency(tender.estimatedValue)}
              </div>
              <div className="text-sm text-muted-foreground">Estimated Value</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2 text-sm">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="font-medium">Bids Received</div>
                <div className="text-muted-foreground">{tender.bids.length} submissions</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="font-medium">Evaluation Due</div>
                <div className={`${daysLeft <= 2 ? 'text-destructive' : 'text-muted-foreground'}`}>
                  {formatDate(tender.evaluationDeadline)} ({daysLeft} days)
                </div>
              </div>
            </div>
          </div>

          {isUrgent && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Evaluation deadline is approaching. Please complete your review within {daysLeft} days.
              </AlertDescription>
            </Alert>
          )}

          <Button 
            onClick={() => setSelectedTender(tender.id)}
            className="w-full"
          >
            Start Evaluation
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Tender Evaluation</h1>
        <p className="text-muted-foreground mt-1">
          Review and evaluate submitted bids for transparency and fairness
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">{pendingTenders.length}</div>
                <p className="text-xs text-muted-foreground">Pending Evaluations</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">{completedEvaluations.length}</div>
                <p className="text-xs text-muted-foreground">Completed This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">
                  {pendingTenders.filter(t => getDaysUntilDeadline(t.evaluationDeadline) <= 2).length}
                </div>
                <p className="text-xs text-muted-foreground">Urgent Reviews</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">8.7</div>
                <p className="text-xs text-muted-foreground">Avg Quality Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      {selectedTender ? (
        // Evaluation Interface
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => setSelectedTender(null)}>
              ← Back to Overview
            </Button>
            <div>
              <h2 className="text-2xl font-bold">
                {pendingTenders.find(t => t.id === selectedTender)?.title}
              </h2>
              <p className="text-muted-foreground">Evaluate all submitted bids</p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Bid List */}
            <div className="lg:col-span-2 space-y-4">
              {pendingTenders.find(t => t.id === selectedTender)?.bids.map((bid) => (
                <Card key={bid.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{bid.bidderName}</CardTitle>
                        <div className="text-sm text-muted-foreground">
                          Submitted {formatDate(bid.submittedAt)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          {formatCurrency(bid.bidAmount)}
                        </div>
                        <Badge className="bg-green-100 text-green-800">Revealed</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Technical Assessment</h4>
                        <p className="text-sm text-muted-foreground">{bid.technicalStrength}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Financial Analysis</h4>
                        <p className="text-sm text-muted-foreground">{bid.financialNotes}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm mb-2">Documents ({bid.documents.length})</h4>
                      <div className="flex flex-wrap gap-2">
                        {bid.documents.map((doc, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <FileText className="h-3 w-3 mr-1" />
                            {doc}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full"
                    >
                      Evaluate This Bid
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Evaluation Form */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Evaluation Criteria</CardTitle>
                  <CardDescription>Score each bid based on technical and financial merit</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label>Technical Score (60% weight)</Label>
                    <div className="px-2">
                      <Slider
                        value={evaluationData.technicalScore}
                        onValueChange={(value) => setEvaluationData(prev => ({ ...prev, technicalScore: value }))}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>0</span>
                        <span className="font-medium">{evaluationData.technicalScore[0]}/100</span>
                        <span>100</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Financial Score (40% weight)</Label>
                    <div className="px-2">
                      <Slider
                        value={evaluationData.financialScore}
                        onValueChange={(value) => setEvaluationData(prev => ({ ...prev, financialScore: value }))}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>0</span>
                        <span className="font-medium">{evaluationData.financialScore[0]}/100</span>
                        <span>100</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-muted rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Overall Score:</span>
                      <span className="text-2xl font-bold text-primary">
                        {calculateOverallScore()}/100
                      </span>
                    </div>
                    <Progress value={calculateOverallScore()} className="mt-2" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="comments">Evaluation Comments</Label>
                    <Textarea
                      id="comments"
                      placeholder="Provide detailed feedback on technical merit, financial viability, and overall recommendation..."
                      className="min-h-[100px]"
                      value={evaluationData.comments}
                      onChange={(e) => setEvaluationData(prev => ({ ...prev, comments: e.target.value }))}
                    />
                  </div>

                  <Button 
                    onClick={() => handleSubmitEvaluation('bid-003')}
                    className="w-full"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Submit to Blockchain
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        // Overview Interface
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pending">Pending ({pendingTenders.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedEvaluations.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {pendingTenders.map((tender) => (
                <TenderEvaluationCard key={tender.id} tender={tender} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <div className="space-y-4">
              {completedEvaluations.map((evaluation) => (
                <Card key={evaluation.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{evaluation.tenderTitle}</CardTitle>
                        <div className="text-sm text-muted-foreground">
                          Evaluated on {formatDate(evaluation.evaluatedAt)}
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Awarded
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Winning Bidder</h4>
                        <p className="text-sm">{evaluation.winningBid}</p>
                        <p className="text-lg font-bold text-primary">
                          {formatCurrency(evaluation.winningAmount)}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Your Evaluation Score</h4>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Technical:</span>
                            <span>{evaluation.myScore.technical}/100</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Financial:</span>
                            <span>{evaluation.myScore.financial}/100</span>
                          </div>
                          <div className="flex justify-between text-sm font-semibold">
                            <span>Overall:</span>
                            <span>{evaluation.myScore.overall}/100</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}