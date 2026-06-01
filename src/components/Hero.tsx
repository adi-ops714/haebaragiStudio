import { useState, useRef, MouseEvent } from "react";
import { motion, useReducedMotion, useMotionValue, useTransform, useSpring } from "motion/react";
import { Stethoscope, UtensilsCrossed, Dumbbell, ArrowRight, ArrowUpRight } from "lucide-react";

interface HeroProps {
  onExploreClick: () => void;
  onInquireClick: () => void;
}

export default function Hero({ onExploreClick, onInquireClick }: HeroProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoveringPrimary, setIsHoveringPrimary] = useState(false);
  const shouldReduce = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);

  // Smooth spring-based parallax for orbital
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const smoothX = useSpring(rawX, { stiffness: 80, damping: 30 });
  const smoothY = useSpring(rawY, { stiffness: 80, damping: 30 });
  const orbitalX = useTransform(smoothX, [-500, 500], [-18, 18]);
  const orbitalY = useTransform(smoothY, [-400, 400], [-12, 12]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    setMousePos({ x: clientX, y: clientY });
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      rawX.set(clientX - rect.left - rect.width / 2);
      rawY.set(clientY - rect.top - rect.height / 2);
    }
  };

  // Niche pills — desktop only
  const niches = [
    { icon: Stethoscope, label: "Doctors & Clinics" },
    { icon: UtensilsCrossed, label: "Restaurants" },
    { icon: Dumbbell, label: "Gyms & Studios" },
  ];

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100dvh] flex flex-col justify-center items-center overflow-hidden bg-[#070707] text-white select-none"
      aria-label="Hero"
      style={{ isolation: "isolate" }}
    >

      {/* ─── ATMOSPHERIC LAYERS ──────────────────────────────── */}

      {/* Film grain */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay z-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage: "linear-gradient(to right,rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.018) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%,black 55%,transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%,black 55%,transparent 100%)",
        }}
      />

      {/* Central breathing glow */}
      <motion.div
        aria-hidden="true"
        animate={shouldReduce ? {} : {
          scale: [1, 1.12, 0.92, 1.06, 1],
          x: [0, 30, -20, 15, 0],
          y: [0, -20, 18, -8, 0],
          opacity: [0.065, 0.1, 0.05, 0.09, 0.065],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65dvw] h-[65dvw] max-w-[860px] max-h-[860px] rounded-full bg-[#BEA587] blur-[140px] pointer-events-none z-[1]"
        style={{ opacity: 0.065 }}
      />

      {/* Top-right accent orb */}
      <motion.div
        aria-hidden="true"
        animate={shouldReduce ? {} : { opacity: [0.04, 0.08, 0.04], scale: [0.85, 1.15, 0.85] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute top-[8%] right-[5%] w-[22dvw] h-[22dvw] max-w-[320px] max-h-[320px] rounded-full bg-[#BEA587] blur-[90px] pointer-events-none z-[1] hidden lg:block"
      />

      {/* Bottom-left micro orb */}
      <motion.div
        aria-hidden="true"
        animate={shouldReduce ? {} : { opacity: [0.03, 0.065, 0.03], scale: [1, 1.2, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 8 }}
        className="absolute bottom-[10%] left-[4%] w-[18dvw] h-[18dvw] max-w-[240px] max-h-[240px] rounded-full bg-[#BEA587] blur-[80px] pointer-events-none z-[1] hidden lg:block"
      />

      {/* Scan lines — desktop */}
      <div aria-hidden="true" className="absolute top-0 left-[28%] w-px h-full bg-gradient-to-b from-transparent via-[#BEA587]/[0.07] to-transparent pointer-events-none hidden lg:block z-[2]" />
      <div aria-hidden="true" className="absolute top-0 right-[28%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.03] to-transparent pointer-events-none hidden lg:block z-[2]" />
      <div aria-hidden="true" className="absolute top-[68%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#BEA587]/[0.05] to-transparent pointer-events-none hidden lg:block z-[2]" />

      {/* Cursor spotlight */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-[3] mix-blend-screen opacity-[0.22] hidden lg:block"
        style={{
          background: `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px,rgba(190,165,135,0.11) 0%,transparent 75%)`,
        }}
      />

      {/* ─── ORBITAL SYSTEM — right-side, vertically centred ─── */}
      <motion.div
        aria-hidden="true"
        className="absolute hidden lg:block z-[4] pointer-events-none"
        style={{
          top: "50%",
          right: "6%",
          translateY: "-50%",
          x: orbitalX,
          y: orbitalY,
        }}
      >
        {/* Outer dashed ring */}
        <div
          className={`relative w-[200px] h-[200px] rounded-full border border-dashed border-[#BEA587]/[0.13] ${shouldReduce ? "" : "animate-[spin_70s_linear_infinite]"}`}
        >
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#BEA587] shadow-[0_0_16px_4px_rgba(190,165,135,0.5)]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[#BEA587]/40" />
        </div>
        {/* Mid ring — counter */}
        <div
          className={`absolute inset-[28px] rounded-full border border-[#BEA587]/[0.07] ${shouldReduce ? "" : "animate-[spin_45s_linear_infinite_reverse]"}`}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/20 shadow-[0_0_8px_2px_rgba(255,255,255,0.15)]" />
        </div>
        {/* Inner pulsing ring */}
        <motion.div
          className="absolute inset-[58px] rounded-full border border-[#BEA587]/[0.18]"
          animate={shouldReduce ? {} : { scale: [1, 1.08, 1], opacity: [0.18, 0.38, 0.18] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Centre gem */}
        <motion.div
          className="absolute inset-[80px] rounded-full bg-[#BEA587]/[0.06] border border-[#BEA587]/20"
          animate={shouldReduce ? {} : { scale: [1, 1.18, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        {/* Studio label */}
        <div className="absolute inset-[-12px] flex items-start justify-center">
          <span className="text-[7px] font-mono tracking-[0.5em] text-[#BEA587]/28 uppercase" style={{ transform: "translateY(-4px)" }}>
            STUDIO
          </span>
        </div>
      </motion.div>

      {/* Left decorative column — xl+ */}
      <div aria-hidden="true" className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-3 z-[4]">
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-[#BEA587]/20" />
        <div className="flex flex-col gap-1">
          {[0.6, 0.4, 0.25].map((o, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-[#BEA587]" style={{ opacity: o }} />
          ))}
        </div>
        <div className="w-px h-16 bg-gradient-to-t from-transparent to-[#BEA587]/20" />
      </div>

      {/* Floating particles */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden z-[3] hidden lg:block">
        {[18, 45, 72, 88].map((left, i) => (
          <motion.div
            key={i}
            initial={{ y: "108dvh", opacity: 0 }}
            animate={shouldReduce ? {} : {
              y: "-8dvh",
              opacity: [0, 0.38, 0.38, 0],
              x: ["0px", `${i % 2 === 0 ? 18 : -18}px`, "0px"],
            }}
            transition={{ duration: 16 + i * 5, repeat: Infinity, ease: "linear", delay: i * 2.5 }}
            className="absolute w-[2px] h-[2px] bg-[#BEA587] rounded-full"
            style={{ left: `${left}%`, opacity: 0.3 }}
          />
        ))}
      </div>

      {/* ─── HERO CONTENT ────────────────────────────────────── */}
      {/*
        LAYOUT RULES:
        Mobile  : centred column, comfortable vertical padding
        Desktop : centred column, max-width constrains line length,
                  orbital decorates right edge without pulling layout off-centre
      */}
      <div className="
        relative z-10 w-full
        flex flex-col items-center text-center
        px-5
        pt-[88px] pb-[96px]
        sm:pt-[100px] sm:pb-[100px]
        lg:pt-[120px] lg:pb-[120px]
        lg:max-w-[64rem] lg:mx-auto
        lg:px-8
        xl:max-w-[72rem]
      ">

        {/* ── [1] CONTEXT LABEL ─────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.05 }}
          className="font-mono text-[9px] sm:text-[10px] text-[#BEA587]/50 tracking-[0.38em] uppercase mb-5 sm:mb-6"
        >
          Premium Web Studio
        </motion.p>

        {/* ── [2] NICHE PILLS — desktop only ────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
          className="hidden lg:flex items-center justify-center gap-2.5 mb-9 flex-nowrap"
        >
          {niches.map(({ icon: Icon, label }, idx) => (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.88, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.65, ease, delay: 0.14 + idx * 0.07 }}
              whileHover={shouldReduce ? {} : {
                borderColor: "rgba(190,165,135,0.55)",
                backgroundColor: "rgba(190,165,135,0.12)",
                y: -2,
                transition: { duration: 0.18 },
              }}
              className="
                inline-flex items-center gap-1.5
                px-4 py-[7px]
                rounded-full
                border border-[#BEA587]/28
                bg-[#BEA587]/[0.055]
                text-[#BEA587] text-[11px]
                font-medium tracking-[0.08em]
                cursor-default shrink-0
                transition-all duration-300
                shadow-[inset_0_0_0_1px_rgba(190,165,135,0.04)]
              "
            >
              <Icon size={10} aria-hidden="true" className="shrink-0 opacity-75" />
              <span>{label}</span>
            </motion.span>
          ))}
        </motion.div>

        {/* ── [3] WORDMARK ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.12 }}
          className="w-full mb-8 sm:mb-9 lg:mb-10"
        >
          {/* HAEBARAGI */}
          <motion.h1
            initial={{ opacity: 0, filter: "blur(12px)", y: 24 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 1.3, ease, delay: 0.18 }}
            className="
              font-sans font-extrabold tracking-[-0.03em] text-white uppercase
              leading-[0.88] block select-none text-center
              text-[clamp(3rem,13.5vw,5.8rem)]
              sm:text-[clamp(4rem,14vw,7.2rem)]
              lg:text-[clamp(5.5rem,8.5vw,8rem)]
              xl:text-[clamp(6rem,8vw,9rem)]
              2xl:text-[9rem]
            "
          >
            HAEBARAGI
          </motion.h1>

          {/* studio. */}
          <motion.span
            initial={{ opacity: 0, x: 18, filter: "blur(6px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, ease, delay: 0.3 }}
            className="
              font-serif italic font-light text-[#BEA587]
              leading-[0.9] block lowercase tracking-[0.01em] text-center
              text-[clamp(2.4rem,11vw,4.7rem)]
              sm:text-[clamp(3.2rem,11.5vw,5.9rem)]
              lg:text-[clamp(4.4rem,7vw,6.6rem)]
              xl:text-[clamp(5rem,6.6vw,7.4rem)]
              2xl:text-[7.4rem]
              mt-1 sm:mt-1.5
            "
          >
            studio.
          </motion.span>
        </motion.div>

        {/* ── [4] VALUE PROPOSITION ─────────────────────────── */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.38 }}
          className="
            font-sans font-normal text-neutral-300 text-center
            text-[0.9rem] leading-[1.68] max-w-[320px]
            sm:text-[1rem] sm:max-w-[460px]
            lg:text-[1.05rem] lg:max-w-[520px] lg:leading-[1.72]
            mx-auto
            mb-10 sm:mb-11 lg:mb-12
          "
        >
          We build conversion-first websites for doctors, restaurants,
          and gyms — custom designed, fast-delivered, and built to
          grow your business online.
        </motion.p>

        {/* ── [5] CTA BUTTONS ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.48 }}
          className="
            flex flex-col sm:flex-row
            items-stretch sm:items-center
            justify-center
            gap-3 sm:gap-4
            w-full sm:w-auto
          "
        >
          {/* PRIMARY */}
          <motion.a
            href="https://wa.me/918977831405?text=Hi%2C%20I%20came%20across%20your%20website%20and%20I%27m%20interested%20in%20getting%20a%20website%20for%20my%20business."
            target="_blank"
            rel="noopener noreferrer"
            onHoverStart={() => setIsHoveringPrimary(true)}
            onHoverEnd={() => setIsHoveringPrimary(false)}
            whileHover={shouldReduce ? {} : { scale: 1.03, y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="
              relative overflow-hidden
              flex items-center justify-center gap-2.5
              w-full py-[15px] px-8
              sm:w-auto sm:px-11 sm:py-[16px]
              rounded-full
              bg-[#BEA587] hover:bg-[#cca882]
              text-[#0a0a0a] font-bold
              text-[11px] sm:text-[11.5px] tracking-[0.16em] uppercase
              shadow-[0_0_0_1px_rgba(190,165,135,0.3),0_0_32px_rgba(190,165,135,0.28),0_4px_16px_rgba(0,0,0,0.5)]
              hover:shadow-[0_0_0_1px_rgba(212,184,150,0.5),0_0_60px_rgba(190,165,135,0.52),0_8px_28px_rgba(0,0,0,0.5)]
              transition-all duration-300
              cursor-pointer group
            "
            aria-label="Get a free quote on WhatsApp"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none"
              initial={{ x: "-100%" }}
              animate={isHoveringPrimary ? { x: "150%" } : { x: "-100%" }}
              transition={{ duration: 0.65, ease: "easeOut" }}
            />
            <span className="relative z-10">Get a free quote</span>
            <motion.span
              className="relative z-10"
              animate={isHoveringPrimary ? { x: 3 } : { x: 0 }}
              transition={{ duration: 0.25 }}
            >
              <ArrowRight size={13} />
            </motion.span>
          </motion.a>

          {/* SECONDARY */}
          <motion.button
            onClick={onExploreClick}
            whileHover={shouldReduce ? {} : { scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="
              relative overflow-hidden
              flex items-center justify-center gap-2.5
              w-full py-[14px] px-8
              sm:w-auto sm:px-9 sm:py-[15px]
              rounded-full
              bg-transparent
              border border-[#BEA587]/35
              hover:border-[#BEA587]/65
              hover:bg-[#BEA587]/[0.07]
              text-[#BEA587]
              text-[11px] sm:text-[11.5px]
              font-bold tracking-[0.16em] uppercase
              hover:shadow-[0_0_24px_rgba(190,165,135,0.1)]
              transition-all duration-300
              cursor-pointer group
            "
            aria-label="See our work"
          >
            <span>See our work</span>
            <ArrowUpRight
              size={12}
              className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
            />
          </motion.button>
        </motion.div>

      </div>

      {/* Bottom section fade */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 inset-x-0 h-28 sm:h-36 bg-gradient-to-t from-[#070707] to-transparent pointer-events-none z-[5]"
      />

      {/* Mobile safe-area for bottom nav */}
      <div aria-hidden="true" className="absolute bottom-0 inset-x-0 h-[72px] lg:hidden pointer-events-none z-0" />

    </section>
  );
}