const MOBILE_FILM_STILLS=[{"time": 0.25, "url": "assets/storyboard-mobile-v1/01-georgie.png", "align": [0.97056554628226, 0.00013724627433186866, -0.0007105393096638072, 0.9905705646514377, -1.042911961122788, -3.236555231458556]}, {"time": 7.166666666666667, "url": "assets/storyboard-mobile-v1/02-entreprise.png", "align": [0.9678934331491489, 6.710404933347012e-05, -0.00018708676977369023, 0.9877243359689352, -0.193104250137671, -2.16018929347946]}, {"time": 12.916666666666666, "url": "assets/storyboard-mobile-v1/03-banque.png", "align": [0.9938804109030197, 5.0566563912690445e-05, 0.000567134050151781, 0.9603572321329629, -6.091778940539456, -6.846853090348008]}, {"time": 21.5, "url": "assets/storyboard-mobile-v1/04-chantier.png", "align": [0.9680494884297244, -0.00018100240892483937, -0.00047747070229276606, 0.9873558396938802, 0.05955354479371026, -1.953540391958135]}, {"time": 24.083333333333332, "url": "assets/storyboard-mobile-v1/05-reseau.png", "align": [0.9678949686424847, 0.0002572547102972534, -0.00017600028206873715, 0.9871810779679535, -0.07006579732893564, -1.9785010650735875]}];
const FILM_STILLS=[
 {time:2,file:'01-georgie.png',align:[1.0075075248151957, 0.001971079802160204, -0.013618166218368113, 0.9690989315030367, -12.682450121009749, -1.4278423911148286]}, {time:7,file:'02-entreprise.png',align:[0.9871846960978151, -0.0001352935424505218, -0.00039042592097122513, 0.9667969938752025, -2.0109291285337676, 0.15727572649089916]},
 {time:14,file:'03-banque-v2.png',align:[0.9869720129630977, 5.4055499719928974e-05, 0.00043314512577999657, 0.9674101683509956, -2.1445808408970732, -0.02850580014869102]}, {time:20,file:'04-chantier.png',align:[0.9879609993667975, 0.00013479840064056125, 0.0015003117046759494, 0.9666039192069935, -3.092204588831619, 4.4233097305290805]}, {time:24,file:'05-reseau.png',align:[0.984765920777752, 0.0001256724222221162, 0.00025146920132802217, 0.965306454695048, -0.9352494317485816, 0.7442883670025615]}
];
function filmStillMix(seconds,stills=FILM_STILLS,radius=.8,full=.15){
 const index=stills.findIndex(still=>Math.abs(seconds-still.time)<radius);
 if(index<0)return {index:-1,alpha:0};
 const t=Math.max(0,Math.min(1,(radius-Math.abs(seconds-stills[index].time))/(radius-full)));
 return {index,alpha:t*t*(3-2*t)};
}
function filmFocus(seconds){
 const keys=[[2,.50],[4,.50],[6,.66],[8,.66],[10,.50],[12,.65],[14,.65],[16,.50],[20,.52],[22,.50],[24,.50]];
 if(seconds<=keys[0][0])return keys[0][1];
 for(let i=1;i<keys.length;i++)if(seconds<=keys[i][0]){const a=keys[i-1],b=keys[i],t=(seconds-a[0])/(b[0]-a[0]),ease=t*t*(3-2*t);return a[1]+(b[1]-a[1])*ease;}
 return keys[keys.length-1][1];
}
function nextScrollStop(y,direction,stops){
 const epsilon=8;
 return direction>0?(stops.find(stop=>stop>y+epsilon)??stops[stops.length-1]):([...stops].reverse().find(stop=>stop<y-epsilon)??stops[0]);
}
function filmTimelineTime(y,points){
 if(y<=points[0].y)return points[0].time;
 for(let i=1;i<points.length;i++){
  if(y<=points[i].y){const a=points[i-1],b=points[i];return a.time+(b.time-a.time)*Math.max(0,Math.min(1,(y-a.y)/Math.max(1,b.y-a.y)));}
 }
 return points[points.length-1].time;
}
function filmScrollProgress(scrollTop,scrollHeight,viewportHeight){
 return Math.max(0,Math.min(1,scrollTop/Math.max(1,scrollHeight-viewportHeight)));
}
function buildContactMessage(t,project,timeline,note='',budget=''){
 const timeKey={soon:'soon',later:'later',explore:'research'}[timeline];
 return [t('hello'),'',t('projectLabel')+' : '+t(project),t('timelineLabel')+' : '+t(timeKey),...(project==='invest'&&budget?[t('budgetLabel')+' : '+t('budget'+budget)]:[]),...(note?['',t('question')+' : '+note]:[])].join('\n');
}
class FilmSequence {
 constructor(canvas,mobile=false){
  this.mobile=mobile;this.disposed=false;this.controller=new AbortController();
  this.stopDefinitions=mobile?MOBILE_FILM_STILLS:FILM_STILLS;
  this.framePath=mobile?'assets/film/frames-mobile/':'assets/film/frames/';
  this.canvas=canvas;this.ctx=canvas.getContext('2d',{alpha:false});
  this.requests=new Map();this.transitionFrames=null;this.blobs=new Map();this.frames=new Map();this.loading=new Set();this.decoding=new Set();this.failed=new Set();
  this.stills=new Map();this.assetsReady=false;
  this.ready=Promise.allSettled(this.stopDefinitions.map(async(still,index)=>{
   const response=await fetch(still.url||'assets/storyboard-v1/'+still.file,{signal:this.controller.signal});
   if(!response.ok)throw Error(response.status);
   this.stills.set(index,await createImageBitmap(await response.blob()));
  })).then(()=>{this.assetsReady=true;this.wake();});
  this.target=this.stopDefinitions[0].time*24;this.position=this.target;this.raf=0;this.last=0;this.paused=false;
  this.resize();this.pump();this.wake();
 }
 destroy(){this.disposed=true;this.controller.abort();cancelAnimationFrame(this.raf);this.frames.forEach(b=>b.close());this.stills.forEach(b=>b.close());}
 resize(){
  const box=this.canvas.getBoundingClientRect(),ratio=Math.min(devicePixelRatio||1,2);
  this.canvas.width=Math.min(Math.round(box.width*ratio),1600);
  this.canvas.height=Math.round(this.canvas.width*box.height/Math.max(1,box.width));
  this.wake();
 }
 setTime(seconds,paused){
  this.target=Math.max(0,Math.min(600,seconds*24));this.paused=paused;
  this.pump();this.wake();
 }
 wake(){if(!this.disposed&&!this.raf)this.raf=requestAnimationFrame(t=>this.render(t));}
 pump(){
  if(this.disposed)return;
  const center=Math.round(this.target);
  // Prioritize the requested frame, then its neighbors; retain compressed frames for reverse scrolling.
  for(let distance=0;distance<=600&&this.loading.size<6;distance++)for(const index of distance?[center+distance,center-distance]:[center]){
   if(index<0||index>600||this.blobs.has(index)||this.loading.has(index)||this.failed.has(index)||this.loading.size>=6)continue;
   this.loading.add(index);
   this.loadFrame(index).then(()=>this.prepare()).catch(()=>this.failed.add(index)).finally(()=>{this.loading.delete(index);this.pump();});
  }
  this.prepare();
 }
 loadFrame(index){
  if(this.blobs.has(index))return Promise.resolve(this.blobs.get(index));
  if(this.requests.has(index))return this.requests.get(index);
  const request=fetch(`${this.framePath}frame-${String(index).padStart(4,'0')}.jpg`,{signal:this.controller.signal}).then(r=>{if(!r.ok)throw Error(r.status);return r.blob();}).then(blob=>{this.blobs.set(index,blob);return blob;}).finally(()=>this.requests.delete(index));
  this.requests.set(index,request);return request;
 }
 async bufferTransition(from,to){
  if(!this.mobile)return;
  const first=Math.round(from*24),last=Math.round(to*24),lo=Math.min(first,last),hi=Math.max(first,last);
  this.transitionStride=Math.max(3,Math.ceil((hi-lo)/72));
  const wanted=new Set([first,last]);for(let i=lo;i<=hi;i+=this.transitionStride)wanted.add(i);
  const pending=[...wanted];this.transitionFrames=wanted;
  await Promise.allSettled(Array.from({length:6},async()=>{while(pending.length&&!this.disposed){const i=pending.shift();if(this.frames.has(i))continue;const blob=await this.loadFrame(i);const bitmap=await createImageBitmap(blob);if(this.disposed){bitmap.close();return;}if(this.frames.has(i))bitmap.close();else this.frames.set(i,bitmap);}}));
 }
 releaseTransition(){this.transitionFrames=null;const keys=[...this.frames.keys()].sort((a,b)=>Math.abs(a-this.target)-Math.abs(b-this.target));for(const key of keys.slice(36)){this.frames.get(key).close();this.frames.delete(key);}this.prepare();}
 frameAt(index){
  if(this.frames.has(index))return this.frames.get(index);
  if(this.transitionFrames)for(let d=1;d<=this.transitionStride;d++){if(this.frames.has(index+d))return this.frames.get(index+d);if(this.frames.has(index-d))return this.frames.get(index-d);}
  return null;
 }
 prepare(){
  const center=Math.round(this.position),target=Math.round(this.target);
  const wanted=new Set();
  for(const base of [target,center])for(const d of [0,1,-1,2,-2,3,-3,4,-4,5,-5,6,-6])if(base+d>=0&&base+d<=600)wanted.add(base+d);
  for(const index of wanted){
   if(this.frames.has(index)||this.decoding.has(index)||!this.blobs.has(index)||this.decoding.size>=4)continue;
   this.decoding.add(index);
   createImageBitmap(this.blobs.get(index)).then(bitmap=>{
    if(this.disposed){bitmap.close();return;}
    this.frames.set(index,bitmap);
    // Bound decoded memory; all compressed frames remain available.
    if(this.frames.size>36&&!this.transitionFrames){const keys=[...this.frames.keys()].sort((a,b)=>Math.min(Math.abs(b-center),Math.abs(b-target))-Math.min(Math.abs(a-center),Math.abs(a-target)));while(this.frames.size>36){const key=keys.shift();this.frames.get(key).close();this.frames.delete(key);}}
    this.wake();
   }).catch(()=>{}).finally(()=>{this.decoding.delete(index);});
  }
 }
 paint(bitmap,alpha=1,alignment=null){
  const w=this.canvas.width,h=this.canvas.height,scale=Math.max(w/bitmap.width,h/bitmap.height);
  const portrait=innerWidth<=760&&innerHeight>innerWidth;
  const focus=this.mobile?.5:(portrait?filmFocus(this.position/24):.5);
  this.ctx.globalAlpha=alpha;this.ctx.imageSmoothingQuality='high';
  if(alignment){
   // Register the detailed source to the exact 854×480 video coordinate space.
   const bw=this.mobile?480:854,bh=this.mobile?854:480;
   const fit=Math.max(w/bw,h/bh);
   this.ctx.save();this.ctx.translate((w-bw*fit)*focus,(h-bh*fit)/2);
   this.ctx.scale(fit,fit);this.ctx.transform(...alignment);
   this.ctx.drawImage(bitmap,0,0,bw,bh);this.ctx.restore();
  }else this.ctx.drawImage(bitmap,(w-bitmap.width*scale)*focus,(h-bitmap.height*scale)/2,bitmap.width*scale,bitmap.height*scale);
 }
 render(now){
  this.raf=0;const dt=this.last?Math.min(50,now-this.last):16;this.last=now;
  if(this.paused)return;
  this.position=this.target;
  this.prepare();
  const a=this.frameAt(Math.round(this.position));
  const mix=filmStillMix(this.position/24,this.stopDefinitions,this.mobile?.3:.8,this.mobile?.04:.15),still=this.stills.get(mix.index);
  // Same clock, crop and canvas for motion and stills: no delayed DOM overlay.
  if(this.assetsReady){
   if(a){
    this.paint(a);
    if(still&&mix.alpha>0)this.paint(still,mix.alpha,this.stopDefinitions[mix.index].align);
    document.body.classList.add('sequence-ready');
    this.lastPaintedTime=this.position/24;document.dispatchEvent(new Event('film:painted'));
   }
  }
  if(Math.abs(this.target-this.position)>.015||this.decoding.size)this.wake();
 }
}

