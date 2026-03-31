export type Category =
  | 'peripheral'
  | 'laptop'
  | 'smartphone'
  | 'aksesori'
  | 'desk-setup'

export interface Product {
  name: string
  slug: string
  price: number
  originalPrice?: number
  rating: number
  image: string
  affiliateUrl: string
}

export interface PostFrontmatter {
  title: string
  date: string
  category: Category
  excerpt: string
  featured: boolean
  coverImage: string
  products: Product[]
}

export interface PostMeta extends PostFrontmatter {
  slug: string
  readingTime: string
}

export interface Deal extends Product {
  category: Category
  validUntil?: string
}
