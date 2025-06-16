import type { Metadata } from "next"
import { PDFEditor } from "@/components/tools/pdf-editor"

export const metadata: Metadata = {
  title: "PDF Editor - Edit, Annotate & Modify PDFs Online | Exact Tools",
  description:
    "Professional PDF editor with advanced tools. Add text, images, signatures, annotations, and drawings to any PDF. Edit PDFs online for free with real-time preview.",
  keywords:
    "PDF editor, edit PDF online, PDF annotation, add text to PDF, PDF signature, modify PDF, PDF tools, online PDF editor",
  openGraph: {
    title: "PDF Editor - Professional PDF Editing Tools",
    description:
      "Edit, annotate, and modify PDF documents with advanced tools. Add text, images, signatures, and more.",
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
            Professional PDF Editor
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Edit, annotate, and modify PDF documents with advanced tools. Add text, images, signatures, drawings, and
            more with real-time preview.
          </p>
        </div>
        <PDFEditor />
      </div>
    </div>
  )
}
