import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { UserRole } from '@/types/tender';
import heroImage from '@/assets/hero-government.jpg';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole | ''>('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !role) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await login(email, password, role as UserRole);
      toast({
        title: "Login Successful",
        description: `Welcome to GovTender ${role} portal.`
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials or role mismatch.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const demoCredentials = [
    { email: 'admin@gov.com', role: 'admin', name: 'Admin Demo' },
    { email: 'bidder@company.com', role: 'bidder', name: 'Bidder Demo' },
    { email: 'evaluator@gov.com', role: 'evaluator', name: 'Evaluator Demo' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-r from-primary to-secondary overflow-hidden">
        <img 
          src={heroImage} 
          alt="Government Building" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
        />
        <div className="relative z-10 flex items-center justify-center h-full text-center">
          <div>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="h-12 w-12 text-white" />
              <h1 className="text-4xl font-bold text-white">GovTender</h1>
            </div>
            <p className="text-xl text-white/90">Transparent Blockchain-Powered E-Tendering</p>
            <p className="text-white/80 mt-2">Secure • Transparent • Immutable</p>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-semibold">Sign In</CardTitle>
              <CardDescription>
                Access your secure government tendering portal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Tender Issuer (Admin)</SelectItem>
                      <SelectItem value="bidder">Bidder</SelectItem>
                      <SelectItem value="evaluator">Evaluator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Demo Credentials */}
          <Card className="border-accent/20">
            <CardHeader>
              <CardTitle className="text-lg">Demo Credentials</CardTitle>
              <CardDescription>Use these credentials to explore different user roles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {demoCredentials.map((cred) => (
                <div key={cred.role} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium text-sm">{cred.name}</p>
                    <p className="text-xs text-muted-foreground">{cred.email}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEmail(cred.email);
                      setPassword('demo123');
                      setRole(cred.role as UserRole);
                    }}
                  >
                    Use
                  </Button>
                </div>
              ))}
              <p className="text-xs text-muted-foreground text-center mt-2">
                Password for all demo accounts: <code className="bg-muted px-1 rounded">demo123</code>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}