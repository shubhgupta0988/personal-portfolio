// Serverless function for tech news (works with Vercel, Netlify, etc.)
// For Vercel: place in /api/tech-news.js
// For Netlify: place in /netlify/functions/tech-news.js

const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours (since free tier updates every 12 hours)
let cache = { ts: 0, data: null };

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const now = Date.now();

    // Check cache
    if (cache.data && (now - cache.ts) < CACHE_TTL_MS) {
      return res.status(200).json({ source: "cache", articles: cache.data });
    }

    const API_KEY = process.env.VITE_GNEWS_API_KEY || process.env.GNEWS_API_KEY;

    if (!API_KEY) {
      return res.status(500).json({ error: "Missing GNEWS_API_KEY" });
    }

    // Fetch from GNews API (using correct v4 endpoint format)
    const params = new URLSearchParams({
      category: "technology",
      lang: "en",
      country: "us",
      max: "10",
      apikey: API_KEY,
    });

    const url = `https://gnews.io/api/v4/top-headlines?${params.toString()}`;

    const response = await fetch(url, {
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({
        error: "GNews fetch failed",
        detail: text,
      });
    }

    const json = await response.json();

    // Normalize articles
    const articles = (json.articles || []).map((a) => ({
      title: a.title,
      description: a.description,
      url: a.url,
      source: a.source?.name || a.source,
      image: a.image || null,
      publishedAt: a.publishedAt,
    }));

    // Update cache
    cache = { ts: now, data: articles };

    return res.status(200).json({ source: "gnews", articles });
  } catch (err) {
    console.error("tech-news error", err);
    return res.status(500).json({
      error: "server error",
      detail: String(err),
    });
  }
}

