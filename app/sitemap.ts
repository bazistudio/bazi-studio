import { MetadataRoute } from 'next'
import { createClient } from '@/lib/database/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bazistudio.com'
  
  const supabase = await createClient()

  // Fetch published projects
  const { data: projects } = await supabase
    .from('projects')
    .select('slug, updated_at')
    .eq('status', 'published')

  const projectUrls = (projects || []).map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...projectUrls,
  ]
}
