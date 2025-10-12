"use client";

import createGlobe from "cobe";
import { useEffect, useRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import { animate } from "framer-motion"; // Importeer animate van framer-motion

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
  zoom: number;
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
  phi: 0.108, // Initiële longitude (ongeveer Zutphen)
  theta: 0.8, // Initiële latitude
  dark: 0,
  diffuse: 3,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [61 / 255, 52 / 255, 139 / 255],
  glowColor: [0.9, 0.9, 0.9],
  markers: [],
  zoom: 1, // Initiële zoom level
};

export function Globe({ className, config: customConfig }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<any>(null);
  const isAnimatingRef = useRef(false); // Vlag om continue rotatie te beheren

  const mergedConfig = useMemo(() => ({
    ...defaultConfig,
    ...customConfig,
    zoom: customConfig?.zoom || 1, // Zorg ervoor dat de initiële zoom 1 is, tenzij expliciet anders ingesteld
  }), [customConfig]);

  useEffect(() => {
    if (!canvasRef.current) return;

    let currentPhi = mergedConfig.phi;
    let currentTheta = mergedConfig.theta;
    let currentZoom = mergedConfig.zoom;

    globeRef.current = createGlobe(canvasRef.current, {
      ...mergedConfig,
      width: mergedConfig.width * mergedConfig.devicePixelRatio,
      height: mergedConfig.height * mergedConfig.devicePixelRatio,
      onRender: (state) => {
        // Pas alleen continue rotatie toe als er geen zoom-animatie actief is
        if (!isAnimatingRef.current) {
          state.phi = currentPhi + 0.003; // Continue rotatie
          currentPhi = state.phi; // Update de lokale variabele voor het volgende frame
        }
        // De state.phi, state.theta, state.zoom worden overschreven door setOptions als de animatie actief is
        mergedConfig.onRender(state); // Roep de originele onRender aan indien aanwezig
      },
    });

    // Doelcoördinaten voor Zutphen (ongeveer)
    const targetLat = 52.1435;
    const targetLon = 6.1937;
    const targetPhi = targetLon * (Math.PI / 180);
    const targetTheta = targetLat * (Math.PI / 180);
    const targetZoom = 2.5; // Experimenteer met deze waarde voor de zoom

    // Start de animatie na een vertraging
    const timeoutId = setTimeout(() => {
      isAnimatingRef.current = true; // Zet de vlag om continue rotatie te stoppen

      animate(
        {
          phi: currentPhi, // Start vanaf de huidige continue rotatiepositie
          theta: currentTheta,
          zoom: currentZoom,
        },
        {
          phi: targetPhi,
          theta: targetTheta,
          zoom: targetZoom,
        },
        {
          duration: 3, // Animatie duur in seconden
          ease: "easeInOut",
          onUpdate: (latest) => {
            // Update de huidige waarden en stel opties in op de wereldbol
            currentPhi = latest.phi;
            currentTheta = latest.theta;
            currentZoom = latest.zoom;
            globeRef.current.setOptions({
              phi: currentPhi,
              theta: currentTheta,
              zoom: currentZoom,
            });
          },
          onComplete: () => {
            isAnimatingRef.current = false; // Animatie voltooid, stop verdere rotatie
            // Zorg ervoor dat de lokale variabelen ook de uiteindelijke staat weerspiegelen
            currentPhi = targetPhi;
            currentTheta = targetTheta;
            currentZoom = targetZoom;
            // De onUpdate heeft de uiteindelijke waarden al ingesteld, dus geen extra setOptions nodig.
          }
        }
      );
    }, 2000); // Start animatie na 2 seconden

    return () => {
      clearTimeout(timeoutId);
      if (globeRef.current) {
        globeRef.current.destroy();
      }
    };
  }, [mergedConfig]); // Afhankelijk van mergedConfig om opnieuw te initialiseren als props significant veranderen

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "h-[300px] w-[300px] md:h-[400px] md:w-[400px] transition-all duration-300 ease-in-out mx-auto",
        className,
      )}
      style={{
        aspectRatio: mergedConfig.width / mergedConfig.height,
      }}
    />
  );
}