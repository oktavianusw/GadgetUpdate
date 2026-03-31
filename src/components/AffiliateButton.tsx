import { getAffiliateUrl } from '@/lib/affiliate'

interface AffiliateButtonProps {
  productSlug: string
  refSlug?: string
  label?: string
  className?: string
}

export default function AffiliateButton({
  productSlug,
  refSlug,
  label = 'Cek Harga di Shopee',
  className = '',
}: AffiliateButtonProps) {
  const href = getAffiliateUrl(productSlug, refSlug)
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 font-bold px-5 py-2.5 rounded-lg transition-all ${className || 'bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-500/20'}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 7h12.8M7 13L5.4 5M17 21a1 1 0 100-2 1 1 0 000 2zm-10 0a1 1 0 100-2 1 1 0 000 2z"
        />
      </svg>
      {label}
    </a>
  )
}
