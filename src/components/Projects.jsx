import React from 'react';
import ProjectCard from './ProjectCard';

const Projects = ({ projectsData }) => {
  return (
    <section id="projects" className="py-24 px-6 relative" data-color="#f59e0b">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 reveal-up">
          <div>
            <span className="highlight-text font-mono text-sm tracking-wider uppercase">04. Portfolio</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 font-display">Karya Pilihan</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData?.map((proj, i) => (
            <ProjectCard key={i} project={proj} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;