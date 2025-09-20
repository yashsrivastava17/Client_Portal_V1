import { useState } from "react";
import { CollapsibleSection } from "./CollapsibleSection";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { TestTube, Eye, EyeOff, Copy, RefreshCw, Plus, Lock, Shield, User } from "lucide-react";

interface TestAccount {
  id: string;
  name: string;
  platform: "staging" | "facebook" | "instagram" | "twitter" | "linkedin" | "youtube";
  email: string;
  password: string;
  lastUsed: string;
  status: "active" | "expired" | "locked";
  permissions: string[];
}

const mockTestAccounts: TestAccount[] = [
  {
    id: "1",
    name: "Staging Environment - Admin",
    platform: "staging",
    email: "admin@staging.crenoir.com",
    password: "St@g1ng2024!",
    lastUsed: "2024-01-10",
    status: "active",
    permissions: ["Full Access", "Admin Panel", "API Testing"]
  },
  {
    id: "2", 
    name: "Facebook Business Account",
    platform: "facebook",
    email: "social@crenoir.com",
    password: "Fb_T3st2024#",
    lastUsed: "2024-01-08",
    status: "active",
    permissions: ["Page Management", "Ad Account", "Analytics"]
  },
  {
    id: "3",
    name: "Instagram Creator Account",
    platform: "instagram",
    email: "creator@crenoir.com", 
    password: "Ig_Cr3@t0r24",
    lastUsed: "2024-01-09",
    status: "active",
    permissions: ["Content Publishing", "Stories", "IGTV"]
  },
  {
    id: "4",
    name: "Twitter Business Profile",
    platform: "twitter",
    email: "tweets@crenoir.com",
    password: "Tw1tt3r_B1z!",
    lastUsed: "2024-01-05",
    status: "expired",
    permissions: ["Tweet Publishing", "Analytics", "DM Management"]
  },
  {
    id: "5",
    name: "LinkedIn Company Page",
    platform: "linkedin",
    email: "company@crenoir.com",
    password: "L1nk3d_C0rp@",
    lastUsed: "2024-01-07",
    status: "active",
    permissions: ["Company Updates", "Lead Gen", "Analytics"]
  },
  {
    id: "6",
    name: "YouTube Channel Manager",
    platform: "youtube", 
    email: "video@crenoir.com",
    password: "YT_M@n@g3r24",
    lastUsed: "2024-01-03",
    status: "locked",
    permissions: ["Video Upload", "Channel Management", "Analytics"]
  }
];

const platformConfig = {
  staging: { color: "bg-gray-100 text-gray-700 border-gray-200", label: "Staging" },
  facebook: { color: "bg-blue-100 text-blue-700 border-blue-200", label: "Facebook" },
  instagram: { color: "bg-pink-100 text-pink-700 border-pink-200", label: "Instagram" },
  twitter: { color: "bg-cyan-100 text-cyan-700 border-cyan-200", label: "Twitter" },
  linkedin: { color: "bg-indigo-100 text-indigo-700 border-indigo-200", label: "LinkedIn" },
  youtube: { color: "bg-red-100 text-red-700 border-red-200", label: "YouTube" }
};

const statusConfig = {
  active: { color: "bg-green-100 text-green-700 border-green-200", label: "Active" },
  expired: { color: "bg-orange-100 text-orange-700 border-orange-200", label: "Expired" },
  locked: { color: "bg-red-100 text-red-700 border-red-200", label: "Locked" }
};

