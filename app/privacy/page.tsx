import type { Metadata } from "next"
import { Shield, Eye, Lock, UserCheck, FileText, Globe } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy - Exact Tools",
  description:
    "Learn how Exact Tools protects your privacy and handles your data. Comprehensive privacy policy covering data collection, usage, and your rights.",
  robots: "index, follow",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-12">
            <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-gray-600 text-lg">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Eye className="w-6 h-6 text-blue-600" />
                Information We Collect
              </h2>
              <p className="text-gray-700 mb-4">
                At Exact Tools, we are committed to protecting your privacy. We collect minimal information necessary to
                provide our services:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  <strong>Usage Data:</strong> We collect anonymous analytics data about how you use our tools to
                  improve our services.
                </li>
                <li>
                  <strong>Technical Information:</strong> Browser type, device information, and IP address for security
                  and optimization purposes.
                </li>
                <li>
                  <strong>Cookies:</strong> We use essential cookies for website functionality and analytics cookies
                  (with your consent).
                </li>
                <li>
                  <strong>Contact Information:</strong> Email address only when you voluntarily contact us through our
                  contact form.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Lock className="w-6 h-6 text-blue-600" />
                How We Protect Your Data
              </h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  <strong>Local Processing:</strong> All file processing happens locally in your browser. Your files
                  never leave your device.
                </li>
                <li>
                  <strong>No File Storage:</strong> We do not store, save, or have access to any files you process
                  through our tools.
                </li>
                <li>
                  <strong>Secure Connections:</strong> All data transmission is encrypted using HTTPS/SSL protocols.
                </li>
                <li>
                  <strong>No Third-Party Sharing:</strong> We never sell, rent, or share your personal information with
                  third parties.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <UserCheck className="w-6 h-6 text-blue-600" />
                Your Rights
              </h2>
              <p className="text-gray-700 mb-4">You have the following rights regarding your data:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  <strong>Access:</strong> Request information about data we have collected about you.
                </li>
                <li>
                  <strong>Correction:</strong> Request correction of inaccurate personal data.
                </li>
                <li>
                  <strong>Deletion:</strong> Request deletion of your personal data.
                </li>
                <li>
                  <strong>Opt-out:</strong> Opt-out of analytics tracking at any time.
                </li>
                <li>
                  <strong>Data Portability:</strong> Request a copy of your data in a portable format.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Globe className="w-6 h-6 text-blue-600" />
                Cookies and Tracking
              </h2>
              <p className="text-gray-700 mb-4">We use the following types of cookies:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  <strong>Essential Cookies:</strong> Required for website functionality (theme preferences, etc.)
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> Google Analytics to understand website usage (with your consent)
                </li>
                <li>
                  <strong>Advertising Cookies:</strong> Google AdSense for relevant advertisements (with your consent)
                </li>
              </ul>
              <p className="text-gray-700 mt-4">
                You can control cookie preferences through your browser settings or our cookie consent banner.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <FileText className="w-6 h-6 text-blue-600" />
                Third-Party Services
              </h2>
              <p className="text-gray-700 mb-4">We use the following third-party services:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  <strong>Google Analytics:</strong> For website analytics and performance monitoring
                </li>
                <li>
                  <strong>Google AdSense:</strong> For displaying relevant advertisements
                </li>
                <li>
                  <strong>Microsoft Clarity:</strong> For user experience analysis
                </li>
              </ul>
              <p className="text-gray-700 mt-4">
                These services have their own privacy policies, which we encourage you to review.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
              <p className="text-gray-700">
                We retain personal data only as long as necessary to provide our services and comply with legal
                obligations. Analytics data is automatically deleted after 26 months. Contact form submissions are
                deleted after 2 years unless ongoing correspondence is required.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
              <p className="text-gray-700">
                Our services are not directed to children under 13. We do not knowingly collect personal information
                from children under 13. If you are a parent or guardian and believe your child has provided us with
                personal information, please contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">International Users</h2>
              <p className="text-gray-700">
                If you are accessing our website from outside the United States, please be aware that your information
                may be transferred to, stored, and processed in the United States where our servers are located and our
                central database is operated.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this
                Privacy Policy periodically.
              </p>
            </section>

            <section className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <ul className="text-gray-700 space-y-2">
                <li>
                  <strong>Email:</strong> siddheshdeshmukh66@gmail.com
                </li>
                <li>
                  <strong>Website:</strong> https://exacttools.com/contact
                </li>
                <li>
                  <strong>Response Time:</strong> We respond to all privacy inquiries within 48 hours
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
