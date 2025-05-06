import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, PenTool, Star, Palette, Megaphone, Layers, Globe } from "lucide-react"
import { FileSearch } from "lucide-react"

// Branding features data
const features = [
  {
    title: "Brand Strategy & Positioning",
    description: "Craft a clear brand strategy that defines your market positioning, mission, and vision.",
    icon: <PenTool className="h-6 w-6 text-brand-teal" />
  },
  {
    title: "Visual Identity Design",
    description: "Create a powerful visual identity including logos, color palettes, typography, and brand guidelines.",
    icon: <Palette className="h-6 w-6 text-brand-teal" />
  },
  {
    title: "Messaging & Voice",
    description: "Develop a distinctive brand voice and messaging framework to resonate with your audience.",
    icon: <Megaphone className="h-6 w-6 text-brand-teal" />
  },
  {
    title: "Brand Audit & Analysis",
    description: "Evaluate your current brand presence, identify gaps, and uncover opportunities for growth.",
    icon: <FileSearch className="h-6 w-6 text-brand-teal" />
  },
  {
    title: "Marketing Collateral Design",
    description: "Design branded assets such as brochures, social media kits, and promotional materials.",
    icon: <Layers className="h-6 w-6 text-brand-teal" />
  },
  {
    title: "Global Brand Expansion",
    description: "Strategize your brand's expansion across new regions while maintaining consistency and authenticity.",
    icon: <Globe className="h-6 w-6 text-brand-teal" />
  }
]

// Branding challenges
const brandingChallenges = [
  {
    name: "Weak Brand Recognition",
    description: "Your audience struggles to remember or differentiate your brand from competitors."
  },
  {
    name: "Inconsistent Messaging",
    description: "Mixed or unclear messaging confuses customers and dilutes brand value."
  },
  {
    name: "Outdated Visual Identity",
    description: "An old or mismatched design system fails to connect with today's audience."
  },
  {
    name: "Lack of Brand Strategy",
    description: "Without a clear brand strategy, marketing efforts lack focus and impact."
  },
  {
    name: "Market Repositioning",
    description: "Shifting markets demand a refreshed brand image to stay relevant and competitive."
  },
  {
    name: "Globalization Challenges",
    description: "Expanding internationally requires localized branding without losing core identity."
  }
]

// Branding process steps
const brandingProcess = [
  { step: "1", title: "Discovery", description: "We dive deep into your business, audience, and market to uncover insights." },
  { step: "2", title: "Strategy", description: "Develop a clear brand strategy that defines positioning, messaging, and goals." },
  { step: "3", title: "Design", description: "Create visual assets, guidelines, and communication templates." },
  { step: "4", title: "Activation", description: "Launch your new brand identity across all channels and touchpoints." },
  { step: "5", title: "Growth", description: "Monitor brand performance and adapt strategies for continued success." }
]

// Branding stats
const brandingStats = [
  { value: "80%", label: "of consumers prefer to buy from brands they recognize" },
  { value: "23%", label: "average revenue increase with consistent branding" },
  { value: "77%", label: "of marketing leaders say branding is critical to growth" },
  { value: "90%", label: "of purchasing decisions are influenced by brand perception" }
]

export default function BrandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-sm mb-6">
                <Link href="/" className="text-gray-600 hover:text-brand-teal transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <Link href="/services" className="text-gray-600 hover:text-brand-teal transition-colors">Services</Link>
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <span className="text-brand-teal">Branding</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Branding Services</h1>
              <p className="text-lg text-gray-600">
                Build a strong, memorable brand that captures hearts, drives loyalty, and fuels business growth.
              </p>
              <Button asChild className="bg-brand-teal hover:bg-brand-teal/90 text-white">
                <Link href="/contact?service=branding">Start Your Branding Journey</Link>
              </Button>
            </div>
            <div className="relative">
              <Image
                src="/hacks_v5_images/branding.png"
                alt="Branding Services"
                width={800}
                height={600}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Branding Stats */}
      <section className="py-10 bg-brand-dark text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {brandingStats.map((stat, index) => (
              <div key={index} className="text-center p-6">
                <p className="text-3xl md:text-4xl font-bold text-brand-teal mb-2">{stat.value}</p>
                <p className="text-sm md:text-base text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Branding Features */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Branding Services</h2>
            <p className="text-gray-600">
              From strategic brand positioning to stunning visual identities, we help you build a brand that resonates and inspires.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-sm h-full">
                <CardContent className="p-6 space-y-4">
                  <div className="bg-gray-50 p-3 inline-block rounded-lg">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Branding Challenges */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Common Branding Challenges</h2>
            <p className="text-gray-600">
              Understand the common obstacles businesses face when developing or refreshing their brands.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandingChallenges.map((challenge, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-brand-teal">
                <h3 className="text-xl font-semibold mb-2">{challenge.name}</h3>
                <p className="text-gray-600">{challenge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Branding Process</h2>
            <p className="text-gray-600">
              A structured and creative approach to build authentic, impactful brands.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {brandingProcess.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-6 rounded-lg shadow-sm h-full flex flex-col">
                  <div className="h-12 w-12 flex items-center justify-center bg-brand-teal text-white rounded-full text-lg font-bold mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm flex-grow">{step.description}</p>
                </div>
                {index < brandingProcess.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ChevronRight className="h-6 w-6 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-dark text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Build Your Brand?</h2>
            <p className="text-gray-300 mb-8">
              Transform your vision into a compelling brand story. Let’s create something extraordinary together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-brand-teal hover:bg-brand-teal/90 text-white">
                <Link href="/contact?service=branding">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                <Link href="/services">Explore Other Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
