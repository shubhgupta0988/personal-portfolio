import { MapPin, GraduationCap, Code2 } from "lucide-react";
import { Card } from "./ui/card";

export const About = () => {
  return (
    <section id="about" className="py-24 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">The Barista's Note</h2>
          <div className="h-1 w-20 bg-primary rounded-full"></div>
        </div>

        <div className="space-y-8 animate-fade-in">
          <Card className="p-8 hover-lift border-l-4 border-l-primary">
            <p className="text-lg leading-relaxed mb-6">
              I'm <span className="font-semibold text-primary">Shubh Gupta</span> — a product-minded software engineer building full-stack applications with React, backend microservices, and payment systems. 
              I graduated from SPIT Mumbai in 2025 with a B.Tech in Computer Science (AI/ML), maintaining an 8.9 CGPA. 
              I ship features end-to-end, care deeply about observability and metrics, and aim for clean, maintainable code.
            </p>
            <p className="text-lg leading-relaxed">
              My work spans across React frontends, backend microservices, payment processing, scalable data pipelines, knowledge graphs, and automation workflows. 
              I measure impact through metrics that matter: latency reductions, throughput improvements, and reliability gains. 
              I believe great engineering balances technical excellence with real user value.
            </p>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 hover-lift">
              <GraduationCap className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Education</h3>
              <p className="text-sm text-muted-foreground">B.Tech CS (AI/ML)</p>
              <p className="text-sm text-muted-foreground">SPIT Mumbai • 8.9 CGPA</p>
            </Card>

            <Card className="p-6 hover-lift">
              <MapPin className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Location</h3>
              <p className="text-sm text-muted-foreground">Mumbai, Maharashtra</p>
              <p className="text-sm text-muted-foreground">India</p>
            </Card>

            <Card className="p-6 hover-lift">
              <Code2 className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Currently</h3>
              <p className="text-sm text-muted-foreground">Graduate SDE @ Fynd</p>
              <p className="text-sm text-muted-foreground">Building TMS systems</p>
            </Card>
          </div>

          <Card className="p-6 bg-secondary/50 border-secondary">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Now
            </h3>
            <p className="text-sm text-muted-foreground">
              Building full-stack features with React frontends and backend microservices at Fynd's TMS team, 
              working with payment systems, Kafka, MongoDB, async workflows, and AI-powered tooling to drive efficiency at scale.
            </p>
          </Card>

          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/resume" target="_blank" className="text-primary hover:underline font-medium">
              → Simple Resume View
            </a>
            <a href="/Shubh_Gupta_Resume.pdf" download className="text-primary hover:underline font-medium">
              → Download Resume PDF
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
