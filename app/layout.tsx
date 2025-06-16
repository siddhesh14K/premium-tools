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
    default: "Free Tools Free - Premium Online Tools That Actually Work | Free Multi-Tool Web App",
    template: "%s | Free Tools Free - Premium Online Tools",
  },
  description:
    "Professional free online tools for image compression, PDF editing, video processing, background removal, calculations & more. No registration required. Privacy-focused, fast & reliable.",
  keywords: [
    "free online tools",
    "image compressor",
    "PDF editor",
    "video trimmer",
    "background remover",
    "loan calculator",
    "QR code generator",
    "text to PDF converter",
    "online utilities",
    "web tools",
    "productivity tools",
    "file converter",
    "image editor",
    "document tools",
    "free tools free",
    "free software",
    "online converter",
    "web utilities",
    "digital tools",
    "file processing",
  ].join(", "),
  authors: [{ name: "Free Tools Free Team", url: "https://freetoolsfree.in" }],
  creator: "Free Tools Free",
  publisher: "Free Tools Free",
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
    siteName: "Free Tools Free",
    title: "Free Tools Free - Premium Online Tools That Actually Work",
    description:
      "Professional free online tools for image compression, PDF editing, video processing & more. No registration required. Privacy-focused & reliable.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Tools Free - Premium Online Tools Dashboard",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@freetoolsfree",
    creator: "@freetoolsfree",
    title: "Free Tools Free - Premium Online Tools That Actually Work",
    description: "Professional free online tools. No registration required. Privacy-focused & reliable.",
    images: ["/twitter-image.png"],
  },
  verification: {
    google: "aJV1XubkXnC5S3nWnJbbe7NJhdxCcB6VTYu9nsXqls4",
  },
  alternates: {
    canonical: "https://freetoolsfree.in",
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
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="aJV1XubkXnC5S3nWnJbbe7NJhdxCcB6VTYu9nsXqls4" />

        {/* Google Analytics - Exactly as provided by Google */}
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="color-scheme" content="light dark" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />

        {/* Additional SEO Meta Tags */}
        <meta name="application-name" content="Free Tools Free" />
        <meta name="apple-mobile-web-app-title" content="Free Tools Free" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Content Guidelines for AdSense */}
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="revisit-after" content="1 days" />
        <meta name="language" content="English" />
        <meta name="content-language" content="en" />
        <meta name="audience" content="all" />

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
