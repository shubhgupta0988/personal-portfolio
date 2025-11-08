import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Sales Outreach Automation System",
    impact: "Production-grade data distribution engine handling large-scale async workflows",
    category: ["Backend", "DevOps"],
    tech: ["Kafka", "MongoDB", "Cron Jobs", "Async Workflows"],
    description: "Designed and deployed a scalable automation system for sales outreach with distributed processing capabilities. Handles large-scale data distribution with fault-tolerance and observability built-in.",
    metrics: "Processing thousands of records daily with 99.9% reliability",
    github: "#",
    demo: "#"
  },
  {
    title: "Knowledge Graph RAG System",
    impact: "Graph-powered retrieval for financial document Q&A with contextual understanding",
    category: ["Backend", "AI/ML"],
    tech: ["Python", "Neo4j", "FastAPI", "Docker"],
    description: "Built a robust retrieval pipeline leveraging knowledge graphs for insurance document analysis. Enables contextual Q&A with relationship-aware retrieval, significantly improving response accuracy over traditional RAG.",
    metrics: "Supporting automated support workflows with 85%+ answer accuracy",
    github: "#",
    demo: "#"
  },
  {
    title: "AI-Powered Slack Operations Bot",
    impact: "Intelligent automation for product ops with contextual memory and real-time execution",
    category: ["Backend", "AI/ML"],
    tech: ["Python", "BigQuery", "OpenAI API", "mem0", "Slack API"],
    description: "Built an operations bot integrating Boltic, BigQuery, and LLMs for task automation. Features contextual memory for maintaining conversation state, calendar scheduling, and real-time query resolution.",
    metrics: "Reduced manual ops time by 60% across product team",
    github: "#",
    demo: "#"
  },
  {
    title: "Nyay: Legal Platform",
    impact: "Intelligent lawyer recommendation using NLP and explainable AI",
    category: ["Full Stack", "AI/ML"],
    tech: ["MERN", "AnnoyDB", "BERT", "Google PaLM"],
    description: "A lawyer recommendation system extracting user query insights and matching with lawyer profiles. Implemented XAI for model explainability and integrated Lok Adalat feature involving retired lawyers.",
    metrics: "First Place at DataHack 2023, DJSCE Mumbai",
    github: "#",
    demo: "#"
  },
  {
    title: "Fleet Risk Score Prediction",
    impact: "Federated Learning dashboard for privacy-preserving risk assessment",
    category: ["Full Stack", "AI/ML"],
    tech: ["MERN", "Federated Learning", "NLTK", "TensorFlow"],
    description: "Developed a dashboard predicting risk scores for fleet companies based on route, vehicle, and driver data in a federated setup. Incorporates review sentiment analysis for comprehensive risk modeling.",
    metrics: "Second Place at Techfest IIT Bombay national competition",
    github: "#",
    demo: "#"
  },
  {
    title: "MLOps Bias Mitigation Pipeline",
    impact: "Automated bias detection and mitigation for fair ML models",
    category: ["DevOps", "AI/ML"],
    tech: ["Streamlit", "MLFlow", "AIF360", "Python"],
    description: "End-to-end pipeline for bias identification in ML-based heart disease detection using metrics like disparate impact. Automated using API calls, monitored with MLFlow, and presented via Streamlit dashboard.",
    metrics: "First Place at Data2Knowledge 2024, DJSCE Mumbai",
    github: "#",
    demo: "#"
  }
];

const categories = ["All", "Backend", "Full Stack", "DevOps", "AI/ML"];

export const Projects = () => {
  const [filter, setFilter] = useState("All");

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category.includes(filter));

  return (
    <section id="projects" className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">Projects</h2>
          <div className="h-1 w-20 bg-primary rounded-full mb-8"></div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={filter === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(cat)}
                className={filter === cat ? "bg-primary text-primary-foreground shadow-glow" : ""}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
            >
            <motion.div
              whileHover={{ 
                scale: 1.02,
                rotateY: 5,
                rotateX: 2,
              }}
              transition={{ duration: 0.3 }}
              style={{ perspective: 1000 }}
            >
            <Card 
              className="p-6 hover-lift transition-all duration-300 hover:shadow-large group relative overflow-hidden"
            >
              {/* Animated gradient overlay on hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                initial={false}
                animate={{
                  background: [
                    "radial-gradient(circle at 0% 0%, hsl(24 100% 50% / 0.1), transparent 50%)",
                    "radial-gradient(circle at 100% 100%, hsl(252 79% 64% / 0.1), transparent 50%)",
                    "radial-gradient(circle at 0% 0%, hsl(24 100% 50% / 0.1), transparent 50%)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <div className="flex gap-2">
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Github className="h-4 w-4" />
                    </Button>
                  </a>
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>

              <p className="text-sm font-medium text-primary mb-3">{project.impact}</p>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>

              <div className="mb-4 p-3 bg-secondary/50 rounded-lg">
                <p className="text-xs font-medium text-foreground/80">📊 {project.metrics}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </Card>
            </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
