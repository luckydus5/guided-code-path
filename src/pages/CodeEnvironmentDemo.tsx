import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  Code, 
  Monitor, 
  Smartphone, 
  Palette, 
  Zap,
  Play,
  FileText,
  Rocket
} from 'lucide-react';

export default function CodeEnvironmentDemo() {
  const navigate = useNavigate();

  const demoProjects = [
    {
      id: '1',
      title: 'Interactive Landing Page',
      description: 'Build a modern, responsive landing page with animations and forms',
      difficulty: 'Beginner',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      features: ['Responsive Design', 'Smooth Animations', 'Contact Form'],
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: '2', 
      title: 'Task Manager App',
      description: 'Create a fully functional task management application',
      difficulty: 'Intermediate',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      features: ['Local Storage', 'Filtering', 'Real-time Updates'],
      color: 'from-green-500 to-blue-500'
    },
    {
      id: '3',
      title: 'Custom Project',
      description: 'Start with a blank canvas and build anything you want',
      difficulty: 'Any Level',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      features: ['Full Creative Freedom', 'Starter Templates', 'Live Preview'],
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const features = [
    {
      icon: <Code className="h-6 w-6" />,
      title: 'Multi-Language Support',
      description: 'Edit HTML, CSS, JavaScript, and more in separate tabs'
    },
    {
      icon: <Monitor className="h-6 w-6" />,
      title: 'Live Preview',
      description: 'See your changes instantly with real-time preview'
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: 'Responsive Testing',
      description: 'Test desktop, tablet, and mobile views'
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Auto-Run Code',
      description: 'Automatic execution as you type for instant feedback'
    }
  ];

  const startProject = (projectId: string) => {
    navigate(`/learn/javascript/project/${projectId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              VS Code-Like Coding Environment
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A powerful, browser-based coding environment with live preview, 
              multi-language support, and responsive testing - all built for learning!
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Demo Projects */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-4">Try It Out!</h2>
          <p className="text-center text-muted-foreground mb-12">
            Choose a project to start coding in our VS Code-like environment
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {demoProjects.map((project) => (
              <Card key={project.id} className="relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-5`}></div>
                <CardHeader className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{project.difficulty}</Badge>
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${project.color}`}>
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="relative">
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Technologies:</h4>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Features:</h4>
                      <ul className="space-y-1">
                        {project.features.map((feature, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-center">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mt-6" 
                    onClick={() => startProject(project.id)}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start Coding
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-secondary/10">
            <CardContent className="p-8">
              <Rocket className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-4">Ready to Build Something Amazing?</h3>
              <p className="text-muted-foreground mb-6">
                Jump into our coding environment and start building interactive web applications 
                with HTML, CSS, and JavaScript - all with live preview and instant feedback!
              </p>
              <Button 
                size="lg" 
                onClick={() => startProject('3')} 
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              >
                <Code className="h-5 w-5 mr-2" />
                Start Building Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
