"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  X, ZoomIn, ZoomOut, RotateCcw, Download,
  ExternalLink, ShieldCheck, FileText, ChevronLeft, ChevronRight, Loader2,
} from "lucide-react";

interface CertificateViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  organization?: string;
  certificateUrl?: string;
  certificateType?: "image" | "pdf";
  verificationUrl?: string;
  dateOrYear?: string;
}

export default function CertificateViewerModal({
  isOpen,
  onClose,
  title,
  organization,
  certificateUrl,
  certificateType = "image",
  verificationUrl,
  dateOrYear,
}: CertificateViewerModalProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pdfLoading, setPdfLoading] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderTaskRef = useRef<{ cancel: () => void } | null>(null);
  const pdfDocRef = useRef<{ getPage: (n: number) => Promise<unknown>; numPages: number } | null>(null);

  const isPdf =
    certificateType === "pdf" ||
    (!!certificateUrl && certificateUrl.toLowerCase().endsWith(".pdf"));

  /* ── Reset on open ── */
  useEffect(() => {
    if (isOpen) {
      setZoomLevel(1);
      setCurrentPage(1);
      document.body.style.overflow = "hidden";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  /* ── Escape key ── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  /* ── PDF.js: load document ── */
  useEffect(() => {
    if (!isOpen || !isPdf || !certificateUrl) return;
    let cancelled = false;
    setPdfLoading(true);
    pdfDocRef.current = null;

    (async () => {
      try {
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        const pdf = await pdfjsLib.getDocument({ url: certificateUrl }).promise;
        if (cancelled) return;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        pdfDocRef.current = pdf as any;
        setNumPages(pdf.numPages);
        setCurrentPage(1);
      } catch {
        if (!cancelled) setPdfLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [isOpen, isPdf, certificateUrl]);

  /* ── PDF.js: render current page ── */
  useEffect(() => {
    if (!isPdf || !pdfDocRef.current) return;

    // Cancel any in-flight render
    if (renderTaskRef.current) {
      renderTaskRef.current.cancel();
      renderTaskRef.current = null;
    }

    let cancelled = false;
    setPdfLoading(true);

    (async () => {
      try {
        const pdf = pdfDocRef.current!;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const page: any = await pdf.getPage(currentPage);
        if (cancelled) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const dpr = window.devicePixelRatio || 1;
        const viewport = page.getViewport({ scale: zoomLevel * dpr });
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.style.width = `${viewport.width / dpr}px`;
        canvas.style.height = `${viewport.height / dpr}px`;

        const ctx = canvas.getContext("2d")!;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const task = page.render({ canvasContext: ctx, viewport });
        renderTaskRef.current = task;
        await task.promise;
        if (!cancelled) setPdfLoading(false);
      } catch (err: unknown) {
        // RenderingCancelledException is expected; ignore silently
        const msg = err instanceof Error ? err.message : String(err);
        if (!msg.includes("cancelled") && !msg.includes("Rendering")) {
          if (!cancelled) setPdfLoading(false);
        }
      }
    })();

    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, zoomLevel, isPdf, numPages]);

  if (!isOpen) return null;

  /* ── Helpers ── */
  const handleZoomIn  = () => setZoomLevel((p) => Math.min(+(p + 0.25).toFixed(2), 3));
  const handleZoomOut = () => setZoomLevel((p) => Math.max(+(p - 0.25).toFixed(2), 0.5));
  const handleReset   = () => setZoomLevel(1);

  const goToPage = (n: number) => setCurrentPage(Math.max(1, Math.min(numPages, n)));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#03393F]/50 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-graphite-950 border border-cloud-border rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-cloud-border bg-graphite shrink-0">
          <div className="pr-4 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-sunshine/10 text-sunshine text-[11px] font-semibold border border-sunshine/30">
                <ShieldCheck className="w-3 h-3" />
                Verified Certificate
              </span>
              {isPdf && (
                <span className="text-[10px] font-mono text-cloud-subtle bg-graphite-100 px-2 py-0.5 rounded-full border border-cloud-border">
                  PDF
                </span>
              )}
              {dateOrYear && (
                <span className="text-xs text-cloud-subtle font-mono hidden sm:inline">• {dateOrYear}</span>
              )}
            </div>
            <h3 className="font-serif text-base sm:text-xl text-cloud font-normal truncate">{title}</h3>
            {organization && <p className="text-xs text-cloud-muted truncate mt-0.5">{organization}</p>}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Open in new tab */}
            {certificateUrl && (
              <a
                href={certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-graphite-100 hover:bg-sky-subtle border border-cloud-border text-cloud text-xs font-medium transition-all"
                title="Open in new tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Open</span>
              </a>
            )}
            {/* Download */}
            {certificateUrl && (
              <a
                href={certificateUrl}
                download
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-graphite-100 hover:bg-sunshine hover:text-white border border-cloud-border text-cloud text-xs font-medium transition-all"
                title="Download original certificate"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Download</span>
              </a>
            )}
            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-cloud-muted hover:text-cloud hover:bg-graphite-100 transition-colors border border-cloud-border"
              aria-label="Close (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Toolbar ── */}
        <div className="px-5 py-2 bg-graphite-900 border-b border-cloud-border/60 flex items-center justify-between gap-3 shrink-0 flex-wrap">
          {/* Zoom controls */}
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono text-cloud-subtle mr-1">Zoom: {Math.round(zoomLevel * 100)}%</span>
            <button type="button" onClick={handleZoomOut} disabled={zoomLevel <= 0.5}
              className="p-1 rounded bg-graphite border border-cloud-border hover:border-sunshine text-cloud disabled:opacity-40 transition-colors" title="Zoom Out">
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button type="button" onClick={handleReset}
              className="px-2 py-0.5 rounded bg-graphite border border-cloud-border hover:border-sunshine text-cloud text-[10px] font-mono flex items-center gap-1 transition-colors" title="Reset">
              <RotateCcw className="w-3 h-3" /><span>Reset</span>
            </button>
            <button type="button" onClick={handleZoomIn} disabled={zoomLevel >= 3}
              className="p-1 rounded bg-graphite border border-cloud-border hover:border-sunshine text-cloud disabled:opacity-40 transition-colors" title="Zoom In">
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Page navigation (PDF only) */}
          {isPdf && numPages > 1 && (
            <div className="flex items-center gap-1.5">
              <button type="button" onClick={() => goToPage(currentPage - 1)} disabled={currentPage <= 1}
                className="p-1 rounded bg-graphite border border-cloud-border hover:border-sunshine text-cloud disabled:opacity-40 transition-colors">
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-mono text-cloud-subtle px-1">
                {currentPage} / {numPages}
              </span>
              <button type="button" onClick={() => goToPage(currentPage + 1)} disabled={currentPage >= numPages}
                className="p-1 rounded bg-graphite border border-cloud-border hover:border-sunshine text-cloud disabled:opacity-40 transition-colors">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* ── Certificate display area ── */}
        <div className="flex-1 overflow-auto bg-[#E8EEF7] flex items-start justify-center p-4 sm:p-6 min-h-[300px]">
          {!certificateUrl ? (
            /* No asset */
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center p-12">
              <FileText className="w-10 h-10 text-sunshine/50" />
              <p className="text-sm text-cloud-muted">No certificate file available.</p>
            </div>
          ) : isPdf ? (
            /* PDF rendered via PDF.js onto canvas */
            <div className="relative flex items-start justify-center min-w-min">
              {pdfLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-graphite-100/60 rounded-lg z-10">
                  <Loader2 className="w-6 h-6 text-sunshine animate-spin" />
                </div>
              )}
              <canvas
                ref={canvasRef}
                className="rounded-lg shadow-xl border border-cloud-border/40 bg-white max-w-full"
                style={{ display: "block" }}
              />
            </div>
          ) : (
            /* Image certificate */
            <div className="flex items-center justify-center w-full h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={certificateUrl}
                alt={title}
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: "top center",
                  transition: "transform 0.2s ease-out",
                }}
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-xl border border-cloud-border/40 select-none"
              />
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="px-5 py-3 border-t border-cloud-border bg-graphite flex flex-wrap items-center justify-between gap-3 shrink-0">
          <span className="text-[11px] text-cloud-subtle">
            {isPdf
              ? "Scroll / pinch to navigate • Use zoom controls above • Press Esc to close"
              : "Scroll to zoom • Press Esc to close"}
          </span>
          <div className="flex items-center gap-2">
            {verificationUrl && verificationUrl !== "#" && (
              <a
                href={verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-sunshine text-white text-xs font-semibold hover:bg-sunshine-hover shadow-gold-sm transition-all"
              >
                <span>Verify Online</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-full border border-cloud-border text-xs font-medium text-cloud hover:border-cloud-muted transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
