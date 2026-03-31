import { NextRequest, NextResponse } from 'next/server'
import { getProductBySlug } from '@/lib/products'

export function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params
  const ref = request.nextUrl.searchParams.get('ref') ?? 'direct'

  const product = getProductBySlug(slug)

  if (!product) {
    console.warn(`[/go] Product not found: ${slug} (ref: ${ref})`)
    return NextResponse.redirect(new URL('/', request.url))
  }

  console.log(`[/go] click slug=${slug} ref=${ref} ts=${new Date().toISOString()}`)

  return NextResponse.redirect(product.affiliateUrl, { status: 302 })
}
