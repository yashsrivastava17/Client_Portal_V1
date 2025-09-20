import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { 
  Plus,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  Bug,
  Lightbulb,
  Settings,
  Phone,
  FileText,
  MoreHorizontal
} from "lucide-react";

interface ServiceRequest {
  id: string;
  title: string;
  description: string;
  type: "bug-report" | "feature-request" | "content-change" | "technical-support" | "consultation" | "other";
  status: "open" | "in-progress" | "pending-review" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  submittedBy: string;
  assignee?: string;
  assigneeAvatar?: string;
  submittedDate: string;
  lastUpdated?: string;
  responseTime?: string;
  commentCount?: number;
}

interface ServiceRequestsSectionProps {
  onOpenRequest: (type?: "design-change" | "user-research" | "dev-handoff" | "content-update" | "report-user-pattern") => void;
}

export function ServiceRequestsSection({ onOpenRequest }: ServiceRequestsSectionProps) {
  // Mock data for user's service requests
  const [serviceRequests] = useState<ServiceRequest[]>([
    {
      id: "SR-001",
      title: "Update brand colors in video templates",
      description: "Please update the primary brand color from blue to the new teal color across all video templates",
      type: "content-change",
      status: "in-progress",
      priority: "medium",
      submittedBy: "You",
      assignee: "Design Team",
      assigneeAvatar: "https://github.com/shadcn.png",
      submittedDate: "2024-01-10",
      lastUpdated: "2024-01-11",
      responseTime: "2 hours",
      commentCount: 3
    },
    {
      id: "SR-002",
      title: "Video export quality optimization",
      description: "Request optimization of video export settings to maintain 4K quality while reducing file sizes for faster delivery",
      type: "technical-support",
      status: "resolved",
      priority: "high",
      submittedBy: "You",
      assignee: "Tech Team",
      submittedDate: "2024-01-08",
      lastUpdated: "2024-01-10",
      responseTime: "4 hours",
      commentCount: 7
    },
    {
      id: "SR-003",
      title: "AI pipeline feedback integration",
      description: "Request enhancement to AI pipeline to better incorporate stakeholder feedback into generation iterations",
      type: "feature-request",
      status: "open",
      priority: "medium",
      submittedBy: "You",
      submittedDate: "2024-01-12",
      responseTime: "Pending",
      commentCount: 1
    },
    {
      id: "SR-004",
      title: "Monthly pipeline performance consultation",
      description: "Schedule quarterly strategy session to review pipeline performance and optimization opportunities",
      type: "consultation",
      status: "pending-review",
      priority: "low",
      submittedBy: "You",
      submittedDate: "2024-01-14",
      responseTime: "1 day",
      commentCount: 0
    }
  ]);

  const typeConfig = {
    "bug-report": { label: "Bug Report", color: "bg-red-100 text-red-800", icon: Bug },
    "feature-request": { label: "Feature Request", color: "bg-blue-100 text-blue-800", icon: Lightbulb },
    "content-change": { label: "Content Change", color: "bg-purple-100 text-purple-800", icon: FileText },
    "technical-support": { label: "Tech Support", color: "bg-orange-100 text-orange-800", icon: Settings },
    "consultation": { label: "Consultation", color: "bg-green-100 text-green-800", icon: Phone },
    "other": { label: "Other", color: "bg-gray-100 text-gray-800", icon: MoreHorizontal }
  };

  const statusConfig = {
    "open": { label: "Open", color: "bg-yellow-100 text-yellow-800", icon: Clock },
    "in-progress": { label: "In Progress", color: "bg-blue-100 text-blue-800", icon: Settings },
    "pending-review": { label: "Pending Review", color: "bg-purple-100 text-purple-800", icon: AlertCircle },
    "resolved": { label: "Resolved", color: "bg-green-100 text-green-800", icon: CheckCircle },
    "closed": { label: "Closed", color: "bg-gray-100 text-gray-600", icon: CheckCircle }
  };

  const priorityConfig = {
    "urgent": { label: "Urgent", color: "bg-red-100 text-red-800" },
    "high": { label: "High", color: "bg-orange-100 text-orange-800" },
    "medium": { label: "Medium", color: "bg-yellow-100 text-yellow-800" },
    "low": { label: "Low", color: "bg-green-100 text-green-800" }
  };

  const requestTypes = [
    {
      type: "content-change" as const,
      title: "Content Update",
      description: "Request changes to video content, scripts, or visual elements",
      icon: FileText,
      color: "bg-purple-50 border-purple-200"
    },
    {
      type: "feature-request" as const,
      title: "Feature Enhancement",
      description: "Suggest new pipeline features or workflow improvements",
      icon: Lightbulb,
      color: "bg-blue-50 border-blue-200"
    },
    {
      type: "technical-support" as const,
      title: "Technical Support",
      description: "Get help with technical issues or optimization",
      icon: Settings,
      color: "bg-orange-50 border-orange-200"
    },
    {
      type: "consultation" as const,
      title: "Strategy Consultation",
      description: "Schedule meetings to discuss pipeline strategy and performance",
      icon: Phone,
      color: "bg-green-50 border-green-200"
    }
  ];

  const renderRequestCard = (request: ServiceRequest) => {
    const TypeIcon = typeConfig[request.type].icon;
    const StatusIcon = statusConfig[request.status].icon;

    return (
      <div key={request.id} className="skeuo-card p-5 rounded-[16px] hover:scale-[1.02] transition-all">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Badge className={`${typeConfig[request.type].color} border-0 text-xs`}>
              <TypeIcon className="h-3 w-3 mr-1" />
              {typeConfig[request.type].label}
            </Badge>
            <Badge className={`${statusConfig[request.status].color} border-0 text-xs`}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {statusConfig[request.status].label}
            </Badge>
          </div>
          
          <Badge className={`${priorityConfig[request.priority].color} border-0 text-xs`}>
            {priorityConfig[request.priority].label}
          </Badge>
        </div>

        <h4 className="text-[#8b3123] font-['Montserrat_Alternates:SemiBold',_sans-serif] mb-2">
          {request.title}
        </h4>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {request.description}
        </p>

        {/* Assignment Info */}
        {request.assignee && (
          <div className="skeuo-card p-3 rounded-[12px] bg-blue-50 mb-3">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={request.assigneeAvatar} />
                <AvatarFallback className="text-xs bg-blue-200 text-blue-800">
                  {request.assignee.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-xs text-blue-600 font-semibold">
                  Assigned to: {request.assignee}
                </div>
                {request.lastUpdated && (
                  <div className="text-xs text-gray-600">
                    Updated: {request.lastUpdated}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-4">
            <span>Submitted: {request.submittedDate}</span>
            {request.commentCount !== undefined && (
              <div className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3" />
                <span>{request.commentCount}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>Response: {request.responseTime}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageSquare className="h-6 w-6 text-blue-600" />
          <h2 className="text-[#8b3123] font-['Montserrat_Alternates:Bold',_sans-serif] text-xl">
            Service Requests
          </h2>
          <Badge className="bg-blue-100 text-blue-800 border-0">
            {serviceRequests.length} requests
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="skeuo-card p-4 rounded-[12px] text-center">
          <div className="text-2xl font-['Montserrat_Alternates:Bold',_sans-serif] text-[#8b3123] mb-1">
            {serviceRequests.filter(r => r.status === "open").length}
          </div>
          <div className="text-sm text-gray-600">Open</div>
        </div>
        
        <div className="skeuo-card p-4 rounded-[12px] text-center">
          <div className="text-2xl font-['Montserrat_Alternates:Bold',_sans-serif] text-[#8b3123] mb-1">
            {serviceRequests.filter(r => r.status === "in-progress").length}
          </div>
          <div className="text-sm text-gray-600">In Progress</div>
        </div>
        
        <div className="skeuo-card p-4 rounded-[12px] text-center">
          <div className="text-2xl font-['Montserrat_Alternates:Bold',_sans-serif] text-[#8b3123] mb-1">
            {serviceRequests.filter(r => r.status === "resolved").length}
          </div>
          <div className="text-sm text-gray-600">Resolved</div>
        </div>
        
        <div className="skeuo-card p-4 rounded-[12px] text-center">
          <div className="text-2xl font-['Montserrat_Alternates:Bold',_sans-serif] text-[#8b3123] mb-1">
            3.2h
          </div>
          <div className="text-sm text-gray-600">Avg Response</div>
        </div>
      </div>

      {/* Request Types */}
      <div className="skeuo-card p-6 rounded-[16px]">
        <h3 className="text-[#8b3123] font-['Montserrat_Alternates:Bold',_sans-serif] text-lg mb-4">
          Submit New Request
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          Choose the type of assistance you need. Our team will respond promptly to support your pipeline objectives.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {requestTypes.map((type) => {
            const Icon = type.icon;
            return (
              <div
                key={type.type}
                className={`skeuo-card p-4 rounded-[12px] cursor-pointer hover:scale-[1.02] transition-all ${type.color}`}
                onClick={() => onOpenRequest(type.type)}
              >
                <div className="flex items-start gap-3">
                  <div className="skeuo-card p-2 rounded-[8px] bg-white">
                    <Icon className="h-4 w-4 text-[#8b3123]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[#8b3123] font-['Montserrat_Alternates:SemiBold',_sans-serif] text-sm mb-1">
                      {type.title}
                    </h4>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      {type.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Your Requests */}
      <div className="space-y-4">
        <h3 className="text-[#8b3123] font-['Montserrat_Alternates:Bold',_sans-serif] text-lg">
          Your Recent Requests
        </h3>
        
        <div className="grid gap-4 md:grid-cols-2">
          {serviceRequests.map(renderRequestCard)}
        </div>
      </div>

      {/* Empty State */}
      {serviceRequests.length === 0 && (
        <div className="skeuo-card p-8 rounded-[16px] text-center">
          <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-[#8b3123] font-['Montserrat_Alternates:SemiBold',_sans-serif] mb-2">
            No service requests yet
          </h4>
          <p className="text-gray-600 text-sm mb-4">
            Submit your first request to get support from our team.
          </p>
          <Button 
            onClick={() => onOpenRequest()}
            className="skeuo-button-primary"
          >
            <Plus className="h-4 w-4 mr-2" />
            Submit Request
          </Button>
        </div>
      )}
    </div>
  );
}