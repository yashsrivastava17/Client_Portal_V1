import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { 
  Heart, 
  Filter, 
  Search, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  Workflow,
  Bot,
  Users as UsersIcon,
  Lightbulb,
  TrendingUp,
  Calendar
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
  videoTitle?: string;
  upvotes: number;
  hasUserUpvoted: boolean;
  tags: string[];
  aiSuggestions?: string[];
}

interface ConceptFeedProps {
  onViewPipeline?: (conceptId: string) => void;
}

export function ConceptFeed({ onViewPipeline }: ConceptFeedProps) {
  const [concepts, setConcepts] = useState<Concept[]>([
    {
      id: "concept-1",
      title: "AI-Powered Customer Journey Visualization",
      description: "Create an interactive video showing how AI helps customers from first touch to conversion, with real data visualizations and smooth animations.",
      author: "Sarah Chen",
      authorAvatar: "https://github.com/shadcn.png",
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
      id: "concept-2", 
      title: "Behind-the-Scenes Product Development",
      description: "Documentary-style video showing our team's creative process, from ideation to final product. Authentic, human-centered storytelling.",
      author: "Mike Rodriguez",
      createdAt: "2024-01-10",
      status: "in-pipeline",
      pipelineStage: "video-editing",
      pipelineType: "human",
      videoTitle: "Brand Story Documentary",
      upvotes: 8,
      hasUserUpvoted: false,
      tags: ["Documentary", "Team", "Authentic"],
      aiSuggestions: ["Add music transitions", "Include team interviews", "Show workspace shots"]
    },
    {
      id: "concept-3",
      title: "Interactive Product Demo with AR Elements",
      description: "Showcase our product with augmented reality overlays that let viewers interact with features in real-time. Perfect for mobile viewing.",
      author: "Alex Kim",
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
      author: "Jenny Liu",
      createdAt: "2024-01-13",
      status: "completed",
      videoTitle: "Customer Testimonial Compilation",
      upvotes: 6,
      hasUserUpvoted: false,
      tags: ["Testimonials", "Success", "Results"]
    },
    {
      id: "concept-5",
      title: "Animated Explainer: Complex Features Made Simple",
      description: "Break down our most complex features using clear animations and simple language. Make technical concepts accessible to everyone.",
      author: "Tom Wilson",
      createdAt: "2024-01-11",
      status: "rejected",
      upvotes: 3,
      hasUserUpvoted: false,
      tags: ["Animation", "Education", "Simplification"]
    },
    {
      id: "concept-6",
      title: "Global Market Expansion Strategy Video",
      description: "Comprehensive video series outlining our expansion into new markets, with localized content and cultural considerations.",
      author: "Emma Davis",
      createdAt: "2024-01-09",
      status: "pending",
      upvotes: 11,
      hasUserUpvoted: false,
      tags: ["Strategy", "Global", "Expansion"]
    },
    {
      id: "concept-7",
      title: "Sustainability Initiative Showcase",
      description: "Highlight our environmental commitments and green technology initiatives through compelling visual storytelling.",
      author: "Carlos Martinez",
      createdAt: "2024-01-15",
      status: "in-pipeline", 
      pipelineStage: "idea-generation",
      pipelineType: "ai",
      upvotes: 9,
      hasUserUpvoted: true,
      tags: ["Sustainability", "Environment", "Impact"]
    }
  ]);

  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterAuthor, setFilterAuthor] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"recent" | "popular" | "status">("recent");
  const [searchTerm, setSearchTerm] = useState("");

  const statusConfig = {
    pending: { 
      label: "Under Review", 
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
      icon: Clock 
    }
  };

  const stageConfig = {
    "idea-generation": "Idea Generation",
    "scene-generation": "Scene Generation", 
    "script-generation": "Script Generation",
    "video-prompt": "Video Prompt",
    "video-editing": "Video Editing"
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

  // Get unique authors for filter
  const authors = Array.from(new Set(concepts.map(c => c.author)));

  // Filter and sort concepts
  const filteredConcepts = concepts
    .filter(concept => {
      if (filterStatus !== "all" && concept.status !== filterStatus) return false;
      if (filterAuthor !== "all" && concept.author !== filterAuthor) return false;
      if (searchTerm && !concept.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !concept.description.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return b.upvotes - a.upvotes;
        case "status":
          return a.status.localeCompare(b.status);
        case "recent":
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  const renderConceptCard = (concept: Concept) => {
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
          
          <Button
            size="sm"
            variant="ghost"
            className={`skeuo-button text-xs transition-all ${
              concept.hasUserUpvoted 
                ? "text-red-600 bg-red-50 hover:bg-red-100" 
                : "text-gray-600 hover:text-red-600 hover:bg-red-50"
            }`}
            onClick={() => handleUpvote(concept.id)}
          >
            <Heart className={`h-3 w-3 mr-1 ${concept.hasUserUpvoted ? "fill-current" : ""}`} />
            {concept.upvotes}
          </Button>
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

        {/* Tags */}
        {concept.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {concept.tags.slice(0, 3).map((tag, idx) => (
              <Badge key={idx} className="bg-gray-100 text-gray-600 border-0 text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* AI Suggestions */}
        {concept.aiSuggestions && concept.aiSuggestions.length > 0 && (
          <div className="space-y-2 mb-3">
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
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Lightbulb className="h-6 w-6 text-yellow-600" />
          <h2 className="text-[#8b3123] font-['Montserrat_Alternates:Bold',_sans-serif] text-xl">
            Concept Feed
          </h2>
          <Badge className="bg-blue-100 text-blue-800 border-0">
            {filteredConcepts.length} concepts
          </Badge>
        </div>
        <div className="flex items-center gap-3">
          <TrendingUp className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">Stakeholder Innovations</span>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="skeuo-card p-4 rounded-[16px]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search concepts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="skeuo-input pl-10 pr-4 py-2 w-full text-sm rounded-[8px]"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="skeuo-input px-3 py-2 text-sm rounded-[8px] bg-white"
          >
            <option value="all">All Status</option>
            <option value="pending">Under Review</option>
            <option value="in-pipeline">In Pipeline</option>
            <option value="completed">Completed</option>
            <option value="rejected">Not Selected</option>
          </select>

          {/* Author Filter */}
          <select
            value={filterAuthor}
            onChange={(e) => setFilterAuthor(e.target.value)}
            className="skeuo-input px-3 py-2 text-sm rounded-[8px] bg-white"
          >
            <option value="all">All Authors</option>
            {authors.map(author => (
              <option key={author} value={author}>{author}</option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "recent" | "popular" | "status")}
            className="skeuo-input px-3 py-2 text-sm rounded-[8px] bg-white"
          >
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
            <option value="status">By Status</option>
          </select>
        </div>
      </div>

      {/* Feed Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="skeuo-card p-4 rounded-[12px] text-center">
          <div className="text-2xl font-['Montserrat_Alternates:Bold',_sans-serif] text-[#8b3123] mb-1">
            {concepts.filter(c => c.status === "pending").length}
          </div>
          <div className="text-sm text-gray-600">Under Review</div>
        </div>
        
        <div className="skeuo-card p-4 rounded-[12px] text-center">
          <div className="text-2xl font-['Montserrat_Alternates:Bold',_sans-serif] text-[#8b3123] mb-1">
            {concepts.filter(c => c.status === "in-pipeline").length}
          </div>
          <div className="text-sm text-gray-600">In Pipeline</div>
        </div>
        
        <div className="skeuo-card p-4 rounded-[12px] text-center">
          <div className="text-2xl font-['Montserrat_Alternates:Bold',_sans-serif] text-[#8b3123] mb-1">
            {concepts.reduce((sum, c) => sum + c.upvotes, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Hearts</div>
        </div>
        
        <div className="skeuo-card p-4 rounded-[12px] text-center">
          <div className="text-2xl font-['Montserrat_Alternates:Bold',_sans-serif] text-[#8b3123] mb-1">
            {authors.length}
          </div>
          <div className="text-sm text-gray-600">Contributors</div>
        </div>
      </div>

      {/* Concept Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredConcepts.map(renderConceptCard)}
      </div>

      {/* Empty State */}
      {filteredConcepts.length === 0 && (
        <div className="skeuo-card p-8 rounded-[16px] text-center">
          <Lightbulb className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-[#8b3123] font-['Montserrat_Alternates:SemiBold',_sans-serif] mb-2">
            No concepts found
          </h4>
          <p className="text-gray-600 text-sm">
            Try adjusting your filters or search terms to find more concepts.
          </p>
        </div>
      )}
    </div>
  );
}