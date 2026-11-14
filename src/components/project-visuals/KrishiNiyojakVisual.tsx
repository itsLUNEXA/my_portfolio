"use client";

import React from "react";
import { Truck, Sun, MapPin, Navigation } from "lucide-react";

interface VisualProps {
  isActive?: boolean;
  reduceMotion?: boolean;
}

export default function KrishiNiyojakVisual({
  isActive = true,
  reduceMotion = false,
}: VisualProps) {
  return (
    <div className="relative size-full overflow-hidden bg-gradient-to-br from-[#070D08] via-[#0C150E] to-[#040805] select-none pointer-events-none p-4 sm:p-6 flex flex-col justify-between">
      {/* Agricultural Field Acreage Grid */}
      <svg className="absolute inset-0 size-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="fieldGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="38" height="38" fill="none" stroke="#03393F" strokeWidth="0.8" strokeOpacity="0.4" />
            <line x1="0" y1="20" x2="40" y2="20" stroke="#10B981" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="2 2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#fieldGrid)" />
      </svg>

      {/* Top Banner: AgriTech Dispatcher */}
      <div className="relative z-10 flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-graphite-950/85 border border-cloud-border/40 backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs font-mono text-cloud">
          <Truck className="w-3.5 h-3.5 text-sunshine" />
          <span className="font-semibold text-sunshine">NITI — KrishiNiyojak</span>
          <span className="text-[10px] text-cloud-muted">Custom Hiring Centre (CHC) Hub</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
          <Sun className="w-3.5 h-3.5 text-amber-300" />
          <span>Optimal Harvest Window</span>
        </div>
      </div>

      {/* Central Agricultural GIS Map with Transit Route */}
      <div className="relative z-10 w-full max-w-lg mx-auto my-auto h-28 flex items-center justify-between px-6">
        {/* Road Transit SVG Path */}
        <svg className="absolute inset-0 size-full pointer-events-none" viewBox="0 0 400 120" preserveAspectRatio="none">
          <path
            d="M 60 70 C 140 20 220 110 330 50"
            fill="none"
            stroke="#03393F"
            strokeWidth="2.5"
            strokeDasharray="6 6"
            strokeOpacity="0.8"
          />
          {/* Moving Machinery Indicator Dot */}
          {isActive && !reduceMotion && (
            <circle r="4.5" fill="#FFFFFF" stroke="#03393F" strokeWidth="2">
              <animateMotion
                path="M 60 70 C 140 20 220 110 330 50"
                dur="5s"
                repeatCount="indefinite"
              />
            </circle>
          )}
        </svg>

        {/* Node 1: Custom Hiring Centre (CHC Depot) */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-10 h-10 rounded-xl bg-graphite-950 border-2 border-sunshine flex items-center justify-center text-sunshine shadow-gold-sm">
            <Truck className="w-5 h-5 text-sunshine" />
          </div>
          <span className="text-[10px] font-mono font-semibold text-cloud mt-1">CHC Depot #04</span>
          <span className="text-[9px] font-mono text-sunshine">Fleet: 4/5 Active</span>
        </div>

        {/* Center Waypoint: GIS Logistical Routing Badge */}
        <div className="relative z-10 hidden sm:flex flex-col items-center px-2.5 py-1 rounded-lg bg-graphite-950/90 border border-cloud-border/50 text-[9px] font-mono text-cloud-muted backdrop-blur-md">
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <Navigation className="w-3 h-3" />
            OSRM GIS Route
          </span>
          <span>Transit ETA: 14 mins</span>
        </div>

        {/* Node 2: Target Farm Field Plot */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative flex items-center justify-center">
            {isActive && !reduceMotion && (
              <div className="absolute w-12 h-12 rounded-full bg-emerald-400/20 animate-ping" />
            )}
            <div className="w-10 h-10 rounded-xl bg-graphite-950 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-sm z-10">
              <MapPin className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <span className="text-[10px] font-mono font-semibold text-cloud mt-1">Wheat Plot #3</span>
          <span className="text-[9px] font-mono text-emerald-400">Harvest On-Time</span>
        </div>
      </div>

      {/* Floating Bottom Status Bar */}
      <div className="relative z-10 flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-graphite-950/85 border border-cloud-border/40 backdrop-blur-md text-[10px] font-mono text-cloud-subtle mb-10 sm:mb-12">
        <span className="text-cloud">Precipitation: <strong className="text-emerald-400">0mm (Dry Window)</strong></span>
        <span className="text-sunshine">Automated Breakdown Reallocation: Active</span>
      </div>
    </div>
  );
}
