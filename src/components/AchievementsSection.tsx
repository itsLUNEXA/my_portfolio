"use client";

import React, { useState } from "react";
import { Trophy, Calendar, Sparkles, Building, ArrowUpRight, Award, Flame } from "lucide-react";
import { Achievement } from "@/types/portfolio";

interface AchievementsSectionProps {
  achievements: Achievement[];
}

export default function AchievementsSection({ achievements }: AchievementsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Podium Finishes", "National Finalists", "Innovation Sprints"];

  const filteredAchievements =
    activeCategory === "All"
      ? achievements
      : achievements.filter((item) => item.category === activeCategory);

  return (
    <section id="achievements" className="py-24 bg-graphite-900 border-t border-cloud-border relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-sunshine text-xs font-semibold tracking-widest uppercase mb-3">
              <span className="w-8 h-[1px] bg-sunshine" />
              <span>Section 03</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cloud font-normal">
              Honors & <span className="italic font-medium text-sunshine">Achievements</span>
            </h2>
          </div>
          <p className="text-cloud-muted text-sm max-w-md">
            Competitive hackathon podium finishes, technical innovation challenges, and national-level hackathon finalist selections.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? "bg-sunshine text-graphite font-semibold shadow-gold-sm"
                  : "bg-graphite-100 text-cloud-muted hover:text-cloud border border-cloud-border hover:border-sunshine/40"
              }`}
            >
              {cat === "All" ? "All Milestones" : cat}
            </button>
          ))}
        </div>

        {/* Timeline / Editorial Showcase */}
        <div className="relative border-l border-cloud-border/70 ml-4 md:ml-8 pl-6 md:pl-10 space-y-10">
          {filteredAchievements.map((item) => (
            <div key={item.id} className="relative group">
              
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-graphite border-2 border-sunshine group-hover:bg-sunshine group-hover:scale-125 transition-all shadow-gold-sm" />

              {/* Achievement Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-graphite border border-cloud-border group-hover:border-sunshine/40 transition-all duration-300">
                
                {/* Top Metadata */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sunshine/10 text-sunshine text-xs font-semibold border border-sunshine/30">
                      <Trophy className="w-3.5 h-3.5" />
                      {item.recognitionOrPosition}
                    </span>

                    {item.badge && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-graphite-100 border border-cloud-border text-[11px] font-mono text-cloud-muted">
                        <Flame className="w-3 h-3 text-sunshine" />
                        {item.badge}
                      </span>
                    )}

                    <span className="text-xs text-cloud-subtle font-mono flex items-center gap-1 ml-1">
                      <Calendar className="w-3 h-3" />
                      {item.dateOrYear}
                    </span>
                  </div>

                  {item.supportingUrl && item.supportingUrl !== "#" && (
                    <a
                      href={item.supportingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-cloud-muted hover:text-sunshine transition-colors font-medium"
                    >
                      <span>Verification</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl sm:text-2xl text-cloud mb-2 group-hover:text-sunshine transition-colors">
                  {item.title}
                </h3>

                {/* Organization */}
                <div className="flex items-center gap-2 text-sm text-cloud-muted mb-4 font-medium">
                  <Building className="w-4 h-4 text-sunshine shrink-0" />
                  <span>{item.eventOrOrganization}</span>
                </div>

                {/* Description */}
                <p className="text-cloud-muted text-sm sm:text-base leading-relaxed font-light">
                  {item.description}
                </p>

                {/* Placeholder Warning Badge (only if placeholder) */}
                {item.isPlaceholder && (
                  <div className="mt-4 pt-4 border-t border-cloud-border/60 flex items-center gap-2 text-xs text-cloud-subtle italic">
                    <Sparkles className="w-3.5 h-3.5 text-sunshine/70 shrink-0" />
                    <span>Awaiting your verified achievement milestones in Phase 2 content collection.</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Milestone Footer Callout */}
        <div className="mt-16 p-6 rounded-2xl bg-graphite-100/50 border border-cloud-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sunshine/10 text-sunshine">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-cloud">Active Competitor & Builder</h4>
              <p className="text-xs text-cloud-muted mt-0.5">
                Continuously participating in national hackathons, algorithm challenges, and technical build sprints.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="px-5 py-2.5 rounded-full border border-sunshine/70 text-sunshine text-xs font-semibold hover:bg-sunshine hover:text-graphite transition-all whitespace-nowrap"
          >
            Invite to Hackathon / Team
          </a>
        </div>

      </div>
    </section>
  );
}
