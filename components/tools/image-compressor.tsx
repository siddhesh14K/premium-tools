"use client"

import type React from "react"

import { useState, useCallback, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Upload, Download, ImageIcon, Zap, ArrowLeft, X, Settings, Target, Maximize } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

interface CompressedImage {
  id: string
  original: File
  compressed: Blob
  originalSize: number
  compressedSize: number
  compressionRatio: number
  originalPreview: string
  compressedPreview: string
  quality: number
  width: number
  height: number
  originalWidth: number
  originalHeight: number
  format: string
  targetSize?: number
  targetReached: boolean
}

interface CompressionSettings {
  quality: number
  targetSize: number
  targetUnit: "KB" | "MB"
  width: number
  height: number
  maintainAspectRatio: boolean
  format: "original" | "jpeg" | "png" | "webp"
  resizeMode: "percentage" | "pixels" | "target-size"
  resizePercentage: number
}

const COMPRESSION_PRESETS = {
  "web-optimized": { quality: 85, targetSize: 500, targetUnit: "KB" as const, description: "Perfect for websites" },
  "social-media": { quality: 80, targetSize: 200, targetUnit: "KB" as const, description: "Instagram, Facebook ready" },
  "email-friendly": {
    quality: 75,
    targetSize: 100,
    targetUnit: "KB" as const,
    description: "Small for email attachments",
  },
  "high-quality": { quality: 95, targetSize: 2, targetUnit: "MB" as const, description: "Minimal compression" },
  "maximum-compression": { quality: 50, targetSize: 50, targetUnit: "KB" as const, description: "Smallest file size" },
}

