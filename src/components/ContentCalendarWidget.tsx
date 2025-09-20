import { useState } from "react";
import { CollapsibleSection } from "./CollapsibleSection";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Calendar, ChevronLeft, ChevronRight, Plus, Video, FileText, Image, Share, Clock, Users } from "lucide-react";

interface CalendarEvent {
  id: string;
  title: string;
  type: "video" | "post" | "campaign" | "review";
  date: Date;
  time?: string;
  status: "scheduled" | "in-progress" | "completed" | "overdue";
  assignee?: string;
  description?: string;
  priority: "low" | "medium" | "high";
}

const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Holiday Campaign Video",
    type: "video",
    date: new Date(2024, 0, 15),
    time: "10:00 AM",
    status: "scheduled",
    assignee: "Sarah M.",
    description: "Final video for holiday campaign launch",
    priority: "high"
  },
  {
    id: "2", 
    title: "Q1 Strategy Review",
    type: "review",
    date: new Date(2024, 0, 18),
    time: "2:00 PM",
    status: "scheduled",
    assignee: "Team",
    description: "Quarterly content strategy alignment",
    priority: "medium"
  },
  {
    id: "3",
    title: "Social Media Posts",
    type: "post",
    date: new Date(2024, 0, 20),
    time: "9:00 AM",
    status: "in-progress",
    assignee: "Alex K.",
    description: "Weekly social media content batch",
    priority: "medium"
  },
  {
    id: "4",
    title: "Brand Guidelines Update",
    type: "campaign",
    date: new Date(2024, 0, 12),
    time: "11:00 AM",
    status: "overdue",
    assignee: "Jordan L.",
    description: "Update brand guidelines for new campaign",
    priority: "high"
  },
  {
    id: "5",
    title: "Product Demo Video",
    type: "video", 
    date: new Date(2024, 0, 25),
    time: "3:00 PM",
    status: "scheduled",
    assignee: "Morgan T.",
    description: "Demo video for new product launch",
    priority: "high"
  }
];

const typeConfig = {
  video: { icon: <Video className="h-4 w-4" />, color: "bg-blue-100 text-blue-700 border-blue-200" },
  post: { icon: <Share className="h-4 w-4" />, color: "bg-green-100 text-green-700 border-green-200" },
  campaign: { icon: <FileText className="h-4 w-4" />, color: "bg-purple-100 text-purple-700 border-purple-200" },
  review: { icon: <Users className="h-4 w-4" />, color: "bg-orange-100 text-orange-700 border-orange-200" }
};

const statusConfig = {
  scheduled: { color: "bg-blue-100 text-blue-700 border-blue-200", label: "Scheduled" },
  "in-progress": { color: "bg-yellow-100 text-yellow-700 border-yellow-200", label: "In Progress" },
  completed: { color: "bg-green-100 text-green-700 border-green-200", label: "Completed" },
  overdue: { color: "bg-red-100 text-red-700 border-red-200", label: "Overdue" }
};

