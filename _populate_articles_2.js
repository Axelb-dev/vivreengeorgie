const fs = require('fs');
const path = require('path');
const blogDir = path.join(__dirname, 'blog');

function services() {
  return `<div class="art-services">
  <p class="art-sec-eyebrow">Nos services</p>
  <p class="art-sec-h2">Vivre en Géorgie vous accompagne</p>
  <div class="art-services-grid">
    <a href="../entreprendre-en-georgie.html" class="art-svc-card"><span class="art-svc-ico">🏢</span><span class="art-svc-title">Entreprendre</span><span class="art-svc-sub">Création de société</span></a>
    <a href="../investir-en-georgie.html" class="art-svc-card"><span class="art-svc-ico">🏗️</span><span class="art-svc-title">Investir</span><span class="art-svc-sub">Immobilier neuf</span></a>
    <a href="../s-installer-en-georgie.html" class="art-svc-card"><span class="art-svc-ico">🏡</span><span class="art-svc-title">S'installer</span><span class="art-svc-sub">Accompagnement expat</span></a>
    <a href="../a-propos.html" class="art-svc-card"><span class="art-svc-ico">🤝</span><span class="art-svc-title">Notre équipe</span><span class="art-svc-sub">Axel & Victor</span></a>
  </div>
</div>`;
}
function social() {
  return `<div class="art-social">
  <p class="art-sec-eyebrow">Suivez-nous</p>
  <p class="art-sec-h2">La Géorgie en direct</p>
  <p class="art-social-desc">Contenus quotidiens sur la vie à Batumi et Tbilissi.</p>
  <div class="art-social-row">
    <a href="https://www.youtube.com/@VivreenG%C3%A9orgie" class="art-social-btn" target="_blank" rel="noopener">▶ YouTube</a>
    <a href="https://www.tiktok.com/@vivreengeorgie" class="art-social-btn" target="_blank" rel="noopener">♪ TikTok</a>
    <a href="https://www.instagram.com/vivreengeorgie/" class="art-social-btn" target="_blank" rel="noopener">📷 Instagram</a>
  </div>
</div>`;
}
function cta(msg) {
  const url = `https://wa.me/33681108147?text=${encodeURIComponent('Bonjour, je viens de Vivre en Géorgie. ' + (msg || "J'aimerais en savoir plus sur vos services."))}`;
  return `<div class="cta-band">
  <h3>Une question sur la Géorgie ?</h3>
  <p>Notre équipe répond directement par WhatsApp, en français.</p>
  <a href="${url}" class="cta-wa" target="_blank" rel="noopener">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    Nous écrire sur WhatsApp
  </a>
</div>`;
}
function related(items) {
  const cards = items.map(([slug, title]) =>
    `<a href="${slug}" class="related-card"><span class="title">${title}</span></a>`
  ).join('\n    ');
  return `<div class="related"><h3>Articles liés</h3><div class="related-grid">${cards}</div></div>`;
}
function faq(items) {
  const list = items.map(([q, a]) => `<div class="faq-item">
    <button class="faq-q" onclick="toggleFaq(this)" aria-expanded="false">${q}<svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg></button>
    <div class="faq-a"><p>${a}</p></div>
  </div>`).join('\n  ');
  return `<div class="art-faq"><p class="art-sec-eyebrow">FAQ</p><p class="art-sec-h2">Questions fréquentes</p><div class="faq-list">${list}</div></div>`;
}
function footer() {
  return `<footer>© 2026 Vivre en Géorgie · <a href="../index.html">Accueil</a> · <a href="../blog.html">Blog</a> · <a href="../mentions-legales.html">Mentions légales</a></footer>`;
}
function build(label, h1, date, readtime, lead, body, faqItems, ctaMsg, relatedItems) {
  return `
<div class="article-wrap">
  <p class="article-label">${label}</p>
  <h1>${h1}</h1>
  <div class="article-meta"><span>📅 ${date}</span><span>⏱ ${readtime}</span><span>✍️ Axel Briard</span></div>
  <div class="art-lead"><p>${lead}</p></div>
  <div class="article-body">${body}</div>
  ${faq(faqItems)}
  ${services()}
  ${social()}
  ${cta(ctaMsg)}
  ${related(relatedItems)}
</div>
${footer()}
`;
}
function insert(filename, content) {
  const fp = path.join(blogDir, filename);
  let html = fs.readFileSync(fp, 'utf8');
  const marker = '</body>\n</html>';
  const idx = html.lastIndexOf(marker);
  if (idx === -1) { console.error('Marker not found: ' + filename); return; }
  html = html.slice(0, idx) + content + marker;
  fs.writeFileSync(fp, html, 'utf8');
  console.log('Done: ' + filename);
}

