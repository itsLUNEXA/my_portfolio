"use client";

import React, { useState, useMemo } from "react";
import { Laptop, Trophy, Sparkles, ExternalLink, ArrowRight, Eye } from "lucide-react";
import { Project } from "@/types/portfolio";
import CoverflowCarousel, { CoverflowSlide } from "@/components/ui/coverflow-carousel";
import ProjectModal from "./ProjectModal";
import WordReveal from "./animations/WordReveal";
import ScrollReveal from "./animations/ScrollReveal";
import { GithubIcon } from "./Icons";

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects = [] }: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const filterTabs = [
    { label: "All Projects", value: "All", count: projects.length },
    {
      label: "Personal Projects",
      value: "Personal Projects",
      count: projects.filter((p) => p.group === "Personal Projects").length,
    },
    {
      label: "Hackathon Projects",
      value: "Hackathon Projects",
      count: projects.filter((p) => p.group === "Hackathon Projects").length,
    },
  ];

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((p) => p.group === activeFilter);
  }, [projects, activeFilter]);

  // Handle filter change
  const handleFilterChange = (filterVal: string) => {
    setActiveFilter(filterVal);
    setActiveIndex(0);
  };

  // Map to CoverflowSlide interface required by CoverflowCarousel
  const coverflowSlides: CoverflowSlide[] = useMemo(() => {
    return filteredProjects.map((p) => ({
      id: p.id,
      title: p.title,
      src: p.images && p.images.length > 0 ? p.images[0] : `/projects/${p.id}.png`,
      alt: `${p.title} architectural visualization`,
      subtitle: p.category,
      badge: p.group === "Hackathon Projects" ? "Hackathon" : "Personal",
      tagline: p.tagline,
      meta: p.techStack ? p.techStack.slice(0, 3).join(" • ") : p.group,
      techStack: p.techStack,
      githubUrl: p.githubUrl,
      liveUrl: p.liveUrl,
      role: p.role,
      rawProject: p,
      onClick: () => setSelectedProject(p),
    }));
  }, [filteredProjects]);

  // Current active project
  const currentProject = filteredProjects[activeIndex] || filteredProjects[0] || null;

  return (
    <section
      id="projects"
      className="py-24 bg-graphite border-t border-cloud-border relative scroll-mt-24 sm:scroll-mt-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <ScrollReveal yOffset={20} blurAmount={6}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <div className="flex items-center gap-2 text-sunshine text-xs font-semibold tracking-widest uppercase mb-3">
                <span className="w-8 h-[1px] bg-sunshine" />
                <span>Section 05</span>
              </div>
              <WordReveal
                as="h2"
                text="Featured Projects"
                highlightWords={["Projects"]}
                className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cloud font-normal"
                stagger={0.1}
              />
            </div>
            <p className="text-cloud-muted text-xs sm:text-sm max-w-md leading-relaxed">
              Production systems, hackathon architectures, and AI-powered platforms engineered with backend rigor, distributed databases, and resilient APIs.
            </p>
          </div>
        </ScrollReveal>

        {/* Category Filter Tabs */}
        <ScrollReveal delay={0.1} yOffset={16} blurAmount={6}>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => handleFilterChange(tab.value)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                  activeFilter === tab.value
                    ? "bg-sunshine text-white font-semibold shadow-gold-sm"
                    : "bg-graphite-100 text-cloud-muted hover:text-cloud border border-cloud-border hover:border-sunshine/40"
                }`}
              >
                {tab.value === "Personal Projects" && <Laptop className="w-3.5 h-3.5" />}
                {tab.value === "Hackathon Projects" && <Trophy className="w-3.5 h-3.5" />}
                {tab.value === "All" && <Sparkles className="w-3.5 h-3.5" />}
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    activeFilter === tab.value
                      ? "bg-white/20 text-white font-bold"
                      : "bg-graphite-200 text-cloud-subtle"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* 3D Coverflow Carousel Centerpiece */}
        <ScrollReveal delay={0.15} yOffset={30} blurAmount={8}>
          <div className="w-full mb-8">
            <CoverflowCarousel
              slides={coverflowSlides}
              activeIndex={activeIndex}
              onActiveChange={setActiveIndex}
              onSlideClick={(slide) => setSelectedProject(slide.rawProject)}
            />
          </div>
        </ScrollReveal>

        {/* Selected Project Full Details & Action Hub */}
        {currentProject && (
          <ScrollReveal delay={0.2} yOffset={24} blurAmount={6}>
            <div className="rounded-2xl bg-graphite-100 border border-cloud-border p-6 sm:p-8 shadow-gold-sm transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
                
                {/* Visual Project Mockup Preview */}
                <div className="lg:col-span-4 space-y-2.5">
                  <div
                    onClick={() => setSelectedProject(currentProject)}
                    className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-xl overflow-hidden bg-white border border-cloud-border shadow-md group cursor-pointer flex items-center justify-center p-2"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={currentProject.images && currentProject.images[0] ? currentProject.images[0] : `/projects/${currentProject.id}.png`}
                      alt={currentProject.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 select-none"
                    />
                    <div className="absolute inset-0 bg-[#03393F]/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="px-3.5 py-1.5 rounded-full bg-sunshine text-white text-xs font-semibold flex items-center gap-1.5 shadow-gold-sm">
                        <Eye className="w-3.5 h-3.5 text-[#F2BB8E]" />
                        <span>Inspect Project</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-cloud-subtle px-1">
                    <span>Project Overview Visual</span>
                    <button
                      type="button"
                      onClick={() => setSelectedProject(currentProject)}
                      className="text-sunshine hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <span>Full Deep Dive</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Center: Project Overview */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-sky-subtle border border-sky-border text-xs font-mono font-semibold text-sunshine">
                      {currentProject.category}
                    </span>
                    <span className="text-xs font-mono text-cloud-subtle">
                      • {currentProject.group}
                    </span>
                    {currentProject.status && (
                      <span className="px-2 py-0.5 rounded-full bg-graphite-100 border border-cloud-border text-[10px] font-mono text-cloud-muted">
                        {currentProject.status}
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-cloud font-normal">
                    {currentProject.title}
                  </h3>

                  <p className="text-sm text-cloud-subtle leading-relaxed">
                    {currentProject.overview || currentProject.tagline}
                  </p>

                  {/* Tech Stack Badges */}
                  {currentProject.techStack && currentProject.techStack.length > 0 && (
                    <div className="pt-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-cloud-subtle block mb-2">
                        Technologies &amp; Architecture:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {currentProject.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md bg-graphite-100 border border-cloud-border text-xs font-medium text-cloud-muted hover:text-cloud hover:border-sunshine/40 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right: Actions & Role */}
                <div className="lg:col-span-3 lg:border-l lg:border-cloud-border/60 lg:pl-6 space-y-5 flex flex-col justify-between h-full">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-cloud-subtle block mb-1.5">
                      Engineering Focus
                    </span>
                    <p className="text-xs text-cloud-muted leading-relaxed">
                      {currentProject.role || "Backend and distributed system design."}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row lg:flex-col gap-2.5">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(currentProject)}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-sunshine text-white text-xs font-semibold hover:bg-sunshine-hover shadow-gold-sm transition-all cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Deep Dive Architecture</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-auto" />
                    </button>

                    {currentProject.githubUrl && (
                      <a
                        href={currentProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-cloud-border bg-graphite-100 hover:bg-sky-subtle text-cloud text-xs font-medium transition-all"
                      >
                        <GithubIcon className="w-4 h-4" />
                        <span>Source Code</span>
                        <ExternalLink className="w-3.5 h-3.5 ml-auto text-cloud-subtle" />
                      </a>
                    )}

                    {currentProject.liveUrl && (
                      <a
                        href={currentProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-sunshine/40 bg-sky-subtle text-sunshine text-xs font-semibold hover:bg-sky transition-all"
                      >
                        <span>Live Deployment</span>
                        <ExternalLink className="w-3.5 h-3.5 ml-auto" />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </ScrollReveal>
        )}

      </div>

      {/* Project Deep Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
