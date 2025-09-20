import { CollapsibleSection } from "./CollapsibleSection";
import { TrendingUp, TrendingDown, ExternalLink, Globe, Zap, Users, FileText, Lightbulb } from "lucide-react";
import { Button } from "./ui/button";

interface MetricData {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  source: string;
  sourceIcon: React.ReactNode;
  description: string;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  readTime: string;
  category: "Performance" | "Analytics" | "UX" | "Growth";
  date: string;
  featured?: boolean;
}

const metrics: MetricData[] = [
  {
    label: "Conversion Rate",
    value: "3.2%",
    change: "+0.8%",
    trend: "up",
    source: "Google Analytics",
    sourceIcon: <Globe className="h-3 w-3" />,
    description: "Homepage to signup conversion"
  },
  {
    label: "Page Load Time", 
    value: "1.2s",
    change: "-0.3s",
    trend: "up",
    source: "PageSpeed Insights",
    sourceIcon: <Zap className="h-3 w-3" />,
    description: "Average page load performance"
  },
  {
    label: "User Engagement",
    value: "4.8/5",
    change: "+0.2",
    trend: "up",
    source: "Hotjar Analytics",
    sourceIcon: <Users className="h-3 w-3" />,
    description: "User satisfaction score"
  },
  {
    label: "Bounce Rate",
    value: "32.1%",
    change: "-5.2%",
    trend: "up",
    source: "Google Analytics",
    sourceIcon: <Globe className="h-3 w-3" />,
    description: "Percentage of single-page sessions"
  }
];

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Understanding User Behavior Through Heat Maps",
    excerpt: "Deep dive into how heat map analysis reveals user interaction patterns and pain points on your website.",
    readTime: "6 min read",
    category: "UX",
    date: "2 days ago",
    featured: true
  },
  {
    id: "2",
    title: "Conversion Rate Optimization: A Complete Guide",
    excerpt: "Learn proven strategies to improve your conversion rates through A/B testing and user experience optimization.",
    readTime: "12 min read",
    category: "Growth",
    date: "5 days ago"
  },
  {
    id: "3",
    title: "Core Web Vitals: Performance Metrics That Matter",
    excerpt: "Understanding LCP, FID, and CLS metrics and their impact on user experience and search rankings.",
    readTime: "8 min read",
    category: "Performance",
    date: "1 week ago"
  },
  {
    id: "4",
    title: "Advanced Google Analytics 4 Setup for SaaS",
    excerpt: "Complete guide to setting up GA4 for SaaS applications with custom events and conversion tracking.",
    readTime: "15 min read",
    category: "Analytics",
    date: "2 weeks ago"
  }
];

function getCategoryColor(category: BlogPost['category']) {
  switch (category) {
    case "Performance": return "bg-green-100 text-green-700 border-green-200";
    case "Analytics": return "bg-blue-100 text-blue-700 border-blue-200";
    case "UX": return "bg-purple-100 text-purple-700 border-purple-200";
    case "Growth": return "bg-orange-100 text-orange-700 border-orange-200";
    default: return "bg-gray-100 text-gray-700 border-gray-200";
  }
}

