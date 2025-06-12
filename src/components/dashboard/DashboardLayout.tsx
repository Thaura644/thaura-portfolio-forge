
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { 
  Settings, 
  LogOut, 
  Menu,
  Plus,
  Palette,
  Globe,
  Users,
  CreditCard,
  BookOpen,
  Github,
  Database
} from "lucide-react";
import { useNavigate, Outlet } from "react-router-dom";

export const DashboardLayout = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const menuItems = [
    { icon: Palette, label: "Portfolios", path: "/dashboard" },
    { icon: Plus, label: "Create New", path: "/dashboard/create" },
    { icon: Settings, label: "Settings", path: "/dashboard/settings" },
    { icon: Globe, label: "Domains", path: "/dashboard/domains" },
    { icon: BookOpen, label: "Knowledge", path: "/dashboard/knowledge" },
    { icon: Users, label: "People", path: "/dashboard/people" },
    { icon: CreditCard, label: "Plans & Billing", path: "/dashboard/billing" },
  ];

  const integrations = [
    { icon: Database, label: "Supabase", path: "/dashboard/integrations/supabase" },
    { icon: Github, label: "GitHub", path: "/dashboard/integrations/github" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'}`}>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h1 className={`font-bold text-xl transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
              Portfolio Builder
            </h1>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-4">
          {/* User Info */}
          <div className="mb-6 pb-4 border-b">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                {user?.email?.[0]?.toUpperCase() || 'U'}
              </div>
              {sidebarOpen && (
                <div>
                  <p className="font-medium text-sm">{user?.email}</p>
                  <p className="text-xs text-gray-500">My Workspace</p>
                </div>
              )}
            </div>
          </div>

          {/* Main Menu */}
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                className={`w-full justify-start ${sidebarOpen ? '' : 'px-2'}`}
                onClick={() => navigate(item.path)}
              >
                <item.icon className="h-4 w-4" />
                {sidebarOpen && <span className="ml-3">{item.label}</span>}
              </Button>
            ))}
          </nav>

          {/* Integrations */}
          {sidebarOpen && (
            <div className="mt-6">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Integrations
              </p>
              <nav className="space-y-1">
                {integrations.map((item) => (
                  <Button
                    key={item.path}
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="ml-3">{item.label}</span>
                  </Button>
                ))}
              </nav>
            </div>
          )}

          {/* Sign Out */}
          <div className="mt-6 pt-4 border-t">
            <Button
              variant="ghost"
              className={`w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 ${sidebarOpen ? '' : 'px-2'}`}
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4" />
              {sidebarOpen && <span className="ml-3">Sign Out</span>}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};
