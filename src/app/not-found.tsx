import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark flex flex-col items-center justify-center text-center px-6">
      <p className="text-gold text-[11px] font-sans font-semibold tracking-[0.3em] uppercase mb-4">404</p>
      <h1 className="font-serif text-5xl md:text-7xl text-white font-light mb-4">Page Not Found</h1>
      <div className="w-12 h-px bg-gold mx-auto mb-7" />
      <p className="text-white/50 text-sm font-sans font-light max-w-md leading-relaxed mb-10">
        The page you are looking for does not exist or has been moved. Please navigate back to explore our developments.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <Link href="/" className="bg-gold text-dark px-8 py-3.5 text-[11px] font-sans font-semibold tracking-[0.2em] uppercase hover:bg-gold-light transition-colors">
          BACK TO HOME
        </Link>
        <Link href="/developments" className="border border-white/40 text-white px-8 py-3.5 text-[11px] font-sans font-semibold tracking-[0.2em] uppercase hover:border-white transition-colors">
          VIEW DEVELOPMENTS
        </Link>
      </div>
    </div>
  )
}
