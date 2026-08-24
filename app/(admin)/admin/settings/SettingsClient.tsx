"use client"

import React, { useState } from "react";
import {
  Sliders,
  Palette,
  Search,
  Share2,
  Mail,
  Shield,
  Server,
  Save,
  CheckCircle2,
  HardDrive,
  Database,
} from "lucide-react";

const sections = [
  { id: "general", label: "General", icon: Sliders },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "seo", label: "SEO & Social", icon: Search },
  { id: "social", label: "Social Links", icon: Share2 },
  { id: "contact", label: "Contact Form", icon: Mail },
  { id: "security", label: "Security & Auth", icon: Shield },
  { id: "system", label: "System & Storage", icon: Server },
];

export default function SettingsClient() {
  const [activeSection, setActiveSection] = useState("general");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
      {/* Settings Navigation */}
      <div className="md:col-span-4 lg:col-span-3 glass-panel rounded-2xl border border-border/80 p-2 bg-card/60 space-y-1">
        {sections.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => setActiveSection(sec.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              }`}
            >
              <Icon size={16} />
              <span>{sec.label}</span>
            </button>
          );
        })}
      </div>

      {/* Settings Content Area */}
      <div className="md:col-span-8 lg:col-span-9 glass-panel rounded-2xl border border-border/80 p-6 md:p-8 bg-card/60">
        <form onSubmit={handleSave} className="space-y-6">
          {/* General Section */}
          {activeSection === "general" && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="border-b border-border/60 pb-3">
                <h3 className="text-base font-bold text-foreground">General Configuration</h3>
                <p className="text-xs text-muted-foreground">Core portfolio identity and studio branding.</p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Site Name</label>
                  <input
                    type="text"
                    defaultValue="Bazi Studio"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border outline-none focus:border-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Site Tagline / Description</label>
                  <textarea
                    rows={3}
                    defaultValue="High-performance digital products, full-stack systems, and modern interactive UI/UX experiences."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border outline-none focus:border-primary resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Primary Contact Email</label>
                  <input
                    type="email"
                    defaultValue="contact@bazistudio.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Appearance Section */}
          {activeSection === "appearance" && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="border-b border-border/60 pb-3">
                <h3 className="text-base font-bold text-foreground">Appearance & Theme</h3>
                <p className="text-xs text-muted-foreground">Color tokens, typography, and visual preferences.</p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Primary Accent Color</label>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-primary border border-border shadow-sm shrink-0" />
                    <input
                      type="text"
                      defaultValue="#1003E8"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border font-mono outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Default Color Mode</label>
                  <select className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border outline-none">
                    <option value="system">System Preference (Auto)</option>
                    <option value="dark">Dark Theme (Forced)</option>
                    <option value="light">Light Theme (Forced)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* SEO Section */}
          {activeSection === "seo" && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="border-b border-border/60 pb-3">
                <h3 className="text-base font-bold text-foreground">SEO & Metadata</h3>
                <p className="text-xs text-muted-foreground">Global meta tags, OpenGraph previews, and indexing defaults.</p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Default Meta Title</label>
                  <input
                    type="text"
                    defaultValue="Bazi Studio — Digital Engineering & UI/UX"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Default Meta Description</label>
                  <textarea
                    rows={2}
                    defaultValue="Bazi Studio builds modern web applications, scalable architectures, and interactive digital interfaces."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border outline-none resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Sitemap Endpoint</label>
                  <p className="font-mono text-primary text-xs bg-muted/40 p-2.5 rounded-xl border border-border">
                    /sitemap.xml (Active & Auto-generated)
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Social Links Section */}
          {activeSection === "social" && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="border-b border-border/60 pb-3">
                <h3 className="text-base font-bold text-foreground">Social & Profiles</h3>
                <p className="text-xs text-muted-foreground">External social media handles and code repositories.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">GitHub Profile</label>
                  <input
                    type="url"
                    defaultValue="https://github.com/bazistudio"
                    placeholder="https://github.com/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">LinkedIn</label>
                  <input
                    type="url"
                    defaultValue="https://linkedin.com/company/bazistudio"
                    placeholder="https://linkedin.com/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Figma Community</label>
                  <input
                    type="url"
                    defaultValue="https://figma.com/@bazistudio"
                    placeholder="https://figma.com/@..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">X / Twitter</label>
                  <input
                    type="url"
                    placeholder="https://x.com/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Contact Section */}
          {activeSection === "contact" && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="border-b border-border/60 pb-3">
                <h3 className="text-base font-bold text-foreground">Contact Form & Inquiries</h3>
                <p className="text-xs text-muted-foreground">Notification routes and contact API preferences.</p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Inquiry Notification Email</label>
                  <input
                    type="email"
                    defaultValue="inquiries@bazistudio.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="emailNotifs"
                    defaultChecked
                    className="w-4 h-4 rounded text-primary border-border"
                  />
                  <label htmlFor="emailNotifs" className="font-medium text-foreground cursor-pointer">
                    Send instant email notification for new website inquiries
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Security Section */}
          {activeSection === "security" && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="border-b border-border/60 pb-3">
                <h3 className="text-base font-bold text-foreground">Security & Access</h3>
                <p className="text-xs text-muted-foreground">Supabase authentication, admin privileges, and RLS policies.</p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 size={14} /> Profile Immutability & RLS Trigger Enforced
                  </p>
                  <p className="text-[11px] opacity-90">
                    Row Level Security policies prevent unauthorized privilege escalation.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Current Admin Account</label>
                  <input
                    type="text"
                    readOnly
                    defaultValue="Administrator (Authenticated)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-muted/50 border border-border text-muted-foreground outline-none font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* System Section */}
          {activeSection === "system" && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="border-b border-border/60 pb-3">
                <h3 className="text-base font-bold text-foreground">System & Database Status</h3>
                <p className="text-xs text-muted-foreground">PostgreSQL database and Supabase Storage bucket telemetry.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-muted/40 border border-border/50 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-foreground">
                    <Database size={16} className="text-primary" />
                    <h4>PostgreSQL Database</h4>
                  </div>
                  <div className="space-y-1 text-muted-foreground">
                    <p>Status: <span className="text-emerald-500 font-semibold">Connected</span></p>
                    <p>Engine: Supabase PostgREST</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-muted/40 border border-border/50 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-foreground">
                    <HardDrive size={16} className="text-emerald-500" />
                    <h4>Storage Bucket</h4>
                  </div>
                  <div className="space-y-1 text-muted-foreground">
                    <p>Bucket: <span className="font-mono text-foreground">portfolio-media</span></p>
                    <p>Access: Public Read • Guarded Write</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="flex items-center justify-between pt-4 border-t border-border/60">
            {saved ? (
              <span className="text-xs font-semibold text-emerald-500 flex items-center gap-1.5">
                <CheckCircle2 size={15} /> Preferences saved successfully
              </span>
            ) : (
              <span className="text-xs text-muted-foreground">Future-ready settings configuration</span>
            )}

            <button
              type="submit"
              className="btn-base bg-primary text-primary-foreground px-6 py-2 text-xs font-semibold shadow-md flex items-center gap-2"
            >
              <Save size={14} />
              <span>Save Preferences</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
