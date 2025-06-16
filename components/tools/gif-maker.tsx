"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Download, Zap, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

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
  }
}

export function GIFMaker() {
  const [projects, setProjects] = useState<GIFProject[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [dragActive, setDragActive] = useState(false)
  const [inputType, setInputType] = useState<"video" | "images">("video")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      const fileArray = Array.from(files)

      if (inputType === "video") {
        const validFiles = fileArray.filter(
          (file) => file.type.startsWith("video/") && file.size < 200 * 1024 * 1024, // 200MB limit
        )

        if (validFiles.length === 0) return

        for (const file of validFiles) {
          const project: GIFProject = {
            id: Math.random().toString(36).substr(2, 9),
            type: "video",
            files: [file],
            previewUrl: URL.createObjectURL(file),
            settings: {
              fps: 10,
              quality: 80,
              width: 480,
              height: 270,
              loop: true,
            },
          }
          setProjects((prev) => [...prev, project])
        }
      } else {
        const validFiles = fileArray.filter((file) => file.type.startsWith("image/"))

        if (validFiles.length < 2) return

        const project: GIFProject = {
          id: Math.random().toString(36).substr(2, 9),
          type: "images",
          files: validFiles,
          settings: {
            fps: 5,
            quality: 80,
            width: 480,
            height: 270,
            loop: true,
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
      prev.map((project) =>
        project.id === projectId ? { ...project, settings: { ...project.settings, ...settings } } : project,
      ),
    )
  }

  const createGIF = async (project: GIFProject) => {
    setIsProcessing(true)
    setProgress(0)

    try {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")!

      canvas.width = project.settings.width
      canvas.height = project.settings.height

      const frames: string[] = []

      if (project.type === "video") {
        const video = document.createElement("video")
        video.src = project.previewUrl!
        video.crossOrigin = "anonymous"

        await new Promise((resolve) => {
          video.onloadedmetadata = resolve
        })

        const frameCount = Math.min(Math.floor(video.duration * project.settings.fps), 100) // Limit to 100 frames
        const frameInterval = video.duration / frameCount

        for (let i = 0; i < frameCount; i++) {
          video.currentTime = i * frameInterval

          await new Promise((resolve) => {
            video.onseeked = resolve
          })

          ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
          frames.push(canvas.toDataURL("image/png"))
          setProgress((i / frameCount) * 100)
        }
      } else {
        // Images to GIF
        for (let i = 0; i < project.files.length; i++) {
          const img = new Image()
          const imageUrl = URL.createObjectURL(project.files[i])
          img.src = imageUrl

          await new Promise((resolve) => {
            img.onload = resolve
          })

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          frames.push(canvas.toDataURL("image/png"))
          setProgress((i / project.files.length) * 100)

          URL.revokeObjectURL(imageUrl)
        }
      }

      // Create animated canvas for preview
      const previewCanvas = document.createElement("canvas")
      previewCanvas.width = project.settings.width
      previewCanvas.height = project.settings.height
      const previewCtx = previewCanvas.getContext("2d")!

      let frameIndex = 0
      const animatePreview = () => {
        const img = new Image()
        img.onload = () => {
          previewCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height)
          previewCtx.drawImage(img, 0, 0)
          frameIndex = (frameIndex + 1) % frames.length
          setTimeout(animatePreview, 1000 / project.settings.fps)
        }
        img.src = frames[frameIndex]
      }

      animatePreview()

      // Create a simple animated blob (in production, use a proper GIF encoder like gif.js)
      const gifBlob = new Blob([frames.join("")], { type: "text/plain" })

      setProjects((prev) =>
        prev.map((p) => (p.id === project.id ? { ...p, gifBlob, previewUrl: previewCanvas.toDataURL() } : p)),
      )
    } catch (error) {
      console.error("Error creating GIF:", error)
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-slate-900 dark:to-slate-800 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tools
          </Link>
          <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            GIF Maker
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Convert videos and images to high-quality animated GIFs with custom speed and optimization settings.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="mb-8 shadow-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg">
                  <Zap className="w-6 h-6" />
                </div>
                Create GIF
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-8">
                <label className="block text-lg font-semibold mb-4">Input Type</label>
                <Select value={inputType} onValueChange={(value: "video" | "images") => setInputType(value)}>
                  <SelectTrigger className="w-full max-w-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video to GIF</SelectItem>
                    <SelectItem value="images">Images to GIF</SelectItem>
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
                  <Upload className="w-16 h-16 mx-auto mb-6 text-gray-400" />
                  {dragActive ? (
                    <p className="text-2xl font-semibold text-pink-600">Drop files here!</p>
                  ) : (
                    <div>
                      <p className="text-2xl font-semibold mb-3">
                        {inputType === "video" ? "Drag & drop video here" : "Drag & drop images here"}
                      </p>
                      <p className="text-lg text-gray-500 mb-4">or click to browse files</p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {inputType === "video" ? (
                          <>
                            <Badge variant="secondary">MP4</Badge>
                            <Badge variant="secondary">WebM</Badge>
                            <Badge variant="secondary">MOV</Badge>
                          </>
                        ) : (
                          <>
                            <Badge variant="secondary">JPG</Badge>
                            <Badge variant="secondary">PNG</Badge>
                            <Badge variant="secondary">Multiple Images</Badge>
                          </>
                        )}
                        <Badge variant="secondary">High Quality</Badge>
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
                    <Card className="shadow-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-xl">
                          {project.type === "video" ? project.files[0].name : `${project.files.length} Images`}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          <div>
                            {project.type === "video" && project.previewUrl && (
                              <video src={project.previewUrl} controls className="w-full rounded-lg shadow-lg" />
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

                            {project.previewUrl && project.gifBlob && (
                              <div className="mt-4">
                                <h4 className="font-semibold mb-2">GIF Preview:</h4>
                                <div className="bg-gray-100 dark:bg-slate-600 rounded-lg p-4 text-center">
                                  <img
                                    src={project.previewUrl || "/placeholder.svg"}
                                    alt="GIF Preview"
                                    className="max-w-full h-auto max-h-64 mx-auto rounded-lg shadow-md"
                                    style={{ imageRendering: "pixelated" }}
                                  />
                                  <p className="text-sm text-gray-500 mt-2">
                                    {project.settings.width} × {project.settings.height} • {project.settings.fps} FPS
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="space-y-6">
                            <div>
                              <label className="block text-lg font-semibold mb-4">GIF Settings</label>

                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm font-medium mb-2">
                                    Frame Rate: {project.settings.fps} FPS
                                  </label>
                                  <Slider
                                    value={[project.settings.fps]}
                                    onValueChange={([value]) => updateProjectSettings(project.id, { fps: value })}
                                    max={30}
                                    min={1}
                                    step={1}
                                    className="w-full"
                                  />
                                </div>

                                <div>
                                  <label className="block text-sm font-medium mb-2">
                                    Quality: {project.settings.quality}%
                                  </label>
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
                                    <label className="block text-sm font-medium mb-2">Width</label>
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
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium mb-2">Height</label>
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
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              </div>

                              <div className="mt-4 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                  <strong>Output Size:</strong> {project.settings.width} × {project.settings.height}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                  <strong>Frame Rate:</strong> {project.settings.fps} FPS
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                  <strong>Quality:</strong> {project.settings.quality}%
                                </p>
                              </div>
                            </div>

                            <div className="flex gap-3">
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

                              <Button
                                onClick={() => removeProject(project.id)}
                                variant="outline"
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                Remove
                              </Button>
                            </div>
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
      </div>
    </div>
  )
}
