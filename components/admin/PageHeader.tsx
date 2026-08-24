import React from "react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: string;
  actionLabel?: string;
  actionHref?: string;
  actionIcon?: LucideIcon;
  onAction?: () => void;
  children?: React.ReactNode;
}

export default function PageHeader({
  title,
  description,
  badge,
  actionLabel,
  actionHref,
  actionIcon: ActionIcon,
  onAction,
  children,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{title}</h1>
          {badge && (
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              {badge}
            </span>
          )}
        </div>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {children}
        {actionLabel && actionHref && (
          <Link
            href={actionHref}
            className="btn-base bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold shadow-md hover:shadow-primary/20 transition-all flex items-center gap-2"
          >
            {ActionIcon && <ActionIcon size={16} />}
            {actionLabel}
          </Link>
        )}
        {actionLabel && onAction && !actionHref && (
          <button
            type="button"
            onClick={onAction}
            className="btn-base bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold shadow-md hover:shadow-primary/20 transition-all flex items-center gap-2"
          >
            {ActionIcon && <ActionIcon size={16} />}
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
