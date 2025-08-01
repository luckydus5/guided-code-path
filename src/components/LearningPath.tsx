import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, 
  Star, 
  Zap, 
  Target, 
  Lock, 
  CheckCircle,
  Flame,
  Award,
  Map
} from 'lucide-react';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  totalXP: number;
  estimatedHours: number;
  modules: LearningModule[];
}

interface LearningModule {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  prerequisites: string[];
  isCompleted: boolean;
  isLocked: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  type: 'tutorial' | 'challenge' | 'project' | 'quiz';
  content: {
    lessons?: string[];
    challenges?: string[];
    projects?: string[];
  };
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: {
    type: 'xp' | 'streak' | 'projects' | 'challenges';
    value: number;
  };
  isUnlocked: boolean;
  xpBonus: number;
}

interface UserProgress {
  totalXP: number;
  currentStreak: number;
  completedModules: string[];
  unlockedAchievements: string[];
  currentLevel: number;
}

const WEB_FUNDAMENTALS_PATH: LearningPath = {
  id: 'web-fundamentals',
  title: 'Web Development Fundamentals',
  description: 'Master the building blocks of modern web development',
  totalXP: 2500,
  estimatedHours: 25,
  modules: [
    {
      id: 'html-basics',
      title: 'HTML Foundations',
      description: 'Learn the structure of web pages',
      xpReward: 200,
      prerequisites: [],
      isCompleted: false,
      isLocked: false,
      difficulty: 'beginner',
      type: 'tutorial',
      content: {
        lessons: ['Document Structure', 'Elements & Attributes', 'Semantic HTML', 'Forms & Input'],
        challenges: ['Build a Profile Page', 'Create a Contact Form']
      }
    },
    {
      id: 'css-styling',
      title: 'CSS Styling Mastery',
      description: 'Make your websites beautiful with CSS',
      xpReward: 300,
      prerequisites: ['html-basics'],
      isCompleted: false,
      isLocked: true,
      difficulty: 'beginner',
      type: 'tutorial',
      content: {
        lessons: ['Selectors & Properties', 'Box Model', 'Flexbox', 'Grid Layout'],
        challenges: ['Style a Landing Page', 'Create Responsive Cards']
      }
    },
    {
      id: 'responsive-design',
      title: 'Responsive Web Design',
      description: 'Build sites that work on any device',
      xpReward: 400,
      prerequisites: ['css-styling'],
      isCompleted: false,
      isLocked: true,
      difficulty: 'intermediate',
      type: 'tutorial',
      content: {
        lessons: ['Media Queries', 'Mobile-First Design', 'Flexible Images'],
        challenges: ['Mobile-Friendly Navigation', 'Responsive Image Gallery']
      }
    },
    {
      id: 'javascript-basics',
      title: 'JavaScript Fundamentals',
      description: 'Add interactivity to your websites',
      xpReward: 500,
      prerequisites: ['responsive-design'],
      isCompleted: false,
      isLocked: true,
      difficulty: 'intermediate',
      type: 'tutorial',
      content: {
        lessons: ['Variables & Functions', 'DOM Manipulation', 'Events', 'Async JavaScript'],
        challenges: ['Interactive Calculator', 'Dynamic To-Do List']
      }
    },
    {
      id: 'final-project',
      title: 'Portfolio Website Project',
      description: 'Build your complete portfolio website',
      xpReward: 800,
      prerequisites: ['javascript-basics'],
      isCompleted: false,
      isLocked: true,
      difficulty: 'advanced',
      type: 'project',
      content: {
        projects: ['Personal Portfolio', 'Interactive Resume', 'Project Showcase']
      }
    }
  ]
};

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-steps',
    title: 'First Steps',
    description: 'Complete your first module',
    icon: '👶',
    requirement: { type: 'projects', value: 1 },
    isUnlocked: false,
    xpBonus: 50
  },
  {
    id: 'streak-master',
    title: 'Streak Master',
    description: 'Maintain a 7-day learning streak',
    icon: '🔥',
    requirement: { type: 'streak', value: 7 },
    isUnlocked: false,
    xpBonus: 200
  },
  {
    id: 'html-ninja',
    title: 'HTML Ninja',
    description: 'Master HTML fundamentals',
    icon: '🥷',
    requirement: { type: 'xp', value: 500 },
    isUnlocked: false,
    xpBonus: 100
  },
  {
    id: 'css-artist',
    title: 'CSS Artist',
    description: 'Create beautiful designs with CSS',
    icon: '🎨',
    requirement: { type: 'xp', value: 1000 },
    isUnlocked: false,
    xpBonus: 150
  },
  {
    id: 'js-wizard',
    title: 'JavaScript Wizard',
    description: 'Bring websites to life with JavaScript',
    icon: '🧙‍♂️',
    requirement: { type: 'xp', value: 1500 },
    isUnlocked: false,
    xpBonus: 200
  },
  {
    id: 'web-developer',
    title: 'Web Developer',
    description: 'Complete the entire fundamentals path',
    icon: '🏆',
    requirement: { type: 'xp', value: 2500 },
    isUnlocked: false,
    xpBonus: 500
  }
];

