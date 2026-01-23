import React from 'react';

const Certificates = ({ certificatesData }) => {
  return (
    <section id="certificates" className="py-24 px-6 relative" data-color="#6366f1">
        <div className="max-w-7xl mx-auto">
            <div className="mb-12 reveal-up">
                <span className="highlight-text font-mono text-sm tracking-wider uppercase">05. Achievement</span>
                <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 font-display">Sertifikasi & Lisensi</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {certificatesData?.map((cert, index) => (
                    <div key={index} className="glass-panel p-5 rounded-xl border border-white/5 flex flex-col gap-3 reveal-up tech-card hover:bg-white/5 transition-colors group">
                        <div className="flex justify-between items-start">
                            <div className="p-2 bg-white/5 rounded-lg text-[var(--primary-color)] group-hover:scale-110 transition-transform">
                                <i className="fas fa-certificate text-xl"></i>
                            </div>
                            <span className="text-xs text-slate-500 font-mono">{cert.date}</span>
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-lg leading-tight mb-1">{cert.title}</h4>
                            <p className="text-sm text-slate-400">{cert.company}</p>
                        </div>
                        <div className="mt-auto pt-3 border-t border-white/5 flex justify-between items-center">
                            <span className="text-xs font-mono highlight-text">#{cert.tags || 'cert'}</span>
                            <i className="fas fa-check-circle text-green-500 text-sm"></i>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};

export default Certificates;