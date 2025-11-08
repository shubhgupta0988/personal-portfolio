import { Link, useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export const BlogHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold hover:text-blog transition-colors">
          SG
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-blog transition-colors"
          >
            <Home className="h-4 w-4" />
            Portfolio
          </button>
          <ThemeToggle variant="blog" />
        </div>
      </nav>
    </header>
  );
};

