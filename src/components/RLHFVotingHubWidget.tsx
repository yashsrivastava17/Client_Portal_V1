import { useState } from "react";
import { CollapsibleSection } from "./CollapsibleSection";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ThumbsUp, ThumbsDown, Star, Video, FileText, Target, Users, MessageSquare, TrendingUp } from "lucide-react";

interface RLHFItem {
  id: string;
  title: string;
  type: "video" | "script" | "campaign";
  description: string;
  stage: "idea" | "script" | "body-mirroring" | "production" | "review";
  thumbnail?: string;
  currentRating: number;
  totalVotes: number;
  userVote?: {
    rating: number;
    feedback?: string;
  };
  recentFeedback: string[];
  priority: "low" | "medium" | "high";
  dueDate?: string;
}

const mockRLHFItems: RLHFItem[] = [
  {
    id: "1",
    title: "Holiday Campaign Hero Video",
    type: "video",
    description: "Main promotional video for the holiday campaign featuring product showcase and brand messaging.",
    stage: "review",
    currentRating: 4.2,
    totalVotes: 15,
    recentFeedback: [
      "Great visual composition, maybe adjust the pacing",
      "Love the brand messaging, very clear",
      "Color grading could be warmer for holiday feel"
    ],
    priority: "high",
    dueDate: "2024-01-20"
  },
  {
    id: "2",
    title: "Product Demo Script v3",
    type: "script",
    description: "Updated script for product demonstration video incorporating user feedback from previous versions.",
    stage: "script",
    currentRating: 3.8,
    totalVotes: 12,
    userVote: {
      rating: 4,
      feedback: "Much better flow than v2"
    },
    recentFeedback: [
      "Clearer value proposition now",
      "Could use more technical details",
      "Good storytelling structure"
    ],
    priority: "medium",
    dueDate: "2024-01-18"
  },
  {
    id: "3",
    title: "Q1 Brand Awareness Campaign",
    type: "campaign",
    description: "Comprehensive campaign strategy for Q1 brand awareness including multi-platform content plan.",
    stage: "idea",
    currentRating: 4.5,
    totalVotes: 8,
    recentFeedback: [
      "Innovative approach to reaching new audiences",
      "Budget allocation looks reasonable",
      "Timeline might be too aggressive"
    ],
    priority: "high",
    dueDate: "2024-01-25"
  },
  {
    id: "4",
    title: "Customer Testimonial Video",
    type: "video",
    description: "Customer success story video featuring real user experiences and product benefits.",
    stage: "production",
    currentRating: 3.9,
    totalVotes: 10,
    recentFeedback: [
      "Authentic customer stories",
      "Audio quality needs improvement",
      "Good emotional connection"
    ],
    priority: "medium",
    dueDate: "2024-01-22"
  }
];

const typeConfig = {
  video: { icon: <Video className="h-4 w-4" />, color: "bg-blue-100 text-blue-700 border-blue-200" },
  script: { icon: <FileText className="h-4 w-4" />, color: "bg-green-100 text-green-700 border-green-200" },
  campaign: { icon: <Target className="h-4 w-4" />, color: "bg-purple-100 text-purple-700 border-purple-200" }
};

const stageConfig = {
  idea: { color: "bg-gray-100 text-gray-700 border-gray-200", label: "Idea" },
  script: { color: "bg-yellow-100 text-yellow-700 border-yellow-200", label: "Script" },
  "body-mirroring": { color: "bg-orange-100 text-orange-700 border-orange-200", label: "Body Mirroring" },
  production: { color: "bg-blue-100 text-blue-700 border-blue-200", label: "Production" },
  review: { color: "bg-purple-100 text-purple-700 border-purple-200", label: "Review" }
};