// ── Article 6 ────────────────────────────────────────────────────────────────
insert('entrepreneurs-quittent-france-georgie.html', build(
  'ENTREPRENEURIAT', 'Pourquoi des entrepreneurs français choisissent la Géorgie',
  '26 juin 2026', '7 min de lecture',
  'De plus en plus d\'entrepreneurs francophones relocalisent tout ou partie de leur activité en Géorgie. Voici les raisons concrètes qui motivent ce choix — et les réalités à connaître avant de se lancer.',
  `<h2>La charge administrative en France : un frein réel</h2>
<p>La France impose aux entrepreneurs l'une des charges administratives et fiscales les plus lourdes d'Europe. Cotisations sociales élevées, complexité des déclarations, délais de création d'entreprise, inspection du travail contraignante — autant d'éléments qui pèsent sur la rentabilité réelle d'une activité, surtout pour les petites structures.</p>
<p>Ce n'est pas une critique idéologique : c'est une réalité opérationnelle que les entrepreneurs vivent au quotidien. Et c'est cette réalité qui pousse certains à explorer d'autres territoires, dont la Géorgie.</p>
<h2>Ce que la Géorgie offre aux entrepreneurs</h2>
<p>La Géorgie permet de créer une LLC (société à responsabilité limitée) en 1 à 3 jours ouvrés, pour un coût total inférieur à 200 €. Il n'existe pas d'obligation de capital minimum pour une LLC standard. Les charges administratives récurrentes sont limitées : comptabilité annuelle, déclarations fiscales simplifiées, pas de cotisations sociales obligatoires sur le modèle français.</p>
<p>Le système fiscal géorgien est simplifié : IS de 15 % sur les bénéfices distribués (système dit estonien), possibilité d'opter pour le statut Small Business (1 % sur le CA, sous conditions d'éligibilité). Ces mécanismes peuvent présenter des avantages réels pour certains profils d'activité.</p>
<h2>Le processus de création d'une société géorgienne</h2>
<p>Les étapes pour créer une LLC en Géorgie sont : dépôt du dossier à la Maison de Justice (House of Justice), enregistrement au registre du commerce géorgien, obtention du numéro d'identification fiscale, ouverture d'un compte bancaire professionnel. Nous accompagnons chacune de ces étapes.</p>
<p>La présence physique en Géorgie n'est pas nécessaire pour la création (un représentant autorisé peut agir), mais elle facilite grandement l'ouverture de compte bancaire.</p>
<h2>Ce que la Géorgie n'est pas</h2>
<p>La Géorgie n'est pas une solution magique. Créer une société géorgienne ne modifie pas automatiquement votre résidence fiscale française. Selon votre situation personnelle, vos revenus peuvent rester imposables en France — un sujet qui relève d'un fiscaliste compétent dans les deux pays, pas d'un conseiller d'expatriation.</p>
<p>De plus, travailler depuis la Géorgie demande une adaptation réelle : langue, banque, culture professionnelle, qualité variable des prestataires locaux. Ce n'est pas un choix à faire à la légère.</p>
<h2>Qui est réellement concerné ?</h2>
<p>Les profils qui tirent le plus parti d'une structure en Géorgie sont généralement : les prestataires de services digitaux avec des clients hors France (consultants, développeurs, créateurs de contenu), les entrepreneurs qui souhaitent tester un marché géorgien ou régional, et les investisseurs qui souhaitent structurer des acquisitions immobilières locales.</p>
<p>Chaque situation est différente. Vivre en Géorgie analyse votre projet individuellement pour vous orienter vers la structure adaptée à vos besoins réels.</p>`,
  [
    ['Est-il légal pour un Français de créer une société en Géorgie ?', 'Oui, c\'est parfaitement légal. Les étrangers peuvent créer et détenir des sociétés géorgiennes. Cela ne dispense cependant pas de respecter les obligations fiscales dans le pays de résidence fiscale du dirigeant.'],
    ['Faut-il vivre en Géorgie pour y avoir une société ?', 'Non, la présence physique n\'est pas requise pour la création. En revanche, elle est fortement recommandée pour l\'ouverture de compte bancaire et la gestion opérationnelle quotidienne. Une société sans compte bancaire actif a une utilité limitée.'],
    ['Combien coûte la création d\'une LLC en Géorgie ?', 'Les frais de création d\'une LLC standard en Géorgie s\'élèvent à 100–200 € environ, incluant les frais de dossier et d\'enregistrement. Les honoraires d\'un conseiller d\'accompagnement s\'y ajoutent selon la prestation choisie.'],
    ['La Géorgie a-t-elle signé des conventions fiscales avec la France ?', 'Oui, la Géorgie et la France ont signé une convention fiscale visant à éviter la double imposition. Son application dépend de la situation individuelle de chaque contribuable. Consultez un fiscaliste pour évaluer votre cas.']
  ],
  "J'ai un projet entrepreneurial et j'envisage une structure en Géorgie.",
  [['creer-societe-georgie-24h.html', 'Créer une société en Géorgie en 24h'], ['fiscalite-georgie.html', 'Fiscalité en Géorgie'], ['entreprendre-en-georgie.html', 'Entreprendre en Géorgie']]
));

