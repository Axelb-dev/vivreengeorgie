# Audit SEO / GEO — 19 novembre 2026

Domaine audité : https://vivreengeorgie.com/ ; dépôt D:/Vivre en Géorgie/Website v1.

## Diagnostic
La base technique est saine, mais le site n'était pas suffisamment développé pour couvrir séparément les recherches commerciales. Avant cette intervention : une seule URL indexable dans le sitemap, trois prestations réunies dans une expérience vidéo. Les textes sont présents dans le HTML source, mais leur révélation visuelle dépend du parcours animé. Les nouvelles pages de services sont lisibles sans JavaScript ni défilement cinématique.

Le domaine vivregeorgie.com est actif. Sa page d'accueil expose de nombreux liens thématiques (voyage, expatriation, entreprise, banque, immobilier). Cela prouve une couverture éditoriale plus large, pas un volume de trafic, un classement supérieur ou une intention illicite. Aucun accès aux statistiques du concurrent. Ne pas copier son contenu. Priorité : les intentions commerciales correspondant réellement à nos prestations, plutôt que des dizaines de pages touristiques génériques.

Un résultat de recherche consulté affichait encore des textes de notre ancien site, tandis que la lecture directe affichait la version actuelle. C'est un signal de mise à jour inégale des résultats, pas la preuve d'un blocage d'indexation.

## Vérifications et corrections
- HTTPS et variante www redirigent vers https://vivreengeorgie.com/ ; une URL inexistante renvoie un vrai 404.
- /index.html reste accessible mais porte la canonique vers /. Pas de redirection serveur personnalisée disponible sur l'hébergement Pages actuel.
- robots.txt : accès autorisé aux moteurs, ressources de rendu et robots de recherche IA. Aucune nécessité de le rendre plus permissif.
- Trois pages de services ajoutées : creation-entreprise-georgie.html ; compte-bancaire-georgie.html ; investir-immobilier-georgie.html. Environ 700–900 mots chacune, étapes, documents, réponses directes et limites des offres.
- Liens visibles depuis chaque chapitre pertinent de l'accueil, liens entre prestations et retour vers le formulaire.
- Titres, descriptions et canoniques uniques ; un H1 par page ; HTML statique ; fil d'Ariane et données Service/WebPage/BreadcrumbList cohérentes avec le contenu.
- WebSite alternateName = vivreengeorgie.com pour préciser l'identité du site ; aucun avis, prix, adresse, partenariat bancaire ou titre professionnel inventé.
- Sitemap : 4 URL canoniques ; dates correspondant à la modification réelle. llms.txt et llms-full.txt mis à jour comme compléments, sans promesse de citation ni instruction aux robots.
- Images d'arrêt : conversion WebP sans perte, pixels RGB comparés identiques aux PNG. 23 927 199 → 17 380 566 octets pour les dix images, soit -27,4 %. Originaux conservés.
- Préchargement initial des images de mouvement borné autour du premier arrêt ; préchargement complet après démarrage du parcours. Aucun changement des points d'arrêt ni de l'alignement.
- Mesure exploratoire avant : 250 ressources / 22 714 272 octets après 8 secondes en Edge mobile simulé sur site public. Après en local : 31 ressources / 9 671 830 octets, dont19 images de mouvement. Mesures de laboratoire non équivalentes à des Core Web Vitals réels ; ne pas les présenter comme un score PageSpeed ou une garantie de rapidité sur téléphone.
- Clé IndexNow créée pour notifier les moteurs participants après publication. Une réception de notification n'est pas une indexation et ne constitue pas une soumission Google.

## Vérification effectuée
Tests structure, traductions, robots, sitemap, CSP/hash JSON-LD ; trois pages aux largeurs390 et1440 ; ouverture des questions ; aucune erreur JS ; aucune largeur débordante. Images inspectées visuellement. Régression mobile : un geste/un arrêt ; passage banque/construction et retour sans image manquante dans le test ; sécurité et WhatsApp inchangés. Un lancement simultané des tests a expiré à l'initialisation du canvas ; reprise isolée du test sécurité réussie. À surveiller sur appareils et réseaux réels.

## Prochaine priorité : mesure et preuves
1. Google Search Console : créer ou retrouver la propriété, puis la vérifier. Préfixe URL https://vivreengeorgie.com/ + fichier HTML fourni par Google possible sans modifier les DNS ; propriété Domaine + TXT DNS couvre toutes les variantes. Ne pas inventer un jeton. Déposer ensuite sitemap.xml et inspecter les quatre URL. Seul le compte permettra de connaître les exclusions, clics et requêtes réels.
2. Bing Webmaster Tools : importer la propriété Google validée ou la vérifier séparément, soumettre le même sitemap. IndexNow complète cette étape sans la remplacer.
3. Mesurer à J+14 puis J+28 : URL indexées, impressions et clics par prestation, requêtes de marque, pays/appareil et demandes qualifiées. Ne pas promettre un délai d'indexation ni une première position.
4. Renforcer l'identité avec des preuves fournies par l'équipe : coordonnées professionnelles vérifiables, profils officiels, personnes et qualifications publiables, cas clients documentés avec consentement. Les mentions légales restent incomplètes (adresse notamment) ; ne pas fabriquer ces informations.
5. Références externes : liens éditoriaux légitimes depuis profils et partenaires réels. Aucun achat de liens automatisé, avis fabriqué ou attaque du domaine voisin.
6. International : le sélecteur traduit actuellement une seule URL côté client. Pour développer le SEO anglais/espagnol/géorgien, prévoir des URL statiques distinctes, des traductions relues et hreflang réciproques. Les nouvelles pages sont volontairement françaises ; les liens le précisent dans les autres langues. Aucun faux hreflang vers des copies françaises.
7. Performance : l'accueil demeure une expérience lourde (~9,7Mo dans le test local). Les pages d'acquisition sont légères et sans animation. Mesurer LCP/INP/CLS via données terrain lorsqu'elles existent ; envisager ensuite le chargement progressif des arrêts, en préservant la netteté et les transitions validées.
8. GEO : suivre un petit échantillon daté de questions liées aux trois services et relever les citations réelles. Résultats variables selon moteur, contexte et date ; aucun score de visibilité universel revendiqué.

## Sources consultées
- https://developers.google.com/search/docs/appearance/ai-features : pas d'exigences techniques spéciales pour AI Overviews/AI Mode ; fondamentaux SEO et contenu utile.
- https://developers.google.com/search/docs/appearance/site-names : nom du site et données WebSite.
- https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites : URL distinctes par langue.
- https://developers.google.com/search/docs/monitor-debug/search-console-start : vérification, indexation, sitemap et suivi.
- https://developers.openai.com/api/docs/bots : distinction recherche/récupération et entraînement.
- https://www.indexnow.org/documentation : notification d'URL et preuve par fichier de clé.
- https://matsne.gov.ge/en/document/view/1043717 : Code fiscal géorgien, notamment88–92 ; sources fiscales déjà liées depuis l'accueil.
- https://www.napr.gov.ge/en : registre public géorgien.
- https://vivregeorgie.com/ : couverture thématique constatée, sans accès à ses statistiques.
