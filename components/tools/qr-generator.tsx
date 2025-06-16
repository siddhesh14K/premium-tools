"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, QrCode, Download, Palette, Smartphone, Mail, Phone, MessageSquare, Wifi } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import QRCodeLib from "qrcode"

type QRType = "text" | "url" | "wifi" | "email" | "phone" | "sms" | "contact"

interface QRData {
  type: QRType
  content: string
  wifi?: {
    ssid: string
    password: string
    security: string
    hidden: boolean
  }
  email?: {
    email: string
    subject: string
    body: string
  }
  phone?: {
    number: string
  }
  sms?: {
    number: string
    message: string
  }
  contact?: {
    name: string
    phone: string
    email: string
    organization: string
    url: string
  }
}

const qrTypes = [
  { value: "text", label: "Plain Text", icon: QrCode, description: "Simple text content" },
  { value: "url", label: "Website URL", icon: Smartphone, description: "Link to website" },
  { value: "wifi", label: "WiFi Network", icon: Wifi, description: "WiFi connection details" },
  { value: "email", label: "Email", icon: Mail, description: "Email with subject and body" },
  { value: "phone", label: "Phone Number", icon: Phone, description: "Phone number for calling" },
  { value: "sms", label: "SMS Message", icon: MessageSquare, description: "SMS with pre-filled message" },
  { value: "contact", label: "Contact Card", icon: Phone, description: "vCard contact information" },
]

