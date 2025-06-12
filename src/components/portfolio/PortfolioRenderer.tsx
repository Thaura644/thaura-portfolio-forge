
import { ModernTemplate } from "@/components/templates/ModernTemplate";
import { MinimalTemplate } from "@/components/templates/MinimalTemplate";
import { CreativeTemplate } from "@/components/templates/CreativeTemplate";

interface PortfolioRendererProps {
  data: any;
  template: string;
  isEditing: boolean;
}

export const PortfolioRenderer = ({ data, template, isEditing }: PortfolioRendererProps) => {
  const templates = {
    modern: ModernTemplate,
    minimal: MinimalTemplate,
    creative: CreativeTemplate,
  };

  const TemplateComponent = templates[template as keyof typeof templates] || ModernTemplate;

  return (
    <div className={`portfolio-container ${isEditing ? "editing-mode" : ""}`}>
      <TemplateComponent data={data} />
    </div>
  );
};
