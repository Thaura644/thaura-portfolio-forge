
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContactEditorProps {
  contact: any;
  social: any;
  onUpdate: (contact: any, social: any) => void;
}

export const ContactEditor = ({ contact, social, onUpdate }: ContactEditorProps) => {
  const updateContact = (field: string, value: string) => {
    onUpdate({ ...contact, [field]: value }, social);
  };

  const updateSocial = (field: string, value: string) => {
    onUpdate(contact, { ...social, [field]: value });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label>Phone</Label>
            <Input
              value={contact.phone}
              onChange={(e) => updateContact("phone", e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              value={contact.email}
              onChange={(e) => updateContact("email", e.target.value)}
              placeholder="your@email.com"
            />
          </div>
          <div>
            <Label>Location</Label>
            <Input
              value={contact.location}
              onChange={(e) => updateContact("location", e.target.value)}
              placeholder="City, Country"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Social Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label>GitHub</Label>
            <Input
              value={social.github}
              onChange={(e) => updateSocial("github", e.target.value)}
              placeholder="https://github.com/username"
            />
          </div>
          <div>
            <Label>LinkedIn</Label>
            <Input
              value={social.linkedin}
              onChange={(e) => updateSocial("linkedin", e.target.value)}
              placeholder="https://linkedin.com/in/username"
            />
          </div>
          <div>
            <Label>Twitter</Label>
            <Input
              value={social.twitter}
              onChange={(e) => updateSocial("twitter", e.target.value)}
              placeholder="https://twitter.com/username"
            />
          </div>
          <div>
            <Label>Instagram</Label>
            <Input
              value={social.instagram}
              onChange={(e) => updateSocial("instagram", e.target.value)}
              placeholder="https://instagram.com/username"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
