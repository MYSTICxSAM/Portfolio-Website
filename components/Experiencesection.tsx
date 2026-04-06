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

      // Text Reveal
      const split = new SplitText(title, { type: "chars" });
      gsap.from(split.chars, {
        yPercent: 100,
        opacity: 0,
        stagger: 0.03,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: title,
          start: "top 85%",
        },
      });

      // --- PINNING LOGIC (PC ONLY) ---
      // We use mm.add to ensure pinning only happens on screens wider than 768px
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

      // --- HIGHLIGHT LOGIC ---
      itemRefs.current.forEach((item) => {
        if (!item) return;

        const companyEl = item.querySelector(".exp-company");
        const roleEl = item.querySelector(".exp-role");
        const bullets = item.querySelectorAll(".exp-bullet");

        gsap.set([companyEl, roleEl, bullets], { opacity: 0.2 });

        ScrollTrigger.create({
          trigger: item,
          start: "top 60%", // Slightly adjusted for mobile thumb-scrolling
          end: "bottom 40%",
          onEnter: () => gsap.to([companyEl, roleEl, bullets], { opacity: 1, duration: 0.5, stagger: 0.06 }),
          onLeave: () => gsap.to([companyEl, roleEl, bullets], { opacity: 0.2, duration: 0.4 }),
          onEnterBack: () => gsap.to([companyEl, roleEl, bullets], { opacity: 1, duration: 0.5, stagger: 0.06 }),
          onLeaveBack: () => gsap.to([companyEl, roleEl, bullets], { opacity: 0.2, duration: 0.4 }),
        });

        // Slide-in bullets
        gsap.from(bullets, {
          x: 20,
          opacity: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 75%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="relative bg-[#080808]">
      {/* Top label - Responsive Padding */}
      <div className="px-6 md:px-20 pt-20 md:pt-32 pb-8 md:pb-12 border-t border-[#1a1a1a]">
        <p className="text-[#888] text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase">
          02 / Experience
        </p>
        <h2
          ref={titleRef}
          className="font-display text-[14vw] md:text-[8vw] font-black text-white tracking-tighter leading-none mt-4 overflow-hidden"
        >
          EXPERIENCE
        </h2>
      </div>

      <div className="flex flex-col md:flex-row px-6 md:px-20 gap-0 md:gap-16">
        {/* --- LEFT: pinned vertical label (HIDDEN ON MOBILE) --- */}
        <div className="exp-pin-col hidden md:flex w-[200px] shrink-0 self-start pt-4 h-screen flex-col justify-center">
          <div className="writing-vertical text-[#333] text-xs font-mono tracking-[0.4em] uppercase select-none">
            Prende · GoBuild · RVS
          </div>
        </div>

        {/* --- RIGHT: scrolling roles --- */}
        <div className="flex-1 pb-20 md:pb-40">
          {experiences.map((exp, i) => (
            <div
              key={exp.company}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="exp-item min-h-[50vh] md:min-h-[60vh] flex flex-col justify-center py-12 md:py-20 border-b border-[#111] last:border-b-0"
            >
              {/* Meta row */}
              <div className="flex items-center gap-3 md:gap-4 mb-4">
                <span className="text-[#555] text-[10px] md:text-xs font-mono tracking-widest">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[#555] text-[10px] md:text-xs font-mono tracking-widest">
                  {exp.period}
                </span>
                <span className="ml-auto text-[#333] text-[10px] md:text-xs font-mono">
                  {exp.location}
                </span>
              </div>

              <p className="exp-company font-display text-[10vw] md:text-[5vw] font-black text-white tracking-tighter leading-none">
                {exp.company}
              </p>
              <p className="exp-role text-[#555] text-sm md:text-lg font-mono mt-2 mb-6 md:mb-8">
                {exp.role}
              </p>

              <ul className="space-y-4 md:space-y-3 max-w-2xl">
                {exp.bullets.map((b, bi) => (
                  <li
                    key={bi}
                    className="exp-bullet flex gap-3 md:gap-4 text-[#888] text-sm md:text-base leading-relaxed"
                  >
                    <span className="text-[#4488ff] mt-0.5 shrink-0">→</span>
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