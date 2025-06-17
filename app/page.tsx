import type { Metadata } from "next"
import { HeroSection } from "@/components/hero-section"
import { ToolsGrid } from "@/components/tools-grid"
import { FeaturesSection } from "@/components/features-section"
import { SEOSection } from "@/components/seo-section"
import { FAQSection } from "@/components/faq-section"

export const metadata: Metadata = {
  title: "Exact Tools - Premium Online Tools for File Processing & Utilities",
  description:
    "Professional online tools with guaranteed results. Image compressor, PDF editor, video processing, and more. Fast, secure, and completely free to use.",
  keywords:
    "online tools, free online tools, image compressor, PDF editor, video trimmer, background remover, loan calculator, QR code generator, text to PDF, video compressor, GIF maker, PDF converter, exact tools, premium tools",
  openGraph: {
    title: "Exact Tools - Professional Online Utilities",
    description: "Fast, secure, and powerful online tools for all your file processing needs.",
    type: "website",
    url: "https://exacttools.com",
    siteName: "Exact Tools",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Exact Tools - Premium Online Tools Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Exact Tools - Professional Online Utilities",
    description: "Fast, secure, and powerful online tools for all your file processing needs.",
    images: ["/twitter-image.png"],
    creator: "@exacttools",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://exacttools.com",
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <ToolsGrid />
      <FeaturesSection />
      <SEOSection />
      <FAQSection />
    </main>
  )
}
