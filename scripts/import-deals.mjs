import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const csvPath = path.join(__dirname, '../scrapping/data/shopee-co-id-2026-03-31 (1).csv')
const outPath = path.join(__dirname, '../content/deals.json')

function parseCSVLine(str) {
  const result = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < str.length; i++) {
    const char = str[i]
    if (char === '"' && str[i + 1] === '"') {
      current += '"'
      i++ // Skip escaped quote
    } else if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      result.push(current)
      current = ''
    } else {
      current += char
    }
  }
  result.push(current)
  return result
}

function cleanPrice(str) {
  if (!str) return undefined
  // Rp5.699.000 -> 5699000
  const match = str.match(/(?:Rp)?([\d.]+)/)
  if (!match) return undefined
  const num = parseInt(match[1].replace(/\./g, ''), 10)
  return isNaN(num) ? undefined : num
}

function cleanImage(str) {
  // Remove @resize_... if present
  return str.split('@')[0]
}

function determineCategory(name) {
  const n = name.toLowerCase()
  if (n.includes('iphone') || n.includes('samsung galaxy') || n.includes('vivo') || n.includes('oppo') || n.includes('xiaomi') || n.includes('infinix') || n.includes('poco') || n.includes('motorola')) {
    return 'smartphone'
  }
  if (n.includes('laptop') || n.includes('macbook')) return 'laptop'
  if (n.includes('tablet') || n.includes('ipad') || n.includes('pad')) return 'smartphone' // or tablet, assuming smartphone for now
  if (n.includes('mouse') || n.includes('keyboard')) return 'peripheral'
  return 'aksesori'
}

function main() {
  const csvText = fs.readFileSync(csvPath, 'utf8')
  // Split by newline taking quotes into account (or just standard split and stitch if newline in quotes, but assuming simple single line rows here)
  const lines = csvText.split(/\r?\n/).filter((l) => l.trim().length > 0)
  
  const headers = parseCSVLine(lines[0])
  const headerMap = {}
  headers.forEach((h, i) => { headerMap[h.trim()] = i })

  const deals = []

  for (let i = 1; i < lines.length; i++) {
    const cols = parseCSVLine(lines[i])
    if (cols.length < headers.length) continue

    const name = cols[headerMap['name']] || cols[headerMap['product_name']]
    if (!name) continue
    
    // Some lines have weird product_price like "Rp5.699.000Rp4.748.000"
    // The columns have "discounted_price" and "original_price"
    const priceStr = cols[headerMap['discounted_price']] || cols[headerMap['phone']] // some phone columns have price
    const origStr = cols[headerMap['original_price']]

    const price = cleanPrice(priceStr)
    const originalPrice = cleanPrice(origStr)
    const rating = parseFloat(cols[headerMap['ratingvalue']] || cols[headerMap['rating']] || '0')
    const image = cleanImage(cols[headerMap['image']])
    
    // Parse shopid and itemid from item_page_link to make Affiliate URL
    const linkStr = cols[headerMap['item_page_link']] || ''
    let affiliateUrl = linkStr
    const matchShop = linkStr.match(/shopid=(\d+)/)
    const matchItem = linkStr.match(/itemid=(\d+)/)
    
    let slug = `deal-${i}`
    if (matchShop && matchItem) {
      const shopid = matchShop[1]
      const itemid = matchItem[1]
      affiliateUrl = `https://shopee.co.id/product/${shopid}/${itemid}`
      slug = `shopee-${itemid}`
    }

    if (!price) continue

    deals.push({
      slug,
      name: name.trim(),
      price,
      originalPrice: (originalPrice && originalPrice > price) ? originalPrice : undefined,
      rating: isNaN(rating) ? 0 : rating,
      image,
      affiliateUrl,
      category: determineCategory(name),
      // Valid for next 7 days as an example
      validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    })
  }

  // Save to deals.json
  fs.writeFileSync(outPath, JSON.stringify(deals, null, 2))
  console.log(`Berhasil mengonversi ${deals.length} produk menjadi deals.json!`)
}

main()