// ── Article 7 ────────────────────────────────────────────────────────────────
insert('vivre-1000-euros-batumi.html', build(
  'BUDGET', 'Vivre à Batumi avec 1 000 € par mois : réaliste ou mythe ?',
  '27 juin 2026', '7 min de lecture',
  '1 000 € par mois à Batumi — c\'est un chiffre souvent cité, rarement détaillé. Voici une décomposition honnête qui distingue ce qui est possible de ce qui ne l\'est pas selon votre mode de vie.',
  `<h2>Le logement : premier poste à maîtriser</h2>
<p>Avec 1 000 € de budget mensuel total, le logement doit rester dans une fourchette raisonnable. Un studio ou un T1 meublé dans un quartier résidentiel calme (hors centre-ville vue mer) se loue entre 300 et 420 € par mois en contrat annuel. C'est le type de logement compatible avec ce budget.</p>
<p>Évitez les estimations des plateformes type Airbnb pour les tarifs "normaux" : les prix courts séjours sont bien plus élevés que les loyers annuels négociés directement avec un propriétaire local.</p>
<h2>L'alimentation : l'avantage du marché local</h2>
<p>Un budget alimentaire de 150 à 200 € par mois est réaliste à condition de s'approvisionner au marché local et de cuisiner la majorité des repas chez soi. Les fruits, légumes, fromages locaux et viandes de base sont peu chers.</p>
<p>Manger au restaurant tous les jours dans des établissements géorgiens locaux (khinkali, lobiani, salades) coûte 5 à 8 € par repas. Deux repas par jour au restaurant représentent environ 300–400 € supplémentaires par mois — ce qui dépasse rapidement le budget de 1 000 €.</p>
<h2>Les postes fixes : internet, téléphone, utilitaires</h2>
<p>La fibre à domicile (jusqu'à 1 Gbps) coûte 15 à 25 € par mois. Une SIM locale avec data illimitée revient à 10–15 €. L'électricité et l'eau pour un petit appartement : 20 à 50 € selon la saison (chauffage en hiver). Ces postes fixes représentent environ 50 à 90 € mensuels.</p>
<h2>Les imprévus : ce qu'on oublie toujours</h2>
<p>Un budget de 1 000 € laisse peu de marge pour les dépenses imprévues : visites médicales, médicaments, déplacements hors de Batumi, frais de visa (si renouvellement), caution de logement pour le premier mois. Un fonds de sécurité de deux mois de budget est fortement recommandé à l'installation.</p>
<p>L'assurance santé internationale est souvent ignorée dans les calculs — elle représente 40 à 100 € par mois selon la couverture choisie. Vivre sans assurance santé est un risque que nous déconseillons.</p>
<h2>Pour qui 1 000 € par mois est-il réaliste à Batumi ?</h2>
<p>Ce budget est réaliste pour une personne seule qui : cuisine régulièrement à la maison, loge dans un quartier résidentiel sans vue mer, utilise les transports locaux (bus, Bolt), et n'a pas de dépenses professionnelles ni de voyages fréquents.</p>
<p>Il devient insuffisant si vous : souhaitez vivre dans un appartement neuf proche du Boulevard, mangez fréquemment dans des restaurants fréquentés par les expatriés, avez des abonnements à services internationaux (Netflix, outils SaaS, etc.) ou si vous souhaitez épargner.</p>
<p>Un budget de 1 200 à 1 500 € par mois offre un niveau de confort nettement plus serein à Batumi, sans pour autant tomber dans l'excès.</p>`,
  [
    ['Est-ce vraiment possible de vivre avec 1 000 € à Batumi ?', 'Oui, c\'est possible pour une personne seule avec un mode de vie adapté : logement simple hors zone touristique, alimentation au marché local, transports locaux. Ce budget laisse peu de marge pour les imprévus et les loisirs.'],
    ['Quelle est la répartition idéale d\'un budget de 1 000 € à Batumi ?', 'Environ 350–420 € pour le logement, 150–200 € pour l\'alimentation, 50–90 € pour les services (internet, téléphone, utilitaires), 60–100 € pour l\'assurance santé, et 100–150 € pour les transports et loisirs.'],
    ['Le coût de la vie à Batumi est-il stable ?', 'Il augmente progressivement, en particulier pour l\'immobilier locatif dans les zones proches de la mer. Les prix de l\'alimentation et des transports locaux restent relativement stables. Budgéter avec une marge est prudent.']
  ],
  "J'aimerais estimer mon budget pour m'installer à Batumi.",
  [['cout-vie-batumi.html', 'Coût de la vie à Batumi en 2026'], ['installation-batumi-budget.html', 'Budget d\'installation à Batumi'], ['quartiers-batumi.html', 'Choisir son quartier à Batumi']]
));

