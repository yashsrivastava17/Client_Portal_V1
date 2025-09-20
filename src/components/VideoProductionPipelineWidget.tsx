import { useState } from "react";
import { CollapsibleSection } from "./CollapsibleSection";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Video, Clock, User, Calendar, ChevronRight, Play, Pause, Edit, Eye, CheckCircle, LayoutGrid, GitBranch, Star, MessageSquare, Plus } from "lucide-react";
import { Textarea } from "./ui/textarea";

interface VideoProject {
  id: string;
  title: string;
  stage: "idea" | "script" | "body-mirroring" | "production" | "review";
  assignee: string;
  dueDate: string;
  progress: number;
  priority: "low" | "medium" | "high";
  thumbnail?: string;
  description: string;
  duration?: string;
  lastUpdated: string;
}

const mockVideoProjects: VideoProject[] = [
  {
    id: "1",
    title: "Holiday Campaign Hero Video",
    stage: "review",
    assignee: "Sarah M.",
    dueDate: "2024-01-15",
    progress: 95,
    priority: "high",
    description: "Main promotional video for holiday campaign featuring product showcase",
    duration: "1:30",
    lastUpdated: "2024-01-10"
  },
  {
    id: "2",
    title: "Product Demo - Feature Overview",
    stage: "production",
    assignee: "Alex K.",
    dueDate: "2024-01-18",
    progress: 65,
    priority: "high",
    description: "Detailed walkthrough of new product features and benefits",
    duration: "2:15",
    lastUpdated: "2024-01-09"
  },
  {
    id: "3",
    title: "Customer Testimonial Series",
    stage: "body-mirroring",
    assignee: "Jordan L.",
    dueDate: "2024-01-22",
    progress: 40,
    priority: "medium",
    description: "Series of customer success stories and testimonials",
    duration: "0:45",
    lastUpdated: "2024-01-08"
  },
  {
    id: "4",
    title: "Behind the Scenes Content",
    stage: "script",
    assignee: "Morgan T.",
    dueDate: "2024-01-25",
    progress: 25,
    priority: "low",
    description: "Behind the scenes look at company culture and team dynamics",
    duration: "3:00",
    lastUpdated: "2024-01-07"
  },
  {
    id: "5",
    title: "Q1 Strategy Explainer",
    stage: "idea",
    assignee: "Casey R.",
    dueDate: "2024-02-01",
    progress: 10,
    priority: "medium",
    description: "Animated explainer video for Q1 strategy and goals",
    duration: "1:45",
    lastUpdated: "2024-01-05"
  }
];

const stageConfig = {
  idea: { 
    color: "bg-gray-100 text-gray-700 border-gray-200", 
    label: "Idea",
    icon: <Edit className="h-3 w-3" />,
    description: "Concept development and planning"
  },
  script: { 
    color: "bg-yellow-100 text-yellow-700 border-yellow-200", 
    label: "Script",
    icon: <Edit className="h-3 w-3" />,
    description: "Script writing and storyboarding"
  },
  "body-mirroring": { 
    color: "bg-orange-100 text-orange-700 border-orange-200", 
    label: "Body Mirroring",
    icon: <User className="h-3 w-3" />,
    description: "Performance and motion capture"
  },
  production: { 
    color: "bg-blue-100 text-blue-700 border-blue-200", 
    label: "Production",
    icon: <Video className="h-3 w-3" />,
    description: "Video production and editing"
  },
  review: { 
    color: "bg-purple-100 text-purple-700 border-purple-200", 
    label: "Review",
    icon: <Eye className="h-3 w-3" />,
    description: "Final review and approval"
  }
};

const priorityConfig = {
  low: { color: "bg-gray-100 text-gray-700 border-gray-200" },
  medium: { color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  high: { color: "bg-red-100 text-red-700 border-red-200" }
};

const stages = ["idea", "script", "body-mirroring", "production", "review"] as const;

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  interactive?: boolean;
  size?: "sm" | "md";
}

function StarRating({ rating, onRatingChange, interactive = false, size = "md" }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const iconSize = size === "sm" ? "h-3 w-3" : "h-4 w-4";
  
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onMouseEnter={() => interactive && setHoverRating(star)}
          onMouseLeave={() => interactive && setHoverRating(0)}
          onClick={() => interactive && onRatingChange?.(star)}
          className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
        >
          <Star 
            className={`${iconSize} ${
              star <= (hoverRating || rating)
                ? 'fill-[#8b3123] text-[#8b3123]' 
                : 'text-gray-300'
            }`}
          />
        </button>
      ))}
      {interactive && (
        <span className="text-[#8b3123] text-[12px] font-['Montserrat_Alternates:Medium',_sans-serif] ml-2">
          {(hoverRating || rating).toFixed(1)}
        </span>
      )}
    </div>
  );
}

