
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";

interface CreativeTemplateProps {
  data: any;
}

export const CreativeTemplate = ({ data }: CreativeTemplateProps) => {
  return (
    <div className="creative-template bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 min-h-screen text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-purple-500/10 to-blue-500/10"></div>
        </div>
        
        <div className="container mx-auto px-6 text-center z-10">
          <div className="space-y-6 animate-fade-in">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 mx-auto flex items-center justify-center text-4xl font-bold">
              {data.name.split(" ").map((n: string) => n[0]).join("")}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
              {data.name}
            </h1>
            <p className="text-2xl text-purple-200">{data.title}</p>
            <p className="text-lg text-purple-300 max-w-2xl mx-auto">{data.bio}</p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600">
                View Projects
              </Button>
              <Button size="lg" variant="outline" className="border-purple-400 text-purple-200 hover:bg-purple-800">
                Contact Me
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-20 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {data.projects.map((project: any, index: number) => (
              <Card key={project.id} className="bg-white/10 backdrop-blur-md border-purple-400/20 hover:border-purple-400/40 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                    <div className="flex gap-2">
                      {project.link && (
                        <Button size="sm" variant="ghost" className="text-purple-300 hover:text-white" asChild>
                          <a href={project.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {project.github && (
                        <Button size="sm" variant="ghost" className="text-purple-300 hover:text-white" asChild>
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                  <p className="text-purple-200 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech: string) => (
                      <Badge key={tech} className="bg-purple-600/30 text-purple-200 border-purple-400/30">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
            Services
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {data.services.map((service: any) => (
              <Card key={service.id} className="bg-gradient-to-br from-purple-800/50 to-blue-800/50 backdrop-blur-md border-purple-400/20">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                  <p className="text-purple-200">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
