import Image from 'next/image'
import Link from 'next/link'
import type { PostMeta } from '@/types'

const CATEGORY_LABELS: Record<string, string> = {
  peripheral: 'Peripheral',
  laptop: 'Laptop',
  smartphone: 'Smartphone',
  aksesori: 'Aksesori',
  'desk-setup': 'Desk Setup',
}

export default function PostCard({ post }: { post: PostMeta }) {
  const { slug, title, excerpt, coverImage, date, category, readingTime } = post
  const formattedDate = new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  
  return (
    <Link href={`/blog/${slug}`} className="group block bg-[#18181b] rounded-2xl border border-zinc-800/80 overflow-hidden hover:border-zinc-700 hover:bg-[#1f1f22] transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary-500/5 duration-300">
      <div className="relative aspect-[16/10] bg-zinc-900 border-b border-zinc-800/80 overflow-hidden">
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
          sizes="(max-width: 768px) 100vw, 400px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#18181b] to-transparent opacity-60" />
        <span className="absolute top-4 left-4 bg-zinc-900/90 backdrop-blur-md text-zinc-100 border border-zinc-700/50 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
          {CATEGORY_LABELS[category] ?? category}
        </span>
      </div>
      <div className="p-6 space-y-3">
        <h2 className="font-bold text-xl text-white leading-snug line-clamp-2 group-hover:text-primary-400 transition-colors">
          {title}
        </h2>
        <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed">{excerpt}</p>
        <div className="flex items-center gap-3 text-xs text-zinc-500 font-medium pt-2">
          <span>{formattedDate}</span>
          <span className="w-1 h-1 rounded-full bg-zinc-700" />
          <span>{readingTime}</span>
        </div>
      </div>
    </Link>
  )
}
