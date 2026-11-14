"use client";

import React from "react";
import TravelCompanionVisual from "./TravelCompanionVisual";
import CollabVisual from "./CollabVisual";
import CampusPulseVisual from "./CampusPulseVisual";
import VibentoVisual from "./VibentoVisual";
import ThreatFusionVisual from "./ThreatFusionVisual";
import VanikVisual from "./VanikVisual";
import KrishiNiyojakVisual from "./KrishiNiyojakVisual";

interface ProjectVisualProps {
  projectId: string;
  isActive?: boolean;
  reduceMotion?: boolean;
  className?: string;
}

export default function ProjectVisual({
  projectId,
  isActive = true,
  reduceMotion = false,
  className = "",
}: ProjectVisualProps) {
  const normalizedId = (projectId || "").toLowerCase();

  const renderVisual = () => {
    if (normalizedId.includes("travel") || normalizedId === "proj-1") {
      return <TravelCompanionVisual isActive={isActive} reduceMotion={reduceMotion} />;
    }
    if (normalizedId.includes("collab") || normalizedId === "proj-2") {
      return <CollabVisual isActive={isActive} reduceMotion={reduceMotion} />;
    }
    if (normalizedId.includes("campus") || normalizedId === "proj-3") {
      return <CampusPulseVisual isActive={isActive} reduceMotion={reduceMotion} />;
    }
    if (normalizedId.includes("vibento") || normalizedId === "proj-4") {
      return <VibentoVisual isActive={isActive} reduceMotion={reduceMotion} />;
    }
    if (normalizedId.includes("threat") || normalizedId === "proj-6") {
      return <ThreatFusionVisual isActive={isActive} reduceMotion={reduceMotion} />;
    }
    if (normalizedId.includes("vanik") || normalizedId === "proj-7") {
      return <VanikVisual isActive={isActive} reduceMotion={reduceMotion} />;
    }
    if (normalizedId.includes("niti") || normalizedId.includes("krishi") || normalizedId === "proj-8") {
      return <KrishiNiyojakVisual isActive={isActive} reduceMotion={reduceMotion} />;
    }

    // Default to Collab visual if unmatched
    return <CollabVisual isActive={isActive} reduceMotion={reduceMotion} />;
  };

  return (
    <div className={`relative size-full overflow-hidden ${className}`}>
      {renderVisual()}
    </div>
  );
}

