
import { useState } from "react";
import { PortfolioRenderer } from "@/components/portfolio/PortfolioRenderer";
import { EditorSidebar } from "@/components/editor/EditorSidebar";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { portfolioTemplates } from "@/data/portfolioTemplates";
import { Button } from "@/components/ui/button";
import { Edit, Eye, Download, Share2 } from "lucide-react";

const Index = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [portfolioData, setPortfolioData] = useState(portfolioTemplates.modern.data);

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    setPortfolioData(portfolioTemplates[templateId].data);
  };

  const handleExport = () => {
    // Future: Export portfolio as HTML/React code
    console.log("Export functionality coming soon");
  };

  const handleShare = () => {
    // Future: Generate shareable link
    console.log("Share functionality coming soon");
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        {/* Top Control Bar */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
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
              <Button size="sm" variant="outline" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button size="sm" variant="outline" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button
                size="sm"
                variant={isEditing ? "default" : "outline"}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? <Eye className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
                {isEditing ? "Preview" : "Edit"}
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="pt-16 flex">
          {/* Editor Sidebar */}
          {isEditing && (
            <EditorSidebar 
              portfolioData={portfolioData}
              onUpdateData={setPortfolioData}
              template={selectedTemplate}
            />
          )}

          {/* Portfolio Renderer */}
          <div className={`flex-1 transition-all duration-300 ${isEditing ? "ml-80" : ""}`}>
            <PortfolioRenderer 
              data={portfolioData}
              template={selectedTemplate}
              isEditing={isEditing}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
