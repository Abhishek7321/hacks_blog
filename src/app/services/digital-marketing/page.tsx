import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, ArrowRight, ChevronRight } from "lucide-react"

// Service features data
const features = [
  {
    title: "Search Engine Optimization (SEO)",
    description: "Improve your website's visibility in search engine results pages through technical optimization, content strategy, and ethical link building to drive organic traffic."
  },
  {
    title: "Content Marketing",
    description: "Develop and distribute valuable, relevant content to attract and engage your target audience, establishing your brand as an industry authority."
  },
  {
    title: "Social Media Management",
    description: "Build and maintain your brand presence across relevant social platforms, creating engaging content and fostering community engagement."
  },
  {
    title: "Pay-Per-Click Advertising",
    description: "Drive targeted traffic through strategic PPC campaigns across search engines and social platforms, optimizing ad spend for maximum ROI."
  },
  {
    title: "Email Marketing",
    description: "Create personalized email campaigns that nurture leads, retain customers, and drive conversions through strategic automation."
  },
  {
    title: "Analytics & Performance Tracking",
    description: "Measure and analyze campaign performance with comprehensive reporting and insights to continuously improve marketing strategies."
  }
]

// Process steps
const process = [
  {
    step: "1",
    title: "Initial Consultation",
    description: "We start by understanding your business, target audience, goals, and current marketing efforts."
  },
  {
    step: "2",
    title: "Strategy Development",
    description: "Based on our findings, we create a customized digital marketing strategy aligned with your business objectives."
  },
  {
    step: "3",
    title: "Implementation",
    description: "Our team executes the strategy across selected channels, optimizing campaigns for maximum effectiveness."
  },
  {
    step: "4",
    title: "Monitoring & Analysis",
    description: "We continuously track performance, gathering data and insights to measure campaign success."
  },
  {
    step: "5",
    title: "Optimization & Reporting",
    description: "Regular optimization based on analytics and comprehensive reporting on performance and results."
  }
]

// Case studies/success stories
const caseStudies = [
  {
    client: "GreenTech Solutions",
    industry: "Renewable Energy",
    result: "250% increase in organic traffic and 65% growth in qualified leads within 6 months.",
    image: "/hacks_v5_images/1.png"
  },
  {
    client: "Fashion Forward",
    industry: "E-commerce Retail",
    result: "320% increase in social media engagement and 42% growth in online sales.",
    image: "/hacks_v5_images/2.png"
  }
]

export default function DigitalMarketingPage() {
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
                <span className="text-brand-teal">Digital Marketing</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Digital Marketing Services</h1>
              <p className="text-lg text-gray-600">
                Drive growth and engagement with our comprehensive digital marketing solutions designed to increase your online presence and attract qualified leads.
              </p>
              <Button asChild className="bg-brand-teal hover:bg-brand-teal/90 text-white">
                <Link href="/contact?service=digitalmarketing">Get a Free Consultation</Link>
              </Button>
            </div>
            <div className="relative">
              <Image
                src="/hacks_v5_images/Digital Marketing Services.mp4"
                alt="Digital Marketing Services"
                width={800}
                height={600}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Digital Marketing Solutions</h2>
            <p className="text-gray-600">
              Our digital marketing services are designed to help your business thrive in the increasingly competitive online landscape, delivering measurable results and sustainable growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-sm h-full">
                <CardContent className="p-6 space-y-4">
                  <div className="bg-gray-50 p-3 inline-block rounded-lg">
                    <CheckCircle2 className="h-6 w-6 text-brand-teal" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Digital Marketing Process</h2>
            <p className="text-gray-600">
              We follow a proven, data-driven approach to create and implement effective digital marketing strategies tailored to your business goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {process.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-6 rounded-lg shadow-sm h-full flex flex-col">
                  <div className="h-12 w-12 flex items-center justify-center bg-brand-teal text-white rounded-full text-lg font-bold mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm flex-grow">{step.description}</p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
            <p className="text-gray-600">
              Discover how our digital marketing strategies have helped businesses achieve remarkable growth and ROI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative h-60">
                  <Image
                    src={study.image}
                    alt={study.client}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{study.client}</h3>
                  <p className="text-brand-teal text-sm mb-3">Industry: {study.industry}</p>
                  <p className="text-gray-600">{study.result}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild className="bg-brand-teal hover:bg-brand-teal/90 text-white">
              <Link href="/contact?service=digitalmarketing">Get Started Today</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">
              Get answers to common questions about our digital marketing services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">How long before I see results from SEO?</h3>
              <p className="text-gray-600">
                SEO is a long-term strategy. While some improvements may be noticeable within 1-3 months, significant results typically take 4-6 months depending on your industry competitiveness, website structure, and current optimization level.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Do you offer customized marketing plans?</h3>
              <p className="text-gray-600">
                Yes, all our digital marketing plans are customized based on your specific business goals, target audience, and industry. We don't believe in one-size-fits-all approaches.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">How do you measure the success of campaigns?</h3>
              <p className="text-gray-600">
                We track various metrics including website traffic, conversion rates, engagement, keyword rankings, and ROI. We provide regular reports with these insights and recommendations for continuous improvement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-dark text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Boost Your Online Presence?</h2>
            <p className="text-gray-300 mb-8">
              Contact us today to discuss how our digital marketing services can help grow your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-brand-teal hover:bg-brand-teal/90 text-white">
                <Link href="/contact?service=digitalmarketing">Get Started</Link>
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
