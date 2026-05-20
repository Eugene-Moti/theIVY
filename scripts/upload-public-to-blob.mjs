import { put } from "@vercel/blob";
import { promises as fs } from "node:fs";
import path from "node:path";

const publicDir = path.join(process.cwd(), "public");
const manifestPath = path.join(process.cwd(), "lib", "blob-manifest.ts");
const prefix = "public";

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      return entry.isDirectory() ? walk(fullPath) : fullPath;
    })
  );

  return files.flat();
}

function toPublicUrl(filePath) {
  return `/${path.relative(publicDir, filePath).replaceAll(path.sep, "/")}`;
}

function toBlobPath(publicUrl) {
  return `${prefix}${encodeURI(publicUrl).replaceAll("%2F", "/")}`;
}

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  throw new Error("Missing BLOB_READ_WRITE_TOKEN. Run `vercel link` and `vercel env pull .env.local`, then load that env file before running this script.");
}

const files = await walk(publicDir);
const manifest = {};

for (const [index, filePath] of files.entries()) {
  const publicUrl = toPublicUrl(filePath);
  const pathname = toBlobPath(publicUrl);
  const body = await fs.readFile(filePath);

  const blob = await put(pathname, body, {
    access: "public",
    allowOverwrite: true,
    multipart: true,
    cacheControlMaxAge: 60 * 60 * 24 * 365
  });

  manifest[publicUrl] = blob.url;
  console.log(`[${index + 1}/${files.length}] ${publicUrl} -> ${blob.url}`);
}

const manifestSource = `export const blobManifest: Record<string, string> = ${JSON.stringify(manifest, null, 2)};\n`;
await fs.writeFile(manifestPath, manifestSource);
console.log(`Wrote ${manifestPath}`);
