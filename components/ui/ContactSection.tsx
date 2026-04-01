"use client";

import { useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  EnvelopeIcon,
  ClockIcon,
  MapPinIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const REASSURANCES = [
  "Échange de 15 min, sans engagement",
  "Devis en 48h",
  "Forfait fixe, zéro surprise",
];

const EMPLOYEES_OPTIONS = ["1-20", "20-50", "50-100", "100+"];
const BUDGET_OPTIONS = [
  "< 2 500€",
  "2 500 – 4 000€",
  "4 000 – 5 000€",
  "> 5 000€",
  "Je ne sais pas encore",
];

const inputClass =
  "w-full px-4 py-3 rounded-lg bg-background border border-border text-text-primary placeholder:text-text-secondary text-sm outline-none transition-colors duration-200 focus:border-accent focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:ring-offset-1 focus-visible:ring-offset-background";

const labelClass = "block text-sm font-medium text-text-secondary mb-1.5";

type Status = "idle" | "loading" | "success" | "error";

const headerVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" } as object,
  },
};

const colVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut", delay } as object,
  }),
};

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [fields, setFields] = useState({
    name: "",
    email: "",
    company: "",
    employees: "",
    message: "",
    budget: "",
  });
  const [errors, setErrors] = useState<Partial<typeof fields>>({});
  const [status, setStatus] = useState<Status>("idle");

  function set(key: keyof typeof fields, value: string) {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: "" }));
  }

  function validate() {
    const next: Partial<typeof fields> = {};
    if (!fields.name.trim()) next.name = "Requis";
    if (!fields.email.trim()) {
      next.email = "Requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      next.email = "Email invalide";
    }
    if (!fields.company.trim()) next.company = "Requis";
    if (!fields.message.trim()) next.message = "Requis";
    return next;
  }

  async function handleSubmit() {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.name,
          email: fields.email,
          company: `${fields.company}${fields.employees ? ` (${fields.employees} sal.)` : ""}`,
          employees: fields.employees,
          message: fields.message,
          budget: fields.budget,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="px-6 py-24 sm:py-32 bg-surface">
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
            Parlons de votre projet
          </h2>
          <p className="text-text-secondary text-lg">
            Décrivez votre besoin, je vous réponds sous 24h.
          </p>
        </motion.div>

        {/* Layout — stacked on mobile (info above form), side-by-side on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-10 md:gap-16">
          {/* Left / Top — contact info */}
          <motion.div
            custom={0.1}
            variants={colVariant}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col gap-8"
          >
            {/* Contact details */}
            <div className="flex flex-col gap-4">
              <a
                href="mailto:stefan@stef-dev.fr"
                className="flex items-center gap-3 group"
              >
                <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-background border border-border text-text-secondary group-hover:text-accent group-hover:border-accent transition-colors duration-200 flex-shrink-0">
                  <EnvelopeIcon className="w-4 h-4" />
                </span>
                <span className="text-sm text-text-primary group-hover:text-accent transition-colors duration-200">
                  stefan@stef-dev.fr
                </span>
              </a>

              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-background border border-border text-text-secondary flex-shrink-0">
                  <ClockIcon className="w-4 h-4" />
                </span>
                <span className="text-sm text-text-primary">Réponse sous 24h</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-background border border-border text-text-secondary flex-shrink-0">
                  <MapPinIcon className="w-4 h-4" />
                </span>
                <span className="text-sm text-text-primary">France</span>
              </div>
            </div>

            {/* Reassurances */}
            <div className="flex flex-col gap-3 pt-6 border-t border-border">
              {REASSURANCES.map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <CheckCircleIcon className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-text-secondary">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right / Bottom — form */}
          <motion.div
            custom={0.2}
            variants={colVariant}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                <CheckCircleIcon className="w-12 h-12 text-accent" />
                <p className="text-lg font-semibold text-text-primary">
                  Message envoyé !
                </p>
                <p className="text-text-secondary text-sm">
                  Je vous réponds sous 24h.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className={labelClass}>
                    Prénom &amp; Nom <span className="text-danger" aria-hidden>*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    className={inputClass}
                    placeholder="Jean Dupont"
                    value={fields.name}
                    onChange={(e) => set("name", e.target.value)}
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "error-name" : undefined}
                    autoComplete="name"
                  />
                  {errors.name && (
                    <p id="error-name" className="mt-1 text-xs text-danger" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className={labelClass}>
                    Email professionnel <span className="text-danger" aria-hidden>*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    className={inputClass}
                    placeholder="jean@entreprise.fr"
                    value={fields.email}
                    onChange={(e) => set("email", e.target.value)}
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "error-email" : undefined}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p id="error-email" className="mt-1 text-xs text-danger" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Company + employees — stacked on mobile, side-by-side on sm+ */}
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4">
                  <div>
                    <label htmlFor="contact-company" className={labelClass}>
                      Entreprise <span className="text-danger" aria-hidden>*</span>
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      className={inputClass}
                      placeholder="Dupont & Associés"
                      value={fields.company}
                      onChange={(e) => set("company", e.target.value)}
                      aria-required="true"
                      aria-invalid={!!errors.company}
                      aria-describedby={errors.company ? "error-company" : undefined}
                      autoComplete="organization"
                    />
                    {errors.company && (
                      <p id="error-company" className="mt-1 text-xs text-danger" role="alert">
                        {errors.company}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="contact-employees" className={labelClass}>Salariés</label>
                    <select
                      id="contact-employees"
                      className={inputClass}
                      value={fields.employees}
                      onChange={(e) => set("employees", e.target.value)}
                    >
                      <option value="">—</option>
                      {EMPLOYEES_OPTIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className={labelClass}>
                    Décrivez votre besoin <span className="text-danger" aria-hidden>*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    className={inputClass}
                    placeholder="Ex: On gère notre stock sur Excel et on perd un temps fou..."
                    value={fields.message}
                    onChange={(e) => set("message", e.target.value)}
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "error-message" : undefined}
                  />
                  {errors.message && (
                    <p id="error-message" className="mt-1 text-xs text-danger" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Budget */}
                <div>
                  <label htmlFor="contact-budget" className={labelClass}>Budget estimé</label>
                  <select
                    id="contact-budget"
                    className={inputClass}
                    value={fields.budget}
                    onChange={(e) => set("budget", e.target.value)}
                  >
                    <option value="">Sélectionner (optionnel)</option>
                    {BUDGET_OPTIONS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={status === "loading"}
                    className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-accent-btn hover:bg-accent text-white font-semibold text-sm transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin w-4 h-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          aria-hidden
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                          />
                        </svg>
                        Envoi en cours...
                      </span>
                    ) : (
                      "Envoyer ma demande"
                    )}
                  </button>

                  {status === "error" && (
                    <p className="mt-3 text-xs text-danger text-center" role="alert">
                      Erreur, réessayez ou écrivez-moi directement à{" "}
                      <a
                        href="mailto:stefan@stef-dev.fr"
                        className="underline hover:text-danger/80"
                      >
                        stefan@stef-dev.fr
                      </a>
                    </p>
                  )}

                  <p className="mt-3 text-xs text-text-secondary text-center">
                    Pas de spam, pas de newsletter. Juste une réponse à votre demande.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
