import cv2,json,numpy as np
from pathlib import Path
root=Path('assets');sift=cv2.SIFT_create(nfeatures=3000);bf=cv2.BFMatcher()
results=[]
for name,lo,hi in [('01-georgie',24,60),('02-entreprise',150,190),('03-banque',290,340),('04-chantier',468,516),('05-reseau',560,599)]:
 im=cv2.imread(str(root/'storyboard-mobile-v1'/f'{name}.png'));im=cv2.resize(im,(480,854));kp,des=sift.detectAndCompute(cv2.cvtColor(im,cv2.COLOR_BGR2GRAY),None);best=None
 for n in range(lo,hi+1,2):
  f=cv2.imread(str(root/'film/frames-mobile'/f'frame-{n:04}.jpg'));k,d=sift.detectAndCompute(cv2.cvtColor(f,cv2.COLOR_BGR2GRAY),None)
  pairs=bf.knnMatch(des,d,k=2);good=[a for a,b in pairs if a.distance<.7*b.distance]
  if len(good)<6:continue
  src=np.float32([kp[m.queryIdx].pt for m in good]);dst=np.float32([k[m.trainIdx].pt for m in good]);M,mask=cv2.estimateAffine2D(src,dst,method=cv2.RANSAC,ransacReprojThreshold=2)
  if M is None:continue
  count=int(mask.sum());err=float(np.median(np.linalg.norm(cv2.transform(src[None],M)[0][mask[:,0]>0]-dst[mask[:,0]>0],axis=1)))
  if best is None or count>best['inliers']:best={'name':name,'frame':n,'time':n/24,'inliers':count,'error':err,'matrix':M.tolist()}
 results.append(best)
print(json.dumps(results,indent=2));Path('tests/mobile-alignment-candidates.json').write_text(json.dumps(results,indent=2))
