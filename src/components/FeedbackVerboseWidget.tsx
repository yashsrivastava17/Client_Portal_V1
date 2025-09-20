import { CollapsibleSection } from "./CollapsibleSection";
import { Button } from "./ui/button";
import { MessageSquare, Plus, Clock, User, Star, ThumbsUp, Filter } from "lucide-react";

interface FeedbackEntry {
  id: string;
  author: string;
  date: string;
  category: "campaign" | "video" | "general" | "process";
  subject: string;
  preview: string;
  rating?: number;
  status: "new" | "reviewed" | "addressed";
  priority: "low" | "medium" | "high";
}

const mockFeedback: FeedbackEntry[] = [
  {
    id: "1",
    author: "Sarah M.",
    date: "2024-01-10",
    category: "campaign",
    subject: "Holiday Campaign Performance Analysis",
    preview: "The overall campaign exceeded expectations, particularly in the 25-34 demographic. However, I noticed the video content had lower engagement rates compared to static posts...",
    rating: 4,
    status: "reviewed",
    priority: "high"
  },
  {
    id: "2",
    author: "Alex K.",
    date: "2024-01-09",
    category: "video",
    subject: "Product Demo Video Feedback",
    preview: "The new product demo has great visual quality, but the pacing feels rushed in the middle section. Consider extending the feature showcase by 10-15 seconds...",
    rating: 3,
    status: "new",
    priority: "medium"
  },
  {
    id: "3",
    author: "Jordan L.",
    date: "2024-01-08",
    category: "process",
    subject: "Content Review Workflow Improvement",
    preview: "The current review process works well but could benefit from clearer feedback templates. It would help if we had standardized categories for different types of feedback...",
    status: "addressed",
    priority: "low"
  },
  {
    id: "4",
    author: "Morgan T.",
    date: "2024-01-07",
    category: "general",
    subject: "Brand Guidelines Consistency",
    preview: "I've noticed some inconsistencies in our recent content regarding brand color usage. The tertiary colors seem to vary slightly across different video projects...",
    rating: 5,
    status: "new",
    priority: "medium"
  }
];

const categoryConfig = {
  campaign: { color: "bg-purple-100 text-purple-700 border-purple-200", label: "Campaign" },
  video: { color: "bg-blue-100 text-blue-700 border-blue-200", label: "Video" },
  general: { color: "bg-green-100 text-green-700 border-green-200", label: "General" },
  process: { color: "bg-orange-100 text-orange-700 border-orange-200", label: "Process" }
};

const statusConfig = {
  new: { color: "bg-blue-100 text-blue-700 border-blue-200", label: "New" },
  reviewed: { color: "bg-yellow-100 text-yellow-700 border-yellow-200", label: "Reviewed" },
  addressed: { color: "bg-green-100 text-green-700 border-green-200", label: "Addressed" }
};

