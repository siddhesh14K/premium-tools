"use client"

import { useEffect } from "react"

export function Analytics() {
  useEffect(() => {
    // Google Analytics 4
    if (typeof window !== "undefined") {
      const script1 = document.createElement("script")
      script1.async = true
      script1.src = "https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
      document.head.appendChild(script1)

      const script2 = document.createElement("script")
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'GA_MEASUREMENT_ID', {
          page_title: document.title,
          page_location: window.location.href
        });
      `
      document.head.appendChild(script2)

      // Microsoft Clarity
      const clarityScript = document.createElement("script")
      clarityScript.innerHTML = `
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "CLARITY_PROJECT_ID");
      `
      document.head.appendChild(clarityScript)
    }
  }, [])

  return null
}
