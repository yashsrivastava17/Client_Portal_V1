import { useState, useRef } from "react";
import { Star } from "lucide-react";

interface EnhancedStarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  readonly?: boolean;
  showValue?: boolean;
}

export function EnhancedStarRating({
  rating,
  onRatingChange,
  maxRating = 5,
  size = "md",
  readonly = false,
  showValue = true
}: EnhancedStarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const sizes = {
    sm: "h-5 w-5",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (readonly) return;
    
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const starWidth = rect.width / maxRating;
    const newRating = Math.min(maxRating, Math.max(0, (x / starWidth)));
    
    // Round to nearest 0.1 for smooth decimal precision
    const roundedRating = Math.round(newRating * 10) / 10;
    setHoverRating(roundedRating);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (readonly) return;
    
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const starWidth = rect.width / maxRating;
    const newRating = Math.min(maxRating, Math.max(0, (x / starWidth)));
    
    // Round to nearest 0.1 for decimal precision
    const roundedRating = Math.round(newRating * 10) / 10;
    onRatingChange(roundedRating);
  };

  const displayRating = isHovering ? hoverRating : rating;

  const renderStar = (index: number) => {
    const starNumber = index + 1;
    const fillPercentage = Math.min(1, Math.max(0, displayRating - index));
    
    return (
      <div key={index} className="relative">
        {/* Background star */}
        <Star 
          className={`${sizes[size]} text-gray-300 absolute inset-0`}
          fill="currentColor"
        />
        
        {/* Filled portion */}
        <div 
          className="overflow-hidden relative"
          style={{ width: `${fillPercentage * 100}%` }}
        >
          <Star 
            className={`${sizes[size]} text-[#8b3123] transition-colors duration-200`}
            fill="currentColor"
          />
        </div>
        
        {/* Hover glow effect */}
        {isHovering && fillPercentage > 0 && (
          <Star 
            className={`${sizes[size]} text-[#8b3123] absolute inset-0 opacity-30 animate-pulse`}
            fill="currentColor"
          />
        )}
      </div>
    );
  };

  return (
    <div className="flex items-center gap-3">
      <div
        ref={containerRef}
        className={`flex items-center gap-1 ${!readonly ? 'cursor-pointer' : ''} skeuo-card p-3 rounded-[12px]`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          setHoverRating(0);
        }}
        onClick={handleClick}
      >
        {Array.from({ length: maxRating }, (_, index) => renderStar(index))}
      </div>
      
      {showValue && (
        <div className="flex items-center gap-2">
          <div className="skeuo-badge px-3 py-1 rounded-[8px] min-w-[60px] text-center">
            <span className="text-[#8b3123] font-['Montserrat_Alternates:SemiBold',_sans-serif] text-sm">
              {displayRating.toFixed(1)}
            </span>
          </div>
          {readonly && (
            <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-200">
              Normalized: {Math.round((displayRating / maxRating) * 100)}%
            </div>
          )}
        </div>
      )}
    </div>
  );
}