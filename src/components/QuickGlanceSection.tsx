import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { 
  Bell, 
  Vote, 
  TrendingUp, 
  Clock, 
  Users, 
  Star,
  MessageSquare,
  Plus,
  ChevronRight,
  Lightbulb,
  BarChart3,
  Target
} from "lucide-react";

interface QuickGlanceSectionProps {
  onOpenVoting: () => void;
  onOpenMetrics: () => void;
  onOpenFeedback: () => void;
}

export function QuickGlanceSection({ 
  onOpenVoting, 
  onOpenMetrics, 
  onOpenFeedback 
}: QuickGlanceSectionProps) {
  const [quickNote, setQuickNote] = useState("");

  // Mock data for quick metrics
  const metrics = {
    activeVoting: 3,
    pendingFeedback: 7,
    completionRate: 78,
    avgRating: 4.2,
    videosInPipeline: 12,
    urgentTasks: 2
  };

  const handleQuickCapture = () => {
    if (quickNote.trim()) {
      console.log("Quick concept captured:", quickNote);
      setQuickNote("");
      // You would typically save this to state/database
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* New Tasks Banner */}
      <div className="skeuo-card-elevated p-6 rounded-[20px] bg-gradient-to-r from-[#8b3123] to-[#7a2e20] text-white">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="skeuo-card p-3 rounded-full bg-white/20">
              <Bell className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="font-['Montserrat_Alternates:Bold',_sans-serif] text-xl mb-1">
                New Pipeline Tasks Available
              </h2>
              <p className="text-white/90 text-sm">
                {metrics.urgentTasks} urgent voting sessions • {metrics.pendingFeedback} feedback tasks pending
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button 
              onClick={onOpenVoting}
              className="skeuo-button bg-white/20 hover:bg-white/30 border-white/30 text-white"
            >
              <Vote className="h-4 w-4 mr-2" />
              Start Voting
            </Button>
            <Button 
              onClick={onOpenFeedback}
              className="skeuo-button bg-white hover:bg-white/90 text-[#8b3123] border-0"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Give Feedback
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Metrics & Concept Capture */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Quick Metrics */}
        <div className="lg:col-span-2 skeuo-card p-6 rounded-[16px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#8b3123] font-['Montserrat_Alternates:Bold',_sans-serif] text-lg">
              Pipeline Overview
            </h3>
            <Button 
              size="sm"
              variant="outline"
              className="skeuo-button text-xs"
              onClick={onOpenMetrics}
            >
              <BarChart3 className="h-3 w-3 mr-1" />
              Full Metrics
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="skeuo-card p-4 rounded-[12px] text-center">
              <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-full mx-auto mb-2">
                <Vote className="h-4 w-4 text-purple-600" />
              </div>
              <div className="text-xl font-['Montserrat_Alternates:Bold',_sans-serif] text-[#8b3123] mb-1">
                {metrics.activeVoting}
              </div>
              <div className="text-xs text-gray-600">Active Voting</div>
            </div>

            <div className="skeuo-card p-4 rounded-[12px] text-center">
              <div className="flex items-center justify-center w-8 h-8 bg-yellow-100 rounded-full mx-auto mb-2">
                <Star className="h-4 w-4 text-yellow-600" />
              </div>
              <div className="text-xl font-['Montserrat_Alternates:Bold',_sans-serif] text-[#8b3123] mb-1">
                {metrics.avgRating}
              </div>
              <div className="text-xs text-gray-600">Avg Rating</div>
            </div>

            <div className="skeuo-card p-4 rounded-[12px] text-center">
              <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full mx-auto mb-2">
                <Target className="h-4 w-4 text-green-600" />
              </div>
              <div className="text-xl font-['Montserrat_Alternates:Bold',_sans-serif] text-[#8b3123] mb-1">
                {metrics.completionRate}%
              </div>
              <div className="text-xs text-gray-600">Completion</div>
            </div>

            <div className="skeuo-card p-4 rounded-[12px] text-center">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mx-auto mb-2">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <div className="text-xl font-['Montserrat_Alternates:Bold',_sans-serif] text-[#8b3123] mb-1">
                {metrics.videosInPipeline}
              </div>
              <div className="text-xs text-gray-600">Videos</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
            <Button 
              size="sm"
              variant="outline"
              className="skeuo-button text-xs flex-1"
              onClick={onOpenVoting}
            >
              <Clock className="h-3 w-3 mr-1" />
              Urgent Tasks ({metrics.urgentTasks})
            </Button>
            <Button 
              size="sm"
              variant="outline"
              className="skeuo-button text-xs flex-1"
              onClick={onOpenFeedback}
            >
              <TrendingUp className="h-3 w-3 mr-1" />
              Pending ({metrics.pendingFeedback})
            </Button>
          </div>
        </div>

        {/* Quick Concept Capture */}
        <div className="skeuo-card p-6 rounded-[16px]">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="h-5 w-5 text-yellow-600" />
            <h3 className="text-[#8b3123] font-['Montserrat_Alternates:Bold',_sans-serif] text-lg">
              Quick Capture
            </h3>
          </div>
          
          <p className="text-gray-600 text-sm mb-4">
            Jot down video ideas or concepts quickly. We'll help develop them later.
          </p>
          
          <div className="space-y-3">
            <Textarea
              placeholder="Enter your video concept or idea..."
              value={quickNote}
              onChange={(e) => setQuickNote(e.target.value)}
              className="skeuo-input min-h-[80px] text-sm resize-none"
            />
            
            <Button 
              onClick={handleQuickCapture}
              disabled={!quickNote.trim()}
              className="skeuo-button-primary w-full text-sm"
            >
              <Plus className="h-3 w-3 mr-2" />
              Capture Concept
            </Button>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <Button 
              size="sm"
              variant="outline"
              className="skeuo-button text-xs w-full"
            >
              <ChevronRight className="h-3 w-3 mr-1" />
              View All Concepts
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}