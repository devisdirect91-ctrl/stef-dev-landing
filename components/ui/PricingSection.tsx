"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { CheckIcon, ClockIcon } from "@heroicons/react/24/outline";

const PLANS = [
  {
    name: "Outil simple",
    price: "À partir de 2 500€",
    subPrice: "Forfait fixe",
    description: "Un besoin précis, une solution ciblée.",
    features: [
      "1 fonctionnalité principale",
      "Design responsive mobile",
      "Hébergement 1ère année inclus",
      "Formation équipe 30 min",
      "Support email 30 jours",
    ],
    delay: "1-2 semaines",
    featured: false,
  },
  {
    name: "Outil complet",
    price: "À partir de 4 000€",
    subPrice: "Forfait fixe",
    description: "Plusieurs fonctionnalités, intégrations, workflow complet.",
    features: [
      "Fonctionnalités multiples",
      "Design responsive mobile",
      "Hébergement 1ère année inclus",
      "Intégrations (email, API, export)",
      "Formation équipe 1h",
      "Support email 60 jours",
    ],
    delay: "2-3 semaines",
    featured: true,
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

export default function PricingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="tarifs" className="px-6 py-24 sm:py-32 bg-surface">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-14"
          variants={headerVariant}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Tarification simple
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            Forfait fixe. Pas de TJM, pas de dépassement, pas de mauvaise surprise.
          </p>
        </motion.div>

        {/* Cards — featured card first on mobile via order */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {PLANS.map(({ name, price, subPrice, description, features, delay: deliveryDelay, featured }) => (
            <motion.div
              key={name}
              variants={card}
              className={`relative flex flex-col rounded-xl p-7 ${
                featured
                  ? "order-first md:order-none bg-surface border border-accent/50 ring-1 ring-accent/20"
                  : "bg-background border border-border"
              }`}
            >
              {/* Featured badge */}
              {featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-accent-btn text-white">
                    Le plus demandé
                  </span>
                </div>
              )}

              {/* Plan name */}
              <p className="text-sm font-semibold text-text-secondary uppercase tracking-widest mb-4">
                {name}
              </p>

              {/* Price */}
              <div className="mb-2">
                <span className="font-display text-3xl font-bold text-text-primary">
                  {price}
                </span>
              </div>
              <p className="text-xs text-text-secondary mb-3">{subPrice}</p>

              {/* Description */}
              <p className="text-sm text-text-secondary mb-6 pb-6 border-b border-border">
                {description}
              </p>

              {/* Features */}
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-text-primary">
                    <CheckIcon
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${featured ? "text-accent" : "text-text-secondary"}`}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Delay badge */}
              <div className="flex items-center gap-2 mb-6">
                <ClockIcon className="w-4 h-4 text-text-secondary flex-shrink-0" />
                <span className="text-sm text-text-secondary">
                  Livraison en{" "}
                  <span className="text-text-primary font-medium">{deliveryDelay}</span>
                </span>
              </div>

              {/* CTA */}
              <a
                href="#contact"
                className={`w-full inline-flex items-center justify-center px-5 py-3 rounded-lg font-semibold text-sm transition-colors duration-200 ${
                  featured
                    ? "bg-accent-btn hover:bg-accent text-white"
                    : "bg-surface border border-border text-text-primary hover:border-accent hover:text-accent"
                }`}
              >
                Discuter de mon projet
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer note */}
        <motion.p
          className="text-center text-text-secondary text-sm mt-8 leading-relaxed"
          variants={headerVariant}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.4 }}
        >
          Maintenance optionnelle : 200–300€/mois
          <span className="mx-2 text-border">·</span>
          Acompte 50% à la commande, solde à la livraison
        </motion.p>
      </div>
    </section>
  );
}
