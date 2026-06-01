import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable on pointer-capable, non-touch devices
    const touchDeviceQuery = window.matchMedia("(any-hover: none)");
    if (touchDeviceQuery.matches) return;

    setIsVisible(true);

    // Hide the native cursor only once we confirm we can replace it
    document.documentElement.style.cursor = "none";

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") !== null ||
        target.closest("a") !== null ||
        target.closest("input") !== null ||
        target.closest("textarea") !== null ||
        target.classList.contains("clickable");
      setIsHovered(!!isClickable);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ x: cursorXSpring, y: cursorYSpring }}
        className={`fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-50 transition-colors duration-300 mix-blend-difference hidden lg:block ${
          isHovered ? "bg-[#BEA587] scale-150" : "border border-[#BEA587] scale-100"
        }`}
      />
      <motion.div
        aria-hidden="true"
        style={{ x: cursorXSpring, y: cursorYSpring }}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#BEA587] pointer-events-none z-50 translate-x-[9px] translate-y-[9px] hidden lg:block mix-blend-difference"
      />
    </>
  );
}
