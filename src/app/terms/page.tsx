import type { Metadata } from 'next'
import LegalLayout from '@/components/legal/LegalLayout'
import { PHONE_PRETTY, EMAIL } from '@/lib/contact'

export const metadata: Metadata = {
  title: 'Terms of Use | The Ivy Group',
  description:
    'The terms on which you may use the The Ivy Group website, including that renders, plans, pricing and availability are indicative and subject to change.',
  alternates: { canonical: '/terms' },
  robots: { index: true, follow: true },
}

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Use" updated="September 2026">
      <p>
        These terms apply to your use of <strong>www.ivygroup.ke</strong> (the &ldquo;site&rdquo;),
        operated by <strong>The Ivy Group</strong>, a brand of <strong>R-Sun Properties Limited</strong>.
        By using the site you accept these terms. If you do not accept them, please do not use the
        site.
      </p>

      <h2>1. Using this site</h2>
      <p>You agree to use the site lawfully and not to:</p>
      <ul>
        <li>submit false, misleading or automated enquiries;</li>
        <li>attempt to gain unauthorised access to any part of the site or its systems;</li>
        <li>copy, scrape or republish content without our written permission; or</li>
        <li>use the site in any way that could damage or disrupt it.</li>
      </ul>

      <h2>2. Information on the site is indicative</h2>
      <p>
        The site is for general information and marketing. It is <strong>not an offer</strong> and
        nothing on it forms part of a contract.
      </p>
      <ul>
        <li>
          Computer-generated images, renders and visualisations are <strong>artists&rsquo;
          impressions</strong> intended to convey a general idea. Finishes, materials, landscaping,
          views and layouts may differ from what is built.
        </li>
        <li>
          Floor plans, dimensions, sizes, unit mixes and specifications are approximate and may
          change during design and construction.
        </li>
        <li>
          Prices, payment plans, incentives, availability and estimated completion dates are
          indicative, may change without notice, and are confirmed only in a signed sale agreement.
        </li>
        <li>
          Projected rental yields or returns are illustrative estimates, not guarantees. Property
          values can fall as well as rise.
        </li>
      </ul>
      <p>
        Always confirm the current details with our sales team and rely on the executed sale
        documentation and your own professional advisers before making a decision.
      </p>

      <h2>3. Intellectual property</h2>
      <p>
        All content on the site &mdash; text, images, renders, plans, logos, video and design &mdash;
        belongs to The Ivy Group, R-Sun Properties Limited or its licensors and is protected by law.
        You may view and download material for your own personal, non-commercial use only.
      </p>

      <h2>4. Third-party links and services</h2>
      <p>
        The site links to and embeds third-party services such as Google Maps, WhatsApp, virtual-tour
        providers and social media. We are not responsible for their content, availability or privacy
        practices.
      </p>

      <h2>5. No warranty</h2>
      <p>
        The site is provided &ldquo;as is&rdquo;. While we take care to keep information accurate and
        current, we do not warrant that it is complete, error-free or up to date, or that the site
        will be uninterrupted or secure.
      </p>

      <h2>6. Limitation of liability</h2>
      <p>
        To the extent permitted by law, we are not liable for any loss or damage arising from your
        use of, or reliance on, the site or its content, including any decision made on the basis of
        indicative information described in section 2. Nothing in these terms limits liability that
        cannot be limited under Kenyan law.
      </p>

      <h2>7. Privacy</h2>
      <p>
        Our <a href="/privacy">Privacy &amp; Cookie Policy</a> explains how we handle personal data
        collected through the site.
      </p>

      <h2>8. Changes</h2>
      <p>
        We may update these terms from time to time. The date above shows when they were last
        revised. Continued use of the site means you accept the current version.
      </p>

      <h2>9. Governing law</h2>
      <p>
        These terms are governed by the laws of Kenya, and the courts of Kenya have exclusive
        jurisdiction over any dispute relating to them or to the site.
      </p>

      <h2>10. Contact</h2>
      <p>
        <strong>The Ivy Group / R-Sun Properties Limited</strong><br />
        Ivy Park Sales Suite, Ivy Park Residence, Kirichwa Road, Kilimani, Nairobi<br />
        Phone / WhatsApp: {PHONE_PRETTY}<br />
        Email: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </p>
    </LegalLayout>
  )
}
