"""Local static preview with HTTP byte ranges for scroll-driven video."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import re
ROOT=Path(__file__).resolve().parents[1]
class Handler(SimpleHTTPRequestHandler):
 def __init__(self,*args,**kwargs):super().__init__(*args,directory=str(ROOT),**kwargs)
 def send_head(self):
  self.remaining=None
  path=Path(self.translate_path(self.path))
  request=self.headers.get('Range','')
  if not request or not path.is_file():return super().send_head()
  size=path.stat().st_size
  match=re.fullmatch(r'bytes=(\d*)-(\d*)',request)
  if not match:return super().send_head()
  first,last=match.groups()
  start=int(first) if first else max(0,size-int(last or size))
  end=min(int(last),size-1) if first and last else size-1
  if start>=size or end<start:
   self.send_response(416);self.send_header('Content-Range',f'bytes */{size}');self.end_headers();return None
  handle=path.open('rb');handle.seek(start)
  self.remaining=end-start+1
  self.send_response(206)
  self.send_header('Content-Type',self.guess_type(str(path)))
  self.send_header('Content-Length',str(self.remaining))
  self.send_header('Content-Range',f'bytes {start}-{end}/{size}')
  self.end_headers()
  return handle
 def end_headers(self):
  self.send_header('Accept-Ranges','bytes')
  self.send_header('Cache-Control','no-cache')
  super().end_headers()
 def copyfile(self,source,outputfile):
  if self.remaining is None:return super().copyfile(source,outputfile)
  while self.remaining:
   data=source.read(min(65536,self.remaining))
   if not data:break
   outputfile.write(data);self.remaining-=len(data)
ThreadingHTTPServer(('127.0.0.1',4175),Handler).serve_forever()
