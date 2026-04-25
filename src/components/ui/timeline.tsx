"use client";
import { useScroll, useTransform, motion } from "framer-motion";
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
  }, [ref, data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Layout aligned to the page's max-w-3xl + px-6 constraint.
  // The vertical line sits at left:24px (= px-6) so it's flush with where
  // the "Experience" heading text starts. Entries indent past the line.
  return (
    <div className="w-full bg-black font-sans" ref={containerRef}>
      <div className="max-w-3xl mx-auto px-6 pt-16 pb-6">
        <h2 className="text-3xl md:text-4xl font-bold">Experience</h2>
      </div>

      <div ref={ref} className="relative max-w-3xl mx-auto px-6 pb-16">
        {/* Vertical line */}
        <div
          style={{ height: height + "px" }}
          className="absolute left-6 top-0 w-px bg-zinc-900 overflow-hidden"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-px bg-gradient-to-b from-transparent via-zinc-500 to-transparent rounded-full"
          />
        </div>

        {data.map((item, index) => (
          <div key={index} className="relative pl-10 md:pl-12 pt-10 first:pt-2">
            {/* Dot, centered on the line */}
            <div className="absolute left-6 top-12 -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-zinc-700 ring-4 ring-black" />

            <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">
              {item.title}
            </p>
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
};
