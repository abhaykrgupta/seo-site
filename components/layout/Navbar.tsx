import Link from "next/link"
import { Menu } from "lucide-react"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl transition-all duration-300">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <div className="flex items-center gap-8 md:gap-12">
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="font-sans text-2xl font-bold tracking-tighter text-foreground transition-transform duration-300 group-hover:scale-105">
              FinVault
            </span>
          </Link>
          <nav className="hidden md:flex gap-8">
            <Link
              href="/"
              className="text-sm font-semibold text-foreground transition-all duration-200 hover:-translate-y-0.5"
            >
              Home
            </Link>
            <Link
              href="/tools"
              className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:text-foreground"
            >
              Tools
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:text-foreground"
            >
              Blog
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/calculate"
            className="hidden md:inline-flex h-10 items-center justify-center rounded-full bg-primary px-6 py-2 text-sm font-medium text-primary-foreground shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-[0.98]"
          >
            Start Calculating
          </Link>
          <button className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background px-0 py-2 text-sm font-medium shadow-sm transition-all duration-200 hover:bg-muted hover:text-foreground">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>
      </div>
    </header>
  )
}
