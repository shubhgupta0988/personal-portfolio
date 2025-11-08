import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, Bot, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  isLoading?: boolean;
}

// Resume context for Gemini
const RESUME_CONTEXT = `
You are ShubhGPT, an AI assistant representing Shubh Gupta, a Graduate Software Engineer. You are professional but witty, friendly, and helpful. Answer questions based on the following resume information:

**Personal Information:**
- Name: Shubh Gupta
- Role: Graduate Software Engineer
- Location: Mumbai, Maharashtra
- Email: shubhgupta0988@gmail.com
- Phone: +91-7021411053
- LinkedIn: linkedin.com/in/shubh-gupta
- GitHub: github.com/shubhgupta

**Education:**
- B.Tech in Computer Science and Engineering (AI and ML)
- Bharatiya Vidya Bhavan's Sardar Patel Institute of Technology, Mumbai
- 2021 – 2025
- CGPA: 8.9

**Current Work Experience:**
- Fynd (Shopsense Retail Technologies Ltd.) - Graduate Software Engineer
- Period: Jul 2025 – Ongoing
- Key Achievements:
  * Designed and deployed scalable sales automation using Kafka, MongoDB, cron jobs for large-scale processing
  * Built Slack bot with BigQuery, OpenAI APIs, contextual memory for task automation and query resolution
  * Implemented robust parsing pipeline for financial documents with Google Sheets API integration

**Previous Work Experience:**
1. Snapwork Technologies - Software Engineering Intern (Jan 2025 – May 2025)
   - Built Knowledge Graph–powered RAG system for financial documents using Python and Neo4j
   - Built and deployed React dashboard POC for agent banking solution

2. Koita Center for Digital Health, IIT Bombay - AI Research Intern (Jan 2024 – Jun 2024)
   - Developed RAG model for healthcare with Amazon [Published at CODS-COMAD 2024]
   - Developed MedSAGa: Few-shot Medical Image Segmentation framework [Accepted at ISBI 2025]

3. Sardar Patel Institute of Technology - Web Development Intern (Jun 2023 – Aug 2023)
   - Developed modules for college portal using MERN stack with focus on backend architecture

**Key Projects:**
1. Nyay: Legal Platform
   - MERN, AnnoyDB, BERT, Google PaLM
   - Lawyer recommendation system with XAI explainability
   - First Place at DataHack 2023, DJSCE Mumbai

2. Fleet Risk Score Prediction
   - MERN, Federated Learning, NLTK
   - Federated risk prediction dashboard
   - Second Place at Techfest IIT Bombay

3. MLOps Bias Mitigation Pipeline
   - Streamlit, MLFlow, AIF360
   - Automated bias detection and mitigation
   - First Place at Data2Knowledge 2024

**Technical Skills:**
- Languages: Python, Java, JavaScript, SQL
- Backend: Node.js, Express, REST APIs, FastAPI
- Frontend: React, HTML, CSS, Tailwind
- Databases: PostgreSQL, MongoDB, BigQuery, Neo4j, Redis, Kafka
- DevOps: Docker, Git, Azure DevOps, Kubernetes, GCP
- Core: DSA, OOP, System Design Fundamentals

**Achievements:**
- First Place at DataHack 2023 for Nyay Platform, DJSCE Mumbai
- First Place at Data2Knowledge 2024 for Bias Mitigation Pipeline, DJSCE Mumbai
- First Place in AI for Social Cause, AERAVAT 2024 Hackathon, SPIT Mumbai
- Second Place at Techfest IIT Bombay for Fleet Risk Score project

**Personality Guidelines:**
- Be professional but witty and friendly
- Use emojis sparingly but appropriately
- If someone mentions "coffee", respond with: "Always brewing ideas ☕. But seriously, I'm more of a code-and-coffee kind of person. Want to know about my actual work instead? 😄 (You found the easter egg! 🎉)"
- Keep responses concise but informative
- If asked about something not in the resume, politely redirect to what you can help with
- Always maintain a positive, enthusiastic tone about the work and projects
`;

