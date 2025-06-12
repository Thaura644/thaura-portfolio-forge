
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BasicInfoEditor } from "./editors/BasicInfoEditor";
import { ServicesEditor } from "./editors/ServicesEditor";
import { ProjectsEditor } from "./editors/ProjectsEditor";
import { ContactEditor } from "./editors/ContactEditor";
import { ThemeEditor } from "./editors/ThemeEditor";
import { Settings, Palette, User, Briefcase, Folder, Mail } from "lucide-react";

interface EditorSidebarProps {
  portfolioData: any;
  onUpdateData: (data: any) => void;
  template: string;
}

export const EditorSidebar = ({ portfolioData, onUpdateData, template }: EditorSidebarProps) => {
  const [activeTab, setActiveTab] = useState("basic");

  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-80 bg-background border-r shadow-lg z-40">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Portfolio Editor
        </h2>
        <p className="text-sm text-muted-foreground">
          Template: {template.charAt(0).toUpperCase() + template.slice(1)}
        </p>
      </div>

      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5 h-auto">
              <TabsTrigger value="basic" className="flex flex-col gap-1 h-auto py-2">
                <User className="h-4 w-4" />
                <span className="text-xs">Basic</span>
              </TabsTrigger>
              <TabsTrigger value="services" className="flex flex-col gap-1 h-auto py-2">
                <Briefcase className="h-4 w-4" />
                <span className="text-xs">Services</span>
              </TabsTrigger>
              <TabsTrigger value="projects" className="flex flex-col gap-1 h-auto py-2">
                <Folder className="h-4 w-4" />
                <span className="text-xs">Projects</span>
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex flex-col gap-1 h-auto py-2">
                <Mail className="h-4 w-4" />
                <span className="text-xs">Contact</span>
              </TabsTrigger>
              <TabsTrigger value="theme" className="flex flex-col gap-1 h-auto py-2">
                <Palette className="h-4 w-4" />
                <span className="text-xs">Theme</span>
              </TabsTrigger>
            </TabsList>

            <div className="mt-4 space-y-4">
              <TabsContent value="basic">
                <BasicInfoEditor 
                  data={portfolioData}
                  onUpdate={onUpdateData}
                />
              </TabsContent>

              <TabsContent value="services">
                <ServicesEditor 
                  services={portfolioData.services}
                  onUpdate={(services) => onUpdateData({...portfolioData, services})}
                />
              </TabsContent>

              <TabsContent value="projects">
                <ProjectsEditor 
                  projects={portfolioData.projects}
                  onUpdate={(projects) => onUpdateData({...portfolioData, projects})}
                />
              </TabsContent>

              <TabsContent value="contact">
                <ContactEditor 
                  contact={portfolioData.contact}
                  social={portfolioData.social}
                  onUpdate={(contact, social) => onUpdateData({...portfolioData, contact, social})}
                />
              </TabsContent>

              <TabsContent value="theme">
                <ThemeEditor template={template} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
};
