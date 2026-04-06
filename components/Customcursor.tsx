"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run cursor logic if it's not a touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    if (!cursor || !cursorDot) return;

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      gsap.to(cursorDot, {
        left: mouseX,
        top: mouseY,
        duration: 0,
      });

      // Added smooth follow for the outer ring
      gsap.to(cursor, {
        left: mouseX,
        top: mouseY,
        duration: 0.15,
      });
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, .interactive, .skill-tag, .proj-card, .electric-btn")
      ) {
        gsap.to(cursor, {
          scale: 1.8,
          borderColor: "#4488ff",
          duration: 0.3,
        });
        gsap.to(cursorDot, {
          scale: 0,
          duration: 0.3,
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        borderColor: "rgba(255, 255, 255, 0.5)",
        duration: 0.3,
      });
      gsap.to(cursorDot, {
        scale: 1,
        duration: 0.3,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseEnter, true);
    document.addEventListener("mouseout", handleMouseLeave, true);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseEnter, true);
      document.removeEventListener("mouseout", handleMouseLeave, true);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        /* Only hide cursor on PC (devices that support hover) */
        @media (hover: hover) and (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Hidden by default, only visible on PC via tailwind 'hidden md:block' */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-[9999] w-8 h-8 border-2 border-white/50 rounded-full mix-blend-screen hidden md:block"
        style={{
          left: "-16px",
          top: "-16px",
        }}
      />

      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed z-[9999] w-2 h-2 bg-white rounded-full mix-blend-screen hidden md:block"
        style={{
          left: "-4px",
          top: "-4px",
        }}
      />
    </>
  );
}