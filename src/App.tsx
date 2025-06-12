
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { AuthPage } from "@/components/auth/AuthPage";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Dashboard } from "@/components/dashboard/Dashboard";
import Index from "./pages/Index";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<AuthPage />} />
      
      {/* Protected Dashboard Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="create" element={<div className="p-8">Create Portfolio (Coming Soon)</div>} />
        <Route path="edit/:id" element={<div className="p-8">Edit Portfolio (Coming Soon)</div>} />
        <Route path="domains" element={<div className="p-8">Domains (Coming Soon)</div>} />
        <Route path="knowledge" element={<div className="p-8">Knowledge (Coming Soon)</div>} />
        <Route path="people" element={<div className="p-8">People (Coming Soon)</div>} />
        <Route path="billing" element={<div className="p-8">Billing (Coming Soon)</div>} />
        <Route path="integrations/supabase" element={<div className="p-8">Supabase Integration</div>} />
        <Route path="integrations/github" element={<div className="p-8">GitHub Integration</div>} />
      </Route>

      {/* Public portfolio view */}
      <Route path="/portfolio/:id" element={<div>Public Portfolio View (Coming Soon)</div>} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

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