const priorityConfig = {
  low: { color: "bg-gray-100 text-gray-700 border-gray-200" },
  medium: { color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  high: { color: "bg-red-100 text-red-700 border-red-200" }
};

interface RLHFVotingHubWidgetProps {
  onOpenRLHF: (item: RLHFItem) => void;
}

export function RLHFVotingHubWidget({ onOpenRLHF }: RLHFVotingHubWidgetProps) {
  const [selectedFilter, setSelectedFilter] = useState<"all" | "video" | "script" | "campaign">("all");

  const handleQuickVote = (itemId: string, rating: number, type: "thumbs" | "star") => {
    console.log(`Quick vote: ${itemId}, rating: ${rating}, type: ${type}`);
    // In real implementation, this would update the backend
  };

  const filteredItems = selectedFilter === "all" 
    ? mockRLHFItems 
    : mockRLHFItems.filter(item => item.type === selectedFilter);

  const renderStarRating = (rating: number, itemId: string, interactive: boolean = true) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => interactive && handleQuickVote(itemId, star, "star")}
            className={`transition-colors ${interactive ? 'hover:scale-110' : 'cursor-default'}`}
            disabled={!interactive}
          >
            <Star 
              className={`h-4 w-4 ${
                star <= rating 
                  ? 'fill-yellow-400 text-yellow-400' 
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <CollapsibleSection 
      title="RLHF Voting Hub" 
      icon={<ThumbsUp className="h-5 w-5" />}
    >
      <div className="space-y-6">
        {/* Header and Filters */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-[#8b3123]" />
            <h3 className="text-[#8b3123] text-[18px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
              Vote & Provide Feedback
            </h3>
          </div>

          <div className="flex rounded-[12px] border border-[rgba(139,49,35,0.2)] overflow-hidden">
            {["all", "video", "script", "campaign"].map((filter) => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedFilter(filter as any)}
                className={`rounded-none h-8 text-xs capitalize ${
                  selectedFilter === filter 
                    ? "bg-[#8b3123] text-[#f3e1b7]" 
                    : "text-[#8b3123] hover:bg-[rgba(139,49,35,0.1)]"
                }`}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>

        {/* RLHF Items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className="rounded-[24px] p-6 border border-[rgba(139,49,35,0.1)] hover:border-[rgba(139,49,35,0.2)] transition-colors"
              style={{
                background: 'linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)), rgba(255, 255, 255, 0.4)'
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Badge className={`text-[10px] px-2 py-1 ${typeConfig[item.type].color}`}>
                    {typeConfig[item.type].icon}
                    {item.type}
                  </Badge>
                  <Badge className={`text-[10px] px-2 py-1 ${stageConfig[item.stage].color}`}>
                    {stageConfig[item.stage].label}
                  </Badge>
                  <Badge className={`text-[10px] px-2 py-1 ${priorityConfig[item.priority].color}`}>
                    {item.priority}
                  </Badge>
                </div>
                
                {item.dueDate && (
                  <div className="text-[#8b3123] text-[11px] opacity-60">
                    Due: {new Date(item.dueDate).toLocaleDateString()}
                  </div>
                )}
              </div>

              {/* Title and Description */}
              <h4 className="text-[#8b3123] text-[16px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-2">
                {item.title}
              </h4>
              <p className="text-[#8b3123] text-[13px] opacity-75 mb-4 leading-relaxed">
                {item.description}
              </p>

              {/* Current Rating */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {renderStarRating(item.currentRating, item.id, false)}
                    <span className="text-[#8b3123] text-[14px] font-['Montserrat_Alternates:SemiBold',_sans-serif] ml-2">
                      {item.currentRating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-[#8b3123] text-[12px] opacity-60">
                    ({item.totalVotes} votes)
                  </span>
                </div>
              </div>

              {/* User's Previous Vote */}
              {item.userVote && (
                <div className="mb-4 p-3 rounded-[12px] bg-[rgba(139,49,35,0.05)] border border-[rgba(139,49,35,0.1)]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[#8b3123] text-[12px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
                      Your Rating:
                    </span>
                    {renderStarRating(item.userVote.rating, item.id, false)}
                  </div>
                  {item.userVote.feedback && (
                    <p className="text-[#8b3123] text-[11px] opacity-75 italic">
                      "{item.userVote.feedback}"
                    </p>
                  )}
                </div>
              )}

              {/* Quick Actions */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleQuickVote(item.id, 1, "thumbs")}
                    className="h-8 px-3 text-[#8b3123] border-[#8b3123] hover:bg-[rgba(139,49,35,0.1)]"
                  >
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    Good
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleQuickVote(item.id, -1, "thumbs")}
                    className="h-8 px-3 text-[#8b3123] border-[#8b3123] hover:bg-[rgba(139,49,35,0.1)]"
                  >
                    <ThumbsDown className="h-3 w-3 mr-1" />
                    Needs Work
                  </Button>
                </div>
                
                <Button 
                  size="sm"
                  onClick={() => onOpenRLHF(item)}
                  className="bg-[#8b3123] hover:bg-[#7a2e20] text-[#f3e1b7] h-8 px-4"
                >
                  <MessageSquare className="h-3 w-3 mr-1" />
                  Detailed Feedback
                </Button>
              </div>

              {/* Recent Feedback Preview */}
              {item.recentFeedback.length > 0 && (
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    <MessageSquare className="h-3 w-3 text-[#8b3123] opacity-60" />
                    <span className="text-[#8b3123] text-[11px] font-['Montserrat_Alternates:SemiBold',_sans-serif] opacity-60">
                      Recent Feedback:
                    </span>
                  </div>
                  <div className="space-y-1">
                    {item.recentFeedback.slice(0, 2).map((feedback, index) => (
                      <p key={index} className="text-[#8b3123] text-[11px] opacity-60 italic pl-4 border-l-2 border-[rgba(139,49,35,0.1)]">
                        "{feedback}"
                      </p>
                    ))}
                    {item.recentFeedback.length > 2 && (
                      <button 
                        onClick={() => onOpenRLHF(item)}
                        className="text-[#8b3123] text-[11px] hover:underline pl-4"
                      >
                        +{item.recentFeedback.length - 2} more comments
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-[rgba(139,49,35,0.1)]">
          <div className="text-center p-4 rounded-[16px] bg-[rgba(139,49,35,0.05)]">
            <div className="text-[#8b3123] text-[24px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-1">
              {mockRLHFItems.length}
            </div>
            <div className="text-[#8b3123] text-[12px] opacity-60">
              Items Awaiting Feedback
            </div>
          </div>
          
          <div className="text-center p-4 rounded-[16px] bg-[rgba(139,49,35,0.05)]">
            <div className="text-[#8b3123] text-[24px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-1">
              {mockRLHFItems.reduce((sum, item) => sum + item.totalVotes, 0)}
            </div>
            <div className="text-[#8b3123] text-[12px] opacity-60">
              Total Votes This Week
            </div>
          </div>
          
          <div className="text-center p-4 rounded-[16px] bg-[rgba(139,49,35,0.05)]">
            <div className="text-[#8b3123] text-[24px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-1">
              4.1
            </div>
            <div className="text-[#8b3123] text-[12px] opacity-60">
              Average Rating
            </div>
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
}