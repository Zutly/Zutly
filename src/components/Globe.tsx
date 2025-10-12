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
  phi: 0.108, // ~6.19° (Zutphen)
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

    // Bepaal doel-longitude (radians) vanuit eerste marker, val terug op config.phi
    const firstMarker = config.markers?.[0];
    const targetPhi =
      firstMarker && typeof firstMarker.location?.[1] === "number"
        ? (firstMarker.location[1] * Math.PI) / 180 // longitude in graden -> rad
        : config.phi;

    const threshold = 0.25; // hoe dicht bij de marker (in radians) voor zoom
    const minScale = 1;
    const maxScale = 1.15; // zoom factor

    if (canvasRef.current) {
      globe = createGlobe(canvasRef.current, {
        ...config,
        width: config.width * config.devicePixelRatio,
        height: config.height * config.devicePixelRatio,
        onRender: (state) => {
          // Continue rotatie
          state.phi = phi + 0.003;
          phi = state.phi;

          // Zoom op basis van nabijheid van marker longitude
          const current = normalizeAngle(state.phi);
          const target = normalizeAngle(targetPhi);
          const diff = Math.abs(current - target);
          const shortest = Math.min(diff, Math.PI * 2 - diff);

          // Bereken proximity (0..1) en schaal daartussen
          const proximity = Math.max(0, 1 - shortest / threshold);
          const scale = minScale + (maxScale - minScale) * proximity;

          if (canvasRef.current) {
            canvasRef.current.style.transform = `scale(${scale})`;
          }

          config.onRender(state);
        },
      });
    }

    return () => {
      if (globe) {
        globe.destroy();
      }
    };
  }, [config]);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "h-[300px] w-[300px] md:h-[400px] md:w-[400px] transition-transform duration-300 ease-in-out mx-auto",
        className
      )}
      style={{
        aspectRatio: config.width / config.height,
      }}
    />
  );
}