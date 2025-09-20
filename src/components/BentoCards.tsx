import { Button } from "./ui/button";
import { FileText, Kanban, MessageSquare, BarChart3 } from "lucide-react";

interface BentoCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  cta: string;
  size: "small" | "large";
  onClick: () => void;
}

interface BentoCardsProps {
  onOpenDocs: () => void;
  onOpenKanban: () => void;
  onOpenRequest: () => void;
  onOpenMetrics: () => void;
}

export function BentoCards({ onOpenDocs, onOpenKanban, onOpenRequest, onOpenMetrics }: BentoCardsProps) {
  const bentoCards: BentoCard[] = [
    {
      id: "docs",
      title: "Open Docs",
      description: "Access project documentation and insights",
      icon: <FileText className="h-12 w-12" />,
      cta: "Browse Docs",
      size: "large",
      onClick: onOpenDocs
    },
    {
      id: "kanban",
      title: "View Kanban",
      description: "Check task progress and assignments",
      icon: <Kanban className="h-8 w-8" />,
      cta: "Open Board",
      size: "small",
      onClick: onOpenKanban
    },
    {
      id: "request",
      title: "Raise Request",
      description: "Submit new requests or issues",
      icon: <MessageSquare className="h-8 w-8" />,
      cta: "New Request",
      size: "small",
      onClick: onOpenRequest
    },
    {
      id: "metrics",
      title: "Metrics Snapshot",
      description: "View performance metrics and KPIs",
      icon: <BarChart3 className="h-8 w-8" />,
      cta: "View Metrics",
      size: "small",
      onClick: onOpenMetrics
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-[20px] w-full">
      {/* Large card - spans 2 columns on large screens */}
      <div className="lg:col-span-1">
        <BentoCard card={bentoCards[0]} isLarge />
      </div>
      
      {/* Small cards */}
      {bentoCards.slice(1).map((card) => (
        <BentoCard key={card.id} card={card} isLarge={false} />
      ))}
    </div>
  );
}

interface BentoCardProps {
  card: BentoCard;
  isLarge: boolean;
}

function BentoCard({ card, isLarge }: BentoCardProps) {
  return (
    <div 
      className="flex flex-col gap-[10px] h-full min-h-[350px] lg:min-h-[400px] overflow-hidden relative rounded-[24px] group hover:scale-[1.02] transition-all cursor-pointer skeuo-card-elevated"
      onClick={card.onClick}
    >
      {/* Card content */}
      <div className="h-[280px] lg:h-[330px] relative rounded-[20px] w-full p-4 lg:p-6 flex flex-col items-center justify-center text-center">
        <div className="text-[#8b3123] mb-4 group-hover:scale-110 transition-transform skeuo-card p-4 rounded-[16px] bg-gradient-to-br from-[#faf8f5] to-white">
          {card.icon}
        </div>
        <h3 className={`text-[#8b3123] font-['Montserrat_Alternates:Bold',_sans-serif] mb-2 ${isLarge ? 'text-[20px] lg:text-[24px]' : 'text-[18px] lg:text-[20px]'}`}>
          {card.title}
        </h3>
        <p className={`text-[#8b3123] font-['Montserrat_Alternates:Medium',_sans-serif] opacity-80 mb-6 ${isLarge ? 'text-[14px] lg:text-[16px]' : 'text-[12px] lg:text-[14px]'}`}>
          {card.description}
        </p>
      </div>
      
      {/* CTA Button */}
      <div className="absolute h-[51px] left-[10px] overflow-hidden rounded-[15px] bottom-[10px] right-[10px] skeuo-button-primary">
        <div className="absolute font-['Montserrat_Alternates:SemiBold',_sans-serif] text-white text-[16px] lg:text-[20px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {card.cta}
        </div>
      </div>
    </div>
  );
}