import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Target, Trophy } from "lucide-react";
import CodeEnvironment from "@/components/CodeEnvironment";
import { useToast } from "@/hooks/use-toast";
import { getProjectsByLanguage, WEB_FUNDAMENTALS_PROJECTS } from "@/data/projects";

interface ProjectEnvironmentProps {
  user?: any;
  profile?: any;
}

export default function ProjectEnvironment({ user, profile }: ProjectEnvironmentProps) {
  const { language, projectId } = useParams<{ language: string; projectId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [project, setProject] = useState<any>(null);
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    loadProject();
  }, [projectId, language]);

  const loadProject = () => {
    let projectData;
    
    if (language === 'web-fundamentals') {
      projectData = WEB_FUNDAMENTALS_PROJECTS.find(p => p.id.toString() === projectId);
    } else {
      const languageProjects = getProjectsByLanguage(language || '');
      projectData = languageProjects.find(p => p.id.toString() === projectId);
    }
    
    if (projectData) {
      setProject({
        ...projectData,
        initialFiles: getInitialFiles(projectId),
        objectives: projectData.learningObjectives || [
          "Complete the project requirements",
          "Apply best practices"
        ]
      });
    } else {
      setProject({
        id: projectId,
        title: `${language?.toUpperCase()} Project ${projectId}`,
        description: `Build an interactive ${language} application.`,
        difficulty: "Beginner",
        objectives: [
          "Create a responsive HTML structure",
          "Style with modern CSS techniques",
          "Add interactive JavaScript functionality"
        ],
        initialFiles: getInitialFiles(projectId)
      });
    }
  };

  const getInitialFiles = (projectId: string | undefined) => {
    if (language === 'python') {
      return [
        {
          id: '1',
          name: 'main.py',
          language: 'python' as const,
          content: `# Python Project ${projectId}

def main():
    print("Hello, Python World!")
    print("Project ID:", "${projectId}")

if __name__ == "__main__":
    main()
`,
          isActive: true
        }
      ];
    }
    
    return [
      {
        id: '1',
        name: 'index.html',
        language: 'html' as const,
        content: getProjectHTML(projectId),
        isActive: true
      },
      {
        id: '2',
        name: 'style.css',
        language: 'css' as const,
        content: getProjectCSS(),
        isActive: false
      },
      {
        id: '3',
        name: 'script.js',
        language: 'javascript' as const,
        content: getProjectJS(),
        isActive: false
      }
    ];
  };

  const handleSaveProject = (files: any[]) => {
    toast({
      title: "Project Saved ✅",
      description: "Your progress has been saved successfully!"
    });
    console.log('Saving project files:', files);
  };

  const completeProject = () => {
    toast({
      title: "🎉 Project Completed!",
      description: "Congratulations! You've successfully completed this project."
    });
    
    setTimeout(() => {
      navigate(`/learn/${language}`);
    }, 2000);
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading project...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate(`/learn/${language}`)}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Learning</span>
              </Button>
              
              <div>
                <h1 className="text-2xl font-bold">{project.title}</h1>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="secondary">{language?.toUpperCase()}</Badge>
                  <Badge variant="outline">{project.difficulty}</Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowInstructions(!showInstructions)}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                {showInstructions ? 'Hide' : 'Show'} Instructions
              </Button>
              
              <Button onClick={completeProject} className="bg-green-600 hover:bg-green-700">
                <Trophy className="h-4 w-4 mr-2" />
                Complete Project
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {showInstructions && (
          <div className="w-80 border-r bg-card/30 p-6 max-h-screen overflow-y-auto">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Target className="h-5 w-5 mr-2 text-primary" />
                  Project Overview
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-3">Learning Objectives</h4>
                <ul className="space-y-2">
                  {project.objectives?.map((objective: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className={`flex-1 ${showInstructions ? '' : 'w-full'}`}>
          <CodeEnvironment
            projectId={projectId}
            initialFiles={project.initialFiles}
            onSave={handleSaveProject}
          />
        </div>
      </div>
    </div>
  );
}

function getProjectHTML(projectId: string | undefined): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Web Project</title>
</head>
<body>
    <div class="container">
        <header>
            <h1>Welcome to Your Web Project!</h1>
            <p>Start building something amazing!</p>
        </div>
        
        <main>
            <button id="actionButton" class="btn">Click Me!</button>
            <div id="output" class="output">
                <p>Output will appear here...</p>
            </div>
        </main>
    </div>
</body>
</html>`;
}

function getProjectCSS(): string {
  return `/* Default Project Styles */
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    color: white;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    padding: 40px;
}

button {
    background: #ff6b6b;
    color: white;
    border: none;
    padding: 15px 30px;
    font-size: 1.1rem;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
}

button:hover {
    transform: translateY(-2px);
    background: #ff5252;
}`;
}

function getProjectJS(): string {
  return `// Default Project JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('actionButton');
    const output = document.getElementById('output');
    
    if (button && output) {
        button.addEventListener('click', function() {
            output.innerHTML = '<p>Hello from JavaScript! 🎉</p>';
        });
    }
});

console.log('🎯 Project loaded successfully!');`;
}
