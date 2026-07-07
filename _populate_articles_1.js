const fs = require('fs');
const path = require('path');
const blogDir = path.join(__dirname, 'blog');

const WA = 'https://wa.me/33681108147?text=Bonjour%2C%20je%20viens%20de%20Vivre%20en%20G%C3%A9orgie.';

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

// ── Article 1 ────────────────────────────────────────────────────────────────
insert('pourquoi-batumi-2026.html', build(
  'DESTINATION', 'Pourquoi tout le monde parle de Batumi en 2026 ?',
  '21 juin 2026', '7 min de lecture',
  'Batumi s\'est imposée comme la référence des destinations francophones pour l\'expatriation en 2026. Ville portuaire sur la mer Noire, elle combine liberté de circulation, coût de la vie contenu, économie en expansion et absence de visa pour les ressortissants européens.',
  `<h2>Une ville transformée en une décennie</h2>
<p>Il y a dix ans, Batumi était encore une station balnéaire de province, connue principalement des touristes géorgiens et azerbaïdjanais. Aujourd'hui, c'est une ville en plein chantier, où les tours de verre voisinent avec les façades soviétiques et les jardins botaniques centenaires. La transformation est visible à chaque coin de rue : nouveaux hôtels, restaurants, co-working spaces, et une communauté internationale qui s'est installée durablement.</p>
<p>Cette mutation rapide n'est pas due au hasard. Elle résulte d'une politique délibérée d'ouverture économique et d'une position géographique rare : porte d'entrée entre l'Europe et le Caucase, accessible en moins de quatre heures de vol depuis Paris.</p>
<h2>Le visa-free : l'atout structurel pour les Européens</h2>
<p>Les ressortissants français — comme la plupart des citoyens européens — peuvent entrer et séjourner en Géorgie <strong>jusqu'à 365 jours consécutifs sans visa</strong>, sur simple présentation d'un passeport valide. Cette liberté de circulation est l'un des premiers arguments qui explique l'afflux de nomades digitaux et d'entrepreneurs.</p>
<p>Cette règle s'applique à l'ensemble du territoire géorgien. Elle ne confère pas automatiquement un statut de résident légal ni ne modifie la résidence fiscale dans le pays d'origine — deux points qu'il faut traiter séparément si l'installation doit être pérenne.</p>
<h2>Un coût de la vie qui défie la comparaison européenne</h2>
<p>À Batumi en 2026, un appartement moderne d'une chambre dans un immeuble récent se loue entre 400 et 700 € par mois selon la localisation et l'équipement. Un repas dans un restaurant local coûte entre 5 et 10 €. La connexion fibre 1 Gbps est disponible à partir de 15 € par mois.</p>
<p>Ces chiffres doivent être pris pour ce qu'ils sont : des indicateurs observés sur le terrain, susceptibles d'évoluer avec la hausse du marché immobilier en cours. La ville reste moins chère que la quasi-totalité des grandes villes européennes, mais l'écart se réduit dans les zones les plus demandées.</p>
<h2>Construction et marché immobilier en forte croissance</h2>
<p>Batumi est aujourd'hui l'une des villes à la croissance immobilière la plus rapide de la région. Des dizaines de projets de tours résidentielles sont en cours, portés par des promoteurs géorgiens et internationaux. Pour les acquéreurs, cela crée des opportunités sur plan, avec des prix d'entrée inférieurs à ceux du marché secondaire.</p>
<p>Ce dynamisme comporte aussi des risques propres à tout marché en développement rapide : qualité des constructions variable, délais de livraison à surveiller, liquidité encore limitée sur le marché de revente. Une analyse sérieuse s'impose avant toute décision.</p>
<h2>Batumi dans le débat mondial sur l'expatriation</h2>
<p>La ville est désormais citée régulièrement dans les classements des meilleures destinations pour les nomades digitaux et entrepreneurs. Les forums francophones, les groupes Facebook et les chaînes YouTube spécialisés en ont fait un sujet récurrent depuis 2022. Cette visibilité attire de nouveaux arrivants, ce qui contribue à faire monter les prix dans les zones les plus centrales.</p>
<p>Comprendre pourquoi Batumi attire ne suffit pas : il faut aussi connaître ses limites réelles, ses quartiers, et le cadre administratif qui s'applique aux étrangers — autant de sujets que Vivre en Géorgie traite directement avec ses clients.</p>`,
  [
    ['Combien de temps peut-on rester à Batumi sans visa ?', 'Les ressortissants français et européens peuvent séjourner en Géorgie jusqu\'à 365 jours consécutifs sans visa, sur présentation d\'un passeport en cours de validité. Cette règle ne confère pas automatiquement un statut de résident légal.'],
    ['Quel est le coût de la vie à Batumi en 2026 ?', 'Un appartement d\'une chambre dans un immeuble récent se loue entre 400 et 700 € selon la localisation. Un repas au restaurant coûte 5 à 10 €. La fibre 1 Gbps est disponible à partir de 15 €/mois.'],
    ['Pourquoi Batumi attire-t-elle autant en 2026 ?', 'La combinaison d\'un visa-free généreux, d\'un coût de la vie inférieur à l\'Europe occidentale, d\'un marché immobilier dynamique et d\'un cadre fiscal simplifié explique l\'intérêt croissant. La communauté francophone déjà en place facilite aussi l\'installation.'],
    ['Batumi est-elle adaptée aux familles ?', 'Batumi propose des écoles internationales, des espaces verts et un rythme de vie moins stressant qu\'une grande capitale. Les familles francophones qui s\'y installent trouvent généralement un cadre de vie agréable, avec des coûts de scolarité bien inférieurs aux standards européens.']
  ],
  "J'aimerais en savoir plus sur une installation à Batumi.",
  [['cout-vie-batumi.html', 'Coût de la vie à Batumi en 2026'], ['batumi-10-ans-evolution.html', 'Batumi : 10 ans de transformation'], ['installation-batumi-budget.html', 'S\'installer à Batumi : budget premier mois']]
));

