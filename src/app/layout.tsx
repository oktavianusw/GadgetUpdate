import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const font = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://gadgetupdate.site'),
  title: {
    default: 'GadgetUpdate — Review Gadget Jujur untuk Mahasiswa Indonesia',
    template: '%s | GadgetUpdate',
  },
  description:
    'Review jujur gadget & aksesoris tech untuk mahasiswa dan tech enthusiast Indonesia. Temukan deals terbaik di Shopee.',
  openGraph: {
    siteName: 'GadgetUpdate',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={font.variable}>
      <body className="font-[var(--font-sans)] antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
