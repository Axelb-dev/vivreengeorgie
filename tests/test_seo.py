from pathlib import Path
import unittest,json,hashlib,base64,urllib.robotparser,xml.etree.ElementTree as ET
from bs4 import BeautifulSoup
ROOT=Path(__file__).resolve().parents[1]
class Discoverability(unittest.TestCase):
 def test_crawlers(self):
  r=urllib.robotparser.RobotFileParser();r.parse((ROOT/'robots.txt').read_text().splitlines())
  for agent in ['Googlebot','Bingbot','OAI-SearchBot','ChatGPT-User','Claude-SearchBot','Claude-User','PerplexityBot','GPTBot']:
   for path in ['/','/atelier.js','/atelier.css','/llms.txt','/llms-full.txt']:
    self.assertTrue(r.can_fetch(agent,'https://vivreengeorgie.com'+path),(agent,path))
  self.assertEqual(r.site_maps(),['https://vivreengeorgie.com/sitemap.xml'])
 def test_schema_and_policy(self):
  soup=BeautifulSoup((ROOT/'index.html').read_text(encoding='utf-8'),'html.parser');script=soup.select_one('script[type="application/ld+json"]');data=json.loads(script.string)
  self.assertEqual(len([x for x in data['@graph'] if x['@type']=='Service']),3)
  digest=base64.b64encode(hashlib.sha256(script.string.encode()).digest()).decode()
  self.assertIn('sha256-'+digest,soup.select_one('meta[http-equiv="Content-Security-Policy"]')['content'])
  self.assertEqual(soup.select_one('link[rel=canonical]')['href'],'https://vivreengeorgie.com/')
  self.assertNotIn('noindex',soup.select_one('meta[name=robots]')['content'])
 def test_sitemap(self):
  urls=[x.text for x in ET.parse(ROOT/'sitemap.xml').findall('.//{*}loc')]
  self.assertEqual(urls,['https://vivreengeorgie.com/'])
if __name__=='__main__':unittest.main()
