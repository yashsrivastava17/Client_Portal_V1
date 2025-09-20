import { CollapsibleSection } from "./CollapsibleSection";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { FileText, TrendingUp, Search, ExternalLink, Clock, Eye, Star, Download } from "lucide-react";

interface ResearchDoc {
  id: string;
  title: string;
  type: "trend-report" | "research-brief" | "insight" | "competitive-analysis" | "user-study";
  summary: string;
  source: string;
  date: string;
  readTime: string;
  priority: "low" | "medium" | "high";
  tags: string[];
  views: number;
  rating: number;
  isFeatured?: boolean;
}

const mockResearchDocs: ResearchDoc[] = [
  {
    id: "1",
    title: "2024 Video Marketing Trends: AI Integration & Personalization",
    type: "trend-report",
    summary: "Comprehensive analysis of emerging video marketing trends, focusing on AI-driven personalization and interactive content formats.",
    source: "Marketing Intelligence Hub",
    date: "2024-01-10",
    readTime: "12 min read",
    priority: "high",
    tags: ["AI", "Personalization", "Video Trends", "2024"],
    views: 245,
    rating: 4.8,
    isFeatured: true
  },
  {
    id: "2",
    title: "Consumer Behavior Analysis: Holiday Shopping Patterns",
    type: "research-brief",
    summary: "In-depth study of consumer purchasing decisions during holiday season, with actionable insights for campaign optimization.",
    source: "Consumer Insights Lab",
    date: "2024-01-08",
    readTime: "8 min read",
    priority: "medium",
    tags: ["Consumer Behavior", "Holiday", "Shopping", "Psychology"],
    views: 189,
    rating: 4.5
  },
  {
    id: "3",
    title: "Competitive Analysis: Video Content Strategies Q4 2023",
    type: "competitive-analysis",
    summary: "Analysis of top competitor video strategies, performance metrics, and content approaches in Q4 2023.",
    source: "Competitive Intelligence Team",
    date: "2024-01-05",
    readTime: "15 min read",
    priority: "high",
    tags: ["Competitive Analysis", "Video Strategy", "Q4 Performance"],
    views: 167,
    rating: 4.3
  },
  {
    id: "4",
    title: "User Engagement Study: Short-form vs Long-form Content",
    type: "user-study",
    summary: "Experimental study comparing user engagement metrics between short-form and long-form video content across platforms.",
    source: "UX Research Team",
    date: "2024-01-03",
    readTime: "10 min read",
    priority: "medium",
    tags: ["User Engagement", "Content Length", "Platform Analysis"],
    views: 134,
    rating: 4.6
  },
  {
    id: "5",
    title: "Social Media Algorithm Updates: Impact on Organic Reach",
    type: "insight",
    summary: "Analysis of recent algorithm changes across major social platforms and their impact on organic content reach.",
    source: "Platform Analytics Team",
    date: "2023-12-28",
    readTime: "6 min read",
    priority: "high",
    tags: ["Algorithm", "Organic Reach", "Social Media", "Platform Updates"],
    views: 298,
    rating: 4.7
  },
  {
    id: "6",
    title: "Content Creator Partnership Effectiveness Report",
    type: "research-brief",
    summary: "Evaluation of content creator partnerships, ROI analysis, and best practices for future collaborations.",
    source: "Partnership Strategy Team",
    date: "2023-12-22",
    readTime: "14 min read",
    priority: "medium",
    tags: ["Creator Partnerships", "ROI", "Collaboration", "Strategy"],
    views: 156,
    rating: 4.2
  }
];

