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
  metadataBase: new URL("https://freetoolsfree.in"),
  title: {
    default: "Exact Tools - Free Online Tools That Actually Work | #1 Multi-Tool Platform 2024",
    template: "%s | Exact Tools - Free Online Utilities",
  },
  description:
    "Exact Tools is the #1 free online tools platform with 10+ professional utilities. Image compressor, PDF editor, video trimmer, background remover, loan calculator & more. No signup required. Used by 1M+ users worldwide.",
  keywords: [
    // Primary Keywords
    "exact tools",
    "exact tools free",
    "exact tools online",
    "exact tools website",
    "exact tools platform",

    // Long-tail Keywords
    "free online tools that actually work",
    "best free online tools 2024",
    "professional online tools no signup",
    "free image compressor online",
    "free PDF editor online",
    "free video trimmer online",
    "free background remover online",
    "free loan calculator online",
    "free QR code generator online",
    "free text to PDF converter online",

    // Intent-based Keywords
    "how to compress images online free",
    "how to edit PDF online free",
    "how to remove background from image free",
    "how to trim video online free",
    "how to calculate loan EMI online",
    "how to generate QR code free",
    "how to convert text to PDF free",

    // Competitor Keywords
    "alternative to photoshop online",
    "alternative to adobe acrobat online",
    "free canva alternative",
    "free smallpdf alternative",
    "free remove.bg alternative",

    // Location-based Keywords
    "online tools for students",
    "online tools for professionals",
    "online tools for small business",
    "online tools for designers",
    "online tools for developers",

    // Feature Keywords
    "no watermark online tools",
    "unlimited usage online tools",
    "privacy focused online tools",
    "mobile friendly online tools",
    "fast online tools",
    "secure online tools",

    // Problem-solving Keywords
    "reduce image file size online",
    "compress PDF online free",
    "edit PDF without software",
    "remove image background instantly",
    "calculate mortgage payments online",
    "create QR code for website",
    "convert document to PDF online",

    // Brand Keywords
    "exact tools review",
    "exact tools vs competitors",
    "is exact tools safe",
    "exact tools features",
    "exact tools tutorial",
    "exact tools guide",
  ].join(", "),
  authors: [{ name: "Exact Tools Team", url: "https://freetoolsfree.in/about" }],
  creator: "Exact Tools - Free Online Utilities Platform",
  publisher: "Exact Tools Inc.",
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
    url: "https://freetoolsfree.in",
    siteName: "Exact Tools - Free Online Tools Platform",
    title: "Exact Tools - #1 Free Online Tools Platform | 10+ Professional Utilities",
    description:
      "Exact Tools offers 10+ professional online tools completely free. Image compressor, PDF editor, video tools & more. No signup required. Trusted by 1M+ users worldwide.",
    images: [
      {
        url: "/logo-new.png",
        width: 1200,
        height: 630,
        alt: "Exact Tools - Free Online Tools Platform Logo",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@exacttools",
    creator: "@exacttools",
    title: "Exact Tools - #1 Free Online Tools Platform",
    description: "10+ professional online tools completely free. No signup required. Trusted by 1M+ users.",
    images: ["/logo-new.png"],
  },
  verification: {
    google: "aJV1XubkXnC5S3nWnJbbe7NJhdxCcB6VTYu9nsXqls4",
  },
  alternates: {
    canonical: "https://freetoolsfree.in",
  },
  category: "Online Tools and Utilities",
  classification: "Professional Online Tools Platform",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
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
        {/* Google Search Console Verification - Priority Meta Tag */}
        <meta name="google-site-verification" content="aJV1XubkXnC5S3nWnJbbe7NJhdxCcB6VTYu9nsXqls4" />

        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-M1MRK2LLM7"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-M1MRK2LLM7');
            `,
          }}
        />

        <link rel="canonical" href="https://freetoolsfree.in" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

        {/* Enhanced Favicon Setup */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />

        {/* Advanced SEO Meta Tags */}
        <meta name="application-name" content="Exact Tools" />
        <meta name="apple-mobile-web-app-title" content="Exact Tools" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Geo Targeting */}
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="ICBM" content="39.7392, -104.9903" />

        {/* Content Classification */}
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="revisit-after" content="1 day" />
        <meta name="language" content="English" />
        <meta name="content-language" content="en-US" />
        <meta name="audience" content="all" />
        <meta name="copyright" content="Exact Tools 2024" />

        {/* Rich Snippets Preparation */}
        <meta property="og:logo" content="https://freetoolsfree.in/logo-new.png" />
        <meta name="msapplication-TileImage" content="/logo-new.png" />
        <meta name="msapplication-TileColor" content="#3b82f6" />

        {/* Performance Hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Structured Data */}
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
