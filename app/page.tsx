"use client"

import { VideoCompressor } from "../video-compressor"
import type { Metadata } from "next"
import { HeroSection } from "@/components/hero-section"
import { ToolsGrid } from "@/components/tools-grid"
import { FeaturesSection } from "@/components/features-section"
import { SEOSection } from "@/components/seo-section"
import { FAQSection } from "@/components/faq-section"

export const metadata: Metadata = {
  title: "Exact Tools - 10+ Premium Online Tools That Actually Work | Free Multi-Tool Web App",
  description:
    "Professional online tools with guaranteed results. Image compressor, PDF editor, video trimmer, background remover, loan calculator & 5+ more tools. Fast, accurate, completely free.",
  keywords:
    "online tools, free online tools, image compressor, PDF editor, video trimmer, background remover, loan calculator, QR code generator, text to PDF, video compressor, GIF maker, PDF converter, exact tools, premium tools, web tools, utility tools, productivity tools",
  openGraph: {
    title: "Exact Tools - Premium Online Tools That Actually Work",
    description: "Professional online tools with guaranteed results. Fast, accurate, and completely free.",
    type: "website",
    url: "https://exacttools.com",
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
    title: "Exact Tools - Premium Online Tools That Actually Work",
    description: "Professional online tools with guaranteed results. Fast, accurate, and completely free.",
    images: ["/twitter-image.png"],
  },
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: {
    canonical: "https://exacttools.com",
  },
}

export default function Page() {
  return <VideoCompressor />
}


export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ToolsGrid />
      <FeaturesSection />
      <SEOSection />
      <FAQSection />
    </div>
  )
}
