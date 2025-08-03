/**
 * Learning Resources Component for Guided Code Path - Projects Layout Style
 * 
 * This component provides curated learning resources using the same layout as Projects.
 * Features include context-aware resource recommendations, filtering, search, and favorites.
 */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  BookOpen, 
  Video, 
  ExternalLink, 
  FileText,
  Code,
  Lightbulb,
  Target,
  Search,
  Filter,
  Clock,
  Star,
  PlayCircle,
  CheckCircle2,
  ArrowRight,
  Zap,
  Brain,
  Rocket
} from "lucide-react";

interface Resource {
  title: string;
  type: 'video' | 'article' | 'documentation' | 'tutorial' | 'example';
  url: string;
  description: string;
  duration?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  content?: string;
  keyPoints?: string[];
  prerequisites?: string[];
}

interface LearningResourcesProps {
  projectTitle: string;
  language: string;
  difficulty: string;
  technologies: string[];
}

export default function LearningResources({ 
  projectTitle, 
  language, 
  difficulty, 
  technologies 
}: LearningResourcesProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  // Sample resources data (this would come from your existing getResourcesForProject function)
  const sampleResources: Resource[] = [
    {
      title: "HTML Fundamentals Guide",
      type: "tutorial",
      url: "https://developer.mozilla.org/en-US/docs/Learn/HTML",
      description: "Complete guide to HTML basics, semantic elements, and best practices for modern web development.",
      duration: "2 hours",
      difficulty: "beginner",
      content: "Learn HTML from the ground up with hands-on examples and exercises.",
      keyPoints: ["HTML structure", "Semantic elements", "Forms and inputs", "SEO optimization"],
      prerequisites: ["Basic computer skills"]
    },
    {
      title: "CSS Grid Layout Mastery",
      type: "video",
      url: "https://gridbyexample.com/",
      description: "Master CSS Grid layout system with practical examples and real-world use cases.",
      duration: "90 min",
      difficulty: "intermediate",
      keyPoints: ["Grid containers", "Grid items", "Responsive layouts", "Browser support"]
    },
    {
      title: "JavaScript ES6+ Features",
      type: "article",
      url: "https://javascript.info/",
      description: "Modern JavaScript features including arrow functions, destructuring, async/await, and modules.",
      duration: "3 hours",
      difficulty: "intermediate",
      keyPoints: ["Arrow functions", "Destructuring", "Modules", "Async programming"]
    },
    {
      title: "React Documentation",
      type: "documentation",
      url: "https://react.dev/",
      description: "Official React documentation with hooks, components, and best practices.",
      duration: "4 hours",
      difficulty: "advanced",
      keyPoints: ["Components", "Hooks", "State management", "Performance"]
    }
  ];

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'article': return <FileText className="h-4 w-4" />;
      case 'documentation': return <BookOpen className="h-4 w-4" />;
      case 'tutorial': return <Code className="h-4 w-4" />;
      case 'example': return <Lightbulb className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return <Zap className="h-4 w-4" />;
      case "intermediate": return <Brain className="h-4 w-4" />;
      case "advanced": return <Rocket className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-success text-success-foreground";
      case "intermediate": return "bg-warning text-warning-foreground";
      case "advanced": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const toggleFavorite = (resourceTitle: string) => {
    setFavorites(prev => 
      prev.includes(resourceTitle)
        ? prev.filter(fav => fav !== resourceTitle)
        : [...prev, resourceTitle]
    );
  };

  const filteredResources = sampleResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || resource.type === selectedType;
    const matchesDifficulty = selectedDifficulty === "all" || resource.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesType && matchesDifficulty;
  });

  const categorizedResources = {
    all: filteredResources,
    favorites: filteredResources.filter(resource => favorites.includes(resource.title)),
    beginner: filteredResources.filter(resource => resource.difficulty === 'beginner'),
    intermediate: filteredResources.filter(resource => resource.difficulty === 'intermediate'),
    advanced: filteredResources.filter(resource => resource.difficulty === 'advanced'),
    videos: filteredResources.filter(resource => resource.type === 'video'),
    tutorials: filteredResources.filter(resource => resource.type === 'tutorial'),
    documentation: filteredResources.filter(resource => resource.type === 'documentation')
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Learning Resources
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Curated educational content to enhance your {language === 'web-fundamentals' ? 'web development' : language} skills and accelerate your learning journey.
        </p>
        
        {/* Stats */}
        <div className="flex justify-center gap-8 mt-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-success">{categorizedResources.beginner.length}</div>
            <div className="text-sm text-muted-foreground">Beginner</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">{categorizedResources.intermediate.length}</div>
            <div className="text-sm text-muted-foreground">Intermediate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-destructive">{categorizedResources.advanced.length}</div>
            <div className="text-sm text-muted-foreground">Advanced</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{categorizedResources.favorites.length}</div>
            <div className="text-sm text-muted-foreground">Favorites</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Filter className="h-5 w-5 text-primary" />
            Filter Resources
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 bg-background border border-border rounded-md text-foreground"
            >
              <option value="all">All Types</option>
              <option value="tutorial">Tutorials</option>
              <option value="video">Videos</option>
              <option value="documentation">Documentation</option>
              <option value="article">Articles</option>
              <option value="example">Examples</option>
            </select>

            {/* Difficulty Filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 bg-background border border-border rounded-md text-foreground"
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No resources found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters to find relevant learning materials.
            </p>
          </div>
        ) : (
          filteredResources.map((resource, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:scale-105 bg-card/80 backdrop-blur-sm border-primary/20">
              <div className="p-6 space-y-4">
                {/* Header */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">
                      {resource.title}
                    </h3>
                    <div className="flex gap-1 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(resource.title)}
                        className="h-8 w-8 p-0 hover:bg-yellow-100 dark:hover:bg-yellow-900/20"
                      >
                        <Star 
                          className={`h-4 w-4 ${
                            favorites.includes(resource.title) 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'text-muted-foreground'
                          }`} 
                        />
                      </Button>
                      <Badge className={getDifficultyColor(resource.difficulty)}>
                        <div className="flex items-center gap-1">
                          {getDifficultyIcon(resource.difficulty)}
                          {resource.difficulty}
                        </div>
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {resource.description}
                  </p>
                </div>

                {/* Type and Duration */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-foreground">Type:</div>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs capitalize">
                      {getResourceIcon(resource.type)}
                      <span className="ml-1">{resource.type}</span>
                    </Badge>
                    {resource.duration && (
                      <Badge variant="outline" className="text-xs flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {resource.duration}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Key Points Preview */}
                {resource.keyPoints && resource.keyPoints.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-foreground">What You'll Learn:</div>
                    <div className="flex flex-wrap gap-1">
                      {resource.keyPoints.slice(0, 2).map((point, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {point.length > 30 ? point.substring(0, 30) + '...' : point}
                        </Badge>
                      ))}
                      {resource.keyPoints.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{resource.keyPoints.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  {resource.content ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="default" 
                          className="flex-1 justify-center"
                          onClick={() => setSelectedResource(resource)}
                        >
                          <PlayCircle className="h-4 w-4 mr-2" />
                          Start Learning
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh]">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            {getResourceIcon(resource.type)}
                            {resource.title}
                            <Badge variant="secondary" className={getDifficultyColor(resource.difficulty)}>
                              {resource.difficulty}
                            </Badge>
                          </DialogTitle>
                          <DialogDescription>
                            {resource.description}
                          </DialogDescription>
                        </DialogHeader>
                        <ScrollArea className="h-[60vh] pr-4">
                          <div className="space-y-4">
                            {resource.prerequisites && resource.prerequisites.length > 0 && (
                              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                                  <Target className="h-4 w-4" />
                                  Prerequisites
                                </h4>
                                <ul className="text-sm space-y-1">
                                  {resource.prerequisites.map((prereq, idx) => (
                                    <li key={idx} className="flex items-center gap-2">
                                      <CheckCircle2 className="h-3 w-3 text-green-500" />
                                      {prereq}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            {resource.keyPoints && resource.keyPoints.length > 0 && (
                              <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                                  <Lightbulb className="h-4 w-4" />
                                  Key Learning Points
                                </h4>
                                <ul className="text-sm space-y-2">
                                  {resource.keyPoints.map((point, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                      <ArrowRight className="h-3 w-3 mt-1 text-green-600 flex-shrink-0" />
                                      {point}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            <div className="prose prose-sm max-w-none dark:prose-invert">
                              {resource.content?.split('\n').map((paragraph, idx) => (
                                <p key={idx} className="mb-3">{paragraph}</p>
                              ))}
                            </div>
                          </div>
                        </ScrollArea>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <Button 
                      size="sm" 
                      variant="default" 
                      className="flex-1 justify-center"
                      onClick={() => window.open(resource.url, '_blank', 'noopener,noreferrer')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open Resource
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
