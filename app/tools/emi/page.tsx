import { Metadata } from "next"
import { Section } from "@/components/ui/section"
import { EmiCalculator } from "@/components/calculators/EmiCalculator"

export const metadata: Metadata = {
  title: "EMI Calculator | FinVault",
  description: "Calculate your Equated Monthly Installment (EMI) instantly. Plan your home loan, car loan, or personal loan with our accurate tool.",
}

export default function EmiCalculatorPage() {
  return (
    <>
      <Section className="pb-8 md:pb-12 pt-16 lg:pt-24 bg-gradient-to-b from-muted/50 to-background">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h1 className="heading-1 !text-4xl md:!text-5xl lg:!text-6xl">
            EMI Calculator
          </h1>
          <p className="body-text text-lg max-w-2xl mx-auto">
            Instantly calculate your Equated Monthly Installments for personal loans, home loans, and car loans. Adjust the sliders below to see your repayment schedule and interest breakdown.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto w-full">
          <EmiCalculator />
        </div>
      </Section>

      <Section className="border-t border-border bg-background py-24">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="space-y-6">
            <h2 className="heading-2 text-3xl">What is an EMI?</h2>
            <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
              <p>
                <strong>Equated Monthly Installment (EMI)</strong> is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs are used to pay off both interest and principal each month so that over a specified number of years, the loan is fully paid off along with interest.
              </p>
              <p>
                With most loans, such as real estate mortgages or car loans, the borrower makes fixed periodic payments to the lender over several years with the goal of retiring the loan. Our calculator uses standard banking formulas to ensure your results act as a reliable forecast for your financial planning.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="heading-2 text-3xl">Frequently Asked Questions</h2>
            <div className="grid gap-8 border-t border-border pt-8">
              <div className="space-y-2">
                <h3 className="heading-3 text-xl">How does the EMI calculator work?</h3>
                <p className="body-text">
                  The calculator uses the mathematical formula: <code>E = P x R x (1+R)^N / [(1+R)^N-1]</code> where P stands for the Principal amount, R is the interest rate per month, and N is the number of monthly installments. Our tool calculates this instantly as you move the sliders.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="heading-3 text-xl">Does a longer tenure mean a lower EMI?</h3>
                <p className="body-text">
                  Yes, increasing your loan tenure will decrease your monthly EMI payment. However, it's important to remember that a longer tenure means you will pay significantly more in total interest over the life of the loan. You can see this visual shift in the Pie Chart above.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="heading-3 text-xl">Are these results 100% exact to what the bank will charge?</h3>
                <p className="body-text">
                  Our tool provides a highly accurate mathematical estimate based on compounding principles. However, your actual bank EMI may vary slightly depending on upfront processing fees, GST, exact resting days of interest calculation, and floating interest rate adjustments over time.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="heading-3 text-xl">What is the difference between flat interest and reducing balance rate?</h3>
                <p className="body-text">
                  A flat interest rate calculates interest on the entire initial principal amount throughout the tenure. A reducing balance rate calculates interest only on the outstanding principal balance. This calculator assumes a standard reducing balance mortgage formula, which is standard for most credible financial institutions globally.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="heading-3 text-xl">Can prepayments lower my EMI?</h3>
                <p className="body-text">
                  Making a lump-sum prepayment towards your loan typically gives you two choices: you can either reduce your overall loan tenure while keeping the EMI the same, or you can ask the bank to recalculate your remaining balance to lower your future monthly EMI payments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
