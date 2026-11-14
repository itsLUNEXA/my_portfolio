"use client";

import React, { useEffect, useRef, useState } from "react";
import { Terminal, Database, Shield, Cpu, Code2, Check, Sparkles } from "lucide-react";

export default function NetworkCluster() {
  const clusterRef = useRef<HTMLDivElement | null>(null);
  const [stage, setStage] = useState<"initial" | "core-in" | "wires-in" | "sats-in" | "complete">("initial");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setStage("complete");
      return;
    }

    // Choreographed intro timeline matching Scene 1 timing
    const t1 = setTimeout(() => setStage("core-in"), 100);
    const t2 = setTimeout(() => setStage("wires-in"), 550);
    const t3 = setTimeout(() => setStage("sats-in"), 850);
    const t4 = setTimeout(() => setStage("complete"), 1400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const isAnimated = stage === "complete";
  const wiresActive = stage === "wires-in" || stage === "sats-in" || stage === "complete";
  const satsActive = stage === "sats-in" || stage === "complete";
  const coreActive = stage !== "initial";

  return (
    <div className="w-full max-w-4xl mx-auto my-6 px-4">
      <div
        ref={clusterRef}
        className="relative w-full aspect-[2.6/1] sm:aspect-[3/1] min-h-[160px] sm:min-h-[200px]"
      >
        {/* SVG Circuit Wires */}
        <svg
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
          viewBox="0 0 900 300"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Wire Path 1: Center to Left High */}
          <path
            className="ln"
            pathLength="1"
            d="M420 150H335L262 72H178"
            style={{
              strokeDasharray: 1,
              strokeDashoffset: wiresActive ? 0 : 1,
              transitionDelay: "0.1s",
            }}
          />
          {/* Wire Path 2: Center to Left Low */}
          <path
            className="ln"
            pathLength="1"
            d="M420 150H335L278 214H214"
            style={{
              strokeDasharray: 1,
              strokeDashoffset: wiresActive ? 0 : 1,
              transitionDelay: "0.2s",
            }}
          />
          {/* Wire Path 3: Center to Far Left */}
          <path
            className="ln"
            pathLength="1"
            d="M395 150H78"
            style={{
              strokeDasharray: 1,
              strokeDashoffset: wiresActive ? 0 : 1,
              transitionDelay: "0.25s",
            }}
          />
          {/* Wire Path 4: Center to Right High */}
          <path
            className="ln"
            pathLength="1"
            d="M480 150H565L638 86H690"
            style={{
              strokeDasharray: 1,
              strokeDashoffset: wiresActive ? 0 : 1,
              transitionDelay: "0.15s",
            }}
          />
          {/* Wire Path 5: Center to Right Low */}
          <path
            className="ln"
            pathLength="1"
            d="M565 150L640 232H708"
            style={{
              strokeDasharray: 1,
              strokeDashoffset: wiresActive ? 0 : 1,
              transitionDelay: "0.3s",
            }}
          />
          {/* Wire Path 6: Center to Far Right */}
          <path
            className="ln"
            pathLength="1"
            d="M480 150H812"
            style={{
              strokeDasharray: 1,
              strokeDashoffset: wiresActive ? 0 : 1,
              transitionDelay: "0.22s",
            }}
          />

          {/* Connection Junction Dots */}
          {[
            { cx: 335, cy: 150 },
            { cx: 262, cy: 72 },
            { cx: 214, cy: 214 },
            { cx: 638, cy: 86 },
            { cx: 640, cy: 232 },
          ].map((dot, idx) => (
            <circle
              key={idx}
              className="dt"
              cx={dot.cx}
              cy={dot.cy}
              r="3.5"
              style={{
                opacity: wiresActive ? 1 : 0,
                transform: wiresActive ? "scale(1)" : "scale(0)",
                transformOrigin: `${dot.cx}px ${dot.cy}px`,
                transitionDelay: `${0.4 + idx * 0.05}s`,
              }}
            />
          ))}
        </svg>

        {/* Central Core Element */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
          style={{
            transform: coreActive ? "translate(-50%, -50%) scale(1)" : "translate(-50%, -50%) scale(0.3)",
            opacity: coreActive ? 1 : 0,
            transition: "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s ease",
          }}
        >
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-sunshine via-amber-400 to-amber-600 p-[2px] shadow-gold-md">
            <div className="w-full h-full bg-graphite-950 rounded-2xl flex items-center justify-center relative overflow-hidden group">
              {/* Golden Ambient Glow inside Core */}
              <div className="absolute inset-0 bg-radial-gradient from-sunshine/20 to-transparent animate-pulse" />

              {/* Rotating swirl glyph that transitions into verified checkmark */}
              <div
                className="absolute transition-all duration-700"
                style={{
                  transform: isAnimated ? "rotate(180deg) scale(0)" : "rotate(0deg) scale(1)",
                  opacity: isAnimated ? 0 : 1,
                }}
              >
                <Sparkles className="w-8 h-8 text-sunshine animate-spin-slow" />
              </div>

              {/* Verified Code / Architecture Glyph */}
              <div
                className="relative z-10 transition-all duration-600"
                style={{
                  transform: isAnimated ? "scale(1) rotate(0deg)" : "scale(0.5) rotate(-30deg)",
                  opacity: isAnimated ? 1 : 0,
                  transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)", // back.out(2)
                }}
              >
                <Code2 className="w-7 h-7 sm:w-8 sm:h-8 text-sunshine" />
              </div>
            </div>
          </div>
        </div>

        {/* SATELLITES (Floating Competency Nodes) */}
        {/* Sat 1: Java / Spring (Top Left) */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-700"
          style={{
            left: "18%",
            top: "24%",
            opacity: satsActive ? 1 : 0,
            transform: satsActive
              ? "translate(-50%, -50%) scale(1)"
              : "translate(150%, 80%) scale(0)",
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            transitionDelay: "0.05s",
          }}
        >
          <span className="float" style={{ "--d": "3.8s", "--dl": "-1s" } as React.CSSProperties}>
            <div className="px-3 py-1.5 rounded-xl bg-graphite-100 border border-sunshine/40 shadow-gold-sm flex items-center gap-1.5 text-xs font-semibold text-sunshine backdrop-blur-md">
              <Terminal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Core Java & Spring</span>
              <span className="sm:hidden">Java</span>
            </div>
          </span>
        </div>

        {/* Sat 2: Far Left - Algorithms & DAA */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-700"
          style={{
            left: "8%",
            top: "52%",
            opacity: satsActive ? 1 : 0,
            transform: satsActive
              ? "translate(-50%, -50%) scale(1)"
              : "translate(220%, 0%) scale(0)",
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            transitionDelay: "0.15s",
          }}
        >
          <span className="float" style={{ "--d": "4.6s", "--dl": "0s" } as React.CSSProperties}>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-graphite-100 to-graphite-900 border border-cloud-border flex items-center justify-center text-cloud shadow-md hover:border-sunshine/50 transition-colors">
              <Cpu className="w-5 h-5 text-sunshine" />
            </div>
          </span>
        </div>

        {/* Sat 3: Python / FastAPI & AI (Bottom Left) */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-700"
          style={{
            left: "22%",
            top: "72%",
            opacity: satsActive ? 1 : 0,
            transform: satsActive
              ? "translate(-50%, -50%) scale(1)"
              : "translate(120%, -80%) scale(0)",
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            transitionDelay: "0.1s",
          }}
        >
          <span className="float" style={{ "--d": "4.2s", "--dl": "-2s" } as React.CSSProperties}>
            <div className="px-3 py-1.5 rounded-xl bg-graphite-100 border border-cloud-border shadow-md flex items-center gap-1.5 text-xs font-semibold text-cloud-muted backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Python & AI</span>
              <span className="sm:hidden">Python</span>
            </div>
          </span>
        </div>

        {/* Sat 4: Security & Systems (Top Right) */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-700"
          style={{
            left: "78%",
            top: "28%",
            opacity: satsActive ? 1 : 0,
            transform: satsActive
              ? "translate(-50%, -50%) scale(1)"
              : "translate(-120%, 80%) scale(0)",
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            transitionDelay: "0.08s",
          }}
        >
          <span className="float" style={{ "--d": "4.4s", "--dl": "-0.5s" } as React.CSSProperties}>
            <div className="px-3 py-1.5 rounded-xl bg-graphite-100 border border-sunshine/40 shadow-gold-sm flex items-center gap-1.5 text-xs font-semibold text-sunshine backdrop-blur-md">
              <Shield className="w-3.5 h-3.5 text-sunshine" />
              <span className="hidden sm:inline">Security Architecture</span>
              <span className="sm:hidden">Security</span>
            </div>
          </span>
        </div>

        {/* Sat 5: Databases & PostgreSQL (Bottom Right) */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-700"
          style={{
            left: "81%",
            top: "76%",
            opacity: satsActive ? 1 : 0,
            transform: satsActive
              ? "translate(-50%, -50%) scale(1)"
              : "translate(-140%, -80%) scale(0)",
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            transitionDelay: "0.2s",
          }}
        >
          <span className="float" style={{ "--d": "3.6s", "--dl": "-2.2s" } as React.CSSProperties}>
            <div className="px-3 py-1.5 rounded-xl bg-graphite-100 border border-cloud-border shadow-md flex items-center gap-1.5 text-xs font-semibold text-cloud-muted backdrop-blur-md">
              <Database className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">PostgreSQL / MySQL</span>
              <span className="sm:hidden">DB</span>
            </div>
          </span>
        </div>

        {/* Sat 6: Far Right - Verified Badge */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-700"
          style={{
            left: "92%",
            top: "50%",
            opacity: satsActive ? 1 : 0,
            transform: satsActive
              ? "translate(-50%, -50%) scale(1)"
              : "translate(-200%, 0%) scale(0)",
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            transitionDelay: "0.12s",
          }}
        >
          <span className="float" style={{ "--d": "5s", "--dl": "-1.5s" } as React.CSSProperties}>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-sunshine/20 to-graphite-900 border border-sunshine/40 flex items-center justify-center text-sunshine shadow-gold-sm">
              <Check className="w-5 h-5" />
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}

