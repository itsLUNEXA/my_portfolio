"use client";

import React, { useState, useMemo } from "react";
import {
  Trophy,
  Calendar,
  Building,
  ArrowUpRight,
  Award,
  Flame,
  CheckCircle2,
} from "lucide-react";
import { Achievement } from "@/types/portfolio";
import CircularCertificateGallery from "@/components/ui/circular-certificate-gallery";
import CertificateViewerModal from "./CertificateViewerModal";
import WordReveal from "./animations/WordReveal";
import ScrollReveal from "./animations/ScrollReveal";

interface AchievementsSectionProps {
  achievements: Achievement[];
}

export default function AchievementsSection({
  achievements = [],
}: AchievementsSectionProps) {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  // Separate hackathon and personal items
  const hackathonItems = useMemo(
    () => achievements.filter((item) => item.category === "Hackathon Achievements"),
    [achievements]
  );

  const personalItems = useMemo(
    () => achievements.filter((item) => item.category === "Personal Achievements & Certifications"),
    [achievements]
  );

  // Render individual achievement row in the compact Personal & Academic Credentials list
  const renderAchievementRow = (item: Achievement) => {
    const hasCert = !!item.certificateUrl;

    const isPodium =
      item.recognitionOrPosition.toLowerCase().includes("position") ||
      item.recognitionOrPosition.toLowerCase().includes("place") ||
      item.recognitionOrPosition.toLowerCase().includes("winner");

    const isFinalist =
      item.recognitionOrPosition.toLowerCase().includes("finalist") ||
      item.recognitionOrPosition.toLowerCase().includes("finale");

    return (
      <div
        key={item.id}
        className="group relative flex flex-col lg:flex-row lg:items-center justify-between gap-3 lg:gap-6 px-4 py-3.5 sm:px-6 sm:py-4 hover:bg-graphite-900/60 transition-colors duration-150"
      >
        {/* Left Section: Title, Organization, Short Description */}
        <div className="flex-1 min-w-0 pr-0 lg:pr-4">
          <div className="flex items-center gap-2">
            <h4 className="font-serif text-sm sm:text-base font-medium text-cloud group-hover:text-sunshine transition-colors leading-snug">
              {item.title}
            </h4>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-cloud-muted font-medium mt-0.5">
            <Building className="w-3.5 h-3.5 text-sunshine/80 shrink-0" />
            <span className="truncate">{item.eventOrOrganization}</span>
          </div>

          <p className="text-cloud-muted/75 text-xs font-light mt-1 leading-relaxed line-clamp-1 lg:line-clamp-2 max-w-2xl">
            {item.description}
          </p>
        </div>

        {/* Middle Section: Achievement status / position badge, Supporting recognition details, Date/year */}
        <div className="flex flex-wrap items-center gap-2 shrink-0 lg:px-2">
          {/* Status or Position Badge */}
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border shrink-0 ${
              isPodium
                ? "bg-sunshine/15 text-sunshine border-sunshine/40 shadow-gold-sm"
                : isFinalist
                ? "bg-amber-400/10 text-amber-300 border-amber-400/30"
                : "bg-graphite-900 text-cloud-muted border-cloud-border/60"
            }`}
          >
            <Trophy className="w-3 h-3 text-sunshine shrink-0" />
            <span className="whitespace-nowrap">{item.recognitionOrPosition}</span>
          </span>

          {/* Supporting Recognition Details */}
          {item.badge && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-graphite-900/90 border border-cloud-border/50 text-[11px] font-mono text-cloud-muted shrink-0 whitespace-nowrap">
              <Flame className="w-3 h-3 text-sunshine shrink-0" />
              <span>{item.badge}</span>
            </span>
          )}

          {/* Date / Year */}
          <span className="inline-flex items-center gap-1 text-xs text-cloud-subtle font-mono shrink-0 whitespace-nowrap">
            <Calendar className="w-3 h-3 text-cloud-subtle shrink-0" />
            <span>{item.dateOrYear}</span>
          </span>
        </div>

        {/* Right Section: View Certificate button (if cert exists) & Verified Record indicator */}
        <div className="flex items-center gap-2.5 shrink-0 justify-start lg:justify-end lg:min-w-[210px] pt-1 lg:pt-0 border-t border-cloud-border/20 lg:border-t-0">
          {hasCert && (
            <button
              type="button"
              onClick={() => setSelectedAchievement(item)}
              className="btn-sunshine inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sunshine/15 hover:bg-sunshine text-sunshine hover:text-graphite border border-sunshine/40 hover:border-sunshine text-xs font-semibold transition-all duration-200 cursor-pointer shadow-gold-sm shrink-0 whitespace-nowrap"
              title={`View certificate for ${item.title}`}
            >
              <Award className="w-3.5 h-3.5 shrink-0" />
              <span>View Certificate</span>
            </button>
          )}

          {item.supportingUrl && item.supportingUrl !== "#" ? (
            <a
              href={item.supportingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-cloud-muted hover:text-sunshine transition-colors font-medium shrink-0 whitespace-nowrap"
            >
              <span>Verify Online</span>
              <ArrowUpRight className="w-3 h-3 shrink-0" />
            </a>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs text-cloud-subtle font-mono shrink-0 whitespace-nowrap">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400/80 shrink-0" />
              <span>Verified Record</span>
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <section
      id="achievements"
      className="relative w-full bg-graphite-900 border-t border-cloud-border scroll-mt-24 py-16 sm:py-20 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* ==================================================================== */}
        {/* SECTION HEADER                                                       */}
        {/* ==================================================================== */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-sunshine text-xs font-semibold tracking-widest uppercase mb-3">
            <span className="w-8 h-[1px] bg-sunshine" />
            <span>Section 03</span>
            <span className="w-8 h-[1px] bg-sunshine" />
          </div>

          <WordReveal
            as="h2"
            text="Hackathon Achievements & Awards"
            highlightWords={["Achievements", "Awards"]}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cloud font-normal"
            stagger={0.08}
          />

          <p className="text-cloud-muted text-xs sm:text-sm mt-3 max-w-xl mx-auto leading-relaxed">
            Competitive podium finishes, Microsoft & Samsung hackathon finales, and verified collegiate awards.
          </p>
        </div>

        {/* ==================================================================== */}
        {/* HACKATHON ACHIEVEMENTS: CIRCULAR CERTIFICATE GALLERY                  */}
        {/* ==================================================================== */}
        <ScrollReveal delay={0.1} yOffset={25} blurAmount={6}>
          <CircularCertificateGallery
            achievements={hackathonItems}
            onViewCertificate={(item) => setSelectedAchievement(item)}
          />
        </ScrollReveal>

        {/* ==================================================================== */}
        {/* PERSONAL & ACADEMIC CREDENTIALS (SEPARATE & UNCHANGED)               */}
        {/* ==================================================================== */}
        <ScrollReveal delay={0.2} yOffset={25} blurAmount={6}>
          <div className="pt-8 border-t border-cloud-border/40">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-4 border-b border-cloud-border/30 gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-sunshine" />
                  <span className="text-xs uppercase tracking-widest text-sunshine font-mono font-semibold">
                    Academic & Professional
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-cloud font-normal mt-1">
                  Personal & Academic Credentials
                </h3>
                <p className="text-xs sm:text-sm text-cloud-muted mt-0.5">
                  Accredited university programs, national initiatives, and technical certifications.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-graphite-950 border border-cloud-border text-xs font-mono text-cloud-muted shrink-0 self-start sm:self-auto">
                {personalItems.length} Records
              </span>
            </div>

            <div className="rounded-2xl border border-cloud-border/50 bg-graphite-950/80 backdrop-blur-sm overflow-hidden shadow-lg divide-y divide-cloud-border/30">
              {personalItems.length === 0 ? (
                <div className="p-8 text-center text-cloud-muted text-sm font-mono">
                  No personal achievement records found.
                </div>
              ) : (
                personalItems.map((item) => renderAchievementRow(item))
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* ==================================================================== */}
        {/* MILESTONE FOOTER CALLOUT                                             */}
        {/* ==================================================================== */}
        <ScrollReveal delay={0.2} yOffset={25} blurAmount={8}>
          <div className="p-6 rounded-2xl bg-graphite-950/60 border border-cloud-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-sunshine/10 text-sunshine">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-cloud">Active Competitor & Rapid Builder</h4>
                <p className="text-xs text-cloud-muted mt-0.5">
                  Continuously participating in national hackathons, algorithm challenges, and technical build sprints.
                </p>
              </div>
            </div>
            <a
              href="#contact"
              className="btn-sunshine px-5 py-2 rounded-full border border-sunshine/70 text-sunshine text-xs font-semibold hover:bg-sunshine hover:text-graphite transition-all whitespace-nowrap cursor-pointer shadow-gold-sm"
            >
              Invite to Hackathon / Team
            </a>
          </div>
        </ScrollReveal>
      </div>

      {/* ==================================================================== */}
      {/* CERTIFICATE LIGHTBOX / VIEWER MODAL WITH ZOOM & DOWNLOAD             */}
      {/* ==================================================================== */}
      {selectedAchievement && (
        <CertificateViewerModal
          isOpen={!!selectedAchievement}
          onClose={() => setSelectedAchievement(null)}
          title={selectedAchievement?.title || ""}
          organization={selectedAchievement?.eventOrOrganization}
          certificateUrl={selectedAchievement?.certificateUrl}
          certificateType={selectedAchievement?.certificateType}
          dateOrYear={selectedAchievement?.dateOrYear}
          verificationUrl={selectedAchievement?.supportingUrl}
        />
      )}
    </section>
  );
}
