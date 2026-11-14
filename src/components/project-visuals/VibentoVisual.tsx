"use client";

import React from "react";
import { Radio, Sparkles } from "lucide-react";

interface VisualProps {
  isActive?: boolean;
  reduceMotion?: boolean;
}

export default function VibentoVisual({
  isActive = true,
  reduceMotion = false,
}: VisualProps) {
  return (
    <div className="relative size-full overflow-hidden bg-gradient-to-br from-[#090C12] via-[#0E121B] to-[#06080D] select-none pointer-events-none p-4 sm:p-6 flex flex-col justify-start">
      {/* Hyperlocal Radar Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Concentric Radar Rings */}
        <div className="absolute w-[440px] h-[440px] rounded-full border border-cloud-border/15" />
        <div className="absolute w-[320px] h-[320px] rounded-full border border-cloud-border/20" />
        <div className="absolute w-[200px] h-[200px] rounded-full border border-sunshine/20" />
        <div className="absolute w-[80px] h-[80px] rounded-full border border-sunshine/40" />

        {/* Crosshair Lines */}
        <div className="absolute w-full h-[1px] bg-cloud-border/15" />
        <div className="absolute h-full w-[1px] bg-cloud-border/15" />

        {/* Rotating Radar Sweep Scanner */}
        {isActive && !reduceMotion && (
          <div
            className="absolute w-[360px] h-[360px] rounded-full origin-center animate-[spin_5s_linear_infinite]"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, transparent 280deg, rgba(20, 86, 160, 0.35) 360deg)",
            }}
          />
        )}
      </div>

      {/* Floating HUD Top Banner */}
      <div className="relative z-10 flex items-center justify-between mb-2 px-3 py-1.5 rounded-xl bg-graphite-950/85 border border-cloud-border/40 backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs font-mono text-cloud">
          <Radio className="w-3.5 h-3.5 text-sunshine animate-pulse" />
          <span className="font-semibold text-sunshine">Vibento Radar</span>
          <span className="text-[10px] text-cloud-muted">Radius: 25 km</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>AI Extraction: Active</span>
        </div>
      </div>

      {/* Detected Event Beacon 1: Hackathon (North East) */}
      <div className="absolute left-[68%] top-[28%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
        <div className="relative flex items-center justify-center">
          {isActive && !reduceMotion && (
            <div className="absolute w-8 h-8 rounded-full bg-sunshine/20 animate-ping" />
          )}
          <div className="w-6 h-6 rounded-full bg-graphite-950 border-2 border-sunshine flex items-center justify-center shadow-gold-sm">
            <div className="w-2 h-2 rounded-full bg-sunshine" />
          </div>
        </div>
        <div className="mt-1 px-2.5 py-1 rounded-lg bg-graphite-950/90 border border-sunshine/40 text-[10px] font-mono shadow-xl backdrop-blur-md flex flex-col items-center">
          <span className="font-semibold text-cloud">HackDelhi 2026</span>
          <span className="text-[9px] text-sunshine">In 3 Days • 2.4 km away</span>
        </div>
      </div>

      {/* Detected Event Beacon 2: AI Meetup (South West) */}
      <div className="absolute left-[32%] top-[45%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
        <div className="relative flex items-center justify-center">
          <div className="w-5 h-5 rounded-full bg-graphite-950 border-2 border-cyan-400 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          </div>
        </div>
        <div className="mt-1 px-2.5 py-1 rounded-lg bg-graphite-950/90 border border-cyan-400/40 text-[10px] font-mono shadow-xl backdrop-blur-md flex flex-col items-center">
          <span className="font-semibold text-cloud">AI Builders Meetup</span>
          <span className="text-[9px] text-cyan-300">120 Attending • 5.1 km</span>
        </div>
      </div>

      {/* Live Ingestion Metric Pill (Bottom-Left) */}
      <div className="absolute bottom-20 left-4 sm:left-6 z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-graphite-950/85 border border-cloud-border/40 backdrop-blur-md">
        <Sparkles className="w-3.5 h-3.5 text-sunshine" />
        <span className="text-[10px] font-mono text-cloud-muted">
          Auto-Verified: <span className="text-emerald-400 font-medium">48 Events Ingested Today</span>
        </span>
      </div>
    </div>
  );
}
