import { redirect, notFound } from 'next/navigation'
import { getProductBySlug, getAllProducts } from '@/lib/products'

interface Props {
  params: { slug: string }
}

// Ensure Vercel pre-builds all exact URLs to avoid File System loading problems at runtime.
export function generateStaticParams() {
  const products = getAllProducts()
  return Array.from(products.keys()).map((slug) => ({ slug }))
}

export const dynamicParams = true // Allow slugs not statically built to be tested dynamically

export default function GoRedirectPage({ params }: Props) {
  const product = getProductBySlug(params.slug)

  if (!product || !product.affiliateUrl) {
    notFound()
  }

  // Melakukan Redirect Server-side langsung ke URL Afiliasi
  redirect(product.affiliateUrl)
}
