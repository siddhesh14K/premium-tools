"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
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
    description: "Reduce image sizes by 90%",
    icon: ImageIcon,
    gradient: "from-blue-500 to-cyan-500",
    badge: "Popular",
    href: "/tools/image-compressor",
  },
  {
    id: "pdf-editor",
    title: "PDF Editor",
    description: "Edit PDFs with ease",
    icon: FileEdit,
    gradient: "from-amber-500 to-orange-500",
    badge: "Pro",
    href: "/tools/pdf-editor",
  },
  {
    id: "background-remover",
    title: "Background Remover",
    description: "AI-powered background removal",
    icon: Scissors,
    gradient: "from-green-500 to-emerald-500",
    badge: "AI",
    href: "/tools/background-remover",
  },
  {
    id: "pdf-converter",
    title: "PDF Converter",
    description: "Convert PDFs to any format",
    icon: FileText,
    gradient: "from-red-500 to-pink-500",
    badge: "Fast",
    href: "/tools/pdf-converter",
  },
  {
    id: "loan-calculator",
    title: "Loan Calculator",
    description: "Calculate EMI & interest",
    icon: Calculator,
    gradient: "from-purple-500 to-violet-500",
    badge: "Finance",
    href: "/tools/loan-calculator",
  },
  {
    id: "video-trimmer",
    title: "Video Trimmer",
    description: "Trim videos precisely",
    icon: Video,
    gradient: "from-orange-500 to-red-500",
    badge: "HD",
    href: "/tools/video-trimmer",
  },
  {
    id: "qr-generator",
    title: "QR Generator",
    description: "Create custom QR codes",
    icon: QrCode,
    gradient: "from-indigo-500 to-blue-500",
    badge: "Custom",
    href: "/tools/qr-generator",
  },
  {
    id: "gif-maker",
    title: "GIF Maker",
    description: "Convert videos to GIFs",
    icon: Zap,
    gradient: "from-pink-500 to-rose-500",
    badge: "Fun",
    href: "/tools/gif-maker",
  },
  {
    id: "text-to-pdf",
    title: "Text to PDF",
    description: "Convert text to PDF",
    icon: FileImage,
    gradient: "from-teal-500 to-cyan-500",
    badge: "Quick",
    href: "/tools/text-to-pdf",
  },
  {
    id: "video-compressor",
    title: "Video Compressor",
    description: "Compress videos efficiently",
    icon: Compress,
    gradient: "from-yellow-500 to-orange-500",
    badge: "Smart",
    href: "/tools/video-compressor",
  },
]

export function ToolsGrid() {
  return (
    <section id="tools" className="py-12 sm:py-16 lg:py-20 px-3 sm:px-4 bg-gray-50 dark:bg-slate-900">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
            Choose Your Tool
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Professional tools that work instantly. No signup required.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon
            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group"
              >
                <Link href={tool.href}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-white dark:bg-slate-800 shadow-md overflow-hidden">
                    <CardContent className="p-4 sm:p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className={`p-2.5 sm:p-3 rounded-xl bg-gradient-to-r ${tool.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <Badge className="bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 border-0 px-2 py-0.5 text-xs font-medium">
                          {tool.badge}
                        </Badge>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {tool.description}
                      </p>
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
