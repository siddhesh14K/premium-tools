import type { Metadata } from "next"
import { Users, Target, Award, Heart, Zap, Shield } from "lucide-react"
import { AdBanner } from "@/components/ad-banner"

export const metadata: Metadata = {
  title: "About Us - Exact Tools",
  description:
    "Learn about Exact Tools mission to provide professional online tools that actually work. Our story, values, and commitment to user privacy.",
  robots: "index, follow",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About Exact Tools</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're on a mission to provide professional online tools that actually work, helping millions of users
            accomplish their tasks efficiently and securely.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <Target className="w-12 h-12 text-blue-600 mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              To democratize access to professional-grade online tools. We believe everyone should have access to
              high-quality utilities without paying premium prices or compromising their privacy. Our tools are designed
              to work flawlessly, process files locally, and deliver guaranteed results.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <Heart className="w-12 h-12 text-red-500 mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h2>
            <ul className="text-gray-700 space-y-3">
              <li className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-green-500" />
                <span>Privacy-first approach</span>
              </li>
              <li className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span>Lightning-fast performance</span>
              </li>
              <li className="flex items-center gap-3">
                <Award className="w-5 h-5 text-purple-500" />
                <span>Professional quality results</span>
              </li>
              <li className="flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-500" />
                <span>User-centric design</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Ad Banner */}
        <div className="mb-16">
          <AdBanner slot="1234567890" format="horizontal" className="max-w-2xl mx-auto" />
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Story</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-6">
              Exact Tools was born from frustration with existing online tools that either didn't work properly,
              required expensive subscriptions, or compromised user privacy by uploading files to remote servers.
            </p>
            <p className="mb-6">
              We set out to create a different kind of tool platform - one that processes everything locally in your
              browser, delivers professional-quality results, and remains completely free to use. Every tool is
              meticulously tested to ensure it works exactly as expected, every time.
            </p>
            <p className="mb-6">
              Today, over 2 million users trust Exact Tools for their daily tasks, from compressing images and editing
              PDFs to calculating loans and creating QR codes. We're proud to serve professionals, students, and
              everyday users who demand reliability and quality.
            </p>
            <p>
              Our commitment remains unchanged: to provide the best online tools experience while respecting your
              privacy and delivering results you can count on.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">2M+</h3>
            <p className="text-gray-600">Happy Users</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">50M+</h3>
            <p className="text-gray-600">Files Processed</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">99.9%</h3>
            <p className="text-gray-600">Uptime</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Be part of millions of users who trust Exact Tools for their daily tasks. Experience the difference of tools
            that actually work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Try Our Tools
            </a>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
