import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Send, Bot, User, FileText, Sparkles, TrendingUp, Lightbulb, MessageSquare, X, Maximize2, Minimize2 } from "lucide-react";

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

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  readTime: string;
  category: "Performance" | "Analytics" | "UX" | "Growth";
  date: string;
  author: string;
}

interface DocumentReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  blog: BlogPost | null;
}

const mockInsights = [
  {
    type: "suggestion" as const,
    title: "Implementation Tip",
    description: "Consider implementing this strategy gradually over 2-3 weeks for best results"
  },
  {
    type: "analysis" as const, 
    title: "Key Metric Impact",
    description: "This approach typically improves conversion rates by 15-25% within the first month"
  },
  {
    type: "action" as const,
    title: "Next Steps",
    description: "Set up A/B testing framework to measure the impact of these changes"
  }
];

const mockBlogContent = `
# Understanding User Behavior Through Heat Maps

Heat maps are powerful visualization tools that reveal how users interact with your website. By tracking mouse movements, clicks, and scroll patterns, heat maps provide invaluable insights into user behavior that traditional analytics can't capture.

## What Are Heat Maps?

Heat maps use color-coding to show where users focus their attention on a webpage. Red areas indicate high activity, while blue areas show low engagement. This visual representation helps you understand:

- Where users click most frequently
- How far down the page users scroll
- Which elements capture attention
- Where users encounter difficulties

## Types of Heat Maps

### 1. Click Heat Maps
Click heat maps show where users click on your page. They reveal:
- Which buttons and links are most popular
- Areas where users expect functionality but find none
- Dead zones where no interactions occur

### 2. Scroll Heat Maps
Scroll heat maps indicate how far users scroll down your pages:
- The percentage of users who reach different page sections
- Where users typically stop scrolling
- Content that may be positioned too low

### 3. Move Heat Maps
These track mouse movement patterns:
- Areas where users hover before clicking
- Scanning patterns across the page
- Hesitation points in the user journey

## Implementing Heat Map Analysis

To get started with heat map analysis:

1. **Choose the Right Tool**: Popular options include Hotjar, Crazy Egg, and FullStory
2. **Set Clear Goals**: Define what you want to learn from the data
3. **Select Key Pages**: Focus on high-traffic or conversion-critical pages
4. **Collect Sufficient Data**: Aim for at least 100-200 sessions for reliable insights

## Interpreting Heat Map Data

When analyzing heat maps, look for:

- **Unexpected Click Patterns**: Users clicking on non-interactive elements
- **Low Engagement Zones**: Important content that's being ignored
- **Scroll Drop-off Points**: Where users stop engaging with content
- **Mobile vs Desktop Differences**: Varying behavior across devices

## Case Study: E-commerce Homepage Optimization

A recent analysis of an e-commerce homepage revealed:
- 40% of users were clicking on non-clickable product images
- Only 15% of users scrolled to see featured categories
- The search bar was receiving minimal attention

**Solutions implemented:**
- Made product images clickable
- Moved featured categories above the fold
- Redesigned the search bar with better visual prominence

**Results:**
- 23% increase in product page views
- 18% improvement in category exploration
- 31% increase in search usage

## Best Practices

### Data Collection
- Run heat maps for at least one full business cycle
- Test both weekdays and weekends
- Consider seasonal variations in user behavior

### Analysis Approach
- Combine heat maps with traditional analytics
- Segment data by traffic source and device type
- Look for patterns across multiple pages

### Action Planning
- Prioritize changes based on potential impact
- Test modifications through A/B testing
- Monitor results after implementing changes

## Advanced Heat Map Techniques

### Segmentation
Break down heat map data by:
- New vs returning visitors
- Traffic sources (organic, paid, social)
- Geographic location
- Device type and screen size

### Integration with Other Data
Combine heat maps with:
- User session recordings
- Conversion funnel analysis
- Customer feedback surveys
- Page performance metrics

## Common Pitfalls to Avoid

1. **Small Sample Sizes**: Don't draw conclusions from limited data
2. **Ignoring Context**: Consider page purpose and user intent
3. **One-Size-Fits-All**: Different pages require different analysis approaches
4. **Analysis Paralysis**: Focus on actionable insights rather than perfect data

## Measuring Success

Track these metrics to evaluate heat map insights:
- Conversion rate improvements
- Time on page increases
- Reduced bounce rates
- Enhanced user engagement metrics

## Conclusion

Heat maps provide a window into the user experience that traditional metrics cannot offer. By understanding how users actually interact with your website, you can make data-driven decisions that improve usability, increase conversions, and create better user experiences.

Remember that heat maps are just one tool in your optimization toolkit. Combine them with user testing, analytics data, and customer feedback for a comprehensive understanding of your users' needs and behaviors.

The key to successful heat map analysis is consistent monitoring, thoughtful interpretation, and systematic testing of improvements. Start with your most important pages and gradually expand your analysis to build a complete picture of user behavior across your entire website.
`;

