"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, Search, ChevronDown, Calculator, Landmark, X, CreditCard } from "lucide-react"

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => { document.body.style.overflow = "unset" }
  }, [isMobileMenuOpen])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/60 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/40 transition-all duration-300">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        
        {/* Brand */}
        <div className="flex items-center gap-8 md:gap-12">
          <Link href="/" className="flex items-center space-x-2 group" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="font-sans text-2xl font-bold tracking-tighter text-foreground transition-transform duration-300 group-hover:scale-105">
              FinVault
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="relative px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground group"
            >
              Home
              {/* Active Indicator Hover Effect */}
              <span className="absolute inset-x-4 bottom-0 h-0.5 bg-primary scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 rounded-full" />
            </Link>

            {/* Premium Mega Menu (Tools) */}
            <div className="relative group">
              <button className="flex items-center gap-1.5 relative px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">
                Tools
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground/70 transition-transform duration-300 group-hover:-rotate-180" />
                <span className="absolute inset-x-4 bottom-0 h-0.5 bg-primary scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 rounded-full" />
              </button>

              {/* Mega Menu Panel Window */}
              <div className="absolute left-0 top-[100%] pt-2 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-out w-[380px]">
                <div className="border border-border/60 bg-background/95 backdrop-blur-xl p-3 rounded-2xl shadow-2xl flex flex-col gap-2 overflow-hidden ring-1 ring-black/5 dark:ring-white/10">
                  <div className="grid grid-cols-1 gap-1">
                    
                    {/* Tool Option 1 (Active) */}
                    <Link href="/tools/emi" className="flex items-start gap-4 p-3 rounded-xl transition-colors hover:bg-muted/60 group/item">
                      <div className="bg-primary/10 text-primary p-2.5 rounded-xl shadow-sm">
                        <Calculator className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-foreground group-hover/item:text-primary transition-colors">EMI Calculator</div>
                        <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">Calculate and visualize your exact loan amortization schedule.</div>
                      </div>
                    </Link>
                    
                    {/* Tool Option 2 (Active) */}
                    <Link href="/tools/loan-eligibility" className="flex items-start gap-4 p-3 rounded-xl transition-colors hover:bg-muted/60 group/item">
                      <div className="bg-primary/10 text-primary p-2.5 rounded-xl shadow-sm">
                        <Landmark className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-foreground group-hover/item:text-primary transition-colors">Loan Eligibility</div>
                        <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">Check exactly how much you can borrow instantly.</div>
                      </div>
                    </Link>

                    {/* Tool Option 3 (Active) */}
                    <Link href="/tools/credit-card" className="flex items-start gap-4 p-3 rounded-xl transition-colors hover:bg-muted/60 group/item">
                      <div className="bg-primary/10 text-primary p-2.5 rounded-xl shadow-sm">
                        <CreditCard className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-foreground group-hover/item:text-primary transition-colors">Credit Card Optimizer</div>
                        <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">Discover the fastest way to become debt-free.</div>
                      </div>
                    </Link>
                    
                  </div>
                  
                  {/* Mega Menu Footer Callout */}
                  <div className="mt-2 bg-muted/40 p-3 rounded-xl border border-border/50 flex flex-col">
                    <span className="text-xs font-semibold text-foreground">More tools coming soon.</span>
                    <span className="text-xs text-muted-foreground">We are constantly shipping new models.</span>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/blog"
              className="relative px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground group"
            >
              Blog
              <span className="absolute inset-x-4 bottom-0 h-0.5 bg-primary scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 rounded-full" />
            </Link>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 lg:gap-6">
          
          {/* Cmd+K Search Placeholder */}
          <button className="hidden lg:flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full border border-border/60 bg-muted/30 text-muted-foreground hover:bg-muted text-sm shadow-sm transition-all hover:border-border">
            <Search className="h-4 w-4 opacity-70" />
            <span className="mr-6 font-medium">Search tools...</span>
            <kbd className="hidden xl:inline-flex items-center justify-center rounded-md border border-border/60 bg-background px-1.5 py-0.5 font-sans text-xs font-semibold opacity-70 shadow-sm">
              <span className="mr-0.5">⌘</span>K
            </kbd>
          </button>

          {/* Premium Glowing CTA */}
          <Link
            href="/tools/emi"
            className="hidden md:inline-flex relative group h-10 items-center justify-center"
          >
             {/* Glow Behind Button */}
             <span className="absolute inset-0 rounded-full bg-primary blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
             {/* Main Button */}
             <span className="relative h-full flex items-center justify-center rounded-full bg-primary px-6 py-2 text-sm font-bold text-primary-foreground shadow-md transition-all duration-300 group-hover:scale-[1.02] active:scale-[0.98] ring-1 ring-black/10 dark:ring-white/10">
                Start Calculating
             </span>
          </Link>

          {/* Mobile Menu Icon */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/50 backdrop-blur-sm text-sm shadow-sm transition-all hover:bg-muted group"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5 text-foreground transition-transform group-active:scale-95" />
            ) : (
              <Menu className="h-5 w-5 text-foreground transition-transform group-active:scale-95" />
            )}
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full border-b border-border/50 bg-background/95 backdrop-blur-xl shadow-lg animate-in slide-in-from-top-2 fade-in duration-200">
          <nav className="flex flex-col p-4 gap-2">
            <Link 
              href="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 text-sm font-semibold text-foreground rounded-xl hover:bg-muted/50 transition-colors"
            >
              Home
            </Link>
            
            <div className="px-4 py-2">
              <div className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-2">Tools</div>
              <div className="flex flex-col gap-1 pl-2 border-l border-border/50">
                <Link 
                  href="/tools/emi" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-foreground rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Calculator className="h-4 w-4 text-primary" /> EMI Calculator
                </Link>
                <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground opacity-50 cursor-not-allowed">
                  <Landmark className="h-4 w-4" /> Mortgage Simulator 
                  <span className="text-[9px] uppercase font-bold tracking-widest bg-muted px-1.5 py-0.5 rounded border border-border/50 ml-auto">Soon</span>
                </div>
              </div>
            </div>

            <Link 
              href="/blog" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 text-sm font-semibold text-foreground rounded-xl hover:bg-muted/50 transition-colors"
            >
              Financial Insights
            </Link>
            
            <div className="pt-4 pb-2 px-2 mt-2 border-t border-border/50">
               <Link
                 href="/tools/emi"
                 onClick={() => setIsMobileMenuOpen(false)}
                 className="flex w-full items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-md transition-all active:scale-[0.98]"
               >
                 Start Calculating
               </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

