import { getCategories } from "@/lib/actions/taxonomy";
import PageHeader from "@/components/admin/PageHeader";
import CollectionsTreeView from "@/components/collection/CollectionsTreeView";

export default async function CollectionsPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Collections"
        description="Organize projects into structural collections for Home, Portfolio, and Projects views."
        badge={`${categories.length} Total`}
      />

      <CollectionsTreeView initialCategories={categories} />
    </div>
  );
}
