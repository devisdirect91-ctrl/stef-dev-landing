"use client";

import { motion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" } as object,
  },
};

const STATS = ["Livraison 2-3 semaines", "Forfait fixe", "Satisfaction garantie"];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Background radial gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 80% 10%, rgba(59,130,246,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Noise overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-3xl w-full mx-auto text-center"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={item} className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-medium bg-surface border border-border text-text-secondary">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            Développeur web · France
          </span>
        </motion.div>

        {/* Title — text-3xl mobile, text-4xl tablet, text-6xl desktop */}
        <motion.h1
          variants={item}
          className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.1] tracking-tight text-text-primary mb-6"
        >
          Vos équipes perdent des heures sur Excel.{" "}
          <span className="gradient-accent">
            Je vous livre un outil sur-mesure en 2&nbsp;semaines.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={item}
          className="text-base sm:text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto mb-10"
        >
          Développeur spécialisé dans les outils internes pour PME. Forfait fixe
          de 2&nbsp;500 à 5&nbsp;000€. Pas de surprise, pas de dépassement.
        </motion.p>

        {/* CTAs — stacked full-width on mobile, side-by-side auto-width on sm+ */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row gap-3 justify-center mb-10"
        >
          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-accent-btn hover:bg-accent text-white font-semibold text-base transition-colors duration-200"
          >
            Discuter de votre projet
          </a>
          <a
            href="#projets"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-lg border border-border text-text-primary font-semibold text-base hover:border-accent hover:text-accent transition-colors duration-200"
          >
            Voir des exemples
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={item}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-text-secondary"
        >
          {STATS.map((stat, i) => (
            <span key={stat} className="flex items-center gap-2">
              {i > 0 && <span className="hidden sm:inline h-px w-4 bg-border" />}
              {stat}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
