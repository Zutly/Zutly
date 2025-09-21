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
        {/* De path wordt gevuld met de kleur van de sectie erboven. */}
        {/* Dit creëert de illusie dat de golf deel uitmaakt van de sectie eronder. */}
        <path
          d="M0,100 C240,50 480,150 720,100 C960,50 1200,150 1440,100 L1440,0 L0,0 Z"
          fill={`hsl(var(${topBgColorVar}))`}
        ></path>
      </svg>
    </div>
  );
};

export default WaveSeparator;