import type { Metadata } from "next"
import { Scale, FileText, Shield, AlertTriangle, CheckCircle, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms of Service - Exact Tools",
  description:
    "Terms of Service for Exact Tools. Learn about acceptable use, user responsibilities, and service limitations.",
  robots: "index, follow",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-12">
            <Scale className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-gray-600 text-lg">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <FileText className="w-6 h-6 text-blue-600" />
                Acceptance of Terms
              </h2>
              <p className="text-gray-700">
                By accessing and using Exact Tools ("Service"), you accept and agree to be bound by the terms and
                provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-blue-600" />
                Acceptable Use
              </h2>
              <p className="text-gray-700 mb-4">
                You agree to use our service only for lawful purposes and in accordance with these Terms. You agree NOT
                to use the service:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>
                  To violate any international, federal, provincial, or state regulations, rules, laws, or local
                  ordinances
                </li>
                <li>
                  To infringe upon or violate our intellectual property rights or the intellectual property rights of
                  others
                </li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>To submit false or misleading information</li>
                <li>To upload or transmit viruses or any other type of malicious code</li>
                <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                <li>For any obscene or immoral purpose</li>
                <li>To interfere with or circumvent the security features of the Service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Shield className="w-6 h-6 text-blue-600" />
                Service Description
              </h2>
              <p className="text-gray-700 mb-4">Exact Tools provides online utilities including but not limited to:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Image compression and optimization tools</li>
                <li>PDF editing and conversion tools</li>
                <li>Video processing and editing tools</li>
                <li>Background removal tools</li>
                <li>Financial calculators</li>
                <li>QR code generators</li>
                <li>Document conversion tools</li>
              </ul>
              <p className="text-gray-700 mt-4">
                All processing is performed locally in your browser. We do not store, access, or retain any files you
                process through our tools.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Users className="w-6 h-6 text-blue-600" />
                User Responsibilities
              </h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>You are responsible for maintaining the confidentiality of any account information</li>
                <li>You are responsible for all activities that occur under your account</li>
                <li>You must not share account credentials with others</li>
                <li>You must immediately notify us of any unauthorized use of your account</li>
                <li>You are responsible for ensuring your use complies with applicable laws</li>
                <li>You must respect intellectual property rights of others</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-blue-600" />
                Disclaimers and Limitations
              </h2>
              <div className="bg-yellow-50 p-6 rounded-lg mb-4">
                <p className="text-gray-700 font-semibold mb-2">IMPORTANT DISCLAIMERS:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>The service is provided "as is" without any warranties, expressed or implied</li>
                  <li>We do not guarantee uninterrupted or error-free operation</li>
                  <li>We are not responsible for any data loss or corruption</li>
                  <li>Results may vary depending on input files and browser capabilities</li>
                  <li>We recommend backing up important files before processing</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                The Service and its original content, features, and functionality are and will remain the exclusive
                property of Exact Tools and its licensors. The Service is protected by copyright, trademark, and other
                laws.
              </p>
              <p className="text-gray-700">
                You retain all rights to files you process through our tools. We claim no ownership or rights to your
                content.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy and Data Protection</h2>
              <p className="text-gray-700">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the
                Service, to understand our practices regarding the collection and use of your information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Advertising</h2>
              <p className="text-gray-700">
                Our service is supported by advertising. By using our service, you agree to the display of
                advertisements. We use Google AdSense to serve relevant ads based on your interests and browsing
                behavior.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
              <p className="text-gray-700">
                We may terminate or suspend your access immediately, without prior notice or liability, for any reason
                whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use
                the Service will cease immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
              <p className="text-gray-700">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a
                revision is material, we will try to provide at least 30 days notice prior to any new terms taking
                effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
              <p className="text-gray-700">
                These Terms shall be interpreted and governed by the laws of the United States, without regard to its
                conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be
                considered a waiver of those rights.
              </p>
            </section>

            <section className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <ul className="text-gray-700 space-y-2">
                <li>
                  <strong>Email:</strong> siddheshdeshmukh66@gmail.com
                </li>
                <li>
                  <strong>Website:</strong> https://exacttools.com/contact
                </li>
                <li>
                  <strong>Response Time:</strong> We respond to all inquiries within 48 hours
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
