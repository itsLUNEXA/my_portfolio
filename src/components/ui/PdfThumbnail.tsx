"use client";

import React, { useEffect, useRef, useState } from "react";
import { FileText, Loader2, AlertCircle } from "lucide-react";

interface PdfThumbnailProps {
  pdfUrl: string;
  alt?: string;
  className?: string;
}

type RenderState = "idle" | "loading" | "done" | "error";

export default function PdfThumbnail({ pdfUrl, alt = "Certificate", className = "" }: PdfThumbnailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<RenderState>("idle");

  useEffect(() => {
    if (!pdfUrl) return;
    let cancelled = false;
    setState("loading");

    (async () => {
      try {
        // Dynamic import keeps PDF.js out of the SSR bundle
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

        const loadingTask = pdfjsLib.getDocument({ url: pdfUrl });
        const pdf = await loadingTask.promise;
        if (cancelled) return;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const page: any = await pdf.getPage(1);
        if (cancelled) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        // Render at 2× for crisp display on retina
        const viewport = page.getViewport({ scale: 2 });
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (page.render({ canvasContext: ctx, viewport }) as any).promise;
        if (!cancelled) setState("done");
      } catch {
        if (!cancelled) setState("error");
      }
    })();

    return () => { cancelled = true; };
  }, [pdfUrl]);

  return (
    <div className={`relative w-full h-full flex items-center justify-center bg-white ${className}`}>
      {/* Always mount canvas; hide until rendered */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain"
        style={{
          display: state === "done" ? "block" : "none",
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
        }}
        aria-label={alt}
      />

      {state === "loading" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-graphite-100">
          <Loader2 className="w-5 h-5 text-sunshine animate-spin" />
          <span className="text-[9px] text-cloud-subtle font-mono uppercase tracking-wider">Loading PDF…</span>
        </div>
      )}

      {state === "error" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-graphite-100 p-3 text-center">
          <div className="w-8 h-8 rounded-lg bg-sunshine/10 border border-sunshine/30 flex items-center justify-center">
            <FileText className="w-4 h-4 text-sunshine" />
          </div>
          <span className="text-[9px] text-cloud-subtle font-mono uppercase tracking-wider">PDF Certificate</span>
        </div>
      )}

      {state === "idle" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-graphite-100">
          <AlertCircle className="w-4 h-4 text-cloud-subtle" />
        </div>
      )}
    </div>
  );
}
