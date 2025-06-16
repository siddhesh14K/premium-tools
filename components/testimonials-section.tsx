"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Graphic Designer",
    company: "Design Agency",
    content:
      "The image compressor efficiently reduces file sizes, which is crucial for optimizing website loading times and improving user experience.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Michael Chen",
    role: "Marketing Manager",
    company: "Marketing Firm",
    content:
      "The QR code generator allows for creating customized QR codes, which are essential for tracking campaign performance and engaging with customers.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Emily Rodriguez",
    role: "Financial Advisor",
    company: "Financial Services",
    content:
      "The loan calculator provides accurate calculations and visual charts, which are valuable for explaining financial concepts to clients and making informed decisions.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "David Thompson",
    role: "Content Creator",
    company: "Online Media",
    content:
      "The video trimmer and background remover are useful for quickly editing videos and creating engaging content for various platforms.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Lisa Park",
    role: "Small Business Owner",
    company: "Local Business",
    content:
      "The PDF converter and text-to-PDF tools simplify document management and ensure consistent formatting for business communications.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "James Wilson",
    role: "Real Estate Agent",
    company: "Real Estate Agency",
    content:
      "These tools streamline property document handling, image optimization for listings, and the creation of professional PDFs for clients.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
            User Experience Stories
          </h2>
          <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Discover how our tools help users accomplish their tasks efficiently and effectively.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Card className="h-full shadow-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-3xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Quote className="w-8 h-8 text-blue-500 mr-3" />
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed text-lg">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 border-2 border-blue-200"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
