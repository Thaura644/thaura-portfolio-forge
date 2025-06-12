
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Mail, Phone, MapPin } from "lucide-react";

interface MinimalTemplateProps {
  data: any;
}

export const MinimalTemplate = ({ data }: MinimalTemplateProps) => {
  return (
    <div className="minimal-template max-w-4xl mx-auto px-6 py-12 space-y-16">
      {/* Header */}
      <header className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-light">{data.name}</h1>
        <p className="text-xl text-muted-foreground">{data.title}</p>
        <p className="text-muted-foreground max-w-2xl mx-auto">{data.bio}</p>
      </header>

      {/* Projects */}
      <section className="space-y-8">
        <h2 className="text-2xl font-light border-b pb-2">Projects</h2>
        <div className="space-y-6">
          {data.projects.map((project: any) => (
            <Card key={project.id} className="border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-medium">{project.title}</h3>
                  <div className="flex gap-2">
                    {project.link && (
                      <Button size="sm" variant="ghost" asChild>
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {project.github && (
                      <Button size="sm" variant="ghost" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech: string) => (
                    <Badge key={tech} variant="outline">{tech}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="space-y-8">
        <h2 className="text-2xl font-light border-b pb-2">Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.services.map((service: any) => (
            <div key={service.id} className="space-y-2">
              <div className="text-2xl">{service.icon}</div>
              <h3 className="font-medium">{service.title}</h3>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="space-y-8">
        <h2 className="text-2xl font-light border-b pb-2">Contact</h2>
        <div className="flex flex-wrap gap-8">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{data.contact.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <a href={`mailto:${data.contact.email}`} className="hover:text-primary">
              {data.contact.email}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{data.contact.location}</span>
          </div>
        </div>
      </section>
    </div>
  );
};
