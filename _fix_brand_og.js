/**
 * Fix: brand identity + OG tags + strong promises + WA messages
 */
const fs = require('fs');
const path = require('path');

const base = 'c:/Users/Axel/Desktop/vivreengeorgie-main';

function getAllHtmlFiles() {
  const files = [];
  ['.', 'blog', 'equipe'].forEach(dir => {
    const d = path.join(base, dir);
    if (!fs.existsSync(d)) return;
    fs.readdirSync(d).filter(f => f.endsWith('.html')).forEach(f => files.push(path.join(d, f)));
  });
  return files;
}

// ── PHASE 1: Brand identity across ALL files ────────────────────────────────

const brandReplacements = [
  // Logo sub spans
  [/(<span class="logo-sub">)Batumi · Expat Invest(<\/span>)/g, '$1Conseil · Accompagnement$2'],
  [/(<span class="logo-sub">)BEI Batumi(<\/span>)/g, '$1Conseil · Accompagnement$2'],
  // Alt attributes
  [/alt="BEI Batumi Expat Invest"/g, 'alt="Logo Vivre en Géorgie"'],
  [/alt="BEI Batumi"/g, 'alt="Vivre en Géorgie"'],
  // Footer copyright in HTML
  [/Vivre en Géorgie — BEI Batumi Expat Invest\. Tous droits réservés\./g, 'Vivre en Géorgie. Tous droits réservés.'],
  [/Vivre en Géorgie — BEI Batumi Expat Invest\. All rights reserved\./g, 'Vivre en Géorgie. All rights reserved.'],
  [/Vivre en Géorgie — BEI Batumi Expat Invest\. Todos los derechos reservados\./g, 'Vivre en Géorgie. Todos los derechos reservados.'],
  [/Vivre en Géorgie — BEI Batumi Expat Invest\. ყველა უფლება დაცულია\./g, 'Vivre en Géorgie. ყველა უფლება დაცულია.'],
  // i18n JS strings in index.html footer_bottom keys
  [/footer_bottom:'© 2026 Vivre en Géorgie — BEI Batumi Expat Invest\. Tous droits réservés\.'/g,
   "footer_bottom:'© 2026 Vivre en Géorgie. Tous droits réservés.'"],
  [/footer_bottom:'© 2026 Vivre en G&#233;orgie — BEI Batumi Expat Invest\. Tous droits réservés\.'/g,
   "footer_bottom:'© 2026 Vivre en Géorgie. Tous droits réservés.'"],
  [/footer_bottom:'© 2026 Vivre en Géorgie — BEI Batumi Expat Invest\. All rights reserved\.'/g,
   "footer_bottom:'© 2026 Vivre en Géorgie. All rights reserved.'"],
  [/footer_bottom:'© 2026 Vivre en Géorgie — BEI Batumi Expat Invest\. Todos los derechos reservados\.'/g,
   "footer_bottom:'© 2026 Vivre en Géorgie. Todos los derechos reservados.'"],
  [/footer_bottom:'© 2026 Vivre en Géorgie — BEI Batumi Expat Invest\. ყველა უფლება დაცულია\.'/g,
   "footer_bottom:'© 2026 Vivre en Géorgie. ყველა უფლება დაცულია.'"],
  // Page titles with | BEI Batumi Expat Invest
  [/ \| BEI Batumi Expat Invest/g, ''],
  // Meta descriptions
  [/Vivre en Géorgie, BEI Batumi Expat Invest\./g, 'Vivre en Géorgie.'],
  [/BEI Batumi Expat Invest/g, 'Vivre en Géorgie'],
  // Body text
  [/Vivre en Géorgie – BEI Batumi Expat Invest est un/g, 'Vivre en Géorgie est un'],
  [/Vivre en Géorgie – BEI est un/g, 'Vivre en Géorgie est un'],
  // JSON-LD names
  [/"Vivre en Géorgie – BEI Batumi Expat Invest"/g, '"Vivre en Géorgie"'],
  [/"name": "Vivre en Géorgie – BEI Batumi Expat Invest"/g, '"name": "Vivre en Géorgie"'],
  // Footer HTML span
  [/>© 2026 Vivre en Géorgie — BEI Batumi Expat Invest\.[^<]*</g, '>© 2026 Vivre en Géorgie. Tous droits réservés.<'],
  // Drawer logo-sub "BEI Batumi" not in span (possible text node)
];

