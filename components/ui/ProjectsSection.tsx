"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const PROJECTS = [
  {
    tag: "BTP · 35 salariés",
    title: "Dashboard suivi de chantiers",
    description:
      "Remplacement de 4 fichiers Excel par un tableau de bord centralisé. Suivi d'avancement, dépenses, planning équipes. Accessible depuis le chantier sur mobile.",
    result: "8h/semaine économisées",
    budget: "3 500€",
    delay: "12 jours",
  },
  {
    tag: "Négoce · 60 salariés",
    title: "Portail client commandes",
    description:
      "Les clients passent et suivent leurs commandes en ligne. Alertes automatiques à chaque changement de statut. Moins d'appels au service commercial.",
    result: "-40% d'appels entrants",
    budget: "4 500€",
    delay: "18 jours",
  },
  {
    tag: "Cabinet comptable · 25 salariés",
    title: "Outil de collecte documents",
    description:
      "Les clients du cabinet déposent leurs pièces comptables dans un espace dédié. Tri automatique par catégorie. Fini les emails avec 15 pièces jointes.",
    result: "3h/jour économisées",
    budget: "2 800€",
    delay: "8 jours",
  },
];

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.13, delayChildren: 0.1 },
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

const headerVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" } as object,
  },
};

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projets" className="px-6 py-24 sm:py-32">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          className="mb-14"
          variants={headerVariant}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Exemples de projets livrés
          </h2>
          <p className="text-text-secondary text-lg max-w-xl">
            Chaque outil est construit sur-mesure. Voici le type de projets que je réalise.
          </p>
        </motion.div>

        {/* Cards — 1 col mobile, 2 col tablet, 3 col desktop */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {PROJECTS.map(({ tag, title, description, result, budget, delay }) => (
            <motion.div
              key={title}
              variants={card}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex flex-col gap-4 p-6 rounded-xl bg-surface border border-border hover:border-accent/40 transition-colors duration-300"
            >
              {/* Tag */}
              <div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium text-accent bg-accent/10">
                  {tag}
                </span>
              </div>

              {/* Title + description */}
              <div className="flex-1">
                <h3 className="font-display text-base font-semibold text-text-primary mb-2">
                  {title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Result */}
              <div className="pt-2 border-t border-border">
                <p className="text-sm font-semibold text-text-primary">
                  {result}
                </p>
              </div>

              {/* Budget + delay badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-background border border-border text-text-secondary">
                  <span className="text-text-primary font-semibold">{budget}</span>
                  forfait fixe
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-background border border-border text-text-secondary">
                  <span className="text-text-primary font-semibold">{delay}</span>
                  de délai
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          className="text-center text-text-secondary text-sm mt-8"
          variants={headerVariant}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.5 }}
        >
          Exemples illustratifs basés sur des projets types.
        </motion.p>
      </div>
    </section>
  );
}
