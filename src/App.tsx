import { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen.tsx";
import CustomCursor from "./components/CustomCursor.tsx";
import Navbar from "./components/Navbar.tsx";
import Hero from "./components/Hero.tsx";
import About from "./components/About.tsx";
import Demos from "./components/Demos.tsx";
import WhyChooseUs from "./components/WhyChooseUs.tsx";
import Pricing from "./components/Pricing.tsx";
import HowItWorks from "./components/HowItWorks.tsx";
import Contact from "./components/Contact.tsx";
import Footer from "./components/Footer.tsx";
import { motion } from "motion/react";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("haebaragi-studio-theme");
      if (saved === "light" || saved === "dark") return saved;
      return "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("haebaragi-studio-theme", theme);
  }, [theme]);

  const scrollToProjects = () => {
    const target = document.getElementById("projects");
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    const target = document.getElementById("contact");
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="min-h-screen relative selection:bg-[#BEA587]/40 selection:text-black bg-[#070707] transition-colors duration-500 overflow-x-hidden"
        >
          <CustomCursor />
          <Navbar theme={theme} setTheme={setTheme} />

          <main className="w-full">
            <Hero onExploreClick={scrollToProjects} onInquireClick={scrollToContact} />
            <About />
            <Demos />
            <WhyChooseUs />
            <Pricing onInquireClick={scrollToContact} />
            <HowItWorks />
            <Contact />
          </main>

          <Footer />
        </motion.div>
      )}
    </>
  );
}
