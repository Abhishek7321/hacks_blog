"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Montserrat } from'next/font/google'
import {
  SearchIcon,
  ChevronRight,
  Calendar,
  User,
  Tag,
  Clock
} from "lucide-react"
import { toast } from "sonner"
import { supabase, TABLES } from "@/lib/supabase"

// Base blog posts data (will be combined with dynamically loaded posts)
const baseBlogPosts = [
  {
    id: "essential-seo-strategies-2023",
    title: "Essential SEO Strategies for 2023: Staying Ahead in the Digital Race",
    excerpt: "Discover the most effective SEO techniques that are working in 2023 to improve your website's visibility and organic traffic.",
    image: "/hacks_v5_images/blog_1.png",
    author: "Sarah Johnson",
    date: "June 15, 2023",
    readTime: "8 min read",
    categories: ["Digital Marketing", "SEO"],
    featured: true
  },
  {
    id: "responsive-web-design-best-practices",
    title: "Responsive Web Design Best Practices for Modern Businesses",
    excerpt: "Learn how to create websites that provide an optimal viewing experience across all devices and screen sizes.",
    image: "/hacks_v5_images/blog_2.png",
    author: "Michael Chen",
    date: "May 28, 2023",
    readTime: "6 min read",
    categories: ["Web Development", "UI/UX Design"],
    featured: true
  },
  {
    id: "cybersecurity-small-businesses",
    title: "Cybersecurity Essentials for Small Businesses",
    excerpt: "Protect your small business from cyber threats with these cost-effective security measures and best practices.",
    image: "/hacks_v5_images/cybersecurity Blog.png",
    author: "Alex Rivera",
    date: "April 10, 2023",
    readTime: "7 min read",
    categories: ["Cyber Security", "Business"]
  },
  {
    id: "ai-digital-marketing",
    title: "How AI is Transforming Digital Marketing Strategies",
    excerpt: "Explore the revolutionary impact of artificial intelligence on modern marketing practices and customer engagement.",
    image: "/hacks_v5_images/blog_3.png",
    author: "Emma Watson",
    date: "March 22, 2023",
    readTime: "9 min read",
    categories: ["Digital Marketing", "Technology"]
  },
  {
    id: "ecommerce-conversion-optimization",
    title: "E-commerce Conversion Rate Optimization: Turning Visitors into Customers",
    excerpt: "Practical techniques to enhance your online store's user experience and boost conversion rates.",
    image: "/hacks_v5_images/E-Comm.jpg.avif",
    author: "David Wilson",
    date: "February 15, 2023",
    readTime: "10 min read",
    categories: ["E-commerce", "Conversion Optimization"]
  },
  {
    id: "mobile-app-design-trends",
    title: "Mobile App Design Trends to Watch in 2023",
    excerpt: "Stay ahead of the curve with these cutting-edge mobile application design trends shaping the user experience.",
    image: "/hacks_v5_images/Mobile App For blog.png",
    author: "Sophia Lee",
    date: "January 30, 2023",
    readTime: "6 min read",
    categories: ["UI/UX Design", "Mobile Apps"]
  }
]

