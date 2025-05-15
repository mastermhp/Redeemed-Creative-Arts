import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Heart, Gift, Award, DollarSign, ThumbsUp } from "lucide-react"

export default function PatronInfoPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">For Patrons & Supporters</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover and support Christian artists, engage with faith-inspired creativity, and make a difference.
        </p>
      </div>

      {/* Hero Section */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[300px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/placeholder.svg?height=600&width=800&text=Support Artists"
              alt="Support artists"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Support Faith-Inspired Creativity</h2>
            <p className="text-gray-700 mb-4">
              As a patron on Redeemed Creative Arts, you play a vital role in nurturing and supporting Christian visual
              artists who share their God-given talents.
            </p>
            <p className="text-gray-700 mb-6">
              Discover beautiful artwork that reflects your faith, connect with artists who share your values, and help
              spread the Gospel through the power of visual creativity.
            </p>
            <Button className="bg-amber-600 hover:bg-amber-700">
              Join as a Patron <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Benefits for Patrons</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="bg-amber-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Heart className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Discover Art</h3>
            <p className="text-gray-700">
              Explore a curated collection of faith-inspired artwork from talented Christian artists around the world.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="bg-amber-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <DollarSign className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Support Artists</h3>
            <p className="text-gray-700">
              Purchase artwork, donate to artists, and contribute to campaigns that help Christian creatives thrive.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="bg-amber-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <ThumbsUp className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Vote & Engage</h3>
            <p className="text-gray-700">
              Vote in contests, comment on artwork, and engage with a community that values faith-inspired creativity.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="bg-amber-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Award className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Earn Rewards</h3>
            <p className="text-gray-700">
              Earn points for your engagement and redeem them for rewards like gift cards, discounts, and special
              features.
            </p>
          </div>
        </div>
      </section>

      {/* Ways to Support */}
      <section className="mb-16 bg-amber-50 p-8 rounded-xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Ways to Support Artists</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-start mb-4">
              <div className="bg-amber-100 p-2 rounded-full mr-4">
                <DollarSign className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Direct Donations</h3>
                <p className="text-gray-700">
                  Support artists directly with one-time or recurring donations to help them continue their creative
                  ministry.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-start mb-4">
              <div className="bg-amber-100 p-2 rounded-full mr-4">
                <Gift className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Gift Points</h3>
                <p className="text-gray-700">
                  Share your earned points with artists to help them access platform benefits and rewards.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-start mb-4">
              <div className="bg-amber-100 p-2 rounded-full mr-4">
                <Heart className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Purchase Artwork</h3>
                <p className="text-gray-700">
                  Buy original artwork, prints, or digital downloads to enjoy in your home while supporting artists.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-start mb-4">
              <div className="bg-amber-100 p-2 rounded-full mr-4">
                <Award className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Matching Donations</h3>
                <p className="text-gray-700">
                  Create matching campaigns to multiply the impact of community donations to artists and causes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Patron Membership Options</h2>
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
                <span>Basic patron profile</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>View and vote on artwork</span>
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
                <span>Direct message artists</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Create donation campaigns</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>2x point earning rate</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Helper program eligibility</span>
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
                <span>Create matching campaigns</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Priority helper status</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Featured patron recognition</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>3x point earning rate</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Early access to new artwork</span>
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
        <h2 className="text-3xl font-bold mb-8 text-center">Patron Testimonials</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((testimonial) => (
            <div key={testimonial} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={`/placeholder.svg?height=100&width=100&text=Patron ${testimonial}`}
                    alt={`Patron ${testimonial}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">Patron Name {testimonial}</h3>
                  <p className="text-sm text-gray-600">Supporter</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "I love being able to support Christian artists who create beautiful work that reflects my faith. The
                platform makes it easy to discover new artists and engage with a community that shares my values."
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
            <h3 className="text-xl font-semibold mb-2">How do I support artists on the platform?</h3>
            <p className="text-gray-700">
              You can support artists in multiple ways: purchase their artwork, make direct donations, create matching
              campaigns, gift points, vote in contests, and engage with their content through comments and shares.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">What are points and how do I earn them?</h3>
            <p className="text-gray-700">
              Points are earned through platform engagement such as logging in regularly, voting on artwork, making
              donations, sharing content, and purchasing artwork. Points can be redeemed for rewards or gifted to
              artists.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">How do matching donations work?</h3>
            <p className="text-gray-700">
              With a Tier 2 membership, you can create matching campaigns where you pledge to match donations from other
              patrons up to a specified amount. This multiplies the impact of community support for artists and causes.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Can I be both a patron and a helper?</h3>
            <p className="text-gray-700">
              Yes! Many patrons also opt in to the Helper program to offer their talents to churches and organizations.
              You can select this option during registration or from your dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center bg-amber-50 p-12 rounded-xl">
        <h2 className="text-3xl font-bold mb-4">Ready to Support Christian Artists?</h2>
        <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
          Join our community of patrons and help spread faith-inspired creativity throughout the world.
        </p>
        <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
          Join as a Patron <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </section>
    </div>
  )
}
