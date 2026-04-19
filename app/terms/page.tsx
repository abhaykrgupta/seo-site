import { Metadata } from "next"
import { Section } from "@/components/ui/section"
import { AlertTriangle, BookOpen } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms of Service | FinVault",
  description: "Read the FinVault Terms of Service defining the rules, guidelines, and agreements for using our financial calculators and educational platform.",
}

export default function TermsPage() {
  const lastUpdated = "April 20, 2026"

  return (
    <Section className="pt-8 pb-16 lg:pt-12">
      <div className="max-w-3xl mx-auto space-y-12">
        <header className="space-y-4">
          <div className="flex items-center gap-3 text-primary mb-6">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="font-semibold tracking-wider text-sm uppercase">Legal & Compliance</span>
          </div>
          <h1 className="heading-1 !text-4xl lg:!text-5xl">Terms of Service</h1>
          <p className="body-text text-lg text-muted-foreground">Last Updated: {lastUpdated}</p>
        </header>

        <div className="relative w-full rounded-xl border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground border-amber-500/50 bg-amber-500/10 text-amber-900 dark:text-amber-400 shadow-sm backdrop-blur-sm">
          <AlertTriangle className="h-5 w-5 !text-amber-600 dark:!text-amber-500" />
          <h5 className="mb-1 font-bold leading-none tracking-tight">Crucial Disclaimer: Educational Use Only</h5>
          <div className="text-sm opacity-90 leading-relaxed mt-2">
            By accessing FinVault, you acknowledge that all content, tools, and calculators are provided strictly for educational and informational purposes. FinVault is an independent educational resource and does not provide certified financial, legal, or tax advice. Always consult a licensed professional before making financial commitments.
          </div>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground prose-h2:text-foreground prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-foreground prose-h3:font-semibold prose-strong:text-foreground">
          <h2>1. Acceptance of Terms</h2>
          <p>
            Welcome to FinVault. By accessing or using the website located at <strong>finvaultguide.com</strong> (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, then you do not have permission to access the Service.
          </p>

          <h2>2. Educational Purpose Only</h2>
          <p>
            The Service provides financial calculators, formulas, and educational articles intended exclusively to assist users in understanding mathematical concepts related to personal finance. 
          </p>
          <p>
            <strong>Under no circumstances</strong> should the outputs of the calculators on this platform be considered a guarantee of credit approval, exact loan terms, or future investment returns. Financial institutions use proprietary underwriting models that may differ significantly from the standardized calculations provided on this site.
          </p>

          <h2>3. No Warranty</h2>
          <p>
            The Service is provided on an "AS IS" and "AS AVAILABLE" basis. FinVault makes no representations or warranties of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, or completeness of any information on the platform.
          </p>
          <p>
            While rigorous testing is deployed on the algorithmic tools provided, there is no warranty that the mathematical models are free of errors or that the Service will function without interruption.
          </p>

          <h2>4. User Responsibilities</h2>
          <p>When using the Service, you agree not to:</p>
          <ul>
            <li>Use the calculators in a manner that constitutes automated scraping, botting, or reverse engineering of the underlying algorithms.</li>
            <li>Misrepresent the outputs of FinVault calculators to third parties as certified or legally binding documents.</li>
            <li>Use the Service for any illegal or unauthorized purpose that violates any laws applicable to you.</li>
          </ul>

          <h2>5. Third-Party Links & Advertising</h2>
          <p>
            The Service may contain links to third-party web sites or services that are not owned or controlled by FinVault. These include advertisements served by the Google AdSense network and affiliate marketing links.
          </p>
          <p>
            FinVault has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that FinVault and its creator shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such web sites or services.
          </p>

          <h2>6. Limitation of Liability</h2>
          <p>
            In no event shall the creator of FinVault or any associated contributors be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; and (iii) any unauthorized access, use or alteration of your transmissions or content.
          </p>

          <h2>7. Changes to Terms</h2>
          <p>
            The right is reserved, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use the Service after those revisions become effective, you agree to be bound by the revised terms.
          </p>

          <h2>8. Governing Law</h2>
          <p>
            These Terms are governed by general principles applicable to digital educational services and international commercial laws pertaining to online platforms, without regard to specific conflict of law provisions. Failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
          </p>

          <h2>9. Contact Support</h2>
          <p>
            If you have any questions regarding these Terms, please submit an inquiry via the <a href="/contact">Contact Support portal</a>.
          </p>
        </div>
      </div>
    </Section>
  )
}
