"use client";

import React, { useEffect } from "react";
import { X, ExternalLink, Code, CheckCircle, Target, Lightbulb, UserCheck, Layers } from "lucide-react";
import { Project } from "@/types/portfolio";
import { GithubIcon } from "./Icons";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-4xl bg-graphite-900 border border-cloud-border rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-cloud-border bg-graphite">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-sunshine font-semibold">
                {project.category}
              </span>
              <span className="text-xs text-cloud-subtle">• Project Deep Dive</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-cloud font-normal mt-1">
              {project.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-cloud-muted hover:text-cloud hover:bg-graphite-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Project Screenshot / Visual Preview Banner */}
          <div className="w-full aspect-video bg-graphite-950 border border-cloud-border rounded-xl overflow-hidden flex flex-col items-center justify-center relative p-8 text-center group">
            {project.images.length > 0 ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center max-w-md">
                <div className="w-16 h-16 rounded-2xl bg-sunshine/10 border border-sunshine/30 flex items-center justify-center text-sunshine mb-4 shadow-gold-sm">
                  <Layers className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-lg text-cloud mb-1">
                  Project Screenshot Canvas
                </h4>
                <p className="text-xs text-cloud-muted leading-relaxed">
                  High-fidelity screenshot showcase ready for interface images, system architecture diagrams, or workflow captures.
                </p>
                <div className="mt-3 text-[11px] text-sunshine/80 font-mono">
                  [Screenshots will be uploaded in Phase 4]
                </div>
              </div>
            )}
          </div>

          {/* Tagline & Overview */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-sunshine">
              Project Overview
            </h4>
            <p className="text-cloud text-base sm:text-lg leading-relaxed font-light">
              {project.overview}
            </p>
          </div>

          {/* Problem Statement & Proposed Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Problem Statement */}
            <div className="p-6 rounded-xl bg-graphite border border-cloud-border space-y-3">
              <div className="flex items-center gap-2 text-sunshine">
                <Target className="w-4 h-4" />
                <h5 className="text-xs font-bold uppercase tracking-wider">Problem Statement</h5>
              </div>
              <p className="text-sm text-cloud-muted leading-relaxed">
                {project.problemStatement}
              </p>
            </div>

            {/* Proposed Solution */}
            <div className="p-6 rounded-xl bg-graphite border border-cloud-border space-y-3">
              <div className="flex items-center gap-2 text-sunshine">
                <Lightbulb className="w-4 h-4" />
                <h5 className="text-xs font-bold uppercase tracking-wider">Proposed Solution</h5>
              </div>
              <p className="text-sm text-cloud-muted leading-relaxed">
                {project.proposedSolution}
              </p>
            </div>

          </div>

          {/* Key Features */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-sunshine">
              Key Features & Architectural Highlights
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.keyFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-graphite border border-cloud-border/70 text-sm text-cloud-muted"
                >
                  <CheckCircle className="w-4 h-4 text-sunshine shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Role & Personal Contribution */}
          <div className="p-5 rounded-xl bg-graphite border border-cloud-border space-y-2">
            <div className="flex items-center gap-2 text-sunshine">
              <UserCheck className="w-4 h-4" />
              <h5 className="text-xs font-bold uppercase tracking-wider">
                My Contribution & Role
              </h5>
            </div>
            <p className="text-sm text-cloud-muted leading-relaxed font-light">
              {project.role}
            </p>
          </div>

          {/* Technology Stack Tags */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-sunshine flex items-center gap-2">
              <Code className="w-4 h-4" />
              <span>Technology Stack</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3.5 py-1.5 rounded-lg bg-graphite border border-cloud-border text-xs font-medium text-cloud"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer with Actions */}
        <div className="p-6 border-t border-cloud-border bg-graphite flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs text-cloud-subtle">
            All code repositories and deployments verified for technical integrity.
          </span>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-cloud-border text-xs font-semibold text-cloud hover:border-sunshine hover:text-sunshine transition-all"
              >
                <GithubIcon className="w-4 h-4 text-sunshine" />
                <span>GitHub Repository</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sunshine text-graphite text-xs font-semibold hover:bg-sunshine-hover shadow-gold-sm transition-all"
              >
                <span>Live Deployment</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-cloud-border text-xs font-medium text-cloud hover:border-cloud-muted transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
