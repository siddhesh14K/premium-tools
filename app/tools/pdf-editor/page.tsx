import type { Metadata } from "next"
import { PDFEditor } from "@/components/tools/pdf-editor"

export const metadata: Metadata = {
  title: "PDF Editor - Edit PDFs Online Free | Exact Tools",
  description:
    "Professional PDF editor. Add text, images, signatures, and annotations to any PDF. Edit PDFs online for free with instant preview.",
  keywords: "PDF editor, edit PDF online, PDF annotation, add text to PDF, PDF signature, modify PDF",
  openGraph: {
    title: "PDF Editor - Professional PDF Editing",
    description: "Edit, annotate, and modify PDF documents with advanced tools.",
    type: "website",
    url: "https://exacttools.com/tools/pdf-editor",
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://exacttools.com/tools/pdf-editor",
  },
}

export default function PDFEditorPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Tool First - Mobile Optimized */}
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black mb-2 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            PDF Editor
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
            Edit, annotate, and modify PDFs instantly
          </p>
        </div>

        {/* Tool Component - Prominent Display */}
        <div className="mb-8 sm:mb-12">
          <PDFEditor />
        </div>

        {/* Additional Info - Below the tool */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-slate-700">
            <h2 className="text-lg sm:text-xl font-bold mb-3 text-gray-900 dark:text-white">
              Professional PDF Editing Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Add text and annotations</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Insert images and signatures</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Draw and highlight</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>Real-time preview</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
