"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-slate-800">
      <div className="container mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center group">
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <img src="/logo.png" alt="Exact Tools" className="h-8 sm:h-10 w-auto object-contain" />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/#tools"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
          >
            Tools
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
          >
            About
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-8 w-8 sm:h-9 sm:w-9"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-gray-100 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl"
          >
            <nav className="container mx-auto px-3 py-4 space-y-2">
              <Link
                href="/"
                className="block px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/#tools"
                className="block px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                All Tools
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
