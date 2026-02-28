'use client';

import { useState, useEffect } from "react";

interface AnimatedTextProps {
  words: string[];
  className?: string;
  interval?: number;
}

export default function AnimatedText({ words, className = "", interval = 2000 }: AnimatedTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
        setIsAnimating(false);
      }, 200);
    }, interval);

    return () => clearInterval(timer);
  }, [words, interval]);

  return (
    <span 
      className={`inline-block transition-all duration-300 transform ${
        isAnimating ? 'opacity-0 scale-95 -translate-y-2' : 'opacity-100 scale-100 translate-y-0'
      } ${className}`}
      suppressHydrationWarning
    >
      {words[currentIndex]}
    </span>
  );
}