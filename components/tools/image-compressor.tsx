"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Download, Zap, ArrowLeft, ImageIcon, Settings, Sparkles, Eye, Trash2 } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

interface CompressedImage {
  id: string
  originalFile: File
  compressedBlob?: Blob
  originalSize: number
  compressedSize?: number
  compressionRatio?: number
  previewUrl: string
  compressedUrl?: string
  settings: {
    quality: number
    maxWidth: number
    maxHeight: number
    format: string
    maintainAspectRatio: boolean
    removeMetadata: boolean
  }
}

const FORMATS = {
  original: "Keep Original",
  jpeg: "JPEG",
  png: "PNG",
  webp: "WebP (Modern)",
}

const PRESETS = {
  web: { quality: 85, maxWidth: 1920, maxHeight: 1080, format: "jpeg" },
  social: { quality: 90, maxWidth: 1200, maxHeight: 1200, format: "jpeg" },
  email: { quality: 75, maxWidth: 800, maxHeight: 600, format: "jpeg" },
  thumbnail: { quality: 80, maxWidth: 300, maxHeight: 300, format: "jpeg" },
  print: { quality: 95, maxWidth: 3000, maxHeight: 3000, format: "png" },
}

export function ImageCompressor() {
  const [images, setImages] = useState<CompressedImage[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [dragActive, setDragActive] = useState(false)
  const [selectedPreset, setSelectedPreset] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleFiles = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files)
    const validFiles = fileArray.filter(
      (file) => file.type.startsWith("image/") && file.size < 50 * 1024 * 1024, // 50MB limit
    )

    if (validFiles.length === 0) {
      alert("Please select valid image files (under 50MB each)")
      return
    }

    const newImages: CompressedImage[] = []

    for (const file of validFiles) {
      const previewUrl = URL.createObjectURL(file)

      const image: CompressedImage = {
        id: Math.random().toString(36).substr(2, 9),
        originalFile: file,
        originalSize: file.size,
        previewUrl,
        settings: {
          quality: 85,
          maxWidth: 1920,
          maxHeight: 1080,
          format: "original",
          maintainAspectRatio: true,
          removeMetadata: true,
        },
      }

      newImages.push(image)
    }

    setImages((prev) => [...prev, ...newImages])
  }, [])

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

  const updateImageSettings = (imageId: string, settings: Partial<CompressedImage["settings"]>) => {
    setImages((prev) =>
      prev.map((img) => (img.id === imageId ? { ...img, settings: { ...img.settings, ...settings } } : img)),
    )
  }

  const applyPreset = (imageId: string, presetKey: string) => {
    const preset = PRESETS[presetKey as keyof typeof PRESETS]
    if (preset) {
      updateImageSettings(imageId, preset)
    }
  }

  const compressImage = async (image: CompressedImage): Promise<CompressedImage> => {
    return new Promise((resolve) => {
      const canvas = canvasRef.current!
      const ctx = canvas.getContext("2d")!
      const img = new Image()

      img.onload = () => {
        // Calculate dimensions
        let { width, height } = img
        const { maxWidth, maxHeight, maintainAspectRatio } = image.settings

        if (maintainAspectRatio) {
          const ratio = Math.min(maxWidth / width, maxHeight / height)
          if (ratio < 1) {
            width *= ratio
            height *= ratio
          }
        } else {
          width = Math.min(width, maxWidth)
          height = Math.min(height, maxHeight)
        }

        // Set canvas size
        canvas.width = width
        canvas.height = height

        // Draw image
        ctx.drawImage(img, 0, 0, width, height)

        // Determine output format
        let outputFormat = image.settings.format
        if (outputFormat === "original") {
          outputFormat = image.originalFile.type.split("/")[1]
        }

        const mimeType = `image/${outputFormat}`
        const quality = image.settings.quality / 100

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedUrl = URL.createObjectURL(blob)
              const compressionRatio = ((image.originalSize - blob.size) / image.originalSize) * 100

              resolve({
                ...image,
                compressedBlob: blob,
                compressedSize: blob.size,
                compressedUrl,
                compressionRatio,
              })
            }
          },
          mimeType,
          quality,
        )
      }

      img.src = image.previewUrl
    })
  }

  const compressAllImages = async () => {
    setIsProcessing(true)
    setProgress(0)

    const compressedImages: CompressedImage[] = []

    for (let i = 0; i < images.length; i++) {
      const image = images[i]
      setProgress(((i + 1) / images.length) * 100)

      try {
        const compressed = await compressImage(image)
        compressedImages.push(compressed)
      } catch (error) {
        console.error(`Error compressing ${image.originalFile.name}:`, error)
        compressedImages.push(image) // Keep original if compression fails
      }
    }

    setImages(compressedImages)
    setIsProcessing(false)
    setProgress(100)
  }

  const downloadImage = (image: CompressedImage) => {
    if (!image.compressedBlob) return

    const url = URL.createObjectURL(image.compressedBlob)
    const a = document.createElement("a")
    const extension =
      image.settings.format === "original" ? image.originalFile.name.split(".").pop() : image.settings.format

    a.href = url
    a.download = `compressed_${image.originalFile.name.split(".")[0]}.${extension}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const downloadAllImages = () => {
    images.forEach((image) => {
      if (image.compressedBlob) {
        setTimeout(() => downloadImage(image), 100) // Small delay between downloads
      }
    })
  }

  const removeImage = (imageId: string) => {
    setImages((prev) => {
      const image = prev.find((img) => img.id === imageId)
      if (image) {
        URL.revokeObjectURL(image.previewUrl)
        if (image.compressedUrl) {
          URL.revokeObjectURL(image.compressedUrl)
        }
      }
      return prev.filter((img) => img.id !== imageId)
    })
  }

  const clearAllImages = () => {
    images.forEach((image) => {
      URL.revokeObjectURL(image.previewUrl)
      if (image.compressedUrl) {
        URL.revokeObjectURL(image.compressedUrl)
      }
    })
    setImages([])
  }

  const totalOriginalSize = images.reduce((sum, img) => sum + img.originalSize, 0)
  const totalCompressedSize = images.reduce((sum, img) => sum + (img.compressedSize || img.originalSize), 0)
  const totalSavings = totalOriginalSize > 0 ? ((totalOriginalSize - totalCompressedSize) / totalOriginalSize) * 100 : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:to-slate-800 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tools
          </Link>
          <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Premium Image Compressor
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Compress images without losing quality. Reduce file sizes by up to 90% while maintaining visual excellence.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="mb-8 shadow-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg">
                  <ImageIcon className="w-6 h-6" />
                </div>
                Smart Image Compression
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 md:p-12 text-center cursor-pointer transition-all duration-300 ${
                  dragActive
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-105"
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
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                  {dragActive ? (
                    <p className="text-2xl font-semibold text-blue-600">Drop images here!</p>
                  ) : (
                    <div>
                      <p className="text-xl md:text-2xl font-semibold mb-3">Drag & drop images here</p>
                      <p className="text-base md:text-lg text-gray-500 mb-4">or click to browse files</p>
                      <div className="flex flex-wrap justify-center gap-2">
                        <Badge variant="outline" className="bg-white/50 dark:bg-slate-800/50">
                          JPG
                        </Badge>
                        <Badge variant="outline" className="bg-white/50 dark:bg-slate-800/50">
                          PNG
                        </Badge>
                        <Badge variant="outline" className="bg-white/50 dark:bg-slate-800/50">
                          WebP
                        </Badge>
                        <Badge variant="outline" className="bg-white/50 dark:bg-slate-800/50">
                          <Sparkles className="w-3 h-3 mr-1" />
                          Up to 50MB
                        </Badge>
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
                      <Zap className="w-5 h-5 text-blue-500 animate-pulse" />
                      <span className="text-lg font-semibold">Compressing images...</span>
                    </div>
                    <Progress value={progress} className="w-full h-3" />
                    <p className="text-sm text-gray-500 mt-2">{Math.round(progress)}% complete</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hidden canvas for processing */}
              <canvas ref={canvasRef} className="hidden" />
            </CardContent>
          </Card>
        </motion.div>

        {/* Statistics Card */}
        <AnimatePresence>
          {images.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <Card className="mb-8 shadow-xl border-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10">
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">{images.length}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Images</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-indigo-600">{formatFileSize(totalOriginalSize)}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Original Size</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">{formatFileSize(totalCompressedSize)}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Compressed Size</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-emerald-600">{totalSavings.toFixed(1)}%</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Space Saved</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center gap-3 mt-6">
                    <Button
                      onClick={compressAllImages}
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                      disabled={isProcessing}
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      {isProcessing ? "Compressing..." : "Compress All"}
                    </Button>

                    {images.some((img) => img.compressedBlob) && (
                      <Button
                        onClick={downloadAllImages}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download All
                      </Button>
                    )}

                    <Button
                      onClick={clearAllImages}
                      variant="outline"
                      className="border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear All
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Images Grid */}
        <AnimatePresence>
          {images.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {images.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="shadow-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm overflow-hidden">
                      <CardHeader className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10">
                        <CardTitle className="text-lg flex items-center justify-between">
                          <span className="truncate">{image.originalFile.name}</span>
                          <Button
                            onClick={() => removeImage(image.id)}
                            variant="ghost"
                            size="sm"
                            className="text-gray-500 hover:text-red-500 flex-shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-6">
                          {/* Image Preview */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold mb-2 text-sm">Original</h4>
                              <div className="relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                                <img
                                  src={image.previewUrl || "/placeholder.svg"}
                                  alt="Original"
                                  className="w-full h-32 object-cover"
                                />
                                <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                  {formatFileSize(image.originalSize)}
                                </div>
                              </div>
                            </div>

                            {image.compressedUrl && (
                              <div>
                                <h4 className="font-semibold mb-2 text-sm flex items-center gap-2">
                                  Compressed
                                  <Badge
                                    variant="secondary"
                                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                  >
                                    -{image.compressionRatio?.toFixed(1)}%
                                  </Badge>
                                </h4>
                                <div className="relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                                  <img
                                    src={image.compressedUrl || "/placeholder.svg"}
                                    alt="Compressed"
                                    className="w-full h-32 object-cover"
                                  />
                                  <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                    {formatFileSize(image.compressedSize || 0)}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Settings */}
                          <Tabs defaultValue="basic">
                            <TabsList className="grid w-full grid-cols-2">
                              <TabsTrigger value="basic">Basic</TabsTrigger>
                              <TabsTrigger value="advanced">Advanced</TabsTrigger>
                            </TabsList>

                            <TabsContent value="basic" className="space-y-4 pt-4">
                              <div>
                                <Label className="block text-sm font-medium mb-2">Quick Presets</Label>
                                <Select
                                  value={selectedPreset}
                                  onValueChange={(value) => {
                                    setSelectedPreset(value)
                                    applyPreset(image.id, value)
                                  }}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Choose a preset..." />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="web">Web (1920×1080, 85% quality)</SelectItem>
                                    <SelectItem value="social">Social Media (1200×1200, 90% quality)</SelectItem>
                                    <SelectItem value="email">Email (800×600, 75% quality)</SelectItem>
                                    <SelectItem value="thumbnail">Thumbnail (300×300, 80% quality)</SelectItem>
                                    <SelectItem value="print">Print Quality (3000×3000, 95% quality)</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div>
                                <Label className="block text-sm font-medium mb-2">
                                  Quality: {image.settings.quality}%
                                </Label>
                                <Slider
                                  value={[image.settings.quality]}
                                  onValueChange={([value]) => updateImageSettings(image.id, { quality: value })}
                                  max={100}
                                  min={10}
                                  step={5}
                                  className="w-full"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                  <span>Smaller file</span>
                                  <span>Better quality</span>
                                </div>
                              </div>

                              <div>
                                <Label className="block text-sm font-medium mb-2">Output Format</Label>
                                <Select
                                  value={image.settings.format}
                                  onValueChange={(value) => updateImageSettings(image.id, { format: value })}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {Object.entries(FORMATS).map(([key, label]) => (
                                      <SelectItem key={key} value={key}>
                                        {label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </TabsContent>

                            <TabsContent value="advanced" className="space-y-4 pt-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="block text-sm font-medium mb-2">Max Width</Label>
                                  <Select
                                    value={image.settings.maxWidth.toString()}
                                    onValueChange={(value) =>
                                      updateImageSettings(image.id, { maxWidth: Number.parseInt(value) })
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="300">300px</SelectItem>
                                      <SelectItem value="600">600px</SelectItem>
                                      <SelectItem value="800">800px</SelectItem>
                                      <SelectItem value="1200">1200px</SelectItem>
                                      <SelectItem value="1920">1920px</SelectItem>
                                      <SelectItem value="3000">3000px</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div>
                                  <Label className="block text-sm font-medium mb-2">Max Height</Label>
                                  <Select
                                    value={image.settings.maxHeight.toString()}
                                    onValueChange={(value) =>
                                      updateImageSettings(image.id, { maxHeight: Number.parseInt(value) })
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="300">300px</SelectItem>
                                      <SelectItem value="600">600px</SelectItem>
                                      <SelectItem value="800">800px</SelectItem>
                                      <SelectItem value="1200">1200px</SelectItem>
                                      <SelectItem value="1080">1080px</SelectItem>
                                      <SelectItem value="3000">3000px</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <Label className="text-sm font-medium">Maintain Aspect Ratio</Label>
                                  <Switch
                                    checked={image.settings.maintainAspectRatio}
                                    onCheckedChange={(checked) =>
                                      updateImageSettings(image.id, { maintainAspectRatio: checked })
                                    }
                                  />
                                </div>

                                <div className="flex items-center justify-between">
                                  <Label className="text-sm font-medium">Remove Metadata</Label>
                                  <Switch
                                    checked={image.settings.removeMetadata}
                                    onCheckedChange={(checked) =>
                                      updateImageSettings(image.id, { removeMetadata: checked })
                                    }
                                  />
                                </div>
                              </div>
                            </TabsContent>
                          </Tabs>

                          {/* Action Buttons */}
                          <div className="flex flex-wrap gap-3">
                            <Button
                              onClick={() =>
                                compressImage(image).then((compressed) => {
                                  setImages((prev) => prev.map((img) => (img.id === image.id ? compressed : img)))
                                })
                              }
                              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                              disabled={isProcessing}
                            >
                              <Zap className="w-4 h-4 mr-2" />
                              Compress
                            </Button>

                            {image.compressedBlob && (
                              <Button
                                onClick={() => downloadImage(image)}
                                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Features Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="mt-12 shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Advanced Compression Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: <Zap className="w-6 h-6" />,
                    title: "Smart Compression",
                    description: "AI-powered algorithms maintain quality while maximizing compression.",
                  },
                  {
                    icon: <Settings className="w-6 h-6" />,
                    title: "Full Control",
                    description: "Adjust quality, dimensions, format, and metadata removal.",
                  },
                  {
                    icon: <Sparkles className="w-6 h-6" />,
                    title: "Multiple Formats",
                    description: "Support for JPEG, PNG, WebP with format conversion.",
                  },
                  {
                    icon: <Eye className="w-6 h-6" />,
                    title: "Live Preview",
                    description: "See compression results before downloading.",
                  },
                  {
                    icon: <Download className="w-6 h-6" />,
                    title: "Batch Processing",
                    description: "Compress and download multiple images at once.",
                  },
                  {
                    icon: <ImageIcon className="w-6 h-6" />,
                    title: "Quality Presets",
                    description: "Quick presets for web, social media, email, and print.",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="text-center p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl backdrop-blur-sm"
                  >
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-3 rounded-lg w-fit mx-auto mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
