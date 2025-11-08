import { Briefcase } from "lucide-react";
import { Card } from "./ui/card";

const experiences = [
  {
    company: "Fynd (Shopsense Retail Technologies Ltd.)",
    role: "Graduate Software Engineer",
    period: "Jul 2025 – Ongoing",
    location: "Mumbai, Maharashtra",
    achievements: [
      "Designed and deployed scalable backend microservices and payment processing systems using Kafka, MongoDB, and async workflows for large-scale data distribution",
      "Built React-based frontend components and full-stack features for TMS systems, integrating with backend APIs and ensuring responsive user experiences",
      "Developed a Slack bot for product operations using Boltic, BigQuery, and OpenAI/Google APIs, with contextual memory (mem0) and async workflows to automate tasks like calendar scheduling and real-time query resolution",
      "Implemented a robust parsing pipeline for emails and PDFs, extracting structured data from financial documents and integrating with Google Sheets APIs for reliable downstream reporting"
    ]
  },
  {
    company: "Snapwork Technologies",
    role: "Software Engineering Intern",
    period: "Jan 2025 – May 2025",
    location: "Mumbai, Maharashtra",
    achievements: [
      "Built a Knowledge Graph–powered RAG system for financial documents using Python and Neo4j",
      "Built and deployed a React dashboard POC for an agent banking solution on Snapwork servers"
    ]
  },
  {
    company: "Koita Center for Digital Health, IIT Bombay",
    role: "AI Research Intern",
    period: "Jan 2024 – Jun 2024",
    location: "Mumbai, Maharashtra",
    achievements: [
      "Worked in collaboration with Amazon to develop a RAG model for healthcare in a federated setting",
      "Utilized Co-distillation to mitigate class imbalance in Federated Learning [Published at CODS-COMAD 2024]",
      "Developed MedSAGa: Few-shot Memory Efficient Medical Image Segmentation framework [Accepted at ISBI 2025]"
    ]
  },
  {
    company: "Sardar Patel Institute of Technology",
    role: "Web Development Intern",
    period: "Jun 2023 – Aug 2023",
    location: "Mumbai, Maharashtra",
    achievements: [
      "Developed and deployed modules for the college student portal using the MERN stack, with emphasis on backend architecture and clean UI components",
      "Built the Student Achievements page using React, with backend integration through Express and MongoDB"
    ]
  }
];

export const WorkExperience = () => {
  return (
    <section id="work" className="py-24 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">Work Experience</h2>
          <div className="h-1 w-20 bg-primary rounded-full"></div>
        </div>

        <div className="space-y-6 animate-fade-in">
          {experiences.map((exp, index) => (
            <Card key={index} className="p-8 hover-lift transition-all duration-300 hover:shadow-medium border-l-4 border-l-primary">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-xl font-bold">{exp.company}</h3>
                      <p className="text-primary font-semibold">{exp.role}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-muted-foreground">{exp.period}</p>
                      <p className="text-sm text-muted-foreground">{exp.location}</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mt-4">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                        <span className="text-sm leading-relaxed text-foreground/90">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
