import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { EnhancedStarRating } from "./EnhancedStarRating";
import { Vote, Star, MessageSquare, BarChart3, CheckCircle } from "lucide-react";

interface ContentItem {
  id: string;
  title: string;
  type: "video" | "script" | "idea" | "scene" | "prompt" | "image";
  stage: string;
  pipeline: "ai" | "human";
  content?: string;
  imageUrl?: string;
  version: number;
}

interface PipelineVotingModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentItem: ContentItem | null;
}

interface VotingData {
  stakeholderVote: "approve" | "reject" | null;
  starRating: number;
  textualFeedback: string;
}

export function PipelineVotingModal({ isOpen, onClose, contentItem }: PipelineVotingModalProps) {
  const [activeTab, setActiveTab] = useState("vote");
  const [votingData, setVotingData] = useState<VotingData>({
    stakeholderVote: null,
    starRating: 0,
    textualFeedback: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!contentItem) return null;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Submitting RLHF data:", {
      contentId: contentItem.id,
      ...votingData
    });
    
    setIsSubmitting(false);
    onClose();
  };

  const isVoteComplete = votingData.stakeholderVote !== null;
  const isRatingComplete = votingData.starRating > 0;
  const isFeedbackComplete = votingData.textualFeedback.trim().length > 10;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="skeuo-card-elevated max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#8b3123] font-['Montserrat_Alternates:Bold',_sans-serif] text-2xl">
            RLHF Feedback System
          </DialogTitle>
          <div className="flex items-center gap-3 mt-3">
            <Badge className={`${contentItem.pipeline === "ai" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"} border-0`}>
              {contentItem.pipeline.toUpperCase()} Pipeline
            </Badge>
            <Badge className="bg-gray-100 text-gray-800 border-0">
              {contentItem.stage}
            </Badge>
            <Badge className="bg-green-100 text-green-800 border-0">
              v{contentItem.version}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Content Preview */}
          <div className="skeuo-card p-6 rounded-[16px]">
            <h3 className="text-[#8b3123] font-['Montserrat_Alternates:Bold',_sans-serif] text-xl mb-3">
              {contentItem.title}
            </h3>
            
            {contentItem.imageUrl && (
              <div className="mb-4">
                <img 
                  src={contentItem.imageUrl} 
                  alt={contentItem.title}
                  className="w-full max-w-md mx-auto rounded-[12px] skeuo-card"
                />
              </div>
            )}
            
            {contentItem.content && (
              <div className="skeuo-input-enhanced p-4 rounded-[12px] bg-gray-50">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {contentItem.content}
                </p>
              </div>
            )}
          </div>

          {/* RLHF Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 skeuo-card p-1 rounded-[12px]">
              <TabsTrigger 
                value="vote" 
                className={`rounded-[8px] data-[state=active]:skeuo-button-primary data-[state=active]:text-white ${isVoteComplete ? 'ring-2 ring-green-200' : ''}`}
              >
                <div className="flex items-center gap-2">
                  <Vote className="h-4 w-4" />
                  Vote on Options
                  {isVoteComplete && <CheckCircle className="h-3 w-3" />}
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="rating" 
                className={`rounded-[8px] data-[state=active]:skeuo-button-primary data-[state=active]:text-white ${isRatingComplete ? 'ring-2 ring-green-200' : ''}`}
                disabled={contentItem.pipeline === "human"}
              >
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Star Rating
                  {isRatingComplete && <CheckCircle className="h-3 w-3" />}
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="feedback" 
                className={`rounded-[8px] data-[state=active]:skeuo-button-primary data-[state=active]:text-white ${isFeedbackComplete ? 'ring-2 ring-green-200' : ''}`}
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Textual Feedback
                  {isFeedbackComplete && <CheckCircle className="h-3 w-3" />}
                </div>
              </TabsTrigger>
            </TabsList>

            {/* Generation Options Voting */}
            <TabsContent value="vote" className="space-y-6">
              <div className="skeuo-card p-6 rounded-[16px]">
                <h4 className="text-[#8b3123] font-['Montserrat_Alternates:Bold',_sans-serif] text-lg mb-4">
                  Vote on Generation Options
                </h4>
                <p className="text-gray-600 mb-6">
                  Select which generated option should proceed to the next pipeline stage. The winning option will require mandatory rating and feedback.
                </p>
                
                {/* Mock generation options */}
                <div className="space-y-4">
                  <h5 className="font-['Montserrat_Alternates:SemiBold',_sans-serif] text-[#8b3123]">
                    Available Options ({contentItem?.stage}):
                  </h5>
                  
                  {[1, 2, 3].map((optionNum) => (
                    <div key={optionNum} className="skeuo-card p-4 rounded-[12px] border-2 hover:border-[#8b3123] transition-colors cursor-pointer">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h6 className="font-medium text-[#8b3123] mb-2">
                            Option {optionNum}
                          </h6>
                          <p className="text-sm text-gray-600 mb-3">
                            {contentItem?.stage === "idea-generation" 
                              ? `Creative concept variation ${optionNum} with different approach and tone...`
                              : contentItem?.stage === "scene-generation"
                              ? `Scene setup ${optionNum} with unique lighting and composition...`
                              : `Generated content variation ${optionNum} with distinctive style...`
                            }
                          </p>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Vote className="h-3 w-3 text-gray-500" />
                              <span className="text-xs text-gray-500">{Math.floor(Math.random() * 10) + 1} votes</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-gray-500">Rating: {(Math.random() * 2 + 3).toFixed(1)}/5</span>
                            </div>
                          </div>
                        </div>
                        
                        <Button
                          size="sm"
                          className={`skeuo-button ${votingData.stakeholderVote === `option-${optionNum}` ? "skeuo-button-primary text-white" : ""}`}
                          onClick={() => setVotingData(prev => ({ ...prev, stakeholderVote: `option-${optionNum}` as any }))}
                        >
                          Vote
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {votingData.stakeholderVote && (
                  <div className="mt-6 p-4 rounded-[12px] bg-green-50 border border-green-200">
                    <p className="text-green-800 font-medium">
                      ✅ Voted for {votingData.stakeholderVote}. This option will proceed to next stage.
                    </p>
                    <p className="text-sm text-green-700 mt-1">
                      Remember: You must provide star rating and feedback for the selected option.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Star Rating */}
            <TabsContent value="rating" className="space-y-6">
              <div className="skeuo-card p-6 rounded-[16px]">
                <h4 className="text-[#8b3123] font-['Montserrat_Alternates:Bold',_sans-serif] text-lg mb-4">
                  Quality Rating
                </h4>
                <p className="text-gray-600 mb-6">
                  Rate the quality of this content with decimal precision. Your rating helps improve the AI model.
                </p>
                
                <div className="flex justify-center">
                  <EnhancedStarRating
                    rating={votingData.starRating}
                    onRatingChange={(rating) => setVotingData(prev => ({ ...prev, starRating: rating }))}
                    size="lg"
                    maxRating={5}
                  />
                </div>
                
                {votingData.starRating > 0 && (
                  <div className="mt-6 p-4 rounded-[12px] bg-blue-50 border border-blue-200 text-center">
                    <p className="text-blue-800 font-medium">
                      Rating submitted: {votingData.starRating.toFixed(1)} / 5.0 stars
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Textual Feedback */}
            <TabsContent value="feedback" className="space-y-6">
              <div className="skeuo-card p-6 rounded-[16px]">
                <h4 className="text-[#8b3123] font-['Montserrat_Alternates:Bold',_sans-serif] text-lg mb-4">
                  Detailed Feedback
                </h4>
                <p className="text-gray-600 mb-6">
                  Provide contextual feedback on what works and what doesn't. This helps improve future iterations.
                </p>
                
                <Textarea
                  placeholder="Provide detailed feedback about this content. What works well? What could be improved? Any specific suggestions?"
                  value={votingData.textualFeedback}
                  onChange={(e) => setVotingData(prev => ({ ...prev, textualFeedback: e.target.value }))}
                  className="skeuo-input-enhanced min-h-[150px] resize-none"
                />
                
                <div className="mt-3 text-sm text-gray-500">
                  {votingData.textualFeedback.length} characters (minimum 10 recommended)
                </div>
                
                {isFeedbackComplete && (
                  <div className="mt-4 p-4 rounded-[12px] bg-green-50 border border-green-200">
                    <p className="text-green-800 font-medium">
                      ✅ Detailed feedback provided
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* Submit Actions */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              {contentItem.pipeline === "ai" ? "Complete all 3 feedback types" : "Complete voting and feedback"} for comprehensive RLHF
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose} className="skeuo-button">
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting || !isVoteComplete || (!isFeedbackComplete)}
                className="skeuo-button-primary"
              >
                {isSubmitting ? "Submitting..." : "Submit RLHF Feedback"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}