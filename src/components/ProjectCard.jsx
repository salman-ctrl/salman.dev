import React, { useRef, useState } from 'react';

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);
  const [imgError, setImgError] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Efek Tilt 3D yang halus
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
        cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    }
  };

  // Validasi URL gambar
  const hasImage = project.img && project.img.trim() !== "";
  // Tampilkan gambar jika ada URL dan tidak error
  const showImage = hasImage && !imgError;

  return (
    <div 
      className="project-card reveal-up h-full" 
      ref={cardRef} 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
    >
      <div className="glass-panel rounded-2xl overflow-hidden group hover:shadow-[0_0_40px_rgba(34,211,238,0.15)] hover:border-[var(--primary-color)] transition-all duration-500 h-full flex flex-col border border-white/5 bg-[#0a0f1c]/60 backdrop-blur-md relative">
        
        {/* --- IMAGE SECTION --- */}
        <div className="h-48 relative w-full overflow-hidden flex items-center justify-center border-b border-white/5 bg-[#020617]">
          
          {/* 1. Render Gambar dengan <img> tag */}
          {hasImage && (
             <img 
               src={project.img}
               alt={project.title}
               className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${imgError ? 'hidden' : 'block'}`}
               onError={(e) => {
                 console.warn(`Gagal memuat gambar: ${project.img}`);
                 setImgError(true);
               }}
             />
          )}

          {/* 2. Overlay Gradient */}
          <div className={`absolute inset-0 transition-all duration-500 pointer-events-none ${showImage ? 'bg-[#020617]/10 group-hover:bg-[#020617]/0' : 'bg-gradient-to-br from-[#0f172a] to-[#1e293b]'}`}></div>
          
          {/* 3. Fallback Icon */}
          {(!showImage) && (
            <div className="relative z-10 flex flex-col items-center gap-2 text-slate-600 group-hover:text-[var(--primary-color)] transition-colors duration-500">
                <i className="fas fa-code text-5xl transform group-hover:scale-110 transition-transform duration-500"></i>
            </div>
          )}
        </div>

        {/* --- CONTENT SECTION --- */}
        <div className="p-6 flex-1 flex flex-col relative z-10">
          
          {/* Header: Title & Link */}
          <div className="flex justify-between items-start mb-3 gap-4">
            <div>
                <h3 className="text-xl font-bold text-white group-hover:text-[var(--primary-color)] transition-colors line-clamp-1" title={project.title}>
                  {project.title}
                </h3>
                
                {/* Atribut Baru: Company & Date (Pakai FontAwesome) */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs font-mono text-slate-400">
                    {project.company && (
                      <div className="flex items-center gap-1.5">
                        <i className="fas fa-building text-[var(--primary-color)]"></i>
                        <span>{project.company}</span>
                      </div>
                    )}
                    {project.date && (
                      <div className="flex items-center gap-1.5">
                        <i className="fas fa-calendar-alt text-[var(--primary-color)]"></i>
                        <span>{project.date}</span>
                      </div>
                    )}
                </div>
            </div>
            
            {/* Project Link */}
            {project.link && project.link !== '#' && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-2 bg-white/5 rounded-lg border border-white/10 hover:bg-white/20 hover:text-white hover:border-white/30 text-slate-400 transition-all shrink-0" 
                  title="Visit Project"
                >
                    <i className="fas fa-external-link-alt text-lg"></i>
                </a>
            )}
          </div>

          {/* Description */}
          <p className="text-slate-400 text-sm mb-6 flex-1 line-clamp-3 leading-relaxed border-t border-white/5 pt-4 mt-2">
            {project.description}
          </p>

          {/* Technologies Tags */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.technologies?.slice(0, 4).map((tech, i) => (
              <span key={i} className="px-2.5 py-1 rounded-md bg-[var(--primary-color)]/5 border border-[var(--primary-color)]/20 text-[var(--primary-color)] text-[10px] font-mono tracking-wide uppercase">
                {tech}
              </span>
            ))}
            {project.technologies?.length > 4 && (
              <span className="px-2 py-1 text-[10px] text-slate-500 font-mono self-center">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;