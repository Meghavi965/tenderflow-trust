import React, { useState } from 'react';
import { ArrowLeft, Upload, X, Calendar, DollarSign, FileText, Save, Send } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';

interface TenderFormData {
  title: string;
  description: string;
  category: string;
  estimatedValue: number;
  currency: string;
  bidDeadline: string;
  evaluationDeadline: string;
  documents: File[];
}

export function CreateTenderPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState<TenderFormData>({
    title: '',
    description: '',
    category: '',
    estimatedValue: 0,
    currency: 'USD',
    bidDeadline: '',
    evaluationDeadline: '',
    documents: []
  });

  const handleInputChange = (field: keyof TenderFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, ...files]
    }));
  };

  const removeDocument = (index: number) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateForm = () => {
    if (!formData.title.trim()) return 'Title is required';
    if (!formData.description.trim()) return 'Description is required';
    if (!formData.category) return 'Category is required';
    if (formData.estimatedValue <= 0) return 'Estimated value must be greater than 0';
    if (!formData.bidDeadline) return 'Bid deadline is required';
    if (!formData.evaluationDeadline) return 'Evaluation deadline is required';
    
    const bidDate = new Date(formData.bidDeadline);
    const evalDate = new Date(formData.evaluationDeadline);
    const now = new Date();
    
    if (bidDate <= now) return 'Bid deadline must be in the future';
    if (evalDate <= bidDate) return 'Evaluation deadline must be after bid deadline';
    
    return null;
  };

  const simulateBlockchainUpload = async () => {
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setUploadProgress(i);
    }
  };

  const handleSubmit = async (isDraft: boolean = false) => {
    const validation = validateForm();
    if (validation && !isDraft) {
      toast({
        title: "Validation Error",
        description: validation,
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate document upload to IPFS
      if (formData.documents.length > 0) {
        toast({
          title: "Uploading Documents",
          description: "Securing documents on IPFS..."
        });
        await simulateBlockchainUpload();
      }

      // Simulate blockchain transaction
      toast({
        title: "Creating Blockchain Record",
        description: "Submitting tender to blockchain..."
      });
      await new Promise(resolve => setTimeout(resolve, 2000));

      const action = isDraft ? 'saved as draft' : 'published';
      toast({
        title: "Success!",
        description: `Tender ${action} successfully. Blockchain hash: 0x8d4f...1e8f`,
        variant: "default"
      });

      // Simulate navigation after success
      setTimeout(() => {
        navigate('/tenders');
      }, 1500);

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create tender. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/tenders">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tenders
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Create New Tender</h1>
          <p className="text-muted-foreground">
            Publish a new government procurement opportunity
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Basic Information</span>
              </CardTitle>
              <CardDescription>
                Provide the fundamental details of the tender
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Tender Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Municipal Road Infrastructure Development"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Provide detailed description of the project requirements, scope, and deliverables..."
                  className="min-h-[120px]"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Transportation">Transportation</SelectItem>
                      <SelectItem value="Environment">Environment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={formData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimatedValue">Estimated Value *</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="estimatedValue"
                    type="number"
                    placeholder="0"
                    className="pl-10"
                    value={formData.estimatedValue || ''}
                    onChange={(e) => handleInputChange('estimatedValue', parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Timeline</span>
              </CardTitle>
              <CardDescription>
                Set important dates for the tender process
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bidDeadline">Bid Submission Deadline *</Label>
                  <Input
                    id="bidDeadline"
                    type="datetime-local"
                    value={formData.bidDeadline}
                    onChange={(e) => handleInputChange('bidDeadline', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="evaluationDeadline">Evaluation Deadline *</Label>
                  <Input
                    id="evaluationDeadline"
                    type="datetime-local"
                    value={formData.evaluationDeadline}
                    onChange={(e) => handleInputChange('evaluationDeadline', e.target.value)}
                  />
                </div>
              </div>

              <Alert>
                <Calendar className="h-4 w-4" />
                <AlertDescription>
                  Ensure sufficient time between deadlines for bidders to prepare proposals and evaluators to complete reviews.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>Supporting Documents</span>
              </CardTitle>
              <CardDescription>
                Upload technical specifications, requirements, and other relevant documents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <div className="space-y-2">
                  <p className="text-sm">
                    <strong>Click to upload</strong> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PDF, DOC, DOCX up to 10MB each
                  </p>
                </div>
                <Input
                  type="file"
                  className="hidden"
                  id="file-upload"
                  multiple
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                />
                <Label htmlFor="file-upload">
                  <Button variant="outline" className="mt-2" asChild>
                    <span>Choose Files</span>
                  </Button>
                </Label>
              </div>

              {formData.documents.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">Uploaded Documents</h4>
                  {formData.documents.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDocument(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading to IPFS...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Tender Preview</CardTitle>
              <CardDescription>How your tender will appear to bidders</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground">TITLE</h4>
                <p className="text-sm">{formData.title || 'Untitled Tender'}</p>
              </div>

              <div>
                <h4 className="font-semibold text-sm text-muted-foreground">CATEGORY</h4>
                <Badge variant="outline" className="text-xs">
                  {formData.category || 'Uncategorized'}
                </Badge>
              </div>

              <div>
                <h4 className="font-semibold text-sm text-muted-foreground">ESTIMATED VALUE</h4>
                <p className="text-lg font-bold text-primary">
                  {formData.estimatedValue > 0 
                    ? new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: formData.currency,
                        minimumFractionDigits: 0
                      }).format(formData.estimatedValue)
                    : 'Not specified'
                  }
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-sm text-muted-foreground">BID DEADLINE</h4>
                <p className="text-sm">
                  {formData.bidDeadline 
                    ? new Date(formData.bidDeadline).toLocaleString()
                    : 'Not set'
                  }
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-sm text-muted-foreground">DOCUMENTS</h4>
                <p className="text-sm">{formData.documents.length} files attached</p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Publish Options</CardTitle>
              <CardDescription>Choose how to proceed with your tender</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={() => handleSubmit(true)} 
                variant="outline" 
                className="w-full"
                disabled={isSubmitting}
              >
                <Save className="h-4 w-4 mr-2" />
                Save as Draft
              </Button>
              
              <Button 
                onClick={() => handleSubmit(false)} 
                className="w-full"
                disabled={isSubmitting}
              >
                <Send className="h-4 w-4 mr-2" />
                {isSubmitting ? 'Publishing...' : 'Publish Tender'}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Published tenders will be immediately visible to all registered bidders
              </p>
            </CardContent>
          </Card>

          {/* Blockchain Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Blockchain Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Network:</span>
                <span>Polygon Mainnet</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Gas Fee:</span>
                <span>~$0.02</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Confirmation:</span>
                <span>~2 seconds</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}