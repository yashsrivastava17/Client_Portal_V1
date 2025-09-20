import { CollapsibleSection } from "./CollapsibleSection";
import { TrendingUp, TrendingDown, Eye, Heart, Share2, Play, Users, Target, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

interface MetricData {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ReactNode;
  description: string;
  sparklineData?: number[];
}

interface CampaignMetric {
  id: string;
  name: string;
  period: string;
  metrics: {
    reach: { value: string; change: string };
    engagement: { value: string; change: string };
    conversions: { value: string; change: string };
  };
  status: "active" | "completed" | "scheduled";
}

const performanceMetrics: MetricData[] = [
  {
    label: "Total Reach",
    value: "2.4M",
    change: "+18%",
    trend: "up",
    icon: <Eye className="h-4 w-4" />,
    description: "Total audience reached across all platforms",
    sparklineData: [2.1, 2.2, 2.0, 2.3, 2.4, 2.5, 2.4]
  },
  {
    label: "Engagement Rate",
    value: "6.8%",
    change: "+2.1%",
    trend: "up",
    icon: <Heart className="h-4 w-4" />,
    description: "Average engagement across video content",
    sparklineData: [4.5, 5.2, 6.1, 5.8, 6.3, 6.8, 7.0]
  },
  {
    label: "Video Views",
    value: "1.8M",
    change: "+34%",
    trend: "up",
    icon: <Play className="h-4 w-4" />,
    description: "Total video views this month",
    sparklineData: [1.2, 1.4, 1.6, 1.5, 1.7, 1.8, 1.9]
  },
  {
    label: "Share Rate",
    value: "3.2%",
    change: "-0.4%",
    trend: "down",
    icon: <Share2 className="h-4 w-4" />,
    description: "Content sharing across social platforms",
    sparklineData: [3.8, 3.6, 3.4, 3.5, 3.3, 3.2, 3.1]
  },
  {
    label: "New Followers",
    value: "12.4K",
    change: "+28%",
    trend: "up",
    icon: <Users className="h-4 w-4" />,
    description: "New followers gained this month",
    sparklineData: [8.2, 9.1, 10.5, 11.2, 11.8, 12.4, 12.6]
  },
  {
    label: "Conversion Rate",
    value: "4.1%",
    change: "+1.3%",
    trend: "up",
    icon: <Target className="h-4 w-4" />,
    description: "Campaign to action conversion rate",
    sparklineData: [2.8, 3.1, 3.6, 3.9, 4.0, 4.1, 4.2]
  }
];

const campaignMetrics: CampaignMetric[] = [
  {
    id: "1",
    name: "Holiday Campaign 2024",
    period: "Dec 1 - Jan 15",
    metrics: {
      reach: { value: "890K", change: "+45%" },
      engagement: { value: "7.2%", change: "+12%" },
      conversions: { value: "5.8%", change: "+23%" }
    },
    status: "active"
  },
  {
    id: "2",
    name: "Product Launch Series",
    period: "Nov 15 - Dec 30",
    metrics: {
      reach: { value: "1.2M", change: "+67%" },
      engagement: { value: "8.1%", change: "+34%" },
      conversions: { value: "6.4%", change: "+18%" }
    },
    status: "completed"
  },
  {
    id: "3",
    name: "Q1 Brand Awareness",
    period: "Jan 20 - Mar 30",
    metrics: {
      reach: { value: "0", change: "—" },
      engagement: { value: "—", change: "—" },
      conversions: { value: "—", change: "—" }
    },
    status: "scheduled"
  }
];

function SimpleSparkline({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 60;
    const y = 20 - ((value - min) / range) * 20;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width="60" height="20" className="inline-block">
      <polyline
        points={points}
        fill="none"
        stroke="#8b3123"
        strokeWidth="1.5"
        opacity="0.6"
      />
    </svg>
  );
}

function getStatusColor(status: CampaignMetric['status']) {
  switch (status) {
    case "active": return "bg-green-100 text-green-700 border-green-200";
    case "completed": return "bg-blue-100 text-blue-700 border-blue-200";
    case "scheduled": return "bg-orange-100 text-orange-700 border-orange-200";
  }
}

export function PerformanceMetricsWidget() {
  return (
    <CollapsibleSection 
      title="Performance Metrics" 
      icon={<TrendingUp className="h-5 w-5" />}
    >
      <div className="space-y-8">
        {/* Overall Performance Metrics */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[#8b3123]" />
              <h3 className="text-[#8b3123] text-[18px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
                Overall Performance
              </h3>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="text-[#8b3123] border-[#8b3123] hover:bg-[rgba(139,49,35,0.1)] text-[12px] px-3"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Full Dashboard
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {performanceMetrics.map((metric, index) => (
              <div 
                key={index}
                className="rounded-[24px] p-5 border border-[rgba(139,49,35,0.1)] hover:border-[rgba(139,49,35,0.2)] transition-colors cursor-pointer"
                style={{
                  background: 'linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)), rgba(255, 255, 255, 0.4)'
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-[12px] bg-[rgba(139,49,35,0.1)] flex items-center justify-center text-[#8b3123]">
                    {metric.icon}
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

                <div className="mb-2">
                  <div className="text-[#8b3123] text-[13px] opacity-70 font-['Montserrat_Alternates:Medium',_sans-serif] mb-1">
                    {metric.label}
                  </div>
                  <div className="text-[#8b3123] text-[24px] font-['Montserrat_Alternates:Bold',_sans-serif]">
                    {metric.value}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-[#8b3123] text-[11px] opacity-60 leading-tight max-w-[180px]">
                    {metric.description}
                  </div>
                  {metric.sparklineData && (
                    <SimpleSparkline data={metric.sparklineData} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Campaign Performance */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Target className="h-4 w-4 text-[#8b3123]" />
            <h3 className="text-[#8b3123] text-[18px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
              Campaign Performance
            </h3>
          </div>

          <div className="space-y-4">
            {campaignMetrics.map((campaign) => (
              <div 
                key={campaign.id}
                className="rounded-[24px] p-6 border border-[rgba(139,49,35,0.1)] hover:border-[rgba(139,49,35,0.2)] transition-colors cursor-pointer"
                style={{
                  background: 'linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)), rgba(255, 255, 255, 0.4)'
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-[#8b3123] text-[16px] font-['Montserrat_Alternates:Bold',_sans-serif]">
                        {campaign.name}
                      </h4>
                      <span className={`text-[10px] px-2 py-1 rounded-full border font-['Montserrat_Alternates:Medium',_sans-serif] ${getStatusColor(campaign.status)}`}>
                        {campaign.status}
                      </span>
                    </div>
                    <div className="text-[#8b3123] text-[12px] opacity-60">
                      {campaign.period}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-[#8b3123] text-[11px] opacity-60 mb-1">Reach</div>
                    <div className="text-[#8b3123] text-[20px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-1">
                      {campaign.metrics.reach.value}
                    </div>
                    <div className={`text-[10px] font-['Montserrat_Alternates:SemiBold',_sans-serif] ${
                      campaign.metrics.reach.change.startsWith('+') ? 'text-emerald-600' : 
                      campaign.metrics.reach.change === '—' ? 'text-gray-500' : 'text-red-600'
                    }`}>
                      {campaign.metrics.reach.change}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-[#8b3123] text-[11px] opacity-60 mb-1">Engagement</div>
                    <div className="text-[#8b3123] text-[20px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-1">
                      {campaign.metrics.engagement.value}
                    </div>
                    <div className={`text-[10px] font-['Montserrat_Alternates:SemiBold',_sans-serif] ${
                      campaign.metrics.engagement.change.startsWith('+') ? 'text-emerald-600' : 
                      campaign.metrics.engagement.change === '—' ? 'text-gray-500' : 'text-red-600'
                    }`}>
                      {campaign.metrics.engagement.change}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-[#8b3123] text-[11px] opacity-60 mb-1">Conversions</div>
                    <div className="text-[#8b3123] text-[20px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-1">
                      {campaign.metrics.conversions.value}
                    </div>
                    <div className={`text-[10px] font-['Montserrat_Alternates:SemiBold',_sans-serif] ${
                      campaign.metrics.conversions.change.startsWith('+') ? 'text-emerald-600' : 
                      campaign.metrics.conversions.change === '—' ? 'text-gray-500' : 'text-red-600'
                    }`}>
                      {campaign.metrics.conversions.change}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Insights */}
        <div className="rounded-[24px] p-6 border border-[rgba(139,49,35,0.15)]" 
             style={{
               background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(101, 163, 13, 0.1) 100%), linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)), rgba(255, 255, 255, 0.4)'
             }}>
          <h4 className="text-[#8b3123] text-[16px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-3">
            Key Insights
          </h4>
          <ul className="space-y-2 text-[#8b3123] text-[13px]">
            <li className="flex items-start gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
              <span>Video content showing 34% higher engagement than static posts</span>
            </li>
            <li className="flex items-start gap-2">
              <Target className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <span>Best performing time slots: 2-4 PM and 7-9 PM</span>
            </li>
            <li className="flex items-start gap-2">
              <Users className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
              <span>Audience growth rate 28% above industry average</span>
            </li>
          </ul>
        </div>
      </div>
    </CollapsibleSection>
  );
}