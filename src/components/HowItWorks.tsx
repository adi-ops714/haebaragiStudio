import { motion, useReducedMotion } from "motion/react";
import { MessageCircle, Palette, Rocket, CheckCircle } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Tell us about your business",
    description:
      "Send us a WhatsApp message or email — no calls needed. Just tell us what kind of business you run and what you need. We reply within 4 hours on WhatsApp, Monday to Saturday.",
    detail: "WhatsApp or email · 5 minutes",
    accentColor: "#BEA587",
    glowColor: "rgba(190,165,135,0.12)",
  },
  {
    number: "02",
    icon: Palette,
    title: "We send you a design preview",
    description:
      "Within 48 hours you'll see exactly what your website will look like — layout, colours, fonts. Nothing is built until you're happy with the direction.",
    detail: "Within 48 hours",
    accentColor: "#8FA8D8",
    glowColor: "rgba(143,168,216,0.12)",
  },
  {
    number: "03",
    icon: Rocket,
    title: "We build while you run your business",
    description:
      "You give feedback at every stage over WhatsApp. We handle the rest — design, development, testing. No technical knowledge needed from your side.",
    detail: "7–14 days · updates over WhatsApp",
    accentColor: "#7ECBA9",
    glowColor: "rgba(126,203,169,0.12)",
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Your site goes live — you own it completely",
    description:
      "Once you approve, we launch it. You get full ownership of the website. No monthly fees to us, no lock-in. We stay reachable on WhatsApp after launch.",
    detail: "One-time payment · full ownership",
    accentColor: "#BEA587",
    glowColor: "rgba(190,165,135,0.12)",
  },
];

interface StepCardProps {
  step: (typeof STEPS)[number];
  idx: number;
  total: number;
}

