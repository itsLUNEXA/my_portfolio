"use client";

import React, { useEffect } from "react";
import { X, ExternalLink, Calendar, Award, ShieldCheck, FileText } from "lucide-react";
import { Certificate } from "@/types/portfolio";

interface CertificateModalProps {
  certificate: Certificate | null;
  onClose: () => void;
}

export default function CertificateModal({ certificate, onClose }: CertificateModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (certificate) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#03393F]/45 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-4xl bg-graphite-900 border border-cloud-border rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-cloud-border bg-graphite">
          <div>
            <span className="text-xs uppercase tracking-widest text-sunshine font-semibold">
              Certificate Inspection
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-cloud font-normal mt-1">
              {certificate.title}
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

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Certificate Preview Frame */}
          <div className="w-full aspect-[16/10] bg-graphite-950 border border-cloud-border rounded-xl overflow-hidden flex flex-col items-center justify-center text-center p-8 relative group">
            {certificate.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={certificate.imageUrl}
                alt={certificate.title}
                className="w-full h-full object-contain"
              />
            ) : certificate.pdfUrl ? (
              <iframe
                src={certificate.pdfUrl}
                title={certificate.title}
                className="w-full h-full border-0"
              />
            ) : (
              <div className="flex flex-col items-center justify-center max-w-md">
                <div className="w-16 h-16 rounded-2xl bg-sunshine/10 border border-sunshine/30 flex items-center justify-center text-sunshine mb-4">
                  <FileText className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-lg text-cloud mb-1">
                  High-Resolution Certificate Document Preview
                </h4>
                <p className="text-xs text-cloud-muted leading-relaxed">
                  Placeholder container ready to render PDF or high-resolution credential scan once you provide the certificate asset in Phase 4.
                </p>
                <div className="mt-4 px-3 py-1 rounded-full bg-graphite border border-cloud-border text-[11px] text-sunshine font-mono">
                  Credential ID: {certificate.credentialId || "PENDING-VERIFICATION"}
                </div>
              </div>
            )}
          </div>

          {/* Certificate Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-graphite border border-cloud-border">
              <span className="text-[11px] uppercase tracking-wider text-cloud-subtle block mb-1">
                Issuing Authority
              </span>
              <p className="text-sm font-semibold text-cloud flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-sunshine shrink-0" />
                {certificate.issuingOrganization}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-graphite border border-cloud-border">
              <span className="text-[11px] uppercase tracking-wider text-cloud-subtle block mb-1">
                Issue Date
              </span>
              <p className="text-sm font-semibold text-cloud flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-sunshine shrink-0" />
                {certificate.issueDate}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-graphite border border-cloud-border">
              <span className="text-[11px] uppercase tracking-wider text-cloud-subtle block mb-1">
                Credential Status
              </span>
              <p className="text-sm font-semibold text-sunshine flex items-center gap-1.5">
                <Award className="w-4 h-4 text-sunshine shrink-0" />
                Verified & Valid
              </p>
            </div>
          </div>

          {/* Skills Covered */}
          {certificate.skillsLearned && certificate.skillsLearned.length > 0 && (
            <div>
              <span className="text-xs uppercase tracking-wider text-cloud-subtle block mb-2">
                Demonstrated Competencies
              </span>
              <div className="flex flex-wrap gap-2">
                {certificate.skillsLearned.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-md bg-graphite-100 border border-cloud-border text-xs text-cloud-muted"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-cloud-border bg-graphite flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs text-cloud-subtle">
            Original certificate document will be displayed in high fidelity.
          </span>

          <div className="flex items-center gap-3">
            {certificate.verificationUrl && (
              <a
                href={certificate.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sunshine text-graphite text-xs font-semibold hover:bg-sunshine-hover shadow-gold-sm transition-all"
              >
                <span>Verify Credential</span>
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