export function QRGenerator() {
  const [qrData, setQRData] = useState<QRData>({
    type: "text",
    content: "Hello from Exact Tools!",
  })
  const [qrCode, setQRCode] = useState("")
  const [foregroundColor, setForegroundColor] = useState("#000000")
  const [backgroundColor, setBackgroundColor] = useState("#ffffff")
  const [size, setSize] = useState("512")
  const [errorLevel, setErrorLevel] = useState("M")
  const [isGenerating, setIsGenerating] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const generateQRContent = () => {
    let content = ""

    switch (qrData.type) {
      case "text":
        content = qrData.content
        break
      case "url":
        content = qrData.content.startsWith("http") ? qrData.content : `https://${qrData.content}`
        break
      case "wifi":
        const security = qrData.wifi?.security || "WPA"
        const hidden = qrData.wifi?.hidden ? "true" : "false"
        content = `WIFI:T:${security};S:${qrData.wifi?.ssid || ""};P:${qrData.wifi?.password || ""};H:${hidden};;`
        break
      case "email":
        const subject = encodeURIComponent(qrData.email?.subject || "")
        const body = encodeURIComponent(qrData.email?.body || "")
        content = `mailto:${qrData.email?.email || ""}?subject=${subject}&body=${body}`
        break
      case "phone":
        content = `tel:${qrData.phone?.number || ""}`
        break
      case "sms":
        const message = encodeURIComponent(qrData.sms?.message || "")
        content = `sms:${qrData.sms?.number || ""}?body=${message}`
        break
      case "contact":
        content = `BEGIN:VCARD
VERSION:3.0
FN:${qrData.contact?.name || ""}
ORG:${qrData.contact?.organization || ""}
TEL:${qrData.contact?.phone || ""}
EMAIL:${qrData.contact?.email || ""}
URL:${qrData.contact?.url || ""}
END:VCARD`
        break
    }

    return content
  }

  const generateQRCode = async () => {
    setIsGenerating(true)
    try {
      const content = generateQRContent()

      if (!content.trim()) {
        setQRCode("")
        return
      }

      const qrCodeDataURL = await QRCodeLib.toDataURL(content, {
        width: Number.parseInt(size),
        margin: 2,
        color: {
          dark: foregroundColor,
          light: backgroundColor,
        },
        errorCorrectionLevel: errorLevel as "L" | "M" | "Q" | "H",
      })

      setQRCode(qrCodeDataURL)
    } catch (error) {
      console.error("Error generating QR code:", error)
      setQRCode("")
    } finally {
      setIsGenerating(false)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      generateQRCode()
    }, 300)

    return () => clearTimeout(timer)
  }, [qrData, foregroundColor, backgroundColor, size, errorLevel])

  const downloadQRCode = async (format: "png" | "svg") => {
    const content = generateQRContent()
    if (!content.trim()) return

    if (format === "png" && qrCode) {
      const link = document.createElement("a")
      link.download = `qrcode_${qrData.type}.png`
      link.href = qrCode
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else if (format === "svg") {
      try {
        const svg = await QRCodeLib.toString(content, {
          type: "svg",
          width: Number.parseInt(size),
          margin: 2,
          color: {
            dark: foregroundColor,
            light: backgroundColor,
          },
          errorCorrectionLevel: errorLevel as "L" | "M" | "Q" | "H",
        })

        const blob = new Blob([svg], { type: "image/svg+xml" })
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.download = `qrcode_${qrData.type}.svg`
        link.href = url
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      } catch (error) {
        console.error("Error generating SVG:", error)
      }
    }
  }

  const renderInputFields = () => {
    switch (qrData.type) {
      case "text":
        return (
          <div>
            <Label htmlFor="content" className="text-lg font-semibold">
              Text Content
            </Label>
            <Textarea
              id="content"
              value={qrData.content}
              onChange={(e) => setQRData({ ...qrData, content: e.target.value })}
              placeholder="Enter your text here..."
              rows={4}
              className="mt-2"
            />
          </div>
        )

      case "url":
        return (
          <div>
            <Label htmlFor="url" className="text-lg font-semibold">
              Website URL
            </Label>
            <Input
              id="url"
              value={qrData.content}
              onChange={(e) => setQRData({ ...qrData, content: e.target.value })}
              placeholder="https://example.com"
              className="mt-2"
            />
          </div>
        )

      case "wifi":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="ssid" className="text-lg font-semibold">
                Network Name (SSID)
              </Label>
              <Input
                id="ssid"
                value={qrData.wifi?.ssid || ""}
                onChange={(e) =>
                  setQRData({
                    ...qrData,
                    wifi: {
                      ...qrData.wifi,
                      ssid: e.target.value,
                      password: qrData.wifi?.password || "",
                      security: qrData.wifi?.security || "WPA",
                      hidden: qrData.wifi?.hidden || false,
                    },
                  })
                }
                placeholder="My WiFi Network"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-lg font-semibold">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={qrData.wifi?.password || ""}
                onChange={(e) =>
                  setQRData({
                    ...qrData,
                    wifi: {
                      ...qrData.wifi,
                      ssid: qrData.wifi?.ssid || "",
                      password: e.target.value,
                      security: qrData.wifi?.security || "WPA",
                      hidden: qrData.wifi?.hidden || false,
                    },
                  })
                }
                placeholder="WiFi password"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="security" className="text-lg font-semibold">
                Security Type
              </Label>
              <Select
                value={qrData.wifi?.security || "WPA"}
                onValueChange={(value) =>
                  setQRData({
                    ...qrData,
                    wifi: {
                      ...qrData.wifi,
                      ssid: qrData.wifi?.ssid || "",
                      password: qrData.wifi?.password || "",
                      security: value,
                      hidden: qrData.wifi?.hidden || false,
                    },
                  })
                }
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WPA">WPA/WPA2</SelectItem>
                  <SelectItem value="WEP">WEP</SelectItem>
                  <SelectItem value="nopass">No Password</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case "email":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-lg font-semibold">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={qrData.email?.email || ""}
                onChange={(e) =>
                  setQRData({
                    ...qrData,
                    email: {
                      ...qrData.email,
                      email: e.target.value,
                      subject: qrData.email?.subject || "",
                      body: qrData.email?.body || "",
                    },
                  })
                }
                placeholder="contact@example.com"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="subject" className="text-lg font-semibold">
                Subject (Optional)
              </Label>
              <Input
                id="subject"
                value={qrData.email?.subject || ""}
                onChange={(e) =>
                  setQRData({
                    ...qrData,
                    email: {
                      ...qrData.email,
                      email: qrData.email?.email || "",
                      subject: e.target.value,
                      body: qrData.email?.body || "",
                    },
                  })
                }
                placeholder="Email subject"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="body" className="text-lg font-semibold">
                Message (Optional)
              </Label>
              <Textarea
                id="body"
                value={qrData.email?.body || ""}
                onChange={(e) =>
                  setQRData({
                    ...qrData,
                    email: {
                      ...qrData.email,
                      email: qrData.email?.email || "",
                      subject: qrData.email?.subject || "",
                      body: e.target.value,
                    },
                  })
                }
                placeholder="Email message"
                rows={3}
                className="mt-2"
              />
            </div>
          </div>
        )

      case "phone":
        return (
          <div>
            <Label htmlFor="phone" className="text-lg font-semibold">
              Phone Number
            </Label>
            <Input
              id="phone"
              value={qrData.phone?.number || ""}
              onChange={(e) =>
                setQRData({
                  ...qrData,
                  phone: { number: e.target.value },
                })
              }
              placeholder="+1234567890"
              className="mt-2"
            />
          </div>
        )

      case "sms":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="smsNumber" className="text-lg font-semibold">
                Phone Number
              </Label>
              <Input
                id="smsNumber"
                value={qrData.sms?.number || ""}
                onChange={(e) =>
                  setQRData({
                    ...qrData,
                    sms: { ...qrData.sms, number: e.target.value, message: qrData.sms?.message || "" },
                  })
                }
                placeholder="+1234567890"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="smsMessage" className="text-lg font-semibold">
                Message (Optional)
              </Label>
              <Textarea
                id="smsMessage"
                value={qrData.sms?.message || ""}
                onChange={(e) =>
                  setQRData({
                    ...qrData,
                    sms: { ...qrData.sms, number: qrData.sms?.number || "", message: e.target.value },
                  })
                }
                placeholder="SMS message"
                rows={3}
                className="mt-2"
              />
            </div>
          </div>
        )

      case "contact":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="contactName" className="text-lg font-semibold">
                Full Name
              </Label>
              <Input
                id="contactName"
                value={qrData.contact?.name || ""}
                onChange={(e) =>
                  setQRData({
                    ...qrData,
                    contact: {
                      ...qrData.contact,
                      name: e.target.value,
                      phone: qrData.contact?.phone || "",
                      email: qrData.contact?.email || "",
                      organization: qrData.contact?.organization || "",
                      url: qrData.contact?.url || "",
                    },
                  })
                }
                placeholder="John Doe"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="contactPhone" className="text-lg font-semibold">
                Phone Number
              </Label>
              <Input
                id="contactPhone"
                value={qrData.contact?.phone || ""}
                onChange={(e) =>
                  setQRData({
                    ...qrData,
                    contact: {
                      ...qrData.contact,
                      name: qrData.contact?.name || "",
                      phone: e.target.value,
                      email: qrData.contact?.email || "",
                      organization: qrData.contact?.organization || "",
                      url: qrData.contact?.url || "",
                    },
                  })
                }
                placeholder="+1234567890"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="contactEmail" className="text-lg font-semibold">
                Email Address
              </Label>
              <Input
                id="contactEmail"
                type="email"
                value={qrData.contact?.email || ""}
                onChange={(e) =>
                  setQRData({
                    ...qrData,
                    contact: {
                      ...qrData.contact,
                      name: qrData.contact?.name || "",
                      phone: qrData.contact?.phone || "",
                      email: e.target.value,
                      organization: qrData.contact?.organization || "",
                      url: qrData.contact?.url || "",
                    },
                  })
                }
                placeholder="john@example.com"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="contactOrg" className="text-lg font-semibold">
                Organization (Optional)
              </Label>
              <Input
                id="contactOrg"
                value={qrData.contact?.organization || ""}
                onChange={(e) =>
                  setQRData({
                    ...qrData,
                    contact: {
                      ...qrData.contact,
                      name: qrData.contact?.name || "",
                      phone: qrData.contact?.phone || "",
                      email: qrData.contact?.email || "",
                      organization: e.target.value,
                      url: qrData.contact?.url || "",
                    },
                  })
                }
                placeholder="Company Name"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="contactUrl" className="text-lg font-semibold">
                Website (Optional)
              </Label>
              <Input
                id="contactUrl"
                value={qrData.contact?.url || ""}
                onChange={(e) =>
                  setQRData({
                    ...qrData,
                    contact: {
                      ...qrData.contact,
                      name: qrData.contact?.name || "",
                      phone: qrData.contact?.phone || "",
                      email: qrData.contact?.email || "",
                      organization: qrData.contact?.organization || "",
                      url: e.target.value,
                    },
                  })
                }
                placeholder="https://example.com"
                className="mt-2"
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-900 dark:to-slate-800 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tools
          </Link>
          <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            QR Code Generator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Create custom QR codes with colors, logos, and various data types. Professional quality guaranteed.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Card className="shadow-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg">
                    <QrCode className="w-6 h-6" />
                  </div>
                  QR Code Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <Label htmlFor="type" className="text-lg font-semibold mb-4 block">
                    QR Code Type
                  </Label>
                  <div className="grid grid-cols-1 gap-3">
                    {qrTypes.map((type) => {
                      const IconComponent = type.icon
                      return (
                        <motion.div
                          key={type.value}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setQRData({ type: type.value as QRType, content: "" })}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            qrData.type === type.value
                              ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <IconComponent
                              className={`w-5 h-5 ${qrData.type === type.value ? "text-indigo-600" : "text-gray-500"}`}
                            />
                            <div>
                              <p
                                className={`font-semibold ${qrData.type === type.value ? "text-indigo-900 dark:text-indigo-100" : "text-gray-900 dark:text-white"}`}
                              >
                                {type.label}
                              </p>
                              <p className="text-sm text-gray-500">{type.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>

                <div className="border-t pt-6">{renderInputFields()}</div>

                <div className="border-t pt-6 space-y-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Customization
                  </h3>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="foreground" className="font-semibold">
                        Foreground Color
                      </Label>
                      <div className="flex items-center gap-3 mt-2">
                        <input
                          type="color"
                          value={foregroundColor}
                          onChange={(e) => setForegroundColor(e.target.value)}
                          className="w-12 h-12 rounded-lg border-2 border-gray-200 cursor-pointer"
                        />
                        <Input
                          value={foregroundColor}
                          onChange={(e) => setForegroundColor(e.target.value)}
                          placeholder="#000000"
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="background" className="font-semibold">
                        Background Color
                      </Label>
                      <div className="flex items-center gap-3 mt-2">
                        <input
                          type="color"
                          value={backgroundColor}
                          onChange={(e) => setBackgroundColor(e.target.value)}
                          className="w-12 h-12 rounded-lg border-2 border-gray-200 cursor-pointer"
                        />
                        <Input
                          value={backgroundColor}
                          onChange={(e) => setBackgroundColor(e.target.value)}
                          placeholder="#ffffff"
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="size" className="font-semibold">
                        Size (pixels)
                      </Label>
                      <Select value={size} onValueChange={setSize}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="256">256x256</SelectItem>
                          <SelectItem value="512">512x512</SelectItem>
                          <SelectItem value="1024">1024x1024</SelectItem>
                          <SelectItem value="2048">2048x2048</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="errorLevel" className="font-semibold">
                        Error Correction
                      </Label>
                      <Select value={errorLevel} onValueChange={setErrorLevel}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="L">Low (7%)</SelectItem>
                          <SelectItem value="M">Medium (15%)</SelectItem>
                          <SelectItem value="Q">Quartile (25%)</SelectItem>
                          <SelectItem value="H">High (30%)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <Card className="shadow-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Generated QR Code</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <AnimatePresence mode="wait">
                  {isGenerating ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center h-80"
                    >
                      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
                    </motion.div>
                  ) : qrCode ? (
                    <motion.div
                      key="qr-code"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="space-y-8"
                    >
                      <div className="inline-block p-6 bg-white rounded-2xl shadow-xl">
                        <img
                          src={qrCode || "/placeholder.svg"}
                          alt="Generated QR Code"
                          className="max-w-full h-auto rounded-lg"
                          style={{ maxWidth: "350px" }}
                        />
                      </div>

                      {/* QR Code Test Section */}
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Test Your QR Code:</h4>
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                          Scan with your phone camera or QR code reader to test functionality.
                        </p>
                        {qrData.type === "url" && (
                          <a
                            href={generateQRContent()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm underline"
                          >
                            Click to test URL →
                          </a>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                          onClick={() => downloadQRCode("png")}
                          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-6 py-3"
                        >
                          <Download className="w-4 h-4" />
                          Download PNG
                        </Button>
                        <Button
                          onClick={() => downloadQRCode("svg")}
                          variant="outline"
                          className="flex items-center gap-2 border-2 border-indigo-500 text-indigo-600 hover:bg-indigo-50 px-6 py-3"
                        >
                          <Download className="w-4 h-4" />
                          Download SVG
                        </Button>
                      </div>

                      <div className="text-sm text-gray-500 bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
                        <p className="font-semibold mb-2">QR Code Information:</p>
                        <p>Type: {qrTypes.find((t) => t.value === qrData.type)?.label}</p>
                        <p>
                          Size: {size}x{size} pixels
                        </p>
                        <p>Error Correction: {errorLevel}</p>
                        <p>
                          Data: {generateQRContent().substring(0, 100)}
                          {generateQRContent().length > 100 ? "..." : ""}
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center h-80 text-gray-400"
                    >
                      <div className="text-center">
                        <QrCode className="w-24 h-24 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">Fill in the details to generate QR code</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
