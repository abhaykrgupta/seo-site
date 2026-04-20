"use client"

import { useEffect, useState } from "react"
import { TOCHeader } from "@/lib/blog"
import { cn } from "@/lib/utils"

interface TableOfContentsProps {
  items: TOCHeader[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const observers = new Map()

    const callback = (entries: IntersectionObserverEntry[]) => {
      // Find the first entry that is intersecting
      const intersectingEntry = entries.find((entry) => entry.isIntersecting)
      if (intersectingEntry) {
        setActiveId(intersectingEntry.target.id)
      }
    }

    const observer = new IntersectionObserver(callback, {
      rootMargin: "-80px 0% -80% 0%",
      threshold: 1.0,
    })

    items.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) {
        observer.observe(element)
        observers.set(item.id, element)
      }
    })

    return () => {
      observers.forEach((element) => observer.unobserve(element))
    }
  }, [items])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const offset = 100 // Navbar height + buffer
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
      
      // Manually set active if smooth scroll doesn't trigger observer immediately
      setActiveId(id)
      window.history.pushState(null, "", `#${id}`)
    }
  }

  if (items.length === 0) return null

  return (
    <nav className="space-y-4">
      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        On this page
      </p>
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            className={cn(
              "text-sm transition-all duration-200",
              item.level === 3 && "pl-4"
            )}
          >
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={cn(
                "block py-1 border-l-2 pl-4 -ml-px transition-colors duration-200",
                activeId === item.id
                  ? "border-primary text-primary font-medium"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
