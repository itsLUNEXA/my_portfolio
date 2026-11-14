"use client";

import React, { useEffect, useState } from "react";
import { ShieldCheck, Cloud, Cpu, Sparkles } from "lucide-react";

interface MiniBarChartProps {
  heights?: number[];
  className?: string;
  colors?: string[];
}

export function MiniBarChart({
  heights = [0.45, 0.75, 0.55, 0.9, 0.65, 0.85, 0.5, 0.95, 0.7],
  className = "",
  colors = ["#03393F", "#F2BB8E", "#FDD9A5", "#5D867F"],
}: MiniBarChartProps) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setAnimated(true);
      return;
    }
    const timer = setTimeout(() => setAnimated(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`flex items-end gap-1.5 h-16 sm:h-20 py-2 px-1 ${className}`}>
      {heights.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-sm transition-transform duration-700 select-none"
          style={{
            height: `${Math.round(h * 100)}%`,
            backgroundColor: colors[i % colors.length],
            opacity: 0.85,
            transform: animated ? "scaleY(1)" : "scaleY(0)",
            transformOrigin: "50% 100%",
            transitionDelay: `${i * 0.04}s`,
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)", // back.out(1.4)
          }}
        />
      ))}
    </div>
  );
}

interface OrbitVisualProps {
  centerIcon?: React.ReactNode;
  satelliteIcons?: React.ReactNode[];
  size?: number; // px
}

export function OrbitVisual({
  centerIcon,
  satelliteIcons = [],
  size = 180,
}: OrbitVisualProps) {
  const defaultIcons = [
    <Cloud key="1" className="w-4 h-4 text-sunshine" />,
    <Cpu key="2" className="w-4 h-4 text-amber-300" />,
    <ShieldCheck key="3" className="w-4 h-4 text-emerald-400" />,
    <Sparkles key="4" className="w-4 h-4 text-sunshine" />,
    <Cloud key="5" className="w-4 h-4 text-amber-400" />,
    <Cpu key="6" className="w-4 h-4 text-sunshine" />,
  ];

  const items = satelliteIcons.length > 0 ? satelliteIcons : defaultIcons;
  const count = items.length;

  return (
    <div
      className="relative flex items-center justify-center select-none mx-auto"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {/* Outer circular track border */}
      <div className="absolute inset-2 rounded-full border border-dashed border-cloud-border/60 pointer-events-none" />

      {/* Rotating Ring carrying satellite icons */}
      <div className="absolute inset-0 animate-spin-slow pointer-events-none">
        {items.map((icon, i) => {
          const angle = (i * 360) / count;
          const rad = (angle * Math.PI) / 180;
          const radiusPercent = 42; // percent from center
          const x = 50 + Math.cos(rad) * radiusPercent;
          const y = 50 + Math.sin(rad) * radiusPercent;

          return (
            <div
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-graphite border border-cloud-border flex items-center justify-center shadow-md"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              {icon}
            </div>
          );
        })}
      </div>

      {/* Center Core Badge */}
      <div className="relative z-10 w-12 h-12 rounded-2xl bg-gradient-to-br from-graphite-100 to-graphite-900 border-2 border-sunshine flex items-center justify-center shadow-gold-sm">
        {centerIcon || <ShieldCheck className="w-6 h-6 text-sunshine" />}
      </div>
    </div>
  );
}

interface CyclingTickerProps {
  items?: string[];
  className?: string;
}

export function CyclingTicker({
  items = [
    "Full-Stack Systems & Backend Engineer",
    "Competitive Hackathon Finalist",
    "Open for SDE Roles & Collaborations",
  ],
  className = "",
}: CyclingTickerProps) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % items.length);
        setFade(true);
      }, 250);
    }, 2800);

    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <span
      className={`inline-block transition-all duration-300 font-mono ${className}`}
      style={{
        opacity: fade ? 1 : 0,
        transform: fade ? "translateY(0)" : "translateY(-4px)",
      }}
    >
      {items[index]}
    </span>
  );
}

