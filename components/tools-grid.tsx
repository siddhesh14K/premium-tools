"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import {
  ImageIcon,
  FileText,
  Scissors,
  Calculator,
  Video,
  QrCode,
  Zap,
  FileImage,
  FileArchiveIcon as Compress,
  FileEdit,
} from "lucide-react"

const tools = [
  {
    id: "image-compressor",
    title: "Image Compressor",
    description:
      "Reduce image file sizes by up to 90% without losing quality. Supports JPG, PNG, WebP with batch processing.",
    icon: ImageIcon,
    gradient: "from-blue-500 to-cyan-500",
    badge: "Most Popular",
    badgeColor: "bg-blue-500",
    href: "/tools/image-compressor",
    stats: "2M+ images compressed",
  },
  {
    id: "pdf-converter",
    title: "PDF to Word/Text",
    description: "Convert PDF files to editable Word documents or plain text with perfect formatting preservation.",
    icon: FileText,
    gradient: "from-red-500 to-pink-500",
    badge: "AI Powered",
    badgeColor: "bg-red-500",
    href: "/tools/pdf-converter",
    stats: "500K+ PDFs converted",
  },
  {
    id: "pdf-editor",
    title: "PDF Editor",
    description:
      "Edit, annotate, and modify PDF documents with advanced tools. Add text, images, signatures, and drawings.",
    icon: FileEdit,
    gradient: "from-amber-500 to-orange-500",
    badge: "Professional",
    badgeColor: "bg-amber-500",
    href: "/tools/pdf-editor",
    stats: "250K+ PDFs edited",
  },
  {
    id: "background-remover",
    title: "Background Remover",
    description: "Remove backgrounds from images instantly with AI precision. Get transparent PNGs in seconds.",
    icon: Scissors,
    gradient: "from-green-500 to-emerald-500",
    badge: "AI Magic",
    badgeColor: "bg-green-500",
    href: "/tools/background-remover",
    stats: "1M+ backgrounds removed",
  },
  {
    id: "loan-calculator",
    title: "Loan EMI Calculator",
    description: "Calculate loan EMI, interest, and view detailed amortization schedules with interactive charts.",
    icon: Calculator,
    gradient: "from-purple-500 to-violet-500",
    badge: "Financial",
    badgeColor: "bg-purple-500",
    href: "/tools/loan-calculator",
    stats: "300K+ loans calculated",
  },
  {
    id: "video-trimmer",
    title: "Video Trimmer",
    description: "Trim videos with frame-perfect precision. Cut, crop, and edit videos directly in your browser.",
    icon: Video,
    gradient: "from-orange-500 to-red-500",
    badge: "Pro Quality",
    badgeColor: "bg-orange-500",
    href: "/tools/video-trimmer",
    stats: "100K+ videos trimmed",
  },
  {
    id: "qr-generator",
    title: "QR Code Generator",
    description: "Create custom QR codes with logos, colors, and branding. Support for URLs, WiFi, contacts, and more.",
    icon: QrCode,
    gradient: "from-indigo-500 to-blue-500",
    badge: "Customizable",
    badgeColor: "bg-indigo-500",
    href: "/tools/qr-generator",
    stats: "800K+ QR codes created",
  },
  {
    id: "gif-maker",
    title: "GIF Maker",
    description: "Convert videos and images to high-quality animated GIFs with custom speed and optimization settings.",
    icon: Zap,
    gradient: "from-pink-500 to-rose-500",
    badge: "Creative",
    badgeColor: "bg-pink-500",
    href: "/tools/gif-maker",
    stats: "200K+ GIFs created",
  },
  {
    id: "text-to-pdf",
    title: "Text to PDF",
    description: "Convert formatted text to professional PDF documents with custom fonts, layouts, and styling.",
    icon: FileImage,
    gradient: "from-teal-500 to-cyan-500",
    badge: "Professional",
    badgeColor: "bg-teal-500",
    href: "/tools/text-to-pdf",
    stats: "400K+ PDFs generated",
  },
  {
    id: "video-compressor",
    title: "Video Compressor",
    description: "Compress videos while maintaining quality. Reduce file sizes by up to 80% with smart optimization.",
    icon: Compress,
    gradient: "from-yellow-500 to-orange-500",
    badge: "Efficient",
    badgeColor: "bg-yellow-500",
    href: "/tools/video-compressor",
    stats: "150K+ videos compressed",
  },
]

export function ToolsGrid() {
  return (
    <section
      id="tools"
      className="py-24 px-4 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
    >
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
            Premium Tools Collection
          </h2>
          <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Professional-grade tools that deliver exactly what you need. Every tool is tested, optimized, and guaranteed
            to work perfectly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon
            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <Link href={tool.href}>
                  <Card className="h-full hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-xl overflow-hidden">
                    <CardHeader className="pb-4 relative">
                      <div className="flex items-center justify-between mb-6">
                        <div
                          className={`p-4 rounded-2xl bg-gradient-to-r ${tool.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          <IconComponent className="w-8 h-8" />
                        </div>
                        <Badge className={`${tool.badgeColor} text-white border-0 px-3 py-1 font-semibold`}>
                          {tool.badge}
                        </Badge>
                      </div>
                      <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                        {tool.title}
                      </CardTitle>
                      <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">{tool.stats}</div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                        {tool.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
