import { useState } from "react";
import { 
  Search,
  Package,
  FileText,
  BarChart3,
  Calendar,
  MessageSquare,
  Bell,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  ChevronDown,
  DollarSign,
  TrendingUp,
  Users
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface DesignBentoGridProps {
  onOpenDocs: () => void;
  onOpenKanban: () => void;
  onOpenRequest: (type?: string) => void;
  onOpenMetrics: () => void;
  onOpenPayment: () => void;
  onOpenBlog: (blog: any) => void;
}

type ExpandedCard = "docs" | "logistics" | "design-updates" | "metrics" | "product-plan" | "requests" | null;

export function DesignBentoGrid({
  onOpenDocs,
  onOpenKanban,
  onOpenRequest,
  onOpenMetrics,
  onOpenPayment,
  onOpenBlog
}: DesignBentoGridProps) {
  const [expandedCard, setExpandedCard] = useState<ExpandedCard>(null);

  const handleCardClick = (cardId: ExpandedCard) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  // Mock alert data
  const alerts = {
    docs: { unread: 12, chatRequests: 5 },
    logistics: { payments: 2, accounts: 3, shipping: 1 },
    designUpdates: { pending: 4, approved: 7 },
    metrics: { alerts: 3, reports: 8 },
    productPlan: { overdue: 1, thisWeek: 6 },
    requests: { open: 4, urgent: 2 }
  };

  return (
    <div className="h-[calc(100vh-140px)] grid grid-cols-4 grid-rows-3 gap-3 p-1">
      {/* Central Docs & Insights - Spans 2x2 */}
      <div 
        className={`col-span-2 row-span-2 skeuo-card-elevated rounded-[16px] p-4 cursor-pointer bg-gradient-to-br from-purple-50 to-violet-50 transition-all duration-300 ${
          expandedCard === "docs" ? "col-span-4 row-span-3" : ""
        }`}
        onClick={() => handleCardClick("docs")}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="skeuo-card p-2 rounded-[8px] bg-white/80">
                <Search className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-[#8b3123] font-['Montserrat_Alternates:Bold',_sans-serif] text-lg">
                  Docs & Insights
                </h3>
                <div className="flex gap-2 mt-1">
                  <Badge className="bg-purple-100 text-purple-800 border-0 text-xs">
                    {alerts.docs.unread} Unread
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800 border-0 text-xs">
                    {alerts.docs.chatRequests} Chat Requests
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-purple-500" />
              <div className="h-2 w-2 bg-purple-500 rounded-full animate-pulse" />
              {expandedCard !== "docs" && <ChevronDown className="h-4 w-4 text-gray-400" />}
            </div>
          </div>

          {expandedCard === "docs" ? (
            <div className="flex-1 overflow-auto">
              <div className="space-y-4">
                <div className="skeuo-card p-4 rounded-[12px] bg-white/60">
                  <h4 className="text-[#8b3123] font-['Montserrat_Alternates:SemiBold',_sans-serif] mb-2">
                    Recent Documents
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 rounded-[8px] hover:bg-purple-50">
                      <span className="text-sm">Design System Guidelines v3.2</span>
                      <Badge className="bg-green-100 text-green-800 border-0 text-xs">Updated</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-[8px] hover:bg-purple-50">
                      <span className="text-sm">User Research Findings Q4</span>
                      <Badge className="bg-blue-100 text-blue-800 border-0 text-xs">New</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-[8px] hover:bg-purple-50">
                      <span className="text-sm">Product Roadmap 2024</span>
                      <Badge className="bg-purple-100 text-purple-800 border-0 text-xs">Chat Active</Badge>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    onClick={(e) => { e.stopPropagation(); onOpenDocs(); }}
                    className="skeuo-button-primary"
                  >
                    Browse All Docs
                  </Button>
                  <Button 
                    onClick={(e) => { e.stopPropagation(); onOpenDocs(); }}
                    variant="outline"
                    className="skeuo-button"
                  >
                    AI Chat
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-center">
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="skeuo-card p-3 rounded-[8px] bg-white/60 text-center">
                  <div className="text-lg font-['Montserrat_Alternates:Bold',_sans-serif] text-purple-600 mb-1">12</div>
                  <div className="text-xs text-gray-600">Documents</div>
                </div>
                <div className="skeuo-card p-3 rounded-[8px] bg-white/60 text-center">
                  <div className="text-lg font-['Montserrat_Alternates:Bold',_sans-serif] text-blue-600 mb-1">5</div>
                  <div className="text-xs text-gray-600">AI Chats</div>
                </div>
                <div className="skeuo-card p-3 rounded-[8px] bg-white/60 text-center">
                  <div className="text-lg font-['Montserrat_Alternates:Bold',_sans-serif] text-green-600 mb-1">8</div>
                  <div className="text-xs text-gray-600">Insights</div>
                </div>
              </div>
              <Button 
                onClick={(e) => { e.stopPropagation(); onOpenDocs(); }}
                className="skeuo-button-primary w-full"
              >
                Browse & Chat with Docs
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Logistics & Payments - Top Right */}
      <div 
        className={`col-span-1 row-span-1 skeuo-card-elevated rounded-[16px] p-3 cursor-pointer bg-gradient-to-br from-green-50 to-emerald-50 transition-all duration-300 ${
          expandedCard === "logistics" ? "col-span-4 row-span-3" : expandedCard ? "opacity-50 scale-95" : ""
        }`}
        onClick={() => handleCardClick("logistics")}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-green-600" />
              <span className="text-[#8b3123] font-['Montserrat_Alternates:SemiBold',_sans-serif] text-sm">Logistics</span>
            </div>
            {alerts.logistics.payments > 0 && (
              <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
            )}
            {expandedCard !== "logistics" && <ChevronDown className="h-3 w-3 text-gray-400" />}
          </div>
          
          {expandedCard === "logistics" ? (
            <div className="flex-1 overflow-auto space-y-3">
              <div className="skeuo-card p-3 rounded-[8px] bg-red-50 border border-red-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-red-800">Pending Payments</span>
                  <Badge className="bg-red-100 text-red-800 border-0 text-xs">{alerts.logistics.payments}</Badge>
                </div>
                <Button 
                  onClick={(e) => { e.stopPropagation(); onOpenPayment(); }}
                  size="sm" 
                  className="skeuo-button-primary w-full"
                >
                  <DollarSign className="h-3 w-3 mr-1" />
                  Pay Now
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="skeuo-card p-3 rounded-[8px] text-center">
                  <div className="text-sm font-medium text-green-600">{alerts.logistics.accounts}</div>
                  <div className="text-xs text-gray-600">Test Accounts</div>
                </div>
                <div className="skeuo-card p-3 rounded-[8px] text-center">
                  <div className="text-sm font-medium text-blue-600">{alerts.logistics.shipping}</div>
                  <div className="text-xs text-gray-600">Shipping</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center text-center">
              <div className="text-lg font-['Montserrat_Alternates:Bold',_sans-serif] text-red-600 mb-1">
                {alerts.logistics.payments}
              </div>
              <div className="text-xs text-gray-600">Pending Payments</div>
            </div>
          )}
        </div>
      </div>

      {/* Design Updates - Far Right */}
      <div 
        className={`col-span-1 row-span-1 skeuo-card-elevated rounded-[16px] p-3 cursor-pointer bg-gradient-to-br from-blue-50 to-indigo-50 transition-all duration-300 ${
          expandedCard === "design-updates" ? "col-span-4 row-span-3" : expandedCard ? "opacity-50 scale-95" : ""
        }`}
        onClick={() => handleCardClick("design-updates")}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-600" />
              <span className="text-[#8b3123] font-['Montserrat_Alternates:SemiBold',_sans-serif] text-sm">Design Updates</span>
            </div>
            {expandedCard !== "design-updates" && <ChevronDown className="h-3 w-3 text-gray-400" />}
          </div>

          {expandedCard === "design-updates" ? (
            <div className="flex-1 overflow-auto space-y-3">
              <div className="skeuo-card p-3 rounded-[8px]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Homepage Redesign v2.1</span>
                  <Badge className="bg-yellow-100 text-yellow-800 border-0 text-xs">Review</Badge>
                </div>
                <div className="text-xs text-gray-600">Updated 2 hours ago</div>
              </div>
              <div className="skeuo-card p-3 rounded-[8px]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Mobile Navigation Update</span>
                  <Badge className="bg-green-100 text-green-800 border-0 text-xs">Approved</Badge>
                </div>
                <div className="text-xs text-gray-600">Updated yesterday</div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center text-center">
              <div className="text-lg font-['Montserrat_Alternates:Bold',_sans-serif] text-blue-600 mb-1">
                {alerts.designUpdates.pending}
              </div>
              <div className="text-xs text-gray-600">Pending Review</div>
            </div>
          )}
        </div>
      </div>

      {/* Metrics & Analytics - Bottom Left */}
      <div 
        className={`col-span-1 row-span-1 skeuo-card-elevated rounded-[16px] p-3 cursor-pointer bg-gradient-to-br from-orange-50 to-amber-50 transition-all duration-300 ${
          expandedCard === "metrics" ? "col-span-4 row-span-3" : expandedCard ? "opacity-50 scale-95" : ""
        }`}
        onClick={() => handleCardClick("metrics")}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-orange-600" />
              <span className="text-[#8b3123] font-['Montserrat_Alternates:SemiBold',_sans-serif] text-sm">Analytics</span>
            </div>
            {alerts.metrics.alerts > 0 && (
              <div className="h-2 w-2 bg-orange-500 rounded-full animate-pulse" />
            )}
            {expandedCard !== "metrics" && <ChevronDown className="h-3 w-3 text-gray-400" />}
          </div>

          {expandedCard === "metrics" ? (
            <div className="flex-1 overflow-auto space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="skeuo-card p-3 rounded-[8px] text-center">
                  <div className="text-sm font-medium text-green-600">+15%</div>
                  <div className="text-xs text-gray-600">Growth Rate</div>
                </div>
                <div className="skeuo-card p-3 rounded-[8px] text-center">
                  <div className="text-sm font-medium text-blue-600">89%</div>
                  <div className="text-xs text-gray-600">Engagement</div>
                </div>
              </div>
              <Button 
                onClick={(e) => { e.stopPropagation(); onOpenMetrics(); }}
                size="sm"
                className="skeuo-button-primary w-full"
              >
                <TrendingUp className="h-3 w-3 mr-1" />
                View Full Report
              </Button>
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center text-center">
              <div className="text-lg font-['Montserrat_Alternates:Bold',_sans-serif] text-orange-600 mb-1">
                {alerts.metrics.alerts}
              </div>
              <div className="text-xs text-gray-600">Performance Alerts</div>
            </div>
          )}
        </div>
      </div>

      {/* Product Plan - Bottom Center */}
      <div 
        className={`col-span-1 row-span-1 skeuo-card-elevated rounded-[16px] p-3 cursor-pointer bg-gradient-to-br from-teal-50 to-cyan-50 transition-all duration-300 ${
          expandedCard === "product-plan" ? "col-span-4 row-span-3" : expandedCard ? "opacity-50 scale-95" : ""
        }`}
        onClick={() => handleCardClick("product-plan")}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-teal-600" />
              <span className="text-[#8b3123] font-['Montserrat_Alternates:SemiBold',_sans-serif] text-sm">Product Plan</span>
            </div>
            {alerts.productPlan.overdue > 0 && (
              <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
            )}
            {expandedCard !== "product-plan" && <ChevronDown className="h-3 w-3 text-gray-400" />}
          </div>

          {expandedCard === "product-plan" ? (
            <div className="flex-1 overflow-auto space-y-3">
              <div className="skeuo-card p-3 rounded-[8px] bg-red-50 border border-red-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-red-800">Overdue Tasks</span>
                  <Badge className="bg-red-100 text-red-800 border-0 text-xs">{alerts.productPlan.overdue}</Badge>
                </div>
              </div>
              <Button 
                onClick={(e) => { e.stopPropagation(); onOpenKanban(); }}
                size="sm"
                className="skeuo-button-primary w-full"
              >
                <Users className="h-3 w-3 mr-1" />
                View Kanban Board
              </Button>
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center text-center">
              <div className="text-lg font-['Montserrat_Alternates:Bold',_sans-serif] text-teal-600 mb-1">
                {alerts.productPlan.thisWeek}
              </div>
              <div className="text-xs text-gray-600">This Week</div>
            </div>
          )}
        </div>
      </div>

      {/* Service Requests - Bottom Right */}
      <div 
        className={`col-span-1 row-span-1 skeuo-card-elevated rounded-[16px] p-3 cursor-pointer bg-gradient-to-br from-gray-50 to-slate-50 transition-all duration-300 ${
          expandedCard === "requests" ? "col-span-4 row-span-3" : expandedCard ? "opacity-50 scale-95" : ""
        }`}
        onClick={() => handleCardClick("requests")}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-gray-600" />
              <span className="text-[#8b3123] font-['Montserrat_Alternates:SemiBold',_sans-serif] text-sm">Requests</span>
            </div>
            {alerts.requests.urgent > 0 && (
              <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
            )}
            {expandedCard !== "requests" && <ChevronDown className="h-3 w-3 text-gray-400" />}
          </div>

          {expandedCard === "requests" ? (
            <div className="flex-1 overflow-auto space-y-3">
              <div className="skeuo-card p-3 rounded-[8px]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Design System Update</span>
                  <Badge className="bg-red-100 text-red-800 border-0 text-xs">Urgent</Badge>
                </div>
                <div className="text-xs text-gray-600">Opened 2 days ago</div>
              </div>
              <Button 
                onClick={(e) => { e.stopPropagation(); onOpenRequest(); }}
                size="sm"
                className="skeuo-button-primary w-full"
              >
                <Plus className="h-3 w-3 mr-1" />
                New Request
              </Button>
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center text-center">
              <div className="text-lg font-['Montserrat_Alternates:Bold',_sans-serif] text-gray-600 mb-1">
                {alerts.requests.open}
              </div>
              <div className="text-xs text-gray-600">Open Requests</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}