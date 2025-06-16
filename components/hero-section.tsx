"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Zap, Shield, Smartphone } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-3 sm:px-4 py-12 sm:py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              Professional Tools
            </span>
            <br />
            <span className="text-blue-600 dark:text-blue-400">Made Simple</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Fast, reliable, and completely free online tools. Get professional results in seconds.
          </p>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
            <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 border border-gray-200 dark:border-slate-700">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Lightning Fast</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 border border-gray-200 dark:border-slate-700">
              <Shield className="w-4 h-4 text-green-500" />
              <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">100% Secure</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 border border-gray-200 dark:border-slate-700">
              <Smartphone className="w-4 h-4 text-blue-500" />
              <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Mobile Perfect</span>
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg border-0 h-auto"
              onClick={() => document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" })}
            >
              Explore Tools
              <ArrowDown className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
