const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const source=fs.readFileSync('atelier.js','utf8');
const progress=vm.runInNewContext(source.slice(0,source.indexOf('(() =>'))+';filmScrollProgress');
assert.deepEqual([0,2500,5000,2500,0].map(y=>progress(y,6000,1000)*25),[0,12.5,25,12.5,0]);
assert.equal(progress(-100,6000,1000),0);
assert.equal(progress(7000,6000,1000),1);
assert.equal(progress(0,500,1000),0);
console.log('Scroll forward, reverse and boundary checks passed.');
const timeline=vm.runInNewContext(source.slice(0,source.indexOf('(() =>'))+';filmTimelineTime');
const points=[{y:0,time:0},{y:1000,time:6.25},{y:2000,time:12.25},{y:3000,time:18.5},{y:4000,time:23.25},{y:8000,time:25}];
assert.deepEqual([0,1000,2000,1000,0].map(y=>timeline(y,points)),[0,6.25,12.25,6.25,0]);
assert.equal(timeline(1500,points),9.25);
assert.equal(timeline(6000,points),24.125);
assert.equal(timeline(9000,points),25);
console.log('Section timeline anchors, interpolation and reverse passed.');
const nextStop=vm.runInNewContext(source.slice(0,source.indexOf('(() =>'))+';nextScrollStop');
assert.equal(nextStop(0,1,[0,800,1600]),800);
assert.equal(nextStop(800,1,[0,800,1600]),1600);
assert.equal(nextStop(1600,-1,[0,800,1600]),800);
assert.equal(nextStop(800,-1,[0,800,1600]),0);
assert.equal(nextStop(0,-1,[0,800,1600]),0);
assert.equal(nextStop(1600,1,[0,800,1600]),1600);
assert.equal(nextStop(400,-1,[0,800,1600]),0);
console.log('Section navigation: forward, reverse, mid-section and boundaries passed.');
const focus=vm.runInNewContext(source.slice(0,source.indexOf('(() =>'))+';filmFocus');
assert.equal(focus(7),.66);assert.equal(focus(14),.65);assert.equal(focus(24),.5);
for(let t=0;t<=25;t+=.05){assert.ok(focus(t)>=.5&&focus(t)<=.66);assert.ok(Math.abs(focus(t+.05)-focus(t))<.01);}
for(const [w,h] of [[320,568],[390,844],[430,932],[740,360]]){
 const canvasH=h>w?h*.7:h,scale=Math.max(w/854,canvasH/480);
 for(const t of [2,7,14,20,24]){
  const x=(w-854*scale)*focus(t);
  assert.ok(x<=.001&&x+854*scale>=w-.001,'No exposed image edge');
 }
}
console.log('Mobile focal points, smooth interpolation and crop coverage passed.');
const stillMix=vm.runInNewContext(source.slice(0,source.indexOf('(() =>'))+';filmStillMix');
for(const time of [2,7,14,20,24]){
 assert.equal(stillMix(time).alpha,1);
 assert.equal(stillMix(time-.1).alpha,1);
 assert.equal(stillMix(time+.1).alpha,1);
 assert.ok(stillMix(time-.5).alpha>0&&stillMix(time-.5).alpha<1);
 assert.ok(Math.abs(stillMix(time-.5).alpha-stillMix(time+.5).alpha)<1e-12);
 assert.equal(stillMix(time+1).alpha,0);
}
console.log('All five sharp stops: full before arrival, continuous symmetric transitions passed.');
const held=[{y:0,time:2},{y:1000,time:7},{y:2000,time:7},{y:3000,time:14},{y:4000,time:14},{y:5000,time:20},{y:6000,time:20},{y:7000,time:24},{y:8000,time:24}];
for(const [start,end,time] of [[1000,2000,7],[3000,4000,14],[5000,6000,20],[7000,8000,24]]){
 for(const y of [start,start+250,start+750,end])assert.equal(timeline(y,held),time);
}
console.log('Four explanatory screens hold the exact sharp frame in both scroll directions.');
const mobileStops=vm.runInNewContext(source.slice(0,source.indexOf('(() =>'))+';MOBILE_FILM_STILLS');
const mobileMix=vm.runInNewContext(source.slice(0,source.indexOf('(() =>'))+';filmStillMix');
for(const stop of mobileStops){assert.equal(mobileMix(stop.time,mobileStops,.3,.04).alpha,1);assert.equal(mobileMix(stop.time+.31,mobileStops,.3,.04).alpha,0);for(let d=0;d<.3;d+=.01)assert.ok(Math.abs(mobileMix(stop.time+d,mobileStops,.3,.04).alpha-mobileMix(stop.time-d,mobileStops,.3,.04).alpha)<1e-10);}
console.log('Mobile registered stops: full detail on arrival, symmetric forward/reverse blend.');
