"use client";

import React from "react";
import { Terminal, Users, Wifi } from "lucide-react";

interface VisualProps {
  isActive?: boolean;
  reduceMotion?: boolean;
}

export default function CollabVisual({
  isActive = true,
  reduceMotion = false,
}: VisualProps) {
  return (
    <div className="relative size-full overflow-hidden bg-gradient-to-br from-[#0B0D13] via-[#10131B] to-[#08090D] select-none pointer-events-none p-3 sm:p-5 flex flex-col justify-start">
      {/* Background Circuit Grid */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#03393F_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Code Editor Window Frame */}
      <div className="relative w-full h-[85%] rounded-xl bg-graphite-950/90 border border-cloud-border/60 shadow-2xl overflow-hidden flex flex-col backdrop-blur-md">
        {/* Editor Title Bar */}
        <div className="flex items-center justify-between px-3.5 py-2 bg-graphite-900/90 border-b border-cloud-border/40 shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <div className="ml-2 flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-graphite-950 border border-cloud-border/30 text-[11px] font-mono text-cloud">
              <Terminal className="w-3 h-3 text-sunshine" />
              <span>collab_sync.ts</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono text-cloud-subtle">
            <span className="hidden sm:inline-flex items-center gap-1 text-emerald-400">
              <Wifi className="w-3 h-3" />
              <span>18ms WS</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-sunshine/10 border border-sunshine/30 text-sunshine">
              MCP Sync: Active
            </span>
          </div>
        </div>

        {/* Editor Code Canvas */}
        <div className="relative flex-1 p-3 sm:p-4 font-mono text-[11px] sm:text-[12px] leading-relaxed overflow-hidden">
          {/* Line Numbers */}
          <div className="absolute left-3 top-3 sm:left-4 sm:top-4 text-cloud-subtle/50 select-none flex flex-col space-y-1">
            <span>01</span>
            <span>02</span>
            <span>03</span>
            <span>04</span>
            <span>05</span>
            <span>06</span>
          </div>

          {/* Syntax Highlighted Code Lines */}
          <div className="ml-8 sm:ml-9 space-y-1">
            <div className="flex items-center gap-1">
              <span className="text-purple-400">import</span>
              <span className="text-cloud">{"{ createASTSession }"}</span>
              <span className="text-purple-400">from</span>
              <span className="text-emerald-300">&quot;@collab/mcp&quot;</span>
              <span className="text-cloud">;</span>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-blue-400">const</span>
              <span className="text-sunshine">session</span>
              <span className="text-cloud">=</span>
              <span className="text-yellow-200">createASTSession</span>
              <span className="text-cloud">(&quot;room-peer&quot;);</span>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-cloud-muted/70 italic">{"// Real-time operational conflict resolver"}</span>
            </div>

            <div className="flex items-center gap-1 relative">
              <span className="text-sunshine">session</span>
              <span className="text-cloud">.</span>
              <span className="text-yellow-200">syncCursors</span>
              <span className="text-cloud">({"{ user: &quot;Maheen&quot;, live: true }"});</span>
            </div>

            <div className="flex items-center gap-1 relative">
              <span className="text-purple-400">await</span>
              <span className="text-sunshine">session</span>
              <span className="text-cloud">.</span>
              <span className="text-cyan-300">broadcastASTState</span>
              <span className="text-cloud">();</span>
            </div>
          </div>

          {/* Animated Cursor 1: Maheen (Golden Yellow) */}
          <div
            className={`absolute z-30 transition-all duration-700 ${
              isActive && !reduceMotion
                ? "animate-[pulseGlow_3s_ease-in-out_infinite]"
                : ""
            }`}
            style={{
              left: "48%",
              top: "36%",
            }}
          >
            <div className="relative">
              {/* Caret line */}
              <div className="w-[2px] h-4 bg-sunshine shadow-[0_0_8px_#03393F]" />
              {/* Name Tag Pill */}
              <div className="absolute left-1 -top-4 px-1.5 py-0.2 rounded bg-sunshine text-graphite text-[9px] font-bold font-mono tracking-tight shadow-md flex items-center gap-0.5">
                <span>Maheen</span>
              </div>
            </div>
          </div>

          {/* Animated Cursor 2: Peer Dev (Cyan) */}
          <div
            className={`absolute z-30 transition-all duration-1000 ${
              isActive && !reduceMotion
                ? "animate-[pulseGlow_4s_ease-in-out_infinite_reverse]"
                : ""
            }`}
            style={{
              left: "64%",
              top: "62%",
            }}
          >
            <div className="relative">
              {/* Caret line */}
              <div className="w-[2px] h-4 bg-cyan-400 shadow-[0_0_8px_#38BDF8]" />
              {/* Name Tag Pill */}
              <div className="absolute left-1 -top-4 px-1.5 py-0.2 rounded bg-cyan-400 text-graphite text-[9px] font-bold font-mono tracking-tight shadow-md flex items-center gap-0.5">
                <span>Peer_Dev</span>
              </div>
            </div>
          </div>

          {/* Connecting Collaboration Trace Line between Cursors */}
          <svg className="absolute inset-0 size-full pointer-events-none opacity-30">
            <line
              x1="48%"
              y1="36%"
              x2="64%"
              y2="62%"
              stroke="#03393F"
              strokeWidth="1.2"
              strokeDasharray="3 3"
            />
          </svg>
        </div>

        {/* Live Bottom Bar HUD */}
        <div className="px-3.5 py-1.5 bg-graphite-900/90 border-t border-cloud-border/30 flex items-center justify-between text-[10px] font-mono text-cloud-subtle shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-cloud">AST State: 100% In Sync</span>
            <span className="text-cloud-muted/60">• 0 Conflicts</span>
          </div>

          <div className="flex items-center gap-1.5 text-sunshine">
            <Users className="w-3 h-3" />
            <span>2 Active Peers</span>
          </div>
        </div>
      </div>
    </div>
  );
}