// Gemini API call function
const callGeminiAPI = async (userMessage: string, conversationHistory: Message[]): Promise<string> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    return "Sorry, the Gemini API key is not configured. Please set VITE_GEMINI_API_KEY in your environment variables.";
  }

  try {
    // Build conversation history for context
    const history = conversationHistory
      .filter(msg => !msg.isLoading)
      .slice(-10) // Keep last 10 messages for context
      .map(msg => ({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.text }]
      }));

    // Prepare the request - Gemini API structure
    const requestBody = {
      contents: [
        {
          role: "user",
          parts: [{ text: RESUME_CONTEXT + "\n\nYou are ShubhGPT, a helpful AI assistant representing Shubh Gupta. Be professional, witty, and friendly. Answer questions based on the resume information provided above." }]
        },
        ...history,
        {
          role: "user",
          parts: [{ text: userMessage }]
        }
      ]
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": apiKey,
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text;
    }
    
    throw new Error("No response from Gemini API");
  } catch (error) {
    console.error("Gemini API error:", error);
    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        return "Sorry, there's an issue with the API configuration. Please check your Gemini API key.";
      }
      return `Sorry, I encountered an error: ${error.message}. Please try again!`;
    }
    return "Sorry, I'm having trouble connecting. Please try again later!";
  }
};

export const ShubhGPT = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey! 👋 I'm ShubhGPT. Ask me about Shubh's work, projects, experience, or anything else!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");
    setIsLoading(true);

    // Add loading message
    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: "",
      sender: "bot",
      timestamp: new Date(),
      isLoading: true,
    };
    setMessages((prev) => [...prev, loadingMessage]);

    try {
      const response = await callGeminiAPI(currentInput, [...messages, userMessage]);
      
      // Remove loading message and add response
      setMessages((prev) => {
        const withoutLoading = prev.filter(msg => !msg.isLoading);
        return [
          ...withoutLoading,
          {
            id: (Date.now() + 2).toString(),
            text: response,
            sender: "bot",
            timestamp: new Date(),
          },
        ];
      });
    } catch (error) {
      setMessages((prev) => {
        const withoutLoading = prev.filter(msg => !msg.isLoading);
        return [
          ...withoutLoading,
          {
            id: (Date.now() + 2).toString(),
            text: "Sorry, I encountered an error. Please try again!",
            sender: "bot",
            timestamp: new Date(),
          },
        ];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chat Bubble */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 flex items-center justify-center"
          aria-label="Open ShubhGPT chat"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full border-2 border-background"
        />
      </motion.div>

      {/* Chat Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="right" className="w-full sm:w-[400px] p-0 flex flex-col">
          <SheetHeader className="px-6 pt-6 pb-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div>
                <SheetTitle className="text-lg font-bold">ShubhGPT</SheetTitle>
                <p className="text-xs text-muted-foreground">Ask me about my work</p>
              </div>
            </div>
          </SheetHeader>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground"
                    }`}
                  >
                    {message.sender === "bot" && (
                      <div className="flex items-center gap-2 mb-1">
                        <Bot className="h-3 w-3 text-primary" />
                        <span className="text-xs font-semibold">ShubhGPT</span>
                      </div>
                    )}
                    {message.isLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-xs text-muted-foreground">Thinking...</span>
                      </div>
                    ) : (
                      <div className="text-sm whitespace-pre-wrap leading-relaxed">
                        {message.text
                          .split(/(\[.*?\]\(.*?\)|\*\*.*?\*\*)/g)
                          .map((part, i) => {
                            // Handle markdown links
                            const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
                            if (linkMatch) {
                              return (
                                <a
                                  key={i}
                                  href={linkMatch[2]}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline font-medium"
                                >
                                  {linkMatch[1]}
                                </a>
                              );
                            }
                            // Handle bold text
                            const boldMatch = part.match(/\*\*(.*?)\*\*/);
                            if (boldMatch) {
                              return <strong key={i} className="font-semibold">{boldMatch[1]}</strong>;
                            }
                            return <span key={i}>{part}</span>;
                          })}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-border p-4">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Powered by Gemini AI • Try: "What's your best project?" or "coffee" ☕
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

