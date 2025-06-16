"use client"

import { useEffect } from "react"

export function GADebug() {
  useEffect(() => {
    // Debug Google Analytics
    if (typeof window !== "undefined") {
      console.log("Google Analytics Debug:")
      console.log("- dataLayer exists:", !!window.dataLayer)
      console.log("- gtag function exists:", typeof window.gtag === "function")
      console.log("- Current URL:", window.location.href)
      console.log("- Document title:", document.title)

      // Test if GA is working
      if (typeof window.gtag === "function") {
        window.gtag("event", "page_view_test", {
          page_title: document.title,
          page_location: window.location.href,
        })
        console.log("- Test event sent to GA")
      }
    }
  }, [])

  return null
}
