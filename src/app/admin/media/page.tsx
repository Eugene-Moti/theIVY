import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AdminShell from '../AdminShell'
import MediaManager from './MediaManager'

export default async function MediaPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')
  return (
    <AdminShell adminEmail={user.email ?? ''}>
      <MediaManager />
    </AdminShell>
  )
}