const files = getAllHtmlFiles();
let totalBrand = 0;
files.forEach(fp => {
  let content = fs.readFileSync(fp, 'utf8');
  const orig = content;
  brandReplacements.forEach(([pattern, replacement]) => {
    content = content.replace(pattern, replacement);
  });
  if (content !== orig) {
    fs.writeFileSync(fp, content, 'utf8');
    totalBrand++;
    console.log('Brand fixed:', path.relative(base, fp));
  }
});
console.log(`Brand identity fixed in ${totalBrand} files.\n`);

// ── PHASE 2: Strong promises in index.html ──────────────────────────────────

const idxPath = path.join(base, 'index.html');
let idx = fs.readFileSync(idxPath, 'utf8');
const idxOrig = idx;

const promiseReplacements = [
  // HTML default feat2_text
  ['>On répond peu importe l\'heure, 7j/7.<',
   '>Nous revenons vers vous rapidement pour comprendre votre projet.<'],
  // HTML defaults trust section
  ['une présence physique permanente.',
   'une présence locale sur le terrain.'],
  // HTML trust1_text default
  ['Notre équipe est présente physiquement à Batumi et Tbilissi. Pas de conseil à distance basé sur des articles internet.',
   'Notre équipe est présente à Batumi et à Tbilissi. Nos conseils reposent sur une connaissance directe du terrain.'],
  // HTML trust4_text default
  ['Actes notariés, ouvertures de comptes, démarches admin. Zéro barrière de langue à chaque étape.',
   'Actes notariés, ouvertures de comptes, démarches administratives. Accompagnement en français à chaque étape.'],
  // HTML team_cta_text default
  ['réseau, connaissances et présence locale permanente. En français, géorgien et espagnol.',
   'réseau, connaissances et présence locale. En français, géorgien et espagnol.'],

  // i18n FR
  ["trust_p:'On ne vend pas du rêve sur la Géorgie. On accompagne des projets concrets avec une méthode claire, des chiffres honnêtes et une présence physique permanente.'",
   "trust_p:'On ne vend pas du rêve sur la Géorgie. On accompagne des projets concrets avec une méthode claire, des chiffres honnêtes et une présence locale sur le terrain.'"],
  ["trust1_title:'Présents physiquement toute l'année', trust1_text:'Notre équipe est présente physiquement à Batumi et Tbilissi. Pas de conseil à distance basé sur des articles internet.'",
   "trust1_title:'Équipe présente sur le terrain', trust1_text:'Notre équipe est présente à Batumi et à Tbilissi. Nos conseils reposent sur une connaissance directe du terrain.'"],
  ["trust4_text:'Actes notariés, ouvertures de comptes, démarches admin. Zéro barrière de langue à chaque étape.'",
   "trust4_text:'Actes notariés, ouvertures de comptes, démarches administratives. Accompagnement en français à chaque étape.'"],
  ["team_cta_text:'Vous n'arrivez pas seul dans un pays que vous ne connaissez pas. Vous arrivez avec une équipe déjà implantée — réseau, connaissances et présence locale permanente. En français, géorgien et espagnol.'",
   "team_cta_text:'Vous n'arrivez pas seul dans un pays que vous ne connaissez pas. Vous arrivez avec une équipe déjà implantée — réseau, connaissances et présence locale. En français, géorgien et espagnol.'"],

  // i18n EN
  ["trust_p:'We don't sell Georgia dreams. We support real projects with a clear method, honest figures and permanent physical presence.'",
   "trust_p:'We don't sell Georgia dreams. We support real projects with a clear method, honest figures and local presence on the ground.'"],
  ["trust1_title:'Physically present all year', trust1_text:'Our team is physically present in Batumi and Tbilisi. No remote advice based on internet articles.'",
   "trust1_title:'Team present on the ground', trust1_text:'Our team is present in Batumi and Tbilisi. Our advice is based on direct knowledge of the field.'"],
  ["trust4_text:'Notarial deeds, account openings, admin procedures. Zero language barrier at every step.'",
   "trust4_text:'Notarial deeds, account openings, admin procedures. Full support in English at every step.'"],
  ["team_cta_text:'You don't arrive alone in a country you don't know. You arrive with an already established team — network, know-how and permanent local presence. In French, Georgian and Spanish.'",
   "team_cta_text:'You don't arrive alone in a country you don't know. You arrive with an already established team — network, know-how and local presence. In French, Georgian and Spanish.'"],

  // i18n ES
  ["trust_p:'No vendemos sueños sobre Georgia. Acompañamos proyectos concretos con un método claro, cifras honestas y presencia física permanente.'",
   "trust_p:'No vendemos sueños sobre Georgia. Acompañamos proyectos concretos con un método claro, cifras honestas y presencia local sobre el terreno.'"],
  ["trust1_title:'Presentes físicamente todo el año', trust1_text:'Nuestro equipo está físicamente presente en Batumi y Tiflis. Sin asesoramiento a distancia basado en artículos de internet.'",
   "trust1_title:'Equipo presente sobre el terreno', trust1_text:'Nuestro equipo está presente en Batumi y Tiflis. Nuestros consejos se basan en un conocimiento directo del terreno.'"],
  ["trust4_text:'Escrituras notariales, apertura de cuentas, trámites admin. Cero barrera de idioma en cada paso.'",
   "trust4_text:'Escrituras notariales, apertura de cuentas, trámites administrativos. Acompañamiento en español en cada paso.'"],
  ["team_cta_text:'No llegas solo a un país que no conoces. Llegas con un equipo ya implantado — red, conocimientos y presencia local permanente. En francés, georgiano y español.'",
   "team_cta_text:'No llegas solo a un país que no conoces. Llegas con un equipo ya implantado — red, conocimientos y presencia local. En francés, georgiano y español.'"],

  // i18n GE - fix "permanente" equiv
  ["team_cta_text:'თქვენ მარტო არ ჩადიხართ უცნობ ქვეყანაში. ჩადიხართ უკვე ჩამოყალიბებული გუნდით — ქსელი, ცოდნა და მუდმივი ადგილობრივი ყოფნა. ფრანგულ, ქართულ და ესპანურ ენებზე.'",
   "team_cta_text:'თქვენ მარტო არ ჩადიხართ უცნობ ქვეყანაში. ჩადიხართ უკვე ჩამოყალიბებული გუნდით — ქსელი, ცოდნა და ადგილობრივი ყოფნა. ფრანგულ, ქართულ და ესპანურ ენებზე.'"],
  ["trust_p:'ჩვენ არ ვყიდით ოცნებებს. ვამხანაგობთ კონკრეტულ პროექტებს — მკაფიო მეთოდით, პატიოსანი ციფრებით და ფიზიკური ყოფნით.'",
   "trust_p:'ჩვენ არ ვყიდით ოცნებებს. ვამხანაგობთ კონკრეტულ პროექტებს — მკაფიო მეთოდით, პატიოსანი ციფრებით და ადგილობრივი ყოფნით.'"],
];

