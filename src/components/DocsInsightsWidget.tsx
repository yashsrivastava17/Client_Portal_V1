import { CollapsibleSection } from "./CollapsibleSection";
import { Button } from "./ui/button";
import { FileText, Star, BookOpen, BarChart3, ChevronLeft, ChevronRight, TrendingUp, Lightbulb, Target, Zap } from "lucide-react";
import { useRef, useState } from "react";
import { DocumentChatModal } from "./DocumentChatModal";

interface Document {
  id: string;
  type: "Strategy" | "Research" | "Documentation" | "Analysis";
  title: string;
  description: string;
  readTime: string;
  date: string;
  progress: number;
  featured?: boolean;
  urgent?: boolean;
}

const documents: Document[] = [
  {
    id: "1",
    type: "Strategy",
    title: "Q4 Brand Strategy Guide",
    description: "Comprehensive guide covering brand positioning, messaging, and visual identity updates for the upcoming quarter.",
    readTime: "8 min read",
    date: "2 days ago",
    progress: 80,
    featured: true,
    urgent: true
  },
  {
    id: "2", 
    type: "Research",
    title: "User Research Findings",
    description: "Latest insights from user interviews revealing key pain points in the checkout process and navigation patterns.",
    readTime: "12 min read",
    date: "1 day ago", 
    progress: 80
  },
  {
    id: "3",
    type: "Documentation", 
    title: "Design System Documentation",
    description: "Updated component library with new tokens, spacing guidelines, and accessibility improvements.",
    readTime: "15 min read",
    date: "1 week ago",
    progress: 74
  },
  {
    id: "4",
    type: "Analysis",
    title: "Competitive Analysis Report", 
    description: "Analysis of competitor design patterns, pricing strategies, and user experience approaches in our market.",
    readTime: "20 min read",
    date: "2 weeks ago",
    progress: 61
  },
  {
    id: "5",
    type: "Strategy",
    title: "Marketing Automation Strategy", 
    description: "Implementation plan for automated email campaigns, lead scoring, and customer journey optimization.",
    readTime: "18 min read",
    date: "3 weeks ago",
    progress: 45
  },
  {
    id: "6",
    type: "Research",
    title: "Mobile App UX Research", 
    description: "User testing results and usability recommendations for the mobile application redesign project.",
    readTime: "25 min read",
    date: "1 month ago",
    progress: 92
  }
];

function getDocumentIcon(type: Document['type']) {
  switch (type) {
    case "Strategy": return <Target className="h-4 w-4" />;
    case "Research": return <TrendingUp className="h-4 w-4" />;
    case "Documentation": return <BookOpen className="h-4 w-4" />;
    case "Analysis": return <BarChart3 className="h-4 w-4" />;
  }
}

function getTypeColor(type: Document['type']) {
  switch (type) {
    case "Strategy": return "bg-purple-100 text-purple-700 border-purple-200";
    case "Research": return "bg-blue-100 text-blue-700 border-blue-200";
    case "Documentation": return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "Analysis": return "bg-orange-100 text-orange-700 border-orange-200";
  }
}

