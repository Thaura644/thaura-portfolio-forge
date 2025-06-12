
import { Github, Linkedin, Instagram, Twitter } from "lucide-react";

interface SocialLinks {
  github: string;
  linkedin: string;
  instagram: string;
  twitter: string;
}

interface FooterProps {
  name: string;
  social: SocialLinks;
}

export const Footer = ({ name, social }: FooterProps) => {
  const socialLinks = [
    { icon: Github, href: social.github, label: "GitHub" },
    { icon: Linkedin, href: social.linkedin, label: "LinkedIn" },
    { icon: Instagram, href: social.instagram, label: "Instagram" },
    { icon: Twitter, href: social.twitter, label: "Twitter" },
  ];

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center space-y-6">
          {/* Name/Brand */}
          <h3 className="text-2xl font-bold">
            <span className="text-primary">{name.split(" ")[0][0]}</span>
            {name.split(" ")[0].slice(1)} 
            <span className="text-primary"> {name.split(" ")[1]?.[0]}</span>
            {name.split(" ")[1]?.slice(1)}
          </h3>

          <p className="text-muted-foreground max-w-md mx-auto">
            Building digital solutions that make a difference. Let's create something amazing together.
          </p>

          {/* Social Links */}
          <div className="flex justify-center gap-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-background hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="pt-6 border-t">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
