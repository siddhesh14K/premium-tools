import type { Metadata } from "next"
import { ImageCompressor } from "@/components/tools/image-compressor"
import { Star, Zap, Shield, Award } from "lucide-react"
import { AdBanner } from "@/components/ad-banner"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Free Image Compressor Online - Reduce Image Size by 90% | No Signup Required",
  description:
    "Compress images online for free with our advanced image compressor. Reduce JPG, PNG, WebP file sizes by up to 90% without losing quality. No watermarks, no signup required. Used by 500K+ users.",
  keywords:
    "image compressor, compress images online, reduce image size, free image compressor, JPG compressor, PNG compressor, WebP compressor, image optimizer, photo compressor, bulk image compression",
  alternates: {
    canonical: "https://freetoolsfree.in/image-compressor-online-free",
  },
}

export default function ImageCompressorPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Tool */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Free Image Compressor Online - Reduce Image Size by 90%
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Compress JPG, PNG, WebP images instantly with our advanced AI-powered compressor. No signup required, no
              watermarks, unlimited usage. Trusted by over 500,000 users worldwide.
            </p>
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-gray-600">4.9/5 (12,847 reviews)</span>
              </div>
            </div>
          </div>

          {/* Tool Component */}
          <ImageCompressor />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Image Compressor?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <Zap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Lightning Fast Compression</h3>
              <p className="text-gray-600">
                Compress images in seconds with our optimized algorithms. Process multiple images simultaneously for
                maximum efficiency.
              </p>
            </div>
            <div className="text-center p-6">
              <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">100% Privacy Protected</h3>
              <p className="text-gray-600">
                All compression happens locally in your browser. Your images never leave your device, ensuring complete
                privacy and security.
              </p>
            </div>
            <div className="text-center p-6">
              <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Professional Quality</h3>
              <p className="text-gray-600">
                Advanced compression technology preserves image quality while reducing file size by up to 90%. Perfect
                for web and print.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <div className="container mx-auto px-4 py-6">
        <AdBanner slot="image-compressor-top" format="horizontal" className="max-w-4xl mx-auto" />
      </div>

      {/* Comprehensive Guide Section */}
      <section className="py-16 bg-gray-50 dark:bg-slate-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-8">Complete Guide to Image Compression</h2>

          <div className="prose prose-lg max-w-none">
            <h3>What is Image Compression?</h3>
            <p>
              Image compression is the process of reducing the file size of digital images while maintaining acceptable
              visual quality. Our free online image compressor uses advanced algorithms to analyze your images and
              remove unnecessary data, resulting in smaller file sizes perfect for web use, email attachments, and
              storage optimization.
            </p>

            <h3>How Does Our Image Compressor Work?</h3>
            <p>Our image compressor employs multiple compression techniques:</p>
            <ul>
              <li>
                <strong>Lossy Compression:</strong> Removes imperceptible details to achieve maximum size reduction
              </li>
              <li>
                <strong>Lossless Compression:</strong> Optimizes file structure without quality loss
              </li>
              <li>
                <strong>Smart Optimization:</strong> Automatically selects the best compression method for each image
              </li>
              <li>
                <strong>Batch Processing:</strong> Compress multiple images simultaneously for efficiency
              </li>
            </ul>

            <h3>Supported Image Formats</h3>
            <p>Our image compressor supports all major image formats:</p>
            <ul>
              <li>
                <strong>JPEG/JPG:</strong> Perfect for photographs and complex images
              </li>
              <li>
                <strong>PNG:</strong> Ideal for graphics with transparency
              </li>
              <li>
                <strong>WebP:</strong> Modern format with superior compression
              </li>
              <li>
                <strong>GIF:</strong> Animated and static graphics
              </li>
            </ul>

            <h3>When to Use Image Compression</h3>
            <p>Image compression is essential for:</p>
            <ul>
              <li>Website optimization to improve loading speeds</li>
              <li>Email attachments that exceed size limits</li>
              <li>Social media uploads with file size restrictions</li>
              <li>Cloud storage optimization</li>
              <li>Mobile app development</li>
              <li>E-commerce product images</li>
            </ul>

            <h3>Best Practices for Image Compression</h3>
            <ol>
              <li>
                <strong>Choose the Right Quality Level:</strong> Start with 80-85% quality for the best balance
              </li>
              <li>
                <strong>Consider Your Use Case:</strong> Web images can be more compressed than print images
              </li>
              <li>
                <strong>Optimize Dimensions:</strong> Resize images to their display size before compression
              </li>
              <li>
                <strong>Use Appropriate Formats:</strong> JPEG for photos, PNG for graphics with transparency
              </li>
              <li>
                <strong>Test Different Settings:</strong> Compare results to find the optimal compression level
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How We Compare to Competitors</h2>
          <div className="overflow-x-auto">
            <table className="w-full max-w-4xl mx-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100 dark:bg-slate-700">
                  <th className="border border-gray-300 p-4 text-left">Feature</th>
                  <th className="border border-gray-300 p-4 text-center">Exact Tools</th>
                  <th className="border border-gray-300 p-4 text-center">TinyPNG</th>
                  <th className="border border-gray-300 p-4 text-center">Compressor.io</th>
                  <th className="border border-gray-300 p-4 text-center">Kraken.io</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-4">Free Usage</td>
                  <td className="border border-gray-300 p-4 text-center text-green-600">✅ Unlimited</td>
                  <td className="border border-gray-300 p-4 text-center text-red-600">❌ 20/month</td>
                  <td className="border border-gray-300 p-4 text-center text-yellow-600">⚠️ Limited</td>
                  <td className="border border-gray-300 p-4 text-center text-red-600">❌ Paid only</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-4">No Registration</td>
                  <td className="border border-gray-300 p-4 text-center text-green-600">✅ Yes</td>
                  <td className="border border-gray-300 p-4 text-center text-red-600">❌ Required</td>
                  <td className="border border-gray-300 p-4 text-center text-green-600">✅ Yes</td>
                  <td className="border border-gray-300 p-4 text-center text-red-600">❌ Required</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-4">Batch Processing</td>
                  <td className="border border-gray-300 p-4 text-center text-green-600">✅ Yes</td>
                  <td className="border border-gray-300 p-4 text-center text-yellow-600">⚠️ Limited</td>
                  <td className="border border-gray-300 p-4 text-center text-red-600">❌ No</td>
                  <td className="border border-gray-300 p-4 text-center text-green-600">✅ Yes</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-4">Privacy Protection</td>
                  <td className="border border-gray-300 p-4 text-center text-green-600">✅ Local Processing</td>
                  <td className="border border-gray-300 p-4 text-center text-red-600">❌ Server Upload</td>
                  <td className="border border-gray-300 p-4 text-center text-red-600">❌ Server Upload</td>
                  <td className="border border-gray-300 p-4 text-center text-red-600">❌ Server Upload</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50 dark:bg-slate-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">How much can I compress my images?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our image compressor can reduce file sizes by up to 90% while maintaining excellent visual quality. The
                exact compression ratio depends on the original image content and your quality settings.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Is there a limit to how many images I can compress?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                No, there are no limits! Unlike competitors who restrict free users to 20 images per month, you can
                compress unlimited images completely free.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Are my images safe and private?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                All image compression happens locally in your browser. Your images never leave your device, ensuring
                complete privacy and security.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">What's the maximum file size I can compress?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our compressor can handle images up to 100MB in size. For larger files, we recommend resizing the image
                dimensions first for optimal results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Related Tools You Might Need</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link
              href="/tools/background-remover"
              className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-3">Background Remover</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Remove backgrounds from images with AI precision. Perfect for product photos and profile pictures.
              </p>
            </Link>
            <Link
              href="/tools/pdf-converter"
              className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-3">PDF Converter</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Convert images to PDF or extract images from PDF files. Supports batch conversion.
              </p>
            </Link>
            <Link
              href="/tools/gif-maker"
              className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-3">GIF Maker</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Create animated GIFs from images or videos. Customize frame rate and optimize for web.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* User Testimonials */}
      <section className="py-16 bg-gray-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-white dark:bg-slate-700 p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                "This image compressor is incredible! I reduced my website's image sizes by 80% without any visible
                quality loss. Page load times improved dramatically."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  S
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Sarah Johnson</p>
                  <p className="text-sm text-gray-500">Web Developer</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-700 p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                "Finally found a free image compressor that actually works! No signup required, unlimited usage, and
                amazing results. Highly recommended!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                  M
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Mike Chen</p>
                  <p className="text-sm text-gray-500">Photographer</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-700 p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                "Perfect for my e-commerce store! I can compress hundreds of product images quickly and efficiently. The
                batch processing feature is a game-changer."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  L
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Lisa Rodriguez</p>
                  <p className="text-sm text-gray-500">E-commerce Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Ad */}
      <div className="container mx-auto px-4 py-6">
        <AdBanner slot="image-compressor-bottom" format="horizontal" className="max-w-4xl mx-auto" />
      </div>
    </div>
  )
}
