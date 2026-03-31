interface PriceDropBadgeProps {
  price: number
  originalPrice?: number
}

export default function PriceDropBadge({ price, originalPrice }: PriceDropBadgeProps) {
  if (!originalPrice || originalPrice <= price) return null
  const pct = Math.round(((originalPrice - price) / originalPrice) * 100)
  return (
    <span className="inline-block bg-red-500/90 backdrop-blur-md border border-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-lg shadow-red-500/20">
      -{pct}%
    </span>
  )
}
