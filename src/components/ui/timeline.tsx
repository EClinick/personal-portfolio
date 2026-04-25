"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.getBoundingClientRect().height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full bg-black font-sans" ref={containerRef}>
      {/* Heading — aligned with max-w-3xl page constraint */}
      <div className="max-w-3xl mx-auto px-6 pt-16 pb-6">
        <h2 className="text-3xl md:text-4xl font-bold">Experience</h2>
      </div>

      <div ref={ref} className="relative mx-auto max-w-5xl pl-10 md:pl-24 pr-6 pb-16">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-8 md:pt-24 md:gap-10">
            {/* Sticky date label */}
            <div className="sticky top-24 flex flex-col md:flex-row z-40 items-center self-start max-w-xs lg:max-w-sm md:w-full shrink-0">
              <div className="h-8 w-8 absolute -left-5 md:-left-7 rounded-full bg-black border border-zinc-800 flex items-center justify-center">
                <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              </div>
              <h3 className="hidden md:block text-sm md:pl-16 font-mono text-zinc-600 whitespace-nowrap">
                {item.title}
              </h3>
            </div>

            {/* Entry content */}
            <div className="relative w-full pr-2">
              <h3 className="md:hidden block text-xs font-mono text-zinc-600 mb-3">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        {/* Animated vertical line */}
        <div
          style={{ height: height + "px" }}
          className="absolute left-4 md:left-8 top-0 overflow-hidden w-px bg-zinc-900"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-px bg-gradient-to-b from-transparent via-zinc-500 to-transparent rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
