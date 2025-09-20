import { useState } from "react";
import { ChevronLeft, ChevronRight, Bell, Vote, TrendingUp, BarChart3, Target, Users, MessageSquare, Lightbulb, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";

interface EchoCarouselProps {
  onOpenVoting: () => void;
  onOpenMetrics: () => void;
  onOpenFeedback: () => void;
}

interface CarouselCard {
  id: string;
  type: "new-tasks" | "metrics" | "concept-capture" | "voting" | "feedback" | "insights";
  title: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  icon: React.ComponentType<{ className?: string }>;
  action?: {
    label: string;
    onClick: () => void;
  };
  metrics?: Array<{
    label: string;
    value: string | number;
    color?: string;
  }>;
}

export function EchoCarousel({ onOpenVoting, onOpenMetrics, onOpenFeedback }: EchoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quickNote, setQuickNote] = useState("");

  const handleQuickCapture = () => {
    if (quickNote.trim()) {
      console.log("Quick concept captured:", quickNote);
      setQuickNote("");
    }
  };

  const cards: CarouselCard[] = [
    {
      id: "voting",
      type: "voting",
      title: "Executive Decision Making",
      description: "Lead strategic decisions on AI model outputs. Your votes directly guide development priorities and quality standards across our entire video pipeline.",
      badge: "5 Active Decisions",
      badgeColor: "bg-purple-100 text-purple-800", 
      icon: Vote,
      action: {
        label: "Cast Strategic Votes",
        onClick: onOpenVoting
      }
    },
    {
      id: "feedback",
      type: "feedback", 
      title: "RLHF Leadership Input",
      description: "Provide executive-level feedback that shapes AI model training. Your input defines quality benchmarks and strategic direction for our development team.",
      badge: "3 High Priority",
      badgeColor: "bg-red-100 text-red-800",
      icon: MessageSquare,
      action: {
        label: "Provide Strategic Feedback",
        onClick: onOpenFeedback
      }
    },
    {
      id: "concept-capture",
      type: "concept-capture",
      title: "Strategic Vision Input",
      description: "Share executive insights that drive our product roadmap. Your concepts become the foundation for next-generation AI capabilities.",
      badge: "Quick Strategic Input",
      badgeColor: "bg-yellow-100 text-yellow-800",
      icon: Lightbulb
    },
    {
      id: "metrics",
      type: "metrics",
      title: "Executive Dashboard",
      description: "Monitor stakeholder impact on AI performance metrics. Track how leadership decisions translate into measurable model improvements.",
      badge: "Real-time KPIs",
      badgeColor: "bg-green-100 text-green-800",
      icon: BarChart3,
      metrics: [
        { label: "Leadership Decisions", value: 28, color: "text-[#8b3123]" },
        { label: "Model Performance", value: "94%", color: "text-green-600" },
        { label: "Quality Enhancement", value: "+0.7★", color: "text-yellow-600" },
        { label: "Strategic Alignment", value: "97%", color: "text-blue-600" }
      ],
      action: {
        label: "View Executive Report",
        onClick: onOpenMetrics
      }
    },
    {
      id: "insights",
      type: "insights",
      title: "Strategic Impact Analysis",
      description: "Comprehensive view of how executive contributions drive measurable improvements in AI model quality and business outcomes.",
      badge: "Q4 2024 Summary",
      badgeColor: "bg-indigo-100 text-indigo-800",
      icon: TrendingUp,
      metrics: [
        { label: "Executive Inputs", value: 89, color: "text-[#8b3123]" },
        { label: "ROI Improvement", value: "+34%", color: "text-green-600" },
        { label: "Quality Standards", value: "+1.2★", color: "text-yellow-600" },
        { label: "Efficiency Gains", value: "+45%", color: "text-blue-600" }
      ],
      action: {
        label: "View Full Impact Report",
        onClick: onOpenMetrics
      }
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const getVisibleCards = () => {
    const visibleCount = 1; // Show 1 card at a time for full width
    const visible = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % cards.length;
      visible.push(cards[index]);
    }
    return visible;
  };

  const renderCard = (card: CarouselCard, index: number) => {
    const Icon = card.icon;
    
    return (
      <div key={card.id} className="w-full h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="skeuo-card p-3 rounded-[12px] bg-gradient-to-br from-[#faf8f5] to-white border border-[rgba(139,49,35,0.08)]">
              <Icon className="h-6 w-6 text-[#8b3123]" />
            </div>
            <h3 className="text-[#8b3123] font-['Montserrat_Alternates:Bold',_sans-serif] text-lg">
              {card.title}
            </h3>
          </div>
          {card.badge && (
            <Badge className={`${card.badgeColor} border-0 text-xs skeuo-badge`}>
              {card.badge}
            </Badge>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {card.description}
        </p>

        {/* Content Area - Takes remaining space */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Concept Capture Special Case */}
          {card.type === "concept-capture" && (
            <div className="space-y-3">
              <Textarea
                placeholder="Share your video concept or strategic vision..."
                value={quickNote}
                onChange={(e) => setQuickNote(e.target.value)}
                className="skeuo-input min-h-[80px] text-sm resize-none"
              />
              <Button 
                onClick={handleQuickCapture}
                disabled={!quickNote.trim()}
                className="skeuo-button-primary w-full text-sm"
              >
                <Plus className="h-3 w-3 mr-2" />
                Capture Concept
              </Button>
            </div>
          )}

          {/* Metrics Display */}
          {card.metrics && (
            <div className="grid grid-cols-2 gap-3">
              {card.metrics.map((metric, idx) => (
                <div key={idx} className="skeuo-card p-3 rounded-[12px] text-center bg-gradient-to-br from-[#faf8f5] to-white border border-[rgba(139,49,35,0.06)]">
                  <div className={`text-lg font-['Montserrat_Alternates:Bold',_sans-serif] ${metric.color}`}>
                    {metric.value}
                  </div>
                  <div className="text-xs text-gray-600">{metric.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Action Button for non-metrics cards */}
          {card.action && !card.metrics && (
            <div className="pt-4">
              <Button 
                onClick={card.action.onClick}
                className="skeuo-button-primary w-full"
              >
                {card.action.label}
              </Button>
            </div>
          )}
        </div>

        {/* Bottom Action for Metrics Cards */}
        {card.action && card.metrics && (
          <div className="mt-4 pt-3 border-t border-gray-100">
            <Button 
              onClick={card.action.onClick}
              variant="outline"
              className="skeuo-button w-full text-sm"
            >
              {card.action.label}
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-[320px] lg:h-[380px] relative rounded-[24px] w-full overflow-hidden skeuo-card-elevated">
      <div aria-hidden="true" className="absolute border border-[rgba(139,49,35,0.15)] border-solid inset-0 pointer-events-none rounded-[24px]" />
      
      {/* Left Arrow */}
      <Button
        onClick={prevSlide}
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8b3123] hover:bg-[rgba(139,49,35,0.1)] h-9 w-9 lg:h-10 lg:w-10 z-20"
      >
        <ChevronLeft className="h-4 w-4 lg:h-5 lg:w-5" />
      </Button>

      {/* Right Arrow */}
      <Button
        onClick={nextSlide}
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b3123] hover:bg-[rgba(139,49,35,0.1)] h-9 w-9 lg:h-10 lg:w-10 z-20"
      >
        <ChevronRight className="h-4 w-4 lg:h-5 lg:w-5" />
      </Button>

      {/* Cards Container - Full Width */}
      <div className="relative h-full flex flex-col p-6 lg:p-8 gap-6">
        {getVisibleCards().map((card, index) => renderCard(card, index))}
      </div>

      {/* Carousel Indicators - Exactly like MainCarousel */}
      <div className="absolute bottom-6 lg:bottom-8 left-6 lg:left-8">
        <div className="flex gap-2">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-[#8b3123] w-8' 
                  : 'bg-[rgba(139,49,35,0.3)] w-2'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}