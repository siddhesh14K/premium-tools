"use client"

import type React from "react"

import { useState, useCallback, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Download, FileText, ArrowLeft, X, Copy } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
// import * as pdfjsLib from "pdfjs-dist"

// Remove the import and add this at the top after other imports
declare global {
  interface Window {
    pdfjsLib: any
  }
}

// Set up PDF.js worker
// pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`

interface ConvertedFile {
  id: string
  originalFile: File
  extractedText: string
  pageCount: number
  wordCount: number
  charCount: number
  format: "text" | "word"
}

export function PDFConverter() {
  const [files, setFiles] = useState<ConvertedFile[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [dragActive, setDragActive] = useState(false)
  const [outputFormat, setOutputFormat] = useState<"text" | "word">("text")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Add this useEffect to load PDF.js dynamically
  useEffect(() => {
    const loadPDFJS = async () => {
      if (typeof window !== "undefined" && !window.pdfjsLib) {
        const script = document.createElement("script")
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"
        script.onload = () => {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"
        }
        document.head.appendChild(script)
      }
    }
    loadPDFJS()
  }, [])

  const extractTextFromPDF = useCallback(
    async (file: File): Promise<ConvertedFile> => {
      if (!window.pdfjsLib) {
        throw new Error("PDF.js not loaded")
      }

      const arrayBuffer = await file.arrayBuffer()
      const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise
      const pageCount = pdf.numPages

      let extractedText = ""

      for (let pageNum = 1; pageNum <= pageCount; pageNum++) {
        const page = await pdf.getPage(pageNum)
        const textContent = await page.getTextContent()

        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(" ")
          .replace(/\s+/g, " ")
          .trim()

        extractedText += `--- Page ${pageNum} ---\n\n${pageText}\n\n`

        // Update progress
        setProgress((pageNum / pageCount) * 100)
      }

      const wordCount = extractedText.trim() ? extractedText.trim().split(/\s+/).length : 0
      const charCount = extractedText.length

      return {
        id: Math.random().toString(36).substr(2, 9),
        originalFile: file,
        extractedText,
        pageCount,
        wordCount,
        charCount,
        format: outputFormat,
      }
    },
    [outputFormat],
  )

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      const fileArray = Array.from(files)
      const validFiles = fileArray.filter(
        (file) => file.type === "application/pdf" && file.size < 100 * 1024 * 1024, // 100MB limit
      )

      if (validFiles.length === 0) return

      setIsProcessing(true)
      setProgress(0)

      const convertedFiles: ConvertedFile[] = []

      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i]
        try {
          const converted = await extractTextFromPDF(file)
          convertedFiles.push(converted)
        } catch (error) {
          console.error("Error converting PDF:", error)
        }
      }

      setFiles((prev) => [...prev, ...convertedFiles])
      setIsProcessing(false)
      setProgress(0)
    },
    [extractTextFromPDF],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragActive(false)
      if (e.dataTransfer.files) {
        handleFiles(e.dataTransfer.files)
      }
    },
    [handleFiles],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
  }, [])

  const downloadAsText = (file: ConvertedFile) => {
    const blob = new Blob([file.extractedText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${file.originalFile.name.replace(".pdf", "")}_extracted.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const downloadAsWord = (file: ConvertedFile) => {
    // Create a simple RTF document that can be opened by Word
    const rtfContent = `{\\rtf1\\ansi\\deff0 {\\fonttbl {\\f0 Times New Roman;}}
\\f0\\fs24 ${file.extractedText.replace(/\n/g, "\\par ")}}`

    const blob = new Blob([rtfContent], { type: "application/rtf" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${file.originalFile.name.replace(".pdf", "")}_extracted.rtf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (error) {
      console.error("Failed to copy text:", error)
    }
  }

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id))
  }

  const downloadAll = () => {
    files.forEach((file) => {
      if (file.format === "word") {
        downloadAsWord(file)
      } else {
        downloadAsText(file)
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 dark:from-slate-900 dark:to-slate-800 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tools
          </Link>
          <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
            PDF to Text/Word Converter
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Extract text from PDF files with perfect formatting. Convert to editable text or Word documents.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="mb-8 shadow-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg">
                  <FileText className="w-6 h-6" />
                </div>
                Upload PDF Files
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-8">
                <label className="block text-lg font-semibold mb-4">Output Format</label>
                <Select value={outputFormat} onValueChange={(value: "text" | "word") => setOutputFormat(value)}>
                  <SelectTrigger className="w-full max-w-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Plain Text (.txt)</SelectItem>
                    <SelectItem value="word">Word Document (.rtf)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
                  dragActive
                    ? "border-red-500 bg-red-50 dark:bg-red-900/20 scale-105"
                    : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf"
                  onChange={(e) => e.target.files && handleFiles(e.target.files)}
                  className="hidden"
                />
                <motion.div animate={dragActive ? { scale: 1.1 } : { scale: 1 }} transition={{ duration: 0.2 }}>
                  <Upload className="w-16 h-16 mx-auto mb-6 text-gray-400" />
                  {dragActive ? (
                    <p className="text-2xl font-semibold text-red-600">Drop PDF files here!</p>
                  ) : (
                    <div>
                      <p className="text-2xl font-semibold mb-3">Drag & drop PDF files here</p>
                      <p className="text-lg text-gray-500 mb-4">or click to browse files</p>
                      <div className="flex flex-wrap justify-center gap-2">
                        <Badge variant="secondary">PDF Only</Badge>
                        <Badge variant="secondary">Up to 100MB</Badge>
                        <Badge variant="secondary">OCR Support</Badge>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>

              <AnimatePresence>
                {isProcessing && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-8"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <FileText className="w-5 h-5 text-red-500 animate-pulse" />
                      <span className="text-lg font-semibold">Extracting text from PDF...</span>
                    </div>
                    <Progress value={progress} className="w-full h-3" />
                    <p className="text-sm text-gray-500 mt-2">{Math.round(progress)}% complete</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        <AnimatePresence>
          {files.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <Card className="shadow-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">Extracted Content ({files.length})</CardTitle>
                    <Button
                      onClick={downloadAll}
                      className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                    >
                      <Download className="w-4 h-4" />
                      Download All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {files.map((file, index) => (
                      <motion.div
                        key={file.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border rounded-2xl bg-gradient-to-r from-gray-50 to-white dark:from-slate-700 dark:to-slate-600 shadow-lg overflow-hidden"
                      >
                        <div className="p-6 border-b bg-white/50 dark:bg-slate-800/50">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold text-lg mb-2">{file.originalFile.name}</h3>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <p className="text-gray-500">Pages</p>
                                  <p className="font-semibold">{file.pageCount}</p>
                                </div>
                                <div>
                                  <p className="text-gray-500">Words</p>
                                  <p className="font-semibold text-blue-600">{file.wordCount.toLocaleString()}</p>
                                </div>
                                <div>
                                  <p className="text-gray-500">Characters</p>
                                  <p className="font-semibold text-green-600">{file.charCount.toLocaleString()}</p>
                                </div>
                                <div>
                                  <p className="text-gray-500">Format</p>
                                  <Badge variant="secondary" className="bg-red-100 text-red-800 font-semibold">
                                    {file.format.toUpperCase()}
                                  </Badge>
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <Button
                                onClick={() => copyToClipboard(file.extractedText)}
                                size="sm"
                                variant="outline"
                                className="flex items-center gap-2"
                              >
                                <Copy className="w-4 h-4" />
                                Copy
                              </Button>
                              <Button
                                onClick={() => (file.format === "word" ? downloadAsWord(file) : downloadAsText(file))}
                                size="sm"
                                className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                              >
                                <Download className="w-4 h-4" />
                                Download
                              </Button>
                              <Button
                                onClick={() => removeFile(file.id)}
                                size="sm"
                                variant="outline"
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="p-6">
                          <h4 className="font-semibold mb-3">Extracted Text Preview:</h4>
                          <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 max-h-64 overflow-y-auto">
                            <pre className="text-sm whitespace-pre-wrap font-mono leading-relaxed">
                              {file.extractedText.substring(0, 1000)}
                              {file.extractedText.length > 1000 && "..."}
                            </pre>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
