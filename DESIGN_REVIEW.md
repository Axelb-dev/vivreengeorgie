# Refonte cinéma — 11 novembre 2026

Source active : D:/Vivre en Géorgie/Website v1. Aperçu : http://127.0.0.1:4174/
Aucune publication ni mise à jour GitHub. Validation du propriétaire requise avant publication.

## Nouvelle direction
Page entièrement réécrite : index.html, atelier.css, atelier-i18n.js, atelier.js.
Palette bleu nuit #102637, ivoire #f6f1e8 et cuivre #e4b18b. Typographie éditoriale, espaces généreux, transparences discrètes. Aucun chargement des anciens fichiers direction/redesign/cinema.

Parcours : film immersif piloté par le scroll → proposition de valeur → trois accompagnements → équipe et réseau interactif → méthode en trois étapes → questions fréquentes → contact qualifié via WhatsApp. Aucun envoi automatique. Aucun blog.

Film test approuvé : assets/film/georgia-draft.mp4. Copie optimisée pour la recherche temporelle : georgia-scroll.mp4 (images clés tous les 8 frames, sans audio, faststart). Le film reste un brouillon 854×480, et non un master haute définition. Repères de texte fondés sur le découpage prévu, à confirmer visuellement sur le film rendu.

4 langues : français, anglais, espagnol, géorgien. Les traductions gardent les choix et le texte saisis. Textes de contact localisés. Aucune validation linguistique par un locuteur natif revendiquée.

Mobile : navigation compacte, portraits en carrousel natif, formulaire en une colonne, adaptation aux écrans courts. Réduction des mouvements, image de remplacement et accès direct aux offres.

## Vérifications
- 4 tests structurels : traductions, assets/ancres, formulaire, film et absence de blog.
- 72 cas de préparation de message (4 langues × 3 projets × 3 horizons × avec/sans note) ; aucun message envoyé.
- Syntaxe des deux scripts vérifiée avec Node.
- Serveur local et ressources vérifiés par HTTP.
- Contrôle visuel desktop/mobile non terminé : hôte navigateur indisponible lors de cette session. Fluidité du scrub, recadrage mobile et timing des textes restent à valider dans le navigateur.

Sauvegarde du précédent site : D:/Vivre en Géorgie/avant-refonte-film-20261111.zip.
Les fichiers des prototypes antérieurs sont conservés, mais ne sont pas chargés par la nouvelle page.

## Correction : fond fixe sur toute la page
La vidéo est désormais placée dans une couche fixe indépendante du contenu. Le temps vidéo dépend de scrollY / (hauteur du document − hauteur de la fenêtre). Descendre avance, remonter recule, et un arrêt du scroll fige le film. Aucun autoplay. Les panneaux restent transparents ou translucides pour garder le film visible dans tout le parcours.

Correction timeline : repères 0 / 6,25 / 12,25 / 18,5 / 23,25 secondes attachés aux cinq panneaux, puis 25 secondes en bas de page, interpolation réversible entre repères. Nouvelle URL de test http://127.0.0.1:4175/ : serveur tests/preview_server.py avec support Range (206 vérifié sur début, milieu et retour arrière). Ancien serveur 4174 conservé. Règle CSS qui masquait le film malgré la réactivation retirée. Vérification visuelle toujours indisponible via navigateur automatisé.

## Fluidité du scroll
Film actif par défaut (demande explicite du propriétaire), bouton de réduction manuel conservé. Rendu canvas depuis 601 images JPEG à 24 i/s, 28,2 Mo compressés. Chargement anticipé avec 6 requêtes simultanées, priorité à la position visée, cache de bitmaps borné à 36 images. Interpolation de la position sur 95 ms et mélange entre deux images adjacentes. Aucun besoin de lecture vidéo/autoplay. Le MP4 reste une source conservée et non chargée. Ressources HTTP, syntaxe et tests timeline/messages vérifiés ; fluidité visuelle à confirmer sur appareil réel.

## Navigation par gestes de molette
Un geste déclenche une transition cadencée vers le prochain point de section ; retour inverse. Inertie de trackpad absorbée pour éviter de sauter plusieurs sections. Sections longues découpées en étapes lisibles, champs et carrousel exclus. PageDown/PageUp également pris en charge ; tactile et barre de défilement restent natifs. Suppression du mélange entre deux images et du second lissage temporel : une image nette à la fois, synchronisée à la transition. La définition 480p et le flou déjà présent dans le film source restent inchangés. Tests de navigation et limites passés ; rendu visuel à vérifier sur appareil.

