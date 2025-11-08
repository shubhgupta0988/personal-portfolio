import { BlogHeader } from "@/components/BlogHeader";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, ArrowLeft, Share2, Linkedin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CustomCursor } from "@/components/CustomCursor";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { TechNewsWidget } from "@/components/TechNewsWidget";

// Sample blog post data - in production, fetch from CMS or markdown files
const blogPosts: Record<string, any> = {
  "building-scalable-kafka-pipelines": {
    title: "Building Scalable Data Pipelines with Kafka",
    excerpt: "Lessons learned from deploying production Kafka workflows handling thousands of events per second",
    date: "2025-01-15",
    readTime: "8 min read",
    tags: ["Kafka", "Backend", "Architecture"],
    author: "Shubh Gupta",
    authorBio: "Graduate SDE at Fynd, building scalable systems",
    content: `
# Building Scalable Data Pipelines with Kafka

When building data pipelines that need to handle thousands of events per second, Apache Kafka becomes an invaluable tool. In this post, I'll share lessons learned from deploying production Kafka workflows.

## Why Kafka?

Kafka provides:
- **High throughput**: Handle millions of messages per second
- **Fault tolerance**: Replicated partitions ensure data safety
- **Scalability**: Horizontal scaling by adding brokers
- **Durability**: Configurable retention policies

## Architecture Overview

\`\`\`python
from kafka import KafkaProducer, KafkaConsumer
import json

# Producer setup
producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

# Send message
producer.send('events', {'user_id': 123, 'action': 'click'})
\`\`\`

## Partition Strategy

Choosing the right partition key is critical:

1. **User-based partitioning**: Ensures ordering per user
2. **Round-robin**: Maximum throughput, no ordering guarantee
3. **Hash-based**: Balance between ordering and distribution

## Monitoring & Observability

Key metrics to track:
- Consumer lag
- Broker CPU/memory
- Message throughput
- Partition distribution

## Production Lessons

### 1. Handle Backpressure
Always implement backpressure handling to prevent overwhelming downstream systems.

### 2. Idempotency is Key
Design consumers to be idempotent. Messages may be delivered more than once.

### 3. Monitor Consumer Lag
Consumer lag is your most important metric. Set up alerts when lag exceeds thresholds.

## Performance Tuning

\`\`\`javascript
// Consumer configuration for high throughput
const consumer = new Kafka().consumer({
  groupId: 'my-group',
  maxBytesPerPartition: 1048576, // 1MB
  sessionTimeout: 30000,
  heartbeatInterval: 3000
});
\`\`\`

## Conclusion

Kafka is powerful but requires careful planning. Focus on:
- Proper partitioning strategy
- Monitoring consumer lag
- Idempotent consumers
- Handling failures gracefully

In our production deployment, we achieved 5000+ events/sec with 99.9% reliability by following these principles.
    `
  }
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const post = slug ? blogPosts[slug] : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <BlogHeader />
        <main className="pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
            <Button onClick={() => navigate("/blog")} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleShare = (platform: string) => {
    const url = window.location.href;
    
    if (platform === "linkedin") {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <CustomCursor />
      <BlogHeader />
      
      {/* Modern Art Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.1] dark:opacity-[0.06]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="postLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(0 0% 55%)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="hsl(0 0% 40%)" stopOpacity="0.55" />
            </linearGradient>
          </defs>
          
          {/* Subtle diagonal lines */}
          {[...Array(4)].map((_, i) => {
            const Line = motion.line;
            return (
              <Line
                key={`post-line-${i}`}
                x1={`${(i * 20) % 100}%`}
                y1="0%"
                x2={`${((i * 20) + 20) % 100}%`}
                y2="100%"
                stroke="url(#postLineGradient)"
                strokeWidth="0.8"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1, 0.8, 1],
                  opacity: [0, 0.25, 0.15, 0.25],
                }}
                transition={{
                  duration: 5 + i * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              />
            );
          })}

          {/* Minimal geometric accent */}
          <motion.circle
            cx="88%"
            cy="12%"
            r="100"
            fill="none"
            stroke="hsl(0 0% 50%)"
            strokeWidth="1"
            opacity="0.12"
            initial={{ pathLength: 0 }}
            animate={{
              pathLength: [0, 1, 0.95, 1],
              opacity: [0.12, 0.2, 0.12],
              scale: [1, 1.1, 1],
            }}
            transition={{
              pathLength: { duration: 3 },
              opacity: { duration: 7, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 12, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        </svg>
      </div>
      
      <main className="pt-24 pb-16 relative z-10">
        <div className="px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Article Content */}
              <article className="lg:col-span-2">
                {/* Back Button */}
                <div className="mb-6">
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate("/blog")}
                    className="hover:text-blog"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blog
                  </Button>
                </div>

                {/* Article Header */}
                <div className="mb-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag: string, i: number) => (
                      <Badge key={i} className="bg-blog/10 text-blog hover:bg-blog/20">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                    {post.title}
                  </h1>

                  <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pb-6 border-b">
                    <div>
                      <p className="font-medium">{post.author}</p>
                      <p className="text-sm text-muted-foreground">{post.authorBio}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="icon" 
                        variant="outline"
                        onClick={() => handleShare("linkedin")}
                        aria-label="Share on LinkedIn"
                        className="hover:border-blog hover:text-blog"
                      >
                        <Linkedin className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="outline"
                        aria-label="Copy link"
                        className="hover:border-blog hover:text-blog"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Article Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
                  <ReactMarkdown
                    components={{
                      code({ node, inline, className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                          <SyntaxHighlighter
                            style={vscDarkPlus}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      }
                    }}
                  >
                    {post.content}
                  </ReactMarkdown>
                </div>
              </article>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div className="sticky top-24 space-y-8">
                  {/* Author Info */}
                  <Card className="p-6">
                    <h3 className="text-lg font-bold mb-4 pb-3 border-b">About the Author</h3>
                    <div>
                      <p className="font-semibold mb-1">{post.author}</p>
                      <p className="text-sm text-muted-foreground mb-4">{post.authorBio}</p>
                      <div className="flex gap-2">
                        <Button 
                          size="icon" 
                          variant="outline"
                          onClick={() => handleShare("linkedin")}
                          aria-label="Share on LinkedIn"
                          className="hover:border-blog hover:text-blog"
                        >
                          <Linkedin className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="outline"
                          aria-label="Copy link"
                          className="hover:border-blog hover:text-blog"
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>

                  {/* Related Posts */}
                  <Card className="p-6">
                    <h3 className="text-lg font-bold mb-4 pb-3 border-b">Related Posts</h3>
                    <div className="space-y-4">
                      <Link to="/blog/knowledge-graphs-rag" className="block group">
                        <div className="flex items-start gap-3">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold mb-1 group-hover:text-blog transition-colors line-clamp-2">
                              Knowledge Graphs for Document Retrieval
                            </h4>
                            <p className="text-xs text-muted-foreground mb-2">
                              How graph-based approaches outperform vector search...
                            </p>
                            <div className="flex gap-2">
                              <Badge variant="secondary" className="text-xs">Neo4j</Badge>
                              <Badge variant="secondary" className="text-xs">RAG</Badge>
                            </div>
                          </div>
                        </div>
                      </Link>
                      
                      <Link to="/blog/observability-production-systems" className="block group">
                        <div className="flex items-start gap-3">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold mb-1 group-hover:text-blog transition-colors line-clamp-2">
                              Observability in Production Systems
                            </h4>
                            <p className="text-xs text-muted-foreground mb-2">
                              Setting up monitoring, logging, and alerting...
                            </p>
                            <div className="flex gap-2">
                              <Badge variant="secondary" className="text-xs">DevOps</Badge>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </Card>

                  {/* Categories */}
                  <Card className="p-6">
                    <h3 className="text-lg font-bold mb-4 pb-3 border-b">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag: string, i: number) => (
                        <Badge key={i} variant="secondary" className="bg-blog/10 text-blog hover:bg-blog/20">
                          {tag}
                        </Badge>
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
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
