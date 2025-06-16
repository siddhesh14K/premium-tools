import type { Metadata } from "next"
import { Users, Target, Award, Heart, Shield, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "About Us - Exact Tools | Our Mission & Story",
  description:
    "Learn about Exact Tools - your trusted source for free online utilities. Discover our mission to provide professional-grade tools accessible to everyone, our commitment to privacy, and our story.",
  keywords: "about exact tools, our mission, free online tools, privacy-focused, professional utilities, team",
  robots: "index, follow",
  alternates: {
    canonical: "https://exacttools.com/about",
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Exact Tools</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're passionate about making professional-grade online tools accessible to everyone. Our mission is to
            provide fast, reliable, and completely free utilities that help you accomplish your tasks efficiently.
          </p>
        </div>

        {/* Mission & Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                To democratize access to professional online tools, making powerful utilities available to everyone
                regardless of budget or technical expertise.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-xl">Privacy First</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                All processing happens locally in your browser. We never store, access, or share your files. Your
                privacy and data security are our top priorities.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <Zap className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <CardTitle className="text-xl">Always Free</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                We believe essential tools should be free for everyone. No hidden fees, no premium tiers, no limitations
                - just powerful tools available 24/7.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Our Story */}
        <Card className="shadow-xl mb-16">
          <CardHeader>
            <CardTitle className="text-3xl text-center mb-4">Our Story</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none">
            <div className="text-gray-700 space-y-6">
              <p>
                Exact Tools was born from a simple frustration: why should you need to pay for basic online utilities or
                compromise your privacy by uploading files to unknown servers? We saw people struggling with expensive
                software subscriptions just to compress an image or edit a PDF.
              </p>

              <p>
                Our team of developers and designers came together with a shared vision - to create a comprehensive
                suite of professional-grade online tools that are completely free, respect user privacy, and work
                flawlessly across all devices.
              </p>

              <p>
                Since our launch, we've helped millions of users worldwide accomplish their tasks more efficiently. From
                students working on assignments to professionals preparing presentations, our tools have become an
                essential part of many people's digital toolkit.
              </p>

              <p>
                We're constantly improving and adding new tools based on user feedback. Our commitment remains the same:
                providing the best free online utilities while maintaining the highest standards of privacy and
                performance.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* What Makes Us Different */}
        <Card className="shadow-xl mb-16">
          <CardHeader>
            <CardTitle className="text-3xl text-center mb-4">What Makes Us Different</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Award className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Professional Quality</h3>
                    <p className="text-gray-600">
                      Our tools deliver enterprise-grade results with pixel-perfect accuracy and optimal file
                      compression.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Shield className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Complete Privacy</h3>
                    <p className="text-gray-600">
                      Local processing means your files never leave your device. No uploads, no storage, no tracking.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Zap className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Lightning Fast</h3>
                    <p className="text-gray-600">
                      Optimized algorithms and local processing ensure instant results without waiting for uploads.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">User-Focused Design</h3>
                    <p className="text-gray-600">
                      Intuitive interfaces designed for both beginners and professionals, with mobile-first approach.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Target className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Constantly Evolving</h3>
                    <p className="text-gray-600">
                      Regular updates and new tools based on user feedback and emerging needs in the digital workspace.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Heart className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Community Driven</h3>
                    <p className="text-gray-600">
                      Built by the community, for the community. Every feature request and feedback shapes our roadmap.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="shadow-xl">
          <CardContent className="text-center py-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Have questions, suggestions, or just want to say hello? We'd love to hear from you. Our team is always
              ready to help and improve your experience.
            </p>
            <div className="space-y-4">
              <p className="text-lg">
                <strong>Email:</strong>
                <a href="mailto:siddheshdeshmukh66@gmail.com" className="text-blue-600 hover:underline ml-2">
                  siddheshdeshmukh66@gmail.com
                </a>
              </p>
              <p className="text-gray-600">We typically respond within 24 hours</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