## Arrêts visuels contrôlés
Comparaison de la planche tests/film-contact.jpg et des images banque à 13 et 14 secondes en taille native. Arrêts : pays 2 s (48), hall 7 s (168), banque 14 s (336), chantier 20 s (480), réseau 24 s (576). Le point banque précédent, 12,25 s, se trouvait encore dans la phase d’approche. Le réseau reste figé à 24 s pour le reste de la page afin de ne pas dériver après le dernier chapitre. Aucun ajout de netteté artificielle ou modification du film source.

## Adaptation mobile
Composition portrait : image sur 70svh, textes en dessous sur fond progressivement assombri. Point de recadrage variable et interpolé : pays 50 %, hall 66 %, banque 65 %, chantier 52 %, réseau 50 %. Image source du hall alignée à 66 %. Canvas dimensionné depuis sa taille CSS réelle et densité plafonnée ; recalcul sur changement de fenêtre. En paysage, cadrage centré pleine hauteur conservé. Ajustements 320px+, boutons 44px, formulaire flexible, navigation safe-area, textes géorgiens, carrousel portraits, paysage bas. Gestes tactiles natifs conservés. Tests mathématiques des recadrages et couverture d’image sur quatre formats passés. Vérification visuelle sur téléphone réel reste à effectuer ; aucun test navigateur mobile revendiqué.

## Raccords synchronisés des cinq arrêts
Suppression de l’overlay DOM hall et du délai de 140 ms. Les cinq sources détaillées sont préchargées et décodées, puis dessinées dans le même canvas que les images vidéo, avec le même calcul de recadrage. Mélange piloté uniquement par le temps du film dans une fenêtre de 0,8 s de part et d’autre du repère ; source nette à 100 % dès 0,15 s avant le repère. Fonction symétrique en marche arrière. Le départ d’une navigation attend le chargement des sources, sans les télécharger au dernier moment. Tests des cinq plateaux, continuité et symétrie passés. Les différences de posture et composition entre les images de référence et la vidéo générée restent possibles : aucun zéro-artefact visuel garanti sans validation navigateur.

## Affinement final du recalage
Matrices affines complètes pour les cinq sources : échelles horizontale et verticale indépendantes, cisaillement et translation. Mesures conservées dans tests/still-alignment.json : erreur médiane de 0,36 à 0,66 pixel sur les points visuels retenus en résolution 854×480. Ces mesures concernent les points concordants, pas les différences de posture. Version locale aligned14 vérifiée : ressources servies identiques au disque. Vérification visuelle du raccord toujours nécessaire.

## Structure éditoriale — explications au sein des scènes
Neuf écrans : introduction (2 s), hall présentation + détails (7 s), banque présentation + détails (14 s), immobilier présentation + détails (20 s), équipe présentation + détails (24 s). Les paires de repères possèdent exactement le même temps vidéo : le scroll supplémentaire conserve donc le même arrêt net dans les deux sens. Suppression des offres redondantes, portraits, biographies nominatives, méthode et FAQ en bas de page. Formulaire et CTA commerciaux retirés pour cette phase ; navigation et liens légaux conservés. Nouvelle copie en FR/EN/ES/KA : prestations concrètes, intérêt pour le client et précisions de périmètre, sans promesse de résultat. Équipe décrite par les compétences coordonnées et les professionnels intervenants. Tests : neuf repères, quatre plateaux, douze points de prestations, couverture de traduction et absence des noms visibles. Aucun déploiement.

## Offres et valeur client — version value16
Ajout de comparatifs fiscaux, 9 cartes de prestations avec icônes SVG cuivre, cartes bancaires décoratives, 7 chiffres clés et 2 encarts de conditions dépliables. Carrousels horizontaux natifs sur mobile, focus clavier, détails disponibles sans CTA. Les 9 écrans et 4 pauses explicatives sont conservés. La future vidéo verticale n’a pas été générée ; le cadrage mobile actuel reste utilisé.

