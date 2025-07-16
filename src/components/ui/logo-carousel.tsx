"use client"

import React, { useEffect, useState, useCallback, type SVGProps } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Logo {
  name: string;
  id: number;
  img: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface LogoCarouselProps {
  logos: Logo[];
  visibleCount?: number;
  interval?: number;
}

export function LogoCarousel({ logos, visibleCount = 3, interval = 2200 }: LogoCarouselProps) {
  const [index, setIndex] = useState(0);
  const total = logos.length;

  // Advance to next set
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + visibleCount) % total);
    }, interval);
    return () => clearInterval(timer);
  }, [visibleCount, total, interval]);

  // Get the current set of logos
  const currentSet = [];
  for (let i = 0; i < visibleCount; i++) {
    currentSet.push(logos[(index + i) % total]);
  }

  return (
    <div className="flex items-center justify-center w-full">
      <div className="relative flex w-full max-w-xl h-24">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={index}
            className="flex w-full gap-8 justify-center items-center absolute left-0 top-0"
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.5 }}
          >
            {currentSet.map((logo) => {
              const Icon = logo.img;
              return (
                <div key={logo.id} className="flex items-center justify-center h-20 w-20 md:h-24 md:w-24">
                  <Icon className="h-16 w-16 md:h-20 md:w-20" />
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
} 