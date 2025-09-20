import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";

interface CollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  badge?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function CollapsibleSection({ 
  title, 
  icon, 
  badge, 
  children, 
  defaultOpen = false 
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="w-full">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        {/* Unified Container with Enhanced Skeuomorphic Design */}
        <div className="skeuo-card-elevated rounded-[24px] w-full overflow-hidden">
          {/* Header - Enhanced with hierarchy */}
          <CollapsibleTrigger className="w-full group">
            <div className="skeuo-button-primary w-full h-[80px] flex items-center justify-between px-8 hover:scale-[1.01] transition-all">
              {/* Left side - Icon and Title with enhanced hierarchy */}
              <div className="flex items-center gap-5">
                {/* Icon with elevated styling and brown tint */}
                <div className="skeuo-card rounded-[20px] p-3 relative bg-gradient-to-br from-[#faf8f5] to-[#f5f1ec] border border-[rgba(139,49,35,0.12)]">
                  <div className="text-[#8b3123] flex items-center justify-center w-6 h-6" style={{ filter: 'sepia(0.3) saturate(1.2) hue-rotate(15deg)' }}>
                    {icon}
                  </div>
                </div>
                
                {/* Title and Badge with clear hierarchy */}
                <div className="flex items-center gap-4">
                  <h2 className="font-['Montserrat_Alternates:Bold',_sans-serif] text-white text-[22px] lg:text-[26px] drop-shadow-sm">
                    {title}
                  </h2>
                  {badge && (
                    <span className="text-[#8b3123] text-[12px] lg:text-[13px] px-4 py-2 rounded-[14px] font-['Montserrat_Alternates:SemiBold',_sans-serif] bg-gradient-to-br from-[#faf8f5] to-[#f5f1ec] border border-[rgba(139,49,35,0.15)] shadow-sm" style={{ filter: 'sepia(0.15) saturate(1.1) hue-rotate(10deg)' }}>
                      {badge}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Right side - Enhanced Dropdown Arrow with brown tint */}
              <div className="skeuo-card rounded-full p-3 flex items-center justify-center hover:scale-110 transition-transform bg-gradient-to-br from-[#faf8f5] to-[#f5f1ec] border border-[rgba(139,49,35,0.12)]">
                <ChevronDown 
                  className={`h-6 w-6 text-[#8b3123] transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`} 
                  style={{ filter: 'sepia(0.3) saturate(1.2) hue-rotate(15deg)' }}
                />
              </div>
            </div>
          </CollapsibleTrigger>

          {/* Content - Seamlessly connected with enhanced styling */}
          <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden">
            <div className="p-8 lg:p-10 bg-gradient-to-b from-white to-[#fafbfc]">
              <div className="space-y-6">
                {children}
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
}