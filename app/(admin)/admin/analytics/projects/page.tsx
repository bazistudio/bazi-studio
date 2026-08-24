import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/feedback/EmptyState";
import { FolderKanban } from "lucide-react";

export default async function AdminProjectAnalyticsPage() {
  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Analytics → Projects"
        description="View individual case study performance, prototype click-throughs, and video views."
      />

      <EmptyState
        icon={FolderKanban}
        title="Project view telemetry pending"
        description="Case study impressions and Figma prototype interaction metrics will display here as visitors view projects."
      />
    </div>
  );
}
