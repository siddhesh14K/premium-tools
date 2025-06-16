"use client"

export default function TestGAPageClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Google Analytics Test Page</h1>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-green-800 mb-4">
              ✅ If you can see this page, your website is deployed!
            </h2>
            <p className="text-green-700">
              This means Google Analytics should be working. Check your browser's developer console (F12) for any
              errors.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">🔍 How to verify Google Analytics:</h3>
            <ol className="text-left text-blue-700 space-y-2">
              <li>1. Open your browser's developer tools (Press F12)</li>
              <li>2. Go to the "Network" tab</li>
              <li>3. Refresh this page</li>
              <li>4. Look for requests to "googletagmanager.com" or "google-analytics.com"</li>
              <li>5. If you see these requests, Google Analytics is working!</li>
            </ol>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3">⏱️ Real-time verification:</h3>
            <p className="text-yellow-700">
              Go to Google Analytics → Reports → Realtime, then visit this page. You should see yourself as an active
              user!
            </p>
          </div>

          <div className="mt-8">
            <button
              onClick={() => {
                if (typeof window !== "undefined" && typeof window.gtag === "function") {
                  window.gtag("event", "test_button_click", {
                    event_category: "engagement",
                    event_label: "GA Test Page",
                  })
                  alert("Test event sent to Google Analytics!")
                } else {
                  alert("Google Analytics not detected. Check console for errors.")
                }
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              🧪 Test GA Event
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
