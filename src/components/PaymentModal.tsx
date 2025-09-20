import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { CreditCard, Building, Shield, Calendar, DollarSign, CheckCircle, AlertCircle, Clock } from "lucide-react";

interface Invoice {
  id: string;
  number: string;
  amount: number;
  dueDate: string;
  description: string;
  status: "due" | "overdue" | "paid";
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice?: Invoice;
}

interface PaymentForm {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  saveCard: boolean;
}

const mockInvoice: Invoice = {
  id: "1",
  number: "MAP-2024-01",
  amount: 12500,
  dueDate: "2024-12-28",
  description: "Q4 Brand Strategy & Design Services",
  status: "due"
};

export function PaymentModal({ isOpen, onClose, invoice = mockInvoice }: PaymentModalProps) {
  const [paymentForm, setPaymentForm] = useState<PaymentForm>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    billingAddress: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "US"
    },
    saveCard: false
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"card" | "bank" | "crypto">("card");

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setPaymentForm(prev => ({ ...prev, cardNumber: formatted }));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setPaymentForm(prev => ({ ...prev, expiryDate: formatted }));
  };

  const handleProcessPayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccessful(true);
    }, 3000);
  };

  const getStatusColor = (status: Invoice['status']) => {
    switch (status) {
      case "due": return "bg-orange-100 text-orange-700 border-orange-200";
      case "overdue": return "bg-red-100 text-red-700 border-red-200";
      case "paid": return "bg-green-100 text-green-700 border-green-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: Invoice['status']) => {
    switch (status) {
      case "due": return <Clock className="h-3 w-3" />;
      case "overdue": return <AlertCircle className="h-3 w-3" />;
      case "paid": return <CheckCircle className="h-3 w-3" />;
      default: return <Clock className="h-3 w-3" />;
    }
  };

  if (isSuccessful) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-[#8b3123] text-[20px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-2">
              Payment Successful!
            </h3>
            <p className="text-[#8b3123] opacity-75 mb-6">
              Your payment of ${invoice.amount.toLocaleString()} has been processed successfully.
            </p>
            <div className="bg-green-50 rounded-[8px] p-4 mb-6">
              <div className="text-[#8b3123] text-[14px] font-['Montserrat_Alternates:SemiBold',_sans-serif] mb-1">
                Transaction ID: PAY-{Date.now()}
              </div>
              <div className="text-[#8b3123] opacity-60 text-[12px]">
                Confirmation email sent to your registered email address
              </div>
            </div>
            <Button 
              onClick={onClose}
              className="bg-[#8b3123] hover:bg-[#7a2e20] text-white w-full"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <DollarSign className="h-5 w-5 text-[#8b3123]" />
            <span>Invoice Payment</span>
            <Badge className="bg-blue-100 text-blue-700">
              Secure Payment
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Invoice Details */}
          <div className="space-y-6">
            <div>
              <h3 className="text-[#8b3123] text-[18px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-4">
                Invoice Details
              </h3>
              
              <div className="bg-gray-50 rounded-[12px] p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[#8b3123] text-[14px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
                    Invoice Number
                  </span>
                  <span className="text-[#8b3123] opacity-75">{invoice.number}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-[#8b3123] text-[14px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
                    Description
                  </span>
                  <span className="text-[#8b3123] opacity-75 text-right max-w-[200px]">
                    {invoice.description}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-[#8b3123] text-[14px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
                    Due Date
                  </span>
                  <span className="text-[#8b3123] opacity-75">
                    {new Date(invoice.dueDate).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-[#8b3123] text-[14px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
                    Status
                  </span>
                  <Badge className={`${getStatusColor(invoice.status)} flex items-center gap-1`}>
                    {getStatusIcon(invoice.status)}
                    {invoice.status.toUpperCase()}
                  </Badge>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <span className="text-[#8b3123] text-[18px] font-['Montserrat_Alternates:Bold',_sans-serif]">
                    Total Amount
                  </span>
                  <span className="text-[#8b3123] text-[24px] font-['Montserrat_Alternates:Bold',_sans-serif]">
                    ${invoice.amount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-blue-50 rounded-[8px] p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-blue-600" />
                <span className="text-blue-800 text-[14px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
                  Secure Payment
                </span>
              </div>
              <p className="text-blue-700 text-[12px] leading-relaxed">
                Your payment information is protected with bank-level security. All transactions are encrypted and processed securely.
              </p>
            </div>
          </div>

          {/* Payment Form */}
          <div className="space-y-6">
            <div>
              <h3 className="text-[#8b3123] text-[18px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-4">
                Payment Method
              </h3>
              
              {/* Payment Method Selection */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                <Button
                  variant={selectedPaymentMethod === "card" ? "default" : "outline"}
                  onClick={() => setSelectedPaymentMethod("card")}
                  className="flex flex-col items-center gap-2 h-16"
                >
                  <CreditCard className="h-4 w-4" />
                  <span className="text-[11px]">Card</span>
                </Button>
                <Button
                  variant={selectedPaymentMethod === "bank" ? "default" : "outline"}
                  onClick={() => setSelectedPaymentMethod("bank")}
                  className="flex flex-col items-center gap-2 h-16"
                >
                  <Building className="h-4 w-4" />
                  <span className="text-[11px]">Bank</span>
                </Button>
                <Button
                  variant={selectedPaymentMethod === "crypto" ? "default" : "outline"}
                  onClick={() => setSelectedPaymentMethod("crypto")}
                  className="flex flex-col items-center gap-2 h-16"
                >
                  <DollarSign className="h-4 w-4" />
                  <span className="text-[11px]">Crypto</span>
                </Button>
              </div>

              {/* Card Payment Form */}
              {selectedPaymentMethod === "card" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={paymentForm.cardNumber}
                        onChange={handleCardNumberChange}
                        maxLength={19}
                      />
                    </div>
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={paymentForm.expiryDate}
                        onChange={handleExpiryChange}
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={paymentForm.cvv}
                        onChange={(e) => setPaymentForm(prev => ({ ...prev, cvv: e.target.value }))}
                        maxLength={4}
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="cardholderName">Cardholder Name</Label>
                      <Input
                        id="cardholderName"
                        placeholder="John Doe"
                        value={paymentForm.cardholderName}
                        onChange={(e) => setPaymentForm(prev => ({ ...prev, cardholderName: e.target.value }))}
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Billing Address */}
                  <div className="space-y-4">
                    <h4 className="text-[#8b3123] text-[16px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
                      Billing Address
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="street">Street Address</Label>
                        <Input
                          id="street"
                          placeholder="123 Main Street"
                          value={paymentForm.billingAddress.street}
                          onChange={(e) => setPaymentForm(prev => ({ 
                            ...prev, 
                            billingAddress: { ...prev.billingAddress, street: e.target.value }
                          }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          placeholder="New York"
                          value={paymentForm.billingAddress.city}
                          onChange={(e) => setPaymentForm(prev => ({ 
                            ...prev, 
                            billingAddress: { ...prev.billingAddress, city: e.target.value }
                          }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          placeholder="NY"
                          value={paymentForm.billingAddress.state}
                          onChange={(e) => setPaymentForm(prev => ({ 
                            ...prev, 
                            billingAddress: { ...prev.billingAddress, state: e.target.value }
                          }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          placeholder="10001"
                          value={paymentForm.billingAddress.zipCode}
                          onChange={(e) => setPaymentForm(prev => ({ 
                            ...prev, 
                            billingAddress: { ...prev.billingAddress, zipCode: e.target.value }
                          }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Select 
                          value={paymentForm.billingAddress.country} 
                          onValueChange={(value) => setPaymentForm(prev => ({ 
                            ...prev, 
                            billingAddress: { ...prev.billingAddress, country: value }
                          }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="US">United States</SelectItem>
                            <SelectItem value="CA">Canada</SelectItem>
                            <SelectItem value="UK">United Kingdom</SelectItem>
                            <SelectItem value="AU">Australia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bank Transfer */}
              {selectedPaymentMethod === "bank" && (
                <div className="bg-blue-50 rounded-[8px] p-6 text-center">
                  <Building className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h4 className="text-[#8b3123] text-[16px] font-['Montserrat_Alternates:SemiBold',_sans-serif] mb-2">
                    Bank Transfer Details
                  </h4>
                  <div className="text-[#8b3123] opacity-75 text-[14px] space-y-2">
                    <div>Account: Crenoir Creative LLC</div>
                    <div>Routing: 123456789</div>
                    <div>Account: 9876543210</div>
                    <div>Reference: {invoice.number}</div>
                  </div>
                </div>
              )}

              {/* Crypto Payment */}
              {selectedPaymentMethod === "crypto" && (
                <div className="bg-purple-50 rounded-[8px] p-6 text-center">
                  <DollarSign className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h4 className="text-[#8b3123] text-[16px] font-['Montserrat_Alternates:SemiBold',_sans-serif] mb-2">
                    Cryptocurrency Payment
                  </h4>
                  <div className="text-[#8b3123] opacity-75 text-[14px] space-y-2">
                    <div>Bitcoin Address:</div>
                    <div className="font-mono text-[12px] bg-white p-2 rounded">
                      1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
                    </div>
                    <div>Amount: 0.285 BTC</div>
                  </div>
                </div>
              )}
            </div>

            {/* Process Payment Button */}
            <div className="pt-4">
              <Button 
                onClick={handleProcessPayment}
                disabled={isProcessing}
                className="w-full bg-[#8b3123] hover:bg-[#7a2e20] text-white h-12"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing Payment...
                  </div>
                ) : (
                  `Pay $${invoice.amount.toLocaleString()}`
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}