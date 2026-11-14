"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
  useRef,
} from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  TravelBagIcon,
  SourceCodeIcon,
  UserGroupIcon,
  Location01Icon,
  Shield01Icon,
  Store01Icon,
  Plant01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { cn } from "@/lib/utils";
import { Project } from "@/types/portfolio";

export interface FeatureItem {
  id: string;
  label: string;
  title?: string;
  tagline?: string;
  category?: string;
  group?: "Personal Projects" | "Hackathon Projects";
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  image: string;
  techStack?: string[];
  role?: string;
  githubUrl?: string;
  liveUrl?: string;
  status?: string;
  rawProject?: Project;
}

export const DEFAULT_PROJECT_FEATURES: FeatureItem[] = [
  {
    id: "proj-1",
    label: "AI Travel Companion",
    title: "AI Travel Companion",
    category: "AI Travel Planning",
    group: "Personal Projects",
    description: "An AI-powered travel assistant synthesizing mood-driven, adaptive multi-day itineraries with live weather & budget allocations.",
    icon: TravelBagIcon,
    image: "/projects/ai-travel-companion.png",
    techStack: ["Java", "Spring Boot", "React", "MySQL", "Gemini API"],
    githubUrl: "https://github.com/itsLUNEXA/ai_travel_companion",
  },
  {
    id: "proj-2",
    label: "COLLAB Platform",
    title: "COLLAB",
    category: "Developer Tools • Distributed AST",
    group: "Personal Projects",
    description: "Real-time collaborative developer environment featuring AST state synchronization, concurrent cursors, and Model Context Protocol (MCP).",
    icon: SourceCodeIcon,
    image: "/projects/collab.png",
    techStack: ["TypeScript", "Fastify", "WebSockets", "PostgreSQL", "MCP"],
    githubUrl: "https://github.com/itsLUNEXA/COLLAB",
    status: "In Development",
  },
  {
    id: "proj-3",
    label: "Campus Pulse",
    title: "Campus Pulse",
    category: "Full-Stack Campus Hub",
    group: "Hackathon Projects",
    description: "A student-centric campus application connecting peers through collegiate event discovery, study partner matching, and live socket-driven quizzes.",
    icon: UserGroupIcon,
    image: "/projects/campus-pulse.png",
    techStack: ["Flutter", "Dart", "Serverpod", "PostgreSQL", "WebSockets"],
    githubUrl: "https://github.com/itsLUNEXA/CAMPUS_PULSE",
  },
  {
    id: "proj-4",
    label: "Vibento",
    title: "Vibento",
    category: "Hyperlocal Event Discovery",
    group: "Hackathon Projects",
    description: "Intelligent discovery engine aggregating hackathons, technical meetups, and conferences with automated event extraction and deadline tracking.",
    icon: Location01Icon,
    image: "/projects/vibento.png",
    techStack: ["Python", "Django", "Supabase", "PostgreSQL", "Bootstrap"],
    githubUrl: "https://github.com/itsLUNEXA/vibento",
  },
  {
    id: "proj-6",
    label: "ThreatFusion AI",
    title: "ThreatFusion AI Security Engine",
    category: "Enterprise Cyber Defense",
    group: "Hackathon Projects",
    description: "AI-assisted cyber defense correlation engine linking distributed telemetry across users, endpoints, APIs, and databases to counter multi-stage threats.",
    icon: Shield01Icon,
    image: "/projects/threatfusion.png",
    techStack: ["Python", "FastAPI", "PostgreSQL", "Cognee", "n8n", "React"],
    githubUrl: "https://github.com/itsLUNEXA/TECHFUSION-AI-SECURITY-ENGINE",
  },
  {
    id: "proj-7",
    label: "VANIK Merchant POS",
    title: "VANIK",
    category: "Fintech & POS Analytics",
    group: "Hackathon Projects",
    description: "AI-driven merchant growth and POS platform translating transactions into customer lifetime value, automated RFM segmentation, and predictive alerts.",
    icon: Store01Icon,
    image: "/projects/vanik.png",
    techStack: ["Java", "Spring Boot", "FastAPI", "PostgreSQL", "Scikit-learn"],
    githubUrl: "https://github.com/webdev-shiv/vanik",
  },
  {
    id: "proj-8",
    label: "NITI — KrishiNiyojak",
    title: "NITI — KrishiNiyojak",
    category: "National AgriTech Platform",
    group: "Hackathon Projects",
    description: "Intelligent agricultural machinery scheduling and logistical GIS routing connecting rural farmers with Custom Hiring Centres (CHCs).",
    icon: Plant01Icon,
    image: "/projects/niti-krishiniyojak.png",
    techStack: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Leaflet", "OSRM"],
    githubUrl: "https://github.com/webdev-shiv/KrishiNiyojak",
  },
];

const AUTO_PLAY_INTERVAL = 3000;
const ITEM_HEIGHT = 65;

function shortestOffset(index: number, current: number, len: number) {
  if (len <= 1) return 0;
  let d = ((index - current) % len + len) % len;
  if (d > len / 2) d -= len;
  return d;
}

