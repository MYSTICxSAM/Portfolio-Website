"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function EducationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cgpaRef = useRef<HTMLSpanElement>(null);
  const yearRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counters Logic (Unchanged)
      if (cgpaRef.current) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: 8.8,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            if (cgpaRef.current) cgpaRef.current.textContent = obj.val.toFixed(1);
          },
          scrollTrigger: {
            trigger: cgpaRef.current,
            start: "top 90%",
            once: true,
          },
        });
      }

      if (yearRef.current) {
        const obj = { val: 2020 };
        gsap.to(obj, {
          val: 2026,
          duration: 1.8,
          ease: "power3.out",
          onUpdate: () => {
            if (yearRef.current) yearRef.current.textContent = Math.round(obj.val).toString();
          },
          scrollTrigger: {
            trigger: yearRef.current,
            start: "top 90%",
            once: true,
          },
        });
      }

      gsap.from(".edu-panel", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".edu-panel",
          start: "top 90%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="bg-[#020202] px-6 md:px-20 py-20 md:py-40 border-t border-[#1a1a1a]"
    >
      <p className="text-[#888] text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase mb-4">
        05 / Education
      </p>
      <h2 className="font-display text-[15vw] md:text-[8vw] font-black text-white tracking-tighter leading-none mb-12 md:mb-20">
        ACADEMIA
      </h2>

      <div className="edu-panel relative border border-[#111] rounded-sm p-8 md:p-16 flex flex-col md:flex-row gap-10 md:gap-16 overflow-hidden">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 40px)",
          }}
        />

        {/* Left: institution */}
        <div className="flex-1 relative z-10">
          <p className="text-[#4488ff] text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase mb-4">
            B.Tech · Computer Science
          </p>
          <h3 className="font-display text-3xl md:text-4xl font-black text-white tracking-tighter leading-tight mb-4">
            Central University of Jammu
          </h3>
          <p className="text-[#555] text-sm font-mono leading-relaxed max-w-sm">
            Jammu, India · Batch of 2026 · Focus areas: Machine Learning,
            Distributed Systems, and Cloud Infrastructure.
          </p>

          <div className="mt-8 md:mt-10 flex flex-wrap gap-2 md:gap-3">
            {["Data Structures", "OS", "Cloud", "NLP", "Algorithms"].map((c) => (
              <span
                key={c}
                className="px-3 py-1 border border-[#1a1a1a] text-[#444] text-[10px] md:text-xs font-mono rounded-full"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Right: animated stats */}
        <div className="shrink-0 flex flex-row md:flex-col gap-8 md:gap-10 justify-start md:justify-center relative z-10">
          <div>
            <div className="flex items-end gap-1">
              <span
                ref={cgpaRef}
                className="font-display text-[3.5rem] md:text-[5rem] font-black text-white leading-none tracking-tighter"
              >
                0.0
              </span>
              <span className="text-[#4488ff] text-xl md:text-2xl font-black mb-1 md:mb-3">/10</span>
            </div>
            <p className="text-[#444] text-[10px] font-mono tracking-[0.3em] uppercase mt-1">
              CGPA
            </p>
          </div>

          <div className="hidden md:block w-px h-12 bg-[#111] self-start" />

          <div>
            <span
              ref={yearRef}
              className="font-display text-[3.5rem] md:text-[5rem] font-black text-white leading-none tracking-tighter"
            >
              2020
            </span>
            <p className="text-[#444] text-[10px] font-mono tracking-[0.3em] uppercase mt-1">
              Graduation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}