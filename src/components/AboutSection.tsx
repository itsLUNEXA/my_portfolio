"use client";

import React from "react";
import { GraduationCap, Building2, Calendar, Award, ExternalLink, Phone, Mail } from "lucide-react";
import { AboutDetails } from "@/types/portfolio";
import { GithubIcon, LinkedinIcon } from "./Icons";
import WordReveal from "./animations/WordReveal";
import ScrollReveal from "./animations/ScrollReveal";

interface AboutSectionProps {
  data: AboutDetails;
}

export default function AboutSection({ data }: AboutSectionProps) {
  return (
    <section id="about" className="py-24 bg-graphite-900 border-t border-cloud-border relative scroll-mt-24 sm:scroll-mt-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="flex items-center gap-2 text-sunshine text-xs font-semibold tracking-widest uppercase mb-3">
              <span className="w-8 h-[1px] bg-sunshine" />
              <span>Section 01</span>
            </div>
            <WordReveal
              as="h2"
              text="About Me"
              highlightWords={["Me"]}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cloud font-normal"
              stagger={0.1}
            />
          </div>
          <ScrollReveal delay={0.2} yOffset={20} blurAmount={8}>
            <p className="text-cloud-muted text-sm max-w-md">
              Academic background, technical focus, and professional commitment to building meaningful software.
            </p>
          </ScrollReveal>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Academic Credentials Card (5 columns) */}
          <div className="lg:col-span-5">
            <ScrollReveal delay={0.1} duration={0.9} yOffset={40} blurAmount={12}>
              <div className="bg-graphite-100/70 border border-cloud-border rounded-2xl p-8 relative overflow-hidden group hover:border-sunshine/40 transition-colors shadow-lg">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sunshine/5 rounded-full blur-2xl pointer-events-none" />
                
                <h3 className="font-serif text-2xl text-cloud mb-6 flex items-center justify-between">
                  <span>Academic Profile</span>
                  <span className="float" style={{ "--d": "4s" } as React.CSSProperties}>
                    <GraduationCap className="w-5 h-5 text-sunshine" />
                  </span>
                </h3>

                <div className="space-y-5">
                  
                  {/* Full Name */}
                  <div className="border-b border-cloud-border/60 pb-3.5">
                    <span className="text-xs uppercase tracking-wider text-cloud-subtle block mb-1">
                      Full Name
                    </span>
                    <p className="text-cloud font-semibold text-lg">{data.fullName}</p>
                  </div>

                  {/* Course / Degree */}
                  <div className="border-b border-cloud-border/60 pb-3.5">
                    <span className="text-xs uppercase tracking-wider text-cloud-subtle block mb-1">
                      Course / Degree
                    </span>
                    <p className="text-cloud font-medium text-sm sm:text-base">
                      {data.degree}
                    </p>
                  </div>

                  {/* College */}
                  {data.college && (
                    <div className="border-b border-cloud-border/60 pb-3.5">
                      <span className="text-xs uppercase tracking-wider text-cloud-subtle block mb-1">
                        Institution / College
                      </span>
                      <div className="flex items-start gap-2">
                        <Building2 className="w-4 h-4 text-sunshine shrink-0 mt-0.5" />
                        <p className="text-cloud font-medium text-sm leading-snug">
                          {data.college}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Affiliating University */}
                  <div className="border-b border-cloud-border/60 pb-3.5">
                    <span className="text-xs uppercase tracking-wider text-cloud-subtle block mb-1">
                      Affiliating University
                    </span>
                    <div className="flex items-start gap-2">
                      <Building2 className="w-4 h-4 text-sunshine shrink-0 mt-0.5" />
                      <p className="text-cloud font-medium text-sm leading-snug">
                        {data.university}
                      </p>
                    </div>
                  </div>

                  {/* Academic Year & Graduation */}
                  <div className="grid grid-cols-2 gap-4 pb-1">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-cloud-subtle block mb-1">
                        Current Year
                      </span>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-sunshine shrink-0" />
                        <p className="text-sm font-medium text-cloud">
                          {data.currentYear}
                        </p>
                      </div>
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider text-cloud-subtle block mb-1">
                        Graduation Year
                      </span>
                      <div className="flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-sunshine shrink-0" />
                        <p className="text-sm font-medium text-sunshine font-semibold">
                          {data.graduationYear}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Social & Contact Links */}
                <div className="pt-6 mt-6 border-t border-cloud-border space-y-2.5">
                  <div className="grid grid-cols-2 gap-2.5">
                    <a
                      href={data.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-sunshine flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-graphite border border-cloud-border text-xs font-semibold text-cloud hover:text-sunshine hover:border-sunshine/50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <LinkedinIcon className="w-4 h-4 text-sunshine" />
                        <span>LinkedIn</span>
                      </div>
                      <ExternalLink className="w-3 h-3 text-cloud-subtle" />
                    </a>

                    <a
                      href={data.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-sunshine flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-graphite border border-cloud-border text-xs font-semibold text-cloud hover:text-sunshine hover:border-sunshine/50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <GithubIcon className="w-4 h-4 text-sunshine" />
                        <span>GitHub</span>
                      </div>
                      <ExternalLink className="w-3 h-3 text-cloud-subtle" />
                    </a>
                  </div>

                  {data.phone && (
                    <div className="flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-graphite/60 border border-cloud-border text-xs text-cloud-muted">
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-sunshine" />
                        <span>{data.phone}</span>
                      </div>
                      <span className="text-[10px] text-cloud-subtle uppercase">Phone</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-graphite/60 border border-cloud-border text-xs text-cloud-muted">
                    <div className="flex items-center gap-2 truncate">
                      <Mail className="w-3.5 h-3.5 text-sunshine shrink-0" />
                      <span className="truncate">{data.email}</span>
                    </div>
                    <span className="text-[10px] text-cloud-subtle uppercase shrink-0">Email</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Editorial Professional Introduction (7 columns) */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal delay={0.2} duration={0.9} yOffset={40} blurAmount={12}>
              <div className="p-8 sm:p-10 rounded-2xl bg-graphite border border-cloud-border/70 space-y-6 shadow-xl">
                <h3 className="font-serif text-2xl sm:text-3xl text-cloud font-normal leading-snug">
                  Turning ideas into tangible reality through engineering discipline, continuous curiosity, and{" "}
                  <span className="text-sunshine italic font-medium">creative problem solving</span>.
                </h3>

                <div className="space-y-5 text-cloud-muted leading-relaxed font-light text-base sm:text-lg">
                  {data.bioParagraphs.map((para, idx) => (
                    <p key={idx} className="leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Core Values / Focus Pillars with Staggered Entrance */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ScrollReveal delay={0.3} yOffset={30} blurAmount={10}>
                <div className="p-5 rounded-xl bg-graphite-100/40 border border-cloud-border hover:border-sunshine/40 transition-colors h-full">
                  <h4 className="text-sm font-semibold text-cloud mb-1.5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sunshine" />
                    Learn by Doing
                  </h4>
                  <p className="text-xs text-cloud-muted leading-relaxed">
                    Hands-on experimentation, building tangible projects, and turning abstract ideas into reliable software.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.4} yOffset={30} blurAmount={10}>
                <div className="p-5 rounded-xl bg-graphite-100/40 border border-cloud-border hover:border-sunshine/40 transition-colors h-full">
                  <h4 className="text-sm font-semibold text-cloud mb-1.5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sunshine" />
                    Collaborative Initiative
                  </h4>
                  <p className="text-xs text-cloud-muted leading-relaxed">
                    Proactive ownership, effective team collaboration, and a relentless drive to solve real-world problems.
                  </p>
                </div>
              </ScrollReveal>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
