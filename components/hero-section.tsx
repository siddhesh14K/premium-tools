"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Zap, Shield, Smartphone, Star } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="absolute inset-0 bg-black/30" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative container mx-auto px-4 py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-white/80 text-sm">Trusted by 2M+ users worldwide</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Exact
            </span>
            <span className="text-yellow-400"> Tools</span>
          </h1>

          <p className="text-2xl md:text-3xl mb-6 text-blue-100 font-medium">Premium Tools That Actually Work</p>

          <p className="text-lg mb-12 text-blue-200 max-w-3xl mx-auto leading-relaxed">
            Professional-grade online tools with guaranteed results. Compress images, convert PDFs, remove backgrounds,
            calculate loans, edit videos, and more. Every tool delivers exactly what you need.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/20"
            >
              <Zap className="w-6 h-6 text-yellow-400" />
              <span className="text-white font-semibold">Lightning Fast</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/20"
            >
              <Shield className="w-6 h-6 text-green-400" />
              <span className="text-white font-semibold">100% Secure</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/20"
            >
              <Smartphone className="w-6 h-6 text-blue-400" />
              <span className="text-white font-semibold">Mobile Perfect</span>
            </motion.div>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold text-xl px-12 py-6 rounded-2xl shadow-2xl border-0 h-auto"
              onClick={() => document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" })}
            >
              Start Using Tools
              <ArrowDown className="ml-3 w-6 h-6" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
