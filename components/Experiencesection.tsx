"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const experiences = [
  {
    company: "Prende Inc",
    role: "Full-Stack Developer Intern",
    period: "Jun 2024 – Aug 2024",
    location: "Remote",
    bullets: [
      "Architected a real-time notification system using WebSockets, reducing user latency by 40%.",
      "Migrated legacy REST endpoints to GraphQL, cutting over-fetching by 60%.",
      "Built CI/CD pipelines with GitHub Actions and Docker, achieving zero-downtime deployments.",
    ],
  },
  {
    company: "GoBuild",
    role: "Frontend Developer Intern",
    period: "Jan 2024 – May 2024",
    location: "Remote",
    bullets: [
      "Delivered a component library in React + TypeScript, used across 3 internal products.",
      "Integrated Mapbox GL for real-time construction site tracking, supporting 200+ concurrent users.",
      "Reduced initial bundle size by 35% through code-splitting and lazy loading strategies.",
    ],
  },
  {
    company: "RVS iGlobal",
    role: "DevOps Engineer Intern",
    period: "Aug 2023 – Dec 2023",
    location: "Hybrid",
    bullets: [
      "Containerised 8 microservices with Docker Compose; orchestrated on a self-managed k3s cluster.",
      "Set up Prometheus + Grafana monitoring stack, cutting incident response time from 2h → 20min.",
      "Automated infrastructure provisioning with Terraform, eliminating 90% of manual setup.",
    ],
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const title = titleRef.current;
      if (!section || !title) return;

      // 1. Title Reveal Animation
      const split = new SplitText(title, { type: "chars" });
      gsap.from(split.chars, {
        yPercent: 100,
        opacity: 0,
        stagger: 0.03,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: title,
          start: "top 90%", // Trigger slightly earlier on mobile
        },
      });

      // 2. Desktop Pinning Logic (768px+)
      let mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          pin: ".exp-pin-col",
          pinSpacing: false,
        });
      });

      // 3. Highlight & Slide-in Logic per Item
      itemRefs.current.forEach((item) => {
        if (!item) return;

        const companyEl = item.querySelector(".exp-company");
        const roleEl = item.querySelector(".exp-role");
        const bullets = item.querySelectorAll(".exp-bullet");

        // Initial state
        gsap.set([companyEl, roleEl, bullets], { opacity: 0.15 });

        ScrollTrigger.create({
          trigger: item,
          start: "top 65%", 
          end: "bottom 35%",
          onEnter: () => gsap.to([companyEl, roleEl, bullets], { opacity: 1, duration: 0.6, stagger: 0.05 }),
          onLeave: () => gsap.to([companyEl, roleEl, bullets], { opacity: 0.15, duration: 0.4 }),
          onEnterBack: () => gsap.to([companyEl, roleEl, bullets], { opacity: 1, duration: 0.6, stagger: 0.05 }),
          onLeaveBack: () => gsap.to([companyEl, roleEl, bullets], { opacity: 0.15, duration: 0.4 }),
        });

        // Specific Slide-in for Bullets
        gsap.from(bullets, {
          x: 15,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="relative bg-[#080808]">
      {/* Header Container */}
      <div className="px-6 md:px-20 pt-20 md:pt-32 pb-8 md:pb-12 border-t border-[#1a1a1a]">
        <p className="text-[#888] text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase">
          02 / Experience
        </p>
        
        {/* FIXED: Font size adjusted and whitespace-nowrap added */}
        <h2
          ref={titleRef}
          className="font-display text-[11.2vw] md:text-[8vw] font-black text-white tracking-tighter leading-none mt-4 overflow-hidden whitespace-nowrap"
        >
          EXPERIENCE
        </h2>
      </div>

      <div className="flex flex-col md:flex-row px-6 md:px-20 gap-0 md:gap-16">
        {/* Left Column (Pinned on Desktop) */}
        <div className="exp-pin-col hidden md:flex w-[200px] shrink-0 self-start pt-4 h-screen flex-col justify-center">
          <div className="writing-vertical text-[#222] text-xs font-mono tracking-[0.4em] uppercase select-none">
            Prende · GoBuild · RVS
          </div>
        </div>

        {/* Right Column (Scrolling Items) */}
        <div className="flex-1 pb-20 md:pb-40">
          {experiences.map((exp, i) => (
            <div
              key={exp.company}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="exp-item min-h-[45vh] md:min-h-[60vh] flex flex-col justify-center py-12 md:py-20 border-b border-[#111] last:border-b-0"
            >
              {/* Timeline/Meta Row */}
              <div className="flex items-center gap-3 md:gap-4 mb-6">
                <span className="text-[#444] text-[10px] md:text-xs font-mono tracking-widest">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[#555] text-[10px] md:text-xs font-mono tracking-widest">
                  {exp.period}
                </span>
                <span className="ml-auto text-[#333] text-[10px] md:text-xs font-mono uppercase tracking-tighter">
                  {exp.location}
                </span>
              </div>

              <h3 className="exp-company font-display text-[11vw] md:text-[5vw] font-black text-white tracking-tighter leading-[0.9]">
                {exp.company}
              </h3>
              <p className="exp-role text-[#666] text-sm md:text-lg font-mono mt-3 mb-8">
                {exp.role}
              </p>

              <ul className="space-y-5 md:space-y-4 max-w-2xl">
                {exp.bullets.map((b, bi) => (
                  <li
                    key={bi}
                    className="exp-bullet flex gap-3 md:gap-4 text-[#888] text-[13px] md:text-base leading-relaxed"
                  >
                    <span className="text-[#4488ff] mt-1 shrink-0 text-xs">→</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}