(() => {
 const i18n=window.AtelierI18n;
 const film=document.querySelector('.film-scroll');
 const scrollRange=()=>Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
 const panelOffset=()=>{const height=document.querySelector('.masthead').getBoundingClientRect().height+16;document.documentElement.style.setProperty('--chapter-head',height+'px');return height;};
 const scenes=[...document.querySelectorAll('[data-scene]')];
 const panels=[...document.querySelectorAll('[data-step]')];
 const chapters=[...document.querySelectorAll('[data-chapter]')];
 const positions=[2/25,7/25,14/25,20/25,24/25];
 let timeline=[],panelPoints=[],targetTime=2;
 function measureTimeline(){
  panelPoints=panels.map((panel,i)=>({y:i===0?0:Math.max(0,panel.getBoundingClientRect().top+window.scrollY-panelOffset()),time:mobileQuery.matches?MOBILE_FILM_STILLS[[2,7,14,20,24].indexOf(Number(panel.dataset.time))].time:Number(panel.dataset.time)}));
  timeline=[];
  panelPoints.forEach((point,i)=>{
   timeline.push(point);
   const readingEnd=Math.min(scrollRange(),panels[i].getBoundingClientRect().bottom+scrollY-innerHeight);
   const next=panelPoints[i+1]?.y??scrollRange();
   if(readingEnd>point.y+2&&readingEnd<next)timeline.push({y:readingEnd,time:point.time});
  });
  timeline.push({y:scrollRange(),time:mobileQuery.matches?MOBILE_FILM_STILLS[4].time:24});
 }

 let reduced=false,progress=0,currentScene=-1,frame=0;
 const mobileQuery=matchMedia('(max-width:760px)');
 let sequence=new FilmSequence(document.querySelector('#film-canvas'),mobileQuery.matches);
 mobileQuery.addEventListener('change',()=>{sequence.destroy();document.body.classList.remove('sequence-ready');sequence=new FilmSequence(document.querySelector('#film-canvas'),mobileQuery.matches);timeline=[];schedule();});
 document.body.classList.add('content-reveal-enabled');
 let visiblePanel=-1;
 function syncContent(){
  if(!panelPoints.length)return;
  let active=0;panelPoints.forEach((p,i)=>{if(scrollY>=p.y-2)active=i;});
  const stop=panelPoints[active].time;
  const arrived=!travel&&sequence.assetsReady&&Math.abs(targetTime-stop)<1/48&&Math.abs((sequence.lastPaintedTime??-1)-stop)<1/48;
  const next=arrived?active:-1;
  if(next===visiblePanel)return;
  visiblePanel=next;
  panels.forEach((panel,i)=>{const show=i===next;panel.classList.toggle('content-visible',show);panel.inert=!show;panel.setAttribute('aria-hidden',String(!show));});
 }
 panels.forEach(panel=>{panel.inert=true;panel.setAttribute('aria-hidden','true');});
 document.addEventListener('film:painted',syncContent);
 function updateMotionText(){}
 function applyMotion(){
  document.body.classList.toggle('reduced',reduced);updateMotionText();
  schedule();
 }
 function showScene(index){
  if(index===currentScene)return;currentScene=index;
  scenes.forEach(scene=>{scene.hidden=false;});
  chapters.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));
 }
 function seek(){sequence.setTime(targetTime,reduced);}
 function draw(){
  frame=0;const box=film.getBoundingClientRect();
  if(!timeline.length)measureTimeline();
  targetTime=reduced?2:filmTimelineTime(window.scrollY,timeline);
  progress=targetTime/25;
  document.body.style.setProperty('--landscape-label-opacity',Math.max(0,Math.min(1,(3.2-targetTime)/1.2)));
  document.body.style.setProperty('--landscape-label-shift',(Math.max(0,targetTime-2)*-18)+'px');
  document.body.style.setProperty('--film-progress',progress);
  let index=0;positions.forEach((p,i)=>{if(progress>=p)index=i;});showScene(index);
  document.body.classList.toggle('past-film',box.bottom<=90);
  seek();syncContent();
 }
 function schedule(){if(!frame)frame=requestAnimationFrame(draw);}
 window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',()=>{timeline=[];sequence.resize();schedule();});
 new ResizeObserver(()=>{timeline=[];schedule();}).observe(document.body);
 // A wheel gesture advances one stop. Trackpad momentum cannot skip several sections.
 let travel=0,lastWheel=0,gestureLocked=false,wheelSum=0,journeyRequest=0;
 function stops(){
  const max=scrollRange(),offset=innerWidth<=760?86:100;
  const elements=[...panels,...document.querySelectorAll('main > section:not(.film-scroll),footer')];
  const points=[0,max];
  elements.forEach(el=>{
   if(!el.getClientRects().length)return;
   const top=Math.max(0,Math.min(max,el.getBoundingClientRect().top+scrollY-(el.matches('[data-step]')?panelOffset():offset)));
   points.push(top);
   // Long mobile sections remain fully readable before the next section.
   const end=Math.min(max,el.getBoundingClientRect().bottom+scrollY-innerHeight);
   for(let y=top+innerHeight*.8;y<end;y+=innerHeight*.8)points.push(y);
   if(end>top+innerHeight*.8)points.push(end);
  });
  return points.sort((a,b)=>a-b).filter((p,i,a)=>!i||p-a[i-1]>8);
 }
 async function goToStop(destination){
  const request=++journeyRequest;
  if(!sequence.assetsReady){sequence.ready.then(()=>{if(request===journeyRequest)goToStop(destination);});return;}
  cancelAnimationFrame(travel);
  if(sequence.mobile){
   travel=-1;
   if(!timeline.length)measureTimeline();
   await sequence.bufferTransition(filmTimelineTime(scrollY,timeline),filmTimelineTime(destination,timeline));
   if(request!==journeyRequest){sequence.releaseTransition();return;}
  }
  if(reduced){window.scrollTo({top:destination,behavior:'instant'});travel=0;return;}
  const start=scrollY,distance=destination-start,began=performance.now();
  const duration=Math.max(450,Math.min(1050,Math.abs(distance)*1.05));
  function step(now){
   const t=Math.min(1,(now-began)/duration),ease=t*t*(3-2*t);
   window.scrollTo({top:start+distance*ease,behavior:'instant'});
   if(t<1)travel=requestAnimationFrame(step);else{travel=0;sequence.releaseTransition();schedule();}
  }
  travel=requestAnimationFrame(step);syncContent();
 }
 let endBounce=null,lastBounce=-Infinity;
 function bounceAtEnd(){
  const now=performance.now();if(now-lastBounce<600)return;lastBounce=now;
  if(endBounce)endBounce.cancel();
  endBounce=document.querySelector('#contact').animate([
   {transform:'translateY(0)'},
   {transform:'translateY(-30px)',offset:.32},
   {transform:'translateY(3px)',offset:.74},
   {transform:'translateY(0)'}
  ],{duration:430,easing:'cubic-bezier(.22,.68,.3,1)'});
 }
 document.querySelector('.header-cta').addEventListener('click',event=>{
  event.preventDefault();
  const contact=document.querySelector('#contact');contact.scrollTop=0;
  gestureLocked=false;wheelSum=0;lastWheel=0;
  const destination=Math.max(0,Math.min(scrollRange(),contact.getBoundingClientRect().top+scrollY-panelOffset()));
  goToStop(destination);
 });
 window.addEventListener('wheel',event=>{
  if(event.ctrlKey||Math.abs(event.deltaX)>Math.abs(event.deltaY))return;
  const contact=event.target.closest('#contact');
  const editor=event.target.closest('textarea,[contenteditable]');
  if(editor){
   const canScroll=event.deltaY>0?editor.scrollTop+editor.clientHeight<editor.scrollHeight-2:editor.scrollTop>2;
   if(canScroll)return;
  }
  // Keep native choice lists usable; other form fields must not swallow an end gesture.
  if(event.target.closest('select')===document.activeElement)return;
  if(contact&&contact.scrollHeight>contact.clientHeight+2){
   const canScroll=event.deltaY>0?contact.scrollTop+contact.clientHeight<contact.scrollHeight-2:contact.scrollTop>2;
   if(canScroll)return;
  }
  if(event.deltaY>0&&scrollY>=scrollRange()-8&&!travel){event.preventDefault();bounceAtEnd();return;}
  if(event.target.closest('input,textarea,select,[contenteditable],#mobile-menu,.people-grid'))return;
  const now=performance.now();
  if(now-lastWheel>180&&!travel){gestureLocked=false;wheelSum=0;}
  lastWheel=now;
  event.preventDefault();
  if(travel||gestureLocked)return;
  wheelSum+=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?innerHeight:1);
  if(Math.abs(wheelSum)<12)return;
  gestureLocked=true;
  goToStop(nextScrollStop(scrollY,Math.sign(wheelSum),stops()));
 },{passive:false});
 window.addEventListener('keydown',event=>{
  if(event.target.closest('input,textarea,select,button,a,summary,[contenteditable]')||event.ctrlKey||event.metaKey||event.altKey)return;
  const direction=event.key==='PageDown'?1:event.key==='PageUp'?-1:0;
  if(direction){event.preventDefault();if(direction>0&&scrollY>=scrollRange()-3){bounceAtEnd();return;}if(!travel)goToStop(nextScrollStop(scrollY,direction,stops()));}
  if(event.key==='Escape'){cancelAnimationFrame(travel);travel=0;}
 });
 let touchStartY=null,touchStartX=0,touchOrigin=0,touchTarget=null;
 window.addEventListener('touchstart',event=>{touchStartY=event.touches.length===1?event.touches[0].clientY:null;touchStartX=event.touches[0]?.clientX||0;touchOrigin=scrollY;touchTarget=event.target;},{passive:true});
 window.addEventListener('touchend',event=>{
  if(touchStartY===null||!event.changedTouches.length)return;
  const distance=touchStartY-event.changedTouches[0].clientY;touchStartY=null;
  const contact=document.querySelector('#contact');
  if(distance>35&&scrollY>=scrollRange()-3&&contact.scrollTop+contact.clientHeight>=contact.scrollHeight-3){bounceAtEnd();return;}
  if(!mobileQuery.matches||Math.abs(distance)<40||Math.abs(event.changedTouches[0].clientX-touchStartX)>Math.abs(distance)||touchTarget.closest('input,textarea,select,button,a,summary,.value-metrics,.value-features,#contact'))return;
  goToStop(nextScrollStop(touchOrigin,Math.sign(distance),stops()));
 },{passive:true});
 // Touch and scrollbar dragging stay native and can interrupt a transition.
 window.addEventListener('pointerdown',()=>{journeyRequest++;cancelAnimationFrame(travel);travel=0;sequence.releaseTransition();},{passive:true});

 chapters.forEach((button,i)=>button.addEventListener('click',()=>{
  if(!timeline.length)measureTimeline();goToStop(timeline[i===0?0:2*i-1]?.y||0);
 }));
 applyMotion();
 const contactForm=document.querySelector('#contact-form');
 function contactMessage(){
  const project=contactForm.querySelector('[name="project"]:checked').value;
  const horizon=document.querySelector('#timeline').value;
  const t=key=>key===undefined?i18n.t('choose'):i18n.t(key);
  return buildContactMessage(t,project,horizon,document.querySelector('#note').value.trim().slice(0,1200),document.querySelector('#budget').value);
 }
 function updateContactState(){
  const investing=contactForm.querySelector('[name="project"]:checked').value==='invest';
  document.querySelector('#budget-field').hidden=!investing;
  const budget=document.querySelector('#budget');budget.disabled=!investing;budget.required=investing;
  document.querySelector('#form-status').replaceChildren();
 }
 contactForm.addEventListener('input',updateContactState);
 contactForm.addEventListener('change',updateContactState);
 contactForm.addEventListener('submit',event=>{
  event.preventDefault();if(!contactForm.reportValidity())return;
  const url='https://wa.me/33681108147?text='+encodeURIComponent(contactMessage());
  const fallback=document.createElement('a');fallback.href=url;fallback.target='_blank';fallback.rel='noopener noreferrer';fallback.textContent=i18n.t('blocked');
  document.querySelector('#form-status').replaceChildren(fallback);
  window.open(url,'_blank','noopener,noreferrer');
 });
 updateContactState();
 window.addEventListener('atelier:language',()=>{timeline=[];updateMotionText();updateContactState();schedule();});
})();
