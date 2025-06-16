"use client"

import type React from "react"

import { useState, useCallback, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Upload, Download, Scissors, ArrowLeft, X, Zap } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

interface ProcessedImage {
  id: string
  original: File
  originalPreview: string
  processedPreview: string
  processedBlob: Blob
  threshold: number
}

export function BackgroundRemover() {
  const [images, setImages] = useState<ProcessedImage[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [dragActive, setDragActive] = useState(false)
  const [threshold, setThreshold] = useState([128])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const removeBackground = useCallback(async (file: File, threshold: number): Promise<ProcessedImage> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")!
      const img = new Image()

      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data

        // Improved background removal algorithm
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]

          // Calculate luminance using proper weights
          const luminance = 0.299 * r + 0.587 * g + 0.114 * b

          // More sophisticated background detection
          const isBackground =
            luminance > threshold ||
            (Math.abs(r - g) < 30 && Math.abs(g - b) < 30 && Math.abs(r - b) < 30 && luminance > threshold * 0.7)

          if (isBackground) {
            data[i + 3] = 0 // Make transparent
          }
        }

        ctx.putImageData(imageData, 0, 0)

        canvas.toBlob((blob) => {
          if (blob) {
            const id = Math.random().toString(36).substr(2, 9)
            resolve({
              id,
              original: file,
              originalPreview: URL.createObjectURL(file),
              processedPreview: URL.createObjectURL(blob),
              processedBlob: blob,
              threshold,
            })
          }
        }, "image/png")
      }

      img.src = URL.createObjectURL(file)
    })
  }, [])

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      const fileArray = Array.from(files)
      const validFiles = fileArray.filter(
        (file) => file.type.startsWith("image/") && file.size < 50 * 1024 * 1024, // 50MB limit
      )

      if (validFiles.length === 0) return

      setIsProcessing(true)
      setProgress(0)

      const processedImages: ProcessedImage[] = []

      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i]
        try {
          const processed = await removeBackground(file, threshold[0])
          processedImages.push(processed)
          setProgress(((i + 1) / validFiles.length) * 100)
        } catch (error) {
          console.error("Error processing image:", error)
        }
      }

      setImages((prev) => [...prev, ...processedImages])
      setIsProcessing(false)
    },
    [removeBackground, threshold],
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

  const downloadImage = (image: ProcessedImage) => {
    const url = URL.createObjectURL(image.processedBlob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${image.original.name.split(".")[0]}_no_bg.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const downloadAll = () => {
    images.forEach(downloadImage)
  }

  const removeImage = (id: string) => {
    setImages((prev) => {
      const updated = prev.filter((img) => img.id !== id)
      const removed = prev.find((img) => img.id === id)
      if (removed) {
        URL.revokeObjectURL(removed.originalPreview)
        URL.revokeObjectURL(removed.processedPreview)
      }
      return updated
    })
  }

  const reprocessImage = async (image: ProcessedImage) => {
    setIsProcessing(true)
    try {
      const reprocessed = await removeBackground(image.original, threshold[0])
      setImages((prev) => prev.map((img) => (img.id === image.id ? reprocessed : img)))
    } catch (error) {
      console.error("Error reprocessing image:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-slate-900 dark:to-slate-800 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tools
          </Link>
          <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            AI Background Remover
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Remove backgrounds from images instantly with AI precision. Get transparent PNGs in seconds.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="mb-8 shadow-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg">
                  <Scissors className="w-6 h-6" />
                </div>
                Upload Images
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-8">
                <label className="block text-lg font-semibold mb-4">Background Threshold: {threshold[0]}</label>
                <Slider
                  value={threshold}
                  onValueChange={setThreshold}
                  max={255}
                  min={50}
                  step={5}
                  className="w-full mb-4"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>More sensitive (50)</span>
                  <span>Less sensitive (255)</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Adjust threshold to fine-tune background removal. Higher values remove more background.
                </p>
              </div>

              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
                  dragActive
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20 scale-105"
                    : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => e.target.files && handleFiles(e.target.files)}
                  className="hidden"
                />
                <motion.div animate={dragActive ? { scale: 1.1 } : { scale: 1 }} transition={{ duration: 0.2 }}>
                  <Upload className="w-16 h-16 mx-auto mb-6 text-gray-400" />
                  {dragActive ? (
                    <p className="text-2xl font-semibold text-green-600">Drop images here!</p>
                  ) : (
                    <div>
                      <p className="text-2xl font-semibold mb-3">Drag & drop images here</p>
                      <p className="text-lg text-gray-500 mb-4">or click to browse files</p>
                      <div className="flex flex-wrap justify-center gap-2">
                        <Badge variant="secondary">JPG</Badge>
                        <Badge variant="secondary">PNG</Badge>
                        <Badge variant="secondary">WebP</Badge>
                        <Badge variant="secondary">AI Powered</Badge>
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
                      <Zap className="w-5 h-5 text-green-500 animate-pulse" />
                      <span className="text-lg font-semibold">AI is removing backgrounds...</span>
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
          {images.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <Card className="shadow-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">Processed Images ({images.length})</CardTitle>
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
                    {images.map((image, index) => (
                      <motion.div
                        key={image.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border rounded-2xl bg-gradient-to-r from-gray-50 to-white dark:from-slate-700 dark:to-slate-600 shadow-lg overflow-hidden"
                      >
                        <div className="p-6">
                          <h3 className="font-semibold text-lg mb-4">{image.original.name}</h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="text-center">
                              <p className="text-sm font-medium text-gray-500 mb-2">Original</p>
                              <div className="bg-gray-100 dark:bg-slate-600 rounded-lg p-4">
                                <img
                                  src={image.originalPreview || "/placeholder.svg"}
                                  alt="Original"
                                  className="max-w-full h-auto max-h-64 mx-auto rounded-lg shadow-md"
                                />
                              </div>
                            </div>

                            <div className="text-center">
                              <p className="text-sm font-medium text-gray-500 mb-2">Background Removed</p>
                              <div className="bg-transparent bg-[linear-gradient(45deg,#ccc_25%,transparent_25%),linear-gradient(-45deg,#ccc_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#ccc_75%),linear-gradient(-45deg,transparent_75%,#ccc_75%)] bg-[length:20px_20px] bg-[0_0,0_10px,10px_-10px,-10px_0px] rounded-lg p-4">
                                <img
                                  src={image.processedPreview || "/placeholder.svg"}
                                  alt="Processed"
                                  className="max-w-full h-auto max-h-64 mx-auto rounded-lg shadow-md"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-3 justify-center">
                            <Button
                              onClick={() => reprocessImage(image)}
                              size="sm"
                              variant="outline"
                              className="flex items-center gap-2"
                              disabled={isProcessing}
                            >
                              <Zap className="w-4 h-4" />
                              Reprocess
                            </Button>
                            <Button
                              onClick={() => downloadImage(image)}
                              size="sm"
                              className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                            >
                              <Download className="w-4 h-4" />
                              Download PNG
                            </Button>
                            <Button
                              onClick={() => removeImage(image.id)}
                              size="sm"
                              variant="outline"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <X className="w-4 h-4" />
                            </Button>
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
