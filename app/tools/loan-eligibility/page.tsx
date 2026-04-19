import { Metadata } from "next"
import { Section } from "@/components/ui/section"
import { LoanEligibility } from "@/components/calculators/LoanEligibility"

export const metadata: Metadata = {
  title: "Loan Eligibility Checker | FinVault",
  description: "Check your maximum loan borrowing capacity based on your income, existing debts, and banks' lending criteria.",
}

export default function LoanEligibilityPage() {
  return (
    <Section className="pt-8 pb-16 lg:pt-12">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-12">
          <h1 className="heading-1 !text-5xl lg:!text-6xl mb-6">Loan <span className="text-primary">Eligibility</span> Checker</h1>
          <p className="body-text text-xl text-muted-foreground leading-relaxed">
            Stop the guesswork. Use our institutional-grade engine to find out exactly how much a bank is likely to lend you based on your current financial profile.
          </p>
        </div>
        
        <LoanEligibility />
        
        <div className="mt-16 bg-muted/30 rounded-3xl p-8 md:p-12 border border-border/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-6">
               <h3 className="text-2xl font-bold italic">What is FOIR?</h3>
               <p className="text-muted-foreground leading-relaxed">
                 Fixed Obligation to Income Ratio (FOIR) is the primary metric banks use to decide your eligibility. Ideally, your total monthly debt payments (including the new loan) should not exceed 50% of your net take-home pay.
               </p>
               <div className="p-4 bg-background rounded-xl border border-border/50 font-mono text-sm">
                 FOIR = (Total Monthly Debts / Monthly Salary) × 100
               </div>
            </div>
            <div className="space-y-6">
               <h3 className="text-2xl font-bold italic">Why Check Before Applying?</h3>
               <p className="text-muted-foreground leading-relaxed">
                 Every time you apply for a loan and get rejected, your credit score takes a small hit. By checking your eligibility first, you can apply only when you're confident, protecting your score for the long term.
               </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
