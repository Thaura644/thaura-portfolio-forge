
import { useState } from "react";
import { Header } from "@/components/portfolio/Header";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { ServicesSection } from "@/components/portfolio/ServicesSection";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { AboutSection } from "@/components/portfolio/AboutSection";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { Footer } from "@/components/portfolio/Footer";
import { EditorPanel } from "@/components/editor/EditorPanel";
import { Button } from "@/components/ui/button";
import { Edit, Eye } from "lucide-react";

const Index = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [portfolioData, setPortfolioData] = useState({
    name: "James Thaura",
    title: "Full Stack Developer",
    bio: "I am a Developer with Computer Science degree background from Kenya at Kabarak university. I love programming and matters concerning tech.",
    services: [
      {
        id: 1,
        title: "Web Development",
        description: "Technology is very dependent on its subdivisions. Web technology are needed as are other technologies needed here too. I do Website development, as it is mostly a programmers prerequisites.",
        icon: "💻"
      },
      {
        id: 2,
        title: "Mobile Development",
        description: "I am proficient in React Native for mobile dev. I am also learning Android development using Java/Kotlin and currently mastering mainstream languages.",
        icon: "📱"
      },
      {
        id: 3,
        title: "AI & Data Science",
        description: "I have a passion for AI, machine learning and data science in general. I do tasks (Web and mobile apps and AI) as part of a larger program.",
        icon: "🤖"
      }
    ],
    projects: [
      {
        id: 1,
        title: "NASA APOD App",
        description: "This web application allows users to explore NASA's Astronomy Picture of the Day (APOD). Users can view the latest picture, search for pictures by date, and browse through a gallery of past images.",
        image: "/placeholder.svg",
        link: "https://nasa-apod-app-six.vercel.app/",
        github: "https://github.com/Thaura644/nasa-apod-app",
        tech: ["React", "NASA API", "Vercel"]
      },
      {
        id: 2,
        title: "Kenya School Bus App",
        description: "An efficient school bus management system with real-time tracking of buses, route optimization, and attendance management.",
        image: "/placeholder.svg",
        link: "",
        github: "https://github.com/Thaura644/kenya_school_bus_app",
        tech: ["React Native", "Node.js", "MongoDB"]
      },
      {
        id: 3,
        title: "StudyBud",
        description: "A learning management system integrated with social features for students. It includes features for managing social anxiety and creating a comfortable learning environment.",
        image: "/placeholder.svg",
        link: "",
        github: "https://github.com/Thaura644/studybud",
        tech: ["Django", "Python", "PostgreSQL"]
      },
      {
        id: 4,
        title: "Homey Property Management",
        description: "A comprehensive property management system built using the MERN stack. Features include property listings, tenant management, and maintenance tracking.",
        image: "/placeholder.svg",
        link: "",
        github: "https://github.com/Homey-property-management/homey-app",
        tech: ["React", "Node.js", "Express", "MongoDB"]
      }
    ],
    contact: {
      phone: "+254111403346",
      email: "jamesmweni52@gmail.com",
      location: "Nairobi, Kenya"
    },
    social: {
      github: "https://www.github.com/thaura644",
      linkedin: "https://www.linkedin.com/in/jamesthaura",
      instagram: "https://www.instagram.com/this.thaura/",
      twitter: "https://twitter.com/thisthaura"
    }
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Editor Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? "default" : "outline"}
          size="sm"
          className="gap-2"
        >
          {isEditing ? <Eye className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
          {isEditing ? "Preview" : "Edit"}
        </Button>
      </div>

      {/* Editor Panel */}
      {isEditing && (
        <EditorPanel 
          portfolioData={portfolioData} 
          onUpdateData={setPortfolioData}
          onClose={() => setIsEditing(false)}
        />
      )}

      {/* Portfolio Content */}
      <div className={`transition-all duration-300 ${isEditing ? "ml-80" : ""}`}>
        <Header name={portfolioData.name} />
        <HeroSection 
          name={portfolioData.name}
          title={portfolioData.title}
          bio={portfolioData.bio}
        />
        <ServicesSection services={portfolioData.services} />
        <ProjectsSection projects={portfolioData.projects} />
        <AboutSection 
          name={portfolioData.name}
          title={portfolioData.title}
          bio={portfolioData.bio}
        />
        <ContactSection contact={portfolioData.contact} />
        <Footer 
          name={portfolioData.name}
          social={portfolioData.social}
        />
      </div>
    </div>
  );
};

export default Index;
