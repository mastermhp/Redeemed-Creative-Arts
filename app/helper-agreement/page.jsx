import Link from "next/link"

export default function HelperAgreementPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Helper Agreement</h1>
        <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="prose prose-amber max-w-none">
        <p>
          This Helper Agreement ("Agreement") is between you ("Helper") and Redeemed Creative Arts ("Platform") and
          governs your participation in the Helper program, which connects artists and patrons with churches and
          faith-based organizations for creative services.
        </p>

        <h2>1. Helper Program Overview</h2>
        <p>
          The Helper program allows artists and patrons to offer their creative talents to churches and faith-based
          organizations for events, projects, and ministries. Helpers can be paid or volunteer, depending on the
          arrangement between the Helper and the organization.
        </p>

        <h2>2. Eligibility</h2>
        <p>To participate in the Helper program, you must:</p>
        <ul>
          <li>Be at least 18 years of age</li>
          <li>Have an active account on the Platform</li>
          <li>Opt in to the Helper program during registration or through your dashboard</li>
          <li>Provide accurate information about your skills, availability, and preferences</li>
          <li>Agree to this Helper Agreement and the Platform's Terms of Service</li>
        </ul>

        <h2>3. Helper Responsibilities</h2>
        <p>As a Helper, you agree to:</p>
        <ul>
          <li>Provide accurate information about your skills, experience, and availability</li>
          <li>Respond to booking requests in a timely manner</li>
          <li>Honor commitments made to organizations</li>
          <li>Conduct yourself professionally and in accordance with Christian values</li>
          <li>Communicate clearly about expectations, requirements, and compensation</li>
          <li>Provide the agreed-upon services to the best of your ability</li>
          <li>Respect the confidentiality and privacy of the organizations you work with</li>
        </ul>

        <h2>4. Booking Process</h2>
        <p>The booking process typically follows these steps:</p>
        <ol>
          <li>An organization browses the Helper directory and sends a booking request</li>
          <li>You receive the request and can accept, decline, or request more information</li>
          <li>If you accept, you and the organization can communicate directly to finalize details</li>
          <li>After the event or project, both parties can leave reviews</li>
        </ol>

        <h2>5. Compensation</h2>
        <p>
          Compensation arrangements are made directly between you and the organization. The Platform does not set rates
          or require specific compensation models. You may choose to:
        </p>
        <ul>
          <li>Offer your services as a volunteer</li>
          <li>Charge a flat fee</li>
          <li>Charge an hourly rate</li>
          <li>Accept donations</li>
          <li>Use another compensation model agreed upon with the organization</li>
        </ul>
        <p>
          The Platform is not responsible for ensuring payment or resolving payment disputes between Helpers and
          organizations.
        </p>

        <h2>6. Cancellations</h2>
        <p>If you need to cancel a confirmed booking, you agree to:</p>
        <ul>
          <li>Notify the organization as soon as possible</li>
          <li>Provide a reason for the cancellation</li>
          <li>If possible, help find a replacement or alternative solution</li>
        </ul>
        <p>Repeated cancellations may affect your Helper status and visibility in the directory.</p>

        <h2>7. Reviews and Ratings</h2>
        <p>
          After completing a project or event, organizations may leave reviews and ratings of your services. These
          reviews help build your reputation on the Platform. Similarly, you may leave reviews of the organizations you
          work with.
        </p>

        <h2>8. Helper Status</h2>
        <p>Your Helper status may be:</p>
        <ul>
          <li>Active: You are visible in the directory and can receive booking requests</li>
          <li>Inactive: You have temporarily paused your Helper services</li>
          <li>
            Suspended: Your Helper privileges have been suspended due to violations of this Agreement or the Terms of
            Service
          </li>
        </ul>
        <p>You can change your status between Active and Inactive at any time through your dashboard.</p>

        <h2>9. Relationship Between Parties</h2>
        <p>
          This Agreement does not create an employment, agency, partnership, or joint venture relationship between you
          and the Platform. You are an independent contractor offering your services to organizations through the
          Platform.
        </p>

        <h2>10. Limitation of Liability</h2>
        <p>The Platform serves as a connection point between Helpers and organizations but is not responsible for:</p>
        <ul>
          <li>The actions or omissions of organizations or Helpers</li>
          <li>The quality or outcome of Helper services</li>
          <li>Payment disputes between Helpers and organizations</li>
          <li>Personal injury, property damage, or other losses that may occur during Helper services</li>
        </ul>

        <h2>11. Termination</h2>
        <p>
          You may terminate your participation in the Helper program at any time by updating your preferences in your
          dashboard. The Platform may terminate your Helper status if you violate this Agreement or the Terms of
          Service.
        </p>

        <h2>12. Changes to this Agreement</h2>
        <p>
          We may modify this Agreement at any time. If we make changes, we will provide notice by updating the date at
          the top of this Agreement and by maintaining a current version on the Platform. Your continued participation
          in the Helper program after any such changes constitutes your acceptance of the new Agreement.
        </p>

        <h2>13. Contact Information</h2>
        <p>If you have any questions about this Agreement, please contact us at:</p>
        <p>
          Email: helpers@redeemedcreativearts.com
          <br />
          Address: 123 Faith Avenue, Creative City, CA 12345
        </p>

        <div className="mt-8">
          <p>
            By participating in the Helper program, you acknowledge that you have read, understood, and agree to be
            bound by this Helper Agreement.
          </p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link href="/terms" className="text-amber-600 hover:underline">
          View Terms of Service
        </Link>
        {" | "}
        <Link href="/privacy" className="text-amber-600 hover:underline">
          View Privacy Policy
        </Link>
        {" | "}
        <Link href="/artist-disclaimer" className="text-amber-600 hover:underline">
          View Artist Disclaimer
        </Link>
      </div>
    </div>
  )
}
