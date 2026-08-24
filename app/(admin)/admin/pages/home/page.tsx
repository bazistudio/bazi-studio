import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/feedback/EmptyState";
import { Layout } from "lucide-react";

export default function AdminHomePageConfig() {
  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Pages → Home"
        description="Configure dynamic section layout, hero messaging, and featured categories on the homepage."
      />

      <EmptyState
        icon={Layout}
        title="Page Configuration Active"
        description="The homepage is connected to live database queries. Use the Collections and Projects managers to control items spotlighted on the home screen."
        actionLabel="Manage Featured Projects"
        actionHref="/admin/projects"
      />
    </div>
  );
}
