"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { supabase, TABLES } from "@/lib/supabase"

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  //const [loadingAction, setLoadingAction] = useState(false)
  interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    readTime: string;
    categories: string[];
    tags: string[];
    image: string;
    featured: boolean;
  }

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  interface Subscriber {
    id: string;
    email: string;
    date: string;
  }
  
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])


  // New blog post state
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
const [editForm, setEditForm] = useState({ title: "", excerpt: "", content: "" });
const [loadingAction, setLoadingAction] = useState(false);

function startEditing(post: BlogPost) {
  setEditingPostId(post.id);
  setEditForm({ title: post.title, excerpt: post.excerpt, content: post.content });
}

function cancelEditing() {
  setEditingPostId(null);
  setEditForm({ title: "", excerpt: "", content: "" });
}

async function saveEdit(id: string) {
  setLoadingAction(true);
  interface BlogPostUpdate {
    title?: string;
    excerpt?: string;
    content?: string;
    author?: string;
    categories?: string[];
    tags?: string[];
    image?: string;
    featured?: boolean;
  }

  const handleUpdatePost = async (id: string, updatedData: BlogPostUpdate) => {
    try {
      if (!supabase) {
        throw new Error("Database not configured");
      }

      const { error } = await supabase
        .from(TABLES.BLOG_POSTS)
        .update(updatedData)
        .eq('id', id);

      if (error) {
        throw error;
      }

      // Refresh blog posts
      await fetchBlogPosts();
      toast.success("Post updated successfully");
    } catch (error) {
      console.error("Error updating post:", error);
      if (error instanceof Error) {
        toast.error("Failed to update post. " + error.message);
      } else {
        toast.error("Failed to update post. Please try again.");
      }
    }
  };

  await handleUpdatePost(id, editForm);
  setEditingPostId(null);
  setLoadingAction(false);
}

  //new blog post state

  // Form state for new blog post
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    categories: "",
    tags: "",
    imageUrl: "https://placehold.co/800x450/48b899/fff" // Default image
  })

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true"
      setIsAuthenticated(isLoggedIn)

      if (!isLoggedIn) {
        router.push("/admin")
        return
      }

      // Fetch data from Supabase
      try {
        await fetchBlogPosts()
        await fetchSubscribers()
      } catch (error) {
        console.error("Error fetching data:", error)
        toast.error("Failed to load data from the database")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  // Fetch blog posts from Supabase
  const fetchBlogPosts = async () => {
    try {
      // Check if Supabase URL and key are configured
      if (!supabase) {
        console.warn("Supabase client not initialized properly")

        // Fallback to localStorage if Supabase is not configured
        const savedPosts = localStorage.getItem("blogPosts")
        if (savedPosts) {
          setBlogPosts(JSON.parse(savedPosts))
        }
        return
      }

      const { data, error } = await supabase
        .from(TABLES.BLOG_POSTS)
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        throw error
      }

      if (data) {
        // Transform the data structure to match our expected format
        const formattedPosts = data.map(post => ({
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

        setBlogPosts(formattedPosts)
      }
    } catch (error) {
      console.error("Error fetching blog posts:", error)
      toast.error("Failed to load blog posts from the database")

      // Fallback to localStorage
      const savedPosts = localStorage.getItem("blogPosts")
      if (savedPosts) {
        setBlogPosts(JSON.parse(savedPosts))
      }
    }
  }

  // Fetch subscribers from Supabase
  const fetchSubscribers = async () => {
    try {
      // Check if Supabase URL and key are configured
      if (!supabase) {
        console.warn("Supabase client not initialized properly")

        // Fallback to localStorage if Supabase is not configured
        const savedSubscribers = localStorage.getItem("subscribers")
        if (savedSubscribers) {
          setSubscribers(JSON.parse(savedSubscribers))
        }
        return
      }

      const { data, error } = await supabase
        .from(TABLES.SUBSCRIBERS)
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        throw error
      }

      if (data) {
        // Transform the data structure to match our expected format
        const formattedSubscribers = data.map(sub => ({
          id: sub.id,
          email: sub.email,
          date: new Date(sub.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          })
        }))

        setSubscribers(formattedSubscribers)
      }
    } catch (error) {
      console.error("Error fetching subscribers:", error)
      toast.error("Failed to load subscribers from the database")

      // Fallback to localStorage
      const savedSubscribers = localStorage.getItem("subscribers")
      if (savedSubscribers) {
        setSubscribers(JSON.parse(savedSubscribers))
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoadingAction(true)

    try {
      // Process categories and tags into arrays
      const categoriesArray = formData.categories.split(",").map(cat => cat.trim())
      const tagsArray = formData.tags.split(",").map(tag => tag.trim())

      // Calculate read time
      const readTime = `${Math.max(3, Math.ceil(formData.content.length / 1000))} min read`

      // Current date
      const currentDate = new Date()

      // Prepare the blog post object for Supabase
      const blogPost = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        author: formData.author || "Admin",
        date: currentDate.toISOString(),
        read_time: readTime,
        categories: categoriesArray,
        tags: tagsArray,
        image: formData.imageUrl,
        featured: false,
        created_at: currentDate.toISOString(),
        updated_at: currentDate.toISOString()
      }

      // Check if Supabase is properly configured
      if (!supabase) {
        throw new Error("Database not configured")
      }

      // Insert the blog post into Supabase
      const { data, error } = await supabase
        .from(TABLES.BLOG_POSTS)
        .insert(blogPost)
        .select()

      if (error) {
        throw error
      }

      // Refresh blog posts
      await fetchBlogPosts()

      // Reset form
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        author: "",
        categories: "",
        tags: "",
        imageUrl: "https://placehold.co/800x450/48b899/fff"
      })

      toast.success("Blog post created successfully!")
    } catch (error) {
      console.error("Error creating blog post:", error)
      if (error instanceof Error) {
        toast.error("Failed to create blog post. " + error.message);
      } else {
        toast.error("Failed to create blog post. Please try again.");
      }

      // Fallback to localStorage if Supabase fails
      try {
        // Create a new blog post for localStorage
        const newPost = {
          id: Date.now().toString(),
          title: formData.title,
          excerpt: formData.excerpt,
          content: formData.content,
          author: formData.author || "Admin",
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          }),
          readTime: `${Math.max(3, Math.ceil(formData.content.length / 1000))} min read`,
          categories: formData.categories.split(",").map(cat => cat.trim()),
          tags: formData.tags.split(",").map(tag => tag.trim()),
          image: formData.imageUrl,
          featured: false
        }

        // Add to blogPosts state
        const updatedPosts = [...blogPosts, newPost]
        setBlogPosts(updatedPosts)

        // Save to localStorage
        localStorage.setItem("blogPosts", JSON.stringify(updatedPosts))

        // Reset form
        setFormData({
          title: "",
          excerpt: "",
          content: "",
          author: "",
          categories: "",
          tags: "",
          imageUrl: "https://placehold.co/800x450/48b899/fff"
        })

        toast.success("Blog post saved to local storage instead.")
      } catch (localError) {
        console.error("Error saving to localStorage:", localError)
        toast.error("Failed to save blog post.")
      }
    } finally {
      setLoadingAction(false)
    }
  }

  const handleDeletePost = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) {
      return
    }

    setLoadingAction(true)

    try {
      if (!supabase) {
        throw new Error("Database not configured")
      }

      const { error } = await supabase
        .from(TABLES.BLOG_POSTS)
        .delete()
        .eq('id', postId)

      if (error) {
        throw error
      }

      // Refresh blog posts
      await fetchBlogPosts()
      toast.success("Post deleted successfully")
    } catch (error) {
      console.error("Error deleting post:", error)
      const errorMessage = error instanceof Error ? error.message : "Please try again.";
      toast.error("Failed to delete post. " + errorMessage);

      // Fallback to localStorage
      try {
        const updatedPosts = blogPosts.filter(p => p.id !== postId)
        setBlogPosts(updatedPosts)
        localStorage.setItem("blogPosts", JSON.stringify(updatedPosts))
        toast.success("Post deleted from local storage.")
      } catch (localError) {
        console.error("Error deleting from localStorage:", localError)
      }
    } finally {
      setLoadingAction(false)
    }
  }

  const handleDeleteSubscriber = async (subscriberId: string) => {
    if (!confirm("Are you sure you want to remove this subscriber?")) {
      return
    }

    setLoadingAction(true)

    try {
      if (!supabase) {
        throw new Error("Database not configured")
      }

      const { error } = await supabase
        .from(TABLES.SUBSCRIBERS)
        .delete()
        .eq('id', subscriberId)

      if (error) {
        throw error
      }

      // Refresh subscribers
      await fetchSubscribers()
      toast.success("Subscriber removed successfully")
    } catch (error) {
      console.error("Error removing subscriber:", error)
      if (error instanceof Error) {
        toast.error("Failed to remove subscriber. " + error.message);
      } else {
        toast.error("Failed to remove subscriber. Please try again.");
      }

      // Fallback to localStorage
      try {
        const updatedSubscribers = subscribers.filter(s => s.id !== subscriberId)
        setSubscribers(updatedSubscribers)
        localStorage.setItem("subscribers", JSON.stringify(updatedSubscribers))
        toast.success("Subscriber removed from local storage.")
      } catch (localError) {
        console.error("Error removing from localStorage:", localError)
      }
    } finally {
      setLoadingAction(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn")
    router.push("/admin")
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Router will redirect to login
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button onClick={handleLogout} variant="outline">Logout</Button>
      </div>

      <Tabs defaultValue="create-post" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="create-post">Create Blog Post</TabsTrigger>
          <TabsTrigger value="manage-posts">Manage Posts ({blogPosts.length})</TabsTrigger>
          <TabsTrigger value="subscribers">Subscribers ({subscribers.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="create-post">
          <Card>
            <CardHeader>
              <CardTitle>Create New Blog Post</CardTitle>
              <CardDescription>
                Fill out the form below to create a new blog post for your website.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter blog post title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    placeholder="Enter a brief summary of the post"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <div className="border rounded-md p-2 bg-gray-50">
                    <p className="text-sm text-gray-500 mb-2">
                      You can use HTML tags for formatting. The content will be displayed as a full blog page when users click on the blog card.
                    </p>
                  </div>
                  <Textarea
                    id="content"
                    name="content"
                    placeholder="Enter the full blog post content with HTML formatting if needed"
                    className="min-h-[300px] font-mono text-sm"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      name="author"
                      placeholder="Enter author name"
                      value={formData.author}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="imageUrl">Image URL</Label>
                    <Input
                      id="imageUrl"
                      name="imageUrl"
                      placeholder="Enter image URL"
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="categories">Categories (comma-separated)</Label>
                    <Input
                      id="categories"
                      name="categories"
                      placeholder="e.g. Digital Marketing, SEO"
                      value={formData.categories}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                    <Input
                      id="tags"
                      name="tags"
                      placeholder="e.g. SEO, Marketing, Content"
                      value={formData.tags}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="bg-brand-teal hover:bg-brand-teal/90"
                  disabled={loadingAction}
                >
                  {loadingAction ? "Creating..." : "Create Post"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="manage-posts">
  <Card>
    <CardHeader>
      <CardTitle>Manage Blog Posts</CardTitle>
      <CardDescription>
        View and manage all your blog posts
      </CardDescription>
    </CardHeader>
    <CardContent>
      {blogPosts.length === 0 ? (
        <p className="text-center py-8 text-gray-500">No blog posts found. Create your first post!</p>
      ) : (
        <div className="space-y-4">
          {blogPosts.map((post) => (
            <div key={post.id} className="border rounded-lg p-4">
              {editingPostId === post.id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="input w-full"
                    placeholder="Title"
                  />
                  <input
                    type="text"
                    value={editForm.excerpt}
                    onChange={(e) => setEditForm({ ...editForm, excerpt: e.target.value })}
                    className="input w-full"
                    placeholder="Excerpt"
                  />
                  <textarea
                    value={editForm.content}
                    onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                    className="textarea w-full min-h-[200px] font-mono text-sm"
                    placeholder="Content (HTML formatting supported)"
                  />
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" onClick={() => saveEdit(post.id)}>Save</Button>
                    <Button variant="outline" size="sm" onClick={cancelEditing}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between">
                    <h3 className="font-bold">{post.title}</h3>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => startEditing(post)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                      >
                        <Link href={`/blog/${post.id}`} target="_blank">Preview</Link>
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeletePost(post.id)}
                        disabled={loadingAction}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {post.date} • {post.readTime} • Categories: {Array.isArray(post.categories) ? post.categories.join(", ") : post.categories}
                  </p>
                  <p className="mt-2 text-gray-700">{post.excerpt}</p>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </CardContent>
  </Card>
</TabsContent>


        <TabsContent value="subscribers">
          <Card>
            <CardHeader>
              <CardTitle>Email Subscribers</CardTitle>
              <CardDescription>
                Manage your newsletter subscribers
              </CardDescription>
            </CardHeader>
            <CardContent>
              {subscribers.length === 0 ? (
                <p className="text-center py-8 text-gray-500">No subscribers yet. They will appear here when users subscribe.</p>
              ) : (
                <div className="space-y-4">
                  <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Subscribed</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {subscribers.map((subscriber) => (
                          <tr key={subscriber.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{subscriber.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{subscriber.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Button
                                variant="destructive"
                                size="sm"
                                disabled={loadingAction}
                                onClick={() => handleDeleteSubscriber(subscriber.id)}
                              >
                                Remove
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Database Connection Status */}
      <div className="mt-8 border-t pt-6">
        <p className="text-sm text-gray-500">
          Database Connection: {supabase ? (
            <span className="text-green-500 font-medium">Connected to Supabase</span>
          ) : (
            <span className="text-red-500 font-medium">Not connected, using local storage</span>
          )}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          To set up database connection, provide your Supabase credentials in the .env.local file
        </p>
      </div>
    </div>
  )
}
