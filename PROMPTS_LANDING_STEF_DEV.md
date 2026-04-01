# Prompts Claude Code — Landing Page stef-dev.fr

## Contexte à coller en premier dans Claude Code

```
Tu travailles sur la landing page de stef-dev.fr — un développeur web solo français qui crée des outils internes sur-mesure (apps web) pour les PME de 20-100 salariés.

Stack : Next.js 14 (App Router), TypeScript, Tailwind CSS, déployé sur Vercel.

Cible : dirigeants et responsables opérations de PME françaises dans le BTP, la logistique, le négoce, l'industrie, les cabinets comptables.

Offre : remplacement des fichiers Excel et process papier par des outils web dédiés (dashboards, CRM internes, portails clients, gestion de stock, formulaires complexes, outils de planification). Forfait fixe 2 000 – 5 000€, livraison 2-3 semaines.

Positionnement : pas une agence, pas un freelance cheap. Un développeur spécialisé qui livre vite, bien, au forfait, sans surprise. Le client achète un résultat, pas des jours de dev.

Ton : professionnel mais direct. Pas corporate. Pas de jargon tech. Le prospect est un dirigeant de PME, pas un développeur.

Design : dark theme moderne, sobre, inspirant confiance. Palette sombre (gris/noir) avec une couleur d'accent vive (bleu électrique ou vert). Typographie clean et lisible. Pas d'emojis dans la page. Animations subtiles au scroll. Mobile-first.
```

---

## Prompt 1 — Setup du projet

```
Initialise un nouveau projet Next.js 14 (App Router) avec TypeScript et Tailwind CSS pour la landing page de stef-dev.fr.

Structure de fichiers :
- app/layout.tsx (metadata SEO + font Google : "Inter" pour le body, "Cabinet Grotesk" ou "Satoshi" via @fontsource ou CDN pour les titres)
- app/page.tsx (landing page complète)
- app/api/contact/route.ts (API route pour le formulaire)
- app/globals.css (Tailwind + custom styles)
- components/ui/ (composants réutilisables)
- tailwind.config.ts (palette custom)
- next.config.js
- .env.example

Dans tailwind.config.ts, définis cette palette :
- background : #0A0A0B
- surface : #141416
- border : #1F1F23
- text-primary : #F5F5F7
- text-secondary : #8A8A8E
- accent : #3B82F6 (bleu) ou #10B981 (vert) — choisis celui qui rend le mieux
- accent-hover : version plus claire de l'accent
- danger : #EF4444

Installe les dépendances : framer-motion (animations), @heroicons/react (icônes), resend (emails).

Crée juste la structure, pas le contenu encore.
```

---

## Prompt 2 — Hero section

```
Crée la hero section de la landing page dans app/page.tsx.

Contenu :
- Badge en haut : "Développeur web · France" avec un point vert animé (pulse)
- Titre principal (h1) sur 2-3 lignes :
  "Vos équipes perdent des heures sur Excel."
  "Je vous livre un outil sur-mesure en 2 semaines."
- Sous-titre : "Développeur spécialisé dans les outils internes pour PME. Forfait fixe de 2 000 à 5 000€. Pas de surprise, pas de dépassement."
- 2 boutons CTA :
  - Principal (accent) : "Discuter de votre projet" → scroll vers le formulaire de contact (#contact)
  - Secondaire (outline) : "Voir des exemples" → scroll vers la section projets (#projets)
- En dessous des boutons, une ligne de stats discrète :
  "Livraison 2-3 semaines · Forfait fixe · Satisfaction garantie"

Animations avec framer-motion :
- Fade-in + slide-up au chargement, staggeré (titre, sous-titre, boutons apparaissent en séquence avec 100ms de décalage)
- Le badge apparaît en premier

Background : dégradé radial très subtil depuis l'accent (opacité 5%) en haut à droite, sur le fond #0A0A0B. Ajoute un grain/noise overlay très léger en CSS.

Pas d'image, pas d'illustration. Le texte suffit. La force c'est la clarté du message.
```

---

## Prompt 3 — Section problème