export function MetricsOnlyWidget({ onOpenBlog }: { onOpenBlog: (blog: BlogPost) => void }) {
  const featuredPost = blogPosts.find(post => post.featured);
  const otherPosts = blogPosts.filter(post => !post.featured);

  return (
    <CollapsibleSection 
      title="Key Metrics" 
      icon={<TrendingUp className="h-5 w-5" />}
    >
      <div className="space-y-8">
        {/* Key Metrics Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[#8b3123]" />
              <h3 className="text-[#8b3123] text-[18px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
                Performance Overview
              </h3>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="text-[#8b3123] border-[#8b3123] hover:bg-[rgba(139,49,35,0.1)] text-[12px] px-3"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              View Dashboard
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <div 
                key={index}
                className="rounded-[24px] p-5 border border-[rgba(139,49,35,0.1)]"
                style={{
                  background: 'linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)), rgba(255, 255, 255, 0.4)'
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[#8b3123] text-[13px] opacity-70 font-['Montserrat_Alternates:Medium',_sans-serif]">
                    {metric.label}
                  </div>
                  <div className={`flex items-center gap-1 text-[12px] font-['Montserrat_Alternates:SemiBold',_sans-serif] ${
                    metric.trend === "up" ? "text-emerald-600" : "text-red-600"
                  }`}>
                    {metric.trend === "up" ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {metric.change}
                  </div>
                </div>

                <div className="text-[#8b3123] text-[24px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-2">
                  {metric.value}
                </div>

                <div className="text-[#8b3123] text-[11px] opacity-60 mb-3">
                  {metric.description}
                </div>

                {/* Data Source */}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[rgba(139,49,35,0.1)]">
                  <div className="text-[#8b3123] opacity-50">
                    {metric.sourceIcon}
                  </div>
                  <div className="text-[#8b3123] text-[10px] opacity-60 font-['Montserrat_Alternates:Medium',_sans-serif]">
                    Source: {metric.source}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights & Blogs Section */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Lightbulb className="h-4 w-4 text-[#8b3123]" />
            <h3 className="text-[#8b3123] text-[18px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
              Insights & Learning Resources
            </h3>
          </div>

          {/* Featured Blog Post */}
          {featuredPost && (
            <div 
              className="rounded-[24px] p-6 border border-[rgba(139,49,35,0.15)] mb-6 cursor-pointer hover:shadow-md transition-shadow"
              style={{
                background: 'linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)), rgba(255, 255, 255, 0.4)'
              }}
              onClick={() => onOpenBlog(featuredPost)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-[#8b3123]" />
                  <span className={`text-[10px] px-2 py-1 rounded-full border font-['Montserrat_Alternates:Medium',_sans-serif] ${getCategoryColor(featuredPost.category)}`}>
                    {featuredPost.category}
                  </span>
                  <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    <span className="text-[10px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">Featured</span>
                  </div>
                </div>
                <div className="text-[#8b3123] text-[12px] opacity-60">
                  {featuredPost.date}
                </div>
              </div>

              <h4 className="text-[#8b3123] text-[16px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-2">
                {featuredPost.title}
              </h4>
              
              <p className="text-[#8b3123] text-[14px] opacity-75 mb-4 leading-relaxed">
                {featuredPost.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-[#8b3123] text-[12px] opacity-60">
                  {featuredPost.readTime}
                </span>
                <Button 
                  size="sm"
                  className="bg-[#8b3123] hover:bg-[#7a2e20] text-[#f3e1b7] text-[14px] px-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenBlog(featuredPost);
                  }}
                >
                  Read Article
                </Button>
              </div>
            </div>
          )}

          {/* Other Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {otherPosts.map((post) => (
              <div 
                key={post.id}
                className="rounded-[24px] p-4 border border-[rgba(139,49,35,0.1)] cursor-pointer hover:shadow-md transition-shadow"
                style={{
                  background: 'linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)), rgba(255, 255, 255, 0.4)'
                }}
                onClick={() => onOpenBlog(post)}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] px-2 py-1 rounded-full border font-['Montserrat_Alternates:Medium',_sans-serif] ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </span>
                  <span className="text-[#8b3123] text-[11px] opacity-60">
                    {post.date}
                  </span>
                </div>

                <h5 className="text-[#8b3123] text-[14px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-2 line-clamp-2">
                  {post.title}
                </h5>
                
                <p className="text-[#8b3123] text-[12px] opacity-75 mb-3 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-[#8b3123] text-[11px] opacity-60">
                    {post.readTime}
                  </span>
                  <Button 
                    size="sm"
                    variant="outline"
                    className="text-[#8b3123] border-[#8b3123] hover:bg-[rgba(139,49,35,0.1)] text-[12px] px-3 h-7"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenBlog(post);
                    }}
                  >
                    Read
                  </Button>
                </div>
              </div>
            ))}
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