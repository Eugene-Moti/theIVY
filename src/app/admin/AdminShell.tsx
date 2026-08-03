'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { LayoutDashboard, BedDouble, LogOut, Menu, ChevronRight } from 'lucide-react'

const NAV = [
  { href: '/admin',          label: 'Dashboard',        icon: LayoutDashboard },
  { href: '/admin/listings', label: 'Rental Listings',  icon: BedDouble },
]

export default function AdminShell({
  children,
  adminEmail,
}: {
  children: React.ReactNode
  adminEmail: string
}) {
  const router   = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const Sidebar = () => (
    <aside className="flex flex-col h-full w-60 bg-[#080808] border-r border-white/6">
      <div className="px-6 py-7 border-b border-white/6">
        <p className="text-[8px] tracking-[0.38em] uppercase text-[#C9A84C] mb-1">The Ivy Group</p>
        <p className="text-[13px] font-light text-white/60">Admin Portal</p>
      </div>

      <nav className="flex-1 py-4">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/admin' && pathname.startsWith(href))
          return (
            <button
              key={href}
              onClick={() => { router.push(href); setOpen(false) }}
              className={`w-full flex items-center gap-3 px-6 py-3 text-[12px] tracking-wide transition-colors text-left group ${
                active
                  ? 'text-[#C9A84C] bg-[#C9A84C]/8'
                  : 'text-white/40 hover:text-white/75 hover:bg-white/4'
              }`}
            >
              <Icon size={14} className={active ? 'text-[#C9A84C]' : 'text-white/25 group-hover:text-white/50'} />
              {label}
              {active && <ChevronRight size={11} className="ml-auto text-[#C9A84C]/50" />}
            </button>
          )
        })}
      </nav>

      <div className="px-6 py-5 border-t border-white/6">
        <p className="text-[10px] text-white/20 truncate mb-3">{adminEmail}</p>
        <button
          onClick={signOut}
          className="flex items-center gap-2 text-[11px] text-white/30 hover:text-red-400 transition-colors"
        >
          <LogOut size={12} /> Sign out
        </button>
      </div>
    </aside>
  )

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden lg:flex flex-col flex-shrink-0"><Sidebar /></div>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 h-full z-50"><Sidebar /></div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="lg:hidden flex items-center justify-between px-4 py-4 border-b border-white/6 bg-[#080808]">
          <button onClick={() => setOpen(true)} className="text-white/40 hover:text-white">
            <Menu size={18} />
          </button>
          <p className="text-[9px] tracking-[0.35em] uppercase text-[#C9A84C]">The Ivy Group</p>
          <div className="w-5" />
        </div>
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">{children}</main>
      </div>
    </div>
  )
}
