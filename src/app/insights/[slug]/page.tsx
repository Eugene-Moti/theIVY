import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getArticle, getRelatedArticles, articles } from '@/data/insights'
import { ArrowLeft, Clock, Tag, ArrowRight } from 'lucide-react'

export function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug)
  if (!article) return {}
  return {
    title: `${article.title} | The Ivy Group Insights`,
    description: article.excerpt,
  }
}

export default function InsightArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug)
  if (!article) notFound()

  const related = getRelatedArticles(params.slug)

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[480px] bg-dark overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover opacity-45"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-dark/20" />
        <div className="relative h-full flex flex-col justify-end pb-14 max-w-4xl mx-auto px-6 lg:px-10 pt-28">
          <div className="flex items-center gap-1.5 mb-4">
            <Tag size={10} className="text-gold" />
            <span className="text-gold text-[10px] font-sans font-semibold tracking-[0.3em] uppercase">{article.category}</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-semibold tracking-tight leading-[1.04] mb-5">{article.title}</h1>
          <div className="flex items-center gap-5 text-white/45 text-[11px] font-sans">
            <span className="flex items-center gap-1.5"><Clock size={11} />{article.readTime}</span>
            <span>{article.date}</span>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          {/* Back link */}
          <Link href="/insights" className="inline-flex items-center gap-2 text-dark/40 text-[10px] font-sans font-semibold tracking-widest uppercase hover:text-gold transition-colors mb-10">
            <ArrowLeft size={10} /> BACK TO INSIGHTS
          </Link>

          {/* Excerpt / lead */}
          <p className="font-serif text-xl text-dark/75 font-light leading-relaxed mb-8 border-l-2 border-gold pl-5">
            {article.excerpt}
          </p>

          <div className="w-12 h-[2px] bg-dark/10 mb-10" />

          {/* Content blocks */}
          <div className="space-y-7">
            {article.content.map((block, i) => (
              <div key={i}>
                {block.heading && (
                  <h2 className="font-serif text-2xl text-dark font-light mb-4 mt-8">{block.heading}</h2>
                )}
                <p className="text-dark/65 text-[15px] font-sans font-light leading-[1.9]">{block.body}</p>
              </div>
            ))}
          </div>

          {/* Footer strip */}
          <div className="border-t border-dark/10 mt-14 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-dark/40 text-[10px] font-sans tracking-widest uppercase mb-1">Published by</p>
              <p className="font-serif text-dark text-base font-light">The Ivy Group Editorial</p>
            </div>
            <Link href="/contact" className="inline-flex items-center gap-2 border border-dark/20 text-dark px-6 py-3 text-[10px] font-sans font-semibold tracking-wider uppercase hover:border-gold hover:text-gold transition-colors">
              ENQUIRE ABOUT A PROPERTY <ArrowRight size={10} />
            </Link>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="py-16 lg:py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <p className="text-gold text-[10px] font-sans font-semibold tracking-[0.3em] uppercase mb-10">MORE FROM OUR INSIGHTS</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map(rel => (
                <Link key={rel.slug} href={`/insights/${rel.slug}`} className="group block bg-white border border-dark/8 hover:border-gold/30 transition-colors overflow-hidden">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={rel.image} alt={rel.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="33vw" />
                  </div>
                  <div className="p-5">
                    <p className="text-gold text-[9px] font-sans font-semibold tracking-wider uppercase mb-2">{rel.category}</p>
                    <h3 className="font-serif text-base text-dark font-light leading-snug mb-3 group-hover:text-gold/80 transition-colors">{rel.title}</h3>
                    <div className="flex items-center gap-1 text-dark/35 text-[10px] font-sans">
                      <Clock size={9} />{rel.readTime}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
