"use client";

import React from "react";
import { TrendingUp, Store } from "lucide-react";

interface VisualProps {
  isActive?: boolean;
  reduceMotion?: boolean;
}

export default function VanikVisual({
  isActive = true,
  reduceMotion = false,
}: VisualProps) {
  return (
    <div className="relative size-full overflow-hidden bg-gradient-to-br from-[#0B0E14] via-[#101520] to-[#080A0F] select-none pointer-events-none p-4 sm:p-6 flex flex-col justify-between">
      {/* Background Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#03393F_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Top Banner: Merchant Growth Terminal */}
      <div className="relative z-10 flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-graphite-950/85 border border-cloud-border/40 backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs font-mono text-cloud">
          <Store className="w-3.5 h-3.5 text-sunshine" />
          <span className="font-semibold text-sunshine">VANIK Intelligence</span>
          <span className="text-[10px] text-cloud-muted">POS & Merchant Analytics</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>+24.8% MoM Growth</span>
        </div>
      </div>

      {/* Main Analytics Canvas: Revenue Trendline + RFM Metrics */}
      <div className="relative z-10 w-full max-w-lg mx-auto my-auto grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        {/* Left Column: Dynamic Revenue Growth Chart (7 cols) */}
        <div className="sm:col-span-7 p-3 rounded-xl bg-graphite-950/90 border border-cloud-border/50 backdrop-blur-md shadow-lg flex flex-col justify-between h-28">
          <div className="flex items-center justify-between text-[10px] font-mono text-cloud-subtle mb-1">
            <span>Revenue Trajectory</span>
            <span className="text-emerald-400 font-bold">$48,250.00</span>
          </div>

          {/* SVG Trendline with Gradient Fill */}
          <div className="relative flex-1 w-full overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 200 60" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#03393F" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#03393F" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <polygon
                points="0,55 25,48 55,42 85,46 115,30 145,24 175,12 200,8 200,60 0,60"
                fill="url(#chartGrad)"
              />
              <polyline
                fill="none"
                stroke="#03393F"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="0,55 25,48 55,42 85,46 115,30 145,24 175,12 200,8"
              />
              {/* Peak data dot */}
              <circle cx="200" cy="8" r="4" fill="#FFFFFF" stroke="#03393F" strokeWidth="2" />
              {isActive && !reduceMotion && (
                <circle cx="200" cy="8" r="7" fill="none" stroke="#03393F" strokeWidth="1" opacity="0.6">
                  <animate attributeName="r" values="4;10;4" dur="2.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0.1;0.8" dur="2.5s" repeatCount="indefinite" />
                </circle>
              )}
            </svg>
          </div>
        </div>

        {/* Right Column: RFM Customer Segmentation & POS Live Stream (5 cols) */}
        <div className="sm:col-span-5 space-y-2">
          {/* POS Live Transaction Feed */}
          <div className="p-2.5 rounded-xl bg-graphite-950/90 border border-sunshine/30 backdrop-blur-md shadow-lg flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-cloud-subtle">Live POS Transaction</span>
              <span className="text-[11px] font-mono font-bold text-cloud">TXN #8492 • $142.50</span>
              <span className="text-[8px] font-mono text-sunshine">RFM: Champion Tier</span>
            </div>
          </div>

          {/* Customer Retention Metric */}
          <div className="p-2.5 rounded-xl bg-graphite-950/90 border border-cloud-border/50 backdrop-blur-md shadow-lg flex items-center justify-between text-[10px] font-mono">
            <span className="text-cloud-muted">Repeat Purchase:</span>
            <span className="text-emerald-400 font-bold">78.4%</span>
          </div>
        </div>
      </div>

      {/* Floating Bottom Metric Bar */}
      <div className="relative z-10 flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-graphite-950/85 border border-cloud-border/40 backdrop-blur-md text-[10px] font-mono text-cloud-subtle mb-10 sm:mb-12">
        <span className="text-cloud">Automated RFM Clustering: <strong className="text-sunshine">Active</strong></span>
        <span className="text-emerald-400">Inventory Velocity: Optimal</span>
      </div>
    </div>
  );
}