function StepCard({ step, idx, total }: StepCardProps) {
  const shouldReduce = useReducedMotion();
  const Icon = step.icon;
  const isLast = idx === total - 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-60px" }}
      transition={{
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1],
        delay: idx * 0.1,
      }}
      className="relative flex gap-5 sm:gap-7"
    >
      {/* Left column — number + connector line */}
      <div className="flex flex-col items-center shrink-0 w-10 sm:w-12">
        {/* Step orb */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: false }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
            delay: idx * 0.1 + 0.15,
          }}
          className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full shrink-0"
          style={{
            background: `linear-gradient(135deg, ${step.accentColor}18, ${step.accentColor}08)`,
            border: `1px solid ${step.accentColor}45`,
            boxShadow: `0 0 24px ${step.accentColor}20`,
          }}
        >
          {/* Pulsing ring */}
          {!shouldReduce && (
            <motion.div
              className="absolute inset-[-3px] rounded-full"
              style={{ border: `1px solid ${step.accentColor}25` }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: idx * 0.5 }}
            />
          )}
          <span
            className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.12em]"
            style={{ color: step.accentColor }}
          >
            {step.number}
          </span>
        </motion.div>

        {/* Connector line */}
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, ease: "easeOut", delay: idx * 0.1 + 0.3 }}
            className="flex-1 w-px mt-3 origin-top"
            style={{
              background: `linear-gradient(to bottom, ${step.accentColor}35, transparent)`,
              minHeight: "32px",
            }}
          />
        )}
      </div>

      {/* Right column — card content */}
      <div className="pb-10 sm:pb-14 flex-1">
        <motion.div
          whileHover={shouldReduce ? {} : { borderColor: `${step.accentColor}40` }}
          transition={{ duration: 0.25 }}
          className="relative rounded-[20px] p-5 sm:p-6 overflow-hidden"
          style={{
            background: "#0e0e0d",
            border: "1px solid rgba(255,255,255,0.055)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
          }}
        >
          {/* Corner glow */}
          <div
            className="absolute top-0 right-0 w-40 h-40 pointer-events-none rounded-[20px]"
            style={{
              background: `radial-gradient(circle at 100% 0%, ${step.glowColor} 0%, transparent 65%)`,
            }}
          />

          {/* Icon + detail row */}
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div
              className="flex items-center justify-center w-9 h-9 rounded-xl shrink-0"
              style={{
                background: `${step.accentColor}12`,
                border: `1px solid ${step.accentColor}30`,
              }}
            >
              <Icon size={16} style={{ color: step.accentColor }} aria-hidden="true" />
            </div>
            <span
              className="text-[9px] font-mono uppercase tracking-[0.2em] font-semibold px-3 py-1 rounded-full"
              style={{
                color: step.accentColor,
                background: `${step.accentColor}12`,
                border: `1px solid ${step.accentColor}25`,
              }}
            >
              {step.detail}
            </span>
          </div>

          {/* Title */}
          <h3
            className="font-sans font-semibold text-white text-[15px] sm:text-[16px] leading-snug mb-2.5 relative z-10"
          >
            {step.title}
          </h3>

          {/* Description */}
          <p
            className="font-sans font-light text-[13.5px] sm:text-[14px] leading-[1.72] relative z-10"
            style={{ color: "#b0a99a" }}
          >
            {step.description}
          </p>

          {/* Thin bottom accent */}
          <div
            className="absolute bottom-0 left-6 right-6 h-[1px]"
            style={{
              background: `linear-gradient(to right, ${step.accentColor}25, transparent)`,
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative py-16 md:py-36 px-6 overflow-hidden bg-[#050505] text-white"
      aria-label="How it works"
    >
      {/* Ambient backgrounds */}
      <div
        aria-hidden="true"
        className="absolute top-[5%] right-[-10%] w-[45vw] h-[45vh] bg-gradient-to-l from-amber-500/6 via-[#BEA587]/3 to-transparent blur-[140px] rounded-full pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[5%] left-[-8%] w-[40vw] h-[40vh] bg-gradient-to-r from-indigo-500/6 via-purple-500/3 to-transparent blur-[130px] rounded-full pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(#ffffff02_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none opacity-50"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left — sticky header */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "50px" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#BEA587]/20 bg-[#BEA587]/[0.03] backdrop-blur-3xl mb-8 relative overflow-hidden"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#BEA587]/10 to-transparent translate-x-[-100%] animate-[shimmer_3s_infinite]"
              />
              <MessageCircle size={11} className="text-[#BEA587] opacity-90 relative z-10" aria-hidden="true" />
              <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.45em] font-semibold text-[#d6cdbf] relative z-10">
                No calls needed
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "50px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-sans text-[2.4rem] sm:text-[3rem] lg:text-[3.4rem] font-bold tracking-tight text-white leading-[1.05] mb-5"
            >
              How it{" "}
              <span className="text-[#BEA587] font-serif italic font-light">
                works.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "50px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="font-sans text-[#aaaaaa] text-[14px] sm:text-[15px] leading-[1.72] font-light max-w-sm"
            >
              The entire process runs over WhatsApp and email — no calls, no confusing jargon, no technical knowledge needed from your side.
            </motion.p>

            {/* Small trust callout */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-8 p-4 rounded-2xl"
              style={{
                background: "rgba(190,165,135,0.04)",
                border: "1px solid rgba(190,165,135,0.15)",
              }}
            >
              <p className="text-[12px] font-mono uppercase tracking-[0.18em] text-[#BEA587]/70 mb-1">
                From message to live site
              </p>
              <p className="text-[22px] font-serif italic font-light text-[#BEA587]">
                7–14 days
              </p>
              <p className="text-[12px] text-[#777] mt-1 font-light">
                You stay in the loop at every step.
              </p>
            </motion.div>
          </div>

          {/* Right — steps */}
          <div className="lg:col-span-8 pt-2">
            {STEPS.map((step, idx) => (
              <StepCard key={step.number} step={step} idx={idx} total={STEPS.length} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
