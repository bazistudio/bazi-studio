import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/feedback/EmptyState";
import { BookOpen } from "lucide-react";

export default function AdminProjectsPageConfig() {
  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Pages → Projects"
        description="Configure case study detail page presets, video embeds, and related project layouts."
      />

      <EmptyState
        icon={BookOpen}
        title="Case Study Layouts Active"
        description="All case studies dynamically render media galleries, YouTube walkthroughs, problem/solution blocks, and Figma embeds automatically."
        actionLabel="View Projects"
        actionHref="/admin/projects"
      />
    </div>
  );
}
