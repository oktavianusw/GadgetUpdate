import Image from 'next/image'
import PriceDropBadge from './PriceDropBadge'
import AffiliateButton from './AffiliateButton'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
  refSlug?: string
}

const formatIDR = (n: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1.5 text-sm font-medium">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${star <= Math.round(rating) ? 'text-amber-400 drop-shadow-[0_0_2px_rgba(251,191,36,0.5)]' : 'text-zinc-700'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-zinc-400">{rating.toFixed(1)}</span>
    </div>
  )
}

export default function ProductCard({ product, refSlug }: ProductCardProps) {
  const { name, slug, price, originalPrice, rating, image } = product
  return (
    <div className="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-primary-500/10 hover:border-zinc-700 transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-square bg-white border-b border-zinc-800/50 p-6 flex items-center justify-center">
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain p-6 group-hover:scale-110 transition-transform duration-500 ease-out"
          sizes="(max-width: 768px) 100vw, 300px"
        />
        {originalPrice && originalPrice > price && (
          <div className="absolute top-3 right-3 shadow-lg">
            <PriceDropBadge price={price} originalPrice={originalPrice} />
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col justify-between" style={{ minHeight: '180px' }}>
        <div className="space-y-3">
          <h3 className="font-semibold text-lg text-white leading-tight line-clamp-2 group-hover:text-primary-400 transition-colors">{name}</h3>
          <StarRating rating={rating} />
        </div>
        <div className="mt-4 space-y-4">
          <div>
            <div className="text-xl font-extrabold text-white tracking-tight">{formatIDR(price)}</div>
            {originalPrice && originalPrice > price && (
              <div className="text-sm font-medium text-zinc-500 line-through mt-0.5">{formatIDR(originalPrice)}</div>
            )}
          </div>
          <AffiliateButton productSlug={slug} refSlug={refSlug} className="w-full text-sm py-3 rounded-xl bg-zinc-100 hover:bg-white text-zinc-900 shadow-xl shadow-white/5" />
        </div>
      </div>
    </div>
  )
}
