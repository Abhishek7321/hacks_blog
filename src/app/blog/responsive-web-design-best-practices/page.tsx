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

// Blog post data
const blogPost = {
  title: "Responsive Web Design Best Practices : Staying Ahead in the Digital Race",
  excerpt: "Discover the most effective Web Design methods that are working in 2023 to improve your website's visibility and organic traffic.",
  image: "/hacks_v5_images/blog_2.png",
  author: "Rahul Joshi",
  authorTitle: "Full-Stack Developer",
  authorImage: "https://placehold.co/80x80/120a32/fff",
  date: "June 15, 2023",
  readTime: "8 min read",
  categories: ["Digital Marketing", "Web Development", "SEO"],
  tags: ["SEO", "Digital Marketing", "Content Strategy", "Keyword Research", "Link Building", "Technical SEO"]
}

// Related posts
const relatedPosts = [
  {
    id: "ai-digital-marketing",
    title: "How AI is Transforming Digital Marketing Strategies",
    excerpt: "Explore the revolutionary impact of artificial intelligence on modern marketing practices...",
    image: "https://placehold.co/800x450/120a32/fff",
    author: "Emma Watson",
    date: "March 22, 2023"
  },
  {
    id: "ecommerce-conversion-optimization",
    title: "E-commerce Conversion Rate Optimization: Turning Visitors into Customers",
    excerpt: "Practical techniques to enhance your online store's user experience and boost...",
    image: "https://placehold.co/800x450/48b899/fff",
    author: "David Wilson",
    date: "February 15, 2023"
  },
  {
    id: "content-marketing-strategy-guide",
    title: "The Ultimate Content Marketing Strategy Guide for 2023",
    excerpt: "Learn how to create and implement a content marketing strategy that drives results...",
    image: "https://placehold.co/800x450/d4585d/fff",
    author: "Jennifer Adams",
    date: "May 10, 2023"
  }
]

