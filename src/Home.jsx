import IntroFeatureArea from "./Component/intro-feature-area";
import HeroSection from "./Component/HeroSection";
import Navbar from "./Component/Navbar";
import AboutMe from "./Component/AboutMe";
import Portfolio from "./Component/Portfolio";
import FunFacts from "./Component/FunFacts";
import Award from "./Component/Award";
import Experience from "./Component/Experience";
import Education from "./Component/Education";
import Skills from "./Component/Skills";
import Services from "./Component/Services";
import Pricing from "./Component/pricing";
import Testimonials from "./Component/Testimonials";
import Brand from "./Component/BRand";
import ContactUs from "./Component/ContactUs";
import Footer from "./Component/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="over-hiddenn">
        <HeroSection />
        <IntroFeatureArea />
        <AboutMe />
        <Portfolio />
        <FunFacts />
        <Award />
        <Experience />
        <Education />
        <Skills />
        <Services />
        <Pricing />
        <Testimonials />
        <Brand />
        <ContactUs />
      </main>
      <Footer />
    </>
  );
}
