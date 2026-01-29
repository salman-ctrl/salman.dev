import React from 'react';
import HackerText from './HackerText';

const About = () => {
  return (
    <section id="about" className="py-32 px-6" data-color="#8b5cf6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* --- Main Bio Section --- */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-8 md:p-12 reveal-up border-t-4 border-[var(--primary-color)]">
            <div className="flex items-center gap-2 mb-6 highlight-text font-mono text-sm">
              <i className="fas fa-user-astronaut"></i> 01. ABOUT ME
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight font-display">
              Building Digital Solutions that are <HackerText text="Effective & Efficient" className="highlight-text" />.
            </h3>
            <p className="text-slate-400 leading-relaxed text-lg mb-6">
              With over 1 year of experience building end-to-end applications, I possess deep expertise in the <strong className="text-white">MERN Stack, Next.js, and Laravel</strong> ecosystems. My focus is on writing clean architecture and delivering high-performance results.
            </p>
          </div>

          {/* --- Right Column (Awards & Stats) --- */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">

            {/* --- Updated Award Card --- */}
            <div className="col-span-2 glass-panel rounded-3xl p-6 reveal-up relative overflow-hidden group border border-white/5 hover:border-white/20 transition-colors">
              {/* Background Icon Decoration */}
              <div className="absolute -top-2 -right-2 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                <i className="fas fa-trophy text-9xl text-yellow-500"></i>
              </div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-2">
                  <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-bold font-mono border border-yellow-500/20">
                    NATIONAL 2ND PLACE
                  </span>
                </div>

                <h4 className="text-xl font-bold text-white mt-2">GEMAFTIK 2025: MoodMap</h4>
                <p className="text-sm text-slate-400 mb-4 font-mono">Universitas Teknorat Indonesia</p>

                {/* Description added here */}
                <div className="text-xs text-slate-300 leading-relaxed border-t border-white/10 pt-3 space-y-2">
                  <p>
                    National award-winning mental health platform combating student wellness crisis.
                  </p>
                  <p>
                    Features <span className="text-white font-semibold">AI-powered emotion analysis</span> using fine-tuned IndoBERT (<span className="highlight-text">99.5% accuracy</span> on 7,000+ datasets), expressive writing therapy, and mood pattern recognition.
                  </p>
                </div>
              </div>
            </div>

            {/* --- Stats Cards --- */}
            <div className="glass-panel rounded-3xl p-6 flex flex-col justify-center items-center text-center reveal-up tech-card">
              <span className="text-4xl md:text-5xl font-black text-white mb-2 font-display">1+</span>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Years Experience</span>
            </div>
            <div className="glass-panel rounded-3xl p-6 flex flex-col justify-center items-center text-center reveal-up tech-card">
              <span className="text-4xl md:text-5xl font-black highlight-text mb-2 font-display">99.5%</span>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">AI Model Accuracy</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;