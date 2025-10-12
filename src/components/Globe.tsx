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
  width: 600, // Interne renderbreedte verkleind
  height: 600, // Interne renderhoogte verkleind
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0.108, // Longitude van Zutphen in radialen (ongeveer 6.19 graden)
  theta: 0.8, // Aangepast naar een positieve waarde om het noordelijk halfrond te tonen
  dark: 0, // Zorgt ervoor dat de globe volledig verlicht (wit) is
  diffuse: 3,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1], // Witte achtergrond
  markerColor: [61 / 255, 52 / 255, 139 / 255], // Zutly Dark Purple voor de marker
  glowColor: [0.9, 0.9, 0.9], // Heel licht wit voor de gloed
  markers: [],
};

export function Globe({ className, config: customConfig }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const config = { ...defaultConfig, ...customConfig };

  useEffect(() => {
    let phi = config.phi; // Start met de ingestelde phi
    let globe: any;

    if (canvasRef.current) {
      globe = createGlobe(canvasRef.current, {
        ...config,
        width: config.width * config.devicePixelRatio,
        height: config.height * config.devicePixelRatio,
        onRender: (state) => {
          // Dit zorgt voor een langzame, continue rotatie
          state.phi = phi + 0.003; // Rotatiesnelheid iets verhoogd
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
        "h-[400px] w-[400px] md:h-[600px] md:w-[600px] transition-all duration-300 ease-in-out mx-auto", // Canvas afmetingen aangepast om de kleinere globe te tonen
        className,
      )}
      style={{
        aspectRatio: config.width / config.height,
      }}
    />
  );
}