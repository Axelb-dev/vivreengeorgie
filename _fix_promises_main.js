/**
 * Fix remaining brand identity, absolute promises, and mentions légales.
 * Pages: index.html, mentions-legales.html, a-propos.html, entreprendre-en-georgie.html
 */
const fs = require('fs');
const path = require('path');
const root = __dirname;

function fixFile(relPath, replacements) {
  const fp = path.join(root, relPath);
  let html = fs.readFileSync(fp, 'utf8');
  const orig = html;
  for (const [from, to] of replacements) {
    if (typeof from === 'string') {
      if (!html.includes(from)) {
        console.warn(`  NOT FOUND in ${relPath}: ${from.slice(0, 60)}`);
      } else {
        html = html.split(from).join(to);
      }
    } else {
      // regex
      html = html.replace(from, to);
    }
  }
  if (html !== orig) {
    fs.writeFileSync(fp, html, 'utf8');
    console.log(`Fixed: ${relPath}`);
  } else {
    console.log(`No change: ${relPath}`);
  }
}

// ── index.html ───────────────────────────────────────────────────────────────
fixFile('index.html', [
  // 1. Loader brand
  ['<div class="loader-sub">Batumi · Expat Invest</div>',
   '<div class="loader-sub">Conseil · Accompagnement</div>'],

  // 2. Footer logo sub
  ['<div class="f-logo-sub">BEI Batumi</div>',
   '<div class="f-logo-sub">Conseil · Accompagnement</div>'],

  // 3. HTML default - trust1_title (inline HTML used before JS init)
  ['data-i18n="trust1_title">Présents physiquement toute l\'année</div>',
   'data-i18n="trust1_title">Équipe basée à Batumi et Tbilissi</div>'],

  // 4. HTML default - trust4_title
  ['data-i18n="trust4_title">Tout géré en français</div>',
   'data-i18n="trust4_title">Accompagnement en français</div>'],

  // 5. HTML default - faq1_a: cost comparison → indicative estimate
  ['Le coût de la vie est 3 à 4 fois inférieur à Paris pour un niveau de confort équivalent ou supérieur.',
   'Le coût de la vie est généralement significativement inférieur à Paris — les estimations observées sur le terrain varient selon les postes de dépense et le quartier.'],

  // 6. HTML default - faq4_a: less than 24h → 1-3 business days
  ['Oui, et en <strong>moins de 24 heures</strong>. La Géorgie figure parmi les pays les plus simples au monde pour créer une entreprise. Les étrangers bénéficient des mêmes droits que les Géorgiens. Notre équipe accompagne les démarches en français.',
   'Oui. La Géorgie figure parmi les pays les plus simples au monde pour créer une entreprise. La procédure standard prend généralement <strong>1 à 3 jours ouvrés</strong> selon la complexité du dossier. Les étrangers bénéficient des mêmes droits que les Géorgiens. Notre équipe accompagne les démarches en français.'],

  // 7. HTML default - svc3_text
  ['Société, numéro local, compte bancaire professionnel. Tout géré clé en main, en français.',
   'Société, numéro local, compte bancaire professionnel. Accompagnement complet en français à chaque étape.'],

  // ── i18n FR ──────────────────────────────────────────────────────────────

  // 8. FR svc3_text
  ["svc3_title:'Créer votre entreprise', svc3_text:'Société, numéro local, compte bancaire professionnel. Tout géré clé en main, en français.'",
   "svc3_title:'Créer votre entreprise', svc3_text:'Société, numéro local, compte bancaire professionnel. Accompagnement complet en français à chaque étape.'"],

  // 9. FR trust1_title
  ["trust1_title:'Présents physiquement toute l'année'",
   "trust1_title:'Équipe basée à Batumi et Tbilissi'"],

  // 10. FR trust4_title
  ["trust4_title:'Tout géré en français'",
   "trust4_title:'Accompagnement en français'"],

  // 11. FR faq1_a: 3 à 4 fois (HTML entities)
  ["Le co&#251;t de la vie est 3 &#224; 4 fois inf&#233;rieur &#224; Paris pour un niveau de confort &#233;quivalent ou sup&#233;rieur.",
   "Le co&#251;t de la vie est g&#233;n&#233;ralement significativement inf&#233;rieur &#224; Paris — les estimations observ&#233;es sur le terrain varient selon les postes de d&#233;pense et le quartier."],

  // 12. FR faq4_a: moins de 24 heures (HTML entities)
  ["faq4_a:'Oui, et en <strong>moins de 24 heures</strong>. La G&#233;orgie figure parmi les pays les plus simples au monde pour cr&#233;er une entreprise. Les &#233;trangers b&#233;n&#233;ficient des m&#234;mes droits que les G&#233;orgiens. Notre &#233;quipe accompagne les d&#233;marches en fran&#231;ais.'",
   "faq4_a:'Oui. La G&#233;orgie figure parmi les pays les plus simples au monde pour cr&#233;er une entreprise. La proc&#233;dure standard prend g&#233;n&#233;ralement <strong>1 &#224; 3 jours ouvr&#233;s</strong> selon la complexit&#233; du dossier. Les &#233;trangers b&#233;n&#233;ficient des m&#234;mes droits que les G&#233;orgiens. Notre &#233;quipe accompagne les d&#233;marches en fran&#231;ais.'"],

  // 13. FR why1
  ["why1:'Experts locaux · Terrain toute l\\'année'",
   "why1:'Experts locaux · Équipe sur place'"],

  // ── i18n EN ──────────────────────────────────────────────────────────────

  // 14. EN trust_p: permanent physical presence
  ["We don\\'t sell Georgia dreams. We support real projects with a clear method, honest figures and permanent physical presence.",
   "We don\\'t sell Georgia dreams. We support real projects with a clear method, honest figures and a year-round local presence."],

  // 15. EN trust4_title: Fully managed in English
  ["trust4_title:'Fully managed in English'",
   "trust4_title:'Support in English'"],

  // 16. EN team_cta_text: permanent local presence
  ["network, know-how and permanent local presence. In French, Georgian and Spanish.",
   "network, know-how and established local presence. In French, Georgian and Spanish."],

  // 17. EN faq4_a: less than 24 hours
  ["faq4_a:'Yes, and in <strong>less than 24 hours</strong>.",
   "faq4_a:'Yes. The standard procedure generally takes <strong>1 to 3 business days</strong>."],

  // ── i18n ES ──────────────────────────────────────────────────────────────

  // 18. ES faq1_a: 3 a 4 veces
  ["El coste de vida es 3 a 4 veces inferior a Par&#237;s para un nivel de confort equivalente o superior.",
   "El coste de vida es generalmente significativamente inferior a Par&#237;s — las estimaciones observadas sobre el terreno var&#237;an seg&#250;n los rubros y el barrio."],

  // 19. ES faq4_a: menos de 24 horas + clé en main
  ["S&#237;, y en <strong>menos de 24 horas</strong>. Los extranjeros tienen exactamente los mismos derechos que los georgianos para crear una empresa. Nuestro equipo gestiona todos los tr&#225;mites llave en mano, en espa&#241;ol, sin que tengas que desplazarte.",
   "S&#237;. Los extranjeros tienen exactamente los mismos derechos que los georgianos para crear una empresa. El tr&#225;mite est&#225;ndar tarda generalmente <strong>1 a 3 d&#237;as h&#225;biles</strong>. Nuestro equipo acompa&#241;a todas las gestiones en espa&#241;ol."],

  // 20. ES trust4_title
  ["trust4_title:'Todo gestionado en español'",
   "trust4_title:'Acompañamiento en español'"],

  // 21. ES why1
  ["why1:'Expertos locales · Sobre el terreno todo el año'",
   "why1:'Expertos locales · Equipo local disponible'"],

  // 22. JSON-LD faq: "en moins de 24 heures" in @graph
  ['"text": "Oui, et en moins de 24 heures. La Géorgie figure parmi les pays les plus simples au monde pour créer une entreprise. Les étrangers bénéficient des mêmes droits que les Géorgiens."',
   '"text": "Oui. La procédure standard pour créer une LLC en Géorgie prend généralement 1 à 3 jours ouvrés. Les étrangers bénéficient des mêmes droits que les Géorgiens pour la création de société."'],
]);

