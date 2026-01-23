import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import portfolioData from './data.json';

import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import ThreeBackground from './components/ThreeBackground';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollProgressRef = useRef(null);
  const mainRef = useRef(null);

  // Custom Cursor & Scroll Progress Logic
  useEffect(() => {
    if (loading) return;

    const cursorDot = document.getElementById("cursor-dot");
    const cursorOutline = document.getElementById("cursor-outline");
    
    // Mouse Move Logic
    const moveCursor = (e) => {
      if(cursorDot) {
          cursorDot.style.left = `${e.clientX}px`;
          cursorDot.style.top = `${e.clientY}px`;
      }
      if(cursorOutline) {
          cursorOutline.animate({ left: `${e.clientX}px`, top: `${e.clientY}px` }, { duration: 500, fill: "forwards" });
      }
    };

    // Scroll Logic (Progress Bar & Color Shift)
    const updateScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrollTop / (scrollHeight || 1)) * 100;
      
      if (scrollProgressRef.current) scrollProgressRef.current.style.width = `${progress}%`;
      
      // Dynamic Color Shifting
      const sections = document.querySelectorAll('section, header, footer');
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        // Change color when section is in middle of viewport
        if(rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          const color = section.dataset.color;
          if(color) document.documentElement.style.setProperty('--primary-color', color);
        }
      });
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("scroll", updateScroll);
    
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("scroll", updateScroll);
    };
  }, [loading]);

  // GSAP Animations Setup
  useLayoutEffect(() => {
    if (loading) return;
    
    const ctx = gsap.context(() => {
      // Reveal Elements Upwards
      gsap.utils.toArray('.reveal-up').forEach((item) => {
        gsap.from(item, {
          scrollTrigger: { trigger: item, start: "top 85%" },
          y: 50, opacity: 0, duration: 1, ease: "power3.out"
        });
      });
      
      // Animate Skill Bars
      gsap.utils.toArray('.bar-fill').forEach((bar) => {
        gsap.to(bar, {
          scrollTrigger: { trigger: bar, start: "top 90%" },
          width: bar.dataset.width,
          duration: 1.5,
          ease: "power2.out"
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, [loading]);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      {!loading && (
        <div ref={mainRef} className="text-slate-300">
          {/* --- Global UI Elements --- */}
          <div id="cursor-dot"></div>
          <div id="cursor-outline"></div>
          <div id="scroll-progress" ref={scrollProgressRef}></div>
          
          {/* Background Canvas (z-0) */}
          <ThreeBackground />

          <Navbar toggleMenu={() => setIsMenuOpen(!isMenuOpen)} isMenuOpen={isMenuOpen} />

          {/* --- Main Content (Relative z-10 ensures it sits ON TOP of canvas) --- */}
          <div className="relative z-10">
            <Hero portfolioData={portfolioData} />
            <About />
            <Experience experienceData={portfolioData?.experience} />
            <Skills skillsData={portfolioData?.skills} />
            <Projects projectsData={portfolioData?.projects} />
            <Certificates certificatesData={portfolioData?.certificates} />
            <Contact />
          </div>
        </div>
      )}
    </>
  );
};

export default App;