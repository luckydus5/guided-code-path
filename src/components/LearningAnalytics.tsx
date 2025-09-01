import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  TrendingUp,
  Clock,
  Code,
  Target,
  Trophy,
  Calendar,
  Brain,
  Zap,
  BookOpen,
  Award,
  Activity,
  BarChart3,
  PieChart as PieChartIcon,
  Sparkles,
  Star,
  Flame,
  ChevronRight
} from "lucide-react";

interface LearningStats {
  totalLessons: number;
  completedLessons: number;
  totalChallenges: number;
  completedChallenges: number;
  timeSpent: number;
  streak: number;
  skillLevel: string;
  strongestSkills: string[];
  weakestSkills: string[];
  dailyProgress: Array<{ date: string; lessons: number; time: number; }>;
  weeklyActivity: Array<{ day: string; activity: number; }>;
  skillBreakdown: Array<{ skill: string; level: number; }>;
  achievements: Array<{ id: string; name: string; description: string; earned: boolean; date?: string; }>;
  codeQuality: {
    readability: number;
    efficiency: number;
    practices: number;
    testing: number;
  };
}

export default function LearningAnalytics() {
  const [stats, setStats] = useState<LearningStats>({
    totalLessons: 25,
    completedLessons: 8,
    totalChallenges: 150,
    completedChallenges: 23,
    timeSpent: 1247, // minutes
    streak: 7,
    skillLevel: "Intermediate Beginner",
    strongestSkills: ["Print Statements", "Variables", "Basic Math"],
    weakestSkills: ["Loops", "Functions", "Error Handling"],
    dailyProgress: [
      { date: "Mon", lessons: 3, time: 45 },
      { date: "Tue", lessons: 2, time: 30 },
      { date: "Wed", lessons: 4, time: 62 },
      { date: "Thu", lessons: 1, time: 25 },
      { date: "Fri", lessons: 5, time: 78 },
      { date: "Sat", lessons: 3, time: 55 },
      { date: "Sun", lessons: 2, time: 40 },
    ],
    weeklyActivity: [
      { day: "Mon", activity: 85 },
      { day: "Tue", activity: 60 },
      { day: "Wed", activity: 95 },
      { day: "Thu", activity: 40 },
      { day: "Fri", activity: 100 },
      { day: "Sat", activity: 75 },
      { day: "Sun", activity: 55 },
    ],
    skillBreakdown: [
      { skill: "Syntax", level: 85 },
      { skill: "Logic", level: 65 },
      { skill: "Problem Solving", level: 70 },
      { skill: "Debugging", level: 45 },
      { skill: "Best Practices", level: 55 },
      { skill: "Testing", level: 30 },
    ],
    achievements: [
      { id: "first-hello", name: "Hello World", description: "Complete your first Python program", earned: true, date: "2024-01-15" },
      { id: "variable-master", name: "Variable Master", description: "Master variables and data types", earned: true, date: "2024-01-16" },
      { id: "loop-learner", name: "Loop Learner", description: "Complete 10 loop challenges", earned: false },
      { id: "streak-7", name: "Weekly Warrior", description: "Maintain a 7-day coding streak", earned: true, date: "2024-01-20" },
      { id: "error-hunter", name: "Error Hunter", description: "Successfully debug 5 programs", earned: false },
      { id: "function-fan", name: "Function Fan", description: "Create 10 custom functions", earned: false },
      { id: "speed-coder", name: "Speed Coder", description: "Complete a challenge in under 5 minutes", earned: true, date: "2024-01-18" },
      { id: "help-seeker", name: "Curious Mind", description: "Ask the AI tutor 20 questions", earned: false },
    ],
    codeQuality: {
      readability: 78,
      efficiency: 65,
      practices: 72,
      testing: 35,
    }
  });

  const [activeTab, setActiveTab] = useState("overview");

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getSkillLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'bg-green-500/10 text-green-700';
      case 'intermediate beginner': return 'bg-blue-500/10 text-blue-700';
      case 'intermediate': return 'bg-purple-500/10 text-purple-700';
      case 'advanced': return 'bg-orange-500/10 text-orange-700';
      case 'expert': return 'bg-red-500/10 text-red-700';
      default: return 'bg-gray-500/10 text-gray-700';
    }
  };

  const achievementColors = ['#4F46E5', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const completionPercentage = (stats.completedLessons / stats.totalLessons) * 100;
  const challengePercentage = (stats.completedChallenges / stats.totalChallenges) * 100;

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <BarChart3 className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Learning Analytics</h2>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            <Sparkles className="h-3 w-3 mr-1" />
            AI-Powered Insights
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={getSkillLevelColor(stats.skillLevel)}>
            <Trophy className="h-3 w-3 mr-1" />
            {stats.skillLevel}
          </Badge>
          <Badge variant="default" className="bg-orange-500/10 text-orange-700">
            <Flame className="h-3 w-3 mr-1" />
            {stats.streak} Day Streak
          </Badge>
        </div>
      </div>

      <div className="flex-1 p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="overview">
              <Activity className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="progress">
              <TrendingUp className="h-4 w-4 mr-2" />
              Progress
            </TabsTrigger>
            <TabsTrigger value="skills">
              <Brain className="h-4 w-4 mr-2" />
              Skills
            </TabsTrigger>
            <TabsTrigger value="achievements">
              <Award className="h-4 w-4 mr-2" />
              Achievements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-700">Lessons Completed</p>
                      <p className="text-2xl font-bold text-blue-900">{stats.completedLessons}</p>
                      <p className="text-xs text-blue-600">of {stats.totalLessons} total</p>
                    </div>
                    <BookOpen className="h-8 w-8 text-blue-500" />
                  </div>
                  <Progress value={completionPercentage} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-700">Challenges Solved</p>
                      <p className="text-2xl font-bold text-green-900">{stats.completedChallenges}</p>
                      <p className="text-xs text-green-600">of {stats.totalChallenges} available</p>
                    </div>
                    <Target className="h-8 w-8 text-green-500" />
                  </div>
                  <Progress value={challengePercentage} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-700">Time Invested</p>
                      <p className="text-2xl font-bold text-purple-900">{formatTime(stats.timeSpent)}</p>
                      <p className="text-xs text-purple-600">this month</p>
                    </div>
                    <Clock className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-700">Current Streak</p>
                      <p className="text-2xl font-bold text-orange-900">{stats.streak}</p>
                      <p className="text-xs text-orange-600">days in a row</p>
                    </div>
                    <Flame className="h-8 w-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Activity Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Weekly Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={stats.weeklyActivity}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="activity" fill="hsl(217 92% 65%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Daily Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={stats.dailyProgress}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="lessons" stroke="hsl(217 92% 65%)" strokeWidth={2} />
                      <Line type="monotone" dataKey="time" stroke="hsl(271 80% 65%)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Skills Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <Star className="h-4 w-4" />
                    Strongest Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {stats.strongestSkills.map((skill, index) => (
                      <div key={skill} className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-green-500/10 text-green-700">
                          #{index + 1}
                        </Badge>
                        <span className="text-sm">{skill}</span>
                        <ChevronRight className="h-3 w-3 text-green-500 ml-auto" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-700">
                    <Target className="h-4 w-4" />
                    Focus Areas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {stats.weakestSkills.map((skill, index) => (
                      <div key={skill} className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-orange-500/10 text-orange-700">
                          #{index + 1}
                        </Badge>
                        <span className="text-sm">{skill}</span>
                        <Button variant="ghost" size="sm" className="ml-auto text-xs">
                          Practice
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Progress Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={stats.dailyProgress}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="lessons" 
                        stroke="hsl(217 92% 65%)" 
                        strokeWidth={3}
                        dot={{ fill: 'hsl(217 92% 65%)', strokeWidth: 2, r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Time Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Lessons', value: 45, fill: 'hsl(217 92% 65%)' },
                          { name: 'Challenges', value: 35, fill: 'hsl(271 80% 65%)' },
                          { name: 'Practice', value: 20, fill: 'hsl(158 64% 52%)' },
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label
                      >
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    Skill Radar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={stats.skillBreakdown}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="skill" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar
                        name="Skill Level"
                        dataKey="level"
                        stroke="hsl(217 92% 65%)"
                        fill="hsl(217 92% 65% / 0.3)"
                        strokeWidth={2}
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    Code Quality Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Readability</span>
                      <span>{stats.codeQuality.readability}%</span>
                    </div>
                    <Progress value={stats.codeQuality.readability} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Efficiency</span>
                      <span>{stats.codeQuality.efficiency}%</span>
                    </div>
                    <Progress value={stats.codeQuality.efficiency} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Best Practices</span>
                      <span>{stats.codeQuality.practices}%</span>
                    </div>
                    <Progress value={stats.codeQuality.practices} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Testing</span>
                      <span>{stats.codeQuality.testing}%</span>
                    </div>
                    <Progress value={stats.codeQuality.testing} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.achievements.map((achievement, index) => (
                <Card 
                  key={achievement.id} 
                  className={`transition-all hover:scale-105 ${
                    achievement.earned 
                      ? 'bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border-yellow-500/30' 
                      : 'opacity-60 bg-muted/30'
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${
                        achievement.earned ? 'bg-yellow-500/20' : 'bg-muted'
                      }`}>
                        {achievement.earned ? (
                          <Trophy className="h-4 w-4 text-yellow-600" />
                        ) : (
                          <Award className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{achievement.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {achievement.description}
                        </p>
                        {achievement.earned && achievement.date && (
                          <Badge variant="secondary" className="mt-2 text-xs bg-yellow-500/10 text-yellow-700">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(achievement.date).toLocaleDateString()}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}