import type { Metadata } from "next"
import { VideoTrimmer } from "@/components/tools/video-trimmer"

export const metadata: Metadata = {
  title: "Free Video Trimmer Online - Cut & Trim Videos | Exact Tools",
  description:
    "Trim videos with frame-perfect precision. Cut, crop, and edit videos directly in your browser. Free online video trimmer with instant preview and download.",
  keywords:
    "video trimmer, cut video, trim video online, video editor, crop video, video cutter, online video trimmer, free video editor",
  openGraph: {
    title: "Free Video Trimmer - Cut & Trim Videos with Precision",
    description: "Professional video trimming tool. Cut videos with frame-perfect precision directly in your browser.",
    type: "website",
  },
  alternates: {
    canonical: "https://exacttools.com/tools/video-trimmer",
  },
}

export default function VideoTrimmerPage() {
  return <VideoTrimmer />
}
