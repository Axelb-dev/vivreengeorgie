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
  return `<div class="related"><h3>Articles liés</h3><div class="related-grid">${items.map(([s,t]) => `<a href="${s}" class="related-card"><span class="title">${t}</span></a>`).join('')}</div></div>`;
}
function faq(items) {
  return `<div class="art-faq"><p class="art-sec-eyebrow">FAQ</p><p class="art-sec-h2">Questions fréquentes</p><div class="faq-list">${items.map(([q,a]) => `<div class="faq-item"><button class="faq-q" onclick="toggleFaq(this)" aria-expanded="false">${q}<svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg></button><div class="faq-a"><p>${a}</p></div></div>`).join('')}</div></div>`;
}
function footer() {
  return `<footer>© 2026 Vivre en Géorgie · <a href="../index.html">Accueil</a> · <a href="../blog.html">Blog</a> · <a href="../mentions-legales.html">Mentions légales</a></footer>`;
}
function build(label, h1, date, readtime, lead, body, faqItems, ctaMsg, relatedItems) {
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

// ── Article 11 ────────────────────────────────────────────────────────────────
insert('georgie-attire-europeens.html', build(
  'TENDANCE', 'Pourquoi la Géorgie attire de plus en plus d\'Européens',
  '1 juillet 2026', '7 min de lecture',
  'La Géorgie s\'est imposée dans la cartographie des destinations d\'expatriation pour les Européens. Plusieurs facteurs structurels expliquent cet attrait croissant — et certaines limites méritent d\'être nommées.',
  `<h2>Le visa-free : la porte d'entrée</h2>
<p>La première raison de l'attractivité géorgienne pour les Européens est légale : la possibilité de séjourner jusqu'à 365 jours sans visa, sur simple présentation d'un passeport valide. Cette liberté de circulation est exceptionnelle à l'échelle mondiale. Très peu de pays offrent à des ressortissants européens un accès aussi souple à leur territoire.</p>
<p>Cette règle a été le catalyseur initial qui a amené de nombreux nomades digitaux et entrepreneurs à explorer la Géorgie à partir de 2020–2021. Elle reste l'argument le plus direct pour justifier un premier séjour d'exploration.</p>
<h2>Un environnement économique libéral</h2>
<p>La Géorgie figure régulièrement dans les classements internationaux sur la liberté économique (Heritage Foundation, World Bank Doing Business). La création d'entreprise est rapide et peu coûteuse, les formalités administratives sont réduites par rapport aux standards européens, et le système fiscal est simplifié.</p>
<p>Pour les entrepreneurs qui viennent d'environnements réglementaires complexes comme la France, la Belgique ou la Suisse, ce contraste est saisissant. Cela ne signifie pas que tout est simple ou sans risque — mais la charge administrative de démarrage est objectivement allégée.</p>
<h2>La culture géorgienne : hospitalité et gastronomie</h2>
<p>La Géorgie est réputée pour son hospitalité traditionnelle (le concept de "Maspindzloba" — l'art d'accueillir ses hôtes). Les Géorgiens ont une relation au voyageur et au résident étranger qui facilite l'intégration initiale. La barrière culturelle existe, mais elle est atténuée par cet accueil naturel.</p>
<p>La gastronomie géorgienne — khinkali, khachapuri, cuisine au barbecue, vins naturels — est un facteur d'attachement réel pour beaucoup d'expatriés. Les marchés locaux, la fraîcheur des produits et la diversité culinaire créent un cadre de vie agréable au quotidien.</p>
<h2>Les communautés francophones en Géorgie</h2>
<p>En 2026, des communautés francophones structurées existent à Batumi et Tbilissi. Des groupes Facebook, des événements mensuels, des prestataires dédiés et des groupes WhatsApp permettent aux nouveaux arrivants de ne pas être isolés. Vivre en Géorgie est partie prenante de cet écosystème francophone.</p>
<p>Cette présence communautaire est à la fois un avantage (réseau, informations, entraide) et un phénomène à aborder avec recul : certaines informations qui circulent dans ces groupes ne sont pas fiables ou sont obsolètes. La vérification auprès de sources directes reste essentielle.</p>
<h2>Les limites de cet attrait</h2>
<p>La Géorgie présente aussi des défis réels que l'enthousiasme médiatique tend à minimiser. La barrière de la langue (l'alphabet géorgien est unique, le géorgien est complexe), l'instabilité politique régionale, les infrastructures encore inégales hors des grandes villes, et un système de santé qui reste limité pour les soins spécialisés sont des réalités à intégrer dans toute analyse sérieuse.</p>
<p>L'attrait est réel. La Géorgie mérite l'intérêt qu'elle suscite. Mais s'y installer demande une préparation honnête, pas une décision sur un coup de tête après un voyage de deux semaines.</p>`,
  [
    ['Combien d\'Européens vivent en Géorgie ?', 'Les données officielles précises sont difficiles à établir, la Géorgie ne publiant pas de statistiques détaillées sur les résidents étrangers par nationalité. On estime que plusieurs dizaines de milliers d\'Européens de l\'Ouest y résident ou y séjournent longtemps, concentrés principalement à Tbilissi et Batumi.'],
    ['Pourquoi la Géorgie attire-t-elle plus que d\'autres pays du Caucase ?', 'La Géorgie combine un cadre légal favorable aux étrangers, un visa-free généreux, une culture d\'accueil forte, une géographie accessible depuis l\'Europe et un coût de la vie attractif. Les pays voisins (Azerbaïdjan, Arménie) n\'offrent pas la même combinaison d\'accessibilité et de liberté économique.'],
    ['La Géorgie est-elle un bon pays pour les familles européennes ?', 'Oui, sous conditions. Des écoles internationales existent à Tbilissi et partiellement à Batumi. Le cadre de vie est sûr et agréable. Le coût de la scolarité est inférieur aux standards internationaux. La qualité des soins pédiatriques est variable — une assurance santé internationale est recommandée.']
  ],
  "J'aimerais en savoir plus sur la vie d'un Européen en Géorgie.",
  [['pourquoi-batumi-2026.html', 'Pourquoi tout le monde parle de Batumi'], ['avantages-vivre-georgie.html', 'Les avantages de vivre en Géorgie'], ['defauts-georgie.html', 'Les défauts de la Géorgie']]
));

// ── Article 12 ────────────────────────────────────────────────────────────────
insert('securite-georgie.html', build(
  'VIE PRATIQUE', 'Sécurité en Géorgie : ce que les données et le terrain indiquent',
  '2 juillet 2026', '6 min de lecture',
  'La Géorgie est perçue comme un pays sûr par la grande majorité des expatriés qui y vivent. Voici une analyse basée sur les données disponibles et l\'expérience de terrain — sans exagération dans un sens ni dans l\'autre.',
  `<h2>Les données nationales disponibles</h2>
<p>Selon les statistiques publiées par le Bureau national des statistiques de Géorgie, le taux de criminalité enregistré est significativement inférieur à celui de la plupart des pays d'Europe occidentale. Les crimes violents restent rares dans les zones fréquentées par les expatriés. La Géorgie figure parmi les pays classés comme sûrs par plusieurs agences de sécurité internationales.</p>
<p>La Géorgie est classée pays sûr par le Global Peace Index (indice de paix mondiale), qui évalue les États-nations dans leur ensemble. Cet indice ne distingue pas les villes ni les régions à l'intérieur d'un même pays — il est une indication nationale, pas locale.</p>
<h2>La sécurité à Batumi en pratique</h2>
<p>Batumi est une ville touristique animée, avec une forte présence de touristes et d'expatriés. Les zones du Boulevard, du centre-ville et des quartiers résidentiels sont considérées sûres par les habitants et les résidents étrangers. Les agressions physiques envers des touristes ou expatriés sont rares et non caractéristiques.</p>
<p>Les précautions habituelles s'appliquent comme dans toute ville : éviter les rues peu éclairées la nuit, ne pas afficher ostensiblement des objets de valeur, être vigilant dans les endroits très fréquentés (gares, marchés touristiques). Le vol à la tire existe mais n'est pas un phénomène dominant.</p>
<h2>La sécurité à Tbilissi</h2>
<p>Tbilissi, capitale de plus d'un million d'habitants, présente un profil de sécurité comparable aux capitales européennes moyennes. Les quartiers centraux (Vake, Saburtalo, Vieux Tbilissi) sont fréquentés sans problème particulier. Les quartiers périphériques éloignés méritent davantage de vigilance la nuit, comme dans toute grande ville.</p>
<h2>Précautions recommandées</h2>
<ul>
  <li>Souscrire une assurance santé internationale couvrant les urgences et les rapatriements</li>
  <li>Enregistrer son séjour auprès de l'ambassade de France en Géorgie pour les séjours longs</li>
  <li>Conserver des copies de ses documents d'identité séparément des originaux</li>
  <li>Utiliser des applications de taxi reconnues (Bolt, Yandex Go) plutôt que des taxis informels</li>
  <li>Ne pas traverser les zones proches de l'Abkhazie ou de l'Ossétie du Sud, régions dont le statut est contesté</li>
</ul>
<h2>Ce que disent les résidents étrangers</h2>
<p>L'impression générale des expatriés francophones vivant à Batumi et Tbilissi est celle d'un pays où l'on se sent libre et en sécurité dans la vie quotidienne. Beaucoup mentionnent pouvoir rentrer à pied tard le soir sans inquiétude, ce qu'ils ne feraient pas dans leurs villes d'origine.</p>
<p>Ce ressenti subjectif est cohérent avec les données objectives disponibles. Il ne dispense pas d'une vigilance normale, mais reflète une réalité de terrain positive pour les résidents étrangers.</p>`,
  [
    ['La Géorgie est-elle un pays sûr pour les étrangers ?', 'Oui, la Géorgie est généralement considérée comme un pays sûr. Les données sur la criminalité sont inférieures à celles de la plupart des pays d\'Europe occidentale. Les expatriés qui y vivent rapportent un sentiment de sécurité supérieur à celui ressenti dans leur pays d\'origine.'],
    ['Y a-t-il des zones à éviter en Géorgie ?', 'Les zones proches de l\'Abkhazie et de l\'Ossétie du Sud sont à éviter absolument — ces territoires sont des zones de conflit gelé dont le statut est contesté. En dehors de ces régions spécifiques, la Géorgie est accessible normalement.'],
    ['La sécurité est-elle différente entre Batumi et Tbilissi ?', 'Les deux villes sont sûres dans leur ensemble. Tbilissi, plus grande, a un profil similaire à une capitale européenne moyenne. Batumi, plus petite et touristique, est perçue comme très sûre par les résidents étrangers dans les zones centrales et résidentielles.']
  ],
  "J'aimerais en savoir plus sur la sécurité en Géorgie pour mon installation.",
  [['avantages-vivre-georgie.html', 'Les avantages de vivre en Géorgie'], ['defauts-georgie.html', 'Les défauts de la Géorgie'], ['erreurs-expatriation.html', 'Les erreurs fréquentes à l\'expatriation']]
));

// ── Article 13 ────────────────────────────────────────────────────────────────
insert('compte-bancaire-georgie.html', build(
  'VIE PRATIQUE', 'Ouvrir un compte bancaire en Géorgie : ce que vous devez savoir',
  '3 juillet 2026', '8 min de lecture',
  'L\'ouverture d\'un compte bancaire en Géorgie est une étape clé pour les entrepreneurs et expatriés. Le processus est accessible mais comporte des conditions à bien connaître avant de planifier votre installation.',
  `<h2>Les principales banques géorgiennes</h2>
<p>Le secteur bancaire géorgien est dominé par deux grandes banques : TBC Bank et Bank of Georgia, toutes deux cotées en bourse à Londres. Ces établissements offrent des services modernes : applications mobiles, cartes Visa/Mastercard internationales, virements SWIFT, services en anglais. Des banques de taille plus modeste existent également (Liberty Bank, Basis Bank, ProCredit Bank).</p>
<p>Les deux grandes banques ont des interfaces digitales performantes et des services en anglais accessibles. Pour les francophones, l'ensemble des opérations courantes peut se gérer sans maîtriser le géorgien.</p>
<h2>Documents généralement requis</h2>
<p>Pour un non-résident souhaitant ouvrir un compte personnel, les documents généralement demandés comprennent : passeport valide (original), justificatif d'adresse en Géorgie (bail, facture), et dans certains cas, une déclaration sur l'origine des fonds ou la source des revenus. Les exigences varient selon les banques et peuvent évoluer.</p>
<p>Pour un compte professionnel (société géorgienne), les documents de la société (statuts, certificat d'enregistrement, carte d'identité fiscale) sont requis en plus des pièces personnelles du dirigeant.</p>
<h2>Le processus en pratique</h2>
<p>L'ouverture d'un compte nécessite généralement un rendez-vous en agence. La présence physique en Géorgie est habituellement requise pour les comptes personnels et professionnels. Le délai d'ouverture, une fois le dossier complet et validé, est généralement de 1 à 5 jours ouvrés.</p>
<p>Certaines banques peuvent refuser des demandes d'ouverture ou demander des informations complémentaires sur l'activité et les flux attendus, en particulier pour les comptes professionnels avec une activité internationale. Ce n'est pas systématique mais cela arrive.</p>
<h2>Compte personnel vs compte professionnel</h2>
<p>Un compte personnel en Géorgie est utile pour les dépenses courantes, les retraits d'espèces et les paiements locaux. Un compte professionnel lié à une LLC géorgienne est nécessaire pour recevoir des paiements clients, facturer en devise et gérer la comptabilité de la société.</p>
<p>Les deux types de comptes peuvent être ouverts dans la même banque. Il est courant de disposer des deux en parallèle.</p>
<h2>Les points d'attention à connaître</h2>
<ul>
  <li><strong>Conformité anti-blanchiment (KYC) :</strong> les banques géorgiennes appliquent des politiques KYC (Know Your Customer) strictes, en ligne avec les standards internationaux. Soyez prêt à justifier vos flux financiers.</li>
  <li><strong>Limites sur les virements internationaux :</strong> des plafonds ou des procédures de vérification peuvent s'appliquer pour les virements hors Géorgie au-delà de certains montants.</li>
  <li><strong>Frais bancaires :</strong> les frais géorgiens sont généralement modestes mais existent — vérifiez les tarifs au moment de l'ouverture.</li>
</ul>`,
  [
    ['Peut-on ouvrir un compte bancaire géorgien en étant non-résident ?', 'Oui, c\'est possible dans certaines banques géorgiennes. Les conditions varient selon les établissements. La présence physique en Géorgie est généralement requise. Un accompagnement local facilite la procédure et améliore les chances d\'aboutissement.'],
    ['Combien de temps faut-il pour ouvrir un compte bancaire en Géorgie ?', 'Une fois le dossier complet et validé, l\'ouverture prend généralement 1 à 5 jours ouvrés. La préparation du dossier (rassemblement des documents, traductions si nécessaire) peut prendre quelques jours supplémentaires.'],
    ['Peut-on utiliser son compte géorgien pour des virements internationaux ?', 'Oui, les grandes banques géorgiennes proposent des virements SWIFT vers des comptes étrangers. Des procédures de vérification des flux peuvent s\'appliquer au-delà de certains montants. Les cartes Visa et Mastercard délivrées par les banques géorgiennes fonctionnent à l\'international.'],
    ['Faut-il avoir une société pour ouvrir un compte professionnel ?', 'Oui, un compte professionnel est lié à une entité juridique (LLC ou autre). Il ne peut pas être ouvert sans une société préalablement enregistrée en Géorgie.']
  ],
  "J'aimerais en savoir plus sur l'ouverture d'un compte bancaire en Géorgie.",
  [['creer-societe-georgie-24h.html', 'Créer une société en Géorgie'], ['erreurs-expatriation.html', 'Les erreurs fréquentes à l\'expatriation'], ['entreprendre-en-georgie.html', 'Entreprendre en Géorgie']]
));

// ── Article 14 ────────────────────────────────────────────────────────────────
insert('erreurs-expatriation.html', build(
  'CONSEIL', 'Les 7 erreurs les plus fréquentes lors d\'une expatriation en Géorgie',
  '4 juillet 2026', '8 min de lecture',
  'S\'installer en Géorgie sans préparation expose à des désillusions évitables. Voici les erreurs que nous observons régulièrement chez les nouveaux arrivants — et comment les anticiper.',
  `<h2>Erreur 1 : confondre visa-free et résidence légale</h2>
<p>Le droit de séjourner 365 jours sans visa ne donne pas le statut de résident légal. Si vous souhaitez louer un appartement à long terme avec un contrat, ouvrir un compte bancaire, ou exercer une activité commerciale déclarée, un statut de résidence ou une structure juridique locale est nécessaire. Beaucoup d'arrivants découvrent cette distinction trop tard.</p>
<h2>Erreur 2 : créer une société sans comprendre les implications fiscales dans le pays d'origine</h2>
<p>Créer une LLC en Géorgie est simple et rapide. Ce qui est complexe, c'est de gérer les conséquences fiscales de cette société dans votre pays de résidence fiscale habituel. En France, les règles sur la déclaration des sociétés étrangères contrôlées, les prix de transfert et la résidence fiscale s'appliquent — elles ne disparaissent pas parce que vous avez une société à Tbilissi. Consultez un fiscaliste compétent en droit international avant de créer votre structure.</p>
<h2>Erreur 3 : ne pas prévoir de budget de transition</h2>
<p>Les premiers mois d'installation sont toujours plus coûteux que prévu : caution de logement, frais d'installation (meubles, ustensiles, SIM), frais de création de société, honoraires comptables, assurance santé. Un budget de transition de 3 000 à 6 000 € en plus du budget de vie mensuel est une prévision prudente.</p>
<h2>Erreur 4 : ignorer la barrière de la langue</h2>
<p>Le géorgien utilise un alphabet unique (მხედრული), et la langue elle-même n'a aucun lien avec les langues européennes. Même si l'anglais est assez répandu chez les jeunes diplômés, beaucoup de situations pratiques (administrations locales, propriétaires, artisans, médecins) nécessitent un interprète ou un contact géorgien de confiance. Prévoir cela dès le départ évite beaucoup de frustrations.</p>
<h2>Erreur 5 : sous-estimer le marché locatif en haute saison</h2>
<p>Batumi est une ville touristique. En été (juin–septembre), les loyers des appartements disponibles sur Airbnb ou les plateformes touristiques atteignent 3 à 5 fois leur niveau annuel. Si vous arrivez en juillet sans logement réservé longtemps à l'avance, vous risquez de payer très cher ou de ne rien trouver dans le quartier souhaité. Prévoyez votre logement annuel avant d'arriver, idéalement depuis la France.</p>
<h2>Erreur 6 : croire que tout est facile parce que le pays est réputé simple</h2>
<p>La Géorgie est effectivement plus simple que la France sur de nombreux aspects administratifs. Mais "plus simple" ne signifie pas "sans friction". Des délais, des documents manquants, des changements de procédures non publiés officiellement, des banques qui demandent des justificatifs supplémentaires — tout cela existe. La patience et la flexibilité sont indispensables.</p>
<h2>Erreur 7 : ne pas se faire accompagner</h2>
<p>La plupart des erreurs ci-dessus peuvent être évitées avec un accompagnement sérieux. Vivre en Géorgie est précisément là pour ça : vous orienter vers les bons interlocuteurs, vous éviter les prestataires peu fiables, anticiper les obstacles administratifs et vous faire gagner du temps et de l'argent sur l'ensemble du processus d'installation.</p>`,
  [
    ['Quelles sont les démarches obligatoires à l\'arrivée en Géorgie ?', 'Il n\'existe pas de démarche d\'enregistrement obligatoire pour un séjour de moins de 365 jours avec un passeport européen. En revanche, si vous souhaitez créer une société, ouvrir un compte bancaire ou obtenir un permis de résidence, des procédures spécifiques s\'appliquent.'],
    ['Faut-il un interprète pour s\'installer en Géorgie ?', 'Pas systématiquement, mais pour de nombreuses démarches pratiques (administration, médecin, propriétaire local), un contact géorgien de confiance ou un accompagnateur bilingue est précieux. Notre équipe, dont notre associé géorgien Victor, assure cette interface.'],
    ['Peut-on revenir sur une erreur d\'installation en Géorgie ?', 'La plupart des erreurs sont réversibles — une société mal structurée peut être modifiée, un mauvais logement peut être quitté avec préavis. La seule erreur difficile à corriger est une erreur fiscale dans le pays d\'origine : les déclarations manquantes ou erronées peuvent avoir des conséquences durables.']
  ],
  "J'aimerais éviter les erreurs classiques dans mon installation en Géorgie.",
  [['installation-batumi-budget.html', 'Budget d\'installation à Batumi'], ['compte-bancaire-georgie.html', 'Ouvrir un compte bancaire'], ['s-installer-en-georgie.html', 'S\'installer en Géorgie']]
));

// ── Article 15 ────────────────────────────────────────────────────────────────
insert('installation-batumi-budget.html', build(
  'BUDGET', 'S\'installer à Batumi : budget premier mois et checklist pratique',
  '5 juillet 2026', '7 min de lecture',
  'Le premier mois à Batumi est souvent le plus coûteux. Voici les postes de dépenses à anticiper et les étapes à effectuer dans les premières semaines pour bien démarrer votre installation.',
  `<h2>Le budget d'installation estimé</h2>
<p>Voici une estimation des dépenses spécifiques au premier mois, en plus du budget de vie courant :</p>
<ul>
  <li><strong>Caution de logement (1–2 mois) :</strong> 400–1 400 €</li>
  <li><strong>Équipement de base si logement vide :</strong> 200–600 € (literie, ustensiles, petits meubles)</li>
  <li><strong>SIM locale et connexion initiale :</strong> 20–40 €</li>
  <li><strong>Assurance santé internationale (1er mois) :</strong> 60–120 €</li>
  <li><strong>Frais de déplacement initial (taxi aéroport, premières courses) :</strong> 50–100 €</li>
  <li><strong>Frais de création de société (si applicable) :</strong> 150–400 €</li>
</ul>
<p>Au total, prévoir un budget d'installation de <strong>1 000 à 3 000 €</strong> en dehors du loyer du premier mois, selon votre situation et vos besoins.</p>
<h2>Les premières démarches à effectuer</h2>
<ol>
  <li><strong>Trouver et sécuriser votre logement</strong> — idéalement avant d'arriver, ou dans un hébergement temporaire les premiers jours</li>
  <li><strong>Obtenir une SIM locale</strong> (Magti, Geocell/Silknet ou Beeline) — disponible à l'aéroport ou dans les centres commerciaux</li>
  <li><strong>Ouvrir un compte bancaire géorgien</strong> — dès que vous avez une adresse locale</li>
  <li><strong>Souscrire une assurance santé</strong> — avant toute autre démarche si vous n'en avez pas encore</li>
  <li><strong>Créer votre structure juridique</strong> si vous avez un projet professionnel</li>
</ol>
<h2>Trouver un logement à Batumi</h2>
<p>Les plateformes les plus utilisées pour trouver un logement à Batumi sont : SS.ge (le plus utilisé par les locaux), Myhome.ge, et les groupes Facebook d'expatriés francophones. Les agences immobilières locales peuvent aussi vous accompagner, moyennant un honoraire (généralement l'équivalent d'un mois de loyer).</p>
<p>Évitez de signer un bail annuel à distance, sans avoir vu le logement en personne ou sans l'aide d'un interlocuteur de confiance sur place. Les photos ne reflètent pas toujours l'état réel de l'appartement.</p>
<h2>La SIM card et l'internet</h2>
<p>Toutes les grandes enseignes téléphoniques (Magti, Silknet) proposent des forfaits avec data illimitée à partir de 10 € par mois. L'esim n'est pas encore généralisée en Géorgie — préférez l'achat d'une SIM physique à l'arrivée. La couverture 4G est bonne en centre-ville de Batumi.</p>
<h2>Ce que Vivre en Géorgie prend en charge</h2>
<p>Notre accompagnement à l'installation couvre : la recherche et validation du logement, les démarches administratives pour la création de société, l'accompagnement à l'ouverture de compte, l'orientation vers les prestataires locaux (comptable, avocat, médecin, école). Nous sommes présents physiquement à Batumi et Tbilissi pour ces missions.</p>`,
  [
    ['Combien coûte le premier mois à Batumi en tout ?', 'En tout (loyer + caution + installation + budget de vie), le premier mois revient généralement à 1 500–4 000 € selon votre profil, le type de logement et si vous créez une société. Prévoir 2 500 € est une estimation prudente pour un profil solo sans frais de société.'],
    ['Peut-on trouver un logement à Batumi à distance avant d\'arriver ?', 'Oui, via les plateformes SS.ge et Myhome.ge ou par l\'intermédiaire d\'un accompagnateur sur place. Pour un contrat annuel, la visite physique ou une visite vidéo en direct avec quelqu\'un de confiance sur place est fortement recommandée avant de signer.'],
    ['Doit-on parler géorgien pour s\'installer à Batumi ?', 'Non, l\'anglais suffit pour la plupart des démarches pratiques dans les zones fréquentées par les expatriés. Pour certaines situations spécifiques (propriétaire qui ne parle pas anglais, administrations locales), l\'appui d\'un contact géorgien facilite les choses.']
  ],
  "Je prépare mon installation à Batumi. J'aimerais discuter des étapes concrètes.",
  [['cout-vie-batumi.html', 'Coût de la vie à Batumi'], ['erreurs-expatriation.html', 'Les erreurs à éviter'], ['s-installer-en-georgie.html', 'S\'installer en Géorgie']]
));

console.log('\n✓ Batch 3 complete (articles 11–15)');
