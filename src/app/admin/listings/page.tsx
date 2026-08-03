import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AdminShell from '../AdminShell'
import ListingsManager from './ListingsManager'

export default async function ListingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')
  return (
    <AdminShell adminEmail={user.email ?? ''}>
      <ListingsManager />
    </AdminShell>
  )
}
