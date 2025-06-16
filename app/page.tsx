import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { ToolsGrid } from "@/components/tools-grid"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FAQSection } from "@/components/faq-section"
import { SEOSection } from "@/components/seo-section"
import { AdBanner } from "@/components/ad-banner"
import { GADebug } from "@/components/ga-debug"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <GADebug />
      <HeroSection />

      {/* Top Banner Ad */}
      <div className="container mx-auto px-4 py-4">
        <AdBanner slot="top-banner" format="horizontal" className="max-w-4xl mx-auto" />
      </div>

      <FeaturesSection />
      <ToolsGrid />

      {/* Middle Banner Ad */}
      <div className="container mx-auto px-4 py-6">
        <AdBanner slot="middle-banner" format="rectangle" className="max-w-2xl mx-auto" />
      </div>

      <TestimonialsSection />
      <FAQSection />
      <SEOSection />

      {/* Bottom Banner Ad */}
      <div className="container mx-auto px-4 py-4">
        <AdBanner slot="bottom-banner" format="horizontal" className="max-w-4xl mx-auto" />
      </div>
    </div>
  )
}
