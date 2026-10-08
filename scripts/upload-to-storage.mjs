// Uploads local files to the "property-media" Supabase Storage bucket and
// prints back their public URLs — use those URLs in src/data/projects.ts
// in place of a local /public path.
//
// Run with: node --env-file=.env.local scripts/upload-to-storage.mjs <destPrefix> <file1> [file2] ...
// Example:  node --env-file=.env.local scripts/upload-to-storage.mjs ivy-myst/exterior "C:/renders/Lobby Night.jpg"

import { createClient } from '@supabase/supabase-js'
import fs from 'node:fs'
import path from 'node:path'

const BUCKET = 'property-media'

const MIME = {
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.webp': 'image/webp', '.pdf': 'application/pdf',
}

function supabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY — run with --env-file=.env.local')
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } })
}

async function ensureBucket(sb) {
  const { data: buckets, error } = await sb.storage.listBuckets()
  if (error) throw error
  if (buckets.some((b) => b.name === BUCKET)) return
  const { error: createErr } = await sb.storage.createBucket(BUCKET, {
    public: true,
    fileSizeLimit: '50MB',
  })
  if (createErr) throw createErr
  console.log(`Created bucket "${BUCKET}"`)
}

async function uploadFile(sb, localPath, destPrefix) {
  const filename = path.basename(localPath)
  const ext = path.extname(filename).toLowerCase()
  const contentType = MIME[ext] || 'application/octet-stream'
  const destPath = `${destPrefix}/${filename}`.replace(/\/+/g, '/')
  const buf = fs.readFileSync(localPath)
  const { error } = await sb.storage.from(BUCKET).upload(destPath, buf, {
    contentType,
    upsert: true,
    cacheControl: '31536000', // 1 year — these are static renders, not content that changes at the same URL
  })
  if (error) throw new Error(`${filename}: ${error.message}`)
  const { data } = sb.storage.from(BUCKET).getPublicUrl(destPath)
  return data.publicUrl
}

async function main() {
  const [destPrefix, ...files] = process.argv.slice(2)
  if (!destPrefix || files.length === 0) {
    console.log('Usage: node --env-file=.env.local scripts/upload-to-storage.mjs <destPrefix> <file1> [file2] ...')
    process.exit(1)
  }
  const sb = supabase()
  await ensureBucket(sb)
  for (const f of files) {
    const url = await uploadFile(sb, f, destPrefix)
    console.log(`${path.basename(f)} -> ${url}`)
  }
}

main().catch((e) => { console.error(e.message || e); process.exit(1) })
