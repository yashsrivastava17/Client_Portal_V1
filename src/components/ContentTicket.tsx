import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Clock, MessageSquare, Vote, BarChart3, User } from "lucide-react";

interface ContentTicketProps {
  id: string;
  title: string; // This is always a video name
  type: "video" | "script" | "idea" | "scene" | "prompt" | "image";
  stage: "idea-generation" | "scene-generation" | "script-generation" | "video-prompt" | "remix-image" | "data-ready" | "body-mirroring" | "generation" | "video-editing" | "completed";
  feedbackLevel: "very-low" | "low" | "medium-low" | "medium-high" | "high" | "very-high";
  owner?: string; // For human pipeline
  ownerAvatar?: string;
  feedbackContributors?: string[]; // For AI pipeline - names of people who gave feedback
  progress: number;
  priority: "low" | "medium" | "high" | "urgent";
  pipeline: "ai" | "human";
  voteCount?: number;
  ratingAvg?: number;
  feedbackCount?: number;
  dueDate?: string;
  generationOptions?: number; // Number of generation options available for voting
  onViewDetails?: () => void;
  onVote?: () => void;
  onRate?: () => void;
  onFeedback?: () => void;
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

const feedbackLevelConfig = {
  "very-low": { label: "Very Low", color: "bg-gray-100 text-gray-600", intensity: 1 },
  "low": { label: "Low", color: "bg-red-100 text-red-600", intensity: 2 },
  "medium-low": { label: "Medium Low", color: "bg-orange-100 text-orange-600", intensity: 3 },
  "medium-high": { label: "Medium High", color: "bg-yellow-100 text-yellow-600", intensity: 4 },
  "high": { label: "High", color: "bg-blue-100 text-blue-600", intensity: 5 },
  "very-high": { label: "Very High", color: "bg-green-100 text-green-600", intensity: 6 }
};

const typeConfig = {
  "video": "🎥",
  "script": "📝",
  "idea": "💡", 
  "scene": "🎬",
  "prompt": "🎯",
  "image": "🖼️"
};

const priorityConfig = {
  "low": "bg-gray-100 text-gray-600",
  "medium": "bg-blue-100 text-blue-600", 
  "high": "bg-orange-100 text-orange-600",
  "urgent": "bg-red-100 text-red-600"
};

export function ContentTicket({ 
  id,
  title,
  type,
  stage,
  feedbackLevel,
  owner,
  ownerAvatar,
  feedbackContributors = [],
  progress,
  priority,
  pipeline,
  voteCount = 0,
  ratingAvg = 0,
  feedbackCount = 0,
  dueDate,
  generationOptions = 1,
  onViewDetails,
  onVote,
  onRate,
  onFeedback
}: ContentTicketProps) {
  const stageInfo = stageConfig[stage];
  const feedbackInfo = feedbackLevelConfig[feedbackLevel];
  const typeIcon = typeConfig[type];

  return (
    <div className="skeuo-card rounded-[16px] p-6 space-y-4 hover:scale-[1.01] transition-all cursor-pointer" onClick={onViewDetails}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className="text-2xl">{typeIcon}</div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[#8b3123] font-['Montserrat_Alternates:Bold',_sans-serif] text-lg leading-tight truncate">
              {title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">ID: {id}</p>
          </div>
        </div>
        <Badge className={`${priorityConfig[priority]} border-0 font-['Montserrat_Alternates:SemiBold',_sans-serif]`}>
          Priority: {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </Badge>
      </div>

      {/* Pipeline & Stage */}
      <div className="flex items-center gap-2 flex-wrap">
        <Badge className={`${pipeline === "ai" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"} border-0`}>
          {pipeline.toUpperCase()} Pipeline
        </Badge>
        <Badge className={`${stageInfo.color} border-0`}>
          {stageInfo.label}
        </Badge>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Progress</span>
          <span className="text-sm font-['Montserrat_Alternates:SemiBold',_sans-serif] text-[#8b3123]">{progress}%</span>
        </div>
        <div className="skeuo-progress-track rounded-full h-2">
          <div 
            className="skeuo-progress-fill h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Feedback Level */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Feedback Level:</span>
        <Badge className={`${feedbackInfo.color} border-0`}>
          {feedbackInfo.label}
        </Badge>
        <div className="flex gap-1">
          {Array.from({ length: 6 }, (_, i) => (
            <div 
              key={i}
              className={`w-2 h-2 rounded-full ${
                i < feedbackInfo.intensity ? "bg-[#8b3123]" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Owner/Contributors & Meta Info */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {pipeline === "human" && owner ? (
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={ownerAvatar} />
                <AvatarFallback className="text-xs bg-[rgba(139,49,35,0.1)] text-[#8b3123]">
                  {owner.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-600">Owner: {owner}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <User className="h-4 w-4 text-gray-400" />
              <div className="flex items-center gap-1 flex-wrap">
                <span className="text-xs text-gray-500">Feedback from:</span>
                {feedbackContributors.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {feedbackContributors.slice(0, 3).map((contributor, idx) => (
                      <Badge key={idx} className="text-xs px-2 py-0 bg-blue-50 text-blue-700 border-0">
                        {contributor}
                      </Badge>
                    ))}
                    {feedbackContributors.length > 3 && (
                      <Badge className="text-xs px-2 py-0 bg-gray-50 text-gray-600 border-0">
                        +{feedbackContributors.length - 3}
                      </Badge>
                    )}
                  </div>
                ) : (
                  <span className="text-xs text-gray-400">No feedback yet</span>
                )}
              </div>
            </div>
          )}
        </div>
        
        {dueDate && (
          <div className="flex items-center gap-1 text-sm text-gray-500 ml-2">
            <Clock className="h-3 w-3" />
            {dueDate}
          </div>
        )}
      </div>

      {/* Star Rating for AI Pipeline */}
      {pipeline === "ai" && ratingAvg > 0 && (
        <div className="flex items-center gap-2 pt-2">
          <span className="text-sm text-gray-600">Current Rating:</span>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, i) => {
              const filled = i < Math.floor(ratingAvg);
              const partial = i === Math.floor(ratingAvg) && ratingAvg % 1 !== 0;
              return (
                <div key={i} className="relative">
                  <div className={`w-4 h-4 ${filled ? 'text-[#8b3123]' : 'text-gray-300'}`}>
                    ⭐
                  </div>
                  {partial && (
                    <div 
                      className="absolute inset-0 overflow-hidden text-[#8b3123]"
                      style={{ width: `${(ratingAvg % 1) * 100}%` }}
                    >
                      ⭐
                    </div>
                  )}
                </div>
              );
            })}
            <span className="text-sm font-semibold text-[#8b3123] ml-1">
              {ratingAvg.toFixed(1)}
            </span>
          </div>
        </div>
      )}

      {/* Pipeline Actions */}
      <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
        {pipeline === "ai" && (
          <>
            <Button 
              size="sm" 
              variant="outline" 
              className="skeuo-button text-xs flex items-center gap-1"
              onClick={(e) => { e.stopPropagation(); onVote?.(); }}
            >
              <Vote className="h-3 w-3" />
              Vote on Options ({generationOptions})
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="skeuo-button text-xs flex items-center gap-1"
              onClick={(e) => { e.stopPropagation(); onRate?.(); }}
            >
              <BarChart3 className="h-3 w-3" />
              Rate Selected
            </Button>
          </>
        )}
        <Button 
          size="sm" 
          variant="outline" 
          className="skeuo-button text-xs flex items-center gap-1"
          onClick={(e) => { e.stopPropagation(); onFeedback?.(); }}
        >
          <MessageSquare className="h-3 w-3" />
          RLHF Feedback ({feedbackCount})
        </Button>
      </div>
    </div>
  );
}