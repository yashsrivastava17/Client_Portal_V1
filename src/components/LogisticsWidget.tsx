import { Calculator, CreditCard, Download, Wallet } from "lucide-react";
import { CollapsibleSection } from "./CollapsibleSection";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface Invoice {
  id: string;
  number: string;
  amount: string;
  dueDate: string;
  status: "due" | "overdue" | "paid";
}

interface LogisticsWidgetProps {
  onOpenPayment: () => void;
}

const invoices: Invoice[] = [
  {
    id: "1",
    number: "MAP-2024-01",
    amount: "$12,500",
    dueDate: "Dec 28, 2024",
    status: "due"
  },
  {
    id: "2", 
    number: "MAP-2024-02",
    amount: "$8,750",
    dueDate: "Jan 15, 2025",
    status: "due"
  },
  {
    id: "3",
    number: "MAP-2023-12",
    amount: "$15,000",
    dueDate: "Dec 1, 2024",
    status: "paid"
  }
];

export function LogisticsWidget({ onOpenPayment }: LogisticsWidgetProps) {
  const pendingInvoices = invoices.filter(inv => inv.status !== "paid");
  
  return (
    <CollapsibleSection
      title="Logistics"
      icon={<Calculator className="h-5 w-5" />}
      badge={pendingInvoices.length > 0 ? `${pendingInvoices.length} pending` : undefined}
      defaultOpen={true}
    >
      <div className="space-y-6">
        {/* Payment Status Overview */}
        <div className="rounded-[24px] p-6 border border-blue-200"
             style={{
               background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%), linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)), rgba(255, 255, 255, 0.4)'
             }}>
          <h4 className="text-[#8b3123] font-['Montserrat_Alternates:SemiBold',_sans-serif] text-[18px] mb-4 flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            Payment Overview
          </h4>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-[#8b3123] text-[28px] font-['Montserrat_Alternates:Bold',_sans-serif]">
                ${pendingInvoices.reduce((sum, inv) => sum + parseFloat(inv.amount.replace('$', '').replace(',', '')), 0).toLocaleString()}
              </div>
              <div className="text-[#8b3123] text-[14px] opacity-70">Outstanding</div>
            </div>
            <div className="text-center">
              <div className="text-[#8b3123] text-[28px] font-['Montserrat_Alternates:Bold',_sans-serif]">
                {pendingInvoices.length}
              </div>
              <div className="text-[#8b3123] text-[14px] opacity-70">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-[#8b3123] text-[28px] font-['Montserrat_Alternates:Bold',_sans-serif]">
                3
              </div>
              <div className="text-[#8b3123] text-[14px] opacity-70">Days Avg</div>
            </div>
          </div>
        </div>

        {/* Invoice List */}
        <div className="space-y-4">
          <h4 className="text-[#8b3123] font-['Montserrat_Alternates:SemiBold',_sans-serif] text-[18px]">
            Recent Invoices
          </h4>
          {invoices.map((invoice) => (
            <div key={invoice.id} className="rounded-[24px] p-5 flex items-center justify-between border border-[rgba(139,49,35,0.15)] hover:shadow-md transition-shadow"
                 style={{
                   background: 'linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)), rgba(255, 255, 255, 0.4)'
                 }}>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[#8b3123] font-['Montserrat_Alternates:SemiBold',_sans-serif] text-[16px]">
                    {invoice.number}
                  </span>
                  <Badge 
                    className={
                      invoice.status === "paid" 
                        ? "bg-emerald-100 text-emerald-800 border-emerald-200" 
                        : invoice.status === "overdue"
                        ? "bg-red-100 text-red-800 border-red-200"
                        : "bg-orange-100 text-orange-800 border-orange-200"
                    }
                  >
                    {invoice.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="text-[#8b3123] text-[14px] opacity-70">
                  Due: {invoice.dueDate}
                </div>
              </div>
              <div className="text-right flex items-center gap-4">
                <div className="text-[#8b3123] font-['Montserrat_Alternates:Bold',_sans-serif] text-[20px]">
                  {invoice.amount}
                </div>
                {invoice.status !== "paid" && (
                  <Button 
                    size="sm" 
                    className="bg-[#8b3123] text-[#f3e1b7] hover:bg-[#7a2e20] font-['Montserrat_Alternates:SemiBold',_sans-serif] flex items-center gap-2"
                    onClick={onOpenPayment}
                  >
                    <CreditCard className="h-3 w-3" />
                    Pay Now
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3 mt-6">
          <Button className="bg-[#8b3123] text-[#f3e1b7] hover:bg-[#7a2e20] font-['Montserrat_Alternates:SemiBold',_sans-serif] flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            View All Invoices
          </Button>
          <Button variant="outline" className="border-[#8b3123] text-[#8b3123] hover:bg-[rgba(139,49,35,0.1)] flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download Statements
          </Button>
        </div>
      </div>
    </CollapsibleSection>
  );
}