"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const ITEMS = [
  {
    title: "Tableaux de bord",
    description:
      "Vos KPIs en temps réel, accessibles depuis n'importe quel appareil. Fini les exports Excel du lundi matin.",
  },
  {
    title: "CRM internes",
    description:
      "Suivi de vos clients, prospects ou fournisseurs dans un outil taillé pour votre process, pas un Salesforce à 50€/user.",
  },
  {
    title: "Portails clients",
    description:
      "Vos clients consultent leurs factures, devis ou commandes en autonomie. Moins d'appels, plus de satisfaction.",
  },
  {
    title: "Gestion de stock",
    description:
      "Entrées, sorties, alertes de seuil. Simple, visuel, accessible depuis le terrain.",
  },
  {
    title: "Outils de planification",
    description:
      "Planning équipes, réservation de ressources, gestion de chantiers. Adapté à votre métier.",
  },
  {
    title: "Formulaires & workflows",
    description:
      "Demandes de congés, bons de commande, validations. Remplacez le papier et les allers-retours d'emails.",
  },
];

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" } as object,
  },
};

const header: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" } as object,
  },
};

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="px-6 py-24 sm:py-32">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          className="mb-16"
          variants={header}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Ce que je développe pour vous
          </h2>
          <p className="text-text-secondary text-lg max-w-xl">
            Des outils web que vos équipes utilisent vraiment, pas des usines à gaz.
          </p>
        </motion.div>

        {/* Grid — 1 col mobile, 2 col tablet+  */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0"
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {ITEMS.map(({ title, description }, index) => {
            // In 2-col layout: last 2 items (nth-last-child 1 and 2) have no bottom border
            // In 1-col layout: only last item has no bottom border
            const isLastInTwoCol = index >= ITEMS.length - 2;
            return (
              <motion.div
                key={title}
                variants={item}
                className={`group relative flex gap-5 py-7 border-b border-border ${
                  index === ITEMS.length - 1 ? "border-b-0" : ""
                } ${isLastInTwoCol ? "md:border-b-0" : ""}`}
              >
                {/* Left accent bar */}
                <div className="relative flex-shrink-0 w-px mt-1">
                  <div className="absolute inset-0 bg-border transition-colors duration-300 group-hover:bg-accent" />
                  <motion.div
                    className="absolute top-0 left-0 w-full bg-accent origin-top"
                    initial={{ scaleY: 0 }}
                    whileHover={{ scaleY: 1 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  />
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-display text-base font-semibold text-text-primary mb-1.5 transition-colors duration-200 group-hover:text-accent">
                    {title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
