import { useState } from "react";
import { TopNavigation } from "./components/TopNavigation";
import { CollapsibleSection } from "./components/CollapsibleSection";
import { ContentTicket } from "./components/ContentTicket";
import { ServiceTicket } from "./components/ServiceTicket";
import { PipelineVotingModal } from "./components/PipelineVotingModal";
import { PipelineViewToggle } from "./components/PipelineViewToggle";
import { TimelineView } from "./components/TimelineView";
import { KanbanView } from "./components/KanbanView";
import { FeedbackInputHub } from "./components/FeedbackInputHub";
import { EchoCarousel } from "./components/EchoCarousel";
import { ConceptCaptureSection } from "./components/ConceptCaptureSection";
import { ConceptFeed } from "./components/ConceptFeed";
import { ServiceRequestsSection } from "./components/ServiceRequestsSection";
import { EchoBentoGrid } from "./components/EchoBentoGrid";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { EnhancedRequestModal } from "./components/EnhancedRequestModal";
import { 
  Workflow, 
  Bot, 
  Users, 
  MessageSquare, 
  BarChart3, 
  Plus,
  Filter,
  Search,
  Settings,
  Lightbulb
} from "lucide-react";

interface ContentItem {
  id: string;
  title: string;
  type: "video" | "script" | "idea" | "scene" | "prompt" | "image";
  stage: "idea-generation" | "scene-generation" | "script-generation" | "video-prompt" | "remix-image" | "data-ready" | "body-mirroring" | "generation" | "video-editing" | "completed";
  feedbackLevel: "very-low" | "low" | "medium-low" | "medium-high" | "high" | "very-high";
  owner?: string; // For human pipeline
  ownerAvatar?: string;
  feedbackContributors?: string[]; // For AI pipeline
  progress: number;
  priority: "low" | "medium" | "high" | "urgent";
  pipeline: "ai" | "human";
  voteCount?: number;
  ratingAvg?: number;
  feedbackCount?: number;
  dueDate?: string;
  generationOptions?: number;
  content?: string;
  imageUrl?: string;
  version: number;
}

interface ServiceRequest {
  id: string;
  title: string;
  description: string;
  type: "bug-report" | "feature-request" | "content-change" | "technical-support" | "consultation" | "other";
  status: "open" | "in-progress" | "pending-review" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  client: string;
  clientAvatar?: string;
  assignee?: string;
  assigneeAvatar?: string;
  createdDate: string;
  lastUpdated?: string;
  responseTime?: string;
  commentCount?: number;
}

interface EchoPageProps {
  onPageChange?: (page: "design" | "echo" | "calendar" | "labs") => void;
  viewMode?: "bento" | "list";
  onViewModeChange?: (mode: "bento" | "list") => void;
}

