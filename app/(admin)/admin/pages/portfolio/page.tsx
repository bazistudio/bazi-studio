import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/feedback/EmptyState";
import { FolderKanban } from "lucide-react";

export default function AdminPortfolioPageConfig() {
  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Pages → Portfolio"
        description="Configure public portfolio filtering, category layout, and featured badges."
      />

      <EmptyState
        icon={FolderKanban}
        title="Portfolio Page Online"
        description="The portfolio overview dynamically filters projects by collection and project type. Manage projects to update the live catalog."
        actionLabel="Manage Projects"
        actionHref="/admin/projects"
      />
    </div>
  );
}
