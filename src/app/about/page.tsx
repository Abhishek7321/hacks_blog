import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Users } from "lucide-react"

// Team data
const team = [
  {
    name: "Mr.Aryan thakur",
    position: "CEO & Founder",
    image: "/hacks_v5_images/aryannew.jpeg"
  },
  {
    name: "Ms.Antra",
    position: "Digital Marketing Head",
    image: "/hacks_v5_images/antra.jpeg"
  },
  {
    name: "Mr.Abhishhek Rai",
    position: "Lead Developer",
    image: "/hacks_v5_images/Abhishek.jpeg"
  },
  {
    name: "Mr.Vimal Singh",
    position: " CTO ",
    image: "/hacks_v5_images/vimal.jpeg"
  }
]

// Core values
const coreValues = [
  {
    title: "Innovation",
    description: "We continuously explore new ideas and technologies to deliver cutting-edge solutions."
  },
  {
    title: "Excellence",
    description: "We strive for excellence in every project, ensuring the highest quality deliverables."
  },
  {
    title: "Integrity",
    description: "We conduct business with transparency, honesty, and ethical standards."
  },
  {
    title: "Client Focus",
    description: "We prioritize our clients' needs and build long-term relationships based on trust."
  }
]

// Stats
const stats = [
  { value: "12K+", label: "Projects Completed" },
  { value: "10K+", label: "Happy Clients" },
  { value: "35+", label: "Team Members" },
  { value: "18+", label: "Awards Won" }
]

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
            <p className="text-lg text-gray-600 mb-8">
              We're a team of passionate experts dedicated to helping businesses thrive in the digital world.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2019, Hacks4U began with a simple mission: to provide businesses with the digital tools they need to succeed in an increasingly online world.
                </p>
                <p>
                  What started as a small team of digital enthusiasts has now grown into a full-service digital marketing and IT solutions company with a team of over 35 professionals serving clients worldwide.
                </p>
                <p>
                  Our journey has been defined by our commitment to innovation, quality, and client satisfaction. We take pride in our work and the results we deliver for our clients.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                {stats.map((stat) => (
                  <Card key={stat.label} className="border-none shadow-sm flex-1 min-w-[120px]">
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-brand-dark">{stat.value}</p>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-xl overflow-hidden">
                <Image
                  src="/hacks_v5_images/Our Story.png"
                  alt="Our Team"
                  width={600}
                  height={600}
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg max-w-[180px] hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="bg-brand-teal/10 p-2 rounded-full">
                    <Users className="text-brand-teal h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium">Team of Experts</p>
                    <p className="text-xs text-gray-500">35+ professionals</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <Card className="border-none shadow-md bg-white">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-gray-600 mb-6">
                  To empower businesses with innovative digital marketing services and IT solutions that drive growth, enhance online presence, and deliver measurable results.
                </p>
                <ul className="space-y-3">
                  {["Client-centric approach", "Innovative solutions", "Measurable results", "Continuous improvement"].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="text-brand-teal h-5 w-5 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md bg-white">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                <p className="text-gray-600 mb-6">
                  To be the leading provider of digital solutions, recognized globally for our expertise, innovation, and commitment to helping businesses reach their full digital potential.
                </p>
                <ul className="space-y-3">
                  {["Global recognition", "Digital excellence", "Industry leadership", "Technological advancement"].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="text-brand-teal h-5 w-5 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-gray-600">
              These values guide everything we do, from how we build our products to how we treat our clients and each other.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value) => (
              <Card key={value.title} className="card-hover border-none shadow-sm">
                <CardContent className="p-6">
                  <div className="bg-brand-teal/10 p-3 rounded-full w-fit mb-4">
                    <CheckCircle2 className="text-brand-teal h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-600">
              Our talented team of experts is dedicated to delivering exceptional results for our clients.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="group card-hover">
                <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-gray-600">{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-dark text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Work With Us?</h2>
            <p className="text-gray-300 mb-8">
              Join the 10,000+ businesses that have trusted us with their digital presence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-brand-teal hover:bg-brand-teal/90 text-white">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                <Link href="/services">Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}