export default function EchoPage({ onPageChange, viewMode = "list", onViewModeChange }: EchoPageProps) {
  const [isVotingModalOpen, setIsVotingModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [selectedContentItem, setSelectedContentItem] = useState<ContentItem | null>(null);
  const [selectedRequestType, setSelectedRequestType] = useState<"design-change" | "user-research" | "dev-handoff" | "content-update" | "report-user-pattern" | undefined>();
  const [filterPipeline, setFilterPipeline] = useState<"all" | "ai" | "human">("all");
  const [filterStage, setFilterStage] = useState<string>("all");
  const [pipelineView, setPipelineView] = useState<"timeline" | "kanban" | "cards">("cards");

  // Mock data for content tickets (AI Pipeline) - All are video names
  const aiPipelineContent: ContentItem[] = [
    {
      id: "AI-001",
      title: "Summer Product Launch Video",
      type: "video",
      stage: "idea-generation",
      feedbackLevel: "high",
      feedbackContributors: ["Sarah Chen", "Mike R.", "Alex K.", "Jenny L."],
      progress: 85,
      priority: "high",
      pipeline: "ai",
      voteCount: 12,
      ratingAvg: 4.2,
      feedbackCount: 8,
      dueDate: "2024-01-15",
      generationOptions: 3,
      version: 3
    },
    {
      id: "AI-002", 
      title: "Beach Scene Product Demo Video",
      type: "video",
      stage: "scene-generation",
      feedbackLevel: "medium-high",
      feedbackContributors: ["Mike R.", "Lisa T.", "David P."],
      progress: 65,
      priority: "medium",
      pipeline: "ai",
      voteCount: 8,
      ratingAvg: 3.8,
      feedbackCount: 5,
      dueDate: "2024-01-18",
      generationOptions: 4,
      version: 2
    },
    {
      id: "AI-003",
      title: "Tech Benefits Explainer Video",
      type: "video", 
      stage: "script-generation",
      feedbackLevel: "very-high",
      feedbackContributors: ["Sarah Chen", "Alex K.", "Jenny L.", "Tom W.", "Maria S."],
      progress: 90,
      priority: "urgent",
      pipeline: "ai",
      voteCount: 15,
      ratingAvg: 4.6,
      feedbackCount: 12,
      dueDate: "2024-01-12",
      generationOptions: 2,
      version: 4
    },
    {
      id: "AI-004",
      title: "Customer Testimonial Compilation",
      type: "video",
      stage: "video-prompt",
      feedbackLevel: "medium-low",
      feedbackContributors: ["Lisa T.", "David P."],
      progress: 40,
      priority: "medium",
      pipeline: "ai",
      voteCount: 5,
      ratingAvg: 3.2,
      feedbackCount: 3,
      dueDate: "2024-01-22",
      generationOptions: 5,
      version: 1
    }
  ];

  // Mock data for content tickets (Human Pipeline) - All are video names
  const humanPipelineContent: ContentItem[] = [
    {
      id: "HM-001",
      title: "Corporate Training Video Series",
      type: "video",
      stage: "body-mirroring",
      feedbackLevel: "medium-low",
      owner: "Sarah Chen",
      ownerAvatar: "https://github.com/shadcn.png",
      progress: 45,
      priority: "medium",
      pipeline: "human",
      feedbackCount: 3,
      dueDate: "2024-01-20",
      version: 1
    },
    {
      id: "HM-002",
      title: "Product Launch Announcement Video",
      type: "video",
      stage: "video-editing", 
      feedbackLevel: "high",
      owner: "Mike Rodriguez",
      progress: 75,
      priority: "high",
      pipeline: "human",
      feedbackCount: 7,
      dueDate: "2024-01-16",
      version: 2
    }
  ];

  const handleOpenVoting = (item?: ContentItem | string) => {
    if (typeof item === "string") {
      console.log("Opening voting for task:", item);
      setIsVotingModalOpen(true);
    } else if (item) {
      setSelectedContentItem(item);
      setIsVotingModalOpen(true);
    } else {
      setIsVotingModalOpen(true);
    }
  };

  const handleOpenRating = (taskId: string) => {
    console.log("Opening rating for task:", taskId);
    setIsVotingModalOpen(true);
  };

  const handleOpenFeedback = (taskId?: string) => {
    if (taskId) {
      console.log("Opening feedback for task:", taskId);
    }
    setIsVotingModalOpen(true);
  };

  const handleOpenMetrics = () => {
    console.log("Opening metrics dashboard...");
  };

  const handleViewPipeline = (conceptId: string) => {
    console.log("Viewing pipeline for concept:", conceptId);
  };

  const handleOpenRequest = (type?: "design-change" | "user-research" | "dev-handoff" | "content-update" | "report-user-pattern") => {
    setSelectedRequestType(type);
    setIsRequestModalOpen(true);
  };

  const filteredAIContent = aiPipelineContent.filter(item => 
    filterPipeline === "all" || filterPipeline === "ai"
  ).filter(item =>
    filterStage === "all" || item.stage === filterStage
  );

  const filteredHumanContent = humanPipelineContent.filter(item => 
    filterPipeline === "all" || filterPipeline === "human"
  ).filter(item =>
    filterStage === "all" || item.stage === filterStage
  );

  return (
    <div className="bg-gradient-to-br from-[#ffffff] via-[#fafbfc] to-[#f5f7fa] min-h-screen overflow-x-hidden relative">
      {/* Enhanced Multi-element Floating Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Large primary elements */}
        <div className="absolute animate-float-1" style={{
          left: '5%', top: '25%', width: '300px', height: '320px'
        }}>
          <div className="w-full h-full bg-gradient-to-br from-[#8B3123] to-[#7a2e20] opacity-[0.03] rounded-[40%] blur-[20px]" />
        </div>
        
        <div className="absolute animate-float-2" style={{
          right: '8%', top: '10%', width: '280px', height: '300px'
        }}>
          <div className="w-full h-full bg-gradient-to-br from-[#8B3123] to-[#7a2e20] opacity-[0.04] rounded-[60%] blur-[25px]" />
        </div>

        <div className="absolute animate-float-3" style={{
          left: '50%', bottom: '15%', width: '350px', height: '380px'
        }}>
          <div className="w-full h-full bg-gradient-to-br from-[#8B3123] to-[#7a2e20] opacity-[0.02] rounded-[45%] blur-[30px]" />
        </div>

        {/* Medium floating elements */}
        <div className="absolute animate-float-4" style={{
          left: '20%', top: '5%', width: '180px', height: '200px', animationDelay: '-5s'
        }}>
          <div className="w-full h-full bg-gradient-to-br from-[#8B3123] to-[#7a2e20] opacity-[0.05] rounded-[50%] blur-[15px]" />
        </div>

        <div className="absolute animate-float-1" style={{
          right: '25%', bottom: '35%', width: '200px', height: '220px', animationDelay: '-12s'
        }}>
          <div className="w-full h-full bg-gradient-to-br from-[#8B3123] to-[#7a2e20] opacity-[0.04] rounded-[35%] blur-[18px]" />
        </div>

        <div className="absolute animate-float-2" style={{
          left: '70%', top: '40%', width: '160px', height: '180px', animationDelay: '-8s'
        }}>
          <div className="w-full h-full bg-gradient-to-br from-[#8B3123] to-[#7a2e20] opacity-[0.06] rounded-[55%] blur-[12px]" />
        </div>
      </div>

      {/* Main Content - Responsive layout */}
      <div className="relative z-10 min-h-screen px-4 lg:px-8 py-6">
        <div className="max-w-[1480px] mx-auto w-full space-y-6 lg:space-y-8">
          {/* Top Navigation */}
          <TopNavigation 
            currentPage="echo" 
            onPageChange={onPageChange || (() => {})}
            viewMode={viewMode}
            onViewModeChange={onViewModeChange}
          />

          {/* Conditional Content Based on View Mode */}
          {viewMode === "bento" ? (
            <EchoBentoGrid
              onViewPipeline={handleViewPipeline}
              onOpenVoting={handleOpenVoting}
              onOpenRating={handleOpenRating}
              onOpenFeedback={handleOpenFeedback}
              onOpenRequest={handleOpenRequest}
              onOpenMetrics={handleOpenMetrics}
              filteredAIContent={filteredAIContent}
              filteredHumanContent={filteredHumanContent}
              pipelineView={pipelineView}
              onPipelineViewChange={setPipelineView}
            />
          ) : (
            <>
              {/* Echo Carousel */}
              <EchoCarousel
                onOpenVoting={() => handleOpenVoting()}
                onOpenMetrics={handleOpenMetrics}
                onOpenFeedback={() => handleOpenFeedback()}
              />

              {/* Feedback Input Hub - High Priority Section */}
              <CollapsibleSection
                title="🔥 Stakeholder Feedback Hub"
                icon={<BarChart3 className="h-5 w-5" />}
                badge="Priority Tasks"
                defaultOpen={true}
              >
                <FeedbackInputHub
                  onOpenVoting={handleOpenVoting}
                  onOpenRating={handleOpenRating}
                  onOpenFeedback={handleOpenFeedback}
                />
              </CollapsibleSection>

              {/* Concept Capture Section */}
              <CollapsibleSection
                title="Your Ideas"
                icon={<Lightbulb className="h-5 w-5" />}
                badge="Personal Concepts"
                defaultOpen={true}
              >
                <ConceptCaptureSection onViewPipeline={handleViewPipeline} />
              </CollapsibleSection>

              {/* Concept Feed Section */}
              <CollapsibleSection
                title="Stakeholder Concept Feed"
                icon={<Workflow className="h-5 w-5" />}
                badge="All Ideas"
                defaultOpen={false}
              >
                <ConceptFeed onViewPipeline={handleViewPipeline} />
              </CollapsibleSection>

              {/* Service Requests Section */}
              <CollapsibleSection
                title="Service Requests & Support"
                icon={<MessageSquare className="h-5 w-5" />}
                badge="Your Requests"
                defaultOpen={false}
              >
                <ServiceRequestsSection onOpenRequest={handleOpenRequest} />
              </CollapsibleSection>
            </>
          )}
        </div>
      </div>

      {/* Modal Components */}
      <PipelineVotingModal
        isOpen={isVotingModalOpen}
        onClose={() => setIsVotingModalOpen(false)}
        item={selectedContentItem}
      />

      <EnhancedRequestModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        requestType={selectedRequestType}
      />
    </div>
  );
}