import Link from "next/link"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Calculator, CreditCard, Wallet, Zap, Target, Unlock, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <>
      {/* 1. HERO SECTION */}
      <Section className="relative min-h-[85vh] flex items-center overflow-hidden bg-background pt-24 pb-16 lg:pt-32">
        {/* Subtle Background Glow Elements */}
        <div className="absolute top-1/4 left-0 -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center w-full max-w-7xl mx-auto">
          {/* Left Column: Text Content */}
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 text-left">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary dark:text-primary-foreground">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              FinVault Core is live
            </div>
            
            <h1 className="heading-1 !text-5xl lg:!text-6xl xl:!text-7xl leading-[1.1] tracking-tight">
              Finance tools for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">smarter decisions.</span>
            </h1>
            
            <p className="body-text text-lg lg:text-xl max-w-xl leading-relaxed text-muted-foreground/90">
              Take control of your financial future. We provide highly accurate, lightning-fast calculators to help you optimize loans, credit cards, and investments.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <Link href="/tools/emi" className="w-full sm:w-auto">
                <Button size="lg" className="rounded-full w-full sm:w-auto shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 px-8">
                  Start Calculating <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="rounded-full w-full sm:w-auto hover:bg-muted/50 transition-colors px-8">
                Explore Tools
              </Button>
            </div>
            
            {/* Trust indicators under CTA */}
            <div className="pt-6 flex flex-wrap items-center gap-6 text-sm font-medium text-muted-foreground/80">
               <div className="flex items-center gap-2">
                 <Zap className="h-4 w-4 text-primary" /> Instant Results
               </div>
               <div className="flex items-center gap-2">
                 <Target className="h-4 w-4 text-primary" /> 100% Accurate
               </div>
               <div className="flex items-center gap-2">
                 <Unlock className="h-4 w-4 text-primary" /> Free forever
               </div>
            </div>
          </div>

          {/* Right Column: Visual Element (Mock UI) */}
          <div className="mx-auto w-full max-w-md lg:max-w-[480px] animate-in fade-in slide-in-from-right-8 duration-1000 delay-200 lg:ml-auto">
            {/* Mock Calculator Card */}
            <Card className="border-border/60 bg-background/90 backdrop-blur-3xl shadow-2xl p-6 sm:p-8 rounded-[2rem] relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -mx-4 -my-4 rounded-full pointer-events-none" />
               <div className="space-y-8 relative z-10">
                 <div className="flex items-center justify-between border-b border-border/50 pb-5">
                   <div className="flex items-center gap-3">
                     <div className="p-2.5 bg-primary/10 rounded-xl text-primary border border-primary/20">
                       <Calculator className="h-5 w-5" />
                     </div>
                     <div>
                       <h3 className="font-semibold text-foreground text-lg">EMI Calculator</h3>
                       <p className="text-xs text-muted-foreground mt-0.5">Live Preview</p>
                     </div>
                   </div>
                   <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse ring-4 ring-green-500/20" />
                 </div>
                 
                 <div className="space-y-5">
                   <div className="space-y-2">
                     <div className="flex justify-between text-sm">
                       <span className="text-muted-foreground font-medium">Loan Amount</span>
                       <span className="font-bold text-foreground">$250,000</span>
                     </div>
                     <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                       <div className="w-[45%] h-full bg-primary rounded-full relative">
                         <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow border border-border transform translate-x-1" />
                       </div>
                     </div>
                   </div>
                   
                   <div className="space-y-2">
                     <div className="flex justify-between text-sm">
                       <span className="text-muted-foreground font-medium">Tenure</span>
                       <span className="font-bold text-foreground">15 Years</span>
                     </div>
                     <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                       <div className="w-[60%] h-full bg-primary/80 rounded-full relative">
                         <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow border border-border transform translate-x-1" />
                       </div>
                     </div>
                   </div>
                 </div>

                 <div className="space-y-4">
                   <div className="bg-primary/5 rounded-xl p-5 border border-primary/10 relative overflow-hidden group hover:bg-primary/10 transition-colors duration-300">
                     <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1.5">Monthly EMI</p>
                     <p className="text-3xl font-bold tracking-tight text-foreground">$2,177.77</p>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1">Total Interest</p>
                        <p className="text-lg font-bold text-foreground">$142,000</p>
                      </div>
                      <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1">Total Payment</p>
                        <p className="text-lg font-bold text-foreground">$392,000</p>
                      </div>
                   </div>
                 </div>
               </div>
            </Card>
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
