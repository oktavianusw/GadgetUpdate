import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { cache } from 'react'
import type { PostFrontmatter, PostMeta } from '@/types'

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

export const getPostBySlug = cache(
  (slug: string): { frontmatter: PostFrontmatter; content: string } | null => {
    const filePath = path.join(POSTS_DIR, `${slug}.mdx`)
    if (!fs.existsSync(filePath)) return null
    const raw = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(raw)
    return {
      frontmatter: data as PostFrontmatter,
      content,
    }
  }
)

export function getAllPostsMeta(): PostMeta[] {
  return getPostSlugs()
    .map((slug) => {
      const post = getPostBySlug(slug)
      if (!post) return null
      const rt = readingTime(post.content)
      return {
        ...post.frontmatter,
        slug,
        readingTime: rt.text,
      } as PostMeta
    })
    .filter((p): p is PostMeta => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getFeaturedPosts(): PostMeta[] {
  return getAllPostsMeta().filter((p) => p.featured)
}

export function extractHeadings(
  content: string
): { id: string; text: string; level: number }[] {
  const regex = /^(#{2,3})\s+(.+)$/gm
  const headings: { id: string; text: string; level: number }[] = []
  let match: RegExpExecArray | null
  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
    headings.push({ id, text, level })
  }
  return headings
}
