"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface WaveSeparatorProps {
  topBgColorVar: string; // CSS variable name for the top section's background (e.g., "--background")
  bottomBgClass: string; // Tailwind class for the bottom section's background (e.g., "bg-zutly-tiffany-dark/10")
}

const WaveSeparator: React.FC<WaveSeparatorProps> = ({ topBgColorVar, bottomBgClass }) => {
  return (
    <div className={cn("relative w-full h-24 overflow-hidden", bottomBgClass)}>
      <svg
        className="absolute top-0 left-0 w-full h-full"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Aangepast pad voor een consistent, glad en smooth golfpatroon met gelijke afstand. */}
        {/* Dit pad gebruikt Quadratic Bezier curves voor een vloeiende, herhalende golf. */}
        <path
          d="M0,70 Q180,40 360,70 Q540,100 720,70 Q900,40 1080,70 Q1260,100 1440,70 L1440,0 L0,0 Z"
          fill={`hsl(var(${topBgColorVar}))`}
        ></path>
      </svg>
    </div>
  );
};

export default WaveSeparator;