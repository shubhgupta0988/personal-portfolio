import { ThemeToggle } from "./ThemeToggle";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-secondary/20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© {new Date().getFullYear()} Shubh Gupta</span>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="/Shubh_Gupta_Resume.pdf" 
              download 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Download Resume
            </a>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
};
