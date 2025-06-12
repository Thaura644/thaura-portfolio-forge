
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface BasicInfoEditorProps {
  data: any;
  onUpdate: (data: any) => void;
}

export const BasicInfoEditor = ({ data, onUpdate }: BasicInfoEditorProps) => {
  const updateField = (field: string, value: string) => {
    onUpdate({
      ...data,
      [field]: value
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={data.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="Your full name"
          />
        </div>
        
        <div>
          <Label htmlFor="title">Professional Title</Label>
          <Input
            id="title"
            value={data.title}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder="e.g., Full Stack Developer"
          />
        </div>
        
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={data.bio}
            onChange={(e) => updateField("bio", e.target.value)}
            placeholder="Tell us about yourself..."
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  );
};
