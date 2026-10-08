import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getArticle, getRelatedArticles, articles } from '@/data/insights'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import ReadingProgress from '@/components/insights/ReadingProgress'
import StickyShareBar from '@/components/insights/StickyShareBar'
import ArticleHero from '@/components/insights/ArticleHero'
import ArticleBody from '@/components/insights/ArticleBody'
import ArticleCard from '@/components/shared/ArticleCard'

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
      <ReadingProgress />
      <StickyShareBar title={article.title} />

      <ArticleHero
        image={article.image}
        title={article.title}
        category={article.category}
        readTime={article.readTime}
        date={article.date}
      />

      {/* Article Body */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          {/* Back link */}
          <Link href="/insights" className="inline-flex items-center gap-2 text-dark/40 text-[10px] font-sans font-semibold tracking-widest uppercase hover:text-gold transition-colors mb-10 group">
            <ArrowLeft size={10} className="group-hover:-translate-x-1 transition-transform" /> BACK TO INSIGHTS
          </Link>

          <ArticleBody excerpt={article.excerpt} content={article.content} />

          {/* Footer strip */}
          <div className="border-t border-dark/10 mt-14 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-dark/40 text-[10px] font-sans tracking-widest uppercase mb-1">Published by</p>
              <p className="font-serif text-dark text-base font-light">The Ivy Group Editorial</p>
            </div>
            <Link href="/contact" className="inline-flex items-center gap-2 border border-dark/20 text-dark px-6 py-3 text-[10px] font-sans font-semibold tracking-wider uppercase hover:border-gold hover:text-gold transition-colors flex-shrink-0">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-14">
              {related.map((rel, i) => (
                <ArticleCard key={rel.slug} article={rel} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
