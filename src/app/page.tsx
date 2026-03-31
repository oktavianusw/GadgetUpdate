import Link from 'next/link'
import { getFeaturedPosts, getAllPostsMeta } from '@/lib/posts'
import { getDeals } from '@/lib/products'
import PostCard from '@/components/PostCard'
import ProductCard from '@/components/ProductCard'

export default function HomePage() {
  const featured = getFeaturedPosts().slice(0, 6)
  const deals = getDeals().slice(0, 4)
  const latest = getAllPostsMeta().slice(0, 3)

  return (
    <>
      {/* ─── HIGhend HERO ─── */}
      <section className="relative overflow-hidden bg-[#09090b] min-h-[85vh] flex flex-col items-center justify-center border-b border-zinc-900">
        {/* Abstract Grid background */}
        <div className="absolute inset-0 bg-grid opacity-30" style={{ maskImage: 'linear-gradient(to bottom, white, transparent)' }} />
        
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-sm font-medium text-zinc-300 mb-8 shadow-2xl backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
            Platform Review Gadget Independen
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Review Mendalam.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-500">
              Tanpa Bias.
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Eksplorasi artikel dan analisis produk teknologi terbaik untuk membantu kamu mengambil keputusan cerdas sebelum membeli gadget baru.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/blog"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-semibold transition-all shadow-lg shadow-primary-500/25 flex items-center justify-center gap-2"
            >
              Baca Review Terbaru
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/deals"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 font-medium transition-all flex items-center justify-center gap-2"
            >
              Cek Deals Terkini
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CONTENT SECTIONS ─── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 space-y-24">
        
        {/* Featured posts */}
        {featured.length > 0 && (
          <section>
            <div className="flex items-end justify-between mb-10">
              <div className="space-y-1">
                <p className="text-sm font-semibold tracking-wider text-primary-500 uppercase">Pilihan Editor</p>
                <h2 className="text-3xl font-bold text-white">
                  Artikel Unggulan
                </h2>
              </div>
              <Link href="/blog" className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors flex items-center gap-1">
                Lihat semua <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* Deals */}
        {deals.length > 0 && (
          <section className="bg-zinc-900/50 border border-zinc-800/80 rounded-3xl p-8 sm:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/5 rounded-full blur-[80px]" />
            <div className="relative z-10">
              <div className="flex items-end justify-between mb-10">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-semibold tracking-wider text-primary-500 uppercase">Harga Terbaik</p>
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-white">
                    Tech Deals Hari Ini
                  </h2>
                </div>
                <Link href="/deals" className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors gap-1 hidden sm:flex items-center">
                  Eksplor deals <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {deals.map((deal) => (
                  <ProductCard key={deal.slug} product={deal} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Latest */}
        {latest.length > 0 && featured.length === 0 && (
          <section>
            <h2 className="text-3xl font-bold text-white mb-8">
              Terbaru dari Kami
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latest.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
