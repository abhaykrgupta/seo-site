import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background pt-16 pb-8">
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:gap-16">
          <div className="flex flex-col gap-4 md:col-span-2">
            <span className="font-sans text-2xl font-bold tracking-tighter text-foreground">
              FinVault
            </span>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              A premium, production-grade fintech foundation built for modern SaaS applications. Fast, secure, and beautiful by default.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold tracking-wide uppercase text-foreground">Platform</h3>
            <Link href="/" className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:text-foreground">
              Home
            </Link>
            <Link href="/tools" className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:text-foreground">
              Tools
            </Link>
            <Link href="/blog" className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:text-foreground">
              Blog
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold tracking-wide uppercase text-foreground">Legal</h3>
            <Link href="/privacy" className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
        <div className="mt-16 border-t border-border/60 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} FinVault Inc. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex gap-6">
             <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
               <span className="sr-only">Twitter</span>
               <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
             </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

