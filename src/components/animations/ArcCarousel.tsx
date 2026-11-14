"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Shield, Calendar, ShoppingBag, Radio, Code2, Compass } from "lucide-react";

interface ArcItem {
  id: string;
  name: string;
  tech: string;
  description: string;
  icon: React.ReactNode;
  category: string;
}

const arcItems: ArcItem[] = [
  {
    id: "threatfusion",
    name: "ThreatFusion AI Engine",
    tech: "FastAPI • Cognee • Supabase",
    description: "Multi-stage threat correlation across APIs, agents & databases with real-time risk scoring.",
    icon: <Shield className="w-7 h-7 text-sunshine" />,
    category: "Cybersecurity & AI",
  },
  {
    id: "campuspulse",
    name: "Campus Pulse Hub",
    tech: "Flutter • Serverpod • WebSockets",
    description: "Unified collegiate community application connecting students via real-time events & study buddy matching.",
    icon: <Radio className="w-7 h-7 text-sunshine" />,
    category: "Full-Stack Campus App",
  },
  {
    id: "vanik",
    name: "VANIK Merchant Platform",
    tech: "Java Spring Boot • Scikit-learn",
    description: "High-throughput POS transaction recording, RFM customer segmentation, and predictive analytics.",
    icon: <ShoppingBag className="w-7 h-7 text-sunshine" />,
    category: "Merchant Intelligence",
  },
  {
    id: "vibento",
    name: "Vibento Event Discovery",
    tech: "Python • Django • PostgreSQL",
    description: "Hyperlocal technical event discovery engine extracting and validating hackathons & workshops.",
    icon: <Calendar className="w-7 h-7 text-sunshine" />,
    category: "Event Discovery Platform",
  },
  {
    id: "collab",
    name: "COLLAB Collaborative IDE",
    tech: "TypeScript • Fastify • MCP",
    description: "Real-time synchronized coding workspace bridging developer context and AI assistants.",
    icon: <Code2 className="w-7 h-7 text-sunshine" />,
    category: "Developer Tools",
  },
  {
    id: "travel",
    name: "AI Travel Companion",
    tech: "Spring Boot • MySQL • LLMs",
    description: "Dynamic itinerary planner synthesizing multi-day plans tailored to weather and traveler budget.",
    icon: <Compass className="w-7 h-7 text-sunshine" />,
    category: "Adaptive Travel AI",
  },
];

export default function ArcCarousel() {
  const [pos, setPos] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const n = arcItems.length;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleNext = () => {
    setPos((prev) => (prev + 1) % n);
  };

  const handlePrev = () => {
    setPos((prev) => (prev - 1 + n) % n);
  };

  const activeIndex = (((Math.round(pos)) % n) + n) % n;
  const activeItem = arcItems[activeIndex];

  return (
    <div className="w-full my-12 bg-graphite-950/70 border border-cloud-border rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden group">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sunshine/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sunshine/10 text-sunshine text-xs font-semibold tracking-wider uppercase border border-sunshine/30 mb-3">
          Interactive Architecture Explorer
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl text-cloud font-normal">
          Explore Systems & <span className="italic font-medium text-sunshine">Architectures</span>
        </h3>
        <p className="text-xs sm:text-sm text-cloud-muted mt-2">
          Click an architecture node or cycle through the parabolic deck to explore system designs.
        </p>
      </div>

      {/* The Parabolic Arc Stage (Derived from Showreel Scene 4) */}
      <div
        ref={containerRef}
        className="relative h-64 sm:h-72 w-full flex items-center justify-center overflow-hidden"
      >
        {arcItems.map((item, i) => {
          let p = (((i - pos) % n) + n) % n;
          if (p > n / 2) p -= n;
          const a = Math.abs(p);

          // Calculate exact parabolic positions matching Scene 4
          const gap = isMobile ? 70 : 130;
          const x = p * gap;
          const y = p * p * (isMobile ? 12 : 18);
          const rotation = p * 11;
          const scale = Math.max(0.7, 1.18 - 0.18 * Math.min(a, 1));
          const opacity = Math.max(0.15, 1 - Math.min(1, Math.max(0, (a - 1.7) / 0.8)));
          const zIndex = 100 - Math.round(a * 10);
          const isActive = i === activeIndex;

          return (
            <div
              key={item.id}
              onClick={() => setPos(i)}
              className={`absolute top-12 cursor-pointer transition-all duration-500 ease-out flex flex-col items-center select-none ${
                isActive ? "z-30" : "z-10"
              }`}
              style={{
                transform: `translateX(${x}px) translateY(${y}px) rotate(${rotation}deg) scale(${scale})`,
                opacity,
                zIndex,
                willChange: "transform, opacity",
              }}
            >
              <div
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-br from-graphite-100 to-graphite-900 border-2 border-sunshine shadow-gold-md scale-105"
                    : "bg-graphite-100 border border-cloud-border hover:border-sunshine/50 hover:bg-graphite-200"
                }`}
              >
                {item.icon}
              </div>
              <span
                className={`text-[11px] font-semibold mt-2 whitespace-nowrap transition-colors ${
                  isActive ? "text-sunshine" : "text-cloud-muted"
                }`}
              >
                {item.name.split(" ")[0]}
              </span>
            </div>
          );
        })}
      </div>

      {/* Active Label & Description (Matching Scene 4's arc-label) */}
      <div className="text-center mt-6 min-h-[90px] flex flex-col items-center justify-center px-4">
        <span className="text-xs uppercase tracking-widest text-sunshine font-mono font-semibold mb-1">
          {activeItem.category}
        </span>
        <h4 className="font-serif text-xl sm:text-2xl text-cloud font-medium">
          {activeItem.name}
        </h4>
        <p className="text-xs sm:text-sm text-cloud-muted max-w-lg mx-auto mt-1 leading-relaxed">
          {activeItem.description}
        </p>
        <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-graphite-100 border border-cloud-border text-[11px] font-mono text-sunshine">
          {activeItem.tech}
        </span>
      </div>

      {/* Carousel Controls (Prev / Next buttons) */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          type="button"
          onClick={handlePrev}
          className="w-10 h-10 rounded-full border border-cloud-border bg-graphite hover:border-sunshine hover:text-sunshine text-cloud flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
          aria-label="Previous architecture"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-1.5">
          {arcItems.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPos(i)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                i === activeIndex ? "w-6 bg-sunshine shadow-gold-sm" : "w-1.5 bg-cloud-border hover:bg-cloud-muted"
              }`}
              aria-label={`Go to item ${i + 1}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={handleNext}
          className="w-10 h-10 rounded-full border border-cloud-border bg-graphite hover:border-sunshine hover:text-sunshine text-cloud flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
          aria-label="Next architecture"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

