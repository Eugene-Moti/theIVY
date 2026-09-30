'use client'

import { useEffect } from 'react'
import { captureAttribution } from '@/lib/attribution'

/** Mounted once in the root layout so every page load checks the URL for
 * utm_ params and gclid and persists them. Renders nothing. */
export default function AttributionCapture() {
  useEffect(() => {
    captureAttribution()
  }, [])

  return null
}
