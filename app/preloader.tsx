'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Sprout } from 'lucide-react';

export function PagePreloader(){
 const pathname=usePathname();
 return <RoutePreloader key={pathname} duration={pathname==='/'?1500:2000}/>;
}
function RoutePreloader({duration}:{duration:number}){
 const [loading,setLoading]=useState(true);
 const [dismissed,setDismissed]=useState(false);
 useEffect(()=>{
  const timer=window.setTimeout(()=>setLoading(false),duration);
  const exitTimer=window.setTimeout(()=>setDismissed(true),duration+350);
  return()=>{window.clearTimeout(timer);window.clearTimeout(exitTimer)};
 },[duration]);
 if(dismissed)return null;
 return <div className={'preloader '+(!loading?'preloader-exit':'')} style={{'--loader-duration':duration+'ms'} as React.CSSProperties} aria-hidden="true" data-lenis-prevent>
  <div className="loader-brand"><img src="/images/logo.png" alt="" width="240" height="106"/></div>
  <div className="loader-seed"><span className="loader-orbit"/><Sprout size={36} strokeWidth={1.25}/></div>
  <p>Good science.<br/><em>Rooted in real life.</em></p>
  <span className="loader-line"/><span className="loader-caption">Preparing your next chapter of wellbeing</span>
 </div>;
}
