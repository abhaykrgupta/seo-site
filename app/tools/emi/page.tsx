import { Suspense } from "react"
import { Metadata } from "next"
import { Section } from "@/components/ui/section"
import { EmiCalculator } from "@/components/calculators/EmiCalculator"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://finvaultguide.com"

export const metadata: Metadata = {
  title: "EMI Calculator — Calculate Home Loan, Car Loan & Personal Loan EMI",
  description:
    "Free EMI calculator for home loans, car loans, and personal loans in India. Instantly calculate monthly instalments, total interest, compare SBI, HDFC, ICICI rates, and view your full amortisation schedule.",
  alternates: {
    canonical: `${SITE_URL}/tools/emi`,
  },
  openGraph: {
    title: "EMI Calculator — Calculate Home Loan, Car Loan & Personal Loan EMI",
    description:
      "Free EMI calculator for India. Calculate monthly instalments, total interest, and amortisation schedule for any loan.",
    url: `${SITE_URL}/tools/emi`,
    type: "website",
  },
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does the EMI calculator work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The calculator uses the standard reducing balance formula: E = P × R × (1+R)^N / [(1+R)^N - 1], where P is the principal amount, R is the monthly interest rate, and N is the number of monthly installments. Results update instantly as you adjust the inputs.",
      },
    },
    {
      "@type": "Question",
      name: "Does a longer loan tenure mean a lower EMI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Increasing the loan tenure lowers your monthly EMI. However, a longer tenure means you pay significantly more total interest over the life of the loan. The amortization schedule shows this trade-off year by year.",
      },
    },
    {
      "@type": "Question",
      name: "Are these results 100% accurate to what my bank will charge?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This calculator provides a highly accurate estimate based on the standard reducing balance compounding method used by most banks. Your actual EMI may vary slightly due to processing fees, GST, the exact resting period for interest calculation, and any floating rate adjustments over time.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a flat interest rate and a reducing balance rate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A flat rate calculates interest on the full original principal for the entire tenure. A reducing balance rate calculates interest only on the outstanding principal after each repayment. Most reputable financial institutions use reducing balance, which is the method this calculator applies.",
      },
    },
    {
      "@type": "Question",
      name: "Can prepayments lower my EMI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. A lump-sum prepayment gives you two options: reduce the remaining tenure while keeping the EMI the same, or ask your lender to recalculate the EMI on the reduced outstanding balance to lower your monthly payment.",
      },
    },
  ],
}

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Calculate Your Loan EMI",
  description:
    "Calculate your Equated Monthly Installment (EMI) in three steps using the FinVault EMI calculator.",
  step: [
    {
      "@type": "HowToStep",
      name: "Enter the loan amount",
      text: "Enter the total amount you want to borrow using the slider or type directly into the input field.",
    },
    {
      "@type": "HowToStep",
      name: "Set your interest rate",
      text: "Enter the annual interest rate offered by your lender. In India, typical rates range from 8–9% for home loans (SBI, HDFC) to 10–24% for personal loans.",
    },
    {
      "@type": "HowToStep",
      name: "Choose your loan tenure",
      text: "Select the repayment period in years. The calculator instantly shows your monthly EMI, total interest, and full amortization schedule.",
    },
  ],
}

export default function EmiCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      <Section className="pb-8 md:pb-12 pt-8 lg:pt-12 bg-gradient-to-b from-muted/50 to-background">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h1 className="heading-1 !text-4xl md:!text-5xl lg:!text-6xl">EMI Calculator</h1>
          <p className="body-text text-lg max-w-2xl mx-auto">
            Instantly calculate your EMI for home loans, car loans, and personal loans in India.
            Compare SBI, HDFC, ICICI rates — adjust the sliders to see your repayment schedule and full amortisation breakdown.
          </p>
        </div>

        <div className="max-w-6xl mx-auto w-full">
          <Suspense
            fallback={
              <div className="mt-8 h-96 rounded-2xl bg-muted/40 animate-pulse" />
            }
          >
            <EmiCalculator />
          </Suspense>
        </div>
      </Section>

      <Section className="border-t border-border bg-background py-24">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="space-y-6">
            <h2 className="heading-2 text-3xl">What is an EMI?</h2>
            <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
              <p>
                <strong>Equated Monthly Installment (EMI)</strong> is a fixed payment amount made by a
                borrower to a lender on a specified date each calendar month. EMIs pay off both interest
                and principal each month so that over the loan tenure, the entire debt is cleared.
              </p>
              <p>
                With most loans — home loans, car loans, or personal loans — the borrower makes fixed
                periodic payments to the lender over several years. This calculator uses the standard
                reducing balance formula to ensure your results are a reliable forecast for financial
                planning.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="heading-2 text-3xl">Frequently Asked Questions</h2>
            <div className="grid gap-8 border-t border-border pt-8">
              <div className="space-y-2">
                <h3 className="heading-3 text-xl">How does the EMI calculator work?</h3>
                <p className="body-text">
                  The calculator uses the formula:{" "}
                  <code>E = P × R × (1+R)^N / [(1+R)^N - 1]</code> where P is the principal, R is the
                  monthly interest rate, and N is the number of installments. Results update instantly
                  as you move the sliders.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="heading-3 text-xl">Does a longer tenure mean a lower EMI?</h3>
                <p className="body-text">
                  Yes — increasing your loan tenure lowers your monthly EMI. However, a longer tenure
                  means you pay significantly more total interest. The amortization schedule above shows
                  this trade-off year by year.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="heading-3 text-xl">
                  Are these results 100% exact to what the bank will charge?
                </h3>
                <p className="body-text">
                  This tool provides a highly accurate estimate using standard reducing balance
                  compounding. Your actual bank EMI may vary slightly due to processing fees, GST, exact
                  resting days for interest calculation, and floating rate changes over time.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="heading-3 text-xl">
                  What is the difference between flat interest and reducing balance rate?
                </h3>
                <p className="body-text">
                  A flat rate calculates interest on the entire original principal throughout the
                  tenure. A reducing balance rate calculates interest only on the outstanding balance.
                  This calculator uses the reducing balance method, which is standard for most
                  credible financial institutions globally.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="heading-3 text-xl">Can prepayments lower my EMI?</h3>
                <p className="body-text">
                  Yes. A lump-sum prepayment gives you two options: reduce your overall loan tenure
                  while keeping the same EMI, or ask your bank to recalculate the EMI on the reduced
                  outstanding balance to lower your monthly payments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
