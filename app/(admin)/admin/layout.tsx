import { redirect } from 'next/navigation'
import { createClient } from '@/lib/database/server'
import AdminLayoutClient from '@/components/admin/AdminLayoutClient'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  
  // Protect all /admin routes
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) {
    redirect('/login')
  }

  // Verify admin profile role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!profile || profile.role !== 'admin') {
    redirect('/')
  }

  return <AdminLayoutClient>{children}</AdminLayoutClient>
}
