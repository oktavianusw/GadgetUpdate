import fs from 'fs'
import path from 'path'
import { getAllPostsMeta } from './posts'
import type { Deal, Product } from '@/types'

const DEALS_PATH = path.join(process.cwd(), 'content', 'deals.json')

function loadDealsFile(): Deal[] {
  if (!fs.existsSync(DEALS_PATH)) return []
  try {
    return JSON.parse(fs.readFileSync(DEALS_PATH, 'utf8')) as Deal[]
  } catch {
    return []
  }
}

export function getAllProducts(): Map<string, Product> {
  const map = new Map<string, Product>()

  // From MDX frontmatters
  const posts = getAllPostsMeta()
  for (const post of posts) {
    for (const product of post.products ?? []) {
      map.set(product.slug, product)
    }
  }

  // From deals.json
  for (const deal of loadDealsFile()) {
    map.set(deal.slug, deal)
  }

  return map
}

export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().get(slug)
}

export function getDeals(): Deal[] {
  const now = new Date()
  return loadDealsFile().filter((deal) => {
    if (!deal.validUntil) return true
    return new Date(deal.validUntil) > now
  })
}
