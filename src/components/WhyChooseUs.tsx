import React, { useState, FormEvent, useRef, useEffect, MouseEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { 
  Palette, 
  Smartphone, 
  Zap, 
  LineChart, 
  Code, 
  ShieldCheck, 
  X, 
  Send, 
  Check, 
  ChevronLeft, 
  ChevronRight,
  ArrowRight,
  Mail
} from "lucide-react";
import { WHY_CHOOSE_US } from "../data.ts";

type CardKey = "modern_ui" | "mobile_responsive" | "fast_performance" | "business_focused" | "clean_dev";

interface PillarDetail {
  key: CardKey;
  num: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  description: string;
  image: string;
  glowColor: string; // Tailwind glow border color class
  accentHex: string;  // Hex code for active state decoration
  badgeText: string;
}

const PILLARS: PillarDetail[] = [
  {
    key: "modern_ui",
    num: "01",
    title: "Modern UI Design",
    subtitle: "STANDS OUT ONLINE",
    icon: Palette,
    description: "Your website is built entirely from scratch — no templates, no page builders. It looks nothing like your competitors and reflects the quality of your actual business.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop",
    glowColor: "shadow-[#BEA587]/25",
    accentHex: "#BEA587",
    badgeText: "Stands Out Online"
  },
  {
    key: "mobile_responsive",
    num: "02",
    title: "Mobile Responsive",
    subtitle: "WORKS ON ANY PHONE",
    icon: Smartphone,
    description: "Most of your customers will visit from their phone. Every page is tested to look perfect and load fast on mobile — so you never lose a potential patient or diner to a broken layout.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    glowColor: "shadow-cyan-500/25",
    accentHex: "#38BDF8",
    badgeText: "Works on Mobile"
  },
  {
    key: "fast_performance",
    num: "03",
    title: "Fast Performance",
    subtitle: "RANKS HIGHER ON GOOGLE",
    icon: Zap,
    description: "Slow websites lose visitors in 3 seconds. Ours load in under 2 seconds, which also helps you rank higher on Google — so more people in your area find you before your competitors.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    glowColor: "shadow-emerald-500/25",
    accentHex: "#34D399",
    badgeText: "Loads Under 2s"
  },
  {
    key: "business_focused",
    num: "04",
    title: "Business Focused",
    subtitle: "CONVERTS VISITORS",
    icon: LineChart,
    description: "Every layout decision is made with one goal: to get visitors to take action — call your clinic, book a table, or sign up for a membership. Good design that doesn't convert is just decoration.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop",
    glowColor: "shadow-amber-500/25",
    accentHex: "#F59E0B",
    badgeText: "Gets You Customers"
  },
  {
    key: "clean_dev",
    num: "05",
    title: "Clean Development",
    subtitle: "BUILT TO LAST",
    icon: Code,
    description: "No bloated page-builders that break after a year. Clean, hand-written code means your site stays fast and stable — and is easy to update whenever your business changes.",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop",
    glowColor: "shadow-violet-500/25",
    accentHex: "#BEA587",
    badgeText: "No Templates Used"
  }
];

function MobileFlipCard({ pillar, index }: { pillar: PillarDetail; index: number; key?: string }) {
  const [active, setActive] = useState(false);
  const Icon = pillar.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-60px" }}
      transition={{ duration: 0.9, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full cursor-pointer select-none"
      onClick={() => setActive(v => !v)}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onTouchStart={() => setActive(true)}
      onTouchEnd={() => setTimeout(() => setActive(false), 600)}
    >
      {/* card */}
      <div
        className="relative w-full rounded-[20px] overflow-hidden"
        style={{
          background: '#0b0b0b',
          border: `1px solid ${active ? 'rgba(190,165,135,0.18)' : 'rgba(255,255,255,0.04)'}`,
          boxShadow: active
            ? '0 20px 60px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.04) inset'
            : '0 8px 30px rgba(0,0,0,0.6)',
          transform: active ? 'translateY(-2px)' : 'translateY(0)',
          transition: 'border-color 0.5s ease, box-shadow 0.5s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* film grain — same as rest of site */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-overlay z-20"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
        />

        {/* image — full-card, very dark, breathes on hover */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={pillar.image}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="w-full h-full object-cover"
            style={{
              opacity: active ? 0.28 : 0.06,
              transform: active ? 'scale(1.04)' : 'scale(1.0)',
              transition: 'opacity 0.4s ease, transform 1.6s cubic-bezier(0.16,1,0.3,1)',
              filter: 'saturate(0.6) brightness(0.75)',
            }}
          />
          {/* dark overlay — lifts on touch so image shows through */}
          <div className="absolute inset-0" style={{
            background: active
              ? 'linear-gradient(135deg, rgba(11,11,11,0.30) 0%, rgba(11,11,11,0.55) 100%)'
              : 'linear-gradient(135deg, rgba(11,11,11,0.55) 0%, rgba(11,11,11,0.82) 100%)',
            transition: 'background 0.4s ease',
          }} />
        </div>

        {/* subtle top-edge gold line — same as desktop cards */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[1px] z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent 5%, rgba(190,165,135,0.30) 50%, transparent 95%)',
            opacity: active ? 1 : 0.4,
            transition: 'opacity 0.5s ease',
          }}
        />

        {/* ambient gold spotlight — appears on interaction */}
        <div
          aria-hidden="true"
          className="absolute pointer-events-none z-0"
          style={{
            inset: '-20px',
            background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(190,165,135,0.07) 0%, transparent 70%)',
            opacity: active ? 1 : 0,
            transition: 'opacity 0.8s ease',
          }}
        />

        {/* ── content ── */}
        <div className="relative z-10 p-6 sm:p-7 flex flex-col gap-5">

          {/* top row: icon centred, number top-right */}
          <div className="flex flex-col items-center gap-3 relative">
            <span
              className="font-mono text-[10px] tracking-[0.35em] font-medium absolute top-0 right-0"
              style={{ color: active ? '#BEA587' : 'rgba(190,165,135,0.35)', transition: 'color 0.4s ease' }}
            >
              {pillar.num}
            </span>

            <div
              className="w-10 h-10 rounded-full border flex items-center justify-center flex-shrink-0"
              style={{
                borderColor: active ? 'rgba(190,165,135,0.45)' : 'rgba(255,255,255,0.07)',
                background: active ? 'rgba(190,165,135,0.06)' : 'transparent',
                transition: 'all 0.5s ease',
                boxShadow: active ? '0 0 14px rgba(190,165,135,0.12)' : 'none',
              }}
            >
              <Icon
                size={16}
                strokeWidth={1.5}
                style={{ color: active ? '#BEA587' : 'rgba(190,165,135,0.55)', transition: 'color 0.4s ease' }}
              />
            </div>
          </div>

          {/* title + subtitle — centred */}
          <div className="text-center">
            <p
              className="font-mono text-[8.5px] uppercase tracking-[0.32em] mb-2.5"
              style={{ color: 'rgba(190,165,135,0.45)' }}
            >
              {pillar.subtitle}
            </p>
            <h3 className="font-sans font-semibold text-[1.1rem] sm:text-[1.2rem] text-white tracking-tight leading-snug">
              {pillar.title}
            </h3>
          </div>

          {/* gold underline — centred */}
          <div className="flex justify-center">
            <div
              className="h-[2px] rounded-full bg-[#BEA587]"
              style={{
                width: active ? '40px' : '20px',
                opacity: active ? 1 : 0.4,
                transition: 'width 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.5s ease',
              }}
            />
          </div>

          {/* description — centred */}
          <p
            className="font-sans text-[13px] sm:text-[13.5px] font-light leading-relaxed text-center"
            style={{
              color: active ? '#b0a99a' : 'rgba(150,143,135,0.65)',
              transition: 'color 0.5s ease',
            }}
          >
            {pillar.description}
          </p>

          {/* footer: badge label — centred */}
          <div className="flex items-center justify-center gap-2 pt-1">
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-500"
              style={{
                background: '#BEA587',
                opacity: active ? 1 : 0.3,
                boxShadow: active ? '0 0 6px rgba(190,165,135,0.8)' : 'none',
              }}
            />
            <span
              className="font-mono text-[8px] uppercase tracking-[0.3em] transition-colors duration-500"
              style={{ color: active ? 'rgba(190,165,135,0.7)' : 'rgba(190,165,135,0.3)' }}
            >
              {pillar.badgeText}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  const [activeKey, setActiveKey] = useState<CardKey>("modern_ui");
  const [hoveredKey, setHoveredKey] = useState<CardKey | null>(null);
  const shouldReduce = useReducedMotion();

  // Parallax Tilt state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const viewportRef = useRef<HTMLDivElement>(null);

  const activeIndex = PILLARS.findIndex(p => p.key === activeKey);
  const activePillar = PILLARS[activeIndex];

  // Mouse tilt effect for 3D parallax
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!viewportRef.current) return;
    const rect = viewportRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // range -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // range -0.5 to 0.5
    setTilt({ x: x * 10, y: y * 10 }); // max 10 degrees tilt
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % PILLARS.length;
    setActiveKey(PILLARS[nextIdx].key);
  };

  const handlePrev = () => {
    const prevIdx = (activeIndex - 1 + PILLARS.length) % PILLARS.length;
    setActiveKey(PILLARS[prevIdx].key);
  };

  return (
    <section
      id="whyus"
      className="relative py-16 md:py-40 px-6 overflow-hidden bg-[#030303] text-white select-none transition-colors duration-500"
    >
      {/* Immersive cinematic background gradients & Atmospheric Depth */}
      <div className="absolute top-[-15%] left-[-10%] w-[50vw] h-[50vh] bg-gradient-to-br from-[#BEA587]/[0.08] via-transparent to-transparent blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute top-[-5%] right-[-10%] w-[40vw] h-[40vh] bg-gradient-to-bl from-[#BEA587]/[0.04] via-transparent to-transparent blur-[100px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vh] bg-gradient-to-tl from-[#a38d70]/[0.06] via-black/10 to-transparent blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
      
      {/* Particles/Grain/Depth Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
         {/* Subtle atmospheric vignette */}
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_200%_150%_at_50%_40%,transparent_30%,#030303_100%)]" />
      </div>
      
      {/* Dynamic Environmental Drift - The Wow Detail */}
      <motion.div
        animate={shouldReduce ? { x: 0, y: 0, opacity: 0.5, scale: 1 } : {
          x: ["-5%", "5%", "-5%"],
          y: ["-5%", "5%", "-5%"],
          opacity: [0.3, 0.7, 0.3],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={shouldReduce ? { duration: 0 } : {
          duration: 20,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        className="absolute top-[30%] left-[20%] w-[70vw] h-[70vw] bg-[radial-gradient(circle_at_center,rgba(190,165,135,0.03),transparent_70%)] blur-[120px] rounded-full pointer-events-none mix-blend-screen z-0"
      />

      {/* Cinematic noise/grain texture - ultra subtle */}
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGZpbHRlciBpZD0ibiI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOCIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsdGVyPSJ1cmwoI24pIi8+PC9zdmc+')] z-0"/>
      
      {/* Dynamic Ambient light halo that morphs in size/color dependent on the active key */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80dvw] h-[80dvw] rounded-full blur-[180px] pointer-events-none opacity-25 transition-colors duration-[1500ms] ease-[cubic-bezier(0.2,1,0.25,1)] z-0 mix-blend-screen"
        style={{
          background: `radial-gradient(circle, ${activePillar.accentHex} 0%, transparent 60%)`
        }}
      />

      <div className="max-w-[1400px] mx-auto relative z-10 w-full">

        {/* SECTION HEADER BLOCK - Connected Editorial Flow */}
        <div className="relative mb-12 md:mb-16 md:pl-12 text-center lg:text-left max-w-5xl z-20 flex flex-col items-center lg:items-start mx-auto lg:mx-0">
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "50px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-[#BEA587]/30 bg-[#BEA587]/[0.05] shadow-[0_8px_30px_rgba(190,165,135,0.08)] backdrop-blur-3xl mb-8 relative overflow-hidden group"
          >
            {/* Ambient shimmer inside the badge */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#BEA587]/20 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_2s_infinite] animate-[shimmer_4s_infinite]" />
            <ShieldCheck size={14} className="text-[#c8bfaf] opacity-100 relative z-10 drop-shadow-[0_0_8px_rgba(200,191,175,0.8)]" />
            <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.45em] font-semibold text-[#E0D5C1] relative z-10">Studio Standard</span>
          </motion.div>

          <div className="flex flex-col gap-5 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "50px" }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.h2
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="font-serif italic text-[4rem] sm:text-[5rem] md:text-[6.5rem] lg:text-[7.5rem] font-light tracking-[0.01em] text-white leading-[0.95]"
              >
                Why Choose <br className="hidden lg:block" />
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#e8decb] via-[#f9efe2] to-[#BEA587] bg-[length:200%_auto] font-sans not-italic font-medium tracking-[-0.03em] pr-4 drop-shadow-[0_0_30px_rgba(190,165,135,0.4)] text-[3.5rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6.5rem] md:ml-4">
                  Us.
                </span>
              </motion.h2>
            </motion.div>
          </div>
        </div>

        {/* TWO COLUMN PREMIUM INTERACTIVE ECOSYSTEM (lg:grid) */}
        <div className="hidden lg:grid grid-cols-12 gap-10 lg:gap-16 items-start relative mt-4 z-20 md:pl-12">
          
          {/* LEFT INDEX CONTROLLER PANEL (col-span-4) */}
          <div className="col-span-5 xl:col-span-4 flex flex-col justify-between py-2 relative">
            <div className="space-y-3 relative">
              
              {/* Connected Beam Track - Ambient Glow */}
              <div className="absolute left-[34px] top-10 bottom-10 w-[1px] bg-white/[0.05] pointer-events-none z-0">
                <motion.div 
                  className="absolute left-[-2px] w-[5px] rounded-full transition-all duration-[1000ms] ease-[cubic-bezier(0.2,1,0.25,1)]"
                  style={{
                    backgroundColor: activePillar.accentHex,
                    boxShadow: `0 0 20px ${activePillar.accentHex}, 0 0 8px white`,
                    top: `${(activeIndex / PILLARS.length) * 100}%`,
                    height: `${100 / PILLARS.length}%`
                  }}
                />
              </div>

              {PILLARS.map((pillar) => {
                const isActive = activeKey === pillar.key;
                const isHovered = hoveredKey === pillar.key;
                const Icon = pillar.icon;

                return (
                  <button
                    key={pillar.key}
                    onClick={() => setActiveKey(pillar.key)}
                    onMouseEnter={() => setHoveredKey(pillar.key)}
                    onMouseLeave={() => setHoveredKey(null)}
                    className={`w-full text-left flex items-start gap-6 p-5 rounded-[1.5rem] transition-all duration-[700ms] ease-[cubic-bezier(0.2,1,0.25,1)] relative group cursor-pointer focus:outline-none overflow-hidden
                      ${isActive ? 'bg-[#080808]/90 scale-[1.02] shadow-[0_20px_40px_rgba(0,0,0,0.6)]' : 'bg-transparent hover:bg-white/[0.02] hover:-translate-y-0.5'}
                    `}
                    style={{
                      border: isActive ? `1px solid rgba(190,165,135,0.3)` : "1px solid transparent",
                      boxShadow: isActive ? `0 20px 50px rgba(0,0,0,0.6), inset 0 1px 2px rgba(190,165,135,0.1)` : "none"
                    }}
                  >
                    {/* Background hover light (cinematic soft ambient) */}
                    <div className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-br from-transparent via-[#BEA587]/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-screen" />
                    
                    {/* Active Soft Edge Glow */}
                    {isActive && (
                      <>
                        <motion.div layoutId="whyusActiveEdgePulse" className="absolute inset-y-0 left-0 w-1.5 rounded-l-[1.5rem] bg-gradient-to-b from-transparent via-white to-transparent opacity-60" style={{ backgroundImage: `linear-gradient(to bottom, transparent, ${pillar.accentHex}, transparent)` }} />
                        <div className="absolute inset-0 rounded-[1.5rem] pointer-events-none overflow-hidden">
                          <div className="w-[150%] h-px absolute top-0 left-[-25%] bg-gradient-to-r from-transparent via-[#BEA587]/30 to-transparent" />
                        </div>
                      </>
                    )}

                    {/* Numeric and Icon Track block */}
                    <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-[1.25rem] bg-[#050505] border shadow-2xl flex-shrink-0 transition-all duration-[700ms] ease-[cubic-bezier(0.2,1,0.25,1)]"
                      style={{
                        borderColor: isActive ? pillar.accentHex + "60" : "rgba(30,30,30,0.8)",
                        boxShadow: isActive ? `0 0 35px ${pillar.accentHex}40, inset 0 0 15px ${pillar.accentHex}20` : "inset 0 0 10px rgba(0,0,0,0.5)"
                      }}
                    >
                      {/* Active inner bloom */}
                      {isActive && <div className="absolute inset-0 rounded-[1.25rem] blur-md opacity-30 pointer-events-none" style={{ backgroundColor: pillar.accentHex }} />}
                      
                      <Icon 
                        size={22} 
                        strokeWidth={isActive ? 2 : 1.5}
                        className={`transition-all duration-[700ms] ease-[cubic-bezier(0.2,1,0.25,1)] relative z-10 ${isActive ? 'scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]' : 'group-hover:scale-110'}`}
                        style={{ color: isActive ? "#ffffff" : "rgba(190,165,135,0.6)" }}
                      />
                    </div>

                    {/* Details content */}
                    <div className="relative z-10 select-none flex-1 pt-1.5 pb-2">
                       <div className="flex items-center gap-3 mb-1">
                        <span className="font-mono text-[9px] uppercase tracking-[0.3em] font-semibold transition-colors duration-500"
                          style={{ color: isActive ? pillar.accentHex : "rgba(190,165,135,0.5)" }}>
                          PILLAR {pillar.num}
                        </span>
                        {isActive && (
                           <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="h-0.5 w-4 rounded-full" style={{ backgroundColor: pillar.accentHex }} />
                        )}
                       </div>
                      <h3 className={`font-sans text-lg lg:text-xl tracking-tight transition-colors duration-500 ${isActive ? 'font-medium text-white' : 'font-light text-[#c8bfaf]'}`}
                      >
                        {pillar.title}
                      </h3>
                      
                      {/* Spring Expandable mini bullet info */}
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.p
                            initial={{ height: 0, opacity: 0, filter: "blur(4px)" }}
                            animate={{ height: "auto", opacity: 0.9, filter: "blur(0px)" }}
                            exit={{ height: 0, opacity: 0, filter: "blur(4px)" }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="font-sans text-sm text-[#c8bfaf] font-light leading-relaxed mt-2 overflow-hidden mix-blend-plus-lighter"
                          >
                            {pillar.subtitle} — Optimized focus.
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT PANORAMIC SHIFTING VIEWPORT (col-span-7 or 8) */}
          <div className="col-span-7 xl:col-span-8 relative z-20">
            
            {/* Magnetic Parallax Container Outer frame */}
            <div 
              ref={viewportRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full aspect-[4/3] rounded-[40px] bg-[#030303]/80 backdrop-blur-xl p-3 sm:p-5 shadow-[0_50px_100px_rgba(0,0,0,0.95)] border border-[#BEA587]/[0.15] transition-shadow duration-[1000ms] ease-[cubic-bezier(0.2,1,0.25,1)] select-none overflow-hidden group/showcase"
              style={{
                boxShadow: `0 40px 100px rgba(0,0,0,0.95), 0 0 100px ${activePillar.accentHex}15`
              }}
            >
              {/* Material Layering & Inner Edge Lighting */}
              <div className="absolute inset-0 rounded-[40px] pointer-events-none border border-white/[0.08] mix-blend-overlay z-20" />
              <div className="absolute inset-0 rounded-[40px] pointer-events-none shadow-[inset_0_4px_40px_rgba(0,0,0,0.9),inset_0_2px_4px_rgba(190,165,135,0.15)] z-20" />
              
              {/* Animated Glow Border */}
              <div 
                className="absolute inset-[-1px] rounded-[42px] pointer-events-none z-10 opacity-60 mix-blend-screen"
                style={{
                  background: `linear-gradient(135deg, transparent, ${activePillar.accentHex}40, transparent)`,
                  boxShadow: `0 0 30px ${activePillar.accentHex}30`
                }}
              />

              {/* Inner content layer with parallax transform applied directly */}
              <div 
                className="w-full h-full relative rounded-[32px] overflow-hidden transition-transform duration-200 ease-out flex flex-col justify-between bg-[#030105] shadow-inner"
                style={{
                  transform: `perspective(1200px) rotateX(${-tilt.y}deg) rotateY(${tilt.x}deg)`
                }}
              >
                
                {/* 1. VIEWPORT MAIN BACKGROUND SLIDE IMAGE */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeKey}
                    initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img
                      src={activePillar.image}
                      alt={activePillar.title}
                      loading="lazy"
                      className="w-full h-full object-cover opacity-[0.65] filter brightness-[0.85] saturate-[1.1] contrast-[1.15] transition-all duration-[1800ms] ease-[cubic-bezier(0.2,1,0.25,1)] group-hover/showcase:scale-[1.03] group-hover/showcase:opacity-[0.85] group-hover/showcase:brightness-[0.95]"
                      referrerPolicy="no-referrer"
                    />
                    {/* Depth Gradient anchoring the typography gracefully */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/70 to-transparent opacity-95 pointer-events-none z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#020202]/50 via-transparent to-[#020202]/30 opacity-80 pointer-events-none z-10" />
                    {/* Environmental Soft Hover Glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(190,165,135,0.35),transparent_60%)] opacity-0 group-hover/showcase:opacity-100 transition-opacity duration-[1400ms] mix-blend-screen pointer-events-none z-10" />
                  </motion.div>
                </AnimatePresence>

                {/* 2. Glassmorphic badge header */}
                <div className="relative z-20 flex items-center justify-between p-5 md:p-8">
                  <div className="px-5 py-2.5 rounded-full bg-[#030303]/80 border border-[#BEA587]/30 backdrop-blur-3xl flex items-center gap-3 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
                    <span className="w-2 h-2 rounded-full motion-safe:animate-pulse" style={{ backgroundColor: activePillar.accentHex, boxShadow: `0 0 12px ${activePillar.accentHex}` }} />
                    <span className="font-sans text-[10px] uppercase tracking-[0.35em] font-semibold text-[#d6cdbf]">{activePillar.badgeText}</span>
                  </div>
                  
                  {/* Slide counter */}
                  <span className="font-mono text-[9px] text-[#BEA587] uppercase tracking-[0.4em] bg-[#030303]/60 px-4 py-2.5 rounded-xl border border-[#BEA587]/20 backdrop-blur-xl shadow-lg">
                    {activePillar.num} / 05
                  </span>
                </div>

                {/* 3. Floating Content Card overlapping bottom nicely */}
                <div className="relative z-20 p-6 md:p-10 flex-col flex justify-end flex-grow">
                  <div className="max-w-xl">
                    <span className="font-mono text-[10px] flex items-center gap-3 uppercase tracking-[0.4em] mb-6 font-semibold text-[#c8bfaf] drop-shadow-[0_0_10px_rgba(190,165,135,0.3)]">
                      <div className="w-6 h-[2px] bg-[#BEA587]/70 rounded-full" />
                      {activePillar.subtitle}
                    </span>
                    
                    <h3 className="font-serif italic text-4xl sm:text-5xl md:text-[3.5rem] font-light tracking-tight text-white mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] leading-[1.1]">
                      {activePillar.title}
                    </h3>
                    
                    <p className="font-sans text-[15px] md:text-[17px] text-[#e8decb] font-light leading-[1.8] mix-blend-plus-lighter w-11/12 md:max-w-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] pt-2 border-t border-[#BEA587]/20 mt-2">
                       <span className="opacity-90">{activePillar.description}</span>
                    </p>
                  </div>
                </div>

                {/* 4. NAVIGATION BAR AT BOTTOM */}
                <div className="relative z-20 flex items-center justify-between px-8 pb-8 pt-4 gap-4">
                  <div className="flex items-center gap-3">
                    {PILLARS.map((p, idx) => (
                       <button
                       key={p.key}
                       onClick={() => setActiveKey(p.key)}
                       className="h-[4px] rounded-full transition-all duration-[800ms] ease-[cubic-bezier(0.2,1,0.25,1)] relative overflow-hidden"
                       style={{
                         width: activeKey === p.key ? "48px" : "16px",
                         backgroundColor: "rgba(255,255,255,0.1)",
                         boxShadow: activeKey === p.key ? `0 0 20px ${activePillar.accentHex}80` : "none"
                       }}
                       aria-label={`Slide ${idx + 1}`}
                     >
                       {activeKey === p.key && (
                         <motion.div 
                           layoutId="whyusActiveSlideIndicator"
                           className="absolute inset-0 rounded-full"
                           style={{ backgroundColor: activePillar.accentHex }}
                         />
                       )}
                     </button>
                    ))}
                  </div>

                  {/* Elegant arrow slider controls replacing the misplaced floating arrow */}
                  <div className="flex items-center gap-4 bg-[#050505]/90 rounded-2xl p-2 border border-[#BEA587]/30 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="p-3 rounded-xl text-[#d6cdbf] hover:text-white hover:bg-[#BEA587]/20 transition-all duration-300 cursor-pointer shadow-inner active:scale-95"
                      title="Previous Slide"
                      style={{ boxShadow: 'inset 0 0 10px rgba(255,255,255,0.02)' }}
                    >
                      <ChevronLeft size={18} strokeWidth={2.5} />
                    </button>
                    <span className="font-mono text-[11px] text-[#e8decb] font-semibold px-2 tracking-[0.3em]">
                      {activePillar.num} <span className="opacity-40">/</span> 05
                    </span>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="p-3 rounded-xl text-[#d6cdbf] hover:text-white hover:bg-[#BEA587]/20 transition-all duration-300 cursor-pointer shadow-inner active:scale-95"
                      title="Next Slide"
                      style={{ boxShadow: 'inset 0 0 10px rgba(255,255,255,0.02)' }}
                    >
                      <ChevronRight size={18} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* MOBILE RESPONSIVE TOUCH GRID FALLBACK (lg:hidden) */}
        <div className="lg:hidden mt-8 relative z-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PILLARS.map((pillar, index) => (
              <MobileFlipCard key={pillar.key} pillar={pillar} index={index} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
