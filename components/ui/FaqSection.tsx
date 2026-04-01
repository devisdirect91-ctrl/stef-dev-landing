"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView, type Variants } from "framer-motion";
import { PlusIcon } from "@heroicons/react/24/outline";

const FAQS = [
  {
    q: "Quelles technologies utilisez-vous ?",
    a: "Je développe avec Next.js, TypeScript et Supabase — des technologies modernes, rapides et maintenables. Votre outil est hébergé sur des serveurs européens, accessible 24/7 depuis n'importe quel navigateur.",
  },
  {
    q: "Combien de temps prend le développement ?",
    a: "Entre 1 et 3 semaines selon la complexité. Un outil simple (dashboard, formulaire) prend 5-8 jours. Un outil complet (portail, CRM) prend 10-18 jours. Vous recevez un accès preview pendant le développement.",
  },
  {
    q: "Le prix peut-il augmenter en cours de projet ?",
    a: "Non. Le devis est un forfait fixe. Si je sous-estime la charge, c'est pour moi. Le prix que vous validez est le prix que vous payez.",
  },
  {
    q: "Et si le résultat ne me convient pas ?",
    a: "Vous suivez l'avancement via un accès preview. On ajuste au fil du développement. Si à la livraison le résultat ne correspond pas au cahier des charges validé, je corrige sans surcoût.",
  },
  {
    q: "Qui héberge l'outil ?",
    a: "L'hébergement première année est inclus dans le forfait. Ensuite, soit je continue à l'héberger (inclus dans la maintenance), soit je vous transfère tout.",
  },
  {
    q: "Est-ce que je suis propriétaire du code ?",
    a: "Oui, à 100%. À la livraison vous recevez l'intégralité du code source. Pas de dépendance, pas de lock-in.",
  },
  {
    q: "Comment se passe le paiement ?",
    a: "50% à la validation du devis, 50% à la livraison. Paiement par virement bancaire.",
  },
  {
    q: "Vous travaillez seul ?",
    a: "Oui. Un seul interlocuteur du premier échange à la livraison. Pas de commercial, pas de chef de projet, pas d'intermédiaire. Vous parlez directement à la personne qui code votre outil.",
  },
];

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const itemVariant: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" } as object,
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

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div variants={itemVariant} className="border-b border-border last:border-b-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
        aria-expanded={open}
      >
        <span className="text-base font-medium text-text-primary group-hover:text-accent transition-colors duration-200">
          {q}
        </span>
        <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full border border-border text-text-secondary group-hover:border-accent group-hover:text-accent transition-colors duration-200">
          <motion.div
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <PlusIcon className="w-3.5 h-3.5" />
          </motion.div>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-text-secondary leading-relaxed max-w-2xl">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FaqSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="faq" className="px-6 py-24 sm:py-32">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          className="mb-12"
          variants={headerVariant}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary">
            Questions fréquentes
          </h2>
        </motion.div>

        {/* Accordion */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {FAQS.map(({ q, a }) => (
            <FaqItem key={q} q={q} a={a} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
