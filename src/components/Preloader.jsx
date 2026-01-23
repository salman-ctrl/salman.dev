import React, { useState, useEffect } from 'react';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 15;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setOpacity(0);
            setTimeout(onComplete, 500);
          }, 500);
          return 100;
        }
        return next;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [onComplete]);

  if (opacity === 0) return null;

  return (
    <div className="fixed inset-0 bg-[#020617] z-[99999] flex flex-col justify-center items-center font-mono transition-opacity duration-500" style={{ opacity }}>
      <div className="text-4xl font-bold text-white mb-2 tracking-tighter">
        SR<span className="text-cyan-400">.</span>SYSTEM
      </div>
      <div className="text-slate-500 text-sm mb-4">
        {progress === 100 ? <span className="text-cyan-400">ACCESS GRANTED</span> : "INITIALIZING..."}
      </div>
      <div className="w-[200px] h-[2px] bg-slate-800 relative overflow-hidden">
        <div className="absolute top-0 left-0 h-full bg-cyan-400 transition-all duration-200" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default Preloader;