// ── Article 8 ────────────────────────────────────────────────────────────────
insert('creer-societe-georgie-24h.html', build(
  'ENTREPRENEURIAT', 'Créer une société en Géorgie en 24 heures : le processus réel',
  '28 juin 2026', '7 min de lecture',
  'La Géorgie est l\'un des pays où la création d\'entreprise est parmi les plus simples et rapides au monde. En pratique, les démarches prennent 1 à 3 jours ouvrés selon votre situation. Voici ce que cela implique concrètement.',
  `<h2>Les étapes de création d'une LLC géorgienne</h2>
<p>La création d'une LLC (Société à Responsabilité Limitée) en Géorgie suit un processus standardisé :</p>
<ol>
  <li><strong>Choix du nom de société et vérification de disponibilité</strong> au registre national des entreprises</li>
  <li><strong>Préparation des statuts</strong> (charte de la société)</li>
  <li><strong>Dépôt du dossier</strong> à la Maison de Justice (House of Justice) ou en ligne via le portail officiel</li>
  <li><strong>Enregistrement</strong> au registre du commerce géorgien (Samokmedo Reestri)</li>
  <li><strong>Obtention du numéro d'identification fiscale (TIN)</strong> auprès de l'Agence fiscale géorgienne</li>
  <li><strong>Ouverture d'un compte bancaire professionnel</strong> — étape distincte, non incluse dans les 24h</li>
</ol>
<p>Les étapes 1 à 5 peuvent être effectuées en une journée ouvrable pour les dossiers simples. Le délai dépend du mode de traitement choisi (standard ou express) et du prestataire qui vous accompagne.</p>
<h2>Les documents nécessaires</h2>
<p>Pour un fondateur étranger (non-résident géorgien), les documents généralement requis sont : passeport valide (original + copie certifiée traduite en géorgien), informations sur les statuts de la société (nom, objet, adresse du siège, répartition des parts), et dans certains cas, une procuration si vous passez par un représentant local.</p>
<p>L'adresse du siège social peut être une adresse commerciale fournie par un prestataire local — ce qui est courant pour les sociétés dont les associés ne résident pas en Géorgie.</p>
<h2>Coût total de la création</h2>
<p>Les frais officiels d'enregistrement sont de l'ordre de 100 € en traitement standard, et davantage en traitement accéléré (quelques heures). Les honoraires d'un accompagnateur ou d'un comptable local s'ajoutent selon la prestation choisie.</p>
<p>Le capital social minimum pour une LLC en Géorgie n'est pas imposé par la loi pour les structures standard — il peut théoriquement être d'un lari.</p>
<h2>Ce qui se passe après l'immatriculation</h2>
<p>Une fois la société créée, vous devrez : ouvrir un compte bancaire professionnel (étape qui peut prendre plusieurs jours à plusieurs semaines selon les banques et le profil), mettre en place une comptabilité conforme aux exigences fiscales géorgiennes, et déclarer votre activité auprès de l'administration fiscale.</p>
<p>Si vous optez pour le régime Small Business, une demande spécifique doit être faite — ce régime ne s'applique pas automatiquement.</p>
<h2>Société géorgienne et résidence fiscale : deux questions distinctes</h2>
<p>La création d'une LLC en Géorgie ne modifie pas automatiquement votre résidence fiscale dans votre pays d'origine. Ces deux dimensions doivent être traitées séparément, avec l'aide de professionnels qualifiés. Vivre en Géorgie vous accompagne sur les aspects pratiques de création et d'ouverture de compte, et vous oriente vers les professionnels fiscaux et juridiques compétents.</p>`,
  [
    ['Combien de temps faut-il vraiment pour créer une société en Géorgie ?', 'L\'enregistrement officiel peut être effectué en 1 à 3 jours ouvrés selon le mode de traitement. L\'ouverture de compte bancaire, étape distincte, peut prendre quelques jours à quelques semaines supplémentaires selon la banque et le profil du demandeur.'],
    ['Faut-il être physiquement en Géorgie pour créer une société ?', 'Non, la création peut être effectuée à distance via un représentant autorisé. Cependant, la présence physique est fortement recommandée pour l\'ouverture de compte bancaire, qui reste l\'étape la plus exigeante du processus.'],
    ['Quelle est la différence entre une LLC géorgienne et le statut Small Business ?', 'Une LLC (Ltd) est une personne morale distincte avec ses propres obligations légales. Le statut Small Business est un régime fiscal applicable à une personne physique exerçant une activité commerciale. Ce sont deux structures différentes avec des implications juridiques et fiscales distinctes.'],
    ['La société géorgienne peut-elle avoir des clients en France ?', 'Oui, une LLC géorgienne peut facturer des clients dans n\'importe quel pays. Les implications fiscales de ces flux dépendent des conventions fiscales applicables et de la situation de résidence du dirigeant — un sujet à traiter avec un fiscaliste compétent.']
  ],
  "J'aimerais créer une société en Géorgie. Quelles sont les prochaines étapes ?",
  [['fiscalite-georgie.html', 'Fiscalité en Géorgie'], ['compte-bancaire-georgie.html', 'Ouvrir un compte bancaire en Géorgie'], ['entrepreneurs-quittent-france-georgie.html', 'Pourquoi des entrepreneurs choisissent la Géorgie']]
));