export function ImageCompressor() {
  const [images, setImages] = useState<CompressedImage[]>([])
  const [settings, setSettings] = useState<CompressionSettings>({
    quality: 80,
    targetSize: 500,
    targetUnit: "KB",
    width: 1920,
    height: 1080,
    maintainAspectRatio: true,
    format: "original",
    resizeMode: "percentage",
    resizePercentage: 100,
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [dragActive, setDragActive] = useState(false)
  const [selectedPreset, setSelectedPreset] = useState<string>("")
  const [batchStats, setBatchStats] = useState({
    totalOriginalSize: 0,
    totalCompressedSize: 0,
    totalSaved: 0,
    averageCompression: 0,
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const compressToTargetSize = useCallback(
    async (
      file: File,
      targetSizeBytes: number,
      settings: CompressionSettings,
    ): Promise<{ blob: Blob; quality: number; attempts: number }> => {
      let quality = settings.quality
      let attempts = 0
      const maxAttempts = 10
      let bestBlob: Blob | null = null
      let bestQuality = quality

      while (attempts < maxAttempts) {
        const blob = await compressImageWithSettings(file, { ...settings, quality })
        attempts++

        if (blob.size <= targetSizeBytes) {
          return { blob, quality, attempts }
        }

        if (!bestBlob || blob.size < bestBlob.size) {
          bestBlob = blob
          bestQuality = quality
        }

        // Reduce quality for next attempt
        quality = Math.max(10, quality - 10)

        if (quality <= 10) break
      }

      return { blob: bestBlob!, quality: bestQuality, attempts }
    },
    [],
  )

  const compressImageWithSettings = useCallback(async (file: File, settings: CompressionSettings): Promise<Blob> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")!
      const img = new Image()

      img.onload = () => {
        let { width, height } = img
        const originalWidth = width
        const originalHeight = height

        // Apply resize settings
        if (settings.resizeMode === "percentage") {
          const scale = settings.resizePercentage / 100
          width = Math.round(width * scale)
          height = Math.round(height * scale)
        } else if (settings.resizeMode === "pixels") {
          width = settings.width
          height = settings.height

          if (settings.maintainAspectRatio) {
            const aspectRatio = originalWidth / originalHeight
            if (width / height > aspectRatio) {
              width = Math.round(height * aspectRatio)
            } else {
              height = Math.round(width / aspectRatio)
            }
          }
        } else if (settings.resizeMode === "target-size") {
          // Smart resize based on target file size
          const targetSizeBytes = settings.targetSize * (settings.targetUnit === "MB" ? 1024 * 1024 : 1024)
          const estimatedScale = Math.sqrt(targetSizeBytes / file.size)
          const scale = Math.min(1, Math.max(0.1, estimatedScale))
          width = Math.round(width * scale)
          height = Math.round(height * scale)
        }

        canvas.width = width
        canvas.height = height

        // High-quality rendering
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = "high"
        ctx.drawImage(img, 0, 0, width, height)

        // Determine output format
        let outputFormat = file.type
        if (settings.format !== "original") {
          outputFormat = `image/${settings.format}`
        }

        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob)
          },
          outputFormat,
          settings.quality / 100,
        )
      }

      img.src = URL.createObjectURL(file)
    })
  }, [])

  const compressImage = useCallback(
    async (file: File, settings: CompressionSettings): Promise<CompressedImage> => {
      const targetSizeBytes = settings.targetSize * (settings.targetUnit === "MB" ? 1024 * 1024 : 1024)

      let compressed: Blob
      let finalQuality = settings.quality
      let targetReached = false

      if (settings.resizeMode === "target-size" || file.size > targetSizeBytes * 2) {
        const result = await compressToTargetSize(file, targetSizeBytes, settings)
        compressed = result.blob
        finalQuality = result.quality
        targetReached = result.blob.size <= targetSizeBytes
      } else {
        compressed = await compressImageWithSettings(file, settings)
        targetReached = compressed.size <= targetSizeBytes
      }

      // Get image dimensions
      const img = new Image()
      const dimensions = await new Promise<{ width: number; height: number }>((resolve) => {
        img.onload = () => resolve({ width: img.width, height: img.height })
        img.src = URL.createObjectURL(compressed)
      })

      const originalImg = new Image()
      const originalDimensions = await new Promise<{ width: number; height: number }>((resolve) => {
        originalImg.onload = () => resolve({ width: originalImg.width, height: originalImg.height })
        originalImg.src = URL.createObjectURL(file)
      })

      const compressionRatio = ((file.size - compressed.size) / file.size) * 100
      const id = Math.random().toString(36).substr(2, 9)

      return {
        id,
        original: file,
        compressed,
        originalSize: file.size,
        compressedSize: compressed.size,
        compressionRatio: Math.max(0, compressionRatio),
        originalPreview: URL.createObjectURL(file),
        compressedPreview: URL.createObjectURL(compressed),
        quality: finalQuality,
        width: dimensions.width,
        height: dimensions.height,
        originalWidth: originalDimensions.width,
        originalHeight: originalDimensions.height,
        format: settings.format === "original" ? file.type.split("/")[1] : settings.format,
        targetSize: targetSizeBytes,
        targetReached,
      }
    },
    [compressToTargetSize, compressImageWithSettings],
  )

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      const fileArray = Array.from(files)
      const validFiles = fileArray.filter(
        (file) => file.type.startsWith("image/") && file.size < 100 * 1024 * 1024, // 100MB limit
      )

      if (validFiles.length === 0) return

      setIsProcessing(true)
      setProgress(0)

      const compressedImages: CompressedImage[] = []
      let totalOriginalSize = 0
      let totalCompressedSize = 0

      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i]
        try {
          const compressed = await compressImage(file, settings)
          compressedImages.push(compressed)
          totalOriginalSize += file.size
          totalCompressedSize += compressed.compressedSize
          setProgress(((i + 1) / validFiles.length) * 100)
        } catch (error) {
          console.error("Error compressing image:", error)
        }
      }

      const totalSaved = totalOriginalSize - totalCompressedSize
      const averageCompression = totalOriginalSize > 0 ? (totalSaved / totalOriginalSize) * 100 : 0

      setBatchStats({
        totalOriginalSize,
        totalCompressedSize,
        totalSaved,
        averageCompression,
      })

      setImages((prev) => [...prev, ...compressedImages])
      setIsProcessing(false)
    },
    [compressImage, settings],
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

  const applyPreset = (presetKey: string) => {
    const preset = COMPRESSION_PRESETS[presetKey as keyof typeof COMPRESSION_PRESETS]
    if (preset) {
      setSettings((prev) => ({
        ...prev,
        quality: preset.quality,
        targetSize: preset.targetSize,
        targetUnit: preset.targetUnit,
      }))
      setSelectedPreset(presetKey)
    }
  }

  const downloadImage = (image: CompressedImage) => {
    const url = URL.createObjectURL(image.compressed)
    const a = document.createElement("a")
    a.href = url
    const extension = image.format === "jpeg" ? "jpg" : image.format
    a.download = `compressed_${image.original.name.split(".")[0]}.${extension}`
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
        URL.revokeObjectURL(removed.compressedPreview)
      }
      return updated
    })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:to-slate-800 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tools
          </Link>
          <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Professional Image Compressor
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Advanced image compression with precise size control, format conversion, and batch processing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Settings Panel */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1">
            <Card className="shadow-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg">
                    <Settings className="w-5 h-5" />
                  </div>
                  Compression Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Presets */}
                <div>
                  <Label className="text-sm font-semibold mb-3 block">Quick Presets</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {Object.entries(COMPRESSION_PRESETS).map(([key, preset]) => (
                      <Button
                        key={key}
                        variant={selectedPreset === key ? "default" : "outline"}
                        size="sm"
                        onClick={() => applyPreset(key)}
                        className="justify-start text-left h-auto p-3"
                      >
                        <div>
                          <div className="font-medium capitalize">{key.replace("-", " ")}</div>
                          <div className="text-xs text-gray-500">{preset.description}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="basic">Basic</TabsTrigger>
                    <TabsTrigger value="size">Size</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-y-4">
                    {/* Quality */}
                    <div>
                      <Label className="text-sm font-semibold mb-3 block">Quality: {settings.quality}%</Label>
                      <Slider
                        value={[settings.quality]}
                        onValueChange={([value]) => setSettings((prev) => ({ ...prev, quality: value }))}
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

                    {/* Format */}
                    <div>
                      <Label className="text-sm font-semibold mb-2 block">Output Format</Label>
                      <Select
                        value={settings.format}
                        onValueChange={(value: any) => setSettings((prev) => ({ ...prev, format: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="original">Keep Original</SelectItem>
                          <SelectItem value="jpeg">JPEG (Smaller)</SelectItem>
                          <SelectItem value="png">PNG (Lossless)</SelectItem>
                          <SelectItem value="webp">WebP (Modern)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>

                  <TabsContent value="size" className="space-y-4">
                    {/* Target Size */}
                    <div>
                      <Label className="text-sm font-semibold mb-2 block">Target File Size</Label>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          value={settings.targetSize}
                          onChange={(e) =>
                            setSettings((prev) => ({
                              ...prev,
                              targetSize: Number(e.target.value),
                            }))
                          }
                          className="flex-1"
                          min="1"
                        />
                        <Select
                          value={settings.targetUnit}
                          onValueChange={(value: "KB" | "MB") =>
                            setSettings((prev) => ({
                              ...prev,
                              targetUnit: value,
                            }))
                          }
                        >
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="KB">KB</SelectItem>
                            <SelectItem value="MB">MB</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Resize Mode */}
                    <div>
                      <Label className="text-sm font-semibold mb-2 block">Resize Mode</Label>
                      <Select
                        value={settings.resizeMode}
                        onValueChange={(value: any) => setSettings((prev) => ({ ...prev, resizeMode: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">Percentage</SelectItem>
                          <SelectItem value="pixels">Custom Pixels</SelectItem>
                          <SelectItem value="target-size">Auto (Target Size)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Resize Controls */}
                    {settings.resizeMode === "percentage" && (
                      <div>
                        <Label className="text-sm font-semibold mb-2 block">Scale: {settings.resizePercentage}%</Label>
                        <Slider
                          value={[settings.resizePercentage]}
                          onValueChange={([value]) =>
                            setSettings((prev) => ({
                              ...prev,
                              resizePercentage: value,
                            }))
                          }
                          max={200}
                          min={10}
                          step={5}
                          className="w-full"
                        />
                      </div>
                    )}

                    {settings.resizeMode === "pixels" && (
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={settings.maintainAspectRatio}
                            onCheckedChange={(checked) =>
                              setSettings((prev) => ({
                                ...prev,
                                maintainAspectRatio: checked,
                              }))
                            }
                          />
                          <Label className="text-sm">Maintain aspect ratio</Label>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label className="text-xs">Width (px)</Label>
                            <Input
                              type="number"
                              value={settings.width}
                              onChange={(e) =>
                                setSettings((prev) => ({
                                  ...prev,
                                  width: Number(e.target.value),
                                }))
                              }
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Height (px)</Label>
                            <Input
                              type="number"
                              value={settings.height}
                              onChange={(e) =>
                                setSettings((prev) => ({
                                  ...prev,
                                  height: Number(e.target.value),
                                }))
                              }
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="advanced" className="space-y-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <p className="mb-2">Advanced features:</p>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>Smart target size compression</li>
                        <li>Multi-pass quality optimization</li>
                        <li>Format-specific optimization</li>
                        <li>Batch processing statistics</li>
                      </ul>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          {/* Upload Area */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2">
            <Card className="shadow-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  Upload Images
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
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
                    <Upload className="w-16 h-16 mx-auto mb-6 text-gray-400" />
                    {dragActive ? (
                      <p className="text-2xl font-semibold text-blue-600">Drop images here!</p>
                    ) : (
                      <div>
                        <p className="text-2xl font-semibold mb-3">Drag & drop images here</p>
                        <p className="text-lg text-gray-500 mb-4">or click to browse files</p>
                        <div className="flex flex-wrap justify-center gap-2">
                          <Badge variant="secondary">JPG</Badge>
                          <Badge variant="secondary">PNG</Badge>
                          <Badge variant="secondary">WebP</Badge>
                          <Badge variant="secondary">Up to 100MB</Badge>
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
                        <span className="text-lg font-semibold">Processing images...</span>
                      </div>
                      <Progress value={progress} className="w-full h-3" />
                      <p className="text-sm text-gray-500 mt-2">{Math.round(progress)}% complete</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Batch Statistics */}
        <AnimatePresence>
          {images.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <Card className="shadow-2xl border-0 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{images.length}</div>
                      <div className="text-sm text-gray-600">Images Processed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{formatFileSize(batchStats.totalSaved)}</div>
                      <div className="text-sm text-gray-600">Space Saved</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {batchStats.averageCompression.toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-600">Avg. Compression</div>
                    </div>
                    <div className="text-center">
                      <Button
                        onClick={downloadAll}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download All
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {images.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="shadow-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">Compressed Images ({images.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {images.map((image, index) => (
                      <motion.div
                        key={image.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border rounded-2xl p-6 bg-gradient-to-r from-gray-50 to-white dark:from-slate-700 dark:to-slate-600 shadow-lg"
                      >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                          {/* Original Image */}
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-3">
                              <ImageIcon className="w-4 h-4 text-gray-500" />
                              <span className="text-sm font-medium text-gray-500">Original Image</span>
                            </div>
                            <div className="bg-gray-100 dark:bg-slate-600 rounded-lg p-4 mb-3">
                              <img
                                src={image.originalPreview || "/placeholder.svg"}
                                alt="Original"
                                className="max-w-full h-auto max-h-48 mx-auto rounded-lg shadow-md"
                              />
                            </div>
                            <div className="text-xs text-gray-500 space-y-1">
                              <p>Size: {formatFileSize(image.originalSize)}</p>
                              <p>
                                Dimensions: {image.originalWidth} × {image.originalHeight}px
                              </p>
                              <p>Format: {image.original.type.split("/")[1].toUpperCase()}</p>
                            </div>
                          </div>

                          {/* Compressed Image */}
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-3">
                              <Zap className="w-4 h-4 text-green-500" />
                              <span className="text-sm font-medium text-green-600">Compressed Image</span>
                              {image.targetReached && (
                                <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                                  <Target className="w-3 h-3 mr-1" />
                                  Target Reached
                                </Badge>
                              )}
                            </div>
                            <div className="bg-gray-100 dark:bg-slate-600 rounded-lg p-4 mb-3">
                              <img
                                src={image.compressedPreview || "/placeholder.svg"}
                                alt="Compressed"
                                className="max-w-full h-auto max-h-48 mx-auto rounded-lg shadow-md"
                              />
                            </div>
                            <div className="text-xs text-gray-500 space-y-1">
                              <p className="text-green-600 font-semibold">
                                Size: {formatFileSize(image.compressedSize)}
                              </p>
                              <p>
                                Dimensions: {image.width} × {image.height}px
                              </p>
                              <p>Format: {image.format.toUpperCase()}</p>
                              <p>Quality: {image.quality}%</p>
                            </div>
                          </div>
                        </div>

                        {/* Compression Stats */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
                          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2">
                            <Maximize className="w-4 h-4" />
                            Compression Analysis
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-blue-800 dark:text-blue-200">Original Size</p>
                              <p className="font-bold">{formatFileSize(image.originalSize)}</p>
                            </div>
                            <div>
                              <p className="text-blue-800 dark:text-blue-200">Compressed Size</p>
                              <p className="font-bold text-green-600">{formatFileSize(image.compressedSize)}</p>
                            </div>
                            <div>
                              <p className="text-blue-800 dark:text-blue-200">Space Saved</p>
                              <p className="font-bold text-green-600">
                                {formatFileSize(image.originalSize - image.compressedSize)}
                              </p>
                            </div>
                            <div>
                              <p className="text-blue-800 dark:text-blue-200">Compression</p>
                              <p className="font-bold text-green-600">{image.compressionRatio.toFixed(1)}%</p>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="mt-3">
                            <div className="flex justify-between text-xs text-blue-800 dark:text-blue-200 mb-1">
                              <span>Compression Progress</span>
                              <span>{image.compressionRatio.toFixed(1)}%</span>
                            </div>
                            <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${Math.min(100, image.compressionRatio)}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        {/* File Info */}
                        <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-3 mb-4">
                          <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">File Details:</h5>
                          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            <p>
                              <strong>Original:</strong> {image.original.name}
                            </p>
                            <p>
                              <strong>Size Change:</strong> {image.originalWidth}×{image.originalHeight} → {image.width}
                              ×{image.height}
                            </p>
                            <p>
                              <strong>Format:</strong> {image.original.type.split("/")[1].toUpperCase()} →{" "}
                              {image.format.toUpperCase()}
                            </p>
                            {image.targetSize && (
                              <p>
                                <strong>Target Size:</strong> {formatFileSize(image.targetSize)}
                                {image.targetReached ? (
                                  <span className="text-green-600 ml-2">✓ Achieved</span>
                                ) : (
                                  <span className="text-orange-600 ml-2">⚠ Close as possible</span>
                                )}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 justify-end">
                          <Button
                            onClick={() => downloadImage(image)}
                            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </Button>
                          <Button
                            onClick={() => removeImage(image.id)}
                            variant="outline"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="w-4 h-4" />
                          </Button>
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
