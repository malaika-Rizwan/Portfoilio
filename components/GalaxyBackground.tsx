"use client";

import Galaxy from "./Galaxy";

export default function GalaxyBackground() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ width: "100%", height: "100%", position: "fixed" }}
      aria-hidden
    >
      <Galaxy
        mouseRepulsion
        mouseInteraction
        density={1}
        glowIntensity={0.3}
        saturation={0}
        hueShift={140}
        twinkleIntensity={0.3}
        rotationSpeed={0.1}
        repulsionStrength={2}
        autoCenterRepulsion={0}
        starSpeed={0.5}
        speed={1}
        transparent={true}
        className="w-full h-full"
      />
    </div>
  );
}
