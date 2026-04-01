"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "Appel découverte",
    description:
      "15 minutes pour comprendre votre besoin. Pas de jargon, pas de commercial.",
    duration: "15 min",
  },
  {
    number: "02",
    title: "Proposition & devis",
    description:
      "Sous 48h vous recevez un devis forfaitaire. Le prix ne bougera pas.",
    duration: "48h",
  },
  {
    number: "03",
    title: "Développement",
    description:
      "Je code votre outil. Vous recevez un accès preview pour suivre l'avancement.",
    duration: "1-3 sem.",
  },
  {
    number: "04",
    title: "Livraison & formation",
    description:
      "Votre outil est en ligne. Je forme votre équipe en 30 minutes.",
    duration: "30 min",
  },
];

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.2 },
  },
};

const stepVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" } as object,
  },
};

const headerVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" } as object,
  },
};

export default function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isLineInView = useInView(lineRef, { once: true, margin: "-80px" });

  return (
    <section className="px-6 py-24 sm:py-32 bg-surface">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-20"
          variants={headerVariant}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Simple, rapide, sans surprise
          </h2>
          <p className="text-text-secondary text-lg">
            De votre problème à votre outil en 4 étapes.
          </p>
        </motion.div>

        {/* Steps — mobile: 1 col vertical, tablet: 2x2 grid, desktop: 4 col horizontal */}
        <div className="relative" ref={lineRef}>
          {/* Dashed line — desktop only (lg+) */}
          <div
            aria-hidden
            className="hidden lg:block absolute top-[2.75rem] left-[calc(12.5%+1rem)] right-[calc(12.5%+1rem)] h-px overflow-hidden"
          >
            {/* Base line */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, rgba(59,130,246,0.25) 0px, rgba(59,130,246,0.25) 6px, transparent 6px, transparent 14px)",
              }}
            />
            {/* Animated fill */}
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, rgba(59,130,246,0.7) 0px, rgba(59,130,246,0.7) 6px, transparent 6px, transparent 14px)",
                transformOrigin: "left",
              }}
              initial={{ scaleX: 0 }}
              animate={isLineInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
            />
          </div>

          {/* Steps grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-0 md:gap-y-10 lg:gap-y-0"
            variants={container}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {STEPS.map(({ number, title, description, duration }, i) => (
              <motion.div
                key={number}
                variants={stepVariant}
                className="relative flex lg:flex-col items-start lg:items-center gap-6 lg:gap-0 lg:text-center px-0 lg:px-4 pb-10 lg:pb-0"
              >
                {/* Vertical dashed line — mobile only (hidden at md+) */}
                {i < STEPS.length - 1 && (
                  <div
                    aria-hidden
                    className="md:hidden absolute left-[1.375rem] top-[3.5rem] bottom-0 w-px"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(180deg, rgba(59,130,246,0.4) 0px, rgba(59,130,246,0.4) 6px, transparent 6px, transparent 14px)",
                    }}
                  />
                )}

                {/* Number circle */}
                <div className="relative flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-full bg-background border border-border z-10">
                  {/* Large ghost number */}
                  <span
                    aria-hidden
                    className="absolute font-display font-bold text-5xl text-accent select-none"
                    style={{
                      opacity: 0.12,
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      lineHeight: 1,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {number}
                  </span>
                  <span className="font-display text-xs font-bold text-accent z-10">
                    {number}
                  </span>
                </div>

                {/* Content */}
                <div className="lg:mt-6 flex-1 lg:flex-none">
                  <h3 className="font-display text-base font-semibold text-text-primary mb-2">
                    {title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-3">
                    {description}
                  </p>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-background border border-border text-accent">
                    {duration}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
