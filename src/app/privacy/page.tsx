import type { Metadata } from 'next'
import LegalLayout from '@/components/legal/LegalLayout'
import { PHONE_PRETTY, EMAIL } from '@/lib/contact'

export const metadata: Metadata = {
  title: 'Privacy & Cookie Policy | The Ivy Group',
  description:
    'How The Ivy Group collects, uses and protects your personal data, the cookies this website uses, and your rights under the Kenya Data Protection Act, 2019.',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy & Cookie Policy" updated="September 2026">
      <p>
        This policy explains how <strong>The Ivy Group</strong>, a brand of{' '}
        <strong>R-Sun Properties Limited</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;),
        collects and uses personal data when you use{' '}
        <strong>www.ivygroup.ke</strong>, contact us, or enquire about our developments. We are the
        data controller for that information.
      </p>
      <p>
        We handle personal data in line with the <strong>Data Protection Act, 2019</strong> of Kenya
        and its Regulations. Where you contact us from outside Kenya, we also seek to meet the
        standards of the laws that apply to you, such as the EU/UK GDPR.
      </p>

      <h2>1. The information we collect</h2>

      <h3>Information you give us</h3>
      <p>When you complete a form, request a brochure, use the chat assistant, or join the rental waitlist, we collect:</p>
      <ul>
        <li>your name;</li>
        <li>your email address;</li>
        <li>your telephone number and country code;</li>
        <li>the development or unit type you are interested in;</li>
        <li>your indicative budget range;</li>
        <li>whether you are buying directly, jointly, as an investor, or acting as an agent or on someone&rsquo;s behalf;</li>
        <li>your intended purchase timeframe; and</li>
        <li>any message or details you choose to send us.</li>
      </ul>
      <p>
        The chat assistant asks for your name, phone and email before a conversation begins so that a
        consultant can follow up.
      </p>

      <h3>Information we collect automatically</h3>
      <p>
        When you visit the site we use <strong>Google Analytics 4</strong> to understand how the site
        is used. This collects your approximate location (city level), the pages you view, how you
        arrived at the site, and your device and browser type. Google Analytics sets cookies (see
        section 5). We do not use analytics to identify you personally.
      </p>
      <p>
        Pages that embed <strong>Google Maps</strong> load content directly from Google, which may set
        its own cookies and collect data under Google&rsquo;s privacy policy.
      </p>

      <h3>Information stored on your device</h3>
      <p>
        The site stores small amounts of data in your browser&rsquo;s local storage so it works better
        for you. This includes the contact details you enter into the chat assistant (so you do not
        have to type them again), your chat theme preference, and a note of banners you have
        dismissed. This data stays on your device and is not sent to us except as part of an enquiry
        you submit.
      </p>

      <h2>2. How we use your information</h2>
      <ul>
        <li>to respond to your enquiry and answer your questions;</li>
        <li>to send you brochures, pricing, floor plans and project updates you have asked for;</li>
        <li>to arrange and follow up on viewings and site visits;</li>
        <li>to contact you by phone, email or WhatsApp about developments that may suit your stated requirements;</li>
        <li>to keep records of enquiries and transactions;</li>
        <li>to understand and improve how the website performs; and</li>
        <li>to comply with our legal and regulatory obligations.</li>
      </ul>

      <h2>3. Our lawful basis for processing</h2>
      <ul>
        <li>
          <strong>Your consent</strong> &mdash; for marketing communications and for non-essential
          cookies. You can withdraw consent at any time (see section 10).
        </li>
        <li>
          <strong>Steps taken at your request</strong> &mdash; to respond to an enquiry or prepare
          for a possible purchase.
        </li>
        <li>
          <strong>Our legitimate interests</strong> &mdash; to run and improve our business and this
          website, provided your rights do not override those interests.
        </li>
        <li><strong>Legal obligation</strong> &mdash; where the law requires us to keep or disclose information.</li>
      </ul>

      <h2>4. Who we share your information with</h2>
      <p>We do not sell your personal data. We share it with:</p>
      <ul>
        <li>our sales, customer-care and legal teams;</li>
        <li>
          service providers who process data on our behalf under contract &mdash;{' '}
          <strong>Supabase</strong> (secure database hosting), <strong>Resend</strong> (email
          delivery), <strong>Vercel</strong> (website hosting) and <strong>Google</strong> (analytics
          and maps);
        </li>
        <li>professional advisers, banks and conveyancers where a transaction proceeds; and</li>
        <li>regulators or authorities where we are legally required to do so.</li>
      </ul>

      <h2>5. Cookies and similar technologies</h2>
      <p>A cookie is a small file stored by your browser. This site uses:</p>
      <table>
        <thead>
          <tr><th>Cookie / item</th><th>Set by</th><th>Purpose</th><th>Retention</th></tr>
        </thead>
        <tbody>
          <tr><td>_ga, _ga_G4MF7YCDPV</td><td>Google Analytics</td><td>Analytics &mdash; distinguishes visitors and sessions</td><td>Up to 13 months</td></tr>
          <tr><td>Google Maps cookies</td><td>Google</td><td>Set when a map loads; governed by Google&rsquo;s policy</td><td>Varies</td></tr>
          <tr><td>sb-* cookies</td><td>The Ivy Group</td><td>Strictly necessary &mdash; staff login to the private admin area only</td><td>Session</td></tr>
          <tr><td>Local storage (chat details, preferences)</td><td>The Ivy Group</td><td>Remembers your chat details and site preferences on your device</td><td>Until you clear your browser</td></tr>
        </tbody>
      </table>
      <p>
        You can block or delete cookies through your browser settings, and clear local storage the
        same way. The site will still work, though some conveniences (such as the chat remembering
        you) will not.
      </p>
      <p className="note">
        A cookie consent banner is planned. Until it is in place, analytics runs by default; you can
        opt out using the Google Analytics Opt-out Browser Add-on or your browser&rsquo;s cookie
        controls.
      </p>

      <h2>6. International data transfers</h2>
      <p>
        Some of our service providers are located outside Kenya (for example in the United States and
        the European Union). Where personal data is transferred abroad, we rely on the provider&rsquo;s
        contractual safeguards and, where applicable, standard data-protection clauses, so that your
        data receives a comparable level of protection.
      </p>

      <h2>7. How long we keep your information</h2>
      <p>
        We keep enquiry and customer records for as long as needed to deal with your enquiry, for the
        life of any resulting relationship, and afterwards for the period required by law and to
        defend legal claims. Analytics data is retained according to our Google Analytics settings.
      </p>
      <p className="note">
        [To confirm with your advocate: the exact retention periods for enquiry records and customer
        files.]
      </p>

      <h2>8. How we protect your information</h2>
      <p>
        Access to enquiry data is restricted to authorised staff. Our database and admin area are
        protected by authentication and encryption in transit. No system is completely secure, but we
        take reasonable technical and organisational measures to protect your data.
      </p>

      <h2>9. Children</h2>
      <p>
        This website is intended for adults. We do not knowingly collect personal data from anyone
        under 18. If you believe a child has provided us with personal data, please contact us and we
        will delete it.
      </p>

      <h2>10. Your rights</h2>
      <p>Under the Data Protection Act, 2019 you have the right to:</p>
      <ul>
        <li>be informed of how your data is used;</li>
        <li>access the personal data we hold about you;</li>
        <li>ask us to correct inaccurate or incomplete data;</li>
        <li>ask us to delete your data in certain circumstances;</li>
        <li>object to or ask us to restrict our processing;</li>
        <li>withdraw consent at any time, including opting out of marketing; and</li>
        <li>lodge a complaint with the Office of the Data Protection Commissioner.</li>
      </ul>
      <p>
        To exercise any of these rights, contact us using the details below. To stop marketing
        messages, reply &ldquo;STOP&rdquo; to any message or email us. You can complain to the{' '}
        <a href="https://www.odpc.go.ke" target="_blank" rel="noopener noreferrer">Office of the Data Protection Commissioner</a>{' '}
        (odpc.go.ke).
      </p>

      <h2>11. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The date at the top shows when it was last
        revised. Significant changes will be highlighted on this page.
      </p>

      <h2>12. Contact us</h2>
      <p>
        <strong>The Ivy Group / R-Sun Properties Limited</strong><br />
        Ivy Park Sales Suite, Ivy Park Residence, Kirichwa Road, Kilimani, Nairobi<br />
        Phone / WhatsApp: {PHONE_PRETTY}<br />
        Email: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </p>
      <p className="note">
        [To confirm: whether R-Sun Properties Limited is registered with the ODPC as a data
        controller, and whether a Data Protection Officer or contact person should be named here.]
      </p>
    </LegalLayout>
  )
}
