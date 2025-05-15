import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="prose prose-amber max-w-none">
        <p>
          At Redeemed Creative Arts, we respect your privacy and are committed to protecting your personal data. This
          Privacy Policy explains how we collect, use, and safeguard your information when you use our platform.
        </p>

        <h2>1. Information We Collect</h2>
        <h3>1.1 Personal Information</h3>
        <p>We may collect personal information that you provide directly to us, such as:</p>
        <ul>
          <li>Name, email address, and contact information</li>
          <li>Account credentials</li>
          <li>Profile information (biography, location, etc.)</li>
          <li>Payment information (processed securely through third-party payment processors)</li>
          <li>Content you upload (artwork, descriptions, comments, etc.)</li>
          <li>Communications with us or other users</li>
        </ul>

        <h3>1.2 Automatically Collected Information</h3>
        <p>When you use our Platform, we may automatically collect certain information, including:</p>
        <ul>
          <li>Device information (IP address, browser type, operating system)</li>
          <li>Usage data (pages visited, time spent, clicks)</li>
          <li>Location information</li>
          <li>Cookies and similar tracking technologies</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect for various purposes, including:</p>
        <ul>
          <li>Providing, maintaining, and improving the Platform</li>
          <li>Processing transactions and managing accounts</li>
          <li>Communicating with you about the Platform</li>
          <li>Personalizing your experience</li>
          <li>Analyzing usage patterns and trends</li>
          <li>Protecting the security and integrity of the Platform</li>
          <li>Complying with legal obligations</li>
        </ul>

        <h2>3. Sharing Your Information</h2>
        <p>We may share your information in the following circumstances:</p>
        <ul>
          <li>With other users as part of the Platform's functionality (e.g., public profiles, artwork sharing)</li>
          <li>With service providers who perform services on our behalf</li>
          <li>With legal authorities when required by law</li>
          <li>In connection with a business transaction (e.g., merger, acquisition)</li>
          <li>With your consent or at your direction</li>
        </ul>

        <h2>4. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal information from
          unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the
          Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
        </p>

        <h2>5. Your Rights and Choices</h2>
        <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
        <ul>
          <li>Accessing, correcting, or deleting your personal information</li>
          <li>Withdrawing consent</li>
          <li>Objecting to or restricting certain processing</li>
          <li>Data portability</li>
          <li>Opting out of marketing communications</li>
        </ul>
        <p>To exercise these rights, please contact us using the information provided at the end of this policy.</p>

        <h2>6. Cookies and Tracking Technologies</h2>
        <p>
          We use cookies and similar tracking technologies to collect information about your browsing activities and to
          improve your experience on our Platform. You can manage your cookie preferences through your browser settings.
        </p>

        <h2>7. Children's Privacy</h2>
        <p>
          Our Platform is not intended for children under the age of 13. We do not knowingly collect personal
          information from children under 13. If you believe we have collected information from a child under 13, please
          contact us immediately.
        </p>

        <h2>8. International Data Transfers</h2>
        <p>
          Your information may be transferred to and processed in countries other than the country in which you reside.
          These countries may have different data protection laws. We will take appropriate measures to ensure that your
          personal information remains protected in accordance with this Privacy Policy.
        </p>

        <h2>9. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. If we make material changes, we will notify you by
          updating the date at the top of this policy and, in some cases, by providing additional notice (such as adding
          a statement to our website or sending you a notification).
        </p>

        <h2>10. Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
        </p>
        <p>
          Email: privacy@redeemedcreativearts.com
          <br />
          Address: 123 Faith Avenue, Creative City, CA 12345
        </p>
      </div>

      <div className="mt-12 text-center">
        <Link href="/terms" className="text-amber-600 hover:underline">
          View Terms of Service
        </Link>
        {" | "}
        <Link href="/helper-agreement" className="text-amber-600 hover:underline">
          View Helper Agreement
        </Link>
        {" | "}
        <Link href="/artist-disclaimer" className="text-amber-600 hover:underline">
          View Artist Disclaimer
        </Link>
      </div>
    </div>
  )
}
