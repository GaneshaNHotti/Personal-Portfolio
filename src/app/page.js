import FloatingProgrammerNav from "../components/navbar-page";
import ProgrammerHero from "../components/home-page";

export default function Home() {
  return (
    <main className="bg-black text-white">
      <section id="navbar">
        <FloatingProgrammerNav />
      </section>
      <section id="home">
        <ProgrammerHero />
      </section>
    </main>
  );
}
