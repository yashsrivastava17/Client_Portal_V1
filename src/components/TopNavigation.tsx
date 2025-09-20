import svgPaths from "../imports/svg-dvhla9drce";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Switch } from "./ui/switch";
import { useState, useEffect } from "react";
import { LayoutGrid, List } from "lucide-react";

interface NavItemProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  isScrolled: boolean;
}

function NavItem({ label, isActive, onClick, isScrolled }: NavItemProps) {
  return (
    <div 
      className={`
        relative cursor-pointer group transition-all duration-500 ease-out
        ${isScrolled 
          ? 'px-3 py-2 rounded-lg' 
          : 'px-6 py-3 rounded-2xl'
        }
        ${isActive 
          ? 'skeuo-button-primary text-white' 
          : 'skeuo-button text-[#8b3123]'
        }
      `}
      onClick={onClick}
    >
      <span 
        className={`
          font-['Montserrat_Alternates:${isActive ? 'Bold' : 'SemiBold'}',_sans-serif] 
          transition-all duration-500 whitespace-nowrap
          ${isScrolled 
            ? 'text-sm' 
            : 'text-base'
          }
          ${isActive 
            ? 'text-white' 
            : 'text-[#8b3123]'
          }
        `}
      >
        {label}
      </span>
    </div>
  );
}

interface TopNavigationProps {
  currentPage: "design" | "echo" | "calendar" | "labs";
  onPageChange: (page: "design" | "echo" | "calendar" | "labs") => void;
  viewMode?: "bento" | "list";
  onViewModeChange?: (mode: "bento" | "list") => void;
}

export function TopNavigation({ currentPage, onPageChange, viewMode = "bento", onViewModeChange }: TopNavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 60;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full">
      <div className="w-full flex justify-center py-4">
        <div 
          className={`
            relative skeuo-card-elevated transition-all duration-500 ease-in-out flex items-center
            ${isScrolled 
              ? 'h-16 rounded-full px-6 gap-4' 
              : 'h-20 rounded-full px-8 gap-6'
            }
          `}
          style={{ 
            width: isScrolled ? 'auto' : '90%',
            maxWidth: isScrolled ? 'none' : '1200px',
            transformOrigin: 'center center'
          }}
        >
          {/* Logo and Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div 
              className={`
                skeuo-card p-1 rounded-full bg-gradient-to-br from-[#faf8f5] to-white transition-all duration-500
                ${isScrolled ? 'size-8' : 'size-12'}
              `}
            >
              <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 42 42">
                <path d={svgPaths.p29153400} fill="#8B3123" fillOpacity="0.8" />
              </svg>
            </div>
            
            {/* Brand text - fades out when scrolled */}
            <div 
              className={`
                font-['Montserrat_Alternates:Bold',_sans-serif] text-[#8b3123] transition-all duration-500 overflow-hidden
                ${isScrolled 
                  ? 'opacity-0 w-0' 
                  : 'opacity-100 text-xl lg:text-2xl'
                }
              `}
            >
              Crenoir X MAP
            </div>
          </div>

          {/* Navigation Items */}
          <div 
            className={`
              hidden lg:flex items-center transition-all duration-500
              ${isScrolled ? 'gap-2' : 'gap-4'}
            `}
          >
            <NavItem 
              label="Calendar" 
              isActive={currentPage === "calendar"} 
              onClick={() => onPageChange("calendar")}
              isScrolled={isScrolled}
            />
            <NavItem 
              label="Design" 
              isActive={currentPage === "design"} 
              onClick={() => onPageChange("design")}
              isScrolled={isScrolled}
            />
            <NavItem 
              label="Echo" 
              isActive={currentPage === "echo"} 
              onClick={() => onPageChange("echo")}
              isScrolled={isScrolled}
            />
            <NavItem 
              label="Labs" 
              isActive={currentPage === "labs"} 
              onClick={() => onPageChange("labs")}
              isScrolled={isScrolled}
            />
          </div>

          {/* Spacer to push right items to the end */}
          <div className="flex-1"></div>

          {/* View Toggle - Only visible when NOT scrolled */}
          {!isScrolled && (
            <div className="hidden lg:flex items-center gap-2 skeuo-card px-3 py-2 rounded-xl">
              <LayoutGrid className={`h-4 w-4 ${viewMode === "bento" ? "text-[#8b3123]" : "text-gray-400"}`} />
              <Switch 
                checked={viewMode === "list"}
                onCheckedChange={(checked) => onViewModeChange?.(checked ? "list" : "bento")}
                className="skeuo-toggle-switch"
              />
              <List className={`h-4 w-4 ${viewMode === "list" ? "text-[#8b3123]" : "text-gray-400"}`} />
            </div>
          )}

          {/* Profile Avatar - Only visible when NOT scrolled */}
          {!isScrolled && (
            <Avatar className="h-10 w-10 border-2 border-[rgba(139,49,35,0.2)] cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback className="bg-[rgba(139,49,35,0.1)] text-[#8b3123] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
                CM
              </AvatarFallback>
            </Avatar>
          )}

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <div className="flex flex-col gap-1">
                <div className="w-4 h-0.5 bg-[#8b3123]"></div>
                <div className="w-4 h-0.5 bg-[#8b3123]"></div>
                <div className="w-4 h-0.5 bg-[#8b3123]"></div>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}