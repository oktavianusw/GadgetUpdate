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
    <Link href={`/blog/${slug}`} className="group block bg-white rounded-2xl border border-zinc-200 overflow-hidden hover:border-zinc-300 hover:bg-zinc-50 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary-500/5 duration-300">
      <div className="relative aspect-[16/10] bg-zinc-100 border-b border-zinc-200 overflow-hidden">
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
          sizes="(max-width: 768px) 100vw, 400px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-zinc-900 border border-zinc-200 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
          {CATEGORY_LABELS[category] ?? category}
        </span>
      </div>
      <div className="p-6 space-y-3">
        <h2 className="font-bold text-xl text-zinc-900 leading-snug line-clamp-2 group-hover:text-primary-600 transition-colors">
          {title}
        </h2>
        <p className="text-sm text-zinc-600 line-clamp-2 leading-relaxed">{excerpt}</p>
        <div className="flex items-center gap-3 text-xs text-zinc-500 font-medium pt-2">
          <span>{formattedDate}</span>
          <span className="w-1 h-1 rounded-full bg-zinc-300" />
          <span>{readingTime}</span>
        </div>
      </div>
    </Link>
  )
}
