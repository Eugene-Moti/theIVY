'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Pencil, Trash2, X, Loader2, CheckCircle, Clock, XCircle, Image as ImgIcon } from 'lucide-react'

type Listing = {
  id: string
  property: string
  unit_type: string
  floor: string
  size_sqm: number | null
  price_per_month: number | null
  status: 'available' | 'coming_soon' | 'occupied'
  description: string
  amenities: string[]
  images: string[]
  featured_image: string
  available_from: string | null
  created_at: string
}

const EMPTY: Omit<Listing, 'id' | 'created_at'> = {
  property: 'Ivy Myst',
  unit_type: '1 Bedroom',
  floor: '',
  size_sqm: null,
  price_per_month: null,
  status: 'coming_soon',
  description: '',
  amenities: [],
  images: [],
  featured_image: '',
  available_from: null,
}

const PROPERTIES  = ['Ivy Myst', 'Blossom Ivy', 'Luckinn Ivy', 'Ivy Park', 'Other']
const UNIT_TYPES  = ['Studio', '1 Bedroom', '2 Bedroom', '3 Bedroom', '3 Bedroom + DSQ', 'Penthouse']
const STATUS_OPTS = [
  { value: 'available',   label: 'Available',    icon: CheckCircle, color: 'text-emerald-400' },
  { value: 'coming_soon', label: 'Coming Soon',  icon: Clock,       color: 'text-[#C9A84C]' },
  { value: 'occupied',    label: 'Occupied',     icon: XCircle,     color: 'text-white/30' },
]

