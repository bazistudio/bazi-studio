"use client"

import React from "react";
import Link from "next/link";
import { Menu, ExternalLink, ShieldCheck } from "lucide-react";

interface AdminHeaderProps {
  onToggleMobile: () => void;
}

export default function AdminHeader({ onToggleMobile }: AdminHeaderProps) {
  return (
    <header className="h-16 border-b border-border bg-card/60 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleMobile}
          className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} />
        </button>
        <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck size={14} className="text-emerald-500" />
          <span>Authenticated as <strong className="text-foreground">Administrator</strong></span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 text-xs font-semibold px-3.5 py-1.5 rounded-lg border border-border/80 hover:bg-muted/80 text-foreground transition-all"
        >
          <span>Live Site</span>
          <ExternalLink size={13} className="text-muted-foreground" />
        </Link>
      </div>
    </header>
  );
}
