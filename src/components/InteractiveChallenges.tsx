import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Zap, Target, Clock, Star } from 'lucide-react';

interface CodeChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  type: 'css-selector' | 'html-structure' | 'js-logic' | 'responsive-design';
  instructions: string;
  starterCode: string;
  expectedOutput: string;
  hints: string[];
  timeLimit?: number; // in minutes
  points: number;
}

interface InteractiveChallengesProps {
  language: string;
  onCompleteChallenge: (challengeId: string, points: number) => void;
}

const WEB_CHALLENGES: CodeChallenge[] = [
  // CSS Challenges
  {
    id: 'css-1',
    title: 'CSS Flexbox Ninja',
    description: 'Master flexbox by centering elements perfectly',
    difficulty: 'beginner',
    type: 'css-selector',
    instructions: 'Center the red box both horizontally and vertically using flexbox',
    starterCode: `.container {
  width: 300px;
  height: 200px;
  border: 2px solid #ccc;
  /* Add your flexbox code here */
}

.box {
  width: 50px;
  height: 50px;
  background: red;
}`,
    expectedOutput: 'Box perfectly centered in container',
    hints: [
      'Use display: flex on the container',
      'Try justify-content: center for horizontal centering',
      'Use align-items: center for vertical centering'
    ],
    timeLimit: 5,
    points: 100
  },
  {
    id: 'css-2',
    title: 'Responsive Grid Master',
    description: 'Create a responsive card grid layout',
    difficulty: 'intermediate',
    type: 'responsive-design',
    instructions: 'Create a grid that shows 3 cards on desktop, 2 on tablet, 1 on mobile',
    starterCode: `.card-grid {
  /* Add your grid code here */
}

.card {
  background: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  margin: 10px;
}`,
    expectedOutput: 'Responsive grid layout',
    hints: [
      'Use CSS Grid with grid-template-columns',
      'Try repeat(auto-fit, minmax(250px, 1fr))',
      'Use media queries for different breakpoints'
    ],
    timeLimit: 10,
    points: 200
  },
  // HTML Challenges
  {
    id: 'html-1',
    title: 'Semantic HTML Hero',
    description: 'Build accessible HTML structure',
    difficulty: 'beginner',
    type: 'html-structure',
    instructions: 'Create a proper semantic HTML structure for a blog post',
    starterCode: `<!-- Create semantic HTML for a blog post -->
<!-- Include: header, nav, main, article, aside, footer -->
<!-- Make it accessible with proper ARIA labels -->`,
    expectedOutput: 'Semantic HTML structure',
    hints: [
      'Use <article> for the main content',
      'Add <nav> for navigation links',
      'Include proper heading hierarchy (h1, h2, h3)',
      'Add alt text to images'
    ],
    timeLimit: 8,
    points: 150
  },
  // JavaScript Challenges
  {
    id: 'js-1',
    title: 'DOM Manipulation Wizard',
    description: 'Create interactive elements with JavaScript',
    difficulty: 'intermediate',
    type: 'js-logic',
    instructions: 'Create a color-changing button that cycles through 5 colors',
    starterCode: `const button = document.getElementById('colorButton');
const colors = ['red', 'blue', 'green', 'yellow', 'purple'];
let currentIndex = 0;

// Add your code here
button.addEventListener('click', function() {
  // Cycle through colors
});`,
    expectedOutput: 'Button changes color on each click',
    hints: [
      'Use modulo operator (%) to cycle through array',
      'Update button.style.backgroundColor',
      'Increment currentIndex on each click'
    ],
    timeLimit: 7,
    points: 180
  }
];