const chipSpring = {
  type: "tween" as const,
  duration: 0.42,
  ease: [0.4, 0, 0.2, 1] as const,
};

const cardSpring = {
  type: "tween" as const,
  duration: 0.38,
  ease: [0.4, 0, 0.2, 1] as const,
};

export interface FeatureCarouselProps {
  features?: FeatureItem[];
  onProjectClick?: (project: Project) => void;
  className?: string;
}

export default function FeatureCarousel({
  features = DEFAULT_PROJECT_FEATURES,
  onProjectClick,
  className = "",
}: FeatureCarouselProps) {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  const len = features.length;

  // Reset step whenever features array changes (e.g. category filter)
  useEffect(() => {
    setStep(0);
  }, [features]);

  const currentIndex = len > 0 ? ((step % len) + len) % len : 0;

  const nextStep = useCallback(() => {
    if (len <= 1) return;
    setStep((prev) => prev + 1);
  }, [len]);

  const handleChipClick = (index: number) => {
    if (len <= 1) return;
    const delta = shortestOffset(index, currentIndex, len);
    if (delta !== 0) setStep((s) => s + delta);
  };

  useEffect(() => {
    if (isPaused || len <= 1) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused, len]);

  const getCardStatus = (index: number) => {
    if (len <= 1) return index === 0 ? "active" : "hidden";
    const d = shortestOffset(index, currentIndex, len);
    if (d === 0) return "active";
    if (d === -1) return "prev";
    if (d === 1) return "next";
    return "hidden";
  };

  if (len === 0) {
    return (
      <div className="w-full p-12 text-center text-cloud-muted bg-graphite-900/50 rounded-2xl border border-cloud-border">
        No projects match this category.
      </div>
    );
  }

  return (
    <div className={cn("w-full max-w-7xl mx-auto", className)}>
      {/* Horizontal Two-Column Layout Container: 35% Left Nav / 65% Right Active Card */}
      <div className="relative flex flex-col md:flex-row items-center justify-between overflow-hidden rounded-[2rem] md:rounded-[2.8rem] border border-cloud-border/40 bg-graphite-950/80 backdrop-blur-md shadow-2xl md:min-h-[500px] lg:min-h-[520px]">
        
        {/* Left Column (35% Width): Vertically Animated Project Navigation Chips */}
        <div className="relative z-30 flex flex-col items-start justify-center overflow-hidden bg-gradient-to-b from-graphite-950 via-graphite-900 to-graphite-950 w-full h-[260px] sm:h-[280px] md:h-full md:min-h-[500px] lg:min-h-[520px] md:w-[35%] px-5 sm:px-8 md:px-6 lg:px-10 border-b md:border-b-0 md:border-r border-cloud-border/30 shrink-0">
          
          {/* Top & Bottom Smooth Gradient Fade Tracks */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-40 h-14 bg-gradient-to-b from-graphite-950 via-graphite-950/80 to-transparent md:h-20" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-14 bg-gradient-to-t from-graphite-950 via-graphite-950/80 to-transparent md:h-20" />
          
          {/* Vertical Chips Container */}
          <div className="relative z-20 flex h-full w-full items-center justify-center md:justify-start">
            {features.map((feature, index) => (
              <FeatureChip
                key={feature.id}
                feature={feature}
                index={index}
                currentIndex={currentIndex}
                total={len}
                reduceMotion={!!reduceMotion}
                onSelect={() => handleChipClick(index)}
                onPause={() => setIsPaused(true)}
                onResume={() => setIsPaused(false)}
              />
            ))}
          </div>

          {/* Micro status badge */}
          <div className="absolute bottom-3 left-6 lg:left-10 z-50 hidden md:flex items-center gap-2 text-[10px] font-mono text-cloud-subtle">
            <span className="w-1.5 h-1.5 rounded-full bg-sunshine animate-pulse" />
            <span>Project {currentIndex + 1} of {len}</span>
          </div>
        </div>

        {/* Right Column (65% Width): Clean, Minimal Solid Dark Charcoal Project Card */}
        <div className="relative flex flex-1 w-full md:w-[65%] h-full md:min-h-[500px] lg:min-h-[520px] items-center justify-center overflow-hidden bg-graphite p-4 sm:p-6 md:p-8 lg:p-10 shrink-0">
          
          {/* Active Card Frame */}
          <div className="relative flex w-full max-w-[580px] lg:max-w-[640px] min-h-[420px] md:h-[450px] items-center justify-center">
            {features.map((feature, index) => {
              const status = getCardStatus(index);
              const isActive = status === "active";
              const isPrev = status === "prev";
              const isNext = status === "next";

              return (
                <motion.div
                  key={feature.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? -80 : isNext ? 80 : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.9 : 0.78,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.25 : 0,
                    rotate: isPrev ? -2 : isNext ? 2 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={reduceMotion ? { duration: 0 } : cardSpring}
                  className="absolute inset-0 origin-center overflow-hidden rounded-[2rem] md:rounded-[2.4rem] border border-cloud-border/35 bg-graphite-100 shadow-2xl p-6 sm:p-8 md:p-8 lg:p-9 flex flex-col justify-between"
                >
                  {/* Top Block: Category Label, Status, Title, Full Description, Tech Badges */}
                  <div className="flex-1 flex flex-col">
                    {/* 1. Small project category label */}
                    <div className="flex items-center justify-between gap-3 mb-3.5">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-sunshine/10 border border-sunshine/30 flex items-center justify-center text-sunshine shrink-0">
                          <HugeiconsIcon icon={feature.icon} size={15} strokeWidth={2} />
                        </span>
                        <span className="px-3 py-0.5 rounded-full border border-sunshine/30 bg-sunshine/10 text-[11px] font-mono font-semibold uppercase tracking-wider text-sunshine">
                          {feature.category || feature.group || "Project"}
                        </span>
                      </div>
                      {feature.status && (
                        <span className="px-2.5 py-0.5 rounded-full border border-amber-400/30 bg-amber-400/10 text-[10px] font-mono font-medium text-amber-300">
                          {feature.status}
                        </span>
                      )}
                    </div>

                    {/* 2. Project title with clear typography */}
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-normal text-cloud leading-tight mb-3">
                      {feature.title || feature.label}
                    </h3>

                    {/* 3. Complete project description (Full text visible, no line-clamping) */}
                    <p className="text-sm sm:text-[15px] font-normal leading-relaxed text-cloud-muted/90 max-w-2xl mb-4">
                      {feature.description}
                    </p>

                    {/* 4. Technology stack badges */}
                    {feature.techStack && feature.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-auto pt-2">
                        {feature.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-lg bg-graphite-900 border border-cloud-border/40 text-xs font-mono text-cloud"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 5. Project actions (View Project, Code, Live) */}
                  <div className="flex items-center gap-3 pt-5 mt-4 border-t border-cloud-border/30">
                    {onProjectClick && feature.rawProject && (
                      <button
                        type="button"
                        onClick={() => onProjectClick(feature.rawProject!)}
                        className="btn-sunshine inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sunshine text-graphite text-xs font-semibold hover:bg-sunshine-hover shadow-gold-sm transition-all cursor-pointer"
                      >
                        <span>View Project</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {feature.githubUrl && (
                      <a
                        href={feature.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-sunshine inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-graphite-900 border border-cloud-border text-xs font-medium text-cloud hover:text-sunshine hover:border-sunshine/50 transition-colors"
                      >
                        <GithubIcon className="w-3.5 h-3.5 text-sunshine" />
                        <span>Code</span>
                      </a>
                    )}

                    {feature.liveUrl && (
                      <a
                        href={feature.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-sunshine inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-graphite-900 border border-cloud-border text-xs font-medium text-cloud hover:text-sunshine hover:border-sunshine/50 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-sunshine" />
                        <span>Live</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureChip({
  feature,
  index,
  currentIndex,
  total,
  reduceMotion,
  onSelect,
  onPause,
  onResume,
}: {
  feature: FeatureItem;
  index: number;
  currentIndex: number;
  total: number;
  reduceMotion: boolean;
  onSelect: () => void;
  onPause: () => void;
  onResume: () => void;
}) {
  const offset = shortestOffset(index, currentIndex, total);
  const prevOffset = useRef(offset);
  const jumped = Math.abs(offset - prevOffset.current) > 1;

  useLayoutEffect(() => {
    prevOffset.current = offset;
  }, [offset]);

  const isActive = offset === 0;

  return (
    <motion.div
      initial={false}
      style={{ height: ITEM_HEIGHT, width: "fit-content" }}
      animate={{
        y: offset * ITEM_HEIGHT,
        opacity: Math.max(0, 1 - Math.abs(offset) * 0.22),
      }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : jumped
            ? { duration: 0 }
            : chipSpring
      }
      className="absolute flex items-center justify-start"
    >
      <button
        type="button"
        onClick={onSelect}
        onMouseEnter={onPause}
        onMouseLeave={onResume}
        className={cn(
          "relative flex cursor-pointer items-center gap-3 rounded-full border px-4 py-2.5 sm:px-5 sm:py-3 text-left transition-[color,background-color,border-color,box-shadow,transform] duration-150 ease-out active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-sunshine/50 focus-visible:outline-none md:px-5 md:py-3 lg:px-6 lg:py-3.5",
          isActive
            ? "z-10 border-sunshine bg-sunshine text-graphite font-semibold shadow-gold-sm"
            : "border-cloud-border/30 bg-graphite-900/70 text-cloud-muted hover:border-sunshine/40 hover:text-cloud"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-center transition-colors shrink-0",
            isActive ? "text-graphite" : "text-sunshine"
          )}
        >
          <HugeiconsIcon icon={feature.icon} size={18} strokeWidth={2} />
        </div>
        <span className="whitespace-nowrap text-xs sm:text-sm font-medium tracking-tight uppercase truncate max-w-[170px] sm:max-w-[210px] md:max-w-[170px] lg:max-w-[220px]">
          {feature.label}
        </span>
      </button>
    </motion.div>
  );
}