export function VideoProductionPipelineWidget() {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"pipeline" | "kanban">("pipeline");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

  const getProjectsByStage = (stage: string) => {
    return mockVideoProjects.filter(project => project.stage === stage);
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <CollapsibleSection 
      title="Video Production Pipeline" 
      icon={<Video className="h-5 w-5" />}
    >
      <div className="space-y-6">
        {/* Pipeline Overview */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Play className="h-4 w-4 text-[#8b3123]" />
              <h3 className="text-[#8b3123] text-[18px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
                Production Status
              </h3>
            </div>
            
            {/* View Toggle */}
            <div className="flex items-center gap-1 skeuo-card rounded-[8px] p-1">
              <button
                onClick={() => setViewMode("pipeline")}
                className={`flex items-center gap-1 px-3 py-1 rounded-[6px] text-[12px] transition-all ${
                  viewMode === "pipeline" 
                    ? 'skeuo-button-primary text-white' 
                    : 'text-[#8b3123] hover:bg-gray-50'
                }`}
              >
                <GitBranch className="h-3 w-3" />
                Pipeline
              </button>
              <button
                onClick={() => setViewMode("kanban")}
                className={`flex items-center gap-1 px-3 py-1 rounded-[6px] text-[12px] transition-all ${
                  viewMode === "kanban" 
                    ? 'skeuo-button-primary text-white' 
                    : 'text-[#8b3123] hover:bg-gray-50'
                }`}
              >
                <LayoutGrid className="h-3 w-3" />
                Kanban
              </button>
            </div>
          </div>
          
          <Button 
            size="sm"
            className="skeuo-button-primary text-[12px] px-3"
          >
            <Plus className="h-3 w-3 mr-1" />
            New Project
          </Button>
        </div>

        {/* Pipeline View */}
        {viewMode === "pipeline" && (
          <div className="relative">
            {/* Pipeline Flow */}
            <div className="flex items-center justify-between mb-8 relative">
              {stages.map((stage, index) => (
                <div key={stage} className="flex flex-col items-center relative">
                  {/* Stage Circle */}
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                      selectedStage === stage
                        ? 'skeuo-button-primary text-white scale-110'
                        : 'skeuo-button text-[#8b3123]'
                    }`}
                    onClick={() => setSelectedStage(selectedStage === stage ? null : stage)}
                  >
                    {stageConfig[stage].icon}
                  </div>
                  
                  {/* Stage Label */}
                  <div className="mt-2 text-center">
                    <div className="text-[#8b3123] text-[12px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
                      {stageConfig[stage].label}
                    </div>
                    <div className="text-[#8b3123] text-[10px] opacity-60">
                      {getProjectsByStage(stage).length} projects
                    </div>
                  </div>

                  {/* Connection Line */}
                  {index < stages.length - 1 && (
                    <div className="absolute top-6 left-12 w-full h-0.5 bg-[rgba(139,49,35,0.2)] -z-10" 
                         style={{ width: 'calc(100vw / 5 - 48px)' }} />
                  )}
                </div>
              ))}
            </div>

            {/* Stage Details */}
            {selectedStage && (
              <div className="mb-8 skeuo-card rounded-[16px] p-4">
                <div className="flex items-center gap-2 mb-2">
                  {stageConfig[selectedStage as keyof typeof stageConfig].icon}
                  <h4 className="text-[#8b3123] text-[14px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
                    {stageConfig[selectedStage as keyof typeof stageConfig].label} Stage
                  </h4>
                </div>
                <p className="text-[#8b3123] text-[12px] opacity-70">
                  {stageConfig[selectedStage as keyof typeof stageConfig].description}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Kanban View */}
        {viewMode === "kanban" && (
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {stages.map((stage) => (
                <div key={stage} className="skeuo-card rounded-[16px] p-4">
                  <div className="flex items-center gap-2 mb-4">
                    {stageConfig[stage].icon}
                    <h4 className="text-[#8b3123] text-[14px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
                      {stageConfig[stage].label}
                    </h4>
                    <div className="ml-auto text-[#8b3123] text-[12px] opacity-60">
                      {getProjectsByStage(stage).length}
                    </div>
                  </div>
                  
                  <div className="space-y-3 min-h-[300px]">
                    {getProjectsByStage(stage).map((project) => (
                      <div 
                        key={project.id}
                        className="skeuo-card rounded-[12px] p-3 cursor-pointer hover:scale-[1.02] transition-transform"
                        onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
                      >
                        <h5 className="text-[#8b3123] text-[13px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-2">
                          {project.title}
                        </h5>
                        
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={`text-[9px] px-2 py-1 ${priorityConfig[project.priority].color}`}>
                            {project.priority}
                          </Badge>
                          <div className="text-[#8b3123] text-[10px] opacity-60">
                            {project.progress}%
                          </div>
                        </div>

                        <div className="skeuo-progress-track rounded-full h-1.5 mb-2">
                          <div 
                            className="skeuo-progress-fill h-full rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-[#8b3123] opacity-60">
                          <span>{project.assignee}</span>
                          <span>{project.duration}</span>
                        </div>

                        {selectedProject === project.id && (
                          <div className="mt-3 pt-3 border-t border-[rgba(139,49,35,0.1)] space-y-3">
                            <div>
                              <div className="text-[#8b3123] text-[11px] font-['Montserrat_Alternates:Medium',_sans-serif] mb-1">
                                Rate this project:
                              </div>
                              <StarRating 
                                rating={rating}
                                onRatingChange={setRating}
                                interactive={true}
                                size="sm"
                              />
                            </div>
                            
                            <div>
                              <div className="text-[#8b3123] text-[11px] font-['Montserrat_Alternates:Medium',_sans-serif] mb-1">
                                Feedback:
                              </div>
                              <Textarea
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                placeholder="Share your thoughts..."
                                className="skeuo-input text-[11px] min-h-[50px] resize-none"
                                rows={2}
                              />
                            </div>

                            <Button
                              size="sm"
                              className="skeuo-button-primary w-full text-[10px] py-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log(`Feedback for ${project.id}: ${rating} stars - ${feedback}`);
                                setSelectedProject(null);
                                setRating(0);
                                setFeedback("");
                              }}
                            >
                              <MessageSquare className="h-3 w-3 mr-1" />
                              Submit Feedback
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Project Cards */}
        <div className="space-y-4">
          <h4 className="text-[#8b3123] text-[16px] font-['Montserrat_Alternates:SemiBold',_sans-serif] flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Active Projects
          </h4>

          {mockVideoProjects.map((project) => (
            <div 
              key={project.id}
              className="skeuo-card rounded-[24px] p-5 cursor-pointer hover:scale-[1.01] transition-transform"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Badge className={`text-[10px] px-2 py-1 ${stageConfig[project.stage].color}`}>
                    {stageConfig[project.stage].icon}
                    {stageConfig[project.stage].label}
                  </Badge>
                  <Badge className={`text-[10px] px-2 py-1 ${priorityConfig[project.priority].color}`}>
                    {project.priority}
                  </Badge>
                  {isOverdue(project.dueDate) && (
                    <Badge className="text-[10px] px-2 py-1 bg-red-100 text-red-700 border-red-200">
                      Overdue
                    </Badge>
                  )}
                </div>
                
                <div className="text-right">
                  <div className="text-[#8b3123] text-[12px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
                    Due: {new Date(project.dueDate).toLocaleDateString()}
                  </div>
                  <div className="text-[#8b3123] text-[11px] opacity-60">
                    {project.duration && `${project.duration} • `}Updated {new Date(project.lastUpdated).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="mb-4">
                <h5 className="text-[#8b3123] text-[16px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-2">
                  {project.title}
                </h5>
                <p className="text-[#8b3123] text-[13px] opacity-75 mb-3">
                  {project.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#8b3123] text-[12px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
                      Progress
                    </span>
                    <span className="text-[#8b3123] text-[12px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
                      {project.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-[rgba(139,49,35,0.1)] rounded-full h-2">
                    <div 
                      className="bg-[#8b3123] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                {/* Assignee */}
                <div className="flex items-center gap-1 text-[#8b3123] text-[12px] opacity-70">
                  <User className="h-3 w-3" />
                  <span>Assigned to {project.assignee}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  {project.stage === "production" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-[#8b3123] border-[#8b3123] hover:bg-[rgba(139,49,35,0.1)] text-[12px] px-3 h-7"
                    >
                      <Play className="h-3 w-3 mr-1" />
                      Preview
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[#8b3123] border-[#8b3123] hover:bg-[rgba(139,49,35,0.1)] text-[12px] px-3 h-7"
                  >
                    View Details
                  </Button>
                </div>

                {project.progress === 100 ? (
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white text-[12px] px-3 h-7"
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Complete
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    className="bg-[#8b3123] hover:bg-[#7a2e20] text-[#f3e1b7] text-[12px] px-3 h-7"
                  >
                    <ChevronRight className="h-3 w-3 mr-1" />
                    Next Stage
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pipeline Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-6 border-t border-[rgba(139,49,35,0.1)]">
          {stages.map((stage) => (
            <div key={stage} className="text-center p-3 rounded-[12px] bg-[rgba(139,49,35,0.05)]">
              <div className="text-[#8b3123] text-[18px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-1">
                {getProjectsByStage(stage).length}
              </div>
              <div className="text-[#8b3123] text-[10px] opacity-60">
                {stageConfig[stage].label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </CollapsibleSection>
  );
}