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

    const rotationSpeed = 0.01; // sneller zodat het moment vaker/langs komt
    const maxScale = 1.35; // duidelijke zoom
    const minScale = 1.0;
    const maxRange = 0.45; // ~26°: binnen dit bereik zoom toepassen

    if (canvasRef.current) {
      // Zorg voor vloeiende transitie
      canvasRef.current.style.transition = "transform 600ms ease, filter 600ms ease";
      canvasRef.current.style.transformOrigin = "50% 50%";

      globe = createGlobe(canvasRef.current, {
        ...config,
        width: config.width * config.devicePixelRatio,
        height: config.height * config.devicePixelRatio,
        onRender: (state) => {
          state.phi = phi + rotationSpeed;
          phi = state.phi;

          // Bepaal hoekverschil (alleen longitude is voldoende voor duidelijke trigger)
          const current = normalizeAngle(state.phi);
          const target = normalizeAngle(targetPhi);
          const diff = Math.abs(current - target);
          const shortest = Math.min(diff, Math.PI * 2 - diff);

          // Lineaire nabijheid binnen drempel, daarna clampen
          const proximity = Math.max(0, 1 - shortest / maxRange);
          const scale = minScale + (maxScale - minScale) * proximity;

          if (canvasRef.current) {
            canvasRef.current.style.transform = `scale(${scale})`;
            // Extra visuele hint wanneer dichtbij
            const glow = Math.round(6 * proximity);
            canvasRef.current.style.filter = glow ? `drop-shadow(0 0 ${glow}px rgba(255,255,255,0.7))` : "none";
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
        "transform-gpu",
        className
      )}
      style={{
        aspectRatio: config.width / config.height,
        willChange: "transform, filter",
      }}
    />
  );
}