import { CollapsibleSection } from "./CollapsibleSection";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Star, TrendingUp, MessageSquare, Award, Users, BarChart3, ThumbsUp, Eye } from "lucide-react";

interface TopPerformer {
  id: string;
  title: string;
  type: "video" | "script" | "campaign";
  rating: number;
  votes: number;
  category: string;
  thumbnail?: string;
}

interface RecentComment {
  id: string;
  author: string;
  content: string;
  rating: number;
  itemTitle: string;
  date: string;
}

const topPerformers: TopPerformer[] = [
  {
    id: "1",
    title: "Holiday Campaign Hero Video",
    type: "video",
    rating: 4.8,
    votes: 24,
    category: "Campaign Video"
  },
  {
    id: "2",
    title: "Product Demo Script v3",
    type: "script",
    rating: 4.6,
    votes: 18,
    category: "Product Demo"
  },
  {
    id: "3",
    title: "Q1 Brand Awareness Strategy",
    type: "campaign",
    rating: 4.5,
    votes: 15,
    category: "Brand Strategy"
  }
];

const recentComments: RecentComment[] = [
  {
    id: "1",
    author: "Sarah M.",
    content: "Excellent visual composition and pacing. The brand messaging is crystal clear.",
    rating: 5,
    itemTitle: "Holiday Campaign Hero Video",
    date: "2024-01-10"
  },
  {
    id: "2",
    author: "Alex K.",
    content: "Much better flow than the previous version. The storytelling structure works well.",
    rating: 4,
    itemTitle: "Product Demo Script v3",
    date: "2024-01-09"
  },
  {
    id: "3",
    author: "Jordan L.",
    content: "Innovative approach to audience segmentation. Budget allocation looks realistic.",
    rating: 4,
    itemTitle: "Q1 Brand Awareness Strategy",
    date: "2024-01-08"
  },
  {
    id: "4",
    author: "Morgan T.",
    content: "Great emotional connection with the audience. Audio quality could be improved.",
    rating: 4,
    itemTitle: "Customer Testimonial Video",
    date: "2024-01-07"
  }
];

const typeConfig = {
  video: { icon: <Eye className="h-3 w-3" />, color: "bg-blue-100 text-blue-700 border-blue-200" },
  script: { icon: <MessageSquare className="h-3 w-3" />, color: "bg-green-100 text-green-700 border-green-200" },
  campaign: { icon: <Award className="h-3 w-3" />, color: "bg-purple-100 text-purple-700 border-purple-200" }
};

