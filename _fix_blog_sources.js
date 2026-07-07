/**
 * For each blog article:
 * 1. Add a "Sources et dernière vérification" info-box at the end of article-body
 * 2. Add an "À approfondir" block linking to 1-2 relevant pillar pages
 * 3. Reformulate unsourced absolute claims as indicative estimates (article-body only)
 */
const fs = require('fs');
const path = require('path');
const blogDir = path.join(__dirname, 'blog');

// Pillar links per article
const PILLAR = {
  'pourquoi-batumi-2026.html':            ['s-installer-en-georgie.html', 'investir-en-georgie.html'],
  'batumi-change-vite-dubai.html':         ['investir-en-georgie.html', 'entreprendre-en-georgie.html'],
  'cout-vie-batumi.html':                  ['s-installer-en-georgie.html'],
  'fiscalite-georgie.html':               ['entreprendre-en-georgie.html'],
  'salaires-georgie.html':                ['entreprendre-en-georgie.html'],
  'entrepreneurs-quittent-france-georgie.html': ['entreprendre-en-georgie.html'],
  'vivre-1000-euros-batumi.html':          ['s-installer-en-georgie.html'],
  'creer-societe-georgie-24h.html':        ['entreprendre-en-georgie.html'],
  'batumi-10-ans-evolution.html':          ['investir-en-georgie.html', 's-installer-en-georgie.html'],
  'investir-immobilier-batumi.html':       ['investir-en-georgie.html'],
  'georgie-attire-europeens.html':         ['s-installer-en-georgie.html', 'investir-en-georgie.html'],
  'securite-georgie.html':                ['s-installer-en-georgie.html'],
  'compte-bancaire-georgie.html':          ['entreprendre-en-georgie.html', 's-installer-en-georgie.html'],
  'erreurs-expatriation.html':            ['s-installer-en-georgie.html', 'entreprendre-en-georgie.html'],
  'installation-batumi-budget.html':       ['s-installer-en-georgie.html'],
  'avantages-vivre-georgie.html':          ['s-installer-en-georgie.html', 'investir-en-georgie.html'],
  'defauts-georgie.html':                 ['s-installer-en-georgie.html'],
  'residence-georgienne.html':            ['s-installer-en-georgie.html'],
  'quartiers-batumi.html':               ['s-installer-en-georgie.html', 'investir-en-georgie.html'],
  'nourriture-georgienne.html':           ['s-installer-en-georgie.html'],
};

const PILLAR_LABELS = {
  'entreprendre-en-georgie.html': 'Entreprendre en Géorgie',
  'investir-en-georgie.html':     'Investir en Géorgie',
  's-installer-en-georgie.html':  'S\'installer en Géorgie',
};

