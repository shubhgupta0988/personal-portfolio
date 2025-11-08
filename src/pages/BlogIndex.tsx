import { BlogHeader } from "@/components/BlogHeader";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Search, ArrowRight } from "lucide-react";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CustomCursor } from "@/components/CustomCursor";
import { TechNewsWidget } from "@/components/TechNewsWidget";

const blogPosts = [
  {
    slug: "design-patterns-software-engineering",
    title: "Design Patterns in Software Engineering",
    excerpt: "A comprehensive guide to essential design patterns, their use cases, and practical implementations in modern software development.",
    date: "2025-11-10",
    readTime: "12 min read",
    tags: ["Design Patterns", "Software Engineering", "Architecture"],
    author: "Shubh Gupta",
    thumbnail: "/placeholder.svg"
  },
  {
    slug: "intermediate-git-concepts",
    title: "Intermediate Git Concepts Every Developer Should Know",
    excerpt: "Master advanced Git workflows including rebasing, cherry-picking, reflog, and collaborative strategies for team development.",
    date: "2025-11-08",
    readTime: "10 min read",
    tags: ["Git", "Version Control", "DevOps"],
    author: "Shubh Gupta",
    thumbnail: "/placeholder.svg"
  },
  {
    slug: "software-development-lifecycle",
    title: "Software Development Life Cycle: From Concept to Production",
    excerpt: "Understanding SDLC phases, methodologies, and best practices for delivering high-quality software efficiently.",
    date: "2025-11-05",
    readTime: "9 min read",
    tags: ["SDLC", "Software Engineering", "Project Management"],
    author: "Shubh Gupta",
    thumbnail: "/placeholder.svg"
  },
  {
    slug: "observability-signals-monitoring",
    title: "Observability Signals: Metrics, Logs, and Traces",
    excerpt: "Deep dive into the three pillars of observability and how to effectively implement monitoring, logging, and distributed tracing.",
    date: "2025-11-03",
    readTime: "11 min read",
    tags: ["Observability", "Monitoring", "DevOps"],
    author: "Shubh Gupta",
    thumbnail: "/placeholder.svg"
  },
  {
    slug: "kafka-zookeeper-producers-consumers",
    title: "Kafka Deep Dive: Zookeeper, Producers, and Consumers",
    excerpt: "Understanding Apache Kafka's architecture, Zookeeper's role, and best practices for building robust producer and consumer applications.",
    date: "2025-11-01",
    readTime: "14 min read",
    tags: ["Kafka", "Distributed Systems", "Backend"],
    author: "Shubh Gupta",
    thumbnail: "/placeholder.svg"
  },
  {
    slug: "multi-tenant-systems-config-driven-design",
    title: "Multi-Tenant Systems and Config-Driven Design",
    excerpt: "Building scalable multi-tenant architectures with configuration-driven approaches for isolation, customization, and resource management.",
    date: "2025-10-28",
    readTime: "13 min read",
    tags: ["Architecture", "Multi-Tenancy", "System Design"],
    author: "Shubh Gupta",
    thumbnail: "/placeholder.svg"
  }
];

const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

