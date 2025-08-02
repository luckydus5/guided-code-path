import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Github, 
  Globe, 
  Zap, 
  Download, 
  ExternalLink, 
  Copy, 
  CheckCircle,
  Rocket,
  Code,
  Settings
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DeploymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectFiles: any[];
  projectTitle?: string;
}

export default function DeploymentModal({ 
  isOpen, 
  onClose, 
  projectFiles, 
  projectTitle = "My Project" 
}: DeploymentModalProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");
  const [deploymentStep, setDeploymentStep] = useState<number>(1);
  const { toast } = useToast();

  const platforms = [
    {
      id: "github-pages",
      name: "GitHub Pages",
      icon: <Github className="h-6 w-6" />,
      description: "Free static hosting with GitHub",
      difficulty: "Beginner",
      features: ["Free hosting", "Custom domain", "HTTPS", "Git integration"],
      color: "bg-gray-100 border-gray-200 hover:bg-gray-50"
    },
    {
      id: "netlify",
      name: "Netlify",
      icon: <Zap className="h-6 w-6 text-green-600" />,
      description: "Modern web development platform",
      difficulty: "Beginner",
      features: ["Drag & drop deploy", "Form handling", "Edge functions", "Analytics"],
      color: "bg-green-50 border-green-200 hover:bg-green-100"
    },
    {
      id: "vercel",
      name: "Vercel",
      icon: <Globe className="h-6 w-6" />,
      description: "Platform for frontend frameworks",
      difficulty: "Beginner",
      features: ["Zero config", "Preview deployments", "Edge network", "Analytics"],
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100"
    }
  ];

  const handleDownloadProject = () => {
    // Create a zip-like download of all project files
    projectFiles.forEach(file => {
      const blob = new Blob([file.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      a.click();
      URL.revokeObjectURL(url);
    });
    
    toast({
      title: "Files Downloaded! 📁",
      description: "All project files have been downloaded to your computer."
    });
  };

  const handleCopyFiles = () => {
    const allFiles = projectFiles.map(file => 
      `// ${file.name}\n${file.content}\n\n`
    ).join('');
    
    navigator.clipboard.writeText(allFiles);
    toast({
      title: "Files Copied! 📋",
      description: "All project files copied to clipboard."
    });
  };

  const getDeploymentGuide = (platform: string) => {
    switch (platform) {
      case "github-pages":
        return {
          steps: [
            "Download your project files",
            "Create a new GitHub repository",
            "Upload files to your repository",
            "Go to Settings > Pages",
            "Select 'Deploy from a branch'",
            "Choose 'main' branch and '/ (root)'",
            "Your site will be live at username.github.io/repository-name"
          ],
          link: "https://pages.github.com/",
          linkText: "GitHub Pages Documentation"
        };
      case "netlify":
        return {
          steps: [
            "Download your project files",
            "Go to netlify.com and sign up",
            "Drag and drop your project folder",
            "Your site is live instantly!",
            "Optional: Connect to GitHub for auto-deploy",
            "Configure custom domain if needed"
          ],
          link: "https://docs.netlify.com/",
          linkText: "Netlify Documentation"
        };
      case "vercel":
        return {
          steps: [
            "Download your project files",
            "Go to vercel.com and sign up",
            "Click 'New Project'",
            "Import from GitHub or upload folder",
            "Deploy with zero configuration",
            "Your site is live with preview URL"
          ],
          link: "https://vercel.com/docs",
          linkText: "Vercel Documentation"
        };
      default:
        return { steps: [], link: "", linkText: "" };
    }
  };

  const selectedPlatformData = platforms.find(p => p.id === selectedPlatform);
  const deploymentGuide = selectedPlatform ? getDeploymentGuide(selectedPlatform) : null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-primary" />
            Deploy "{projectTitle}"
          </DialogTitle>
          <DialogDescription>
            Choose a platform to deploy your project and share it with the world!
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="platforms" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="platforms">1. Choose Platform</TabsTrigger>
            <TabsTrigger value="guide" disabled={!selectedPlatform}>2. Deploy Guide</TabsTrigger>
            <TabsTrigger value="share">3. Share Project</TabsTrigger>
          </TabsList>
          
          <TabsContent value="platforms" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              {platforms.map((platform) => (
                <Card 
                  key={platform.id}
                  className={`cursor-pointer transition-all ${platform.color} ${
                    selectedPlatform === platform.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedPlatform(platform.id)}
                >
                  <CardHeader className="text-center pb-3">
                    <div className="flex justify-center mb-2">
                      {platform.icon}
                    </div>
                    <CardTitle className="text-lg">{platform.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {platform.description}
                    </CardDescription>
                    <Badge variant="outline" className="w-fit mx-auto">
                      {platform.difficulty}
                    </Badge>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-1">
                      {platform.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <CheckCircle className="h-3 w-3 text-green-600 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {selectedPlatform && (
              <div className="flex justify-center pt-4">
                <Button onClick={() => setDeploymentStep(2)} size="lg">
                  Continue to Deploy Guide
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="guide" className="space-y-4">
            {selectedPlatformData && deploymentGuide && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  {selectedPlatformData.icon}
                  <div>
                    <h3 className="font-semibold">{selectedPlatformData.name} Deployment</h3>
                    <p className="text-sm text-muted-foreground">
                      Follow these steps to deploy your project
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Download className="h-5 w-5" />
                        Step 1: Download Files
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Download your project files to get started
                      </p>
                      <div className="flex gap-2">
                        <Button onClick={handleDownloadProject} size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download Files
                        </Button>
                        <Button onClick={handleCopyFiles} variant="outline" size="sm">
                          <Copy className="h-4 w-4 mr-2" />
                          Copy to Clipboard
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        Step 2: Platform Setup
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        {deploymentGuide.steps.map((step, index) => (
                          <div key={index} className="flex items-start gap-2 text-sm">
                            <span className="flex-shrink-0 w-5 h-5 bg-primary text-white rounded-full text-xs flex items-center justify-center">
                              {index + 1}
                            </span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex justify-center gap-3">
                  <Button asChild variant="outline">
                    <a href={deploymentGuide.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {deploymentGuide.linkText}
                    </a>
                  </Button>
                  <Button onClick={() => setDeploymentStep(3)}>
                    Continue to Share Options
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="share" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Share Your Project
                </CardTitle>
                <CardDescription>
                  Multiple ways to share your awesome creation!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 md:grid-cols-2">
                  <Button variant="outline" onClick={handleDownloadProject}>
                    <Download className="h-4 w-4 mr-2" />
                    Download as ZIP
                  </Button>
                  <Button variant="outline" onClick={handleCopyFiles}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy All Code
                  </Button>
                </div>
                
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">💡 Pro Tips:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Add a README.md file to explain your project</li>
                    <li>• Include screenshots or GIFs of your project in action</li>
                    <li>• Share your deployment URL on social media</li>
                    <li>• Add your project to your portfolio</li>
                    <li>• Consider open-sourcing your code on GitHub</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <div className="text-sm text-muted-foreground">
            Ready to show the world what you've built? 🚀
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
