import type { Metadata } from "next"
import { QRGenerator } from "@/components/tools/qr-generator"

export const metadata: Metadata = {
  title: "Free QR Code Generator with Logo - Custom QR Codes | Exact Tools",
  description:
    "Generate custom QR codes with logos, colors, and branding. Free QR code generator for URLs, text, WiFi, contact info, email, SMS. Download as PNG or SVG.",
  keywords:
    "QR code generator, custom QR codes, QR code with logo, branded QR codes, free QR generator, QR code maker, WiFi QR code, contact QR code",
  openGraph: {
    title: "Free QR Code Generator - Create Custom QR Codes with Logo",
    description:
      "Professional QR code generator with custom colors, logos, and multiple data types. Download as PNG or SVG.",
    type: "website",
  },
  alternates: {
    canonical: "https://exacttools.com/tools/qr-generator",
  },
}

export default function QRGeneratorPage() {
  return <QRGenerator />
}
