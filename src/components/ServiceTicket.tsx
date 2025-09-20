import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Clock, MessageSquare, User, AlertCircle } from "lucide-react";

interface ServiceTicketProps {
  id: string;
  title: string;
  description: string;
  type: "bug-report" | "feature-request" | "content-change" | "technical-support" | "consultation" | "other";
  status: "open" | "in-progress" | "pending-review" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  client: string;
  clientAvatar?: string;
  assignee?: string;
  assigneeAvatar?: string;
  createdDate: string;
  lastUpdated?: string;
  responseTime?: string;
  commentCount?: number;
  onViewDetails?: () => void;
  onRespond?: () => void;
  onAssign?: () => void;
}

const typeConfig = {
  "bug-report": { label: "Bug Report", icon: "🐛", color: "bg-red-100 text-red-800" },
  "feature-request": { label: "Feature Request", icon: "✨", color: "bg-blue-100 text-blue-800" },
  "content-change": { label: "Content Change", icon: "📝", color: "bg-green-100 text-green-800" },
  "technical-support": { label: "Technical Support", icon: "🔧", color: "bg-orange-100 text-orange-800" },
  "consultation": { label: "Consultation", icon: "💬", color: "bg-purple-100 text-purple-800" },
  "other": { label: "Other", icon: "📋", color: "bg-gray-100 text-gray-800" }
};

const statusConfig = {
  "open": { label: "Open", color: "bg-blue-100 text-blue-800" },
  "in-progress": { label: "In Progress", color: "bg-yellow-100 text-yellow-800" },
  "pending-review": { label: "Pending Review", color: "bg-orange-100 text-orange-800" },
  "resolved": { label: "Resolved", color: "bg-green-100 text-green-800" },
  "closed": { label: "Closed", color: "bg-gray-100 text-gray-800" }
};

const priorityConfig = {
  "low": { label: "Low", color: "bg-gray-100 text-gray-600" },
  "medium": { label: "Medium", color: "bg-blue-100 text-blue-600" },
  "high": { label: "High", color: "bg-orange-100 text-orange-600" },
  "urgent": { label: "Urgent", color: "bg-red-100 text-red-600" }
};

export function ServiceTicket({
  id,
  title,
  description,
  type,
  status,
  priority,
  client,
  clientAvatar,
  assignee,
  assigneeAvatar,
  createdDate,
  lastUpdated,
  responseTime,
  commentCount = 0,
  onViewDetails,
  onRespond,
  onAssign
}: ServiceTicketProps) {
  const typeInfo = typeConfig[type];
  const statusInfo = statusConfig[status];
  const priorityInfo = priorityConfig[priority];

  const isUrgent = priority === "urgent";
  const isOverdue = responseTime && responseTime.includes("overdue");

  return (
    <div className={`skeuo-card rounded-[16px] p-6 space-y-4 hover:scale-[1.01] transition-all cursor-pointer ${
      isUrgent ? 'ring-2 ring-red-200' : ''
    }`} onClick={onViewDetails}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className="text-2xl">{typeInfo.icon}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-[#8b3123] font-['Montserrat_Alternates:Bold',_sans-serif] text-lg leading-tight">
                {title}
              </h3>
              {isUrgent && <AlertCircle className="h-4 w-4 text-red-500 animate-pulse" />}
            </div>
            <p className="text-sm text-gray-600 mt-1">#{id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge className={`${priorityInfo.color} border-0 font-['Montserrat_Alternates:SemiBold',_sans-serif]`}>
            {priorityInfo.label}
          </Badge>
          <Badge className={`${statusInfo.color} border-0`}>
            {statusInfo.label}
          </Badge>
        </div>
      </div>

      {/* Type & Description */}
      <div className="space-y-2">
        <Badge className={`${typeInfo.color} border-0`}>
          {typeInfo.label}
        </Badge>
        <p className="text-sm text-gray-700 leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>

      {/* Client & Assignee */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={clientAvatar} />
              <AvatarFallback className="text-xs bg-[rgba(139,49,35,0.1)] text-[#8b3123]">
                {client.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xs text-gray-500">Client</p>
              <p className="text-sm font-medium">{client}</p>
            </div>
          </div>
          
          {assignee && (
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={assigneeAvatar} />
                <AvatarFallback className="text-xs bg-[rgba(139,49,35,0.1)] text-[#8b3123]">
                  {assignee.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs text-gray-500">Assignee</p>
                <p className="text-sm font-medium">{assignee}</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="text-right">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock className="h-3 w-3" />
            {createdDate}
          </div>
          {lastUpdated && (
            <p className="text-xs text-gray-400 mt-1">Updated: {lastUpdated}</p>
          )}
        </div>
      </div>

      {/* Response Time & Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-4">
          {responseTime && (
            <div className={`text-sm ${isOverdue ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
              Response: {responseTime}
            </div>
          )}
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <MessageSquare className="h-3 w-3" />
            {commentCount} comments
          </div>
        </div>
        
        <div className="flex gap-2">
          {status === "open" && (
            <Button 
              size="sm" 
              variant="outline" 
              className="skeuo-button text-xs"
              onClick={(e) => { e.stopPropagation(); onAssign?.(); }}
            >
              Assign
            </Button>
          )}
          <Button 
            size="sm" 
            className="skeuo-button-primary text-xs"
            onClick={(e) => { e.stopPropagation(); onRespond?.(); }}
          >
            Respond
          </Button>
        </div>
      </div>
    </div>
  );
}