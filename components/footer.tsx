import Link from "next/link"
import { Zap, Github, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 font-black text-2xl mb-6">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl shadow-lg">
                <Zap className="w-6 h-6" />
              </div>
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Exact Tools
              </span>
            </Link>
            <p className="text-blue-100 text-lg leading-relaxed mb-6 max-w-md">
              Professional online tools that actually work. Trusted by over 2 million users worldwide for reliable,
              fast, and accurate results. Every tool is designed with precision and tested for perfection.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Github className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-6 text-yellow-400">Popular Tools</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/tools/image-compressor"
                  className="text-blue-100 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                  Image Compressor
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/pdf-converter"
                  className="text-blue-100 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                  PDF Converter
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/background-remover"
                  className="text-blue-100 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                  Background Remover
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/loan-calculator"
                  className="text-blue-100 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                  Loan Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/qr-generator"
                  className="text-blue-100 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                  QR Generator
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-6 text-yellow-400">More Tools</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/tools/video-trimmer"
                  className="text-blue-100 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                  Video Trimmer
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/gif-maker"
                  className="text-blue-100 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                  GIF Maker
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/text-to-pdf"
                  className="text-blue-100 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                  Text to PDF
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/video-compressor"
                  className="text-blue-100 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                  Video Compressor
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row items-center gap-6 text-blue-100">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>contact@exacttools.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex gap-6 text-sm">
                <Link href="/privacy" className="text-blue-100 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-blue-100 hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link href="/sitemap" className="text-blue-100 hover:text-white transition-colors">
                  Sitemap
                </Link>
              </div>
              <p className="text-blue-200 text-sm">© {new Date().getFullYear()} Exact Tools. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
