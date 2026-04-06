"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Three.js"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express", "FastAPI", "GraphQL", "REST", "WebSockets"],
  },
  {
    category: "Data & ML",
    skills: ["Python", "PyTorch", "HuggingFace", "MongoDB", "PostgreSQL", "Redis"],
  },
  {
    category: "DevOps & Infra",
    skills: ["Docker", "Kubernetes", "Jenkins", "Terraform", "Prometheus", "GitHub Actions"],
  },
];

/** Magnetic effect — disabled on touch devices to prevent jitter */
function useMagnetic(refs: React.MutableRefObject<(HTMLElement | null)[]>) {
  useEffect(() => {
    // Check if device supports hover (mouse)
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const cleanups: (() => void)[] = [];

    refs.current.forEach((el) => {
      if (!el) return;

      const handleMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        const radius = 120;

        if (dist < radius) {
          const strength = (1 - dist / radius) * 0.35;
          gsap.to(el, {
            x: dx * strength,
            y: dy * strength,
            duration: 0.4,
            ease: "power2.out",
          });
        } else {
          gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
        }
      };

      const handleLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
      };

      window.addEventListener("mousemove", handleMove);
      el.addEventListener("mouseleave", handleLeave);

      cleanups.push(() => {
        window.removeEventListener("mousemove", handleMove);
        el.removeEventListener("mouseleave", handleLeave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [refs]);
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const tagRefs = useRef<(HTMLElement | null)[]>([]);

  useMagnetic(tagRefs);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger reveal each group
      gsap.utils.toArray<HTMLElement>(".skill-group").forEach((group, i) => {
        gsap.from(group, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: group,
            start: "top 90%",
          },
        });
      });

      // Tags stagger within each group
      gsap.utils.toArray<HTMLElement>(".skill-tag").forEach((tag, i) => {
        gsap.from(tag, {
          scale: 0.8,
          opacity: 0,
          duration: 0.5,
          delay: i * 0.03,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: tag,
            start: "top 95%",
          },
        });
      });

      // Marquee / ticker
      const marquee = document.querySelector(".skills-marquee-inner");
      if (marquee) {
        gsap.to(marquee, {
          xPercent: -50,
          ease: "none",
          duration: 25, // Slightly slower for better readability on mobile
          repeat: -1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const allSkills = skillGroups.flatMap((g) => g.skills);
  let tagIndex = 0;

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="bg-[#050505] px-6 md:px-20 py-20 md:py-32 border-t border-[#1a1a1a]"
    >
      <p className="text-[#888] text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase mb-4">
        04 / Skills
      </p>
      <h2 className="font-display text-[14vw] md:text-[8vw] font-black text-white tracking-tighter leading-none mb-12 md:mb-20 overflow-hidden">
        TOOLKIT
      </h2>

      {/* Skill groups grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-16 md:mb-28">
        {skillGroups.map((group) => (
          <div key={group.category} className="skill-group">
            <p className="text-[#444] text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase mb-4 md:mb-5 border-b border-[#111] pb-3">
              {group.category}
            </p>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {group.skills.map((skill) => {
                const currentIndex = tagIndex++;
                return (
                  <span
                    key={skill}
                    ref={(el) => {
                      tagRefs.current[currentIndex] = el;
                    }}
                    className="skill-tag inline-block px-3 py-1.5 md:px-4 md:py-2 border border-[#222] text-[#888] text-xs md:text-sm font-mono rounded-full cursor-default hover:border-[#4488ff] hover:text-[#4488ff] transition-colors duration-300 will-change-transform"
                  >
                    {skill}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Horizontal marquee of all skills */}
      <div className="overflow-hidden border-t border-b border-[#111] py-4 md:py-5">
        <div
          className="skills-marquee-inner flex gap-6 md:gap-8 whitespace-nowrap"
          style={{ width: "200%" }}
        >
          {[...allSkills, ...allSkills].map((skill, i) => (
            <span
              key={i}
              className="text-[#1a1a1a] text-xl md:text-3xl font-black font-display tracking-tighter uppercase"
            >
              {skill}
              <span className="text-[#4488ff] ml-6 md:ml-8 mr-0">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}