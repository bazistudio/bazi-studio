import { getCategories } from "@/lib/actions/taxonomy";
import PageHeader from "@/components/admin/PageHeader";
import CollectionsTreeView from "@/components/admin/CollectionsTreeView";

export default async function CreateCollectionPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Create Collection"
        description="Add a new organizational group to classify projects across your website."
      />

      <CollectionsTreeView initialCategories={categories} />
    </div>
  );
}
