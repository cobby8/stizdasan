import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Curriculum from "@/components/Curriculum";
import Schedule from "@/components/Schedule";
import Registration from "@/components/Registration";
import Gallery from "@/components/Gallery";
import Location from "@/components/Location";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <About />
      <Curriculum />
      <Schedule />
      <Registration />
      <Gallery />
      <Location />
      <Footer />
    </main>
  );
}
