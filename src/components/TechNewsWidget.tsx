import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { ExternalLink, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface Article {
  title: string;
  description: string;
  url: string;
  source: string;
  image: string | null;
  publishedAt: string;
}

export const TechNewsWidget = ({ max = 5 }: { max?: number }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadNews() {
      try {
        // Call our API endpoint (or proxy)
        const res = await fetch("/api/tech-news");
        
        if (!res.ok) {
          const errorText = await res.text();
          console.error("API response not OK:", res.status, errorText);
          throw new Error(`Failed to fetch tech news: ${res.status}`);
        }

        const data = await res.json();
        console.log("Tech news API response:", data);
        
        if (!mounted) return;

        if (data.error) {
          throw new Error(data.error);
        }

        // Normalize the response (handle both direct GNews response and our normalized format)
        let articles: Article[] = [];
        if (data.articles && Array.isArray(data.articles)) {
          articles = data.articles.map((a: any) => ({
            title: a.title || "No title",
            description: a.description || "",
            url: a.url || "#",
            source: a.source?.name || (typeof a.source === "string" ? a.source : "Unknown"),
            image: a.image || null,
            publishedAt: a.publishedAt || new Date().toISOString(),
          }));
        } else {
          console.warn("No articles array in response:", data);
        }

        if (articles.length === 0) {
          console.warn("No articles found after processing");
        }

        setArticles(articles.slice(0, max));
      } catch (err) {
        console.error("Tech news fetch error:", err);
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to load tech news");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadNews();

    return () => {
      mounted = false;
    };
  }, [max]);

  if (loading) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4 pb-3 border-b">Latest Tech News</h3>
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4 pb-3 border-b">Latest Tech News</h3>
        <div className="text-sm text-muted-foreground py-4">
          Unable to load tech news. Please try again later.
        </div>
      </Card>
    );
  }

  if (!articles.length) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4 pb-3 border-b">Latest Tech News</h3>
        <div className="text-sm text-muted-foreground py-4">
          No news available at the moment.
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold mb-4 pb-3 border-b">Latest Tech News</h3>
      <div className="space-y-4">
        {articles.map((article, i) => (
          <motion.a
            key={i}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
          >
            <div className="flex gap-3 items-start hover:opacity-80 transition-opacity">
              {article.image ? (
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-20 h-14 object-cover rounded flex-shrink-0"
                  onError={(e) => {
                    // Hide image if it fails to load
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="w-20 h-14 rounded bg-muted flex items-center justify-center text-xs text-muted-foreground flex-shrink-0">
                  📰
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-foreground group-hover:text-blog transition-colors line-clamp-2 mb-1">
                  {article.title}
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <span>{article.source}</span>
                  <span>·</span>
                  <span>
                    {new Date(article.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
      <div className="border-t border-border mt-4 pt-3">
        <p className="text-xs text-muted-foreground">
          Updated every 12 hours · Powered by{" "}
          <a
            href="https://gnews.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blog hover:underline"
          >
            GNews.io
          </a>
        </p>
      </div>
    </Card>
  );
};

