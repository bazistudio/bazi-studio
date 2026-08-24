import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";
import { MessageSquare, Inbox } from "lucide-react";

export default async function AdminMessagesPage() {
  // Empty real messages inbox
  const messages: any[] = [];

  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Messages Inbox"
        description="Review incoming client inquiries, lead submissions, and contact form messages."
        badge="0 Inquiries"
      />

      {messages.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title="No messages"
          description="Contact form submissions and client inquiries will appear here when submitted on the website."
        />
      ) : (
        <div className="space-y-4">
          {/* Real messages list when populated */}
        </div>
      )}
    </div>
  );
}
