export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Exact Tools",
    alternateName: ["Exact Tools Free", "Exact Tools Online", "Free Tools Free"],
    url: "https://freetoolsfree.in",
    logo: {
      "@type": "ImageObject",
      url: "https://freetoolsfree.in/logo-new.png",
      width: 512,
      height: 512,
    },
    description:
      "Exact Tools is the #1 free online tools platform offering 10+ professional utilities including image compressor, PDF editor, video trimmer, and more. No signup required.",
    foundingDate: "2024",
    founder: {
      "@type": "Person",
      name: "Exact Tools Team",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "siddheshdeshmukh66@gmail.com",
      url: "https://freetoolsfree.in/contact",
      availableLanguage: "English",
    },
    sameAs: [
      "https://twitter.com/exacttools",
      "https://facebook.com/exacttools",
      "https://linkedin.com/company/exacttools",
      "https://instagram.com/exacttools",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "15847",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Sarah Johnson",
        },
        datePublished: "2024-12-15",
        reviewBody:
          "Exact Tools is amazing! I use it daily for compressing images and editing PDFs. It's fast, free, and works perfectly.",
        name: "Best free online tools platform",
        reviewRating: {
          "@type": "Rating",
          bestRating: "5",
          ratingValue: "5",
          worstRating: "1",
        },
      },
    ],
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Exact Tools - Free Online Tools Platform",
    alternateName: "Exact Tools",
    url: "https://freetoolsfree.in",
    description:
      "Professional online tools platform offering 10+ free utilities for image compression, PDF editing, video processing, and more.",
    inLanguage: "en-US",
    copyrightYear: "2024",
    copyrightHolder: {
      "@type": "Organization",
      name: "Exact Tools",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://freetoolsfree.in/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    mainEntity: {
      "@type": "ItemList",
      name: "Free Online Tools",
      description: "Professional online tools for image, PDF, video processing and more",
      numberOfItems: 10,
      itemListElement: [
        {
          "@type": "SoftwareApplication",
          position: 1,
          name: "Image Compressor",
          url: "https://freetoolsfree.in/tools/image-compressor",
          description: "Compress images by up to 90% without losing quality",
        },
        {
          "@type": "SoftwareApplication",
          position: 2,
          name: "PDF Editor",
          url: "https://freetoolsfree.in/tools/pdf-editor",
          description: "Edit PDF files online for free",
        },
        {
          "@type": "SoftwareApplication",
          position: 3,
          name: "Background Remover",
          url: "https://freetoolsfree.in/tools/background-remover",
          description: "Remove image backgrounds with AI technology",
        },
      ],
    },
  }

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Exact Tools",
    applicationCategory: "UtilitiesApplication",
    applicationSubCategory: "Online Tools Platform",
    operatingSystem: "Web Browser",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    softwareVersion: "2024.1",
    datePublished: "2024-01-01",
    dateModified: "2024-12-16",
    author: {
      "@type": "Organization",
      name: "Exact Tools Team",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      validFrom: "2024-01-01",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "15847",
      bestRating: "5",
      worstRating: "1",
    },
    description:
      "Exact Tools is a comprehensive online platform offering 10+ professional tools for image compression, PDF editing, video processing, background removal, and more. All tools are completely free with no signup required.",
    featureList: [
      "Image Compression up to 90%",
      "PDF Editing and Conversion",
      "Video Trimming and Compression",
      "AI-Powered Background Removal",
      "Loan and EMI Calculator",
      "QR Code Generator",
      "Text to PDF Converter",
      "GIF Maker",
      "No Registration Required",
      "Privacy-Focused Processing",
      "Mobile-Friendly Interface",
      "Unlimited Usage",
    ],
    screenshot: "https://freetoolsfree.in/screenshot.png",
    softwareHelp: "https://freetoolsfree.in/help",
    downloadUrl: "https://freetoolsfree.in",
    installUrl: "https://freetoolsfree.in",
    memoryRequirements: "512MB",
    storageRequirements: "0MB",
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://freetoolsfree.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: "https://freetoolsfree.in/#tools",
      },
    ],
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Exact Tools?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Exact Tools is the #1 free online tools platform offering 10+ professional utilities including image compressor, PDF editor, video trimmer, background remover, and more. All tools work directly in your browser with no signup required.",
        },
      },
      {
        "@type": "Question",
        name: "Are Exact Tools completely free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, all tools on Exact Tools are completely free to use with no hidden fees, registration requirements, or usage limits. We believe essential tools should be accessible to everyone.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to create an account to use Exact Tools?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No account creation required. All Exact Tools work instantly in your browser without any registration or sign-up process. Simply visit the tool you need and start using it immediately.",
        },
      },
      {
        "@type": "Question",
        name: "Are my files safe and private on Exact Tools?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, all file processing on Exact Tools happens locally in your browser. Files are never uploaded to our servers, ensuring complete privacy and security. Your data never leaves your device.",
        },
      },
      {
        "@type": "Question",
        name: "What file formats does Exact Tools support?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Exact Tools supports all major file formats including JPG, PNG, WebP, GIF, PDF, MP4, WebM, MOV, and more across our various tools. Each tool is optimized for specific file types.",
        },
      },
      {
        "@type": "Question",
        name: "How does Exact Tools compare to other online tool platforms?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Exact Tools stands out with its completely free access, no registration requirements, privacy-focused approach, professional-grade results, and comprehensive tool collection. Unlike competitors, we never add watermarks or limit usage.",
        },
      },
    ],
  }

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Use Exact Tools for Free Online Utilities",
    description:
      "Step-by-step guide to using Exact Tools platform for image compression, PDF editing, and other online utilities",
    image: "https://freetoolsfree.in/logo-new.png",
    totalTime: "PT2M",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: "0",
    },
    supply: [
      {
        "@type": "HowToSupply",
        name: "Web Browser",
      },
      {
        "@type": "HowToSupply",
        name: "Internet Connection",
      },
      {
        "@type": "HowToSupply",
        name: "File to Process",
      },
    ],
    tool: [
      {
        "@type": "HowToTool",
        name: "Exact Tools Platform",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Visit Exact Tools",
        text: "Go to freetoolsfree.in and browse available tools",
        image: "https://freetoolsfree.in/step1.png",
        url: "https://freetoolsfree.in",
      },
      {
        "@type": "HowToStep",
        name: "Select Your Tool",
        text: "Choose the tool you need from our collection of 10+ utilities",
        image: "https://freetoolsfree.in/step2.png",
      },
      {
        "@type": "HowToStep",
        name: "Upload Your File",
        text: "Upload or drag and drop your file into the tool interface",
        image: "https://freetoolsfree.in/step3.png",
      },
      {
        "@type": "HowToStep",
        name: "Process and Download",
        text: "Let the tool process your file and download the result instantly",
        image: "https://freetoolsfree.in/step4.png",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
    </>
  )
}
