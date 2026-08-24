import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";
import { Globe } from "lucide-react";

export default async function AdminTrafficSourcesPage() {
  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Analytics → Traffic Sources"
        description="Analyze referral channels, search engines, direct links, and social discovery."
      />

      <EmptyState
        icon={Globe}
        title="Traffic attribution not available yet"
        description="Referrer tracking and campaign breakdown data will populate once domain analytics are enabled."
      />
    </div>
  );
}
