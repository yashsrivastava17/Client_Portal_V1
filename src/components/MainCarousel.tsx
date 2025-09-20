import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, Wallet, Video, FileText, Target, DollarSign, Users, Clock, FileCheck } from "lucide-react";

interface CarouselCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  cta: string;
  pills: {
    label: string;
    value: string;
    color: "green" | "blue" | "orange" | "purple" | "red" | "cyan" | "pink";
  }[];
  priority: "high" | "medium" | "low";
}

const carouselCards: CarouselCard[] = [
  {
    id: "payment",
    title: "Payment Reminder",
    description: "Invoice #MAP-2024-01 needs immediate attention for project continuation",
    icon: <Wallet className="h-8 w-8" />,
    cta: "Pay $12,500",
    priority: "high",
    pills: [
      { label: "Amount", value: "$12,500", color: "red" },
      { label: "Due In", value: "3 Days", color: "orange" },
      { label: "Invoice", value: "#MAP-2024-01", color: "blue" }
    ]
  },
  {
    id: "meeting",
    title: "Design Review Session",
    description: "Critical feedback session with stakeholders to finalize Q4 design direction",
    icon: <Video className="h-8 w-8" />,
    cta: "Join Meeting",
    priority: "medium",
    pills: [
      { label: "Time", value: "2:00 PM PST", color: "blue" },
      { label: "Date", value: "Tomorrow", color: "purple" },
      { label: "Attendees", value: "5 People", color: "green" }
    ]
  },
  {
    id: "document",
    title: "Q4 Brand Strategy Review",
    description: "Comprehensive strategy document with new brand positioning guidelines and implementation roadmap",
    icon: <FileCheck className="h-8 w-8" />,
    cta: "Review Doc",
    priority: "medium",
    pills: [
      { label: "Pages", value: "24", color: "green" },
      { label: "Deadline", value: "Dec 30", color: "orange" },
      { label: "Status", value: "Ready", color: "cyan" }
    ]
  },
  {
    id: "working",
    title: "Brand Identity Refresh",
    description: "Major identity overhaul project with new logo system, color palette, and brand guidelines",
    icon: <Target className="h-8 w-8" />,
    cta: "View Progress",
    priority: "low",
    pills: [
      { label: "Progress", value: "8/12 Done", color: "green" },
      { label: "Deadline", value: "Jan 15", color: "blue" },
      { label: "Team", value: "4 Members", color: "purple" }
    ]
  }
];

function getPillColor(color: string) {
  switch (color) {
    case "green": return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "blue": return "bg-blue-100 text-blue-700 border-blue-200";
    case "orange": return "bg-orange-100 text-orange-700 border-orange-200";
    case "purple": return "bg-purple-100 text-purple-700 border-purple-200";
    case "red": return "bg-red-100 text-red-700 border-red-200";
    case "cyan": return "bg-cyan-100 text-cyan-700 border-cyan-200";
    case "pink": return "bg-pink-100 text-pink-700 border-pink-200";
    default: return "bg-gray-100 text-gray-700 border-gray-200";
  }
}

function getPriorityColor(priority: string) {
  switch (priority) {
    case "high": return "bg-red-500";
    case "medium": return "bg-orange-500";
    case "low": return "bg-green-500";
    default: return "bg-gray-500";
  }
}

export function MainCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselCards.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + carouselCards.length) % carouselCards.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % carouselCards.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentCard = carouselCards[currentIndex];

  return (
    <div className="h-[320px] lg:h-[380px] relative rounded-[24px] w-full overflow-hidden skeuo-card-elevated">
      <div aria-hidden="true" className="absolute border border-[rgba(139,49,35,0.15)] border-solid inset-0 pointer-events-none rounded-[24px]" />
      
      {/* Content */}
      <div className="relative h-full flex flex-col p-6 lg:p-8 gap-6">
        {/* Header Section */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="text-[#8b3123] opacity-90 flex-shrink-0">
              {currentCard.icon}
            </div>
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${getPriorityColor(currentCard.priority)}`} />
              <span className="text-[#8b3123] text-[12px] lg:text-[14px] font-['Montserrat_Alternates:Bold',_sans-serif] opacity-60 uppercase tracking-wider">
                {currentCard.priority} PRIORITY
              </span>
            </div>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <Button 
              onClick={handlePrevious}
              variant="ghost" 
              size="icon"
              className="text-[#8b3123] hover:bg-[rgba(139,49,35,0.1)] h-9 w-9 lg:h-10 lg:w-10"
            >
              <ChevronLeft className="h-4 w-4 lg:h-5 lg:w-5" />
            </Button>
            <Button 
              onClick={handleNext}
              variant="ghost" 
              size="icon"
              className="text-[#8b3123] hover:bg-[rgba(139,49,35,0.1)] h-9 w-9 lg:h-10 lg:w-10"
            >
              <ChevronRight className="h-4 w-4 lg:h-5 lg:w-5" />
            </Button>
          </div>
        </div>

        {/* Title and Description */}
        <div className="flex-1">
          <h3 className="text-[#8b3123] text-[24px] lg:text-[32px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-3 lg:mb-4 leading-tight">
            {currentCard.title}
          </h3>
          <p className="text-[#8b3123] text-[14px] lg:text-[16px] font-['Montserrat_Alternates:Medium',_sans-serif] opacity-75 leading-relaxed mb-6">
            {currentCard.description}
          </p>

          {/* Information Pills */}
          <div className="flex flex-wrap gap-3 mb-6">
            {currentCard.pills.map((pill, index) => (
              <div 
                key={index}
                className={`px-4 py-2 rounded-[12px] border ${getPillColor(pill.color)} font-['Montserrat_Alternates:SemiBold',_sans-serif] text-[12px] lg:text-[13px] skeuo-badge`}
              >
                <span className="opacity-70">{pill.label}:</span>
                <span className="ml-1 font-['Montserrat_Alternates:Bold',_sans-serif]">{pill.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex items-center justify-between">
          {/* Carousel indicators */}
          <div className="flex gap-2">
            {carouselCards.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                  setTimeout(() => setIsAutoPlaying(true), 10000);
                }}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-[#8b3123] w-8' 
                    : 'bg-[rgba(139,49,35,0.3)] w-2'
                }`}
              />
            ))}
          </div>
          
          {/* Action Button */}
          <Button 
            className="skeuo-button-primary font-['Montserrat_Alternates:SemiBold',_sans-serif] text-[14px] lg:text-[16px] px-6 lg:px-8 py-3 lg:py-4 rounded-[15px] h-auto"
          >
            {currentCard.cta}
          </Button>
        </div>
      </div>
    </div>
  );
}