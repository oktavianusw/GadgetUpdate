import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-[#09090b] text-zinc-400 py-12 mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <Link href="/" className="font-extrabold text-xl text-white tracking-tight">
              Gadget<span className="text-primary-500">Update</span>.
            </Link>
            <p className="mt-4 text-sm leading-relaxed max-w-sm">
              Platform independen penyedia review, panduan teknikal, dan rekomendasi produk gadget terbaik untuk pengguna di Indonesia.
            </p>
          </div>
          <div>
            <p className="font-semibold text-white tracking-wide mb-4">Eksplorasi</p>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-primary-400 transition-colors">Beranda</Link></li>
              <li><Link href="/blog" className="hover:text-primary-400 transition-colors">Artikel & Review</Link></li>
              <li><Link href="/deals" className="hover:text-primary-400 transition-colors">Gadget Deals</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white tracking-wide mb-4">Afiliasi & Transparansi</p>
            <p className="text-xs leading-relaxed opacity-80">
              Sebagian link produk di website ini adalah tautan afiliasi. Kami dapat menerima komisi kecil 
              atas pembelian yang memenuhi syarat tanpa biaya tambahan bagi Anda. Kepercayaan pembaca 
              selalu menjadi prioritas utama kami dengan menjaga integritas dan netralitas ulasan produk.
            </p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs opacity-60">
          <p>© {new Date().getFullYear()} GadgetUpdate. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Designed with modern aesthetics & performance in mind.</p>
        </div>
      </div>
    </footer>
  )
}
