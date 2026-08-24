import { getCategories } from "@/lib/actions/taxonomy";
import GuidedProjectCreate from "@/components/admin/project-editor/GuidedProjectCreate";

export default async function NewProjectPage() {
  const categories = await getCategories();

  return <GuidedProjectCreate categories={categories} />;
}
