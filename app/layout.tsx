import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://finvaultguide.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "FinVault — Free Financial Calculators & Money Guides",
    template: "%s | FinVault",
  },
  description:
    "Free EMI calculator, credit card payoff optimizer, and loan eligibility checker. Instant results, no sign-up required. Trusted financial tools for smarter decisions.",
  keywords: [
    "EMI calculator",
    "loan calculator",
    "credit card payoff calculator",
    "loan eligibility checker",
    "personal finance tools",
    "financial calculator",
  ],
  authors: [{ name: "FinVault Editorial" }],
  creator: "FinVault",
  publisher: "FinVault",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "FinVault",
    title: "FinVault — Free Financial Calculators & Money Guides",
    description:
      "Free EMI calculator, credit card payoff optimizer, and loan eligibility checker. Instant results, no sign-up required.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "FinVault — Free Financial Calculators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FinVault — Free Financial Calculators & Money Guides",
    description:
      "Free EMI calculator, credit card payoff optimizer, and loan eligibility checker. Instant results, no sign-up required.",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-neutral-900">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
