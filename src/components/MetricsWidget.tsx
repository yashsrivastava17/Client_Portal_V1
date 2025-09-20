import { CollapsibleSection } from "./CollapsibleSection";
import { TrendingUp, TrendingDown, ExternalLink, Globe, Zap, Users, Activity, CheckSquare, Circle, Square } from "lucide-react";
import { Button } from "./ui/button";

interface MetricData {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  source: string;
  sourceIcon: React.ReactNode;
  description: string;
}

interface Task {
  id: string;
  title: string;
  status: "TO DO" | "IN PROGRESS" | "REVIEW";
  priority: "low" | "medium" | "high";
  assignee: string;
}

const metrics: MetricData[] = [
  {
    label: "Conversion Rate",
    value: "3.2%",
    change: "+0.8%",
    trend: "up",
    source: "Google Analytics",
    sourceIcon: <Globe className="h-3 w-3" />,
    description: "Homepage to signup conversion"
  },
  {
    label: "Page Load Time", 
    value: "1.2s",
    change: "-0.3s",
    trend: "up",
    source: "PageSpeed Insights",
    sourceIcon: <Zap className="h-3 w-3" />,
    description: "Average page load performance"
  },
  {
    label: "User Engagement",
    value: "4.8/5",
    change: "+0.2",
    trend: "up",
    source: "Hotjar Analytics",
    sourceIcon: <Users className="h-3 w-3" />,
    description: "User satisfaction score"
  }
];

const tasks: Task[] = [
  {
    id: "1",
    title: "Brand Guidelines Update",
    status: "TO DO",
    priority: "low",
    assignee: "Sarah"
  },
  {
    id: "2", 
    title: "Homepage Hero Implementation",
    status: "IN PROGRESS",
    priority: "high",
    assignee: "Alex"
  },
  {
    id: "3",
    title: "Mobile Menu Bug Fix", 
    status: "REVIEW",
    priority: "medium",
    assignee: "Jordan"
  },
  {
    id: "4",
    title: "Design System Documentation",
    status: "TO DO", 
    priority: "medium",
    assignee: "Taylor"
  },
  {
    id: "5",
    title: "User Research Analysis",
    status: "IN PROGRESS",
    priority: "high", 
    assignee: "Morgan"
  },
  {
    id: "6",
    title: "A/B Test Results Review",
    status: "REVIEW",
    priority: "low",
    assignee: "Casey"
  }
];

function getStatusColor(status: Task['status']) {
  switch (status) {
    case "TO DO": return "bg-slate-100 text-slate-700 border-slate-200";
    case "IN PROGRESS": return "bg-blue-100 text-blue-700 border-blue-200";
    case "REVIEW": return "bg-emerald-100 text-emerald-700 border-emerald-200";
  }
}

function getPriorityColor(priority: Task['priority']) {
  switch (priority) {
    case "low": return "bg-green-100 text-green-700 border-green-200";
    case "medium": return "bg-orange-100 text-orange-700 border-orange-200";
    case "high": return "bg-red-100 text-red-700 border-red-200";
  }
}

function getStatusIcon(status: Task['status']) {
  switch (status) {
    case "TO DO": return <Circle className="h-3 w-3" />;
    case "IN PROGRESS": return <Activity className="h-3 w-3" />;
    case "REVIEW": return <CheckSquare className="h-3 w-3" />;
  }
}

