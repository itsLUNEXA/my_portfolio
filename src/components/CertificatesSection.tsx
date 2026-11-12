"use client";

import React, { useState } from "react";
import { ExternalLink, Eye, ShieldCheck, Calendar, Sparkles } from "lucide-react";
import { Certificate } from "@/types/portfolio";
import CertificateModal from "./CertificateModal";

interface CertificatesSectionProps {
  certificates: Certificate[];
}

export default function CertificatesSection({ certificates }: CertificatesSectionProps) {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = [
    "All",
    "Industry Job Simulations",
    "University Accreditations",
    "Cloud & AI Skill Badges",
  ];

  const filteredCertificates =
    activeCategory === "All"
      ? certificates
      : certificates.filter((cert) => cert.category === activeCategory);

  return (
    <section id="certificates" className="py-24 bg-graphite border-t border-cloud-border relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-sunshine text-xs font-semibold tracking-widest uppercase mb-3">
              <span className="w-8 h-[1px] bg-sunshine" />
              <span>Section 04</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cloud font-normal">
              Certifications & <span className="italic font-medium text-sunshine">Credentials</span>
            </h2>
          </div>
          <p className="text-cloud-muted text-sm max-w-md">
            Industry job simulations, verified university accreditations, cloud infrastructure badges, and technical certifications.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
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
              {cat === "All" ? "All Credentials" : cat}
            </button>
          ))}
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-graphite-100/50 border border-cloud-border rounded-2xl p-6 flex flex-col justify-between hover:border-sunshine/40 transition-all duration-300 group hover:shadow-lg hover:shadow-black/40"
            >
              <div>
                {/* Top Badge & Date */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-graphite border border-cloud-border text-[11px] font-medium text-sunshine">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {cert.category ? cert.category.split(" ")[0] : "Verified"}
                  </span>
                  <span className="text-xs text-cloud-subtle font-mono flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {cert.issueDate}
                  </span>
                </div>

                {/* Certificate Title */}
                <h3 className="font-serif text-xl text-cloud mb-2 group-hover:text-sunshine transition-colors">
                  {cert.title}
                </h3>

                {/* Organization */}
                <p className="text-sm font-medium text-cloud-muted mb-4">
                  {cert.issuingOrganization}
                </p>

                {/* Credential ID */}
                {cert.credentialId && (
                  <p className="text-xs font-mono text-cloud-subtle mb-4">
                    ID: {cert.credentialId}
                  </p>
                )}

                {/* Skills tags */}
                {cert.skillsLearned && cert.skillsLearned.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {cert.skillsLearned.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-graphite border border-cloud-border text-[11px] text-cloud-muted"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-cloud-border/70 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedCertificate(cert)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-graphite border border-cloud-border text-xs font-semibold text-cloud hover:text-sunshine hover:border-sunshine/50 transition-all"
                >
                  <Eye className="w-3.5 h-3.5 text-sunshine" />
                  <span>Preview</span>
                </button>

                {cert.verificationUrl && (
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-cloud-muted hover:text-sunshine font-semibold transition-colors"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3 h-3 text-sunshine" />
                  </a>
                )}
              </div>

              {/* Placeholder Notice */}
              {cert.isPlaceholder && (
                <div className="mt-3 text-[11px] text-cloud-subtle italic flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-sunshine/60 shrink-0" />
                  <span>Awaiting your certificate uploads in Phase 4.</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Verification Note */}
        <div className="mt-12 p-4 rounded-xl bg-graphite-900 border border-cloud-border text-center">
          <p className="text-xs text-cloud-muted">
            <span className="text-sunshine font-semibold uppercase tracking-wider">Authenticity Guaranteed:</span> All technical certifications and simulation badges can be directly verified via provider IDs and authenticated links.
          </p>
        </div>

      </div>

      {/* Certificate Modal */}
      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </section>
  );
}
