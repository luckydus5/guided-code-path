-- Create project completions table to track user progress
CREATE TABLE public.project_completions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  project_id TEXT NOT NULL,
  language TEXT NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  final_code JSONB, -- Store final code for each file type (html, css, js, python, etc.)
  time_spent_seconds INTEGER DEFAULT 0,
  difficulty TEXT,
  skills_learned TEXT[],
  notes TEXT, -- User reflection notes
  github_repo_url TEXT,
  deployment_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.project_completions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own project completions" 
ON public.project_completions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own project completions" 
ON public.project_completions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own project completions" 
ON public.project_completions 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create project badges table
CREATE TABLE public.project_badges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  criteria JSONB, -- Criteria for earning this badge
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for badges (public read)
ALTER TABLE public.project_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view badges" 
ON public.project_badges 
FOR SELECT 
USING (true);

-- Create user badges junction table
CREATE TABLE public.user_project_badges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  badge_id UUID NOT NULL REFERENCES public.project_badges(id),
  project_completion_id UUID NOT NULL REFERENCES public.project_completions(id),
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_project_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own badges" 
ON public.user_project_badges 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own badges" 
ON public.user_project_badges 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create trigger for updating timestamps
CREATE TRIGGER update_project_completions_updated_at
BEFORE UPDATE ON public.project_completions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some default badges
INSERT INTO public.project_badges (name, description, icon, color, criteria) VALUES
('First Steps', 'Completed your first coding project!', '🎯', 'bg-blue-500', '{"type": "first_project"}'),
('Code Warrior', 'Completed 5 projects', '⚔️', 'bg-red-500', '{"type": "project_count", "count": 5}'),
('Web Master', 'Completed 3 web development projects', '🌐', 'bg-green-500', '{"type": "web_projects", "count": 3}'),
('Speed Coder', 'Completed a project in under 2 hours', '⚡', 'bg-yellow-500', '{"type": "speed", "max_hours": 2}'),
('Perfectionist', 'Completed a project without any code resets', '💎', 'bg-purple-500', '{"type": "no_resets"}');