```
Crée la section "problème" juste après le hero.

Titre de section : "Vous reconnaissez cette situation ?"

3 cartes côte à côte (grille responsive, 1 colonne mobile, 3 colonnes desktop), chaque carte a :
- Une icône (heroicons outline)
- Un titre court
- Une description

Carte 1 :
- Icône : TableCellsIcon
- Titre : "Excel partout"
- Description : "Vos fichiers de suivi se multiplient, personne n'a la même version, les données sont saisies en double."

Carte 2 :
- Icône : ClockIcon
- Titre : "Des heures perdues"
- Description : "Vos équipes passent 5 à 10 heures par semaine à chercher une info, ressaisir des données, mettre à jour un tableau."

Carte 3 :
- Icône : ExclamationTriangleIcon
- Titre : "Zéro visibilité"
- Description : "Impossible d'avoir un tableau de bord fiable en temps réel. Les décisions se prennent à l'aveugle."

Sous les cartes, une phrase de transition centrée en text-secondary :
"Un outil web dédié résout ces 3 problèmes en 2 semaines."

Animations : les cartes apparaissent en stagger au scroll (framer-motion, useInView).
Style des cartes : background surface, border subtle, hover avec un léger glow accent. Pas d'ombres lourdes.
```

---

## Prompt 4 — Section offre / services

```
Crée la section "Ce que je développe pour vous" après la section problème.

Titre : "Ce que je développe pour vous"
Sous-titre : "Des outils web que vos équipes utilisent vraiment, pas des usines à gaz."

6 items en grille (2 colonnes desktop, 1 mobile). Chaque item a :
- Un titre
- Une description courte (1-2 phrases)

Item 1 : "Tableaux de bord" — "Vos KPIs en temps réel, accessibles depuis n'importe quel appareil. Fini les exports Excel du lundi matin."

Item 2 : "CRM internes" — "Suivi de vos clients, prospects ou fournisseurs dans un outil taillé pour votre process, pas un Salesforce à 50€/user."

Item 3 : "Portails clients" — "Vos clients consultent leurs factures, devis ou commandes en autonomie. Moins d'appels, plus de satisfaction."

Item 4 : "Gestion de stock" — "Entrées, sorties, alertes de seuil. Simple, visuel, accessible depuis le terrain."

Item 5 : "Outils de planification" — "Planning équipes, réservation de ressources, gestion de chantiers. Adapté à votre métier."

Item 6 : "Formulaires & workflows" — "Demandes de congés, bons de commande, validations. Remplacez le papier et les allers-retours d'emails."

Style : minimaliste, pas de cartes avec bordures ici. Juste un titre en text-primary, description en text-secondary, avec un petit trait accent à gauche de chaque item (border-left accent). Hover : le trait s'allonge ou change de couleur.
```

---

## Prompt 5 — Section "Comment ça marche"

```
Crée la section process en 4 étapes.

Titre : "Simple, rapide, sans surprise"
Sous-titre : "De votre problème à votre outil en 4 étapes."

4 étapes en ligne (horizontal desktop, vertical mobile), connectées par une ligne pointillée accent.

Étape 1 :
- Numéro : "01"
- Titre : "Appel découverte"
- Description : "15 minutes pour comprendre votre besoin. Pas de jargon, pas de commercial."
- Durée : "15 min"

Étape 2 :
- Numéro : "02"
- Titre : "Proposition & devis"
- Description : "Sous 48h vous recevez un devis forfaitaire. Le prix ne bougera pas."
- Durée : "48h"

Étape 3 :
- Numéro : "03"
- Titre : "Développement"
- Description : "Je code votre outil. Vous recevez un accès preview pour suivre l'avancement."
- Durée : "1-3 sem."

Étape 4 :
- Numéro : "04"
- Titre : "Livraison & formation"
- Description : "Votre outil est en ligne. Je forme votre équipe en 30 minutes."
- Durée : "30 min"

Les numéros doivent être grands (text-5xl ou plus), en accent très faible (opacité 10-15%). Les durées sont affichées dans un petit badge sous chaque étape.

Animation : les étapes apparaissent une par une au scroll, la ligne pointillée se dessine progressivement.
```

---

## Prompt 6 — Section projets / exemples