const typeConfig = {
  "trend-report": { 
    icon: <TrendingUp className="h-4 w-4" />, 
    color: "bg-blue-100 text-blue-700 border-blue-200",
    label: "Trend Report"
  },
  "research-brief": { 
    icon: <FileText className="h-4 w-4" />, 
    color: "bg-green-100 text-green-700 border-green-200",
    label: "Research Brief"
  },
  "insight": { 
    icon: <Search className="h-4 w-4" />, 
    color: "bg-purple-100 text-purple-700 border-purple-200",
    label: "Insight"
  },
  "competitive-analysis": { 
    icon: <ExternalLink className="h-4 w-4" />, 
    color: "bg-orange-100 text-orange-700 border-orange-200",
    label: "Competitive Analysis"
  },
  "user-study": { 
    icon: <Eye className="h-4 w-4" />, 
    color: "bg-pink-100 text-pink-700 border-pink-200",
    label: "User Study"
  }
};

const priorityConfig = {
  low: { color: "bg-gray-100 text-gray-700 border-gray-200" },
  medium: { color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  high: { color: "bg-red-100 text-red-700 border-red-200" }
};

interface ResearchDocsWidgetProps {
  onOpenBlog: (doc: any) => void;
}

export function ResearchDocsWidget({ onOpenBlog }: ResearchDocsWidgetProps) {
  const featuredDoc = mockResearchDocs.find(doc => doc.isFeatured);
  const otherDocs = mockResearchDocs.filter(doc => !doc.isFeatured);

  const handleDocClick = (doc: ResearchDoc) => {
    // Convert ResearchDoc to BlogPost format for the reader modal
    const blogPost = {
      id: doc.id,
      title: doc.title,
      excerpt: doc.summary,
      content: "", // Would be loaded from backend
      readTime: doc.readTime,
      category: doc.type as any,
      date: new Date(doc.date).toLocaleDateString(),
      author: doc.source
    };
    onOpenBlog(blogPost);
  };

  return (
    <CollapsibleSection 
      title="Research Docs & Insights" 
      icon={<FileText className="h-5 w-5" />}
    >
      <div className="space-y-8">
        {/* Featured Document */}
        {featuredDoc && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-4 w-4 text-[#8b3123]" />
              <h3 className="text-[#8b3123] text-[18px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
                Featured Research
              </h3>
            </div>
            
            <div 
              className="rounded-[24px] p-6 border border-[rgba(139,49,35,0.15)] cursor-pointer hover:shadow-md transition-shadow"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%), linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)), rgba(255, 255, 255, 0.4)'
              }}
              onClick={() => handleDocClick(featuredDoc)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Badge className={`text-[10px] px-2 py-1 ${typeConfig[featuredDoc.type].color}`}>
                    {typeConfig[featuredDoc.type].icon}
                    {typeConfig[featuredDoc.type].label}
                  </Badge>
                  <Badge className={`text-[10px] px-2 py-1 ${priorityConfig[featuredDoc.priority].color}`}>
                    {featuredDoc.priority} priority
                  </Badge>
                  <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    <span className="text-[10px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">Featured</span>
                  </div>
                </div>
                <div className="text-[#8b3123] text-[12px] opacity-60">
                  {new Date(featuredDoc.date).toLocaleDateString()}
                </div>
              </div>

              <h4 className="text-[#8b3123] text-[18px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-3">
                {featuredDoc.title}
              </h4>
              
              <p className="text-[#8b3123] text-[14px] opacity-75 mb-4 leading-relaxed">
                {featuredDoc.summary}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-[#8b3123] text-[12px] opacity-60">
                    <Clock className="h-3 w-3" />
                    {featuredDoc.readTime}
                  </div>
                  <div className="flex items-center gap-1 text-[#8b3123] text-[12px] opacity-60">
                    <Eye className="h-3 w-3" />
                    {featuredDoc.views} views
                  </div>
                  <div className="flex items-center gap-1 text-[#8b3123] text-[12px] opacity-60">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {featuredDoc.rating}
                  </div>
                </div>
                <Button 
                  size="sm"
                  className="bg-[#8b3123] hover:bg-[#7a2e20] text-[#f3e1b7] text-[14px] px-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDocClick(featuredDoc);
                  }}
                >
                  Read Research
                </Button>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {featuredDoc.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="text-[10px] px-2 py-1 rounded-full bg-[rgba(139,49,35,0.1)] text-[#8b3123]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Recent Research Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-[#8b3123]" />
              <h3 className="text-[#8b3123] text-[18px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
                Recent Research
              </h3>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="text-[#8b3123] border-[#8b3123] hover:bg-[rgba(139,49,35,0.1)] text-[12px] px-3"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherDocs.slice(0, 6).map((doc) => (
              <div 
                key={doc.id}
                className="rounded-[24px] p-4 border border-[rgba(139,49,35,0.1)] cursor-pointer hover:shadow-md transition-shadow"
                style={{
                  background: 'linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)), rgba(255, 255, 255, 0.4)'
                }}
                onClick={() => handleDocClick(doc)}
              >
                <div className="flex items-center justify-between mb-3">
                  <Badge className={`text-[10px] px-2 py-1 ${typeConfig[doc.type].color}`}>
                    {typeConfig[doc.type].icon}
                    {typeConfig[doc.type].label}
                  </Badge>
                  <div className="text-[#8b3123] text-[11px] opacity-60">
                    {new Date(doc.date).toLocaleDateString()}
                  </div>
                </div>

                <h5 className="text-[#8b3123] text-[14px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-2 line-clamp-2">
                  {doc.title}
                </h5>
                
                <p className="text-[#8b3123] text-[12px] opacity-75 mb-3 leading-relaxed line-clamp-3">
                  {doc.summary}
                </p>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-[#8b3123] text-[11px] opacity-60">
                    <Clock className="h-3 w-3" />
                    {doc.readTime}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-[#8b3123] text-[11px] opacity-60">
                      <Eye className="h-3 w-3" />
                      {doc.views}
                    </div>
                    <div className="flex items-center gap-1 text-[#8b3123] text-[11px] opacity-60">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {doc.rating}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-[#8b3123] text-[11px] opacity-60">
                    {doc.source}
                  </div>
                  <Button 
                    size="sm"
                    variant="outline"
                    className="text-[#8b3123] border-[#8b3123] hover:bg-[rgba(139,49,35,0.1)] text-[12px] px-3 h-7"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDocClick(doc);
                    }}
                  >
                    Read
                  </Button>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {doc.tags.slice(0, 3).map((tag, index) => (
                    <span 
                      key={index}
                      className="text-[9px] px-1.5 py-0.5 rounded-full bg-[rgba(139,49,35,0.1)] text-[#8b3123]"
                    >
                      #{tag}
                    </span>
                  ))}
                  {doc.tags.length > 3 && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[rgba(139,49,35,0.1)] text-[#8b3123]">
                      +{doc.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-6 border-t border-[rgba(139,49,35,0.1)]">
          <div className="text-center p-3 rounded-[12px] bg-[rgba(139,49,35,0.05)]">
            <div className="text-[#8b3123] text-[18px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-1">
              {mockResearchDocs.length}
            </div>
            <div className="text-[#8b3123] text-[11px] opacity-60">
              Research Docs
            </div>
          </div>
          
          <div className="text-center p-3 rounded-[12px] bg-[rgba(139,49,35,0.05)]">
            <div className="text-[#8b3123] text-[18px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-1">
              {mockResearchDocs.reduce((sum, doc) => sum + doc.views, 0)}
            </div>
            <div className="text-[#8b3123] text-[11px] opacity-60">
              Total Views
            </div>
          </div>
          
          <div className="text-center p-3 rounded-[12px] bg-[rgba(139,49,35,0.05)]">
            <div className="text-[#8b3123] text-[18px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-1">
              4.5
            </div>
            <div className="text-[#8b3123] text-[11px] opacity-60">
              Avg Rating
            </div>
          </div>
          
          <div className="text-center p-3 rounded-[12px] bg-[rgba(139,49,35,0.05)]">
            <div className="text-[#8b3123] text-[18px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-1">
              {mockResearchDocs.filter(doc => new Date(doc.date) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
            </div>
            <div className="text-[#8b3123] text-[11px] opacity-60">
              This Week
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </CollapsibleSection>
  );
}