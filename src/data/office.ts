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
    'https://www.google.com/maps/embed?pb=!1m19!1m8!1m3!1d982.7834738622485!2d36.781634957029155!3d-1.2914471018236187!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x182f1b000d6f3f39%3A0x854c68bdc588cef5!2sIVY%20PARK%20RESIDENCE%20Nairobi%2C%20Kirichwa%20Rd!3m2!1d-1.2914455!2d36.781751!5e1!3m2!1sen!2ske!4v1788511994363!5m2!1sen!2ske',
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
