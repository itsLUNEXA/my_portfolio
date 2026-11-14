"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // seconds
  yOffset?: number; // px (default 50)
  blurAmount?: number; // px (default 12)
  scale?: number; // initial scale (default 0.97)
  duration?: number; // seconds (default 0.85)
  threshold?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  yOffset = 50,
  blurAmount = 12,
  scale = 0.97,
  duration = 0.85,
  threshold = 0.1,
}: ScrollRevealProps) {
  const domRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = domRef.current;
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
        threshold,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={domRef}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? "blur(0px)" : `blur(${blurAmount}px)`,
        transform: isVisible
          ? "translateY(0) scale(1)"
          : `translateY(${yOffset}px) scale(${scale})`,
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`,
        transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)", // power3.out
        willChange: "transform, filter, opacity",
      }}
    >
      {children}
    </div>
  );
}