export function RatingsFeedbackSummaryWidget() {
  const renderStarRating = (rating: number, showNumber: boolean = true) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star}
            className={`h-3 w-3 ${
              star <= rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300'
            }`}
          />
        ))}
        {showNumber && (
          <span className="text-[#8b3123] text-[12px] font-['Montserrat_Alternates:SemiBold',_sans-serif] ml-1">
            {rating.toFixed(1)}
          </span>
        )}
      </div>
    );
  };

  const overallStats = {
    totalRatings: 89,
    averageRating: 4.3,
    totalComments: 156,
    responseRate: 87
  };

  return (
    <CollapsibleSection 
      title="Ratings & Feedback Summary" 
      icon={<BarChart3 className="h-5 w-5" />}
    >
      <div className="space-y-8">
        {/* Overall Statistics */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-4 w-4 text-[#8b3123]" />
            <h3 className="text-[#8b3123] text-[18px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
              Performance Overview
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="text-center p-4 rounded-[16px] bg-[rgba(139,49,35,0.05)]">
              <div className="text-[#8b3123] text-[24px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-1">
                {overallStats.totalRatings}
              </div>
              <div className="text-[#8b3123] text-[12px] opacity-60">
                Total Ratings
              </div>
            </div>
            
            <div className="text-center p-4 rounded-[16px] bg-[rgba(139,49,35,0.05)]">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="text-[#8b3123] text-[24px] font-['Montserrat_Alternates:Bold',_sans-serif]">
                  {overallStats.averageRating}
                </span>
              </div>
              <div className="text-[#8b3123] text-[12px] opacity-60">
                Average Rating
              </div>
            </div>
            
            <div className="text-center p-4 rounded-[16px] bg-[rgba(139,49,35,0.05)]">
              <div className="text-[#8b3123] text-[24px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-1">
                {overallStats.totalComments}
              </div>
              <div className="text-[#8b3123] text-[12px] opacity-60">
                Comments
              </div>
            </div>
            
            <div className="text-center p-4 rounded-[16px] bg-[rgba(139,49,35,0.05)]">
              <div className="text-[#8b3123] text-[24px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-1">
                {overallStats.responseRate}%
              </div>
              <div className="text-[#8b3123] text-[12px] opacity-60">
                Response Rate
              </div>
            </div>
          </div>
        </div>

        {/* Top Performing Content */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-[#8b3123]" />
              <h3 className="text-[#8b3123] text-[18px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
                Top Performers
              </h3>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="text-[#8b3123] border-[#8b3123] hover:bg-[rgba(139,49,35,0.1)] text-[12px] px-3"
            >
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topPerformers.map((item, index) => (
              <div 
                key={item.id}
                className="rounded-[24px] p-4 border border-[rgba(139,49,35,0.1)] hover:border-[rgba(139,49,35,0.2)] transition-colors cursor-pointer relative"
                style={{
                  background: 'linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)), rgba(255, 255, 255, 0.4)'
                }}
              >
                {/* Rank Badge */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#8b3123] text-[#f3e1b7] rounded-full flex items-center justify-center text-[10px] font-['Montserrat_Alternates:Bold',_sans-serif]">
                  {index + 1}
                </div>

                {/* Type Badge */}
                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full border text-[10px] font-['Montserrat_Alternates:Medium',_sans-serif] mb-3 ${typeConfig[item.type].color}`}>
                  {typeConfig[item.type].icon}
                  {item.type}
                </div>

                {/* Title */}
                <h4 className="text-[#8b3123] text-[14px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-2 line-clamp-2">
                  {item.title}
                </h4>

                {/* Category */}
                <p className="text-[#8b3123] text-[12px] opacity-60 mb-3">
                  {item.category}
                </p>

                {/* Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {renderStarRating(item.rating)}
                  </div>
                  <div className="text-[#8b3123] text-[11px] opacity-60">
                    {item.votes} votes
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Comments */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-[#8b3123]" />
              <h3 className="text-[#8b3123] text-[18px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
                Recent Feedback
              </h3>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="text-[#8b3123] border-[#8b3123] hover:bg-[rgba(139,49,35,0.1)] text-[12px] px-3"
            >
              View All Comments
            </Button>
          </div>

          <div className="space-y-4">
            {recentComments.map((comment) => (
              <div 
                key={comment.id}
                className="rounded-[16px] p-4 border border-[rgba(139,49,35,0.1)] hover:border-[rgba(139,49,35,0.2)] transition-colors"
                style={{
                  background: 'linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)), rgba(255, 255, 255, 0.4)'
                }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[rgba(139,49,35,0.1)] rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-[#8b3123]" />
                    </div>
                    <div>
                      <div className="text-[#8b3123] text-[13px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
                        {comment.author}
                      </div>
                      <div className="text-[#8b3123] text-[11px] opacity-60">
                        {new Date(comment.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  {renderStarRating(comment.rating, false)}
                </div>

                {/* Comment Content */}
                <p className="text-[#8b3123] text-[13px] opacity-80 mb-2 leading-relaxed">
                  "{comment.content}"
                </p>

                {/* Item Reference */}
                <div className="text-[#8b3123] text-[11px] opacity-60">
                  on {comment.itemTitle}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="rounded-[24px] p-6 border border-[rgba(139,49,35,0.15)]" 
             style={{
               background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(101, 163, 13, 0.1) 100%), linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)), rgba(255, 255, 255, 0.4)'
             }}>
          <div className="flex items-center gap-2 mb-4">
            <ThumbsUp className="h-4 w-4 text-green-600" />
            <h4 className="text-[#8b3123] text-[16px] font-['Montserrat_Alternates:Bold',_sans-serif]">
              Key Insights
            </h4>
          </div>
          <ul className="space-y-3 text-[#8b3123] text-[13px]">
            <li className="flex items-start gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
              <span>Video content consistently receives higher ratings than scripts and campaigns</span>
            </li>
            <li className="flex items-start gap-2">
              <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
              <span>Average rating has improved by 0.3 points compared to last month</span>
            </li>
            <li className="flex items-start gap-2">
              <MessageSquare className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <span>Most valuable feedback focuses on pacing, visual composition, and brand alignment</span>
            </li>
            <li className="flex items-start gap-2">
              <Users className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
              <span>87% of community members actively participate in rating and feedback</span>
            </li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </CollapsibleSection>
  );
}