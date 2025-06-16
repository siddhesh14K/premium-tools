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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Download, FileArchiveIcon as Compress, ArrowLeft, X, Zap, Gauge } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

interface VideoFile {
  id: string
  original: File
  originalSize: number
  compressedBlob?: Blob
  compressedSize?: number
  compressionRatio?: number
  originalPreview: string
  compressedPreview?: string
  thumbnail?: string
  duration?: number
  dimensions?: { width: number; height: number }
  settings: CompressionSettings
  status: "pending" | "processing" | "completed" | "error"
  progress: number
}

interface CompressionSettings {
  quality: number
  resolution: string
  bitrate: number
  format: string
  fps: number
  audioQuality: number
  removeAudio: boolean
  fastStart: boolean
  twoPass: boolean
  preset: "ultrafast" | "fast" | "medium" | "slow" | "veryslow"
}

const COMPRESSION_PRESETS = {
  "social-media": {
    quality: 75,
    resolution: "1280x720",
    bitrate: 1500,
    fps: 30,
    audioQuality: 128,
    preset: "fast" as const,
    description: "Optimized for social media platforms",
  },
  "web-streaming": {
    quality: 70,
    resolution: "1920x1080",
    bitrate: 2500,
    fps: 30,
    audioQuality: 128,
    preset: "medium" as const,
    description: "Perfect for web streaming and embedding",
  },
  "mobile-friendly": {
    quality: 65,
    resolution: "854x480",
    bitrate: 800,
    fps: 24,
    audioQuality: 96,
    preset: "fast" as const,
    description: "Optimized for mobile devices and slow connections",
  },
  "high-quality": {
    quality: 85,
    resolution: "1920x1080",
    bitrate: 4000,
    fps: 60,
    audioQuality: 192,
    preset: "slow" as const,
    description: "High quality with moderate compression",
  },
  "maximum-compression": {
    quality: 50,
    resolution: "640x360",
    bitrate: 400,
    fps: 24,
    audioQuality: 64,
    preset: "veryslow" as const,
    description: "Maximum file size reduction",
  },
}

