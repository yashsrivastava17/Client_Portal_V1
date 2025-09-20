import { CollapsibleSection } from "./CollapsibleSection";
import { MessageSquare, MousePointer, Users, Code, Type, Mail } from "lucide-react";

interface RequestCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

function RequestCard({ title, description, icon, onClick }: RequestCardProps) {
  return (
    <div 
      className="rounded-[16px] p-6 border border-[rgba(139,49,35,0.1)] hover:border-[rgba(139,49,35,0.2)] cursor-pointer transition-all hover:scale-[1.02] group"
      onClick={onClick}
      style={{
        background: 'rgba(255, 255, 255, 0.5)'
      }}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-12 h-12 rounded-[12px] bg-[rgba(139,49,35,0.1)] flex items-center justify-center text-[#8b3123] group-hover:bg-[rgba(139,49,35,0.15)] transition-colors">
          {icon}
        </div>
        
        <div>
          <h3 className="text-[#8b3123] text-[16px] font-['Montserrat_Alternates:SemiBold',_sans-serif] mb-2">
            {title}
          </h3>
          <p className="text-[#8b3123] text-[13px] opacity-75 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

interface EnhancedRaiseRequestsSectionProps {
  onOpenRequest: (type: "design-change" | "user-research" | "dev-handoff" | "content-update" | "report-user-pattern") => void;
}

export function EnhancedRaiseRequestsSection({ onOpenRequest }: EnhancedRaiseRequestsSectionProps) {
  const quickRequestTemplates = [
    {
      id: "design-change",
      title: "Design Changes",
      description: "Request design modifications or new creative work",
      icon: <MousePointer className="h-6 w-6" />
    },
    {
      id: "content-update", 
      title: "Content Updates",
      description: "Request website content or copy changes",
      icon: <Type className="h-6 w-6" />
    },
    {
      id: "dev-handoff",
      title: "Urgent Support",
      description: "Critical issues requiring immediate attention",
      icon: <Code className="h-6 w-6" />
    },
    {
      id: "user-research",
      title: "User Research",
      description: "Request user studies or behavior analysis",
      icon: <Users className="h-6 w-6" />
    },
    {
      id: "report-user-pattern",
      title: "Report User Pattern",
      description: "Share observed user behavior insights",
      icon: <Users className="h-6 w-6" />
    }
  ];

  return (
    <CollapsibleSection 
      title="Raise Requests" 
      icon={<MessageSquare className="h-5 w-5" />}
    >
      <div className="space-y-8">
        {/* Quick Request Templates Header */}
        <div>
          <h3 className="text-[#8b3123] text-[16px] font-['Montserrat_Alternates:SemiBold',_sans-serif] mb-1">
            Quick Request Templates
          </h3>
        </div>

        {/* Request Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {quickRequestTemplates.map((template) => (
            <RequestCard
              key={template.id}
              title={template.title}
              description={template.description}
              icon={template.icon}
              onClick={() => onOpenRequest(template.id as any)}
            />
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="p-4 rounded-[12px] border border-[rgba(139,49,35,0.1)]" style={{
          background: 'rgba(139, 49, 35, 0.03)'
        }}>
          <div className="flex items-start gap-3">
            <div className="text-[#8b3123] opacity-60 mt-0.5">
              <Mail className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[#8b3123] text-[13px] font-['Montserrat_Alternates:SemiBold',_sans-serif] mb-1">
                <span>Need something else?</span>
                <span className="font-['Montserrat_Alternates:Medium',_sans-serif] opacity-70 ml-1">
                  All requests automatically create JIRA tickets and Discord threads for tracking. You can also email us directly at
                </span>
                <span className="text-[#8b3123] underline ml-1">support@crenoir.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
}