const priorityConfig = {
  low: { color: "bg-gray-100 text-gray-700 border-gray-200" },
  medium: { color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  high: { color: "bg-red-100 text-red-700 border-red-200" }
};

interface FeedbackVerboseWidgetProps {
  onOpenFeedback: () => void;
}

export function FeedbackVerboseWidget({ onOpenFeedback }: FeedbackVerboseWidgetProps) {
  const renderStarRating = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star}
            className={`h-3 w-3 ${
              star <= rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <CollapsibleSection 
      title="Detailed Feedback" 
      icon={<MessageSquare className="h-5 w-5" />}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ThumbsUp className="h-4 w-4 text-[#8b3123]" />
            <h3 className="text-[#8b3123] text-[18px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
              Community Feedback
            </h3>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="text-[#8b3123] border-[#8b3123] hover:bg-[rgba(139,49,35,0.1)] text-[12px] px-3"
            >
              <Filter className="h-3 w-3 mr-1" />
              Filter
            </Button>
            <Button 
              onClick={onOpenFeedback}
              size="sm"
              className="bg-[#8b3123] hover:bg-[#7a2e20] text-[#f3e1b7] text-[12px] px-3"
            >
              <Plus className="h-3 w-3 mr-1" />
              Add Feedback
            </Button>
          </div>
        </div>

        {/* Feedback Cards */}
        <div className="space-y-4">
          {mockFeedback.map((feedback) => (
            <div 
              key={feedback.id}
              className="rounded-[24px] p-5 border border-[rgba(139,49,35,0.1)] hover:border-[rgba(139,49,35,0.2)] transition-colors cursor-pointer"
              style={{
                background: 'linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)), rgba(255, 255, 255, 0.4)'
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`text-[10px] px-2 py-1 rounded-full border font-['Montserrat_Alternates:Medium',_sans-serif] ${categoryConfig[feedback.category].color}`}>
                    {categoryConfig[feedback.category].label}
                  </div>
                  <div className={`text-[10px] px-2 py-1 rounded-full border font-['Montserrat_Alternates:Medium',_sans-serif] ${statusConfig[feedback.status].color}`}>
                    {statusConfig[feedback.status].label}
                  </div>
                  <div className={`text-[10px] px-2 py-1 rounded-full border font-['Montserrat_Alternates:Medium',_sans-serif] ${priorityConfig[feedback.priority].color}`}>
                    {feedback.priority}
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-[#8b3123] text-[12px] opacity-60">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {feedback.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(feedback.date).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Subject */}
              <h4 className="text-[#8b3123] text-[16px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-3">
                {feedback.subject}
              </h4>

              {/* Preview */}
              <p className="text-[#8b3123] text-[13px] opacity-75 leading-relaxed mb-4">
                {feedback.preview}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {feedback.rating && (
                    <div className="flex items-center gap-2">
                      <span className="text-[#8b3123] text-[12px] opacity-60">Rating:</span>
                      {renderStarRating(feedback.rating)}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[#8b3123] border-[#8b3123] hover:bg-[rgba(139,49,35,0.1)] text-[12px] px-3 h-7"
                  >
                    View Full
                  </Button>
                  {feedback.status === "new" && (
                    <Button
                      size="sm"
                      className="bg-[#8b3123] hover:bg-[#7a2e20] text-[#f3e1b7] text-[12px] px-3 h-7"
                    >
                      Respond
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="p-4 rounded-[16px] bg-[rgba(139,49,35,0.05)] border border-[rgba(139,49,35,0.1)]">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-[#8b3123] text-[14px] font-['Montserrat_Alternates:SemiBold',_sans-serif] mb-1">
                Have feedback to share?
              </h4>
              <p className="text-[#8b3123] text-[12px] opacity-70">
                Your insights help improve our content and processes
              </p>
            </div>
            <Button 
              onClick={onOpenFeedback}
              className="bg-[#8b3123] hover:bg-[#7a2e20] text-[#f3e1b7] px-6"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Share Feedback
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-6 border-t border-[rgba(139,49,35,0.1)]">
          <div className="text-center p-3 rounded-[12px] bg-[rgba(139,49,35,0.05)]">
            <div className="text-[#8b3123] text-[18px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-1">
              {mockFeedback.filter(f => f.status === "new").length}
            </div>
            <div className="text-[#8b3123] text-[11px] opacity-60">
              New Feedback
            </div>
          </div>
          
          <div className="text-center p-3 rounded-[12px] bg-[rgba(139,49,35,0.05)]">
            <div className="text-[#8b3123] text-[18px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-1">
              {mockFeedback.length}
            </div>
            <div className="text-[#8b3123] text-[11px] opacity-60">
              Total This Week
            </div>
          </div>
          
          <div className="text-center p-3 rounded-[12px] bg-[rgba(139,49,35,0.05)]">
            <div className="text-[#8b3123] text-[18px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-1">
              4.2
            </div>
            <div className="text-[#8b3123] text-[11px] opacity-60">
              Avg Rating
            </div>
          </div>
          
          <div className="text-center p-3 rounded-[12px] bg-[rgba(139,49,35,0.05)]">
            <div className="text-[#8b3123] text-[18px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-1">
              89%
            </div>
            <div className="text-[#8b3123] text-[11px] opacity-60">
              Response Rate
            </div>
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
}