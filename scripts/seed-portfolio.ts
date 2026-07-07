import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import { resolve } from "path";

// Load .env.local
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase credentials in .env.local (Need SUPABASE_SERVICE_ROLE_KEY)");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seed() {
  console.log("🚀 Initializing BaziStudio Portfolio Seed Sequence...");

  // 1. Seed Categories
  console.log("Seeding Categories...");
  const categories = [
    { name: "SaaS / Business Management", slug: "saas-business" },
    { name: "Developer Platform", slug: "developer-platform" },
    { name: "Artificial Intelligence", slug: "artificial-intelligence" }
  ];
  
  const { data: catData, error: catError } = await supabase.from('categories').upsert(categories, { onConflict: 'slug' }).select();
  if (catError) throw catError;
  const saasCatId = catData.find(c => c.slug === "saas-business")?.id;
  const devCatId = catData.find(c => c.slug === "developer-platform")?.id;
  const aiCatId = catData.find(c => c.slug === "artificial-intelligence")?.id;

  // 2. Seed Projects
  console.log("Seeding Projects...");
  
  const projects = [
    {
      title: "TijaratPro",
      slug: "tijarat-pro",
      category_id: saasCatId,
      status: "published",
      featured: true,
      display_order: 1,
      short_description: "A comprehensive SaaS platform replacing manual inventory tracking spreadsheets.",
      full_description: "TijaratPro was built to solve the inventory tracking bottleneck for mid-sized retail businesses. The system connects a web-based management dashboard with a desktop point-of-sale interface.",
      role: "Lead Full Stack Engineer",
      team_size: "Solo Developer",
      is_personal_project: true,
      impact_summary: "Reduced manual inventory tracking time by 80% through centralized SaaS synchronization.",
      featured_reason: "Demonstrates complex state management and cross-platform architecture."
    },
    {
      title: "BaziStudio Portfolio Engine",
      slug: "bazi-studio-cms",
      category_id: devCatId,
      status: "published",
      featured: true,
      display_order: 2,
      short_description: "A headless CMS developer identity platform built entirely from scratch.",
      full_description: "Instead of using a standard website builder, BaziStudio was engineered as a custom headless CMS on top of Next.js and Supabase. It acts as a living laboratory for testing new frontend frameworks and database architectures.",
      role: "Architect & Developer",
      team_size: "Solo Developer",
      is_personal_project: true,
      impact_summary: "Achieved 100/100 Lighthouse performance score while delivering dynamic server-rendered case studies.",
      featured_reason: "Showcases deep understanding of Next.js App Router and PostgreSQL relational modeling."
    },
    {
      title: "Future AI System",
      slug: "future-ai-lab",
      category_id: aiCatId,
      status: "draft",
      featured: true,
      display_order: 3,
      short_description: "An experimental laboratory for large language model integrations.",
      full_description: "Currently in the research and development phase. This system will integrate the Vercel AI SDK to provide interactive, context-aware assistance directly within the portfolio environment.",
      role: "AI Engineer",
      team_size: "Solo Researcher",
      is_personal_project: true,
      impact_summary: "Proof of concept for autonomous agent interactions.",
      featured_reason: "Highlights forward-thinking research in generative AI."
    }
  ];

  const { data: projData, error: projError } = await supabase.from('projects').upsert(projects, { onConflict: 'slug' }).select();
  if (projError) throw projError;

  const tijaratProId = projData.find(p => p.slug === "tijarat-pro")?.id;
  const baziStudioId = projData.find(p => p.slug === "bazi-studio-cms")?.id;

  // 3. Seed Sections for BaziStudio
  console.log("Seeding CMS Blocks for BaziStudio...");
  const baziSections = [
    {
      project_id: baziStudioId,
      type: "text",
      title: "Why Build a Custom CMS?",
      content: "A standard static site generator wasn't enough. I needed a platform that could dynamically render developer journeys, case studies, and code showcases directly from a database without touching the codebase.",
      order_index: 1
    },
    {
      project_id: baziStudioId,
      type: "architecture",
      title: "Next.js + Supabase Integration",
      content: "The system utilizes the Next.js App Router with React Server Components. By leveraging Supabase's PostgreSQL database and RPC edge functions, the entire platform renders fully typed, cached, and secure pages in under 50ms.",
      order_index: 2
    },
    {
      project_id: baziStudioId,
      type: "code_showcase",
      title: "Dynamic Section Renderer",
      content: "export default function SectionRenderer({ sections }: { sections: any[] }) {\n  return (\n    <section className=\"space-y-12\">\n      {sections.map((section) => {\n        switch (section.type) {\n          case 'text':\n            return <TextBlock key={section.id} content={section.content} />;\n          case 'code_showcase':\n            return <CodeShowcase key={section.id} content={section.content} />;\n          // Extensible architecture\n        }\n      })}\n    </section>\n  )\n}",
      order_index: 3
    },
    {
      project_id: baziStudioId,
      type: "quote",
      title: "BaziStudio Architecture Principle",
      content: "Design with empathy. Code with precision. Deploy with confidence.",
      order_index: 4
    }
  ];

  const { error: secError } = await supabase.from('project_sections').upsert(baziSections, { onConflict: 'id' });
  if (secError) console.log("Note: Error inserting sections (might not have unique constraint). Skipping...", secError.message);

  console.log("✅ Seed completed successfully!");
}

seed().catch(console.error);