// ── mentions-legales.html ─────────────────────────────────────────────────────
fixFile('mentions-legales.html', [
  // Change "à titre personnel" to commercial framing
  ['Ce site est édité à titre personnel par :<br><br>\n      <strong>Nom :</strong> <span class="placeholder">Axel BRIARD</span><br>\n      <strong>Email :</strong> <a href="mailto:info@vivreengeorgie.com">info@vivreengeorgie.com</a><br>\n      <strong>Téléphone :</strong> +33 6 81 10 81 47<br>\n      <strong>Directeur de la publication :</strong> <span class="placeholder">Axel BRIARD</span>',
   'Ce site est édité par :<br><br>\n      <strong>Nom :</strong> Axel BRIARD<br>\n      <strong>Activité :</strong> Conseil et accompagnement en Géorgie (activité commerciale)<br>\n      <strong>Email :</strong> <a href="mailto:info@vivreengeorgie.com">info@vivreengeorgie.com</a><br>\n      <strong>Téléphone :</strong> +33 6 81 10 81 47<br>\n      <strong>Directeur de la publication :</strong> Axel BRIARD<br><br>\n      <em style="color:rgba(255,255,255,.5);font-size:12px;">ℹ️ Informations complémentaires en cours de mise à jour : numéro SIRET ou équivalent géorgien, forme juridique exacte de l\'entité exploitante. Ces informations seront ajoutées dès leur disponibilité.</em>'],
]);

