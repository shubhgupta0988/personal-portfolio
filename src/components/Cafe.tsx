import { Coffee, Heart } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { CafeModal } from "./CafeModal";
import { motion } from "framer-motion";

export const Cafe = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };
    
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <CafeModal open={modalOpen} onOpenChange={setModalOpen} />
    <section id="cafe" className="py-24 px-4 bg-secondary/30 relative overflow-hidden">
      {/* Steam Animation - Only in dark mode */}
      {isDarkMode && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bottom-32 left-1/2"
              style={{ marginLeft: `${(i - 1) * 40}px` }}
              initial={{ opacity: 0, y: 0, x: 0 }}
              animate={{
                opacity: [0, 0.6, 0.4, 0],
                y: -100,
                x: (Math.random() - 0.5) * 30
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeOut"
              }}
            >
              <div className="w-8 h-16 bg-gradient-to-t from-white/20 to-transparent rounded-full blur-sm"></div>
            </motion.div>
          ))}
        </div>
      )}
      
      <div className="container mx-auto max-w-3xl text-center relative z-10">
        <div className="mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 relative">
            <Coffee className="h-8 w-8 text-primary relative z-10" />
            {isDarkMode && (
              <motion.div
                className="absolute top-0 left-1/2 transform -translate-x-1/2"
                animate={{
                  opacity: [0, 0.5, 0],
                  y: -10,
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              >
                <div className="w-4 h-8 bg-white/20 rounded-full blur-sm"></div>
              </motion.div>
            )}
          </div>
          <h2 className="text-4xl font-bold mb-4">The Café</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Enjoy the work? Fuel the next build — buy me a coffee
          </p>
        </div>

        <Card className="p-8 animate-fade-in hover-lift">
          <div className="mb-6">
            <p className="text-lg mb-4">
              Your support helps me keep building, learning, and sharing. 
              A small contribution goes a long way!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow group"
              onClick={() => setModalOpen(true)}
            >
              <Coffee className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Buy Me a Coffee ($1)
            </Button>

            <div className="text-sm text-muted-foreground">
              <Heart className="h-4 w-4 inline mr-1 text-red-500" />
              Supporters will be thanked below
            </div>
          </div>

          <div className="mt-8 p-4 bg-secondary/50 rounded-lg">
            <p className="text-sm font-medium mb-2">Recent Supporters</p>
            <p className="text-xs text-muted-foreground">
              Be the first to support! Your name will appear here.
            </p>
          </div>

          <p className="text-xs text-muted-foreground mt-6">
            💡 Integration: Replace this with your BuyMeACoffee widget or Stripe payment link
          </p>
        </Card>
      </div>
    </section>
    </>
  );
};
