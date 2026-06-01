import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, animate } from "motion/react";
import { Sparkles, MapPin, HandshakeIcon, Clock4, ArrowRight } from "lucide-react";

function Counter({ from = 0, to = 100, suffix = "", duration = 2 }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-50px" });
  
  useEffect(() => {
    if (inView) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate: (value) => {
          if (ref.current) {
            ref.current.textContent = Math.round(value) + suffix;
          }
        }
      });
      return () => controls.stop();
    }
  }, [inView, from, to, suffix, duration]);
  
  return <div ref={ref}>{from}{suffix}</div>;
}

interface LuxuryCardProps {
  key?: string | number;
  title: string;
  icon: React.ElementType;
  descriptor: string;
  tabCategory: string;
  description: string;
  index: number;
}

function LuxuryCard({ 
  title, 
  icon: Icon, 
  descriptor, 
  tabCategory, 
  description, 
  index 
}: LuxuryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [mobileGlow, setMobileGlow] = useState(false);

  useEffect(() => {
    const checkMobile = () => window.innerWidth < 768;
    
    if (checkMobile()) {
      let interval: ReturnType<typeof setInterval> | undefined;

      const timer = setTimeout(() => {
        setMobileGlow(true);
        interval = setInterval(() => {
          setMobileGlow(prev => !prev);
        }, 1000);
      }, index * 300);

      return () => {
        clearTimeout(timer);
        if (interval !== undefined) clearInterval(interval);
      };
    }
  }, [index]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width) - 0.5;
    const yPercent = (y / rect.height) - 0.5;

    setTilt({ x: xPercent * 6, y: -yPercent * 6 });
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768) {
      setIsHovered(false);
      setTilt({ x: 0, y: 0 });
    }
  };

  const handleMouseEnter = () => {
    if (window.innerWidth >= 768) {
      setIsHovered(true);
    }
  };

  const handleClick = () => {
    if (window.innerWidth < 768) {
      setIsClicked(prev => !prev);
    }
  };

  const active = isHovered || isClicked || mobileGlow;

  const spotlightStyle = active
    ? {
        background: `radial-gradient(280px circle at ${mousePos.x || 150}px ${mousePos.y || 150}px, rgba(212, 175, 55, 0.08) 0%, rgba(18, 18, 18, 0.25) 60%, rgba(10, 10, 10, 0.95) 100%)`,
      }
    : {
        background: "radial-gradient(circle at 50% 50%, rgba(18, 18, 18, 0.6) 0%, rgba(10, 10, 10, 0.98) 100%)",
      };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onTouchStart={() => {
        setIsTouched(true);
        setTimeout(() => setIsTouched(false), 300);
      }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: 5 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: false, margin: "-120px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      style={{
        transform: active
          ? `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) translateZ(6px)`
          : "perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)",
        transition: active ? "none" : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        borderColor: isTouched ? "rgba(190, 165, 135, 0.35)" : undefined,
      }}
      role="button"
      tabIndex={0}
      aria-label={title}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleClick(); }}
      className={`group relative w-full rounded-[24px] border py-7 px-6 flex flex-col items-center lg:items-start text-center lg:text-left overflow-hidden cursor-pointer select-none shadow-[10px_10px_35px_rgba(0,0,0,0.6)] transition-all duration-500 md:hover:-translate-y-1 md:hover:border-white/[0.08] md:hover:shadow-[0_15px_30px_rgba(212,175,55,0.02)] ${active ? "border-white/[0.08] shadow-[0_15px_30px_rgba(212,175,55,0.02)]" : "border-white/[0.03]"}`}
    >
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-500 ease-out z-0"
        style={spotlightStyle}
      />
      <div className="absolute inset-[1px] rounded-[23px] bg-[#0C0C0B]/95 pointer-events-none z-0" />
      <div 
        className={`absolute w-[150px] h-[150px] rounded-full bg-[#BEA587]/2 blur-[40px] transition-opacity duration-1000 pointer-events-none z-0 ${active ? 'opacity-100' : 'opacity-0'}`}
        style={{
          left: mousePos.x - 75,
          top: mousePos.y - 75,
        }}
      />

      {/* Row 1: category label + dot — fixed height */}
      <div className="relative z-10 flex items-center justify-center lg:justify-between w-full mb-5 gap-2">
        <span className={`font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.2em] transition-colors duration-500 ${active ? 'text-[#BEA587]' : 'text-[#BEA587]/55'}`}>
          {tabCategory}
        </span>
        <div className="hidden lg:flex items-center gap-1.5">
          <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${active ? 'bg-[#BEA587] shadow-[0_0_8px_rgba(212,175,55,0.7)]' : 'bg-[#BEA587]/25 shadow-[0_0_6px_transparent]'}`} />
        </div>
      </div>

      {/* Row 2: icon — fixed height */}
      <div className="relative z-10 mb-5 flex items-center justify-center lg:justify-start w-full">
        <div className="relative">
          <div className={`absolute inset-[-8px] bg-[#BEA587]/4 rounded-full blur-lg transition-opacity duration-500 pointer-events-none ${active ? 'opacity-100' : 'opacity-0'}`} />
          <div className={`relative w-14 h-14 rounded-full border bg-[#BEA587]/[0.03] backdrop-blur-md flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-all duration-500 ${active ? 'border-[#BEA587]/50 shadow-[0_0_12px_rgba(212,175,55,0.15)] text-[#BEA587]' : 'border-[#BEA587]/20 text-[#BEA587]/90'}`}>
            <div className="absolute inset-[1px] rounded-full bg-gradient-to-b from-[#BEA587]/10 to-transparent pointer-events-none" />
            <Icon size={24} className={`transition-transform duration-500 ${active ? 'scale-110' : ''}`} />
          </div>
        </div>
      </div>

      {/* Row 3: descriptor + title + bar + description — flows naturally, no mt-auto */}
      <div className="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left w-full">
        <span className={`font-sans text-[10px] tracking-[0.1em] transition-all duration-300 block mb-1.5 font-medium ${active ? 'text-white' : 'text-[#BEA587]/80'}`}>
          {descriptor}
        </span>
        <h3 className="font-sans font-medium text-sm sm:text-base uppercase tracking-wider text-white leading-tight max-w-full">
          {title}
        </h3>
        <div className={`h-[2px] bg-[#BEA587] mt-3 transition-all duration-500 rounded-full ${active ? 'w-16' : 'w-8'}`} />
        <p className="font-sans text-[13px] sm:text-[14px] text-[#b0a99a] font-light leading-relaxed mt-4 max-w-full">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default function About() {
  const categories = [
    { 
      title: "Hyderabad", 
      icon: MapPin, 
      descriptor: "Local studio",
      tabCategory: "Location",
      description: "We're a Hyderabad-native studio. We understand local businesses, local customers, and what it takes to stand out in this city."
    },
    { 
      title: "Focused", 
      icon: HandshakeIcon, 
      descriptor: "One project at a time",
      tabCategory: "Approach",
      description: "We don't juggle dozens of clients. Each project gets our full focus — so nothing falls through the cracks and you always know where things stand."
    },
    { 
      title: "Fast", 
      icon: Clock4, 
      descriptor: "Under two weeks",
      tabCategory: "Timeline",
      description: "From first call to live website in 7–14 days. No drawn-out timelines, no waiting months to see results."
    },
    { 
      title: "Transparent", 
      icon: Sparkles, 
      descriptor: "One fee, no surprises",
      tabCategory: "Pricing",
      description: "A single one-time payment covers everything — design, development, and launch. No monthly retainers, no hidden add-ons, no lock-in."
    },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="about"
      className="relative py-16 md:py-36 px-6 overflow-hidden bg-[#070707] text-white transition-colors duration-500 select-none"
    >
      <div className="absolute top-[20%] left-[-15dvw] w-[60dvw] h-[60dvw] rounded-full bg-gradient-to-r from-amber-500/10 via-[#BEA587]/5 to-transparent blur-[120px] pointer-events-none opacity-80" />
      <div className="absolute bottom-[-10dvw] right-[-10dvw] w-[45dvw] h-[45dvw] rounded-full bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent blur-[140px] pointer-events-none opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none opacity-50" />

      <div className="max-w-6xl mx-auto relative z-10 font-sans">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-stretch">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left h-full"
          >
            <div className="flex flex-col items-center lg:items-start">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "50px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#BEA587]/20 bg-[#BEA587]/[0.03] shadow-[0_8px_30px_rgba(190,165,135,0.05)] backdrop-blur-3xl mb-8 relative overflow-hidden group hover:border-[#BEA587]/40"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#BEA587]/10 to-transparent translate-x-[-100%] animate-[shimmer_3s_infinite]" />
                <Sparkles size={12} className="text-[#c8bfaf] opacity-90 relative z-10" />
                <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.45em] font-semibold text-[#d6cdbf] relative z-10">Who We Are</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "50px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.h2 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] font-bold tracking-tight text-white leading-[1.08] mb-0"
                >
                  About{" "}
                  <span className="text-[#BEA587] font-serif italic font-normal tracking-wide block sm:inline mt-1 sm:mt-0 lowercase text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem]">
                    haebaragi studio.
                  </span>
                </motion.h2>
              </motion.div>

              <div className="w-16 h-[1px] bg-gradient-to-r from-[#BEA587]/40 to-transparent my-8 mx-auto lg:mx-0" />

              <div className="text-[#b0a99a] font-light text-sm sm:text-base leading-relaxed">
                <p className="font-sans text-lg sm:text-xl font-light text-neutral-100 leading-relaxed tracking-wide">
                  Haebaragi Studio builds custom websites for doctors, restaurants, and gyms in Hyderabad — designed from scratch, delivered in under two weeks, for a one-time fee. No templates, no monthly fees, no lock-in.
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-10">
              
              <div className="w-full pt-2">
                <div className="grid grid-cols-3 divide-x divide-white/10">
                  <div className="flex flex-col items-center lg:items-start text-center lg:text-left pr-4 sm:pr-8">
                    <div className="font-serif text-5xl sm:text-[4rem] lg:text-[4.5rem] font-light text-[#BEA587] leading-none mb-3 tracking-tight italic">
                      <Counter from={0} to={10} suffix="+" duration={1.5} />
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 font-semibold leading-relaxed">Websites<br/>Built</div>
                  </div>
                  <div className="flex flex-col items-center lg:items-start text-center lg:text-left px-4 sm:px-8">
                    <div className="font-serif text-5xl sm:text-[4rem] lg:text-[4.5rem] font-light text-[#BEA587] leading-none mb-3 tracking-tight italic">
                      <Counter from={0} to={7} suffix="" duration={1.5} />
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 font-semibold leading-relaxed">Days<br/>Delivery</div>
                  </div>
                  <div className="flex flex-col items-center lg:items-start text-center lg:text-left pl-4 sm:pl-8">
                    <div className="font-serif text-5xl sm:text-[4rem] lg:text-[4.5rem] font-light text-[#BEA587] leading-none mb-3 tracking-tight italic">
                      <Counter from={0} to={100} suffix="%" duration={2.5} />
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 font-semibold leading-relaxed">Custom<br/>Built</div>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-center lg:justify-start">
                <button
                  onClick={() => scrollToSection("projects")}
                  className="group inline-flex items-center gap-2 px-7 py-4 rounded-full border border-[#BEA587] text-[#BEA587] hover:bg-[#BEA587]/10 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-300 text-[10px] font-bold tracking-[0.2em] uppercase cursor-pointer"
                >
                  <span>See Our Work</span>
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                </button>
              </div>

            </div>
          </motion.div>

          <div className="lg:col-span-6 flex items-stretch justify-center">
            <div className="relative w-full p-5 sm:p-6 rounded-[32px] bg-[#0e0e0d]/60 border border-white/[0.07] shadow-[inset_0_1px_1px_rgba(255,255,255,0.03),0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-44 h-44 bg-[#BEA587]/[0.015] blur-3xl rounded-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#BEA587]/[0.01] blur-2xl rounded-full pointer-events-none" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 relative z-10">
                {categories.map((cat, idx) => (
                  <LuxuryCard 
                    key={cat.title} 
                    title={cat.title} 
                    icon={cat.icon} 
                    descriptor={cat.descriptor}
                    tabCategory={cat.tabCategory}
                    description={cat.description}
                    index={idx} 
                  />
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
