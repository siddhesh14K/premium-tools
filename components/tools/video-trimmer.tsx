"use client"

import type React from "react"
import { useState, useRef, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Upload, Download, Video, ArrowLeft, Play, Pause, Plus, Trash2, Eye, Scissors } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

interface VideoClip {
  id: string
  name: string
  startTime: number
  endTime: number
  duration: number
  previewUrl?: string
  isProcessing: boolean
}

interface VideoProject {
  id: string
  file: File
  videoUrl: string
  duration: number
  isPlaying: boolean
  currentTime: number
  clips: VideoClip[]
}

export function VideoTrimmer() {
  const [projects, setProjects] = useState<VideoProject[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [dragActive, setDragActive] = useState(false)
  const [processingClipId, setProcessingClipId] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement }>({})
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFiles = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files)
    const validFiles = fileArray.filter(
      (file) => file.type.startsWith("video/") && file.size < 2 * 1024 * 1024 * 1024, // 2GB limit
    )

    if (validFiles.length === 0) {
      alert("Please select valid video files (max 2GB each)")
      return
    }

    const newProjects: VideoProject[] = []

    for (const file of validFiles) {
      const videoUrl = URL.createObjectURL(file)
      const video = document.createElement("video")

      await new Promise((resolve) => {
        video.onloadedmetadata = () => {
          const project: VideoProject = {
            id: Math.random().toString(36).substr(2, 9),
            file,
            videoUrl,
            duration: video.duration,
            isPlaying: false,
            currentTime: 0,
            clips: [
              {
                id: Math.random().toString(36).substr(2, 9),
                name: `Clip 1`,
                startTime: 0,
                endTime: Math.min(30, video.duration), // Default 30 seconds or full duration
                duration: Math.min(30, video.duration),
                isProcessing: false,
              },
            ],
          }
          newProjects.push(project)
          resolve(null)
        }
        video.src = videoUrl
      })
    }

    setProjects((prev) => [...prev, ...newProjects])
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

  const togglePlayPause = (projectId: string) => {
    const video = videoRefs.current[projectId]
    if (!video) return

    setProjects((prev) =>
      prev.map((project) => {
        if (project.id === projectId) {
          const isPlaying = !project.isPlaying
          if (isPlaying) {
            video.play()
          } else {
            video.pause()
          }
          return { ...project, isPlaying }
        }
        return project
      }),
    )
  }

  const seekToTime = (projectId: string, time: number) => {
    const video = videoRefs.current[projectId]
    if (video) {
      video.currentTime = time
      setProjects((prev) =>
        prev.map((project) => (project.id === projectId ? { ...project, currentTime: time } : project)),
      )
    }
  }

  const addClip = (projectId: string) => {
    setProjects((prev) =>
      prev.map((project) => {
        if (project.id === projectId) {
          const newClip: VideoClip = {
            id: Math.random().toString(36).substr(2, 9),
            name: `Clip ${project.clips.length + 1}`,
            startTime: 0,
            endTime: Math.min(30, project.duration),
            duration: Math.min(30, project.duration),
            isProcessing: false,
          }
          return { ...project, clips: [...project.clips, newClip] }
        }
        return project
      }),
    )
  }

  const removeClip = (projectId: string, clipId: string) => {
    setProjects((prev) =>
      prev.map((project) => {
        if (project.id === projectId) {
          return { ...project, clips: project.clips.filter((clip) => clip.id !== clipId) }
        }
        return project
      }),
    )
  }

  const updateClip = (projectId: string, clipId: string, updates: Partial<VideoClip>) => {
    setProjects((prev) =>
      prev.map((project) => {
        if (project.id === projectId) {
          return {
            ...project,
            clips: project.clips.map((clip) => {
              if (clip.id === clipId) {
                const updatedClip = { ...clip, ...updates }
                updatedClip.duration = updatedClip.endTime - updatedClip.startTime
                return updatedClip
              }
              return clip
            }),
          }
        }
        return project
      }),
    )
  }

  const createAutoClips = (projectId: string, clipDuration: number, overlap = 0) => {
    const project = projects.find((p) => p.id === projectId)
    if (!project) return

    const autoClips: VideoClip[] = []
    const step = clipDuration - overlap
    let currentStart = 0
    let clipIndex = 1

    while (currentStart < project.duration) {
      const endTime = Math.min(currentStart + clipDuration, project.duration)

      autoClips.push({
        id: Math.random().toString(36).substr(2, 9),
        name: `Auto Clip ${clipIndex}`,
        startTime: currentStart,
        endTime: endTime,
        duration: endTime - currentStart,
        isProcessing: false,
      })

      currentStart += step
      clipIndex++

      // Prevent infinite loop
      if (endTime >= project.duration) break
    }

    setProjects((prev) => prev.map((p) => (p.id === projectId ? { ...p, clips: autoClips } : p)))
  }

  const generatePreview = async (project: VideoProject, clip: VideoClip) => {
    const video = videoRefs.current[project.id]
    if (!video || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")!

    // Set canvas size to match video
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Seek to middle of clip for preview
    const previewTime = clip.startTime + clip.duration / 2
    video.currentTime = previewTime

    await new Promise((resolve) => {
      video.onseeked = resolve
    })

    // Draw frame to canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    // Convert to blob URL for preview
    canvas.toBlob(
      (blob) => {
        if (blob) {
          const previewUrl = URL.createObjectURL(blob)
          updateClip(project.id, clip.id, { previewUrl })
        }
      },
      "image/jpeg",
      0.8,
    )
  }

  const trimVideo = async (project: VideoProject, clip: VideoClip) => {
    setIsProcessing(true)
    setProcessingClipId(clip.id)
    setProgress(0)

    try {
      const video = videoRefs.current[project.id]
      if (!video || !canvasRef.current) return

      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")!

      // Set canvas dimensions
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      // Create MediaRecorder for output
      const stream = canvas.captureStream(30) // 30 FPS
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm;codecs=vp9",
        videoBitsPerSecond: 2500000, // 2.5 Mbps for good quality
      })

      const chunks: Blob[] = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${clip.name.replace(/\s+/g, "_")}_${project.file.name.split(".")[0]}.webm`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }

      // Start recording
      mediaRecorder.start()

      // Seek to start time
      video.currentTime = clip.startTime
      await new Promise((resolve) => {
        video.onseeked = resolve
      })

      // Play and record
      video.play()

      const recordingDuration = clip.duration * 1000 // Convert to milliseconds
      const progressInterval = setInterval(() => {
        const elapsed = (video.currentTime - clip.startTime) / clip.duration
        setProgress(Math.min(elapsed * 100, 100))
      }, 100)

      // Record frames
      const frameInterval = setInterval(() => {
        if (video.currentTime >= clip.endTime) {
          clearInterval(frameInterval)
          clearInterval(progressInterval)
          video.pause()
          mediaRecorder.stop()
          setProgress(100)
          return
        }
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      }, 1000 / 30) // 30 FPS

      // Safety stop after calculated duration
      setTimeout(() => {
        clearInterval(frameInterval)
        clearInterval(progressInterval)
        video.pause()
        if (mediaRecorder.state === "recording") {
          mediaRecorder.stop()
        }
      }, recordingDuration + 1000) // Add 1 second buffer
    } catch (error) {
      console.error("Error trimming video:", error)
      alert("Error processing video. Please try again.")
    } finally {
      setTimeout(() => {
        setIsProcessing(false)
        setProcessingClipId(null)
        setProgress(0)
      }, 1000)
    }
  }

  const trimAllClips = async (project: VideoProject) => {
    for (const clip of project.clips) {
      await trimVideo(project, clip)
      // Add delay between clips to prevent browser overload
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const removeProject = (projectId: string) => {
    setProjects((prev) => {
      const project = prev.find((p) => p.id === projectId)
      if (project) {
        URL.revokeObjectURL(project.videoUrl)
        project.clips.forEach((clip) => {
          if (clip.previewUrl) {
            URL.revokeObjectURL(clip.previewUrl)
          }
        })
      }
      return prev.filter((p) => p.id !== projectId)
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-slate-900 dark:to-slate-800 py-8 px-4">
      <canvas ref={canvasRef} className="hidden" />

      <div className="container mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tools
          </Link>
          <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Advanced Video Trimmer
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Create multiple clips from any video with frame-perfect precision. Handle large videos with ease.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="mb-8 shadow-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg">
                  <Video className="w-6 h-6" />
                </div>
                Upload Videos
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
                    ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20 scale-105"
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
                    <p className="text-2xl font-semibold text-orange-600">Drop videos here!</p>
                  ) : (
                    <div>
                      <p className="text-2xl font-semibold mb-3">Drag & drop videos here</p>
                      <p className="text-lg text-gray-500 mb-4">or click to browse files</p>
                      <div className="flex flex-wrap justify-center gap-2">
                        <Badge variant="secondary">MP4</Badge>
                        <Badge variant="secondary">WebM</Badge>
                        <Badge variant="secondary">MOV</Badge>
                        <Badge variant="secondary">AVI</Badge>
                        <Badge variant="secondary">Up to 2GB</Badge>
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
                      <Scissors className="w-5 h-5 text-orange-500 animate-pulse" />
                      <span className="text-lg font-semibold">Processing video clip...</span>
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
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-xl">{project.file.name}</CardTitle>
                          <div className="flex gap-2">
                            <Button
                              onClick={() => trimAllClips(project)}
                              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                              disabled={isProcessing}
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Download All Clips
                            </Button>
                            <Button
                              onClick={() => removeProject(project.id)}
                              variant="outline"
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                          {/* Video Preview */}
                          <div className="xl:col-span-1">
                            <video
                              ref={(el) => {
                                if (el) videoRefs.current[project.id] = el
                              }}
                              src={project.videoUrl}
                              className="w-full rounded-lg shadow-lg"
                              onTimeUpdate={(e) => {
                                const video = e.target as HTMLVideoElement
                                setProjects((prev) =>
                                  prev.map((p) => (p.id === project.id ? { ...p, currentTime: video.currentTime } : p)),
                                )
                              }}
                            />

                            <div className="flex items-center gap-4 mt-4">
                              <Button
                                onClick={() => togglePlayPause(project.id)}
                                size="sm"
                                className="flex items-center gap-2"
                              >
                                {project.isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                {project.isPlaying ? "Pause" : "Play"}
                              </Button>
                              <span className="text-sm text-gray-500">
                                {formatTime(project.currentTime)} / {formatTime(project.duration)}
                              </span>
                            </div>

                            {/* Auto Clip Generator */}
                            <div className="mt-6 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                              <h4 className="font-semibold mb-3">Auto Clip Generator</h4>
                              <div className="space-y-3">
                                <div>
                                  <label className="block text-sm font-medium mb-1">Clip Duration (seconds)</label>
                                  <Input
                                    type="number"
                                    min="1"
                                    max={Math.floor(project.duration)}
                                    defaultValue="30"
                                    id={`duration-${project.id}`}
                                    className="w-full"
                                  />
                                </div>
                                <Button
                                  onClick={() => {
                                    const input = document.getElementById(`duration-${project.id}`) as HTMLInputElement
                                    const duration = Number.parseInt(input.value) || 30
                                    createAutoClips(project.id, duration)
                                  }}
                                  className="w-full"
                                  variant="outline"
                                >
                                  <Scissors className="w-4 h-4 mr-2" />
                                  Generate Auto Clips
                                </Button>
                              </div>
                            </div>
                          </div>

                          {/* Clips Management */}
                          <div className="xl:col-span-2">
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="text-lg font-semibold">Clips ({project.clips.length})</h3>
                              <Button onClick={() => addClip(project.id)} size="sm" className="flex items-center gap-2">
                                <Plus className="w-4 h-4" />
                                Add Clip
                              </Button>
                            </div>

                            <div className="space-y-4 max-h-96 overflow-y-auto">
                              {project.clips.map((clip) => (
                                <div key={clip.id} className="p-4 border rounded-lg bg-white dark:bg-slate-800">
                                  <div className="flex justify-between items-start mb-3">
                                    <Input
                                      value={clip.name}
                                      onChange={(e) => updateClip(project.id, clip.id, { name: e.target.value })}
                                      className="font-medium max-w-xs"
                                    />
                                    <div className="flex gap-2">
                                      <Button
                                        onClick={() => generatePreview(project, clip)}
                                        size="sm"
                                        variant="outline"
                                      >
                                        <Eye className="w-4 h-4" />
                                      </Button>
                                      <Button
                                        onClick={() => removeClip(project.id, clip.id)}
                                        size="sm"
                                        variant="outline"
                                        className="text-red-500"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <label className="block text-sm font-medium mb-2">
                                        Start: {formatTime(clip.startTime)}
                                      </label>
                                      <Slider
                                        value={[clip.startTime]}
                                        onValueChange={([value]) =>
                                          updateClip(project.id, clip.id, { startTime: value })
                                        }
                                        max={project.duration}
                                        min={0}
                                        step={0.1}
                                        className="w-full"
                                      />
                                    </div>

                                    <div>
                                      <label className="block text-sm font-medium mb-2">
                                        End: {formatTime(clip.endTime)}
                                      </label>
                                      <Slider
                                        value={[clip.endTime]}
                                        onValueChange={([value]) => updateClip(project.id, clip.id, { endTime: value })}
                                        max={project.duration}
                                        min={clip.startTime}
                                        step={0.1}
                                        className="w-full"
                                      />
                                    </div>
                                  </div>

                                  <div className="flex justify-between items-center mt-4">
                                    <div className="text-sm text-gray-600 dark:text-gray-300">
                                      Duration: {formatTime(clip.duration)}
                                    </div>
                                    <div className="flex gap-2">
                                      <Button
                                        onClick={() => seekToTime(project.id, clip.startTime)}
                                        size="sm"
                                        variant="outline"
                                      >
                                        Go to Start
                                      </Button>
                                      <Button
                                        onClick={() => trimVideo(project, clip)}
                                        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                                        disabled={isProcessing}
                                        size="sm"
                                      >
                                        {processingClipId === clip.id ? (
                                          "Processing..."
                                        ) : (
                                          <>
                                            <Download className="w-4 h-4 mr-2" />
                                            Download
                                          </>
                                        )}
                                      </Button>
                                    </div>
                                  </div>

                                  {clip.previewUrl && (
                                    <div className="mt-3">
                                      <img
                                        src={clip.previewUrl || "/placeholder.svg"}
                                        alt={`Preview of ${clip.name}`}
                                        className="w-32 h-20 object-cover rounded border"
                                      />
                                    </div>
                                  )}
                                </div>
                              ))}
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
