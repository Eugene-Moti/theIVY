'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { BedDouble, CheckCircle, Clock, XCircle, Plus, ImagePlay } from 'lucide-react'

type Stats = { available: number; coming_soon: number; occupied: number; total: number }

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState<Stats | null>(null)
  const [dbReady, setDbReady] = useState<boolean | null>(null)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('rental_listings')
        .select('status')

      if (error) { setDbReady(false); return }
      setDbReady(true)

      const rows = data ?? []
      setStats({
        total:       rows.length,
        available:   rows.filter(r => r.status === 'available').length,
        coming_soon: rows.filter(r => r.status === 'coming_soon').length,
        occupied:    rows.filter(r => r.status === 'occupied').length,
      })
    }
    load()
  }, [])

  return (
    <div className="max-w-4xl">
      <div className="mb-10">
        <h1 className="text-2xl font-serif font-light text-white mb-1">Dashboard</h1>
        <p className="text-[11px] tracking-[0.2em] uppercase text-white/25">Rental Operations</p>
      </div>

      {/* DB not ready */}
      {dbReady === false && (
        <div className="border border-amber-500/25 bg-amber-500/6 px-5 py-4 mb-8">
          <p className="text-[11px] text-amber-300/80 mb-3">
            The <code className="text-amber-200">rental_listings</code> table doesn't exist yet. Run this SQL in your Supabase SQL editor:
          </p>
          <pre className="bg-black/40 text-[10px] text-emerald-300/80 p-4 overflow-x-auto leading-relaxed whitespace-pre-wrap">{SQL_SETUP}</pre>
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Total Listings', value: stats?.total,       icon: BedDouble,     color: 'text-white' },
          { label: 'Available',      value: stats?.available,   icon: CheckCircle,   color: 'text-emerald-400' },
          { label: 'Coming Soon',    value: stats?.coming_soon, icon: Clock,         color: 'text-[#C9A84C]' },
          { label: 'Occupied',       value: stats?.occupied,    icon: XCircle,       color: 'text-white/30' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white/3 border border-white/7 p-5">
            <Icon size={15} className={`${color} mb-3`} />
            <p className="text-3xl font-light text-white leading-none mb-1">
              {value ?? '—'}
            </p>
            <p className="text-[10px] tracking-[0.18em] uppercase text-white/30">{label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => router.push('/admin/listings')}
          className="flex items-center gap-4 bg-white/3 border border-white/7 hover:border-[#C9A84C]/30 hover:bg-[#C9A84C]/5 p-5 transition-colors text-left group"
        >
          <Plus size={18} className="text-[#C9A84C]" />
          <div>
            <p className="text-[12px] font-medium text-white/80 mb-0.5">Manage Listings</p>
            <p className="text-[10px] text-white/30">Add or edit rental units</p>
          </div>
        </button>
        <button
          onClick={() => router.push('/admin/media')}
          className="flex items-center gap-4 bg-white/3 border border-white/7 hover:border-[#C9A84C]/30 hover:bg-[#C9A84C]/5 p-5 transition-colors text-left group"
        >
          <ImagePlay size={18} className="text-[#C9A84C]" />
          <div>
            <p className="text-[12px] font-medium text-white/80 mb-0.5">Media Manager</p>
            <p className="text-[10px] text-white/30">Update website images & videos</p>
          </div>
        </button>
      </div>
    </div>
  )
}

const SQL_SETUP = `create table if not exists rental_listings (
  id               uuid primary key default gen_random_uuid(),
  property         text not null,
  unit_type        text not null,
  floor            text,
  size_sqm         numeric,
  price_per_month  numeric,
  status           text default 'coming_soon',
  description      text,
  amenities        text[] default '{}',
  images           text[] default '{}',
  featured_image   text,
  available_from   date,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

create table if not exists site_media (
  id          uuid primary key default gen_random_uuid(),
  slot        text unique not null,
  label       text,
  url         text,
  media_type  text default 'image',
  updated_at  timestamptz default now()
);`
