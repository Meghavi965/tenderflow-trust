import React from 'react';
import { FileText, Users, TrendingUp, Shield, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

export function Dashboard() {
  const { user } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const adminStats = [
    { title: 'Active Tenders', value: '12', icon: FileText, change: '+3 this week' },
    { title: 'Total Bids', value: '89', icon: Users, change: '+15 this week' },
    { title: 'Pending Reviews', value: '7', icon: Clock, change: '2 overdue' },
    { title: 'Awarded', value: '24', icon: CheckCircle, change: '+5 this month' }
  ];

  const bidderStats = [
    { title: 'Available Tenders', value: '18', icon: FileText, change: '5 closing soon' },
    { title: 'My Bids', value: '6', icon: Users, change: '2 pending reveal' },
    { title: 'Win Rate', value: '34%', icon: TrendingUp, change: '+5% this quarter' },
    { title: 'Blockchain Verified', value: '100%', icon: Shield, change: 'All bids secured' }
  ];

  const evaluatorStats = [
    { title: 'Pending Evaluations', value: '8', icon: Clock, change: '3 due today' },
    { title: 'Completed Reviews', value: '45', icon: CheckCircle, change: '+12 this month' },
    { title: 'Verified Entries', value: '100%', icon: Shield, change: 'All on blockchain' },
    { title: 'Average Score', value: '8.7', icon: TrendingUp, change: 'Quality consistent' }
  ];

  const getStats = () => {
    switch (user?.role) {
      case 'admin': return adminStats;
      case 'bidder': return bidderStats;
      case 'evaluator': return evaluatorStats;
      default: return [];
    }
  };

  const recentTenders = [
    {
      id: '1',
      title: 'Municipal Road Infrastructure Development',
      status: 'bidding',
      deadline: '2024-01-15',
      bids: 12,
      value: '$2.5M'
    },
    {
      id: '2', 
      title: 'Smart City IoT Implementation',
      status: 'evaluation',
      deadline: '2024-01-10',
      bids: 8,
      value: '$1.8M'
    },
    {
      id: '3',
      title: 'Public School Technology Upgrade',
      status: 'open',
      deadline: '2024-01-20',
      bids: 3,
      value: '$950K'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'bidding': return 'bg-yellow-100 text-yellow-800';
      case 'evaluation': return 'bg-purple-100 text-purple-800';
      case 'awarded': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {getGreeting()}, {user?.name}
        </h1>
        <p className="text-muted-foreground">
          Welcome to your {user?.role} dashboard. Here's what's happening with government tenders.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {getStats().map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Tenders */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Tenders</CardTitle>
            <CardDescription>
              Latest government procurement opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTenders.map((tender) => (
                <div key={tender.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm">{tender.title}</h4>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>Deadline: {tender.deadline}</span>
                      <span>•</span>
                      <span>{tender.bids} bids</span>
                      <span>•</span>
                      <span>{tender.value}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(tender.status)}>
                      {tender.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4">
              <Button asChild variant="outline" className="w-full">
                <Link to="/tenders">View All Tenders</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Blockchain Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-accent" />
              <span>Blockchain Status</span>
            </CardTitle>
            <CardDescription>
              Network health and verification status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Network Status</span>
                <span className="text-accent font-medium">Healthy</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Verification Rate</span>
                <span className="text-accent font-medium">100%</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Data Integrity</span>
                <span className="text-accent font-medium">Verified</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>

            <div className="pt-2 text-xs text-muted-foreground">
              Last sync: 2 minutes ago
            </div>

            <Button asChild variant="outline" className="w-full" size="sm">
              <Link to="/verification">View Details</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks based on your role
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {user?.role === 'admin' && (
              <>
                <Button asChild>
                  <Link to="/create-tender">Create New Tender</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/audit">View Audit Trail</Link>
                </Button>
              </>
            )}
            
            {user?.role === 'bidder' && (
              <>
                <Button asChild>
                  <Link to="/tenders">Browse Tenders</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/my-bids">My Bids</Link>
                </Button>
              </>
            )}
            
            {user?.role === 'evaluator' && (
              <>
                <Button asChild>
                  <Link to="/evaluation">Pending Reviews</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/audit">Audit Trail</Link>
                </Button>
              </>
            )}
            
            <Button asChild variant="outline">
              <Link to="/verification">Verify on Blockchain</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}