import type { Metadata } from "next"
import { ImageCompressor } from "@/components/tools/image-compressor"

export const metadata: Metadata = {
  title: "Free Image Compressor Online - Compress JPG, PNG, WebP | Exact Tools",
  description:
    "Compress images online for free. Reduce JPG, PNG, WebP file sizes by up to 90% without quality loss. Batch compression, instant download. Professional results guaranteed.",
  keywords:
    "image compressor, compress images online, reduce image size, JPG compressor, PNG compressor, WebP compressor, batch image compression, lossless compression",
  openGraph: {
    title: "Free Image Compressor - Reduce Image Size Without Quality Loss",
    description: "Professional image compression tool. Reduce file sizes by up to 90% while maintaining quality.",
    type: "website",
  },
  alternates: {
    canonical: "https://exacttools.com/tools/image-compressor",
  },
}

export default function ImageCompressorPage() {
  return <ImageCompressor />
}
