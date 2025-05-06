import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, ArrowRight, ChevronRight, Code, Server, Smartphone, ShoppingBag, Database, Wrench } from "lucide-react"

// Service features data
const features = [
  {
    title: "Custom Website Development",
    description: "Tailored website solutions built from the ground up to meet your specific business needs and objectives.",
    icon: <Code className="h-6 w-6 text-brand-teal" />
  },
  {
    title: "E-commerce Solutions",
    description: "Powerful online stores with secure payment gateways, inventory management, and seamless user experience.",
    icon: <ShoppingBag className="h-6 w-6 text-brand-teal" />
  },
  {
    title: "Progressive Web Apps",
    description: "Fast, reliable, and engaging applications that work offline and provide a native app-like experience.",
    icon: <Smartphone className="h-6 w-6 text-brand-teal" />
  },
  {
    title: "CMS Implementation",
    description: "User-friendly content management systems that empower you to update your website with ease.",
    icon: <Database className="h-6 w-6 text-brand-teal" />
  },
  {
    title: "API Development & Integration",
    description: "Custom API solutions and integrations to connect your website with third-party services and systems.",
    icon: <Server className="h-6 w-6 text-brand-teal" />
  },
  {
    title: "Website Maintenance & Support",
    description: "Ongoing technical support and regular updates to ensure your website remains secure and performs optimally.",
    icon: <Wrench className="h-6 w-6 text-brand-teal" />
  }
]

// Technologies
const technologies = [
  {
    category: "Front-end",
    techs: ["React", "Next.js", "Vue.js", "Angular", "HTML5", "CSS3/SCSS", "JavaScript/TypeScript", "Tailwind CSS"]
  },
  {
    category: "Back-end",
    techs: ["Node.js", "Python", "PHP", "Java", "Ruby on Rails", "ASP.NET", "Express.js", "Django"]
  },
  {
    category: "Databases",
    techs: ["MongoDB", "MySQL", "PostgreSQL", "Firebase", "Redis", "Oracle", "SQL Server", "Elasticsearch"]
  },
  {
    category: "CMS",
    techs: ["WordPress", "Shopify", "Magento", "Drupal", "Contentful", "Strapi", "Sanity.io", "Prismic"]
  }
]

// Process steps
const process = [
  {
    step: "1",
    title: "Discovery & Planning",
    description: "We learn about your business, goals, target audience, and requirements to create a comprehensive project plan."
  },
  {
    step: "2",
    title: "Design & Wireframing",
    description: "Creating detailed wireframes and design mockups for your approval before development begins."
  },
  {
    step: "3",
    title: "Development",
    description: "Our expert developers build your website using the most appropriate technologies and best coding practices."
  },
  {
    step: "4",
    title: "Testing & QA",
    description: "Rigorous testing across devices and browsers to ensure functionality, performance, and security."
  },
  {
    step: "5",
    title: "Deployment & Support",
    description: "Smooth website launch followed by ongoing maintenance and support to keep your site running optimally."
  }
]

// Case studies
const projects = [
  {
    title: "E-commerce Platform Redesign",
    client: "Fashion Boutique",
    description: "Complete redesign and development of an e-commerce platform resulting in 65% increase in conversion rates and 40% reduction in cart abandonment.",
    image: "/hacks_v5_images/4.png",
    technologies: ["Next.js", "Shopify", "Tailwind CSS", "Stripe"]
  },
  {
    title: "Corporate Website & CMS",
    client: "Global Consulting Firm",
    description: "Developed a multilingual corporate website with custom CMS, improving content management efficiency by 75% and increasing visitor engagement by 45%.",
    image: "/hacks_v5_images/3.png",
    technologies: ["React", "Sanity.io", "Node.js", "i18n"]
  }
]

export default function WebDevelopmentPage() {
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
                <span className="text-brand-teal">Web Development</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Web Development Services</h1>
              <p className="text-lg text-gray-600">
                Professional web development solutions that combine stunning design with powerful functionality to create exceptional digital experiences.
              </p>
              <Button asChild className="bg-brand-teal hover:bg-brand-teal/90 text-white">
                <Link href="/contact?service=webdevelopment">Discuss Your Project</Link>
              </Button>
            </div>
            <div className="relative">
              <Image
                src="/hacks_v5_images/blue_3.png"
                alt="Web Development Services"
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
            <h2 className="text-3xl font-bold mb-4">Our Web Development Services</h2>
            <p className="text-gray-600">
              We build custom, responsive websites and web applications that deliver exceptional user experiences and drive business growth.
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

      {/* Technologies Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Technologies We Work With</h2>
            <p className="text-gray-600">
              We leverage the latest technologies and frameworks to build robust, scalable web solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {technologies.map((tech, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-brand-teal">{tech.category}</h3>
                <ul className="space-y-2">
                  {tech.techs.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 bg-brand-teal rounded-full"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Development Process</h2>
            <p className="text-gray-600">
              We follow a structured, collaborative approach to deliver web projects that meet and exceed expectations.
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

      {/* Projects Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Recent Projects</h2>
            <p className="text-gray-600">
              Take a look at some of our recent web development projects and their results.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative h-60">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-xs rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-brand-teal text-sm mb-3">Client: {project.client}</p>
                  <p className="text-gray-600">{project.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild className="bg-brand-teal hover:bg-brand-teal/90 text-white">
              <Link href="/contact?service=webdevelopment">Start Your Project</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">
              Get answers to common questions about our web development process and services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">How long does it take to build a website?</h3>
              <p className="text-gray-600">
                The timeline varies depending on the complexity of the project. A basic website might take 4-6 weeks, while more complex web applications can take 3-6 months. We'll provide a detailed timeline during the planning phase.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Do you provide website maintenance services?</h3>
              <p className="text-gray-600">
                Yes, we offer various maintenance packages to ensure your website remains secure, up-to-date, and performing optimally. These include regular updates, security monitoring, performance optimization, and technical support.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Will my website be mobile-friendly?</h3>
              <p className="text-gray-600">
                Absolutely. All our websites are built with responsive design principles, ensuring they look and function perfectly on all devices, from desktops to smartphones and tablets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-dark text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Build Your Web Presence?</h2>
            <p className="text-gray-300 mb-8">
              Contact us today to discuss your web development project and how we can help bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-brand-teal hover:bg-brand-teal/90 text-white">
                <Link href="/contact?service=webdevelopment">Get Started</Link>
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
