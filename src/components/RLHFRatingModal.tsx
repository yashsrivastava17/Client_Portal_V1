import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Star, ThumbsUp, ThumbsDown, Send, Video, FileText, Target, Clock, Search, CheckCircle } from "lucide-react";
import { Input } from "./ui/input";

interface CampaignItem {
  id: string;
  title: string;
  type: "video" | "script" | "campaign";
  description: string;
  stage: "idea" | "script" | "body-mirroring" | "production" | "review";
  dueDate?: string;
}

interface RLHFRatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaignItem: CampaignItem | null;
}

// Mock data for available posts/content to rate
const availablePosts = [
  {
    id: "post-1",
    title: "Holiday Campaign Hero Video",
    type: "video" as const,
    description: "Main promotional video for holiday campaign featuring product showcase",
    stage: "review" as const,
    dueDate: "2024-01-15"
  },
  {
    id: "post-2", 
    title: "Product Demo Script v3",
    type: "script" as const,
    description: "Refined version with improved pacing and clearer messaging",
    stage: "script" as const,
    dueDate: "2024-01-18"
  },
  {
    id: "post-3",
    title: "Q1 Brand Strategy Document",
    type: "campaign" as const,
    description: "Comprehensive strategy document for Q1 brand initiatives",
    stage: "idea" as const,
    dueDate: "2024-01-22"
  },
  {
    id: "post-4",
    title: "Customer Testimonial Video",
    type: "video" as const,
    description: "Series of customer success stories and testimonials",
    stage: "production" as const,
    dueDate: "2024-01-20"
  },
  {
    id: "post-5",
    title: "Social Media Campaign Concept",
    type: "campaign" as const,
    description: "Multi-platform social media campaign for product launch",
    stage: "idea" as const,
    dueDate: "2024-01-25"
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

const ratingCategories = [
  {
    id: "overall",
    label: "Overall Quality",
    description: "General assessment of the work quality"
  },
  {
    id: "creativity",
    label: "Creativity & Innovation",
    description: "How creative and original is the approach"
  },
  {
    id: "clarity",
    label: "Clarity & Communication",
    description: "How clear and well-communicated the message is"
  },
  {
    id: "brand-alignment",
    label: "Brand Alignment",
    description: "How well it aligns with brand guidelines and voice"
  },
  {
    id: "target-audience",
    label: "Target Audience Fit",
    description: "How well it resonates with the intended audience"
  }
];

export function RLHFRatingModal({ isOpen, onClose, campaignItem }: RLHFRatingModalProps) {
  const [selectedPostId, setSelectedPostId] = useState<string>(campaignItem?.id || "");
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [customRating, setCustomRating] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleRatingChange = (categoryId: string, rating: number) => {
    setRatings(prev => ({
      ...prev,
      [categoryId]: rating
    }));
  };

  const handleCustomRatingChange = (categoryId: string, value: string) => {
    setCustomRating(prev => ({
      ...prev,
      [categoryId]: value
    }));
    
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 5) {
      handleRatingChange(categoryId, numValue);
    }
  };

  const filteredPosts = availablePosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedPost = selectedPostId ? 
    availablePosts.find(post => post.id === selectedPostId) || campaignItem :
    campaignItem;

  const handleSubmit = async () => {
    if (Object.keys(ratings).length === 0) return;
    
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      console.log("RLHF Rating submitted:", {
        itemId: campaignItem?.id,
        ratings,
        feedback
      });
      
      setIsSubmitting(false);
      onClose();
      
      // Reset form
      setRatings({});
      setFeedback("");
    }, 2000);
  };

  const renderStarRating = (categoryId: string, currentRating: number) => {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRatingChange(categoryId, star)}
              className="skeuo-button p-1 rounded-full transition-all hover:scale-110"
            >
              <Star 
                className={`h-4 w-4 ${
                  star <= currentRating 
                    ? 'fill-[#8b3123] text-[#8b3123]' 
                    : 'text-gray-300 hover:text-[#8b3123]'
                }`}
              />
            </button>
          ))}
        </div>
        
        <Input
          type="number"
          min="0"
          max="5"
          step="0.1"
          value={customRating[categoryId] || currentRating.toString()}
          onChange={(e) => handleCustomRatingChange(categoryId, e.target.value)}
          className="skeuo-input w-16 h-8 text-[12px] text-center"
          placeholder="0.0"
        />
      </div>
    );
  };

  const getAverageRating = () => {
    const validRatings = Object.values(ratings).filter(rating => rating > 0);
    if (validRatings.length === 0) return 0;
    return validRatings.reduce((sum, rating) => sum + rating, 0) / validRatings.length;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto skeuo-card border-0">
        <DialogHeader className="pb-4 border-b border-[rgba(139,49,35,0.1)]">
          <DialogTitle className="text-[#8b3123] text-[24px] font-['Montserrat_Alternates:Bold',_sans-serif] flex items-center gap-2">
            <Star className="h-6 w-6" />
            Rate & Provide Feedback
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Post Selection */}
          <div className="skeuo-card rounded-[16px] p-4">
            <h4 className="text-[#8b3123] text-[16px] font-['Montserrat_Alternates:SemiBold',_sans-serif] mb-3 flex items-center gap-2">
              <Search className="h-4 w-4" />
              Select Content to Rate
            </h4>
            
            <div className="space-y-3">
              <Input
                placeholder="Search for content to rate..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="skeuo-input"
              />
              
              <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
                {filteredPosts.map((post) => (
                  <button
                    key={post.id}
                    onClick={() => setSelectedPostId(post.id)}
                    className={`skeuo-card text-left p-3 rounded-[12px] transition-all hover:scale-[1.02] ${
                      selectedPostId === post.id ? 'skeuo-card-pressed' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={`text-[9px] px-2 py-1 ${typeConfig[post.type].color}`}>
                            {typeConfig[post.type].icon}
                            {post.type}
                          </Badge>
                          <Badge className={`text-[9px] px-2 py-1 ${stageConfig[post.stage].color}`}>
                            {stageConfig[post.stage].label}
                          </Badge>
                        </div>
                        <h5 className="text-[#8b3123] text-[13px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-1">
                          {post.title}
                        </h5>
                        <p className="text-[#8b3123] text-[11px] opacity-70 leading-relaxed">
                          {post.description}
                        </p>
                      </div>
                      {selectedPostId === post.id && (
                        <CheckCircle className="h-4 w-4 text-[#8b3123] flex-shrink-0 ml-2" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* Selected Item Overview */}
          {selectedPost && (
            <div className="skeuo-card rounded-[16px] p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge className={`text-[10px] px-2 py-1 ${typeConfig[selectedPost.type].color}`}>
                    {typeConfig[selectedPost.type].icon}
                    {selectedPost.type}
                  </Badge>
                  <Badge className={`text-[10px] px-2 py-1 ${stageConfig[selectedPost.stage].color}`}>
                    {stageConfig[selectedPost.stage].label}
                  </Badge>
                </div>
                
                {selectedPost.dueDate && (
                  <div className="flex items-center gap-1 text-[#8b3123] text-[11px] opacity-60">
                    <Clock className="h-3 w-3" />
                    Due: {new Date(selectedPost.dueDate).toLocaleDateString()}
                  </div>
                )}
              </div>

              <h3 className="text-[#8b3123] text-[18px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-2">
                {selectedPost.title}
              </h3>
              <p className="text-[#8b3123] text-[13px] opacity-75 leading-relaxed">
                {selectedPost.description}
              </p>
            </div>
          )}

          {/* Rating Categories */}
          {selectedPost && (
            <div className="skeuo-card rounded-[16px] p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-[#8b3123] text-[16px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
                  Rate Different Aspects
                </h4>
                {getAverageRating() > 0 && (
                  <div className="flex items-center gap-2 skeuo-card rounded-[8px] px-3 py-1">
                    <span className="text-[#8b3123] text-[12px] opacity-60">Average:</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-[#8b3123] text-[#8b3123]" />
                      <span className="text-[#8b3123] text-[14px] font-['Montserrat_Alternates:Bold',_sans-serif]">
                        {getAverageRating().toFixed(1)}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {ratingCategories.map((category) => (
                  <div 
                    key={category.id}
                    className="skeuo-card rounded-[12px] p-4 hover:scale-[1.01] transition-transform"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h5 className="text-[#8b3123] text-[14px] font-['Montserrat_Alternates:SemiBold',_sans-serif] mb-1">
                          {category.label}
                        </h5>
                        <p className="text-[#8b3123] text-[12px] opacity-70">
                          {category.description}
                        </p>
                      </div>
                      <div className="ml-4">
                        {renderStarRating(category.id, ratings[category.id] || 0)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          {selectedPost && (
            <div className="skeuo-card rounded-[16px] p-4">
              <h4 className="text-[#8b3123] text-[16px] font-['Montserrat_Alternates:SemiBold',_sans-serif] mb-3">
                Quick Assessment
              </h4>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    // Set all ratings to 4 (positive)
                    const positiveRatings: Record<string, number> = {};
                    ratingCategories.forEach(cat => {
                      positiveRatings[cat.id] = 4;
                    });
                    setRatings(positiveRatings);
                  }}
                  className="flex-1 skeuo-button text-green-600 px-4 py-2 rounded-[8px] flex items-center justify-center gap-2"
                >
                  <ThumbsUp className="h-4 w-4" />
                  Approve (4.0 stars)
                </button>
                <button
                  onClick={() => {
                    // Set all ratings to 2 (needs work)
                    const negativeRatings: Record<string, number> = {};
                    ratingCategories.forEach(cat => {
                      negativeRatings[cat.id] = 2;
                    });
                    setRatings(negativeRatings);
                  }}
                  className="flex-1 skeuo-button text-orange-600 px-4 py-2 rounded-[8px] flex items-center justify-center gap-2"
                >
                  <ThumbsDown className="h-4 w-4" />
                  Needs Work (2.0 stars)
                </button>
              </div>
            </div>
          )}

          {/* Detailed Feedback */}
          {selectedPost && (
            <div className="skeuo-card rounded-[16px] p-4">
              <h4 className="text-[#8b3123] text-[16px] font-['Montserrat_Alternates:SemiBold',_sans-serif] mb-3">
                Detailed Feedback (Optional)
              </h4>
              <Textarea 
                placeholder="Share specific feedback, suggestions for improvement, or what you particularly liked about this work..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="skeuo-input min-h-[120px] resize-none"
              />
              <div className="text-[#8b3123] text-[11px] opacity-60 mt-2 text-right">
                {feedback.length} characters
              </div>
            </div>
          )}

          {/* Rating Guidelines */}
          <div className="skeuo-card rounded-[12px] p-4 bg-[rgba(139,49,35,0.03)]">
            <div className="text-[#8b3123] text-[13px] font-['Montserrat_Alternates:SemiBold',_sans-serif] mb-3 flex items-center gap-2">
              <Star className="h-4 w-4" />
              Rating Guidelines
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {[
                { stars: 1, label: "Poor", desc: "Major issues" },
                { stars: 2, label: "Below Average", desc: "Needs improvement" },
                { stars: 3, label: "Average", desc: "Meets expectations" },
                { stars: 4, label: "Good", desc: "Above expectations" },
                { stars: 5, label: "Excellent", desc: "Outstanding work" }
              ].map((guide) => (
                <div key={guide.stars} className="skeuo-card rounded-[8px] p-2 text-center">
                  <div className="flex justify-center mb-1">
                    {Array.from({ length: guide.stars }, (_, i) => (
                      <Star key={i} className="h-3 w-3 fill-[#8b3123] text-[#8b3123]" />
                    ))}
                  </div>
                  <div className="text-[#8b3123] text-[11px] font-['Montserrat_Alternates:SemiBold',_sans-serif] mb-1">
                    {guide.label}
                  </div>
                  <div className="text-[#8b3123] text-[10px] opacity-70">
                    {guide.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-[rgba(139,49,35,0.1)]">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 text-[#8b3123] border-[#8b3123] hover:bg-[rgba(139,49,35,0.1)]"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={Object.keys(ratings).length === 0 || isSubmitting}
              className="flex-1 bg-[#8b3123] hover:bg-[#7a2e20] text-[#f3e1b7]"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#f3e1b7] border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </div>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-1" />
                  Submit Rating
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}