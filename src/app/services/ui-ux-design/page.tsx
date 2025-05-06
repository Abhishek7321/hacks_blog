import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, Users, Lightbulb, Palette, Smartphone, Layout, Zap } from "lucide-react"

// Service features data
const features = [
  {
    title: "User Research & Analysis",
    description: "Comprehensive research to understand your users' behaviors, needs, and motivations to inform design decisions.",
    icon: <Users className="h-6 w-6 text-brand-teal" />
  },
  {
    title: "Wireframing & Prototyping",
    description: "Creation of low and high-fidelity mockups to visualize and test concepts before development.",
    icon: <Lightbulb className="h-6 w-6 text-brand-teal" />
  },
  {
    title: "Interface Design",
    description: "Crafting visually appealing and intuitive interfaces that align with your brand identity and user expectations.",
    icon: <Palette className="h-6 w-6 text-brand-teal" />
  },
  {
    title: "Responsive Design",
    description: "Ensuring seamless experiences across all devices from desktops to smartphones and tablets.",
    icon: <Smartphone className="h-6 w-6 text-brand-teal" />
  },
  {
    title: "Design Systems",
    description: "Building scalable and consistent design systems that streamline development and maintain brand coherence.",
    icon: <Layout className="h-6 w-6 text-brand-teal" />
  },
  {
    title: "UX Optimization",
    description: "Continuous improvement of user experience through testing, analytics, and user feedback.",
    icon: <Zap className="h-6 w-6 text-brand-teal" />
  }
]

// Design process steps
const designProcess = [
  {
    number: "01",
    title: "Discover",
    description: "Understanding your business goals, user needs, and the competitive landscape through research and stakeholder interviews."
  },
  {
    number: "02",
    title: "Define",
    description: "Creating user personas, journey maps, and defining the information architecture and features required."
  },
  {
    number: "03",
    title: "Design",
    description: "Developing wireframes, visual designs, and interactive prototypes that bring your product to life."
  },
  {
    number: "04",
    title: "Test",
    description: "Conducting usability testing and gathering feedback to validate design decisions and identify improvements."
  },
  {
    number: "05",
    title: "Deliver",
    description: "Preparing final design assets and documentation for development and implementation."
  },
  {
    number: "06",
    title: "Refine",
    description: "Post-launch analysis and continuous improvement based on real-world usage data and feedback."
  }
]

// Case studies
const caseStudies = [
  {
    title: "E-learning Platform Redesign",
    client: "EduTech Inc.",
    description: "Transformed a complex e-learning platform with a user-centered redesign, resulting in 40% improved course completion rates and 60% reduction in support requests.",
    image: "/hacks_v5_images/E-learn.png"
  },
  {
    title: "Mobile Banking App",
    client: "Digital First Bank",
    description: "Designed an intuitive mobile banking experience focused on accessibility and simplicity, increasing user engagement by 75% and transaction volumes by 50%.",
    image: "/hacks_v5_images/Mobile-bank.png"
  }
]

// Tools
const designTools = [
  "Figma", "Adobe XD", "Sketch", "InVision", "Zeplin",
  "Adobe Photoshop", "Adobe Illustrator", "Miro",
  "Hotjar", "UsabilityHub", "Maze", "Axure RP"
]

export default function UiUxDesignPage() {
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
                <span className="text-brand-teal">UI/UX Design</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">UI/UX Design Services</h1>
              <p className="text-lg text-gray-600">
                Create meaningful digital experiences that delight users and drive business results through our expert UI/UX design services.
              </p>
              <Button asChild className="bg-brand-teal hover:bg-brand-teal/90 text-white">
                <Link href="/contact?service=uiuxdesign">Start Your Design Project</Link>
              </Button>
            </div>
            <div className="relative">
              <Image
                src="/hacks_v5_images/blue_2.png"
                alt="UI/UX Design Services"
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
            <h2 className="text-3xl font-bold mb-4">Our UI/UX Design Services</h2>
            <p className="text-gray-600">
              We combine creativity with research-backed methodologies to design interfaces that are both beautiful and functional.
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

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <Image
                src="/hacks_v5_images/E-learn.png"
                alt="Benefits of Good UI/UX Design"
                width={600}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="text-3xl font-bold">Why Invest in UI/UX Design?</h2>
              <p className="text-gray-600">
                Great design goes beyond aesthetics. It drives engagement, builds trust, and creates memorable experiences that users love.
              </p>
              <ul className="space-y-4 mt-6">
                <li className="flex gap-3">
                  <div className="bg-brand-teal/10 p-2 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-teal font-semibold">01</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Increased Conversion Rates</h3>
                    <p className="text-gray-600">Intuitive interfaces guide users to take desired actions, boosting conversion rates.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="bg-brand-teal/10 p-2 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-teal font-semibold">02</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Enhanced User Satisfaction</h3>
                    <p className="text-gray-600">User-friendly experiences lead to greater satisfaction and customer loyalty.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="bg-brand-teal/10 p-2 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-teal font-semibold">03</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Reduced Development Costs</h3>
                    <p className="text-gray-600">Addressing usability issues in the design phase saves expensive changes later.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="bg-brand-teal/10 p-2 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-teal font-semibold">04</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Brand Differentiation</h3>
                    <p className="text-gray-600">Distinctive design helps your brand stand out in a crowded marketplace.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Design Process */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Design Process</h2>
            <p className="text-gray-600">
              We follow a user-centered design approach to create intuitive and engaging digital experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {designProcess.map((step, index) => (
              <div key={index} className="relative bg-white p-6 rounded-lg shadow-sm border-t-4 border-brand-teal">
                <span className="text-3xl font-bold text-gray-200">{step.number}</span>
                <h3 className="text-xl font-semibold mt-2 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools We Use */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Tools We Work With</h2>
            <p className="text-gray-600">
              We leverage industry-leading design and prototyping tools to bring your digital products to life.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {designTools.map((tool, index) => (
              <div key={index} className="bg-white px-5 py-3 rounded-full shadow-sm">
                <span className="font-medium">{tool}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Case Studies</h2>
            <p className="text-gray-600">
              Explore how our UI/UX design work has transformed digital products and delivered measurable results.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative h-60">
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{study.title}</h3>
                  <p className="text-brand-teal text-sm mb-3">Client: {study.client}</p>
                  <p className="text-gray-600">{study.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild className="bg-brand-teal hover:bg-brand-teal/90 text-white">
              <Link href="/contact?service=uiuxdesign">Start Your Design Project</Link>
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
              Get answers to common questions about our UI/UX design process and services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">What's the difference between UI and UX design?</h3>
              <p className="text-gray-600">
                UI (User Interface) design focuses on the visual elements users interact with, while UX (User Experience) design is concerned with the overall feel and usability of the product. Good UI makes interfaces attractive; good UX makes them work well and feel intuitive.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">How long does a typical UI/UX design project take?</h3>
              <p className="text-gray-600">
                Project timelines vary based on complexity and scope. A simple website redesign might take 4-6 weeks, while a complex application could take 2-3 months. We'll provide a detailed timeline after understanding your specific requirements.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Do you conduct user testing as part of the design process?</h3>
              <p className="text-gray-600">
                Yes, user testing is a crucial part of our process. We conduct usability testing at various stages to validate design decisions and identify improvement opportunities, ensuring the final product meets user needs and expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-dark text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Elevate Your Digital Experience?</h2>
            <p className="text-gray-300 mb-8">
              Contact us today to discuss how our UI/UX design services can transform your digital product and delight your users.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-brand-teal hover:bg-brand-teal/90 text-white">
                <Link href="/contact?service=uiuxdesign">Get Started</Link>
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
