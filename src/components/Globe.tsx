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
  config?: Partial<GlobeConfig>; // Partial to allow overriding specific config properties
}

const defaultConfig: GlobeConfig = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0.1, // Maakt de globe helderder en volledig zichtbaar
  diffuse: 3,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1], // Witte achtergrond
  markerColor: [61 / 255, 52 / 255, 139 / 255], // Zutly Dark Purple voor de marker
  glowColor: [61 / 255, 52 / 255, 139 / 255], // Zutly Dark Purple voor de glow
  markers: [],
};

export function Globe({ className, config: customConfig }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const config = { ...defaultConfig, ...customConfig };

  useEffect(() => {
    let phi = 0;
    let globe: any;

    if (canvasRef.current) {
      globe = createGlobe(canvasRef.current, {
        ...config,
        width: config.width * config.devicePixelRatio,
        height: config.height * config.devicePixelRatio,
        onRender: (state) => {
          // This prevents the globe from spinning too fast on high refresh rates
          state.phi = phi + 0.005;
          phi = state.phi;
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
        "h-72 w-72 md:h-[480px] md:w-[480px] transition-all duration-300 ease-in-out mx-auto", // Added mx-auto for centering
        className,
      )}
      style={{
        aspectRatio: config.width / config.height,
      }}
    />
  );
}