import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Users, Calendar, DollarSign, Search } from "lucide-react"

export default function ChurchInfoPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">For Churches & Faith-Based Organizations</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Connect with Christian artists, find creative talent, and engage your community through faith-inspired art.
        </p>
      </div>

      {/* Hero Section */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Enhance Your Ministry Through Art</h2>
            <p className="text-gray-700 mb-4">
              Redeemed Creative Arts connects churches and faith-based organizations with talented Christian visual
              artists who can help bring your vision to life.
            </p>
            <p className="text-gray-700 mb-6">
              Whether you're looking for artwork for your facilities, creative talent for events, or ways to engage your
              congregation through visual arts, our platform provides the connections and resources you need.
            </p>
            <Button className="bg-amber-600 hover:bg-amber-700">
              Join as an Organization <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="relative h-[300px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/placeholder.svg?height=600&width=800&text=Church Ministry"
              alt="Church ministry"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Benefits for Churches & Organizations</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="bg-amber-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Search className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Find Talent</h3>
            <p className="text-gray-700">
              Discover and connect with Christian visual artists who can contribute to your ministry and events.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="bg-amber-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Host Events</h3>
            <p className="text-gray-700">
              Create and promote art-focused events, workshops, and exhibitions for your community.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="bg-amber-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <DollarSign className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Fundraise</h3>
            <p className="text-gray-700">
              Create donation campaigns and challenges to support your ministry through art-based initiatives.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="bg-amber-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Engage Community</h3>
            <p className="text-gray-700">
              Connect your congregation with faith-inspired art and creative opportunities that deepen spiritual growth.
            </p>
          </div>
        </div>
      </section>

      {/* Helper Program */}
      <section className="mb-16 bg-amber-50 p-8 rounded-xl">
        <h2 className="text-3xl font-bold mb-8 text-center">The Helper Program</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[300px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/placeholder.svg?height=600&width=800&text=Helper Program"
              alt="Helper program"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Connect with Creative Talent</h3>
            <p className="text-gray-700 mb-4">
              The Helper program connects your organization with Christian artists who have opted to offer their
              creative services for events, projects, and ministries.
            </p>
            <p className="text-gray-700 mb-4">
              Browse our directory of Helpers, filter by skill set and location, and book the perfect creative talent
              for your needs. Helpers can be paid or volunteer, depending on your arrangement.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Find artists for worship environments</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Book talent for special events</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Engage artists for community outreach</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Rate and review your experience</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Organization Membership Options</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Free Tier */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold mb-3 text-center">Free</h3>
            <p className="text-3xl font-bold text-center mb-6">
              $0<span className="text-sm font-normal text-gray-600">/month</span>
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Basic organization profile</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Browse artist directory</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Participate in community</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Basic point earning</span>
              </li>
            </ul>
            <Button variant="outline" className="w-full">
              Get Started
            </Button>
          </div>

          {/* Tier 1 */}
          <div className="bg-white rounded-xl p-6 shadow-xl border-2 border-amber-400 relative">
            <div className="absolute top-0 right-0 bg-amber-400 text-white px-3 py-1 text-sm font-medium rounded-bl-lg rounded-tr-lg">
              Popular
            </div>
            <h3 className="text-xl font-semibold mb-3 text-center">Tier 1</h3>
            <p className="text-3xl font-bold text-center mb-6">
              $9.99<span className="text-sm font-normal text-gray-600">/month</span>
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Everything in Free</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Enhanced profile visibility</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Book up to 5 helpers monthly</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Create basic events</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>2x point earning rate</span>
              </li>
            </ul>
            <Button className="w-full bg-amber-600 hover:bg-amber-700">Upgrade Now</Button>
          </div>

          {/* Tier 2 */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold mb-3 text-center">Tier 2</h3>
            <p className="text-3xl font-bold text-center mb-6">
              $19.99<span className="text-sm font-normal text-gray-600">/month</span>
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Everything in Tier 1</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Unlimited helper bookings</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Create donation campaigns</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Featured organization status</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>3x point earning rate</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Priority event promotion</span>
              </li>
            </ul>
            <Button variant="outline" className="w-full">
              Upgrade Now
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Organization Testimonials</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((testimonial) => (
            <div key={testimonial} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={`/placeholder.svg?height=100&width=100&text=Church ${testimonial}`}
                    alt={`Church ${testimonial}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">Church Name {testimonial}</h3>
                  <p className="text-sm text-gray-600">Faith Organization</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Redeemed Creative Arts has been an incredible resource for our church. We've found talented artists for
                our events and connected with a community that shares our passion for faith-inspired creativity."
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">How does the Helper booking process work?</h3>
            <p className="text-gray-700">
              Browse our directory of Helpers, filter by skills and location, and send booking requests through the
              platform. Once a Helper accepts, you can communicate directly to finalize details. After the event, you
              can leave reviews to help the community.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Can we create fundraising campaigns?</h3>
            <p className="text-gray-700">
              Yes, Tier 2 members can create donation campaigns and challenges to support ministry initiatives. You can
              set goals, track progress, and engage the community in supporting your cause through art-based
              fundraising.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">How do we promote our events on the platform?</h3>
            <p className="text-gray-700">
              You can create and promote events through your organization dashboard. Events will be visible to the
              community, and Tier 2 members receive priority placement in event listings and promotional opportunities.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Are there resources for integrating art into worship?</h3>
            <p className="text-gray-700">
              Yes, we provide resources, guides, and case studies on how to effectively integrate visual arts into
              worship environments, community outreach, and spiritual formation. These resources will be available in
              Phase 2.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center bg-amber-50 p-12 rounded-xl">
        <h2 className="text-3xl font-bold mb-4">Enhance Your Ministry Through Art</h2>
        <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
          Join our community of churches and faith-based organizations to connect with Christian artists and enhance
          your ministry through visual creativity.
        </p>
        <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
          Join as an Organization <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </section>
    </div>
  )
}
