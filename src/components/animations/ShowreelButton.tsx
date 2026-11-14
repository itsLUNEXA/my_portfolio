"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Square } from "lucide-react";

export default function ShowreelButton() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const animFrameRef = useRef<number | null>(null);

  const stopTour = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    setIsPlaying(false);
  };

  const startTour = () => {
    stopTour();
    setIsPlaying(true);
    window.scrollTo({ top: 0, behavior: "smooth" });

    setTimeout(() => {
      const startTime = performance.now();
      const duration = 24000; // 24 seconds cinematic tour
      const startY = window.scrollY;

      const step = (now: number) => {
        const elapsed = now - startTime;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min(elapsed / duration, 1);

        // Linear scroll progress
        window.scrollTo(0, startY + progress * (maxScroll - startY));

        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(step);
        } else {
          stopTour();
        }
      };

      animFrameRef.current = requestAnimationFrame(step);
    }, 600);
  };

  // Stop tour if user interacts manually
  useEffect(() => {
    const handleUserInteraction = () => {
      if (isPlaying) {
        stopTour();
      }
    };

    window.addEventListener("wheel", handleUserInteraction, { passive: true });
    window.addEventListener("touchstart", handleUserInteraction, { passive: true });
    window.addEventListener("keydown", handleUserInteraction);

    return () => {
      window.removeEventListener("wheel", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <div className="fixed z-40 left-6 bottom-6 sm:left-8 sm:bottom-8">
      <button
        type="button"
        onClick={isPlaying ? stopTour : startTour}
        className="inline-flex items-center gap-2 px-4 py-2 sm:px-4.5 sm:py-2 rounded-full bg-[#FAE6D9] border border-[#5D867F]/30 hover:border-[#03393F] text-xs font-medium text-[#03393F] shadow-sm backdrop-blur-md transition-all active:scale-95 cursor-pointer group"
        title={isPlaying ? "Stop portfolio tour" : "Play cinematic portfolio tour"}
      >
        {isPlaying ? (
          <>
            <Square className="w-3.5 h-3.5 text-[#03393F] fill-[#03393F]" />
            <span className="font-mono text-[11px] text-[#03393F]">Stop Tour</span>
          </>
        ) : (
          <>
            <Play className="w-3 h-3 text-[#03393F] fill-[#03393F] group-hover:scale-110 transition-transform" />
            <span className="font-sans text-xs font-medium text-[#03393F]">
              Play Showreel
            </span>
          </>
        )}
      </button>
    </div>
  );
}

