"use client";

import React from "react";
import { ShieldCheck, AlertTriangle, Eye, Activity } from "lucide-react";

interface VisualProps {
  isActive?: boolean;
  reduceMotion?: boolean;
}

export default function ThreatFusionVisual({
  isActive = true,
  reduceMotion = false,
}: VisualProps) {
  return (
    <div className="relative size-full overflow-hidden bg-gradient-to-br from-[#080B10] via-[#0E121A] to-[#05070B] select-none pointer-events-none p-4 sm:p-6 flex flex-col justify-between">
      {/* Cybersecurity Hex / Radar Background */}
      <svg className="absolute inset-0 size-full opacity-15" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="threatHex" width="32" height="32" patternUnits="userSpaceOnUse">
            <polygon
              points="16,0 32,9 32,27 16,36 0,27 0,9"
              fill="none"
              stroke="#03393F"
              strokeWidth="0.8"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#threatHex)" />
      </svg>

      {/* Laser Scanning Sweep Line */}
      {isActive && !reduceMotion && (
        <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-sunshine to-transparent opacity-40 shadow-[0_0_12px_#03393F] animate-[scanline_3.5s_ease-in-out_infinite]" />
      )}

      {/* Top SOC Threat Bar */}
      <div className="relative z-10 flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-graphite-950/85 border border-cloud-border/40 backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs font-mono text-cloud">
          <Eye className="w-3.5 h-3.5 text-sunshine animate-pulse" />
          <span className="font-semibold text-sunshine">ThreatFusion Engine</span>
          <span className="text-[10px] text-cloud-muted">Multi-Stage Telemetry Correlation</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Active Defenses: 100%</span>
        </div>
      </div>

      {/* Central Correlation Graph Canvas */}
      <div className="relative z-10 w-full max-w-md mx-auto my-auto h-32 flex items-center justify-between">
        {/* Connection Trace SVG Lines */}
        <svg className="absolute inset-0 size-full pointer-events-none">
          <line x1="16%" y1="50%" x2="40%" y2="25%" stroke="#03393F" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
          <line x1="16%" y1="50%" x2="40%" y2="75%" stroke="#03393F" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
          <line x1="40%" y1="25%" x2="68%" y2="50%" stroke="#03393F" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
          <line x1="40%" y1="75%" x2="68%" y2="50%" stroke="#03393F" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
          <line x1="68%" y1="50%" x2="90%" y2="50%" stroke="#10B981" strokeWidth="2" opacity="0.9" />
        </svg>

        {/* Node 1: User / Endpoint Telemetry */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-9 h-9 rounded-xl bg-graphite-900 border border-cloud-border/60 flex items-center justify-center text-[10px] font-mono text-cloud shadow-md">
            API
          </div>
          <span className="text-[9px] font-mono text-cloud-muted mt-1">Ingress</span>
        </div>

        {/* Node 2: Anomalous Signal Vector (Upper) */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <span className="text-[8px] font-mono text-amber-300 mt-1">Anomaly</span>
        </div>

        {/* Central Correlation Engine Node */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative flex items-center justify-center">
            {isActive && !reduceMotion && (
              <div className="absolute w-14 h-14 rounded-full bg-sunshine/20 animate-ping" />
            )}
            <div className="w-12 h-12 rounded-2xl bg-graphite-950 border-2 border-sunshine flex items-center justify-center text-sunshine shadow-gold-sm z-10">
              <Activity className="w-5 h-5 text-sunshine" />
            </div>
          </div>
          <span className="text-[9px] font-mono text-sunshine font-semibold mt-1">
            Cognee Graph
          </span>
        </div>

        {/* Node 4: Mitigated State */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 shadow-md">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <span className="text-[9px] font-mono text-emerald-400 mt-1">Secured</span>
        </div>
      </div>

      {/* Floating Alert Ticker (Bottom-Left) */}
      <div className="relative z-10 flex items-center justify-between px-3 py-1.5 rounded-xl bg-graphite-950/85 border border-sunshine/30 backdrop-blur-md text-[10px] font-mono mb-10 sm:mb-12">
        <span className="text-cloud">
          Risk Score: <strong className="text-amber-400">92</strong> → <strong className="text-emerald-400">0 (Neutralized)</strong>
        </span>
        <span className="text-sunshine font-medium">
          Zero Lateral Movement
        </span>
      </div>
    </div>
  );
}
