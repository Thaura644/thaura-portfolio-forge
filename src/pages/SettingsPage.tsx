import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "react-router-dom";
import { EditorSidebar } from "@/components/editor/EditorSidebar";
import { PortfolioRenderer } from "@/components/portfolio/PortfolioRenderer";
import { portfolioTemplates } from "@/data/portfolioTemplates";
import { 
  Settings, 
  Globe, 
  BookOpen, 
  Users, 
  CreditCard, 
  Palette,
  Code,
  Database,
  Github,
  X
} from "lucide-react";

export const SettingsPage = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "project");
  const [showEditor, setShowEditor] = useState(false);
  const [portfolioData, setPortfolioData] = useState(portfolioTemplates.modern.data);
  const [selectedTemplate, setSelectedTemplate] = useState("modern");

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "editor") {
      setActiveTab("editor");
      setShowEditor(true);
    }
  }, [searchParams]);

  const handleUpdateData = (newData: any) => {
    setPortfolioData(newData);
  };

  if (showEditor) {
    return (
      <div className="min-h-screen bg-background">
        {/* Editor Header */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-4">
              <h1 className="text-lg font-semibold">Portfolio Editor</h1>
              <select 
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="px-3 py-1 rounded-md border bg-background text-sm"
              >
                <option value="modern">Modern Template</option>
                <option value="minimal">Minimal Template</option>
                <option value="creative">Creative Template</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Save Changes
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowEditor(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Editor Layout */}
        <div className="flex pt-16">
          <EditorSidebar 
            portfolioData={portfolioData}
            onUpdateData={handleUpdateData}
            template={selectedTemplate}
          />
          <div className="flex-1 ml-80">
            <PortfolioRenderer 
              data={portfolioData}
              template={selectedTemplate}
              isEditing={true}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-gray-600">Manage your portfolio and workspace settings</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant={activeTab === "project" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("project")}
              >
                <Settings className="h-4 w-4 mr-2" />
                Project Settings
              </Button>
              <Button
                variant={activeTab === "domains" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("domains")}
              >
                <Globe className="h-4 w-4 mr-2" />
                Domains
              </Button>
              <Button
                variant={activeTab === "knowledge" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("knowledge")}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Knowledge
              </Button>
              <Button
                variant={activeTab === "people" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("people")}
              >
                <Users className="h-4 w-4 mr-2" />
                People
              </Button>
              <Button
                variant={activeTab === "billing" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("billing")}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Plans & Billing
              </Button>
              <Button
                variant={activeTab === "editor" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => {
                  setActiveTab("editor");
                  setShowEditor(true);
                }}
              >
                <Palette className="h-4 w-4 mr-2" />
                Portfolio Editor
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-sm">Integrations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant={activeTab === "supabase" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("supabase")}
              >
                <Database className="h-4 w-4 mr-2" />
                Supabase
              </Button>
              <Button
                variant={activeTab === "github" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("github")}
              >
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          {activeTab === "project" && <ProjectSettings />}
          {activeTab === "domains" && <DomainsSettings />}
          {activeTab === "knowledge" && <KnowledgeSettings />}
          {activeTab === "people" && <PeopleSettings />}
          {activeTab === "billing" && <BillingSettings />}
          {activeTab === "supabase" && <SupabaseSettings />}
          {activeTab === "github" && <GitHubSettings />}
        </div>
      </div>
    </div>
  );
};

const ProjectSettings = () => (
  <Card>
    <CardHeader>
      <CardTitle>Project Settings</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <Label>Project Name</Label>
        <Input placeholder="My Portfolio Project" />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea placeholder="A beautiful portfolio website..." />
      </div>
      <Button>Save Changes</Button>
    </CardContent>
  </Card>
);

const DomainsSettings = () => (
  <Card>
    <CardHeader>
      <CardTitle>Custom Domains</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <Label>Add Custom Domain</Label>
        <div className="flex gap-2">
          <Input placeholder="yourdomain.com" />
          <Button>Add Domain</Button>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-sm text-gray-600">Your domains:</p>
        <Badge variant="outline">portfolio.yourdomain.com</Badge>
      </div>
    </CardContent>
  </Card>
);

const KnowledgeSettings = () => (
  <Card>
    <CardHeader>
      <CardTitle>Knowledge Base</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <p className="text-sm text-gray-600">
        Add custom knowledge and instructions for your portfolio AI assistant.
      </p>
      <div>
        <Label>Custom Instructions</Label>
        <Textarea placeholder="Add your custom instructions here..." rows={6} />
      </div>
      <Button>Save Knowledge</Button>
    </CardContent>
  </Card>
);

const PeopleSettings = () => (
  <Card>
    <CardHeader>
      <CardTitle>Workspace Members</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <Label>Invite Member</Label>
        <div className="flex gap-2">
          <Input placeholder="email@example.com" />
          <Button>Invite</Button>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-sm text-gray-600">Current members:</p>
        <div className="flex items-center justify-between p-2 border rounded">
          <span>you@example.com</span>
          <Badge>Owner</Badge>
        </div>
      </div>
    </CardContent>
  </Card>
);

const BillingSettings = () => (
  <Card>
    <CardHeader>
      <CardTitle>Plans & Billing</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-2 border-blue-200">
          <CardContent className="p-4">
            <h3 className="font-semibold">Free</h3>
            <p className="text-2xl font-bold">$0</p>
            <p className="text-sm text-gray-600">1 portfolio</p>
            <Badge className="mt-2">Current Plan</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold">Pro</h3>
            <p className="text-2xl font-bold">$9</p>
            <p className="text-sm text-gray-600">Unlimited portfolios</p>
            <Button className="mt-2 w-full">Upgrade</Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold">Enterprise</h3>
            <p className="text-2xl font-bold">$29</p>
            <p className="text-sm text-gray-600">Advanced features</p>
            <Button className="mt-2 w-full">Contact Sales</Button>
          </CardContent>
        </Card>
      </div>
    </CardContent>
  </Card>
);

const EditorSettings = () => (
  <Card>
    <CardHeader>
      <CardTitle>Portfolio Editor</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <p className="text-sm text-gray-600">
        Advanced portfolio editor with component and layout customization.
      </p>
      <div className="p-4 border rounded bg-blue-50">
        <h4 className="font-semibold mb-2">🎨 Enhanced Editor Features</h4>
        <ul className="text-sm space-y-1">
          <li>• Drag & drop component builder</li>
          <li>• Custom layout designer</li>
          <li>• Advanced styling options</li>
          <li>• Real-time preview</li>
        </ul>
      </div>
      <Button>
        <Code className="h-4 w-4 mr-2" />
        Open Advanced Editor
      </Button>
    </CardContent>
  </Card>
);

const SupabaseSettings = () => (
  <Card>
    <CardHeader>
      <CardTitle>Supabase Integration</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-center justify-between p-3 border rounded">
        <div>
          <p className="font-medium">Supabase</p>
          <p className="text-sm text-gray-600">Database and authentication</p>
        </div>
        <Badge className="bg-green-100 text-green-800">Connected</Badge>
      </div>
      <Button variant="outline">Configure</Button>
    </CardContent>
  </Card>
);

const GitHubSettings = () => (
  <Card>
    <CardHeader>
      <CardTitle>GitHub Integration</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-center justify-between p-3 border rounded">
        <div>
          <p className="font-medium">GitHub</p>
          <p className="text-sm text-gray-600">Code deployment and version control</p>
        </div>
        <Badge variant="outline">Not Connected</Badge>
      </div>
      <Button>Connect GitHub</Button>
    </CardContent>
  </Card>
);

export default SettingsPage;
