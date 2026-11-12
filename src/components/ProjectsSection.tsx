"use client";

import React, { useState } from "react";
import { FolderGit2, ArrowUpRight, Sparkles, Terminal } from "lucide-react";
import { Project } from "@/types/portfolio";
import { GithubIcon } from "./Icons";
import ProjectModal from "./ProjectModal";

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const categories = [
    "All",
    "Hackathon Builds",
    "AI & Machine Learning",
    "AgriTech & Social Systems",
    "Developer Tools",
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((proj) => proj.group === activeFilter);

  return (
    <section id="projects" className="py-24 bg-graphite-900 border-t border-cloud-border relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-sunshine text-xs font-semibold tracking-widest uppercase mb-3">
              <span className="w-8 h-[1px] bg-sunshine" />
              <span>Section 05</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cloud font-normal">
              Featured <span className="italic font-medium text-sunshine">Projects</span>
            </h2>
          </div>
          <p className="text-cloud-muted text-sm max-w-md">
            Production-grade systems, hackathon-winning architectures, and AI-powered platforms engineered with backend rigor, scalable databases, and modern APIs.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeFilter === cat
                  ? "bg-sunshine text-graphite font-semibold shadow-gold-sm"
                  : "bg-graphite-100 text-cloud-muted hover:text-cloud border border-cloud-border hover:border-sunshine/40"
              }`}
            >
              {cat === "All" ? "All Projects" : cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className="bg-graphite border border-cloud-border rounded-2xl overflow-hidden flex flex-col justify-between hover:border-sunshine/40 transition-all duration-300 group hover:shadow-2xl hover:shadow-black/60"
            >
              <div>
                {/* Visual Thumbnail Frame */}
                <div className="relative aspect-[16/10] bg-graphite-950 border-b border-cloud-border/80 overflow-hidden flex items-center justify-center p-6 group-hover:scale-[1.01] transition-transform">
                  {/* Subtle golden ambient glow */}
                  <div className="absolute inset-0 bg-radial-gradient from-sunshine/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {project.images && project.images.length > 0 ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="w-14 h-14 rounded-2xl bg-sunshine/10 border border-sunshine/30 flex items-center justify-center text-sunshine mb-3 group-hover:scale-110 shadow-gold-sm transition-transform">
                        <FolderGit2 className="w-7 h-7" />
                      </div>
                      <span className="text-[11px] font-mono text-cloud-subtle uppercase tracking-wider">
                        {project.group || `Project 0${idx + 1}`}
                      </span>
                    </div>
                  )}

                  {/* Category Pill */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-graphite/90 backdrop-blur-md border border-cloud-border text-[11px] font-medium text-sunshine">
                    {project.category}
                  </span>

                  {/* Status Badge if in development */}
                  {project.status && (
                    <span className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-sunshine/20 border border-sunshine/50 text-[10px] font-mono text-sunshine">
                      {project.status}
                    </span>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-7 space-y-4">
                  <div>
                    <h3 className="font-serif text-2xl text-cloud group-hover:text-sunshine transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-sunshine/90 font-medium mt-1 leading-relaxed">
                      {project.tagline}
                    </p>
                  </div>

                  <p className="text-cloud-muted text-sm leading-relaxed line-clamp-3 font-light">
                    {project.overview}
                  </p>

                  {/* Role indicator */}
                  <div className="flex items-center gap-2 pt-1 text-xs text-cloud-subtle font-mono">
                    <Terminal className="w-3.5 h-3.5 text-sunshine shrink-0" />
                    <span className="truncate">{project.role.split("—")[0]}</span>
                  </div>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-graphite-100 border border-cloud-border text-[11px] font-medium text-cloud-muted"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="px-2 py-1 rounded-md bg-graphite-100 border border-cloud-border text-[11px] text-cloud-subtle">
                        +{project.techStack.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 mt-auto">
                <div className="pt-4 border-t border-cloud-border/70 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-sunshine text-graphite text-xs font-semibold hover:bg-sunshine-hover shadow-gold-sm transition-all"
                  >
                    <span>View Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-graphite border border-cloud-border text-xs font-medium text-cloud hover:text-sunshine hover:border-sunshine/40 transition-colors"
                    >
                      <GithubIcon className="w-3.5 h-3.5 text-sunshine" />
                      <span>Code</span>
                    </a>
                  )}
                </div>

                {/* Placeholder Notice */}
                {project.isPlaceholder && (
                  <div className="mt-3 text-[11px] text-cloud-subtle italic flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-sunshine/60 shrink-0" />
                    <span>Awaiting your project specs & repositories in Phase 5.</span>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Project Deep Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
