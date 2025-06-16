import type { Metadata } from "next"
import TestGAPageClient from "./TestGAPageClient"

export const metadata: Metadata = {
  title: "Google Analytics Test - Free Tools Free",
  description: "Test page to verify Google Analytics is working correctly",
}

export default function TestGAPage() {
  return <TestGAPageClient />
}
