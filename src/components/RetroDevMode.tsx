import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal } from "lucide-react";
import { Button } from "./ui/button";
import { useKonamiCode } from "@/hooks/useKonamiCode";

const ASCII_LOGO = `
╔═══════════════════════════════════╗
║                                   ║
║   ██████╗ ███████╗████████╗      ║
║   ██╔══██╗██╔════╝╚══██╔══╝      ║
║   ██║  ██║█████╗     ██║         ║
║   ██║  ██║██╔══╝     ██║         ║
║   ██████╔╝███████╗   ██║         ║
║   ╚═════╝ ╚══════╝   ╚═╝         ║
║                                   ║
║   DEV MODE ACTIVATED              ║
║                                   ║
╚═══════════════════════════════════╝
`;

export const RetroDevMode = () => {
  const [isActive, setIsActive] = useState(false);

  useKonamiCode(() => {
    setIsActive(true);
    document.documentElement.classList.add("retro-dev-mode");
  });

  const deactivate = () => {
    setIsActive(false);
    document.documentElement.classList.remove("retro-dev-mode");
  };

  useEffect(() => {
    if (isActive) {
      // Add glitch effect
      const interval = setInterval(() => {
        document.body.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
        setTimeout(() => {
          document.body.style.transform = "translate(0, 0)";
        }, 50);
      }, 2000);

      return () => {
        clearInterval(interval);
        document.body.style.transform = "translate(0, 0)";
      };
    }
  }, [isActive]);

  return (
    <AnimatePresence>
      {isActive && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] pointer-events-none retro-overlay"
          >
            {/* Scanlines effect */}
            <div className="absolute inset-0 retro-scanlines"></div>
            
            {/* ASCII Logo */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-mono text-green-400 text-xs whitespace-pre"
            >
              {ASCII_LOGO}
            </motion.div>
          </motion.div>

          {/* Toggle Button */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            className="fixed bottom-6 left-6 z-[101]"
          >
            <Button
              onClick={deactivate}
              className="bg-green-500 hover:bg-green-600 text-black font-mono border-2 border-green-400"
            >
              <Terminal className="mr-2 h-4 w-4" />
              Exit Dev Mode
            </Button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

