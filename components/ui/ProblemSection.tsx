"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  TableCellsIcon,
  ClockIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const CARDS = [
  {
    icon: TableCellsIcon,
    title: "Excel partout",
    description:
      "Vos fichiers de suivi se multiplient, personne n'a la même version, les données sont saisies en double.",
  },
  {
    icon: ClockIcon,
    title: "Des heures perdues",
    description:
      "Vos équipes passent 5 à 10 heures par semaine à chercher une info, ressaisir des données, mettre à jour un tableau.",
  },
  {
    icon: ExclamationTriangleIcon,
    title: "Zéro visibilité",
    description:
      "Impossible d'avoir un tableau de bord fiable en temps réel. Les décisions se prennent à l'aveugle.",
  },
];

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const card: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" } as object,
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" } as object,
  },
};

export default function ProblemSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative px-6 py-24 sm:py-32">
      {/* Section header */}
      <motion.div
        ref={ref}
        className="max-w-3xl mx-auto text-center mb-14"
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary mb-0">
          Vous reconnaissez cette situation&nbsp;?
        </h2>
      </motion.div>

      {/* Cards — 1 col mobile, 2 col tablet, 3 col desktop */}
      <motion.div
        className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {CARDS.map(({ icon: Icon, title, description }) => (
          <motion.div
            key={title}
            variants={card}
            className="group relative flex flex-col gap-4 p-6 rounded-xl bg-surface border border-border transition-all duration-300 hover:border-accent/40"
            style={{
              boxShadow: "0 0 0 0 rgba(59,130,246,0)",
            }}
            whileHover={{
              boxShadow: "0 0 24px 0 rgba(59,130,246,0.08)",
            }}
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-background border border-border text-accent">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-text-primary mb-2">
                {title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Transition phrase */}
      <motion.p
        className="text-center text-text-secondary mt-12 text-base"
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ delay: 0.5 }}
      >
        Un outil web dédié résout ces 3 problèmes en 2&nbsp;semaines.
      </motion.p>
    </section>
  );
}
