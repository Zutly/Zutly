"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface NetherlandsMapProps {
  className?: string;
}

const NetherlandsMap: React.FC<NetherlandsMapProps> = ({ className }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  // --- Pas deze waarden aan naar de viewBox-coördinaten van Zutphen ---
  // Deze coördinaten zijn gekozen om binnen de vereenvoudigde kaart te passen.
  const zutphenViewBoxPos = { x: 450, y: 400 };
  // -------------------------------------------------------------------

  useEffect(() => {
    const svg = svgRef.current;
    const overlay = overlayRef.current;
    const dot = dotRef.current;

    if (!svg || !overlay || !dot) return;

    const positionDot = () => {
      // Haal de viewBox-waarden op
      const vb = svg.viewBox.baseVal; // {x, y, width, height}

      // Haal de bounding box van de SVG in pixels op
      const bbox = svg.getBoundingClientRect();

      // Converteer viewBox-coördinaten naar pixelpositie binnen de SVG
      const px = ((zutphenViewBoxPos.x - vb.x) / vb.width) * bbox.width;
      const py = ((zutphenViewBoxPos.y - vb.y) / vb.height) * bbox.height;

      // Positioneer de stip
      dot.style.left = `${px}px`;
      dot.style.top = `${py}px`;
    };

    // Eerste positionering
    positionDot();

    // Herpositioneer bij wijzigingen in venstergrootte of oriëntatie
    window.addEventListener("resize", positionDot);
    window.addEventListener("orientationchange", positionDot);

    return () => {
      window.removeEventListener("resize", positionDot);
      window.removeEventListener("orientationchange", positionDot);
    };
  }, [zutphenViewBoxPos.x, zutphenViewBoxPos.y]);

  return (
    <div className={cn("map-wrap", className)} aria-hidden="false">
      <div className="dot-holder relative w-full h-0 pb-[100%]"> {/* pb-[100%] voor 1:1 aspect ratio (800x800 viewBox) */}
        <svg
          ref={svgRef}
          className="nl-map absolute top-0 left-0 w-full h-full"
          viewBox="0 0 800 800" // Aangepaste viewBox voor vereenvoudigde kaart
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Kaart van Nederland met provinciegrenzen"
        >
          {/* Landomtrek - vereenvoudigd voorbeeld */}
          <path className="country-outline" d="M200 100 L600 100 L700 300 L650 700 L150 700 L100 300 Z" />

          {/* Vereenvoudigde 'provincies' als voorbeeld */}
          <path className="province" d="M200 100 L400 100 L450 300 L300 350 L250 200 Z" /> {/* Noord-West */}
          <path className="province" d="M400 100 L600 100 L650 300 L450 300 Z" /> {/* Noord-Oost */}
          <path className="province" d="M300 350 L450 300 L650 300 L600 500 L400 550 L250 500 Z" /> {/* Midden */}
          <path className="province" d="M150 700 L250 500 L400 550 L600 500 L650 700 Z" /> {/* Zuid */}
        </svg>

        <div ref={overlayRef} className="map-overlay">
          <div
            ref={dotRef}
            className="pulse"
            title="Ons kantoor in Zutphen"
            onClick={() => console.log("Klik op Zutphen-dot")}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default NetherlandsMap;