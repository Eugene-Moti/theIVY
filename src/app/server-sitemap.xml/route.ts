import { getServerSideSitemap, ISitemapField } from 'next-sitemap'

export async function GET() {

  const fields: ISitemapField[] = [
    {
      loc: 'https://ivygroup.ke',
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 1.0,
    },
    {
      loc: 'https://ivygroup.ke/buy',
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.9,
    },
    {
      loc: 'https://ivygroup.ke/let',
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.9,
    },
    {
      loc: 'https://ivygroup.ke/about',
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      loc: 'https://ivygroup.ke/contact',
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      loc: 'https://ivygroup.ke/blog',
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.8,
    },
    {
      loc: 'https://ivygroup.ke/book-reservation',
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: 0.7,
    },
  ]

  return getServerSideSitemap(fields)
}
