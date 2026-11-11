"""Checks for the cinematic site and its four translations."""
from pathlib import Path
import json, unittest
from urllib.parse import urlsplit, unquote
from bs4 import BeautifulSoup
ROOT=Path(__file__).resolve().parents[1]
SOURCE=(ROOT/'atelier-i18n.js').read_text(encoding='utf-8-sig')
LANGS,_=json.JSONDecoder().raw_decode(SOURCE.split('const translations = ',1)[1])
PAGE=BeautifulSoup((ROOT/'index.html').read_text(encoding='utf-8'),'html.parser')
class SiteChecks(unittest.TestCase):
 def test_translation_coverage(self):
  self.assertEqual(set(LANGS),{'fr','en','es','ka'})
  keys={x['data-t'] for x in PAGE.select('[data-t]')}
  keys.update(['hello','question','blocked','motionOn','motionOff'])
  keys.update(x+'Detail' for x in ['accountant','lawyer','developer','banker'])
  for lang,rows in LANGS.items():
   self.assertEqual(set(rows),set(LANGS['fr']),lang)
   self.assertFalse(keys-set(rows),lang)
   self.assertTrue(all(isinstance(v,str) and v.strip() for v in rows.values()),lang)
 def test_assets_and_anchors(self):
  ids=[x['id'] for x in PAGE.select('[id]')]
  self.assertEqual(len(ids),len(set(ids)))
  for node in PAGE.select('[src],a[href],link[rel=stylesheet]'):
   url=node.get('src') or node.get('href')
   parts=urlsplit(url)
   if parts.scheme or parts.netloc:continue
   if parts.path:self.assertTrue((ROOT/unquote(parts.path)).is_file(),url)
   elif parts.fragment:self.assertIn(parts.fragment,ids,url)
 def test_chapter_structure(self):
  self.assertEqual([x['value'] for x in PAGE.select('#language option')],['fr','en','es','ka'])
  self.assertEqual([float(x['data-time']) for x in PAGE.select('[data-step]')],[2,7,7,14,14,20,20,24,24])
  self.assertEqual(len(PAGE.select('.scene-detail')),4)
  self.assertEqual(len(PAGE.select('.scene-points li')),0)
  self.assertEqual(len(PAGE.select('.value-feature')),9)
  self.assertEqual(len(PAGE.select('.value-metric')),7)
  self.assertEqual(len(PAGE.select('.offer-conditions')),2)
  self.assertIn('70 %',PAGE.get_text())
  self.assertIn('12 %',PAGE.get_text())
  self.assertNotIn('peu importe le montant',PAGE.get_text())
  self.assertFalse(PAGE.select('.person,.offers,.faq'))
  self.assertIsNotNone(PAGE.select_one('#contact-form'))
  self.assertEqual([x['value'] for x in PAGE.select('#contact-form [name=project]')],['business','bankProject','invest'])
  self.assertTrue(PAGE.select_one('#timeline').has_attr('required'))
  self.assertIsNone(PAGE.select_one('.message-preview'))
  self.assertTrue(PAGE.select_one('#budget-field').has_attr('hidden'))
  self.assertTrue(PAGE.select_one('#budget').has_attr('disabled'))
  self.assertNotRegex(PAGE.get_text(),r'Axel|Victor')
 def test_film_and_retired_blog(self):
  self.assertIsNotNone(PAGE.select_one('#film-canvas'))
  self.assertIsNone(PAGE.select_one('video'))
  self.assertEqual(len(PAGE.select('[data-scene]')),5)
  self.assertFalse(any('blog' in a.get('href','') for a in PAGE.select('a')))
  self.assertEqual([s['src'].split('?')[0] for s in PAGE.select('script[src]')],['atelier-i18n.js','atelier.js'])
if __name__=='__main__':unittest.main()
