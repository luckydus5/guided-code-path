import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight, 
  Lightbulb, 
  Code, 
  Target, 
  AlertCircle,
  FileCode,
  Zap,
  Clock,
  Trophy
} from "lucide-react";

interface ProjectStep {
  id: number;
  title: string;
  description: string;
  instructions: string[];
  examples: {
    title: string;
    code: string;
    language: string;
    explanation: string;
  }[];
  hints: string[];
  checkpoints: string[];
  estimatedTime: string;
}

interface ProjectGuide {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  totalSteps: number;
  estimatedTime: string;
  prerequisites: string[];
  learningGoals: string[];
  steps: ProjectStep[];
}

const PYTHON_PROJECTS: { [key: string]: ProjectGuide } = {
  '1': {
    id: '1',
    title: 'African Mobile Money System',
    description: 'Build a comprehensive mobile money transfer system inspired by M-Pesa and other African fintech solutions.',
    difficulty: 'Beginner',
    totalSteps: 8,
    estimatedTime: '2-3 weeks',
    prerequisites: [
      'Basic Python syntax and variables',
      'Understanding of functions',
      'Knowledge of dictionaries and lists',
      'Basic input/output operations'
    ],
    learningGoals: [
      'Master Python classes and object-oriented design',
      'Implement secure data handling practices', 
      'Learn file-based database operations',
      'Practice input validation and error handling',
      'Understand African fintech ecosystem'
    ],
    steps: [
      {
        id: 1,
        title: 'Project Setup & User Account System',
        description: 'Create the foundation for our mobile money system with user registration and basic account management.',
        estimatedTime: '3-4 hours',
        instructions: [
          'Set up your project directory and main Python file',
          'Create a User class to represent system users',
          'Implement user registration with phone number validation',
          'Add basic authentication system',
          'Create a simple menu system for user interaction'
        ],
        examples: [
          {
            title: 'Phone Number Validation Example',
            language: 'python',
            code: `# Example of phone number validation for African countries
def validate_phone_number(phone):
    # Remove spaces and special characters
    phone = phone.replace(" ", "").replace("-", "").replace("+", "")
    
    # Check if it's a valid length (usually 10-12 digits)
    if len(phone) < 10 or len(phone) > 12:
        return False
    
    # Check if all characters are digits
    if not phone.isdigit():
        return False
    
    # Add your validation logic here
    return True`,
            explanation: 'This function shows how to validate phone numbers. You will need to expand it to handle different African country codes and formats.'
          },
          {
            title: 'Basic Class Structure',
            language: 'python',
            code: `# Example class structure for a User
class User:
    def __init__(self, name, phone_number):
        self.name = name
        self.phone_number = phone_number
        self.balance = 0.0
        self.pin = None
        
    def set_pin(self, pin):
        # Add PIN validation logic here
        pass
        
    def verify_pin(self, entered_pin):
        # Add PIN verification logic here
        pass`,
            explanation: 'This shows the basic structure of a User class. You will need to add more methods and properties as you build the system.'
          }
        ],
        hints: [
          'Use a dictionary to store user data initially before moving to files',
          'Consider security - never store PINs in plain text',
          'African phone numbers often start with country codes like +254 (Kenya), +233 (Ghana)',
          'Think about what information is essential for a mobile money user'
        ],
        checkpoints: [
          'User can register with name and phone number',
          'Phone number validation works correctly',
          'User can set and verify PIN',
          'Basic menu system displays options'
        ]
      },
      {
        id: 2,
        title: 'Account Balance & Transaction Foundation',
        description: 'Implement balance management and create the foundation for transaction processing.',
        estimatedTime: '2-3 hours',
        instructions: [
          'Add balance management methods to User class',
          'Create a Transaction class to record all money movements',
          'Implement deposit and withdrawal functionality',
          'Add transaction history tracking',
          'Create balance inquiry feature'
        ],
        examples: [
          {
            title: 'Transaction Record Example',
            language: 'python',
            code: `from datetime import datetime

class Transaction:
    def __init__(self, transaction_type, amount, sender=None, receiver=None):
        self.id = self.generate_transaction_id()
        self.timestamp = datetime.now()
        self.type = transaction_type  # 'deposit', 'withdrawal', 'transfer'
        self.amount = amount
        self.sender = sender
        self.receiver = receiver
        
    def generate_transaction_id(self):
        # Generate unique transaction ID
        # You could use timestamp + random number
        pass`,
            explanation: 'This Transaction class helps track all money movements in the system. Each transaction should have a unique ID and timestamp.'
          },
          {
            title: 'Balance Management Example',
            language: 'python',
            code: `def deposit(self, amount):
    if amount <= 0:
        return False, "Amount must be greater than zero"
    
    # Add the amount to balance
    self.balance += amount
    
    # Create transaction record
    transaction = Transaction('deposit', amount, receiver=self.phone_number)
    
    return True, f"Successfully deposited {amount}. New balance: {self.balance}"`,
            explanation: 'This shows how to handle deposits safely with validation and transaction recording.'
          }
        ],
        hints: [
          'Always validate amounts before processing transactions',
          'Keep a list of all transactions for each user',
          'Consider what happens if someone tries to withdraw more than they have',
          'Transaction IDs should be unique - consider using timestamps'
        ],
        checkpoints: [
          'Users can deposit money to their account',
          'Users can check their balance',
          'Transaction records are created and stored',
          'Withdrawal validation prevents overdrafts'
        ]
      },
      {
        id: 3,
        title: 'Money Transfer System',
        description: 'Build the core money transfer functionality that allows users to send money to each other.',
        estimatedTime: '4-5 hours',
        instructions: [
          'Create send_money method in User class',
          'Implement recipient lookup by phone number',
          'Add transfer validation (sufficient balance, valid recipient)',
          'Create transfer confirmation process',
          'Add transfer fees calculation (like real mobile money services)'
        ],
        examples: [
          {
            title: 'Money Transfer Logic Example',
            language: 'python',
            code: `def send_money(self, recipient_phone, amount, pin):
    # Step 1: Verify sender's PIN
    if not self.verify_pin(pin):
        return False, "Invalid PIN"
    
    # Step 2: Check if sender has sufficient balance
    total_cost = amount + self.calculate_transfer_fee(amount)
    if self.balance < total_cost:
        return False, "Insufficient balance"
    
    # Step 3: Find recipient
    recipient = self.find_user_by_phone(recipient_phone)
    if not recipient:
        return False, "Recipient not found"
    
    # Continue with transfer logic...`,
            explanation: 'This shows the beginning of a secure money transfer process. You will need to complete the logic.'
          },
          {
            title: 'Transfer Fee Calculation',
            language: 'python',
            code: `def calculate_transfer_fee(self, amount):
    # Example fee structure like M-Pesa
    if amount <= 100:
        return 5
    elif amount <= 500:
        return 10
    elif amount <= 1000:
        return 15
    else:
        return 25`,
            explanation: 'Mobile money services charge fees for transfers. This example shows a simple fee structure.'
          }
        ],
        hints: [
          'Always verify the sender PIN before processing transfers',
          'Check recipient exists before starting the transfer',
          'Transfer fees are usually deducted from sender account',
          'Consider what happens if the transfer fails halfway through'
        ],
        checkpoints: [
          'Users can send money to valid recipients',
          'Transfer fees are calculated and applied',
          'Insufficient balance is handled gracefully',
          'Both sender and recipient balances update correctly'
        ]
      }
    ]
  },
  '2': {
    id: '2',
    title: 'African Language Translator',
    description: 'Create a translation system for major African languages (Swahili, Hausa, Yoruba, Amharic).',
    difficulty: 'Intermediate',
    totalSteps: 6,
    estimatedTime: '2-3 weeks',
    prerequisites: [
      'Understanding of dictionaries and data structures',
      'Basic file handling operations',
      'Knowledge of functions and classes',
      'Understanding of string manipulation'
    ],
    learningGoals: [
      'Learn API integration and web services',
      'Understand natural language processing basics', 
      'Practice data parsing and manipulation',
      'Develop cultural awareness in technology'
    ],
    steps: [
      {
        id: 1,
        title: 'Language Database Setup',
        description: 'Create a comprehensive dictionary system for African languages with common phrases and words.',
        estimatedTime: '4-5 hours',
        instructions: [
          'Design data structure for multi-language dictionary',
          'Create translation pairs for common phrases',
          'Implement language code system (sw for Swahili, ha for Hausa, etc.)',
          'Add cultural context notes for translations',
          'Create basic search functionality'
        ],
        examples: [
          {
            title: 'Language Dictionary Structure',
            language: 'python',
            code: `# Example dictionary structure for African languages
AFRICAN_LANGUAGES = {
    'swahili': {
        'code': 'sw',
        'name': 'Kiswahili',
        'phrases': {
            'hello': {
                'translation': 'Hujambo',
                'pronunciation': 'hoo-jam-boh',
                'context': 'Formal greeting, used any time of day'
            },
            'thank_you': {
                'translation': 'Asante',
                'pronunciation': 'ah-san-teh',
                'context': 'General expression of gratitude'
            }
        }
    },
    'yoruba': {
        'code': 'yo',
        'name': 'Yorùbá', 
        'phrases': {
            'hello': {
                'translation': 'Báwo',
                'pronunciation': 'bah-woh',
                'context': 'Casual greeting meaning how are you'
            }
        }
    }
}`,
            explanation: 'This structure stores translations with cultural context and pronunciation guides.'
          }
        ],
        hints: [
          'Include pronunciation guides for non-native speakers',
          'Add cultural context to help users understand when to use phrases',
          'Consider regional variations within languages',
          'Start with most common phrases and greetings'
        ],
        checkpoints: [
          'Language dictionary structure is implemented',
          'Basic phrases are added for multiple languages',
          'Search functionality works for translations',
          'Cultural context is included with translations'
        ]
      }
    ]
  }
};

