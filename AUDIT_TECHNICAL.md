# AUDIT_TECHNICAL.md — Vivre en Géorgie
*Dernière mise à jour : 2026-07-07*

## ARCHITECTURE

**Stack :** Site statique HTML/CSS/JavaScript pur, hébergé sur GitHub Pages.

**Fichiers racine :**
- `index.html` — Page d'accueil principale (~1600 lignes)
- `blog.html` — Listing des articles de blog
- `mentions-legales.html` — Mentions légales
- `robots.txt` — Configuration des crawlers
- `sitemap.xml` — Sitemap XML (23 URLs)
- `CNAME` — Domaine vivreengeorgie.com
- `llms.txt` — Documentation pour LLMs

**Blog (20 articles) :**
- `blog/avantages-vivre-georgie.html`
- `blog/batumi-10-ans-evolution.html`
- `blog/batumi-change-vite-dubai.html`
- `blog/compte-bancaire-georgie.html`
- `blog/cout-vie-batumi.html`
- `blog/creer-societe-georgie-24h.html`
- `blog/defauts-georgie.html`
- `blog/entrepreneurs-quittent-france-georgie.html`
- `blog/erreurs-expatriation.html`
- `blog/fiscalite-georgie.html`
- `blog/georgie-attire-europeens.html`
- `blog/installation-batumi-budget.html`
- `blog/investir-immobilier-batumi.html`
- `blog/nourriture-georgienne.html`
- `blog/pourquoi-batumi-2026.html`
- `blog/quartiers-batumi.html`
- `blog/residence-georgienne.html`
- `blog/salaires-georgie.html`
- `blog/securite-georgie.html`
- `blog/vivre-1000-euros-batumi.html`

**Images (4 fichiers) :**
- `images/axel-briard.jpg`
- `images/batumi-real.png`
- `images/bei-batumi-logo.jpeg`
- `images/victor-gogoladze.jpg`

---

## DÉPENDANCES CDN

- **GSAP 3.12.5** — Animations (`gsap.min.js`, `ScrollTrigger.min.js`)
- **Google Fonts** — Inter (400, 500, 600, 700, 800, 900)

---

## SEO ACTUEL

- `robots.txt` : Autorise tous les crawlers (dont GPTBot, ClaudeBot, PerplexityBot, Meta-ExternalAgent, etc.)
- `sitemap.xml` : 23 URLs avec changefreq/priority, dernière mise à jour 2026-06-21
- Schema.org : FAQPage + ProfessionalService sur index.html, Article + BreadcrumbList + FAQPage sur chaque article de blog
- Canonical : présent sur toutes les pages
- Open Graph : présent sur toutes les pages
- Twitter Cards : présent sur index.html

---

## MULTILANGUE

Le site supporte 4 langues via un système i18n JavaScript :
- Français (fr) — langue principale
- English (en)
- Español (es)
- ქართული/Géorgien (ge)

**IMPORTANT :** Les strings EN, ES, GE n'ont pas encore été mises à jour pour refléter les modifications de juillet 2026 (nouveau positionnement, suppressions de contenus problématiques). À traiter.

---

## ANALYTICS

**Aucun système analytics actif.** Aucun Google Analytics, Facebook Pixel ou autre outil de tracking n'est installé.

La fonction `trackWA()` a été ajoutée dans index.html pour préparer l'intégration future de GA4 ou équivalent. Elle appellera `gtag()` et `fbq()` si ces librairies sont présentes.

**Pour activer Google Analytics :**
1. Créer un compte GA4 sur analytics.google.com
2. Ajouter le snippet GA4 dans le `<head>` de chaque page
3. Mettre en place un bandeau de consentement RGPD

---

## PERFORMANCE MOBILE

**Points d'attention :**
- Images : `batumi-real.png` utilisée comme hero background — vérifier son poids (format PNG potentiellement lourd)
- Les images ne sont pas en WebP/AVIF — migration recommandée
- `lazy loading` : appliqué aux images non critiques via `loading="lazy"`
- GSAP : chargé depuis CDN pour les animations — vérifier l'impact sur le LCP mobile
- `fetchpriority="high"` : appliqué à l'image hero et au logo principal ✅

**Recommandations :**
- Convertir `batumi-real.png` en WebP avec fallback PNG
- Vérifier le CLS (Cumulative Layout Shift) sur mobile
- Vérifier le LCP (Largest Contentful Paint) — probablement l'image hero

---

## WHATSAPP

**Numéro :** +33 6 81 10 81 47 (numéro français)
**Lien de base :** `https://wa.me/33681108147`

**Événements analytics prévus (fonction trackWA) :**
- `whatsapp_general` — Bouton WhatsApp générique
- `whatsapp_business` — Projet entrepreneurial
- `whatsapp_invest` — Investissement immobilier
- `whatsapp_expat` — Installation / expatriation

---

## RÉSEAUX SOCIAUX (configuration centralisée recommandée)

Actuellement les URLs sont dupliquées dans plusieurs fichiers HTML. À terme, créer un fichier de configuration unique.

**URLs actuelles :**
- YouTube : `https://www.youtube.com/@VivreenG%C3%A9orgie`
- TikTok : `https://www.tiktok.com/@vivreengeorgie`
- Instagram : `https://www.instagram.com/vivreengeorgie/`
- Facebook : `https://www.facebook.com/profile.php?id=61590688067104`
- Threads : `https://www.threads.net/@vivreengeorgie` (À VÉRIFIER — URL non confirmée)
- X : `https://x.com/vivreengeorgie` (À VÉRIFIER — URL non confirmée)

---

## URLS PRÉSERVÉES (SEO)

Aucune URL d'article n'a été modifiée. Toutes les URLs existantes sont intactes.

---

## MODIFICATIONS EFFECTUÉES LE 2026-07-07

Voir `AUDIT_CONTENT.md` pour le détail des contenus.

**Fichiers modifiés :**
1. `index.html` — Refonte majeure (hero, services, team, FAQ, social, i18n, WA messages)
2. `blog/installation-batumi-budget.html` — Suppression des assertions économiques non documentées
3. `AUDIT_CONTENT.md` — Créé (ce fichier)
4. `AUDIT_TECHNICAL.md` — Créé (ce fichier)
5. `LEGAL_INFORMATION_REQUIRED.md` — Créé (voir fichier)
