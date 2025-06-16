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
  ]

  // Tool pages - high priority for SEO
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

  const staticSitemap = staticPages.map((page) => ({
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

  return [...staticSitemap, ...toolSitemap, ...blogSitemap]
}
