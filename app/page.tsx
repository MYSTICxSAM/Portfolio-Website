import SmoothScrollProvider from "../components/Smoothscrollprovider";
import CustomCursor from "../components/Customcursor";
import HeroSection from "../components/Herosection";
import ExperienceSection from "../components/Experiencesection";
import ProjectsSection from "../components/ProjectsSection";
import SkillsSection from "../components/Skillssection";
import EducationSection from "../components/Educationsection";

export const metadata = {
  title: "Samarth Prashar · Full-Stack Developer & DevOps",
  description:
    "Portfolio of Samarth Prashar — Full-Stack Developer, DevOps Engineer, and NLP researcher based in Jammu, India.",
};

export default function AboutPage() {
  return (
    <SmoothScrollProvider>
      <HeroSection />
      <CustomCursor />
      <main className="bg-[#080808] min-h-screen text-white overflow-x-hidden">
        {/* Fixed minimal nav */}
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-20 py-6 mix-blend-difference">
          <a
            href="/"
            className="font-display text-white font-black text-lg tracking-tighter"
          >
            SP
          </a>
          <div className="flex items-center gap-10">
            {["Work", "Projects", "Skills", "Education"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-xs font-mono tracking-[0.25em] uppercase text-[#888] hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </nav>

        
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />

        {/* Footer */}
        <footer className="px-20 py-16 border-t border-[#1a1a1a] flex items-center justify-between">
          <p className="text-[#333] text-xs font-mono tracking-widest">
            © 2025 Samarth Prashar
          </p>
          <div className="flex gap-8">
            {["GitHub", "LinkedIn", "Email"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-[#555] text-xs font-mono tracking-widest uppercase hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </footer>
      </main>
    </SmoothScrollProvider>
  );
}