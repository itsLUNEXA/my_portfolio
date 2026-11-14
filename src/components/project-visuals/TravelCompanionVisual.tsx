"use client";

import React from "react";
import { MapPin, Sun, Compass, Sparkles } from "lucide-react";

interface VisualProps {
  isActive?: boolean;
  reduceMotion?: boolean;
}

export default function TravelCompanionVisual({
  isActive = true,
  reduceMotion = false,
}: VisualProps) {
  return (
    <div className="relative size-full overflow-hidden bg-gradient-to-br from-[#0B0E14] via-[#10141D] to-[#07090D] select-none pointer-events-none">
      {/* Topographic Map Grid Lines */}
      <svg
        className="absolute inset-0 size-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="travelGrid" width="36" height="36" patternUnits="userSpaceOnUse">
            <path
              d="M 36 0 L 0 0 0 36"
              fill="none"
              stroke="#F2F4F1"
              strokeWidth="0.6"
              strokeOpacity="0.4"
            />
            <circle cx="18" cy="18" r="0.8" fill="#03393F" opacity="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#travelGrid)" />
      </svg>

      {/* Topographic Contour Curves */}
      <svg
        className="absolute inset-0 size-full opacity-25"
        viewBox="0 0 800 500"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M -50 180 C 120 120 280 240 450 160 C 620 80 720 220 850 180"
          stroke="#03393F"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
        <path
          d="M -50 260 C 150 200 300 320 500 240 C 700 160 750 300 850 260"
          stroke="#F2F4F1"
          strokeWidth="0.8"
          strokeOpacity="0.3"
        />
        <path
          d="M -50 340 C 180 280 350 380 550 310 C 750 240 800 360 850 330"
          stroke="#03393F"
          strokeWidth="0.8"
          strokeOpacity="0.2"
        />
      </svg>

      {/* Primary Animated Itinerary Route Curve */}
      <svg
        className="absolute inset-0 size-full"
        viewBox="0 0 800 500"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        {/* Glow Filter */}
        <defs>
          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#03393F" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* Route Path Shadow */}
        <path
          d="M 160 300 C 260 170 380 340 500 200 C 580 110 640 180 680 150"
          stroke="#03393F"
          strokeWidth="3"
          strokeOpacity="0.25"
          strokeLinecap="round"
        />

        {/* Animated Dashed Route Line */}
        <path
          d="M 160 300 C 260 170 380 340 500 200 C 580 110 640 180 680 150"
          stroke="#03393F"
          strokeWidth="2.5"
          strokeDasharray="8 8"
          filter="url(#goldGlow)"
          strokeLinecap="round"
          className={isActive && !reduceMotion ? "animate-[flowLine_12s_linear_infinite]" : ""}
          style={{
            strokeDashoffset: 0,
            animationDuration: "8s",
          }}
        />

        {/* Moving Traveler Indicator Dot along Route */}
        {isActive && !reduceMotion && (
          <circle r="5" fill="#FFFFFF" filter="url(#goldGlow)">
            <animateMotion
              path="M 160 300 C 260 170 380 340 500 200 C 580 110 640 180 680 150"
              dur="6s"
              repeatCount="indefinite"
            />
          </circle>
        )}
      </svg>

      {/* Location Pin 1: Origin (Tokyo) */}
      <div className="absolute left-[18%] top-[56%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <div className="relative flex items-center justify-center">
          {isActive && !reduceMotion && (
            <div className="absolute w-8 h-8 rounded-full bg-sunshine/20 animate-ping" />
          )}
          <div className="w-6 h-6 rounded-full bg-graphite-950 border-2 border-sunshine flex items-center justify-center shadow-gold-sm z-10">
            <div className="w-2 h-2 rounded-full bg-sunshine" />
          </div>
        </div>
        <div className="mt-1.5 px-2 py-0.5 rounded bg-black/80 border border-cloud-border/50 text-[10px] font-mono text-cloud whitespace-nowrap shadow-md">
          Day 1 • Origin Hub
        </div>
      </div>

      {/* Location Pin 2: Waypoint (Kyoto Scenic) */}
      <div className="absolute left-[54%] top-[37%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <div className="relative flex items-center justify-center">
          <div className="w-5 h-5 rounded-full bg-graphite-950 border-2 border-amber-400 flex items-center justify-center z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          </div>
        </div>
        <div className="mt-1 px-2 py-0.5 rounded bg-black/80 border border-sunshine/30 text-[10px] font-mono text-sunshine whitespace-nowrap shadow-md">
          Day 2 • Scenic Pass
        </div>
      </div>

      {/* Location Pin 3: Destination (Osaka Coast) */}
      <div className="absolute left-[78%] top-[27%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <div className="relative flex items-center justify-center">
          {isActive && !reduceMotion && (
            <div className="absolute w-7 h-7 rounded-full bg-emerald-400/20 animate-pulse" />
          )}
          <div className="w-6 h-6 rounded-full bg-graphite-950 border-2 border-emerald-400 flex items-center justify-center z-10 shadow-sm">
            <MapPin className="w-3 h-3 text-emerald-400" />
          </div>
        </div>
        <div className="mt-1.5 px-2 py-0.5 rounded bg-black/80 border border-emerald-400/40 text-[10px] font-mono text-emerald-400 whitespace-nowrap shadow-md">
          Day 3 • Destination
        </div>
      </div>

      {/* Floating HUD Widget Top-Left: Route Synthesizer */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-graphite-950/85 border border-cloud-border/50 backdrop-blur-md shadow-lg">
        <Compass className="w-3.5 h-3.5 text-sunshine animate-spin-slow" />
        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-cloud font-medium tracking-wide">
            AI Itinerary Synthesis
          </span>
          <span className="text-[9px] font-mono text-sunshine">
            Adaptive Multi-Day • 3 Waypoints
          </span>
        </div>
      </div>

      {/* Floating HUD Widget Top-Right: Weather & Crowd */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-graphite-950/85 border border-cloud-border/50 backdrop-blur-md shadow-lg">
        <Sun className="w-3.5 h-3.5 text-amber-300" />
        <div className="flex flex-col text-right">
          <span className="text-[10px] font-mono text-cloud">
            21°C • Clear Weather
          </span>
          <span className="text-[9px] font-mono text-emerald-400">
            Crowd Density: Low (24%)
          </span>
        </div>
      </div>

      {/* Floating HUD Widget Bottom-Right: Budget Telemetry */}
      <div className="absolute bottom-24 right-4 sm:right-6 z-10 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-graphite-950/85 border border-sunshine/30 backdrop-blur-md">
        <Sparkles className="w-3.5 h-3.5 text-sunshine" />
        <span className="text-[10px] font-mono text-cloud-muted">
          Budget Allocation: <span className="text-sunshine font-semibold">$340 / $500 optimal</span>
        </span>
      </div>
    </div>
  );
}
