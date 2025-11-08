import { Card } from "./ui/card";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Button } from "./ui/button";

const blogPosts = [
  {
    title: "Building Scalable Data Pipelines with Kafka",
    excerpt: "Lessons learned from deploying production Kafka workflows handling thousands of events per second",
    date: "2025-01-15",
    readTime: "8 min read",
    tags: ["Kafka", "Backend", "Architecture"]
  },
  {
    title: "Knowledge Graphs for Document Retrieval",
    excerpt: "How graph-based approaches outperform vector search for complex relationship queries",
    date: "2025-01-10",
    readTime: "6 min read",
    tags: ["Neo4j", "RAG", "AI"]
  },
  {
    title: "Observability in Production Systems",
    excerpt: "Setting up monitoring, logging, and alerting for mission-critical services",
    date: "2025-01-05",
    readTime: "7 min read",
    tags: ["DevOps", "Monitoring"]
  }
];

export const Blog = () => {
  return (
    <section id="blog" className="py-24 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">Thoughts in Code</h2>
          <p className="text-muted-foreground max-w-2xl">
            Writing about systems, architecture, and engineering practices
          </p>
          <div className="h-1 w-20 bg-blog rounded-full mt-4"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8 animate-fade-in">
          {blogPosts.map((post, index) => (
            <Card 
              key={index} 
              className="p-6 hover-lift transition-all duration-300 hover:shadow-large border-t-4 border-t-blog group cursor-pointer"
            >
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readTime}
                </span>
              </div>

              <h3 className="text-lg font-bold mb-2 group-hover:text-blog transition-colors">
                {post.title}
              </h3>

              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, i) => (
                  <span key={i} className="text-xs px-2 py-1 rounded-full bg-blog/10 text-blog font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center text-sm font-medium text-blog group-hover:gap-2 transition-all">
                Read more
                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <a href="/blog">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-blog text-blog hover:bg-blog hover:text-blog-foreground"
            >
              Explore the Blog
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};
