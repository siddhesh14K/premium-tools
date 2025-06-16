import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Analytics } from "@/components/analytics"
import { StructuredData } from "@/components/structured-data"
import { CookieConsent } from "@/components/cookie-consent"
import { Suspense } from "react"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://exacttools.com"),
  title: {
    default: "Exact Tools - 10+ Premium Online Tools That Actually Work | Free Multi-Tool Web App",
    template: "%s | Exact Tools - Premium Online Tools",
  },
  description:
    "Professional online tools with guaranteed results. Image compressor, PDF editor, video trimmer, background remover, loan calculator & 5+ more tools. Fast, accurate, completely free.",
  keywords: [
    "online tools",
    "free online tools",
    "image compressor",
    "PDF editor",
    "video trimmer",
    "background remover",
    "loan calculator",
    "QR code generator",
    "text to PDF",
    "video compressor",
    "GIF maker",
    "PDF converter",
    "exact tools",
    "premium tools",
    "web tools",
    "utility tools",
    "productivity tools",
    "professional tools",
    "image tools",
    "video tools",
    "document tools",
    "calculator tools",
  ].join(", "),
  authors: [{ name: "Exact Tools Team", url: "https://exacttools.com" }],
  creator: "Exact Tools",
  publisher: "Exact Tools",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
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
    url: "https://exacttools.com",
    siteName: "Exact Tools",
    title: "Exact Tools - 10+ Premium Online Tools That Actually Work",
    description:
      "Professional online tools with guaranteed results. Image compressor, PDF editor, video tools & more. Fast, accurate, completely free.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Exact Tools - Premium Online Tools Dashboard",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@exacttools",
    creator: "@exacttools",
    title: "Exact Tools - Premium Online Tools That Actually Work",
    description: "Professional online tools with guaranteed results. Fast, accurate, completely free.",
    images: ["/twitter-image.png"],
  },
  verification: {
    google: "your-google-site-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
    other: {
      "msvalidate.01": "your-bing-verification-code",
    },
  },
  alternates: {
    canonical: "https://exacttools.com",
  },
  category: "technology",
  classification: "Online Tools and Utilities",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="canonical" href="https://exacttools.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="color-scheme" content="light dark" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />

        {/* Additional SEO Meta Tags */}
        <meta name="application-name" content="Exact Tools" />
        <meta name="apple-mobile-web-app-title" content="Exact Tools" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Content Guidelines for AdSense */}
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="revisit-after" content="1 days" />
        <meta name="language" content="English" />

        <StructuredData />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header />
          <Suspense fallback={<div>Loading...</div>}>
            <main id="main-content">{children}</main>
          </Suspense>
          <Footer />
          <CookieConsent />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
