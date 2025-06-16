import type { Metadata } from "next"
import { GIFMaker } from "@/components/tools/gif-maker"

export const metadata: Metadata = {
  title: "Free GIF Maker Online - Convert Video/Images to GIF | Exact Tools",
  description:
    "Convert videos and images to high-quality animated GIFs with custom speed and optimization settings. Free online GIF maker with instant preview and download.",
  keywords:
    "GIF maker, create GIF, video to GIF, images to GIF, animated GIF, GIF converter, online GIF maker, free GIF creator",
  openGraph: {
    title: "Free GIF Maker - Convert Video & Images to Animated GIFs",
    description:
      "Professional GIF maker with custom speed, quality, and optimization settings. Create perfect GIFs instantly.",
    type: "website",
  },
  alternates: {
    canonical: "https://exacttools.com/tools/gif-maker",
  },
}

export default function GIFMakerPage() {
  return <GIFMaker />
}
