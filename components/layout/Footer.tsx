"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, ShieldCheck, CheckCircle2, Loader2, AlertCircle } from "lucide-react"

export function Footer() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMessage("")

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Something went wrong.")
      setStatus("success")
      setEmail("")
    } catch (err: any) {
      setStatus("error")
      setErrorMessage(err.message || "Something went wrong. Please try again.")
    }
  }

  return (
    <footer className="relative mt-20 border-t border-border/50 overflow-hidden bg-background/50">
      <div className="absolute inset-0 bg-background pointer-events-none" />
      <div className="absolute top-0 left-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-8 lg:px-8">

        {/* Top Banner */}
        <div className="flex flex-col items-center justify-center mb-20 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20">
            <ShieldCheck className="w-4 h-4" /> No data collected. Calculations run locally.
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground max-w-2xl">
            Free financial tools for smarter money decisions.
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 xl:gap-16 border-t border-border/50 pt-16">

          {/* Brand */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Link href="/" className="inline-block group w-fit">
              <span className="font-sans text-3xl font-extrabold tracking-tighter text-foreground transition-transform duration-300 group-hover:scale-105">
                FinVault
              </span>
            </Link>
            <p className="text-base leading-relaxed text-muted-foreground pr-4">
              Free financial calculators and educational guides. Your data never leaves your browser.
              No accounts, no tracking, no paywalls.
            </p>
          </div>

          {/* Platform Links */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h3 className="text-xs font-bold tracking-widest uppercase text-foreground">Platform</h3>
            <nav className="flex flex-col gap-4">
              <Link href="/" className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:text-primary">
                Home
              </Link>
              <Link href="/tools/emi" className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:text-primary">
                EMI Calculator
              </Link>
              <Link href="/tools/credit-card" className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:text-primary">
                Credit Card Optimizer
              </Link>
              <Link href="/tools/loan-eligibility" className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:text-primary">
                Loan Eligibility
              </Link>
              <Link href="/blog" className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:text-primary">
                Financial Insights
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h3 className="text-xs font-bold tracking-widest uppercase text-foreground">Legal &amp; Trust</h3>
            <nav className="flex flex-col gap-4">
              <Link href="/about" className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:text-primary">
                About Us
              </Link>
              <Link href="/contact" className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:text-primary">
                Contact
              </Link>
              <Link href="/privacy-policy" className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:text-primary">
                Terms of Service
              </Link>
              <Link href="/disclaimer" className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:text-primary">
                Disclaimer
              </Link>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <h3 className="text-xs font-bold tracking-widest uppercase text-foreground">Weekly Finance Tips</h3>
            <div className="p-1">
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Every Sunday — budgeting strategies, calculator guides, and money tips. No spam, ever.
              </p>

              {status === "success" ? (
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-medium text-sm">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>You&apos;re subscribed. Check your inbox Sunday.</span>
                </div>
              ) : (
                <form
                  className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row"
                  onSubmit={handleSubscribe}
                >
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="bg-background/80 backdrop-blur-xl border-border/80 hover:border-primary/50 focus-visible:ring-primary/20 h-11 shadow-sm transition-colors"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "loading"}
                  />
                  <Button
                    type="submit"
                    disabled={status === "loading"}
                    className="h-11 shadow-sm group whitespace-nowrap min-w-[120px] transition-all duration-300"
                  >
                    {status === "loading" ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        Subscribe{" "}
                        <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </form>
              )}

              {status === "error" && (
                <div className="mt-2 flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border/40 pt-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm font-medium text-muted-foreground/80">
            © {new Date().getFullYear()} FinVault. An independent financial education resource.
          </p>
          <p className="text-xs text-muted-foreground/60 text-center md:text-right max-w-sm">
            For informational purposes only. Not financial advice. Always consult a qualified advisor
            before making financial decisions.
          </p>
        </div>
      </div>
    </footer>
  )
}