// ── Article 2 ────────────────────────────────────────────────────────────────
insert('batumi-change-vite-dubai.html', build(
  'ANALYSE', 'Batumi change vite. Trop vite ? La comparaison avec Dubaï',
  '22 juin 2026', '6 min de lecture',
  'En quelques années, Batumi a suivi une trajectoire que certains comparent à celle de Dubaï : tours en verre, investisseurs étrangers, prix immobiliers en hausse. La comparaison mérite d\'être examinée sérieusement — pour en dégager les ressemblances, mais surtout les différences fondamentales.',
  `<h2>La ressemblance superficielle : un développement ultrarapide</h2>
<p>Batumi et Dubaï partagent une même esthétique de la transformation accélérée : des tours qui poussent en quelques mois, une ligne d'horizon qui change d'une saison à l'autre, une attractivité internationale croissante. Les deux villes ont aussi misé sur une politique de liberté économique relative et une fiscalité simplifiée pour attirer investisseurs et entrepreneurs étrangers.</p>
<p>Sur le plan immobilier, les deux marchés ont connu des appréciations significatives sur la période 2020–2026, alimentées par une demande internationale forte et une offre encore insuffisante dans les zones les plus demandées.</p>
<h2>Ce qui distingue fondamentalement Batumi</h2>
<p>La comparaison s'arrête là. Dubaï est une métropole de 3,5 millions d'habitants, avec une infrastructure de classe mondiale, un hub aérien mondial, et des prix immobiliers parmi les plus élevés de la planète. Batumi reste une ville de 160 000 habitants environ, avec un aéroport régional, des routes en cours d'amélioration et des services encore perfectibles.</p>
<p>L'écart de prix est révélateur : le m² à Dubaï tourne autour de 3 000 à 6 000 € dans les zones résidentielles courantes. À Batumi, les programmes neufs se commercialisent entre 800 et 2 000 € selon la localisation et le standing. Cet écart est le reflet d'une maturité de marché très différente.</p>
<h2>L'abordabilité : l'atout que Batumi préserve encore</h2>
<p>Le principal avantage de Batumi sur Dubaï pour un expatrié ou un investisseur francophone reste l'accessibilité financière. On peut y vivre confortablement avec un budget mensuel modeste, acheter un appartement neuf sans avoir à mobiliser des centaines de milliers d'euros, et démarrer une activité sans charges d'exploitation disproportionnées.</p>
<p>Cette accessibilité est directement liée au stade de développement de la ville. Elle n'est pas éternelle : les zones les plus prisées connaissent déjà une hausse perceptible des loyers et des prix d'achat.</p>
<h2>Le risque d'une gentrification accélérée</h2>
<p>La question que se posent les observateurs du marché est celle du rythme. Si l'afflux d'investisseurs étrangers continue au même rythme, certains quartiers centraux pourraient voir leurs prix atteindre des niveaux qui effacent l'avantage concurrentiel de Batumi. C'est déjà observable dans quelques rues du Boulevard, où les loyers ont doublé en quatre ans.</p>
<p>Pour les investisseurs, cela crée une fenêtre d'opportunité dont la durée est incertaine. Pour les expatriés en quête de coût de vie contenu, cela incite à regarder au-delà des seuls quartiers touristiques.</p>
<h2>Notre lecture de terrain</h2>
<p>Batumi en 2026 ressemble à ce que pouvaient être certaines villes de Dubaï dans les années 2000 : un marché en construction, avec ses opportunités, ses risques de construction inégale, et ses incertitudes sur la liquidité à moyen terme. La comparaison n'est pas alarmiste — elle est utile pour calibrer les attentes.</p>
<p>Ceux qui s'y installent ou y investissent aujourd'hui le font dans un marché en mouvement, avec tout ce que cela implique de positif et de risqué. C'est précisément pourquoi un accompagnement sur place, par des personnes qui connaissent les projets et les promoteurs, fait la différence.</p>`,
  [
    ['Batumi va-t-elle devenir aussi chère que Dubaï ?', 'À court terme, non. L\'écart de développement, de population et d\'infrastructure entre les deux villes est considérable. Cela dit, certains quartiers centraux de Batumi connaissent déjà une hausse des prix accélérée. L\'avantage en termes de coût de la vie reste réel, mais n\'est pas statique.'],
    ['Investir à Batumi est-il comparable à investir à Dubaï ?', 'Ce sont deux marchés très différents. Dubaï offre une liquidité bien supérieure et une infrastructure juridique plus mature. Batumi offre des points d\'entrée plus bas et un potentiel d\'appréciation encore ouvert. Les risques sont aussi différents : qualité des constructions, liquidité du marché, incertitudes réglementaires.'],
    ['Vaut-il mieux investir maintenant avant que les prix ne montent trop ?', 'La temporalité du marché est difficile à prédire. Ce qui est observable, c\'est que les prix des programmes neufs bien situés ont augmenté chaque année depuis 2020. Une analyse du projet spécifique, du promoteur et de la zone reste indispensable avant toute décision.']
  ],
  "J'ai un projet d'investissement immobilier à Batumi.",
  [['pourquoi-batumi-2026.html', 'Pourquoi tout le monde parle de Batumi'], ['investir-immobilier-batumi.html', 'Investir dans l\'immobilier à Batumi'], ['batumi-10-ans-evolution.html', 'Batumi : 10 ans de transformation']]
));

