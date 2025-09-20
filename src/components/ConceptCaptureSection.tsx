import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { 
  Lightbulb, 
  Plus, 
  User, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  Workflow,
  Bot,
  Users as UsersIcon,
  MessageSquare,
  Star
} from "lucide-react";

interface Concept {
  id: string;
  title: string;
  description: string;
  author: string;
  authorAvatar?: string;
  createdAt: string;
  status: "pending" | "in-pipeline" | "completed" | "rejected";
  pipelineStage?: "idea-generation" | "scene-generation" | "script-generation" | "video-prompt" | "video-editing";
  pipelineType?: "ai" | "human";
  videoTitle?: string; // If it became a video
  upvotes: number;
  hasUserUpvoted: boolean;
  tags: string[];
  aiSuggestions?: string[];
}

interface ConceptCaptureSectionProps {
  onViewPipeline?: (conceptId: string) => void;
}

export function ConceptCaptureSection({ onViewPipeline }: ConceptCaptureSectionProps) {
  const [newConcept, setNewConcept] = useState("");
  const [concepts, setConcepts] = useState<Concept[]>([
    {
      id: "concept-1",
      title: "AI-Powered Customer Journey Visualization",
      description: "Create an interactive video showing how AI helps customers from first touch to conversion, with real data visualizations and smooth animations.",
      author: "You",
      createdAt: "2024-01-12",
      status: "in-pipeline",
      pipelineStage: "script-generation",
      pipelineType: "ai",
      videoTitle: "Tech Benefits Explainer Video",
      upvotes: 12,
      hasUserUpvoted: true,
      tags: ["AI", "Customer Journey", "Data Viz"],
      aiSuggestions: ["Add testimonials", "Include ROI metrics", "Show before/after scenarios"]
    },
    {
      id: "concept-3",
      title: "Interactive Product Demo with AR Elements",
      description: "Showcase our product with augmented reality overlays that let viewers interact with features in real-time. Perfect for mobile viewing.",
      author: "You",
      createdAt: "2024-01-14",
      status: "pending",
      upvotes: 15,
      hasUserUpvoted: true,
      tags: ["AR", "Interactive", "Product Demo"],
      aiSuggestions: ["Use 3D animations", "Add click hotspots", "Include feature callouts"]
    },
    {
      id: "concept-4",
      title: "Customer Success Stories Compilation",
      description: "Short, punchy compilation of customer wins and success metrics. Focus on emotional impact and measurable results.",
      author: "You",
      createdAt: "2024-01-13",
      status: "completed",
      videoTitle: "Customer Testimonial Compilation",
      upvotes: 6,
      hasUserUpvoted: false,
      tags: ["Testimonials", "Success", "Results"]
    }
  ]);

  const statusConfig = {
    pending: { 
      label: "Pending Review", 
      color: "bg-yellow-100 text-yellow-800", 
      icon: Clock 
    },
    "in-pipeline": { 
      label: "In Pipeline", 
      color: "bg-blue-100 text-blue-800", 
      icon: Workflow 
    },
    completed: { 
      label: "Completed", 
      color: "bg-green-100 text-green-800", 
      icon: CheckCircle 
    },
    rejected: { 
      label: "Not Selected", 
      color: "bg-gray-100 text-gray-600", 
      icon: MessageSquare 
    }
  };

  const stageConfig = {
    "idea-generation": "Idea Generation",
    "scene-generation": "Scene Generation", 
    "script-generation": "Script Generation",
    "video-prompt": "Video Prompt",
    "video-editing": "Video Editing"
  };

  const handleSubmitConcept = () => {
    if (!newConcept.trim()) return;

    const concept: Concept = {
      id: `concept-${Date.now()}`,
      title: newConcept.split('\n')[0] || "New Concept",
      description: newConcept,
      author: "You",
      createdAt: new Date().toISOString().split('T')[0],
      status: "pending",
      upvotes: 0,
      hasUserUpvoted: false,
      tags: []
    };

    setConcepts(prev => [concept, ...prev]);
    setNewConcept("");
  };

  const handleUpvote = (conceptId: string) => {
    setConcepts(prev => prev.map(concept => 
      concept.id === conceptId 
        ? { 
            ...concept, 
            upvotes: concept.hasUserUpvoted ? concept.upvotes - 1 : concept.upvotes + 1,
            hasUserUpvoted: !concept.hasUserUpvoted 
          }
        : concept
    ));
  };

  const pendingConcepts = concepts.filter(c => c.status === "pending");
  const inPipelineConcepts = concepts.filter(c => c.status === "in-pipeline");
  const completedConcepts = concepts.filter(c => c.status === "completed");

  return (
    <div className="space-y-6">
      {/* Concept Input */}
      <div className="skeuo-card p-6 rounded-[16px]">
        <div className="flex items-center gap-3 mb-4">
          <Lightbulb className="h-6 w-6 text-yellow-600" />
          <h2 className="text-[#8b3123] font-['Montserrat_Alternates:Bold',_sans-serif] text-xl">
            Concept Capture Studio
          </h2>
        </div>
        
        <p className="text-gray-600 mb-6">
          Share your strategic video concepts. Our AI will develop them with stakeholder input, and your fellow executives will evaluate which ones advance to production.
        </p>

        <div className="space-y-4">
          <Textarea
            placeholder="Describe your video concept in detail...

Example:
Title: Interactive Product Demo
Description: Create a video showcasing our new features with clickable hotspots and animations. Target audience: potential customers. Goal: increase trial signups by 25%."
            value={newConcept}
            onChange={(e) => setNewConcept(e.target.value)}
            className="skeuo-input min-h-[120px] text-sm"
          />
          
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">
              {newConcept.length}/500 characters
            </span>
            <Button 
              onClick={handleSubmitConcept}
              disabled={!newConcept.trim() || newConcept.length > 500}
              className="skeuo-button-primary"
            >
              <Plus className="h-4 w-4 mr-2" />
              Submit Concept
            </Button>
          </div>
        </div>
      </div>

      {/* Concept Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="skeuo-card p-4 rounded-[12px] text-center">
          <div className="text-2xl font-['Montserrat_Alternates:Bold',_sans-serif] text-[#8b3123] mb-1">
            {pendingConcepts.length}
          </div>
          <div className="text-sm text-gray-600">Pending Review</div>
        </div>
        
        <div className="skeuo-card p-4 rounded-[12px] text-center">
          <div className="text-2xl font-['Montserrat_Alternates:Bold',_sans-serif] text-[#8b3123] mb-1">
            {inPipelineConcepts.length}
          </div>
          <div className="text-sm text-gray-600">In Pipeline</div>
        </div>
        
        <div className="skeuo-card p-4 rounded-[12px] text-center">
          <div className="text-2xl font-['Montserrat_Alternates:Bold',_sans-serif] text-[#8b3123] mb-1">
            {completedConcepts.length}
          </div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        
        <div className="skeuo-card p-4 rounded-[12px] text-center">
          <div className="text-2xl font-['Montserrat_Alternates:Bold',_sans-serif] text-[#8b3123] mb-1">
            {concepts.reduce((sum, c) => sum + c.upvotes, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Upvotes</div>
        </div>
      </div>

      {/* Concept Cards */}
      <div className="space-y-6">
        {/* In Pipeline */}
        {inPipelineConcepts.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-[#8b3123] font-['Montserrat_Alternates:Bold',_sans-serif] text-lg flex items-center gap-2">
              <Workflow className="h-5 w-5 text-blue-600" />
              In Production Pipeline ({inPipelineConcepts.length})
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {inPipelineConcepts.map((concept) => {
                const StatusIcon = statusConfig[concept.status].icon;
                return (
                  <div key={concept.id} className="skeuo-card p-5 rounded-[16px] hover:scale-[1.02] transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge className={`${statusConfig[concept.status].color} border-0 text-xs`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusConfig[concept.status].label}
                        </Badge>
                        {concept.pipelineType && (
                          <Badge className={`border-0 text-xs ${
                            concept.pipelineType === "ai" 
                              ? "bg-purple-100 text-purple-800" 
                              : "bg-blue-100 text-blue-800"
                          }`}>
                            {concept.pipelineType === "ai" ? <Bot className="h-3 w-3 mr-1" /> : <UsersIcon className="h-3 w-3 mr-1" />}
                            {concept.pipelineType.toUpperCase()}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        {concept.createdAt}
                      </div>
                    </div>

                    <h4 className="text-[#8b3123] font-['Montserrat_Alternates:SemiBold',_sans-serif] mb-2">
                      {concept.title}
                    </h4>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {concept.description}
                    </p>

                    {/* Pipeline Status */}
                    {concept.videoTitle && (
                      <div className="skeuo-card p-3 rounded-[12px] bg-blue-50 mb-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-xs text-blue-600 font-semibold mb-1">
                              Now in pipeline as:
                            </div>
                            <div className="text-sm text-[#8b3123] font-medium">
                              {concept.videoTitle}
                            </div>
                            {concept.pipelineStage && (
                              <div className="text-xs text-gray-600">
                                Current: {stageConfig[concept.pipelineStage]}
                              </div>
                            )}
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="skeuo-button text-xs"
                            onClick={() => onViewPipeline?.(concept.id)}
                          >
                            <ArrowRight className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* AI Suggestions */}
                    {concept.aiSuggestions && concept.aiSuggestions.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-xs text-gray-600 font-semibold">AI Enhancement Suggestions:</div>
                        <div className="flex flex-wrap gap-1">
                          {concept.aiSuggestions.slice(0, 2).map((suggestion, idx) => (
                            <Badge key={idx} className="bg-purple-50 text-purple-700 border-purple-200 text-xs">
                              {suggestion}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={concept.authorAvatar} />
                          <AvatarFallback className="text-xs bg-[rgba(139,49,35,0.1)] text-[#8b3123]">
                            {concept.author.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-gray-600">{concept.author}</span>
                      </div>
                      <span className="text-xs text-gray-500">{concept.createdAt}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Pending Concepts */}
        {pendingConcepts.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-[#8b3123] font-['Montserrat_Alternates:Bold',_sans-serif] text-lg flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              Pending Review ({pendingConcepts.length})
            </h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pendingConcepts.map((concept) => {
                const StatusIcon = statusConfig[concept.status].icon;
                return (
                  <div key={concept.id} className="skeuo-card p-4 rounded-[16px]">
                    <div className="flex items-start justify-between mb-3">
                      <Badge className={`${statusConfig[concept.status].color} border-0 text-xs`}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusConfig[concept.status].label}
                      </Badge>
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        className={`skeuo-button text-xs ${concept.hasUserUpvoted ? "text-red-600" : "text-gray-600"}`}
                        onClick={() => handleUpvote(concept.id)}
                      >
                        ❤️ {concept.upvotes}
                      </Button>
                    </div>

                    <h4 className="text-[#8b3123] font-['Montserrat_Alternates:SemiBold',_sans-serif] text-sm mb-2">
                      {concept.title}
                    </h4>
                    
                    <p className="text-gray-600 text-xs mb-3 line-clamp-3">
                      {concept.description}
                    </p>

                    {concept.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {concept.tags.slice(0, 3).map((tag, idx) => (
                          <Badge key={idx} className="bg-gray-100 text-gray-600 border-0 text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={concept.authorAvatar} />
                          <AvatarFallback className="text-xs bg-[rgba(139,49,35,0.1)] text-[#8b3123]">
                            {concept.author.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-gray-600">{concept.author}</span>
                      </div>
                      <span className="text-xs text-gray-500">{concept.createdAt}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Completed Concepts */}
        {completedConcepts.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-[#8b3123] font-['Montserrat_Alternates:Bold',_sans-serif] text-lg flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Completed Videos ({completedConcepts.length})
            </h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {completedConcepts.map((concept) => {
                const StatusIcon = statusConfig[concept.status].icon;
                return (
                  <div key={concept.id} className="skeuo-card p-4 rounded-[16px] bg-green-50">
                    <div className="flex items-start justify-between mb-3">
                      <Badge className={`${statusConfig[concept.status].color} border-0 text-xs`}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusConfig[concept.status].label}
                      </Badge>
                      
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        ❤️ {concept.upvotes}
                      </div>
                    </div>

                    <h4 className="text-[#8b3123] font-['Montserrat_Alternates:SemiBold',_sans-serif] text-sm mb-2">
                      {concept.title}
                    </h4>
                    
                    {concept.videoTitle && (
                      <div className="text-xs text-green-700 mb-2 font-medium">
                        ✅ Completed as: {concept.videoTitle}
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-green-200">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={concept.authorAvatar} />
                          <AvatarFallback className="text-xs bg-[rgba(139,49,35,0.1)] text-[#8b3123]">
                            {concept.author.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-gray-600">{concept.author}</span>
                      </div>
                      <span className="text-xs text-gray-500">{concept.createdAt}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}