```
Crée la section "Exemples de projets" avec l'id="projets".

Titre : "Exemples de projets livrés"
Sous-titre : "Chaque outil est construit sur-mesure. Voici le type de projets que je réalise."

3 cartes de projets (pas de vrais clients, ce sont des exemples réalistes anonymisés) :

Projet 1 :
- Tag : "BTP · 35 salariés"
- Titre : "Dashboard suivi de chantiers"
- Description : "Remplacement de 4 fichiers Excel par un tableau de bord centralisé. Suivi d'avancement, dépenses, planning équipes. Accessible depuis le chantier sur mobile."
- Résultat : "8h/semaine économisées"
- Budget : "3 500€"
- Délai : "12 jours"

Projet 2 :
- Tag : "Négoce · 60 salariés"
- Titre : "Portail client commandes"
- Description : "Les clients passent et suivent leurs commandes en ligne. Alertes automatiques à chaque changement de statut. Moins d'appels au service commercial."
- Résultat : "-40% d'appels entrants"
- Budget : "4 500€"
- Délai : "18 jours"

Projet 3 :
- Tag : "Cabinet comptable · 25 salariés"
- Titre : "Outil de collecte documents"
- Description : "Les clients du cabinet déposent leurs pièces comptables dans un espace dédié. Tri automatique par catégorie. Fini les emails avec 15 pièces jointes."
- Résultat : "3h/jour économisées"
- Budget : "2 800€"
- Délai : "8 jours"

Style des cartes : background surface, border subtle. Le tag en haut à gauche avec fond accent/10 et texte accent. Budget et délai en bas de la carte dans des badges discrets. Au hover, la carte monte légèrement (translateY -4px).

Note bien visible sous les cartes en text-secondary : "Exemples illustratifs basés sur des projets types."
```

---

## Prompt 7 — Section tarifs

```
Crée la section tarifs.

Titre : "Tarification simple"
Sous-titre : "Forfait fixe. Pas de TJM, pas de dépassement, pas de mauvaise surprise."

2 cartes côte à côte (pas 3, c'est plus clair pour du sur-mesure) :

Carte 1 :
- Nom : "Outil simple"
- Prix : "À partir de 2 500€"
- Sous-prix : "Forfait fixe"
- Description : "Un besoin précis, une solution ciblée."
- Inclus :
  - "1 fonctionnalité principale"
  - "Design responsive mobile"
  - "Hébergement 1ère année inclus"
  - "Formation équipe 30 min"
  - "Support email 30 jours"
- Délai : "1-2 semaines"
- CTA : "Discuter de mon projet" → #contact

Carte 2 (mise en avant avec bordure accent) :
- Nom : "Outil complet"
- Prix : "À partir de 4 000€"
- Sous-prix : "Forfait fixe"
- Description : "Plusieurs fonctionnalités, intégrations, workflow complet."
- Inclus :
  - "Fonctionnalités multiples"
  - "Design responsive mobile"
  - "Hébergement 1ère année inclus"
  - "Intégrations (email, API, export)"
  - "Formation équipe 1h"
  - "Support email 60 jours"
- Délai : "2-3 semaines"
- CTA : "Discuter de mon projet" → #contact

Sous les cartes :
"Maintenance optionnelle : 200-300€/mois · Acompte 50% à la commande, solde à la livraison"

Pas de toggle mensuel/annuel, c'est du one-shot.
```

---

## Prompt 8 — Section FAQ

```
Crée une section FAQ avec accordéon (clic pour ouvrir/fermer).

Titre : "Questions fréquentes"

8 questions :

Q1 : "Quelles technologies utilisez-vous ?"
R1 : "Je développe avec Next.js, TypeScript et Supabase — des technologies modernes, rapides et maintenables. Votre outil est hébergé sur des serveurs européens, accessible 24/7 depuis n'importe quel navigateur."

Q2 : "Combien de temps prend le développement ?"
R2 : "Entre 1 et 3 semaines selon la complexité. Un outil simple (dashboard, formulaire) prend 5-8 jours. Un outil complet (portail, CRM) prend 10-18 jours. Vous recevez un accès preview pendant le développement."

Q3 : "Le prix peut-il augmenter en cours de projet ?"
R3 : "Non. Le devis est un forfait fixe. Si je sous-estime la charge, c'est pour moi. Le prix que vous validez est le prix que vous payez."

Q4 : "Et si le résultat ne me convient pas ?"
R4 : "Vous suivez l'avancement via un accès preview. On ajuste au fil du développement. Si à la livraison le résultat ne correspond pas au cahier des charges validé, je corrige sans surcoût."

Q5 : "Qui héberge l'outil ?"
R5 : "L'hébergement première année est inclus dans le forfait. Ensuite, soit je continue à l'héberger (inclus dans la maintenance), soit je vous transfère tout."

Q6 : "Est-ce que je suis propriétaire du code ?"
R6 : "Oui, à 100%. À la livraison vous recevez l'intégralité du code source. Pas de dépendance, pas de lock-in."

Q7 : "Comment se passe le paiement ?"
R7 : "50% à la validation du devis, 50% à la livraison. Paiement par virement bancaire."

Q8 : "Vous travaillez seul ?"
R8 : "Oui. Un seul interlocuteur du premier échange à la livraison. Pas de commercial, pas de chef de projet, pas d'intermédiaire. Vous parlez directement à la personne qui code votre outil."

Style : fond transparent, séparateurs subtils entre chaque question. L'icône + tourne en × à l'ouverture. Animation smooth pour l'ouverture/fermeture (framer-motion AnimatePresence).

Ajoute le balisage Schema.org FAQPage en JSON-LD dans le head de la page.
```

