import Link from 'next/link'

export default function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string
  updated: string
  children: React.ReactNode
}) {
  return (
    <>
      <section className="bg-dark pt-36 pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <p className="text-gold-light text-[10px] font-sans font-semibold tracking-[0.32em] uppercase mb-4">
            The Ivy Group
          </p>
          <h1
            className="font-serif text-white font-light leading-[1.05]"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', letterSpacing: '0.01em' }}
          >
            {title}
          </h1>
          <p className="text-white/40 text-[12px] font-sans mt-5">Last updated: {updated}</p>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="mb-10 border-l-2 border-gold/40 pl-5 py-1">
            <p className="text-dark/55 text-[13px] font-sans font-light leading-relaxed">
              This is a working draft prepared for review. It should be checked by a qualified
              advocate and confirmed against your registration status with the Office of the Data
              Protection Commissioner before it is relied upon.
            </p>
          </div>

          <div className="legal-prose">{children}</div>

          <div className="mt-16 pt-8 border-t border-dark/10 flex flex-wrap gap-x-8 gap-y-2 text-[11px] font-sans font-semibold tracking-[0.14em] uppercase text-dark/45">
            <Link href="/privacy" className="hover:text-gold transition-colors">Privacy &amp; Cookies</Link>
            <Link href="/terms" className="hover:text-gold transition-colors">Terms of Use</Link>
            <Link href="/contact" className="hover:text-gold transition-colors">Contact</Link>
          </div>
        </div>
      </section>
    </>
  )
}
