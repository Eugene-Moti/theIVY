'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Upload, Link, X, Loader2, CheckCircle, Film, Image as ImgIcon } from 'lucide-react'

type SlotDef = {
  slot: string
  label: string
  page: string
  description: string
  accepts: 'image' | 'video' | 'both'
}

type SlotRow = {
  slot: string
  url: string | null
  media_type: string
  updated_at: string
}

const SLOTS: SlotDef[] = [
  { slot: 'home_hero',         label: 'Homepage Hero',            page: 'Home',        description: 'Full-screen background on the homepage',                    accepts: 'both'  },
  { slot: 'ivy_myst_hero',     label: 'Ivy Myst — Hero',          page: 'Ivy Myst',    description: 'Hero background on the Ivy Myst project page',               accepts: 'both'  },
  { slot: 'blossom_ivy_hero',  label: 'Blossom Ivy — Hero',       page: 'Blossom Ivy', description: 'Hero background on the Blossom Ivy project page',            accepts: 'both'  },
  { slot: 'luckinn_ivy_hero',  label: 'Luckinn Ivy — Hero',       page: 'Luckinn Ivy', description: 'Hero background on the Luckinn Ivy project page',           accepts: 'both'  },
  { slot: 'ivy_park_hero',     label: 'Ivy Park — Hero',          page: 'Ivy Park',    description: 'Hero background on the Ivy Park project page',               accepts: 'both'  },
  { slot: 'rent_hero',         label: 'Rent Page — Hero',         page: 'Rent',        description: 'Background image on the rentals page',                       accepts: 'image' },
  { slot: 'about_feature',     label: 'About — Feature Image',    page: 'About',       description: 'Main editorial image on the About page',                     accepts: 'image' },
  { slot: 'home_about_img',    label: 'Homepage — About Image',   page: 'Home',        description: 'Image in the About section on the homepage',                 accepts: 'image' },
  { slot: 'developments_bg',   label: 'Developments — Banner',    page: 'Developments',description: 'Background banner on the Developments listing page',         accepts: 'image' },
]

