import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";
import { FolderKanban } from "lucide-react";

export default async function AdminProjectsAnalyticsPage() {
  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Analytics → Projects"
        description="Track individual case study views, demo click-through rates, and repo visits."
      />

      <EmptyState
        icon={FolderKanban}
        title="Project metrics not available yet"
        description="Individual project view metrics and conversion tracking will appear here once telemetry is connected."
      />
    </div>
  );
}
