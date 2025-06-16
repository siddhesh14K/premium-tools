import type { Metadata } from "next"
import { Search, Book, Video, MessageCircle } from "lucide-react"
import Link from "next/link"
import { AdBanner } from "@/components/ad-banner"

export const metadata: Metadata = {
  title: "Help Center - Exact Tools | Tutorials, Guides & Support",
  description:
    "Get help with Exact Tools. Find tutorials, guides, and answers to common questions about our free online tools including image compressor, PDF editor, and more.",
  keywords:
    "exact tools help, how to use exact tools, online tools tutorial, image compression guide, PDF editing help, exact tools support",
}

export default function HelpCenter() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">How can we help you?</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Find tutorials, guides, and answers to all your questions about using Exact Tools
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for help articles..."
              className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
        </div>
      </section>

      {/* Quick Help Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Help Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <Book className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Getting Started</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Learn the basics of using Exact Tools and get started with your first project.
              </p>
              <Link href="/help/getting-started" className="text-blue-600 hover:text-blue-700 font-medium">
                Read guides →
              </Link>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <Video className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Video Tutorials</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Watch step-by-step video tutorials for all our tools and features.
              </p>
              <Link href="/help/tutorials" className="text-green-600 hover:text-green-700 font-medium">
                Watch videos →
              </Link>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <MessageCircle className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Contact Support</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Can't find what you're looking for? Get in touch with our support team.
              </p>
              <Link href="/contact" className="text-purple-600 hover:text-purple-700 font-medium">
                Contact us →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tool-Specific Help */}
      <section className="py-16 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Tool-Specific Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Image Compressor Help */}
            <div className="border border-gray-200 dark:border-slate-600 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4">Image Compressor</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/help/image-compressor/how-to-compress-images" className="text-blue-600 hover:underline">
                    How to compress images without losing quality
                  </Link>
                </li>
                <li>
                  <Link href="/help/image-compressor/batch-compression" className="text-blue-600 hover:underline">
                    Batch compress multiple images
                  </Link>
                </li>
                <li>
                  <Link href="/help/image-compressor/best-settings" className="text-blue-600 hover:underline">
                    Best compression settings for web
                  </Link>
                </li>
                <li>
                  <Link href="/help/image-compressor/supported-formats" className="text-blue-600 hover:underline">
                    Supported image formats
                  </Link>
                </li>
              </ul>
            </div>

            {/* PDF Editor Help */}
            <div className="border border-gray-200 dark:border-slate-600 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4">PDF Editor</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/help/pdf-editor/edit-text" className="text-blue-600 hover:underline">
                    How to edit text in PDF files
                  </Link>
                </li>
                <li>
                  <Link href="/help/pdf-editor/add-images" className="text-blue-600 hover:underline">
                    Adding images to PDF documents
                  </Link>
                </li>
                <li>
                  <Link href="/help/pdf-editor/merge-split" className="text-blue-600 hover:underline">
                    Merge and split PDF files
                  </Link>
                </li>
                <li>
                  <Link href="/help/pdf-editor/digital-signatures" className="text-blue-600 hover:underline">
                    Adding digital signatures
                  </Link>
                </li>
              </ul>
            </div>

            {/* Background Remover Help */}
            <div className="border border-gray-200 dark:border-slate-600 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4">Background Remover</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/help/background-remover/best-results" className="text-blue-600 hover:underline">
                    Getting the best background removal results
                  </Link>
                </li>
                <li>
                  <Link href="/help/background-remover/fine-tuning" className="text-blue-600 hover:underline">
                    Fine-tuning background removal
                  </Link>
                </li>
                <li>
                  <Link href="/help/background-remover/transparent-images" className="text-blue-600 hover:underline">
                    Creating transparent PNG images
                  </Link>
                </li>
                <li>
                  <Link href="/help/background-remover/troubleshooting" className="text-blue-600 hover:underline">
                    Troubleshooting common issues
                  </Link>
                </li>
              </ul>
            </div>

            {/* Video Tools Help */}
            <div className="border border-gray-200 dark:border-slate-600 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4">Video Tools</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/help/video-tools/trimming" className="text-blue-600 hover:underline">
                    How to trim and cut videos
                  </Link>
                </li>
                <li>
                  <Link href="/help/video-tools/compression" className="text-blue-600 hover:underline">
                    Video compression best practices
                  </Link>
                </li>
                <li>
                  <Link href="/help/video-tools/gif-creation" className="text-blue-600 hover:underline">
                    Creating GIFs from videos
                  </Link>
                </li>
                <li>
                  <Link href="/help/video-tools/formats" className="text-blue-600 hover:underline">
                    Supported video formats
                  </Link>
                </li>
              </ul>
            </div>

            {/* Calculator Help */}
            <div className="border border-gray-200 dark:border-slate-600 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4">Loan Calculator</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/help/calculator/loan-calculations" className="text-blue-600 hover:underline">
                    Understanding loan calculations
                  </Link>
                </li>
                <li>
                  <Link href="/help/calculator/emi-calculation" className="text-blue-600 hover:underline">
                    How EMI calculation works
                  </Link>
                </li>
                <li>
                  <Link href="/help/calculator/interest-rates" className="text-blue-600 hover:underline">
                    Interest rate types explained
                  </Link>
                </li>
                <li>
                  <Link href="/help/calculator/amortization" className="text-blue-600 hover:underline">
                    Reading amortization schedules
                  </Link>
                </li>
              </ul>
            </div>

            {/* QR Generator Help */}
            <div className="border border-gray-200 dark:border-slate-600 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4">QR Code Generator</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/help/qr-generator/creating-qr-codes" className="text-blue-600 hover:underline">
                    Creating QR codes for different purposes
                  </Link>
                </li>
                <li>
                  <Link href="/help/qr-generator/customization" className="text-blue-600 hover:underline">
                    Customizing QR code appearance
                  </Link>
                </li>
                <li>
                  <Link href="/help/qr-generator/best-practices" className="text-blue-600 hover:underline">
                    QR code best practices
                  </Link>
                </li>
                <li>
                  <Link href="/help/qr-generator/testing" className="text-blue-600 hover:underline">
                    Testing QR code functionality
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <div className="container mx-auto px-4 py-6">
        <AdBanner slot="help-center-middle" format="horizontal" className="max-w-4xl mx-auto" />
      </div>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-3">Are all Exact Tools completely free?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, all tools on Exact Tools are completely free to use with no hidden costs, premium tiers, or usage
                limitations. We believe essential tools should be accessible to everyone.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-3">Do I need to create an account?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                No account creation required! All tools work instantly in your browser without any registration or
                sign-up process. Simply visit the tool you need and start using it immediately.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-3">How secure are my files?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your files are completely secure. All processing happens locally in your browser - files never leave
                your device. This ensures complete privacy and security for your sensitive documents.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-3">What devices are supported?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Exact Tools works on all modern devices including Windows, Mac, Linux computers, smartphones, and
                tablets. All you need is a web browser with JavaScript enabled.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-3">Are there any file size limits?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Most tools support files up to 100MB in size. For larger files, we recommend breaking them into smaller
                chunks or using our compression tools first to reduce file size.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Still need help?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our support team is here to help you get the most out of Exact
            Tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Contact Support
            </Link>
            <Link
              href="/help/tutorials"
              className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
            >
              <Video className="w-5 h-5 mr-2" />
              Watch Tutorials
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
