"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Zap, Shield, Smartphone, Download, Palette, BarChart3, Clock, Users, Star, CheckCircle } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Optimized algorithms ensure your files are processed in seconds, not minutes. Experience the speed difference.",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: Shield,
    title: "100% Secure",
    description:
      "All processing happens locally in your browser. Your files never leave your device. Complete privacy guaranteed.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Smartphone,
    title: "Mobile Perfect",
    description:
      "Flawless experience on all devices with touch-friendly controls and responsive design. Work anywhere, anytime.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Download,
    title: "Instant Download",
    description:
      "Download your processed files immediately with one click. No waiting, no queues, no registration required.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Palette,
    title: "Fully Customizable",
    description:
      "Adjust settings, preview results, and fine-tune outputs to match your exact needs. Professional control.",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    icon: BarChart3,
    title: "Batch Processing",
    description:
      "Process multiple files at once to save time and boost your productivity. Handle hundreds of files effortlessly.",
    gradient: "from-teal-500 to-cyan-500",
  },
  {
    icon: Clock,
    title: "No Limits",
    description:
      "Use all tools without restrictions. No daily limits, no premium subscriptions, no hidden fees. Completely free.",
    gradient: "from-red-500 to-pink-500",
  },
  {
    icon: Users,
    title: "Trusted Worldwide",
    description:
      "Join over 2 million users who trust our tools for their daily workflow needs. Proven reliability and quality.",
    gradient: "from-orange-500 to-red-500",
  },
]

const stats = [
  { number: "2M+", label: "Happy Users", icon: Users },
  { number: "50M+", label: "Files Processed", icon: CheckCircle },
  { number: "99.9%", label: "Uptime", icon: Zap },
  { number: "4.9/5", label: "User Rating", icon: Star },
]

export function FeaturesSection() {
  return (
    <section className="py-24 px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            Why Choose Exact Tools?
          </h2>
          <p className="text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Built with cutting-edge technology to deliver the best user experience and guaranteed results.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <motion.div key={index} whileHover={{ scale: 1.05 }} className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <IconComponent className="w-8 h-8 mx-auto mb-4 text-yellow-400" />
                  <div className="text-3xl font-black mb-2">{stat.number}</div>
                  <div className="text-blue-200">{stat.label}</div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div
                      className={`mx-auto mb-4 p-4 bg-gradient-to-r ${feature.gradient} text-white rounded-2xl w-fit shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-xl font-bold text-center">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-blue-100 text-center leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