export default function ListingsManager() {
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading]   = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editing, setEditing]   = useState<Partial<Listing>>(EMPTY)
  const [isNew, setIsNew]       = useState(true)
  const [saving, setSaving]     = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [amenityInput, setAmenityInput] = useState('')
  const [imageInput, setImageInput]     = useState('')

  const supabase = createClient()

  const load = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase.from('rental_listings').select('*').order('created_at', { ascending: false })
    setListings(data ?? [])
    setLoading(false)
  }, [supabase])

  useEffect(() => { load() }, [load])

  function openNew() {
    setEditing(EMPTY)
    setIsNew(true)
    setAmenityInput('')
    setImageInput('')
    setDrawerOpen(true)
  }

  function openEdit(l: Listing) {
    setEditing({ ...l })
    setIsNew(false)
    setAmenityInput('')
    setImageInput('')
    setDrawerOpen(true)
  }

  async function save() {
    setSaving(true)
    const payload = {
      property:        editing.property,
      unit_type:       editing.unit_type,
      floor:           editing.floor || null,
      size_sqm:        editing.size_sqm || null,
      price_per_month: editing.price_per_month || null,
      status:          editing.status,
      description:     editing.description || null,
      amenities:       editing.amenities ?? [],
      images:          editing.images ?? [],
      featured_image:  editing.featured_image || null,
      available_from:  editing.available_from || null,
      updated_at:      new Date().toISOString(),
    }
    if (isNew) {
      await supabase.from('rental_listings').insert(payload)
    } else {
      await supabase.from('rental_listings').update(payload).eq('id', editing.id!)
    }
    setSaving(false)
    setDrawerOpen(false)
    load()
  }

  async function confirmDelete() {
    if (!deleteId) return
    await supabase.from('rental_listings').delete().eq('id', deleteId)
    setDeleteId(null)
    load()
  }

  function addAmenity() {
    const val = amenityInput.trim()
    if (!val) return
    setEditing(e => ({ ...e, amenities: [...(e.amenities ?? []), val] }))
    setAmenityInput('')
  }

  function removeAmenity(i: number) {
    setEditing(e => ({ ...e, amenities: (e.amenities ?? []).filter((_, idx) => idx !== i) }))
  }

  function addImage() {
    const val = imageInput.trim()
    if (!val) return
    setEditing(e => ({
      ...e,
      images: [...(e.images ?? []), val],
      featured_image: e.featured_image || val,
    }))
    setImageInput('')
  }

  function removeImage(i: number) {
    setEditing(e => {
      const imgs = (e.images ?? []).filter((_, idx) => idx !== i)
      return { ...e, images: imgs, featured_image: imgs[0] ?? '' }
    })
  }

  const statusFor = (s: string) => STATUS_OPTS.find(o => o.value === s) ?? STATUS_OPTS[1]

  return (
    <div className="max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif font-light text-white mb-1">Rental Listings</h1>
          <p className="text-[11px] tracking-[0.2em] uppercase text-white/25">Manage units for the rent page</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 bg-[#C9A84C] text-[#0f0f0f] px-4 py-2.5 text-[11px] font-semibold tracking-[0.15em] uppercase hover:bg-[#d4b565] transition-colors"
        >
          <Plus size={13} /> Add Listing
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center gap-2 text-white/30 text-sm py-10">
          <Loader2 size={16} className="animate-spin" /> Loading…
        </div>
      ) : listings.length === 0 ? (
        <div className="border border-white/7 bg-white/2 py-16 text-center">
          <p className="text-white/30 text-sm mb-4">No listings yet.</p>
          <button onClick={openNew} className="text-[#C9A84C] text-[11px] tracking-widest uppercase hover:underline">
            Add your first listing
          </button>
        </div>
      ) : (
        <div className="border border-white/7 overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-white/7">
                {['Property', 'Type', 'Floor', 'Size', 'Price / mo', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left text-[9px] tracking-[0.2em] uppercase text-white/25 px-4 py-3 font-normal">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {listings.map(l => {
                const s = statusFor(l.status)
                return (
                  <tr key={l.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    <td className="px-4 py-3 text-white/80">{l.property}</td>
                    <td className="px-4 py-3 text-white/60">{l.unit_type}</td>
                    <td className="px-4 py-3 text-white/40">{l.floor || '—'}</td>
                    <td className="px-4 py-3 text-white/40">{l.size_sqm ? `${l.size_sqm} m²` : '—'}</td>
                    <td className="px-4 py-3 text-white/60">
                      {l.price_per_month ? `KES ${l.price_per_month.toLocaleString()}` : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`flex items-center gap-1.5 ${s.color}`}>
                        <s.icon size={11} /> {s.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <button onClick={() => openEdit(l)} className="text-white/30 hover:text-white transition-colors">
                          <Pencil size={13} />
                        </button>
                        <button onClick={() => setDeleteId(l.id)} className="text-white/30 hover:text-red-400 transition-colors">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Slide-over drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/50" onClick={() => setDrawerOpen(false)} />
          <div className="w-full max-w-lg bg-[#0f0f0f] border-l border-white/8 overflow-y-auto flex flex-col">
            {/* Drawer header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/8 flex-shrink-0">
              <h2 className="text-[13px] font-semibold text-white tracking-wide">
                {isNew ? 'New Listing' : 'Edit Listing'}
              </h2>
              <button onClick={() => setDrawerOpen(false)} className="text-white/30 hover:text-white">
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <div className="flex-1 px-6 py-6 space-y-5">
              {/* Property + Type */}
              <div className="grid grid-cols-2 gap-4">
                <Field label="Property">
                  <select value={editing.property} onChange={e => setEditing(p => ({ ...p, property: e.target.value }))} className={selectCls}>
                    {PROPERTIES.map(p => <option key={p}>{p}</option>)}
                  </select>
                </Field>
                <Field label="Unit Type">
                  <select value={editing.unit_type} onChange={e => setEditing(p => ({ ...p, unit_type: e.target.value }))} className={selectCls}>
                    {UNIT_TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </Field>
              </div>

              {/* Floor + Size + Price */}
              <div className="grid grid-cols-3 gap-4">
                <Field label="Floor">
                  <input value={editing.floor ?? ''} onChange={e => setEditing(p => ({ ...p, floor: e.target.value }))} placeholder="e.g. 4" className={inputCls} />
                </Field>
                <Field label="Size (m²)">
                  <input type="number" value={editing.size_sqm ?? ''} onChange={e => setEditing(p => ({ ...p, size_sqm: +e.target.value || null }))} placeholder="78" className={inputCls} />
                </Field>
                <Field label="Price / mo (KES)">
                  <input type="number" value={editing.price_per_month ?? ''} onChange={e => setEditing(p => ({ ...p, price_per_month: +e.target.value || null }))} placeholder="120000" className={inputCls} />
                </Field>
              </div>

              {/* Status + Available from */}
              <div className="grid grid-cols-2 gap-4">
                <Field label="Status">
                  <select value={editing.status} onChange={e => setEditing(p => ({ ...p, status: e.target.value as Listing['status'] }))} className={selectCls}>
                    {STATUS_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </Field>
                <Field label="Available From">
                  <input type="date" value={editing.available_from ?? ''} onChange={e => setEditing(p => ({ ...p, available_from: e.target.value || null }))} className={inputCls} />
                </Field>
              </div>

              {/* Description */}
              <Field label="Description">
                <textarea
                  value={editing.description ?? ''}
                  onChange={e => setEditing(p => ({ ...p, description: e.target.value }))}
                  rows={3}
                  placeholder="Brief description of this unit…"
                  className={`${inputCls} resize-none`}
                />
              </Field>

              {/* Amenities */}
              <Field label="Amenities">
                <div className="flex gap-2 mb-2">
                  <input
                    value={amenityInput}
                    onChange={e => setAmenityInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addAmenity() } }}
                    placeholder="e.g. Parking, Pool…"
                    className={`${inputCls} flex-1`}
                  />
                  <button onClick={addAmenity} className="px-3 bg-white/8 text-white/60 hover:bg-white/12 text-xs transition-colors">
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(editing.amenities ?? []).map((a, i) => (
                    <span key={i} className="flex items-center gap-1.5 bg-white/8 text-white/60 text-[10px] px-2.5 py-1 tracking-wide">
                      {a}
                      <button onClick={() => removeAmenity(i)} className="text-white/30 hover:text-red-400"><X size={10} /></button>
                    </span>
                  ))}
                </div>
              </Field>

              {/* Images */}
              <Field label="Images (URLs)">
                <div className="flex gap-2 mb-2">
                  <input
                    value={imageInput}
                    onChange={e => setImageInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addImage() } }}
                    placeholder="https://… or Supabase Storage URL"
                    className={`${inputCls} flex-1`}
                  />
                  <button onClick={addImage} className="px-3 bg-white/8 text-white/60 hover:bg-white/12 text-xs transition-colors">
                    Add
                  </button>
                </div>
                <div className="space-y-1.5">
                  {(editing.images ?? []).map((url, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white/5 px-3 py-2">
                      <ImgIcon size={11} className="text-white/25 flex-shrink-0" />
                      <span className="text-[10px] text-white/40 truncate flex-1">{url}</span>
                      {i === 0 && <span className="text-[9px] text-[#C9A84C] tracking-wider">Featured</span>}
                      <button onClick={() => removeImage(i)} className="text-white/20 hover:text-red-400"><X size={10} /></button>
                    </div>
                  ))}
                </div>
              </Field>
            </div>

            {/* Save */}
            <div className="px-6 py-5 border-t border-white/8 flex-shrink-0">
              <button
                onClick={save}
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 bg-[#C9A84C] text-[#0f0f0f] py-3 text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-[#d4b565] transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 size={13} className="animate-spin" /> : null}
                {saving ? 'Saving…' : isNew ? 'Create Listing' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-[#0f0f0f] border border-white/10 p-6 max-w-sm w-full mx-4">
            <p className="text-white text-[13px] mb-2">Delete this listing?</p>
            <p className="text-white/40 text-[11px] mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 border border-white/10 text-white/50 text-[11px] hover:border-white/20 transition-colors">
                Cancel
              </button>
              <button onClick={confirmDelete} className="flex-1 py-2.5 bg-red-500/80 text-white text-[11px] hover:bg-red-500 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[9px] tracking-[0.22em] uppercase text-white/35 mb-1.5">{label}</label>
      {children}
    </div>
  )
}

const inputCls  = 'w-full bg-white/5 border border-white/10 text-white text-[12px] px-3 py-2.5 focus:outline-none focus:border-[#C9A84C]/50 transition-colors placeholder:text-white/20'
const selectCls = 'w-full bg-white/5 border border-white/10 text-white text-[12px] px-3 py-2.5 focus:outline-none focus:border-[#C9A84C]/50 transition-colors'
