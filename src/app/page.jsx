import Hero from "../sections/Hero";
import About from "../sections/About";
import Projects from "../sections/Projects";
import Experiences from "../sections/Experiences";
import Contact from "../sections/Contact";
import Footer from "../sections/Footer";

export default function Home() {
  return (
    <div className="container mx-auto max-w-[1500px]">
      <Hero />
      <About />
      <Projects />
      <Experiences />
      <Contact />
      <Footer />
    </div>
  );
}