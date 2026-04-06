"use client";

import { useState } from "react";
import SmoothScrollProvider from "../components/Smoothscrollprovider";
import CustomCursor from "../components/Customcursor";
import HeroSection from "../components/Herosection";
import ExperienceSection from "../components/Experiencesection";
import ProjectsSection from "../components/ProjectsSection";
import SkillsSection from "../components/Skillssection";
import EducationSection from "../components/Educationsection";

export default function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Work", href: "#work" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Education", href: "#education" },
  ];

  // Social Links Data
  const socialLinks = [
    { name: "GitHub", href: "https://github.com/MYSTICxSAM" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/samarth-prashar-739053286/" },
    { name: "Email", href: "mailto:samarthprashar1525@gmail.com" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <SmoothScrollProvider>
      <HeroSection />
      <CustomCursor />
      <main className="bg-[#080808] min-h-screen text-white overflow-x-hidden">
        
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-8 md:px-20 py-6 mix-blend-difference">
          <a
            href="/"
            className="font-display text-white font-black text-lg tracking-tighter z-[110]"
          >
            SP
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-xs font-mono tracking-[0.25em] uppercase text-[#888] hover:text-white transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Hamburger Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden flex flex-col gap-1.5 z-[110] p-2"
            aria-label="Toggle Menu"
          >
            <span className={`h-0.5 w-6 bg-white transition-transform duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`h-0.5 w-6 bg-white transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`h-0.5 w-6 bg-white transition-transform duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </nav>

        {/* Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 bg-[#080808] z-[90] flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${
            isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div className="flex flex-col items-center gap-8">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-mono tracking-[0.2em] uppercase text-[#888] hover:text-white transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>

        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />

        {/* Updated Footer */}
        <footer className="px-8 md:px-20 py-16 border-t border-[#1a1a1a] flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-[#333] text-xs font-mono tracking-widest order-2 md:order-1">
            © 2026 Samarth Prashar
          </p>
          <div className="flex gap-8 order-1 md:order-2">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.name !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="text-[#555] text-xs font-mono tracking-widest uppercase hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </footer>
      </main>
    </SmoothScrollProvider>
  );
}