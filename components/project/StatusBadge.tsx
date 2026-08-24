import React from "react";

type StatusType = "draft" | "published" | "archived" | "active" | "inactive";

export default function StatusBadge({ status }: { status: StatusType | string }) {
  let colorClasses = "bg-muted text-muted-foreground border-border";

  switch (status?.toLowerCase()) {
    case "published":
    case "active":
      colorClasses = "bg-success/10 text-success border-success/20";
      break;
    case "draft":
    case "inactive":
      colorClasses = "bg-warning/10 text-warning border-warning/20";
      break;
    case "archived":
      colorClasses = "bg-destructive/10 text-destructive border-destructive/20";
      break;
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClasses}`}>
      {status ? status.charAt(0).toUpperCase() + status.slice(1) : "Unknown"}
    </span>
  );
}
