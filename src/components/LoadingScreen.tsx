import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            setTimeout(onComplete, 600); // Allow fade-out animation to complete
          }, 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 4;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="loading-screen"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B0B0B] text-[#FFF8ED]"
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Ambient organic golden background glow */}
          <div className="absolute inset-x-0 top-1/4 -z-10 h-96 w-96 mx-auto rounded-full bg-gradient-to-tr from-[#BEA587]/20 to-transparent blur-3xl opacity-60" />

          <div className="flex flex-col items-center max-w-sm px-6 text-center w-full">
            {/* Elegant Monogram */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative mb-8"
            >
              <div className="w-16 h-16 rounded-full bg-[#BEA587] flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                <div className="w-7 h-7 bg-black rounded-full flex items-center justify-center">
                  <span className="font-sans font-extrabold text-[#BEA587] text-[11px] tracking-wide">HS</span>
                </div>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                className="absolute -inset-2 border-dashed border border-[#BEA587]/15 rounded-full scale-110"
              />
            </motion.div>

            {/* Title / Brand Name */}
            <motion.h1
              initial={{ letterSpacing: "0.2em", opacity: 0 }}
              animate={{ letterSpacing: "0.05em", opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="font-sans text-xl font-medium tracking-wider text-[#F8F8F8] mb-1"
            >
              HAEBARAGI STUDIO
            </motion.h1>

            {/* Tagline */}
            <p className="font-sans text-xs text-[#FFF8ED]/40 tracking-widest mb-12">
              TURNING IDEAS TOWARD LIGHT
            </p>

            {/* Premium Progress Bar */}
            <div className="w-full h-[2px] bg-[#171717] rounded-full overflow-hidden mb-3 relative">
              <motion.div
                className="h-full bg-gradient-to-r from-[#BEA587]/60 via-[#BEA587] to-[#FFF8ED] rounded-full"
                style={{ width: `${Math.min(progress, 100)}%` }}
                layoutId="progressBar"
              />
            </div>

            {/* Countdown / Percentage */}
            <div className="flex justify-between w-full font-mono text-[10px] text-[#FFF8ED]/40 uppercase tracking-widest">
              <span>Optimizing Assets</span>
              <span className="text-[#BEA587] font-medium">{Math.min(progress, 100)}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
