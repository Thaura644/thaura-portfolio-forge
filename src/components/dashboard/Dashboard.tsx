
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Eye, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface Portfolio {
  id: string;
  name: string;
  template: string;
  is_published: boolean;
  created_at: string;
}

export const Dashboard = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolios')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPortfolios(data || []);
    } catch (error) {
      console.error('Error fetching portfolios:', error);
    } finally {
      setLoading(false);
    }
  };

  const deletePortfolio = async (id: string) => {
    if (!confirm('Are you sure you want to delete this portfolio?')) return;

    try {
      const { error } = await supabase
        .from('portfolios')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchPortfolios();
    } catch (error) {
      console.error('Error deleting portfolio:', error);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Your Portfolios</h1>
          <p className="text-gray-600 mt-2">Create and manage your portfolio websites</p>
        </div>
        <Button onClick={() => navigate('/dashboard/create')}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Portfolio
        </Button>
      </div>

      {portfolios.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Create your first portfolio</h3>
            <p className="text-gray-600 mb-6">Get started by creating your first portfolio website</p>
            <Button onClick={() => navigate('/dashboard/create')}>
              Create Portfolio
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((portfolio) => (
            <Card key={portfolio.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{portfolio.name}</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => navigate(`/portfolio/${portfolio.id}`)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => navigate(`/dashboard/edit/${portfolio.id}`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deletePortfolio(portfolio.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Template: {portfolio.template}</p>
                  <p className="text-sm text-gray-600">
                    Status: {portfolio.is_published ? 'Published' : 'Draft'}
                  </p>
                  <p className="text-sm text-gray-600">
                    Created: {new Date(portfolio.created_at).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
