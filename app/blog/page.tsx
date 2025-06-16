import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight, BookOpen, TrendingUp, Star } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog - Expert Tips & Guides for Online Tools | Exact Tools",
  description:
    "Learn how to use online tools effectively with our comprehensive guides. Expert tips on image compression, PDF editing, video processing, and more professional techniques.",
  keywords:
    "online tools guide, image compression tips, PDF editing tutorial, video processing guide, productivity tips, tool tutorials",
  openGraph: {
    title: "Expert Guides & Tips for Online Tools",
    description: "Master online tools with our comprehensive tutorials and expert tips",
    type: "website",
  },
}

const blogPosts = [
  {
    slug: "how-to-compress-images-without-losing-quality",
    title: "How to Compress Images Without Losing Quality: Complete 2024 Guide",
    description:
      "Master the art of image compression with our comprehensive guide. Learn professional techniques, optimal settings, and tool comparisons to reduce file sizes while maintaining visual quality.",
    category: "Image Processing",
    readTime: "8 min read",
    publishDate: "2024-01-15",
    featured: true,
    tags: ["Image Compression", "Web Optimization", "Photography"],
  },
  {
    slug: "best-pdf-editing-tools-2024",
    title: "Best PDF Editing Tools 2024: Complete Feature Comparison",
    description:
      "Discover the most powerful PDF editing tools available today. Compare features, pricing, and capabilities to find the perfect solution for your document editing needs.",
    category: "PDF Tools",
    readTime: "12 min read",
    publishDate: "2024-01-12",
    featured: true,
    tags: ["PDF Editing", "Document Management", "Productivity"],
  },
  {
    slug: "video-compression-guide",
    title: "Ultimate Video Compression Guide: Reduce Size, Keep Quality",
    description:
      "Learn professional video compression techniques. Understand codecs, bitrates, and optimization strategies to create smaller video files without sacrificing quality.",
    category: "Video Processing",
    readTime: "10 min read",
    publishDate: "2024-01-10",
    featured: false,
    tags: ["Video Compression", "Media Optimization", "Streaming"],
  },
  {
    slug: "background-remover-guide",
    title: "AI Background Remover: Professional Photo Editing Made Simple",
    description:
      "Transform your photos with AI-powered background removal. Learn techniques, tips, and best practices for creating professional-looking images effortlessly.",
    category: "Photo Editing",
    readTime: "6 min read",
    publishDate: "2024-01-08",
    featured: false,
    tags: ["AI Tools", "Photo Editing", "Background Removal"],
  },
  {
    slug: "loan-calculator-guide",
    title: "Loan Calculator Guide: Master Your Financial Planning",
    description:
      "Make informed financial decisions with our comprehensive loan calculator guide. Understand EMI calculations, interest rates, and repayment strategies.",
    category: "Financial Tools",
    readTime: "9 min read",
    publishDate: "2024-01-05",
    featured: false,
    tags: ["Financial Planning", "Loan Calculator", "EMI"],
  },
  {
    slug: "qr-code-generator-best-practices",
    title: "QR Code Generator: Best Practices for Business & Marketing",
    description:
      "Create effective QR codes for your business. Learn about different QR code types, design principles, and marketing strategies that drive engagement.",
    category: "Marketing Tools",
    readTime: "7 min read",
    publishDate: "2024-01-03",
    featured: false,
    tags: ["QR Codes", "Marketing", "Business Tools"],
  },
]

const categories = [
  "All",
  "Image Processing",
  "PDF Tools",
  "Video Processing",
  "Photo Editing",
  "Financial Tools",
  "Marketing Tools",
]

export default function BlogPage() {
  const featuredPosts = blogPosts.filter((post) => post.featured)
  const regularPosts = blogPosts.filter((post) => !post.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Expert Guides & Tool Tutorials</h1>
          <p className="text-xl text-blue-100 leading-relaxed mb-8">
            Master online tools with our comprehensive guides. Learn professional techniques, optimization strategies,
            and best practices from industry experts.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <BookOpen className="w-4 h-4" />
              <span>Expert Tutorials</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <TrendingUp className="w-4 h-4" />
              <span>SEO Optimized</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Star className="w-4 h-4" />
              <span>Professional Tips</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Featured Posts */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <Card
                key={post.slug}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden"
              >
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2"></div>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    >
                      {post.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Featured
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed line-clamp-3">
                    {post.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold group-hover:gap-3 transition-all"
                  >
                    Read Full Guide
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* All Posts */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">All Tutorials & Guides</h2>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={category === "All" ? "default" : "outline"}
                className="cursor-pointer hover:bg-blue-100 hover:text-blue-700 transition-colors px-4 py-2"
              >
                {category}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Card key={post.slug} className="group hover:shadow-lg transition-all duration-300 h-full">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {post.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3 text-sm">{post.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0 mt-auto">
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {new Date(post.publishDate).toLocaleDateString()}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm group-hover:gap-2 transition-all"
                    >
                      Read More
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-12">
            <h3 className="text-2xl font-bold mb-4">Stay Updated with Latest Guides</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get notified when we publish new tutorials and expert tips. Join our community of professionals who rely
              on our guides for their daily workflow optimization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
