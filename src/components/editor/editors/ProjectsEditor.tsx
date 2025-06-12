
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

interface ProjectsEditorProps {
  projects: any[];
  onUpdate: (projects: any[]) => void;
}

export const ProjectsEditor = ({ projects, onUpdate }: ProjectsEditorProps) => {
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
    onUpdate([...projects, newProject]);
  };

  const updateProject = (index: number, field: string, value: string | string[]) => {
    const updatedProjects = [...projects];
    updatedProjects[index] = { ...updatedProjects[index], [field]: value };
    onUpdate(updatedProjects);
  };

  const removeProject = (index: number) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    onUpdate(updatedProjects);
  };

  const updateTech = (index: number, techString: string) => {
    const techArray = techString.split(',').map(tech => tech.trim()).filter(Boolean);
    updateProject(index, 'tech', techArray);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Projects</h3>
        <Button size="sm" onClick={addProject}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      {projects.map((project, index) => (
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
                placeholder="Project title"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={project.description}
                onChange={(e) => updateProject(index, "description", e.target.value)}
                placeholder="Describe your project..."
                rows={3}
              />
            </div>
            <div>
              <Label>GitHub URL</Label>
              <Input
                value={project.github}
                onChange={(e) => updateProject(index, "github", e.target.value)}
                placeholder="https://github.com/..."
              />
            </div>
            <div>
              <Label>Live URL</Label>
              <Input
                value={project.link}
                onChange={(e) => updateProject(index, "link", e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div>
              <Label>Technologies (comma-separated)</Label>
              <Input
                value={project.tech.join(', ')}
                onChange={(e) => updateTech(index, e.target.value)}
                placeholder="React, Node.js, TypeScript"
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