---

## Prompt 9 — Formulaire de contact

```
Crée la section formulaire de contact avec l'id="contact".

Titre : "Parlons de votre projet"
Sous-titre : "Décrivez votre besoin, je vous réponds sous 24h."

Layout : 2 colonnes desktop (infos à gauche, formulaire à droite), 1 colonne mobile.

Colonne gauche — infos de contact :
- Email : stefan@stef-dev.fr (cliquable mailto)
- Disponibilité : "Réponse sous 24h"
- Localisation : "France"
- 3 points de réassurance :
  - "Échange de 15 min, sans engagement"
  - "Devis en 48h"
  - "Forfait fixe, zéro surprise"

Colonne droite — formulaire :
- Champ "Prénom & Nom" (text, required)
- Champ "Email professionnel" (email, required)
- Champ "Entreprise" (text, required)
- Champ "Nombre de salariés" (select : "1-20", "20-50", "50-100", "100+")
- Champ "Décrivez votre besoin" (textarea, 4 lignes, required, placeholder : "Ex: On gère notre stock sur Excel et on perd un temps fou...")
- Champ "Budget estimé" (select : "< 2 500€", "2 500 – 4 000€", "4 000 – 5 000€", "> 5 000€", "Je ne sais pas encore")
- Bouton submit : "Envoyer ma demande" (accent, full width)

Sous le bouton : "Pas de spam, pas de newsletter. Juste une réponse à votre demande."

Validation côté client : tous les champs required doivent être remplis, email valide.
État du bouton : loading pendant l'envoi, success avec message "Message envoyé ! Je vous réponds sous 24h.", error avec message "Erreur, réessayez ou écrivez-moi directement à stefan@stef-dev.fr".

Style des inputs : background #0A0A0B, border border, focus:border-accent, text-primary. Rounded-lg, padding confortable. Pas de labels flottants — labels au-dessus des champs, simples et lisibles.

NE PAS utiliser de balise <form>. Utiliser un onClick sur le bouton qui appelle une fonction handleSubmit.
```

---

## Prompt 10 — API route contact + Resend

```
Crée l'API route app/api/contact/route.ts pour le formulaire de contact.

L'API reçoit un POST avec les champs : name, email, company, employees, message, budget.

Validations serveur :
- Tous les champs required présents
- Email format valide
- Message non vide et < 5000 caractères

Action : envoyer un email via Resend à stefan@stef-dev.fr avec :
- From : "Site stef-dev.fr <noreply@stef-dev.fr>" (ou le domaine vérifié dans Resend)
- To : stefan@stef-dev.fr
- Subject : "Nouveau lead — [company] — [name]"
- Body HTML propre avec tous les champs du formulaire formatés lisiblement

Envoyer aussi un email de confirmation au prospect :
- From : "Stef — stef-dev.fr <noreply@stef-dev.fr>"
- To : [email du prospect]
- Subject : "Bien reçu, je reviens vers vous sous 24h"
- Body : message court confirmant la réception, signature "Stef — Développeur web — stef-dev.fr"

Rate limiting basique : vérifier un header ou implémenter un simple compteur en mémoire pour bloquer plus de 5 soumissions par IP par heure.

Retourner :
- 200 + { success: true } si tout est ok
- 400 + { error: "message" } si validation échoue
- 500 + { error: "message" } si l'envoi email échoue

Ajouter dans .env.example :
RESEND_API_KEY=re_xxx
CONTACT_EMAIL=stefan@stef-dev.fr
```

---

## Prompt 11 — Footer + Nav