// ── Article 9 ────────────────────────────────────────────────────────────────
insert('batumi-10-ans-evolution.html', build(
  'DESTINATION', 'Batumi en dix ans : une transformation urbaine sans précédent',
  '29 juin 2026', '8 min de lecture',
  'Batumi de 2015 à 2026 : deux villes presque différentes. L\'infrastructure, le tourisme, l\'immobilier et la démographie ont tous connu des bouleversements. Ce qu\'il faut retenir pour comprendre où la ville va.',
  `<h2>L'avant : une station balnéaire soviétique en sommeil</h2>
<p>Au début des années 2010, Batumi sortait à peine de la stagnation économique post-soviétique. Quelques hôtels vétustes, un boulevard balnéaire peu entretenu, une économie locale portée principalement par le port et un tourisme interne saisonnier. La ville comptait environ 150 000 habitants et n'apparaissait dans aucun classement international des destinations d'expatriation.</p>
<p>La libéralisation économique engagée sous Saakachvili dans les années 2000 avait posé les bases d'un cadre légal simplifié, mais les effets tangibles sur la ville mettaient du temps à se manifester.</p>
<h2>Le tournant 2015–2020 : les premières tours et l'immobilier neuf</h2>
<p>À partir de 2015, les premiers grands projets immobiliers ont transformé la skyline de Batumi. Des tours résidentielles de 20 à 40 étages ont commencé à sortir de terre le long du Boulevard et dans les quartiers adjacents. Des promoteurs géorgiens et azerbaïdjanais ont lancé des programmes ambitieux, attirant une première vague d'investisseurs étrangers.</p>
<p>Le marché touristique s'est également diversifié : des visiteurs turcs, russes et, progressivement, européens ont découvert la ville. Les restaurants, bars et infrastructures de loisirs se sont multipliés pour répondre à cette demande croissante.</p>
<h2>2020–2024 : l'accélération portée par les flux migratoires</h2>
<p>La pandémie de 2020 a paradoxalement accéléré l'attractivité de la Géorgie pour les nomades digitaux : les frontières européennes fermaient, tandis que la Géorgie restait ouverte à certains voyageurs. Puis, en 2022, l'arrivée massive de travailleurs et d'entrepreneurs russes fuyant les conséquences de la guerre en Ukraine a créé un choc de demande immobilier et locatif sans précédent à Batumi et Tbilissi.</p>
<p>Les loyers ont doublé dans certains quartiers en l'espace d'un an. Les prix de l'immobilier neuf ont suivi. La ville a absorbé des dizaines de milliers de nouveaux résidents en quelques mois, créant des tensions sur l'offre de logements et les services.</p>
<h2>2026 : Batumi aujourd'hui</h2>
<p>En 2026, Batumi est une ville en consolidation. Les grands chantiers sont encore nombreux, mais la croissance du nombre de nouveaux résidents étrangers s'est partiellement stabilisée. La communauté francophone est désormais structurée, avec des groupes, des événements et des prestataires dédiés.</p>
<p>Les prix de l'immobilier se sont partiellement corrigés après le pic de 2022–2023, mais restent nettement au-dessus des niveaux pré-2020. La ville dispose aujourd'hui d'une infrastructure de base améliorée : routes rénovées, nouvelles lignes de bus, hôpitaux modernisés, accès internet de qualité généralisé.</p>
<h2>Ce que cette évolution signifie pour les expatriés et investisseurs</h2>
<p>La transformation de Batumi n'est pas terminée. Des zones entières sont encore en chantier. Des opportunités existent encore, notamment sur des programmes en cours de commercialisation dans des quartiers en développement. Mais l'époque des prix ultralow du début des années 2010 est révolue.</p>
<p>Comprendre l'histoire de la ville permet de calibrer correctement ses attentes : Batumi n'est pas encore une métropole, mais elle n'est plus non plus la ville endormie d'il y a dix ans. C'est cette position intermédiaire — entre développement et maturité — qui crée à la fois ses opportunités et ses risques.</p>`,
  [
    ['Quand Batumi a-t-elle vraiment commencé à changer ?', 'La transformation visible a commencé vers 2015 avec les premiers grands projets immobiliers. Elle a été accélérée par les flux migratoires de 2022. En 2026, la ville est en phase de consolidation après des années de croissance rapide.'],
    ['La croissance de Batumi va-t-elle continuer ?', 'Des signaux suggèrent une poursuite du développement, portée par les projets immobiliers en cours et l\'afflux continu de résidents étrangers. Cependant, le rythme de croissance des années 2022–2023 ne semble pas se maintenir à la même intensité.'],
    ['Est-ce encore le bon moment pour s\'installer ou investir à Batumi ?', 'La fenêtre des prix très bas est fermée pour les zones centrales. Des opportunités restent disponibles dans les quartiers en développement et sur certains programmes sur plan. Une analyse du marché actuel avec des professionnels présents sur place est indispensable avant de décider.']
  ],
  "J'aimerais comprendre le marché actuel à Batumi avant de prendre une décision.",
  [['pourquoi-batumi-2026.html', 'Pourquoi tout le monde parle de Batumi'], ['investir-immobilier-batumi.html', 'Investir dans l\'immobilier à Batumi'], ['batumi-change-vite-dubai.html', 'Batumi vs Dubaï']]
));

