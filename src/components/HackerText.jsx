import React, { useState, useRef } from 'react';

const HackerText = ({ text, className }) => {
  const [displayText, setDisplayText] = useState(text || "");
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  const intervalRef = useRef(null);

  const handleMouseOver = () => {
    let iteration = 0;
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(prev => 
        (text || "").split("").map((letter, index) => {
          if (index < iteration) return text[index];
          return letters[Math.floor(Math.random() * 26)];
        }).join("")
      );

      if (iteration >= (text?.length || 0)) clearInterval(intervalRef.current);
      iteration += 1 / 3;
    }, 30);
  };

  return (
    <span className={className} onMouseOver={handleMouseOver}>
      {displayText}
    </span>
  );
};

export default HackerText;