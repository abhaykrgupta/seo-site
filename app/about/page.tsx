import { Metadata } from "next"
import { Section } from "@/components/ui/section"
import { ShieldCheck, TrendingUp, Target } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us | FinVault",
  description: "Learn about FinVault, our mission, and why we are creating transparent financial tools.",
}

export default function AboutPage() {
  return (
    <Section className="pt-8 pb-16 lg:pt-12">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="space-y-6 text-center">
          <h1 className="heading-1 !text-4xl md:!text-5xl lg:!text-6xl">About FinVault</h1>
          <p className="body-text text-xl max-w-2xl mx-auto">
            Democratizing financial intelligence through precise, lightning-fast calculators and educational insights.
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none prose-p:leading-relaxed text-muted-foreground w-full">
          <h2 className="text-foreground font-bold text-3xl">Who We Are</h2>
          <p>
            FinVault began with a simple observation: financial math is incredibly complex, but it shouldn't be confusing for the everyday consumer. We are a team of software engineers, financial analysts, and designers dedicated to bringing absolute transparency to your personal finances.
          </p>
          <p>
            Whether you are calculating a 30-year mortgage, deciphering credit card interest, or learning to budget via the 50/30/20 rule, our platform is built to provide answers instantaneously—without paywalls, confusing jargon, or mandatory sign-ups.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-y border-border/50">
          <div className="space-y-4">
            <div className="bg-primary/5 w-12 h-12 rounded-xl flex items-center justify-center text-primary">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Data Privacy First</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Our calculators run client-side. We don't store your financial inputs, loan amounts, or salary data on our servers. What you calculate stays on your screen.
            </p>
          </div>
          <div className="space-y-4">
            <div className="bg-primary/5 w-12 h-12 rounded-xl flex items-center justify-center text-primary">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Mathematical Precision</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We rigorously test our output algorithms against standard banking formulas to ensure you get Wall-Street-grade accuracy right in your browser.
            </p>
          </div>
          <div className="space-y-4">
            <div className="bg-primary/5 w-12 h-12 rounded-xl flex items-center justify-center text-primary">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Zero Friction</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We believe tools should be tools. No forced newsletter popups, no account creation walls. Just exact numbers when you need them.
            </p>
          </div>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
          <h2 className="text-foreground font-bold text-3xl">Our Mission</h2>
          <p>
            The global debt crisis is largely driven by a lack of access to clear, forecasting models for everyday cash flow. Lenders have powerful software; consumers often just have confusing PDF spreadsheets.
          </p>
          <p>
            Our mission is to level the playing field. By combining premium software engineering with robust financial formulas, we are building the definitive online vault for personal finance planning. We're providing the tools that help you leverage your money efficiently, eliminate expensive debt, and build sustainable wealth.
          </p>
        </div>
      </div>
    </Section>
  )
}
