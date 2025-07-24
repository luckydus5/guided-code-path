import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Code2, 
  Clock, 
  Star, 
  Search, 
  Filter,
  ExternalLink,
  Zap,
  Brain,
  Rocket
} from "lucide-react";
import { HANDS_ON_PROJECTS, getProjectsByDifficulty, type Project } from "@/data/projects";

interface ProjectsSectionProps {
  selectedLanguage?: string;
}

export default function ProjectsSection({ selectedLanguage }: ProjectsSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<"All" | "Beginner" | "Intermediate" | "Advanced">("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return <Zap className="h-4 w-4" />;
      case "Intermediate": return <Brain className="h-4 w-4" />;
      case "Advanced": return <Rocket className="h-4 w-4" />;
      default: return <Code2 className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-success text-success-foreground";
      case "Intermediate": return "bg-warning text-warning-foreground";
      case "Advanced": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const filteredProjects = HANDS_ON_PROJECTS.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === "All" || project.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
    const matchesLanguage = !selectedLanguage || project.languages.includes(selectedLanguage);
    
    return matchesSearch && matchesDifficulty && matchesCategory && matchesLanguage;
  });

  const categories = Array.from(new Set(HANDS_ON_PROJECTS.map(p => p.category)));
  const beginnerCount = getProjectsByDifficulty("Beginner").length;
  const intermediateCount = getProjectsByDifficulty("Intermediate").length;
  const advancedCount = getProjectsByDifficulty("Advanced").length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          100 Hands-On Projects
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Build real-world applications and strengthen your programming skills with our comprehensive project collection.
        </p>
        
        {/* Stats */}
        <div className="flex justify-center gap-8 mt-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-success">{beginnerCount}</div>
            <div className="text-sm text-muted-foreground">Beginner</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">{intermediateCount}</div>
            <div className="text-sm text-muted-foreground">Intermediate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-destructive">{advancedCount}</div>
            <div className="text-sm text-muted-foreground">Advanced</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Filter className="h-5 w-5 text-primary" />
            Filter Projects
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Difficulty Filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value as any)}
              className="px-3 py-2 bg-background border border-border rounded-md text-foreground"
            >
              <option value="All">All Difficulties</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-background border border-border rounded-md text-foreground"
            >
              <option value="All">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="group hover:shadow-xl transition-all duration-300 hover:scale-105 bg-card/80 backdrop-blur-sm border-primary/20">
            <div className="p-6 space-y-4">
              {/* Header */}
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <Badge className={getDifficultyColor(project.difficulty)}>
                    <div className="flex items-center gap-1">
                      {getDifficultyIcon(project.difficulty)}
                      {project.difficulty}
                    </div>
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Technologies */}
              <div className="space-y-2">
                <div className="text-sm font-medium text-foreground">Technologies:</div>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{project.technologies.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <div className="text-sm font-medium text-foreground">Skills You'll Learn:</div>
                <div className="flex flex-wrap gap-1">
                  {project.skills.slice(0, 2).map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {project.skills.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.skills.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {project.estimatedTime}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  {project.category}
                </div>
              </div>

              {/* Action Button */}
              <Button className="w-full bg-gradient-primary hover:shadow-lg transition-all duration-300 group-hover:shadow-primary/25">
                <ExternalLink className="h-4 w-4 mr-2" />
                Start Project
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <Code2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No projects found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
        </div>
      )}

      {/* Results Count */}
      {filteredProjects.length > 0 && (
        <div className="text-center text-sm text-muted-foreground">
          Showing {filteredProjects.length} of {HANDS_ON_PROJECTS.length} projects
        </div>
      )}
    </div>
  );
}