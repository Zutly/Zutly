"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface FounderAvatarProps {
  image: string;
  fallback: string;
  name: string;
  className?: string; // Voor externe styling op de wrapper div
}

const FounderAvatar: React.FC<FounderAvatarProps> = ({ image, fallback, name, className }) => {
  return (
    <div className={cn(
      "relative rounded-full overflow-hidden", // Essentieel voor het clippen van overlays
      "h-32 w-32 mb-6 border-6 border-zutly-tiffany-dark shadow-md", // Basis styling voor het gehele avatar blok
      className
    )}>
      <Avatar className="h-full w-full"> {/* Avatar zelf neemt de volledige grootte van deze wrapper */}
        <AvatarImage src={image} alt={name} className="object-cover" />
        <AvatarFallback className="bg-zutly-medium-blue text-white text-4xl font-semibold">
          {fallback}
        </AvatarFallback>
      </Avatar>
      {/* Patroon Overlay (subtiele donkere stippen) */}
      <div className="absolute inset-0 rounded-full pointer-events-none z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Ccircle cx='50' cy='50' r='1'%3E%3C/circle%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '10px 10px',
          opacity: 0.8,
          mixBlendMode: 'overlay',
        }}
      ></div>
      {/* Gradiënt Overlay (gebaseerd op Zutly kleuren) */}
      <div className="absolute inset-0 rounded-full pointer-events-none z-20"
        style={{
          background: `linear-gradient(135deg, rgba(61, 52, 139, 0.2), rgba(118, 120, 237, 0.2), rgba(120, 202, 210, 0.2))`,
          opacity: 0.6,
          mixBlendMode: 'multiply',
        }}
      ></div>
    </div>
  );
};

export default FounderAvatar;