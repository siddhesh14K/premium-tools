import type { Metadata } from "next"
import { BackgroundRemover } from "@/components/tools/background-remover"

export const metadata: Metadata = {
  title: "Free AI Background Remover Online - Remove Image Background | Exact Tools",
  description:
    "Remove backgrounds from images instantly with AI precision. Get transparent PNGs in seconds. Free online background remover with batch processing and high quality results.",
  keywords:
    "background remover, remove background, AI background removal, transparent PNG, cut out background, photo background remover, image background removal",
  openGraph: {
    title: "Free AI Background Remover - Remove Image Background Instantly",
    description: "AI-powered background removal with professional results. Get transparent PNGs in seconds.",
    type: "website",
  },
  alternates: {
    canonical: "https://exacttools.com/tools/background-remover",
  },
}

export default function BackgroundRemoverPage() {
  return <BackgroundRemover />
}
