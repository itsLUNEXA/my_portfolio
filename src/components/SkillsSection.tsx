"use client";

import React, { useState } from "react";
import { Terminal, Globe, Server, Database, GitBranch, BookOpen, Layers, CheckCircle2 } from "lucide-react";
import { SkillCategory } from "@/types/portfolio";

interface SkillsSectionProps {
  categories: SkillCategory[];
}

export default function SkillsSection({ categories }: SkillsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const getCategoryIcon = (categoryName: string) => {
    const lower = categoryName.toLowerCase();
    if (lower.includes("programming")) {
      return <Terminal className="w-4 h-4 text-sunshine" />;
    }
    if (lower.includes("web") || lower.includes("frontend")) {
      return <Globe className="w-4 h-4 text-sunshine" />;
    }
    if (lower.includes("backend")) {
      return <Server className="w-4 h-4 text-sunshine" />;
    }
    if (lower.includes("database")) {
      return <Database className="w-4 h-4 text-sunshine" />;
    }
    if (lower.includes("tool") || lower.includes("version")) {
      return <GitBranch className="w-4 h-4 text-sunshine" />;
    }
    if (lower.includes("fundamental") || lower.includes("cs")) {
      return <BookOpen className="w-4 h-4 text-sunshine" />;
    }
    return <Layers className="w-4 h-4 text-sunshine" />;
  };

  const filteredCategories =
    activeCategory === "All"
      ? categories
      : categories.filter((cat) => cat.category === activeCategory);

  return (
    <section id="skills" className="py-24 bg-graphite border-t border-cloud-border relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-sunshine text-xs font-semibold tracking-widest uppercase mb-3">
              <span className="w-8 h-[1px] bg-sunshine" />
              <span>Section 02</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cloud font-normal">
              Technical <span className="italic font-medium text-sunshine">Expertise</span>
            </h2>
          </div>
          <p className="text-cloud-muted text-sm max-w-md">
            Programming languages, web technologies, database management, and computer science foundations applied across my academic coursework and personal projects.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveCategory("All")}
            className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              activeCategory === "All"
                ? "bg-sunshine text-graphite font-semibold shadow-gold-sm"
                : "bg-graphite-100 text-cloud-muted hover:text-cloud border border-cloud-border hover:border-sunshine/40"
            }`}
          >
            All Disciplines
          </button>
          {categories.map((cat) => (
            <button
              key={cat.category}
              type="button"
              onClick={() => setActiveCategory(cat.category)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeCategory === cat.category
                  ? "bg-sunshine text-graphite font-semibold shadow-gold-sm"
                  : "bg-graphite-100 text-cloud-muted hover:text-cloud border border-cloud-border hover:border-sunshine/40"
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => (
            <div
              key={cat.category}
              className="bg-graphite-100/50 border border-cloud-border rounded-2xl p-6 hover:border-sunshine/40 transition-all duration-300 group hover:shadow-lg hover:shadow-black/40 flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-cloud-border/60">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-graphite border border-cloud-border group-hover:border-sunshine/40 transition-colors">
                      {getCategoryIcon(cat.category)}
                    </div>
                    <h3 className="text-base font-semibold text-cloud group-hover:text-sunshine transition-colors">
                      {cat.category}
                    </h3>
                  </div>
                  <span className="text-xs text-cloud-subtle font-mono">
                    {cat.skills.length} skills
                  </span>
                </div>

                {/* Skills List (Clean tags with minimal aesthetic, NO progress bars) */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-graphite/80 border border-cloud-border text-xs text-cloud-muted hover:text-cloud hover:border-sunshine/50 hover:bg-graphite transition-all group/item"
                    >
                      <CheckCircle2 className="w-3 h-3 text-sunshine/70 group-hover/item:text-sunshine transition-colors" />
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Philosophy Banner */}
        <div className="mt-12 p-5 rounded-xl bg-graphite-900 border border-cloud-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-sunshine shrink-0" />
            <p className="text-xs text-cloud-muted">
              <span className="text-sunshine font-semibold uppercase tracking-wider">Continuous Learning:</span> Actively building hands-on projects, studying core algorithmic problem solving, and expanding into modern full-stack systems.
            </p>
          </div>
          <span className="text-[11px] font-mono text-cloud-subtle uppercase tracking-wider whitespace-nowrap">
            CSE Curriculum & Practical Dev
          </span>
        </div>

      </div>
    </section>
  );
}
