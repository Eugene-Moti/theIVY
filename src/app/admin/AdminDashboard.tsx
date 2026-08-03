'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Users, Home, FileText, CreditCard, Wrench, Database } from 'lucide-react'

type Counts = {
  tenants: number | null
  units: number | null
  leases: number | null
  payments: number | null
  maintenance: number | null
}

const STAT_CONFIG = [
  { key: 'tenants',     label: 'Tenants',      icon: Users,      table: 'tenants',              color: 'text-blue-400' },
  { key: 'units',       label: 'Units',         icon: Home,       table: 'units',                color: 'text-emerald-400' },
  { key: 'leases',      label: 'Leases',        icon: FileText,   table: 'leases',               color: 'text-violet-400' },
  { key: 'payments',    label: 'Payments',      icon: CreditCard, table: 'payments',             color: 'text-[#C9A84C]' },
  { key: 'maintenance', label: 'Maintenance',   icon: Wrench,     table: 'maintenance_requests', color: 'text-rose-400' },
] as const

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Counts>({ tenants: null, units: null, leases: null, payments: null, maintenance: null })
  const [dbReady, setDbReady] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const results: Counts = { tenants: null, units: null, leases: null, payments: null, maintenance: null }
      let anyTable = false

      for (const cfg of STAT_CONFIG) {
        const { count, error } = await supabase
          .from(cfg.table)
          .select('*', { count: 'exact', head: true })
        if (!error) {
          anyTable = true
          results[cfg.key] = count ?? 0
        }
      }

      setDbReady(anyTable)
      setCounts(results)
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className="max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-light text-white mb-1">Dashboard</h1>
        <p className="text-[11px] tracking-[0.2em] uppercase text-white/30">Rental Operations Overview</p>
      </div>

      {/* DB status */}
      <div className={`flex items-center gap-3 px-5 py-3.5 mb-8 border ${
        dbReady === null
          ? 'border-white/10 bg-white/3'
          : dbReady
          ? 'border-emerald-500/25 bg-emerald-500/8'
          : 'border-amber-500/25 bg-amber-500/8'
      }`}>
        <Database size={14} className={dbReady ? 'text-emerald-400' : 'text-amber-400'} />
        <span className="text-[11px] tracking-wide text-white/60">
          {dbReady === null
            ? 'Connecting to database…'
            : dbReady
            ? 'Connected to Supabase — database ready'
            : 'Connected · Tables not yet created — see setup below'}
        </span>
        {dbReady !== null && (
          <span className={`ml-auto w-2 h-2 rounded-full ${dbReady ? 'bg-emerald-400' : 'bg-amber-400'}`} />
        )}
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        {STAT_CONFIG.map(({ key, label, icon: Icon, color }) => (
          <div key={key} className="bg-white/3 border border-white/7 p-5">
            <Icon size={16} className={`${color} mb-3`} />
            <p className="text-[28px] font-light text-white leading-none mb-1">
              {loading ? '—' : (counts[key] ?? '—')}
            </p>
            <p className="text-[10px] tracking-[0.2em] uppercase text-white/35">{label}</p>
          </div>
        ))}
      </div>

      {/* Setup guide (shown when tables missing) */}
      {dbReady === false && (
        <div className="border border-white/8 bg-white/2 p-6">
          <h2 className="text-[13px] font-semibold tracking-wide text-white/80 mb-4">Database Setup Required</h2>
          <p className="text-[12px] text-white/50 mb-4 leading-relaxed">
            Run the following SQL in your Supabase SQL editor to create the rental management tables:
          </p>
          <pre className="bg-black/40 text-[11px] text-emerald-300/80 p-4 overflow-x-auto leading-relaxed">
{`-- Tenants
create table if not exists tenants (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text,
  phone text,
  national_id text,
  created_at timestamptz default now()
);

-- Units
create table if not exists units (
  id uuid primary key default gen_random_uuid(),
  property text not null,
  unit_number text not null,
  type text,
  floor int,
  status text default 'vacant',
  monthly_rent numeric,
  created_at timestamptz default now()
);

-- Leases
create table if not exists leases (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references tenants(id),
  unit_id uuid references units(id),
  start_date date not null,
  end_date date,
  monthly_rent numeric not null,
  status text default 'active',
  created_at timestamptz default now()
);

-- Payments
create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  lease_id uuid references leases(id),
  tenant_id uuid references tenants(id),
  amount numeric not null,
  paid_on date,
  for_month date,
  method text,
  notes text,
  created_at timestamptz default now()
);

-- Maintenance requests
create table if not exists maintenance_requests (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid references units(id),
  tenant_id uuid references tenants(id),
  title text not null,
  description text,
  priority text default 'normal',
  status text default 'open',
  created_at timestamptz default now()
);`}
          </pre>
        </div>
      )}
    </div>
  )
}
