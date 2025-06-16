import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://exacttools.com"

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ]

  // Tool pages
  const toolPages = [
    "image-compressor",
    "loan-calculator",
    "qr-generator",
    "text-to-pdf",
    "pdf-converter",
    "background-remover",
    "video-trimmer",
    "gif-maker",
    "video-compressor",
    "pdf-editor",
  ].map((tool) => ({
    url: `${baseUrl}/tools/${tool}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }))

  // Blog posts
  const blogPosts = [
    "how-to-compress-images-without-losing-quality",
    "best-pdf-editing-tools-2024",
    "video-compression-guide",
    "background-remover-guide",
    "loan-calculator-guide",
    "qr-code-generator-best-practices",
  ].map((post) => ({
    url: `${baseUrl}/blog/${post}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticPages, ...toolPages, ...blogPosts]
}