export const InteractiveChallenges: React.FC<InteractiveChallengesProps> = ({
  language,
  onCompleteChallenge
}) => {
  const [selectedChallenge, setSelectedChallenge] = useState<CodeChallenge | null>(null);
  const [userCode, setUserCode] = useState('');
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [currentStreak, setCurrentStreak] = useState(0);

  const filteredChallenges = WEB_CHALLENGES.filter(challenge => 
    challenge.type.includes(language.toLowerCase()) || challenge.type === 'responsive-design'
  );

  useEffect(() => {
    if (timeLeft && timeLeft > 0 && isRunning) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleTimeUp();
    }
  }, [timeLeft, isRunning]);

  const startChallenge = (challenge: CodeChallenge) => {
    setSelectedChallenge(challenge);
    setUserCode(challenge.starterCode);
    setTimeLeft(challenge.timeLimit ? challenge.timeLimit * 60 : null);
    setIsRunning(true);
  };

  const handleTimeUp = () => {
    setIsRunning(false);
    // Show time up modal or notification
  };

  const submitSolution = () => {
    if (!selectedChallenge) return;
    
    // Simple validation (in real app, this would be more sophisticated)
    const isCorrect = validateSolution(selectedChallenge, userCode);
    
    if (isCorrect) {
      setCompletedChallenges(prev => [...prev, selectedChallenge.id]);
      setCurrentStreak(prev => prev + 1);
      onCompleteChallenge(selectedChallenge.id, selectedChallenge.points);
      setSelectedChallenge(null);
      setIsRunning(false);
    }
  };

  const validateSolution = (challenge: CodeChallenge, code: string): boolean => {
    // Mock validation - in real app, this would run the code and check output
    switch (challenge.type) {
      case 'css-selector':
        return code.includes('display: flex') && 
               code.includes('justify-content: center') && 
               code.includes('align-items: center');
      case 'html-structure':
        return code.includes('<article>') && 
               code.includes('<nav>') && 
               code.includes('<header>');
      case 'js-logic':
        return code.includes('currentIndex') && 
               code.includes('%') && 
               code.includes('backgroundColor');
      default:
        return true;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (selectedChallenge) {
    return (
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-blue-500" />
              <CardTitle className="text-lg">{selectedChallenge.title}</CardTitle>
              <div className={`w-3 h-3 rounded-full ${getDifficultyColor(selectedChallenge.difficulty)}`}></div>
            </div>
            <div className="flex items-center space-x-2">
              {timeLeft && (
                <Badge variant={timeLeft < 60 ? "destructive" : "secondary"}>
                  <Clock className="h-3 w-3 mr-1" />
                  {formatTime(timeLeft)}
                </Badge>
              )}
              <Badge variant="outline">
                <Star className="h-3 w-3 mr-1" />
                {selectedChallenge.points} pts
              </Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Challenge Instructions:</h4>
            <p className="text-sm text-muted-foreground">{selectedChallenge.instructions}</p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Your Code:</h4>
            <textarea
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              className="w-full h-40 p-3 font-mono text-sm border rounded-lg resize-none"
              placeholder="Write your code here..."
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setSelectedChallenge(null)}
            >
              Exit Challenge
            </Button>
            
            <div className="flex space-x-2">
              <Button
                variant="secondary"
                onClick={() => {
                  // Show hints
                }}
              >
                💡 Hint
              </Button>
              <Button
                onClick={submitSolution}
                disabled={!isRunning}
                className="bg-green-600 hover:bg-green-700"
              >
                Submit Solution
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-orange-500" />
            <CardTitle>Interactive Code Challenges</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">
              <Trophy className="h-3 w-3 mr-1" />
              {currentStreak} streak
            </Badge>
            <Badge variant="outline">
              {completedChallenges.length}/{filteredChallenges.length} completed
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="css-selector">CSS</TabsTrigger>
            <TabsTrigger value="html-structure">HTML</TabsTrigger>
            <TabsTrigger value="js-logic">JavaScript</TabsTrigger>
          </TabsList>
          
          {['all', 'css-selector', 'html-structure', 'js-logic'].map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-3 mt-4">
              {filteredChallenges
                .filter(challenge => tab === 'all' || challenge.type === tab)
                .map((challenge) => (
                <Card key={challenge.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium">{challenge.title}</h4>
                        <div className={`w-2 h-2 rounded-full ${getDifficultyColor(challenge.difficulty)}`}></div>
                        {completedChallenges.includes(challenge.id) && (
                          <Badge variant="secondary" className="text-xs">
                            ✅ Completed
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{challenge.description}</p>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        {challenge.timeLimit && (
                          <span>⏱️ {challenge.timeLimit} min</span>
                        )}
                        <span>⭐ {challenge.points} points</span>
                      </div>
                    </div>
                    <Button
                      onClick={() => startChallenge(challenge)}
                      disabled={completedChallenges.includes(challenge.id)}
                      variant={completedChallenges.includes(challenge.id) ? "outline" : "default"}
                    >
                      {completedChallenges.includes(challenge.id) ? 'Retry' : 'Start'}
                    </Button>
                  </div>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};