```
Crée le footer et la navigation de la landing page.

NAVIGATION (sticky top) :
- Logo texte "stef·dev" à gauche (le point est en couleur accent)
- Liens : Projets (#projets), Tarifs (#tarifs), FAQ (#faq), Contact (#contact)
- CTA bouton à droite : "Discuter" → #contact
- Background transparent au top, devient surface + blur au scroll
- Menu hamburger sur mobile avec panel slide-in

FOOTER :
- Sobre, une seule ligne ou 2 lignes max
- À gauche : "© 2026 stef-dev.fr"
- Au centre : liens CGV, Mentions légales (pages à créer plus tard, href="#" pour l'instant)
- À droite : email stefan@stef-dev.fr
- Background plus sombre que le body (#050506)
- Séparateur top border subtle
```

---

## Prompt 12 — SEO + Metadata + Performance

```
Optimise la page pour le SEO et la performance.

Metadata dans app/layout.tsx :
- Title : "Stef Dev — Outils web sur-mesure pour PME | Développeur freelance France"
- Description : "Développeur web spécialisé dans les outils internes sur-mesure pour PME. Dashboards, CRM, portails clients. Forfait fixe 2 500-5 000€, livré en 2-3 semaines."
- Open Graph : title, description, image (créer une image OG simple 1200x630 avec le titre du site en SVG ou via un template)
- Canonical : https://stef-dev.fr
- Favicon : lettre "S" en accent sur fond dark, en SVG

Schema.org JSON-LD dans le layout :
- @type: ProfessionalService
- name: "Stef Dev"
- description: "Développement d'outils web sur-mesure pour PME"
- url: "https://stef-dev.fr"
- areaServed: "FR"
- priceRange: "2500€ - 5000€"

Ajouter aussi le schema FAQPage (déjà fait dans le prompt FAQ).

Fichiers à créer :
- app/sitemap.ts → génère le sitemap XML automatiquement
- app/robots.ts → Allow tout sauf /api/

Performance :
- Vérifier que toutes les images (s'il y en a) utilisent next/image avec lazy loading
- Vérifier que les fonts sont chargées avec display: swap
- Pas de bibliothèque JS inutile
- Framer-motion : importer seulement les composants utilisés (motion, AnimatePresence, useInView)

Objectif : Lighthouse > 95 sur les 4 catégories.
```

---

## Prompt 13 — Responsive + polish final

```
Fais une passe complète responsive et polish sur toute la landing page.

Mobile (< 768px) :
- Hero : titre en text-3xl, boutons en full-width empilés
- Cartes problème : empilées verticalement
- Section services : 1 colonne
- Section process : vertical avec ligne pointillée à gauche au lieu d'horizontale
- Projets : cartes empilées
- Tarifs : cartes empilées, la carte mise en avant en premier
- FAQ : full-width, padding réduit
- Formulaire : 1 colonne, infos de contact au-dessus du formulaire
- Nav : hamburger menu

Tablet (768px - 1024px) :
- Grilles en 2 colonnes
- Hero : titre en text-4xl

Desktop (> 1024px) :
- Comme conçu dans les prompts précédents
- Max-width du contenu : 1200px, centré

Polish :
- Vérifier que tous les hover states fonctionnent et sont cohérents
- Vérifier la hiérarchie typographique (h1 > h2 > h3, cohérent partout)
- Vérifier les espacements entre sections (py-24 partout sauf hero qui est min-h-screen)
- Smooth scroll sur tous les liens ancre
- Focus states visibles sur tous les éléments interactifs (accessibilité)
- Tester que le formulaire fonctionne end-to-end
- S'assurer que le site passe le contraste WCAG AA sur tous les textes
```

---

## Ordre d'exécution

1. Prompt contexte (coller en premier)
2. Prompt 1 (setup)
3. Prompt 2 (hero)
4. Prompt 3 (problème)
5. Prompt 4 (services)
6. Prompt 5 (process)
7. Prompt 6 (projets)
8. Prompt 7 (tarifs)
9. Prompt 8 (FAQ)
10. Prompt 9 (formulaire)
11. Prompt 10 (API contact)
12. Prompt 11 (footer + nav)
13. Prompt 12 (SEO)
14. Prompt 13 (responsive + polish)

Chaque prompt s'exécute séquentiellement. Attends que Claude Code ait fini un prompt avant de passer au suivant.
