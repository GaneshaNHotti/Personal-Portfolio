import FloatingProgrammerNav from "../components/navbar-page";
import ProgrammerHero from "../components/home-page";
import AnimatedExperienceTimeline from "../components/experience-page";

export default function Home() {
  return (
    <main className="bg-black text-white">
      <section id="navbar">
        <FloatingProgrammerNav />
      </section>
      <section id="home">
        <ProgrammerHero />
      </section>
      <section id="experience">
        <AnimatedExperienceTimeline />
      </section>
    </main>
  );
}
