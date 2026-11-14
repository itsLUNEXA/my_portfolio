"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CoverflowSlide {
  src: string;
  alt?: string;
  title: string;
  subtitle?: string;
  meta?: string;
  badge?: string;
  tagline?: string;
  techStack?: string[];
  githubUrl?: string;
  liveUrl?: string;
  role?: string;
  onClick?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface CoverflowCarouselProps {
  slides: CoverflowSlide[];
  initialIndex?: number;
  activeIndex?: number;
  onActiveChange?: (index: number) => void;
  onSlideClick?: (slide: CoverflowSlide, index: number) => void;
  className?: string;
  loop?: boolean;
  autoPlay?: boolean;
  interval?: number;
}

export function CoverflowCarousel({
  slides = [],
  initialIndex = 0,
  activeIndex: controlledIndex,
  onActiveChange,
  onSlideClick,
  className,
  loop = true,
  autoPlay = false,
  interval = 4000,
}: CoverflowCarouselProps) {
  const [internalIndex, setInternalIndex] = useState(initialIndex);
  const isControlled = controlledIndex !== undefined;
  const currentIndex = isControlled ? controlledIndex : internalIndex;

  const total = slides.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({
    isDown: false,
    startX: 0,
    currentX: 0,
    hasMoved: false,
  });

  // Responsive dimensions
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { cardWidth, cardHeight, stepX, baseGap } = useMemo(() => {
    if (windowWidth < 640) {
      return {
        cardWidth: 260,
        cardHeight: 330,
        stepX: 65,
        baseGap: 80,
      };
    } else if (windowWidth < 1024) {
      return {
        cardWidth: 320,
        cardHeight: 390,
        stepX: 95,
        baseGap: 120,
      };
    } else {
      return {
        cardWidth: 380,
        cardHeight: 440,
        stepX: 120,
        baseGap: 160,
      };
    }
  }, [windowWidth]);

  const updateIndex = useCallback(
    (newIndex: number) => {
      let next = newIndex;
      if (loop && total > 0) {
        next = ((newIndex % total) + total) % total;
      } else {
        next = Math.max(0, Math.min(total - 1, newIndex));
      }

      if (!isControlled) {
        setInternalIndex(next);
      }
      onActiveChange?.(next);
    },
    [isControlled, loop, onActiveChange, total]
  );

  const prev = useCallback(() => {
    updateIndex(currentIndex - 1);
  }, [currentIndex, updateIndex]);

  const next = useCallback(() => {
    updateIndex(currentIndex + 1);
  }, [currentIndex, updateIndex]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "Enter" || e.key === " ") {
        const slide = slides[currentIndex];
        if (slide) {
          e.preventDefault();
          onSlideClick?.(slide, currentIndex);
          slide.onClick?.();
        }
      }
    },
    [currentIndex, next, onSlideClick, prev, slides]
  );

  // Pointer drag & touch swipe
  const handlePointerDown = (e: React.PointerEvent) => {
    dragRef.current = {
      isDown: true,
      startX: e.clientX,
      currentX: e.clientX,
      hasMoved: false,
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.isDown) return;
    const diff = Math.abs(e.clientX - dragRef.current.startX);
    if (diff > 8) {
      dragRef.current.hasMoved = true;
    }
    dragRef.current.currentX = e.clientX;
  };

  const handlePointerUp = () => {
    if (!dragRef.current.isDown) return;
    const deltaX = dragRef.current.currentX - dragRef.current.startX;
    dragRef.current.isDown = false;

    if (dragRef.current.hasMoved && Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        prev();
      } else {
        next();
      }
    }
  };

  // Optional Autoplay
  useEffect(() => {
    if (!autoPlay || total <= 1) return;
    const timer = setInterval(() => {
      next();
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, next, total]);

  if (total === 0) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full flex flex-col items-center select-none outline-none overflow-hidden py-6",
        className
      )}
      tabIndex={0}
      role="region"
      aria-label="3D Coverflow Projects Carousel"
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* 3D Stage Viewport */}
      <div
        className="relative w-full flex items-center justify-center"
        style={{
          perspective: "1200px",
          height: `${cardHeight + 40}px`,
        }}
      >
        <div
          className="relative flex items-center justify-center w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {slides.map((slide, i) => {
            let offset = i - currentIndex;
            if (loop && total > 2) {
              if (offset > total / 2) offset -= total;
              if (offset < -total / 2) offset += total;
            }

            const absOffset = Math.abs(offset);
            const isCenter = offset === 0;

            // Only render visible adjacent cards up to depth 3 to optimize GPU rendering
            if (absOffset > 3.2) {
              return null;
            }

            let transform = "";
            let zIndex = 20 - Math.round(absOffset);
            let opacity = 1;

            if (isCenter) {
              transform = "translateX(0px) translateZ(0px) rotateY(0deg) scale(1)";
              zIndex = 35;
              opacity = 1;
            } else if (offset > 0) {
              // Right cards: angled leftward
              const tx = offset * stepX + baseGap;
              const tz = -Math.min(280, 110 + (offset - 1) * 70);
              const ry = -Math.min(52, 42 + (offset - 1) * 4);
              const scale = Math.max(0.68, 0.88 - (offset - 1) * 0.08);
              transform = `translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) scale(${scale})`;
              opacity = Math.max(0.25, 0.85 - (offset - 1) * 0.28);
            } else {
              // Left cards: angled rightward
              const tx = offset * stepX - baseGap;
              const tz = -Math.min(280, 110 + (-offset - 1) * 70);
              const ry = Math.min(52, 42 + (-offset - 1) * 4);
              const scale = Math.max(0.68, 0.88 - (-offset - 1) * 0.08);
              transform = `translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) scale(${scale})`;
              opacity = Math.max(0.25, 0.85 - (-offset - 1) * 0.28);
            }

            return (
              <div
                key={slide.id || `slide-${i}`}
                onClick={() => {
                  if (dragRef.current.hasMoved) return;
                  if (isCenter) {
                    onSlideClick?.(slide, i);
                    slide.onClick?.();
                  } else {
                    updateIndex(i);
                  }
                }}
                className={cn(
                  "absolute rounded-2xl bg-white border border-cloud-border/80 shadow-xl overflow-hidden cursor-pointer transition-all duration-500 ease-out flex flex-col justify-between group",
                  isCenter
                    ? "border-sunshine/80 shadow-gold-md ring-2 ring-sunshine/20"
                    : "hover:border-sunshine/50 hover:opacity-95"
                )}
                style={{
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  transform,
                  zIndex,
                  opacity,
                  willChange: "transform, opacity",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
                role="button"
                tabIndex={isCenter ? 0 : -1}
                aria-label={`Project: ${slide.title}`}
                aria-current={isCenter ? "true" : undefined}
              >
                {/* Visual Image / Artwork Area */}
                <div className="relative w-full flex-1 bg-graphite-100/60 overflow-hidden flex items-center justify-center p-3 border-b border-cloud-border/40">
                  {slide.src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={slide.src}
                      alt={slide.alt || slide.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 select-none"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-cloud-subtle text-xs font-mono">
                      {slide.title}
                    </div>
                  )}

                  {/* Badge Pill in corner */}
                  {slide.badge && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-graphite-50/90 backdrop-blur-md border border-cloud-border text-[10px] font-mono text-sunshine font-semibold uppercase tracking-wider shadow-sm">
                      {slide.badge}
                    </div>
                  )}

                  {/* Hover Inspect Indicator on Center Card */}
                  {isCenter && (
                    <div className="absolute inset-0 bg-[#03393F]/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="px-3.5 py-1.5 rounded-full bg-sunshine text-white text-xs font-semibold flex items-center gap-1.5 shadow-gold-sm">
                        <Eye className="w-3.5 h-3.5 text-[#F2BB8E]" />
                        <span>Inspect Project</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Meta Content Area */}
                <div className="p-4 sm:p-5 bg-white shrink-0 flex flex-col justify-between">
                  <div>
                    {slide.subtitle && (
                      <span className="text-[11px] font-mono uppercase tracking-wider text-sunshine font-semibold block mb-1 truncate">
                        {slide.subtitle}
                      </span>
                    )}

                    <h3 className="font-serif text-base sm:text-lg font-semibold text-cloud group-hover:text-sunshine transition-colors leading-snug truncate">
                      {slide.title}
                    </h3>

                    {slide.tagline && (
                      <p className="text-xs text-cloud-muted line-clamp-2 mt-1 leading-relaxed">
                        {slide.tagline}
                      </p>
                    )}
                  </div>

                  {/* Meta Strip / Tech Tags */}
                  <div className="mt-3 pt-2.5 border-t border-cloud-border/50 flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono text-cloud-subtle truncate max-w-[190px]">
                      {slide.meta || (slide.techStack ? slide.techStack.slice(0, 3).join(", ") : "")}
                    </span>

                    <span className="inline-flex items-center gap-1 text-[11px] text-sunshine font-semibold shrink-0">
                      <span>View</span>
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>

                {/* Subtle bottom glossy reflection */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-16 inset-x-0 h-14 opacity-25"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(3, 57, 63, 0.12), transparent)",
                    transform: "scaleY(-1)",
                    filter: "blur(4px)",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls & Pagination */}
      <div className="relative z-10 flex items-center justify-center gap-4 mt-4">
        <button
          type="button"
          onClick={prev}
          className="p-2 sm:p-2.5 rounded-full bg-graphite-100 border border-cloud-border text-cloud-muted hover:text-sunshine hover:border-sunshine/60 hover:bg-white shadow-sm transition-all cursor-pointer"
          title="Previous Project (Left Arrow)"
          aria-label="Previous Project"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Dynamic Dot Indicators */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-graphite-100/80 border border-cloud-border/60">
          {slides.map((s, idx) => (
            <button
              key={s.id || idx}
              type="button"
              onClick={() => updateIndex(idx)}
              className={cn(
                "rounded-full transition-all duration-300 cursor-pointer outline-none",
                idx === currentIndex
                  ? "w-6 h-1.5 bg-sunshine"
                  : "w-1.5 h-1.5 bg-cloud-border hover:bg-sunshine/50"
              )}
              aria-label={`Jump to ${s.title}`}
              aria-current={idx === currentIndex ? "true" : undefined}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          className="p-2 sm:p-2.5 rounded-full bg-graphite-100 border border-cloud-border text-cloud-muted hover:text-sunshine hover:border-sunshine/60 hover:bg-white shadow-sm transition-all cursor-pointer"
          title="Next Project (Right Arrow)"
          aria-label="Next Project"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default CoverflowCarousel;
