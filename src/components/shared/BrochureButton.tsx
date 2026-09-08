'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'
import BrochureModal from './BrochureModal'

interface Props {
  projectName: string
  brochurePath: string
  className?: string
  label?: string
  /** Replace the default icon + label with custom content */
  children?: React.ReactNode
  'aria-label'?: string
}

/**
 * A brochure call-to-action that always routes through the lead-capture
 * modal — never a direct link to the PDF. Drop it in anywhere a brochure
 * is offered.
 *
 * Note: the modal renders itself (position: fixed). If this button sits
 * inside an element with a CSS transform (e.g. a Framer Motion `y` / `scale`
 * animation), manage the modal at a non-transformed level instead.
 */
export default function BrochureButton({
  projectName,
  brochurePath,
  className,
  label = 'Brochure',
  children,
  'aria-label': ariaLabel,
}: Props) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className} aria-label={ariaLabel ?? `Request the ${projectName} brochure`}>
        {children ?? (
          <>
            <Download size={13} /> {label}
          </>
        )}
      </button>
      <BrochureModal
        isOpen={open}
        onClose={() => setOpen(false)}
        projectName={projectName}
        brochurePath={brochurePath}
      />
    </>
  )
}