// ── a-propos.html ─────────────────────────────────────────────────────────────
fixFile('a-propos.html', [
  // "présence permanente" → "présence régulière et directe"
  ['Notre équipe est présente à Batumi depuis 2020. Cette présence permanente nous permet',
   'Notre équipe est présente à Batumi et Tbilissi depuis 2020. Cette présence directe nous permet'],

  // title still has BEI?
  ['À propos – Vivre en Géorgie | BEI Batumi Expat Invest',
   'À propos – Vivre en Géorgie | Cabinet francophone de conseil en Géorgie'],
]);

// ── entreprendre-en-georgie.html ──────────────────────────────────────────────
fixFile('entreprendre-en-georgie.html', [
  // OG/meta desc
  ['Créer une société en Géorgie en moins de 24h. Guide complet : procédure, statut Petite Entreprise, compte bancaire professionnel.',
   'Créer une société en Géorgie rapidement et simplement. Guide complet : procédure LLC, statut Petite Entreprise, compte bancaire professionnel.'],

  // twitter desc
  ['content="Créer une société en Géorgie en moins de 24h. Guide complet : procédure, statut Petite Entreprise, compte bancaire professionnel."',
   'content="Créer une société en Géorgie rapidement et simplement. Guide complet : procédure LLC, statut Petite Entreprise, compte bancaire professionnel."'],

  // Body text: "en moins de 24 heures via la House of Justice"
  ['peut être créée en moins de 24 heures via la House of Justice.',
   'peut être créée en 1 à 3 jours ouvrés via la House of Justice (procédure express disponible sous conditions).'],

  // Body text: "sous 24h pour la procédure standard"
  ['<li><strong>Recevoir le certificat d\'enregistrement</strong> — sous 24h pour la procédure standard</li>',
   '<li><strong>Recevoir le certificat d\'enregistrement</strong> — généralement sous 1 à 3 jours ouvrés selon la procédure choisie</li>'],
]);

// ── Blog: fix specific JSON-LD promises ──────────────────────────────────────
const blogDir = path.join(root, 'blog');

fixFile('blog/avantages-vivre-georgie.html', [
  ['"text": "Créer une LLC en Géorgie prend moins de 24 heures pour un coût d\'environ 100€. La procédure se fait en ligne ou via une Public Service Hall, sans avocat obligatoire ni capital minimum imposé."',
   '"text": "Créer une LLC en Géorgie prend généralement 1 à 3 jours ouvrés. Les frais officiels d\'enregistrement sont de l\'ordre de 100 à 200 GEL. La procédure se fait via la House of Justice (Public Service Hall), sans capital minimum imposé."'],
]);

fixFile('blog/erreurs-expatriation.html', [
  ['"text": "Le plus tôt possible, idéalement dès les premiers jours. Chaque mois de retard représente une opportunité fiscale perdue. La création d\'une LLC géorgienne prend moins de 24 heures et coûte moins de 100€. Ne tardez pas à cette démarche, surtout si vous continuez à facturer via une structure française."',
   '"text": "Le plus tôt possible si la structure géorgienne est adaptée à votre situation. La création d\'une LLC géorgienne prend généralement 1 à 3 jours ouvrés. Attention : la seule création de société ne suffit pas à optimiser une situation fiscale — consultez un professionnel avant d\'agir."'],
]);

fixFile('blog/georgie-attire-europeens.html', [
  ['"text": "La Géorgie attire les nomades digitaux européens grâce à sa fiscalité avantageuse (statut Small Business à 1%), son coût de la vie 3 à 5 fois inférieur à l\'Europe, sa fibre optique rapide et bon marché, ses espaces de coworking modernes, et la possibilité de séjourner 365 jours sans visa pour les Européens."',
   '"text": "La Géorgie attire les nomades digitaux européens grâce à un cadre fiscal simplifié (statut Small Business, sous conditions d\'éligibilité), un coût de la vie significativement inférieur à l\'Europe occidentale (estimation indicative selon les postes), une fibre optique performante, et la possibilité de séjourner sans visa selon les règles en vigueur."'],
]);

fixFile('blog/creer-societe-georgie-24h.html', [
  // JSON-LD FAQ about timeline
  ['"text": "La création d\'une LLC en Géorgie peut être effectuée en moins de 24 heures via la House of Justice. Une procédure express en 4 heures est également disponible. Une procédure express en 4 heures est également disponible moyennant un léger surcoût (200 GEL vs 100 GEL)."',
   '"text": "La création d\'une LLC en Géorgie prend généralement 1 à 3 jours ouvrés via la House of Justice. Une procédure accélérée est disponible moyennant un surcoût (200 GEL vs 100 GEL pour la procédure standard)."'],
]);

console.log('\n✓ All main page promise/brand fixes applied.');
