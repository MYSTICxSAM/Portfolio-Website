"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Device Check
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    // 2. High-Performance QuickSetters
    // This is much faster than gsap.to() on every mouse move
    const xSetCursor = gsap.quickSetter(cursor, "x", "px");
    const ySetCursor = gsap.quickSetter(cursor, "y", "px");
    const xSetDot = gsap.quickSetter(cursorDot, "x", "px");
    const ySetDot = gsap.quickSetter(cursorDot, "y", "px");

    // Hide cursor initially to prevent "jumping" from (0,0)
    gsap.set([cursor, cursorDot], { opacity: 0 });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      // Show cursors on first move
      gsap.to([cursor, cursorDot], { opacity: 1, duration: 0.2 });

      // Immediate move for dot
      xSetDot(clientX);
      ySetDot(clientY);

      // Smooth lag move for outer ring
      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.15,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    // 3. Hover Interactions
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("a, button, .interactive, .skill-tag, .proj-card, .electric-btn");

      if (isInteractive) {
        gsap.to(cursor, {
          scale: 1.8,
          backgroundColor: "rgba(68, 136, 255, 0.1)",
          borderColor: "#4488ff",
          duration: 0.3,
        });
        gsap.to(cursorDot, {
          scale: 0,
          duration: 0.2,
        });
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("a, button, .interactive, .skill-tag, .proj-card, .electric-btn");

      if (isInteractive) {
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: "transparent",
          borderColor: "rgba(255, 255, 255, 0.5)",
          duration: 0.3,
        });
        gsap.to(cursorDot, {
          scale: 1,
          duration: 0.2,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        /* Hide real cursor only on devices that support hover */
        @media (hover: hover) and (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Outer Ring */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-10 h-10 border border-white/50 rounded-full mix-blend-difference hidden md:block"
        style={{
          marginTop: "-20px", // Centers the ring (half of width)
          marginLeft: "-20px",
        }}
      />

      {/* Inner Dot */}
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-1.5 h-1.5 bg-white rounded-full mix-blend-difference hidden md:block"
        style={{
          marginTop: "-3px", // Centers the dot (half of width)
          marginLeft: "-3px",
        }}
      />
    </>
  );
}