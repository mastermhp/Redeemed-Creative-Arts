import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="prose prose-amber max-w-none">
        <p>
          Welcome to Redeemed Creative Arts. These Terms of Service ("Terms") govern your use of the Redeemed Creative
          Arts platform, including our website, services, and features (collectively, the "Platform"). By accessing or
          using the Platform, you agree to be bound by these Terms.
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using the Platform, you agree to these Terms and our Privacy Policy. If you do not agree to
          these Terms, you may not access or use the Platform.
        </p>

        <h2>2. Changes to Terms</h2>
        <p>
          We may modify these Terms at any time. If we make changes, we will provide notice by updating the date at the
          top of these Terms and by maintaining a current version of the Terms on the Platform. Your continued use of
          the Platform after any such changes constitutes your acceptance of the new Terms.
        </p>

        <h2>3. Platform Access and Account Registration</h2>
        <p>
          To access certain features of the Platform, you may need to register for an account. When you register, you
          agree to provide accurate, current, and complete information and to update such information to keep it
          accurate, current, and complete. You are responsible for safeguarding your account credentials and for all
          activities that occur under your account.
        </p>

        <h2>4. User Types and Responsibilities</h2>
        <h3>4.1 Artists</h3>
        <p>
          As an artist on the Platform, you are responsible for all content you upload, including artwork, descriptions,
          and other materials. You represent and warrant that you own or have the necessary rights to the content you
          upload and that such content does not violate the rights of any third party.
        </p>

        <h3>4.2 Patrons</h3>
        <p>
          As a patron on the Platform, you agree to respect the intellectual property rights of artists and to use the
          Platform in accordance with these Terms.
        </p>

        <h3>4.3 Churches and Organizations</h3>
        <p>
          As a church or organization on the Platform, you agree to accurately represent your organization and to use
          the Platform in accordance with these Terms.
        </p>

        <h2>5. Content and Intellectual Property</h2>
        <h3>5.1 User Content</h3>
        <p>
          You retain ownership of any content you upload to the Platform. By uploading content, you grant us a
          non-exclusive, worldwide, royalty-free license to use, reproduce, modify, adapt, publish, translate, create
          derivative works from, distribute, and display such content in connection with providing and promoting the
          Platform.
        </p>

        <h3>5.2 Platform Content</h3>
        <p>
          All content provided by the Platform, including but not limited to text, graphics, logos, icons, images, audio
          clips, digital downloads, and software, is the property of Redeemed Creative Arts or its licensors and is
          protected by copyright, trademark, and other intellectual property laws.
        </p>

        <h2>6. Prohibited Conduct</h2>
        <p>You agree not to:</p>
        <ul>
          <li>
            Use the Platform for any illegal purpose or in violation of any local, state, national, or international law
          </li>
          <li>Violate or infringe other people's intellectual property, privacy, publicity, or other legal rights</li>
          <li>Upload or transmit viruses, malware, or other types of malicious software</li>
          <li>Impersonate another person or misrepresent your affiliation with a person or entity</li>
          <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Platform</li>
          <li>Upload content that is offensive, harmful, or contrary to Christian values</li>
        </ul>

        <h2>7. Fees and Payments</h2>
        <p>
          We offer both free and paid membership tiers. By selecting a paid membership, you agree to pay all fees in
          accordance with the fees, charges, and billing terms in effect at the time. You are responsible for paying all
          applicable taxes associated with your use of the Platform.
        </p>

        <h2>8. Termination</h2>
        <p>
          We may terminate or suspend your access to the Platform immediately, without prior notice or liability, for
          any reason, including if you breach these Terms. Upon termination, your right to use the Platform will
          immediately cease.
        </p>

        <h2>9. Disclaimer of Warranties</h2>
        <p>
          The Platform is provided "as is" and "as available" without warranties of any kind, either express or implied,
          including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, or
          non-infringement.
        </p>

        <h2>10. Limitation of Liability</h2>
        <p>
          In no event shall Redeemed Creative Arts be liable for any indirect, incidental, special, consequential, or
          punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible
          losses, resulting from your access to or use of or inability to access or use the Platform.
        </p>

        <h2>11. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard
          to its conflict of law provisions.
        </p>

        <h2>12. Contact Information</h2>
        <p>If you have any questions about these Terms, please contact us at:</p>
        <p>
          Email: legal@redeemedcreativearts.com
          <br />
          Address: 123 Faith Avenue, Creative City, CA 12345
        </p>

        <div className="mt-8">
          <p>
            By using the Redeemed Creative Arts platform, you acknowledge that you have read, understood, and agree to
            be bound by these Terms of Service.
          </p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link href="/privacy" className="text-amber-600 hover:underline">
          View Privacy Policy
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
