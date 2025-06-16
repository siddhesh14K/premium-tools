"use client"

import { motion } from "framer-motion"
import { Zap, Shield, Smartphone, Globe, Award, CheckCircle, TrendingUp, Target } from "lucide-react"

const benefits = [
  {
    icon: Zap,
    title: "Lightning Fast Processing",
    description: "Advanced algorithms ensure your files are processed instantly with optimal performance.",
  },
  {
    icon: Shield,
    title: "100% Privacy Protected",
    description: "All processing happens locally in your browser. Your files never leave your device.",
  },
  {
    icon: Smartphone,
    title: "Works on All Devices",
    description: "Fully responsive design that works perfectly on desktop, tablet, and mobile devices.",
  },
  {
    icon: Globe,
    title: "Always Available",
    description: "24/7 access to all tools with 99.9% uptime. No maintenance interruptions.",
  },
  {
    icon: Award,
    title: "Professional Quality",
    description: "Enterprise-grade tools with guaranteed results and pixel-perfect accuracy.",
  },
  {
    icon: Target,
    title: "Purpose-Built Tools",
    description: "Each tool is specifically designed and optimized for maximum efficiency and results.",
  },
]

const features = [
  "10+ Professional Tools",
  "Real-time Processing",
  "No File Size Limits",
  "Batch Processing",
  "Multiple Format Support",
  "Mobile Optimized",
]

export function SEOSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Main Content */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Why Choose Exact Tools?
          </motion.h2>
          <motion.p
            className="text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            The most comprehensive collection of professional online tools. Everything you need for image processing,
            document conversion, video editing, and calculations - all in one place.
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
              <span className="text-sm font-medium">{feature}</span>
            </div>
          ))}
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/15 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ scale: 1.05 }}
            >
              <benefit.icon className="w-12 h-12 text-yellow-300 mb-4" />
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-blue-100 leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Use Cases */}
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Perfect For Every Need</h3>
            <p className="text-blue-100 text-lg">From professionals to students, our tools serve everyone</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-3">For Professionals</h4>
              <p className="text-blue-100">
                Streamline your workflow with professional-grade tools that deliver consistent, high-quality results for
                business presentations, marketing materials, and client work.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-green-400 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-3">For Students</h4>
              <p className="text-blue-100">
                Complete assignments faster with our PDF converters, calculators, and image processing tools. Perfect
                for research papers, presentations, and project submissions.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-400 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-3">For Everyone</h4>
              <p className="text-blue-100">
                Easy-to-use tools that work perfectly on any device, anytime, anywhere. No technical knowledge required
                - just upload, process, and download.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-blue-100 mb-6">Experience the power of professional online tools</p>
          <a
            href="#tools"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors text-lg"
          >
            Explore All Tools
          </a>
        </motion.div>
      </div>
    </section>
  )
}
