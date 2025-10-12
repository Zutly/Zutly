"use client";

import { Globe } from "@/components/ui/globe";

export function GlobeDemo() {
  return (
    <div className="relative w-full h-[280px] md:h-[420px] lg:h-[520px] overflow-hidden border-y bg-background">
      <Globe className="inset-0 max-w-none" />
      <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
    </div>
  );
}