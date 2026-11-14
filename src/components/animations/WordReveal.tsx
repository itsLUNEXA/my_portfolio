"use client";

import React, { useEffect, useRef, useState } from "react";

interface WordRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  highlightWords?: string[];
  highlightClassName?: string;
  delay?: number; // seconds
  stagger?: number; // seconds per word (default 0.07)
  blurAmount?: number; // px (default 14)
  yOffset?: number; // px (default 30)
  duration?: number; // seconds (default 0.85)
  triggerOnce?: boolean;
}

export default function WordReveal({
  text,
  as: Tag = "h2",
  className = "",
  highlightWords = [],
  highlightClassName = "text-sunshine italic font-medium",
  delay = 0,
  stagger = 0.07,
  blurAmount = 14,
  yOffset = 30,
  duration = 0.85,
  triggerOnce = true,
}: WordRevealProps) {
  const containerRef = useRef<HTMLHeadingElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [triggerOnce]);

  const words = text.split(/\s+/);

  const isHighlighted = (word: string) => {
    const cleanWord = word.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").toLowerCase();
    return highlightWords.some(
      (hw) => hw.toLowerCase() === cleanWord || hw.toLowerCase() === word.toLowerCase()
    );
  };

  return (
    <Tag ref={containerRef as React.Ref<HTMLHeadingElement>} className={`${className} text-balance`}>
      {words.map((word, i) => {
        const highlighted = isHighlighted(word);
        const wordDelay = delay + i * stagger;

        return (
          <React.Fragment key={`${word}-${i}`}>
            <span
              className={`w inline-block transition-all ${
                highlighted ? highlightClassName : ""
              }`}
              style={{
                opacity: isVisible ? 1 : 0,
                filter: isVisible ? "blur(0px)" : `blur(${blurAmount}px)`,
                transform: isVisible ? "translateY(0)" : `translateY(${yOffset}px)`,
                transitionDuration: `${duration}s`,
                transitionDelay: `${wordDelay}s`,
                transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)", // power3.out
                willChange: "transform, filter, opacity",
              }}
            >
              {word}
            </span>
            {i < words.length - 1 && " "}
          </React.Fragment>
        );
      })}
    </Tag>
  );
}
