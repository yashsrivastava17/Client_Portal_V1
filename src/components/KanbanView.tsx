import { ContentTicket } from "./ContentTicket";
import { Badge } from "./ui/badge";
import { Bot, Users } from "lucide-react";

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

interface KanbanViewProps {
  items: ContentItem[];
  onItemAction: (item: ContentItem, action: "vote" | "rate" | "feedback") => void;
}

const stageConfig = {
  "idea-generation": { label: "Idea Generation", color: "bg-blue-100 text-blue-800" },
  "scene-generation": { label: "Scene Generation", color: "bg-purple-100 text-purple-800" },
  "script-generation": { label: "Script Generation", color: "bg-green-100 text-green-800" },
  "video-prompt": { label: "Video Prompt", color: "bg-orange-100 text-orange-800" },
  "remix-image": { label: "Remix Image", color: "bg-pink-100 text-pink-800" },
  "data-ready": { label: "Data Ready", color: "bg-cyan-100 text-cyan-800" },
  "body-mirroring": { label: "Body Mirroring", color: "bg-indigo-100 text-indigo-800" },
  "generation": { label: "Generation", color: "bg-yellow-100 text-yellow-800" },
  "video-editing": { label: "Video Editing", color: "bg-red-100 text-red-800" },
  "completed": { label: "Completed", color: "bg-emerald-100 text-emerald-800" }
};

export function KanbanView({ items, onItemAction }: KanbanViewProps) {
  const aiItems = items.filter(item => item.pipeline === "ai");
  const humanItems = items.filter(item => item.pipeline === "human");
  
  const aiStages = ["idea-generation", "scene-generation", "script-generation", "video-prompt", "remix-image", "data-ready"];
  const humanStages = ["data-ready", "body-mirroring", "generation", "video-editing", "completed"];

  const renderKanbanColumn = (stage: string, stageItems: ContentItem[], pipeline: "ai" | "human") => {
    const stageInfo = stageConfig[stage as keyof typeof stageConfig];
    
    return (
      <div key={stage} className="flex-1 min-w-[300px] space-y-3">
        {/* Column Header */}
        <div className="skeuo-card p-4 rounded-[16px] sticky top-0 z-10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {pipeline === "ai" ? <Bot className="h-4 w-4 text-purple-600" /> : <Users className="h-4 w-4 text-blue-600" />}
              <h3 className="text-[#8b3123] font-['Montserrat_Alternates:Bold',_sans-serif] text-sm">
                {stageInfo.label}
              </h3>
            </div>
            <Badge className={`${stageInfo.color} border-0 text-xs`}>
              {stageItems.length}
            </Badge>
          </div>
          
          {/* Progress indicator */}
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span>Videos:</span>
            <div className="flex-1 bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-[#8b3123] h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (stageItems.length / Math.max(items.length, 1)) * 100)}%` }}
              />
            </div>
            <span>{stageItems.length}</span>
          </div>
        </div>

        {/* Column Items */}
        <div className="space-y-3 pb-4">
          {stageItems.map((item) => (
            <div key={item.id} className="transform transition-all hover:scale-[1.02]">
              <ContentTicket
                {...item}
                onViewDetails={() => onItemAction(item, "feedback")}
                onVote={() => onItemAction(item, "vote")}
                onRate={() => onItemAction(item, "rate")}
                onFeedback={() => onItemAction(item, "feedback")}
              />
            </div>
          ))}
          
          {/* Empty state */}
          {stageItems.length === 0 && (
            <div className="skeuo-card p-6 rounded-[16px] text-center opacity-50">
              <div className="text-gray-400 text-sm">
                No videos in this stage
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* AI Pipeline Kanban */}
      {aiItems.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="skeuo-card p-3 rounded-[12px]">
              <Bot className="h-5 w-5 text-purple-600" />
            </div>
            <h2 className="text-[#8b3123] font-['Montserrat_Alternates:Bold',_sans-serif] text-xl">
              AI Pipeline Board
            </h2>
            <Badge className="bg-purple-100 text-purple-800 border-0">
              {aiItems.length} videos
            </Badge>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4">
            {aiStages.map(stage => {
              const stageItems = aiItems.filter(item => item.stage === stage);
              return renderKanbanColumn(stage, stageItems, "ai");
            })}
          </div>
        </div>
      )}

      {/* Human Pipeline Kanban */}
      {humanItems.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="skeuo-card p-3 rounded-[12px]">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <h2 className="text-[#8b3123] font-['Montserrat_Alternates:Bold',_sans-serif] text-xl">
              Human Pipeline Board
            </h2>
            <Badge className="bg-blue-100 text-blue-800 border-0">
              {humanItems.length} videos
            </Badge>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4">
            {humanStages.map(stage => {
              const stageItems = humanItems.filter(item => item.stage === stage);
              return renderKanbanColumn(stage, stageItems, "human");
            })}
          </div>
        </div>
      )}
    </div>
  );
}