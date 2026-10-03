'use client';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export function CustomCursor(){
 const cursor=useRef<HTMLDivElement>(null);
 const [host,setHost]=useState<HTMLElement|null>(null);
 useEffect(()=>{
  const allowed=matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
  let frame=0;
  let x=0,y=0,targetX=0,targetY=0;
  let started=false;
  const hide=()=>{cancelAnimationFrame(frame);frame=0;started=false;cursor.current?.classList.remove('cursor-visible')};
  const follow=()=>{
   x+=(targetX-x)*.18;y+=(targetY-y)*.18;
   if(cursor.current){cursor.current.style.transform=`translate3d(${x}px,${y}px,0)`;cursor.current.classList.add('cursor-visible')}
   if(Math.abs(targetX-x)+Math.abs(targetY-y)>.1)frame=requestAnimationFrame(follow);
   else frame=0;
  };
  const move=(event:PointerEvent)=>{
   if(!allowed.matches||event.pointerType!=='mouse'){hide();return}
   const target=event.target as Element;
   setHost(target.closest<HTMLDialogElement>('dialog[open]'));
   targetX=event.clientX;targetY=event.clientY;
   if(!started){x=targetX;y=targetY;started=true}
   if(cursor.current)cursor.current.classList.toggle('cursor-link',Boolean(target.closest('a,button,select,summary,[role="button"]')));
   if(!frame)frame=requestAnimationFrame(()=>{
    follow();
   });
  };
  const pulse=(event:PointerEvent)=>{
   if(!allowed.matches||event.pointerType!=='mouse'||event.button!==0)return;
   const element=cursor.current?.querySelector<HTMLElement>('.cursor-pulse');
   if(!element)return;
   element.getAnimations().forEach(animation=>animation.cancel());
   element.animate([
    {transform:'translate(-50%,-50%) scale(.7)',opacity:.6},
    {transform:'translate(-50%,-50%) scale(1.8)',opacity:0}
   ],{duration:420,easing:'cubic-bezier(.2,.7,.3,1)'});
  };
  const key=(event:KeyboardEvent)=>{if(event.key==='Tab')hide()};
  document.addEventListener('pointermove',move,{passive:true});
  document.addEventListener('pointerdown',pulse,{passive:true});
  document.addEventListener('pointerleave',hide);
  document.addEventListener('keydown',key);
  window.addEventListener('blur',hide);
  allowed.addEventListener('change',hide);
  return()=>{cancelAnimationFrame(frame);document.removeEventListener('pointermove',move);document.removeEventListener('pointerdown',pulse);document.removeEventListener('pointerleave',hide);document.removeEventListener('keydown',key);window.removeEventListener('blur',hide);allowed.removeEventListener('change',hide)};
 },[]);
 const visual=<div ref={cursor} className="custom-cursor" aria-hidden="true"><span className="cursor-ring"/><span className="cursor-dot"/><span className="cursor-pulse"/></div>;
 return host?createPortal(visual,host):visual;
}
