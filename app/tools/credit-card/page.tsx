import { Metadata } from "next"
import { Section } from "@/components/ui/section"
import { CreditCardOptimizer } from "@/components/calculators/CreditCardOptimizer"

export const metadata: Metadata = {
  title: "Credit Card Payoff Optimizer | FinVault",
  description: "Calculate exactly how long it will take to pay off your credit card debt, see interest costs, and discover payoff strategies.",
}

export default function CreditCardPage() {
  return (
    <Section className="pt-8 pb-16 lg:pt-12">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-12">
          <h1 className="heading-1 !text-5xl lg:!text-6xl mb-6">Credit Card <span className="text-primary">Optimizer</span></h1>
          <p className="body-text text-xl text-muted-foreground leading-relaxed">
            Take control of your debt. Calculate your payoff timeline, visualize your total interest costs, and discover how to become debt-free faster.
          </p>
        </div>
        
        <CreditCardOptimizer />
        
        {/* Informational SEO Content Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-border/50 pt-16">
          <div className="space-y-4">
             <h3 className="text-xl font-bold">Understand APR</h3>
             <p className="text-sm text-muted-foreground leading-relaxed">
               Your Annual Percentage Rate (APR) is the yearly cost of borrowing. Because credit cards compound daily, the actual interest you pay is often higher than the nominal rate.
             </p>
          </div>
          <div className="space-y-4">
             <h3 className="text-xl font-bold">The Minimum Payment Trap</h3>
             <p className="text-sm text-muted-foreground leading-relaxed">
               Paying only the minimum amount each month is designed to keep you in debt for decades. Even a $20 increase in your monthly payment can save you thousands in interest.
             </p>
          </div>
          <div className="space-y-4">
             <h3 className="text-xl font-bold">Snowball vs Avalanche</h3>
             <p className="text-sm text-muted-foreground leading-relaxed">
               The Avalanche method prioritizes paying off high-interest cards first, while the Snowball method focuses on the smallest balances for psychological wins.
             </p>
          </div>
        </div>
      </div>
    </Section>
  )
}
