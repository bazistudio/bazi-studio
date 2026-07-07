import { createClient } from "@/lib/database/server";
import Hero from "@/components/portfolio/Hero";
import FeaturedProjects from "@/components/portfolio/FeaturedProjects";
import TechStack from "@/components/portfolio/TechStack";
import JourneyTimeline from "@/components/portfolio/JourneyTimeline";
import AboutSection from "@/components/portfolio/AboutSection";
import ContactSection from "@/components/portfolio/ContactSection";

export const revalidate = 60; // Revalidate every 60s

export default async function Home() {
  const supabase = await createClient();

  const { data: featuredProjects } = await supabase
    .from('projects')
    .select(`
      *,
      project_media(*),
      categories(*),
      project_technologies(
        technologies(*)
      )
    `)
    .eq("status", "published")
    .eq("featured", true)
    .order("display_order", { ascending: true });

  const { data: technologies } = await supabase
    .from('technologies')
    .select('*')
    .order('name');

  const { data: recentLogs } = await supabase
    .from('build_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(4);

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <FeaturedProjects projects={featuredProjects || []} />
      <TechStack technologies={technologies || []} />
      <JourneyTimeline logs={recentLogs || []} />
      <AboutSection />
      <ContactSection />
    </div>
  );
}
