import React from "react";
import Link from "next/link";
import { LucideIcon, FolderPlus } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
}

export default function EmptyState({
  icon: Icon = FolderPlus,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`border-2 border-dashed border-border/80 rounded-2xl p-12 text-center flex flex-col items-center justify-center max-w-2xl mx-auto bg-card/30 ${className}`}>
      <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4 shadow-sm">
        <Icon size={28} />
      </div>
      <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-md mb-6 leading-relaxed">
        {description}
      </p>

      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="btn-base bg-primary text-primary-foreground px-6 py-2.5 text-sm font-semibold shadow-md hover:shadow-primary/20 transition-all flex items-center gap-2"
        >
          {actionLabel}
        </Link>
      )}

      {actionLabel && onAction && !actionHref && (
        <button
          type="button"
          onClick={onAction}
          className="btn-base bg-primary text-primary-foreground px-6 py-2.5 text-sm font-semibold shadow-md hover:shadow-primary/20 transition-all flex items-center gap-2"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
