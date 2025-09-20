import { useState } from "react";
import { 
  BarChart3, 
  Lightbulb, 
  Workflow, 
  MessageSquare,
  Bot,
  Users,
  Bell,
  Vote,
  TrendingUp,
  Heart,
  AlertCircle,
  CheckCircle,
  Clock,
  Plus,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { FeedbackInputHub } from "./FeedbackInputHub";
import { ConceptCaptureSection } from "./ConceptCaptureSection";
import { ConceptFeed } from "./ConceptFeed";
import { ServiceRequestsSection } from "./ServiceRequestsSection";

interface EchoBentoGridProps {
  onViewPipeline: (itemId: string) => void;
  onOpenVoting: (item?: any) => void;
  onOpenRating: (item?: any) => void;
  onOpenFeedback: (item?: any) => void;
  onOpenRequest: (type?: string) => void;
  onOpenMetrics: () => void;
  filteredAIContent: any[];
  filteredHumanContent: any[];
  pipelineView: "timeline" | "kanban" | "cards";
  onPipelineViewChange: (view: "timeline" | "kanban" | "cards") => void;
}

type ExpandedCard = "feedback" | "ideas" | "concept-feed" | "ai-pipeline" | "human-pipeline" | "requests" | null;

export function EchoBentoGrid({
  onViewPipeline,
  onOpenVoting,
  onOpenRating,
  onOpenFeedback,
  onOpenRequest,
  onOpenMetrics,
  filteredAIContent,
  filteredHumanContent,
  pipelineView,
  onPipelineViewChange
}: EchoBentoGridProps) {
  const [expandedCard, setExpandedCard] = useState<ExpandedCard>(null);

  const handleCardClick = (cardId: ExpandedCard) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  // Mock alert data
  const alerts = {
    feedback: { urgent: 5, total: 12 },
    ideas: { active: 3, pending: 1 },
    conceptFeed: { new: 8, trending: 4 },
    aiPipeline: { voting: 6, active: 12 },
    humanPipeline: { feedback: 3, active: 8 },
    requests: { open: 2, urgent: 1 }
  };

  return (
    <div className="h-[calc(100vh-140px)] grid grid-cols-4 grid-rows-3 gap-3 p-1">
      {/* Central Feedback Hub - Spans 2x2 */}
      <div 
        className={`col-span-2 row-span-2 skeuo-card-elevated rounded-[16px] p-4 cursor-pointer bg-gradient-to-br from-red-50 to-orange-50 transition-all duration-300 ${
          expandedCard === "feedback" ? "col-span-4 row-span-3" : ""
        }`}
        onClick={() => handleCardClick("feedback")}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="skeuo-card p-2 rounded-[8px] bg-white/80">
                <BarChart3 className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-[#8b3123] font-['Montserrat_Alternates:Bold',_sans-serif] text-lg">
                  Stakeholder Feedback Hub
                </h3>
                <div className="flex gap-2 mt-1">
                  <Badge className="bg-red-100 text-red-800 border-0 text-xs">
                    {alerts.feedback.urgent} Urgent
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800 border-0 text-xs">
                    {alerts.feedback.total} Active
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-red-500" />
              <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
              {expandedCard !== "feedback" && <ChevronDown className="h-4 w-4 text-gray-400" />}
            </div>
          </div>

          {expandedCard === "feedback" ? (
            <div className="flex-1 overflow-hidden">
              <FeedbackInputHub
                onOpenVoting={onOpenVoting}
                onOpenRating={onOpenRating}
                onOpenFeedback={onOpenFeedback}
              />
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-center">
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="skeuo-card p-3 rounded-[8px] bg-white/60 text-center">
                  <div className="text-lg font-['Montserrat_Alternates:Bold',_sans-serif] text-red-600 mb-1">5</div>
                  <div className="text-xs text-gray-600">Voting</div>
                </div>
                <div className="skeuo-card p-3 rounded-[8px] bg-white/60 text-center">
                  <div className="text-lg font-['Montserrat_Alternates:Bold',_sans-serif] text-orange-600 mb-1">3</div>
                  <div className="text-xs text-gray-600">Rating</div>
                </div>
                <div className="skeuo-card p-3 rounded-[8px] bg-white/60 text-center">
                  <div className="text-lg font-['Montserrat_Alternates:Bold',_sans-serif] text-purple-600 mb-1">4</div>
                  <div className="text-xs text-gray-600">Feedback</div>
                </div>
              </div>
              <Button 
                onClick={(e) => { e.stopPropagation(); onOpenVoting(); }}
                className="skeuo-button-primary w-full"
              >
                Open Priority Tasks
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Your Ideas - Top Right */}
      <div 
        className={`col-span-1 row-span-1 skeuo-card-elevated rounded-[16px] p-3 cursor-pointer bg-gradient-to-br from-yellow-50 to-amber-50 transition-all duration-300 ${
          expandedCard === "ideas" ? "col-span-4 row-span-3" : expandedCard ? "opacity-50 scale-95" : ""
        }`}
        onClick={() => handleCardClick("ideas")}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-yellow-600" />
              <span className="text-[#8b3123] font-['Montserrat_Alternates:SemiBold',_sans-serif] text-sm">Your Ideas</span>
            </div>
            {expandedCard !== "ideas" && <ChevronDown className="h-3 w-3 text-gray-400" />}
          </div>
          
          {expandedCard === "ideas" ? (
            <div className="flex-1 overflow-hidden">
              <ConceptCaptureSection onViewPipeline={onViewPipeline} />
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center text-center">
              <div className="text-lg font-['Montserrat_Alternates:Bold',_sans-serif] text-yellow-600 mb-1">
                {alerts.ideas.active}
              </div>
              <div className="text-xs text-gray-600">Active Concepts</div>
            </div>
          )}
        </div>
      </div>

      {/* Concept Feed - Far Right */}
      <div 
        className={`col-span-1 row-span-1 skeuo-card-elevated rounded-[16px] p-3 cursor-pointer bg-gradient-to-br from-pink-50 to-rose-50 transition-all duration-300 ${
          expandedCard === "concept-feed" ? "col-span-4 row-span-3" : expandedCard ? "opacity-50 scale-95" : ""
        }`}
        onClick={() => handleCardClick("concept-feed")}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-pink-600" />
              <span className="text-[#8b3123] font-['Montserrat_Alternates:SemiBold',_sans-serif] text-sm">Concept Feed</span>
            </div>
            {expandedCard !== "concept-feed" && <ChevronDown className="h-3 w-3 text-gray-400" />}
          </div>

          {expandedCard === "concept-feed" ? (
            <div className="flex-1 overflow-hidden">
              <ConceptFeed onViewPipeline={onViewPipeline} />
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center text-center">
              <div className="text-lg font-['Montserrat_Alternates:Bold',_sans-serif] text-pink-600 mb-1">
                {alerts.conceptFeed.new}
              </div>
              <div className="text-xs text-gray-600">New Ideas</div>
            </div>
          )}
        </div>
      </div>

      {/* AI Pipeline - Bottom Left */}
      <div 
        className={`col-span-1 row-span-1 skeuo-card-elevated rounded-[16px] p-3 cursor-pointer bg-gradient-to-br from-purple-50 to-indigo-50 transition-all duration-300 ${
          expandedCard === "ai-pipeline" ? "col-span-4 row-span-3" : expandedCard ? "opacity-50 scale-95" : ""
        }`}
        onClick={() => handleCardClick("ai-pipeline")}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-purple-600" />
              <span className="text-[#8b3123] font-['Montserrat_Alternates:SemiBold',_sans-serif] text-sm">AI Pipeline</span>
            </div>
            {alerts.aiPipeline.voting > 0 && (
              <div className="h-2 w-2 bg-purple-500 rounded-full animate-pulse" />
            )}
            {expandedCard !== "ai-pipeline" && <ChevronDown className="h-3 w-3 text-gray-400" />}
          </div>

          {expandedCard === "ai-pipeline" ? (
            <div className="flex-1 overflow-auto">
              <div className="space-y-3">
                <div className="skeuo-card p-3 rounded-[8px] bg-purple-50">
                  <h4 className="text-[#8b3123] font-['Montserrat_Alternates:SemiBold',_sans-serif] text-sm mb-1">
                    Pipeline: Idea → Scene → Script → Video Prompt
                  </h4>
                  <p className="text-xs text-gray-600">
                    Vote on generation options at each stage
                  </p>
                </div>
                {filteredAIContent.slice(0, 3).map((item) => (
                  <div key={item.id} className="skeuo-card p-3 rounded-[8px]">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{item.title}</span>
                      <Badge className="bg-purple-100 text-purple-800 border-0 text-xs">
                        {item.stage}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center text-center">
              <div className="text-lg font-['Montserrat_Alternates:Bold',_sans-serif] text-purple-600 mb-1">
                {alerts.aiPipeline.voting}
              </div>
              <div className="text-xs text-gray-600">Need Votes</div>
            </div>
          )}
        </div>
      </div>

      {/* Human Pipeline - Bottom Center */}
      <div 
        className={`col-span-1 row-span-1 skeuo-card-elevated rounded-[16px] p-3 cursor-pointer bg-gradient-to-br from-blue-50 to-cyan-50 transition-all duration-300 ${
          expandedCard === "human-pipeline" ? "col-span-4 row-span-3" : expandedCard ? "opacity-50 scale-95" : ""
        }`}
        onClick={() => handleCardClick("human-pipeline")}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              <span className="text-[#8b3123] font-['Montserrat_Alternates:SemiBold',_sans-serif] text-sm">Human Pipeline</span>
            </div>
            {expandedCard !== "human-pipeline" && <ChevronDown className="h-3 w-3 text-gray-400" />}
          </div>

          {expandedCard === "human-pipeline" ? (
            <div className="flex-1 overflow-auto">
              <div className="space-y-3">
                <div className="skeuo-card p-3 rounded-[8px] bg-blue-50">
                  <h4 className="text-[#8b3123] font-['Montserrat_Alternates:SemiBold',_sans-serif] text-sm mb-1">
                    Pipeline: Data → Body Mirror → Generation → Editing
                  </h4>
                  <p className="text-xs text-gray-600">
                    Deep textual feedback at each stage
                  </p>
                </div>
                {filteredHumanContent.slice(0, 3).map((item) => (
                  <div key={item.id} className="skeuo-card p-3 rounded-[8px]">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{item.title}</span>
                      <Badge className="bg-blue-100 text-blue-800 border-0 text-xs">
                        {item.stage}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center text-center">
              <div className="text-lg font-['Montserrat_Alternates:Bold',_sans-serif] text-blue-600 mb-1">
                {alerts.humanPipeline.feedback}
              </div>
              <div className="text-xs text-gray-600">Need Feedback</div>
            </div>
          )}
        </div>
      </div>

      {/* Service Requests - Bottom Right */}
      <div 
        className={`col-span-1 row-span-1 skeuo-card-elevated rounded-[16px] p-3 cursor-pointer bg-gradient-to-br from-gray-50 to-slate-50 transition-all duration-300 ${
          expandedCard === "requests" ? "col-span-4 row-span-3" : expandedCard ? "opacity-50 scale-95" : ""
        }`}
        onClick={() => handleCardClick("requests")}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-gray-600" />
              <span className="text-[#8b3123] font-['Montserrat_Alternates:SemiBold',_sans-serif] text-sm">Requests</span>
            </div>
            {alerts.requests.urgent > 0 && (
              <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
            )}
            {expandedCard !== "requests" && <ChevronDown className="h-3 w-3 text-gray-400" />}
          </div>

          {expandedCard === "requests" ? (
            <div className="flex-1 overflow-hidden">
              <ServiceRequestsSection onOpenRequest={onOpenRequest} />
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center text-center">
              <div className="text-lg font-['Montserrat_Alternates:Bold',_sans-serif] text-gray-600 mb-1">
                {alerts.requests.open}
              </div>
              <div className="text-xs text-gray-600">Open</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}