import { ContentTicket } from "./ContentTicket";
import { Badge } from "./ui/badge";

interface ContentItem {
  id: string;
  title: string;
  type: "video" | "script" | "idea" | "scene" | "prompt" | "image";
  stage: "idea-generation" | "scene-generation" | "script-generation" | "video-prompt" | "remix-image" | "data-ready" | "body-mirroring" | "generation" | "video-editing" | "completed";
  feedbackLevel: "very-low" | "low" | "medium-low" | "medium-high" | "high" | "very-high";
  owner?: string;
  ownerAvatar?: string;
  feedbackContributors?: string[];
  progress: number;
  priority: "low" | "medium" | "high" | "urgent";
  pipeline: "ai" | "human";
  voteCount?: number;
  ratingAvg?: number;
  feedbackCount?: number;
  dueDate?: string;
  generationOptions?: number;
}

interface TimelineViewProps {
  items: ContentItem[];
  onItemAction: (item: ContentItem, action: "vote" | "rate" | "feedback") => void;
}

const stageOrder = {
  "ai": [
    "idea-generation",
    "scene-generation", 
    "script-generation",
    "video-prompt",
    "remix-image",
    "data-ready"
  ],
  "human": [
    "data-ready",
    "body-mirroring",
    "generation", 
    "video-editing",
    "completed"
  ]
};

export function TimelineView({ items, onItemAction }: TimelineViewProps) {
  const aiItems = items.filter(item => item.pipeline === "ai");
  const humanItems = items.filter(item => item.pipeline === "human");

  const renderPipelineTimeline = (pipelineItems: ContentItem[], pipeline: "ai" | "human") => {
    const stages = stageOrder[pipeline];
    
    return (
      <div className="space-y-6">
        {stages.map((stage, stageIndex) => {
          const stageItems = pipelineItems.filter(item => item.stage === stage);
          
          if (stageItems.length === 0) return null;
          
          return (
            <div key={stage} className="relative">
              {/* Timeline Line */}
              {stageIndex < stages.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-20 bg-gradient-to-b from-[#8b3123] to-transparent opacity-30" />
              )}
              
              {/* Stage Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="skeuo-card p-3 rounded-full">
                  <div className="w-3 h-3 bg-[#8b3123] rounded-full" />
                </div>
                <div>
                  <h3 className="text-[#8b3123] font-['Montserrat_Alternates:Bold',_sans-serif] text-lg capitalize">
                    {stage.replace('-', ' ')}
                  </h3>
                  <Badge className="bg-gray-100 text-gray-600 border-0 mt-1">
                    {stageItems.length} video{stageItems.length !== 1 ? 's' : ''}
                  </Badge>
                </div>
              </div>
              
              {/* Stage Items */}
              <div className="ml-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {stageItems.map((item) => (
                  <ContentTicket
                    key={item.id}
                    {...item}
                    onViewDetails={() => onItemAction(item, "feedback")}
                    onVote={() => onItemAction(item, "vote")}
                    onRate={() => onItemAction(item, "rate")}
                    onFeedback={() => onItemAction(item, "feedback")}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-12">
      {/* AI Pipeline Timeline */}
      {aiItems.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="skeuo-card p-3 rounded-[12px]">
              <div className="w-6 h-6 bg-purple-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                AI
              </div>
            </div>
            <h2 className="text-[#8b3123] font-['Montserrat_Alternates:Bold',_sans-serif] text-xl">
              AI Pipeline Timeline
            </h2>
            <Badge className="bg-purple-100 text-purple-800 border-0">
              {aiItems.length} videos in progress
            </Badge>
          </div>
          {renderPipelineTimeline(aiItems, "ai")}
        </div>
      )}

      {/* Human Pipeline Timeline */}
      {humanItems.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="skeuo-card p-3 rounded-[12px]">
              <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                H
              </div>
            </div>
            <h2 className="text-[#8b3123] font-['Montserrat_Alternates:Bold',_sans-serif] text-xl">
              Human Pipeline Timeline
            </h2>
            <Badge className="bg-blue-100 text-blue-800 border-0">
              {humanItems.length} videos in progress
            </Badge>
          </div>
          {renderPipelineTimeline(humanItems, "human")}
        </div>
      )}
    </div>
  );
}