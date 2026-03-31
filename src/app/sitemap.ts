import type { MetadataRoute } from 'next'
import { getAllPostsMeta } from '@/lib/posts'

const BASE = 'https://gadgetupdate.site'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPostsMeta()

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/deals`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
    ...postEntries,
  ]
}
