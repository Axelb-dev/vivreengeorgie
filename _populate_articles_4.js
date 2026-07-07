const fs = require('fs');
const path = require('path');
const blogDir = path.join(__dirname, 'blog');

function services() {
  return `<div class="art-services"><p class="art-sec-eyebrow">Nos services</p><p class="art-sec-h2">Vivre en Géorgie vous accompagne</p><div class="art-services-grid"><a href="../entreprendre-en-georgie.html" class="art-svc-card"><span class="art-svc-ico">🏢</span><span class="art-svc-title">Entreprendre</span><span class="art-svc-sub">Création de société</span></a><a href="../investir-en-georgie.html" class="art-svc-card"><span class="art-svc-ico">🏗️</span><span class="art-svc-title">Investir</span><span class="art-svc-sub">Immobilier neuf</span></a><a href="../s-installer-en-georgie.html" class="art-svc-card"><span class="art-svc-ico">🏡</span><span class="art-svc-title">S'installer</span><span class="art-svc-sub">Accompagnement expat</span></a><a href="../a-propos.html" class="art-svc-card"><span class="art-svc-ico">🤝</span><span class="art-svc-title">Notre équipe</span><span class="art-svc-sub">Axel & Victor</span></a></div></div>`;
}
function social() {
  return `<div class="art-social"><p class="art-sec-eyebrow">Suivez-nous</p><p class="art-sec-h2">La Géorgie en direct</p><p class="art-social-desc">Contenus quotidiens sur la vie à Batumi et Tbilissi.</p><div class="art-social-row"><a href="https://www.youtube.com/@VivreenG%C3%A9orgie" class="art-social-btn" target="_blank" rel="noopener">▶ YouTube</a><a href="https://www.tiktok.com/@vivreengeorgie" class="art-social-btn" target="_blank" rel="noopener">♪ TikTok</a><a href="https://www.instagram.com/vivreengeorgie/" class="art-social-btn" target="_blank" rel="noopener">📷 Instagram</a></div></div>`;
}
function cta(msg) {
  const url = `https://wa.me/33681108147?text=${encodeURIComponent('Bonjour, je viens de Vivre en Géorgie. ' + (msg || "J'aimerais en savoir plus sur vos services."))}`;
  return `<div class="cta-band"><h3>Une question sur la Géorgie ?</h3><p>Notre équipe répond directement par WhatsApp, en français.</p><a href="${url}" class="cta-wa" target="_blank" rel="noopener"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>Nous écrire sur WhatsApp</a></div>`;
}
function related(items) {
  return `<div class="related"><h3>Articles liés</h3><div class="related-grid">${items.map(([s,t])=>`<a href="${s}" class="related-card"><span class="title">${t}</span></a>`).join('')}</div></div>`;
}
function faq(items) {
  return `<div class="art-faq"><p class="art-sec-eyebrow">FAQ</p><p class="art-sec-h2">Questions fréquentes</p><div class="faq-list">${items.map(([q,a])=>`<div class="faq-item"><button class="faq-q" onclick="toggleFaq(this)" aria-expanded="false">${q}<svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg></button><div class="faq-a"><p>${a}</p></div></div>`).join('')}</div></div>`;
}
function footer() {
  return `<footer>© 2026 Vivre en Géorgie · <a href="../index.html">Accueil</a> · <a href="../blog.html">Blog</a> · <a href="../mentions-legales.html">Mentions légales</a></footer>`;
}
function build(label,h1,date,readtime,lead,body,faqItems,ctaMsg,relatedItems) {
  return `\n<div class="article-wrap">\n  <p class="article-label">${label}</p>\n  <h1>${h1}</h1>\n  <div class="article-meta"><span>📅 ${date}</span><span>⏱ ${readtime}</span><span>✍️ Axel Briard</span></div>\n  <div class="art-lead"><p>${lead}</p></div>\n  <div class="article-body">${body}</div>\n  ${faq(faqItems)}\n  ${services()}\n  ${social()}\n  ${cta(ctaMsg)}\n  ${related(relatedItems)}\n</div>\n${footer()}\n`;
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

// ── Article 16 ────────────────────────────────────────────────────────────────
insert('avantages-vivre-georgie.html', build(
  'DESTINATION', 'Vivre en Géorgie : les avantages concrets pour les francophones',
  '6 juillet 2026', '7 min de lecture',
  'La Géorgie présente des atouts réels pour les expatriés européens. Voici un tour d\'horizon honnête de ce que la vie ici offre — sans idéalisation, en nommant également les limites.',
  `<h2>La liberté de circulation et d'installation</h2>
<p>Le premier avantage est légal : les ressortissants français et européens peuvent séjourner jusqu'à 365 jours par an sans visa. Cette liberté de circuler, de tester, et de s'installer progressivement sans contrainte administrative initiale est exceptionnelle à l'échelle mondiale.</p>
<p>Cette liberté permet de prendre son temps : venir d'abord pour quelques semaines, revenir pour quelques mois, puis décider d'une installation plus permanente avec toutes les informations nécessaires. Ce processus progressif est le plus sûr pour éviter les mauvaises surprises.</p>
<h2>Le coût de la vie</h2>
<p>Batumi et Tbilissi offrent un coût de la vie inférieur à celui des grandes villes françaises, avec une qualité de services qui s'est notablement améliorée ces dernières années. Le logement, l'alimentation, les transports et les loisirs sont moins chers qu'en France dans la majorité des catégories.</p>
<p>Cet avantage est réel mais tend à se réduire dans les zones les plus demandées par les expatriés. Les prix du marché immobilier locatif ont augmenté dans les zones centrales de Batumi. Budgéter avec prudence reste indispensable.</p>
<h2>La qualité de vie au quotidien</h2>
<p>La Géorgie offre une nature exceptionnelle accessible rapidement : montagnes du Grand Caucase, mer Noire, forêts, gorges. Le rythme de vie est moins stressant que dans les grandes métropoles européennes. La gastronomie est riche et variée. L'hospitalité géorgienne est une réalité culturelle, pas un slogan.</p>
<p>À Batumi, la proximité de la mer Noire, les hivers doux (comparés à la France), et un boulevard animé toute l'année contribuent à un cadre de vie agréable. À Tbilissi, la richesse architecturale, la scène culturelle et la diversité des restaurants offrent un environnement urbain stimulant.</p>
<h2>Le cadre économique et fiscal</h2>
<p>Le système fiscal géorgien est simplifié et présente des caractéristiques potentiellement avantageuses pour certains profils d'entrepreneurs. La création d'entreprise est rapide, les charges administratives réduites. Cela ne signifie pas que la Géorgie est un paradis fiscal ou qu'elle convient à tous — mais pour les profils adaptés, le cadre économique est objectivement plus léger qu'en France.</p>
<h2>La communauté francophone</h2>
<p>En 2026, la communauté francophone en Géorgie est structurée et active. Des événements réguliers, des groupes en ligne, des prestataires dédiés et des initiatives comme Vivre en Géorgie permettent aux nouveaux arrivants de ne pas se retrouver seuls face à leurs démarches.</p>
<p>Ce réseau est précieux, surtout dans les premières semaines. Il comporte aussi ses travers : informations inexactes qui circulent, expériences individuelles présentées comme des règles générales. Garder un esprit critique est toujours utile.</p>`,
  [
    ['La Géorgie est-elle vraiment adaptée aux Français ?', 'Oui, sous conditions de bonne préparation. La liberté de circulation, le coût de la vie, le cadre économique et la communauté francophone existante sont des atouts réels. Les défis (langue, instabilité régionale, système de santé) doivent être connus et acceptés.'],
    ['Quels sont les avantages de Batumi par rapport à Tbilissi ?', 'Batumi offre la mer Noire, un coût de la vie légèrement inférieur, un rythme de vie plus détendu et une communauté d\'expatriés très visible. Tbilissi offre davantage d\'opportunités économiques, une scène culturelle plus riche et une meilleure infrastructure médicale.'],
    ['La Géorgie est-elle un bon pays pour prendre sa retraite ?', 'Oui, pour les retraités disposant d\'un revenu stable en euros ou en dollars. Le coût de la vie, la qualité de vie, la sécurité et le cadre naturel sont des atouts réels. Les points de vigilance sont la qualité des soins médicaux spécialisés et la nécessité d\'une couverture santé internationale.']
  ],
  "J'aimerais discuter des avantages et inconvénients de vivre en Géorgie pour mon profil.",
  [['defauts-georgie.html', 'Les défauts de la Géorgie'], ['georgie-attire-europeens.html', 'Pourquoi la Géorgie attire les Européens'], ['securite-georgie.html', 'Sécurité en Géorgie']]
));

// ── Article 17 ────────────────────────────────────────────────────────────────
insert('defauts-georgie.html', build(
  'HONNÊTETÉ', 'Les défauts de la Géorgie : ce que personne ne vous dit vraiment',
  '6 juillet 2026', '7 min de lecture',
  'La Géorgie a des défauts réels. Les reconnaître honnêtement est indispensable pour prendre une décision d\'expatriation éclairée. Cet article ne cherche pas à décourager — il cherche à informer.',
  `<h2>La barrière de la langue</h2>
<p>Le géorgien est une langue isolée, sans parenté avec les langues indo-européennes, dotée d'un alphabet unique de 33 lettres. L'apprentissage est long et difficile. Dans la pratique quotidienne, l'anglais permet de fonctionner dans les zones urbaines fréquentées par les étrangers. Mais dès que vous sortez de ces zones, la communication devient difficile.</p>
<p>Les propriétaires, artisans, médecins de quartier, fonctionnaires et chauffeurs plus âgés ne parlent souvent ni anglais ni français. Avoir un contact géorgien de confiance est un avantage considérable pour quiconque souhaite s'intégrer au-delà de la bulle expatriée.</p>
<h2>Le système bancaire : des limites réelles</h2>
<p>Les banques géorgiennes ont progressé, mais elles ne sont pas sans défauts. Les procédures KYC (vérification d'identité et de l'origine des fonds) peuvent être lourdes pour des profils internationaux. Certains types de flux internationaux sont scrutés de près. Les cartes émises en Géorgie ne sont pas toujours acceptées par les plateformes financières internationales.</p>
<p>Pour des activités avec des flux complexes (crypto, paiements multi-devises, structures internationales), les banques géorgiennes peuvent être insuffisantes comme seule solution. Maintenir un compte bancaire européen en parallèle est généralement recommandé.</p>
<h2>L'infrastructure encore inégale</h2>
<p>L'infrastructure routière, ferroviaire et médicale est en amélioration mais reste inégale. Hors des grandes villes, les routes sont parfois dans un état difficile. Les transports en commun inter-villes sont limités. Les coupures d'électricité, rares en ville, sont encore possibles en zone rurale.</p>
<p>Le système de santé géorgien est privé dans sa majorité. Les soins courants et urgences dans les cliniques privées de Batumi et Tbilissi sont accessibles et moins chers qu'en France. Mais pour des soins spécialisés complexes, un retour en Europe ou un transfert vers une grande ville est parfois nécessaire.</p>
<h2>La bureaucratie : progrès réels, résistances persistantes</h2>
<p>La Géorgie a considérablement simplifié ses procédures administratives depuis les années 2000. Mais certains domaines restent imprévisibles : des règles changent sans publication officielle claire, des fonctionnaires appliquent les mêmes textes différemment d'un jour à l'autre. La patience et la flexibilité sont indispensables.</p>
<p>Pour les entrepreneurs, certains aspects de la comptabilité géorgienne et des déclarations fiscales sont moins intuitifs qu'attendu. Un comptable local compétent n'est pas un luxe — c'est une nécessité pour toute société active.</p>
<h2>Le contexte géopolitique régional</h2>
<p>La Géorgie est un pays du Caucase avec un contexte géopolitique complexe : frontières avec la Russie au nord, présence de deux régions séparatistes (Abkhazie, Ossétie du Sud) dont l'accès est impossible depuis le reste du territoire géorgien. L'instabilité régionale est un facteur de risque à long terme à intégrer dans toute décision d'installation ou d'investissement.</p>
<p>Dans la pratique quotidienne à Batumi ou Tbilissi, ce contexte n'affecte pas la vie normale. Mais il constitue une réalité de fond qui mérite d'être prise en compte, notamment pour des engagements à long terme (achat immobilier, investissement important).</p>`,
  [
    ['La Géorgie est-elle stable politiquement ?', 'La Géorgie est une démocratie en développement, avec des institutions qui se renforcent progressivement. La stabilité quotidienne est réelle dans les grandes villes. Le contexte géopolitique régional (frontières avec la Russie, régions séparatistes) constitue un risque de fond à long terme à ne pas ignorer.'],
    ['Le système de santé géorgien est-il suffisant pour les expatriés ?', 'Pour les soins courants et les urgences, les cliniques privées de Batumi et Tbilissi sont accessibles et de bonne qualité relative. Pour des soins très spécialisés, un retour en Europe peut être nécessaire. Une assurance santé internationale est indispensable.'],
    ['Les expatriés regrettent-ils leur installation en Géorgie ?', 'Certains, oui — généralement ceux qui sont venus sans préparation suffisante ou avec des attentes irréalistes. La grande majorité de ceux qui ont bien préparé leur installation et s\'y sont adaptés progressivement expriment une satisfaction globale. La préparation fait la différence.']
  ],
  "J'aimerais avoir une vision équilibrée de la Géorgie avant de décider.",
  [['avantages-vivre-georgie.html', 'Les avantages de vivre en Géorgie'], ['erreurs-expatriation.html', 'Les erreurs à éviter'], ['securite-georgie.html', 'Sécurité en Géorgie']]
));

// ── Article 18 ────────────────────────────────────────────────────────────────
insert('residence-georgienne.html', build(
  'ADMINISTRATION', 'Résidence géorgienne : types, conditions et procédures en 2026',
  '6 juillet 2026', '8 min de lecture',
  'Obtenir un statut de résidence en Géorgie est distinct du simple séjour visa-free. Plusieurs types de permis existent selon votre situation. Voici l\'essentiel pour comprendre vos options.',
  `<h2>La règle des 365 jours sans visa</h2>
<p>Les ressortissants français et de la plupart des pays européens peuvent séjourner en Géorgie jusqu'à 365 jours consécutifs sans visa, sur présentation d'un passeport valide. Cette règle s'applique automatiquement à l'entrée sur le territoire — aucune démarche préalable n'est nécessaire.</p>
<p>Passé ce délai de 365 jours, le séjour doit être interrompu. Certains expatriés pratiquent des "visa runs" (sorties et rentrées sur le territoire pour réinitialiser le compteur), mais cette pratique est soumise à l'appréciation des agents d'immigration et n'est pas une solution pérenne.</p>
<h2>Les types de permis de résidence</h2>
<p>Pour ceux qui souhaitent s'établir durablement au-delà des 365 jours sans formalité, plusieurs permis de résidence existent :</p>
<ul>
  <li><strong>Permis de résidence ordinaire :</strong> accordé aux personnes ayant des liens familiaux avec un résident géorgien, ou dans d'autres situations spécifiques</li>
  <li><strong>Permis de résidence lié à une activité professionnelle :</strong> pour les dirigeants de sociétés géorgiennes actives</li>
  <li><strong>Permis de résidence à long terme :</strong> accordé sous certaines conditions, notamment d'ancienneté de séjour légal</li>
  <li><strong>Permis de résidence par investissement :</strong> voir ci-dessous</li>
</ul>
<h2>La résidence par investissement</h2>
<p>La Géorgie propose un permis de résidence lié à un investissement immobilier ou économique sur son territoire. Le seuil d'investissement requis pour ce type de permis et les conditions précises sont soumis à évolution réglementaire — <strong>[TODO_CRITICAL_LEGAL_REVIEW : vérifier le seuil actuel auprès d'un avocat géorgien avant de communiquer ce chiffre à un client]</strong>. Ne vous fiez pas aux montants cités sur les forums ou les sites qui ne précisent pas leur date de mise à jour.</p>
<h2>Le processus de demande</h2>
<p>Les demandes de permis de résidence sont traitées par l'Agence des services publics de Géorgie (PSA). Le dossier comprend généralement : formulaire de demande, passeport valide, photos d'identité, justificatif de logement en Géorgie, justificatif de revenus ou d'activité, et les documents spécifiques au type de permis demandé.</p>
<p>Vivre en Géorgie vous oriente vers des avocats locaux spécialisés en droit de l'immigration pour les demandes de permis — ce type de démarche requiert un accompagnement juridique professionnel, pas seulement un conseiller pratique.</p>
<h2>Résidence en Géorgie et fiscalité française : la distinction essentielle</h2>
<p>Obtenir un permis de résidence en Géorgie ne suffit pas à modifier votre résidence fiscale en France. La résidence fiscale française est déterminée par des critères précis du Code général des impôts (foyer, lieu de séjour principal, activité professionnelle principale, centre des intérêts économiques). Ces critères doivent être analysés individuellement par un fiscaliste compétent en droit fiscal international.</p>
<p>Ce point est crucial et souvent mal compris : résider officiellement en Géorgie ≠ ne plus être résident fiscal français. Ces deux statuts sont distincts et régis par des règles différentes.</p>`,
  [
    ['Faut-il un permis de résidence pour vivre en Géorgie ?', 'Pour un séjour jusqu\'à 365 jours, non — les Européens entrent sans visa. Pour un établissement durable au-delà, un permis de résidence est recommandé. Les conditions dépendent du type de permis et de la situation personnelle.'],
    ['Le permis de résidence géorgien donne-t-il le droit de travailler en Géorgie ?', 'Un permis de résidence lié à une activité professionnelle ou à une société géorgienne permet d\'exercer cette activité. Le droit de travailler pour un employeur géorgien tiers nécessite des conditions supplémentaires. Consultez un avocat local pour votre situation spécifique.'],
    ['La résidence géorgienne suffit-elle pour ne plus payer d\'impôts en France ?', 'Non. La résidence fiscale française est déterminée par des critères précis du Code général des impôts, indépendamment de votre permis de résidence géorgien. Ce point doit être analysé individuellement par un fiscaliste compétent en droit fiscal international.']
  ],
  "J'aimerais comprendre mes options de résidence en Géorgie.",
  [['erreurs-expatriation.html', 'Les erreurs à éviter à l\'expatriation'], ['fiscalite-georgie.html', 'Fiscalité en Géorgie'], ['s-installer-en-georgie.html', 'S\'installer en Géorgie']]
));

// ── Article 19 ────────────────────────────────────────────────────────────────
insert('quartiers-batumi.html', build(
  'DESTINATION', 'Les quartiers de Batumi : guide pour bien choisir où se loger',
  '6 juillet 2026', '8 min de lecture',
  'Batumi s\'est développée rapidement, créant des atmosphères très différentes selon les quartiers. Voici le guide de terrain pour choisir selon votre profil — que vous cherchiez à louer, acheter ou simplement explorer.',
  `<h2>Le Boulevard et le front de mer</h2>
<p>Le Boulevard de Batumi (Batumi Bulvari) est l'artère principale de la ville, longeant la mer Noire sur plusieurs kilomètres. C'est la zone la plus prisée et la plus chère. Les tours résidentielles neuves y sont nombreuses, avec des vues sur la mer et des commodités à portée de main (restaurants, cafés, commerces).</p>
<p>Avantages : vue mer, animation, accès immédiat à la plage, forte demande locative touristique en été. Inconvénients : prix élevés (loyer et achat), bruit en saison estivale, trafic intense le week-end. Ce quartier convient aux investisseurs qui visent la location courte durée et aux personnes qui valorisent l'animation et la proximité de la mer.</p>
<h2>Le Vieux Batumi (centre historique)</h2>
<p>Le quartier historique de Batumi est l'un des plus authentiques. Ses rues pavées, ses bâtiments de style Art Nouveau soviétique et ses maisons en bois témoignent de l'histoire de la ville. Ce quartier abrite de nombreux restaurants, bars et boutiques artisanales.</p>
<p>C'est une zone mixte : des appartements dans des bâtiments anciens (parfois mal entretenus) côtoient de nouveaux projets de rénovation. Les prix sont inférieurs au Boulevard mais la qualité des logements est plus variable. Idéal pour ceux qui cherchent le charme local, à condition d'accepter une qualité de construction moins prévisible.</p>
<h2>Le nord du Boulevard : Batumi Nova et les quartiers en développement</h2>
<p>Au nord du Boulevard historique, de nouveaux quartiers résidentiels se développent rapidement. Des programmes immobiliers récents proposent des appartements modernes avec des équipements (piscine, parking, sécurité) à des prix parfois inférieurs aux zones centrales.</p>
<p>Ces quartiers sont plus calmes, légèrement plus éloignés de la mer, et bénéficient d'une infrastructure en cours d'amélioration. Ils conviennent à ceux qui privilégient la qualité du logement au rapport qualité-prix sur l'emplacement strict.</p>
<h2>Les quartiers résidentiels plus calmes</h2>
<p>À l'intérieur des terres, des quartiers résidentiels plus calmes proposent des logements à des prix inférieurs, dans un environnement moins touristique. Ces zones sont fréquentées principalement par les locaux et les expatriés qui s'installent à l'année, avec un budget plus serré.</p>
<p>Les commodités (marchés, pharmacies, transports) y sont accessibles. La vie quotidienne y est moins coûteuse et l'accès à la plage se fait en transport (10–15 minutes en bus ou Bolt).</p>
<h2>Tbilissi pour les entrepreneurs : Vake, Saburtalo et le centre</h2>
<p>Pour ceux dont le projet est davantage entrepreneurial que balnéaire, Tbilissi mérite une attention particulière. La capitale géorgienne offre des quartiers résidentiels très différents : Vake (résidentiel, vert, prix élevés), Saburtalo (résidentiel dense, bien desservi, prix intermédiaires), et le centre-ville historique (animé, touristique, prix variables).</p>
<p>Saburtalo est un quartier de Tbilissi — il est important de noter qu'il ne se situe pas à Batumi, contrairement à ce que certains contenus en ligne laissent entendre. C'est un quartier résidentiel tbilissien apprécié pour son accès aux services, aux universités et aux transports.</p>`,
  [
    ['Quel est le quartier le moins cher de Batumi ?', 'Les quartiers résidentiels à l\'intérieur des terres, éloignés de la mer, sont généralement les moins chers. On y trouve des logements entre 250 et 450 € pour un T1 meublé. La qualité varie davantage qu\'en centre-ville.'],
    ['Faut-il habiter en centre-ville pour bien vivre à Batumi ?', 'Non. De nombreux expatriés apprécient les quartiers plus calmes, avec un accès facile au centre via les transports locaux. Cela permet de réduire significativement le budget logement tout en bénéficiant du cadre de vie de Batumi.'],
    ['Batumi ou Tbilissi pour s\'installer ?', 'Cela dépend de votre projet. Batumi est idéale pour un style de vie balnéaire, une communauté d\'expatriés très visible et des prix d\'immobilier inférieurs. Tbilissi est préférable pour les entrepreneurs avec une activité locale, les familles avec enfants scolarisés et ceux qui cherchent une vie urbaine plus diversifiée.']
  ],
  "J'aimerais qu'on m'aide à choisir mon quartier à Batumi selon mon profil.",
  [['cout-vie-batumi.html', 'Coût de la vie à Batumi'], ['installation-batumi-budget.html', 'Budget d\'installation à Batumi'], ['investir-immobilier-batumi.html', 'Investir dans l\'immobilier à Batumi']]
));

// ── Article 20 ────────────────────────────────────────────────────────────────
insert('nourriture-georgienne.html', build(
  'CULTURE', 'La cuisine géorgienne : découverte pour les expatriés francophones',
  '7 juillet 2026', '6 min de lecture',
  'La gastronomie géorgienne est l\'une des plus riches et des moins connues en Europe. Voici ce qui vous attend à table — et comment l\'apprécier pleinement dès les premiers jours à Batumi ou Tbilissi.',
  `<h2>Les plats incontournables à connaître</h2>
<p>La cuisine géorgienne repose sur des produits frais, des herbes aromatiques et des techniques culinaires millénaires. Voici les incontournables :</p>
<ul>
  <li><strong>Khinkali :</strong> raviolis géants farcis (viande, champignons, fromage ou pommes de terre), à manger avec les mains en retenant le bouillon à l'intérieur</li>
  <li><strong>Khachapuri :</strong> pain au fromage fondu, décliné en plusieurs versions régionales. Le khachapuri adjarien (Adjara est la région de Batumi) est une barque de pain garnie de fromage fondu, d'un œuf et de beurre</li>
  <li><strong>Chakapuli :</strong> ragoût d'agneau et d'herbes aromatiques, plat de printemps traditionnel</li>
  <li><strong>Pkhali :</strong> petites boulettes d'épinards, d'aubergines ou de betteraves aux noix et aux épices</li>
  <li><strong>Lobio :</strong> plat de haricots mijotés aux épices, servi en terrine en terre cuite</li>
  <li><strong>Mtsvadi :</strong> brochettes de viande grillée au bois, version géorgienne du barbecue</li>
</ul>
<h2>Le vin géorgien : une tradition de 8 000 ans</h2>
<p>La Géorgie est considérée comme le berceau du vin. La méthode traditionnelle de vinification en qvevri (jarres en terre cuite enterrées) est inscrite au patrimoine immatériel de l'UNESCO depuis 2013. Les vins géorgiens sont majoritairement naturels, non filtrés, avec des arômes qui surprennent les palais habitués aux vins français ou italiens.</p>
<p>Les vins oranges (blancs vinifiés sur peaux) sont une spécialité géorgienne unique. Le Rkatsiteli (blanc) et le Saperavi (rouge) sont les deux cépages emblématiques du pays. Une bouteille de vin géorgien de qualité dans un restaurant se prend entre 15 et 40 €.</p>
<h2>Les marchés locaux : où faire ses courses</h2>
<p>Le marché central de Batumi (Bazroba) est un incontournable pour les produits frais. Fruits, légumes, herbes aromatiques, fromages locaux (sulguni, imeruli), viandes et épices y sont disponibles à des prix très inférieurs aux supermarchés. Une visite hebdomadaire au marché permet de réduire significativement son budget alimentaire.</p>
<p>Tbilissi dispose de plusieurs marchés emblématiques, dont le marché de Dezerter Bazaar, l'un des plus grands et des plus animés de la capitale.</p>
<h2>Manger à Batumi vs Tbilissi</h2>
<p>Batumi, ville touristique, propose une grande densité de restaurants ouverts à l'année. Les prix y sont légèrement plus élevés qu'à Tbilissi dans les zones touristiques. La cuisine locale y est excellente, avec une spécialité régionale : la cuisine adjarienne, plus riche en produits laitiers.</p>
<p>À Tbilissi, la scène gastronomique est plus diversifiée. Des restaurants géorgiens traditionnels côtoient des établissements de cuisine internationale (italienne, japonaise, indienne, française). La capitale attire des chefs qui réinterprètent la cuisine géorgienne de manière contemporaine.</p>
<h2>Trouver des produits européens et français</h2>
<p>Les supermarchés modernes (Carrefour, Goodwill, Smart) présents à Batumi et Tbilissi proposent des produits européens importés : fromages français, chocolats, pâtes, vins d'importation. Les prix sont plus élevés que pour les produits locaux, mais restent raisonnables. Pour les expatriés qui souhaitent maintenir certaines habitudes alimentaires européennes, c'est tout à fait possible.</p>`,
  [
    ['Le khachapuri adjarien est-il vraiment une spécialité de Batumi ?', 'Oui. L\'Adjara est la région autonome dont Batumi est la capitale. Le khachapuri adjarien (en forme de barque, avec un œuf et du beurre sur le dessus) est une spécialité régionale que vous trouverez partout à Batumi, souvent à des prix très abordables.'],
    ['Le vin géorgien est-il exporté en France ?', 'Oui, de plus en plus. Certains importateurs spécialisés en France proposent des vins naturels géorgiens. Sur place, le choix et les prix sont bien meilleurs. C\'est l\'une des découvertes que beaucoup d\'expatriés francophones mentionnent comme un des plaisirs de la vie en Géorgie.'],
    ['Peut-on manger végétarien ou vegan en Géorgie ?', 'Oui, plus facilement qu\'on ne le pense. La cuisine géorgienne comporte de nombreux plats végétariens traditionnels : pkhali, lobio, ajapsandali (ratatouille géorgienne), mchadi (galettes de maïs). À Tbilissi, des restaurants végétariens dédiés existent. À Batumi, l\'offre est plus limitée mais suffisante.']
  ],
  "J'aimerais en savoir plus sur la vie quotidienne à Batumi, cuisine incluse.",
  [['cout-vie-batumi.html', 'Coût de la vie à Batumi'], ['avantages-vivre-georgie.html', 'Les avantages de vivre en Géorgie'], ['quartiers-batumi.html', 'Les quartiers de Batumi']]
));

console.log('\n✓ Batch 4 complete (articles 16–20) — all 20 articles populated!');
