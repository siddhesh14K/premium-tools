import { HeroSection } from "@/components/hero-section"
import { ToolsGrid } from "@/components/tools-grid"
import { FeaturesSection } from "@/components/features-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FAQSection } from "@/components/faq-section"
import { SEOSection } from "@/components/seo-section"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ToolsGrid />
      <FeaturesSection />
      <TestimonialsSection />
      <FAQSection />
      <SEOSection />
    </div>
  )
}
