"use client";

import React from "react";
import {
  Mail,
  Award,
  Code2,
  GraduationCap,
  ArrowUpRight,
} from "lucide-react";
import ScrollReveal from "./animations/ScrollReveal";

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
      className="relative min-h-screen flex flex-col justify-between pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 overflow-hidden bg-[#FDF1EA] scroll-mt-28"
    >
      {/* Background Soft Warm Ambient Lighting */}
      <div className="absolute top-16 left-1/4 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#FDD9A5]/45 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] rounded-full bg-[#F2BB8E]/35 blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full flex-1 flex flex-col justify-between relative z-10">

        {/* ==================================================================== */}
        {/* TOP EDITORIAL METADATA BAR                                           */}
        {/* ==================================================================== */}
        <ScrollReveal yOffset={15} blurAmount={6}>
          <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-[#03393F]/15 text-[11px] sm:text-xs font-mono uppercase tracking-[0.22em] text-[#03393F]/85">
            <div className="flex items-center gap-2 font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#F2BB8E]" />
              <span>Software &amp; Systems Engineer</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-[#03393F]/80">
              <span className="text-[#F2BB8E] text-base leading-none">✦</span>
              <span>2026 • Class of 2028</span>
            </div>
          </div>
        </ScrollReveal>

        {/* ==================================================================== */}
        {/* HERO CANVAS: GIANT MASTHEAD + OVERLAPPING EDITORIAL PORTRAIT         */}
        {/* ==================================================================== */}
        <div className="relative w-full pt-4 sm:pt-6 lg:pt-8 flex-1 flex flex-col justify-center">

          {/* 1. Giant Masthead Name (Dominant Serif Heading Across Upper Section) */}
          <div className="w-full select-none pointer-events-none relative z-0 overflow-hidden sm:overflow-visible">
            <ScrollReveal delay={0.08} yOffset={25} blurAmount={10}>
              <h1 className="font-serif font-bold uppercase tracking-tight text-[#03393F] leading-[0.88] whitespace-nowrap text-[clamp(2.6rem,11.2vw,11.6rem)]">
                Maheen Fatima
              </h1>
            </ScrollReveal>
          </div>

          {/* 2. Content Layout: Left Details Column & Right Overlapping Cutout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end relative z-20 -mt-4 sm:-mt-8 lg:-mt-16 xl:-mt-20">

            {/* ── Left Column: Editorial Information & Tagline ── */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6 sm:space-y-7 pt-4 lg:pt-6 order-2 lg:order-1">
              
              <ScrollReveal delay={0.18} yOffset={20} blurAmount={8}>
                <div className="space-y-3.5 sm:space-y-4">
                  {/* Category Kicker */}
                  <div className="inline-flex items-center gap-2">
                    <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#F2BB8E] font-bold">
                      Creative &amp; Technical
                    </span>
                  </div>

                  {/* Role / Designation */}
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-medium text-[#03393F] uppercase tracking-tight leading-[1.08]">
                    Software &amp;<br />
                    <span className="italic text-[#03393F]">Systems Architect</span>
                  </h2>

                  {/* Horizontal Divider Line */}
                  <div className="w-12 h-[2px] bg-[#F2BB8E] my-3 rounded-full" />

                  {/* Introduction / About description from homepage */}
                  <p className="text-sm sm:text-base text-[#21585F] leading-relaxed max-w-lg font-normal">
                    Driven by curiosity, creativity, and technology. Focused on turning ideas into tangible projects, engineering practical solutions, and continuous learning.
                  </p>
                </div>
              </ScrollReveal>

              {/* Tagline Block (Replaces "ALYSSA MARLOWE" from reference image) */}
              <ScrollReveal delay={0.25} yOffset={20} blurAmount={8}>
                <div className="pt-4 border-t border-[#03393F]/15">
                  <span className="text-[10.5px] font-mono uppercase tracking-[0.25em] text-[#5D867F] block mb-1">
                    Engineering Creed
                  </span>
                  <div className="font-serif text-2xl sm:text-3xl text-[#03393F] uppercase tracking-wide leading-tight">
                    Creating With{" "}
                    <span className="italic text-[#F2BB8E] font-normal">Purpose</span>
                  </div>
                  <p className="text-xs font-mono text-[#5D867F] tracking-wider mt-1">
                    B.Tech in CSE • Raj Kumar Goel Institute of Technology (AKTU)
                  </p>
                </div>
              </ScrollReveal>

              {/* Action Buttons */}
              <ScrollReveal delay={0.32} yOffset={20} blurAmount={8}>
                <div className="flex flex-wrap items-center gap-3.5 pt-1">
                  <a
                    href="#projects"
                    onClick={(e) => handleScrollTo(e, "projects")}
                    className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-[#03393F] text-white font-semibold text-xs sm:text-sm tracking-wide shadow-md hover:bg-[#022428] transition-all cursor-pointer active:scale-95 group"
                  >
                    <Code2 className="w-4 h-4 text-[#F2BB8E]" />
                    <span>Explore My Work</span>
                    <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>

                  <a
                    href="#contact"
                    onClick={(e) => handleScrollTo(e, "contact")}
                    className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full border border-[#03393F] bg-[#F2BB8E] text-[#03393F] font-semibold text-xs sm:text-sm tracking-wide hover:bg-[#E8AE7E] transition-all cursor-pointer shadow-sm active:scale-95 group"
                  >
                    <Mail className="w-4 h-4 text-[#03393F]" />
                    <span>Get in Touch</span>
                    <ArrowUpRight className="w-4 h-4 text-[#03393F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </ScrollReveal>

            </div>

            {/* ── Right Column: Prominent Portrait Overlapping Masthead ── */}
            <div className="lg:col-span-6 flex flex-col items-center lg:items-end justify-end relative order-1 lg:order-2">
              <ScrollReveal delay={0.15} duration={0.9} yOffset={25} className="w-full flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[390px] sm:max-w-[450px] lg:max-w-[490px] aspect-[4/5] flex items-end justify-center">

                  {/* Warm Golden Glow Behind Profile */}
                  <div className="absolute inset-x-8 top-12 bottom-2 rounded-full bg-[#FDD9A5]/60 blur-[100px] pointer-events-none -z-10" />

                  {/* Profile Cutout Image of Maheen (overlapping the name typography above) */}
                  <div
                    className="relative z-20 w-full h-full flex items-end justify-center select-none"
                    style={{
                      WebkitMaskImage: "linear-gradient(to bottom, black 86%, transparent 100%)",
                      maskImage: "linear-gradient(to bottom, black 86%, transparent 100%)",
                    }}
                  >
                    <img
                      src="/images/maheen-hero.png"
                      alt="Maheen Fatima - Computer Science & Systems Engineering"
                      className="w-full h-full object-contain object-bottom drop-shadow-xl"
                    />
                  </div>

                  {/* Circular Rotating Monogram Stamp (Matching reference image bottom-right stamp) */}
                  <div className="absolute -bottom-2 right-2 sm:right-4 z-30 pointer-events-none">
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                      {/* Rotating Circular Text SVG */}
                      <svg
                        viewBox="0 0 120 120"
                        className="w-full h-full animate-spin-slow"
                        style={{ animationDuration: "25s" }}
                      >
                        <defs>
                          <path
                            id="heroCircleTextPath"
                            d="M 60, 60 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
                          />
                        </defs>
                        <text className="text-[9.5px] font-mono uppercase tracking-[0.24em] fill-[#03393F] font-semibold">
                          <textPath href="#heroCircleTextPath" startOffset="0%">
                            ✦ COMPUTER SCIENCE ✦ SYSTEMS &amp; DEV ✦
                          </textPath>
                        </text>
                      </svg>

                      {/* Central Monogram "M" Badge */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-[#FAE6D9] border border-[#F2BB8E] flex items-center justify-center shadow-sm">
                          <span className="font-serif font-bold text-lg text-[#03393F]">
                            M
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </ScrollReveal>
            </div>

          </div>

        </div>

        {/* ==================================================================== */}
        {/* THREE COMPACT ACADEMIC & MINDSET CARDS (PRESERVING EXISTING DATA)   */}
        {/* ==================================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 pt-10 sm:pt-12 border-t border-[#03393F]/15">
          
          {/* 1. Academic */}
          <ScrollReveal delay={0.35} yOffset={20} blurAmount={8}>
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAE6D9] border border-[rgba(93,134,127,0.25)] shadow-sm h-full flex flex-col justify-between hover:border-[#03393F]/50 transition-colors">
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <GraduationCap className="w-4 h-4 text-[#03393F]" />
                  <span className="text-[11px] font-mono font-bold tracking-wider text-[#03393F] uppercase">
                    01. ACADEMIC
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-[#03393F] leading-snug">
                  B.Tech in CSE
                </h3>
                <p className="text-[11px] sm:text-xs text-[#21585F] mt-1 leading-relaxed">
                  Raj Kumar Goel Institute of Technology (AKTU Lucknow) • Class of 2028
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* 2. Engineering */}
          <ScrollReveal delay={0.4} yOffset={20} blurAmount={8}>
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAE6D9] border border-[rgba(93,134,127,0.25)] shadow-sm h-full flex flex-col justify-between hover:border-[#03393F]/50 transition-colors">
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <Code2 className="w-4 h-4 text-[#03393F]" />
                  <span className="text-[11px] font-mono font-bold tracking-wider text-[#03393F] uppercase">
                    02. ENGINEERING
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-[#03393F] leading-snug">
                  Software &amp; Systems
                </h3>
                <p className="text-[11px] sm:text-xs text-[#21585F] mt-1 leading-relaxed">
                  Software development, algorithmic problem solving &amp; tangible projects.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* 3. Mindset */}
          <ScrollReveal delay={0.45} yOffset={20} blurAmount={8}>
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAE6D9] border border-[rgba(93,134,127,0.25)] shadow-sm h-full flex flex-col justify-between hover:border-[#03393F]/50 transition-colors">
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <Award className="w-4 h-4 text-[#03393F]" />
                  <span className="text-[11px] font-mono font-bold tracking-wider text-[#03393F] uppercase">
                    03. MINDSET
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-[#03393F] leading-snug">
                  Learn by Doing
                </h3>
                <p className="text-[11px] sm:text-xs text-[#21585F] mt-1 leading-relaxed">
                  Curiosity, creativity, team initiative, and real-world impact.
                </p>
              </div>
            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}
