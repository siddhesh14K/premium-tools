"use client"

import type React from "react"

import { useState, useRef, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import {
  Upload,
  Download,
  Type,
  ImageIcon,
  PenTool,
  Square,
  Circle,
  FileSignature,
  ZoomIn,
  ZoomOut,
  Undo,
  Redo,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Settings,
} from "lucide-react"

// PDF.js types
declare global {
  interface Window {
    pdfjsLib: any
  }
}

interface Annotation {
  id: string
  type: "text" | "image" | "drawing" | "highlight" | "rectangle" | "circle" | "arrow" | "line" | "signature"
  x: number
  y: number
  width?: number
  height?: number
  content?: string
  fontSize?: number
  fontFamily?: string
  color?: string
  backgroundColor?: string
  strokeWidth?: number
  strokeColor?: string
  fillColor?: string
  opacity?: number
  imageData?: string
  points?: { x: number; y: number }[]
  page: number
}

interface PDFPage {
  pageNumber: number
  canvas: HTMLCanvasElement
  annotations: Annotation[]
}

export function PDFEditor() {
  const [file, setFile] = useState<File | null>(null)
  const [pdfDoc, setPdfDoc] = useState<any>(null)
  const [pages, setPages] = useState<PDFPage[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [zoom, setZoom] = useState(100)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTool, setSelectedTool] = useState<string>("text")
  const [annotations, setAnnotations] = useState<Annotation[]>([])
  const [selectedAnnotation, setSelectedAnnotation] = useState<string | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentDrawing, setCurrentDrawing] = useState<{ x: number; y: number }[]>([])
  const [history, setHistory] = useState<Annotation[][]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  // Tool settings
  const [textSettings, setTextSettings] = useState({
    content: "",
    fontSize: 16,
    fontFamily: "Arial",
    color: "#000000",
    backgroundColor: "transparent",
  })

  const [drawingSettings, setDrawingSettings] = useState({
    strokeWidth: 2,
    strokeColor: "#000000",
    fillColor: "transparent",
    opacity: 1,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  // Load PDF.js
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"
    script.onload = () => {
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"
      }
    }
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  const handleFileUpload = useCallback(async (uploadedFile: File) => {
    if (!uploadedFile.type.includes("pdf")) {
      alert("Please upload a PDF file")
      return
    }

    setIsLoading(true)
    setFile(uploadedFile)

    try {
      const arrayBuffer = await uploadedFile.arrayBuffer()
      const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise
      setPdfDoc(pdf)
      setTotalPages(pdf.numPages)
      setCurrentPage(1)

      // Render all pages
      const pdfPages: PDFPage[] = []
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const viewport = page.getViewport({ scale: 1.5 })

        const canvas = document.createElement("canvas")
        const context = canvas.getContext("2d")!
        canvas.height = viewport.height
        canvas.width = viewport.width

        await page.render({
          canvasContext: context,
          viewport: viewport,
        }).promise

        pdfPages.push({
          pageNumber: i,
          canvas,
          annotations: [],
        })
      }

      setPages(pdfPages)
      setAnnotations([])
      setHistory([])
      setHistoryIndex(-1)
    } catch (error) {
      console.error("Error loading PDF:", error)
      alert("Error loading PDF file")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const addToHistory = useCallback(
    (newAnnotations: Annotation[]) => {
      const newHistory = history.slice(0, historyIndex + 1)
      newHistory.push([...newAnnotations])
      setHistory(newHistory)
      setHistoryIndex(newHistory.length - 1)
    },
    [history, historyIndex],
  )

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setAnnotations([...history[historyIndex - 1]])
    }
  }, [history, historyIndex])

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setAnnotations([...history[historyIndex + 1]])
    }
  }, [history, historyIndex])

  const addAnnotation = useCallback(
    (annotation: Omit<Annotation, "id">) => {
      const newAnnotation: Annotation = {
        ...annotation,
        id: Date.now().toString(),
      }
      const newAnnotations = [...annotations, newAnnotation]
      setAnnotations(newAnnotations)
      addToHistory(newAnnotations)
    },
    [annotations, addToHistory],
  )

  const updateAnnotation = useCallback(
    (id: string, updates: Partial<Annotation>) => {
      const newAnnotations = annotations.map((ann) => (ann.id === id ? { ...ann, ...updates } : ann))
      setAnnotations(newAnnotations)
      addToHistory(newAnnotations)
    },
    [annotations, addToHistory],
  )

  const deleteAnnotation = useCallback(
    (id: string) => {
      const newAnnotations = annotations.filter((ann) => ann.id !== id)
      setAnnotations(newAnnotations)
      addToHistory(newAnnotations)
      setSelectedAnnotation(null)
    },
    [annotations, addToHistory],
  )

  const handleCanvasClick = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      if (!canvasRef.current) return

      const rect = canvasRef.current.getBoundingClientRect()
      const x = (event.clientX - rect.left) * (canvasRef.current.width / rect.width)
      const y = (event.clientY - rect.top) * (canvasRef.current.height / rect.height)

      if (selectedTool === "text" && textSettings.content) {
        addAnnotation({
          type: "text",
          x,
          y,
          content: textSettings.content,
          fontSize: textSettings.fontSize,
          fontFamily: textSettings.fontFamily,
          color: textSettings.color,
          backgroundColor: textSettings.backgroundColor,
          page: currentPage,
        })
        setTextSettings({ ...textSettings, content: "" })
      }
    },
    [selectedTool, textSettings, currentPage, addAnnotation],
  )

  const handleCanvasMouseDown = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      if (!canvasRef.current) return

      const rect = canvasRef.current.getBoundingClientRect()
      const x = (event.clientX - rect.left) * (canvasRef.current.width / rect.width)
      const y = (event.clientY - rect.top) * (canvasRef.current.height / rect.height)

      if (selectedTool === "drawing") {
        setIsDrawing(true)
        setCurrentDrawing([{ x, y }])
      }
    },
    [selectedTool],
  )

  const handleCanvasMouseMove = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      if (!canvasRef.current || !isDrawing) return

      const rect = canvasRef.current.getBoundingClientRect()
      const x = (event.clientX - rect.left) * (canvasRef.current.width / rect.width)
      const y = (event.clientY - rect.top) * (canvasRef.current.height / rect.height)

      setCurrentDrawing((prev) => [...prev, { x, y }])
    },
    [isDrawing],
  )

  const handleCanvasMouseUp = useCallback(() => {
    if (isDrawing && currentDrawing.length > 1) {
      addAnnotation({
        type: "drawing",
        x: 0,
        y: 0,
        points: currentDrawing,
        strokeWidth: drawingSettings.strokeWidth,
        strokeColor: drawingSettings.strokeColor,
        opacity: drawingSettings.opacity,
        page: currentPage,
      })
    }
    setIsDrawing(false)
    setCurrentDrawing([])
  }, [isDrawing, currentDrawing, drawingSettings, currentPage, addAnnotation])

  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = (e) => {
        const imageData = e.target?.result as string
        addAnnotation({
          type: "image",
          x: 100,
          y: 100,
          width: 200,
          height: 150,
          imageData,
          page: currentPage,
        })
      }
      reader.readAsDataURL(file)
    },
    [currentPage, addAnnotation],
  )

  const renderCanvas = useCallback(() => {
    if (!canvasRef.current || !pages[currentPage - 1]) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")!
    const currentPageData = pages[currentPage - 1]

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw PDF page
    ctx.drawImage(currentPageData.canvas, 0, 0)

    // Draw annotations for current page
    const pageAnnotations = annotations.filter((ann) => ann.page === currentPage)

    pageAnnotations.forEach((annotation) => {
      ctx.save()

      if (annotation.opacity) {
        ctx.globalAlpha = annotation.opacity
      }

      switch (annotation.type) {
        case "text":
          ctx.font = `${annotation.fontSize}px ${annotation.fontFamily}`
          ctx.fillStyle = annotation.color || "#000000"

          if (annotation.backgroundColor && annotation.backgroundColor !== "transparent") {
            const textMetrics = ctx.measureText(annotation.content || "")
            ctx.fillStyle = annotation.backgroundColor
            ctx.fillRect(
              annotation.x,
              annotation.y - (annotation.fontSize || 16),
              textMetrics.width,
              annotation.fontSize || 16,
            )
            ctx.fillStyle = annotation.color || "#000000"
          }

          ctx.fillText(annotation.content || "", annotation.x, annotation.y)
          break

        case "image":
          if (annotation.imageData) {
            const img = new Image()
            img.onload = () => {
              ctx.drawImage(img, annotation.x, annotation.y, annotation.width || 200, annotation.height || 150)
            }
            img.src = annotation.imageData
          }
          break

        case "drawing":
          if (annotation.points && annotation.points.length > 1) {
            ctx.beginPath()
            ctx.moveTo(annotation.points[0].x, annotation.points[0].y)
            annotation.points.forEach((point) => {
              ctx.lineTo(point.x, point.y)
            })
            ctx.strokeStyle = annotation.strokeColor || "#000000"
            ctx.lineWidth = annotation.strokeWidth || 2
            ctx.stroke()
          }
          break

        case "rectangle":
          ctx.strokeStyle = annotation.strokeColor || "#000000"
          ctx.lineWidth = annotation.strokeWidth || 2
          if (annotation.fillColor && annotation.fillColor !== "transparent") {
            ctx.fillStyle = annotation.fillColor
            ctx.fillRect(annotation.x, annotation.y, annotation.width || 100, annotation.height || 100)
          }
          ctx.strokeRect(annotation.x, annotation.y, annotation.width || 100, annotation.height || 100)
          break

        case "circle":
          ctx.beginPath()
          ctx.arc(annotation.x, annotation.y, (annotation.width || 50) / 2, 0, 2 * Math.PI)
          ctx.strokeStyle = annotation.strokeColor || "#000000"
          ctx.lineWidth = annotation.strokeWidth || 2
          if (annotation.fillColor && annotation.fillColor !== "transparent") {
            ctx.fillStyle = annotation.fillColor
            ctx.fill()
          }
          ctx.stroke()
          break
      }

      ctx.restore()
    })

    // Draw current drawing
    if (isDrawing && currentDrawing.length > 1) {
      ctx.beginPath()
      ctx.moveTo(currentDrawing[0].x, currentDrawing[0].y)
      currentDrawing.forEach((point) => {
        ctx.lineTo(point.x, point.y)
      })
      ctx.strokeStyle = drawingSettings.strokeColor
      ctx.lineWidth = drawingSettings.strokeWidth
      ctx.stroke()
    }
  }, [pages, currentPage, annotations, isDrawing, currentDrawing, drawingSettings])

  useEffect(() => {
    renderCanvas()
  }, [renderCanvas])

  const downloadPDF = useCallback(async () => {
    if (!pages.length) return

    // Import jsPDF dynamically
    const { jsPDF } = await import("jspdf")
    const pdf = new jsPDF()

    for (let i = 0; i < pages.length; i++) {
      if (i > 0) pdf.addPage()

      const pageData = pages[i]
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")!

      canvas.width = pageData.canvas.width
      canvas.height = pageData.canvas.height

      // Draw original page
      ctx.drawImage(pageData.canvas, 0, 0)

      // Draw annotations
      const pageAnnotations = annotations.filter((ann) => ann.page === i + 1)
      pageAnnotations.forEach((annotation) => {
        ctx.save()

        if (annotation.opacity) {
          ctx.globalAlpha = annotation.opacity
        }

        switch (annotation.type) {
          case "text":
            ctx.font = `${annotation.fontSize}px ${annotation.fontFamily}`
            ctx.fillStyle = annotation.color || "#000000"
            ctx.fillText(annotation.content || "", annotation.x, annotation.y)
            break

          case "drawing":
            if (annotation.points && annotation.points.length > 1) {
              ctx.beginPath()
              ctx.moveTo(annotation.points[0].x, annotation.points[0].y)
              annotation.points.forEach((point) => {
                ctx.lineTo(point.x, point.y)
              })
              ctx.strokeStyle = annotation.strokeColor || "#000000"
              ctx.lineWidth = annotation.strokeWidth || 2
              ctx.stroke()
            }
            break
        }

        ctx.restore()
      })

      // Add to PDF
      const imgData = canvas.toDataURL("image/jpeg", 0.95)
      const imgWidth = 210 // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight)
    }

    pdf.save(`edited-${file?.name || "document"}.pdf`)
  }, [pages, annotations, file])

  const currentPageAnnotations = annotations.filter((ann) => ann.page === currentPage)

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* Upload Section */}
      <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-amber-400 transition-colors">
        <CardContent className="p-8">
          <div className="text-center">
            <Upload className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Upload PDF Document</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Drag and drop your PDF file here, or click to browse
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
              className="hidden"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              size="lg"
            >
              <Upload className="mr-2 h-5 w-5" />
              Choose PDF File
            </Button>
          </div>
        </CardContent>
      </Card>

      {isLoading && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
            <p className="text-lg">Loading PDF document...</p>
          </CardContent>
        </Card>
      )}

      {pages.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Tools Panel */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Editing Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Tool Selection */}
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "text", icon: Type, label: "Text" },
                    { id: "image", icon: ImageIcon, label: "Image" },
                    { id: "drawing", icon: PenTool, label: "Draw" },
                    { id: "rectangle", icon: Square, label: "Rectangle" },
                    { id: "circle", icon: Circle, label: "Circle" },
                    { id: "signature", icon: FileSignature, label: "Sign" },
                  ].map((tool) => (
                    <Button
                      key={tool.id}
                      variant={selectedTool === tool.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTool(tool.id)}
                      className="flex flex-col gap-1 h-auto py-3"
                    >
                      <tool.icon className="h-4 w-4" />
                      <span className="text-xs">{tool.label}</span>
                    </Button>
                  ))}
                </div>

                <Separator />

                {/* Text Settings */}
                {selectedTool === "text" && (
                  <div className="space-y-4">
                    <div>
                      <Label>Text Content</Label>
                      <Textarea
                        value={textSettings.content}
                        onChange={(e) => setTextSettings({ ...textSettings, content: e.target.value })}
                        placeholder="Enter text to add..."
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Font Size: {textSettings.fontSize}px</Label>
                      <Slider
                        value={[textSettings.fontSize]}
                        onValueChange={([value]) => setTextSettings({ ...textSettings, fontSize: value })}
                        min={8}
                        max={72}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Font Family</Label>
                      <Select
                        value={textSettings.fontFamily}
                        onValueChange={(value) => setTextSettings({ ...textSettings, fontFamily: value })}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Arial">Arial</SelectItem>
                          <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                          <SelectItem value="Helvetica">Helvetica</SelectItem>
                          <SelectItem value="Georgia">Georgia</SelectItem>
                          <SelectItem value="Verdana">Verdana</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Text Color</Label>
                      <Input
                        type="color"
                        value={textSettings.color}
                        onChange={(e) => setTextSettings({ ...textSettings, color: e.target.value })}
                        className="mt-1 h-10"
                      />
                    </div>
                  </div>
                )}

                {/* Drawing Settings */}
                {selectedTool === "drawing" && (
                  <div className="space-y-4">
                    <div>
                      <Label>Stroke Width: {drawingSettings.strokeWidth}px</Label>
                      <Slider
                        value={[drawingSettings.strokeWidth]}
                        onValueChange={([value]) => setDrawingSettings({ ...drawingSettings, strokeWidth: value })}
                        min={1}
                        max={20}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Stroke Color</Label>
                      <Input
                        type="color"
                        value={drawingSettings.strokeColor}
                        onChange={(e) => setDrawingSettings({ ...drawingSettings, strokeColor: e.target.value })}
                        className="mt-1 h-10"
                      />
                    </div>
                    <div>
                      <Label>Opacity: {Math.round(drawingSettings.opacity * 100)}%</Label>
                      <Slider
                        value={[drawingSettings.opacity]}
                        onValueChange={([value]) => setDrawingSettings({ ...drawingSettings, opacity: value })}
                        min={0.1}
                        max={1}
                        step={0.1}
                        className="mt-2"
                      />
                    </div>
                  </div>
                )}

                {/* Image Upload */}
                {selectedTool === "image" && (
                  <div>
                    <Label>Upload Image</Label>
                    <input
                      ref={imageInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Button onClick={() => imageInputRef.current?.click()} variant="outline" className="w-full mt-2">
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Choose Image
                    </Button>
                  </div>
                )}

                <Separator />

                {/* History Controls */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={undo} disabled={historyIndex <= 0} className="flex-1">
                    <Undo className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={redo}
                    disabled={historyIndex >= history.length - 1}
                    className="flex-1"
                  >
                    <Redo className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Annotations List */}
            {currentPageAnnotations.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Page {currentPage} Annotations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {currentPageAnnotations.map((annotation) => (
                      <div
                        key={annotation.id}
                        className={`p-2 rounded border cursor-pointer ${
                          selectedAnnotation === annotation.id ? "border-amber-500 bg-amber-50" : "border-gray-200"
                        }`}
                        onClick={() => setSelectedAnnotation(annotation.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {annotation.type === "text" && <Type className="h-4 w-4" />}
                            {annotation.type === "image" && <ImageIcon className="h-4 w-4" />}
                            {annotation.type === "drawing" && <PenTool className="h-4 w-4" />}
                            <span className="text-sm font-medium capitalize">{annotation.type}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteAnnotation(annotation.id)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        {annotation.content && (
                          <p className="text-xs text-gray-600 mt-1 truncate">{annotation.content}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* PDF Viewer */}
          <div className="lg:col-span-3 space-y-6">
            {/* Controls */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage <= 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage >= totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setZoom(Math.max(25, zoom - 25))}>
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium min-w-[60px] text-center">{zoom}%</span>
                    <Button variant="outline" size="sm" onClick={() => setZoom(Math.min(200, zoom + 25))}>
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  </div>

                  <Button
                    onClick={downloadPDF}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Canvas */}
            <Card>
              <CardContent className="p-4">
                <div
                  className="border rounded-lg overflow-auto bg-gray-50 dark:bg-gray-900"
                  style={{ maxHeight: "800px" }}
                >
                  <canvas
                    ref={canvasRef}
                    width={pages[currentPage - 1]?.canvas.width || 0}
                    height={pages[currentPage - 1]?.canvas.height || 0}
                    style={{
                      transform: `scale(${zoom / 100})`,
                      transformOrigin: "top left",
                      cursor: selectedTool === "drawing" ? "crosshair" : "pointer",
                    }}
                    onClick={handleCanvasClick}
                    onMouseDown={handleCanvasMouseDown}
                    onMouseMove={handleCanvasMouseMove}
                    onMouseUp={handleCanvasMouseUp}
                    className="block"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Statistics */}
      {annotations.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-amber-600">{annotations.length}</div>
                <div className="text-sm text-gray-600">Total Annotations</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {annotations.filter((a) => a.type === "text").length}
                </div>
                <div className="text-sm text-gray-600">Text Annotations</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {annotations.filter((a) => a.type === "drawing").length}
                </div>
                <div className="text-sm text-gray-600">Drawings</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">{totalPages}</div>
                <div className="text-sm text-gray-600">Total Pages</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
