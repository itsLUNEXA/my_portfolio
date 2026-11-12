"use client";

import React from "react";
import { ArrowDown, Sparkles, FolderGit2, Mail, Award, Code2, GraduationCap } from "lucide-react";

export default function Hero() {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-28 pb-16 lg:py-0 overflow-hidden bg-graphite"
    >
      {/* Background Cinematic Golden Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-sunshine/10 blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[420px] h-[420px] rounded-full bg-sunshine/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT SIDE: Portrait Section (approx 40-45% width -> 5 columns on lg) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-md aspect-[4/5] flex items-center justify-center">
              
              {/* Subtle Warm Golden Spotlight Lighting Behind Portrait */}
              <div className="absolute inset-0 -m-6 rounded-3xl bg-radial-gradient from-sunshine/25 via-sunshine/5 to-transparent blur-2xl" />
              <div className="absolute w-72 h-72 rounded-full bg-sunshine/20 blur-3xl animate-pulse -z-10" />

              {/* Portrait Frame & Blending Container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-cloud-border bg-gradient-to-b from-graphite-100 via-graphite to-graphite-900 shadow-2xl flex flex-col items-center justify-end group">
                
                {/* Silhouette / Realistic Photographic Placeholder Figure */}
                <div className="relative w-full h-full flex flex-col items-center justify-center p-8 text-center">
                  
                  {/* Subtle Golden Halo behind subject head */}
                  <div className="w-40 h-40 rounded-full bg-sunshine/15 blur-xl absolute top-12" />
                  
                  {/* Stylized Minimal Photographic Silhouette */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-28 h-28 rounded-full border-2 border-sunshine/60 bg-graphite-200/90 flex items-center justify-center shadow-gold-sm mb-4">
                      <span className="font-serif text-3xl font-bold text-sunshine tracking-wider">MF</span>
                    </div>

                    <div className="w-56 h-28 bg-gradient-to-t from-graphite-950 via-graphite-200 to-graphite-100/50 rounded-t-full border-t border-sunshine/30 flex items-center justify-center">
                      <div className="w-40 h-20 rounded-t-full bg-graphite-900 border-t border-cloud-border/40" />
                    </div>
                  </div>

                  {/* Gradient Blend to Deep Graphite at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-graphite via-graphite/90 to-transparent pointer-events-none z-20" />

                  {/* Editorial Tag Overlay */}
                  <div className="relative z-30 mt-auto pt-6 pb-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-graphite-900/90 border border-sunshine/40 text-xs text-cloud-muted backdrop-blur-md">
                      <Sparkles className="w-3.5 h-3.5 text-sunshine" />
                      <span>Maheen Fatima</span>
                    </div>
                    <p className="text-[11px] text-cloud-subtle mt-2 max-w-xs">
                      B.Tech in Computer Science & Engineering • 3rd Year
                    </p>
                  </div>
                </div>

                {/* Subtle outer corner accents */}
                <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-sunshine/50" />
                <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-sunshine/50" />
                <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-sunshine/50 z-30" />
                <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-sunshine/50 z-30" />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Content Section (approx 55-60% width -> 7 columns on lg) */}
          <div className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-2 space-y-7">
            
            {/* Small Introductory Label */}
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-graphite-100 border border-sunshine/30 text-xs font-semibold tracking-wider uppercase text-sunshine">
                <span className="w-1.5 h-1.5 rounded-full bg-sunshine animate-ping" />
                Computer Science & Engineering • 3rd Year
              </span>
              <span className="text-xs text-cloud-subtle hidden sm:inline-block">
                | Portfolio
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-cloud leading-[1.15]">
                Creating With{" "}
                <span className="italic font-medium text-sunshine underline decoration-sunshine/40 decoration-wavy decoration-1 underline-offset-8">
                  Purpose
                </span>
              </h1>
            </div>

            {/* Short Professional Introduction */}
            <p className="text-cloud-muted text-base sm:text-lg leading-relaxed max-w-2xl font-light">
              Driven by curiosity, creativity, and technology. Focused on turning ideas into tangible projects, engineering practical solutions, and continuous learning.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                onClick={(e) => handleScrollTo(e, "projects")}
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-sunshine text-graphite font-semibold text-sm tracking-wide shadow-gold-sm hover:bg-sunshine-hover hover:shadow-gold-md transition-all duration-200"
              >
                <FolderGit2 className="w-4 h-4 text-graphite" />
                <span>Explore My Work</span>
              </a>

              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, "contact")}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-cloud-border bg-cloud-surface text-cloud font-medium text-sm tracking-wide hover:border-sunshine/70 hover:text-sunshine transition-all duration-200"
              >
                <Mail className="w-4 h-4 text-sunshine" />
                <span>Get in Touch</span>
              </a>
            </div>

            {/* Three Compact Professional Highlight Areas */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-cloud-border">
              
              <div className="p-4 rounded-xl bg-graphite-100/60 border border-cloud-border hover:border-sunshine/40 transition-colors">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="p-1.5 rounded-lg bg-sunshine/10 text-sunshine">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-sunshine tracking-wider uppercase">
                    01. Academic
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-cloud">B.Tech in CSE</h3>
                <p className="text-xs text-cloud-muted mt-1 leading-snug">
                  Raj Kumar Goel Institute of Technology (AKTU Lucknow) • Class of 2028
                </p>
              </div>

              <div className="p-4 rounded-xl bg-graphite-100/60 border border-cloud-border hover:border-sunshine/40 transition-colors">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="p-1.5 rounded-lg bg-sunshine/10 text-sunshine">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-sunshine tracking-wider uppercase">
                    02. Engineering
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-cloud">Software & Systems</h3>
                <p className="text-xs text-cloud-muted mt-1 leading-snug">
                  Software development, algorithmic problem solving & tangible projects.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-graphite-100/60 border border-cloud-border hover:border-sunshine/40 transition-colors">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="p-1.5 rounded-lg bg-sunshine/10 text-sunshine">
                    <Award className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-sunshine tracking-wider uppercase">
                    03. Mindset
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-cloud">Learn by Doing</h3>
                <p className="text-xs text-cloud-muted mt-1 leading-snug">
                  Curiosity, creativity, team initiative, and real-world impact.
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 hidden lg:flex justify-center">
          <a
            href="#about"
            onClick={(e) => handleScrollTo(e, "about")}
            className="flex flex-col items-center gap-2 text-cloud-subtle hover:text-sunshine transition-colors group"
            aria-label="Scroll to About section"
          >
            <span className="text-xs font-medium tracking-widest uppercase">Scroll Down</span>
            <ArrowDown className="w-4 h-4 animate-bounce text-sunshine" />
          </a>
        </div>
      </div>
    </section>
  );
}