// Categories for filter
const baseCategories = [
  "All",
  "Digital Marketing",
  "SEO",
  "Web Development",
  "UI/UX Design",
  "Cyber Security",
  "E-commerce",
  "Technology"
]

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState(baseBlogPosts)
  const [email, setEmail] = useState("")
  const [categories, setCategories] = useState(baseCategories)
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  interface BlogPost {
    id: string
    title: string
    excerpt: string
    image: string
    author: string
    date: string
    readTime: string
    categories: string[]
    featured?: boolean
  }
  
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Load blog posts from Supabase and localStorage on component mount
  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true)
      try {
        await fetchPosts()
      } catch (error) {
        console.error("Error loading posts:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadPosts()
  }, [])

  // Watch for changes in activeCategory or searchTerm and apply filters
  useEffect(() => {
    applyFilters(activeCategory, searchTerm)
  }, [blogPosts, activeCategory, searchTerm])

  // Function to fetch posts from Supabase
  const fetchPosts = async () => {
    try {
      // Check if Supabase is properly configured
      if (!supabase) {
        console.warn("Supabase client not initialized properly")

        // Fallback to localStorage if Supabase is not configured
        loadLocalPosts()
        return
      }

      // Fetch posts from Supabase
      const { data, error } = await supabase
        .from(TABLES.BLOG_POSTS)
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        throw error
      }

      if (data && data.length > 0) {
        // Transform the data structure to match our expected format
        const supabasePosts = data.map(post => ({
          id: post.id,
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          author: post.author,
          date: new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          }),
          readTime: post.read_time,
          categories: post.categories,
          tags: post.tags,
          image: post.image,
          featured: post.featured
        }))

        // Combine base posts with Supabase posts
        const allPosts = [...supabasePosts,...baseBlogPosts]
        setBlogPosts(allPosts)

        // Extract unique categories
        const allCategories = new Set(["All"])
        for (const post of allPosts) {
          for (const category of post.categories) {
            allCategories.add(category)
          }
        }

        setCategories(Array.from(allCategories))
      } else {
        // If no posts in Supabase, load from localStorage as fallback
        loadLocalPosts()
      }
    } catch (error) {
      console.error("Error fetching posts from Supabase:", error)
      toast.error("Failed to load blog posts from the database")

      // Fallback to localStorage
      loadLocalPosts()
    }
  }

  // Function to load posts from localStorage (as fallback)
  const loadLocalPosts = () => {
    const savedPosts = localStorage.getItem("blogPosts")
    if (savedPosts) {
      const adminPosts = JSON.parse(savedPosts)

      // Combine admin posts with base posts
      const allPosts = [...baseBlogPosts, ...adminPosts]
      setBlogPosts(allPosts)

      // Extract unique categories
      const allCategories = new Set(["All"])
      for (const post of allPosts) {
        for (const category of post.categories) {
          allCategories.add(category)
        }
      }
      setCategories(Array.from(allCategories))
    }
  }

  // Function to filter posts based on category and search term
  const applyFilters = (category: string, search: string) => {
    let result = [...blogPosts]

    // Filter by category
    if (category && category !== "All") {
      result = result.filter(post =>
        post.categories.some(cat => cat.toLowerCase() === category.toLowerCase())
      )
    }

    // Filter by search term
    if (search.trim()) {
      const searchLower = search.toLowerCase()
      result = result.filter(post =>
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.categories.some(cat => cat.toLowerCase().includes(searchLower))
      )
    }

    setFilteredPosts(result)
  }

  // Handle subscription
  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!email.trim() || !email.includes('@')) {
      toast.error("Please enter a valid email address")
      setIsSubmitting(false)
      return
    }

    try {
      // Check if Supabase is properly configured
      if (!supabase) {
        throw new Error("Database not configured")
      }

      // Check if the email already exists in Supabase
      const { data: existingSubscribers, error: checkError } = await supabase
        .from(TABLES.SUBSCRIBERS)
        .select('email')
        .eq('email', email.trim())

      if (checkError) {
        throw checkError
      }

      if (existingSubscribers && existingSubscribers.length > 0) {
        toast.error("This email is already subscribed")
        setIsSubmitting(false)
        return
      }

      // Create a new subscriber
      const currentDate = new Date()
      const subscriber = {
        email: email.trim(),
        date: currentDate.toISOString(),
        created_at: currentDate.toISOString()
      }

      // Insert the subscriber into Supabase
      const { error } = await supabase
        .from(TABLES.SUBSCRIBERS)
        .insert(subscriber)

      if (error) {
        throw error
      }

      // Reset email field
      setEmail("")

      // Show success message
      toast.success("Thank you for subscribing to our newsletter!")
    } catch (error) {
      console.error("Error saving subscriber to Supabase:", error)
      if (error instanceof Error) {
        toast.error("Failed to subscribe. " + (error.message || "Please try again."))
      } else {
        toast.error("Failed to subscribe. Please try again.")
      }

      // Fallback to localStorage
      try {
        // Create a new subscriber for localStorage
        const newSubscriber = {
          id: Date.now().toString(),
          email: email.trim(),
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          })
        }

        // Get existing subscribers from localStorage
        const existingSubscribersJSON = localStorage.getItem("subscribers")
        const existingSubscribers = existingSubscribersJSON
          ? JSON.parse(existingSubscribersJSON)
          : []

        // Check if email already exists in localStorage
        if (existingSubscribers.some((sub: { email: string }) => sub.email === email)) {
          toast.error("This email is already subscribed")
          return
        }

        // Add new subscriber to localStorage
        const updatedSubscribers = [...existingSubscribers, newSubscriber]
        localStorage.setItem("subscribers", JSON.stringify(updatedSubscribers))

        // Reset email field
        setEmail("")

        // Show success message
        toast.success("Thank you for subscribing to our newsletter! (Saved locally)")
      } catch (localError) {
        console.error("Error saving to localStorage:", localError)
        toast.error("Failed to subscribe to newsletter.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get featured posts (first 2 posts marked as featured)
  const featuredPosts = filteredPosts.filter(post => post.featured)

  // Regular posts (all remaining posts)
  const regularPosts = filteredPosts.filter(post => !post.featured)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 text-sm mb-6">
              <Link href="/" className="text-gray-600 hover:text-brand-teal transition-colors">Home</Link>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <span className="text-brand-teal">Blog</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Blog</h1>
            <p className="text-lg text-gray-600 mb-8">
              Industry insights, expert tips, and the latest trends in digital marketing, web development, and technology.
            </p>
            <div className="flex items-center justify-center max-w-md mx-auto">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full px-4 py-3 pl-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 border-b">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === activeCategory
                    ? "bg-brand-teal text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Loading State */}
      {isLoading && (
        <div className="py-16 text-center">
          <p className="text-gray-500">Loading blog posts...</p>
        </div>
      )}

      {/* Featured Posts */}
      {!isLoading && featuredPosts.length > 0 && (
        <section className="py-16">
          <div className="container-custom">
            <h2 className="text-2xl font-bold mb-8">Featured Articles</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="relative h-64">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-brand-teal text-white text-xs px-3 py-1 rounded-full uppercase">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.categories.map((category) => (
                        <span key={category} className="text-xs text-brand-teal font-medium flex items-center gap-1">
                          <Tag className="h-3 w-3" />
                          {category}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold mb-3">
                      <Link href={`/blog/${post.id}`} className="hover:text-brand-teal transition-colors">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      {!isLoading && (
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>

            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No articles found matching your criteria.</p>
                <Button
                  className="mt-4 bg-brand-teal hover:bg-brand-teal/90 text-white"
                  onClick={() => {
                    setActiveCategory("All")
                    setSearchTerm("")
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post) => (
                  <article key={post.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
                    <div className="relative h-52">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.categories.map((category) => (
                          <span key={category} className="text-xs text-brand-teal font-medium flex items-center gap-1">
                            <Tag className="h-3 w-3" />
                            {category}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-lg font-bold mb-3">
                        <Link href={`/blog/${post.id}`} className="hover:text-brand-teal transition-colors">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <User className="h-3 w-3" />
                            <span>{post.author}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {regularPosts.length > 6 && (
              <div className="flex justify-center mt-12">
                <Button className="bg-brand-teal hover:bg-brand-teal/90 text-white">
                  Load More Articles
                </Button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="bg-brand-dark text-white rounded-xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-gray-300 mb-8">
                Stay updated with our latest articles, industry insights, and expert tips delivered directly to your inbox.
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-3 rounded-lg text-gray-900 flex-grow focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button
                  type="submit"
                  className="bg-brand-teal hover:bg-brand-teal/90 text-white whitespace-nowrap"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
              <p className="text-gray-400 text-sm mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Link
      <div className="container-custom">
        <div className="text-center py-8 border-t mt-8">
          <Link
            href="/admin"
            className="text-sm text-gray-500 hover:text-brand-teal transition-colors"
          >
            Admin Area
          </Link>
        </div>
      </div> */}

      {/* Database Connection Status */}
      <div className="container-custom">
        {/* <div className="text-center py-4">
          <p className="text-xs text-gray-400">
            Database Connection: {supabase ? (
              <span className="text-green-500">Connected to Supabase</span>
            ) : (
              <span className="text-red-500">Using local storage</span>
            )}
          </p>
        </div> */}
      </div>
    </div>
  )
}
