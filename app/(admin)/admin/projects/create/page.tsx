import { getCategories } from "@/lib/actions/taxonomy";
import GuidedProjectCreate from "@/components/admin/project-editor/GuidedProjectCreate";

export default async function CreateProjectPage() {
  const categories = await getCategories();

  return <GuidedProjectCreate categories={categories} />;
}
