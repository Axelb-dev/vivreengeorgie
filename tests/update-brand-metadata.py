from pathlib import Path
from bs4 import BeautifulSoup
import json,re,hashlib,base64
base='https://vivreengeorgie.com/'
title='Vivre en Géorgie | Entreprise, banque et immobilier'
description='Créez votre entreprise, préparez vos démarches bancaires et investissez en Géorgie. Accompagnement en français et en espagnol, sur place ou à distance.'
for p in Path('.').glob('*.html'):
 s=p.read_text(encoding='utf-8-sig');m=re.search(r'<head>(.*?)</head>',s,re.S);head=BeautifulSoup(m[1],'html.parser')
 for el in head.select('link[rel="icon"],link[rel="shortcut icon"],link[rel="apple-touch-icon"]'):el.decompose()
 for attrs in [{'rel':'icon','href':'favicon.ico','sizes':'16x16 32x32 48x48'},{'rel':'icon','href':'favicon.png','type':'image/png','sizes':'96x96'},{'rel':'icon','href':'favicon.svg','type':'image/svg+xml','sizes':'any'},{'rel':'apple-touch-icon','href':'apple-touch-icon.png','sizes':'180x180'}]:
  tag=head.new_tag('link',attrs=attrs);head.append(tag)
 def meta(attr,name,value):
  el=head.find('meta',attrs={attr:name})
  if el is None:el=head.new_tag('meta',attrs={attr:name});head.append(el)
  el['content']=value
 if p.name=='index.html':
  head.title.string=title;meta('name','description',description);meta('property','og:title',title);meta('property','og:description',description)
 if head.find('meta',attrs={'property':'og:image'}):
  meta('property','og:image',base+'images/vivre-en-georgie-social.png')
  for key,value in {'og:image:width':'1200','og:image:height':'630','og:image:type':'image/png','og:image:alt':'Vivre en Géorgie — Entreprise, banque et immobilier'}.items():meta('property',key,value)
  meta('name','twitter:card','summary_large_image');meta('name','twitter:image',base+'images/vivre-en-georgie-social.png');meta('name','twitter:image:alt','Vivre en Géorgie — Entreprise, banque et immobilier')
  meta('name','twitter:title',head.title.string);meta('name','twitter:description',head.find('meta',attrs={'name':'description'})['content'])
 script=head.find('script',attrs={'type':'application/ld+json'})
 if script:
  data=json.loads(script.string)
  for item in data['@graph']:
   if item['@type']=='Organization':item['logo']={'@type':'ImageObject','url':base+'assets/brand/logo-512.png','width':512,'height':512}
   if item['@type']=='WebPage':
    item['primaryImageOfPage']={'@type':'ImageObject','url':base+'images/vivre-en-georgie-social.png','width':1200,'height':630}
    if p.name=='index.html':item['name']=title;item['description']=description
  script.string=json.dumps(data,ensure_ascii=False,separators=(',',':'))
  digest=base64.b64encode(hashlib.sha256(script.string.encode()).digest()).decode()
  csp=head.find('meta',attrs={'http-equiv':'Content-Security-Policy'});csp['content']=re.sub(r"sha256-[^']+",'sha256-'+digest,csp['content'])
 s=s[:m.start(1)]+str(head)+s[m.end(1):];s=s.replace('release48','release49');p.write_text(s,encoding='utf-8')
p=Path('atelier-i18n.js');s=p.read_text(encoding='utf-8');prefix,tail=s.split('const translations = ',1);rows,end=json.JSONDecoder().raw_decode(tail)
rows['fr']['seoTitle']=title;rows['fr']['introNote']=description
s=prefix+'const translations = '+json.dumps(rows,ensure_ascii=False,indent=2)+tail[end:]
needle="document.querySelector('meta[property=\"og:description\"]').content=plain('introNote');"
s=s.replace(needle,needle+"\n  document.querySelector('meta[name=\"twitter:title\"]').content=document.title;\n  document.querySelector('meta[name=\"twitter:description\"]').content=plain('introNote');")
p.write_text(s,encoding='utf-8')
