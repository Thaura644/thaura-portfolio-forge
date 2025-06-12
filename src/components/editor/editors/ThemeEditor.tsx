
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme/ThemeProvider";

interface ThemeEditorProps {
  template: string;
}

export const ThemeEditor = ({ template }: ThemeEditorProps) => {
  const { theme, setTheme } = useTheme();

  const colorSchemes = [
    { name: "Blue", value: "blue", colors: ["#3b82f6", "#1e40af"] },
    { name: "Purple", value: "purple", colors: ["#8b5cf6", "#7c3aed"] },
    { name: "Green", value: "green", colors: ["#10b981", "#059669"] },
    { name: "Red", value: "red", colors: ["#ef4444", "#dc2626"] },
    { name: "Orange", value: "orange", colors: ["#f97316", "#ea580c"] },
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Theme Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Dark Mode</label>
            <div className="flex gap-2 mt-2">
              <Button
                size="sm"
                variant={theme === "light" ? "default" : "outline"}
                onClick={() => setTheme("light")}
              >
                Light
              </Button>
              <Button
                size="sm"
                variant={theme === "dark" ? "default" : "outline"}
                onClick={() => setTheme("dark")}
              >
                Dark
              </Button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Color Scheme</label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {colorSchemes.map((scheme) => (
                <Button
                  key={scheme.value}
                  size="sm"
                  variant="outline"
                  className="h-auto p-2"
                  onClick={() => {
                    // Future: Implement color scheme changes
                    console.log("Color scheme:", scheme.value);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {scheme.colors.map((color, i) => (
                        <div
                          key={i}
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <span className="text-xs">{scheme.name}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Template: {template}</label>
            <p className="text-xs text-muted-foreground mt-1">
              Switch templates using the dropdown in the top bar
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
