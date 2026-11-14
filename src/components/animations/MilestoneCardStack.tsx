"use client";

import React, { useState } from "react";
import { Trophy, ChevronLeft, ChevronRight, Award, Calendar, Flame, Building } from "lucide-react";
import { Achievement } from "@/types/portfolio";

interface MilestoneCardStackProps {
  achievements: Achievement[];
  onViewCertificate: (achievement: Achievement) => void;
}

export default function MilestoneCardStack({
  achievements,
  onViewCertificate,
}: MilestoneCardStackProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const featured = achievements.filter(
    (a) => a.category === "Hackathon Achievements" && a.certificateUrl
  ).slice(0, 5);

  if (featured.length < 2) return null;

  const currentItem = featured[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featured.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + featured.length) % featured.length);
  };

  return (
    <div className="w-full my-12 bg-graphite-950/60 border border-cloud-border rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-sunshine/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sunshine/10 text-sunshine text-xs font-semibold tracking-wider uppercase border border-sunshine/30 mb-3">
          Podium Spotlight
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl text-cloud font-normal">
          Competitive <span className="italic font-medium text-sunshine">Highlights</span>
        </h3>
        <p className="text-xs sm:text-sm text-cloud-muted mt-2">
          Interactive 3D milestone stack showcasing national hackathon finishes and competitive certificates.
        </p>
      </div>

      {/* 3D Tilted Card Stack Stage (Adapted from Scene 5) */}
      <div className="relative max-w-lg mx-auto min-h-[340px] sm:min-h-[300px] flex items-center justify-center py-6">
        {/* Ghost background cards providing stacked depth */}
        <div
          className="absolute inset-x-8 inset-y-2 rounded-2xl bg-graphite-900 border border-cloud-border/40 opacity-40 pointer-events-none"
          style={{ transform: "rotate(-6deg) scale(0.92)" }}
        />
        <div
          className="absolute inset-x-8 inset-y-2 rounded-2xl bg-graphite-900 border border-cloud-border/60 opacity-60 pointer-events-none"
          style={{ transform: "rotate(4deg) scale(0.96)" }}
        />

        {/* Active Foreground Card */}
        <div
          key={currentItem.id}
          className="relative w-full rounded-2xl bg-gradient-to-b from-graphite-100 via-graphite to-graphite-900 border-2 border-sunshine/40 p-6 sm:p-8 shadow-2xl transition-all duration-500 ease-out"
          style={{
            transform: "rotate(0deg) scale(1)",
            boxShadow: "0 20px 45px -10px rgba(16, 35, 68, 0.12), 0 0 25px -5px rgba(20, 86, 160, 0.25)",
          }}
        >
          {/* Top Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sunshine/15 text-sunshine text-xs font-semibold border border-sunshine/40 shadow-gold-sm">
              <Trophy className="w-3.5 h-3.5 text-sunshine" />
              <span>{currentItem.recognitionOrPosition}</span>
            </span>

            {currentItem.badge && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-graphite border border-cloud-border text-[11px] font-mono text-cloud-muted">
                <Flame className="w-3 h-3 text-sunshine" />
                <span>{currentItem.badge}</span>
              </span>
            )}

            <span className="text-xs text-cloud-subtle font-mono flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{currentItem.dateOrYear}</span>
            </span>
          </div>

          {/* Title */}
          <h4 className="font-serif text-xl sm:text-2xl text-cloud font-medium mb-2">
            {currentItem.title}
          </h4>

          {/* Organization */}
          <div className="flex items-center gap-2 text-xs text-cloud-muted mb-4 font-medium">
            <Building className="w-4 h-4 text-sunshine shrink-0" />
            <span>{currentItem.eventOrOrganization}</span>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-cloud-muted font-light leading-relaxed mb-6 line-clamp-3">
            {currentItem.description}
          </p>

          {/* Card Footer */}
          <div className="pt-4 border-t border-cloud-border/70 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => onViewCertificate(currentItem)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sunshine text-graphite text-xs font-semibold hover:bg-sunshine-hover shadow-gold-sm transition-all cursor-pointer"
            >
              <Award className="w-3.5 h-3.5" />
              <span>View Certificate</span>
            </button>

            <span className="text-[11px] font-mono text-cloud-subtle">
              Milestone {currentIndex + 1} of {featured.length}
            </span>
          </div>
        </div>
      </div>

      {/* Prev / Next Card Swap Arrows */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          type="button"
          onClick={handlePrev}
          className="w-10 h-10 rounded-full border border-cloud-border bg-graphite hover:border-sunshine hover:text-sunshine text-cloud flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
          aria-label="Previous milestone"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-1.5">
          {featured.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                i === currentIndex ? "w-6 bg-sunshine shadow-gold-sm" : "w-1.5 bg-cloud-border hover:bg-cloud-muted"
              }`}
              aria-label={`Go to milestone ${i + 1}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={handleNext}
          className="w-10 h-10 rounded-full border border-cloud-border bg-graphite hover:border-sunshine hover:text-sunshine text-cloud flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
          aria-label="Next milestone"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
