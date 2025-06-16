import type { Metadata } from "next"
import { CheckCircle, X, Star, Users, Shield, Zap } from "lucide-react"
import { AdBanner } from "@/components/ad-banner"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Exact Tools vs SmallPDF - Complete Comparison 2024 | Which is Better?",
  description:
    "Detailed comparison between Exact Tools and SmallPDF. Compare features, pricing, limitations, and user reviews. See why Exact Tools is the better free alternative to SmallPDF.",
  keywords:
    "exact tools vs smallpdf, smallpdf alternative, free pdf tools, exact tools comparison, smallpdf vs exact tools, best pdf editor",
}

export default function ExactToolsVsSmallPDF() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Exact Tools vs SmallPDF: Complete Comparison 2024</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Discover why Exact Tools is the superior free alternative to SmallPDF. Compare features, pricing,
            limitations, and user satisfaction in our comprehensive analysis.
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2">Exact Tools: 4.9/5</span>
            </div>
            <span className="text-gray-300">vs</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <Star className="w-5 h-5 text-gray-400" />
              <span className="ml-2">SmallPDF: 4.2/5</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Comparison */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">At a Glance Comparison</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Exact Tools */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border-2 border-green-500">
              <div className="text-center mb-6">
                <img src="/logo-new.png" alt="Exact Tools" className="h-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-600">Exact Tools</h3>
                <p className="text-gray-600 dark:text-gray-300">The Free Choice</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>100% Free Forever</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>No Registration Required</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Unlimited Usage</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>No Watermarks</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Privacy-First (Local Processing)</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>10+ Professional Tools</span>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Link
                  href="/"
                  className="inline-block bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                >
                  Try Exact Tools Free
                </Link>
              </div>
            </div>

            {/* SmallPDF */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl">
              <div className="text-center mb-6">
                <div className="h-16 bg-red-500 rounded-lg flex items-center justify-center mx-auto mb-4 w-16">
                  <span className="text-white font-bold">S</span>
                </div>
                <h3 className="text-2xl font-bold text-red-600">SmallPDF</h3>
                <p className="text-gray-600 dark:text-gray-300">The Premium Option</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <X className="w-5 h-5 text-red-500" />
                  <span>$9/month for Pro</span>
                </div>
                <div className="flex items-center gap-3">
                  <X className="w-5 h-5 text-red-500" />
                  <span>Registration Required</span>
                </div>
                <div className="flex items-center gap-3">
                  <X className="w-5 h-5 text-red-500" />
                  <span>Limited Free Usage</span>
                </div>
                <div className="flex items-center gap-3">
                  <X className="w-5 h-5 text-red-500" />
                  <span>Watermarks on Free Plan</span>
                </div>
                <div className="flex items-center gap-3">
                  <X className="w-5 h-5 text-red-500" />
                  <span>Files Uploaded to Servers</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>20+ Tools Available</span>
                </div>
              </div>

              <div className="mt-8 text-center">
                <div className="text-gray-500 text-sm">Starting at $9/month</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Comparison Table */}
      <section className="py-16 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Detailed Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full max-w-6xl mx-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100 dark:bg-slate-700">
                  <th className="border border-gray-300 p-4 text-left">Feature</th>
                  <th className="border border-gray-300 p-4 text-center">Exact Tools</th>
                  <th className="border border-gray-300 p-4 text-center">SmallPDF Free</th>
                  <th className="border border-gray-300 p-4 text-center">SmallPDF Pro</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-4 font-semibold">Pricing</td>
                  <td className="border border-gray-300 p-4 text-center text-green-600">✅ Free</td>
                  <td className="border border-gray-300 p-4 text-center text-yellow-600">⚠️ Limited Free</td>
                  <td className="border border-gray-300 p-4 text-center text-red-600">❌ $9/month</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-4 font-semibold">Registration Required</td>
                  <td className="border border-gray-300 p-4 text-center text-green-600">✅ No</td>
                  <td className="border border-gray-300 p-4 text-center text-red-600">❌ Yes</td>
                  <td className="border border-gray-300 p-4 text-center text-red-600">❌ Yes</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-4 font-semibold">File Size Limit</td>
                  <td className="border border-gray-300 p-4 text-center text-green-600">✅ 100MB</td>
                  <td className="border border-gray-300 p-4 text-center text-red-600">❌ 5MB</td>
                  <td className="border border-gray-300 p-4 text-center text-yellow-600">⚠️ 15MB</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-4 font-semibold">Daily Usage Limit</td>
                  <td className="border border-gray-300 p-4 text-center text-green-600">✅ Unlimited</td>
                  <td className="border border-gray-300 p-4 text-center text-red-600">❌ 2 tasks/day</td>
                  <td className="border border-gray-300 p-4 text-center text-green-600">✅ Unlimited</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-4 font-semibold">Watermarks</td>
                  <td className="border border-gray-300 p-4 text-center text-green-600">✅ None</td>
                  <td className="border border-gray-300 p-4 text-center text-red-600">❌ Yes</td>
                  <td className="border border-gray-300 p-4 text-center text-green-600">✅ None</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-4 font-semibold">Privacy Protection</td>
                  <td className="border border-gray-300 p-4 text-center text-green-600">✅ Local Processing</td>
                  <td className="border border-gray-300 p-4 text-center text-red-600">❌ Server Upload</td>
                  <td className="border border-gray-300 p-4 text-center text-red-600">❌ Server Upload</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-4 font-semibold">Batch Processing</td>
                  <td className="border border-gray-300 p-4 text-center text-green-600">✅ Yes</td>
                  <td className="border border-gray-300 p-4 text-center text-red-600">❌ No</td>
                  <td className="border border-gray-300 p-4 text-center text-green-600">✅ Yes</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-4 font-semibold">Mobile Support</td>
                  <td className="border border-gray-300 p-4 text-center text-green-600">✅ Full Support</td>
                  <td className="border border-gray-300 p-4 text-center text-yellow-600">⚠️ Limited</td>
                  <td className="border border-gray-300 p-4 text-center text-green-600">✅ Full Support</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-4 font-semibold">Customer Support</td>
                  <td className="border border-gray-300 p-4 text-center text-green-600">✅ Free Support</td>
                  <td className="border border-gray-300 p-4 text-center text-red-600">❌ Limited</td>
                  <td className="border border-gray-300 p-4 text-center text-green-600">✅ Priority Support</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <div className="container mx-auto px-4 py-6">
        <AdBanner slot="comparison-middle" format="horizontal" className="max-w-4xl mx-auto" />
      </div>

      {/* User Reviews Comparison */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Users Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Exact Tools Reviews */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-green-600">Exact Tools Reviews</h3>
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                  <div className="flex items-center mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    "Finally found a truly free PDF editor! No hidden costs, no watermarks, and it works perfectly. Much
                    better than SmallPDF's limited free version."
                  </p>
                  <p className="text-sm text-gray-500">- Jennifer M., Marketing Manager</p>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                  <div className="flex items-center mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    "Love that I don't need to create an account or worry about my files being uploaded anywhere.
                    Privacy-first approach is exactly what I needed."
                  </p>
                  <p className="text-sm text-gray-500">- David K., Freelancer</p>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                  <div className="flex items-center mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    "Switched from SmallPDF after hitting their daily limits. Exact Tools has no restrictions and works
                    just as well, if not better!"
                  </p>
                  <p className="text-sm text-gray-500">- Sarah L., Student</p>
                </div>
              </div>
            </div>

            {/* SmallPDF Reviews */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-red-600">SmallPDF Reviews</h3>
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                  <div className="flex items-center mb-3">
                    {[1, 2, 3].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    {[4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 text-gray-300" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    "The free version is too limited. Only 2 tasks per day and watermarks on everything. Had to upgrade
                    to Pro which is expensive for what it offers."
                  </p>
                  <p className="text-sm text-gray-500">- Michael R., Small Business Owner</p>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                  <div className="flex items-center mb-3">
                    {[1, 2, 3, 4].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <Star className="w-4 h-4 text-gray-300" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    "Good tools but the pricing is steep. $9/month adds up quickly. Also concerned about uploading
                    sensitive documents to their servers."
                  </p>
                  <p className="text-sm text-gray-500">- Lisa T., Legal Assistant</p>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                  <div className="flex items-center mb-3">
                    {[1, 2, 3].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    {[4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 text-gray-300" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    "Frustrated with the daily limits. Right when I need to process multiple files, I hit the limit.
                    Looking for alternatives."
                  </p>
                  <p className="text-sm text-gray-500">- Robert H., Consultant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Analysis */}
      <section className="py-16 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Cost Analysis: 1 Year Comparison</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-green-50 dark:bg-green-900/20 p-8 rounded-2xl text-center border-2 border-green-500">
              <h3 className="text-2xl font-bold text-green-600 mb-4">Exact Tools</h3>
              <div className="text-4xl font-bold text-green-600 mb-2">$0</div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Forever Free</p>
              <ul className="text-left space-y-2 text-sm">
                <li>✅ All features included</li>
                <li>✅ Unlimited usage</li>
                <li>✅ No watermarks</li>
                <li>✅ Privacy protected</li>
              </ul>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-8 rounded-2xl text-center">
              <h3 className="text-2xl font-bold text-yellow-600 mb-4">SmallPDF Free</h3>
              <div className="text-4xl font-bold text-yellow-600 mb-2">$0</div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">With Limitations</p>
              <ul className="text-left space-y-2 text-sm">
                <li>❌ 2 tasks per day only</li>
                <li>❌ Watermarks added</li>
                <li>❌ 5MB file limit</li>
                <li>❌ No batch processing</li>
              </ul>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 p-8 rounded-2xl text-center">
              <h3 className="text-2xl font-bold text-red-600 mb-4">SmallPDF Pro</h3>
              <div className="text-4xl font-bold text-red-600 mb-2">$108</div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Per Year</p>
              <ul className="text-left space-y-2 text-sm">
                <li>✅ Unlimited usage</li>
                <li>✅ No watermarks</li>
                <li>⚠️ 15MB file limit</li>
                <li>❌ Files uploaded to servers</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-xl font-semibold text-green-600">Save $108+ per year by choosing Exact Tools!</p>
          </div>
        </div>
      </section>

      {/* Final Verdict */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">The Verdict: Why Exact Tools Wins</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Better Value</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Get all premium features for free, saving you $108+ per year compared to SmallPDF Pro.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Better Privacy</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Local processing means your files never leave your device, unlike SmallPDF's server uploads.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                <Zap className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Better Experience</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  No registration, no limits, no watermarks. Just pure functionality when you need it.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold mb-4">Ready to Make the Switch?</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Join over 500,000 users who've already discovered the better way to work with PDFs and other documents.
              </p>
              <Link
                href="/"
                className="inline-block bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-700 transition-colors"
              >
                Try Exact Tools Free Now
              </Link>
              <p className="text-sm text-gray-500 mt-3">No signup required • Start using immediately</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
