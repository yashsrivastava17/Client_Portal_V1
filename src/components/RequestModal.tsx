import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { X, Paperclip } from "lucide-react";

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledType?: string;
  prefilledContext?: string;
}

const requestTypes = [
  { value: "design-change", label: "Design Change Request" },
  { value: "content-update", label: "Content Update" },
  { value: "bug-report", label: "Bug Report" },
  { value: "feature-request", label: "Feature Request" },
  { value: "consultation", label: "Strategy Consultation" },
  { value: "urgent", label: "Urgent Issue" }
];

const priorities = [
  { value: "low", label: "Low", color: "bg-gray-100 text-gray-800" },
  { value: "medium", label: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { value: "high", label: "High", color: "bg-orange-100 text-orange-800" },
  { value: "urgent", label: "Urgent", color: "bg-red-100 text-red-800" }
];

export function RequestModal({ isOpen, onClose, prefilledType, prefilledContext }: RequestModalProps) {
  const [formData, setFormData] = useState({
    type: prefilledType || "",
    title: "",
    description: prefilledContext || "",
    priority: "medium",
    attachments: [] as string[]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call to create JIRA issue and Discord thread
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, this would:
    // 1. Create JIRA issue with the form data
    // 2. Open Discord thread for discussion
    // 3. Attach current context (doc/project/task)
    
    console.log("Creating request:", formData);
    
    setIsSubmitting(false);
    onClose();
    
    // Show success toast (would use toast from sonner in real app)
    alert("Request submitted successfully! A JIRA ticket has been created and a Discord thread opened for discussion.");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addAttachment = () => {
    // In a real app, this would open file picker
    const fileName = `attachment-${Date.now()}.pdf`;
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, fileName]
    }));
  };

  const removeAttachment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-[#f7efdb] border-[#8b3123]">
        <DialogHeader>
          <DialogTitle className="text-[#8b3123] font-['Montserrat_Alternates:Bold',_sans-serif] text-[24px]">
            Create New Request
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Request Type */}
          <div className="space-y-2">
            <Label className="text-[#8b3123] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
              Request Type
            </Label>
            <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
              <SelectTrigger className="bg-[rgba(255,255,255,0.5)] border-[#8b3123] text-[#8b3123]">
                <SelectValue placeholder="Select request type..." />
              </SelectTrigger>
              <SelectContent>
                {requestTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label className="text-[#8b3123] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
              Title
            </Label>
            <Input
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Brief description of your request..."
              className="bg-[rgba(255,255,255,0.5)] border-[#8b3123] text-[#8b3123] placeholder:text-[#8b3123]/60"
              required
            />
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <Label className="text-[#8b3123] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
              Priority
            </Label>
            <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
              <SelectTrigger className="bg-[rgba(255,255,255,0.5)] border-[#8b3123] text-[#8b3123]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {priorities.map((priority) => (
                  <SelectItem key={priority.value} value={priority.value}>
                    <div className="flex items-center gap-2">
                      <span className={`inline-block w-2 h-2 rounded-full ${priority.color}`} />
                      {priority.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label className="text-[#8b3123] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
              Description
            </Label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Provide detailed information about your request..."
              className="bg-[rgba(255,255,255,0.5)] border-[#8b3123] text-[#8b3123] placeholder:text-[#8b3123]/60 min-h-[120px]"
              required
            />
          </div>

          {/* Attachments */}
          <div className="space-y-2">
            <Label className="text-[#8b3123] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
              Attachments
            </Label>
            <div className="space-y-2">
              <Button
                type="button"
                variant="outline"
                onClick={addAttachment}
                className="border-[#8b3123] text-[#8b3123] hover:bg-[rgba(139,49,35,0.1)]"
              >
                <Paperclip className="h-4 w-4 mr-2" />
                Add Attachment
              </Button>
              
              {formData.attachments.length > 0 && (
                <div className="space-y-2">
                  {formData.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center justify-between bg-[rgba(255,255,255,0.3)] p-2 rounded">
                      <span className="text-[#8b3123] text-sm">{attachment}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAttachment(index)}
                        className="text-[#8b3123] hover:bg-[rgba(139,49,35,0.1)]"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Context Info */}
          <div className="bg-[rgba(139,49,35,0.1)] p-4 rounded-[16px]">
            <p className="text-[#8b3123] text-sm font-['Montserrat_Alternates:Medium',_sans-serif] mb-2">
              Context will be automatically attached:
            </p>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary" className="bg-[rgba(139,49,35,0.2)] text-[#8b3123]">
                Current Project: Brand Identity Refresh
              </Badge>
              <Badge variant="secondary" className="bg-[rgba(139,49,35,0.2)] text-[#8b3123]">
                Active Task: Logo Variations
              </Badge>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-[#8b3123] text-[#8b3123] hover:bg-[rgba(139,49,35,0.1)]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !formData.type || !formData.title || !formData.description}
              className="bg-[#8b3123] hover:bg-[#7a2e20] text-[#f3e1b7] font-['Montserrat_Alternates:SemiBold',_sans-serif]"
            >
              {isSubmitting ? "Creating..." : "Submit Request"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}