promiseReplacements.forEach(([from, to]) => {
  if (typeof from === 'string') {
    if (idx.includes(from)) {
      idx = idx.split(from).join(to);
      console.log('Promise fixed:', from.substring(0, 60) + '...');
    } else {
      console.warn('NOT FOUND:', from.substring(0, 60));
    }
  } else {
    idx = idx.replace(from, to);
  }
});

// ── PHASE 3: WA messages – add "je viens de Vivre en Géorgie" ───────────────

const waReplacements = [
  // FR
  ["wa_msg_generic:\"Bonjour, j'aimerais en savoir plus sur vos services.\"",
   "wa_msg_generic:\"Bonjour, je viens de Vivre en Géorgie 🇬🇪\\n\\nMon projet concerne :\\nEntreprendre / Investir / M'installer / Autre\\n\\nVoici ma demande :\""],
  ["wa_msg_business:\"Bonjour, j'ai un projet entrepreneurial en Géorgie 🇬🇪",
   "wa_msg_business:\"Bonjour, je viens de Vivre en Géorgie et j'ai un projet entrepreneurial en Géorgie 🇬🇪"],
  ["wa_msg_invest:\"Bonjour, j'étudie un investissement immobilier neuf en Géorgie 🇬🇪",
   "wa_msg_invest:\"Bonjour, je viens de Vivre en Géorgie et j'étudie un investissement immobilier neuf en Géorgie 🇬🇪"],
  ["wa_msg_expat:\"Bonjour, je prépare un projet d'installation en Géorgie 🇬🇪",
   "wa_msg_expat:\"Bonjour, je viens de Vivre en Géorgie et je prépare un projet d'installation en Géorgie 🇬🇪"],
  // EN
  ["wa_msg_generic:\"Hello, I would like to know more about your services.\"",
   "wa_msg_generic:\"Hello, I'm reaching out from Vivre en Géorgie 🇬🇪\\n\\nMy project is about:\\nStart a business / Invest / Relocate / Other\\n\\nHere is my request:\""],
  ["wa_msg_business:\"Hello, I have a business project in Georgia 🇬🇪",
   "wa_msg_business:\"Hello, I'm reaching out from Vivre en Géorgie and I have a business project in Georgia 🇬🇪"],
  ["wa_msg_invest:\"Hello, I'm looking into a new-build real estate investment in Georgia 🇬🇪",
   "wa_msg_invest:\"Hello, I'm reaching out from Vivre en Géorgie and I'm looking into a new-build real estate investment in Georgia 🇬🇪"],
  ["wa_msg_expat:\"Hello, I'm planning a relocation to Georgia 🇬🇪",
   "wa_msg_expat:\"Hello, I'm reaching out from Vivre en Géorgie and I'm planning a relocation to Georgia 🇬🇪"],
  // ES
  ["wa_msg_generic:\"Hola, me gustaría saber más sobre sus servicios.\"",
   "wa_msg_generic:\"Hola, vengo de Vivre en Géorgie 🇬🇪\\n\\nMi proyecto es sobre:\\nEmprender / Invertir / Instalarme / Otro\\n\\nMi solicitud:\""],
  ["wa_msg_business:\"Hola, tengo un proyecto empresarial en Georgia 🇬🇪",
   "wa_msg_business:\"Hola, vengo de Vivre en Géorgie y tengo un proyecto empresarial en Georgia 🇬🇪"],
  ["wa_msg_invest:\"Hola, estudio una inversión inmobiliaria en Georgia 🇬🇪",
   "wa_msg_invest:\"Hola, vengo de Vivre en Géorgie y estudio una inversión inmobiliaria en Georgia 🇬🇪"],
  ["wa_msg_expat:\"Hola, preparo un proyecto de instalación en Georgia 🇬🇪",
   "wa_msg_expat:\"Hola, vengo de Vivre en Géorgie y preparo un proyecto de instalación en Georgia 🇬🇪"],
  // GE
  ["wa_msg_generic:\"გამარჯობა, მინდა გავიგო მეტი თქვენი სერვისების შესახებ.\"",
   "wa_msg_generic:\"გამარჯობა, Vivre en Géorgie-დან ვწერ 🇬🇪\\n\\nჩემი პროექტი ეხება:\\nბიზნეს / ინვესტიცია / ემიგრაცია / სხვა\\n\\nჩემი მოთხოვნა:\""],
  ["wa_msg_business:\"გამარჯობა, მაქვს სამეწარმეო პროექტი საქართველოში 🇬🇪",
   "wa_msg_business:\"გამარჯობა, Vivre en Géorgie-დან ვწერ და მაქვს სამეწარმეო პროექტი საქართველოში 🇬🇪"],
  ["wa_msg_invest:\"გამარჯობა, ვიკვლევ უძრავ ქონებაში ინვესტიციას საქართველოში 🇬🇪",
   "wa_msg_invest:\"გამარჯობა, Vivre en Géorgie-დან ვწერ და ვიკვლევ უძრავ ქონებაში ინვესტიციას საქართველოში 🇬🇪"],
  ["wa_msg_expat:\"გამარჯობა, ვამზადებ ემიგრაციის პროექტს საქართველოში 🇬🇪",
   "wa_msg_expat:\"გამარჯობა, Vivre en Géorgie-დან ვწერ და ვამზადებ ემიგრაციის პროექტს საქართველოში 🇬🇪"],
];

