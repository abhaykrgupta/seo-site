import { Metadata } from "next"
import { Section } from "@/components/ui/section"
import { Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy | FinVault",
  description: "Read our privacy policy to understand how FinVault protects your data and complies with GDPR and CCPA regulations.",
}

export default function PrivacyPolicyPage() {
  const lastUpdated = "April 18, 2026"

  return (
    <Section className="pt-8 pb-16 lg:pt-12">
      <div className="max-w-3xl mx-auto space-y-12">
        <header className="space-y-4">
          <div className="flex items-center gap-3 text-primary mb-6">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Shield className="w-6 h-6" />
            </div>
            <span className="font-semibold tracking-wider text-sm uppercase">Legal & Compliance</span>
          </div>
          <h1 className="heading-1 !text-4xl lg:!text-5xl">Privacy Policy</h1>
          <p className="body-text text-lg">Last Updated: {lastUpdated}</p>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground prose-h2:text-foreground prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-foreground prose-h3:font-semibold prose-strong:text-foreground">
          <p>
            FinVault ("we", "our", or "us") respects your privacy and is committed to protecting it through our compliance with this policy. This Privacy Policy governs your access to and use of <strong>finvaultguide.com</strong> (the "Website"), including any content, functionality, and services offered on or through the Website.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We collect several types of information from and about users of our Website, including:
          </p>
          <ul>
            <li><strong>Non-Personal Data:</strong> We automatically collect standard analytics data (such as IP addresses, browser types, and referral pages) using cookies to help us understand how visitors use our site and to improve the user experience.</li>
            <li><strong>Personal Data:</strong> If you use our contact form or subscribe to our newsletter, you may voluntarily provide your name and email address.</li>
            <li><strong>Financial Data Input:</strong> Our calculators (e.g., EMI, Credit Card) run entirely <em>client-side</em> in your browser. We <strong>do not</strong> transmit, save, or store the financial numbers you input on our servers.</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use information that we collect about you or that you provide to us:</p>
          <ul>
            <li>To present our Website and its contents to you.</li>
            <li>To provide you with information, products, or services that you request from us (e.g., responding to contact form submissions).</li>
            <li>To display personalized advertisements (Google AdSense), which keeps our calculators free to use.</li>
            <li>To improve our website's functionality through anonymous analytics.</li>
          </ul>

          <h2>3. Cookies and Advertising (Google AdSense)</h2>
          <p>
            We use third-party advertising companies, including Google, to serve ads when you visit our website. Google uses cookies to serve ads based on your prior visits to our Website or other websites.
          </p>
          <ul>
            <li>Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our sites and/or other sites on the Internet.</li>
            <li>Users may opt out of personalized advertising by visiting <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.</li>
          </ul>

          <h2>4. GDPR and CCPA Compliance</h2>
          <h3>For European Economic Area (EEA) Residents:</h3>
          <p>
            If you are a resident of the EEA, you have certain data protection rights under the General Data Protection Regulation (GDPR). You have the right to access, update, or delete the personal information we have on you. If you wish to exercise these rights, please contact us.
          </p>

          <h3>For California Residents:</h3>
          <p>
            Under the California Consumer Privacy Act (CCPA), California residents have the right to request that we disclose the categories and specific pieces of personal data we collect, and the right to request the deletion of your personal data. <strong>FinVault does not sell your personal data to third parties.</strong>
          </p>

          <h2>5. Data Security</h2>
          <p>
            We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. However, the transmission of information via the internet is not completely secure, and we cannot guarantee the absolute security of your personal information transmitted to our Website.
          </p>

          <h2>6. Changes to Our Privacy Policy</h2>
          <p>
            It is our policy to post any changes we make to our privacy policy on this page. If we make material changes to how we treat our users' personal information, we will notify you through a notice on the Website home page.
          </p>

          <h2>7. Contact Information</h2>
          <p>
            To ask questions or comment about this privacy policy and our privacy practices, contact us via our <a href="/contact">Contact Page</a>.
          </p>
        </div>
      </div>
    </Section>
  )
}
