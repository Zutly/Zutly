"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface GlobeConfig {
  width: number;
  height: number;
  onRender: (state: Record<string, any>) => void;
  devicePixelRatio: number;
  phi: number;
  theta: number;
  dark: number;
  diffuse: number;
  mapSamples: number;
  mapBrightness: number;
  baseColor: [number, number, number];
  markerColor: [number, number, number];
  glowColor: [number, number, number];
  markers: { location: [number, number]; size: number }[];
}

interface GlobeProps {
  className?: string;
  config?: Partial<GlobeConfig>;
}

const defaultConfig: GlobeConfig = {
  width: 400,
  height: 400,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0.108,
  theta: 0.8,
  dark: 0,
  diffuse: 3,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [61 / 255, 52 / 255, 139 / 255],
  glowColor: [0.9, 0.9, 0.9],
  markers: [],
};

function normalizeAngle(a: number) {
  const twoPi = Math.PI * 2;
  return ((a % twoPi) + twoPi) % twoPi;
}

export function Globe({ className, config: customConfig }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const config = { ...defaultConfig, ...customConfig };

  useEffect(() => {
    let phi = config.phi;
    let globe: any;

    const firstMarker = config.markers?.[0];
    const targetPhi =
      firstMarker && typeof firstMarker.location?.[1] === "number"
        ? (firstMarker.location[1] * Math.PI) / 180
        : config.phi;

    // Ruimere detectie + duidelijkere zoom
    const maxZoom = 0.22; // extra schaal (1.22x)
    const rotationSpeed = 0.003;

    if (canvasRef.current) {
      globe = createGlobe(canvasRef.current, {
        ...config,
        width: config.width * config.devicePixelRatio,
        height: config.height * config.devicePixelRatio,
        onRender: (state) => {
          state.phi = phi + rotationSpeed;
          phi = state.phi;

          // Angular distance (0 bij exact target, tot PI tegenovergesteld)
          const current = normalizeAngle(state.phi);
          const target = normalizeAngle(targetPhi);
          const rawDiff = Math.abs(current - target);
          const shortest = Math.min(rawDiff, Math.PI * 2 - rawDiff);

          // Normaliseer naar 0..1 (1 dichtbij, 0 ver weg) en maak piek scherper
          const proximity = Math.pow(Math.max(0, 1 - shortest / Math.PI), 3);

          // Interpoleer schaal van 1.0 -> 1.22
          const scale = 1 + maxZoom * proximity;

          if (canvasRef.current) {
            canvasRef.current.style.transform = `scale(${scale})`;
          }

          config.onRender(state);
        },
      });
    }

    return () => {
      if (globe) globe.destroy();
    };
  }, [config]);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "h-[300px] w-[300px] md:h-[400px] md:w-[400px] transition-transform duration-500 ease-out mx-auto",
        "transform-gpu", // GPU-acceleratie
        className
      )}
      style={{
        aspectRatio: config.width / config.height,
        willChange: "transform",
      }}
    />
  );
}