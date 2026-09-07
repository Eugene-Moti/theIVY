'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { PhoneCall, Download, Mail, RefreshCw, Filter } from 'lucide-react'

type LeadMeta = {
  budget?: string
  buyer_type?: string
  timeline?: string
  message?: string
  country_code?: string
  source?: string
}

type Lead = {
  id: string
  name: string | null
  phone: string | null
  email: string | null
  property_interest: string | null
  lead_type: string | null
  created_at: string
  meta: LeadMeta | null
}

const isAgent = (v?: string) => !!v && /agent|broker/i.test(v)

const TYPE_LABELS: Record<string, { label: string; color: string }> = {
  'chat-callback':   { label: 'Callback',   color: 'rgba(251,191,36,0.15)'  },
  'chat-brochure':   { label: 'Brochure',   color: 'rgba(99,202,183,0.12)'  },
  'brochure-download': { label: 'Brochure', color: 'rgba(99,202,183,0.12)'  },
  'contact-form':    { label: 'Contact',    color: 'rgba(167,139,250,0.12)' },
  'rental-waitlist': { label: 'Waitlist',   color: 'rgba(248,113,113,0.12)' },
}

function TypeBadge({ type }: { type: string | null }) {
  const t = TYPE_LABELS[type ?? ''] ?? { label: type ?? '—', color: 'rgba(255,255,255,0.06)' }
  return (
    <span
      className="inline-block px-2 py-0.5 text-[10px] font-sans font-medium tracking-wide uppercase"
      style={{ background: t.color, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.1em' }}
    >
      {t.label}
    </span>
  )
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' }) +
    ' · ' + d.toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit' })
}

export default function LeadsManager() {
  const [leads, setLeads]     = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter]   = useState<string>('all')

  const fetchLeads = useCallback(async () => {
    setLoading(true)
    const supabase = createClient()
    const { data } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
    setLeads(data ?? [])
    setLoading(false)
  }, [])

  useEffect(() => { fetchLeads() }, [fetchLeads])

  const filtered = filter === 'all' ? leads : leads.filter(l => l.lead_type === filter)

  const FILTERS = [
    { key: 'all',              label: 'All' },
    { key: 'chat-callback',    label: 'Callbacks' },
    { key: 'chat-brochure',    label: 'Brochures' },
    { key: 'brochure-download',label: 'Brochures (site)' },
    { key: 'contact-form',     label: 'Contact Forms' },
  ]

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[9px] tracking-[0.35em] uppercase text-[#C9A84C] mb-1">Admin</p>
          <h1 className="text-2xl font-light text-white/85">Leads</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-white/25">{filtered.length} lead{filtered.length !== 1 ? 's' : ''}</span>
          <button
            onClick={fetchLeads}
            className="flex items-center gap-1.5 px-3 py-2 text-[11px] text-white/40 hover:text-white/70 border border-white/8 hover:border-white/15 transition-all"
          >
            <RefreshCw size={11} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        <Filter size={11} className="text-white/20 flex-shrink-0 mr-1" />
        {FILTERS.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className="flex-shrink-0 px-3 py-1.5 text-[10.5px] tracking-wide transition-all"
            style={filter === f.key
              ? { background: 'rgba(201,168,76,0.1)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)' }
              : { background: 'transparent', color: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.07)' }
            }
          >
            {f.label}
            <span className="ml-1.5 opacity-50">
              {f.key === 'all' ? leads.length : leads.filter(l => l.lead_type === f.key).length}
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center h-48 text-white/20 text-[12px]">Loading leads…</div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 gap-2 text-white/20">
          <p className="text-[12px]">No leads yet</p>
          <p className="text-[10px]">Leads from the chat widget and site forms will appear here.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['Name', 'Phone', 'Email', 'Interest', 'Budget', 'Timeframe', 'Type', 'Date'].map(h => (
                  <th
                    key={h}
                    className="text-left pb-3 pr-4 text-[9px] tracking-[0.2em] uppercase text-white/20 font-normal"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(lead => (
                <tr
                  key={lead.id}
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                  className="group hover:bg-white/[0.02] transition-colors"
                >
                  <td className="py-4 pr-4 text-[12px] text-white/75 font-light">
                    {lead.name || <span className="text-white/20">—</span>}
                  </td>
                  <td className="py-4 pr-4">
                    {lead.phone
                      ? <a href={`tel:${lead.phone}`} className="flex items-center gap-1.5 text-[12px] text-[#C9A84C]/70 hover:text-[#C9A84C] transition-colors">
                          <PhoneCall size={10} />{lead.phone}
                        </a>
                      : <span className="text-white/20 text-[12px]">—</span>
                    }
                  </td>
                  <td className="py-4 pr-4">
                    {lead.email
                      ? <a href={`mailto:${lead.email}`} className="flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70 transition-colors">
                          <Mail size={10} />{lead.email}
                        </a>
                      : <span className="text-white/20 text-[12px]">—</span>
                    }
                  </td>
                  <td className="py-4 pr-4 text-[12px] text-white/50 font-light">
                    {lead.property_interest || <span className="text-white/20">—</span>}
                  </td>
                  <td className="py-4 pr-4 text-[12px] text-white/50 font-light whitespace-nowrap">
                    {lead.meta?.budget || <span className="text-white/20">—</span>}
                  </td>
                  <td className="py-4 pr-4 text-[12px] text-white/50 font-light whitespace-nowrap">
                    {lead.meta?.timeline || <span className="text-white/20">—</span>}
                  </td>
                  <td className="py-4 pr-4 whitespace-nowrap">
                    <TypeBadge type={lead.lead_type} />
                    {isAgent(lead.meta?.buyer_type) && (
                      <span
                        className="ml-1.5 inline-block px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase"
                        style={{ background: 'rgba(220,38,38,0.16)', color: '#f87171', letterSpacing: '0.1em' }}
                      >
                        Agent
                      </span>
                    )}
                  </td>
                  <td className="py-4 text-[11px] text-white/25 whitespace-nowrap">
                    {formatDate(lead.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
