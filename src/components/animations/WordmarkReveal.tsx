"use client";

import React, { useEffect, useRef, useState } from "react";

interface WordmarkRevealProps {
  text?: string;
  className?: string;
}

export default function WordmarkReveal({
  text = "MAHEEN FATIMA",
  className = "",
}: WordmarkRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative w-full overflow-hidden select-none pointer-events-none py-8 text-center ${className}`}
    >
      <span
        className="block font-serif font-bold tracking-tighter uppercase whitespace-nowrap transition-all text-[clamp(2.5rem,13vw,11rem)] leading-none"
        style={{
          background: "linear-gradient(180deg, rgba(3, 57, 63, 0.35) 0%, rgba(242, 187, 142, 0.12) 75%, transparent 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          opacity: isVisible ? 1 : 0,
          filter: isVisible ? "blur(0px)" : "blur(34px)",
          transform: isVisible ? "translateY(0)" : "translateY(100px)",
          transitionDuration: "1.3s",
          transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)", // power3.out
          willChange: "transform, filter, opacity",
        }}
      >
        {text}
      </span>
    </div>
  );
}

