/**
 * Canonical head-office details for The Ivy Group.
 *
 * The head office moved from Blossom Ivy Residence (Gatundu Road, Kileleshwa)
 * to the Ivy Park sales suite on Kirichwa Road, Kilimani in 2026.
 * Update this file only — every address on the site reads from here.
 */

export const HEAD_OFFICE = {
  /** Short label shown as the primary line */
  name: 'Ivy Park Sales Suite',
  /** Development the office sits at */
  building: 'Ivy Park Residence',
  /** Street line */
  street: 'Kirichwa Road, Kilimani',
  /** Nearest landmark for directions */
  landmark: 'Near Yaya Centre',
  city: 'Nairobi',
  country: 'Kenya',
  /** Structured street address for schema.org PostalAddress */
  streetAddress: 'Kirichwa Road, Kilimani (near Yaya Centre)',
  /** Google Maps embed — Ivy Park Residence, Kirichwa Road */
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d3038.3471868036504!2d36.780312317928214!3d-1.2916600198019121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m3!3m2!1d-1.2877824!2d36.7886336!4m5!1s0x182f1b000d6f3f39%3A0x854c68bdc588cef5!2sIVY%20PARK%20RESIDENCE%20Nairobi%2C%20Kirichwa%20Rd!3m2!1d-1.2914455!2d36.781751!5e1!3m2!1sen!2ske!4v1781850798389!5m2!1sen!2ske',
  /** Click-through directions link */
  mapLink:
    'https://www.google.com/maps/search/?api=1&query=Ivy%20Park%20Residence%20Kirichwa%20Road%20Kilimani%20Nairobi',
} as const

/** Previous head office — retained as a by-appointment sales point while Blossom Ivy sells out. */
export const FORMER_OFFICE = {
  name: 'Blossom Ivy Residence',
  street: 'Gatundu Road, Kileleshwa',
  city: 'Nairobi',
  note: 'Site sales office — viewings by appointment',
} as const