Affirmations du propriétaire : prise en charge création, français/espagnol, comptabilité/déclarations selon formule, procuration avec avocate, accompagnement immobilier à 0 €, potentiel jusqu’à 12 % net selon le projet, financement jusqu’à 70 %. Le propriétaire ne souhaite pas citer de projet. Le 12 % n’a pas été corroboré par une simulation ; affiché comme potentiel non garanti avec définition du net à préciser dans chaque étude.

Corrections : pas de promesse universelle de 20 % LLC ; distribution 15 % sur base /0,85 et retenue dividendes généralement 5 %. Small Business distingué de LLC, éligibilité/seuil/TVA précisés. Pas de promesse de compte, carte, procuration bancaire, financement ou virements sans limite garantis. Pas d’affirmation générale de 0 € de frais de notaire : acte non systématique et frais de registre/traduction/procuration explicités. Les 5 % résidentiels et exonération après plus de 2 ans sont contextualisés ; tourisme/commercial distincts.

Sources officielles consultées le 11 novembre 2026 :
- https://matsne.gov.ge/en/document/view/1043717 (articles 81,82,88–90,97–98,130)
- https://rs.ge/PersonsPreferentialTax?cat=2&tab=1
- https://tbcbank.ge/en/for-expats
- https://www.mastercard.com/ge/en/personal/experience-mastercard/offers-and-promotions/travel/lounges.html
- https://www.napr.gov.ge/en/page/fees-and-terms/immovable-property-registration-fee
- https://nbg.gov.ge/en/page/pti-and-ltv-requirements

Tests : couverture de 164 clés dans 4 langues, structure et liens locaux, chronologie et recadrage, réponses HTTP. Contrôle visuel navigateur indisponible : ne pas présenter les adaptations CSS comme testées sur un téléphone réel. Aucun push ni déploiement.

## Dernier écran : préparation WhatsApp et angles arrondis
Le dernier panneau (réseau, 24 s) accueille désormais le formulaire : projet (entreprise, banque, immobilier, installation), horizon obligatoire, question facultative, aperçu du message puis bouton d’ouverture WhatsApp. URL wa.me/33681108147, numéro déjà utilisé dans le site. Aucun envoi automatique ; lien de secours affiché si l’ouverture est bloquée. Message dans la langue sélectionnée, saisie conservée lors d’un changement de langue. 96 cas de messages testés sans transmission externe. Sur mobile, formulaire sous le texte, options en deux colonnes et champs 16px. Rayons harmonisés : cartes 22px, formulaire 28px, contrôles 13px. Les plateaux vidéo restent inchangés.

## Mobile — portrait film integration (2026-11-11)
- Approved vertical V2 uses its own 601 JPEG frames (480x854, 24fps), selected at <=760 CSS pixels. Desktop frame path and registered detailed stills unchanged. Breakpoint changes abort previous fetches and dispose decoded frames.
- Mobile stops use the exact video frames: no crossfade into a differently composed illustration. Draft definition remains 480p; no claim of HD output.
- Full-height portrait canvas, responsive poster, safe-area header, lower text overlay, horizontal benefit carousels, natural page scrolling for the contact form and budget. Touch gesture snaps to the next reading stop except native controls/carousels/contact.
- Headless installed Edge / Playwright checked 320x568, 360x640, 375x667, 390x844, 412x915, 430x932, 540x720, 740x360, 844x390, 1440x900 in FR/EN/ES/KA: no document or header overflow. Screenshots inspected at 390px for hero, company and contact.
- Touch via browser input protocol: one swipe lands on next chapter; CTA reaches contact; mobile loads only portrait sequence. Budget/fields usable with viewport reduced to 390x420. This simulates reduced height, not a physical iOS/Android keyboard test.
- Existing scroll, messages and site suites pass. Real-device Safari/Android testing remains to be done. No deployment or push.

## Mobile sharp stops and copy placement — mobile31
- Replaced mobile exact-draft-only stops with registered original detailed portrait artwork for hall (172/24s), bank (310/24s), construction (516/24s), network (578/24s). SIFT/RANSAC affine fits: 347–829 inliers, median correspondence error around 0.4 source pixels; visual comparison retained in tests/mobile-still-pairs.jpg. This does not guarantee pixel-identical generated people during transitions.
- Country illustration does not register faithfully enough: kept exact frame at2s, 2x Lanczos with restrained sharpening, no invented HD detail. Motion remains draft480p.
- Same canvas and framing for video and still, mobile blend radius0.3s/full0.04s, symmetric on reverse. Mobile timeline holds corrected stop times across explanatory panels. Desktop unchanged.
- Moved bank copy down to40svh and network copy48svh in portrait to preserve subjects. Screenshot inspected at320px. 9panels fit at320/390/430;10viewport×4language layout test passes, plus form, touch, existing suite and symmetric mobile blend checks. Physical-device validation still pending.

