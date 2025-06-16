import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://freetoolsfree.in"

  // Static pages
  const staticPages = ["", "/about", "/privacy", "/terms", "/contact", "/blog"]

  // Tool pages
  const toolPages = [
    "/tools/image-compressor",
    "/tools/pdf-editor",
    "/tools/video-trimmer",
    "/tools/background-remover",
    "/tools/loan-calculator",
    "/tools/qr-generator",
    "/tools/text-to-pdf",
    "/tools/video-compressor",
    "/tools/gif-maker",
    "/tools/pdf-converter",
  ]

  const staticSitemap = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }))

  const toolSitemap = toolPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }))

  return [...staticSitemap, ...toolSitemap]
}
