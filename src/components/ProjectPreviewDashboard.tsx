import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  Share2, 
  Trophy, 
  Download, 
  Github, 
  Globe,
  Clock,
  CheckCircle,
  Code2,
  FileText,
  Lightbulb,
  Target,
  Sparkles
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { getProjectsByLanguage } from "@/data/projects";

interface ProjectCompletionData {
  id: string;
  final_code: any;
  time_spent_seconds: number;
  skills_learned: string[];
  notes: string;
  github_repo_url?: string;
  deployment_url?: string;
  completed_at: string;
}

export default function ProjectPreviewDashboard() {
  const { language, projectId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [completion, setCompletion] = useState<ProjectCompletionData | null>(null);
  const [userNotes, setUserNotes] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [badges, setBadges] = useState<any[]>([]);

  const projects = getProjectsByLanguage(language || 'python');
  const project = projects.find(p => p.id === parseInt(projectId || '1'));

  useEffect(() => {
    fetchCompletionData();
    fetchEarnedBadges();
  }, [projectId, language]);

  const fetchCompletionData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('project_completions')
        .select('*')
        .eq('user_id', user.id)
        .eq('project_id', projectId)
        .eq('language', language)
        .order('completed_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching completion:', error);
        return;
      }

      if (data) {
        setCompletion(data);
        setUserNotes(data.notes || '');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEarnedBadges = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('user_project_badges')
        .select(`
          *,
          project_badges (*)
        `)
        .eq('user_id', user.id);

      if (data) {
        setBadges(data);
      }
    } catch (error) {
      console.error('Error fetching badges:', error);
    }
  };

  const saveNotes = async () => {
    if (!completion) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('project_completions')
        .update({ notes: userNotes })
        .eq('id', completion.id);

      if (error) throw error;

      toast({
        title: "Notes saved!",
        description: "Your reflection notes have been saved.",
      });
    } catch (error) {
      console.error('Error saving notes:', error);
      toast({
        title: "Error saving notes",
        description: "There was an issue saving your notes. Please try again.",
        variant: "destructive",
      });
    }
  };

  const shareProject = async () => {
    const shareData = {
      title: `I just completed ${project?.title}!`,
      text: `Check out my latest coding project: ${project?.title} using ${language}`,
      url: completion?.deployment_url || completion?.github_repo_url || window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        // Fallback to clipboard
        await navigator.clipboard.writeText(shareData.url!);
        toast({
          title: "Link copied!",
          description: "Project link has been copied to your clipboard.",
        });
      }
    } else {
      await navigator.clipboard.writeText(shareData.url!);
      toast({
        title: "Link copied!",
        description: "Project link has been copied to your clipboard.",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your project completion...</p>
        </div>
      </div>
    );
  }

  if (!completion || !project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No Completion Found</h2>
          <p className="text-muted-foreground mb-4">
            It looks like this project hasn't been completed yet.
          </p>
          <Button onClick={() => navigate(`/learn/${language}/project/${projectId}`)}>
            <Code2 className="h-4 w-4 mr-2" />
            Start Project
          </Button>
        </Card>
      </div>
    );
  }

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <div className="border-b border-border bg-card/80 backdrop-blur-lg sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate(`/learn/${language}`)}
                className="hover:bg-muted"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Projects
              </Button>
              
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-primary/20">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Project Completed! 🎉</h1>
                  <p className="text-sm text-muted-foreground">{project.title} • {language}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={shareProject}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              {completion.deployment_url && (
                <Button size="sm" asChild>
                  <a href={completion.deployment_url} target="_blank" rel="noopener noreferrer">
                    <Globe className="h-4 w-4 mr-2" />
                    View Live
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Project Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-success/20">
                    <CheckCircle className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="font-medium">Completed</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/20">
                    <Clock className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Time Spent</p>
                    <p className="font-medium">{formatDuration(completion.time_spent_seconds)}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/20">
                    <Target className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Difficulty</p>
                    <p className="font-medium capitalize">{project.difficulty}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Project Preview & Code */}
            <Card>
              <Tabs defaultValue="preview" className="w-full">
                <div className="p-4 border-b border-border">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="preview">
                      <Globe className="h-4 w-4 mr-2" />
                      Live Preview
                    </TabsTrigger>
                    <TabsTrigger value="code">
                      <Code2 className="h-4 w-4 mr-2" />
                      Final Code
                    </TabsTrigger>
                    <TabsTrigger value="summary">
                      <FileText className="h-4 w-4 mr-2" />
                      Summary
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="preview" className="p-0">
                  <div className="h-96 bg-muted/30 rounded-b-lg overflow-hidden">
                    {completion.deployment_url ? (
                      <iframe 
                        src={completion.deployment_url} 
                        className="w-full h-full border-0"
                        title="Project Preview"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <div className="text-center">
                          <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground">No live preview available</p>
                          <p className="text-sm text-muted-foreground">Deploy your project to see it here!</p>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="code" className="p-4">
                  <div className="space-y-4">
                    {completion.final_code && Object.keys(completion.final_code).map((fileType) => (
                      <div key={fileType}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium capitalize">{fileType}</h4>
                          <Badge variant="outline" className="text-xs">
                            {fileType === 'html' ? 'HTML' : 
                             fileType === 'css' ? 'CSS' : 
                             fileType === 'js' ? 'JavaScript' : 
                             fileType === 'python' ? 'Python' : fileType}
                          </Badge>
                        </div>
                        <pre className="bg-muted/50 p-4 rounded-lg text-sm overflow-auto max-h-48">
                          <code>{completion.final_code[fileType]}</code>
                        </pre>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="summary" className="p-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Lightbulb className="h-4 w-4 text-primary" />
                        Skills Practiced
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {completion.skills_learned?.map((skill, idx) => (
                          <Badge key={idx} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="outline">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Project Description</h4>
                      <p className="text-muted-foreground">{project.description}</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Badges Earned */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Badges Earned
              </h3>
              {badges.length > 0 ? (
                <div className="space-y-2">
                  {badges.slice(0, 3).map((userBadge) => (
                    <div key={userBadge.id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                      <span className="text-lg">{userBadge.project_badges.icon}</span>
                      <div>
                        <p className="font-medium text-sm">{userBadge.project_badges.name}</p>
                        <p className="text-xs text-muted-foreground">{userBadge.project_badges.description}</p>
                      </div>
                    </div>
                  ))}
                  {badges.length > 3 && (
                    <p className="text-xs text-center text-muted-foreground">
                      +{badges.length - 3} more badges
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Complete more projects to earn badges!</p>
              )}
            </Card>

            {/* GitHub Integration */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Github className="h-5 w-5" />
                GitHub Status
              </h3>
              {completion.github_repo_url ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Repository</span>
                    <CheckCircle className="h-4 w-4 text-success" />
                  </div>
                  <Button size="sm" variant="outline" className="w-full" asChild>
                    <a href={completion.github_repo_url} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      View on GitHub
                    </a>
                  </Button>
                </div>
              ) : (
                <div className="text-center text-sm text-muted-foreground">
                  <Github className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Push to GitHub to track your code!</p>
                </div>
              )}
            </Card>

            {/* Reflection Notes */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Reflection Notes</h3>
              <Textarea
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                placeholder="What did you learn? What challenges did you face? What would you do differently?"
                rows={4}
                className="mb-3"
              />
              <Button size="sm" onClick={saveNotes} className="w-full">
                Save Notes
              </Button>
            </Card>

            {/* Quick Actions */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Next Steps</h3>
              <div className="space-y-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate(`/learn/${language}`)}
                >
                  <Target className="h-4 w-4 mr-2" />
                  Try Another Project
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/learn')}
                >
                  <Code2 className="h-4 w-4 mr-2" />
                  Explore Other Languages
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}