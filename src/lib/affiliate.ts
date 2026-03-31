export function getAffiliateUrl(productSlug: string, refSlug?: string): string {
  const url = `/go/${productSlug}`
  return refSlug ? `${url}?ref=${refSlug}` : url
}
