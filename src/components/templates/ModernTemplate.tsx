
import { Header } from "@/components/portfolio/Header";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { ServicesSection } from "@/components/portfolio/ServicesSection";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { AboutSection } from "@/components/portfolio/AboutSection";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { Footer } from "@/components/portfolio/Footer";

interface ModernTemplateProps {
  data: any;
}

export const ModernTemplate = ({ data }: ModernTemplateProps) => {
  return (
    <div className="modern-template">
      <Header name={data.name} />
      <HeroSection 
        name={data.name}
        title={data.title}
        bio={data.bio}
      />
      <ServicesSection services={data.services} />
      <ProjectsSection projects={data.projects} />
      <AboutSection 
        name={data.name}
        title={data.title}
        bio={data.bio}
      />
      <ContactSection contact={data.contact} />
      <Footer 
        name={data.name}
        social={data.social}
      />
    </div>
  );
};
