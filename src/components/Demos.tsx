import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { DEMO_WEBSITES } from "../data.ts";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function Demos() {
  const [activePanel, setActivePanel] = useState<number>(0);
  const shouldReduce = useReducedMotion();

  return (
    <section
      id="projects"
      className="relative py-16 md:py-48 px-6 overflow-hidden bg-[#030303] text-white transition-colors duration-500"
    >
      {/* Immersive cinematic background gradients & Atmospheric Depth */}
      {/* 1. Subtle glowing mesh diffusion entering from left */}
      <div className="absolute top-[10%] left-[-20%] w-[100vw] h-[50vh] bg-gradient-to-r from-amber-500/10 via-[#BEA587]/5 to-transparent blur-[120px] rotate-[-10deg] pointer-events-none opacity-80" />
      
      {/* 2. Top Right Champagne Haze (Fixes empty void, elegant soft glow) */}
      <div className="absolute top-[-5%] right-[-10%] w-[60vw] h-[70vh] bg-gradient-to-bl from-amber-500/10 via-[#BEA587]/5 to-transparent blur-[140px] rounded-full pointer-events-none opacity-70" />
      
      {/* 3. Deep background glow anchoring the cinematic perspective */}
      <div className="absolute bottom-[0%] left-[10%] w-[80vw] h-[50vw] bg-amber-500/5 blur-[180px] rounded-full pointer-events-none opacity-60" />

      {/* 4. THE WOW DETAIL: Slow drifting atmospheric cinematic light */}
      <motion.div
        animate={shouldReduce ? { x: 0, y: 0, opacity: 0.5, scale: 1 } : {
          x: ["-5%", "5%", "-5%"],
          y: ["-5%", "5%", "-5%"],
          opacity: [0.3, 0.7, 0.3],
          scale: [0.9, 1.1, 0.9],
        }}
        transition={shouldReduce ? { duration: 0 } : {
          duration: 18,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        className="absolute top-[20%] left-[30%] w-[50vw] h-[50vw] bg-[radial-gradient(circle_at_center,rgba(190,165,135,0.04),transparent)] blur-[120px] rounded-full pointer-events-none mix-blend-screen"
      />

      {/* Cinematic noise/grain texture - ultra subtle */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGZpbHRlciBpZD0ibiI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOCIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsdGVyPSJ1cmwoI24pIi8+PC9zdmc+')]"/>

      {/* Dynamic Lighting Mesh Overlay - framing the scene */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-[#020202]/80 pointer-events-none z-0" />

      <div className="max-w-[1400px] mx-auto relative z-10 w-full flex flex-col justify-between">
        
        {/* Header Segment - Editorial Asymmetrical Offset */}
        <div className="mb-16 md:mb-24 md:pl-16 text-center lg:text-left max-w-3xl relative z-20 flex flex-col items-center lg:items-start mx-auto lg:mx-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "50px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#BEA587]/20 bg-[#BEA587]/[0.03] shadow-[0_8px_30px_rgba(190,165,135,0.05)] backdrop-blur-3xl mb-10 relative overflow-hidden group"
          >
            {/* Ambient shimmer inside the badge */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#BEA587]/10 to-transparent translate-x-[-100%] animate-[shimmer_3s_infinite]" />
            <Sparkles size={12} className="text-[#BEA587] opacity-90 relative z-10" />
            <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.45em] font-semibold text-[#d6cdbf] relative z-10">Demo Projects</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "50px" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <motion.h2
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="font-sans text-[3.25rem] sm:text-[5rem] md:text-[6.5rem] lg:text-[7.5rem] font-medium tracking-[-0.04em] text-white leading-[0.9]"
            >
              Selected <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BEA587] via-[#f9efe2] to-[#a38d70] bg-[length:200%_auto] font-serif italic font-light tracking-[-0.02em] pr-4 drop-shadow-sm">Work.</span>
            </motion.h2>
          </motion.div>
        </div>

        {/* Cinematic Project Cards Grid (Living Luxury Interaction) */}
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="w-full h-[600px] sm:h-[700px] md:h-[800px] rounded-[40px] bg-[#050505] border border-[#BEA587]/[0.04] p-3 sm:p-5 shadow-[0_50px_100px_rgba(0,0,0,0.95)] flex gap-2 sm:gap-4 relative z-10 group/container"
        >
          {/* Subtle Ambient Reflector Beneath Cards */}
          <div className="absolute inset-x-20 bottom-[-20%] h-[200px] bg-[#BEA587]/10 blur-[100px] pointer-events-none z-0 mix-blend-screen" />

          {DEMO_WEBSITES.map((site, index) => {
            const isActive = activePanel === index;
            return (
            <a
              key={site.id}
              href={site.demoUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={isActive ? `Visit ${site.title} demo site` : `Expand ${site.title}`}
              aria-expanded={isActive}
              onClick={(e) => {
                if (!isActive) {
                  e.preventDefault();
                  setActivePanel(index);
                }
              }}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && !isActive) {
                  e.preventDefault();
                  setActivePanel(index);
                }
              }}
              className={`group relative h-full overflow-hidden cursor-pointer rounded-[32px] transition-all duration-[1200ms] ease-[cubic-bezier(0.2,1,0.25,1)] bg-[#070707] border border-white/[0.03] hover:border-[#BEA587]/30 shadow-[0_15px_40px_rgba(0,0,0,1)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.9),0_0_50px_rgba(190,165,135,0.08)] z-10 hover:z-20
                ${isActive ? "flex-[7]" : "flex-[1]"}
                lg:hover:flex-[7] lg:group-hover/container:hover:flex-[9]
              `}
            >
              {/* Material Layering & Inner Edge Lighting */}
              <div className="absolute inset-0 rounded-[32px] pointer-events-none border-t border-t-[#BEA587]/[0.1] mix-blend-overlay z-20" />
              <div className="absolute inset-0 rounded-[32px] pointer-events-none shadow-[inset_0_4px_40px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(190,165,135,0.06)] z-20" />

              {/* Atmospheric Darkness Overlay / Fog */ }
              <div className={`absolute inset-0 bg-[#020202]/60 transition-colors duration-[1200ms] ease-[cubic-bezier(0.2,1,0.25,1)] z-10 pointer-events-none ${isActive ? 'bg-[#020202]/0' : 'lg:group-hover:bg-[#020202]/0'}`} />
              
              <img
                src={site.image}
                alt={site.title}
                loading="lazy"
                /* Cinematic Image Grading (Pre-hover and Post-hover contrast logic) */
                className={`absolute inset-0 w-full h-full object-cover origin-center pointer-events-none transition-all duration-[1600ms] ease-[cubic-bezier(0.19,1,0.22,1)]
                  ${isActive 
                    ? 'opacity-100 scale-[1.03] blur-0 contrast-[1.15] saturate-[0.9] brightness-[0.95] sepia-[0.05]' 
                    : 'scale-[1.12] opacity-[0.4] contrast-[1.1] saturate-[0.75] brightness-[0.75] sepia-[0.15] blur-[2px] lg:group-hover:opacity-100 lg:group-hover:scale-[1.03] lg:group-hover:blur-0 lg:group-hover:contrast-[1.15] lg:group-hover:saturate-[0.9] lg:group-hover:brightness-[0.95] lg:group-hover:sepia-[0.05]'}
                `}
                loading="lazy"
              />

              {/* Dynamic Environmental Hover Glow (Cinematic lighting shift) */}
              <div className={`absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(190,165,135,0.15),transparent_70%)] transition-opacity duration-[1400ms] ease-[cubic-bezier(0.2,1,0.25,1)] mix-blend-screen pointer-events-none z-10 ${isActive ? 'opacity-100' : 'opacity-0 lg:group-hover:opacity-100'}`} />

              {/* Soft ambient lighting flare traveling across the card on hover */}
              <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-[#BEA587]/10 to-transparent translate-x-[-100%] transition-transform duration-[2500ms] ease-[cubic-bezier(0.2,1,0.25,1)] pointer-events-none z-10 mix-blend-screen ${isActive ? 'translate-x-[100%] opacity-100' : 'lg:group-hover:translate-x-[100%] opacity-0 lg:group-hover:opacity-100'}`} />

              {/* Depth Gradient anchoring the typography gracefully */}
              <div className={`absolute inset-0 bg-gradient-to-t from-[#010101] via-[#010101]/40 to-transparent transition-opacity duration-[1200ms] pointer-events-none z-10 ${isActive ? 'opacity-100' : 'opacity-90 lg:group-hover:opacity-100'}`} />

              {/* Elegant Simplified Collapsed Mode Text */}
              <div className={`absolute inset-x-0 inset-y-0 flex flex-col items-center justify-center transition-opacity duration-[700ms] pointer-events-none z-20 gap-4 ${isActive ? 'opacity-0' : 'opacity-100 lg:group-hover:opacity-0'}`}>
                <div className="w-1 h-1 rounded-full bg-[#BEA587]/40 shadow-[0_0_8px_rgba(190,165,135,0.6)]" />
                <span className="rotate-[-90deg] whitespace-nowrap text-[10px] font-sans font-semibold tracking-[0.8em] uppercase text-[#8a8070] mix-blend-plus-lighter drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                  {site.category}
                </span>
                <div className="w-1 h-1 rounded-full bg-[#BEA587]/40 shadow-[0_0_8px_rgba(190,165,135,0.6)]" />
              </div>

              {/* Expanded Mode: Editorial Typography Layout */}
              <div className={`absolute bottom-0 left-0 right-0 p-8 sm:p-14 transition-all duration-[1200ms] ease-[cubic-bezier(0.2,1,0.25,1)] pointer-events-none flex items-end justify-between z-30 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100'}`}>
                <div className="w-full relative max-w-2xl">
                  {/* Subtle Accent Separator */}
                  <div className={`w-12 h-[1px] bg-[#BEA587]/40 mb-6 transform origin-left transition-transform duration-[1200ms] ease-[cubic-bezier(0.2,1,0.25,1)] delay-[200ms] ${isActive ? 'scale-x-100' : 'scale-x-0 lg:group-hover:scale-x-100'}`} />
                  
                  <h3 className={`font-serif italic text-4xl sm:text-5xl md:text-[4rem] lg:text-[4.5rem] text-[#fbf7f1] font-light tracking-tight mb-5 transform transition-all duration-[1200ms] ease-[cubic-bezier(0.2,1,0.25,1)] delay-[100ms] drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 lg:group-hover:opacity-100 lg:group-hover:translate-y-0'}`}>
                    {site.title}
                  </h3>
                  <p className={`font-sans text-[#c8bfaf] text-sm md:text-base font-light leading-[1.8] transform transition-all duration-[1200ms] ease-[cubic-bezier(0.2,1,0.25,1)] delay-[250ms] drop-shadow-md hidden sm:block w-10/12 md:w-11/12 mix-blend-plus-lighter ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 lg:group-hover:opacity-100 lg:group-hover:translate-y-0'}`}>
                    {site.description}
                  </p>
                </div>
              </div>
              
              {/* Premium Magnetic Action Button */}
              <div className={`absolute bottom-10 right-10 sm:bottom-14 sm:right-14 transform transition-all duration-[1200ms] ease-[cubic-bezier(0.2,1,0.25,1)] delay-[300ms] pointer-events-auto rounded-full z-40 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 lg:group-hover:opacity-100 lg:group-hover:translate-y-0'}`}>
                <div className="relative group/btn w-16 h-16 rounded-full border border-[#BEA587]/30 bg-[#050505]/90 backdrop-blur-2xl flex items-center justify-center text-[#BEA587] hover:bg-[#BEA587] hover:text-[#050505] hover:border-[#BEA587] transition-all duration-700 ease-[cubic-bezier(0.2,1,0.25,1)] cursor-pointer overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
                  {/* Inner Bloom effect */}
                  <div className="absolute inset-0 bg-[#BEA587]/20 blur-lg opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700" />
                  <ArrowUpRight size={24} strokeWidth={1} className="relative z-10 group-hover/btn:scale-110 transition-transform duration-700" />
                </div>
              </div>

            </a>
          )})}
        </motion.div>

        {/* Mobile Dot Indicator */}
        <div className="flex lg:hidden justify-center gap-2 mt-6 relative z-10">
          {DEMO_WEBSITES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActivePanel(i)}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${activePanel === i ? 'bg-[#BEA587] scale-125' : 'bg-[#BEA587]/30'}`}
              aria-label={`Show project ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