export function DocumentReaderModal({ isOpen, onClose, blog }: DocumentReaderModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const docScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && blog) {
      // Initialize with welcome message
      const welcomeMessage: Message = {
        id: "1",
        role: "assistant",
        content: `Hi! I'm here to help you understand "${blog.title}". I can answer questions about the content, provide additional insights, or suggest how to apply these concepts to your specific situation. What would you like to know?`,
        timestamp: new Date(),
        insights: [mockInsights[0]]
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, blog]);

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
      "Based on the article content, I can see this relates to user behavior patterns. Heat maps are particularly effective for understanding user interaction hotspots and can reveal insights that traditional analytics miss.",
      "That's a great question about implementation. The article suggests starting with high-traffic pages and collecting at least 100-200 sessions for reliable data. I'd recommend focusing on your conversion pages first.",
      "According to the content, this technique typically shows a 15-25% improvement in conversion rates. The key is combining heat map data with A/B testing to validate your changes.",
      "The article emphasizes the importance of segmentation - looking at new vs returning visitors, different traffic sources, and device types. This helps you understand different user behaviors.",
      "From the case study mentioned in the article, making product images clickable and moving important content above the fold led to significant engagement improvements. Would you like me to elaborate on any specific aspect?"
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

  if (!blog) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-[#8b3123]" />
              <span>{blog.title}</span>
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                {blog.category}
              </Badge>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsChatExpanded(!isChatExpanded)}
              className="text-[#8b3123]"
            >
              {isChatExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex overflow-hidden">
          {/* Document Content - Left Side */}
          <div className={`${isChatExpanded ? 'w-1/3' : 'w-2/3'} border-r transition-all duration-300`}>
            <ScrollArea ref={docScrollRef} className="h-full">
              <div className="p-8">
                {/* Article Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                      {blog.category}
                    </Badge>
                    <span className="text-[#8b3123] text-sm opacity-60">{blog.readTime}</span>
                    <span className="text-[#8b3123] text-sm opacity-60">•</span>
                    <span className="text-[#8b3123] text-sm opacity-60">{blog.date}</span>
                  </div>
                  
                  <h1 className="text-[#8b3123] text-[32px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-4 leading-tight">
                    {blog.title}
                  </h1>
                  
                  <p className="text-[#8b3123] text-lg opacity-75 leading-relaxed mb-6">
                    {blog.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-2 text-[#8b3123] text-sm opacity-60">
                    <User className="h-4 w-4" />
                    <span>By {blog.author || "Crenoir Team"}</span>
                  </div>
                </div>

                <Separator className="mb-8" />

                {/* Article Content */}
                <div className="prose prose-lg max-w-none">
                  <div 
                    className="text-[#8b3123] leading-relaxed"
                    style={{ 
                      fontSize: '16px',
                      lineHeight: '1.7'
                    }}
                    dangerouslySetInnerHTML={{
                      __html: mockBlogContent.split('\n').map(paragraph => {
                        if (paragraph.startsWith('# ')) {
                          return `<h1 style="font-size: 28px; font-weight: bold; margin: 2rem 0 1rem 0; color: #8b3123;">${paragraph.slice(2)}</h1>`;
                        }
                        if (paragraph.startsWith('## ')) {
                          return `<h2 style="font-size: 24px; font-weight: bold; margin: 1.5rem 0 1rem 0; color: #8b3123;">${paragraph.slice(3)}</h2>`;
                        }
                        if (paragraph.startsWith('### ')) {
                          return `<h3 style="font-size: 20px; font-weight: bold; margin: 1rem 0 0.5rem 0; color: #8b3123;">${paragraph.slice(4)}</h3>`;
                        }
                        if (paragraph.startsWith('- ')) {
                          return `<li style="margin: 0.5rem 0;">${paragraph.slice(2)}</li>`;
                        }
                        if (paragraph.startsWith('1. ') || paragraph.match(/^\d+\. /)) {
                          return `<li style="margin: 0.5rem 0;">${paragraph.replace(/^\d+\. /, '')}</li>`;
                        }
                        if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                          return `<p style="font-weight: bold; margin: 1rem 0; color: #8b3123;">${paragraph.slice(2, -2)}</p>`;
                        }
                        if (paragraph.trim() === '') {
                          return '<br>';
                        }
                        return `<p style="margin: 1rem 0;">${paragraph}</p>`;
                      }).join('')
                    }}
                  />
                </div>
              </div>
            </ScrollArea>
          </div>

          {/* Chat Section - Right Side */}
          <div className={`${isChatExpanded ? 'w-2/3' : 'w-1/3'} flex flex-col transition-all duration-300`}>
            {/* Chat Header */}
            <div className="p-4 border-b bg-gray-50">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-[#8b3123]" />
                <h3 className="text-[#8b3123] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
                  AI Assistant
                </h3>
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 text-xs">
                  Online
                </Badge>
              </div>
            </div>

            {/* Chat Messages */}
            <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-[#8b3123] flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    )}
                    
                    <div className={`max-w-[80%] ${message.role === "user" ? "order-1" : ""}`}>
                      <div
                        className={`rounded-[12px] p-3 ${
                          message.role === "user"
                            ? "bg-[#8b3123] text-white"
                            : "bg-white border border-gray-200"
                        }`}
                      >
                        <p className="text-[13px] leading-relaxed">{message.content}</p>
                      </div>
                      
                      {/* AI Insights */}
                      {message.insights && (
                        <div className="mt-2 space-y-2">
                          {message.insights.map((insight, index) => (
                            <div
                              key={index}
                              className={`rounded-[8px] p-2 border text-xs ${getInsightColor(insight.type)}`}
                            >
                              <div className="flex items-center gap-1 mb-1">
                                {getInsightIcon(insight.type)}
                                <span className="font-['Montserrat_Alternates:SemiBold',_sans-serif]">
                                  {insight.title}
                                </span>
                              </div>
                              <p className="opacity-80 text-xs">{insight.description}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="text-xs opacity-60 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                    
                    {message.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
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
                    <div className="bg-white border border-gray-200 rounded-[12px] p-3">
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
            <div className="p-4 border-t bg-gray-50">
              <div className="flex gap-2 items-center mb-3">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about the article content..."
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 text-sm"
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  size="sm"
                  className="bg-[#8b3123] hover:bg-[#7a2e20] text-white"
                >
                  <Send className="h-3 w-3" />
                </Button>
              </div>

              {/* Quick Questions */}
              <div className="flex gap-1 flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInputValue("How can I implement this in my project?")}
                  className="text-xs h-7 px-2"
                >
                  Implementation
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInputValue("What are the key takeaways?")}
                  className="text-xs h-7 px-2"
                >
                  Key Points
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInputValue("Show me the example results")}
                  className="text-xs h-7 px-2"
                >
                  Examples
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}