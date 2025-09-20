import { useState } from "react";
import { TopNavigation } from "./components/TopNavigation";
import { MainCarousel } from "./components/MainCarousel";
import { BentoCards } from "./components/BentoCards";
import { LogisticsWidget } from "./components/LogisticsWidget";
import { DesignUpdatesWidget } from "./components/DesignUpdatesWidget";
import { DocsInsightsWidget } from "./components/DocsInsightsWidget";
import { MetricsOnlyWidget } from "./components/MetricsOnlyWidget";
import { ProductPlanWidget } from "./components/ProductPlanWidget";
import { EnhancedRaiseRequestsSection } from "./components/EnhancedRaiseRequestsSection";
import { DesignBentoGrid } from "./components/DesignBentoGrid";
import { EnhancedRequestModal } from "./components/EnhancedRequestModal";
import { KanbanBoardModal } from "./components/KanbanBoardModal";
import { PaymentModal } from "./components/PaymentModal";
import { DocumentReaderModal } from "./components/DocumentReaderModal";
import { Button } from "./components/ui/button";
import EchoPage from "./EchoPage";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  readTime: string;
  category: "Performance" | "Analytics" | "UX" | "Growth";
  date: string;
  author: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<"design" | "echo" | "calendar" | "labs">("design");
  const [viewMode, setViewMode] = useState<"bento" | "list">("list");
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [selectedRequestType, setSelectedRequestType] = useState<"design-change" | "user-research" | "dev-handoff" | "content-update" | "report-user-pattern" | undefined>();
  const [isKanbanModalOpen, setIsKanbanModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isDocumentReaderOpen, setIsDocumentReaderOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  const handleOpenRequest = (type?: "design-change" | "user-research" | "dev-handoff" | "content-update" | "report-user-pattern") => {
    setSelectedRequestType(type);
    setIsRequestModalOpen(true);
  };

  const handleOpenDocs = () => {
    console.log("Opening docs reader...");
  };

  const handleOpenKanban = () => {
    setIsKanbanModalOpen(true);
  };

  const handleOpenMetrics = () => {
    console.log("Opening metrics dashboard...");
  };

  const handleOpenPayment = () => {
    setIsPaymentModalOpen(true);
  };

  const handleOpenBlog = (blog: BlogPost) => {
    setSelectedBlog(blog);
    setIsDocumentReaderOpen(true);
  };

  const handlePageChange = (page: "design" | "echo" | "calendar" | "labs") => {
    setCurrentPage(page);
  };

  // If we're on the Echo page, render the Echo component
  if (currentPage === "echo") {
    return <EchoPage onPageChange={handlePageChange} viewMode={viewMode} onViewModeChange={setViewMode} />;
  }

  return (
    <div className="bg-gradient-to-br from-[#ffffff] via-[#fafbfc] to-[#f5f7fa] min-h-screen overflow-x-hidden relative">
      {/* Enhanced Multi-element Floating Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Large primary elements */}
        <div className="absolute animate-float-1" style={{
          left: '5%', top: '25%', width: '300px', height: '320px'
        }}>
          <div className="w-full h-full bg-gradient-to-br from-[#8B3123] to-[#7a2e20] opacity-[0.03] rounded-[40%] blur-[20px]" />
        </div>
        
        <div className="absolute animate-float-2" style={{
          right: '8%', top: '10%', width: '280px', height: '300px'
        }}>
          <div className="w-full h-full bg-gradient-to-br from-[#8B3123] to-[#7a2e20] opacity-[0.04] rounded-[60%] blur-[25px]" />
        </div>

        <div className="absolute animate-float-3" style={{
          left: '50%', bottom: '15%', width: '350px', height: '380px'
        }}>
          <div className="w-full h-full bg-gradient-to-br from-[#8B3123] to-[#7a2e20] opacity-[0.02] rounded-[45%] blur-[30px]" />
        </div>

        {/* Medium floating elements */}
        <div className="absolute animate-float-4" style={{
          left: '20%', top: '5%', width: '180px', height: '200px', animationDelay: '-5s'
        }}>
          <div className="w-full h-full bg-gradient-to-br from-[#8B3123] to-[#7a2e20] opacity-[0.05] rounded-[50%] blur-[15px]" />
        </div>

        <div className="absolute animate-float-1" style={{
          right: '25%', bottom: '35%', width: '200px', height: '220px', animationDelay: '-12s'
        }}>
          <div className="w-full h-full bg-gradient-to-br from-[#8B3123] to-[#7a2e20] opacity-[0.04] rounded-[35%] blur-[18px]" />
        </div>

        <div className="absolute animate-float-2" style={{
          left: '70%', top: '40%', width: '160px', height: '180px', animationDelay: '-8s'
        }}>
          <div className="w-full h-full bg-gradient-to-br from-[#8B3123] to-[#7a2e20] opacity-[0.06] rounded-[55%] blur-[12px]" />
        </div>

        {/* Small accent elements */}
        <div className="absolute animate-float-3" style={{
          left: '12%', bottom: '60%', width: '120px', height: '140px', animationDelay: '-3s'
        }}>
          <div className="w-full h-full bg-gradient-to-br from-[#8B3123] to-[#7a2e20] opacity-[0.07] rounded-[65%] blur-[10px]" />
        </div>

        <div className="absolute animate-float-4" style={{
          right: '15%', top: '55%', width: '100px', height: '120px', animationDelay: '-15s'
        }}>
          <div className="w-full h-full bg-gradient-to-br from-[#8B3123] to-[#7a2e20] opacity-[0.08] rounded-[70%] blur-[8px]" />
        </div>

        <div className="absolute animate-float-1" style={{
          left: '35%', top: '8%', width: '140px', height: '160px', animationDelay: '-20s'
        }}>
          <div className="w-full h-full bg-gradient-to-br from-[#8B3123] to-[#7a2e20] opacity-[0.05] rounded-[40%] blur-[14px]" />
        </div>

        {/* Micro floating elements */}
        <div className="absolute animate-float-2" style={{
          left: '80%', bottom: '20%', width: '80px', height: '90px', animationDelay: '-6s'
        }}>
          <div className="w-full h-full bg-gradient-to-br from-[#8B3123] to-[#7a2e20] opacity-[0.09] rounded-[80%] blur-[6px]" />
        </div>

        <div className="absolute animate-float-3" style={{
          right: '40%', top: '25%', width: '60px', height: '80px', animationDelay: '-18s'
        }}>
          <div className="w-full h-full bg-gradient-to-br from-[#8B3123] to-[#7a2e20] opacity-[0.10] rounded-[90%] blur-[5px]" />
        </div>

        <div className="absolute animate-float-4" style={{
          left: '8%', top: '70%', width: '90px', height: '100px', animationDelay: '-25s'
        }}>
          <div className="w-full h-full bg-gradient-to-br from-[#8B3123] to-[#7a2e20] opacity-[0.06] rounded-[75%] blur-[9px]" />
        </div>
      </div>

      {/* Top Navigation - Sticky at top */}
      <TopNavigation 
        currentPage={currentPage} 
        onPageChange={handlePageChange}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Main Content - Responsive layout with proper padding for sticky navbar */}
      <div className="relative z-10 min-h-screen px-4 lg:px-8 pt-[120px] pb-6">
        <div className="max-w-[1480px] mx-auto w-full space-y-6 lg:space-y-8">

          {/* Conditional Content Based on View Mode */}
          {viewMode === "bento" ? (
            <DesignBentoGrid
              onOpenDocs={handleOpenDocs}
              onOpenKanban={handleOpenKanban}
              onOpenRequest={handleOpenRequest}
              onOpenMetrics={handleOpenMetrics}
              onOpenPayment={handleOpenPayment}
              onOpenBlog={handleOpenBlog}
            />
          ) : (
            <>
              {/* Hero Carousel */}
              <MainCarousel />

              {/* Bento Cards */}
              <BentoCards
                onOpenDocs={handleOpenDocs}
                onOpenKanban={handleOpenKanban}
                onOpenRequest={() => handleOpenRequest()}
                onOpenMetrics={handleOpenMetrics}
              />



              {/* Collapsible Sections */}
              <div className="space-y-6">
                {/* Logistics Section */}
                <LogisticsWidget onOpenPayment={handleOpenPayment} />

                {/* Design Updates */}
                <DesignUpdatesWidget />
                
                {/* Docs & Insights */}
                <DocsInsightsWidget />

                {/* Metrics Only */}
                <MetricsOnlyWidget onOpenBlog={handleOpenBlog} />

                {/* Product Plan (Active Tasks & Projects) */}
                <ProductPlanWidget onOpenKanban={handleOpenKanban} />

                {/* Enhanced Raise Requests Section */}
                <EnhancedRaiseRequestsSection onOpenRequest={handleOpenRequest} />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      <EnhancedRequestModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        requestType={selectedRequestType}
      />

      <KanbanBoardModal
        isOpen={isKanbanModalOpen}
        onClose={() => setIsKanbanModalOpen(false)}
      />

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
      />

      <DocumentReaderModal
        isOpen={isDocumentReaderOpen}
        onClose={() => setIsDocumentReaderOpen(false)}
        blog={selectedBlog}
      />
    </div>
  );
}

// Enhanced Quick View Card Component with Skeuomorphic Design
function QuickViewCard({ 
  title, 
  description, 
  buttonText, 
  onClick 
}: { 
  title: string; 
  description: string; 
  buttonText: string; 
  onClick?: () => void;
}) {
  return (
    <div 
      className="flex-1 min-w-0 skeuo-card rounded-[24px] cursor-pointer hover:scale-[1.02] transition-all p-8"
      onClick={onClick}
    >
      <div className="h-[200px] lg:h-[250px] flex flex-col justify-center items-center text-center space-y-5">
        {/* Primary Content - Clear Hierarchy */}
        <div className="space-y-4">
          <h3 className="text-[#8b3123] text-[20px] lg:text-[24px] font-['Montserrat_Alternates:Bold',_sans-serif] leading-tight">
            {title}
          </h3>
          <p className="text-[#8b3123] text-[14px] lg:text-[15px] opacity-80 leading-relaxed max-w-[280px]">
            {description}
          </p>
        </div>
        
        {/* Action Button with Enhanced Styling */}
        <button 
          className="skeuo-button-primary text-white font-['Montserrat_Alternates:SemiBold',_sans-serif] text-[14px] px-8 py-3 rounded-[14px] hover:scale-105 transition-transform"
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}