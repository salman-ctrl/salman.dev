import React from 'react';

const Skills = ({ skillsData }) => {
  return (
    <section id="skills" className="py-24 px-6 relative" data-color="#10b981">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 reveal-up">
          <div className="glass-panel p-8 rounded-2xl sticky top-24">
            <h3 className="text-white font-mono mb-6 text-xl"><i className="fas fa-chart-pie highlight-text mr-2"></i> Code Analytics</h3>
            <div className="space-y-6">
              {[
                { l: "JavaScript/TypeScript", v: "95%" },
                { l: "PHP/Laravel", v: "85%" },
                { l: "SQL/NoSQL", v: "80%" },
                { l: "System Architecture", v: "75%" }
              ].map(s => (
                <div key={s.l}>
                  <div className="flex justify-between text-sm mb-2"><span className="text-slate-300">{s.l}</span><span className="highlight-text">{s.v}</span></div>
                  <div className="bg-white/5 rounded h-1.5 w-full overflow-hidden"><div className="bar-fill h-full bg-[var(--primary-color)] w-0 transition-all duration-1000" data-width={s.v}></div></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="mb-12 reveal-up">
            <h3 className="text-white font-mono mb-6 flex items-center gap-2 text-xl border-b border-white/10 pb-4">
              <i className="fas fa-layer-group highlight-text"></i> Technical Skills
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {skillsData?.map((skill, index) => (
                <div key={index} className="tech-card glass-panel p-4 rounded-xl border border-white/5 flex flex-col items-center gap-2 group cursor-pointer hover:bg-white/5">
                  <img src={skill.img} alt={skill.name} className="w-12 h-12 object-contain mb-2 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-transform group-hover:scale-110" />
                  <span className="text-sm text-slate-300">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;