// ── Article 3 ────────────────────────────────────────────────────────────────
insert('cout-vie-batumi.html', build(
  'BUDGET', 'Coût de la vie à Batumi en 2026 : le guide chiffré',
  '23 juin 2026', '8 min de lecture',
  'Batumi offre un coût de la vie significativement inférieur à l\'Europe occidentale. Voici les chiffres observés sur place en 2026, sans embellissement, pour vous permettre de budgéter votre installation ou votre séjour.',
  `<h2>Logement : louer à Batumi en 2026</h2>
<p>Le logement est le premier poste de dépense. À Batumi en 2026, voici les fourchettes de loyers observées :</p>
<ul>
  <li><strong>Studio ou T1 meublé, quartier résidentiel :</strong> 300–450 €/mois</li>
  <li><strong>T1 dans un immeuble neuf, proche du Boulevard :</strong> 450–700 €/mois</li>
  <li><strong>T2 meublé, quartier calme :</strong> 500–800 €/mois</li>
  <li><strong>T2/T3 dans un programme neuf avec piscine :</strong> 700–1 200 €/mois</li>
</ul>
<p>Ces prix varient fortement selon la saison (les loyers touristiques estivaux sont nettement plus élevés), la distance à la mer et l'état du logement. Un appartement loué pour un an en contrat annuel sera toujours moins cher qu'une location courte durée.</p>
<h2>Alimentation : marchés et restaurants</h2>
<p>La nourriture à Batumi est l'un des postes où l'avantage est le plus net. Les marchés locaux proposent des fruits, légumes et produits frais à des prix imbattables. Un budget alimentaire de 150 à 250 € par mois couvre largement les courses d'un adulte.</p>
<p>Au restaurant, un repas complet dans un établissement local (khinkali, mchadi, salades) coûte entre 4 et 8 €, boisson comprise. Un restaurant de standing intermédiaire revient à 12–20 €. Les cafés de type occidental, fréquentés par les expatriés, pratiquent des prix comparables à ceux d'une ville de province française.</p>
<h2>Transport et déplacements</h2>
<p>Batumi est une ville relativement compacte. Le bus local coûte l'équivalent de 0,20 €. Les taxis via l'application Bolt sont accessibles : un trajet en ville tourne autour de 1 à 3 €. La voiture n'est pas indispensable pour vivre en centre-ville.</p>
<p>Pour les déplacements vers Tbilissi (3h30 de trajet), le minibus (marshrutka) coûte environ 10–12 €. L'avion interne Batumi–Tbilissi, quand disponible, revient à 30–60 € selon les dates.</p>
<h2>Internet, téléphonie et services</h2>
<ul>
  <li><strong>Fibre 1 Gbps à domicile :</strong> 15–25 €/mois</li>
  <li><strong>SIM locale avec data illimitée :</strong> 10–20 €/mois</li>
  <li><strong>Électricité + eau (appartement standard) :</strong> 30–60 €/mois selon la saison</li>
  <li><strong>Salle de sport :</strong> 20–40 €/mois</li>
</ul>
<h2>Santé et loisirs</h2>
<p>Les consultations médicales chez des praticiens privés coûtent entre 20 et 50 €. Les médicaments courants sont sensiblement moins chers qu'en France. Il n'existe pas de système de remboursement automatique pour les étrangers — une assurance santé internationale est recommandée.</p>
<p>Les loisirs (bars, cinémas, événements culturels) sont accessibles. Un verre dans un bar du Boulevard coûte 3–6 €. La plage, le boulevard maritime et les parcs sont gratuits.</p>
<h2>Récapitulatif mensuel par profil</h2>
<p><strong>Profil sobre (solo, appartement simple, peu de sorties) :</strong> 700–900 €/mois tout compris.</p>
<p><strong>Profil confortable (T2 neuf, restaurants réguliers, loisirs) :</strong> 1 100–1 600 €/mois.</p>
<p><strong>Profil famille (T3, école internationale, voiture) :</strong> 2 000–3 000 €/mois.</p>
<p>Ces estimations incluent le logement, la nourriture, les transports et les loisirs courants, mais pas les dépenses exceptionnelles ni les frais d'un projet entrepreneurial.</p>`,
  [
    ['Combien coûte un appartement à louer à Batumi ?', 'En 2026, un appartement d\'une chambre meublé dans un immeuble récent se loue entre 400 et 700 € par mois selon la localisation. Les studios peuvent se trouver à partir de 300 € dans les quartiers résidentiels.'],
    ['Peut-on vivre à Batumi avec 1 000 € par mois ?', 'Oui, à condition d\'adopter un mode de vie adapté au contexte local : logement simple, courses au marché local, restaurants géorgiens plutôt qu\'expatriés. Ce budget est réaliste pour une personne seule sans charges particulières.'],
    ['Le coût de la vie à Batumi augmente-t-il ?', 'Oui, les prix de l\'immobilier locatif ont augmenté ces dernières années, notamment dans les zones proches de la mer et du Boulevard. L\'alimentation et les transports restent stables à bas prix. La tendance générale est à la hausse, portée par l\'afflux de résidents étrangers.'],
    ['Y a-t-il des dépenses cachées à prévoir ?', 'Oui : assurance santé internationale (50–100 €/mois), frais de création de société si applicable, caution de logement (1–2 mois), et un budget de transition pour les premiers mois avant de trouver un logement annuel.']
  ],
  "J'aimerais discuter du coût de la vie à Batumi.",
  [['vivre-1000-euros-batumi.html', 'Vivre avec 1 000 €/mois à Batumi'], ['installation-batumi-budget.html', 'Budget d\'installation à Batumi'], ['quartiers-batumi.html', 'Choisir son quartier à Batumi']]
));