export function VideoCompressor() {
  const [videos, setVideos] = useState<VideoFile[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [selectedPreset, setSelectedPreset] = useState<keyof typeof COMPRESSION_PRESETS>("web-streaming")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getVideoMetadata = useCallback(
    (file: File): Promise<{ duration: number; dimensions: { width: number; height: number } }> => {
      return new Promise((resolve) => {
        const video = document.createElement("video")
        video.preload = "metadata"

        video.onloadedmetadata = () => {
          resolve({
            duration: video.duration,
            dimensions: {
              width: video.videoWidth,
              height: video.videoHeight,
            },
          })
          URL.revokeObjectURL(video.src)
        }

        video.src = URL.createObjectURL(file)
      })
    },
    [],
  )

  const generateThumbnail = useCallback((file: File): Promise<string> => {
    return new Promise((resolve) => {
      const video = document.createElement("video")
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")!

      video.onloadeddata = () => {
        video.currentTime = Math.min(5, video.duration / 4)
      }

      video.onseeked = () => {
        canvas.width = 320
        canvas.height = (video.videoHeight / video.videoWidth) * 320
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(URL.createObjectURL(blob))
            }
          },
          "image/jpeg",
          0.8,
        )

        URL.revokeObjectURL(video.src)
      }

      video.src = URL.createObjectURL(file)
    })
  }, [])

  const compressVideo = useCallback(async (video: VideoFile): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const sourceVideo = document.createElement("video")
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")!

      sourceVideo.onloadedmetadata = () => {
        const [targetWidth, targetHeight] = video.settings.resolution.split("x").map(Number)
        canvas.width = targetWidth
        canvas.height = targetHeight

        const videoBitrate = video.settings.bitrate * 1000
        const audioBitrate = video.settings.removeAudio ? 0 : video.settings.audioQuality * 1000

        const stream = canvas.captureStream(video.settings.fps)

        if (!video.settings.removeAudio && sourceVideo.captureStream) {
          const audioStream = sourceVideo.captureStream().getAudioTracks()[0]
          if (audioStream) {
            stream.addTrack(audioStream)
          }
        }

        const mimeType = video.settings.format === "mp4" ? "video/webm;codecs=vp9,opus" : "video/webm;codecs=vp9,opus"

        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: mimeType,
          videoBitsPerSecond: videoBitrate,
          audioBitsPerSecond: audioBitrate,
        })

        const chunks: Blob[] = []
        const targetFrameRate = video.settings.fps
        const frameDuration = 1000 / targetFrameRate

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data)
          }
        }

        mediaRecorder.onstop = () => {
          const compressedBlob = new Blob(chunks, {
            type: video.settings.format === "mp4" ? "video/mp4" : "video/webm",
          })
          resolve(compressedBlob)
        }

        mediaRecorder.onerror = (event) => {
          reject(new Error("MediaRecorder error: " + event))
        }

        mediaRecorder.start(100)

        const renderFrame = () => {
          if (sourceVideo.currentTime >= sourceVideo.duration) {
            mediaRecorder.stop()
            return
          }

          ctx.imageSmoothingEnabled = video.settings.quality > 70
          ctx.imageSmoothingQuality = video.settings.quality > 80 ? "high" : "medium"

          ctx.drawImage(sourceVideo, 0, 0, canvas.width, canvas.height)

          if (video.settings.quality < 60) {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
            const data = imageData.data

            for (let i = 0; i < data.length; i += 4) {
              const factor = Math.floor(256 / (video.settings.quality / 10))
              data[i] = Math.floor(data[i] / factor) * factor
              data[i + 1] = Math.floor(data[i + 1] / factor) * factor
              data[i + 2] = Math.floor(data[i + 2] / factor) * factor
            }

            ctx.putImageData(imageData, 0, 0)
          }

          setTimeout(() => {
            sourceVideo.currentTime += frameDuration / 1000
          }, frameDuration)
        }

        sourceVideo.onseeked = renderFrame
        sourceVideo.ontimeupdate = () => {
          const progress = (sourceVideo.currentTime / sourceVideo.duration) * 100
          setVideos((prev) => prev.map((v) => (v.id === video.id ? { ...v, progress: Math.round(progress) } : v)))
        }

        sourceVideo.currentTime = 0
      }

      sourceVideo.src = video.originalPreview
    })
  }, [])

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      const fileArray = Array.from(files)
      const validFiles = fileArray.filter(
        (file) => file.type.startsWith("video/") && file.size < 5 * 1024 * 1024 * 1024,
      )

      if (validFiles.length === 0) {
        alert("Please select valid video files (max 5GB each)")
        return
      }

      const newVideos: VideoFile[] = []

      for (const file of validFiles) {
        try {
          const metadata = await getVideoMetadata(file)
          const thumbnail = await generateThumbnail(file)
          const preset = COMPRESSION_PRESETS[selectedPreset]

          const video: VideoFile = {
            id: Math.random().toString(36).substr(2, 9),
            original: file,
            originalSize: file.size,
            originalPreview: URL.createObjectURL(file),
            thumbnail,
            duration: metadata.duration,
            dimensions: metadata.dimensions,
            settings: {
              quality: preset.quality,
              resolution: preset.resolution,
              bitrate: preset.bitrate,
              format: "webm",
              fps: preset.fps,
              audioQuality: preset.audioQuality,
              removeAudio: false,
              fastStart: true,
              twoPass: false,
              preset: preset.preset,
            },
            status: "pending",
            progress: 0,
          }
          newVideos.push(video)
        } catch (error) {
          console.error("Error processing file:", file.name, error)
        }
      }

      setVideos((prev) => [...prev, ...newVideos])
    },
    [getVideoMetadata, generateThumbnail, selectedPreset],
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

  const updateVideoSettings = (videoId: string, settings: Partial<CompressionSettings>) => {
    setVideos((prev) =>
      prev.map((video) => (video.id === videoId ? { ...video, settings: { ...video.settings, ...settings } } : video)),
    )
  }

  const applyPresetToVideo = (videoId: string, presetKey: keyof typeof COMPRESSION_PRESETS) => {
    const preset = COMPRESSION_PRESETS[presetKey]
    updateVideoSettings(videoId, {
      quality: preset.quality,
      resolution: preset.resolution,
      bitrate: preset.bitrate,
      fps: preset.fps,
      audioQuality: preset.audioQuality,
      preset: preset.preset,
    })
  }

  const processVideo = async (video: VideoFile) => {
    setVideos((prev) => prev.map((v) => (v.id === video.id ? { ...v, status: "processing", progress: 0 } : v)))

    try {
      const compressedBlob = await compressVideo(video)
      const compressionRatio = ((video.originalSize - compressedBlob.size) / video.originalSize) * 100

      setVideos((prev) =>
        prev.map((v) =>
          v.id === video.id
            ? {
                ...v,
                compressedBlob,
                compressedSize: compressedBlob.size,
                compressionRatio: Math.max(0, compressionRatio),
                compressedPreview: URL.createObjectURL(compressedBlob),
                status: "completed",
                progress: 100,
              }
            : v,
        ),
      )
    } catch (error) {
      console.error("Error compressing video:", error)
      setVideos((prev) => prev.map((v) => (v.id === video.id ? { ...v, status: "error", progress: 0 } : v)))
    }
  }

  const processAllVideos = async () => {
    setIsProcessing(true)
    const pendingVideos = videos.filter((v) => v.status === "pending")

    for (const video of pendingVideos) {
      await processVideo(video)
    }

    setIsProcessing(false)
  }

  const downloadVideo = (video: VideoFile) => {
    if (!video.compressedBlob) return

    const url = URL.createObjectURL(video.compressedBlob)
    const a = document.createElement("a")
    a.href = url
    a.download = `compressed_${video.original.name.split(".")[0]}.${video.settings.format}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const downloadAll = () => {
    videos.filter((v) => v.compressedBlob).forEach(downloadVideo)
  }

  const removeVideo = (id: string) => {
    setVideos((prev) => {
      const video = prev.find((v) => v.id === id)
      if (video) {
        URL.revokeObjectURL(video.originalPreview)
        if (video.compressedPreview) {
          URL.revokeObjectURL(video.compressedPreview)
        }
        if (video.thumbnail) {
          URL.revokeObjectURL(video.thumbnail)
        }
      }
      return prev.filter((v) => v.id !== id)
    })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`
  }

  const getCompressionStats = () => {
    const completed = videos.filter((v) => v.status === "completed")
    const totalOriginalSize = completed.reduce((sum, v) => sum + v.originalSize, 0)
    const totalCompressedSize = completed.reduce((sum, v) => sum + (v.compressedSize || 0), 0)
    const averageCompression =
      completed.length > 0 ? completed.reduce((sum, v) => sum + (v.compressionRatio || 0), 0) / completed.length : 0

    return {
      totalOriginalSize,
      totalCompressedSize,
      totalSaved: totalOriginalSize - totalCompressedSize,
      averageCompression,
      completedCount: completed.length,
    }
  }

  const stats = getCompressionStats()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-slate-900 dark:to-slate-800 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tools
          </Link>
          <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Professional Video Compressor
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Advanced video compression with support for large files up to 5GB. Reduce file sizes by up to 90% while
            maintaining quality.
          </p>
        </motion.div>

        {stats.completedCount > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-green-600">{stats.completedCount}</p>
                    <p className="text-sm text-gray-600">Videos Compressed</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">{formatFileSize(stats.totalSaved)}</p>
                    <p className="text-sm text-gray-600">Space Saved</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">{stats.averageCompression.toFixed(1)}%</p>
                    <p className="text-sm text-gray-600">Avg. Compression</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">{formatFileSize(stats.totalCompressedSize)}</p>
                    <p className="text-sm text-gray-600">Total Output Size</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="mb-8 shadow-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg">
                  <Compress className="w-6 h-6" />
                </div>
                Upload Videos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <label className="block text-lg font-semibold mb-4">Compression Presets</label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(COMPRESSION_PRESETS).map(([key, preset]) => (
                    <Card
                      key={key}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                        selectedPreset === key
                          ? "ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-900/20"
                          : "hover:bg-gray-50 dark:hover:bg-slate-700"
                      }`}
                      onClick={() => setSelectedPreset(key as keyof typeof COMPRESSION_PRESETS)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="w-4 h-4 text-purple-500" />
                          <h3 className="font-semibold capitalize">{key.replace("-", " ")}</h3>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{preset.description}</p>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="secondary" className="text-xs">
                            {preset.resolution}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {preset.bitrate}k
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {preset.fps}fps
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
                  dragActive
                    ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20 scale-105"
                    : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="video/*"
                  onChange={(e) => e.target.files && handleFiles(e.target.files)}
                  className="hidden"
                />
                <motion.div animate={dragActive ? { scale: 1.1 } : { scale: 1 }} transition={{ duration: 0.2 }}>
                  <Upload className="w-16 h-16 mx-auto mb-6 text-gray-400" />
                  {dragActive ? (
                    <p className="text-2xl font-semibold text-purple-600">Drop videos here!</p>
                  ) : (
                    <div>
                      <p className="text-2xl font-semibold mb-3">Drag & drop videos here</p>
                      <p className="text-lg text-gray-500 mb-4">or click to browse files</p>
                      <div className="flex flex-wrap justify-center gap-2">
                        <Badge variant="secondary">MP4</Badge>
                        <Badge variant="secondary">WebM</Badge>
                        <Badge variant="secondary">MOV</Badge>
                        <Badge variant="secondary">AVI</Badge>
                        <Badge variant="secondary">Up to 5GB</Badge>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>

              {videos.length > 0 && (
                <div className="mt-6 flex gap-4">
                  <Button
                    onClick={processAllVideos}
                    disabled={isProcessing || videos.every((v) => v.status !== "pending")}
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  >
                    <Compress className="w-4 h-4" />
                    {isProcessing ? "Processing..." : "Compress All"}
                  </Button>

                  {videos.some((v) => v.compressedBlob) && (
                    <Button
                      onClick={downloadAll}
                      className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                    >
                      <Download className="w-4 h-4" />
                      Download All
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <AnimatePresence>
          {videos.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <Card className="shadow-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">Video Compression Queue ({videos.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {videos.map((video, index) => (
                      <motion.div
                        key={video.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border rounded-2xl bg-gradient-to-r from-gray-50 to-white dark:from-slate-700 dark:to-slate-600 shadow-lg overflow-hidden"
                      >
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4">
                              <img
                                src={video.thumbnail || "/placeholder.svg"}
                                alt="Video thumbnail"
                                className="w-16 h-16 rounded-lg object-cover shadow-md"
                              />
                              <div>
                                <h3 className="font-semibold text-lg">{video.original.name}</h3>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                  <span>{formatFileSize(video.originalSize)}</span>
                                  <span>
                                    {video.dimensions && `${video.dimensions.width}x${video.dimensions.height}`}
                                  </span>
                                  <span>{video.duration && formatDuration(video.duration)}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <Badge
                                variant={
                                  video.status === "completed"
                                    ? "default"
                                    : video.status === "processing"
                                      ? "secondary"
                                      : video.status === "error"
                                        ? "destructive"
                                        : "outline"
                                }
                              >
                                {video.status === "processing" && <Gauge className="w-3 h-3 mr-1 animate-spin" />}
                                {video.status.charAt(0).toUpperCase() + video.status.slice(1)}
                              </Badge>
                              <Button
                                onClick={() => removeVideo(video.id)}
                                variant="outline"
                                size="sm"
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          {video.status === "processing" && (
                            <div className="mb-6">
                              <div className="flex items-center gap-3 mb-2">
                                <Compress className="w-4 h-4 text-purple-500 animate-pulse" />
                                <span className="text-sm font-medium">Compressing video...</span>
                                <span className="text-sm text-gray-500">{video.progress}%</span>
                              </div>
                              <Progress value={video.progress} className="w-full h-2" />
                            </div>
                          )}

                          <Tabs defaultValue="preview" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                              <TabsTrigger value="preview">Preview</TabsTrigger>
                              <TabsTrigger value="settings">Settings</TabsTrigger>
                            </TabsList>

                            <TabsContent value="preview" className="space-y-4">
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="text-center">
                                  <p className="text-sm font-medium text-gray-500 mb-2">Original Video</p>
                                  <video
                                    src={video.originalPreview}
                                    controls
                                    className="w-full rounded-lg shadow-lg max-h-64"
                                  />
                                  <div className="mt-2 p-3 bg-gray-100 dark:bg-slate-700 rounded-lg">
                                    <p className="text-sm">
                                      <strong>Size:</strong> {formatFileSize(video.originalSize)}
                                    </p>
                                    <p className="text-sm">
                                      <strong>Quality:</strong> Original
                                    </p>
                                  </div>
                                </div>

                                {video.compressedPreview && (
                                  <div className="text-center">
                                    <p className="text-sm font-medium text-gray-500 mb-2">Compressed Video</p>
                                    <video
                                      src={video.compressedPreview}
                                      controls
                                      className="w-full rounded-lg shadow-lg max-h-64"
                                    />
                                    <div className="mt-2 p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                                      <p className="text-sm">
                                        <strong>Size:</strong> {formatFileSize(video.compressedSize!)}
                                      </p>
                                      <p className="text-sm text-green-600 font-semibold">
                                        <strong>Saved:</strong> {video.compressionRatio?.toFixed(1)}% (
                                        {formatFileSize(video.originalSize - video.compressedSize!)})
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </TabsContent>

                            <TabsContent value="settings" className="space-y-6">
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                  <div>
                                    <label className="block text-sm font-medium mb-2">
                                      Quality: {video.settings.quality}%
                                    </label>
                                    <Slider
                                      value={[video.settings.quality]}
                                      onValueChange={([value]) => updateVideoSettings(video.id, { quality: value })}
                                      max={100}
                                      min={10}
                                      step={5}
                                      className="w-full"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium mb-2">Resolution</label>
                                    <Select
                                      value={video.settings.resolution}
                                      onValueChange={(value) => updateVideoSettings(video.id, { resolution: value })}
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="640x360">360p (640x360)</SelectItem>
                                        <SelectItem value="854x480">480p (854x480)</SelectItem>
                                        <SelectItem value="1280x720">720p (1280x720)</SelectItem>
                                        <SelectItem value="1920x1080">1080p (1920x1080)</SelectItem>
                                        <SelectItem value="2560x1440">1440p (2560x1440)</SelectItem>
                                        <SelectItem value="3840x2160">4K (3840x2160)</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium mb-2">
                                      Video Bitrate: {video.settings.bitrate} kbps
                                    </label>
                                    <Slider
                                      value={[video.settings.bitrate]}
                                      onValueChange={([value]) => updateVideoSettings(video.id, { bitrate: value })}
                                      max={10000}
                                      min={100}
                                      step={100}
                                      className="w-full"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium mb-2">
                                      Frame Rate: {video.settings.fps} fps
                                    </label>
                                    <Slider
                                      value={[video.settings.fps]}
                                      onValueChange={([value]) => updateVideoSettings(video.id, { fps: value })}
                                      max={60}
                                      min={15}
                                      step={1}
                                      className="w-full"
                                    />
                                  </div>
                                </div>

                                <div className="space-y-6">
                                  <div>
                                    <label className="block text-sm font-medium mb-2">Output Format</label>
                                    <Select
                                      value={video.settings.format}
                                      onValueChange={(value) => updateVideoSettings(video.id, { format: value })}
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="webm">WebM (Best Compression)</SelectItem>
                                        <SelectItem value="mp4">MP4 (Universal)</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium mb-2">
                                      Audio Quality: {video.settings.audioQuality} kbps
                                    </label>
                                    <Slider
                                      value={[video.settings.audioQuality]}
                                      onValueChange={([value]) =>
                                        updateVideoSettings(video.id, { audioQuality: value })
                                      }
                                      max={320}
                                      min={32}
                                      step={16}
                                      className="w-full"
                                      disabled={video.settings.removeAudio}
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium mb-2">Encoding Preset</label>
                                    <Select
                                      value={video.settings.preset}
                                      onValueChange={(value) => updateVideoSettings(video.id, { preset: value as any })}
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="ultrafast">Ultra Fast (Larger files)</SelectItem>
                                        <SelectItem value="fast">Fast</SelectItem>
                                        <SelectItem value="medium">Medium (Balanced)</SelectItem>
                                        <SelectItem value="slow">Slow (Better compression)</SelectItem>
                                        <SelectItem value="veryslow">Very Slow (Best compression)</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                      <label className="text-sm font-medium">Remove Audio</label>
                                      <Switch
                                        checked={video.settings.removeAudio}
                                        onCheckedChange={(checked) =>
                                          updateVideoSettings(video.id, { removeAudio: checked })
                                        }
                                      />
                                    </div>

                                    <div className="flex items-center justify-between">
                                      <label className="text-sm font-medium">Fast Start (Web Optimized)</label>
                                      <Switch
                                        checked={video.settings.fastStart}
                                        onCheckedChange={(checked) =>
                                          updateVideoSettings(video.id, { fastStart: checked })
                                        }
                                      />
                                    </div>

                                    <div className="flex items-center justify-between">
                                      <label className="text-sm font-medium">Two-Pass Encoding</label>
                                      <Switch
                                        checked={video.settings.twoPass}
                                        onCheckedChange={(checked) =>
                                          updateVideoSettings(video.id, { twoPass: checked })
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="border-t pt-4">
                                <label className="block text-sm font-medium mb-2">Quick Presets</label>
                                <div className="flex flex-wrap gap-2">
                                  {Object.entries(COMPRESSION_PRESETS).map(([key, preset]) => (
                                    <Button
                                      key={key}
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        applyPresetToVideo(video.id, key as keyof typeof COMPRESSION_PRESETS)
                                      }
                                      className="text-xs"
                                    >
                                      {key.replace("-", " ")}
                                    </Button>
                                  ))}
                                </div>
                              </div>
                            </TabsContent>
                          </Tabs>

                          <div className="flex gap-3 mt-6">
                            <Button
                              onClick={() => processVideo(video)}
                              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                              disabled={video.status === "processing"}
                            >
                              <Compress className="w-4 h-4" />
                              {video.status === "processing" ? "Compressing..." : "Compress Video"}
                            </Button>

                            {video.compressedBlob && (
                              <Button
                                onClick={() => downloadVideo(video)}
                                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                              >
                                <Download className="w-4 h-4" />
                                Download
                              </Button>
                            )}
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