## Mobile bank → construction buffering — mobile32
Reproduced missing decoded frames during the fast transition: 26/53 render attempts lacked their requested image and left an old frame on screen. Added bounded predecoded samples before mobile snap transitions, reused in either direction; endpoints remain exact and nearby prepared frames cover intervening requests. At most ~74 transition samples, then cache returns to36 decoded frames. Fetch promises deduplicated; interrupted gestures release preparation. Same local audit now zero missing frames forward and reverse. Touch and timeline tests pass. Desktop timing unchanged; no regeneration.

## Opening image — mobile33
Found a faithful early reference match at frame6 (0.25s), 276 SIFT inliers. Mobile opening now uses the original detailed country PNG registered to that early frame, replacing the sharpened480p workaround. Mobile opening time moves from2s to0.25s; desktop remains2s. Responsive poster uses the original portrait asset. Inspected screenshot tests/mobile-first-debug.png. Layout checks pass on rerun; an earlier run timed out waiting for first-ready, a fresh diagnostic and repeat succeeded. Bank/construction audit remains zero missing images forward and reverse.

## Publication and discoverability — release35
User authorized GitHub publication and cleanup. Retired files archived outside repository; root Pages excludes tests and internal documents. Security CSP/no-referrer and constrained translation markup tested. Legacy remote history preserved via ours merge because the approved redesign replaces the complete old tree; no forced push.
robots.txt preserved with explicit search/user AI agents and existing training allowances. Sitemap contains canonical indexable homepage only; legal draft remains noindex. Static JSON-LD WebSite/WebPage/Organization and three Service entities match visible content, with CSP hash. No invented address, reviews, ratings, verified profiles or pricing schema. Improved titles and social metadata. llms.txt/full supplement the visible HTML; no ranking guarantee or invented AI directive.
Official references: https://developers.google.com/search/docs/appearance/ai-features ; https://developers.openai.com/api/docs/bots ; https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler .
SEO and security test suites pass; HTTPS enforcement checked true through GitHub Pages API. Legal editor address and data handling details remain missing as documented.

## Mobile bottom alignment — release36
All nine mobile chapters use flex-end with a consistent safe-area bottom inset. Removed effective top placement for detail cards, bank and network by a final mobile-only rule. Chapters grow naturally when content is taller than the viewport; contact remains scrollable in document flow. Verified bottom content/padding geometry at320x568,390x844,430x932 and expanded conditions. Screenshot mobile-bottom-detail.png inspected. Desktop unaffected; CSP JSON-LD hash test passes.

## Stop-triggered content reveal — release37
Only the active chapter is visible/interactable after its precise film stop has been painted and scroll travel has completed. Incoming copy/cards/form fade with opacity1s ease-in; outgoing content hides immediately during travel. inactive panels retain layout but are inert/aria-hidden. Added hold points for the reading portion of long chapters so text does not disappear while reading. Same-image detail panels reveal only at arrival, not while sliding into place. Verified mobile390 and desktop1440: hidden mid-travel, exactly one visible chapter, computed1s/ease-in transition, detail and contact reveal. Bank-construction buffer test remains zero missing frames both directions; static SEO/security tests pass.

## Persistent content and touch control — release38
Once a chapter has appeared at its first stop, it stays visible/interactable. During actual timeline movement, revealed middle chapters ease to40% opacity and return to100% at a stop; opening/contact exempt. First appearance remains1s ease-in. Fixed-image reading/second panels stay opaque. Removed competing post-touch scripted scroll for moving-film gestures; same-image reading gestures keep section navigation by taking control before native momentum starts. Canvas resizes only when pixel dimensions change; directional decode lookahead and nearby prepared frames reduce native-scroll freezes. Tests: retained content/opacity, same-image touch step, native moving-film touch with zero scripted scrollTo calls, forward/reverse buffering and security all pass.
