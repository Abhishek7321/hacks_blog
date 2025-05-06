"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ChevronRight,
  Calendar,
  Clock,
  User,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
  ArrowLeft,
  Tag
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { supabase, TABLES } from "@/lib/supabase"
import { toast } from "sonner"

// Define the BlogPost interface
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime?: string;
  read_time?: string;
  categories: string[];
  tags: string[];
  image: string;
  featured: boolean;
}

// Related posts type
interface RelatedPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchBlogPost = async () => {
      setIsLoading(true)
      try {
        // Check if Supabase is properly configured
        if (!supabase) {
          console.warn("Supabase client not initialized properly")
          // Try to fetch from localStorage as fallback
          fetchFromLocalStorage()
          return
        }

        // Fetch the blog post from Supabase
        const { data, error } = await supabase
          .from(TABLES.BLOG_POSTS)
          .select('*')
          .eq('id', params.slug)
          .single()

        if (error) {
          throw error
        }

        if (data) {
          // Transform the data to match our expected format
          const formattedPost = {
            id: data.id,
            title: data.title,
            excerpt: data.excerpt,
            content: data.content,
            author: data.author,
            date: new Date(data.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric"
            }),
            readTime: data.read_time,
            read_time: data.read_time,
            categories: data.categories,
            tags: data.tags,
            image: data.image,
            featured: data.featured
          }

          setBlogPost(formattedPost)
          
          // Fetch related posts based on categories
          await fetchRelatedPosts(data.categories)
        } else {
          // If not found in Supabase, try localStorage
          fetchFromLocalStorage()
        }
      } catch (error) {
        console.error("Error fetching blog post:", error)
        toast.error("Failed to load blog post")
        // Try to fetch from localStorage as fallback
        fetchFromLocalStorage()
      } finally {
        setIsLoading(false)
      }
    }

    const fetchFromLocalStorage = () => {
      // Try to get the post from localStorage
      const savedPosts = localStorage.getItem("blogPosts")
      if (savedPosts) {
        const posts = JSON.parse(savedPosts)
        const post = posts.find((p: BlogPost) => p.id === params.slug)
        
        if (post) {
          setBlogPost(post)
          
          // Get related posts from localStorage
          const relatedPosts = posts
            .filter((p: BlogPost) => p.id !== params.slug)
            .filter((p: BlogPost) => {
              // Find posts with at least one matching category
              return p.categories.some((cat: string) => 
                post.categories.includes(cat)
              )
            })
            .slice(0, 3)
            
          setRelatedPosts(relatedPosts)
        }
      }
    }

    const fetchRelatedPosts = async (categories: string[]) => {
      try {
        if (!supabase) return
        
        // Fetch posts that share categories with the current post
        const { data, error } = await supabase
          .from(TABLES.BLOG_POSTS)
          .select('*')
          .neq('id', params.slug) // Exclude current post
          .filter('categories', 'cs', `{${categories.join(',')}}`) // Filter by categories
          .limit(3)
          
        if (error) {
          throw error
        }
        
        if (data) {
          // Format the related posts
          const formattedRelatedPosts = data.map(post => ({
            id: post.id,
            title: post.title,
            excerpt: post.excerpt,
            image: post.image,
            author: post.author,
            date: new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric"
            })
          }))
          
          setRelatedPosts(formattedRelatedPosts)
        }
      } catch (error) {
        console.error("Error fetching related posts:", error)
      }
    }

    fetchBlogPost()
  }, [params.slug])

  const handleSubscribe = async (e: React.FormEvent) => {
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

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading blog post...</p>
      </div>
    )
  }

  if (!blogPost) {
    return (
      <div className="flex min-h-screen items-center justify-center flex-col gap-4">
        <h1 className="text-2xl font-bold">Blog post not found</h1>
        <p>The blog post you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/blog">Back to Blog</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-sm mb-6">
              <Link href="/" className="text-gray-600 hover:text-brand-teal transition-colors">Home</Link>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <Link href="/blog" className="text-gray-600 hover:text-brand-teal transition-colors">Blog</Link>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <span className="text-brand-teal">{blogPost.title.substring(0, 20)}...</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {blogPost.categories.map((category, idx) => (
                <Link
                  key={idx}
                  href={`/blog?category=${category.toLowerCase().replace(' ', '-')}`}
                  className="px-3 py-1 bg-brand-teal/10 text-brand-teal text-xs rounded-full hover:bg-brand-teal/20 transition-colors"
                >
                  {category}
                </Link>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{blogPost.title}</h1>

            <div className="flex items-center gap-6 text-sm text-gray-600 mb-8">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{blogPost.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{blogPost.readTime || blogPost.read_time}</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{blogPost.author}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-lg">
              <Image
                src={blogPost.image}
                alt={blogPost.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-brand-teal prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:shadow-md">
                {/* Render the blog content */}
                <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
              </div>

              {/* Tags */}
              {blogPost.tags && blogPost.tags.length > 0 && (
                <div className="mt-10 pt-6 border-t">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-gray-700">Tags:</span>
                    {blogPost.tags.map((tag, idx) => (
                      <Link
                        key={idx}
                        href={`/blog?tag=${tag.toLowerCase().replace(' ', '-')}`}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Share */}
              <div className="mt-8 pt-6 border-t">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="font-semibold text-gray-700">Share this article:</span>
                  <div className="flex gap-2">
                    <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                      <Facebook className="h-5 w-5 text-gray-700" />
                    </button>
                    <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                      <Twitter className="h-5 w-5 text-gray-700" />
                    </button>
                    <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                      <Linkedin className="h-5 w-5 text-gray-700" />
                    </button>
                    <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                      <Link2 className="h-5 w-5 text-gray-700" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Author */}
              <div className="mt-10 p-6 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden">
                    <Image
                      src="https://placehold.co/80x80/120a32/fff"
                      alt={blogPost.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{blogPost.author}</h3>
                    <p className="text-gray-600">Content Creator</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-600">
                  {blogPost.author} is a content creator with expertise in digital marketing and technology. They help businesses improve their online presence through effective content strategies.
                </p>
              </div>

              {/* Navigation */}
              <div className="mt-10 flex items-center justify-between">
                <Button asChild variant="outline" className="flex items-center gap-2">
                  <Link href="/blog">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Blog
                  </Link>
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              {/* Author Card */}
              <Card className="mb-8">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative h-24 w-24 rounded-full overflow-hidden mb-4">
                      <Image
                        src="https://placehold.co/80x80/120a32/fff"
                        alt={blogPost.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="font-bold text-lg">{blogPost.author}</h3>
                    <p className="text-gray-600 mb-4">Content Creator</p>
                    <p className="text-sm text-gray-600">
                      Expert with a passion for helping businesses improve their online visibility through effective content strategies.
                    </p>
                    <Button asChild className="mt-4 bg-brand-teal hover:bg-brand-teal/90 text-white w-full">
                      <Link href="/blog">View All Posts</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Categories */}
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">Categories</h3>
                  <Separator className="mb-4" />
                  <ul className="space-y-2">
                    <li>
                      <Link href="/blog?category=digital-marketing" className="flex items-center justify-between text-gray-700 hover:text-brand-teal transition-colors">
                        <span>Digital Marketing</span>
                        <span className="bg-gray-100 px-2 py-1 text-xs rounded-full">24</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog?category=seo" className="flex items-center justify-between text-gray-700 hover:text-brand-teal transition-colors">
                        <span>SEO</span>
                        <span className="bg-gray-100 px-2 py-1 text-xs rounded-full">18</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog?category=web-development" className="flex items-center justify-between text-gray-700 hover:text-brand-teal transition-colors">
                        <span>Web Development</span>
                        <span className="bg-gray-100 px-2 py-1 text-xs rounded-full">15</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog?category=ui-ux-design" className="flex items-center justify-between text-gray-700 hover:text-brand-teal transition-colors">
                        <span>UI/UX Design</span>
                        <span className="bg-gray-100 px-2 py-1 text-xs rounded-full">12</span>
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-4">Related Articles</h3>
                    <Separator className="mb-4" />
                    <div className="space-y-4">
                      {relatedPosts.map((post, idx) => (
                        <div key={idx} className="flex gap-3">
                          <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={post.image}
                              alt={post.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm line-clamp-2">
                              <Link href={`/blog/${post.id}`} className="hover:text-brand-teal transition-colors">
                                {post.title}
                              </Link>
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">{post.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Enjoyed this article?</h2>
            <p className="text-gray-600 mb-8">
              Subscribe to our newsletter to receive the latest insights and tips on digital marketing, SEO, and web development.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-lg border border-gray-300 flex-grow focus:outline-none focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal"
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
          </div>
        </div>
      </section>
    </div>
  )
}