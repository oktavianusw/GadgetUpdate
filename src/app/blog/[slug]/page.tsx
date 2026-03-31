import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostSlugs, getPostBySlug, extractHeadings } from '@/lib/posts'
import ProductCard from '@/components/ProductCard'
import TableOfContents from '@/components/TableOfContents'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  const { frontmatter } = post
  return {
    title: frontmatter.title,
    description: frontmatter.excerpt,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.excerpt,
      type: 'article',
      publishedTime: frontmatter.date,
      images: frontmatter.coverImage ? [frontmatter.coverImage] : [],
    },
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const { frontmatter, content } = post
  const headings = extractHeadings(content)
  const formattedDate = new Date(frontmatter.date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const CATEGORY_LABELS: Record<string, string> = {
    peripheral: 'Peripheral',
    laptop: 'Laptop',
    smartphone: 'Smartphone',
    aksesori: 'Aksesori',
    'desk-setup': 'Desk Setup',
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      
      {/* Two-column layout */}
      <div className="lg:grid lg:grid-cols-[1fr_260px] lg:gap-16 items-start">
        
        {/* Main Article column */}
        <div className="min-w-0">
          <header className="mb-12 pb-10 border-b border-zinc-900">
            <span className="inline-block bg-primary-500/10 text-primary-400 border border-primary-500/20 text-xs font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-full mb-6">
              {CATEGORY_LABELS[frontmatter.category] ?? frontmatter.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6 tracking-tight">
              {frontmatter.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-zinc-400 text-sm font-medium">
              <time dateTime={frontmatter.date}>{formattedDate}</time>
              <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full" />
              <span>Tim Editor</span>
            </div>
          </header>

          <article className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary-400 hover:prose-a:text-primary-300 prose-img:rounded-2xl prose-img:border prose-img:border-zinc-800">
            <MDXRemote
              source={content}
              options={{ blockJS: false }}
              components={{
                ProductCard: (props: React.ComponentProps<typeof ProductCard>) => (
                  <div className="not-prose my-10">
                    <ProductCard {...props} refSlug={params.slug} />
                  </div>
                ),
              }}
            />
          </article>

          {/* Linked Products */}
          {frontmatter.products?.length > 0 && (
            <section className="mt-16 pt-12 border-t border-zinc-900">
              <h2 className="text-2xl font-bold text-white mb-8 tracking-tight">Produk Terkait Artikel Ini</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {frontmatter.products.map((product) => (
                  <ProductCard key={product.slug} product={product} refSlug={params.slug} />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block relative">
          <div className="sticky top-28">
            <TableOfContents headings={headings} />
          </div>
        </aside>

      </div>
    </div>
  )
}
