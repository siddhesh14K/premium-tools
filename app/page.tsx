import { HeroSection } from "@/components/hero-section"
import { ToolsGrid } from "@/components/tools-grid"
import { FeaturesSection } from "@/components/features-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FAQSection } from "@/components/faq-section"
import { SEOSection } from "@/components/seo-section"
import { AdBanner } from "@/components/ad-banner"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* Ad after hero section */}
      <AdBanner slot="1234567890" format="horizontal" className="max-w-4xl mx-auto px-4 py-8" />

      <ToolsGrid />

      {/* Ad after tools grid */}
      <AdBanner slot="1234567891" format="rectangle" className="max-w-2xl mx-auto px-4 py-8" />

      <FeaturesSection />
      <TestimonialsSection />

      {/* Ad before FAQ */}
      <AdBanner slot="1234567892" format="horizontal" className="max-w-4xl mx-auto px-4 py-8" />

      <FAQSection />
      <SEOSection />
    </div>
  )
}