waReplacements.forEach(([from, to]) => {
  if (idx.includes(from)) {
    idx = idx.split(from).join(to);
    console.log('WA fixed:', from.substring(0, 60) + '...');
  } else {
    console.warn('WA NOT FOUND:', from.substring(0, 60));
  }
});

if (idx !== idxOrig) {
  fs.writeFileSync(idxPath, idx, 'utf8');
  console.log('\nindex.html updated with promises + WA fixes.');
}

// ── PHASE 4: OG + Twitter/X Card meta tags ──────────────────────────────────

const ogImage = 'https://vivreengeorgie.com/images/batumi-real.png';
const twitterSite = '@axelb_pro';

const ogPages = [
  {
    file: 'blog.html',
    url: 'https://vivreengeorgie.com/blog.html',
    title: 'Blog – Guides et analyses sur la Géorgie | Vivre en Géorgie',
    desc: 'Guides, analyses et conseils sur la vie en Géorgie : immobilier à Batumi, fiscalité, création de société, expatriation.',
    type: 'website',
    anchor: '<link rel="canonical" href="https://vivreengeorgie.com/blog.html">',
  },
  {
    file: 'a-propos.html',
    url: 'https://vivreengeorgie.com/a-propos.html',
    title: 'À propos – Qui est Vivre en Géorgie ? | Cabinet francophone en Géorgie',
    desc: 'Vivre en Géorgie est un cabinet francophone de conseil et d\'accompagnement spécialisé en Géorgie. Découvrez notre équipe et notre approche.',
    type: 'website',
    anchor: '<link rel="canonical" href="https://vivreengeorgie.com/a-propos.html">',
  },
  {
    file: 'entreprendre-en-georgie.html',
    url: 'https://vivreengeorgie.com/entreprendre-en-georgie.html',
    title: 'Entreprendre en Géorgie – Créer une société | Vivre en Géorgie',
    desc: 'Créer une société en Géorgie en moins de 24h. Guide complet : procédure, statut Petite Entreprise, compte bancaire professionnel.',
    type: 'website',
    anchor: '<link rel="canonical" href="https://vivreengeorgie.com/entreprendre-en-georgie.html">',
  },
  {
    file: 'investir-en-georgie.html',
    url: 'https://vivreengeorgie.com/investir-en-georgie.html',
    title: 'Investir dans l\'immobilier neuf à Batumi | Vivre en Géorgie',
    desc: 'Investissement immobilier neuf à Batumi : marché, prix, accompagnement sans honoraires sur les programmes partenaires.',
    type: 'website',
    anchor: '<link rel="canonical" href="https://vivreengeorgie.com/investir-en-georgie.html">',
  },
  {
    file: 's-installer-en-georgie.html',
    url: 'https://vivreengeorgie.com/s-installer-en-georgie.html',
    title: 'S\'expatrier en Géorgie – Préparer son installation | Vivre en Géorgie',
    desc: 'S\'installer en Géorgie : visa, logement, banque, vie quotidienne à Batumi. Accompagnement francophone avec une équipe locale.',
    type: 'website',
    anchor: '<link rel="canonical" href="https://vivreengeorgie.com/s-installer-en-georgie.html">',
  },
  {
    file: 'mentions-legales.html',
    url: 'https://vivreengeorgie.com/mentions-legales.html',
    title: 'Mentions légales | Vivre en Géorgie',
    desc: 'Mentions légales du site vivreengeorgie.com – éditeur, hébergeur et conditions d\'utilisation.',
    type: 'website',
    anchor: '<link rel="canonical" href="https://vivreengeorgie.com/mentions-legales.html">',
  },
  {
    file: 'equipe/axel-briard.html',
    url: 'https://vivreengeorgie.com/equipe/axel-briard.html',
    title: 'Axel Briard – Fondateur de Vivre en Géorgie',
    desc: 'Axel Briard est le fondateur et visage de Vivre en Géorgie. Expatrié français installé en Géorgie, il accompagne les francophones dans leurs projets.',
    type: 'profile',
    anchor: '<link rel="canonical" href="https://vivreengeorgie.com/equipe/axel-briard.html">',
  },
  {
    file: 'equipe/victor-gogoladze.html',
    url: 'https://vivreengeorgie.com/equipe/victor-gogoladze.html',
    title: 'Victor Gogoladze – Coordinateur local Géorgie | Vivre en Géorgie',
    desc: 'Victor Gogoladze est le coordinateur local de Vivre en Géorgie à Batumi. Il assure la coordination avec les partenaires locaux.',
    type: 'profile',
    anchor: '<link rel="canonical" href="https://vivreengeorgie.com/equipe/victor-gogoladze.html">',
  },
];

