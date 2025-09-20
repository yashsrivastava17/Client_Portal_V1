import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { Send, Bot, User, FileText, Sparkles, TrendingUp, Lightbulb } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  insights?: {
    type: "suggestion" | "analysis" | "action";
    title: string;
    description: string;
  }[];
}

interface DocumentChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentTitle: string;
  documentContent?: string;
}

const mockInsights = [
  {
    type: "suggestion" as const,
    title: "Performance Optimization",
    description: "Consider implementing lazy loading for improved page speed"
  },
  {
    type: "analysis" as const, 
    title: "User Behavior Pattern",
    description: "85% of users drop off at the pricing section - review CTA placement"
  },
  {
    type: "action" as const,
    title: "Immediate Action Required",
    description: "Update brand guidelines to reflect new color scheme by Dec 30"
  }
];

const mockConversation: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hi! I've analyzed the Q4 Brand Strategy document. I can help you understand key insights, answer questions, and suggest actionable next steps. What would you like to know?",
    timestamp: new Date(),
    insights: mockInsights
  }
];

export function DocumentChatModal({ isOpen, onClose, documentTitle, documentContent }: DocumentChatModalProps) {
  const [messages, setMessages] = useState<Message[]>(mockConversation);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant", 
        content: getAIResponse(inputValue),
        timestamp: new Date(),
        insights: Math.random() > 0.5 ? [mockInsights[Math.floor(Math.random() * mockInsights.length)]] : undefined
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const getAIResponse = (userInput: string): string => {
    const responses = [
      "Based on the document analysis, I found several key points related to your question. The brand strategy emphasizes user-centric design and conversion optimization.",
      "Looking at the data in this document, I can see that user engagement metrics show a 23% increase when implementing the proposed changes.",
      "The document highlights three critical areas for improvement: visual hierarchy, content clarity, and call-to-action placement. Would you like me to elaborate on any of these?",
      "According to the research findings in this document, 67% of users prefer the new design direction. I recommend prioritizing the mobile experience optimization.",
      "The strategy document suggests implementing A/B testing for the new features. This aligns with industry best practices for conversion rate optimization."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "suggestion": return <Lightbulb className="h-4 w-4" />;
      case "analysis": return <TrendingUp className="h-4 w-4" />;
      case "action": return <Sparkles className="h-4 w-4" />;
      default: return <Bot className="h-4 w-4" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case "suggestion": return "bg-blue-100 text-blue-700 border-blue-200";
      case "analysis": return "bg-purple-100 text-purple-700 border-purple-200";
      case "action": return "bg-orange-100 text-orange-700 border-orange-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-[#8b3123]" />
            <span>Chat with Document: {documentTitle}</span>
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
              AI-Powered
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col gap-4">
          {/* Chat Messages */}
          <ScrollArea ref={scrollAreaRef} className="flex-1 pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-[#8b3123] flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  
                  <div className={`max-w-[70%] ${message.role === "user" ? "order-1" : ""}`}>
                    <div
                      className={`rounded-[12px] p-4 ${
                        message.role === "user"
                          ? "bg-[#8b3123] text-white"
                          : "bg-white border border-gray-200"
                      }`}
                    >
                      <p className="text-[14px] leading-relaxed">{message.content}</p>
                    </div>
                    
                    {/* AI Insights */}
                    {message.insights && (
                      <div className="mt-3 space-y-2">
                        {message.insights.map((insight, index) => (
                          <div
                            key={index}
                            className={`rounded-[8px] p-3 border ${getInsightColor(insight.type)}`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              {getInsightIcon(insight.type)}
                              <span className="text-[12px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
                                {insight.title}
                              </span>
                            </div>
                            <p className="text-[11px] opacity-80">{insight.description}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="text-[11px] opacity-60 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                  
                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-[#8b3123] flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-[12px] p-4">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Chat Input */}
          <div className="flex gap-3 items-center">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask questions about this document..."
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="bg-[#8b3123] hover:bg-[#7a2e20] text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {/* Quick Questions */}
          <div className="flex gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputValue("What are the key action items from this document?")}
              className="text-[12px]"
            >
              Key Action Items
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputValue("Summarize the main findings and recommendations")}
              className="text-[12px]"
            >
              Main Findings
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputValue("What metrics should we track for success?")}
              className="text-[12px]"
            >
              Success Metrics
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}