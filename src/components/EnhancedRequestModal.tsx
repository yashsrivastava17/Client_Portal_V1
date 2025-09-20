import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { X, Link, MousePointer, FileText, Users, Code, Type } from "lucide-react";

interface EnhancedRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  requestType?: "design-change" | "user-research" | "dev-handoff" | "content-update" | "report-user-pattern";
}

export function EnhancedRequestModal({ isOpen, onClose, requestType }: EnhancedRequestModalProps) {
  const [selectedType, setSelectedType] = useState(requestType || "design-change");
  const [figmaUrl, setFigmaUrl] = useState("");
  const [siteUrl, setSiteUrl] = useState("");
  const [annotations, setAnnotations] = useState<{x: number, y: number, note: string}[]>([]);
  const [currentAnnotation, setCurrentAnnotation] = useState("");
  const [isAnnotating, setIsAnnotating] = useState(false);

  const requestTypes = {
    "design-change": {
      title: "Design Changes",
      icon: <MousePointer className="h-4 w-4" />,
      description: "Request modifications to existing designs or concepts"
    },
    "user-research": {
      title: "User Research",
      icon: <Users className="h-4 w-4" />,
      description: "Conduct user research or analyze user patterns"
    },
    "dev-handoff": {
      title: "Dev Handoff Clarity",
      icon: <Code className="h-4 w-4" />,
      description: "Clarification needed for development implementation"
    },
    "content-update": {
      title: "Content Update",
      icon: <Type className="h-4 w-4" />,
      description: "Text and content revisions"
    },
    "report-user-pattern": {
      title: "Report User Pattern",
      icon: <Users className="h-4 w-4" />,
      description: "Report observed user behavior patterns or analytics insights"
    }
  };

  const handleAnnotationClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isAnnotating) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    if (currentAnnotation.trim()) {
      setAnnotations([...annotations, { x, y, note: currentAnnotation }]);
      setCurrentAnnotation("");
      setIsAnnotating(false);
    }
  };

  const removeAnnotation = (index: number) => {
    setAnnotations(annotations.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#8b3123] text-[24px] font-['Montserrat_Alternates:Bold',_sans-serif]">
            Submit Request
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Request Type Selection - Only show if no specific type provided */}
          {!requestType && (
            <div>
              <Label className="text-[#8b3123] text-[16px] font-['Montserrat_Alternates:SemiBold',_sans-serif] mb-3 block">
                Request Type
              </Label>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(requestTypes).map(([key, type]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedType(key as any)}
                    className={`p-4 rounded-[12px] border-2 transition-all text-left ${
                      selectedType === key
                        ? 'border-[#8b3123] bg-[rgba(139,49,35,0.1)]'
                        : 'border-[rgba(139,49,35,0.2)] hover:border-[rgba(139,49,35,0.4)]'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-[#8b3123]">{type.icon}</div>
                      <div className="text-[#8b3123] text-[14px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
                        {type.title}
                      </div>
                    </div>
                    <div className="text-[#8b3123] text-[12px] opacity-70">
                      {type.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Show selected type when provided */}
          {requestType && (
            <div className="bg-[rgba(139,49,35,0.05)] rounded-[12px] p-4 border border-[rgba(139,49,35,0.1)]">
              <div className="flex items-center gap-3">
                <div className="text-[#8b3123]">{requestTypes[requestType].icon}</div>
                <div>
                  <div className="text-[#8b3123] text-[16px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
                    {requestTypes[requestType].title}
                  </div>
                  <div className="text-[#8b3123] text-[12px] opacity-70">
                    {requestTypes[requestType].description}
                  </div>
                </div>
              </div>
            </div>
          )}

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Request Details</TabsTrigger>
              <TabsTrigger value="links">Links & References</TabsTrigger>
              <TabsTrigger value="annotations">Annotations</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <div>
                <Label className="text-[#8b3123] text-[14px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
                  Request Title
                </Label>
                <Input 
                  placeholder="Brief description of your request"
                  className="mt-2"
                />
              </div>

              <div>
                <Label className="text-[#8b3123] text-[14px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
                  Priority Level
                </Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - Can wait</SelectItem>
                    <SelectItem value="medium">Medium - Important</SelectItem>
                    <SelectItem value="high">High - Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-[#8b3123] text-[14px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
                  Detailed Description
                </Label>
                <Textarea 
                  placeholder="Provide detailed information about your request..."
                  className="mt-2 min-h-[120px]"
                />
              </div>

              {selectedType === "design-change" && (
                <div className="p-4 rounded-[12px] bg-[rgba(139,49,35,0.05)] border border-[rgba(139,49,35,0.1)]">
                  <div className="text-[#8b3123] text-[14px] font-['Montserrat_Alternates:SemiBold',_sans-serif] mb-2">
                    Design Change Guidelines
                  </div>
                  <ul className="text-[#8b3123] text-[12px] opacity-80 space-y-1">
                    <li>• Specify which design elements need changes</li>
                    <li>• Include reasoning for the requested changes</li>
                    <li>• Attach Figma frames or reference materials</li>
                    <li>• Add annotations to highlight specific areas</li>
                  </ul>
                </div>
              )}
            </TabsContent>

            <TabsContent value="links" className="space-y-4">
              <div>
                <Label className="text-[#8b3123] text-[14px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
                  Figma Frame URL
                </Label>
                <div className="flex gap-2 mt-2">
                  <Input 
                    placeholder="https://figma.com/file/..."
                    value={figmaUrl}
                    onChange={(e) => setFigmaUrl(e.target.value)}
                  />
                  <Button variant="outline" size="icon">
                    <Link className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-[#8b3123] text-[11px] opacity-60 mt-1">
                  Link to specific Figma frame or design you want to reference
                </div>
              </div>

              <div>
                <Label className="text-[#8b3123] text-[14px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
                  Site Page URL (Optional)
                </Label>
                <div className="flex gap-2 mt-2">
                  <Input 
                    placeholder="https://yoursite.com/page"
                    value={siteUrl}
                    onChange={(e) => setSiteUrl(e.target.value)}
                  />
                  <Button variant="outline" size="icon">
                    <Link className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-[#8b3123] text-[11px] opacity-60 mt-1">
                  Link to the live page that needs attention
                </div>
              </div>

              <div className="p-4 rounded-[12px] bg-[rgba(139,49,35,0.05)] border border-[rgba(139,49,35,0.1)]">
                <div className="flex items-start gap-3">
                  <FileText className="h-4 w-4 text-[#8b3123] mt-0.5" />
                  <div>
                    <div className="text-[#8b3123] text-[13px] font-['Montserrat_Alternates:SemiBold',_sans-serif] mb-1">
                      Quick Tip
                    </div>
                    <div className="text-[#8b3123] text-[12px] opacity-80">
                      For design changes, linking the specific Figma frame helps us understand exactly what you're referring to. For dev handoff, include both the design and live site links.
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="annotations" className="space-y-4">
              {figmaUrl && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Label className="text-[#8b3123] text-[14px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
                      Annotate Design
                    </Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsAnnotating(!isAnnotating)}
                      className={isAnnotating ? "bg-[#8b3123] text-white" : ""}
                    >
                      <MousePointer className="h-4 w-4 mr-2" />
                      {isAnnotating ? "Click to Place" : "Add Annotation"}
                    </Button>
                  </div>

                  {isAnnotating && (
                    <div className="mb-4">
                      <Input
                        placeholder="Type your annotation note..."
                        value={currentAnnotation}
                        onChange={(e) => setCurrentAnnotation(e.target.value)}
                        className="text-[14px]"
                      />
                    </div>
                  )}

                  <div 
                    className="relative w-full h-[300px] bg-gray-100 rounded-[12px] border-2 border-dashed border-[rgba(139,49,35,0.3)] cursor-crosshair overflow-hidden"
                    onClick={handleAnnotationClick}
                  >
                    <div className="absolute inset-0 flex items-center justify-center text-[#8b3123] opacity-50">
                      {figmaUrl ? "Figma Design Preview" : "Add Figma URL to enable annotations"}
                    </div>
                    
                    {annotations.map((annotation, index) => (
                      <div
                        key={index}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `${annotation.x}%`, top: `${annotation.y}%` }}
                      >
                        <div className="relative">
                          <div className="w-6 h-6 bg-[#8b3123] text-white rounded-full flex items-center justify-center text-[12px] font-bold">
                            {index + 1}
                          </div>
                          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-[8px] shadow-lg border border-[rgba(139,49,35,0.2)] min-w-[150px] z-10">
                            <div className="text-[#8b3123] text-[12px] mb-2">{annotation.note}</div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeAnnotation(index);
                              }}
                              className="p-1 h-auto text-red-500 hover:text-red-700"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!figmaUrl && (
                <div className="text-center py-8">
                  <FileText className="h-8 w-8 text-[rgba(139,49,35,0.4)] mx-auto mb-3" />
                  <div className="text-[#8b3123] text-[14px] opacity-60">
                    Add a Figma URL in the Links tab to enable annotations
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-[rgba(139,49,35,0.1)]">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 text-[#8b3123] border-[#8b3123] hover:bg-[rgba(139,49,35,0.1)]"
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-[#8b3123] hover:bg-[#7a2e20] text-[#f3e1b7]"
            >
              Submit Request
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}