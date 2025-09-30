import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProgramSection from "@/components/ProgramSection";
import TimelineSection from "@/components/TimelineSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import ScrollToHero from "@/components/ScrollToHero";

export default function Home() {
  return (
    <div>
      <ScrollToHero />
      <section id="home">
        <HeroSection />
      </section>
      <section id="about">
        <AboutSection />
      </section>
      <section id="projects">
        <ProgramSection />
      </section>
      <section id="timeline">
        <TimelineSection />
      </section>
      <section id="skills">
        <SkillsSection />
      </section>
      <section id="contact">
        <ContactSection />
      </section>
    </div>
  );
}
