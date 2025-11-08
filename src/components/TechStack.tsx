import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Code2, Database, Wrench, Server } from "lucide-react";

const techStack = {
  languages: ["Python", "Java", "JavaScript", "SQL"],
  backend: ["Node.js", "Express", "REST APIs", "FastAPI"],
  frontend: ["React", "HTML", "CSS", "Tailwind"],
  databases: ["PostgreSQL", "MongoDB", "BigQuery", "Neo4j", "Redis", "Kafka"],
  tools: ["Docker", "Git", "Azure DevOps", "MLFlow", "GCP", "Kubernetes"]
};

export const TechStack = () => {
  return (
    <section id="tech" className="py-24 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-12 animate-fade-in text-center">
          <h2 className="text-4xl font-bold mb-4">The Machine</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My technical stack for building reliable, scalable systems — from prototype to production
          </p>
          <div className="h-1 w-20 bg-primary rounded-full mx-auto mt-4"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12 animate-fade-in">
          <Card className="p-6 hover-lift">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Code2 className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold text-lg">Languages & Core</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {techStack.languages.map((tech) => (
                <Badge key={tech} variant="secondary">{tech}</Badge>
              ))}
              <Badge variant="secondary">DSA</Badge>
              <Badge variant="secondary">OOP</Badge>
              <Badge variant="secondary">System Design</Badge>
            </div>
          </Card>

          <Card className="p-6 hover-lift">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Server className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold text-lg">Backend & APIs</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {techStack.backend.map((tech) => (
                <Badge key={tech} variant="secondary">{tech}</Badge>
              ))}
              {techStack.frontend.map((tech) => (
                <Badge key={tech} variant="secondary">{tech}</Badge>
              ))}
            </div>
          </Card>

          <Card className="p-6 hover-lift">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Database className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold text-lg">Data & Messaging</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {techStack.databases.map((tech) => (
                <Badge key={tech} variant="secondary">{tech}</Badge>
              ))}
            </div>
          </Card>

          <Card className="p-6 hover-lift">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Wrench className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold text-lg">DevOps & Tools</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {techStack.tools.map((tech) => (
                <Badge key={tech} variant="secondary">{tech}</Badge>
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-8 bg-card/50 backdrop-blur">
          <h3 className="font-bold text-lg mb-4">System Architecture Philosophy</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <div className="font-semibold mb-2 text-primary">Design</div>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Scalability first</li>
                <li>• Clean abstractions</li>
                <li>• Event-driven patterns</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-2 text-primary">Deploy</div>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Containerized services</li>
                <li>• CI/CD automation</li>
                <li>• Infrastructure as code</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-2 text-primary">Monitor</div>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Observability built-in</li>
                <li>• Metrics-driven</li>
                <li>• Real-time alerting</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