export default function BlogPostPage() {
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
              <span className="text-brand-teal">UI&UX</span>
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
                <span>{blogPost.readTime}</span>
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
              <div className="prose max-w-none">
                <p className="text-lg font-medium leading-relaxed text-gray-700 mb-6">
                  In the ever-evolving digital landscape, staying ahead of SEO trends is crucial for businesses looking to maintain and improve their online visibility. As search engines refine their algorithms and user behavior shifts, the strategies that worked yesterday might not be as effective today.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">1. User Experience is Now a Ranking Factor</h2>
                <p>
                  With Google's Core Web Vitals now firmly established as ranking factors, the technical aspects of how your website performs for users have never been more important. Page loading speed, interactivity, and visual stability all contribute to your site's overall user experience, which directly impacts your search rankings.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg my-6">
                  <h3 className="text-xl font-semibold mb-3">Key Technical Factors to Optimize:</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Largest Contentful Paint (LCP): Aim for under 2.5 seconds</li>
                    <li>First Input Delay (FID): Keep it below 100 milliseconds</li>
                    <li>Cumulative Layout Shift (CLS): Maintain a score of less than 0.1</li>
                    <li>Mobile-friendly design and responsive layouts</li>
                    <li>Secure browsing (HTTPS implementation)</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4">2. Content Quality Over Quantity</h2>
                <p>
                  While consistent content creation remains important, Google's helpful content update has placed even greater emphasis on creating material that genuinely serves users rather than just search engines. Content that demonstrates expertise, authoritativeness, and trustworthiness (E-A-T) continues to gain favor in search rankings.
                </p>
                <p>
                  Focus on creating in-depth, well-researched content that addresses specific user needs and questions. Rather than producing numerous shallow articles, invest in comprehensive resources that thoroughly cover topics relevant to your audience.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">3. Semantic Search and Intent Optimization</h2>
                <p>
                  Search engines have grown increasingly sophisticated in understanding context and user intent behind searches. In 2023, keyword optimization goes beyond exact match keywords to include:
                </p>
                <ul className="list-disc list-inside space-y-2 my-4">
                  <li>Topic clusters rather than isolated keywords</li>
                  <li>Natural language optimization for voice search</li>
                  <li>Entity relationships and contextual relevance</li>
                  <li>Intent matching for informational, navigational, and transactional queries</li>
                </ul>

                <div className="my-8 p-6 border-l-4 border-brand-teal bg-brand-teal/5">
                  <p className="italic text-lg">
                    "The most successful SEO strategies in 2023 focus not just on what users are searching for, but why they're searching for it. Understanding search intent is the foundation of effective optimization."
                  </p>
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4">4. Link Building with a Focus on Relevance</h2>
                <p>
                  Link building remains a critical ranking factor, but the emphasis has shifted decidedly toward quality and relevance over quantity. A few high-quality, contextually relevant backlinks from authoritative sites in your industry now carry more weight than dozens of low-quality links.
                </p>
                <p>
                  Focus on creating linkable assets—comprehensive guides, original research, infographics, or tools—that naturally attract links from relevant sources. Build relationships within your industry to create opportunities for genuine, editorial links rather than artificial link schemes.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">5. Local SEO Optimization</h2>
                <p>
                  For businesses with physical locations or those serving specific geographic areas, local SEO has become increasingly important. With the rise of "near me" searches and Google's continued refinement of local search results, optimizing for local visibility offers significant opportunities.
                </p>
                <p>
                  Key local SEO strategies include:
                </p>
                <ul className="list-disc list-inside space-y-2 my-4">
                  <li>Claiming and optimizing Google Business Profile</li>
                  <li>Consistent NAP (Name, Address, Phone) information across the web</li>
                  <li>Local keyword optimization in title tags and content</li>
                  <li>Local link building and citations</li>
                  <li>Collecting and responding to customer reviews</li>
                </ul>

                <h2 className="text-2xl font-bold mt-8 mb-4">6. AI and Machine Learning in SEO</h2>
                <p>
                  The integration of AI in search algorithms has transformed how content is indexed and ranked. Google's BERT and MUM updates have significantly enhanced the search engine's ability to understand natural language and complex queries.
                </p>
                <p>
                  For SEO practitioners, this means:
                </p>
                <ul className="list-disc list-inside space-y-2 my-4">
                  <li>Creating content that addresses topics comprehensively rather than optimizing for specific keywords</li>
                  <li>Using natural, conversational language that answers specific questions</li>
                  <li>Structuring content with clear headings and organized information to aid machine understanding</li>
                  <li>Leveraging schema markup to provide explicit context to search engines</li>
                </ul>

                <h2 className="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
                <p>
                  The SEO landscape of 2023 rewards websites that prioritize genuine user value, technical excellence, and authentic authority. By focusing on these key areas—technical performance, content quality, semantic search understanding, relevant link building, local optimization, and adaptation to AI advancements—businesses can develop a sustainable SEO strategy that delivers results in this increasingly competitive digital environment.
                </p>
                <p>
                  Remember that SEO is not about quick wins but building a solid foundation for long-term organic growth. Invest time in understanding your audience's needs and search behaviors, and develop content and experiences that genuinely serve those requirements. In doing so, you'll not only improve your search rankings but also build a more valuable online presence for your customers.
                </p>
              </div>

              {/* Tags */}
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
                      src={blogPost.authorImage}
                      alt={blogPost.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{blogPost.author}</h3>
                    <p className="text-gray-600">{blogPost.authorTitle}</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-600">
                  Sarah is an SEO specialist with over 8 years of experience in digital marketing. She helps businesses improve their online visibility and drive organic traffic through effective search optimization strategies.
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
                <div className="flex gap-2">
                  <Button variant="outline" disabled>Previous Post</Button>
                  <Button variant="outline">Next Post</Button>
                </div>
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
                        src={blogPost.authorImage}
                        alt={blogPost.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="font-bold text-lg">{blogPost.author}</h3>
                    <p className="text-gray-600 mb-4">{blogPost.authorTitle}</p>
                    <p className="text-sm text-gray-600">
                      SEO expert with a passion for helping businesses improve their online visibility through effective search optimization strategies.
                    </p>
                    <Button className="mt-4 bg-brand-teal hover:bg-brand-teal/90 text-white w-full">
                      View All Posts
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
                    <li>
                      <Link href="/blog?category=cyber-security" className="flex items-center justify-between text-gray-700 hover:text-brand-teal transition-colors">
                        <span>Cyber Security</span>
                        <span className="bg-gray-100 px-2 py-1 text-xs rounded-full">9</span>
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Popular Tags */}
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">Popular Tags</h3>
                  <Separator className="mb-4" />
                  <div className="flex flex-wrap gap-2">
                    {[
                      "SEO", "Marketing", "Web Design", "Content",
                      "Social Media", "Analytics", "E-commerce",
                      "UX", "Performance", "Security"
                    ].map((tag, idx) => (
                      <Link
                        key={idx}
                        href={`/blog?tag=${tag.toLowerCase().replace(' ', '-')}`}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Related Posts */}
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
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-lg border border-gray-300 flex-grow focus:outline-none focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal"
              />
              <Button className="bg-brand-teal hover:bg-brand-teal/90 text-white whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
