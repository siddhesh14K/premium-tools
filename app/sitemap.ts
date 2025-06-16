import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://freetoolsfree.in"

  // Static pages with SEO priority
  const staticPages = [
    { path: "", priority: 1.0, changeFreq: "daily" as const },
    { path: "/about", priority: 0.8, changeFreq: "weekly" as const },
    { path: "/privacy", priority: 0.6, changeFreq: "monthly" as const },
    { path: "/terms", priority: 0.6, changeFreq: "monthly" as const },
    { path: "/contact", priority: 0.7, changeFreq: "weekly" as const },
    { path: "/blog", priority: 0.9, changeFreq: "daily" as const },
    { path: "/help", priority: 0.8, changeFreq: "weekly" as const },
  ]

  // Tool-specific landing pages - highest priority for SEO
  const toolLandingPages = [
    { path: "/image-compressor-online-free", priority: 0.98, changeFreq: "weekly" as const },
    { path: "/pdf-editor-no-signup-required", priority: 0.98, changeFreq: "weekly" as const },
    { path: "/background-remover-ai-powered", priority: 0.95, changeFreq: "weekly" as const },
    { path: "/video-compressor-high-quality", priority: 0.92, changeFreq: "weekly" as const },
    { path: "/free-qr-code-generator", priority: 0.88, changeFreq: "weekly" as const },
  ]

  // Original tool pages
  const toolPages = [
    { path: "/tools/image-compressor", priority: 0.95, changeFreq: "weekly" as const },
    { path: "/tools/pdf-editor", priority: 0.95, changeFreq: "weekly" as const },
    { path: "/tools/video-trimmer", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/tools/background-remover", priority: 0.95, changeFreq: "weekly" as const },
    { path: "/tools/loan-calculator", priority: 0.85, changeFreq: "weekly" as const },
    { path: "/tools/qr-generator", priority: 0.85, changeFreq: "weekly" as const },
    { path: "/tools/text-to-pdf", priority: 0.85, changeFreq: "weekly" as const },
    { path: "/tools/video-compressor", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/tools/gif-maker", priority: 0.85, changeFreq: "weekly" as const },
    { path: "/tools/pdf-converter", priority: 0.9, changeFreq: "weekly" as const },
  ]

  // Blog posts for SEO content
  const blogPages = [
    { path: "/blog/exact-tools-complete-guide", priority: 0.95, changeFreq: "weekly" as const },
    { path: "/blog/how-to-compress-images-without-losing-quality", priority: 0.85, changeFreq: "monthly" as const },
  ]

  // Comparison pages for competitive SEO
  const comparisonPages = [
    { path: "/exact-tools-vs-smallpdf", priority: 0.92, changeFreq: "monthly" as const },
    { path: "/exact-tools-vs-canva", priority: 0.9, changeFreq: "monthly" as const },
    { path: "/exact-tools-vs-adobe-online", priority: 0.88, changeFreq: "monthly" as const },
    { path: "/best-free-alternative-to-smallpdf", priority: 0.85, changeFreq: "monthly" as const },
  ]

  // Help and tutorial pages
  const helpPages = [
    { path: "/help/getting-started", priority: 0.75, changeFreq: "monthly" as const },
    { path: "/help/tutorials", priority: 0.75, changeFreq: "monthly" as const },
    { path: "/help/image-compressor", priority: 0.8, changeFreq: "monthly" as const },
    { path: "/help/pdf-editor", priority: 0.8, changeFreq: "monthly" as const },
    { path: "/help/background-remover", priority: 0.8, changeFreq: "monthly" as const },
  ]

  // Use case pages for long-tail SEO
  const useCasePages = [
    { path: "/online-tools-for-small-business", priority: 0.82, changeFreq: "monthly" as const },
    { path: "/free-design-tools-for-students", priority: 0.8, changeFreq: "monthly" as const },
    { path: "/professional-pdf-tools-for-lawyers", priority: 0.78, changeFreq: "monthly" as const },
    { path: "/image-tools-for-ecommerce", priority: 0.78, changeFreq: "monthly" as const },
  ]

  const staticSitemap = staticPages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFreq,
    priority: page.priority,
  }))

  const toolLandingSitemap = toolLandingPages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFreq,
    priority: page.priority,
  }))

  const toolSitemap = toolPages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFreq,
    priority: page.priority,
  }))

  const blogSitemap = blogPages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFreq,
    priority: page.priority,
  }))

  const comparisonSitemap = comparisonPages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFreq,
    priority: page.priority,
  }))

  const helpSitemap = helpPages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFreq,
    priority: page.priority,
  }))

  const useCaseSitemap = useCasePages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFreq,
    priority: page.priority,
  }))

  return [
    ...staticSitemap,
    ...toolLandingSitemap,
    ...toolSitemap,
    ...blogSitemap,
    ...comparisonSitemap,
    ...helpSitemap,
    ...useCaseSitemap,
  ]
}
