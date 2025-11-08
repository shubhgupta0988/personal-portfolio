import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { WorkExperience } from "@/components/WorkExperience";
import { Projects } from "@/components/Projects";
import { TechStack } from "@/components/TechStack";
import { Blog } from "@/components/Blog";
import { Cafe } from "@/components/Cafe";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ShubhGPT } from "@/components/ShubhGPT";
import { DebugBugGame } from "@/components/DebugBugGame";
import { RetroDevMode } from "@/components/RetroDevMode";
import { CustomCursor } from "@/components/CustomCursor";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <Header />
      <main>
        <Hero />
        <About />
        <WorkExperience />
        <Projects />
        <TechStack />
        <Blog />
        <Cafe />
        <Contact />
      </main>
      <Footer />
      <ShubhGPT />
      <DebugBugGame />
      <RetroDevMode />
    </div>
  );
};

export default Index;
