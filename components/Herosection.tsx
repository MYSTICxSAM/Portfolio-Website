"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgNameRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLHeadingElement>(null);
  const expertiseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const bgName = bgNameRef.current;
      const heroContent = heroContentRef.current;
      const expertise = expertiseRef.current;

      if (!section || !bgName || !heroContent || !expertise) return;

      // 1. Initial Entrance
      const split = new SplitText(taglineRef.current, { type: "lines" });
      gsap.from(split.lines, {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out",
      });

      // 2. Background "SAMARTH" scale and fade
      gsap.to(bgName, {
        scale: 1.8,
        opacity: 0,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "50% top",
          scrub: 1,
        },
      });

      // 3. Hero Content Fades Out
      gsap.to(heroContent, {
        opacity: 0,
        y: -100,
        scrollTrigger: {
          trigger: section,
          start: "10% top",
          end: "40% top",
          scrub: 1,
        },
      });

      // 4. Expertise Grid Fades In
      const cards = expertise.querySelectorAll(".expertise-card");
      gsap.fromTo(
        cards,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: section,
            start: "30% top",
            end: "70% top",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[200vh] bg-[#050505]">
      {/* Subtle Grid */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:60px_60px]"></div>

      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* BIG BACKGROUND NAME */}
        <div ref={bgNameRef} className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span
            className="font-display font-black text-white/[0.09] leading-[0.85] whitespace-nowrap"
            style={{ fontSize: 'clamp(3rem, 10vw, 16rem)' }}
          >
            SAMARTH
          </span>
        </div>

        {/* --- PHASE 1 CONTENT: HERO --- */}
        <div ref={heroContentRef} className="relative z-10 flex flex-col items-center text-center px-6">
          <p className="text-[#888] text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.5em] uppercase mb-6 md:mb-8 font-mono">
            Full-Stack & DevOps · 2026
          </p>
          <h1 ref={taglineRef} className="text-[12vw] md:text-[5vw] font-black leading-[0.95] md:leading-[0.9] tracking-tighter mb-8 md:mb-10 max-w-[15ch]">
            Engineering Digital <br className="hidden md:block" /> Resilience.
          </h1>
          {/* <div className="flex flex-col items-center gap-4">
            <div className="w-px h-8 md:h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
            <p className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.3em] text-white/30">Scroll</p>
          </div> */}
        </div>

        {/* --- PHASE 2 CONTENT: EXPERTISE --- */}
        <div 
          ref={expertiseRef} 
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 md:px-6 pointer-events-none"
        >
          {/* Decorative Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-500/5 md:bg-blue-500/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 max-w-6xl w-full pointer-events-auto">
            
            {/* Card 01 */}
            <div className="expertise-card bg-white/[0.02] border border-white/5 p-6 md:p-10 backdrop-blur-sm group hover:border-white/20 transition-colors">
              <div className="text-white/20 font-mono text-xs md:text-sm mb-3 md:mb-6 group-hover:text-white/60 transition-colors">/01</div>
              <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">Architecture</h3>
              <p className="text-xs md:text-sm text-[#777] leading-relaxed">Designing distributed systems with Node.js and Go, focusing on high availability.</p>
              <div className="mt-4 md:mt-6 flex flex-wrap gap-2">
                {["K8s", "Docker", "AWS"].map(t => <span key={t} className="text-[9px] md:text-[10px] font-mono border border-white/10 px-2 py-0.5 opacity-50">{t}</span>)}
              </div>
            </div>

            {/* Card 02 */}
            <div className="expertise-card bg-white/[0.02] border border-white/5 p-6 md:p-10 backdrop-blur-sm group hover:border-white/20 transition-colors">
              <div className="text-white/20 font-mono text-xs md:text-sm mb-3 md:mb-6 group-hover:text-white/60 transition-colors">/02</div>
              <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">Interfaces</h3>
              <p className="text-xs md:text-sm text-[#777] leading-relaxed">Building immersive web experiences using React, Next.js, and motion libraries.</p>
              <div className="mt-4 md:mt-6 flex flex-wrap gap-2">
                {["GSAP", "Three.js", "TS"].map(t => <span key={t} className="text-[9px] md:text-[10px] font-mono border border-white/10 px-2 py-0.5 opacity-50">{t}</span>)}
              </div>
            </div>

            {/* Card 03 */}
            <div className="expertise-card bg-white/[0.02] border border-white/5 p-6 md:p-10 backdrop-blur-sm group hover:border-white/20 transition-colors">
              <div className="text-white/20 font-mono text-xs md:text-sm mb-3 md:mb-6 group-hover:text-white/60 transition-colors">/03</div>
              <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">Intelligence</h3>
              <p className="text-xs md:text-sm text-[#777] leading-relaxed">Integrating LLMs and NLP pipelines into production workflows for automation.</p>
              <div className="mt-4 md:mt-6 flex flex-wrap gap-2">
                {["Python", "PyTorch", "NLP"].map(t => <span key={t} className="text-[9px] md:text-[10px] font-mono border border-white/10 px-2 py-0.5 opacity-50">{t}</span>)}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}