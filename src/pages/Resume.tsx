import { FileDown, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Resume = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="print:hidden sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Button>
          </a>
          <div className="flex gap-2">
            <a href="/Shubh_Gupta_Resume.pdf" download>
              <Button size="sm" className="bg-primary text-primary-foreground">
                <FileDown className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </a>
            <Button size="sm" variant="outline" onClick={() => window.print()}>
              Print Resume
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="p-12 print:shadow-none print:border-none">
          {/* Header */}
          <div className="text-center mb-8 pb-6 border-b-2 border-primary">
            <h1 className="text-4xl font-bold mb-2">Shubh Gupta</h1>
            <p className="text-lg text-muted-foreground mb-3">Graduate Software Engineer</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span>Mumbai, Maharashtra</span>
              <span>•</span>
              <span>+91-7021411053</span>
              <span>•</span>
              <a href="mailto:shubhgupta0988@gmail.com" className="text-primary hover:underline">
                shubhgupta0988@gmail.com
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm mt-2">
              <a href="https://www.linkedin.com/in/shubhgupta0988/" className="text-primary hover:underline">LinkedIn</a>
              <span>•</span>
              <a href="https://github.com/shubhgupta0988" className="text-primary hover:underline">GitHub</a>
            </div>
          </div>

          {/* Education */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-border">Education</h2>
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold">Bharatiya Vidya Bhavan's Sardar Patel Institute of Technology</h3>
                  <p className="text-sm">B.Tech - Computer Science and Engineering (AI and ML)</p>
                </div>
                <span className="text-sm text-muted-foreground">2021 – 2025</span>
              </div>
              <p className="text-sm">CGPA: 8.9 • Mumbai, Maharashtra</p>
            </div>
          </section>

          {/* Work Experience */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-border">Work Experience</h2>
            
            <div className="mb-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold">Fynd (Shopsense Retail Technologies Ltd.)</h3>
                  <p className="text-sm text-primary">Graduate Software Engineer</p>
                </div>
                <span className="text-sm text-muted-foreground">Jul 2025 – Ongoing</span>
              </div>
              <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                <li>Designed and deployed scalable sales automation using Kafka, MongoDB, cron jobs for large-scale processing</li>
                <li>Built Slack bot with BigQuery, OpenAI APIs, contextual memory for task automation and query resolution</li>
                <li>Implemented robust parsing pipeline for financial documents with Google Sheets API integration</li>
              </ul>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold">Snapwork Technologies</h3>
                  <p className="text-sm text-primary">Software Engineering Intern</p>
                </div>
                <span className="text-sm text-muted-foreground">Jan 2025 – May 2025</span>
              </div>
              <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                <li>Built Knowledge Graph–powered RAG system for financial documents using Python and Neo4j</li>
                <li>Built and deployed React dashboard POC for agent banking solution</li>
              </ul>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold">Koita Center for Digital Health, IIT Bombay</h3>
                  <p className="text-sm text-primary">AI Research Intern</p>
                </div>
                <span className="text-sm text-muted-foreground">Jan 2024 – Jun 2024</span>
              </div>
              <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                <li>Developed RAG model for healthcare with Amazon [Published at CODS-COMAD 2024]</li>
                <li>Developed MedSAGa: Few-shot Medical Image Segmentation framework [Accepted at ISBI 2025]</li>
              </ul>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold">Sardar Patel Institute of Technology</h3>
                  <p className="text-sm text-primary">Web Development Intern</p>
                </div>
                <span className="text-sm text-muted-foreground">Jun 2023 – Aug 2023</span>
              </div>
              <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                <li>Developed modules for college portal using MERN stack with focus on backend architecture</li>
              </ul>
            </div>
          </section>

          {/* Projects */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-border">Key Projects</h2>
            
            <div className="mb-4">
              <h3 className="font-bold">Nyay: Legal Platform</h3>
              <p className="text-sm text-muted-foreground mb-1">MERN, AnnoyDB, BERT, Google PaLM</p>
              <p className="text-sm">Lawyer recommendation system with XAI explainability • First Place DataHack 2023</p>
            </div>

            <div className="mb-4">
              <h3 className="font-bold">Fleet Risk Score Prediction</h3>
              <p className="text-sm text-muted-foreground mb-1">MERN, Federated Learning, NLTK</p>
              <p className="text-sm">Federated risk prediction dashboard • Second Place Techfest IIT Bombay</p>
            </div>

            <div className="mb-4">
              <h3 className="font-bold">MLOps Bias Mitigation Pipeline</h3>
              <p className="text-sm text-muted-foreground mb-1">Streamlit, MLFlow, AIF360</p>
              <p className="text-sm">Automated bias detection and mitigation • First Place Data2Knowledge 2024</p>
            </div>
          </section>

          {/* Skills */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 pb-2 border-border">Technical Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="font-semibold">Languages:</span> Python, Java, JavaScript, SQL
              </div>
              <div>
                <span className="font-semibold">Backend:</span> Node.js, Express, REST APIs, FastAPI
              </div>
              <div>
                <span className="font-semibold">Frontend:</span> React, HTML, CSS, Tailwind
              </div>
              <div>
                <span className="font-semibold">Databases:</span> PostgreSQL, MongoDB, BigQuery, Neo4j, Redis, Kafka
              </div>
              <div>
                <span className="font-semibold">DevOps:</span> Docker, Git, Azure DevOps, Kubernetes, GCP
              </div>
              <div>
                <span className="font-semibold">Core:</span> DSA, OOP, System Design Fundamentals
              </div>
            </div>
          </section>

          {/* Achievements */}
          <section>
            <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-border">Achievements</h2>
            <ul className="list-disc list-inside text-sm space-y-1 ml-2">
              <li>First Place at DataHack 2023 for Nyay Platform, DJSCE Mumbai</li>
              <li>First Place at Data2Knowledge 2024 for Bias Mitigation Pipeline, DJSCE Mumbai</li>
              <li>First Place in AI for Social Cause, AERAVAT 2024 Hackathon, SPIT Mumbai</li>
              <li>Second Place at Techfest IIT Bombay for Fleet Risk Score project</li>
            </ul>
          </section>
        </Card>
      </div>
    </div>
  );
};

export default Resume;