const WEB_PROJECTS: { [key: string]: ProjectGuide } = {
  '1': {
    id: '1',
    title: 'Interactive Landing Page',
    description: 'Build a modern, responsive landing page with animations and interactive elements.',
    difficulty: 'Beginner',
    totalSteps: 6,
    estimatedTime: '1-2 weeks',
    prerequisites: [
      'Basic HTML structure knowledge',
      'CSS fundamentals and selectors',
      'Understanding of responsive design',
      'Basic JavaScript concepts'
    ],
    learningGoals: [
      'Master modern HTML5 semantic elements',
      'Learn CSS Grid and Flexbox layouts',
      'Implement smooth animations and transitions',
      'Create interactive user experiences',
      'Practice responsive design principles'
    ],
    steps: [
      {
        id: 1,
        title: 'HTML Structure & Semantic Elements',
        description: 'Create the foundation with proper HTML5 semantic structure for accessibility and SEO.',
        estimatedTime: '2-3 hours',
        instructions: [
          'Set up the basic HTML5 document structure',
          'Create semantic sections: header, nav, main, sections, footer',
          'Add proper heading hierarchy (h1-h6)',
          'Include meta tags for responsiveness and SEO',
          'Structure content with meaningful element choices'
        ],
        examples: [
          {
            title: 'Semantic HTML Structure',
            language: 'html',
            code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Modern landing page for your business">
    <title>Your Amazing Product - Landing Page</title>
</head>
<body>
    <header class="site-header">
        <nav class="main-navigation">
            <!-- Navigation will go here -->
        </nav>
    </header>
    
    <main class="main-content">
        <section class="hero-section">
            <!-- Hero content -->
        </section>
        
        <section class="features-section">
            <!-- Features content -->
        </section>
    </main>
    
    <footer class="site-footer">
        <!-- Footer content -->
    </footer>
</body>
</html>`,
            explanation: 'This structure uses semantic HTML5 elements that help screen readers and search engines understand your content.'
          }
        ],
        hints: [
          'Use semantic elements like <header>, <nav>, <main>, <section> instead of generic <div>',
          'Each page should have exactly one <h1> element',
          'Alt text for images is crucial for accessibility',
          'The viewport meta tag is essential for mobile responsiveness'
        ],
        checkpoints: [
          'Valid HTML5 document structure',
          'Proper semantic elements used throughout',
          'Heading hierarchy is logical and accessible',
          'Meta tags are properly configured'
        ]
      }
    ]
  }
};

interface StepByStepProjectGuideProps {
  projectId: string;
  language: string;
}

export default function StepByStepProjectGuide({ projectId, language }: StepByStepProjectGuideProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  // Get the appropriate project guide based on language and projectId
  const getProjectGuide = (): ProjectGuide | null => {
    if (language === 'python') {
      return PYTHON_PROJECTS[projectId] || null;
    } else {
      return WEB_PROJECTS[projectId] || null;
    }
  };

  const projectGuide = getProjectGuide();

  if (!projectGuide) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Project Not Found</h3>
          <p className="text-muted-foreground">
            The requested project guide is not available yet.
          </p>
        </div>
      </div>
    );
  }

  const currentStepData = projectGuide.steps.find(step => step.id === currentStep);
  const progress = (currentStep / projectGuide.totalSteps) * 100;

  const nextStep = () => {
    if (currentStep < projectGuide.totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const markStepComplete = () => {
    setCompletedSteps(prev => new Set([...prev, currentStep]));
  };

  const isStepCompleted = (stepId: number) => {
    return completedSteps.has(stepId);
  };

  if (!currentStepData) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Step Not Found</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Project Header */}
      <div className="border-b bg-card/50 p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold">{projectGuide.title}</h2>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary">{projectGuide.difficulty}</Badge>
              <Badge variant="outline">{projectGuide.estimatedTime}</Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Step {currentStep} of {projectGuide.totalSteps}</div>
            <Progress value={progress} className="w-32 mt-1" />
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground">{projectGuide.description}</p>
      </div>

      {/* Step Content */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {/* Current Step Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                {currentStep}
              </div>
              <h3 className="text-lg font-semibold">{currentStepData.title}</h3>
              {isStepCompleted(currentStep) && (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
            </div>
            <p className="text-muted-foreground mb-2">{currentStepData.description}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {currentStepData.estimatedTime}
              </div>
            </div>
          </div>

          {/* Step Content Tabs */}
          <Tabs defaultValue="instructions" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="instructions" className="flex items-center gap-1">
                <Target className="h-4 w-4" />
                Instructions
              </TabsTrigger>
              <TabsTrigger value="examples" className="flex items-center gap-1">
                <Code className="h-4 w-4" />
                Examples
              </TabsTrigger>
              <TabsTrigger value="hints" className="flex items-center gap-1">
                <Lightbulb className="h-4 w-4" />
                Hints
              </TabsTrigger>
              <TabsTrigger value="checkpoints" className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                Checkpoints
              </TabsTrigger>
            </TabsList>

            <TabsContent value="instructions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Step Instructions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {currentStepData.instructions.map((instruction, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-semibold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <span className="text-sm">{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="examples" className="space-y-4">
              {currentStepData.examples.map((example, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <FileCode className="h-5 w-5" />
                      {example.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                      <pre className="whitespace-pre-wrap">{example.code}</pre>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        <strong>Explanation:</strong> {example.explanation}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="hints" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Helpful Hints
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {currentStepData.hints.map((hint, index) => (
                      <li key={index} className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                        <Zap className="h-4 w-4 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-yellow-800 dark:text-yellow-200">{hint}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="checkpoints" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Success Checkpoints
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {currentStepData.checkpoints.map((checkpoint, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                        <div className="w-5 h-5 border-2 border-green-300 rounded flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{checkpoint}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <p className="text-sm text-green-800 dark:text-green-200">
                      <strong>Complete all checkpoints</strong> before moving to the next step to ensure you understand the concepts.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>

      {/* Navigation Footer */}
      <div className="border-t bg-card/50 p-4">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous Step
          </Button>

          <div className="flex items-center gap-2">
            {!isStepCompleted(currentStep) && (
              <Button
                variant="outline"
                onClick={markStepComplete}
                className="flex items-center gap-2"
              >
                <CheckCircle className="h-4 w-4" />
                Mark Complete
              </Button>
            )}

            <Button
              onClick={nextStep}
              disabled={currentStep === projectGuide.totalSteps}
              className="flex items-center gap-2"
            >
              {currentStep === projectGuide.totalSteps ? (
                <>
                  <Trophy className="h-4 w-4" />
                  Finish Project
                </>
              ) : (
                <>
                  Next Step
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}