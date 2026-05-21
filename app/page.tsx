import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Statement } from "@/components/sections/Statement";
import { Stats } from "@/components/sections/Stats";
import { Capabilities } from "@/components/sections/Capabilities";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <SmoothScroll>
        <main>
          <Hero />
          <Statement />
          <Stats />
          <Capabilities />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
