import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { MessageSquare, Paperclip, Link, Send, Camera, FileText, Video, Target } from "lucide-react";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Attachment {
  id: string;
  name: string;
  type: "image" | "link" | "document";
  url?: string;
}

export function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [feedbackType, setFeedbackType] = useState<"campaign" | "video" | "general" | "">("");
  const [feedbackText, setFeedbackText] = useState("");
  const [subject, setSubject] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high" | "">("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [linkUrl, setLinkUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!feedbackType || !feedbackText.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      console.log("Feedback submitted:", {
        type: feedbackType,
        subject,
        text: feedbackText,
        priority,
        attachments
      });
      
      setIsSubmitting(false);
      onClose();
      
      // Reset form
      setFeedbackType("");
      setFeedbackText("");
      setSubject("");
      setPriority("");
      setAttachments([]);
      setLinkUrl("");
    }, 2000);
  };

  const addLinkAttachment = () => {
    if (!linkUrl.trim()) return;
    
    const newAttachment: Attachment = {
      id: Date.now().toString(),
      name: linkUrl,
      type: "link",
      url: linkUrl
    };
    
    setAttachments([...attachments, newAttachment]);
    setLinkUrl("");
  };

  const removeAttachment = (id: string) => {
    setAttachments(attachments.filter(att => att.id !== id));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "campaign": return <Target className="h-4 w-4" />;
      case "video": return <Video className="h-4 w-4" />;
      case "general": return <MessageSquare className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getAttachmentIcon = (type: Attachment['type']) => {
    switch (type) {
      case "image": return <Camera className="h-3 w-3" />;
      case "link": return <Link className="h-3 w-3" />;
      case "document": return <FileText className="h-3 w-3" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#8b3123] text-[24px] font-['Montserrat_Alternates:Bold',_sans-serif] flex items-center gap-2">
            <MessageSquare className="h-6 w-6" />
            Submit Detailed Feedback
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Feedback Type Selection */}
          <div>
            <Label className="text-[#8b3123] text-[14px] font-['Montserrat_Alternates:SemiBold',_sans-serif] mb-3 block">
              Feedback Type
            </Label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "campaign", label: "Campaign Feedback", description: "Overall campaign strategy and execution" },
                { id: "video", label: "Video Feedback", description: "Specific video content and production" },
                { id: "general", label: "General Feedback", description: "Process, tools, or other suggestions" }
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => setFeedbackType(type.id as any)}
                  className={`p-4 rounded-[16px] border-2 transition-all text-left ${
                    feedbackType === type.id
                      ? 'border-[#8b3123] bg-[rgba(139,49,35,0.1)]'
                      : 'border-[rgba(139,49,35,0.2)] hover:border-[rgba(139,49,35,0.4)]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-[#8b3123]">{getTypeIcon(type.id)}</div>
                    <div className="text-[#8b3123] text-[14px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
                      {type.label}
                    </div>
                  </div>
                  <div className="text-[#8b3123] text-[12px] opacity-70">
                    {type.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Subject and Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-[#8b3123] text-[14px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
                Subject
              </Label>
              <Input 
                placeholder="Brief summary of your feedback"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="mt-2"
              />
            </div>
            
            <div>
              <Label className="text-[#8b3123] text-[14px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
                Priority Level
              </Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low - General suggestions</SelectItem>
                  <SelectItem value="medium">Medium - Important feedback</SelectItem>
                  <SelectItem value="high">High - Urgent improvements needed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Detailed Feedback */}
          <div>
            <Label className="text-[#8b3123] text-[14px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
              Detailed Feedback
            </Label>
            <Textarea 
              placeholder="Please provide your detailed feedback here. Be specific about what works well, what could be improved, and any suggestions you have..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              className="mt-2 min-h-[150px] resize-none"
            />
            <div className="text-[#8b3123] text-[11px] opacity-60 mt-1 text-right">
              {feedbackText.length} characters
            </div>
          </div>

          {/* Attachments Section */}
          <div>
            <Label className="text-[#8b3123] text-[14px] font-['Montserrat_Alternates:SemiBold',_sans-serif] mb-3 block">
              Attachments & References
            </Label>
            
            {/* Link Attachment */}
            <div className="flex gap-2 mb-4">
              <Input 
                placeholder="Add a link (Figma, website, document, etc.)"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="flex-1"
              />
              <Button 
                variant="outline" 
                onClick={addLinkAttachment}
                disabled={!linkUrl.trim()}
                className="text-[#8b3123] border-[#8b3123] hover:bg-[rgba(139,49,35,0.1)]"
              >
                <Link className="h-4 w-4 mr-1" />
                Add Link
              </Button>
            </div>

            {/* File Upload Placeholder */}
            <div className="border-2 border-dashed border-[rgba(139,49,35,0.3)] rounded-[12px] p-6 text-center bg-[rgba(139,49,35,0.02)]">
              <Paperclip className="h-8 w-8 text-[#8b3123] opacity-50 mx-auto mb-2" />
              <div className="text-[#8b3123] text-[13px] opacity-70 mb-2">
                Drag and drop files here, or click to browse
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="text-[#8b3123] border-[#8b3123] hover:bg-[rgba(139,49,35,0.1)]"
              >
                <Camera className="h-3 w-3 mr-1" />
                Upload Screenshots
              </Button>
            </div>

            {/* Attachment List */}
            {attachments.length > 0 && (
              <div className="mt-4 space-y-2">
                {attachments.map((attachment) => (
                  <div 
                    key={attachment.id}
                    className="flex items-center gap-3 p-3 rounded-[8px] border border-[rgba(139,49,35,0.1)] bg-[rgba(139,49,35,0.05)]"
                  >
                    <div className="text-[#8b3123]">
                      {getAttachmentIcon(attachment.type)}
                    </div>
                    <div className="flex-1">
                      <div className="text-[#8b3123] text-[12px] font-['Montserrat_Alternates:Medium',_sans-serif] truncate">
                        {attachment.name}
                      </div>
                      <div className="text-[#8b3123] text-[10px] opacity-60 capitalize">
                        {attachment.type}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAttachment(attachment.id)}
                      className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Feedback Guidelines */}
          <div className="p-4 rounded-[12px] bg-[rgba(139,49,35,0.05)] border border-[rgba(139,49,35,0.1)]">
            <div className="text-[#8b3123] text-[13px] font-['Montserrat_Alternates:SemiBold',_sans-serif] mb-2">
              💡 Feedback Guidelines
            </div>
            <ul className="text-[#8b3123] text-[12px] opacity-80 space-y-1">
              <li>• Be specific about what you liked and what could be improved</li>
              <li>• Include timestamps for video feedback (e.g., "at 0:30 the transition feels abrupt")</li>
              <li>• Attach relevant screenshots, links, or reference materials</li>
              <li>• Suggest actionable improvements when possible</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-[rgba(139,49,35,0.1)]">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 text-[#8b3123] border-[#8b3123] hover:bg-[rgba(139,49,35,0.1)]"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!feedbackType || !feedbackText.trim() || isSubmitting}
              className="flex-1 bg-[#8b3123] hover:bg-[#7a2e20] text-[#f3e1b7]"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#f3e1b7] border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </div>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-1" />
                  Submit Feedback
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}