export function TestingAccountsWidget() {
  const [visiblePasswords, setVisiblePasswords] = useState<Set<string>>(new Set());
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const togglePasswordVisibility = (accountId: string) => {
    const newVisible = new Set(visiblePasswords);
    if (newVisible.has(accountId)) {
      newVisible.delete(accountId);
    } else {
      newVisible.add(accountId);
    }
    setVisiblePasswords(newVisible);
  };

  const copyToClipboard = async (text: string, fieldId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldId);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleRotatePassword = (accountId: string) => {
    console.log("Rotating password for account:", accountId);
    // In real implementation, this would trigger password rotation
  };

  return (
    <CollapsibleSection 
      title="Testing Accounts" 
      icon={<TestTube className="h-5 w-5" />}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#8b3123]" />
            <h3 className="text-[#8b3123] text-[18px] font-['Montserrat_Alternates:SemiBold',_sans-serif]">
              Secure Access Credentials
            </h3>
          </div>
          <Button 
            size="sm"
            className="bg-[#8b3123] hover:bg-[#7a2e20] text-[#f3e1b7] text-[12px] px-3"
          >
            <Plus className="h-3 w-3 mr-1" />
            Add Account
          </Button>
        </div>

        {/* Security Notice */}
        <div className="p-4 rounded-[16px] bg-[rgba(239,68,68,0.05)] border border-[rgba(239,68,68,0.2)]">
          <div className="flex items-start gap-3">
            <Lock className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-red-700 text-[13px] font-['Montserrat_Alternates:SemiBold',_sans-serif] mb-1">
                Security Notice
              </div>
              <div className="text-red-600 text-[12px] leading-relaxed">
                These credentials are for testing purposes only. Access is logged and monitored. 
                Never use these accounts for production data or personal information.
              </div>
            </div>
          </div>
        </div>

        {/* Account Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {mockTestAccounts.map((account) => (
            <div 
              key={account.id}
              className="rounded-[24px] p-5 border border-[rgba(139,49,35,0.1)] hover:border-[rgba(139,49,35,0.2)] transition-colors"
              style={{
                background: 'linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)), rgba(255, 255, 255, 0.4)'
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Badge className={`text-[10px] px-2 py-1 ${platformConfig[account.platform].color}`}>
                    {platformConfig[account.platform].label}
                  </Badge>
                  <Badge className={`text-[10px] px-2 py-1 ${statusConfig[account.status].color}`}>
                    {statusConfig[account.status].label}
                  </Badge>
                </div>
                <div className="text-[#8b3123] text-[11px] opacity-60">
                  Last used: {new Date(account.lastUsed).toLocaleDateString()}
                </div>
              </div>

              {/* Account Name */}
              <h4 className="text-[#8b3123] text-[16px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-4">
                {account.name}
              </h4>

              {/* Credentials */}
              <div className="space-y-3 mb-4">
                {/* Email */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[#8b3123] text-[12px] font-['Montserrat_Alternates:SemiBold',_sans-serif] opacity-70">
                      Email
                    </label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(account.email, `email-${account.id}`)}
                      className="h-6 w-6 p-0 text-[#8b3123] hover:bg-[rgba(139,49,35,0.1)]"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="text-[#8b3123] text-[13px] font-mono bg-[rgba(139,49,35,0.05)] px-3 py-2 rounded-[8px] break-all">
                    {account.email}
                    {copiedField === `email-${account.id}` && (
                      <span className="text-green-600 text-[11px] ml-2">Copied!</span>
                    )}
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[#8b3123] text-[12px] font-['Montserrat_Alternates:SemiBold',_sans-serif] opacity-70">
                      Password
                    </label>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => togglePasswordVisibility(account.id)}
                        className="h-6 w-6 p-0 text-[#8b3123] hover:bg-[rgba(139,49,35,0.1)]"
                      >
                        {visiblePasswords.has(account.id) ? (
                          <EyeOff className="h-3 w-3" />
                        ) : (
                          <Eye className="h-3 w-3" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(account.password, `password-${account.id}`)}
                        className="h-6 w-6 p-0 text-[#8b3123] hover:bg-[rgba(139,49,35,0.1)]"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-[#8b3123] text-[13px] font-mono bg-[rgba(139,49,35,0.05)] px-3 py-2 rounded-[8px] break-all">
                    {visiblePasswords.has(account.id) ? account.password : "••••••••••••"}
                    {copiedField === `password-${account.id}` && (
                      <span className="text-green-600 text-[11px] ml-2">Copied!</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Permissions */}
              <div className="mb-4">
                <label className="text-[#8b3123] text-[12px] font-['Montserrat_Alternates:SemiBold',_sans-serif] opacity-70 mb-2 block">
                  Permissions
                </label>
                <div className="flex flex-wrap gap-1">
                  {account.permissions.map((permission, index) => (
                    <span 
                      key={index}
                      className="text-[9px] px-2 py-1 rounded-full bg-[rgba(139,49,35,0.1)] text-[#8b3123]"
                    >
                      {permission}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRotatePassword(account.id)}
                  className="flex-1 text-[#8b3123] border-[#8b3123] hover:bg-[rgba(139,49,35,0.1)] text-[12px] h-8"
                >
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Rotate Password
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-[#8b3123] border-[#8b3123] hover:bg-[rgba(139,49,35,0.1)] text-[12px] h-8 px-3"
                >
                  <User className="h-3 w-3 mr-1" />
                  Login
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Usage Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-[rgba(139,49,35,0.1)]">
          <div className="text-center p-3 rounded-[12px] bg-[rgba(139,49,35,0.05)]">
            <div className="text-[#8b3123] text-[18px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-1">
              {mockTestAccounts.filter(acc => acc.status === "active").length}
            </div>
            <div className="text-[#8b3123] text-[11px] opacity-60">
              Active Accounts
            </div>
          </div>
          
          <div className="text-center p-3 rounded-[12px] bg-[rgba(139,49,35,0.05)]">
            <div className="text-[#8b3123] text-[18px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-1">
              47
            </div>
            <div className="text-[#8b3123] text-[11px] opacity-60">
              Access Logs (7d)
            </div>
          </div>
          
          <div className="text-center p-3 rounded-[12px] bg-[rgba(139,49,35,0.05)]">
            <div className="text-[#8b3123] text-[18px] font-['Montserrat_Alternates:Bold',_sans-serif] mb-1">
              98%
            </div>
            <div className="text-[#8b3123] text-[11px] opacity-60">
              Uptime
            </div>
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
}