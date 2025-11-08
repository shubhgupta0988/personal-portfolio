import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), "");
  
  return {
    server: {
      host: "::",
      port: 8080,
      proxy: {
        "/api/tech-news": {
          target: "https://gnews.io",
          changeOrigin: true,
          rewrite: (path) => {
            const apiKey = env.VITE_GNEWS_API_KEY;
            if (!apiKey) {
              console.warn("VITE_GNEWS_API_KEY not set. Tech news widget will not work.");
              return "/api/v4/top-headlines";
            }
            // Add API key and parameters (using correct GNews API v4 format)
            const params = new URLSearchParams({
              category: "technology",
              lang: "en",
              country: "us",
              max: "10",
              apikey: apiKey,
            });
            return `/api/v4/top-headlines?${params.toString()}`;
          },
        },
      },
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
