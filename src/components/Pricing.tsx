import { motion } from "motion/react";
import { Check, Sparkles } from "lucide-react";
import { PRICING_TIERS } from "../data.ts";

interface PricingProps {
  onInquireClick: () => void;
}

export default function Pricing({ onInquireClick }: PricingProps) {
  return (
    <section
      id="pricing"
      className="relative py-16 md:py-36 px-6 overflow-hidden bg-[#070707] text-white transition-colors duration-500"
      aria-label="Pricing"
    >
      {/* Ambient background */}
      <div aria-hidden="true" className="absolute top-[10%] right-[-10%] w-[50vw] h-[50vh] bg-gradient-to-bl from-amber-500/8 via-[#BEA587]/4 to-transparent blur-[140px] rounded-full pointer-events-none opacity-70" />
      <div aria-hidden="true" className="absolute bottom-[5%] left-[-5%] w-[40vw] h-[40vh] bg-gradient-to-tr from-indigo-500/8 via-purple-500/4 to-transparent blur-[130px] rounded-full pointer-events-none opacity-50" />
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none opacity-40" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "50px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#BEA587]/20 bg-[#BEA587]/[0.03] backdrop-blur-3xl mb-8 relative overflow-hidden"
          >
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-transparent via-[#BEA587]/10 to-transparent translate-x-[-100%] animate-[shimmer_3s_infinite]" />
            <Sparkles size={12} className="text-[#BEA587] opacity-90 relative z-10" aria-hidden="true" />
            <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.45em] font-semibold text-[#d6cdbf] relative z-10">Transparent Pricing</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "50px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-sans text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] font-bold tracking-tight text-white leading-[1.0] mb-4"
          >
            Simple,{" "}
            <span className="text-[#BEA587] font-serif italic font-light">honest</span>{" "}
            rates.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "50px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-[#aaaaaa] text-base md:text-lg font-light max-w-lg mx-auto"
          >
            All packages are one-time fees — no monthly subscriptions, no hidden costs. Need something custom? Let's talk.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "50px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-full border border-[#7ECBA9]/30 bg-[#7ECBA9]/[0.05]"
          >
            <span className="text-[#7ECBA9] text-sm">✓</span>
            <span className="font-sans text-[12px] sm:text-[13px] text-[#7ECBA9] font-medium tracking-wide">
              Payment only after work is done
            </span>
          </motion.div>
        </div>

        {/* Tiers grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PRICING_TIERS.map((tier, idx) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
              className={`relative rounded-[28px] p-7 md:p-8 flex flex-col ${
                tier.highlight
                  ? "bg-[#161412] border-2 border-[#BEA587]/60 shadow-[0_0_40px_rgba(190,165,135,0.15)]"
                  : "bg-[#111110]/80 border border-white/[0.06] shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#BEA587] text-[#0d0d0d] text-[10px] font-bold uppercase tracking-[0.15em] whitespace-nowrap shadow-[0_4px_20px_rgba(190,165,135,0.4)]">
                  Most popular
                </div>
              )}

              {/* Tier name & price */}
              <div className="mb-6 text-left">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#BEA587]/70 block mb-3">{tier.name}</span>
                <div className="flex items-baseline gap-2 mb-1 justify-start">
                  <span className="font-sans font-bold text-[2.25rem] text-white tracking-tight">{tier.price}</span>
                  <span className="text-[#888] text-sm font-light">{tier.priceNote}</span>
                </div>
                <p className="text-[#999] text-[14px] font-light leading-relaxed mt-3">{tier.description}</p>
              </div>

              {/* Divider */}
              <div className="w-full h-[1px] bg-white/[0.06] mb-6" />

              {/* Features */}
              <ul className="space-y-3 flex-grow mb-8" aria-label={`${tier.name} features`}>
                {tier.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-3 text-[14px] text-[#c8bfaf] font-light leading-snug">
                    <Check size={14} className="text-[#BEA587] shrink-0" aria-hidden="true" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={onInquireClick}
                className={`w-full rounded-[10px] px-6 py-3.5 font-sans text-[13px] tracking-[0.08em] uppercase font-bold transition-all duration-300 cursor-pointer ${
                  tier.highlight
                    ? "bg-[#BEA587] text-[#0d0d0d] hover:bg-[#d4b896] hover:shadow-[0_8px_30px_rgba(190,165,135,0.35)] shadow-[0_4px_20px_rgba(190,165,135,0.25)]"
                    : "bg-transparent border border-[#BEA587]/30 text-[#BEA587] hover:bg-[#BEA587]/10 hover:border-[#BEA587]/60"
                }`}
              >
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Fine print */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center text-[#555] text-[13px] font-light mt-10"
        >
          Prices in INR. Hosting and domain are not included. International pricing available on request.
        </motion.p>
      </div>
    </section>
  );
}
