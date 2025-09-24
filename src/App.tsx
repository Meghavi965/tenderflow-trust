import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/layout/Layout";
import { LoginPage } from "@/pages/LoginPage";
import { Dashboard } from "@/pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Layout>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
        <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        {/* Placeholder routes - will be implemented */}
        <Route 
          path="/tenders" 
          element={
            <ProtectedRoute>
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold mb-2">Tenders</h2>
                <p className="text-muted-foreground">Coming soon...</p>
              </div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/create-tender" 
          element={
            <ProtectedRoute>
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold mb-2">Create Tender</h2>
                <p className="text-muted-foreground">Coming soon...</p>
              </div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/my-bids" 
          element={
            <ProtectedRoute>
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold mb-2">My Bids</h2>
                <p className="text-muted-foreground">Coming soon...</p>
              </div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/evaluation" 
          element={
            <ProtectedRoute>
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold mb-2">Evaluation</h2>
                <p className="text-muted-foreground">Coming soon...</p>
              </div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/awards" 
          element={
            <ProtectedRoute>
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold mb-2">Awards</h2>
                <p className="text-muted-foreground">Coming soon...</p>
              </div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/verification" 
          element={
            <ProtectedRoute>
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold mb-2">Blockchain Verification</h2>
                <p className="text-muted-foreground">Coming soon...</p>
              </div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/audit" 
          element={
            <ProtectedRoute>
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold mb-2">Audit Trail</h2>
                <p className="text-muted-foreground">Coming soon...</p>
              </div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/search" 
          element={
            <ProtectedRoute>
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold mb-2">Search</h2>
                <p className="text-muted-foreground">Coming soon...</p>
              </div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <ProtectedRoute>
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold mb-2">Settings</h2>
                <p className="text-muted-foreground">Coming soon...</p>
              </div>
            </ProtectedRoute>
          } 
        />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