// ── Article 10 ────────────────────────────────────────────────────────────────
insert('investir-immobilier-batumi.html', build(
  'INVESTISSEMENT', 'Investir dans l\'immobilier à Batumi : état du marché en 2026',
  '30 juin 2026', '9 min de lecture',
  'Le marché immobilier de Batumi attire des investisseurs francophones depuis plusieurs années. Voici une présentation honnête de ses caractéristiques actuelles, de ses opportunités et de ses risques réels.',
  `<h2>Panorama du marché en 2026</h2>
<p>Le marché immobilier de Batumi est jeune, dynamique, et encore en cours de structuration. L'offre de logements neufs est abondante, avec des dizaines de programmes en cours de commercialisation. La demande locative est portée par les touristes en été et par une communauté grandissante de résidents étrangers à l'année.</p>
<p>Le marché se caractérise par une forte concentration sur l'immobilier neuf et une liquidité encore limitée sur la revente. Contrairement à Paris ou Londres, il n'existe pas d'agences immobilières de stature internationale qui garantissent des standards uniformes de transaction. La due diligence sur chaque promoteur est indispensable.</p>
<h2>Prix au m² par zone en 2026</h2>
<ul>
  <li><strong>Boulevard / front de mer (1ère ligne) :</strong> 1 400–2 200 €/m² pour le neuf</li>
  <li><strong>Centre-ville, à 5–15 min à pied de la mer :</strong> 900–1 500 €/m²</li>
  <li><strong>Quartiers résidentiels à 20+ min de la mer :</strong> 600–1 000 €/m²</li>
  <li><strong>Périphérie et projets en construction avancée :</strong> 500–800 €/m²</li>
</ul>
<p>Ces prix sont indicatifs et varient selon le standing du programme, le promoteur et la phase de commercialisation. Les prix sur plan sont généralement 10 à 20 % inférieurs aux prix au moment de la livraison.</p>
<h2>Le marché locatif</h2>
<p>La demande locative à Batumi est saisonnière pour les locations courtes durées (forte en été) et plus stable pour les locations annuelles portées par les résidents étrangers. Les rendements locatifs bruts observés sur les appartements bien situés se situent généralement dans une fourchette de 6 à 10 % annuels selon la zone et le type de gestion.</p>
<p><strong>Note importante :</strong> ces chiffres sont des observations de marché, non des projections ni des engagements. Les rendements réels dépendent du taux d'occupation, des frais de gestion, des périodes de vacance locative et des charges de copropriété. Toute analyse sérieuse doit intégrer ces variables.</p>
<h2>Ce que Vivre en Géorgie accompagne</h2>
<p>Notre équipe travaille avec des promoteurs sélectionnés sur la base de leur sérieux, de leurs réalisations passées et de leur solidité financière. Nous accompagnons les investisseurs dans la sélection du programme, la visite des chantiers, la négociation des conditions et les démarches administratives associées à l'acquisition.</p>
<p>Notre accompagnement sur les programmes partenaires est sans honoraires pour l'investisseur : Vivre en Géorgie peut être rémunéré par le promoteur lorsqu'une acquisition est réalisée. Nous vous informons de ce modèle dans un souci de transparence totale.</p>
<h2>Les risques à ne pas sous-estimer</h2>
<ul>
  <li><strong>Qualité de construction variable :</strong> les normes de construction géorgiennes ne sont pas équivalentes aux normes européennes. Une inspection indépendante est recommandée.</li>
  <li><strong>Délais de livraison :</strong> les retards sont fréquents sur le marché géorgien. Il faut prévoir des délais dans son plan de financement.</li>
  <li><strong>Liquidité limitée à la revente :</strong> le marché secondaire est moins actif que dans les grandes métropoles. La revente rapide à un bon prix n'est pas garantie.</li>
  <li><strong>Risque de change :</strong> les prix sont souvent libellés en USD ou GEL. La fluctuation du taux de change est un facteur de risque pour les investisseurs qui raisonnent en euros.</li>
</ul>`,
  [
    ['Quels sont les rendements locatifs à Batumi ?', 'Les rendements locatifs bruts observés se situent généralement entre 6 et 10 % par an selon la localisation et le type de gestion. Ces chiffres sont des observations de marché et non des projections. Les rendements réels dépendent du taux d\'occupation, des frais et des vacances locatives.'],
    ['Un étranger peut-il acheter de l\'immobilier en Géorgie ?', 'Oui, les étrangers peuvent acheter librement de l\'immobilier en Géorgie, à l\'exception des terres agricoles. La propriété est enregistrée au registre national des propriétés. Aucune restriction de nationalité ne s\'applique pour les biens résidentiels et commerciaux.'],
    ['Faut-il créer une société pour investir dans l\'immobilier en Géorgie ?', 'Non, les acquisitions immobilières peuvent être faites à titre personnel. La création d\'une société peut présenter des avantages pour la gestion locative ou pour des acquisitions multiples, mais ce n\'est pas obligatoire. Ce choix doit être analysé selon le projet spécifique.'],
    ['Comment Vivre en Géorgie est-il rémunéré pour l\'accompagnement immobilier ?', 'Sur les programmes partenaires, notre accompagnement est sans honoraires pour l\'investisseur. Vivre en Géorgie peut être rémunéré par le promoteur lorsqu\'une acquisition est réalisée. Nous vous informons de ce modèle en toute transparence.']
  ],
  "J'étudie un investissement immobilier à Batumi. J'aimerais en savoir plus.",
  [['batumi-10-ans-evolution.html', 'Batumi : 10 ans de transformation'], ['batumi-change-vite-dubai.html', 'Batumi vs Dubaï'], ['quartiers-batumi.html', 'Choisir son quartier à Batumi']]
));

console.log('\n✓ Batch 2 complete (articles 6–10)');
