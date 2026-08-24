import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/feedback/EmptyState";
import { Globe } from "lucide-react";

export default async function AdminTrafficSourcesPage() {
  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Analytics → Traffic Sources"
        description="View referring domains, search engine keywords, and direct visits."
      />

      <EmptyState
        icon={Globe}
        title="Traffic source tracking pending"
        description="Source tracking will automatically aggregate visit origins once user traffic is detected."
      />
    </div>
  );
}
