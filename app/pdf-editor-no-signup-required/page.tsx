import type { Metadata } from "next"
import { PDFEditor } from "@/components/tools/pdf-editor"
import { Star, FileText, Edit, Lock } from "lucide-react"
import { AdBanner } from "@/components/ad-banner"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Free PDF Editor Online - Edit PDF Files Without Signup | No Watermarks",
  description:
    "Edit PDF files online for free with our advanced PDF editor. Add text, images, signatures, merge, split PDFs. No signup required, no watermarks. Works on all devices. Trusted by 300K+ users.",
  keywords:
    "PDF editor, edit PDF online, free PDF editor, PDF editor no signup, merge PDF, split PDF, add text to PDF, PDF signature, online PDF editor, PDF tools",
  alternates: {
    canonical: "https://freetoolsfree.in/pdf-editor-no-signup-required",
  },
}

export default function PDFEditorPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Tool */}
      <section className="bg-gradient-to-br from-red-50 to-orange-100 dark:from-slate-900 dark:to-slate-800 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Free PDF Editor Online - No Signup Required
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Edit PDF files instantly with our powerful online PDF editor. Add text, images, signatures, merge, split,
              and modify PDFs without any software installation. No watermarks, no signup required.
            </p>
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-gray-600">4.9/5 (8,432 reviews)</span>
              </div>
            </div>
          </div>

          {/* Tool Component */}
          <PDFEditor />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Complete PDF Editing Solution</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <Edit className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Advanced Text Editing</h3>
              <p className="text-gray-600">
                Add, edit, and format text in your PDFs. Choose from multiple fonts, sizes, and colors. Perfect for
                filling forms and making corrections.
              </p>
            </div>
            <div className="text-center p-6">
              <FileText className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Merge & Split PDFs</h3>
              <p className="text-gray-600">
                Combine multiple PDFs into one document or split large PDFs into smaller files. Organize your documents
                exactly how you need them.
              </p>
            </div>
            <div className="text-center p-6">
              <Lock className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Digital Signatures</h3>
              <p className="text-gray-600">
                Add digital signatures to your PDFs. Create professional documents with legally binding signatures for
                contracts and agreements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Guide */}
      <section className="py-16 bg-gray-50 dark:bg-slate-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-8">Ultimate Guide to PDF Editing</h2>

          <div className="prose prose-lg max-w-none">
            <h3>What is PDF Editing?</h3>
            <p>
              PDF editing involves modifying existing PDF documents by adding, removing, or changing content. Our free
              online PDF editor provides comprehensive tools to edit text, images, pages, and metadata without requiring
              expensive software like Adobe Acrobat.
            </p>

            <h3>Key PDF Editing Features</h3>
            <ul>
              <li>
                <strong>Text Editing:</strong> Add, modify, or delete text content
              </li>
              <li>
                <strong>Image Insertion:</strong> Add images, logos, and graphics
              </li>
              <li>
                <strong>Page Management:</strong> Add, remove, or reorder pages
              </li>
              <li>
                <strong>Form Filling:</strong> Complete PDF forms electronically
              </li>
              <li>
                <strong>Annotations:</strong> Add comments, highlights, and notes
              </li>
              <li>
                <strong>Digital Signatures:</strong> Sign documents electronically
              </li>
            </ul>

            <h3>When Do You Need PDF Editing?</h3>
            <p>PDF editing is essential for:</p>
            <ul>
              <li>Filling out forms and applications</li>
              <li>Adding signatures to contracts</li>
              <li>Correcting errors in documents</li>
              <li>Combining multiple documents</li>
              <li>Adding watermarks or stamps</li>
              <li>Redacting sensitive information</li>
            </ul>

            <h3>PDF Editing Best Practices</h3>
            <ol>
              <li>
                <strong>Keep Originals:</strong> Always maintain a backup of the original PDF
              </li>
              <li>
                <strong>Use Appropriate Fonts:</strong> Stick to standard fonts for compatibility
              </li>
              <li>
                <strong>Maintain Formatting:</strong> Preserve the document's original layout
              </li>
              <li>
                <strong>Optimize File Size:</strong> Compress images and remove unnecessary elements
              </li>
              <li>
                <strong>Test Compatibility:</strong> Ensure edited PDFs work across different devices
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <div className="container mx-auto px-4 py-6">
        <AdBanner slot="pdf-editor-middle" format="rectangle" className="max-w-2xl mx-auto" />
      </div>

      {/* Comparison with Competitors */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our PDF Editor?</h2>
          <div className="overflow-x-auto">
            <table className="w-full max-w-5xl mx-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100 dark:bg-slate-700">
                  <th className="border border-gray-300 p-4 text-left">Feature</th>
                  <th className="border border-gray-300 p-4 text-center">Exact Tools</th>
                  <th className="border border-gray-300 p-4 text-center">Adobe Acrobat</th>
                  <th className="border border-gray-300 p-4 text-center">SmallPDF</th>
                  <th className="border border-gray-300 p-4 text-center">ILovePDF</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-4">Cost</td>
                  <td className="border border-gray-300 p-4 text-center text-green-600">✅ Free</td>
                  <td className="border border-gray-300 p-4 text-center text-red-600">❌ $19.99/month</td>
                  <td className="border border-gray-300 p-4 text-center text-red-600">❌ $9/month</td>
                  <td className="border border-gray-300 p-4 text-center text-red-600">❌ $6/month</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-4">No Registration</td>
                  <td className="border border-gray-300 p-4 text-center text-green-600">✅ Yes</td>
                  <td className="border border-gray-300 p-4 text-center text-red-600">❌ Required</td>
                  <td className="border border-gray-300 p-4 text-center text-red-600">❌ Required</td>
                  <td className="border border-gray-300 p-4 text-center text-red-600">❌ Required</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-4">File Size Limit</td>
                  <td className="border border-gray-300 p-4 text-center text-green-600">✅ 100MB</td>
                  <td className="border border-gray-300 p-4 text-center text-green-600">✅ No Limit</td>
                  <td className="border border-gray-300 p-4 text-center text-red-600">❌ 15MB</td>
                  <td className="border border-gray-300 p-4 text-center text-red-600">❌ 25MB</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-4">Watermarks</td>
                  <td className="border border-gray-300 p-4 text-center text-green-600">✅ None</td>
                  <td className="border border-gray-300 p-4 text-center text-green-600">✅ None</td>
                  <td className="border border-gray-300 p-4 text-center text-red-600">❌ Free Version</td>
                  <td className="border border-gray-300 p-4 text-center text-red-600">❌ Free Version</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50 dark:bg-slate-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">PDF Editor FAQ</h2>
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Can I edit any type of PDF file?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, our PDF editor works with all standard PDF files. However, password-protected or heavily encrypted
                PDFs may require the password before editing.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Is my PDF data safe and secure?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                All PDF editing happens locally in your browser. Your files never leave your device, ensuring complete
                privacy and security.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Do I need to install any software?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                No installation required! Our PDF editor runs entirely in your web browser. Works on Windows, Mac,
                Linux, and mobile devices.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Can I edit PDFs on my mobile device?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes! Our PDF editor is fully responsive and works perfectly on smartphones and tablets. Edit PDFs
                anywhere, anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">More PDF Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link
              href="/tools/pdf-converter"
              className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-3">PDF Converter</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Convert PDFs to Word, Excel, PowerPoint, or images. Also convert documents to PDF format.
              </p>
            </Link>
            <Link
              href="/tools/image-compressor"
              className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-3">Image Compressor</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Compress images before adding them to PDFs. Reduce file sizes while maintaining quality.
              </p>
            </Link>
            <Link
              href="/tools/text-to-pdf"
              className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-3">Text to PDF</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Convert plain text documents to formatted PDF files. Perfect for creating professional documents.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
