import FloatingProgrammerNav from "../components/navbar-page";
import ProgrammerHero from "../components/home-page";
import AnimatedExperienceTimeline from "../components/experience-page";
import AboutSection from "../components/about-page";
import AnimatedSkillsGrid from "../components/skills-page";
import AnimatedProjectsGrid from "../components/projects-page";
import AnimatedContactForm from "../components/contact-page";

export default function Home() {
  return (
    <main className="bg-black text-white">
      <section id="navbar">
        <FloatingProgrammerNav />
      </section>
      <section id="home">
        <ProgrammerHero />
      </section>
      <section id="about">
        <AboutSection />
      </section>
      <section id="experience">
        <AnimatedExperienceTimeline />
      </section>
      <section id="skills">
        <AnimatedSkillsGrid/>
      </section>
      <section id="projects">
        <AnimatedProjectsGrid />
      </section>
      <section id="contact">
        <AnimatedContactForm />
      </section>
    </main>
  );
}
