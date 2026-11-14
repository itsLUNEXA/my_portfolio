"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Terminal, Globe, Server, Database, GitBranch, BookOpen,
  CheckCircle2, ChevronLeft, ChevronRight, ArrowRight,
} from "lucide-react";
import { SkillCategory } from "@/types/portfolio";
import ScrollReveal from "./animations/ScrollReveal";
import WordReveal from "./animations/WordReveal";

interface SkillsSectionProps {
  categories: SkillCategory[];
}

/* ─── per-category metadata ───────────────────────────────────────── */
const META: Record<string, {
  icon: React.ReactNode;
  shortDesc: string;
  illustration: React.ReactNode;
}> = {
  "Programming Languages": {
    icon: <Terminal className="w-5 h-5" />,
    shortDesc: "Core languages forming the foundation of algorithmic thinking and software construction.",
    illustration: (
      <svg viewBox="0 0 320 220" fill="none" className="w-full h-full" aria-hidden>
        {/* terminal window */}
        <rect x="20" y="20" width="280" height="180" rx="12" fill="#FAE6D9" stroke="rgba(3,57,63,0.15)" strokeWidth="1.5"/>
        <rect x="20" y="20" width="280" height="34" rx="12" fill="#F2BB8E" opacity=".8"/>
        <rect x="20" y="42" width="280" height="12" fill="#F2BB8E" opacity=".8"/>
        <circle cx="40" cy="37" r="5" fill="#03393F" opacity=".35"/>
        <circle cx="58" cy="37" r="5" fill="#FDD9A5" opacity=".9"/>
        <circle cx="76" cy="37" r="5" fill="#03393F" opacity=".2"/>
        {/* code lines */}
        {[0,1,2,3,4,5].map((i) => (
          <rect key={i} x="36" y={72 + i * 18} width={[120,90,140,70,110,80][i]} height="7" rx="3.5"
            fill="#03393F" opacity={0.08 + (i % 3) * 0.06}/>
        ))}
        <rect x="36" y="72" width="38" height="7" rx="3.5" fill="#03393F" opacity=".35"/>
        <rect x="80" y="72" width="22" height="7" rx="3.5" fill="#F2BB8E" opacity=".8"/>
        <rect x="36" y="90" width="18" height="7" rx="3.5" fill="#03393F" opacity=".25"/>
        <rect x="60" y="90" width="60" height="7" rx="3.5" fill="#03393F" opacity=".12"/>
        <rect x="36" y="108" width="80" height="7" rx="3.5" fill="#F2BB8E" opacity=".6"/>
        <rect x="36" y="126" width="45" height="7" rx="3.5" fill="#03393F" opacity=".2"/>
        <rect x="36" y="144" width="100" height="7" rx="3.5" fill="#03393F" opacity=".1"/>
        <rect x="36" y="162" width="60" height="7" rx="3.5" fill="#F2BB8E" opacity=".4"/>
        {/* blinking cursor */}
        <rect x="36" y="162" width="8" height="7" rx="1" fill="#03393F" opacity=".6"/>
      </svg>
    ),
  },
  "Web & Frontend Development": {
    icon: <Globe className="w-5 h-5" />,
    shortDesc: "Building responsive, standards-compliant web interfaces with modern HTML, CSS & JavaScript.",
    illustration: (
      <svg viewBox="0 0 320 220" fill="none" className="w-full h-full" aria-hidden>
        {/* browser chrome */}
        <rect x="20" y="20" width="280" height="180" rx="12" fill="#FAE6D9" stroke="rgba(3,57,63,0.15)" strokeWidth="1.5"/>
        <rect x="20" y="20" width="280" height="38" rx="12" fill="#F2BB8E" opacity=".8"/>
        <rect x="20" y="46" width="280" height="12" fill="#F2BB8E" opacity=".8"/>
        <circle cx="40" cy="39" r="5" fill="#03393F" opacity=".3"/>
        <circle cx="56" cy="39" r="5" fill="#FDD9A5" opacity=".9"/>
        <circle cx="72" cy="39" r="5" fill="#03393F" opacity=".15"/>
        <rect x="90" y="30" width="150" height="17" rx="8" fill="white" opacity=".6"/>
        {/* page content */}
        <rect x="36" y="70" width="110" height="10" rx="5" fill="#03393F" opacity=".25"/>
        <rect x="36" y="88" width="240" height="6" rx="3" fill="#03393F" opacity=".1"/>
        <rect x="36" y="100" width="200" height="6" rx="3" fill="#03393F" opacity=".08"/>
        {/* card */}
        <rect x="36" y="116" width="80" height="60" rx="8" fill="#F2BB8E" opacity=".35"/>
        <rect x="128" y="116" width="80" height="60" rx="8" fill="#FDD9A5" opacity=".6"/>
        <rect x="220" y="116" width="56" height="60" rx="8" fill="#03393F" opacity=".08"/>
        {/* tag badges */}
        <rect x="36" y="184" width="34" height="10" rx="5" fill="#03393F" opacity=".2"/>
        <rect x="76" y="184" width="28" height="10" rx="5" fill="#F2BB8E" opacity=".5"/>
        <rect x="110" y="184" width="44" height="10" rx="5" fill="#03393F" opacity=".12"/>
      </svg>
    ),
  },
  "Backend Development": {
    icon: <Server className="w-5 h-5" />,
    shortDesc: "Server-side logic, RESTful API design and Node.js runtime fundamentals.",
    illustration: (
      <svg viewBox="0 0 320 220" fill="none" className="w-full h-full" aria-hidden>
        {/* server rack */}
        {[0,1,2].map((i) => (
          <g key={i}>
            <rect x="60" y={40 + i * 52} width="200" height="40" rx="8"
              fill={i === 1 ? "#F2BB8E" : "#FAE6D9"}
              stroke="rgba(3,57,63,0.18)" strokeWidth="1.2"/>
            <circle cx="84" cy={60 + i * 52} r="5" fill="#03393F" opacity={0.5 - i * 0.1}/>
            <rect x="96" y={56 + i * 52} width="80" height="6" rx="3" fill="#03393F" opacity=".1"/>
            <rect x="96" y={66 + i * 52} width="52" height="4" rx="2" fill="#F2BB8E" opacity=".5"/>
            <circle cx="230" cy={60 + i * 52} r="4" fill="#FDD9A5" opacity={.8}/>
            <circle cx="244" cy={60 + i * 52} r="4" fill="#03393F" opacity=".2"/>
          </g>
        ))}
        {/* connecting lines */}
        <line x1="160" y1="196" x2="160" y2="184" stroke="#03393F" strokeWidth="1.5" opacity=".2" strokeDasharray="3 3"/>
        <circle cx="160" cy="200" r="6" fill="#03393F" opacity=".15"/>
      </svg>
    ),
  },
  "Database Management": {
    icon: <Database className="w-5 h-5" />,
    shortDesc: "Relational database design, SQL querying and schema architecture with MySQL & PostgreSQL.",
    illustration: (
      <svg viewBox="0 0 320 220" fill="none" className="w-full h-full" aria-hidden>
        {/* db cylinders */}
        {[0,1,2].map((i) => (
          <g key={i} transform={`translate(${60 + i * 72}, 0)`}>
            <ellipse cx="40" cy="58" rx="34" ry="10" fill={["#F2BB8E","#FDD9A5","#FAE6D9"][i]} opacity=".8"/>
            <rect x="6" y="58" width="68" height="90" fill={["#FAE6D9","#F2BB8E","#FDF1EA"][i]}
              stroke="rgba(3,57,63,0.15)" strokeWidth="1.2"/>
            <ellipse cx="40" cy="148" rx="34" ry="10" fill={["#F2BB8E","#FDD9A5","#FAE6D9"][i]} opacity=".6"/>
            <ellipse cx="40" cy="88" rx="34" ry="10" fill={["#FDD9A5","#F2BB8E","#FDD9A5"][i]} opacity=".35"/>
            <ellipse cx="40" cy="118" rx="34" ry="10" fill="#03393F" opacity=".06"/>
          </g>
        ))}
      </svg>
    ),
  },
  "Developer Tools & Version Control": {
    icon: <GitBranch className="w-5 h-5" />,
    shortDesc: "Git-based version control workflows, GitHub collaboration and VS Code development environment.",
    illustration: (
      <svg viewBox="0 0 320 220" fill="none" className="w-full h-full" aria-hidden>
        {/* git branch graph */}
        {/* main branch */}
        <circle cx="80" cy="110" r="10" fill="#03393F" opacity=".7"/>
        <circle cx="140" cy="110" r="10" fill="#03393F" opacity=".5"/>
        <circle cx="200" cy="110" r="10" fill="#03393F" opacity=".35"/>
        <circle cx="260" cy="110" r="10" fill="#03393F" opacity=".6"/>
        <line x1="90" y1="110" x2="130" y2="110" stroke="#03393F" strokeWidth="2" opacity=".3"/>
        <line x1="150" y1="110" x2="190" y2="110" stroke="#03393F" strokeWidth="2" opacity=".3"/>
        <line x1="210" y1="110" x2="250" y2="110" stroke="#03393F" strokeWidth="2" opacity=".3"/>
        {/* feature branch */}
        <circle cx="170" cy="60" r="9" fill="#F2BB8E" opacity=".9"/>
        <path d="M140 100 Q155 60 170 60" stroke="#F2BB8E" strokeWidth="2" fill="none" opacity=".7"/>
        <path d="M170 60 Q185 60 200 100" stroke="#F2BB8E" strokeWidth="2" fill="none" opacity=".7"/>
        {/* hotfix branch */}
        <circle cx="230" cy="155" r="8" fill="#FDD9A5" opacity=".9"/>
        <path d="M200 118 Q215 155 230 155" stroke="#FDD9A5" strokeWidth="1.5" fill="none" opacity=".8"/>
        <path d="M230 155 Q245 155 260 118" stroke="#FDD9A5" strokeWidth="1.5" fill="none" opacity=".8"/>
        {/* labels */}
        <rect x="62" y="128" width="36" height="10" rx="5" fill="#03393F" opacity=".12"/>
        <rect x="152" y="128" width="36" height="10" rx="5" fill="#03393F" opacity=".12"/>
        <rect x="150" y="38" width="40" height="10" rx="5" fill="#F2BB8E" opacity=".5"/>
      </svg>
    ),
  },
  "Core Computer Science Fundamentals": {
    icon: <BookOpen className="w-5 h-5" />,
    shortDesc: "Algorithms, data structures and OOP principles forming the theoretical backbone of CS.",
    illustration: (
      <svg viewBox="0 0 320 220" fill="none" className="w-full h-full" aria-hidden>
        {/* binary tree */}
        {/* root */}
        <circle cx="160" cy="38" r="14" fill="#03393F" opacity=".55"/>
        {/* level 1 */}
        <circle cx="96" cy="90" r="12" fill="#03393F" opacity=".35"/>
        <circle cx="224" cy="90" r="12" fill="#F2BB8E" opacity=".8"/>
        <line x1="150" y1="48" x2="106" y2="80" stroke="#03393F" strokeWidth="1.5" opacity=".25"/>
        <line x1="170" y1="48" x2="214" y2="80" stroke="#03393F" strokeWidth="1.5" opacity=".25"/>
        {/* level 2 */}
        <circle cx="62" cy="142" r="10" fill="#FAE6D9" opacity=".9"/>
        <circle cx="130" cy="142" r="10" fill="#FAE6D9" opacity=".7"/>
        <circle cx="192" cy="142" r="10" fill="#F2BB8E" opacity=".5"/>
        <circle cx="258" cy="142" r="10" fill="#03393F" opacity=".2"/>
        <line x1="87" y1="100" x2="70" y2="134" stroke="#03393F" strokeWidth="1.2" opacity=".2"/>
        <line x1="103" y1="100" x2="122" y2="134" stroke="#03393F" strokeWidth="1.2" opacity=".2"/>
        <line x1="216" y1="100" x2="200" y2="134" stroke="#F2BB8E" strokeWidth="1.2" opacity=".5"/>
        <line x1="232" y1="100" x2="250" y2="134" stroke="#F2BB8E" strokeWidth="1.2" opacity=".4"/>
        {/* level 3 leaves */}
        {[44,80,114,148,174,210,244,272].map((x, i) => (
          <circle key={i} cx={x} cy="186" r="7"
            fill={i % 2 === 0 ? "#FAE6D9" : "#F2BB8E"} opacity=".6"
            stroke="rgba(3,57,63,0.2)" strokeWidth="1"/>
        ))}
        <line x1="56" y1="151" x2="50" y2="180" stroke="#03393F" strokeWidth="1" opacity=".15"/>
        <line x1="66" y1="151" x2="82" y2="180" stroke="#03393F" strokeWidth="1" opacity=".15"/>
        <line x1="124" y1="151" x2="116" y2="180" stroke="#03393F" strokeWidth="1" opacity=".15"/>
        <line x1="136" y1="151" x2="150" y2="180" stroke="#03393F" strokeWidth="1" opacity=".15"/>
      </svg>
    ),
  },
};

