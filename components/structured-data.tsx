export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Exact Tools",
    url: "https://exacttools.com",
    logo: "https://exacttools.com/logo.png",
    description: "Professional online tools with guaranteed results. Image compressor, PDF editor, video tools & more.",
    foundingDate: "2024",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "support@exacttools.com",
      url: "https://exacttools.com/contact",
    },
    sameAs: [
      "https://twitter.com/exacttools",
      "https://facebook.com/exacttools",
      "https://linkedin.com/company/exacttools",
    ],
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Exact Tools",
    url: "https://exacttools.com",
    description: "Professional online tools with guaranteed results",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://exacttools.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  }

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Exact Tools",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "2847",
      bestRating: "5",
      worstRating: "1",
    },
    description: "Professional online tools including image compressor, PDF editor, video trimmer, and more",
    featureList: [
      "Image Compression",
      "PDF Editing",
      "Video Trimming",
      "Background Removal",
      "Loan Calculator",
      "QR Code Generator",
      "Text to PDF Converter",
      "Video Compression",
      "GIF Maker",
      "PDF Converter",
    ],
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://exacttools.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: "https://exacttools.com/tools",
      },
    ],
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Are Exact Tools completely free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, all tools on Exact Tools are completely free to use with no hidden fees, registration requirements, or usage limits.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to create an account to use the tools?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No account creation required. All tools work instantly in your browser without any registration or sign-up process.",
        },
      },
      {
        "@type": "Question",
        name: "Are my files safe and private?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, all file processing happens locally in your browser. Files are never uploaded to our servers, ensuring complete privacy and security.",
        },
      },
      {
        "@type": "Question",
        name: "What file formats are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We support all major file formats including JPG, PNG, WebP, PDF, MP4, WebM, GIF, and more across our various tools.",
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  )
}
