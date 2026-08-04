import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AdminShell from '../AdminShell'
import LeadsManager from './LeadsManager'

export default async function LeadsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')
  return (
    <AdminShell adminEmail={user.email ?? ''}>
      <LeadsManager />
    </AdminShell>
  )
}
