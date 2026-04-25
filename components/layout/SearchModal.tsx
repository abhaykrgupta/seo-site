"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  Calculator,
  CreditCard,
  Wallet,
  BookOpen,
  ArrowRight,
  X,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import type { SearchPost } from "@/app/api/search/route"

// ─── Static calculator entries (always available) ─────────────────────────

const CALCULATORS = [
  {
    href: "/tools/emi",
    Icon: Calculator,
    title: "EMI Calculator",
    desc: "Calculate monthly loan installments and amortization",
  },
  {
    href: "/tools/credit-card",
    Icon: CreditCard,
    title: "Credit Card Optimizer",
    desc: "Find the fastest way to pay off your credit card debt",
  },
  {
    href: "/tools/loan-eligibility",
    Icon: Wallet,
    title: "Loan Eligibility Checker",
    desc: "Check how much you can borrow based on your income",
  },
]

// ─── Props ────────────────────────────────────────────────────────────────

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

// ─── Component ────────────────────────────────────────────────────────────

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchPost[]>([])
  const [loading, setLoading] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Reset state and focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery("")
      setResults([])
      setActiveIndex(0)
      setLoading(false)
      // slight delay so the DOM is painted before focusing
      const t = setTimeout(() => inputRef.current?.focus(), 60)
      return () => clearTimeout(t)
    }
  }, [isOpen])

  // Debounced search
  useEffect(() => {
    if (!query.trim() || query.trim().length < 2) {
      setResults([])
      setLoading(false)
      return
    }

    setLoading(true)
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(query.trim())}`
        )
        const data = await res.json()
        setResults(data.posts ?? [])
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 220)

    return () => clearTimeout(timer)
  }, [query])

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(0)
  }, [results, query])

  // Filter calculators client-side when there's a query
  const filteredCalculators = query.trim()
    ? CALCULATORS.filter(
        (c) =>
          c.title.toLowerCase().includes(query.toLowerCase()) ||
          c.desc.toLowerCase().includes(query.toLowerCase())
      )
    : CALCULATORS

  // Flat list used for keyboard navigation
  const allItems = [
    ...filteredCalculators.map((c) => c.href),
    ...results.map((r) => `/blog/${r.slug}`),
  ]

  // Keyboard: ESC, ArrowUp, ArrowDown, Enter
  useEffect(() => {
    if (!isOpen) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
        return
      }
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setActiveIndex((i) => Math.min(i + 1, allItems.length - 1))
        return
      }
      if (e.key === "ArrowUp") {
        e.preventDefault()
        setActiveIndex((i) => Math.max(i - 1, 0))
        return
      }
      if (e.key === "Enter" && allItems[activeIndex]) {
        router.push(allItems[activeIndex])
        onClose()
      }
    }

    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isOpen, allItems, activeIndex, router, onClose])

  if (!isOpen) return null

  const showEmpty =
    query.trim().length >= 2 &&
    !loading &&
    results.length === 0 &&
    filteredCalculators.length === 0

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[99] bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        className="fixed inset-x-4 top-20 z-[100] mx-auto max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rounded-2xl border border-border bg-background shadow-2xl overflow-hidden">

          {/* Input row */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border">
            {loading ? (
              <Loader2 className="h-5 w-5 text-muted-foreground animate-spin shrink-0" />
            ) : (
              <Search className="h-5 w-5 text-muted-foreground shrink-0" />
            )}
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search calculators and guides..."
              className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground outline-none"
              autoComplete="off"
              spellCheck={false}
            />
            {query ? (
              <button
                onClick={() => {
                  setQuery("")
                  inputRef.current?.focus()
                }}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            ) : (
              <kbd className="hidden sm:flex items-center text-xs text-muted-foreground border border-border rounded px-1.5 py-0.5 font-mono">
                ESC
              </kbd>
            )}
          </div>

          {/* Results */}
          <div className="max-h-[420px] overflow-y-auto overscroll-contain py-2">

            {/* Calculators section */}
            {filteredCalculators.length > 0 && (
              <div>
                <p className="px-4 pt-2 pb-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Calculators
                </p>
                {filteredCalculators.map((calc, i) => {
                  const isActive = activeIndex === i
                  return (
                    <Link
                      key={calc.href}
                      href={calc.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 transition-colors cursor-pointer",
                        isActive ? "bg-muted" : "hover:bg-muted/60"
                      )}
                    >
                      <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <calc.Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground">
                          {calc.title}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {calc.desc}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground/50 shrink-0" />
                    </Link>
                  )
                })}
              </div>
            )}

            {/* Articles section */}
            {results.length > 0 && (
              <div>
                <p className="px-4 pt-3 pb-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Articles
                </p>
                {results.map((post, i) => {
                  const isActive = activeIndex === filteredCalculators.length + i
                  return (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 transition-colors cursor-pointer",
                        isActive ? "bg-muted" : "hover:bg-muted/60"
                      )}
                    >
                      <div className="h-9 w-9 rounded-xl bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                        <BookOpen className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground line-clamp-1">
                          {post.title}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {post.excerpt}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap">
                        {post.category}
                      </span>
                    </Link>
                  )
                })}
              </div>
            )}

            {/* No results */}
            {showEmpty && (
              <div className="px-4 py-10 text-center">
                <p className="text-sm text-muted-foreground">
                  No results for &ldquo;{query}&rdquo;
                </p>
              </div>
            )}

            {/* Default hint */}
            {!query.trim() && (
              <p className="px-4 py-3 text-xs text-muted-foreground">
                Type at least 2 characters to search
              </p>
            )}

          </div>

          {/* Footer hint */}
          <div className="border-t border-border px-4 py-2 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <kbd className="border border-border rounded px-1 py-0.5 font-mono text-[11px]">↑</kbd>
              <kbd className="border border-border rounded px-1 py-0.5 font-mono text-[11px]">↓</kbd>
              navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="border border-border rounded px-1 py-0.5 font-mono text-[11px]">↵</kbd>
              open
            </span>
            <span className="flex items-center gap-1">
              <kbd className="border border-border rounded px-1 py-0.5 font-mono text-[11px]">ESC</kbd>
              close
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