ogPages.forEach(({ file, url, title, desc, type, anchor }) => {
  const fp = path.join(base, file);
  if (!fs.existsSync(fp)) { console.warn('File not found:', file); return; }
  let content = fs.readFileSync(fp, 'utf8');
  if (content.includes('og:title')) { console.log('OG already exists:', file); return; }

  const ogBlock = `\n  <meta property="og:type" content="${type}">
  <meta property="og:url" content="${url}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${desc}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:locale" content="fr_FR">
  <meta property="og:site_name" content="Vivre en Géorgie">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="${twitterSite}">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${desc}">
  <meta name="twitter:image" content="${ogImage}">`;

  if (content.includes(anchor)) {
    content = content.replace(anchor, anchor + ogBlock);
    fs.writeFileSync(fp, content, 'utf8');
    console.log('OG added:', file);
  } else {
    console.warn('Anchor not found in:', file);
  }
});

// ── PHASE 5: Fix JSON-LD issues in blog articles ────────────────────────────

// Fix "garantie" in creer-societe JSON-LD FAQ
const cSociete = path.join(base, 'blog/creer-societe-georgie-24h.html');
let cs = fs.readFileSync(cSociete, 'utf8');
cs = cs.replace(
  'La création d\'une LLC en Géorgie est garantie en moins de 24 heures par l\'administration géorgienne.',
  'La création d\'une LLC en Géorgie peut être effectuée en moins de 24 heures via la House of Justice. Une procédure express en 4 heures est également disponible.'
);
fs.writeFileSync(cSociete, cs, 'utf8');
console.log('\nFixed: creer-societe JSON-LD guarantee claim.');

// Fix Saburtalo reference in investir-immobilier JSON-LD (Saburtalo is Tbilisi, not Batumi)
const investiPath = path.join(base, 'blog/investir-immobilier-batumi.html');
let inv = fs.readFileSync(investiPath, 'utf8');
inv = inv.replace(
  'Boulevard pour la rentabilité locative, Saburtalo pour la vie locale, Old Town pour le charme.',
  'Boulevard pour la rentabilité locative, Old Town pour le charme historique. À Tbilissi, Saburtalo est prisé pour la vie locale.'
);
fs.writeFileSync(investiPath, inv, 'utf8');
console.log('Fixed: investir-immobilier Saburtalo location.');

console.log('\n✓ All technical fixes complete.');
