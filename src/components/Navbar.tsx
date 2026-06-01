import { useState, useEffect } from "react";
import { 
  Home, 
  Briefcase, 
  Mail, 
  ShieldCheck,
  Compass,
  Tag
} from "lucide-react";
import { motion } from "motion/react";

interface NavbarProps {
  theme?: "dark" | "light";
  setTheme?: (theme: "dark" | "light") => void;
}

export default function Navbar({ }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  const sections = [
    { id: "hero", label: "Home", icon: Home },
    { id: "about", label: "About", icon: Compass },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "whyus", label: "Why Us", icon: ShieldCheck },
    { id: "pricing", label: "Pricing", icon: Tag },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  // Mobile shows only 5 key sections
  const mobileSections = [
    { id: "hero", label: "Home", icon: Home },
    { id: "projects", label: "Work", icon: Briefcase },
    { id: "whyus", label: "Why Us", icon: ShieldCheck },
    { id: "pricing", label: "Pricing", icon: Tag },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <>
      {/* DESKTOP TOP HEADER NAVIGATION */}
      <header
        id="desktop-header"
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 hidden lg:flex items-center justify-between px-10 py-5 ${
          scrolled
            ? "bg-neutral-950/70 backdrop-blur-2xl border-b border-white/5 shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <div 
          onClick={() => scrollToSection("hero")}
          className="flex items-center gap-2 cursor-pointer select-none group"
        >
          <span className="font-sans font-black tracking-widest text-[#FFF8ED] text-sm transition-colors duration-300">
            HAEBARAGI <span className="text-[#BEA587] group-hover:opacity-100 transition-opacity">STUDIO</span>
          </span>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-neutral-950/65 border border-white/5 rounded-full p-1.5 backdrop-blur-xl relative">
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={`relative px-5 py-2 rounded-full font-sans text-[11px] font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer overflow-hidden ${
                  isActive
                    ? "text-[#BEA587]"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbarActiveIndicator"
                    className="absolute inset-0 rounded-full bg-transparent border border-[#BEA587]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 transition-colors duration-300">
                  {sec.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Action Elements */}
        <div className="flex items-center gap-5">
          <a
            href="https://wa.me/918977831405?text=Hi%2C%20I%20came%20across%20your%20website%20and%20I%27m%20interested%20in%20getting%20a%20website%20for%20my%20business."
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-full bg-[#BEA587] text-[#0d0d0d] font-sans text-[11px] font-bold tracking-widest uppercase hover:bg-[#d4b896] hover:shadow-[0_0_20px_rgba(190,165,135,0.4)] transition-all duration-300 cursor-pointer"
          >
            CONTACT
          </a>
        </div>
      </header>

      {/* MOBILE BOTTOM NAVIGATION HUB — 5 items only */}
      <div
        id="mobile-nav-container"
        className="fixed bottom-6 inset-x-0 z-40 flex items-center justify-center lg:hidden pointer-events-none px-4"
      >
        <div className="bg-[#0b0b0b]/85 backdrop-blur-3xl border border-white/10 rounded-full px-2 py-1.5 shadow-2xl flex items-center gap-0.5 max-w-full pointer-events-auto relative">
          {mobileSections.map((sec) => {
            const IconComponent = sec.icon;
            const isActive = activeSection === sec.id;

            return (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={`relative w-12 h-10 rounded-full flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? "text-[#BEA587]" 
                    : "text-neutral-500 hover:text-white"
                }`}
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobileActiveGlow"
                    className="absolute inset-0 rounded-full bg-[#BEA587]/10 border border-[#BEA587]/30"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <IconComponent size={14} className="relative z-10" />
                <span className="text-[7px] font-mono font-medium tracking-tighter mt-0.5 relative z-10 max-w-[44px] truncate">
                  {sec.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
