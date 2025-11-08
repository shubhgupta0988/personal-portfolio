import { Link, useLocation, useNavigate } from "react-router-dom";
import { FileText } from "lucide-react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    // If we're not on the home page, navigate there first
    if (location.pathname !== "/") {
      navigate("/");
      // Wait a bit for navigation, then scroll
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleBlogClick = () => {
    if (location.pathname === "/blog") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/blog");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold hover:text-primary transition-colors">
          SG
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => scrollToSection("about")}
            className="text-sm hover:text-primary transition-colors"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("work")}
            className="text-sm hover:text-primary transition-colors"
          >
            Work
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className="text-sm hover:text-primary transition-colors"
          >
            Projects
          </button>
          <button
            onClick={handleBlogClick}
            className="text-sm hover:text-primary transition-colors"
          >
            Blog
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-sm hover:text-primary transition-colors"
          >
            Contact
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/resume" target="_blank">
            <Button variant="ghost" size="icon" className="hover-scale">
              <FileText className="h-5 w-5" />
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};
