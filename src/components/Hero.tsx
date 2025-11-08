import { ArrowRight, Coffee, FileDown } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

export const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Modern Art Lines & Shapes Background */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(0 0% 60%)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(0 0% 40%)" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          
          {/* Animated diagonal lines */}
          {[...Array(8)].map((_, i) => {
            const Line = motion.line;
            return (
              <Line
                key={`line-${i}`}
                x1={`${(i * 12) % 100}%`}
                y1="0%"
                x2={`${((i * 12) + 30) % 100}%`}
                y2="100%"
                stroke="url(#lineGradient)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1, 0.8, 1],
                  opacity: [0, 0.4, 0.3, 0.4],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
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
              x="10%"
              y="20%"
              width="200"
              height="200"
              fill="none"
              stroke="hsl(0 0% 50%)"
              strokeWidth="2"
              opacity="0.2"
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: 1,
                rotate: [0, 45, 0],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                pathLength: { duration: 2 },
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              }}
              style={{ transformOrigin: "50% 50%" }}
            />

            <motion.circle
              cx="85%"
              cy="70%"
              r="150"
              fill="none"
              stroke="hsl(0 0% 50%)"
              strokeWidth="2"
              opacity="0.2"
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: [0, 1, 0.8, 1],
                opacity: [0.2, 0.4, 0.2],
                scale: [1, 1.1, 1],
              }}
              transition={{
                pathLength: { duration: 2, delay: 0.5 },
                opacity: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              }}
            />

            {/* Abstract lines connecting shapes */}
            <motion.path
              d="M 15% 25% Q 50% 50%, 80% 75%"
              fill="none"
              stroke="hsl(0 0% 45%)"
              strokeWidth="1.5"
              opacity="0.3"
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: [0, 1, 0],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.g>
        </svg>
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 opacity-20 dark:opacity-10"
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, hsl(24 100% 50% / 0.15), transparent 50%)",
              "radial-gradient(circle at 80% 70%, hsl(24 100% 64% / 0.15), transparent 50%)",
              "radial-gradient(circle at 50% 50%, hsl(24 100% 50% / 0.15), transparent 50%)",
              "radial-gradient(circle at 20% 30%, hsl(24 100% 50% / 0.15), transparent 50%)",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08] dark:opacity-[0.04]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-foreground/20"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">

        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.2, 0.9, 0.3, 1], delay: 0.1 }}
        >
          I build reliable, scalable
          <br />
          <motion.span 
            className="text-gradient-primary inline-block"
            animate={{
              backgroundPosition: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundSize: "200% 200%",
            }}
          >
            software that ships
          </motion.span>
        </motion.h1>

        <motion.p 
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.2, 0.9, 0.3, 1], delay: 0.2 }}
        >
          Product-minded SDE. Full-stack development with React, backend microservices, and payment systems. Focus on observability, metrics, and shipping impact.
        </motion.p>

        <motion.div 
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.2, 0.9, 0.3, 1], delay: 0.3 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow hover-lift group relative overflow-hidden"
              onClick={() => scrollToSection("projects")}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary via-primary-glow to-primary"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ opacity: 0.3 }}
              />
              <span className="relative z-10 flex items-center">
                View Projects
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </motion.div>

          <a href="/resume" target="_blank">
            <Button
              size="lg"
              variant="outline"
              className="hover-lift"
            >
              <FileDown className="mr-2 h-4 w-4" />
              View Resume
            </Button>
          </a>

          <Button
            size="lg"
            variant="outline"
            className="hover-lift"
            onClick={() => scrollToSection("cafe")}
          >
            <Coffee className="mr-2 h-4 w-4" />
            Grab a Coffee
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
