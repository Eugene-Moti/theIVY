import { blobManifest } from "@/lib/blob-manifest";

export function assetUrl(path: string) {
  return blobManifest[path] ?? path;
}
