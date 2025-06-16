"use client"

import type React from "react"

import { useState, useRef, useCallback, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  Upload,
  Download,
  Zap,
  ArrowLeft,
  Play,
  Pause,
  Trash2,
  Settings,
  ImageIcon,
  Film,
  Clock,
  Sparkles,
  Eye,
} from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg"

// Initialize FFmpeg
const ffmpeg = createFFmpeg({
  log: false,
  corePath: "https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js",
})

interface GIFProject {
  id: string
  type: "video" | "images"
  files: File[]
  previewUrl?: string
  gifBlob?: Blob
  settings: {
    fps: number
    quality: number
    width: number
    height: number
    loop: boolean
    startTime: number
    endTime: number
    duration: number
    speed: number
    reverse: boolean
    boomerang: boolean
    filter: string
    text: string
    textColor: string
    textSize: number
    textPosition: string
  }
}

const FILTERS = {
  none: "No Filter",
  sepia: "Sepia",
  grayscale: "Black & White",
  vintage: "Vintage",
  vignette: "Vignette",
  vibrant: "Vibrant",
  cool: "Cool Tone",
  warm: "Warm Tone",
}

export function GIFMaker() {
  const [projects, setProjects] = useState<GIFProject[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [dragActive, setDragActive] = useState(false)
  const [inputType, setInputType] = useState<"video" | "images">("video")
  const [ffmpegLoaded, setFfmpegLoaded] = useState(false)
  const [previewGif, setPreviewGif] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoPreviewRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Load FFmpeg on component mount
  useEffect(() => {
    const loadFFmpeg = async () => {
      if (!ffmpeg.isLoaded()) {
        try {
          await ffmpeg.load()
          setFfmpegLoaded(true)
          console.log("FFmpeg loaded successfully")
        } catch (error) {
          console.error("Failed to load FFmpeg:", error)
        }
      } else {
        setFfmpegLoaded(true)
      }
    }

    loadFFmpeg()

    return () => {
      // Clean up any resources if needed
    }
  }, [])

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      const fileArray = Array.from(files)

      if (inputType === "video") {
        const validFiles = fileArray.filter(
          (file) => file.type.startsWith("video/") && file.size < 200 * 1024 * 1024, // 200MB limit
        )

        if (validFiles.length === 0) return

        for (const file of validFiles) {
          // Create video element to get duration
          const video = document.createElement("video")
          video.preload = "metadata"

          // Create a promise to get video metadata
          const videoDuration = await new Promise<number>((resolve) => {
            video.onloadedmetadata = () => {
              resolve(video.duration)
            }
            video.src = URL.createObjectURL(file)
          })

          URL.revokeObjectURL(video.src)

          const project: GIFProject = {
            id: Math.random().toString(36).substr(2, 9),
            type: "video",
            files: [file],
            previewUrl: URL.createObjectURL(file),
            settings: {
              fps: 15,
              quality: 85,
              width: 480,
              height: 270,
              loop: true,
              startTime: 0,
              endTime: Math.min(videoDuration, 10), // Default to first 10 seconds or full duration
              duration: Math.min(videoDuration, 10),
              speed: 1,
              reverse: false,
              boomerang: false,
              filter: "none",
              text: "",
              textColor: "#ffffff",
              textSize: 24,
              textPosition: "bottom",
            },
          }
          setProjects((prev) => [...prev, project])
        }
      } else {
        const validFiles = fileArray.filter((file) => file.type.startsWith("image/"))

        if (validFiles.length < 2) {
          alert("Please select at least 2 images to create a GIF")
          return
        }

        const project: GIFProject = {
          id: Math.random().toString(36).substr(2, 9),
          type: "images",
          files: validFiles,
          settings: {
            fps: 5,
            quality: 85,
            width: 480,
            height: 270,
            loop: true,
            startTime: 0,
            endTime: 0,
            duration: 0,
            speed: 1,
            reverse: false,
            boomerang: false,
            filter: "none",
            text: "",
            textColor: "#ffffff",
            textSize: 24,
            textPosition: "bottom",
          },
        }
        setProjects((prev) => [...prev, project])
      }
    },
    [inputType],
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

  const updateProjectSettings = (projectId: string, settings: Partial<GIFProject["settings"]>) => {
    setProjects((prev) =>
      prev.map((project) => {
        if (project.id === projectId) {
          const updatedSettings = { ...project.settings, ...settings }

          // Update duration when start or end time changes
          if (settings.startTime !== undefined || settings.endTime !== undefined) {
            const start = settings.startTime !== undefined ? settings.startTime : project.settings.startTime
            const end = settings.endTime !== undefined ? settings.endTime : project.settings.endTime
            updatedSettings.duration = end - start
          }

          return { ...project, settings: updatedSettings }
        }
        return project
      }),
    )
  }

  const applyFilter = (canvas: HTMLCanvasElement, filter: string) => {
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data

    switch (filter) {
      case "sepia":
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]

          data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189)
          data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168)
          data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131)
        }
        break

      case "grayscale":
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3
          data[i] = avg
          data[i + 1] = avg
          data[i + 2] = avg
        }
        break

      case "vintage":
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]

          data[i] = Math.min(255, r * 0.9 + 20)
          data[i + 1] = Math.min(255, g * 0.8 + 20)
          data[i + 2] = Math.min(255, b * 0.7 + 40)
        }
        break

      case "vignette":
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2
        const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY)

        for (let y = 0; y < canvas.height; y++) {
          for (let x = 0; x < canvas.width; x++) {
            const index = (y * canvas.width + x) * 4
            const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2))
            const vignette = 1 - Math.pow(distance / maxDistance, 2) * 0.8

            data[index] *= vignette
            data[index + 1] *= vignette
            data[index + 2] *= vignette
          }
        }
        break

      case "vibrant":
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, data[i] * 1.2)
          data[i + 1] = Math.min(255, data[i + 1] * 1.2)
          data[i + 2] = Math.min(255, data[i + 2] * 1.2)
        }
        break

      case "cool":
        for (let i = 0; i < data.length; i += 4) {
          data[i + 2] = Math.min(255, data[i + 2] * 1.2) // Boost blue
        }
        break

      case "warm":
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, data[i] * 1.2) // Boost red
          data[i + 1] = Math.min(255, data[i + 1] * 1.05) // Slightly boost green
        }
        break
    }

    ctx.putImageData(imageData, 0, 0)
  }

  const addTextToCanvas = (canvas: HTMLCanvasElement, text: string, color: string, size: number, position: string) => {
    if (!text) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.font = `bold ${size}px Arial`
    ctx.fillStyle = color
    ctx.textAlign = "center"

    let y
    switch (position) {
      case "top":
        y = size + 10
        break
      case "middle":
        y = canvas.height / 2
        break
      case "bottom":
      default:
        y = canvas.height - 20
    }

    // Add text shadow for better visibility
    ctx.shadowColor = "rgba(0,0,0,0.7)"
    ctx.shadowBlur = 6
    ctx.shadowOffsetX = 2
    ctx.shadowOffsetY = 2

    ctx.fillText(text, canvas.width / 2, y)

    // Reset shadow
    ctx.shadowColor = "transparent"
  }

  const createGIF = async (project: GIFProject) => {
    if (!ffmpegLoaded) {
      alert("FFmpeg is still loading. Please wait a moment and try again.")
      return
    }

    setIsProcessing(true)
    setProgress(0)

    try {
      if (project.type === "video") {
        await processVideoToGif(project)
      } else {
        await processImagesToGif(project)
      }
    } catch (error) {
      console.error("Error creating GIF:", error)
      alert("There was an error creating your GIF. Please try again.")
    } finally {
      setIsProcessing(false)
      setProgress(100)
    }
  }

  const processVideoToGif = async (project: GIFProject) => {
    const { files, settings } = project
    const videoFile = files[0]

    // Write the video file to FFmpeg's file system
    ffmpeg.FS("writeFile", "input.mp4", await fetchFile(videoFile))

    // Prepare FFmpeg command
    let command = [
      "-i",
      "input.mp4",
      "-ss",
      settings.startTime.toString(),
      "-t",
      settings.duration.toString(),
      "-vf",
      `fps=${settings.fps},scale=${settings.width}:${settings.height}:flags=lanczos`,
    ]

    // Apply speed adjustment
    if (settings.speed !== 1) {
      const speedFilter = settings.speed > 1 ? `setpts=PTS/${settings.speed}` : `setpts=PTS*${1 / settings.speed}`
      command = [...command.slice(0, -1), `${command[command.length - 1]},${speedFilter}`]
    }

    // Apply reverse if needed
    if (settings.reverse) {
      command = [...command.slice(0, -1), `${command[command.length - 1]},reverse`]
    }

    // Apply boomerang if needed
    if (settings.boomerang) {
      command = [
        ...command.slice(0, -1),
        `${command[command.length - 1]},split[original][reversed];[reversed]reverse[reversed];[original][reversed]concat`,
      ]
    }

    // Complete the command
    command = [...command, "-loop", settings.loop ? "0" : "-1", "-gifflags", "-offsetting", "-y", "output.gif"]

    // Run FFmpeg
    setProgress(10)
    await ffmpeg.run(...command)
    setProgress(80)

    // Read the resulting file
    const data = ffmpeg.FS("readFile", "output.gif")
    const gifBlob = new Blob([data.buffer], { type: "image/gif" })
    const gifUrl = URL.createObjectURL(gifBlob)

    // Update the project with the created GIF
    setProjects((prev) => prev.map((p) => (p.id === project.id ? { ...p, gifBlob, previewUrl: gifUrl } : p)))

    setPreviewGif(gifUrl)
    setProgress(100)
  }

  const processImagesToGif = async (project: GIFProject) => {
    const { files, settings } = project

    // Create a canvas for processing images
    const canvas = document.createElement("canvas")
    canvas.width = settings.width
    canvas.height = settings.height
    const ctx = canvas.getContext("2d")!

    // Process each image
    let fileIndex = 0
    for (const file of files) {
      // Update progress
      setProgress(Math.round((fileIndex / files.length) * 50))
      fileIndex++

      // Load image
      const img = await createImageBitmap(file)

      // Draw image to canvas with proper scaling
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      // Apply filter if selected
      if (settings.filter !== "none") {
        applyFilter(canvas, settings.filter)
      }

      // Add text if provided
      if (settings.text) {
        addTextToCanvas(canvas, settings.text, settings.textColor, settings.textSize, settings.textPosition)
      }

      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => resolve(blob!), "image/png")
      })

      // Write to FFmpeg filesystem
      ffmpeg.FS("writeFile", `img${fileIndex.toString().padStart(3, "0")}.png`, await fetchFile(blob))
    }

    // Prepare image sequence
    let imageSequence = Array.from({ length: files.length }, (_, i) => `img${(i + 1).toString().padStart(3, "0")}.png`)

    // Apply reverse if needed
    if (settings.reverse) {
      imageSequence = imageSequence.reverse()
    }

    // Apply boomerang if needed
    if (settings.boomerang) {
      const reversedSequence = [...imageSequence].reverse()
      imageSequence = [...imageSequence, ...reversedSequence.slice(1)] // Avoid duplicating the last frame
    }

    // Create a file with the image sequence
    const fileList = imageSequence.map((file) => `file '${file}'`).join("\n")
    ffmpeg.FS("writeFile", "files.txt", new TextEncoder().encode(fileList))

    // Calculate delay based on FPS
    const delay = Math.round(100 / settings.fps) // in centiseconds

    // Run FFmpeg to create GIF
    setProgress(60)
    await ffmpeg.run(
      "-f",
      "concat",
      "-safe",
      "0",
      "-i",
      "files.txt",
      "-framerate",
      settings.fps.toString(),
      "-loop",
      settings.loop ? "0" : "-1",
      "-delay",
      delay.toString(),
      "-y",
      "output.gif",
    )

    setProgress(90)

    // Read the resulting file
    const data = ffmpeg.FS("readFile", "output.gif")
    const gifBlob = new Blob([data.buffer], { type: "image/gif" })
    const gifUrl = URL.createObjectURL(gifBlob)

    // Update the project with the created GIF
    setProjects((prev) => prev.map((p) => (p.id === project.id ? { ...p, gifBlob, previewUrl: gifUrl } : p)))

    setPreviewGif(gifUrl)
    setProgress(100)
  }

  const generatePreview = async (project: GIFProject) => {
    if (!project || !canvasRef.current) return

    setIsProcessing(true)
    setProgress(0)

    try {
      // Create a quick preview (simplified version of the full GIF creation)
      if (project.type === "video") {
        const video = videoPreviewRef.current
        if (!video) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")!

        canvas.width = project.settings.width
        canvas.height = project.settings.height

        // Set video to start time
        video.currentTime = project.settings.startTime

        // Wait for video to seek
        await new Promise<void>((resolve) => {
          video.onseeked = () => resolve()
        })

        // Capture frame
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

        // Apply filter if selected
        if (project.settings.filter !== "none") {
          applyFilter(canvas, project.settings.filter)
        }

        // Add text if provided
        if (project.settings.text) {
          addTextToCanvas(
            canvas,
            project.settings.text,
            project.settings.textColor,
            project.settings.textSize,
            project.settings.textPosition,
          )
        }

        // Convert to data URL for preview
        const previewUrl = canvas.toDataURL("image/png")
        setPreviewGif(previewUrl)
      } else {
        // For images, just show the first image
        if (project.files.length > 0) {
          const canvas = canvasRef.current
          const ctx = canvas.getContext("2d")!

          canvas.width = project.settings.width
          canvas.height = project.settings.height

          const img = await createImageBitmap(project.files[0])
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

          // Apply filter if selected
          if (project.settings.filter !== "none") {
            applyFilter(canvas, project.settings.filter)
          }

          // Add text if provided
          if (project.settings.text) {
            addTextToCanvas(
              canvas,
              project.settings.text,
              project.settings.textColor,
              project.settings.textSize,
              project.settings.textPosition,
            )
          }

          const previewUrl = canvas.toDataURL("image/png")
          setPreviewGif(previewUrl)
        }
      }
    } catch (error) {
      console.error("Error generating preview:", error)
    } finally {
      setIsProcessing(false)
      setProgress(0)
    }
  }

  const downloadGIF = (project: GIFProject) => {
    if (!project.gifBlob) return

    const url = URL.createObjectURL(project.gifBlob)
    const a = document.createElement("a")
    a.href = url
    a.download = `animated_${project.id}.gif`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const removeProject = (projectId: string) => {
    setProjects((prev) => {
      const project = prev.find((p) => p.id === projectId)
      if (project?.previewUrl) {
        URL.revokeObjectURL(project.previewUrl)
      }
      return prev.filter((p) => p.id !== projectId)
    })
  }

  const togglePlayPreview = () => {
    const video = videoPreviewRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }

    setIsPlaying(!isPlaying)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-slate-900 dark:to-slate-800 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tools
          </Link>
          <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Premium GIF Maker
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Create stunning animated GIFs from videos or images with professional effects, filters, and customization
            options.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="mb-8 shadow-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg">
                  <Zap className="w-6 h-6" />
                </div>
                Create Amazing GIFs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-8">
                <Tabs defaultValue="video" onValueChange={(value) => setInputType(value as "video" | "images")}>
                  <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
                    <TabsTrigger value="video" className="flex items-center gap-2">
                      <Film className="w-4 h-4" />
                      Video to GIF
                    </TabsTrigger>
                    <TabsTrigger value="images" className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      Images to GIF
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="video">
                    <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg mb-4">
                      <h3 className="font-semibold flex items-center gap-2 mb-2">
                        <Film className="w-4 h-4 text-pink-600" />
                        Video to GIF Converter
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Upload a video file to convert it into a high-quality GIF. Trim, resize, and add effects to
                        create the perfect animation.
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <Badge
                          variant="secondary"
                          className="bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100"
                        >
                          MP4, WebM, MOV supported
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100"
                        >
                          Up to 200MB
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100"
                        >
                          Custom trimming
                        </Badge>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="images">
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg mb-4">
                      <h3 className="font-semibold flex items-center gap-2 mb-2">
                        <ImageIcon className="w-4 h-4 text-purple-600" />
                        Images to GIF Creator
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Select multiple images to combine them into a smooth animated GIF. Control speed, order, and add
                        special effects.
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <Badge
                          variant="secondary"
                          className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
                        >
                          JPG, PNG, WebP supported
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
                        >
                          Select multiple images
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
                        >
                          Custom frame rate
                        </Badge>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 md:p-12 text-center cursor-pointer transition-all duration-300 ${
                  dragActive
                    ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20 scale-105"
                    : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple={inputType === "images"}
                  accept={inputType === "video" ? "video/*" : "image/*"}
                  onChange={(e) => e.target.files && handleFiles(e.target.files)}
                  className="hidden"
                />
                <motion.div animate={dragActive ? { scale: 1.1 } : { scale: 1 }} transition={{ duration: 0.2 }}>
                  <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                  {dragActive ? (
                    <p className="text-2xl font-semibold text-pink-600">Drop files here!</p>
                  ) : (
                    <div>
                      <p className="text-xl md:text-2xl font-semibold mb-3">
                        {inputType === "video" ? "Drag & drop video here" : "Drag & drop images here"}
                      </p>
                      <p className="text-base md:text-lg text-gray-500 mb-4">or click to browse files</p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {inputType === "video" ? (
                          <>
                            <Badge variant="outline" className="bg-white/50 dark:bg-slate-800/50">
                              MP4
                            </Badge>
                            <Badge variant="outline" className="bg-white/50 dark:bg-slate-800/50">
                              WebM
                            </Badge>
                            <Badge variant="outline" className="bg-white/50 dark:bg-slate-800/50">
                              MOV
                            </Badge>
                          </>
                        ) : (
                          <>
                            <Badge variant="outline" className="bg-white/50 dark:bg-slate-800/50">
                              JPG
                            </Badge>
                            <Badge variant="outline" className="bg-white/50 dark:bg-slate-800/50">
                              PNG
                            </Badge>
                            <Badge variant="outline" className="bg-white/50 dark:bg-slate-800/50">
                              Multiple Images
                            </Badge>
                          </>
                        )}
                        <Badge variant="outline" className="bg-white/50 dark:bg-slate-800/50">
                          <Sparkles className="w-3 h-3 mr-1" />
                          Premium Quality
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
                      <Zap className="w-5 h-5 text-pink-500 animate-pulse" />
                      <span className="text-lg font-semibold">Creating GIF...</span>
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

        <AnimatePresence>
          {projects.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="space-y-8">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="shadow-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm overflow-hidden">
                      <CardHeader className="bg-gradient-to-r from-pink-500/10 to-purple-500/10">
                        <CardTitle className="text-xl flex items-center justify-between">
                          <span>
                            {project.type === "video" ? project.files[0].name : `${project.files.length} Images`}
                          </span>
                          <Button
                            onClick={() => removeProject(project.id)}
                            variant="ghost"
                            size="sm"
                            className="text-gray-500 hover:text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          {/* Preview Section */}
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                              <Film className="w-5 h-5 text-pink-500" />
                              Preview
                            </h3>

                            {project.type === "video" && (
                              <div className="relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                                <video
                                  ref={videoPreviewRef}
                                  src={project.previewUrl}
                                  className="w-full rounded-lg"
                                  onEnded={() => setIsPlaying(false)}
                                />

                                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4">
                                  <Button
                                    onClick={togglePlayPreview}
                                    size="sm"
                                    className="bg-black/70 hover:bg-black/90 text-white rounded-full w-10 h-10 p-0 flex items-center justify-center"
                                  >
                                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                  </Button>

                                  <div className="flex-1">
                                    <Slider
                                      value={[project.settings.startTime]}
                                      onValueChange={([value]) => {
                                        if (videoPreviewRef.current) {
                                          videoPreviewRef.current.currentTime = value
                                        }
                                      }}
                                      max={videoPreviewRef.current?.duration || 100}
                                      step={0.1}
                                      className="w-full"
                                    />
                                  </div>
                                </div>
                              </div>
                            )}

                            {project.type === "images" && (
                              <div className="grid grid-cols-3 gap-2">
                                {project.files.slice(0, 9).map((file, idx) => (
                                  <img
                                    key={idx}
                                    src={URL.createObjectURL(file) || "/placeholder.svg"}
                                    alt={`Frame ${idx + 1}`}
                                    className="w-full h-20 object-cover rounded shadow"
                                  />
                                ))}
                                {project.files.length > 9 && (
                                  <div className="w-full h-20 bg-gray-200 dark:bg-slate-600 rounded shadow flex items-center justify-center text-sm font-medium">
                                    +{project.files.length - 9} more
                                  </div>
                                )}
                              </div>
                            )}

                            {/* GIF Preview */}
                            {(project.gifBlob || previewGif) && (
                              <div className="mt-4">
                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                  <Sparkles className="w-4 h-4 text-purple-500" />
                                  GIF Preview:
                                </h4>
                                <div className="bg-[linear-gradient(45deg,#f3f4f6_25%,transparent_25%),linear-gradient(-45deg,#f3f4f6_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#f3f4f6_75%),linear-gradient(-45deg,transparent_75%,#f3f4f6_75%)] bg-[length:20px_20px] bg-[0_0,0_10px,10px_-10px,-10px_0px] dark:bg-[linear-gradient(45deg,#374151_25%,transparent_25%),linear-gradient(-45deg,#374151_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#374151_75%),linear-gradient(-45deg,transparent_75%,#374151_75%)] dark:bg-[length:20px_20px] dark:bg-[0_0,0_10px,10px_-10px,-10px_0px] rounded-lg p-4 text-center">
                                  <img
                                    src={project.gifBlob ? project.previewUrl : previewGif || "/placeholder.svg"}
                                    alt="GIF Preview"
                                    className="max-w-full h-auto max-h-64 mx-auto rounded-lg shadow-md"
                                  />
                                  <p className="text-sm text-gray-500 mt-2">
                                    {project.settings.width} × {project.settings.height} • {project.settings.fps} FPS
                                  </p>
                                </div>
                              </div>
                            )}

                            <div className="flex flex-wrap gap-3 mt-4">
                              <Button
                                onClick={() => generatePreview(project)}
                                variant="outline"
                                className="flex items-center gap-2"
                              >
                                <Eye className="w-4 h-4" />
                                Quick Preview
                              </Button>

                              <Button
                                onClick={() => createGIF(project)}
                                className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                                disabled={isProcessing}
                              >
                                <Zap className="w-4 h-4" />
                                {isProcessing ? "Creating..." : "Create GIF"}
                              </Button>

                              {project.gifBlob && (
                                <Button
                                  onClick={() => downloadGIF(project)}
                                  className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                                >
                                  <Download className="w-4 h-4" />
                                  Download GIF
                                </Button>
                              )}
                            </div>
                          </div>

                          {/* Settings Section */}
                          <div className="space-y-6">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                              <Settings className="w-5 h-5 text-purple-500" />
                              GIF Settings
                            </h3>

                            <Tabs defaultValue="basic">
                              <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="basic">Basic</TabsTrigger>
                                <TabsTrigger value="advanced">Advanced</TabsTrigger>
                                <TabsTrigger value="effects">Effects</TabsTrigger>
                              </TabsList>

                              <TabsContent value="basic" className="space-y-4 pt-4">
                                {project.type === "video" && (
                                  <div className="space-y-4">
                                    <div>
                                      <div className="flex items-center justify-between mb-2">
                                        <Label className="text-sm font-medium">Trim Video</Label>
                                        <span className="text-xs text-gray-500">
                                          Duration: {(project.settings.endTime - project.settings.startTime).toFixed(1)}
                                          s
                                        </span>
                                      </div>

                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <Label className="text-xs">
                                            Start: {project.settings.startTime.toFixed(1)}s
                                          </Label>
                                          <Slider
                                            value={[project.settings.startTime]}
                                            onValueChange={([value]) =>
                                              updateProjectSettings(project.id, { startTime: value })
                                            }
                                            max={project.settings.endTime - 0.5}
                                            min={0}
                                            step={0.1}
                                            className="w-full"
                                          />
                                        </div>

                                        <div>
                                          <Label className="text-xs">End: {project.settings.endTime.toFixed(1)}s</Label>
                                          <Slider
                                            value={[project.settings.endTime]}
                                            onValueChange={([value]) =>
                                              updateProjectSettings(project.id, { endTime: value })
                                            }
                                            max={videoPreviewRef.current?.duration || 30}
                                            min={project.settings.startTime + 0.5}
                                            step={0.1}
                                            className="w-full"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                <div>
                                  <Label className="block text-sm font-medium mb-2">
                                    Frame Rate: {project.settings.fps} FPS
                                  </Label>
                                  <Slider
                                    value={[project.settings.fps]}
                                    onValueChange={([value]) => updateProjectSettings(project.id, { fps: value })}
                                    max={30}
                                    min={1}
                                    step={1}
                                    className="w-full"
                                  />
                                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>Smoother (larger file)</span>
                                    <span>Smaller file</span>
                                  </div>
                                </div>

                                <div>
                                  <Label className="block text-sm font-medium mb-2">
                                    Quality: {project.settings.quality}%
                                  </Label>
                                  <Slider
                                    value={[project.settings.quality]}
                                    onValueChange={([value]) => updateProjectSettings(project.id, { quality: value })}
                                    max={100}
                                    min={10}
                                    step={5}
                                    className="w-full"
                                  />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="block text-sm font-medium mb-2">Width</Label>
                                    <Select
                                      value={project.settings.width.toString()}
                                      onValueChange={(value) =>
                                        updateProjectSettings(project.id, { width: Number.parseInt(value) })
                                      }
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="320">320px</SelectItem>
                                        <SelectItem value="480">480px</SelectItem>
                                        <SelectItem value="640">640px</SelectItem>
                                        <SelectItem value="800">800px</SelectItem>
                                        <SelectItem value="1280">1280px</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  <div>
                                    <Label className="block text-sm font-medium mb-2">Height</Label>
                                    <Select
                                      value={project.settings.height.toString()}
                                      onValueChange={(value) =>
                                        updateProjectSettings(project.id, { height: Number.parseInt(value) })
                                      }
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="180">180px</SelectItem>
                                        <SelectItem value="270">270px</SelectItem>
                                        <SelectItem value="360">360px</SelectItem>
                                        <SelectItem value="450">450px</SelectItem>
                                        <SelectItem value="720">720px</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              </TabsContent>

                              <TabsContent value="advanced" className="space-y-4 pt-4">
                                <div>
                                  <Label className="block text-sm font-medium mb-2">
                                    Speed: {project.settings.speed}x
                                  </Label>
                                  <Slider
                                    value={[project.settings.speed]}
                                    onValueChange={([value]) => updateProjectSettings(project.id, { speed: value })}
                                    max={4}
                                    min={0.25}
                                    step={0.25}
                                    className="w-full"
                                  />
                                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>0.25x (Slow)</span>
                                    <span>4x (Fast)</span>
                                  </div>
                                </div>

                                <div className="space-y-3">
                                  <div className="flex items-center justify-between">
                                    <Label className="text-sm font-medium">Loop GIF</Label>
                                    <Switch
                                      checked={project.settings.loop}
                                      onCheckedChange={(checked) =>
                                        updateProjectSettings(project.id, { loop: checked })
                                      }
                                    />
                                  </div>

                                  <div className="flex items-center justify-between">
                                    <Label className="text-sm font-medium">Reverse</Label>
                                    <Switch
                                      checked={project.settings.reverse}
                                      onCheckedChange={(checked) =>
                                        updateProjectSettings(project.id, { reverse: checked })
                                      }
                                    />
                                  </div>

                                  <div className="flex items-center justify-between">
                                    <Label className="text-sm font-medium">Boomerang Effect</Label>
                                    <Switch
                                      checked={project.settings.boomerang}
                                      onCheckedChange={(checked) =>
                                        updateProjectSettings(project.id, { boomerang: checked })
                                      }
                                    />
                                  </div>
                                </div>
                              </TabsContent>

                              <TabsContent value="effects" className="space-y-4 pt-4">
                                <div>
                                  <Label className="block text-sm font-medium mb-2">Filter</Label>
                                  <Select
                                    value={project.settings.filter}
                                    onValueChange={(value) => updateProjectSettings(project.id, { filter: value })}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {Object.entries(FILTERS).map(([key, label]) => (
                                        <SelectItem key={key} value={key}>
                                          {label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div className="space-y-3">
                                  <div>
                                    <Label className="block text-sm font-medium mb-2">Add Text</Label>
                                    <Input
                                      value={project.settings.text}
                                      onChange={(e) => updateProjectSettings(project.id, { text: e.target.value })}
                                      placeholder="Enter text to overlay..."
                                    />
                                  </div>

                                  {project.settings.text && (
                                    <>
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <Label className="block text-sm font-medium mb-2">Text Color</Label>
                                          <Input
                                            type="color"
                                            value={project.settings.textColor}
                                            onChange={(e) =>
                                              updateProjectSettings(project.id, { textColor: e.target.value })
                                            }
                                            className="h-10"
                                          />
                                        </div>

                                        <div>
                                          <Label className="block text-sm font-medium mb-2">Text Size</Label>
                                          <Slider
                                            value={[project.settings.textSize]}
                                            onValueChange={([value]) =>
                                              updateProjectSettings(project.id, { textSize: value })
                                            }
                                            max={48}
                                            min={12}
                                            step={2}
                                            className="w-full"
                                          />
                                        </div>
                                      </div>

                                      <div>
                                        <Label className="block text-sm font-medium mb-2">Text Position</Label>
                                        <Select
                                          value={project.settings.textPosition}
                                          onValueChange={(value) =>
                                            updateProjectSettings(project.id, { textPosition: value })
                                          }
                                        >
                                          <SelectTrigger>
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="top">Top</SelectItem>
                                            <SelectItem value="middle">Middle</SelectItem>
                                            <SelectItem value="bottom">Bottom</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </TabsContent>
                            </Tabs>
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
          <Card className="mt-12 shadow-2xl border-0 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-slate-800 dark:to-slate-700">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Professional GIF Creation Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: <Zap className="w-6 h-6" />,
                    title: "Lightning Fast",
                    description: "Create high-quality GIFs in seconds with our optimized processing engine.",
                  },
                  {
                    icon: <Settings className="w-6 h-6" />,
                    title: "Advanced Controls",
                    description: "Fine-tune every aspect: speed, quality, size, filters, and effects.",
                  },
                  {
                    icon: <Sparkles className="w-6 h-6" />,
                    title: "Premium Effects",
                    description: "Add professional filters, text overlays, and special effects.",
                  },
                  {
                    icon: <Film className="w-6 h-6" />,
                    title: "Video to GIF",
                    description: "Convert any video format to GIF with precise trimming controls.",
                  },
                  {
                    icon: <ImageIcon className="w-6 h-6" />,
                    title: "Image Sequences",
                    description: "Combine multiple images into smooth animated GIFs.",
                  },
                  {
                    icon: <Clock className="w-6 h-6" />,
                    title: "Instant Preview",
                    description: "See your changes in real-time before creating the final GIF.",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="text-center p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl backdrop-blur-sm"
                  >
                    <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-3 rounded-lg w-fit mx-auto mb-4">
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
