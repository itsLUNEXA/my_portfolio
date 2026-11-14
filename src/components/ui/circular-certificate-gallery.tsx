"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Trophy,
  Award,
  Calendar,
  Building,
  ArrowUpRight,
  CheckCircle2,
  Flame,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  FileText,
  AlertCircle,
  RotateCcw,
} from "lucide-react";
import { Achievement } from "@/types/portfolio";
import { cn } from "@/lib/utils";

export interface CircularCertificateGalleryProps {
  achievements: Achievement[];
  onViewCertificate?: (achievement: Achievement) => void;
  className?: string;
  defaultIndex?: number;
}

export default function CircularCertificateGallery({
  achievements = [],
  onViewCertificate,
  className = "",
  defaultIndex = 0,
}: CircularCertificateGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number>(defaultIndex);
  const [wheelRotation, setWheelRotation] = useState<number>(0);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const total = achievements.length;
  const activeItem = achievements[activeIndex] || achievements[0];

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setIsReducedMotion(mediaQuery.matches);
      const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    }
  }, []);

  // Compute step angle in degrees
  const angleStep = total > 0 ? 360 / total : 0;

  // Calculate shortest-path rotation when activeIndex changes
  const selectIndex = useCallback(
    (targetIndex: number) => {
      if (total <= 1) {
        setActiveIndex(targetIndex);
        return;
      }

      const currentIndex = activeIndex;
      // Angular difference between current and target
      const currentAngle = currentIndex * angleStep;
      const targetAngle = targetIndex * angleStep;
      let diff = targetAngle - currentAngle;

      // Wrap around for shortest path
      if (diff > 180) diff -= 360;
      if (diff < -180) diff += 360;

      setWheelRotation((prev) => prev - diff);
      setActiveIndex(targetIndex);
    },
    [activeIndex, angleStep, total]
  );

  const handlePrev = useCallback(() => {
    if (total <= 1) return;
    const prev = (activeIndex - 1 + total) % total;
    selectIndex(prev);
  }, [activeIndex, selectIndex, total]);

  const handleNext = useCallback(() => {
    if (total <= 1) return;
    const next = (activeIndex + 1) % total;
    selectIndex(next);
  }, [activeIndex, selectIndex, total]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (total <= 1) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "Home") {
        e.preventDefault();
        selectIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        selectIndex(total - 1);
      }
    },
    [handleNext, handlePrev, selectIndex, total]
  );

  if (total === 0) {
    return (
      <div className="w-full p-8 text-center text-cloud-muted font-mono text-sm bg-graphite-950/70 rounded-2xl border border-cloud-border">
        No hackathon achievement records available.
      </div>
    );
  }

  // Active item asset details
  const hasCert = !!activeItem?.certificateUrl;
  const certImage = activeItem?.previewImageUrl || activeItem?.certificateUrl;
  const isPdf = activeItem?.certificateType === "pdf";

  const isPodium =
    activeItem?.recognitionOrPosition?.toLowerCase().includes("position") ||
    activeItem?.recognitionOrPosition?.toLowerCase().includes("place") ||
    activeItem?.recognitionOrPosition?.toLowerCase().includes("winner");

  const isFinalist =
    activeItem?.recognitionOrPosition?.toLowerCase().includes("finalist") ||
    activeItem?.recognitionOrPosition?.toLowerCase().includes("finale");

  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Interactive Circular Certificate Gallery"
      className={cn(
        "w-full focus:outline-none focus-visible:ring-1 focus-visible:ring-sunshine/50 rounded-3xl",
        className
      )}
    >
      {/* Two-Column Responsive Layout: Left = Circular Wheel, Right = Certificate Details */}
      <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-8 lg:gap-10 w-full">
        
        {/* ==================================================================== */}
        {/* LEFT SIDE: CIRCULAR WHEEL GALLERY                                   */}
        {/* ==================================================================== */}
        <div className="w-full lg:w-[48%] xl:w-[46%] flex flex-col items-center justify-center shrink-0">
          
          {/* Wheel Stage Container */}
          <div className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] md:w-[440px] md:h-[440px] lg:w-[450px] lg:h-[450px] aspect-square flex items-center justify-center select-none">
            
            {/* Background Atmosphere Glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sunshine/5 via-transparent to-sunshine/5 blur-2xl pointer-events-none" />

            {/* SVG Background Coordinate Geometry: Concentric Rings & Radial Spokes */}
            <svg
              className="absolute inset-0 size-full pointer-events-none"
              viewBox="0 0 100 100"
            >
              {/* Outer Faint Orbit Ring */}
              <circle
                cx="50"
                cy="50"
                r="37"
                fill="none"
                stroke="rgba(20, 86, 160, 0.28)"
                strokeWidth="0.4"
                strokeDasharray="1.2 1.8"
              />

              {/* Inner Decorative Accent Ring */}
              <circle
                cx="50"
                cy="50"
                r="22"
                fill="none"
                stroke="rgba(16, 35, 68, 0.12)"
                strokeWidth="0.3"
              />

              {/* Rotating Group for Spokes connecting Center to Nodes */}
              <g
                style={{
                  transformOrigin: "50% 50%",
                  transform: `rotate(${wheelRotation}deg)`,
                  transition: isReducedMotion
                    ? "none"
                    : "transform 650ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {achievements.map((_, i) => {
                  const spokeAngle = (i * angleStep * Math.PI) / 180;
                  const x2 = 50 + 37 * Math.cos(spokeAngle);
                  const y2 = 50 + 37 * Math.sin(spokeAngle);
                  const isCurrentActive = activeIndex === i;

                  return (
                    <line
                      key={`spoke-${i}`}
                      x1="50"
                      y1="50"
                      x2={x2}
                      y2={y2}
                      stroke={
                        isCurrentActive
                          ? "rgba(20, 86, 160, 0.95)"
                          : "rgba(16, 35, 68, 0.15)"
                      }
                      strokeWidth={isCurrentActive ? "0.6" : "0.25"}
                      strokeDasharray={isCurrentActive ? "none" : "0.8 1.2"}
                    />
                  );
                })}
              </g>

              {/* Outer Subtle Pulse Ring */}
              <circle
                cx="50"
                cy="50"
                r="47"
                fill="none"
                stroke="rgba(185, 220, 255, 0.6)"
                strokeWidth="0.25"
              />
            </svg>

            {/* ROTATING WHEEL OF THUMBNAIL NODES */}
            <div
              className="absolute inset-0 size-full"
              role="tablist"
              aria-label="Hackathon certificate thumbnails"
              style={{
                transform: `rotate(${wheelRotation}deg)`,
                transition: isReducedMotion
                  ? "none"
                  : "transform 650ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {achievements.map((item, index) => {
                const angleDeg = index * angleStep;
                const angleRad = (angleDeg * Math.PI) / 180;

                // Position on circle radius = 37%
                const leftPercent = 50 + 37 * Math.cos(angleRad);
                const topPercent = 50 + 37 * Math.sin(angleRad);
                const isSelected = activeIndex === index;
                const thumbImage = item.previewImageUrl || item.certificateUrl;

                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    onClick={() => selectIndex(index)}
                    aria-label={`Select certificate ${index + 1}: ${item.title}`}
                    aria-selected={isSelected}
                    className={cn(
                      "group absolute z-10 rounded-lg p-0.5 border cursor-pointer select-none",
                      "w-12 h-9 sm:w-14 sm:h-10 md:w-16 md:h-11",
                      "transition-all duration-300",
                      isSelected
                        ? "border-sunshine bg-white shadow-[0_0_18px_rgba(20,86,160,0.35)] scale-110 z-20 ring-1 ring-sunshine"
                        : "border-cloud-border/50 bg-graphite-950/90 opacity-70 hover:opacity-100 hover:border-sunshine/50 hover:scale-105"
                    )}
                    style={{
                      left: `${leftPercent}%`,
                      top: `${topPercent}%`,
                      // translate(-50%, -50%) centers node on coordinate, counter-rotation keeps upright
                      transform: `translate(-50%, -50%) rotate(${-wheelRotation}deg)`,
                      transition: isReducedMotion
                        ? "none"
                        : "transform 650ms cubic-bezier(0.16, 1, 0.3, 1), border-color 200ms, opacity 200ms",
                    }}
                  >
                    {/* Number Badge */}
                    <span
                      className={cn(
                        "absolute -top-1.5 -left-1.5 px-1 py-0.2 rounded text-[8px] sm:text-[9px] font-mono leading-none z-20 shadow",
                        isSelected
                          ? "bg-sunshine text-graphite font-bold border border-sunshine"
                          : "bg-graphite-950/95 text-cloud-subtle border border-cloud-border/60 group-hover:text-sunshine"
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Thumbnail Artwork Preview */}
                    <div className="size-full rounded overflow-hidden bg-graphite-900 flex items-center justify-center relative">
                      {thumbImage ? (
                        <img
                          src={thumbImage}
                          alt={item.title}
                          className="size-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="size-full flex flex-col items-center justify-center bg-graphite-900/90 text-cloud-subtle p-0.5">
                          <Trophy className="w-3 h-3 text-amber-400/80 mb-0.5" />
                          <span className="text-[7px] font-mono uppercase">N/A</span>
                        </div>
                      )}

                      {/* Active Thumbnail Golden Sheen */}
                      {isSelected && (
                        <div className="absolute inset-0 bg-sunshine/10 pointer-events-none" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* CENTRAL CIRCULAR HUB */}
            <div
              className="absolute z-20 rounded-full border border-sunshine/40 bg-white/95 shadow-[0_0_24px_rgba(20,86,160,0.22)] flex flex-col items-center justify-center p-2 text-center pointer-events-none"
              style={{
                width: "26%",
                height: "26%",
                minWidth: "86px",
                minHeight: "86px",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="flex items-center gap-1 text-sunshine">
                <Trophy className="w-3.5 h-3.5" />
              </div>
              <span className="font-mono text-lg sm:text-2xl font-bold text-sunshine leading-none mt-1 tracking-tight">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span className="text-[8px] sm:text-[9px] font-mono text-cloud-muted uppercase tracking-widest mt-0.5">
                of {String(total).padStart(2, "0")}
              </span>
            </div>

            {/* Focal Alignment Indicator (Desktop 3 o'clock pointer toward details) */}
            <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 items-center pointer-events-none z-10 text-sunshine/80">
              <span className="w-4 h-0.5 bg-gradient-to-r from-sunshine/80 to-transparent" />
            </div>
          </div>

          {/* Quick Guidance Hint Below Wheel */}
          <div className="flex items-center gap-2 text-[11px] font-mono text-cloud-muted mt-3">
            <RotateCcw className="w-3 h-3 text-sunshine" />
            <span>Click any certificate or use Prev/Next arrows</span>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* RIGHT SIDE: SELECTED CERTIFICATE DETAILS                            */}
        {/* ==================================================================== */}
        <div className="flex-1 w-full rounded-3xl border border-cloud-border/60 bg-graphite-950/90 backdrop-blur-md p-5 sm:p-7 shadow-2xl flex flex-col justify-between">
          <div>
            {/* Top Controls Bar: Badge & Navigation Indicator */}
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-cloud-border/30">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sunshine animate-pulse" />
                <span className="text-xs uppercase tracking-wider font-mono text-cloud font-semibold">
                  Selected Credential
                </span>
              </div>

              {/* Position Indicator & Prev/Next Controls */}
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs text-cloud-muted">
                  <strong className="text-sunshine font-bold text-sm">
                    {String(activeIndex + 1).padStart(2, "0")}
                  </strong>{" "}
                  / {String(total).padStart(2, "0")}
                </span>

                <div className="flex items-center gap-1.5 ml-1">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous certificate"
                    className="p-1.5 sm:p-2 rounded-xl bg-graphite-900 border border-cloud-border/50 text-cloud-muted hover:text-sunshine hover:border-sunshine/50 transition-colors cursor-pointer shadow-sm"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next certificate"
                    className="p-1.5 sm:p-2 rounded-xl bg-graphite-900 border border-cloud-border/50 text-cloud-muted hover:text-sunshine hover:border-sunshine/50 transition-colors cursor-pointer shadow-sm"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Large Certificate Preview Display */}
            {/* Strict Requirement: object-fit: contain, complete document visible without crop, distortion, or blur */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:h-[300px] lg:h-[330px] rounded-2xl overflow-hidden border border-cloud-border/50 bg-[#EBF4FF] flex items-center justify-center p-3 sm:p-4 shadow-inner group/preview my-4">
              {certImage ? (
                <div className="relative size-full flex items-center justify-center">
                  <img
                    src={certImage}
                    alt={activeItem.title}
                    className="max-h-full max-w-full object-contain mx-auto transition-transform duration-300 drop-shadow-md select-none"
                  />

                  {/* Format Badge (Top-Left) */}
                  <div className="absolute top-2.5 left-2.5 z-10 px-2.5 py-1 rounded-md bg-graphite/90 border border-cloud-border/60 text-[10px] font-mono text-cloud flex items-center gap-1.5 backdrop-blur-sm shadow">
                    {isPdf ? (
                      <>
                        <FileText className="w-3.5 h-3.5 text-red-400" />
                        <span>PDF Credential</span>
                      </>
                    ) : (
                      <>
                        <Award className="w-3.5 h-3.5 text-sunshine" />
                        <span>Verified Certificate</span>
                      </>
                    )}
                  </div>

                  {/* Quick Expand Button (Top-Right) */}
                  {hasCert && (
                    <button
                      type="button"
                      onClick={() => onViewCertificate?.(activeItem)}
                      aria-label={`Inspect full certificate for ${activeItem.title}`}
                      title="Inspect Full Certificate"
                      className="absolute top-2.5 right-2.5 z-10 p-2 rounded-lg bg-graphite/90 border border-cloud-border/60 text-cloud-muted hover:text-sunshine hover:border-sunshine/60 transition-colors cursor-pointer shadow backdrop-blur-sm"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ) : (
                /* Clean Placeholder when certificate asset is missing (e.g. Prompt Wars) */
                <div className="size-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-graphite-900/90 to-graphite-950 rounded-xl border border-cloud-border/30">
                  <div className="w-12 h-12 rounded-2xl bg-sunshine/10 border border-sunshine/30 flex items-center justify-center text-sunshine mb-3 shadow-gold-sm">
                    <AlertCircle className="w-6 h-6 text-amber-400" />
                  </div>
                  <span className="font-serif text-base text-cloud font-medium mb-1">
                    Certificate unavailable
                  </span>
                  <p className="text-xs font-mono text-cloud-muted max-w-[280px]">
                    Official collegiate hackathon participation record is verified on file.
                  </p>
                </div>
              )}
            </div>

            {/* Achievement Metadata */}
            <div className="space-y-2.5">
              {/* Title */}
              <h3 className="font-serif text-lg sm:text-xl md:text-2xl text-cloud font-normal leading-snug">
                {activeItem.title}
              </h3>

              {/* Organization / Event Name */}
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-cloud-muted font-medium">
                <Building className="w-3.5 h-3.5 text-sunshine shrink-0" />
                <span>{activeItem.eventOrOrganization}</span>
              </div>

              {/* Badges: Position & Special Distinction & Date */}
              <div className="flex flex-wrap items-center gap-2 pt-0.5">
                {/* Position Badge */}
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border shadow-sm",
                    isPodium
                      ? "bg-sunshine/20 text-sunshine border-sunshine/50 shadow-gold-sm"
                      : isFinalist
                      ? "bg-amber-400/15 text-amber-300 border-amber-400/40"
                      : "bg-graphite-900 text-cloud-muted border-cloud-border/60"
                  )}
                >
                  <Trophy className="w-3.5 h-3.5 text-sunshine shrink-0" />
                  <span>{activeItem.recognitionOrPosition}</span>
                </span>

                {/* Distinction Badge */}
                {activeItem.badge && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-graphite-900 border border-cloud-border/50 text-[11px] font-mono text-cloud-muted">
                    <Flame className="w-3 h-3 text-sunshine shrink-0" />
                    <span>{activeItem.badge}</span>
                  </span>
                )}

                {/* Event Date / Year */}
                <span className="inline-flex items-center gap-1 text-xs text-cloud-subtle font-mono ml-auto">
                  <Calendar className="w-3.5 h-3.5 text-cloud-subtle shrink-0" />
                  <span>{activeItem.dateOrYear}</span>
                </span>
              </div>

              {/* Short Description */}
              <p className="text-cloud-muted/80 text-xs sm:text-sm font-light leading-relaxed pt-1 line-clamp-3">
                {activeItem.description}
              </p>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="pt-4 border-t border-cloud-border/30 flex flex-wrap items-center justify-between gap-3 mt-4">
            <div className="flex items-center gap-2">
              {hasCert ? (
                <button
                  type="button"
                  onClick={() => onViewCertificate?.(activeItem)}
                  className="btn-sunshine inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sunshine text-graphite font-semibold text-xs hover:bg-sunshine-hover shadow-gold-sm transition-all cursor-pointer"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>View Full Certificate</span>
                </button>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-graphite-900 border border-cloud-border text-xs font-mono text-cloud-subtle">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Active Participant</span>
                </span>
              )}

              {activeItem.supportingUrl && activeItem.supportingUrl !== "#" && (
                <a
                  href={activeItem.supportingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-sunshine inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-graphite-900 border border-cloud-border text-xs font-medium text-cloud hover:text-sunshine hover:border-sunshine/50 transition-colors"
                >
                  <span>Verify Online</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            {/* Verified Record Status Indicator */}
            <div className="flex items-center gap-1.5 text-xs font-mono text-cloud-subtle">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Verified Record</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
