"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  stack: string[];
  featured?: boolean;
  image?: string;
};

const projects: Project[] = [
  {
    id: "pos-tagger",
    title: "Dogri POS Tagger",
    category: "NLP / Research",
    year: "2024",
    description:
      "A part-of-speech tagger for the low-resource Dogri language, built with a BiLSTM-CRF architecture and a custom annotated corpus of 12,000 tokens. Achieved 91.4% accuracy — the first published baseline for this language.",
    stack: ["Python", "PyTorch", "HuggingFace", "FastAPI"],
    featured: true,
    image: "/projects/pos-tagger.jpg",
  },
  {
    id: "devops-dashboard",
    title: "K8s Ops Dashboard",
    category: "DevOps / Tooling",
    year: "2024",
    description:
      "Real-time Kubernetes cluster monitoring dashboard built with Next.js and WebSockets. Displays pod health, resource utilisation, and alerting rules with sub-second latency.",
    stack: ["Next.js", "Node.js", "Kubernetes", "Prometheus", "Grafana"],
    featured: false,
    image: "/projects/k8s-dash.jpg",
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const clipRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- Section heading reveal ---
      if (titleRef.current) {
        const Split: any = SplitText;
        const split = new Split(titleRef.current, { type: "words" });
        gsap.from(split.words, {
          yPercent: 100,
          opacity: 0,
          stagger: 0.07,
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 90%",
          },
        });
      }

      // --- Clip-path circle expansion ---
      if (clipRef.current) {
        gsap.fromTo(
          clipRef.current,
          {
            clipPath: "circle(12% at 50% 50%)", // Slightly larger start for mobile visibility
          },
          {
            clipPath: "circle(100% at 50% 50%)",
            ease: "none",
            scrollTrigger: {
              trigger: clipRef.current,
              start: "top 80%",
              end: "bottom 20%",
              scrub: 1.2,
            },
          }
        );
      }

      // --- Project cards slide in ---
      gsap.utils.toArray<HTMLElement>(".proj-card").forEach((card, i) => {
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="bg-[#080808] px-6 md:px-20 py-20 md:py-32 border-t border-[#1a1a1a]"
    >
      {/* Label + heading */}
      <p className="text-[#888] text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase mb-4">
        03 / Projects
      </p>
      <h2
        ref={titleRef}
        className="font-display text-[12vw] md:text-[8vw] font-black text-white tracking-tighter leading-none mb-12 md:mb-20 overflow-hidden"
      >
        SELECTED WORK
      </h2>

      {/* Featured project */}
      {featured && (
        <div className="relative mb-20 md:mb-28 overflow-hidden rounded-sm">
          {/* Image layer with responsive aspect ratio */}
          <div
            ref={clipRef}
            className="relative w-full aspect-[4/3] md:aspect-[16/7] bg-[#111] overflow-hidden"
            style={{ clipPath: "circle(12% at 50% 50%)" }}
          >
            <div
              className="absolute inset-0 bg-gradient-to-br from-[#0d0d2b] to-[#0a1a2a]"
              aria-hidden="true"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#4488ff" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
            
            {/* Centred label inside clip - Responsive text size */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center">
              <span className="font-display text-3xl md:text-5xl font-black tracking-tighter mb-2">
                {featured.title}
              </span>
              <span className="text-[#4488ff] font-mono text-[10px] md:text-sm tracking-widest uppercase">
                {featured.category}
              </span>
            </div>
          </div>

          {/* Text below image - Stacks on mobile */}
          <div className="flex flex-col md:flex-row items-start justify-between mt-8 gap-8 md:gap-12">
            <div className="max-w-2xl">
              <p className="text-[#888] text-sm md:text-base leading-relaxed">
                {featured.description}
              </p>
            </div>
            <div className="shrink-0 w-full md:w-auto md:text-right">
              <p className="text-[#333] text-[10px] md:text-xs font-mono tracking-widest mb-3 uppercase">
                Stack
              </p>
              <div className="flex flex-wrap gap-2 justify-start md:justify-end">
                {featured.stack.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 border border-[#222] text-[#666] text-[10px] md:text-xs font-mono rounded-full"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Other projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {rest.map((proj) => (
          <div
            key={proj.id}
            className="proj-card group border border-[#1a1a1a] rounded-sm p-6 md:p-8 hover:border-[#333] transition-colors duration-500 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-[#333] text-[10px] md:text-xs font-mono tracking-widest">
                {proj.year}
              </span>
              <span className="text-[#4488ff] text-[10px] md:text-xs font-mono tracking-widest uppercase">
                {proj.category}
              </span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-black text-white tracking-tighter mb-3 group-hover:text-[#4488ff] transition-colors duration-300">
              {proj.title}
            </h3>
            <p className="text-[#666] text-xs md:text-sm leading-relaxed mb-6">
              {proj.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {proj.stack.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 border border-[#222] text-[#555] text-[10px] md:text-xs font-mono rounded-full"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}