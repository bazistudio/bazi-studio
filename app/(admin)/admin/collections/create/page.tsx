import { getCategories } from "@/lib/actions/taxonomy";
import PageHeader from "@/components/admin/PageHeader";
import CollectionsTreeView from "@/components/collection/CollectionsTreeView";

export default async function CreateCollectionPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Create Collection"
        description="Organize projects into structural categories."
      />

      <CollectionsTreeView initialCategories={categories} />
    </div>
  );
}
