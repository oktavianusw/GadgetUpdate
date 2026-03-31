import ProductCard from '@/components/ProductCard'
import AffiliateButton from '@/components/AffiliateButton'
import type { MDXComponents } from 'mdx/types'

export function getMdxComponents(refSlug?: string): MDXComponents {
  return {
    ProductCard: (props: React.ComponentProps<typeof ProductCard>) => (
      <ProductCard {...props} refSlug={refSlug} />
    ),
    AffiliateButton: (props: React.ComponentProps<typeof AffiliateButton>) => (
      <AffiliateButton {...props} refSlug={refSlug} />
    ),
  }
}
