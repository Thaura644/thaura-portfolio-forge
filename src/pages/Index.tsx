
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { PortfolioRenderer } from "@/components/portfolio/PortfolioRenderer";
import { PromoPrompt } from "@/components/PromoPrompt";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { portfolioTemplates } from "@/data/portfolioTemplates";
import { Button } from "@/components/ui/button";
import { Edit, Eye, User } from "lucide-react";
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
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-4">
              <h1 className="text-lg font-bold">Portfolio Builder</h1>
              <select 
                value={selectedTemplate}
                onChange={(e) => handleTemplateChange(e.target.value)}
                className="px-3 py-1 rounded-md border bg-background text-sm"
              >
                <option value="modern">Modern Template</option>
                <option value="minimal">Minimal Template</option>
                <option value="creative">Creative Template</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              {user ? (
                <>
                  <Button size="sm" onClick={() => navigate("/dashboard")}>
                    <Eye className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                  <Button size="sm" onClick={() => navigate("/dashboard/settings")}>
                    <Edit className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </>
              ) : (
                <Button size="sm" onClick={() => navigate("/auth")}>
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Portfolio Renderer */}
        <div className="pt-16">
          <PortfolioRenderer 
            data={portfolioData}
            template={selectedTemplate}
            isEditing={false}
          />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