const priorityConfig = {
  low: { color: "bg-gray-100 text-gray-700 border-gray-200" },
  medium: { color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  high: { color: "bg-red-100 text-red-700 border-red-200" }
};

export function ContentCalendarWidget() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1)); // January 2024
  const [viewMode, setViewMode] = useState<"month" | "list">("month");

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getEventsForDate = (date: number) => {
    return mockEvents.filter(event => 
      event.date.getDate() === date && 
      event.date.getMonth() === currentDate.getMonth() &&
      event.date.getFullYear() === currentDate.getFullYear()
    );
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const upcomingEvents = mockEvents
    .filter(event => event.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 6);

  return (
    <CollapsibleSection 
      title="Content Calendar" 
      icon={<Calendar className="h-5 w-5" />}
    >
      <div className="space-y-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="text-[#8b3123] text-[18px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
              {monthName}
            </h3>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth("prev")}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth("next")}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex rounded-[8px] border border-[rgba(139,49,35,0.2)] overflow-hidden">
              <Button
                variant={viewMode === "month" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("month")}
                className={`rounded-none h-8 text-xs ${
                  viewMode === "month" 
                    ? "bg-[#8b3123] text-[#f3e1b7]" 
                    : "text-[#8b3123] hover:bg-[rgba(139,49,35,0.1)]"
                }`}
              >
                Month
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={`rounded-none h-8 text-xs ${
                  viewMode === "list" 
                    ? "bg-[#8b3123] text-[#f3e1b7]" 
                    : "text-[#8b3123] hover:bg-[rgba(139,49,35,0.1)]"
                }`}
              >
                List
              </Button>
            </div>
            
            <Button 
              size="sm"
              className="bg-[#8b3123] hover:bg-[#7a2e20] text-[#f3e1b7] text-xs px-3"
            >
              <Plus className="h-3 w-3 mr-1" />
              Add Event
            </Button>
          </div>
        </div>

        {viewMode === "month" ? (
          /* Month View */
          <div>
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {/* Day headers */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-2 text-center">
                  <span className="text-[#8b3123] text-[12px] font-['Montserrat_Alternates:SemiBold',_sans-serif] opacity-60">
                    {day}
                  </span>
                </div>
              ))}
              
              {/* Empty cells for days before month starts */}
              {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                <div key={`empty-${index}`} className="h-20 p-1" />
              ))}
              
              {/* Days of the month */}
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1;
                const dayEvents = getEventsForDate(day);
                const isToday = new Date().getDate() === day && 
                              new Date().getMonth() === currentDate.getMonth() &&
                              new Date().getFullYear() === currentDate.getFullYear();
                
                return (
                  <div 
                    key={day} 
                    className={`h-20 p-1 border border-[rgba(139,49,35,0.1)] rounded-[8px] cursor-pointer hover:bg-[rgba(139,49,35,0.05)] transition-colors ${
                      isToday ? 'bg-[rgba(139,49,35,0.1)]' : ''
                    }`}
                  >
                    <div className="h-full flex flex-col">
                      <div className={`text-[12px] font-['Montserrat_Alternates:SemiBold',_sans-serif] mb-1 ${
                        isToday ? 'text-[#8b3123]' : 'text-[#8b3123] opacity-70'
                      }`}>
                        {day}
                      </div>
                      <div className="flex-1 space-y-1 overflow-hidden">
                        {dayEvents.slice(0, 2).map(event => (
                          <div 
                            key={event.id}
                            className={`text-[10px] px-1 py-0.5 rounded border ${typeConfig[event.type].color} truncate`}
                          >
                            {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-[10px] text-[#8b3123] opacity-60 px-1">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
            <h4 className="text-[#8b3123] text-[16px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
              Upcoming Events
            </h4>
            
            {upcomingEvents.map(event => (
              <div 
                key={event.id}
                className="rounded-[16px] p-4 border border-[rgba(139,49,35,0.1)] hover:border-[rgba(139,49,35,0.2)] transition-colors cursor-pointer"
                style={{
                  background: 'linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)), rgba(255, 255, 255, 0.4)'
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full border text-[10px] font-['Montserrat_Alternates:Medium',_sans-serif] ${typeConfig[event.type].color}`}>
                      {typeConfig[event.type].icon}
                      {event.type}
                    </div>
                    <Badge className={`text-[10px] px-2 py-1 ${statusConfig[event.status].color}`}>
                      {statusConfig[event.status].label}
                    </Badge>
                    <Badge className={`text-[10px] px-2 py-1 ${priorityConfig[event.priority].color}`}>
                      {event.priority}
                    </Badge>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-[#8b3123] text-[12px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
                      {event.date.toLocaleDateString()}
                    </div>
                    {event.time && (
                      <div className="text-[#8b3123] text-[11px] opacity-60 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {event.time}
                      </div>
                    )}
                  </div>
                </div>

                <h5 className="text-[#8b3123] text-[14px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-1">
                  {event.title}
                </h5>
                
                {event.description && (
                  <p className="text-[#8b3123] text-[12px] opacity-75 mb-2">
                    {event.description}
                  </p>
                )}

                {event.assignee && (
                  <div className="flex items-center gap-1 text-[#8b3123] text-[11px] opacity-60">
                    <Users className="h-3 w-3" />
                    <span>Assigned to {event.assignee}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Calendar Legend */}
        <div className="flex flex-wrap gap-4 pt-4 border-t border-[rgba(139,49,35,0.1)]">
          <div className="flex items-center gap-2">
            <span className="text-[#8b3123] text-[12px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">Types:</span>
            {Object.entries(typeConfig).map(([type, config]) => (
              <div key={type} className={`flex items-center gap-1 px-2 py-1 rounded-full border text-[10px] ${config.color}`}>
                {config.icon}
                {type}
              </div>
            ))}
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
}