const BlogIndex = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesTag = !selectedTag || post.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <CustomCursor />
      <BlogHeader />
      
      {/* Modern Art Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.12] dark:opacity-[0.08]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="blogLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(0 0% 55%)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="hsl(0 0% 40%)" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          
          {/* Diagonal lines */}
          {[...Array(6)].map((_, i) => {
            const Line = motion.line;
            return (
              <Line
                key={`blog-line-${i}`}
                x1={`${(i * 15) % 100}%`}
                y1="0%"
                x2={`${((i * 15) + 25) % 100}%`}
                y2="100%"
                stroke="url(#blogLineGradient)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1, 0.7, 1],
                  opacity: [0, 0.3, 0.2, 0.3],
                }}
                transition={{
                  duration: 4 + i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.15,
                }}
              />
            );
          })}

          {/* Geometric shapes */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.rect
              x="5%"
              y="15%"
              width="180"
              height="180"
              fill="none"
              stroke="hsl(0 0% 50%)"
              strokeWidth="1.5"
              opacity="0.15"
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: 1,
                rotate: [0, 30, 0],
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{
                pathLength: { duration: 2.5 },
                rotate: { duration: 15, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 5, repeat: Infinity, ease: "easeInOut" },
              }}
              style={{ transformOrigin: "50% 50%" }}
            />

            <motion.circle
              cx="92%"
              cy="25%"
              r="120"
              fill="none"
              stroke="hsl(0 0% 50%)"
              strokeWidth="1.5"
              opacity="0.15"
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: [0, 1, 0.9, 1],
                opacity: [0.15, 0.25, 0.15],
                scale: [1, 1.15, 1],
              }}
              transition={{
                pathLength: { duration: 2.5, delay: 0.4 },
                opacity: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
              }}
            />
          </motion.g>
        </svg>
      </div>
      
      <main className="pt-24 pb-16 relative z-10">
        {/* Hero Section */}
        <section className="px-4 mb-20 relative overflow-hidden">
          {/* Animated Gradient Background */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute inset-0 opacity-30 dark:opacity-20"
              animate={{
                background: [
                  "radial-gradient(circle at 20% 30%, hsl(252 79% 64% / 0.3), transparent 50%)",
                  "radial-gradient(circle at 80% 70%, hsl(252 79% 50% / 0.3), transparent 50%)",
                  "radial-gradient(circle at 50% 50%, hsl(252 79% 64% / 0.3), transparent 50%)",
                  "radial-gradient(circle at 20% 30%, hsl(252 79% 64% / 0.3), transparent 50%)",
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[
              { size: 6, left: 10, top: 20, lightness: 65, delay: 0, duration: 3.5, xOffset: -5 },
              { size: 8, left: 85, top: 15, lightness: 70, delay: 0.3, duration: 4, xOffset: 8 },
              { size: 5, left: 20, top: 60, lightness: 68, delay: 0.6, duration: 3.2, xOffset: -8 },
              { size: 7, left: 75, top: 55, lightness: 72, delay: 0.9, duration: 3.8, xOffset: 6 },
              { size: 6, left: 45, top: 30, lightness: 66, delay: 1.2, duration: 3.6, xOffset: -7 },
              { size: 9, left: 90, top: 70, lightness: 74, delay: 1.5, duration: 4.2, xOffset: 9 },
              { size: 5, left: 15, top: 80, lightness: 64, delay: 1.8, duration: 3.3, xOffset: -6 },
              { size: 7, left: 60, top: 10, lightness: 69, delay: 2.1, duration: 3.7, xOffset: 7 },
              { size: 6, left: 30, top: 45, lightness: 67, delay: 2.4, duration: 3.4, xOffset: -9 },
              { size: 8, left: 70, top: 85, lightness: 71, delay: 2.7, duration: 4.1, xOffset: 5 },
              { size: 5, left: 50, top: 75, lightness: 65, delay: 3.0, duration: 3.5, xOffset: -8 },
              { size: 7, left: 25, top: 40, lightness: 73, delay: 3.3, duration: 3.9, xOffset: 6 },
            ].map((particle, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  background: `hsl(252 79% ${particle.lightness}%)`,
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  opacity: 0.4,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, particle.xOffset, 0],
                  opacity: [0.4, 0.8, 0.4],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: particle.delay,
                }}
              />
            ))}
          </div>

          {/* Decorative Code Brackets */}
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <motion.div
              className="absolute left-10 top-1/4 text-6xl font-mono text-blog"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 0.1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {"{"}
            </motion.div>
            <motion.div
              className="absolute right-10 bottom-1/4 text-6xl font-mono text-blog"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 0.1, x: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              {"}"}
            </motion.div>
          </div>

          <div className="container mx-auto max-w-5xl text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.2, 0.9, 0.3, 1] }}
            >
              {/* Animated Icon */}
              <motion.div
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blog/20 to-blog/5 mb-8 relative"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2,
                }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-blog/20"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.span
                  className="text-4xl relative z-10"
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  ✍️
                </motion.span>
              </motion.div>

              {/* Animated Title */}
              <motion.h1
                className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.2, 0.9, 0.3, 1] }}
              >
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Thoughts in{" "}
                </motion.span>
                <motion.span
                  className="text-blog relative inline-block"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <motion.span
                    className="relative z-10"
                    animate={{
                      backgroundPosition: ["0%", "100%", "0%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      background: "linear-gradient(135deg, hsl(252 79% 64%), hsl(252 79% 50%), hsl(252 79% 64%))",
                      backgroundSize: "200% 200%",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Code
                  </motion.span>
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-blog rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
                  />
                </motion.span>
              </motion.h1>

              {/* Animated Description */}
              <motion.p
                className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: [0.2, 0.9, 0.3, 1] }}
              >
                Writing about systems, architecture, and engineering practices
              </motion.p>

              {/* Animated Underline */}
              <motion.div
                className="h-1 bg-gradient-to-r from-transparent via-blog to-transparent rounded-full mx-auto"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 120, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
              />

              {/* Decorative Dots */}
              <div className="flex items-center justify-center gap-2 mt-8">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-blog"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.9 + i * 0.1,
                      repeat: Infinity,
                      repeatType: "reverse",
                      repeatDelay: 1,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Content with Sidebar */}
        <section className="px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content - 2 columns */}
              <div className="lg:col-span-2">
                {/* Search & Filter */}
                <div className="mb-8">
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search posts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={selectedTag === null ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTag(null)}
                      className={selectedTag === null ? "bg-blog hover:bg-blog/90" : ""}
                    >
                      All
                    </Button>
                    {allTags.map(tag => (
                      <Button
                        key={tag}
                        variant={selectedTag === tag ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTag(tag)}
                        className={selectedTag === tag ? "bg-blog hover:bg-blog/90" : ""}
                      >
                        {tag}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Posts List */}
                {filteredPosts.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-muted-foreground">No posts found matching your criteria.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {filteredPosts.map((post, index) => (
                      <motion.div
                        key={post.slug}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: index * 0.05 }}
                      >
                        <Card className="overflow-hidden hover-lift transition-all duration-200 hover:shadow-large border-l-4 border-l-blog group cursor-pointer">
                          <Link to={`/blog/${post.slug}`} className="block">
                            <div className="p-6">
                              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {new Date(post.date).toLocaleDateString('en-US', { 
                                    month: 'short', 
                                    day: 'numeric', 
                                    year: 'numeric' 
                                  })}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {post.readTime}
                                </span>
                              </div>

                              <h2 className="text-2xl font-bold mb-3 group-hover:text-blog transition-colors">
                                {post.title}
                              </h2>

                              <p className="text-muted-foreground mb-4 leading-relaxed">
                                {post.excerpt}
                              </p>

                              <div className="flex flex-wrap gap-2 mb-4">
                                {post.tags.map((tag, i) => (
                                  <Badge key={i} variant="secondary" className="bg-blog/10 text-blog hover:bg-blog/20">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>

                              <div className="flex items-center text-sm font-medium text-blog group-hover:gap-2 transition-all">
                                Read more
                                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          </Link>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div className="sticky top-24 space-y-8">
                  {/* Recent Posts */}
                  <Card className="p-6">
                    <h3 className="text-lg font-bold mb-4 pb-3 border-b">Recent Posts</h3>
                    <div className="space-y-4">
                      {blogPosts.slice(0, 5).map((post) => (
                        <Link
                          key={post.slug}
                          to={`/blog/${post.slug}`}
                          className="block group"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-semibold mb-1 group-hover:text-blog transition-colors line-clamp-2">
                                {post.title}
                              </h4>
                              <p className="text-xs text-muted-foreground">
                                {new Date(post.date).toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric' 
                                })}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </Card>

                  {/* Categories/Tags */}
                  <Card className="p-6">
                    <h3 className="text-lg font-bold mb-4 pb-3 border-b">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {allTags.map(tag => (
                        <Button
                          key={tag}
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedTag(tag)}
                          className={`text-xs ${
                            selectedTag === tag 
                              ? "bg-blog text-blog-foreground border-blog" 
                              : "hover:border-blog hover:text-blog"
                          }`}
                        >
                          {tag}
                        </Button>
                      ))}
                    </div>
                  </Card>

                  {/* Tech News Widget */}
                  <TechNewsWidget max={5} />

                  {/* Newsletter */}
                  <Card className="p-6 bg-gradient-to-br from-blog/5 to-blog/10 border-blog/20">
                    <h3 className="text-lg font-bold mb-2">Stay Updated</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Get notified when I publish new posts.
                    </p>
                    <div className="space-y-3">
                      <Input 
                        type="email" 
                        placeholder="your@email.com"
                        className="w-full"
                      />
                      <Button className="w-full bg-blog hover:bg-blog/90 text-blog-foreground">
                        Subscribe
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      No spam, unsubscribe anytime.
                    </p>
                  </Card>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogIndex;
