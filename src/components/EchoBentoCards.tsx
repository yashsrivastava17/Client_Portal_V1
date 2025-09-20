import { Calendar, MessageSquare, BarChart3, TestTube, Video, Users, Target, FileText } from "lucide-react";

interface BentoCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
  gradient?: string;
}

function BentoCard({ title, description, icon, onClick, className = "", gradient }: BentoCardProps) {
  return (
    <div 
      className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg rounded-[24px] p-6 border border-[rgba(139,49,35,0.1)] ${className}`}
      style={{
        background: gradient || 'linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)), rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)'
      }}
      onClick={onClick}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-[16px] bg-[rgba(139,49,35,0.1)] flex items-center justify-center text-[#8b3123]">
            {icon}
          </div>
          <div className="w-6 h-6 rounded-full bg-[rgba(139,49,35,0.2)] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#8b3123]" />
          </div>
        </div>
        
        <h3 className="text-[#8b3123] text-[18px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-2">
          {title}
        </h3>
        <p className="text-[#8b3123] text-[13px] opacity-75 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

interface EchoBentoCardsProps {
  onOpenCalendar: () => void;
  onOpenFeedback: () => void;
  onOpenMetrics: () => void;
  onOpenTestAccounts: () => void;
}

export function EchoBentoCards({ 
  onOpenCalendar, 
  onOpenFeedback, 
  onOpenMetrics, 
  onOpenTestAccounts 
}: EchoBentoCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      <BentoCard
        title="Open Calendar"
        description="View content calendar with campaign schedules and deadlines"
        icon={<Calendar className="h-6 w-6" />}
        onClick={onOpenCalendar}
        gradient="linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%), linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)), rgba(255, 255, 255, 0.4)"
      />
      
      <BentoCard
        title="Submit Feedback"
        description="Provide detailed feedback on campaigns, videos, and content performance"
        icon={<MessageSquare className="h-6 w-6" />}
        onClick={onOpenFeedback}
        gradient="linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(101, 163, 13, 0.1) 100%), linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)), rgba(255, 255, 255, 0.4)"
      />
      
      <BentoCard
        title="View Metrics"
        description="Real-time performance analytics and engagement insights"
        icon={<BarChart3 className="h-6 w-6" />}
        onClick={onOpenMetrics}
        gradient="linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(251, 146, 60, 0.1) 100%), linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)), rgba(255, 255, 255, 0.4)"
      />
      
      <BentoCard
        title="Test Accounts"
        description="Access staging and social media testing accounts securely"
        icon={<TestTube className="h-6 w-6" />}
        onClick={onOpenTestAccounts}
        gradient="linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%), linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)), rgba(255, 255, 255, 0.4)"
      />
    </div>
  );
}