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
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-black font-sans px-4 md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto md:ml-28 mt-12 md:mt-20 px-4 md:px-8 lg:px-10">
        <div className="flex items-center space-x-4 md:space-x-8 mb-6 md:mb-8">
          <div className="text-xl md:text-2xl">✱</div>
          <div>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-light leading-tight">
              My
              <br />
              <span className="font-semibold">EMPLOYMENT</span>
              <br />  
              <span className="font-semibold">TIMELINE</span>
            </h2>
          </div>
        </div>
        <div className="pl-6 md:pl-10 lg:pl-[4rem]">
          <p className="text-gray-400 text-sm md:text-base max-w-sm">
            I&apos;ve been working on various projects for the past few years. Here&apos;s
            a timeline of my professional journey.
          </p>
        </div>
      </div>

      <div ref={ref} className="relative mx-auto md:ml-20 max-w-7xl pl-8 md:pl-20 pb-12 md:pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-6 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-20 md:top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-8 md:h-10 absolute left-1 md:left-3 w-8 md:w-10 rounded-full bg-black flex items-center justify-center">
                <div className="h-3 w-3 md:h-4 md:w-4 rounded-full bg-gray-800 border border-gray-700 p-1 md:p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-gray-500">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-12 md:pl-4 pr-4 w-full">
              <h3 className="md:hidden block text-lg md:text-2xl mb-4 text-left font-bold text-gray-500">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute left-4 md:left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-gray-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-orange-500 via-lime-400 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};