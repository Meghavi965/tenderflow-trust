import React, { useState } from 'react';
import { Search, Filter, Eye, Plus, Calendar, DollarSign, FileText, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { mockTenders } from '@/data/mockData';
import { Link } from 'react-router-dom';

export function TendersPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'bidding': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'evaluation': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'awarded': return 'bg-green-100 text-green-800 border-green-200';
      case 'archived': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const getDaysUntilDeadline = (deadline: Date) => {
    const now = new Date();
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredTenders = mockTenders.filter(tender => {
    const matchesSearch = tender.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tender.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tender.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || tender.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const TenderCard = ({ tender }: { tender: any }) => {
    const daysLeft = getDaysUntilDeadline(tender.bidDeadline);
    const isUrgent = daysLeft <= 3 && tender.status === 'open';

    return (
      <Card key={tender.id} className={`hover:shadow-lg transition-shadow ${isUrgent ? 'border-destructive' : ''}`}>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <CardTitle className="text-lg hover:text-primary transition-colors">
                <Link to={`/tender/${tender.id}`}>{tender.title}</Link>
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Badge className={getStatusColor(tender.status)}>
                  {tender.status.charAt(0).toUpperCase() + tender.status.slice(1)}
                </Badge>
                <Badge variant="outline">{tender.category}</Badge>
                {isUrgent && (
                  <Badge variant="destructive" className="animate-pulse">
                    Urgent
                  </Badge>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                {formatCurrency(tender.estimatedValue, tender.currency)}
              </div>
              <div className="text-sm text-muted-foreground">Estimated Value</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="mb-4 line-clamp-2">
            {tender.description}
          </CardDescription>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="font-medium">Deadline</div>
                <div className="text-muted-foreground">{formatDate(tender.bidDeadline)}</div>
                {tender.status === 'open' && (
                  <div className={`text-xs ${daysLeft <= 3 ? 'text-destructive' : 'text-muted-foreground'}`}>
                    {daysLeft > 0 ? `${daysLeft} days left` : 'Expired'}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="font-medium">Bids</div>
                <div className="text-muted-foreground">{tender.bids?.length || 0}</div>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-sm">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="font-medium">Documents</div>
                <div className="text-muted-foreground">{tender.documents.length}</div>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-sm">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="font-medium">Published</div>
                <div className="text-muted-foreground">{formatDate(tender.publishDate)}</div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <Button asChild variant="outline" size="sm">
                <Link to={`/tender/${tender.id}`}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Link>
              </Button>
              
              {user?.role === 'bidder' && (tender.status === 'open' || tender.status === 'bidding') && (
                <Button asChild size="sm">
                  <Link to={`/bid/${tender.id}`}>
                    Submit Bid
                  </Link>
                </Button>
              )}
              
              {user?.role === 'evaluator' && tender.status === 'evaluation' && (
                <Button asChild size="sm">
                  <Link to={`/evaluate/${tender.id}`}>
                    Evaluate
                  </Link>
                </Button>
              )}
            </div>
            
            <div className="text-xs text-muted-foreground">
              ID: {tender.id}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Government Tenders</h1>
          <p className="text-muted-foreground mt-1">
            Browse and manage government procurement opportunities
          </p>
        </div>
        
        {user?.role === 'admin' && (
          <Button asChild size="lg">
            <Link to="/create-tender">
              <Plus className="h-4 w-4 mr-2" />
              Create Tender
            </Link>
          </Button>
        )}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tenders by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="bidding">Bidding</SelectItem>
                <SelectItem value="evaluation">Evaluation</SelectItem>
                <SelectItem value="awarded">Awarded</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Education">Education</SelectItem>
                <SelectItem value="Healthcare">Healthcare</SelectItem>
                <SelectItem value="Transportation">Transportation</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Tabs defaultValue="grid" className="space-y-6">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          
          <div className="text-sm text-muted-foreground">
            Showing {filteredTenders.length} of {mockTenders.length} tenders
          </div>
        </div>

        <TabsContent value="grid" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {filteredTenders.map((tender) => (
              <TenderCard key={tender.id} tender={tender} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          {filteredTenders.map((tender) => (
            <TenderCard key={tender.id} tender={tender} />
          ))}
        </TabsContent>
      </Tabs>

      {filteredTenders.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No tenders found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters
            </p>
            {user?.role === 'admin' && (
              <Button asChild>
                <Link to="/create-tender">Create First Tender</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}