// ── Article 4 ────────────────────────────────────────────────────────────────
insert('fiscalite-georgie.html', build(
  'FISCALITÉ', 'Fiscalité en Géorgie : ce que le système offre (et ce qu\'il ne promet pas)',
  '24 juin 2026', '9 min de lecture',
  'La Géorgie dispose d\'un système fiscal simplifié par rapport à la France. Avant de prendre toute décision, il est indispensable de comprendre les mécanismes en place — et leurs limites. Vivre en Géorgie ne fournit pas de conseil fiscal : les points ci-dessous sont informatifs et ne remplacent pas l\'avis d\'un conseiller fiscal qualifié.',
  `<h2>Le système fiscal géorgien : vue d'ensemble</h2>
<p>La Géorgie applique un système fiscal relativement simplifié. Les principaux impôts qui concernent les entrepreneurs étrangers sont l'impôt sur les sociétés (IS), la TVA et l'impôt sur le revenu des personnes physiques.</p>
<ul>
  <li><strong>Impôt sur les sociétés :</strong> 15 % sur les bénéfices distribués (système dit « estonien ») — les bénéfices réinvestis dans la société ne sont pas taxés au moment de leur réalisation.</li>
  <li><strong>TVA :</strong> 18 %, avec obligation de s'enregistrer à partir d'un certain seuil de chiffre d'affaires.</li>
  <li><strong>Impôt sur le revenu des personnes physiques :</strong> 20 % sur les revenus perçus en Géorgie.</li>
</ul>
<h2>Le statut Small Business (Maliy Biznes)</h2>
<p>Le statut Small Business permet à une personne physique exerçant une activité commerciale de bénéficier d'un taux d'imposition de 1 % sur son chiffre d'affaires, sous conditions. Ce statut est distinct de la création d'une LLC (société à responsabilité limitée).</p>
<p>Ce régime comporte des conditions strictes d'éligibilité (plafond de CA, nature des activités autorisées) et n'est pas accessible à tous les types d'activités. Il est essentiel de vérifier avec un conseiller fiscal géorgien si votre activité est éligible avant d'en tirer des conclusions budgétaires.</p>
<p><strong>Important :</strong> le statut Small Business ≠ LLC. Ce sont deux structures juridiques distinctes avec des implications différentes.</p>
<h2>Résidence fiscale : une question distincte</h2>
<p>Créer une société en Géorgie ou bénéficier d'un régime fiscal local ne modifie <strong>pas automatiquement</strong> votre résidence fiscale dans votre pays d'origine. La résidence fiscale est déterminée par des règles propres à chaque pays (en France, les critères du Code général des impôts s'appliquent), indépendamment de votre structure juridique en Géorgie.</p>
<p>Ceux qui souhaitent modifier leur résidence fiscale doivent le faire dans les règles, avec l'accompagnement d'un fiscaliste compétent dans les deux pays concernés. Vivre en Géorgie vous oriente vers les bons interlocuteurs mais ne fournit pas ce type de conseil.</p>
<h2>Ce que Vivre en Géorgie peut faire</h2>
<p>Notre équipe vous accompagne dans la création de votre structure juridique en Géorgie, l'ouverture de compte bancaire et les démarches administratives associées. Nous travaillons avec des comptables et avocats géorgiens que nous recommandons à nos clients pour les questions fiscales et juridiques locales.</p>
<p>Nous ne sommes pas fiscalistes, ni avocats, ni experts-comptables. Notre valeur ajoutée est d'être présents sur place, de connaître les acteurs locaux, et de vous éviter les erreurs pratiques de parcours.</p>
<h2>Les pièges à éviter</h2>
<ul>
  <li><strong>Croire que la Géorgie est un paradis fiscal universel :</strong> le système est avantageux pour certains profils, pas pour tous.</li>
  <li><strong>Ignorer les obligations dans le pays de résidence d'origine :</strong> selon les conventions fiscales en vigueur, certains revenus peuvent rester imposables en France.</li>
  <li><strong>Se baser uniquement sur des contenus YouTube ou forums :</strong> les situations fiscales sont individuelles et évoluent avec la réglementation.</li>
</ul>`,
  [
    ['Quel est le taux d\'imposition des sociétés en Géorgie ?', 'L\'IS géorgien est de 15 % sur les bénéfices distribués. Les bénéfices réinvestis dans la société ne sont pas taxés lors de leur réalisation (système estonien). Ce taux peut évoluer selon la réglementation en vigueur.'],
    ['Le statut Small Business est-il accessible à tous ?', 'Non. Il est soumis à des conditions de plafond de CA et d\'éligibilité selon la nature de l\'activité. Il ne s\'applique pas aux LLC et ne convient pas à toutes les situations. Une vérification avec un conseiller local est indispensable.'],
    ['Créer une société en Géorgie suffit-il à changer de résidence fiscale ?', 'Non. La résidence fiscale dépend des règles du pays d\'origine (en France, du Code général des impôts) et non de votre structure en Géorgie. Ce sont deux questions distinctes qui requièrent un traitement séparé.'],
    ['Vivre en Géorgie fournit-il des conseils fiscaux ?', 'Non. Nous ne sommes ni fiscalistes ni avocats fiscaux. Nous accompagnons les démarches pratiques (création de société, ouverture de compte) et orientons vers les professionnels compétents pour les questions fiscales et juridiques.']
  ],
  "J'ai un projet entrepreneurial et des questions sur la fiscalité en Géorgie.",
  [['creer-societe-georgie-24h.html', 'Créer une société en Géorgie en 24h'], ['entreprendre-en-georgie.html', 'Entreprendre en Géorgie'], ['residence-georgienne.html', 'La résidence géorgienne']]
));

