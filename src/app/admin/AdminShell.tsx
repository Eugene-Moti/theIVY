'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  LayoutDashboard, Users, Home, FileText, CreditCard,
  Wrench, LogOut, Menu, X, ChevronRight,
} from 'lucide-react'

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/tenants', label: 'Tenants', icon: Users },
  { href: '/admin/units', label: 'Units', icon: Home },
  { href: '/admin/leases', label: 'Leases', icon: FileText },
  { href: '/admin/payments', label: 'Payments', icon: CreditCard },
  { href: '/admin/maintenance', label: 'Maintenance', icon: Wrench },
]

export default function AdminShell({
  children,
  adminEmail,
}: {
  children: React.ReactNode
  adminEmail: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const Sidebar = () => (
    <aside className="flex flex-col h-full w-64 bg-[#0a0a0a] border-r border-white/6">
      {/* Brand */}
      <div className="px-6 py-6 border-b border-white/6">
        <p className="text-[8px] tracking-[0.35em] uppercase text-[#C9A84C] mb-1">The Ivy Group</p>
        <p className="text-[13px] font-light text-white/70">Admin Portal</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/admin' && pathname.startsWith(href))
          return (
            <button
              key={href}
              onClick={() => { router.push(href); setSidebarOpen(false) }}
              className={`w-full flex items-center gap-3 px-6 py-3 text-[12px] tracking-[0.1em] transition-colors text-left group ${
                active
                  ? 'text-[#C9A84C] bg-[#C9A84C]/8'
                  : 'text-white/45 hover:text-white/80 hover:bg-white/4'
              }`}
            >
              <Icon size={15} className={active ? 'text-[#C9A84C]' : 'text-white/30 group-hover:text-white/60'} />
              {label}
              {active && <ChevronRight size={12} className="ml-auto text-[#C9A84C]/60" />}
            </button>
          )
        })}
      </nav>

      {/* Footer / sign out */}
      <div className="px-6 py-4 border-t border-white/6">
        <p className="text-[10px] text-white/25 truncate mb-3">{adminEmail}</p>
        <button
          onClick={signOut}
          className="flex items-center gap-2 text-[11px] text-white/35 hover:text-red-400 transition-colors tracking-wide"
        >
          <LogOut size={13} />
          Sign out
        </button>
      </div>
    </aside>
  )

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-col flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 h-full z-50">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile topbar */}
        <div className="lg:hidden flex items-center justify-between px-4 py-4 border-b border-white/6 bg-[#0a0a0a]">
          <button onClick={() => setSidebarOpen(true)} className="text-white/50 hover:text-white">
            <Menu size={20} />
          </button>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A84C]">The Ivy Group</p>
          <div className="w-5" />
        </div>

        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
