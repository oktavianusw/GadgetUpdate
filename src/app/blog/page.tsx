import type { Metadata } from 'next'
import { getAllPostsMeta } from '@/lib/posts'
import PostCard from '@/components/PostCard'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Semua review, tips, dan rekomendasi gadget terbaik untuk mahasiswa Indonesia.',
}

export default function BlogPage() {
  const posts = getAllPostsMeta()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20 min-h-[85vh]">
      <div className="mb-12 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">Artikel & Review</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Kumpulan analisis mendalam, ulasan jujur, dan panduan pembelian dari tim spesialis GadgetUpdate.
        </p>
        <div className="mt-6 flex items-center gap-3 text-sm text-zinc-500 font-medium">
          <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full">{posts.length} Artikel Tersedia</span>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-24 bg-zinc-900/50 border border-zinc-800 rounded-3xl">
          <p className="text-lg text-zinc-400">Belum ada artikel yang diterbitkan saat ini.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
             <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
