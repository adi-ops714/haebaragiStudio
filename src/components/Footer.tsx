import { motion } from "motion/react";
import { ArrowUp, CornerDownRight, Heart } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    { label: "Twitter / X", url: "https://x.com/haebaragistudio" },
    { label: "Instagram", url: "https://instagram.com/haebaragistudio" },
    { label: "Savee", url: "https://savee.it/haebaragistudio" },
    { label: "Read.cv", url: "https://read.cv/haebaragistudio" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="footer"
      className="relative bg-[#070707] text-[#FFF8ED]/80 pt-20 pb-28 md:pb-12 px-6 overflow-hidden border-t border-white/[0.05] transition-colors duration-500"
    >
      {/* Background warm light leak in corner */}
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#BEA587]/10 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 font-sans">
        
        {/* Core block: Logo & Social links Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16">
          
          {/* Logo Brand Segment */}
          <div className="lg:col-span-6 space-y-4 text-left">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full border border-[#BEA587]/40 flex items-center justify-center bg-white bg-white/[0.03]">
                <span className="font-sans font-semibold text-[#BEA587] text-[10px]">HS</span>
              </div>
              <span className="font-sans font-medium tracking-widest text-[#171717] text-[#F8F8F8] text-xs">
                HAEBARAGI <span className="text-[#BEA587]">STUDIO</span>
              </span>
            </div>

            <p className="text-xs text-neutral-500 text-[#FFF8ED]/40 max-w-sm leading-relaxed">
              Premium websites for doctors, restaurants, and gyms in Hyderabad. Built from scratch. Delivered fast.
            </p>
          </div>

          {/* Social Links segment */}
          <div className="lg:col-span-4 text-left">
            <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#A8B89F] mb-4">Find Us Online</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {socialLinks.map((sc) => (
                <a
                  key={sc.label}
                  href={sc.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-xs text-neutral-500 hover:text-[#BEA587] transition-colors leading-none"
                >
                  <CornerDownRight size={10} className="text-neutral-400" />
                  <span>{sc.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Scoll-back triggers */}
          <div className="lg:col-span-2 flex justify-start lg:justify-end items-start">
            <button
              onClick={scrollToTop}
              className="group w-10 h-10 rounded-full border border-white/[0.08] flex items-center justify-center text-neutral-400 hover:text-[#BEA587] hover:border-[#BEA587]/40 transition-all duration-300 bg-white/[0.03] cursor-pointer"
              title="Return to Zenith"
            >
              <ArrowUp size={14} className="group-hover:-translate-y-0.5 duration-300 transition-transform" />
            </button>
          </div>

        </div>

        {/* Closing poetic line */}
        <div className="py-10 border-t border-neutral-200/40 border-white/[0.05] text-center relative">
          <motion.p
            initial={{ opacity: 0.5 }}
            whileInView={{ opacity: 1 }}
            className="font-serif italic text-lg sm:text-xl lg:text-2xl text-[#171717] text-[#F8F8F8] tracking-wide"
          >
            “Even sunflowers bloom toward distant light.”
          </motion.p>
        </div>

        {/* Copyright tags */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-neutral-400 font-mono uppercase tracking-widest pt-4">
          <span>&copy; {new Date().getFullYear()} Haebaragi Studio. All rights reserved.</span>
          <div className="flex items-center gap-1.5">
            <span>Compiled with</span>
            <Heart size={9} className="text-[#BEA587] fill-[#BEA587]" />
            <span>& solar power</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
