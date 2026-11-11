const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const raw=fs.readFileSync('atelier-i18n.js','utf8').replace(/^\uFEFF/,'');
const rows=vm.runInNewContext(raw.slice(0,raw.indexOf('(() =>'))+';translations');
const source=fs.readFileSync('atelier.js','utf8');
const build=vm.runInNewContext(source.slice(0,source.indexOf('(() =>'))+';buildContactMessage');
let tested=0;
for(const language of ['fr','en','es','ka'])for(const project of ['business','bankProject','invest'])for(const timeline of ['soon','later','explore']){
 const t=key=>rows[language][key];
 for(const note of ['', 'Mon projet : café & immobilier ?\nთბილისი']){
  const result=build(t,project,timeline,note);
  assert.ok(result.includes(t(project)));
  assert.ok(result.includes(t(timeline==='explore'?'research':timeline)));
  assert.ok(!result.includes('undefined'));
  assert.equal(decodeURIComponent(encodeURIComponent(result)),result);
  if(note)assert.ok(result.endsWith(note));
  else assert.ok(!result.includes(t('question')+' :'));
  tested++;
 }
}
console.log(`${tested} localized message cases passed; no external messages sent.`);

for(const language of ['fr','en','es','ka']){
 const t=key=>rows[language][key];
 for(const budget of ['Under50','50to100','100to200','200plus','Undecided']){
  assert.ok(build(t,'invest','soon','',budget).includes(t('budget'+budget)));
  for(const project of ['business','bankProject'])assert.ok(!build(t,project,'soon','',budget).includes(t('budgetLabel')));
 }
}
console.log('Budget translations and exclusion from non-investment messages passed.');
