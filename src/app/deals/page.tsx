import type { Metadata } from 'next'
import { getDeals } from '@/lib/products'
import ProductCard from '@/components/ProductCard'

export const metadata: Metadata = {
  title: 'Deals & Flash Sale',
  description: 'Deals dan price drop terbaik gadget & aksesoris tech di Shopee hari ini.',
}

export default function DealsPage() {
  const deals = getDeals()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20 min-h-[85vh]">
      <div className="mb-12 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-sm font-medium text-red-400 mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          Live Updates
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">Tech Deals & Flash Sale</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Pantauan harga terbaik, diskon, dan price drop gadget pilihan. Diperbarui secara otomatis untuk memastikan kamu mendapatkan penawaran paling menguntungkan.
        </p>
      </div>

      {deals.length === 0 ? (
        <div className="text-center py-24 bg-zinc-900/50 border border-zinc-800 rounded-3xl">
          <svg className="w-12 h-12 mx-auto text-zinc-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xl font-semibold text-white mb-2">Tidak ada deals aktif saat ini</p>
          <p className="text-zinc-500">Sistem kami sedang memindai penawaran terbaru. Coba periksa kembali nanti.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {deals.map((deal) => (
            <ProductCard key={deal.slug} product={deal} />
          ))}
        </div>
      )}
    </div>
  )
}
