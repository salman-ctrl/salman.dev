import React from 'react';

const Experience = ({ experienceData }) => {
  return (
    <section id="experience" className="py-32 px-6" data-color="#ec4899">
      <div className="max-w-5xl mx-auto">
        <div className="mb-20 text-center reveal-up">
          <span className="highlight-text font-mono text-sm tracking-widest uppercase">02. Career Journey</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-3 font-display">Professional Experience</h2>
        </div>

        <div className="relative">
          {/* Vertical Line: Centered on Desktop, Left on Mobile */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2"></div>

          {experienceData?.map((exp, index) => {
            // Logic: Even items (0, 2) content on Left. Odd items (1) content on Right.
            const isEven = index % 2 === 0;
            
            return (
              <div key={index} className="relative flex flex-col md:flex-row gap-8 mb-16 reveal-up group">
                
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 top-0 w-4 h-4 rounded-full border-4 border-navy-950 bg-[var(--primary-color)] md:-translate-x-1/2 transform translate-y-6 z-10 shadow-[0_0_10px_var(--primary-color)] group-hover:scale-125 transition-transform duration-300"></div>

                {/* LEFT COLUMN */}
                <div className={`md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:order-1 md:text-right md:pr-12' : 'md:order-1 hidden md:block text-right pr-12 pt-6'}`}>
                    {isEven ? (
                      // CONTENT CARD (Left Side for Even)
                      <div className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-[var(--primary-color)] hover:bg-white/5 transition-all duration-300 tech-card group relative">
                          <h3 className="text-xl font-bold text-white group-hover:text-[var(--primary-color)] transition-colors">{exp.role}</h3>
                          <h4 className="highlight-text font-mono text-sm mb-4">{exp.company}</h4>
                          <p className="text-slate-400 text-sm leading-relaxed">{exp.desc}</p>
                      </div>
                    ) : (
                      // DATE LABEL (Left Side for Odd)
                      <span className="font-mono text-white text-sm bg-white/5 px-3 py-1 rounded-full border border-white/10 inline-block">
                        {exp.date}
                      </span>
                    )}
                </div>

                {/* RIGHT COLUMN */}
                <div className={`md:w-1/2 pl-12 ${isEven ? 'md:order-2 md:pl-12 pt-6' : 'md:order-2 md:pl-12'}`}>
                    {isEven ? (
                        // DATE LABEL (Right Side for Even)
                        <span className="font-mono highlight-text text-sm bg-white/5 px-3 py-1 rounded-full border border-white/10 inline-block">
                          {exp.date}
                        </span>
                    ) : (
                        // CONTENT CARD (Right Side for Odd)
                        <>
                          <div className="md:hidden mb-2">
                             <span className="font-mono text-white text-sm bg-white/5 px-3 py-1 rounded-full border border-white/10 inline-block">
                                {exp.date}
                              </span>
                          </div>
                          <div className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-[var(--primary-color)] hover:bg-white/5 transition-all duration-300 tech-card group relative">
                              <h3 className="text-xl font-bold text-white group-hover:text-[var(--primary-color)] transition-colors">{exp.role}</h3>
                              <h4 className="highlight-text font-mono text-sm mb-4">{exp.company}</h4>
                              <p className="text-slate-400 text-sm leading-relaxed">{exp.desc}</p>
                          </div>
                        </>
                    )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;