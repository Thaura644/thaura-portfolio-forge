
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

interface ServicesEditorProps {
  services: any[];
  onUpdate: (services: any[]) => void;
}

export const ServicesEditor = ({ services, onUpdate }: ServicesEditorProps) => {
  const addService = () => {
    const newService = {
      id: Date.now(),
      title: "New Service",
      description: "Service description",
      icon: "⚡"
    };
    onUpdate([...services, newService]);
  };

  const updateService = (index: number, field: string, value: string) => {
    const updatedServices = [...services];
    updatedServices[index] = { ...updatedServices[index], [field]: value };
    onUpdate(updatedServices);
  };

  const removeService = (index: number) => {
    const updatedServices = services.filter((_, i) => i !== index);
    onUpdate(updatedServices);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Services</h3>
        <Button size="sm" onClick={addService}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      {services.map((service, index) => (
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
                placeholder="🚀"
              />
            </div>
            <div>
              <Label>Title</Label>
              <Input
                value={service.title}
                onChange={(e) => updateService(index, "title", e.target.value)}
                placeholder="Service title"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={service.description}
                onChange={(e) => updateService(index, "description", e.target.value)}
                placeholder="Describe your service..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
