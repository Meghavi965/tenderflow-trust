import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/layout/Layout";
import { LoginPage } from "@/pages/LoginPage";
import { Dashboard } from "@/pages/Dashboard";
import { TendersPage } from "@/pages/TendersPage";
import { CreateTenderPage } from "@/pages/CreateTenderPage";
import { MyBidsPage } from "@/pages/MyBidsPage";
import { EvaluationPage } from "@/pages/EvaluationPage";
import { AwardsPage } from "@/pages/AwardsPage";
import { VerificationPage } from "@/pages/VerificationPage";
import { AuditTrailPage } from "@/pages/AuditTrailPage";
import { NotificationsPage } from "@/pages/NotificationsPage";
import { SettingsPage } from "@/pages/SettingsPage";
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
        {/* Full functional routes */}
        <Route 
          path="/tenders" 
          element={
            <ProtectedRoute>
              <TendersPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/create-tender" 
          element={
            <ProtectedRoute>
              <CreateTenderPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/my-bids" 
          element={
            <ProtectedRoute>
              <MyBidsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/evaluation" 
          element={
            <ProtectedRoute>
              <EvaluationPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/awards" 
          element={
            <ProtectedRoute>
              <AwardsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/verification" 
          element={
            <ProtectedRoute>
              <VerificationPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/audit" 
          element={
            <ProtectedRoute>
              <AuditTrailPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/search" 
          element={
            <ProtectedRoute>
              <TendersPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/notifications" 
          element={
            <ProtectedRoute>
              <NotificationsPage />
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