interface LearningPathProps {
  onModuleStart: (moduleId: string) => void;
  onProgressUpdate: (progress: UserProgress) => void;
}

export const LearningPath: React.FC<LearningPathProps> = ({
  onModuleStart,
  onProgressUpdate
}) => {
  const [userProgress, setUserProgress] = useState<UserProgress>({
    totalXP: 0,
    currentStreak: 0,
    completedModules: [],
    unlockedAchievements: [],
    currentLevel: 1
  });
  
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);
  const [achievements, setAchievements] = useState(ACHIEVEMENTS);
  const [showAchievements, setShowAchievements] = useState(false);

  const calculateLevel = (xp: number) => {
    return Math.floor(xp / 250) + 1;
  };

  const getXPForNextLevel = (currentXP: number) => {
    const currentLevel = calculateLevel(currentXP);
    return currentLevel * 250 - currentXP;
  };

  const completeModule = (moduleId: string, xpGained: number) => {
    const newProgress = {
      ...userProgress,
      totalXP: userProgress.totalXP + xpGained,
      completedModules: [...userProgress.completedModules, moduleId],
      currentLevel: calculateLevel(userProgress.totalXP + xpGained)
    };

    // Update module completion status and unlock next modules
    WEB_FUNDAMENTALS_PATH.modules.forEach(module => {
      if (module.id === moduleId) {
        module.isCompleted = true;
      }
      
      // Unlock modules that have prerequisites met
      const prerequisitesMet = module.prerequisites.every(prereq => 
        newProgress.completedModules.includes(prereq)
      );
      if (prerequisitesMet) {
        module.isLocked = false;
      }
    });

    // Check for new achievements
    checkAchievements(newProgress);
    
    setUserProgress(newProgress);
    onProgressUpdate(newProgress);
  };

  const checkAchievements = (progress: UserProgress) => {
    const newUnlockedAchievements = [...progress.unlockedAchievements];
    
    achievements.forEach(achievement => {
      if (!achievement.isUnlocked && !newUnlockedAchievements.includes(achievement.id)) {
        const { type, value } = achievement.requirement;
        let achieved = false;

        switch (type) {
          case 'xp':
            achieved = progress.totalXP >= value;
            break;
          case 'streak':
            achieved = progress.currentStreak >= value;
            break;
          case 'projects':
            achieved = progress.completedModules.length >= value;
            break;
          case 'challenges':
            // Count challenge completions (simplified)
            achieved = progress.completedModules.length >= value;
            break;
        }

        if (achieved) {
          newUnlockedAchievements.push(achievement.id);
          achievement.isUnlocked = true;
          
          // Show achievement notification
          // toast({ title: `🎉 Achievement Unlocked!`, description: achievement.title });
        }
      }
    });

    if (newUnlockedAchievements.length > progress.unlockedAchievements.length) {
      setUserProgress(prev => ({
        ...prev,
        unlockedAchievements: newUnlockedAchievements
      }));
    }
  };

  const getModuleProgress = () => {
    const total = WEB_FUNDAMENTALS_PATH.modules.length;
    const completed = userProgress.completedModules.length;
    return (completed / total) * 100;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'tutorial': return '📚';
      case 'challenge': return '⚡';
      case 'project': return '🛠️';
      case 'quiz': return '🧠';
      default: return '📝';
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Map className="h-5 w-5 text-blue-500" />
                <span>Web Development Fundamentals</span>
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {WEB_FUNDAMENTALS_PATH.description}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowAchievements(!showAchievements)}
            >
              <Trophy className="h-4 w-4 mr-2" />
              Achievements
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* User Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{userProgress.totalXP}</div>
              <div className="text-sm text-muted-foreground">Total XP</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">Level {userProgress.currentLevel}</div>
              <div className="text-sm text-muted-foreground">
                {getXPForNextLevel(userProgress.totalXP)} XP to next
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 flex items-center justify-center">
                <Flame className="h-6 w-6 mr-1" />
                {userProgress.currentStreak}
              </div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {userProgress.completedModules.length}/{WEB_FUNDAMENTALS_PATH.modules.length}
              </div>
              <div className="text-sm text-muted-foreground">Modules Done</div>
            </div>
          </div>

          {/* Overall Progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">
                {Math.round(getModuleProgress())}%
              </span>
            </div>
            <Progress value={getModuleProgress()} className="w-full" />
          </div>
        </CardContent>
      </Card>

      {/* Achievements Panel */}
      {showAchievements && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-yellow-500" />
              <span>Achievements</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border ${
                    achievement.isUnlocked 
                      ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20' 
                      : 'bg-gray-50 border-gray-200 dark:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`text-2xl ${achievement.isUnlocked ? '' : 'grayscale opacity-50'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          +{achievement.xpBonus} XP
                        </Badge>
                        {achievement.isUnlocked && (
                          <Badge variant="secondary" className="text-xs">
                            ✅ Unlocked
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Learning Modules */}
      <div className="space-y-4">
        {WEB_FUNDAMENTALS_PATH.modules.map((module, index) => (
          <Card key={module.id} className={`${module.isCompleted ? 'border-green-200 bg-green-50/50 dark:bg-green-900/10' : ''}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="text-2xl">{getTypeIcon(module.type)}</div>
                    <div>
                      <h3 className="text-lg font-semibold flex items-center space-x-2">
                        <span>{module.title}</span>
                        {module.isCompleted && <CheckCircle className="h-5 w-5 text-green-500" />}
                        {module.isLocked && <Lock className="h-4 w-4 text-gray-400" />}
                      </h3>
                      <p className="text-sm text-muted-foreground">{module.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{module.xpReward} XP</span>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${getDifficultyColor(module.difficulty)}`}></div>
                    <Badge variant="outline" className="text-xs">
                      {module.difficulty}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {module.type}
                    </Badge>
                  </div>

                  {module.content.lessons && (
                    <div className="mt-3">
                      <h5 className="text-xs font-medium text-muted-foreground mb-1">
                        LESSONS ({module.content.lessons.length})
                      </h5>
                      <div className="flex flex-wrap gap-1">
                        {module.content.lessons.map((lesson, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {lesson}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="ml-4">
                  <Button
                    onClick={() => {
                      if (!module.isLocked) {
                        onModuleStart(module.id);
                        setSelectedModule(module);
                      }
                    }}
                    disabled={module.isLocked}
                    variant={module.isCompleted ? "outline" : "default"}
                  >
                    {module.isLocked ? (
                      <>
                        <Lock className="h-4 w-4 mr-2" />
                        Locked
                      </>
                    ) : module.isCompleted ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Review
                      </>
                    ) : (
                      <>
                        <Target className="h-4 w-4 mr-2" />
                        Start
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              {module.prerequisites.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-xs text-muted-foreground">
                    <strong>Prerequisites:</strong> Complete{' '}
                    {module.prerequisites.map(prereq => {
                      const prereqModule = WEB_FUNDAMENTALS_PATH.modules.find(m => m.id === prereq);
                      return prereqModule?.title;
                    }).join(', ')}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
