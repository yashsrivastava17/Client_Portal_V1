import { Button } from "./ui/button";
import { LayoutGrid, List, Clock } from "lucide-react";

interface PipelineViewToggleProps {
  view: "timeline" | "kanban" | "cards";
  onViewChange: (view: "timeline" | "kanban" | "cards") => void;
}

export function PipelineViewToggle({ view, onViewChange }: PipelineViewToggleProps) {
  return (
    <div className="flex items-center gap-2 skeuo-card px-3 py-2 rounded-[12px]">
      <Button
        size="sm"
        variant={view === "timeline" ? "default" : "ghost"}
        className={`px-3 py-1.5 text-xs ${
          view === "timeline" 
            ? "skeuo-button-primary text-white" 
            : "skeuo-button text-[#8b3123]"
        }`}
        onClick={() => onViewChange("timeline")}
      >
        <Clock className="h-3 w-3 mr-1" />
        Timeline
      </Button>
      
      <Button
        size="sm"
        variant={view === "kanban" ? "default" : "ghost"}
        className={`px-3 py-1.5 text-xs ${
          view === "kanban" 
            ? "skeuo-button-primary text-white" 
            : "skeuo-button text-[#8b3123]"
        }`}
        onClick={() => onViewChange("kanban")}
      >
        <LayoutGrid className="h-3 w-3 mr-1" />
        Kanban
      </Button>
      
      <Button
        size="sm"
        variant={view === "cards" ? "default" : "ghost"}
        className={`px-3 py-1.5 text-xs ${
          view === "cards" 
            ? "skeuo-button-primary text-white" 
            : "skeuo-button text-[#8b3123]"
        }`}
        onClick={() => onViewChange("cards")}
      >
        <List className="h-3 w-3 mr-1" />
        Cards
      </Button>
    </div>
  );
}