// ── Article 5 ────────────────────────────────────────────────────────────────
insert('salaires-georgie.html', build(
  'ÉCONOMIE', 'Salaires en Géorgie : comprendre le marché du travail local en 2026',
  '25 juin 2026', '6 min de lecture',
  'Comprendre les niveaux de salaires en Géorgie est indispensable avant de recruter localement, de fixer un salaire ou d\'évaluer le pouvoir d\'achat sur place. Voici ce que le marché indique en 2026.',
  `<h2>Le salaire moyen en Géorgie en 2026</h2>
<p>Le salaire moyen en Géorgie tourne autour de 1 200–1 500 GEL bruts par mois (soit environ 400–500 € au taux de change actuel). Ce chiffre masque de fortes disparités entre les secteurs, les régions et les niveaux de qualification.</p>
<p>À Tbilissi, les salaires sont sensiblement plus élevés qu'en région, notamment dans les services financiers, la tech et les professions libérales. À Batumi, le secteur touristique et hôtelier offre des emplois saisonniers dont les rémunérations varient fortement entre été et hiver.</p>
<h2>Les secteurs les mieux rémunérés</h2>
<ul>
  <li><strong>Tech et développement logiciel :</strong> 1 500–4 000 € selon l'expérience et les clients (souvent internationaux)</li>
  <li><strong>Services financiers et bancaires :</strong> 800–2 000 €</li>
  <li><strong>Santé (médecins spécialisés) :</strong> 600–1 500 €</li>
  <li><strong>Enseignement supérieur :</strong> 400–800 €</li>
  <li><strong>Hôtellerie-restauration (poste de direction) :</strong> 500–1 200 €</li>
</ul>
<h2>Salaires à Tbilissi vs Batumi</h2>
<p>Les salaires à Tbilissi sont en moyenne 20 à 40 % plus élevés qu'à Batumi pour des postes équivalents, reflet d'une économie plus diversifiée et de la présence d'entreprises multinationales. Batumi reste principalement portée par le tourisme, l'immobilier et le commerce.</p>
<p>Pour un entrepreneur étranger qui recrute localement, cela signifie qu'un assistant administratif bilingue géorgien-anglais peut être trouvé à Batumi entre 400 et 700 € par mois pour un temps plein, selon le niveau d'expérience et les missions.</p>
<h2>Recruter un collaborateur local : ce qu'il faut savoir</h2>
<p>L'embauche en Géorgie est régie par un code du travail relativement souple par rapport aux standards européens. Les charges patronales sont limitées. Un contrat de travail écrit est la norme et est recommandé même pour les emplois informels.</p>
<p>La maîtrise du français est rare dans la population générale. L'anglais est plus répandu, surtout chez les jeunes diplômés. Victor Gogoladze, notre associé local, peut vous accompagner dans le processus de recrutement local.</p>
<h2>Le coût salarial global pour un entrepreneur étranger</h2>
<p>Le coût total employeur en Géorgie est significativement inférieur aux niveaux français ou européens. Pour un poste administratif ou d'assistance, prévoir entre 500 et 900 € de coût total mensuel selon les qualifications et les responsabilités. Pour un profil tech senior bilingue, le marché peut aller jusqu'à 1 500–2 000 € de coût employeur.</p>`,
  [
    ['Quel est le salaire minimum en Géorgie ?', 'Il n\'existe pas de salaire minimum légal unifié en Géorgie au sens où la France l\'entend. Les salaires sont fixés librement par contrat entre employeur et employé. Le marché fixe les niveaux de rémunération selon l\'offre et la demande.'],
    ['Combien coûte un assistant local à Batumi ?', 'Un assistant administratif bilingue géorgien-anglais à Batumi revient à 400–700 € par mois pour un temps plein, selon l\'expérience et les missions. Le coût total employeur reste inférieur aux standards européens.'],
    ['Les Géorgiens parlent-ils français ?', 'La maîtrise du français est peu répandue dans la population générale. L\'anglais est davantage maîtrisé, notamment par les jeunes diplômés des villes. Pour travailler avec des collaborateurs francophones, des formations ou un recrutement ciblé sont souvent nécessaires.']
  ],
  "J'aimerais en savoir plus sur le recrutement local en Géorgie.",
  [['creer-societe-georgie-24h.html', 'Créer une société en Géorgie'], ['entreprendre-en-georgie.html', 'Entreprendre en Géorgie'], ['cout-vie-batumi.html', 'Coût de la vie à Batumi']]
));

console.log('\n✓ Batch 1 complete (5 articles)');
