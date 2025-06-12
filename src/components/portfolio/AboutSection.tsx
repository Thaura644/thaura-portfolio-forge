
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface AboutSectionProps {
  name: string;
  title: string;
  bio: string;
}

export const AboutSection = ({ name, title, bio }: AboutSectionProps) => {
  const skills = [
    "React", "Node.js", "TypeScript", "Python", "Django", 
    "React Native", "MongoDB", "PostgreSQL", "AWS", "Docker"
  ];

  return (
    <section id="about" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="animate-fade-in">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <span className="text-6xl font-bold text-primary">
                    {name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content */}
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                About <span className="text-primary">Me</span>
              </h2>
              <h3 className="text-xl text-primary font-semibold mb-4">{title}</h3>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>{bio}</p>
              <p>
                When it comes to Artificial Intelligence, Machine Learning, and Data Science, 
                I am continuously learning and expanding my expertise. I'm passionate about 
                creating solutions that make a real impact.
              </p>
            </div>

            {/* Skills */}
            <div>
              <h4 className="font-semibold mb-3">Technologies I work with:</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <Button size="lg" asChild>
              <a 
                href="https://drive.google.com/file/d/1_NNgYyjXfui4HROE8U9Nnvlg77j1FfWX/view?usp=sharing"
                target="_blank" 
                rel="noopener noreferrer"
              >
                Download Resume
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
