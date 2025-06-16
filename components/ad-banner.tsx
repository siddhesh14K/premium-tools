"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface AdBannerProps {
  slot: string
  format?: "auto" | "rectangle" | "vertical" | "horizontal"
  responsive?: boolean
  className?: string
  style?: React.CSSProperties
}

export function AdBanner({ slot, format = "auto", responsive = true, className = "", style = {} }: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && window.adsbygoogle && adRef.current) {
      try {
        ;(window.adsbygoogle as any[]).push({})
      } catch (error) {
        console.error("AdSense error:", error)
      }
    }
  }, [])

  return (
    <div className={`ad-container text-center my-4 ${className}`}>
      <div className="text-xs text-gray-400 mb-2">Advertisement</div>
      <ins
        ref={adRef}
        className="adsbygoogle block"
        style={{
          display: "block",
          textAlign: "center",
          ...style,
        }}
        data-ad-client="ca-pub-YOUR-PUBLISHER-ID"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  )
}

// Declare global adsbygoogle
declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}
