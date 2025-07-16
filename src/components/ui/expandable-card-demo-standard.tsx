"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../hooks/use-outside-click";
import { createPortal } from "react-dom";
import tanaiImg from "../../assets/tanai.jpeg";
import plangenieImg from "../../assets/plangenie.jpg";
import vcryptImg from "../../assets/vcrypt.png";
import trademindImg from "../../assets/trademind.gif";
import cryptomonitorImg from "../../assets/cryptov2.png";
import seeqImg from "../../assets/weatherford.jpg";

export default function ExpandableCardDemo() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  // Modal content to be portaled
  const modal = (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layoutId={`button-${active.title}-${id}`}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );

  return (
    <>
      {typeof window !== "undefined" && active && typeof active === "object"
        ? createPortal(modal, document.body)
        : null}
      <ul className="max-w-2xl mx-auto w-full gap-4">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col md:flex-row ">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <img
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.title}-${id}`}
              className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0"
            >
              {card.ctaText}
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  // Experience
  {
    title: "Founder, Tan.ai",
    description: "AI-driven iOS app for personalized tanning advice",
    src: tanaiImg,
    ctaText: "Website",
    ctaLink: "https://tanai.app",
    content: () => (
      <ul className="list-disc pl-6">
        <li>Developed and launched an AI-driven iOS application providing personalized tanning advice</li>
        <li>Created a secure, account-free authentication process using UUID-based user identification</li>
        <li>Optimized backend architecture through AWS integration, enhancing data security and reducing latency by 25%</li>
        <li>Implemented a custom-trained AI model for skin tone detection using OpenAI's API</li>
        <li>Utilized image analysis techniques to generate data-driven user insights</li>
      </ul>
    ),
  },
  {
    title: "Founder, PlanGenie",
    description: "AI-powered task management for neurodivergent individuals",
    src: plangenieImg,
    ctaText: "Website",
    ctaLink: "https://plangenie.net",
    content: () => (
      <ul className="list-disc pl-6">
        <li>Developed an AI-powered task management platform tailored for neurodivergent individuals</li>
        <li>Integrated advanced AI models for intelligent task breakdown and scheduling</li>
        <li>Designed a user-friendly interface for natural task creation and organization</li>
        <li>Implemented features like interactive timeline views, multi-calendar sync, and notifications</li>
        <li>Collaborated with neurodivergent communities to ensure platform fit</li>
      </ul>
    ),
  },
  // {
  //   title: "Co-founder, Vcrypt Software LLC",
  //   description: "Financial market data & trading algorithms",
  //   src: vcryptImg,
  //   ctaText: "Website",
  //   ctaLink: "https://vcryptfinancial.com",
  //   content: () => (
  //     <ul className="list-disc pl-4">
  //       <li>Led backend systems for financial market data solutions using Rust, Python, and React Native</li>
  //       <li>Integrated Stripe for payments and OAuth for secure authentication</li>
  //       <li>Designed and deployed trading algorithms (long-term, intra-week, high-frequency)</li>
  //       <li>Enhanced data processing efficiency by 30% through algorithm optimization</li>
  //       <li>Secured initial funding by demonstrating business acumen and algorithmic performance</li>
  //     </ul>
  //   ),
  // },
  // {
  //   title: "Software Engineer, Seeq Corporation",
  //   description: "AI integration & backend features for industrial analytics",
  //   src: seeqImg,
  //   ctaText: "Company",
  //   ctaLink: "https://www.seeq.com",
  //   content: () => (
  //     <ul className="list-disc pl-4">
  //       <li>Led AI integration initiatives across Seeq’s platform, including Copilot for data analysis</li>
  //       <li>Enhanced interoperability with Microsoft’s ecosystem (Teams, Outlook, Azure)</li>
  //       <li>Developed backend features using TypeScript, Python, and Gradle in a large-scale monorepo</li>
  //       <li>Improved developer productivity by optimizing LLM prompt chains and retrieval-based agents</li>
  //       <li>Created automated testing frameworks for UI components and backend logic</li>
  //     </ul>
  //   ),
  // },
  // Projects
  {
    title: "Crypto Mining Monitor Bot",
    description: "Discord bot for monitoring cryptocurrency mining operations",
    src: cryptomonitorImg,
    ctaText: "GitHub",
    ctaLink: "https://github.com/EClinick/litecoinpool-bot",
    content: () => (
      <ul className="list-disc pl-6">
        <li>Real-time mining profitability monitoring for LTC & DOGE</li>
        <li>Automated worker status tracking with 30-second intervals</li>
        <li>Instant notifications for offline/online workers</li>
        <li>Price tracking and daily profit calculations</li>
        <li>Comprehensive Discord command interface</li>
      </ul>
    ),
  },
  {
    title: "Trademind",
    description: "AI-driven trading journaling & predictive insights platform",
    src: trademindImg,
    ctaText: "Website",
    ctaLink: "https://trademind.pro",
    content: () => (
      <ul className="list-disc pl-6">
        <li>Real-time market analysis and automated trade tracking</li>
        <li>Comprehensive trading journal and portfolio performance metrics</li>
        <li>User-friendly interface for portfolio tracking</li>
        <li>Predictive analytics for trading insights</li>
      </ul>
    ),
  },
]; 