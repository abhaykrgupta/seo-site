"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, ShieldCheck } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border/50 overflow-hidden bg-background/50">
      {/* Premium Background Glow Effect */}
      <div className="absolute inset-0 bg-background pointer-events-none" />
      <div className="absolute top-0 left-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      
      <div className="container relative z-10 mx-auto max-w-7xl px-6 pt-20 pb-12 lg:px-8">
        
        {/* Top Trust Banner */}
        <div className="flex flex-col items-center justify-center mb-20 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20">
            <ShieldCheck className="w-4 h-4" /> Trusted Analytics
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground max-w-2xl">
            Join thousands of smart investors using FinVault to plan their future.
          </h2>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 xl:gap-16 border-t border-border/50 pt-16">
          
          {/* Brand & Description (Col 1-4) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Link href="/" className="inline-block group w-fit">
              <span className="font-sans text-3xl font-extrabold tracking-tighter text-foreground transition-transform duration-300 group-hover:scale-105">
                FinVault
              </span>
            </Link>
            <p className="text-base leading-relaxed text-muted-foreground pr-4">
              A premium fintech foundation providing lightning-fast calculators and educational insights. Control your financial future without compromising on design.
            </p>
            <div className="flex items-center gap-3 pt-4">
              <a href="#" className="p-2.5 rounded-full bg-muted/30 border border-border/50 text-muted-foreground hover:bg-muted hover:text-foreground hover:border-border transition-all duration-300 group">
                <svg className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span className="sr-only">X (Twitter)</span>
              </a>
              <a href="#" className="p-2.5 rounded-full bg-muted/30 border border-border/50 text-muted-foreground hover:bg-[#0A66C2]/10 hover:text-[#0A66C2] hover:border-[#0A66C2]/30 transition-all duration-300 group">
                <svg className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="p-2.5 rounded-full bg-muted/30 border border-border/50 text-muted-foreground hover:bg-[#FF0000]/10 hover:text-[#FF0000] hover:border-[#FF0000]/30 transition-all duration-300 group">
                <svg className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" clipRule="evenodd" />
                </svg>
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>

          {/* Quick Links (Col 5-6) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h3 className="text-xs font-bold tracking-widest uppercase text-foreground">Platform</h3>
            <nav className="flex flex-col gap-4">
              <Link href="/" className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:text-primary">
                Home
              </Link>
              <Link href="/tools/emi" className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:text-primary">
                Calculators
              </Link>
              <Link href="/blog" className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:text-primary">
                Financial Insights
              </Link>
            </nav>
          </div>

          {/* Legal Links (Col 7-8) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h3 className="text-xs font-bold tracking-widest uppercase text-foreground">Legal & Trust</h3>
            <nav className="flex flex-col gap-4">
              <Link href="/about" className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:text-primary">
                About Us
              </Link>
              <Link href="/contact" className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:text-primary">
                Contact Support
              </Link>
              <Link href="/privacy-policy" className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/disclaimer" className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:text-primary">
                Disclaimer
              </Link>
            </nav>
          </div>

          {/* Newsletter UI (Col 9-12) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <h3 className="text-xs font-bold tracking-widest uppercase text-foreground">Stay Ahead</h3>
            <div className="p-1">
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Join <strong className="text-foreground">12,400+</strong> subscribers getting exclusive financial strategies and calculator updates sent directly to their inbox.
              </p>
              <form className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row" onSubmit={(e) => e.preventDefault()}>
                <Input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="bg-background/80 backdrop-blur-xl border-border/80 hover:border-primary/50 focus-visible:ring-primary/20 h-11 shadow-sm"
                  required
                />
                <Button type="submit" className="h-11 shadow-sm group whitespace-nowrap">
                  Subscribe <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-20 border-t border-border/40 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm font-medium text-muted-foreground/80">
            © {new Date().getFullYear()} FinVault Inc. Designed for mathematical precision.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground/80 px-3 py-1 rounded-full bg-muted/30 border border-border/40 object-contain">
             <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
             </span>
             <span className="ml-1 font-medium">All Systems Live</span>
          </div>
        </div>
      </div>
    </footer>
  )
}


