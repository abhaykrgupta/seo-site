import Link from "next/link"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Calculator, CreditCard, Wallet, Zap, Target, Unlock, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <>
      {/* 1. HERO SECTION */}
      <Section className="relative flex flex-col items-center justify-center text-center min-h-[75vh] overflow-hidden bg-background">
        {/* Subtle Background Glow Elements */}
        <div className="absolute top-0 -translate-y-12 h-96 w-full max-w-4xl bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="mx-auto inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary dark:text-primary-foreground">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            Welcome to FinVault
          </div>
          
          <h1 className="heading-1">
            Finance tools for <br />
            smarter decisions.
          </h1>
          
          <p className="body-text max-w-2xl mx-auto">
            Take control of your financial future. We provide accurate, lightning-fast calculators to help you optimize loans, credit cards, and everyday investments.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="rounded-full w-full sm:w-auto shadow-md">
              Start Calculating <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="rounded-full w-full sm:w-auto">
              Explore Tools
            </Button>
          </div>
        </div>
      </Section>

      {/* 2. TOOLS SECTION */}
      <Section className="bg-muted/30">
        <div className="text-center mb-16">
          <h2 className="heading-2 mb-4">Powerful Financial Calculators</h2>
          <p className="body-text max-w-2xl mx-auto">
            Everything you need to forecast your finances in one place. No sign-ups required.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="flex flex-col border-border/50 bg-background/50 backdrop-blur-sm group hover:-translate-y-1 transition-all duration-300">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 transition-transform group-hover:scale-110 duration-300">
                <Calculator className="w-6 h-6" />
              </div>
              <CardTitle className="text-xl">EMI Calculator</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <CardDescription className="text-base text-muted-foreground leading-relaxed">
                Plan your loans effectively. Instantly calculate your monthly EMI, total interest payable, and amortization schedule.
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Link href="/tools/emi" className="text-sm font-semibold text-primary flex items-center hover:opacity-80">
                Use Calculator <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>

          <Card className="flex flex-col border-border/50 bg-background/50 backdrop-blur-sm group hover:-translate-y-1 transition-all duration-300">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 transition-transform group-hover:scale-110 duration-300">
                <CreditCard className="w-6 h-6" />
              </div>
              <CardTitle className="text-xl">Credit Card Optimizer</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <CardDescription className="text-base text-muted-foreground leading-relaxed">
                Find out exactly how long it will take to pay off your credit card debt, and discover the smartest payoff strategy.
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Link href="/tools/credit-card" className="text-sm font-semibold text-primary flex items-center hover:opacity-80">
                Optimize Now <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>

          <Card className="flex flex-col border-border/50 bg-background/50 backdrop-blur-sm group hover:-translate-y-1 transition-all duration-300">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 transition-transform group-hover:scale-110 duration-300">
                <Wallet className="w-6 h-6" />
              </div>
              <CardTitle className="text-xl">Loan Eligibility Checker</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <CardDescription className="text-base text-muted-foreground leading-relaxed">
                Check exactly how much you can borrow based on your income, obligations, and credit variables instantly.
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Link href="/tools/loan-checker" className="text-sm font-semibold text-primary flex items-center hover:opacity-80">
                Check Eligibility <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>
        </div>
      </Section>

      {/* 3. TRUST SECTION */}
      <Section>
        <div className="text-center mb-16">
          <h2 className="heading-2 mb-4">Why choose FinVault?</h2>
          <p className="body-text max-w-2xl mx-auto">
            We built this platform to simplify complex financial math into actionable UI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-2">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="heading-3">Lightning Fast</h3>
            <p className="body-text text-base">
              Calculations are executed client-side instantly. No waiting on slow servers or refreshing pages to get your financial numbers.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-2">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="heading-3">Highly Accurate</h3>
            <p className="body-text text-base">
              Rigorously tested to match standard banking formulas. Your amortizations and interest metrics are mathematically precise.
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-2">
              <Unlock className="w-8 h-8" />
            </div>
            <h3 className="heading-3">100% Free Tools</h3>
            <p className="body-text text-base">
              No paywalls, no hidden newsletter traps. Just un-gated access to premium calculators built for the everyday user.
            </p>
          </div>
        </div>
      </Section>

      {/* 4. BLOG PREVIEW SECTION */}
      <Section className="border-t border-border bg-background">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="heading-2 mb-4">Financial Insights</h2>
            <p className="body-text">
              Learn the strategies that help you maximize your financial leverage.
            </p>
          </div>
          <Button variant="outline" className="hidden md:inline-flex rounded-full">
            Read all articles
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "The 50/30/20 Rule: A Practical Guide to Budgeting",
              date: "April 12, 2026",
              category: "Personal Finance",
              excerpt: "Discover how to segment your income seamlessly without feeling financially restricted."
            },
            {
              title: "How Compound Interest Accelerates Wealth",
              date: "April 08, 2026",
              category: "Investing",
              excerpt: "A deep dive into why starting 5 years earlier matters more than saving 5x as much."
            },
            {
              title: "Understanding Fixed vs. Variable Rate Mortgages",
              date: "April 02, 2026",
              category: "Real Estate",
              excerpt: "Which mortgage structure protects you best in modern, fluctuating rate environments?"
            }
          ].map((post, i) => (
            <Link href="#" key={i} className="group block h-full">
              <Card className="h-full border-transparent bg-muted/40 shadow-none hover:bg-muted/80 hover:shadow-sm transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-muted-foreground">
                    {post.excerpt}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" className="rounded-full w-full">
            Read all articles
          </Button>
        </div>
      </Section>
    </>
  )
}
