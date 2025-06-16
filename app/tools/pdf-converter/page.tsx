import type { Metadata } from "next"
import { PDFConverter } from "@/components/tools/pdf-converter"

export const metadata: Metadata = {
  title: "Free PDF to Word/Text Converter Online - Extract Text from PDF | Exact Tools",
  description:
    "Convert PDF files to editable Word documents or plain text with perfect formatting preservation. Free online PDF converter with OCR support and batch processing.",
  keywords:
    "PDF to Word, PDF to text, PDF converter, extract text from PDF, PDF to DOC, PDF to DOCX, online PDF converter, OCR PDF",
  openGraph: {
    title: "Free PDF to Word/Text Converter - Extract Text with Perfect Formatting",
    description:
      "Professional PDF converter with OCR support. Convert PDF to Word, text, or extract content perfectly.",
    type: "website",
  },
  alternates: {
    canonical: "https://exacttools.com/tools/pdf-converter",
  },
}

export default function PDFConverterPage() {
  return <PDFConverter />
}
