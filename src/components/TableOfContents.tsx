'use client'

import { useEffect, useState } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0% -60% 0%' }
    )

    const elements = headings.map((h) => document.getElementById(h.id)).filter(Boolean)
    elements.forEach((el) => observer.observe(el!))
    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav className="sticky top-24 text-sm space-y-2 lg:pl-4">
      <p className="font-bold text-white mb-4 text-xs uppercase tracking-widest">Daftar Isi</p>
      {headings.map((h) => (
        <a
          key={h.id}
          href={`#${h.id}`}
          className={`block py-1.5 border-l-2 transition-all duration-200 ${
            h.level === 3 ? 'pl-6 text-xs' : 'pl-4'
          } ${
            activeId === h.id
              ? 'border-primary-500 text-primary-400 font-medium'
              : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:border-zinc-700'
          }`}
        >
          {h.text}
        </a>
      ))}
    </nav>
  )
}
