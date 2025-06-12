
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { PortfolioRenderer } from "@/components/portfolio/PortfolioRenderer";
import { PromoPrompt } from "@/components/PromoPrompt";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { portfolioTemplates } from "@/data/portfolioTemplates";
import { Button } from "@/components/ui/button";
import { Edit, Eye, User, Settings, Palette } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [portfolioData, setPortfolioData] = useState(portfolioTemplates.modern.data);

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    setPortfolioData(portfolioTemplates[templateId].data);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        {/* Show promo prompt only to non-authenticated users */}
        {!user && <PromoPrompt />}

        {/* Top Control Bar */}
        <div className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-primary">Portfolio Builder</h1>
              <select 
                value={selectedTemplate}
                onChange={(e) => handleTemplateChange(e.target.value)}
                className="px-3 py-2 rounded-md border bg-background text-sm min-w-[140px]"
              >
                <option value="modern">Modern Template</option>
                <option value="minimal">Minimal Template</option>
                <option value="creative">Creative Template</option>
              </select>
            </div>
            
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <Button variant="outline" size="sm" onClick={() => navigate("/dashboard")}>
                    <Eye className="h-4 w-4 mr-2" />
                    My Dashboard
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => navigate("/dashboard/settings")}>
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                  <Button size="sm" onClick={() => navigate("/dashboard/settings?tab=editor")}>
                    <Palette className="h-4 w-4 mr-2" />
                    Customize
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" size="sm" onClick={() => navigate("/auth")}>
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                  <Button size="sm" onClick={() => navigate("/auth")}>
                    <Edit className="h-4 w-4 mr-2" />
                    Make This Your Own
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Portfolio Renderer */}
        <div className="pt-20">
          <PortfolioRenderer 
            data={portfolioData}
            template={selectedTemplate}
            isEditing={false}
          />
        </div>

        {/* Floating Customize Button for authenticated users */}
        {user && (
          <div className="fixed bottom-6 right-6 z-50">
            <Button 
              size="lg" 
              className="shadow-lg hover:shadow-xl transition-shadow rounded-full h-14 w-14 p-0"
              onClick={() => navigate("/dashboard/settings?tab=editor")}
            >
              <Palette className="h-6 w-6" />
            </Button>
          </div>
        )}

        {/* Help text for non-authenticated users */}
        {!user && (
          <div className="fixed bottom-6 left-6 right-6 z-50">
            <div className="bg-card border rounded-lg p-4 shadow-lg max-w-md mx-auto">
              <h3 className="font-semibold mb-2">Want to customize this portfolio?</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Sign up for free to edit components, layouts, and create your own portfolio website.
              </p>
              <Button onClick={() => navigate("/auth")} className="w-full">
                Get Started Free
              </Button>
            </div>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Index;
