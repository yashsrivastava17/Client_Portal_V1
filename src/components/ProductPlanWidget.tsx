import { CollapsibleSection } from "./CollapsibleSection";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Briefcase, Circle, Activity, CheckSquare, Clock, User, Flag, Calendar, Folder, Target } from "lucide-react";

interface Task {
  id: string;
  title: string;
  status: "TO DO" | "IN PROGRESS" | "REVIEW";
  priority: "low" | "medium" | "high";
  assignee: string;
  dueDate: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  progress: number;
  status: "active" | "planning" | "completed";
  team: string[];
  dueDate: string;
  priority: "low" | "medium" | "high";
}

const tasks: Task[] = [
  {
    id: "1",
    title: "Brand Guidelines Update",
    status: "TO DO",
    priority: "low",
    assignee: "Sarah",
    dueDate: "2024-01-15"
  },
  {
    id: "2", 
    title: "Homepage Hero Implementation",
    status: "IN PROGRESS",
    priority: "high",
    assignee: "Alex",
    dueDate: "2024-01-10"
  },
  {
    id: "3",
    title: "Mobile Menu Bug Fix", 
    status: "REVIEW",
    priority: "medium",
    assignee: "Jordan",
    dueDate: "2024-01-08"
  },
  {
    id: "4",
    title: "Design System Documentation",
    status: "TO DO", 
    priority: "medium",
    assignee: "Taylor",
    dueDate: "2024-01-20"
  },
  {
    id: "5",
    title: "User Research Analysis",
    status: "IN PROGRESS",
    priority: "high", 
    assignee: "Morgan",
    dueDate: "2024-01-12"
  },
  {
    id: "6",
    title: "A/B Test Results Review",
    status: "REVIEW",
    priority: "low",
    assignee: "Casey",
    dueDate: "2024-01-05"
  }
];

const projects: Project[] = [
  {
    id: "1",
    name: "Brand Identity Refresh",
    description: "Complete rebrand with new logo, color palette, and brand guidelines",
    progress: 75,
    status: "active",
    team: ["Sarah", "Alex", "Jordan"],
    dueDate: "2024-02-15",
    priority: "high"
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "iOS and Android app development for customer portal",
    progress: 45,
    status: "active",
    team: ["Morgan", "Taylor", "Casey", "Alex"],
    dueDate: "2024-03-30",
    priority: "high"
  },
  {
    id: "3",
    name: "Website Performance Optimization",
    description: "Core Web Vitals improvement and page speed optimization",
    progress: 90,
    status: "active",
    team: ["Jordan", "Alex"],
    dueDate: "2024-01-25",
    priority: "medium"
  },
  {
    id: "4",
    name: "Customer Onboarding Redesign",
    description: "UX improvements for new customer onboarding flow",
    progress: 20,
    status: "planning",
    team: ["Morgan", "Sarah"],
    dueDate: "2024-04-15",
    priority: "medium"
  }
];

function getStatusColor(status: Task['status']) {
  switch (status) {
    case "TO DO": return "bg-slate-100 text-slate-700 border-slate-200";
    case "IN PROGRESS": return "bg-blue-100 text-blue-700 border-blue-200";
    case "REVIEW": return "bg-emerald-100 text-emerald-700 border-emerald-200";
  }
}

function getPriorityColor(priority: Task['priority'] | Project['priority']) {
  switch (priority) {
    case "low": return "bg-green-100 text-green-700 border-green-200";
    case "medium": return "bg-orange-100 text-orange-700 border-orange-200";
    case "high": return "bg-red-100 text-red-700 border-red-200";
  }
}

function getProjectStatusColor(status: Project['status']) {
  switch (status) {
    case "active": return "bg-blue-100 text-blue-700 border-blue-200";
    case "planning": return "bg-orange-100 text-orange-700 border-orange-200";
    case "completed": return "bg-green-100 text-green-700 border-green-200";
  }
}

function getStatusIcon(status: Task['status']) {
  switch (status) {
    case "TO DO": return <Circle className="h-3 w-3" />;
    case "IN PROGRESS": return <Activity className="h-3 w-3" />;
    case "REVIEW": return <CheckSquare className="h-3 w-3" />;
  }
}

export function ProductPlanWidget({ onOpenKanban }: { onOpenKanban: () => void }) {
  const todoTasks = tasks.filter(task => task.status === "TO DO");
  const inProgressTasks = tasks.filter(task => task.status === "IN PROGRESS");
  const reviewTasks = tasks.filter(task => task.status === "REVIEW");
  const activeProjects = projects.filter(project => project.status === "active");

  return (
    <CollapsibleSection 
      title="Product Plan" 
      icon={<Briefcase className="h-5 w-5" />}
    >
      <div className="space-y-8">
        {/* Active Projects Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Folder className="h-4 w-4 text-[#8b3123]" />
              <h3 className="text-[#8b3123] text-[18px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
                Active Projects
              </h3>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="text-[#8b3123] border-[#8b3123] hover:bg-[rgba(139,49,35,0.1)] text-[12px] px-3"
            >
              View All Projects
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeProjects.map((project) => (
              <div 
                key={project.id}
                className="rounded-[24px] p-5 border border-[rgba(139,49,35,0.1)] hover:shadow-md transition-shadow"
                style={{
                  background: 'linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)), rgba(255, 255, 255, 0.4)'
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Target className="h-4 w-4 text-[#8b3123]" />
                    <Badge className={`text-[10px] px-2 py-1 ${getPriorityColor(project.priority)}`}>
                      <Flag className="h-2 w-2 mr-1" />
                      {project.priority}
                    </Badge>
                  </div>
                  <Badge className={`text-[10px] px-2 py-1 ${getProjectStatusColor(project.status)}`}>
                    {project.status.toUpperCase()}
                  </Badge>
                </div>

                <h4 className="text-[#8b3123] text-[16px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-2">
                  {project.name}
                </h4>
                
                <p className="text-[#8b3123] text-[12px] opacity-75 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#8b3123] text-[12px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
                      Progress
                    </span>
                    <span className="text-[#8b3123] text-[12px] font-['Montserrat_Alternates:Bold',_sans-serif]">
                      {project.progress}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-full bg-[#8b3123] rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                {/* Team and Due Date */}
                <div className="flex items-center justify-between text-[11px] text-[#8b3123] opacity-60">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>{project.team.length} members</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(project.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Tasks Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-[#8b3123]" />
              <h3 className="text-[#8b3123] text-[18px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
                Active Tasks
              </h3>
            </div>
            <Button 
              onClick={onOpenKanban}
              className="bg-[#8b3123] hover:bg-[#7a2e20] text-[#f3e1b7] text-[12px] px-4"
            >
              Open Kanban Board
            </Button>
          </div>

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
                    className="rounded-[24px] p-4 border border-[rgba(139,49,35,0.1)] cursor-pointer hover:border-[rgba(139,49,35,0.2)] transition-colors group"
                    style={{
                      background: 'linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)), rgba(255, 255, 255, 0.4)'
                    }}
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
                    className="rounded-[24px] p-4 border border-[rgba(139,49,35,0.1)] cursor-pointer hover:border-[rgba(139,49,35,0.2)] transition-colors group"
                    style={{
                      background: 'linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)), rgba(255, 255, 255, 0.4)'
                    }}
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
                    className="rounded-[24px] p-4 border border-[rgba(139,49,35,0.1)] cursor-pointer hover:border-[rgba(139,49,35,0.2)] transition-colors group"
                    style={{
                      background: 'linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)), rgba(255, 255, 255, 0.4)'
                    }}
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