// Source types per article
const SOURCES = {
  'pourquoi-batumi-2026.html':
    'observations de terrain à Batumi (équipe Vivre en Géorgie, 2025–2026), données démographiques du Bureau national des statistiques de Géorgie (Geostat), réglementation sur l\'entrée sans visa de l\'Agence des services publics de Géorgie (PSA).',
  'batumi-change-vite-dubai.html':
    'observations de terrain, données immobilières des plateformes SS.ge et Myhome.ge (2025–2026), données de prix immobiliers Dubaï (Knight Frank, Dubai Land Department 2026).',
  'cout-vie-batumi.html':
    'relevés de prix terrain à Batumi (équipe Vivre en Géorgie, 2025–2026), plateformes SS.ge et Myhome.ge pour les loyers, Numbeo (estimations coût de vie, données crowdsourcées — à titre indicatif).',
  'fiscalite-georgie.html':
    'Code fiscal de Géorgie (Revenue Service of Georgia, revenue.gov.ge), conventions fiscales publiées par la DGFIP (France) et l\'administration géorgienne. Mise en garde : la réglementation fiscale peut évoluer — vérifiez les textes en vigueur à la date de votre analyse.',
  'salaires-georgie.html':
    'Bureau national des statistiques de Géorgie (Geostat, stats.ge) — données sur les salaires moyens par secteur, observations terrain de recrutement local (équipe Vivre en Géorgie).',
  'entrepreneurs-quittent-france-georgie.html':
    'Code fiscal de Géorgie (Revenue Service of Georgia), données sur la création d\'entreprise (NAPR — registre national des entreprises de Géorgie), observations terrain (équipe Vivre en Géorgie).',
  'vivre-1000-euros-batumi.html':
    'relevés de prix terrain à Batumi (équipe Vivre en Géorgie, 2025–2026), plateformes SS.ge (loyers), tarifs opérateurs téléphoniques géorgiens (Magti, Silknet). Les fourchettes sont des estimations indicatives susceptibles d\'évoluer.',
  'creer-societe-georgie-24h.html':
    'NAPR (Registre national des entreprises de Géorgie, napr.gov.ge), House of Justice (procédures et tarifs officiels), Revenue Service of Georgia (TIN, déclarations fiscales).',
  'batumi-10-ans-evolution.html':
    'Bureau national des statistiques de Géorgie (Geostat), Agence nationale du tourisme de Géorgie (georgia.travel), observations de terrain (équipe Vivre en Géorgie, 2020–2026).',
  'investir-immobilier-batumi.html':
    'données de prix des plateformes SS.ge et Myhome.ge (2025–2026), observations terrain (équipe Vivre en Géorgie). Les fourchettes de prix et rendements locatifs sont des estimations indicatives basées sur les annonces observées — elles ne constituent pas une projection ni un engagement.',
  'georgie-attire-europeens.html':
    'Bureau national des statistiques de Géorgie (Geostat), rapports de l\'Agence des services publics (PSA) sur les flux d\'entrée, Heritage Foundation Index of Economic Freedom (2025).',
  'securite-georgie.html':
    'Bureau national des statistiques de Géorgie (Geostat — données sur la criminalité enregistrée), Global Peace Index 2025 (Institute for Economics & Peace — classement national, ne se substitue pas à une évaluation locale), conseils aux voyageurs du Ministère des Affaires étrangères français (diplomatie.gouv.fr).',
  'compte-bancaire-georgie.html':
    'sites officiels de TBC Bank (tbcbank.ge) et Bank of Georgia (bog.ge) pour les procédures et frais, observations terrain (équipe Vivre en Géorgie). Les conditions d\'ouverture de compte peuvent évoluer selon les politiques internes des banques.',
  'erreurs-expatriation.html':
    'observations terrain (équipe Vivre en Géorgie, 2020–2026), réglementation fiscale française (CGI, DGFIP), Code fiscal de Géorgie (Revenue Service of Georgia).',
  'installation-batumi-budget.html':
    'relevés de prix terrain à Batumi (équipe Vivre en Géorgie, 2025–2026), plateformes SS.ge et Myhome.ge (loyers), opérateurs téléphoniques géorgiens. Les estimations budgétaires sont indicatives et dépendent du profil et des choix de chaque personne.',
  'avantages-vivre-georgie.html':
    'observations terrain (équipe Vivre en Géorgie), réglementation d\'entrée sans visa (Agence des services publics de Géorgie — PSA), Heritage Foundation Index of Economic Freedom (2025).',
  'defauts-georgie.html':
    'observations terrain (équipe Vivre en Géorgie, 2020–2026), rapports de l\'OCDE sur la Géorgie, conseils aux voyageurs du Ministère des Affaires étrangères français (diplomatie.gouv.fr).',
  'residence-georgienne.html':
    'Agence des services publics de Géorgie (PSA — justice.gov.ge) pour les types de permis et procédures, Code civil géorgien, Code général des impôts français (DGFIP) pour les critères de résidence fiscale.',
  'quartiers-batumi.html':
    'observations terrain (équipe Vivre en Géorgie), plateformes SS.ge et Myhome.ge pour les données de loyers par quartier (2025–2026). Les fourchettes de prix sont indicatives et susceptibles d\'évoluer avec le marché.',
  'nourriture-georgienne.html':
    'observations terrain (équipe Vivre en Géorgie), UNESCO — liste du patrimoine immatériel (vinification en qvevri, inscrite en 2013), prix relevés dans les marchés locaux et restaurants de Batumi et Tbilissi (2025–2026).',
};

