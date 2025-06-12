
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Plus, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EditorPanelProps {
  portfolioData: any;
  onUpdateData: (data: any) => void;
  onClose: () => void;
}

export const EditorPanel = ({ portfolioData, onUpdateData, onClose }: EditorPanelProps) => {
  const [activeTab, setActiveTab] = useState("basic");

  const updateBasicInfo = (field: string, value: string) => {
    onUpdateData({
      ...portfolioData,
      [field]: value
    });
  };

  const updateService = (index: number, field: string, value: string) => {
    const updatedServices = [...portfolioData.services];
    updatedServices[index] = { ...updatedServices[index], [field]: value };
    onUpdateData({
      ...portfolioData,
      services: updatedServices
    });
  };

  const addService = () => {
    const newService = {
      id: Date.now(),
      title: "New Service",
      description: "Service description",
      icon: "⚡"
    };
    onUpdateData({
      ...portfolioData,
      services: [...portfolioData.services, newService]
    });
  };

  const removeService = (index: number) => {
    const updatedServices = portfolioData.services.filter((_: any, i: number) => i !== index);
    onUpdateData({
      ...portfolioData,
      services: updatedServices
    });
  };

  const updateProject = (index: number, field: string, value: string) => {
    const updatedProjects = [...portfolioData.projects];
    updatedProjects[index] = { ...updatedProjects[index], [field]: value };
    onUpdateData({
      ...portfolioData,
      projects: updatedProjects
    });
  };

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      title: "New Project",
      description: "Project description",
      image: "/placeholder.svg",
      link: "",
      github: "",
      tech: ["React"]
    };
    onUpdateData({
      ...portfolioData,
      projects: [...portfolioData.projects, newProject]
    });
  };

  const removeProject = (index: number) => {
    const updatedProjects = portfolioData.projects.filter((_: any, i: number) => i !== index);
    onUpdateData({
      ...portfolioData,
      projects: updatedProjects
    });
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-80 bg-background border-r shadow-lg z-40">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Portfolio Editor</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-64px)]">
        <div className="p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={portfolioData.name}
                      onChange={(e) => updateBasicInfo("name", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={portfolioData.title}
                      onChange={(e) => updateBasicInfo("title", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={portfolioData.bio}
                      onChange={(e) => updateBasicInfo("bio", e.target.value)}
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="services" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Services</h3>
                <Button size="sm" onClick={addService}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              {portfolioData.services.map((service: any, index: number) => (
                <Card key={service.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-sm">Service {index + 1}</CardTitle>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeService(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label>Icon (Emoji)</Label>
                      <Input
                        value={service.icon}
                        onChange={(e) => updateService(index, "icon", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={service.title}
                        onChange={(e) => updateService(index, "title", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={service.description}
                        onChange={(e) => updateService(index, "description", e.target.value)}
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="projects" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Projects</h3>
                <Button size="sm" onClick={addProject}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              {portfolioData.projects.map((project: any, index: number) => (
                <Card key={project.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-sm">Project {index + 1}</CardTitle>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeProject(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={project.title}
                        onChange={(e) => updateProject(index, "title", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={project.description}
                        onChange={(e) => updateProject(index, "description", e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label>GitHub URL</Label>
                      <Input
                        value={project.github}
                        onChange={(e) => updateProject(index, "github", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Live URL</Label>
                      <Input
                        value={project.link}
                        onChange={(e) => updateProject(index, "link", e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="contact" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label>Phone</Label>
                    <Input
                      value={portfolioData.contact.phone}
                      onChange={(e) => onUpdateData({
                        ...portfolioData,
                        contact: { ...portfolioData.contact, phone: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      value={portfolioData.contact.email}
                      onChange={(e) => onUpdateData({
                        ...portfolioData,
                        contact: { ...portfolioData.contact, email: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Input
                      value={portfolioData.contact.location}
                      onChange={(e) => onUpdateData({
                        ...portfolioData,
                        contact: { ...portfolioData.contact, location: e.target.value }
                      })}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
};
