import { Palette } from "lucide-react";
import { CollapsibleSection } from "./CollapsibleSection";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface DesignUpdate {
  id: string;
  title: string;
  type: "concept" | "revision" | "final";
  status: "new" | "in-review" | "approved" | "changes-requested";
  thumbnail: string;
  lastUpdated: string;
  description: string;
}

const designUpdates: DesignUpdate[] = [
  {
    id: "1",
    title: "Logo Variations",
    type: "revision",
    status: "in-review",
    thumbnail: "/api/placeholder/200/150",
    lastUpdated: "2 hours ago",
    description: "Updated logo variations with improved typography"
  },
  {
    id: "2",
    title: "Brand Guidelines",
    type: "final",
    status: "approved",
    thumbnail: "/api/placeholder/200/150",
    lastUpdated: "1 day ago", 
    description: "Complete brand guidelines document with usage examples"
  },
  {
    id: "3",
    title: "Website Mockups",
    type: "concept",
    status: "new",
    thumbnail: "/api/placeholder/200/150",
    lastUpdated: "3 hours ago",
    description: "Initial homepage and landing page concepts"
  },
  {
    id: "4",
    title: "Color Palette",
    type: "revision",
    status: "changes-requested",
    thumbnail: "/api/placeholder/200/150",
    lastUpdated: "5 hours ago",
    description: "Refined color palette with accessibility considerations"
  }
];

export function DesignUpdatesWidget() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-blue-100 text-blue-800 border-blue-200";
      case "in-review": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "approved": return "bg-green-100 text-green-800 border-green-200";
      case "changes-requested": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "concept": return "bg-purple-100 text-purple-800 border-purple-200";
      case "revision": return "bg-orange-100 text-orange-800 border-orange-200";
      case "final": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <CollapsibleSection
      title="Design Updates"
      icon={<Palette className="h-5 w-5" />}
      badge={`${designUpdates.filter(u => u.status === "new").length} new`}
      defaultOpen={true}
    >
      <div className="space-y-4">
        {/* Thumbnail Rail */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {designUpdates.map((update) => (
            <div key={update.id} className="flex-shrink-0 relative group cursor-pointer">
              <div className="w-[150px] h-[100px] bg-[rgba(139,49,35,0.1)] rounded-[12px] overflow-hidden border border-[rgba(139,49,35,0.2)] group-hover:border-[#8b3123] transition-colors">
                <ImageWithFallback
                  src={update.thumbnail}
                  alt={update.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-2 right-2">
                <Badge className={getStatusColor(update.status)}>
                  {update.status.replace('-', ' ')}
                </Badge>
              </div>
              <div className="mt-2">
                <p className="text-[#8b3123] text-[12px] font-['Montserrat_Alternates:SemiBold',_sans-serif] truncate">
                  {update.title}
                </p>
                <p className="text-[#8b3123] text-[10px] opacity-70">
                  {update.lastUpdated}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Grid View */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {designUpdates.map((update) => (
            <div key={update.id} className="skeuo-card rounded-[16px] p-5 hover:scale-[1.01] transition-all cursor-pointer">
              {/* Primary badges - top level hierarchy */}
              <div className="flex gap-2 mb-4">
                <Badge className={getTypeColor(update.type)}>
                  {update.type}
                </Badge>
                <Badge className={getStatusColor(update.status)}>
                  {update.status.replace('-', ' ')}
                </Badge>
              </div>
              
              {/* Main content - secondary hierarchy */}
              <div className="mb-4">
                <h4 className="text-[#8b3123] font-['Montserrat_Alternates:Bold',_sans-serif] text-[18px] mb-3 leading-tight">
                  {update.title}
                </h4>
                
                <p className="text-[#8b3123] text-[14px] opacity-75 mb-4 leading-relaxed line-clamp-2">
                  {update.description}
                </p>
              </div>
              
              {/* Action row - tertiary hierarchy */}
              <div className="flex items-center justify-between pt-3 border-t border-[rgba(139,49,35,0.1)]">
                <span className="text-[#8b3123] text-[12px] opacity-60 font-['Montserrat_Alternates:Medium',_sans-serif]">
                  {update.lastUpdated}
                </span>
                <button className="skeuo-button text-[#8b3123] text-[12px] px-3 py-1.5 rounded-[8px] hover:scale-105 transition-transform">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3 mt-4">
          <Button className="bg-[#8b3123] text-[#f3e1b7] hover:bg-[#7a2e20] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
            View All Updates
          </Button>
          <Button variant="outline" className="border-[#8b3123] text-[#8b3123] hover:bg-[rgba(139,49,35,0.1)]">
            Request Changes
          </Button>
        </div>
      </div>
    </CollapsibleSection>
  );
}