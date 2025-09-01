import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Bot, 
  User, 
  Send, 
  Code, 
  Lightbulb, 
  BookOpen, 
  Zap,
  MessageSquare,
  Sparkles,
  Brain,
  Target
} from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  category?: 'explanation' | 'hint' | 'error' | 'general' | 'code-review';
}

interface AILearningAssistantProps {
  currentCode?: string;
  currentLesson?: string;
  onCodeSuggestion?: (code: string) => void;
}

export default function AILearningAssistant({ 
  currentCode, 
  currentLesson, 
  onCodeSuggestion 
}: AILearningAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "🐍 **Welcome to your AI Python Tutor!** \n\nI'm here to help you master Python programming. I can:\n\n• **Explain concepts** - Break down complex topics into simple terms\n• **Debug your code** - Find and fix errors together\n• **Provide hints** - Guide you without giving away answers\n• **Review your code** - Suggest improvements and best practices\n• **Answer questions** - No question is too basic or too advanced!\n\nWhat would you like to explore today?",
      timestamp: new Date(),
      category: 'general'
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    { label: "Explain this code", icon: Code, action: "explain-code", color: "bg-blue-500/10 text-blue-700" },
    { label: "Give me a hint", icon: Lightbulb, action: "hint", color: "bg-yellow-500/10 text-yellow-700" },
    { label: "Debug my code", icon: Zap, action: "debug", color: "bg-red-500/10 text-red-700" },
    { label: "Best practices", icon: Target, action: "best-practices", color: "bg-green-500/10 text-green-700" },
    { label: "What's next?", icon: BookOpen, action: "next-steps", color: "bg-purple-500/10 text-purple-700" },
    { label: "Code review", icon: Brain, action: "code-review", color: "bg-indigo-500/10 text-indigo-700" },
  ];

  const generateAIResponse = (userMessage: string, action?: string): string => {
    const codeSnippet = currentCode ? currentCode.slice(0, 300) : '';
    
    const responses = {
      "explain-code": [
        `Let me analyze your current code:\n\n\`\`\`python\n${codeSnippet}${codeSnippet.length >= 300 ? '...' : ''}\n\`\`\`\n\n**Key Concepts:**\n• **Variables** - Store data for later use\n• **Functions** - Reusable blocks of code\n• **Control Flow** - How your program makes decisions\n\nEach line serves a specific purpose. Would you like me to explain any particular part in more detail?`,
        `Great code to analyze! Here's what's happening:\n\n**Structure Analysis:**\n1. **Data handling** - How information flows\n2. **Logic patterns** - The reasoning behind each operation\n3. **Python idioms** - Following Python's best practices\n\nThe beauty of Python is its readability - your code tells a clear story!`,
      ],
      "hint": [
        `💡 **Smart Hint for ${currentLesson || 'your current challenge'}:**\n\nInstead of giving you the answer, let me guide your thinking:\n\n🔍 **Ask yourself:**\n• What is the expected output?\n• What tools (functions, operators) do I need?\n• Can I break this into smaller steps?\n\n🎯 **Try this approach:**\nStart with the simplest version that works, then improve it step by step.`,
        `💡 **Thinking like a programmer:**\n\n**Step 1:** Understand the problem clearly\n**Step 2:** Plan your approach (pseudocode)\n**Step 3:** Code one piece at a time\n**Step 4:** Test and refine\n\nRemember: Every expert was once a beginner. You're doing great! 🌟`,
        `💡 **Debugging strategy:**\n\n1. **Read the error message** carefully - Python is quite helpful!\n2. **Check line numbers** - errors often point to the exact location\n3. **Print values** to see what's happening: \`print(f"Debug: {variable}")\`\n4. **Check indentation** - Python is strict about spacing\n\nWhat specific part is giving you trouble?`,
      ],
      "debug": [
        `🔍 **Let's debug together!**\n\nCommon Python issues I see:\n\n**Syntax Errors:**\n• Missing colons : after if/for/while/def\n• Incorrect indentation (use 4 spaces)\n• Mismatched parentheses or quotes\n\n**Logic Errors:**\n• Variable scope issues\n• Wrong comparison operators (= vs ==)\n• Off-by-one errors in loops\n\n**Runtime Errors:**\n• Undefined variables\n• Type mismatches (string + integer)\n\nShare your error message and I'll help you fix it! 🛠️`,
        `🐛 **Debugging is a superpower!**\n\nHere's my systematic approach:\n\n1. **Read the traceback** from bottom to top\n2. **Isolate the problem** - comment out code sections\n3. **Add print statements** to track variable values\n4. **Test with simple inputs** first\n\nRemember: Every bug is a learning opportunity! What error are you seeing?`,
      ],
      "best-practices": [
        `⭐ **Python Best Practices:**\n\n**Code Style:**\n• Use \`snake_case\` for variables and functions\n• Write descriptive names: \`user_age\` not \`a\`\n• Keep functions short and focused\n• Add comments for complex logic\n\n**Performance:**\n• Use list comprehensions when appropriate\n• Don't repeat yourself (DRY principle)\n• Choose the right data structure\n\n**Pythonic Code:**\n• Use \`if __name__ == "__main__":\` for scripts\n• Handle exceptions gracefully\n• Use f-strings for formatting: \`f"Hello {name}"\`\n\nYour code is already following many of these! 🎉`,
        `🏆 **Level up your Python skills:**\n\n**Readability First:**\n• Code is read more than it's written\n• Use meaningful variable names\n• Add docstrings to functions\n\n**Error Handling:**\n• Use try/except for risky operations\n• Fail gracefully with helpful messages\n\n**Testing:**\n• Test edge cases (empty input, zero, negative numbers)\n• Write small functions that are easy to test\n\nWhat aspect would you like to improve most?`,
      ],
      "next-steps": [
        `🚀 **Your Python Learning Journey:**\n\nBased on your progress, here's what I recommend:\n\n**Immediate Next Steps:**\n• Master the fundamentals you're working on\n• Practice with variations of current exercises\n• Start thinking about real-world applications\n\n**Coming Up:**\n• Functions and code organization\n• Working with data (lists, dictionaries)\n• File operations and data persistence\n• Building actual projects!\n\n**Pro Tip:** The best way to learn is by building things you care about. What interests you most?`,
        `📈 **Skill Development Path:**\n\n**Foundation Level:** Variables, loops, conditionals ✅\n**Intermediate:** Functions, data structures, file I/O\n**Advanced:** Object-oriented programming, APIs, databases\n**Expert:** Frameworks, testing, deployment\n\n**Project Ideas for Your Level:**\n• Simple calculator\n• Text-based games\n• Data analysis scripts\n• Web scrapers\n\nWhich direction excites you most? 🎯`,
      ],
      "code-review": [
        `🔍 **Code Review Time!**\n\nLet me analyze your code:\n\n**Strengths:**\n• Good variable naming\n• Clear logic flow\n• Proper indentation\n\n**Suggestions for improvement:**\n• Consider adding error handling\n• Think about edge cases\n• Could any parts be simplified?\n\n**Performance notes:**\n• Algorithm efficiency looks good\n• Memory usage is reasonable\n\n**Overall:** You're writing solid Python code! The structure is clean and the logic is sound. Keep up the excellent work! 🌟`,
        `👨‍💻 **Professional Code Review:**\n\n**Code Quality: A-**\n\n**What's working well:**\n• Follows Python conventions\n• Readable and maintainable\n• Good problem-solving approach\n\n**Growth opportunities:**\n• Add type hints for better documentation\n• Consider function decomposition\n• Think about reusability\n\n**Security & Reliability:**\n• Input validation could be enhanced\n• Error scenarios are handled well\n\nYou're developing excellent coding habits! 🏆`,
      ],
      "general": [
        `That's a fantastic question! Python's philosophy is "readability counts" - it's designed to be intuitive and expressive.\n\n**Fun Python Facts:**\n• Named after Monty Python's Flying Circus 🐍\n• Used by NASA, Netflix, Instagram, and more\n• Great for beginners AND experts\n• Huge community and library ecosystem\n\nWhat specific aspect of Python interests you most?`,
        `I love your curiosity! Python is an incredible language that opens doors to:\n\n🌐 **Web Development** (Django, Flask)\n📊 **Data Science** (pandas, numpy)\n🤖 **AI/Machine Learning** (TensorFlow, PyTorch)\n🎮 **Game Development** (Pygame)\n⚙️ **Automation** (scripting, testing)\n\nThe skills you're building now will serve you in any of these areas. What draws your interest?`,
      ]
    };

    const category = action as keyof typeof responses || 'general';
    const categoryResponses = responses[category] || responses.general;
    return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
  };

  const handleSend = async (message?: string, action?: string) => {
    const messageText = message || input.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking time with realistic delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateAIResponse(messageText, action),
        timestamp: new Date(),
        category: (action as any) || 'general',
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800); // 1.2-2 seconds
  };

  const handleQuickAction = (action: string, label: string) => {
    handleSend(label, action);
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'explanation': return <Code className="h-3 w-3" />;
      case 'hint': return <Lightbulb className="h-3 w-3" />;
      case 'error': return <Zap className="h-3 w-3" />;
      case 'code-review': return <Brain className="h-3 w-3" />;
      case 'best-practices': return <Target className="h-3 w-3" />;
      default: return <MessageSquare className="h-3 w-3" />;
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'explanation': return 'bg-blue-500/10 text-blue-700';
      case 'hint': return 'bg-yellow-500/10 text-yellow-700';
      case 'error': return 'bg-red-500/10 text-red-700';
      case 'code-review': return 'bg-indigo-500/10 text-indigo-700';
      case 'best-practices': return 'bg-green-500/10 text-green-700';
      default: return 'bg-primary/10 text-primary';
    }
  };

  return (
    <Card className="h-full flex flex-col border-border/50 bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="relative">
            <Bot className="h-5 w-5 text-primary" />
            <Sparkles className="h-3 w-3 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
          </div>
          AI Python Tutor
          <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
            Smart • Adaptive • Helpful
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-4">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map((action) => (
            <Button
              key={action.action}
              variant="outline"
              size="sm"
              className={`h-auto p-2 text-xs justify-start hover:scale-105 transition-all ${action.color} border-border/50`}
              onClick={() => handleQuickAction(action.action, action.label)}
            >
              <action.icon className="h-3 w-3 mr-2" />
              {action.label}
            </Button>
          ))}
        </div>

        <Separator className="bg-border/50" />

        {/* Messages */}
        <ScrollArea className="flex-1 pr-3">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.type === 'assistant' && (
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center ring-2 ring-primary/20">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                )}
                
                <div className={`max-w-[85%] ${message.type === 'user' ? 'order-2' : ''}`}>
                  <div
                    className={`rounded-lg p-3 text-sm shadow-sm ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground ml-auto'
                        : 'bg-muted/80 backdrop-blur-sm border border-border/50'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-muted-foreground">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                    {message.type === 'assistant' && message.category && (
                      <Badge variant="secondary" className={`text-xs ${getCategoryColor(message.category)} border-border/30`}>
                        {getCategoryIcon(message.category)}
                        <span className="ml-1 capitalize">{message.category.replace('-', ' ')}</span>
                      </Badge>
                    )}
                  </div>
                </div>

                {message.type === 'user' && (
                  <div className="flex-shrink-0 order-1">
                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center ring-2 ring-secondary/20">
                      <User className="h-4 w-4 text-secondary" />
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center ring-2 ring-primary/20">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <div className="bg-muted/80 backdrop-blur-sm border border-border/50 rounded-lg p-3">
                  <div className="flex space-x-1 items-center">
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <span className="text-xs text-muted-foreground ml-2">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </ScrollArea>

        {/* Input */}
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about Python... 🐍"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-input/50 border-border/50 focus:ring-primary/50"
          />
          <Button 
            onClick={() => handleSend()} 
            disabled={!input.trim() || isTyping}
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}