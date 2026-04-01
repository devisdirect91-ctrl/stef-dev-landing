import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Stef Dev",
  description: "Développement d'outils web sur-mesure pour PME",
  url: "https://stef-dev.fr",
  areaServed: "FR",
  priceRange: "2500€ - 5000€",
};

export const metadata: Metadata = {
  title: "Stef Dev — Outils web sur-mesure pour PME | Développeur freelance France",
  description:
    "Développeur web spécialisé dans les outils internes sur-mesure pour PME. Dashboards, CRM, portails clients. Forfait fixe 2 500-5 000€, livré en 2-3 semaines.",
  keywords: [
    "développeur web PME",
    "outil interne sur-mesure",
    "application web entreprise",
    "remplacement Excel",
    "CRM interne",
    "dashboard PME",
    "développeur freelance France",
    "BTP logistique industrie",
    "portail client sur-mesure",
  ],
  authors: [{ name: "Stef", url: "https://stef-dev.fr" }],
  creator: "Stef",
  metadataBase: new URL("https://stef-dev.fr"),
  alternates: {
    canonical: "https://stef-dev.fr",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://stef-dev.fr",
    title: "Stef Dev — Outils web sur-mesure pour PME | Développeur freelance France",
    description:
      "Développeur web spécialisé dans les outils internes sur-mesure pour PME. Dashboards, CRM, portails clients. Forfait fixe 2 500-5 000€, livré en 2-3 semaines.",
    siteName: "Stef Dev",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Stef Dev — Outils web sur-mesure pour PME",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stef Dev — Outils web sur-mesure pour PME | Développeur freelance France",
    description:
      "Développeur web spécialisé dans les outils internes sur-mesure pour PME. Dashboards, CRM, portails clients. Forfait fixe 2 500-5 000€, livré en 2-3 semaines.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(professionalServiceJsonLd),
          }}
        />
        {children}
      </body>
    </html>
  );
}
