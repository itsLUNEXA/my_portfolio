"use client";

import React from "react";
import { Users, Calendar, Trophy, Sparkles, CheckCircle } from "lucide-react";

interface VisualProps {
  isActive?: boolean;
  reduceMotion?: boolean;
}

export default function CampusPulseVisual({
  isActive = true,
  reduceMotion = false,
}: VisualProps) {
  return (
    <div className="relative size-full overflow-hidden bg-gradient-to-br from-[#0B0D14] via-[#101420] to-[#08090E] select-none pointer-events-none p-4 sm:p-6 flex flex-col justify-start">
      {/* Background Social Circuit Pattern */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#03393F_1px,transparent_1px)] [background-size:28px_28px]" />

      {/* Header Banner: Campus Community Hub */}
      <div className="relative z-10 flex items-center justify-between mb-3 px-3 py-1.5 rounded-xl bg-graphite-950/80 border border-cloud-border/40 backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs font-mono text-cloud">
          <span className={`w-2 h-2 rounded-full bg-emerald-400 ${isActive && !reduceMotion ? "animate-pulse" : ""}`} />
          <span className="font-semibold text-sunshine">Campus Pulse</span>
          <span className="text-cloud-muted/70 text-[10px]">Collegiate Hub</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-cloud-subtle">
          <Users className="w-3 h-3 text-sunshine" />
          <span>142 Active Peers</span>
        </div>
      </div>

      {/* Main Grid: Campus Event Card + Study Buddy Matching */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
        {/* Card 1: Event Discovery & RSVP */}
        <div className="p-3.5 rounded-xl bg-graphite-950/90 border border-cloud-border/50 backdrop-blur-md flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="px-2 py-0.5 rounded-full bg-sunshine/15 border border-sunshine/30 text-[10px] font-mono font-semibold text-sunshine">
              Collegiate Event
            </span>
            <span className="text-[10px] font-mono text-cloud-subtle flex items-center gap-1">
              <Calendar className="w-3 h-3 text-amber-300" />
              <span>Tomorrow 4PM</span>
            </span>
          </div>

          <h5 className="font-serif text-xs sm:text-sm text-cloud font-medium mb-1">
            BuildSprint & Hackathon Prep
          </h5>
          <p className="text-[10px] font-mono text-cloud-muted mb-2.5">
            Hall 4 • CS Department
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-cloud-border/30">
            <div className="flex -space-x-1.5 overflow-hidden">
              <div className="inline-block h-5 w-5 rounded-full ring-2 ring-graphite-950 bg-gradient-to-tr from-amber-400 to-yellow-200 text-[8px] font-bold text-graphite flex items-center justify-center">
                M
              </div>
              <div className="inline-block h-5 w-5 rounded-full ring-2 ring-graphite-950 bg-gradient-to-tr from-emerald-400 to-teal-300 text-[8px] font-bold text-graphite flex items-center justify-center">
                A
              </div>
              <div className="inline-block h-5 w-5 rounded-full ring-2 ring-graphite-950 bg-gradient-to-tr from-cyan-400 to-blue-300 text-[8px] font-bold text-graphite flex items-center justify-center">
                R
              </div>
            </div>

            <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 font-medium">
              <CheckCircle className="w-3 h-3" />
              <span>48 RSVPs Confirmed</span>
            </div>
          </div>
        </div>

        {/* Card 2: Smart Study Buddy Match & Live Quiz */}
        <div className="space-y-2.5">
          {/* Study Buddy Match Pill */}
          <div className="p-3 rounded-xl bg-graphite-950/90 border border-sunshine/30 backdrop-blur-md shadow-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-sunshine/10 text-sunshine">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-cloud font-semibold">
                  Study Buddy Match Found!
                </span>
                <span className="text-[9px] font-mono text-sunshine">
                  Algorithms & DSA • 98% Compatibility
                </span>
              </div>
            </div>
          </div>

          {/* Live Quiz Widget */}
          <div className="p-3 rounded-xl bg-graphite-950/90 border border-cloud-border/50 backdrop-blur-md shadow-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-400/10 text-amber-300">
                <Trophy className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-cloud">
                  Live Socket Quiz • DBMS
                </span>
                <span className="text-[9px] font-mono text-emerald-400">
                  Rank #1 • 940 Pts (Top 2%)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
