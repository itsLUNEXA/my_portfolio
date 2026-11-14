"use client";

import React, { useState, useMemo } from "react";
import { Eye, ExternalLink } from "lucide-react";
import { Certificate } from "@/types/portfolio";
import TeamLanyardRail, { LanyardMember, LanyardLink } from "@/components/ui/team-lanyard-rail";
import CertificateViewerModal from "@/components/CertificateViewerModal";
import WordReveal from "./animations/WordReveal";
import ScrollReveal from "./animations/ScrollReveal";

interface CertificatesSectionProps {
  certificates: Certificate[];
}

export default function CertificatesSection({
  certificates = [],
}: CertificatesSectionProps) {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const categories = [
    "All",
    "Cloud & AI Skill Badges",
    "Industry Job Simulations",
    "University Accreditations",
  ];

  // Filter certificates by active category
  const filteredCertificates = useMemo(() => {
    if (activeCategory === "All") return certificates;
    return certificates.filter((cert) => cert.category === activeCategory);
  }, [certificates, activeCategory]);

  // Map existing certificate data to LanyardMember format
  const lanyardItems: LanyardMember[] = useMemo(() => {
    return filteredCertificates.map((cert, index) => {
      const tone = (((index % 5) + 1) as 1 | 2 | 3 | 4 | 5);
      
      const links: LanyardLink[] = [];
      if (cert.verificationUrl && cert.verificationUrl !== "#") {
        links.push({ label: "Verify Online", href: cert.verificationUrl });
      }
      if (cert.pdfUrl || cert.imageUrl) {
        links.push({ label: "View Original", href: cert.pdfUrl || cert.imageUrl || "#" });
      }

      const bioText = cert.skillsLearned && cert.skillsLearned.length > 0
        ? `Demonstrated Competencies: ${cert.skillsLearned.join(" • ")}`
        : (cert.credentialId ? `Credential ID: ${cert.credentialId}` : cert.title);

      return {
        id: cert.id,
        name: cert.title,
        role: cert.issuingOrganization,
        team: cert.issueDate ? `${cert.issueDate} · ${cert.category || "Verified"}` : cert.category,
        image: cert.imageUrl || cert.pdfUrl || "",
        pdfUrl: cert.pdfUrl,
        bio: bioText,
        tags: cert.skillsLearned && cert.skillsLearned.length > 0
          ? cert.skillsLearned.slice(0, 3)
          : [cert.category || "Verified"],
        links: links.length > 0 ? links : [{ label: "Verified Record", href: "#" }],
        tone,
        drop: [6, 18, 2, 14, 20, 4, 16, 8][index % 8],
      };
    });
  }, [filteredCertificates]);

  // Currently focused / flipped certificate
  const focusedIndex = activeIndex !== null ? activeIndex : flippedIndex;
  const currentCert = focusedIndex !== null && filteredCertificates[focusedIndex]
    ? filteredCertificates[focusedIndex]
    : filteredCertificates[0] || null;

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setActiveIndex(0);
    setFlippedIndex(null);
  };

  return (
    <section
      id="certificates"
      className="relative w-full bg-graphite border-t border-cloud-border py-20 sm:py-24 scroll-mt-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal yOffset={20} blurAmount={6}>
          <div className="w-full max-w-4xl mx-auto text-center mb-8">
            <div className="flex items-center justify-center gap-2 text-sunshine text-xs font-semibold tracking-widest uppercase mb-3">
              <span className="w-8 h-[1px] bg-sunshine" />
              <span>Section 04</span>
              <span className="w-8 h-[1px] bg-sunshine" />
            </div>

            <WordReveal
              as="h2"
              text="Certifications & Credentials"
              highlightWords={["Credentials"]}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cloud font-normal"
              stagger={0.08}
            />

            <p className="text-cloud-muted text-xs sm:text-sm mt-3 max-w-2xl mx-auto leading-relaxed">
              Verified certifications, technical specializations, and official credentials across software engineering and system architecture.
            </p>

            {/* Category Filter Pills */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 overflow-x-auto pt-5 pb-2 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    activeCategory === cat
                      ? "bg-sunshine text-white font-semibold shadow-gold-sm"
                      : "bg-graphite-100 text-cloud-muted hover:text-cloud border border-cloud-border hover:border-sunshine/40"
                  }`}
                >
                  {cat === "All" ? "All Credentials" : cat}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Lanyard Rail Interactive Viewport */}
        <ScrollReveal delay={0.15} yOffset={30} blurAmount={8}>
          <div className="relative w-full rounded-2xl bg-white border border-cloud-border shadow-gold-sm overflow-hidden py-4">
            <TeamLanyardRail
              items={lanyardItems}
              active={activeIndex}
              onActiveChange={setActiveIndex}
              flipped={flippedIndex}
              onFlippedChange={setFlippedIndex}
              autoplay={false}
              className="bg-transparent"
              caption="Hover or swipe along the rail to meet each credential, pull down to test spring physics, click to flip."
              action={
                currentCert ? (
                  <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
                    <button
                      type="button"
                      onClick={() => setSelectedCertificate(currentCert)}
                      className="inline-flex items-center gap-2 rounded-full bg-sunshine px-5 py-2 text-xs font-semibold text-white shadow-gold-sm outline-none transition-all hover:bg-sunshine-hover hover:-translate-y-0.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Full Certificate</span>
                    </button>

                    {currentCert.verificationUrl && currentCert.verificationUrl !== "#" && (
                      <a
                        href={currentCert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-cloud-border bg-graphite-100 px-4 py-2 text-xs font-medium text-cloud hover:border-sunshine/40 hover:text-sunshine transition-all"
                      >
                        <span>Verify Online</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                ) : null
              }
            />
          </div>
        </ScrollReveal>

      </div>

      {/* Certificate Viewer Lightbox Modal with Zoom & Download */}
      {selectedCertificate && (
        <CertificateViewerModal
          isOpen={!!selectedCertificate}
          onClose={() => setSelectedCertificate(null)}
          title={selectedCertificate.title}
          organization={selectedCertificate.issuingOrganization}
          certificateUrl={
            selectedCertificate.imageUrl || selectedCertificate.pdfUrl
          }
          certificateType={selectedCertificate.imageUrl ? "image" : "pdf"}
          verificationUrl={selectedCertificate.verificationUrl}
          dateOrYear={selectedCertificate.issueDate}
        />
      )}
    </section>
  );
}