export function MetricsWidget() {
  const todoTasks = tasks.filter(task => task.status === "TO DO");
  const inProgressTasks = tasks.filter(task => task.status === "IN PROGRESS");
  const reviewTasks = tasks.filter(task => task.status === "REVIEW");

  return (
    <CollapsibleSection 
      title="Metrics & Active Tasks" 
      icon={<Activity className="h-5 w-5" />}
    >
      <div className="space-y-8">
        {/* Key Metrics Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[#8b3123]" />
              <h3 className="text-[#8b3123] text-[18px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
                Key Metrics
              </h3>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="text-[#8b3123] border-[#8b3123] hover:bg-[rgba(139,49,35,0.1)] text-[12px] px-3"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              View Dashboard
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {metrics.map((metric, index) => (
              <div 
                key={index}
                className="rounded-[12px] p-5 border border-[rgba(139,49,35,0.1)] bg-white/60"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[#8b3123] text-[13px] opacity-70 font-['Montserrat_Alternates:Medium',_sans-serif]">
                    {metric.label}
                  </div>
                  <div className={`flex items-center gap-1 text-[12px] font-['Montserrat_Alternates:SemiBold',_sans-serif] ${
                    metric.trend === "up" ? "text-emerald-600" : "text-red-600"
                  }`}>
                    {metric.trend === "up" ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {metric.change}
                  </div>
                </div>

                <div className="text-[#8b3123] text-[24px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-2">
                  {metric.value}
                </div>

                <div className="text-[#8b3123] text-[11px] opacity-60 mb-3">
                  {metric.description}
                </div>

                {/* Data Source */}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[rgba(139,49,35,0.1)]">
                  <div className="text-[#8b3123] opacity-50">
                    {metric.sourceIcon}
                  </div>
                  <div className="text-[#8b3123] text-[10px] opacity-60 font-['Montserrat_Alternates:Medium',_sans-serif]">
                    Source: {metric.source}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Tasks Section */}
        <div>
          <h3 className="text-[#8b3123] text-[18px] font-['Montserrat_Alternates:SemiBold',_sans-serif] mb-6">
            Active Tasks
          </h3>

          {/* Kanban Board */}
          <div className="grid grid-cols-3 gap-6">
            {/* TO DO Column */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Circle className="h-4 w-4 text-slate-500" />
                  <h4 className="text-[#8b3123] text-[14px] font-['Montserrat_Alternates:SemiBold',_sans-serif] opacity-70 uppercase tracking-wide">
                    TO DO
                  </h4>
                </div>
                <span className="bg-slate-100 text-slate-600 text-[11px] px-2 py-1 rounded-full font-['Montserrat_Alternates:Medium',_sans-serif]">
                  {todoTasks.length}
                </span>
              </div>
              <div className="space-y-3">
                {todoTasks.map((task) => (
                  <div 
                    key={task.id}
                    className="rounded-[12px] p-4 border border-[rgba(139,49,35,0.1)] cursor-pointer hover:border-[rgba(139,49,35,0.2)] transition-colors group bg-white/60"
                  >
                    <div className="flex items-start gap-2 mb-3">
                      {getStatusIcon(task.status)}
                      <div className="text-[#8b3123] text-[13px] font-['Montserrat_Alternates:Medium',_sans-serif] leading-tight group-hover:text-[#7a2e20] flex-1">
                        {task.title}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] px-2 py-1 rounded-full border font-['Montserrat_Alternates:Medium',_sans-serif] ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                      <span className="text-[#8b3123] text-[10px] opacity-60 font-['Montserrat_Alternates:Medium',_sans-serif]">
                        {task.assignee}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* IN PROGRESS Column */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-blue-500" />
                  <h4 className="text-[#8b3123] text-[14px] font-['Montserrat_Alternates:SemiBold',_sans-serif] opacity-70 uppercase tracking-wide">
                    IN PROGRESS
                  </h4>
                </div>
                <span className="bg-blue-100 text-blue-600 text-[11px] px-2 py-1 rounded-full font-['Montserrat_Alternates:Medium',_sans-serif]">
                  {inProgressTasks.length}
                </span>
              </div>
              <div className="space-y-3">
                {inProgressTasks.map((task) => (
                  <div 
                    key={task.id}
                    className="rounded-[12px] p-4 border border-[rgba(139,49,35,0.1)] cursor-pointer hover:border-[rgba(139,49,35,0.2)] transition-colors group bg-white/60"
                  >
                    <div className="flex items-start gap-2 mb-3">
                      {getStatusIcon(task.status)}
                      <div className="text-[#8b3123] text-[13px] font-['Montserrat_Alternates:Medium',_sans-serif] leading-tight group-hover:text-[#7a2e20] flex-1">
                        {task.title}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] px-2 py-1 rounded-full border font-['Montserrat_Alternates:Medium',_sans-serif] ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                      <span className="text-[#8b3123] text-[10px] opacity-60 font-['Montserrat_Alternates:Medium',_sans-serif]">
                        {task.assignee}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* REVIEW Column */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <CheckSquare className="h-4 w-4 text-emerald-500" />
                  <h4 className="text-[#8b3123] text-[14px] font-['Montserrat_Alternates:SemiBold',_sans-serif] opacity-70 uppercase tracking-wide">
                    REVIEW
                  </h4>
                </div>
                <span className="bg-emerald-100 text-emerald-600 text-[11px] px-2 py-1 rounded-full font-['Montserrat_Alternates:Medium',_sans-serif]">
                  {reviewTasks.length}
                </span>
              </div>
              <div className="space-y-3">
                {reviewTasks.map((task) => (
                  <div 
                    key={task.id}
                    className="rounded-[12px] p-4 border border-[rgba(139,49,35,0.1)] cursor-pointer hover:border-[rgba(139,49,35,0.2)] transition-colors group bg-white/60"
                  >
                    <div className="flex items-start gap-2 mb-3">
                      {getStatusIcon(task.status)}
                      <div className="text-[#8b3123] text-[13px] font-['Montserrat_Alternates:Medium',_sans-serif] leading-tight group-hover:text-[#7a2e20] flex-1">
                        {task.title}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] px-2 py-1 rounded-full border font-['Montserrat_Alternates:Medium',_sans-serif] ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                      <span className="text-[#8b3123] text-[10px] opacity-60 font-['Montserrat_Alternates:Medium',_sans-serif]">
                        {task.assignee}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
}