import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = 'C:/Projects/the-ivygroup-web'
const PUBLIC = path.join(ROOT, 'public')
const MAX_DIM = 3840 // largest width Next/Image was observed requesting in production
const JPEG_QUALITY = 82

function fmtMB(bytes) {
  return (bytes / 1024 / 1024).toFixed(2) + ' MB'
}

async function optimizeInPlace(absPath) {
  const before = fs.statSync(absPath).size
  const buf = fs.readFileSync(absPath)
  const img = sharp(buf, { limitInputPixels: false })
  const meta = await img.metadata()
  let pipeline = img.rotate()
  const needsResize = (meta.width || 0) > MAX_DIM || (meta.height || 0) > MAX_DIM
  if (needsResize) {
    pipeline = pipeline.resize({ width: MAX_DIM, height: MAX_DIM, fit: 'inside', withoutEnlargement: true })
  }
  const ext = path.extname(absPath).toLowerCase()
  if (ext === '.jpg' || ext === '.jpeg') {
    pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
  } else if (ext === '.png') {
    pipeline = pipeline.png({ compressionLevel: 9, adaptiveFiltering: true })
  } else {
    return { skipped: 'unsupported-ext', before, after: before }
  }
  const out = await pipeline.toBuffer()
  if (out.length < before) {
    fs.writeFileSync(absPath, out)
    return { before, after: out.length, resized: needsResize, dims: `${meta.width}x${meta.height}` }
  }
  return { skipped: 'no-improvement', before, after: before }
}

async function convertPngToJpeg(srcAbsPath, destAbsPath) {
  const before = fs.statSync(srcAbsPath).size
  const buf = fs.readFileSync(srcAbsPath)
  const img = sharp(buf, { limitInputPixels: false })
  const meta = await img.metadata()
  const out = await img
    .rotate()
    .resize({ width: MAX_DIM, height: MAX_DIM, fit: 'inside', withoutEnlargement: true })
    .flatten({ background: '#0a0a0a' })
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toBuffer()
  fs.writeFileSync(destAbsPath, out)
  fs.unlinkSync(srcAbsPath)
  return { before, after: out.length, dims: `${meta.width}x${meta.height}` }
}

async function main() {
  const mode = process.argv[2]
  console.log(`=== mode: ${mode} ===`)

  if (mode === 'convert') {
    // The two PNG heroes being converted to JPEG (references updated separately in code)
    const jobs = [
      [
        path.join(PUBLIC, 'IVY PARK RESIDENCE Assests/EXTERIORS/Night_EXTERIOS_01.png'),
        path.join(PUBLIC, 'IVY PARK RESIDENCE Assests/EXTERIORS/Night_EXTERIOS_01.jpg'),
      ],
      [
        path.join(PUBLIC, 'Ivy Myst Assets/New Renders/Exterior/Exterior Day View.png'),
        path.join(PUBLIC, 'Ivy Myst Assets/New Renders/Exterior/Exterior Day View.jpg'),
      ],
    ]
    for (const [src, dest] of jobs) {
      const r = await convertPngToJpeg(src, dest)
      console.log(`${path.basename(src)} -> ${path.basename(dest)}: ${fmtMB(r.before)} -> ${fmtMB(r.after)} (${r.dims})`)
    }
    // Blossom hero is already .jpg — resize+recompress in place
    const blossom = path.join(PUBLIC, 'Blossoms Ivy Residence Assets/Blossoms Ivy Gate.jpg')
    const rb = await optimizeInPlace(blossom)
    console.log(`Blossoms Ivy Gate.jpg (in place): ${fmtMB(rb.before)} -> ${fmtMB(rb.after)} resized=${!!rb.resized} dims=${rb.dims || 'orig'}`)
    return
  }

  if (mode === 'sweep') {
    // Every public asset path literally referenced in src/, over the size threshold.
    const threshold = 6 * 1024 * 1024
    const srcDir = path.join(ROOT, 'src')
    const files = []
    ;(function walk(dir) {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name)
        if (entry.isDirectory()) walk(full)
        else if (/\.(tsx?|jsx?)$/.test(entry.name)) files.push(full)
      }
    })(srcDir)

    const pathRe = /['"`](\/[^'"`]+?\.(?:png|jpe?g|webp))['"`]/gi
    const refs = new Set()
    for (const f of files) {
      const text = fs.readFileSync(f, 'utf8')
      let m
      while ((m = pathRe.exec(text))) {
        try {
          refs.add(decodeURIComponent(m[1]))
        } catch {
          refs.add(m[1])
        }
      }
    }

    console.log(`Found ${refs.size} distinct image references in src/. Checking sizes...`)
    const big = []
    for (const rel of refs) {
      const abs = path.join(PUBLIC, rel)
      if (fs.existsSync(abs)) {
        const size = fs.statSync(abs).size
        if (size > threshold) big.push({ rel, abs, size })
      }
    }
    big.sort((a, b) => b.size - a.size)
    console.log(`${big.length} referenced files exceed ${fmtMB(threshold)}:`)
    let totalBefore = 0
    let totalAfter = 0
    for (const { rel, abs, size } of big) {
      totalBefore += size
      try {
        const r = await optimizeInPlace(abs)
        totalAfter += r.after
        console.log(`  ${rel}: ${fmtMB(r.before)} -> ${fmtMB(r.after)}${r.skipped ? ' (' + r.skipped + ')' : ''}`)
      } catch (e) {
        totalAfter += size
        console.log(`  ${rel}: ERROR ${e.message}`)
      }
    }
    console.log(`\nTotal: ${fmtMB(totalBefore)} -> ${fmtMB(totalAfter)} (saved ${fmtMB(totalBefore - totalAfter)})`)
    return
  }

  console.log('Usage: node optimize-images.mjs convert|sweep')
}

main()
