import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { EnhancedStarRating } from "./EnhancedStarRating";
import { 
  Vote, 
  Star, 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  User,
  ChevronRight
} from "lucide-react";

interface FeedbackTask {
  id: string;
  videoTitle: string;
  type: "voting" | "rating" | "feedback" | "personal-selection";
  stage: string;
  priority: "urgent" | "high" | "medium" | "low";
  deadline: string;
  timeRemaining: string;
  isCompleted: boolean;
  isFinalized?: boolean; // For items that won voting
  isPersonalSelection?: boolean; // For items user voted for
  optionCount?: number; // For voting tasks
  currentRating?: number; // For rating tasks
  completionRate?: number; // % of stakeholders who completed
}

interface FeedbackInputHubProps {
  onOpenVoting: (taskId: string) => void;
  onOpenRating: (taskId: string) => void;
  onOpenFeedback: (taskId: string) => void;
}

export function FeedbackInputHub({ 
  onOpenVoting, 
  onOpenRating, 
  onOpenFeedback 
}: FeedbackInputHubProps) {
  const [feedbackRating, setFeedbackRating] = useState<number>(0);

  // Mock feedback tasks data
  const feedbackTasks: FeedbackTask[] = [
    {
      id: "vote-1",
      videoTitle: "Summer Product Launch Video",
      type: "voting",
      stage: "Idea Generation",
      priority: "urgent",
      deadline: "2024-01-15",
      timeRemaining: "4h 23m",
      isCompleted: false,
      optionCount: 3,
      completionRate: 68
    },
    {
      id: "vote-2", 
      videoTitle: "Beach Scene Product Demo Video",
      type: "voting",
      stage: "Scene Generation",
      priority: "high",
      deadline: "2024-01-16",
      timeRemaining: "1d 2h",
      isCompleted: true,
      optionCount: 4,
      completionRate: 100
    },
    {
      id: "rating-1",
      videoTitle: "Tech Benefits Explainer Video",
      type: "rating",
      stage: "Script Generation",
      priority: "urgent",
      deadline: "2024-01-15",
      timeRemaining: "6h 45m",
      isCompleted: false,
      isFinalized: true,
      completionRate: 45
    },
    {
      id: "feedback-1",
      videoTitle: "Corporate Training Video Series",
      type: "feedback",
      stage: "Body Mirroring",
      priority: "medium",
      deadline: "2024-01-17",
      timeRemaining: "2d 8h",
      isCompleted: false,
      isFinalized: true,
      completionRate: 23
    },
    {
      id: "personal-1",
      videoTitle: "Customer Testimonial Compilation",
      type: "personal-selection",
      stage: "Video Prompt",
      priority: "medium",
      deadline: "2024-01-18",
      timeRemaining: "3d 12h",
      isCompleted: false,
      isPersonalSelection: true,
      currentRating: 4.2,
      completionRate: 67
    }
  ];

  const priorityColors = {
    urgent: "bg-red-100 text-red-800 border-red-200",
    high: "bg-orange-100 text-orange-800 border-orange-200", 
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    low: "bg-blue-100 text-blue-800 border-blue-200"
  };

  const typeIcons = {
    voting: Vote,
    rating: Star,
    feedback: MessageSquare,
    "personal-selection": User
  };

  const typeColors = {
    voting: "text-purple-600",
    rating: "text-yellow-600", 
    feedback: "text-blue-600",
    "personal-selection": "text-green-600"
  };

  const activeTasks = feedbackTasks.filter(task => !task.isCompleted);
  const completedTasks = feedbackTasks.filter(task => task.isCompleted);
  const urgentTasks = activeTasks.filter(task => task.priority === "urgent" || task.priority === "high");

  const handleTaskAction = (task: FeedbackTask) => {
    switch (task.type) {
      case "voting":
        onOpenVoting(task.id);
        break;
      case "rating":
        onOpenRating(task.id);
        break;
      case "feedback":
        onOpenFeedback(task.id);
        break;
      case "personal-selection":
        onOpenRating(task.id); // Can rate personal selections
        break;
    }
  };

  const renderTaskCard = (task: FeedbackTask) => {
    const Icon = typeIcons[task.type];
    const iconColor = typeColors[task.type];

    return (
      <div
        key={task.id}
        className={`skeuo-card p-4 rounded-[16px] cursor-pointer hover:scale-[1.02] transition-all ${
          task.isCompleted ? "opacity-60" : ""
        }`}
        onClick={() => !task.isCompleted && handleTaskAction(task)}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Icon className={`h-4 w-4 ${iconColor}`} />
            <Badge className={`border-0 text-xs ${priorityColors[task.priority]}`}>
              Priority: {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </Badge>
            {task.isFinalized && (
              <Badge className="bg-green-100 text-green-800 border-0 text-xs">
                Finalized
              </Badge>
            )}
            {task.isPersonalSelection && (
              <Badge className="bg-blue-100 text-blue-800 border-0 text-xs">
                Your Choice
              </Badge>
            )}
          </div>
          
          {task.isCompleted ? (
            <CheckCircle className="h-4 w-4 text-green-600" />
          ) : (
            <AlertCircle className="h-4 w-4 text-orange-600" />
          )}
        </div>

        <h4 className="text-[#8b3123] font-['Montserrat_Alternates:SemiBold',_sans-serif] text-sm mb-2">
          {task.videoTitle}
        </h4>
        
        <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
          <span>{task.stage}</span>
          <span>•</span>
          <Clock className="h-3 w-3" />
          <span className={task.timeRemaining.includes("h") && !task.timeRemaining.includes("d") ? "text-red-600 font-semibold" : ""}>
            {task.timeRemaining}
          </span>
        </div>

        {/* Task-specific content */}
        {task.type === "voting" && task.optionCount && (
          <div className="text-xs text-gray-600 mb-2">
            Vote on {task.optionCount} generation options
          </div>
        )}

        {task.type === "rating" && (
          <div className="text-xs text-gray-600 mb-2">
            Provide star rating for finalized selection
          </div>
        )}

        {task.type === "feedback" && (
          <div className="text-xs text-gray-600 mb-2">
            Deep textual feedback required
          </div>
        )}

        {task.type === "personal-selection" && task.currentRating && (
          <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
            <span>Current rating:</span>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 text-yellow-500 fill-current" />
              <span className="font-semibold">{task.currentRating}</span>
            </div>
          </div>
        )}

        {/* Completion progress */}
        {task.completionRate !== undefined && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Team Progress</span>
              <span className="font-semibold text-[#8b3123]">{task.completionRate}%</span>
            </div>
            <Progress value={task.completionRate} className="h-2" />
          </div>
        )}

        {!task.isCompleted && (
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
            <span className="text-xs text-gray-500">
              {task.type === "voting" ? "Vote now" : 
               task.type === "rating" ? "Rate now" : 
               task.type === "feedback" ? "Give feedback" :
               "Rate your choice"}
            </span>
            <ChevronRight className="h-3 w-3 text-gray-400" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Urgent Tasks Alert */}
      {urgentTasks.length > 0 && (
        <div className="skeuo-card p-4 rounded-[16px] bg-red-50 border-red-200">
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <h3 className="text-[#8b3123] font-['Montserrat_Alternates:Bold',_sans-serif] text-lg">
              Urgent Tasks Pending
            </h3>
            <Badge className="bg-red-200 text-red-800 border-0">
              {urgentTasks.length} urgent
            </Badge>
          </div>
          <p className="text-red-700 text-sm mb-4">
            These tasks require immediate attention to avoid pipeline delays.
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {urgentTasks.slice(0, 2).map(renderTaskCard)}
          </div>
        </div>
      )}

      {/* Active Voting Section */}
      <div className="skeuo-card p-6 rounded-[16px]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Vote className="h-5 w-5 text-purple-600" />
            <h3 className="text-[#8b3123] font-['Montserrat_Alternates:Bold',_sans-serif] text-lg">
              Active Voting
            </h3>
            <Badge className="bg-purple-100 text-purple-800 border-0">
              {activeTasks.filter(t => t.type === "voting").length} surveys
            </Badge>
          </div>
          <TrendingUp className="h-4 w-4 text-gray-400" />
        </div>
        
        <p className="text-gray-600 text-sm mb-4">
          Shape our AI development through strategic voting. Your decisions guide model advancement and quality standards.
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {activeTasks.filter(task => task.type === "voting").map(renderTaskCard)}
        </div>
      </div>

      {/* RLHF Tasks Section */}
      <div className="skeuo-card p-6 rounded-[16px]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Star className="h-5 w-5 text-yellow-600" />
            <h3 className="text-[#8b3123] font-['Montserrat_Alternates:Bold',_sans-serif] text-lg">
              Stakeholder Feedback (RLHF)
            </h3>
            <Badge className="bg-yellow-100 text-yellow-800 border-0">
              {activeTasks.filter(t => t.type === "rating" || t.type === "feedback").length} tasks
            </Badge>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4">
          Your expertise directly enhances our AI models. Thank you for contributing to building the future of video production together.
        </p>

        <div className="space-y-4">
          {/* Finalized Items */}
          <div className="space-y-3">
            <h4 className="text-[#8b3123] font-['Montserrat_Alternates:SemiBold',_sans-serif] text-sm">
              Finalized Items (Mandatory)
            </h4>
            <div className="grid gap-4 md:grid-cols-2">
              {activeTasks.filter(task => task.isFinalized).map(renderTaskCard)}
            </div>
          </div>

          <Separator />

          {/* Personal Selections */}
          <div className="space-y-3">
            <h4 className="text-[#8b3123] font-['Montserrat_Alternates:SemiBold',_sans-serif] text-sm">
              Your Selections (Optional)
            </h4>
            <div className="grid gap-4 md:grid-cols-2">
              {activeTasks.filter(task => task.isPersonalSelection).map(renderTaskCard)}
            </div>
          </div>
        </div>
      </div>

      {/* Completed Tasks Summary */}
      {completedTasks.length > 0 && (
        <div className="skeuo-card p-4 rounded-[16px] bg-green-50">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <h4 className="text-[#8b3123] font-['Montserrat_Alternates:SemiBold',_sans-serif] text-sm">
              Completed Tasks
            </h4>
            <Badge className="bg-green-200 text-green-800 border-0 text-xs">
              {completedTasks.length} completed
            </Badge>
          </div>
          <p className="text-green-700 text-xs">
            Thank you for your valuable contributions. {completedTasks.length} recent feedback submissions are enhancing our models.
          </p>
        </div>
      )}
    </div>
  );
}