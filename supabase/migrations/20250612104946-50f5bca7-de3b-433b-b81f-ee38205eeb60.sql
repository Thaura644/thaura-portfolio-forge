
-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create workspaces table for the SaaS functionality
CREATE TABLE public.workspaces (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create workspace members table
CREATE TABLE public.workspace_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(workspace_id, user_id)
);

-- Create portfolios table (the main product)
CREATE TABLE public.portfolios (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  template TEXT NOT NULL DEFAULT 'modern',
  data JSONB NOT NULL DEFAULT '{}',
  is_published BOOLEAN NOT NULL DEFAULT false,
  custom_domain TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(workspace_id, slug)
);

-- Create domains table for custom domains
CREATE TABLE public.domains (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  portfolio_id UUID NOT NULL REFERENCES public.portfolios(id) ON DELETE CASCADE,
  domain TEXT NOT NULL UNIQUE,
  is_verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create knowledge base table
CREATE TABLE public.knowledge_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create subscriptions table for billing
CREATE TABLE public.subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'enterprise')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'past_due')),
  stripe_subscription_id TEXT,
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for workspaces
CREATE POLICY "Users can view workspaces they are members of" ON public.workspaces
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.workspace_members 
      WHERE workspace_id = workspaces.id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create workspaces" ON public.workspaces
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Workspace owners can update their workspaces" ON public.workspaces
  FOR UPDATE USING (auth.uid() = owner_id);

-- RLS Policies for workspace_members
CREATE POLICY "Users can view workspace members for their workspaces" ON public.workspace_members
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.workspace_members wm
      WHERE wm.workspace_id = workspace_members.workspace_id AND wm.user_id = auth.uid()
    )
  );

CREATE POLICY "Workspace owners can manage members" ON public.workspace_members
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.workspaces w
      WHERE w.id = workspace_id AND w.owner_id = auth.uid()
    )
  );

-- RLS Policies for portfolios
CREATE POLICY "Users can view portfolios in their workspaces" ON public.portfolios
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.workspace_members wm
      WHERE wm.workspace_id = portfolios.workspace_id AND wm.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage portfolios in their workspaces" ON public.portfolios
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.workspace_members wm
      WHERE wm.workspace_id = portfolios.workspace_id AND wm.user_id = auth.uid()
    )
  );

-- RLS Policies for other tables (similar pattern)
CREATE POLICY "Users can view domains for their portfolios" ON public.domains
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.portfolios p
      JOIN public.workspace_members wm ON p.workspace_id = wm.workspace_id
      WHERE p.id = portfolio_id AND wm.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage domains for their portfolios" ON public.domains
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.portfolios p
      JOIN public.workspace_members wm ON p.workspace_id = wm.workspace_id
      WHERE p.id = portfolio_id AND wm.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view knowledge items in their workspaces" ON public.knowledge_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.workspace_members wm
      WHERE wm.workspace_id = knowledge_items.workspace_id AND wm.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage knowledge items in their workspaces" ON public.knowledge_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.workspace_members wm
      WHERE wm.workspace_id = knowledge_items.workspace_id AND wm.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view subscriptions for their workspaces" ON public.subscriptions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.workspace_members wm
      WHERE wm.workspace_id = subscriptions.workspace_id AND wm.user_id = auth.uid()
    )
  );

CREATE POLICY "Workspace owners can manage subscriptions" ON public.subscriptions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.workspaces w
      WHERE w.id = workspace_id AND w.owner_id = auth.uid()
    )
  );

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  workspace_id UUID;
BEGIN
  -- Insert profile
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name'
  );

  -- Create default workspace
  INSERT INTO public.workspaces (name, slug, owner_id)
  VALUES (
    COALESCE(NEW.raw_user_meta_data ->> 'first_name', 'My') || '''s Workspace',
    'workspace-' || substr(NEW.id::text, 1, 8),
    NEW.id
  ) RETURNING id INTO workspace_id;

  -- Add user as workspace owner
  INSERT INTO public.workspace_members (workspace_id, user_id, role)
  VALUES (workspace_id, NEW.id, 'owner');

  -- Create default subscription
  INSERT INTO public.subscriptions (workspace_id, plan, status)
  VALUES (workspace_id, 'free', 'active');

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
