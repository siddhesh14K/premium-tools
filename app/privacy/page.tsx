const PrivacyPage = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Privacy Policy</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Introduction</h2>
        <p>
          Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your
          information when you use our website.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Information We Collect</h2>
        <p>We collect the following types of information:</p>
        <ul>
          <li>
            **Personal Information:** This includes your name, email address, and any other information you provide when
            you contact us or sign up for our newsletter.
          </li>
          <li>
            **Usage Data:** We collect information about how you use our website, such as the pages you visit and the
            links you click.
          </li>
        </ul>
        **Google Analytics**: We use Google Analytics to understand how visitors interact with our website. Google
        Analytics collects information such as:
        <ul>
          <li>Pages you visit and time spent on each page</li>
          <li>How you arrived at our site (search engines, direct links, etc.)</li>
          <li>Your general geographic location (country/city level)</li>
          <li>Device and browser information</li>
          <li>User interactions with our tools</li>
        </ul>
        <p>
          You can opt-out of Google Analytics by installing the Google Analytics Opt-out Browser Add-on or by adjusting
          your cookie preferences.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul>
          <li>Provide and improve our website.</li>
          <li>Respond to your inquiries.</li>
          <li>Send you newsletters and updates (if you have subscribed).</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Data Security</h2>
        <p>We take reasonable measures to protect your information from unauthorized access, use, or disclosure.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
          Privacy Policy on this page.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at example@example.com.</p>
      </section>
    </div>
  )
}

export default PrivacyPage