export function DocsInsightsWidget() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  
  const featuredDoc = documents.find(doc => doc.featured);
  const otherDocs = documents.filter(doc => !doc.featured);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleDocumentClick = (document: Document) => {
    setSelectedDocument(document);
    setIsChatModalOpen(true);
  };

  return (
    <>
      <CollapsibleSection 
        title="Docs & Insights" 
        icon={<FileText className="h-5 w-5" />}
        badge="1 Featured"
      >
        <div className="space-y-6">
          {/* Header with View All button */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[#8b3123] text-[18px] font-['Montserrat_Alternates:SemiBold',_sans-serif] mb-1">
                Documents & Insights
              </h3>
              <div className="flex items-center gap-2 text-[#8b3123] text-[12px] opacity-60">
                <Star className="h-3 w-3 fill-current" />
                <span>Best Document to Read</span>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="text-[#8b3123] border-[#8b3123] hover:bg-[rgba(139,49,35,0.1)] text-[14px] px-4"
            >
              View All
            </Button>
          </div>

          {/* Featured Document Card */}
          {featuredDoc && (
            <div 
              className="skeuo-card rounded-[24px] p-6 cursor-pointer hover:scale-[1.01] transition-all border-l-4 border-l-[#8b3123]"
              onClick={() => handleDocumentClick(featuredDoc)}
            >
              {/* Primary Level - Document Type & Status */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 skeuo-card rounded-[8px] text-[#8b3123]">
                    {getDocumentIcon(featuredDoc.type)}
                  </div>
                  <div className="flex gap-2">
                    <span className={`text-[10px] px-3 py-1.5 rounded-[6px] skeuo-button font-['Montserrat_Alternates:SemiBold',_sans-serif] ${getTypeColor(featuredDoc.type)}`}>
                      {featuredDoc.type}
                    </span>
                    {featuredDoc.urgent && (
                      <div className="flex items-center gap-1 bg-gradient-to-r from-red-50 to-red-100 text-red-700 px-3 py-1.5 rounded-[6px] skeuo-card border border-red-200">
                        <Zap className="h-3 w-3" />
                        <span className="text-[10px] font-['Montserrat_Alternates:Bold',_sans-serif]">Urgent</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Progress Section with Heading */}
                <div className="text-right">
                  <div className="text-[#8b3123] text-[10px] font-['Montserrat_Alternates:Medium',_sans-serif] opacity-70 mb-1">
                    Completion
                  </div>
                  <div className="text-[#8b3123] text-[16px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-2">
                    {featuredDoc.progress}%
                  </div>
                  <div className="w-20 h-3 skeuo-progress-track rounded-[6px] overflow-hidden">
                    <div 
                      className="h-full skeuo-progress-fill rounded-[6px] transition-all duration-500"
                      style={{ width: `${featuredDoc.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Secondary Level - Main Content */}
              <div className="mb-5">
                <h4 className="text-[#8b3123] text-[20px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-3 leading-tight">
                  {featuredDoc.title}
                </h4>
                
                <p className="text-[#8b3123] text-[14px] opacity-80 mb-4 leading-relaxed">
                  {featuredDoc.description}
                </p>
              </div>

              {/* AI Insight Section */}
              {featuredDoc.urgent && (
                <div className="skeuo-card rounded-[12px] p-4 mb-5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1 bg-blue-100 rounded-[4px]">
                      <Lightbulb className="h-3 w-3 text-blue-600" />
                    </div>
                    <span className="text-blue-800 text-[12px] font-['Montserrat_Alternates:Bold',_sans-serif]">
                      AI Insight
                    </span>
                  </div>
                  <p className="text-blue-700 text-[12px] leading-relaxed">
                    Linked to homepage redesign project (+12% conversion impact potential)
                  </p>
                </div>
              )}

              {/* Tertiary Level - Actions & Metadata */}
              <div className="flex items-center justify-between pt-4 border-t border-[rgba(139,49,35,0.1)]">
                <div className="flex items-center gap-4 text-[#8b3123] text-[12px] opacity-60 font-['Montserrat_Alternates:Medium',_sans-serif]">
                  <span>{featuredDoc.readTime}</span>
                  <span>•</span>
                  <span>{featuredDoc.date}</span>
                </div>
                <button 
                  className="skeuo-button-primary text-white text-[12px] px-4 py-2 rounded-[8px] hover:scale-105 transition-transform font-['Montserrat_Alternates:SemiBold',_sans-serif]"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDocumentClick(featuredDoc);
                  }}
                >
                  Chat with Doc
                </button>
              </div>
            </div>
          )}

          {/* Other Documents - Horizontal Scroll */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-[#8b3123] text-[16px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
                More Documents
              </h4>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={scrollLeft}
                  className="h-8 w-8 p-0 text-[#8b3123] border-[#8b3123] hover:bg-[rgba(139,49,35,0.1)]"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={scrollRight}
                  className="h-8 w-8 p-0 text-[#8b3123] border-[#8b3123] hover:bg-[rgba(139,49,35,0.1)]"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="relative">
              {/* Left gradient */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#f7efdb] to-transparent z-10 pointer-events-none" />
              
              {/* Right gradient */}
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#f7efdb] to-transparent z-10 pointer-events-none" />
              
              {/* Scrollable container */}
              <div 
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {otherDocs.map((doc) => (
                  <div 
                    key={doc.id}
                    className="flex-shrink-0 w-[280px] rounded-[24px] p-4 border border-[rgba(139,49,35,0.1)] hover:border-[rgba(139,49,35,0.2)] transition-colors cursor-pointer hover:shadow-md"
                    style={{
                      background: 'linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)), rgba(255, 255, 255, 0.4)'
                    }}
                    onClick={() => handleDocumentClick(doc)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="text-[#8b3123]">
                          {getDocumentIcon(doc.type)}
                        </div>
                        <span className={`text-[10px] px-2 py-1 rounded-full border font-['Montserrat_Alternates:Medium',_sans-serif] ${getTypeColor(doc.type)}`}>
                          {doc.type}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-[#8b3123] text-[12px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
                          {doc.progress}%
                        </div>
                        <div className="w-12 h-1 bg-gray-200 rounded-full mt-1">
                          <div 
                            className="h-full bg-[#8b3123] rounded-full transition-all"
                            style={{ width: `${doc.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <h5 className="text-[#8b3123] text-[14px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-2 line-clamp-2">
                      {doc.title}
                    </h5>
                    
                    <p className="text-[#8b3123] text-[12px] opacity-75 mb-3 leading-relaxed line-clamp-3">
                      {doc.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-[#8b3123] text-[11px] opacity-60">
                        <span>{doc.readTime}</span>
                        <span>{doc.date}</span>
                      </div>
                      <Button 
                        size="sm"
                        variant="outline"
                        className="text-[#8b3123] border-[#8b3123] hover:bg-[rgba(139,49,35,0.1)] text-[12px] px-3 h-7"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDocumentClick(doc);
                        }}
                      >
                        Chat
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
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

      {/* Document Chat Modal */}
      <DocumentChatModal
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
        documentTitle={selectedDocument?.title || ""}
        documentContent={selectedDocument?.description}
      />
    </>
  );
}