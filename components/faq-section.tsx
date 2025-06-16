"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "Are Exact Tools completely free to use?",
    answer:
      "Yes, all tools on Exact Tools are completely free to use with no hidden fees, registration requirements, or usage limits. We believe in providing professional-grade tools accessible to everyone.",
  },
  {
    question: "Do I need to create an account to use the tools?",
    answer:
      "No account creation required. All tools work instantly in your browser without any registration or sign-up process. Simply visit the tool page and start using it immediately.",
  },
  {
    question: "Are my files safe and private?",
    answer:
      "Yes, all file processing happens locally in your browser. Files are never uploaded to our servers, ensuring complete privacy and security. Your data stays on your device at all times.",
  },
  {
    question: "What file formats are supported?",
    answer:
      "We support all major file formats including JPG, PNG, WebP, GIF for images; PDF for documents; MP4, WebM, MOV for videos; and many more across our various tools.",
  },
  {
    question: "Is there a file size limit?",
    answer:
      "Our tools can handle large files up to 2GB for most operations. For video processing, we support files up to 5GB to accommodate professional content creation needs.",
  },
  {
    question: "Do the tools work on mobile devices?",
    answer:
      "Yes, all tools are fully responsive and work perfectly on mobile devices, tablets, and desktops. The interface adapts to your screen size for optimal usability.",
  },
  {
    question: "How accurate are the compression and editing results?",
    answer:
      "Our tools use professional-grade algorithms to ensure high-quality results. Image compression maintains visual quality while reducing file size, and all editing tools provide pixel-perfect accuracy.",
  },
  {
    question: "Can I use these tools for commercial purposes?",
    answer:
      "Yes, you can use all tools for both personal and commercial purposes without any restrictions. There are no licensing fees or usage limitations for business use.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need to know about Exact Tools and how our premium online tools work.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-gray-600 dark:text-gray-300 leading-relaxed">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-300 mb-4">Still have questions? We're here to help!</p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  )
}
