"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react"
import emailjs from 'emailjs-com'

// Contact details
const contactDetails = {
  address: "Hacks4u 11/13/4-C Tashkand Marg, Patrika Chauraha, Civil Lines, Prayagraj, Uttar Pradesh, 211011, India",
  phone: "+91 955 999 3758", // Using phone from original website
  email: "contact@hacks4u.in", // Email that will receive inquiries
  hours: "Mon - Fri: 9:00 AM - 6:00 PM"
}

// EmailJS configuration
const EMAILJS_SERVICE_ID = "service_wfe269e" // Replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = "template_3a3gmkx" // Replace with your EmailJS template ID
const EMAILJS_USER_ID = "nm-1giK0IbY_KMMV7" // Replace with your EmailJS user ID

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    // Initialize EmailJS with your user ID
    emailjs.init(EMAILJS_USER_ID)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus('idle')

    try {
      // Send the email using EmailJS
      const templateParams = {
        from_name: formData.name,
        reply_to: formData.email,
        phone_number: formData.phone,
        subject: formData.subject,
        message: formData.message
      }

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      )

      // Show success message
      toast.success("Thank you! Your message has been sent successfully.")
      setFormStatus('success')

      // Reset form fields
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      })
    } catch (error) {
      console.error("Error sending email:", error)
      toast.error("There was an error sending your message. Please try again.")
      setFormStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-lg text-gray-600 mb-8">
              Have a question or ready to start your project? Get in touch with our team.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact Info */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <p className="text-gray-600">
                Feel free to reach out to us with any questions or inquiries. Our team is here to help you.
              </p>

              <div className="space-y-6">
                <Card className="border-none shadow-sm">
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className="bg-gray-50 p-3 rounded-full">
                      <MapPin className="h-5 w-5 text-brand-teal" />
                    </div>
                    <div>
                      <h3 className="font-medium">Our Location</h3>
                      <p className="text-sm text-gray-600">{contactDetails.address}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm">
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className="bg-gray-50 p-3 rounded-full">
                      <Phone className="h-5 w-5 text-brand-teal" />
                    </div>
                    <div>
                      <h3 className="font-medium">Phone Number</h3>
                      <a
                        href={`tel:${contactDetails.phone.replace(/\s+/g, '')}`}
                        className="text-sm text-gray-600 hover:text-brand-teal transition-colors"
                      >
                        {contactDetails.phone}
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm">
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className="bg-gray-50 p-3 rounded-full">
                      <Mail className="h-5 w-5 text-brand-teal" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email Address</h3>
                      <a
                        href={`mailto:${contactDetails.email}`}
                        className="text-sm text-gray-600 hover:text-brand-teal transition-colors"
                      >
                        {contactDetails.email}
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm">
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className="bg-gray-50 p-3 rounded-full">
                      <Clock className="h-5 w-5 text-brand-teal" />
                    </div>
                    <div>
                      <h3 className="font-medium">Working Hours</h3>
                      <p className="text-sm text-gray-600">{contactDetails.hours}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h3 className="font-medium mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://www.facebook.com/profile.php?id=61564031086074"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-50 p-3 rounded-full hover:bg-brand-teal/10 transition-colors"
                    aria-label="Facebook"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-dark">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/_hacks4u_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-50 p-3 rounded-full hover:bg-brand-teal/10 transition-colors"
                    aria-label="Instagram"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-dark">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/aryan-singh-713812255/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-50 p-3 rounded-full hover:bg-brand-teal/10 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-dark">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-none shadow-md">
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

                  {formStatus === 'success' ? (
                    <div className="bg-green-50 p-6 rounded-lg text-center space-y-4">
                      <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-green-800">Message Sent Successfully!</h3>
                      <p className="text-green-700">
                        Thank you for reaching out. We'll get back to you as soon as possible.
                      </p>
                      <Button
                        onClick={() => setFormStatus('idle')}
                        variant="outline"
                        className="mt-4"
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            Your Name <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="example@email.com"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-sm font-medium">
                            Phone Number
                          </label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+91 123 456 7890"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="subject" className="text-sm font-medium">
                            Subject <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="How can we help you?"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">
                          Your Message <span className="text-red-500">*</span>
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Please describe your project or inquiry..."
                          rows={6}
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-brand-teal hover:bg-brand-teal/90 text-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="mx-auto overflow-hidden rounded-lg shadow-md h-[400px] relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.5054452169024!2d81.83640307578182!3d25.45479267754601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399acbb36d54a647%3A0xbb9dd367dec05832!2sHacks4u%20Private%20Ltd.%20%7C%20Best%20Digital%20Marketing%20Agency%20in%20Prayagraj%20%7C%20Best%20IT%20and%20software%20company%20in%20Prayagraj%20%7C!5e0!3m2!1sen!2sin!4v1744741794085!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              title="Google Maps Location"
              className="absolute inset-0"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  )
}
