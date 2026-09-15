import About from "@/components/About";
import Backdrop from "@/components/Backdrop";
import Contact from "@/components/Contact";
import Cursor from "@/components/Cursor";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import SmoothScroll from "@/components/SmoothScroll";

// Full-width wrapper so each section's backdrop spans the viewport, not just the content column.
// overflow-clip (not hidden) keeps sticky children working.
function Band({ children }: { children: React.ReactNode }) {
  return <div className="relative isolate overflow-clip">{children}</div>;
}

export default function Home() {
  return (
    <SmoothScroll>
      <Preloader />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <div className="overflow-hidden py-10">
          <Marquee />
        </div>
        <Band>
          <Backdrop pattern="grid" numeral="01" side="right" />
          <About />
        </Band>
        <Band>
          <Backdrop beams numeral="02" side="left" />
          <Experience />
        </Band>
        <Band>
          <Backdrop pattern="dots" numeral="03" side="right" />
          <Projects />
        </Band>
        <Band>
          <Backdrop rings numeral="04" side="left" />
          <Skills />
        </Band>
        <Band>
          <Backdrop pattern="diagonal" numeral="05" side="right" />
          <Education />
        </Band>
      </main>
      <Contact />
    </SmoothScroll>
  );
}