export default function MediaManager() {
  const [rows, setRows]       = useState<Record<string, SlotRow>>({})
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<SlotDef | null>(null)
  const [url, setUrl]         = useState('')
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image')
  const [saving, setSaving]   = useState(false)
  const [saved, setSaved]     = useState(false)
  const [uploading, setUploading] = useState(false)
  const supabase = createClient()

  const load = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase.from('site_media').select('*')
    const map: Record<string, SlotRow> = {}
    for (const r of data ?? []) map[r.slot] = r
    setRows(map)
    setLoading(false)
  }, [supabase])

  useEffect(() => { load() }, [load])

  function openSlot(def: SlotDef) {
    const existing = rows[def.slot]
    setEditing(def)
    setUrl(existing?.url ?? '')
    setMediaType((existing?.media_type as 'image' | 'video') ?? 'image')
    setSaved(false)
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !editing) return
    setUploading(true)
    const ext  = file.name.split('.').pop()
    const path = `media/${editing.slot}-${Date.now()}.${ext}`
    const { data, error } = await supabase.storage.from('site-media').upload(path, file, { upsert: true })
    if (error) { alert('Upload failed: ' + error.message); setUploading(false); return }
    const { data: { publicUrl } } = supabase.storage.from('site-media').getPublicUrl(data.path)
    setUrl(publicUrl)
    setMediaType(file.type.startsWith('video') ? 'video' : 'image')
    setUploading(false)
  }

  async function saveSlot() {
    if (!editing) return
    setSaving(true)
    await supabase.from('site_media').upsert({
      slot:       editing.slot,
      label:      editing.label,
      url:        url || null,
      media_type: mediaType,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'slot' })
    setSaving(false)
    setSaved(true)
    load()
  }

  async function clearSlot() {
    if (!editing) return
    await supabase.from('site_media').upsert({ slot: editing.slot, url: null, updated_at: new Date().toISOString() }, { onConflict: 'slot' })
    setUrl('')
    setSaved(false)
    load()
  }

  const pageGroups = Array.from(new Set(SLOTS.map(s => s.page)))

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-light text-white mb-1">Media Manager</h1>
        <p className="text-[11px] tracking-[0.2em] uppercase text-white/25">
          Hot-swap images &amp; videos across the website — no redeployment needed
        </p>
      </div>

      <div className="bg-white/3 border border-white/7 px-5 py-3.5 mb-8 text-[11px] text-white/40 leading-relaxed">
        Upload a file or paste a URL for any slot. The website will use it instantly once saved.
        To revert a slot back to the original static asset, click <span className="text-white/60">Clear</span>.
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-white/30 text-sm py-10">
          <Loader2 size={16} className="animate-spin" /> Loading…
        </div>
      ) : (
        <div className="space-y-8">
          {pageGroups.map(page => (
            <div key={page}>
              <p className="text-[9px] tracking-[0.3em] uppercase text-white/25 mb-3">{page}</p>
              <div className="space-y-2">
                {SLOTS.filter(s => s.page === page).map(def => {
                  const row = rows[def.slot]
                  const hasMedia = !!row?.url
                  return (
                    <div
                      key={def.slot}
                      className="flex items-center gap-4 bg-white/3 border border-white/7 hover:border-white/12 px-5 py-4 transition-colors"
                    >
                      {/* Preview thumbnail */}
                      <div className="w-14 h-10 bg-white/5 border border-white/8 flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {hasMedia && row.media_type === 'image' ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={row.url!} alt="" className="w-full h-full object-cover" />
                        ) : hasMedia && row.media_type === 'video' ? (
                          <Film size={16} className="text-[#C9A84C]" />
                        ) : (
                          <ImgIcon size={14} className="text-white/15" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] text-white/70 mb-0.5">{def.label}</p>
                        <p className="text-[10px] text-white/30 truncate">
                          {hasMedia ? row.url : def.description}
                        </p>
                      </div>

                      {hasMedia && (
                        <span className="text-[9px] text-emerald-400 tracking-wider flex-shrink-0">Active</span>
                      )}

                      <button
                        onClick={() => openSlot(def)}
                        className="flex-shrink-0 text-[10px] tracking-[0.15em] uppercase text-white/40 hover:text-[#C9A84C] border border-white/10 hover:border-[#C9A84C]/30 px-3 py-1.5 transition-colors"
                      >
                        {hasMedia ? 'Update' : 'Set'}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[#0f0f0f] border border-white/10 w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
              <div>
                <p className="text-[12px] font-semibold text-white">{editing.label}</p>
                <p className="text-[10px] text-white/30">{editing.description}</p>
              </div>
              <button onClick={() => setEditing(null)} className="text-white/30 hover:text-white">
                <X size={16} />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              {/* Media type toggle */}
              {editing.accepts === 'both' && (
                <div className="flex gap-2">
                  {(['image', 'video'] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => setMediaType(t)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] tracking-wider uppercase border transition-colors ${
                        mediaType === t
                          ? 'border-[#C9A84C]/50 text-[#C9A84C] bg-[#C9A84C]/8'
                          : 'border-white/10 text-white/30 hover:border-white/20'
                      }`}
                    >
                      {t === 'image' ? <ImgIcon size={11} /> : <Film size={11} />}
                      {t}
                    </button>
                  ))}
                </div>
              )}

              {/* URL input */}
              <div>
                <label className="block text-[9px] tracking-[0.22em] uppercase text-white/35 mb-1.5">
                  <Link size={9} className="inline mr-1" />Paste URL
                </label>
                <input
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  placeholder="https://…"
                  className="w-full bg-white/5 border border-white/10 text-white text-[12px] px-3 py-2.5 focus:outline-none focus:border-[#C9A84C]/50 transition-colors placeholder:text-white/20"
                />
              </div>

              {/* File upload */}
              <div>
                <label className="block text-[9px] tracking-[0.22em] uppercase text-white/35 mb-1.5">
                  <Upload size={9} className="inline mr-1" />Or upload a file
                </label>
                <label className="flex items-center gap-2 border border-dashed border-white/15 px-4 py-3 cursor-pointer hover:border-[#C9A84C]/30 transition-colors">
                  {uploading
                    ? <Loader2 size={13} className="animate-spin text-white/40" />
                    : <Upload size={13} className="text-white/30" />}
                  <span className="text-[11px] text-white/35">
                    {uploading ? 'Uploading…' : 'Choose image or video'}
                  </span>
                  <input type="file" accept={mediaType === 'video' ? 'video/*' : editing.accepts === 'both' ? 'image/*,video/*' : 'image/*'} onChange={handleFileUpload} className="hidden" />
                </label>
                <p className="text-[9px] text-white/20 mt-1">Uploads go to Supabase Storage bucket <code>site-media</code></p>
              </div>

              {/* Preview */}
              {url && (
                <div className="border border-white/8 overflow-hidden">
                  {mediaType === 'video'
                    ? <video src={url} className="w-full h-32 object-cover" muted />
                    // eslint-disable-next-line @next/next/no-img-element
                    : <img src={url} alt="preview" className="w-full h-32 object-cover" />
                  }
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-white/8 flex gap-3">
              {rows[editing.slot]?.url && (
                <button onClick={clearSlot} className="px-4 py-2.5 border border-white/10 text-white/40 text-[10px] tracking-wider uppercase hover:border-red-400/30 hover:text-red-400 transition-colors">
                  Clear
                </button>
              )}
              <button
                onClick={saveSlot}
                disabled={saving || !url}
                className="flex-1 flex items-center justify-center gap-2 bg-[#C9A84C] text-[#0f0f0f] py-2.5 text-[11px] font-semibold tracking-[0.15em] uppercase hover:bg-[#d4b565] transition-colors disabled:opacity-40"
              >
                {saving ? <Loader2 size={12} className="animate-spin" /> : saved ? <CheckCircle size={12} /> : null}
                {saving ? 'Saving…' : saved ? 'Saved!' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
