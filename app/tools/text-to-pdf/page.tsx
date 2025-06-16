import type { Metadata } from "next"
import { TextToPDF } from "@/components/tools/text-to-pdf"

export const metadata: Metadata = {
  title: "Free Text to PDF Converter Online - Convert Text to PDF | Exact Tools",
  description:
    "Convert formatted text to beautiful PDF documents instantly. Free online text to PDF converter with custom fonts, sizes, margins, and professional formatting options.",
  keywords:
    "text to PDF, convert text to PDF, text to PDF converter, create PDF from text, online PDF generator, formatted PDF",
  openGraph: {
    title: "Free Text to PDF Converter - Create Professional PDF Documents",
    description: "Convert text to PDF with custom formatting, fonts, and layouts. Professional results guaranteed.",
    type: "website",
  },
  alternates: {
    canonical: "https://exacttools.com/tools/text-to-pdf",
  },
}

export default function TextToPDFPage() {
  return <TextToPDF />
}
