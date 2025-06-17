import type { Metadata } from "next"
import { VideoCompressor } from "@/components/tools/video-compressor"

export const metadata: Metadata = {
  title: "Free Video Compressor Online - Reduce Video File Size | Exact Tools",
  description:
    "Compress videos while maintaining quality. Reduce file sizes by up to 80% with smart optimization. Free online video compressor with batch processing and custom settings.",
  keywords:
    "video compressor, compress video, reduce video size, video optimization, video file size reducer, online video compressor, free video compression",
  openGraph: {
    title: "Free Video Compressor - Reduce Video File Size Without Quality Loss",
    description:
      "Professional video compression with smart optimization. Reduce file sizes by up to 80% while maintaining quality.",
    type: "website",
  },
  alternates: {
    canonical: "https://exacttools.com/tools/video-compressor",
  },
}

export default function VideoCompressorPage() {
  return <VideoCompressor />
}