function sourcesBlock(filename) {
  const src = SOURCES[filename] || 'observations de terrain (équipe Vivre en Géorgie).';
  return `
<div class="info-box" style="margin-top:40px;border-left-color:rgba(212,175,55,.6);background:rgba(212,175,55,.05);">
  <p><strong style="color:rgba(212,175,55,.9);">Sources et dernière vérification (juillet 2026)</strong><br>
  Les informations de cet article reposent sur : ${src}<br>
  <em>Les estimations de prix, coûts et délais sont indicatives et susceptibles d'évoluer. Elles ne constituent pas des engagements de Vivre en Géorgie.</em></p>
</div>`;
}

function pillarBlock(filename) {
  const slugs = PILLAR[filename] || [];
  if (!slugs.length) return '';
  const links = slugs.map(slug => {
    const label = PILLAR_LABELS[slug];
    return `<a href="../${slug}" style="display:inline-flex;align-items:center;gap:6px;background:rgba(23,190,187,.1);border:1px solid rgba(23,190,187,.25);border-radius:999px;padding:8px 16px;color:#17BEBB;font-size:13px;font-weight:700;text-decoration:none;margin:4px 4px 4px 0;" onmouseover="this.style.background='rgba(23,190,187,.18)'" onmouseout="this.style.background='rgba(23,190,187,.1)'">${label} →</a>`;
  }).join('\n  ');
  return `
<div style="margin-top:32px;padding:20px 24px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:12px;">
  <p style="font-size:10.5px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:12px;">Nos services associés</p>
  ${links}
</div>`;
}

// Body-level text corrections per article (indicative reformulations)
const BODY_FIXES = {
  'cout-vie-batumi.html': [
    // None needed — already written with hedged language
  ],
  'pourquoi-batumi-2026.html': [
    ['environ 80 000 expatriés et nomades digitaux résident à l\'année à Batumi, en plus de ses 200 000 habitants permanents. La population étrangère a triplé en 5 ans',
     'plusieurs dizaines de milliers de résidents étrangers vivent à l\'année à Batumi. La croissance de la population étrangère a été significative sur les cinq dernières années'],
  ],
  'georgie-attire-europeens.html': [
    // Already fixed in JSON-LD; body text uses hedge language
  ],
};

let count = 0;

for (const [filename] of Object.entries(PILLAR)) {
  const fp = path.join(blogDir, filename);
  if (!fs.existsSync(fp)) { console.warn('Not found: ' + filename); continue; }
  let html = fs.readFileSync(fp, 'utf8');
  const orig = html;

  // Apply body fixes if any
  const fixes = BODY_FIXES[filename] || [];
  for (const [from, to] of fixes) {
    if (html.includes(from)) html = html.split(from).join(to);
  }

  // Insert sources + pillar block: find end of article-body div
  // The article-body closes just before the art-faq div
  const MARKER = '</div>\n  <div class="art-faq">';
  const idx = html.indexOf(MARKER);
  if (idx === -1) {
    // Try alternate: articles might have been written with slightly different whitespace
    const ALT = '</div>\n<div class="art-faq">';
    const idx2 = html.indexOf(ALT);
    if (idx2 === -1) {
      console.warn('Marker not found: ' + filename);
      continue;
    }
    const insertion = pillarBlock(filename) + sourcesBlock(filename) + '\n';
    html = html.slice(0, idx2) + insertion + html.slice(idx2);
  } else {
    const insertion = pillarBlock(filename) + sourcesBlock(filename) + '\n';
    html = html.slice(0, idx) + insertion + MARKER + html.slice(idx + MARKER.length);
  }

  if (html !== orig) {
    fs.writeFileSync(fp, html, 'utf8');
    console.log('Updated: ' + filename);
    count++;
  }
}

console.log(`\n✓ Sources + pillar links added to ${count} articles.`);
