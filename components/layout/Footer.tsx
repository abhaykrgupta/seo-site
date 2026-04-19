"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-border overflow-hidden">
      {/* Background Glow Effect matching FinVault aesthetic */}
      <div className="absolute inset-0 bg-background pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />
      
      <div className="container relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5 xl:gap-16">
          
          {/* Brand & Description */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Link href="/" className="inline-block group w-fit">
              <span className="font-sans text-3xl font-extrabold tracking-tighter text-foreground transition-transform duration-300 group-hover:scale-105">
                FinVault
              </span>
            </Link>
            <p className="max-w-xs text-base leading-relaxed text-muted-foreground">
              A premium fintech foundation providing lightning-fast calculators and educational insights. Control your financial future.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="p-2.5 rounded-xl bg-muted/50 border border-border/50 text-muted-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-all duration-300 group">
                <svg className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span className="sr-only">X (Twitter)</span>
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-muted/50 border border-border/50 text-muted-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-all duration-300 group">
                <svg className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-muted/50 border border-border/50 text-muted-foreground hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all duration-300 group">
                <svg className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" clipRule="evenodd" />
                </svg>
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-5">
            <h3 className="text-xs font-bold tracking-widest uppercase text-foreground">Quick Links</h3>
            <nav className="flex flex-col gap-3">
              <Link href="/" className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:text-primary">
                Home
              </Link>
              <Link href="/tools/emi" className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:text-primary">
                Calculators
              </Link>
              <Link href="/blog" className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:text-primary">
                Financial Insights
              </Link>
              <Link href="/about" className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:text-primary">
                About Us
              </Link>
              <Link href="/contact" className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:text-primary">
                Contact
              </Link>
            </nav>
          </div>

          {/* Legal Links (Terms removed as requested) */}
          <div className="flex flex-col gap-5">
            <h3 className="text-xs font-bold tracking-widest uppercase text-foreground">Legal</h3>
            <nav className="flex flex-col gap-3">
              <Link href="/privacy-policy" className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/disclaimer" className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:text-primary">
                Disclaimer
              </Link>
            </nav>
          </div>

          {/* Newsletter UI */}
          <div className="lg:col-span-1 xl:col-span-1 flex flex-col gap-5">
            <h3 className="text-xs font-bold tracking-widest uppercase text-foreground">Newsletter</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Get weekly financial strategies and calculator updates sent directly to your inbox.
            </p>
            <form className="mt-2 flex flex-col gap-3 sm:flex-row lg:flex-col" onSubmit={(e) => e.preventDefault()}>
              <Input 
                type="email" 
                placeholder="Enter your email..." 
                className="bg-background/50 backdrop-blur-sm border-border hover:border-primary/50 focus-visible:ring-primary/20 h-11"
                required
              />
              <Button type="submit" className="h-11 shadow-sm group">
                Subscribe <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm font-medium text-muted-foreground">
            © {new Date().getFullYear()} FinVault Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             All Systems Operational
          </div>
        </div>
      </div>
    </footer>
  )
}

