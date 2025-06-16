"use client"

import { useState, useEffect } from "react"
import { X, Cookie, Settings, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState({
    essential: true, // Always true, cannot be disabled
    analytics: false,
    advertising: false,
  })

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setShowBanner(true)
    } else {
      const savedPreferences = JSON.parse(consent)
      setPreferences(savedPreferences)
      loadScripts(savedPreferences)
    }
  }, [])

  const loadScripts = (prefs: typeof preferences) => {
    if (prefs.analytics) {
      // Load Google Analytics
      const script = document.createElement("script")
      script.src = "https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
      script.async = true
      document.head.appendChild(script)

      const script2 = document.createElement("script")
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'GA_MEASUREMENT_ID');
      `
      document.head.appendChild(script2)
    }

    if (prefs.advertising) {
      // Load Google AdSense
      const script = document.createElement("script")
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR-PUBLISHER-ID"
      script.async = true
      script.crossOrigin = "anonymous"
      document.head.appendChild(script)
    }
  }

  const acceptAll = () => {
    const newPreferences = {
      essential: true,
      analytics: true,
      advertising: true,
    }
    setPreferences(newPreferences)
    localStorage.setItem("cookie-consent", JSON.stringify(newPreferences))
    loadScripts(newPreferences)
    setShowBanner(false)
    setShowSettings(false)
  }

  const acceptSelected = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(preferences))
    loadScripts(preferences)
    setShowBanner(false)
    setShowSettings(false)
  }

  const rejectAll = () => {
    const newPreferences = {
      essential: true,
      analytics: false,
      advertising: false,
    }
    setPreferences(newPreferences)
    localStorage.setItem("cookie-consent", JSON.stringify(newPreferences))
    setShowBanner(false)
    setShowSettings(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="max-w-4xl mx-auto shadow-2xl border-2 border-blue-200">
        <CardContent className="p-6">
          {!showSettings ? (
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex items-center gap-3 flex-1">
                <Cookie className="w-8 h-8 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">We Value Your Privacy</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We use cookies to enhance your experience, analyze site traffic, and serve personalized
                    advertisements. By clicking "Accept All", you consent to our use of cookies. You can customize your
                    preferences or learn more in our{" "}
                    <a href="/privacy" className="text-blue-600 hover:underline font-medium">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <Button onClick={() => setShowSettings(true)} variant="outline" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Customize
                </Button>
                <Button onClick={rejectAll} variant="outline" className="text-gray-600">
                  Reject All
                </Button>
                <Button onClick={acceptAll} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Accept All
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-xl text-gray-900 flex items-center gap-2">
                  <Settings className="w-6 h-6 text-blue-600" />
                  Cookie Preferences
                </h3>
                <Button onClick={() => setShowSettings(false)} variant="ghost" size="sm">
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-900">Essential Cookies</h4>
                    <p className="text-sm text-gray-600">Required for basic website functionality</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-500">Always Active</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-900">Analytics Cookies</h4>
                    <p className="text-sm text-gray-600">Help us understand how visitors use our website</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences((prev) => ({ ...prev, analytics: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-900">Advertising Cookies</h4>
                    <p className="text-sm text-gray-600">Used to show you relevant advertisements</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.advertising}
                      onChange={(e) => setPreferences((prev) => ({ ...prev, advertising: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button onClick={acceptSelected} className="bg-blue-600 hover:bg-blue-700 text-white flex-1">
                  Save Preferences
                </Button>
                <Button onClick={acceptAll} variant="outline" className="flex-1">
                  Accept All
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
