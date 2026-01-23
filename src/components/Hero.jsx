import React from 'react';
import HackerText from './HackerText';

const Hero = ({ portfolioData }) => {
  return (
    <header id="home" className="min-h-screen flex items-center justify-center relative px-6 pt-16" data-color="#22d3ee">
      <div className="max-w-6xl mx-auto text-center z-10">
        <div className="reveal-up inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 border border-white/10">
          <span className="w-2 h-2 rounded-full bg-[var(--primary-color)] animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"></span>
          <span className="text-xs font-mono highlight-text tracking-wider uppercase">Open for Opportunities</span>
        </div>

        <h1 className="reveal-up text-5xl md:text-7xl lg:text-9xl font-black text-white mb-6 tracking-tight leading-[0.9] font-display">
          Salman <HackerText text="Rizky" className="highlight-text inline-block" />
        </h1>

        <h2 className="reveal-up text-xl md:text-2xl text-slate-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          {portfolioData?.profile?.role || "Web Developer"} <span className="text-white font-medium">Scalable</span> & <span className="text-white font-medium">High-Performance</span>.
        </h2>
        
        <div className="reveal-up flex flex-col sm:flex-row gap-5 justify-center items-center w-full sm:w-auto">
          <a href="#projects" className="w-full sm:w-auto px-8 py-4 rounded-xl text-[#020617] font-bold transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.4)] bg-[var(--primary-color)] text-center">
            Lihat Proyek
          </a>
          <a href="#" className="w-full sm:w-auto px-8 py-4 rounded-xl glass-panel text-white font-medium hover:bg-white/10 border border-white/10 transition-all flex items-center justify-center gap-3 group">
            <span>Unduh CV</span>
            <i className="fas fa-download group-hover:translate-y-1 transition-transform"></i>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Hero;