function getFallbackMeta(categoryName: string) {
  return META[categoryName] ?? {
    icon: <Terminal className="w-5 h-5" />,
    shortDesc: "A focused technical discipline contributing to full-stack engineering expertise.",
    illustration: null,
  };
}

export default function SkillsSection({ categories }: SkillsSectionProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const navRef = useRef<HTMLDivElement>(null);

  const total = categories.length;
  const active = categories[activeIdx];
  const meta = getFallbackMeta(active.category);

  /* smooth switch with fade+slide */
  const switchTo = (idx: number, dir: "left" | "right" = "right") => {
    if (idx === activeIdx || animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setActiveIdx(idx);
      setAnimating(false);
    }, 220);
  };

  const prev = () => switchTo((activeIdx - 1 + total) % total, "left");
  const next = () => switchTo((activeIdx + 1) % total, "right");

  /* scroll active tab into view */
  useEffect(() => {
    if (!navRef.current) return;
    const btn = navRef.current.children[activeIdx] as HTMLElement;
    if (btn) btn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeIdx]);

  return (
    <section
      id="skills"
      className="py-20 bg-graphite border-t border-cloud-border relative scroll-mt-24 sm:scroll-mt-28 overflow-hidden"
    >
      {/* soft ambient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-sky-subtle opacity-40 blur-3xl" />
        <div className="absolute bottom-0 -left-24 w-80 h-80 rounded-full bg-sky-subtle opacity-30 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* ── Section Header ── */}
        <ScrollReveal yOffset={24} blurAmount={8}>
          <div className="mb-10">
            <div className="flex items-center gap-2 text-sunshine text-xs font-semibold tracking-widest uppercase mb-3">
              <span className="w-7 h-px bg-sunshine" />
              <span>Section 02</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <WordReveal
                as="h2"
                text="My Skills"
                highlightWords={["Skills"]}
                className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cloud font-normal"
                stagger={0.1}
              />
              <p className="text-cloud-subtle text-sm max-w-xs sm:text-right leading-relaxed">
                Technical disciplines cultivated through coursework and hands-on project engineering.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Category Nav Bar ── */}
        <ScrollReveal delay={0.1} yOffset={16} blurAmount={6}>
          <div className="relative mb-8">
            <div
              ref={navRef}
              className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none"
              style={{ scrollbarWidth: "none" }}
            >
              {categories.map((cat, idx) => {
                const m = getFallbackMeta(cat.category);
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={cat.category}
                    type="button"
                    onClick={() => switchTo(idx, idx > activeIdx ? "right" : "left")}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium
                      whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0
                      ${isActive
                        ? "bg-sunshine text-white shadow-gold-sm"
                        : "bg-graphite-100 text-cloud-muted border border-cloud-border hover:border-sunshine/40 hover:text-cloud"
                      }
                    `}
                  >
                    <span className={isActive ? "text-white" : "text-sunshine opacity-70"}>
                      {m.icon}
                    </span>
                    <span>{cat.category}</span>
                    {isActive && (
                      <span className="ml-1 w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[9px] font-bold">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            {/* fade edges */}
            <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-graphite to-transparent" />
          </div>
        </ScrollReveal>

        {/* ── Main Content Panel ── */}
        <ScrollReveal delay={0.15} yOffset={32} blurAmount={10}>
          <div
            className="relative bg-white border border-cloud-border rounded-2xl overflow-hidden shadow-gold-sm"
            style={{ minHeight: 320 }}
          >
            {/* animated inner wrapper */}
            <div
              className="transition-all duration-[220ms] ease-out"
              style={{
                opacity: animating ? 0 : 1,
                transform: animating
                  ? `translateX(${direction === "right" ? "-18px" : "18px"})`
                  : "translateX(0)",
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px]">

                {/* ── Left column ── */}
                <div className="p-7 sm:p-9 flex flex-col justify-between gap-6">
                  <div>
                    {/* category number + icon header */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-sky-subtle border border-sky-border text-sunshine">
                        {meta.icon}
                      </div>
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-widest text-cloud-subtle">
                          Category {String(activeIdx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                        </p>
                        <h3 className="text-lg sm:text-xl font-semibold text-cloud leading-tight">
                          {active.category}
                        </h3>
                      </div>
                    </div>

                    {/* short description */}
                    <p className="text-sm text-cloud-subtle leading-relaxed mb-6 max-w-md">
                      {meta.shortDesc}
                    </p>

                    {/* skill badges */}
                    <div className="flex flex-wrap gap-2">
                      {active.skills.map((skill) => (
                        <span
                          key={skill.name}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                            bg-graphite-100 border border-cloud-border
                            text-xs text-cloud-muted font-medium
                            hover:border-sunshine/40 hover:bg-sky-subtle hover:text-cloud
                            transition-all duration-150 select-none"
                        >
                          <CheckCircle2 className="w-3 h-3 text-sunshine/60 shrink-0" />
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* ── Bottom bar: proficiency + navigation ── */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-cloud-border">

                    {/* proficiency indicator */}
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-cloud-subtle whitespace-nowrap">
                        Proficiency Index
                      </span>
                      <div className="flex items-end gap-0.5 h-5">
                        {[0.4, 0.65, 0.5, 0.85, 0.7, 0.9, 0.6].map((h, i) => (
                          <div
                            key={i}
                            className="w-1.5 rounded-t-sm transition-all duration-500"
                            style={{
                              height: `${Math.round(h * 100)}%`,
                              backgroundColor: i % 2 === 0 ? "#03393F" : "#F2BB8E",
                              opacity: 0.8 + i * 0.03,
                              transitionDelay: `${i * 40}ms`,
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* prev / next nav */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={prev}
                        className="w-8 h-8 rounded-full border border-cloud-border flex items-center justify-center
                          text-cloud-muted hover:border-sunshine hover:text-sunshine hover:bg-sky-subtle
                          transition-all duration-150 cursor-pointer"
                        aria-label="Previous category"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      {/* dot indicators */}
                      <div className="flex items-center gap-1.5 px-2">
                        {categories.map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => switchTo(i, i > activeIdx ? "right" : "left")}
                            className={`rounded-full transition-all duration-200 cursor-pointer ${
                              i === activeIdx
                                ? "w-4 h-1.5 bg-sunshine"
                                : "w-1.5 h-1.5 bg-cloud-border hover:bg-sunshine/40"
                            }`}
                            aria-label={`Go to category ${i + 1}`}
                          />
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={next}
                        className="w-8 h-8 rounded-full border border-cloud-border flex items-center justify-center
                          text-cloud-muted hover:border-sunshine hover:text-sunshine hover:bg-sky-subtle
                          transition-all duration-150 cursor-pointer"
                        aria-label="Next category"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* ── Right column: illustration ── */}
                <div className="hidden lg:flex items-center justify-center bg-graphite-100/60 border-l border-cloud-border p-6">
                  <div className="w-full max-w-[260px] opacity-90">
                    {meta.illustration}
                  </div>
                </div>

              </div>
            </div>

            {/* royal blue left accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-sunshine via-sky-dark to-transparent opacity-60 rounded-l-2xl" />
          </div>
        </ScrollReveal>

        {/* ── Continuous Learning banner (Golden Yellow featured highlight) ── */}
        <ScrollReveal delay={0.25} yOffset={20} blurAmount={8}>
          <div className="mt-6 px-5 py-4 rounded-xl bg-[#FDD9A5] border border-[#F2BB8E] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#03393F] shrink-0 animate-ping" />
              <p className="text-xs text-[#03393F] leading-relaxed">
                <span className="text-[#03393F] font-bold uppercase tracking-wider">Continuous Learning: </span>
                Actively building hands-on projects, studying core algorithmic problem solving,
                and expanding into modern full-stack systems.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#03393F]/80 uppercase tracking-wider whitespace-nowrap">
              <span>CSE Curriculum &amp; Practical Dev</span>
              <ArrowRight className="w-3 h-3 text-[#03393F]" />
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
