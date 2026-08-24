import PageHeader from "@/components/admin/PageHeader";
import SettingsClient from "./SettingsClient";

export default async function AdminSettingsPage() {
  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Settings"
        description="Configure general studio branding, visual appearance, SEO metadata, contact routes, and system telemetry."
      />

      <SettingsClient />
    </div>
  );
}
