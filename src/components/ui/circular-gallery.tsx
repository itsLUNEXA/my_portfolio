"use client";

import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import {
  ShieldCheck,
  Eye,
  Calendar,
  Award,
  FileText,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  RotateCcw,
} from "lucide-react";
import PdfThumbnail from "@/components/ui/PdfThumbnail";

export interface GalleryItem {
  id?: string;
  title: string;
  issuingOrganization?: string;
  issueDate?: string;
  description?: string;
  imageUrl?: string;
  pdfUrl?: string;
  certificateUrl?: string;
  certificateType?: "image" | "pdf";
  verificationUrl?: string;
  credentialId?: string;
  category?: string;
  skillsLearned?: string[];
  badge?: string;
  image?: string;
  text?: string;
  url?: string;
  [key: string]: unknown;
}

export interface CircularGalleryProps {
  items: GalleryItem[];
  radius?: number;
  autoRotateSpeed?: number;
  perspective?: number;
  scrollDriven?: boolean;
  onItemClick?: (item: GalleryItem) => void;
  className?: string;
}

export default function CircularGallery({
  items = [],
  radius,
  autoRotateSpeed = 0.038, // Controlled, smooth, calm rotation
  perspective = 1750, // Optimal 3D depth perspective
  scrollDriven = true,
  onItemClick,
  className = "",
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cylinderRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Performance caches to avoid redundant DOM writes in rAF
  const cardOpacitiesRef = useRef<number[]>([]);
  const cardFrontStateRef = useRef<boolean[]>([]);

  // Smooth rotation state in refs (zero React re-renders during 60fps/120fps animation)
  const rotationRef = useRef<number>(0);
  const isInteracting = useRef<boolean>(false);
  const isDragging = useRef<boolean>(false);
  const isHovered = useRef<boolean>(false);
  const dragStartX = useRef<number>(0);
  const dragStartRot = useRef<number>(0);
  const hasDragged = useRef<boolean>(false);
  const rafId = useRef<number | null>(null);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef<number>(0);

  // Manual pause state
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const isPausedRef = useRef<boolean>(false);
  isPausedRef.current = isPaused;

  // Reduced motion preference
  const reducedMotionRef = useRef<boolean>(false);

  // Responsive dimensions - reduced overall scale by 25-30%
  const [windowWidth, setWindowWidth] = useState<number>(1200);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Compute 25-30% reduced scale responsive radius & card size
  const { computedRadius, cardWidth, cardHeight, viewportHeight } = useMemo(() => {
    const N = Math.max(items.length, 6);
    if (windowWidth < 640) {
      // Mobile: compact card size and tight radius
      const baseR = radius ? Math.min(radius, 240) : Math.min(235, Math.max(190, N * 28));
      return {
        computedRadius: baseR,
        cardWidth: 160,
        cardHeight: 220,
        viewportHeight: 275,
      };
    } else if (windowWidth < 1024) {
      // Tablet / small laptops
      const baseR = radius ? Math.min(radius, 340) : Math.min(335, Math.max(260, N * 36));
      return {
        computedRadius: baseR,
        cardWidth: 195,
        cardHeight: 260,
        viewportHeight: 320,
      };
    } else {
      // Desktop / large laptops
      const baseR = radius || Math.min(435, Math.max(340, N * 42));
      return {
        computedRadius: baseR,
        cardWidth: 230,
        cardHeight: 305,
        viewportHeight: 370,
      };
    }
  }, [windowWidth, radius, items.length]);

  // Reset card cache arrays whenever items change
  useEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, items.length);
    cardOpacitiesRef.current = new Array(items.length).fill(-1);
    cardFrontStateRef.current = new Array(items.length).fill(false);
  }, [items.length]);

  // Accessibility: detect reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mediaQuery.matches;
    const handleChange = () => {
      reducedMotionRef.current = mediaQuery.matches;
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Smooth Delta-Based Scroll Listener (Prevents jumps when starting/stopping scroll)
  useEffect(() => {
    if (!scrollDriven) return;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const deltaY = currentY - lastScrollY.current;
      lastScrollY.current = currentY;

      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Only respond when the section is in the viewport
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        isInteracting.current = true;
        // Delta-based rotation ensures continuous seamless movement without snapping to absolute coordinates
        rotationRef.current += deltaY * 0.16;

        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
          isInteracting.current = false;
        }, 180);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [scrollDriven]);

  // High-performance compositor animation frame loop
  useEffect(() => {
    if (items.length === 0) return;

    const stepAngle = 360 / items.length;

    const animate = () => {
      // Rotate when not paused, not dragging, and not actively interacting/hovering
      if (!reducedMotionRef.current) {
        if (!isDragging.current && !isInteracting.current && !isHovered.current && !isPausedRef.current) {
          rotationRef.current += autoRotateSpeed;
        }
      }

      const currentRot = rotationRef.current;

      // Single GPU composite transform update
      if (cylinderRef.current) {
        cylinderRef.current.style.transform = `rotateY(${currentRot}deg)`;
      }

      // Selective, thresholded DOM style updates (zero layout thrashing)
      for (let i = 0; i < items.length; i++) {
        const cardEl = cardsRef.current[i];
        if (!cardEl) continue;

        const baseAngle = i * stepAngle;
        const effectiveAngle = ((baseAngle + currentRot) % 360 + 360) % 360;
        const angleDist = Math.abs(
          effectiveAngle > 180 ? 360 - effectiveAngle : effectiveAngle
        );

        // Prominent front card, dim side and rear cards (cubic falloff)
        const rad = (angleDist * Math.PI) / 180;
        const targetOpacity = Math.max(0.12, Math.pow(Math.cos(rad / 2), 3));

        // Threshold check: only write style when changed by >= 0.02
        if (Math.abs((cardOpacitiesRef.current[i] ?? -1) - targetOpacity) > 0.02) {
          cardOpacitiesRef.current[i] = targetOpacity;
          cardEl.style.opacity = targetOpacity.toFixed(2);
        }

        // Pointer-events: only active for front-most facing cards (< 55 deg)
        const isFront = angleDist < 55;
        if (cardFrontStateRef.current[i] !== isFront) {
          cardFrontStateRef.current[i] = isFront;
          cardEl.style.pointerEvents = isFront ? "auto" : "none";
        }
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [items.length, autoRotateSpeed]);

  // Smooth Pointer Drag Handling
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartRot.current = rotationRef.current;
    hasDragged.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const delta = e.clientX - dragStartX.current;
    if (Math.abs(delta) > 4) {
      hasDragged.current = true;
    }
    // Smooth, controlled drag factor
    rotationRef.current = dragStartRot.current + delta * 0.22;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  // Keyboard and button controls
  const stepRotation = useCallback(
    (direction: "left" | "right") => {
      const step = 360 / Math.max(items.length, 1);
      const delta = direction === "left" ? step : -step;
      rotationRef.current += delta;
    },
    [items.length]
  );

  const resetRotation = useCallback(() => {
    rotationRef.current = 0;
  }, []);

  const handleCardClick = (item: GalleryItem) => {
    if (hasDragged.current) return;
    if (onItemClick) {
      onItemClick(item);
    }
  };

  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-cloud-muted bg-graphite-900/60 rounded-2xl border border-cloud-border">
        <Award className="w-10 h-10 text-sunshine/50 mb-2" />
        <p className="text-xs">No credentials currently available.</p>
      </div>
    );
  }

  const stepAngle = 360 / items.length;

  return (
    <div
      ref={containerRef}
      className={`relative w-full select-none ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => {
        isHovered.current = true;
      }}
      onMouseLeave={() => {
        isHovered.current = false;
        isDragging.current = false;
      }}
      tabIndex={0}
      role="region"
      aria-label="3D Circular Certificate Gallery"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") stepRotation("left");
        if (e.key === "ArrowRight") stepRotation("right");
        if (e.key === " " || e.key === "p" || e.key === "P") {
          e.preventDefault();
          setIsPaused((prev) => !prev);
        }
      }}
    >
      {/* 3D Perspective Viewport */}
      <div
        className="relative w-full flex items-center justify-center overflow-visible"
        style={{
          perspective: `${perspective}px`,
          height: `${viewportHeight}px`,
        }}
      >
        {/* Rotating 3D Cylinder Ring with hardware will-change */}
        <div
          ref={cylinderRef}
          className="relative flex items-center justify-center preserve-3d"
          style={{
            width: `${cardWidth}px`,
            height: `${cardHeight}px`,
            willChange: "transform",
          }}
        >
          {items.map((item, index) => {
            const baseAngle = index * stepAngle;
            const certImage =
              item.imageUrl ||
              item.image ||
              (item.certificateType === "image" ? item.certificateUrl : null);

            return (
              <div
                key={item.id || `card-${index}`}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                onClick={() => handleCardClick(item)}
                className="absolute top-0 left-0 rounded-xl bg-graphite-900 border border-cloud-border/70 hover:border-sunshine/90 shadow-xl overflow-hidden flex flex-col justify-between group cursor-pointer hover:shadow-gold-sm"
                style={{
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  transform: `rotateY(${baseAngle}deg) translateZ(${computedRadius}px)`,
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "visible",
                }}
                role="button"
                tabIndex={0}
                aria-label={`View certificate: ${item.title}`}
              >
                {/* Compact Top Bar */}
                <div className="p-2.5 sm:p-3 pb-1.5 flex items-center justify-between gap-1.5 border-b border-cloud-border/40 bg-graphite-950/70 shrink-0">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <ShieldCheck className="w-3.5 h-3.5 text-sunshine shrink-0" />
                    <span className="text-[10px] font-semibold text-sunshine truncate tracking-wider uppercase">
                      {item.issuingOrganization || item.category || "Verified"}
                    </span>
                  </div>
                  {item.issueDate && (
                    <span className="text-[9px] text-cloud-subtle font-mono shrink-0 flex items-center gap-1">
                      <Calendar className="w-2.5 h-2.5" />
                      <span className="truncate max-w-[65px]">{item.issueDate}</span>
                    </span>
                  )}
                </div>

                {/* Primary Visual Element: Real image or PDF.js thumbnail */}
                <div className="relative flex-1 w-full bg-white overflow-hidden flex items-center justify-center p-1">
                  {certImage ? (
                    <div className="relative w-full h-full rounded-lg overflow-hidden flex items-center justify-center bg-white border border-cloud-border/20">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={certImage}
                        alt={item.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-graphite-950/80 via-transparent to-transparent opacity-60" />
                    </div>
                  ) : item.pdfUrl ? (
                    /* Real PDF first-page preview via PDF.js */
                    <div className="relative w-full h-full rounded-lg overflow-hidden border border-cloud-border/20 group-hover:scale-[1.03] transition-transform duration-300">
                      <PdfThumbnail pdfUrl={item.pdfUrl} alt={item.title} className="rounded-lg" />
                      <div className="absolute inset-0 bg-gradient-to-t from-graphite-950/70 via-transparent to-transparent opacity-70" />
                    </div>
                  ) : (
                    /* Fallback: no asset at all */
                    <div className="relative w-full h-full rounded-lg border border-sunshine/20 bg-gradient-to-b from-graphite-100 to-graphite-200 flex flex-col items-center justify-center p-2.5 text-center">
                      <div className="w-9 h-9 rounded-lg bg-sunshine/10 border border-sunshine/30 flex items-center justify-center text-sunshine mb-1.5 group-hover:scale-110 transition-transform">
                        <FileText className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-semibold text-cloud uppercase tracking-wider mb-0.5 truncate max-w-full">
                        {item.issuingOrganization || "Accredited"}
                      </span>
                      <span className="text-[9px] text-sunshine font-mono px-1.5 py-0.5 rounded-full bg-sunshine/10 border border-sunshine/20">
                        Certificate
                      </span>
                    </div>
                  )}

                  {/* Hover Inspect Indicator */}
                  <div className="absolute inset-0 bg-[#03393F]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-2.5 py-1 rounded-full bg-sunshine text-graphite font-semibold text-[10px] flex items-center gap-1 shadow-gold-sm">
                      <Eye className="w-3 h-3" />
                      Inspect
                    </span>
                  </div>
                </div>

                {/* Compact Bottom Bar */}
                <div className="p-2.5 sm:p-3 pt-2 bg-graphite-900 border-t border-cloud-border/40 shrink-0">
                  <h4 className="font-serif text-xs sm:text-sm text-cloud group-hover:text-sunshine transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h4>
                  <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-cloud-border/30">
                    <span className="text-[10px] text-cloud-muted truncate max-w-[105px]">
                      {item.issuingOrganization || "Accredited"}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] text-sunshine font-medium">
                      <span>View</span>
                      <Eye className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subtle Bottom Controls */}
      <div className="flex items-center justify-center gap-2.5 mt-4">
        <button
          type="button"
          onClick={() => stepRotation("left")}
          className="p-1.5 sm:p-2 rounded-full bg-graphite-900 border border-cloud-border text-cloud-muted hover:text-sunshine hover:border-sunshine/60 transition-all cursor-pointer shadow-sm"
          title="Rotate Left"
          aria-label="Rotate Gallery Left"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => setIsPaused((prev) => !prev)}
          className="px-3 py-1 rounded-full bg-graphite-900 border border-cloud-border text-[11px] font-mono text-cloud-muted hover:text-sunshine hover:border-sunshine/60 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          title={isPaused ? "Resume Auto-Rotation" : "Pause Auto-Rotation"}
          aria-label={isPaused ? "Resume Auto-Rotation" : "Pause Auto-Rotation"}
        >
          {isPaused ? (
            <>
              <Play className="w-2.5 h-2.5 text-sunshine" />
              <span>Resume</span>
            </>
          ) : (
            <>
              <Pause className="w-2.5 h-2.5 text-sunshine" />
              <span>Pause</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => stepRotation("right")}
          className="p-1.5 sm:p-2 rounded-full bg-graphite-900 border border-cloud-border text-cloud-muted hover:text-sunshine hover:border-sunshine/60 transition-all cursor-pointer shadow-sm"
          title="Rotate Right"
          aria-label="Rotate Gallery Right"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={resetRotation}
          className="p-1.5 sm:p-2 rounded-full bg-graphite-900 border border-cloud-border text-cloud-muted hover:text-sunshine hover:border-sunshine/60 transition-all cursor-pointer shadow-sm"
          title="Reset Alignment"
          aria-label="Reset Gallery Alignment"
        >
          <RotateCcw className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
