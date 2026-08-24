import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/feedback/EmptyState";
import { BarChart3 } from "lucide-react";

export default async function AdminAnalyticsPage() {
  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Analytics → Website"
        description="Monitor website traffic, page impressions, and user engagement metrics."
      />

      <EmptyState
        icon={BarChart3}
        title="Analytics data is not available yet"
        description="Connect an analytics provider or tracking integration to start recording website traffic and visitor sessions."
      />
    </div>
  );
}
