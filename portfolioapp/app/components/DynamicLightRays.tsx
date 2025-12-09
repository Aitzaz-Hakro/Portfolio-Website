"use client";

import { useEffect, useState, useRef } from "react";
import LightRays, { RaysOrigin } from "./LightRays";
import { motion, AnimatePresence } from "framer-motion";

interface LightConfig {
  origin: RaysOrigin;
  color: string;
  spread: number;
  speed: number;
  rayLength: number;
}

interface SectionConfig {
  id: string;
  light: LightConfig;
}

const sectionConfigs: SectionConfig[] = [
  {
    id: "hero",
    light: {
      origin: "top-center",
      color: "#f5a352",
      spread: 1.2,
      speed: 0.8,
      rayLength: 2.5,
    },
  },
  {
    id: "about",
    light: {
      origin: "right",
      color: "#f5a352",
      spread: 1.0,
      speed: 0.6,
      rayLength: 2.0,
    },
  },
  {
    id: "projects",
    light: {
      origin: "left",
      color: "#f5a352",
      spread: 1.1,
      speed: 0.7,
      rayLength: 2.2,
    },
  },
  {
    id: "services",
    light: {
      origin: "top-right",
      color: "#f5a352",
      spread: 1.0,
      speed: 0.6,
      rayLength: 2.0,
    },
  },
  {
    id: "testimonials",
    light: {
      origin: "bottom-center",
      color: "#f5a352",
      spread: 0.9,
      speed: 0.5,
      rayLength: 1.8,
    },
  },
  {
    id: "contact",
    light: {
      origin: "top-left",
      color: "#f5a352",
      spread: 1.0,
      speed: 0.6,
      rayLength: 2.0,
    },
  },
];

export function DynamicLightRays() {
  const [currentConfig, setCurrentConfig] = useState<LightConfig>(
    sectionConfigs[0].light
  );
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [lightKey, setLightKey] = useState(0);
  const observersRef = useRef<IntersectionObserver[]>([]);

  useEffect(() => {
    // Clean up previous observers
    observersRef.current.forEach((observer) => observer.disconnect());
    observersRef.current = [];

    // Create observers for each section
    sectionConfigs.forEach((config, index) => {
      const element = document.getElementById(config.id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Trigger when section is 50% visible
            if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
              setIsTransitioning(true);
              
              // Small delay for smooth transition
              setTimeout(() => {
                setCurrentConfig(config.light);
                setLightKey((prev) => prev + 1);
                
                setTimeout(() => {
                  setIsTransitioning(false);
                }, 300);
              }, 150);
            }
          });
        },
        {
          threshold: [0.3, 0.5],
          rootMargin: "-10% 0px -10% 0px",
        }
      );

      observer.observe(element);
      observersRef.current.push(observer);
    });

    return () => {
      observersRef.current.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={lightKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: isTransitioning ? 0.3 : 0.6 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <LightRays
            raysOrigin={currentConfig.origin}
            raysColor={currentConfig.color}
            lightSpread={currentConfig.spread}
            raysSpeed={currentConfig.speed}
            rayLength={currentConfig.rayLength}
            pulsating={true}
            fadeDistance={1.2}
            saturation={0.8}
            followMouse={true}
            mouseInfluence={0.05}
            noiseAmount={0.02}
            distortion={0.01}
            className="w-full h-full"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlay for better blending */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/40 pointer-events-none" />
    </div>
  );
}
