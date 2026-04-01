import HeroSection from "@/components/ui/HeroSection";
import ProblemSection from "@/components/ui/ProblemSection";
import ServicesSection from "@/components/ui/ServicesSection";
import ProcessSection from "@/components/ui/ProcessSection";
import ProjectsSection from "@/components/ui/ProjectsSection";
import PricingSection from "@/components/ui/PricingSection";
import FaqSection from "@/components/ui/FaqSection";
import ContactSection from "@/components/ui/ContactSection";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quelles technologies utilisez-vous ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Je développe avec Next.js, TypeScript et Supabase — des technologies modernes, rapides et maintenables. Votre outil est hébergé sur des serveurs européens, accessible 24/7 depuis n'importe quel navigateur.",
      },
    },
    {
      "@type": "Question",
      name: "Combien de temps prend le développement ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Entre 1 et 3 semaines selon la complexité. Un outil simple (dashboard, formulaire) prend 5-8 jours. Un outil complet (portail, CRM) prend 10-18 jours. Vous recevez un accès preview pendant le développement.",
      },
    },
    {
      "@type": "Question",
      name: "Le prix peut-il augmenter en cours de projet ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Non. Le devis est un forfait fixe. Si je sous-estime la charge, c'est pour moi. Le prix que vous validez est le prix que vous payez.",
      },
    },
    {
      "@type": "Question",
      name: "Et si le résultat ne me convient pas ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vous suivez l'avancement via un accès preview. On ajuste au fil du développement. Si à la livraison le résultat ne correspond pas au cahier des charges validé, je corrige sans surcoût.",
      },
    },
    {
      "@type": "Question",
      name: "Qui héberge l'outil ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "L'hébergement première année est inclus dans le forfait. Ensuite, soit je continue à l'héberger (inclus dans la maintenance), soit je vous transfère tout.",
      },
    },
    {
      "@type": "Question",
      name: "Est-ce que je suis propriétaire du code ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, à 100%. À la livraison vous recevez l'intégralité du code source. Pas de dépendance, pas de lock-in.",
      },
    },
    {
      "@type": "Question",
      name: "Comment se passe le paiement ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "50% à la validation du devis, 50% à la livraison. Paiement par virement bancaire.",
      },
    },
    {
      "@type": "Question",
      name: "Vous travaillez seul ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui. Un seul interlocuteur du premier échange à la livraison. Pas de commercial, pas de chef de projet, pas d'intermédiaire. Vous parlez directement à la personne qui code votre outil.",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />
      <main className="bg-background text-text-primary">
        <HeroSection />
        <ProblemSection />
        <ServicesSection />
        <ProcessSection />
        <ProjectsSection />
        <PricingSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
