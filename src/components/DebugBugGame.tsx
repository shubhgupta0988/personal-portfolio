import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bug, CheckCircle2 } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

const SOFTWARE_FACTS = [
  "The first computer bug was an actual bug! In 1947, a moth got stuck in Harvard's Mark II computer, and Grace Hopper documented it as the first 'debugging'. 🐛",
  "The term 'spaghetti code' was coined in 1978 to describe messy, tangled code. Clean code is like well-organized pasta! 🍝",
  "The first computer virus was created in 1983 and was called 'Elk Cloner'. It spread via floppy disks and displayed a poem! 💾",
  "Git was created by Linus Torvalds in just 10 days! The same person who created Linux. Talk about productivity! ⚡",
  "The first 'Hello, World!' program was written in 1972 by Brian Kernighan. It's still the first program most developers write! 👋",
  "Stack Overflow gets over 100 million visitors per month. That's a lot of developers looking for answers! 📚",
  "The first computer programmer was Ada Lovelace in the 1840s, long before computers even existed! She wrote algorithms for Charles Babbage's Analytical Engine. 👩‍💻",
  "JavaScript was created in just 10 days by Brendan Eich in 1995. It was originally called 'Mocha', then 'LiveScript', before becoming JavaScript! ☕",
  "The first web browser was called 'WorldWideWeb' and was created by Tim Berners-Lee in 1990. It was also a web editor! 🌐",
  "The '404 Not Found' error is named after room 404 at CERN, where the web was born. The room didn't exist! 🚪",
  "The first computer mouse was made of wood! Douglas Engelbart created it in 1964. 🖱️",
  "Python is named after Monty Python's Flying Circus, not the snake! Guido van Rossum was a fan of the comedy show. 🐍"
];

const CODE_SNIPPETS = [
  "const bug = { status: 'fixed' };",
  "async function debug() { return 'success'; }",
  "if (bug) { console.log('squashed!'); }",
  "try { catchBug(); } catch(e) { fix(e); }",
  "const solution = bug ? 'fixed' : 'debugging';",
  "function squashBug() { return '🐛💥'; }"
];

export const DebugBugGame = () => {
  const [isActive, setIsActive] = useState(false);
  const [bugPosition, setBugPosition] = useState({ x: 0, y: 0 });
  const [timeLeft, setTimeLeft] = useState(10);
  const [showSuccess, setShowSuccess] = useState(false);
  const [randomFact, setRandomFact] = useState("");
  const [codeParticles, setCodeParticles] = useState<Array<{ id: number; x: number; y: number; text: string }>>([]);
  const gameRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startGame = () => {
    setIsActive(true);
    setTimeLeft(10);
    setShowSuccess(false);
    setCodeParticles([]);
    
    // Random initial position
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 100);
    setBugPosition({ x, y });

    // Move bug randomly
    intervalRef.current = setInterval(() => {
      setBugPosition((prev) => {
        const maxMove = 150;
        return {
          x: Math.max(0, Math.min(window.innerWidth - 100, prev.x + (Math.random() - 0.5) * maxMove)),
          y: Math.max(0, Math.min(window.innerHeight - 100, prev.y + (Math.random() - 0.5) * maxMove))
        };
      });
    }, 400);

    // Countdown timer
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endGame(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const endGame = (won: boolean) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
    
    if (won) {
      // Create code particles
      const particles = CODE_SNIPPETS.map((code, i) => ({
        id: i,
        x: bugPosition.x + 50,
        y: bugPosition.y + 50,
        text: code
      }));
      setCodeParticles(particles);
      
      // Show random fact
      const fact = SOFTWARE_FACTS[Math.floor(Math.random() * SOFTWARE_FACTS.length)];
      setRandomFact(fact);
      setShowSuccess(true);
      
      // Auto close after 5 seconds
      setTimeout(() => {
        setIsActive(false);
        setShowSuccess(false);
      }, 5000);
    } else {
      setIsActive(false);
    }
  };

  const handleBugClick = () => {
    endGame(true);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  if (!isActive && !showSuccess) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-24 right-6 z-40 bg-red-500 hover:bg-red-600 text-white rounded-full p-3 shadow-lg transition-all duration-200"
        onClick={startGame}
        title="Debug the Bug - Click to play!"
      >
        <Bug className="h-5 w-5" />
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          ref={gameRef}
        >
          {/* Timer */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-background/90 px-6 py-3 rounded-full border-2 border-primary">
            <span className="text-2xl font-bold text-primary">{timeLeft}s</span>
          </div>

          {/* Bug */}
          <motion.div
            animate={{
              x: bugPosition.x,
              y: bugPosition.y
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute cursor-pointer"
            onClick={handleBugClick}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.3, repeat: Infinity }}
              className="text-6xl"
            >
              🐛
            </motion.div>
          </motion.div>

          {/* Code Particles */}
          {codeParticles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{ x: particle.x, y: particle.y, opacity: 1, scale: 1 }}
              animate={{
                x: particle.x + (Math.random() - 0.5) * 200,
                y: particle.y + (Math.random() - 0.5) * 200,
                opacity: 0,
                scale: 0
              }}
              transition={{ duration: 1 }}
              className="absolute text-xs font-mono text-primary bg-background/80 px-2 py-1 rounded"
            >
              {particle.text}
            </motion.div>
          ))}

          {/* Success Message */}
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Card className="p-8 max-w-md mx-4 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="mb-4"
                >
                  <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-4">Debugged successfully! 🎉</h3>
                <p className="text-muted-foreground mb-2">Fun Fact:</p>
                <p className="text-lg font-medium text-primary">{randomFact}</p>
                <Button
                  className="mt-6"
                  onClick={() => {
                    setIsActive(false);
                    setShowSuccess(false);
                  }}
                >
                  Close
                </Button>
              </Card>
            </motion.div>
          )}

          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            onClick={() => {
              setIsActive(false);
              setShowSuccess(false);
            }}
          >
            <X className="h-5 w-5" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

