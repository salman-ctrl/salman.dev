import React from 'react';

const Navbar = ({ toggleMenu, isMenuOpen }) => {
  // Mapping: Nama di layar (Inggris) -> Link ID (Indonesia)
  const navLinks = [
    { label: "About", id: "#tentang" },
    { label: "Experience", id: "#pengalaman" },
    { label: "Skills", id: "#keahlian" },
    { label: "Work", id: "#karya" },
    { label: "Certificates", id: "#sertifikat" }
  ];

  return (
    <nav className="fixed w-full z-50 glass-nav h-20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <a href="#" className="text-2xl font-bold font-display tracking-tighter text-white group magnetic-btn">
          SR<span className="highlight-text">.</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide font-mono">
          {navLinks.map((item, i) => (
            <a key={item.label} href={item.id} className="hover:text-white transition-colors relative group">
              <span className="highlight-text mr-1">0{i + 1}.</span>{item.label}
            </a>
          ))}

          <a
            href="https://wa.me/6285267653061"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-lg border border-current text-[var(--primary-color)] hover:bg-white/5 transition-all duration-300 font-bold"
          >
            Contact Me
          </a>
        </div>

        {/* Mobile Toggle */}
        <button onClick={toggleMenu} className="md:hidden text-white p-2">
          <i className="fas fa-bars text-xl"></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#0a0f1c] border-b border-white/10 absolute w-full left-0 top-20 shadow-2xl">
          <div className="flex flex-col p-6 space-y-4 font-mono text-lg text-slate-300">
            {navLinks.map(item => (
              <a key={item.label} href={item.id} onClick={toggleMenu}>// {item.label}</a>
            ))}
            <a href="https://wa.me/6285267653061" target="_blank" rel="noopener noreferrer" onClick={toggleMenu}>// Contact Me</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;