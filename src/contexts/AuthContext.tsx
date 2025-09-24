import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types/tender';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: Record<string, User> = {
  "admin@gov.com": {
    id: "1",
    name: "Sarah Johnson",
    email: "admin@gov.com",
    role: "admin",
    organization: "Department of Public Works"
  },
  "bidder@company.com": {
    id: "2", 
    name: "Michael Chen",
    email: "bidder@company.com",
    role: "bidder",
    organization: "TechBuild Solutions Ltd."
  },
  "evaluator@gov.com": {
    id: "3",
    name: "Dr. Emily Rodriguez",
    email: "evaluator@gov.com", 
    role: "evaluator",
    organization: "Procurement Review Board"
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth state
    const storedUser = localStorage.getItem('govtender-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = mockUsers[email];
    if (mockUser && mockUser.role === role) {
      setUser(mockUser);
      localStorage.setItem('govtender-user', JSON.stringify(mockUser));
    } else {
      throw new Error('Invalid credentials or role mismatch');
    }
    
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('govtender-user');
  };

  const switchRole = (role: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      localStorage.setItem('govtender-user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}