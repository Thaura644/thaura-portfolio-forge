
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const PromoPrompt = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in-from-right">
      <Card className="p-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg max-w-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 animate-pulse" />
            <div>
              <h3 className="font-semibold text-sm">Make this your own!</h3>
              <p className="text-xs opacity-90 mb-3">Customize your UI and create stunning portfolios</p>
              <Button 
                size="sm" 
                variant="secondary"
                onClick={() => navigate('/auth')}
                className="text-purple-700 hover:text-purple-800"
              >
                Get Started Free
              </Button>
            </div>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsVisible(false)}
            className="text-white hover:bg-white/20 p-1"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};
