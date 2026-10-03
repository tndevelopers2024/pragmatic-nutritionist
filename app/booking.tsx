'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, Sprout, X } from 'lucide-react';

export function BookingModal({onClose}:{onClose:()=>void}){
 const dialog=useRef<HTMLDialogElement>(null);
 const [enquiry,setEnquiry]=useState('');
 const [details,setDetails]=useState({name:'',email:'',phone:'',support:'',goals:''});
 useEffect(()=>{
  const previous=document.activeElement as HTMLElement|null;
  const overflow=document.body.style.overflow;
  document.body.style.overflow='hidden';
  dialog.current?.showModal();
  return()=>{document.body.style.overflow=overflow;previous?.focus()};
 },[]);
 return <dialog ref={dialog} className="booking-modal" aria-labelledby="booking-title" onCancel={onClose} onClick={event=>{if(event.target===event.currentTarget)onClose()}} data-lenis-prevent>
 <div className="booking-layout">
  <aside className="booking-story"><img src="/images/gut-hero-premium.webp" alt=""/><div className="booking-story-copy"><Sprout size={32} strokeWidth={1.3}/><p>A healthier chapter<br/>starts with <em>you.</em></p><span>Real food. Practical guidance.<br/>Care built around your life.</span></div></aside>
  <div className="booking-content"><button className="booking-close circle" onClick={onClose} aria-label="Close booking form"><X size={20}/></button><img className="booking-logo" src="/images/logo.png" alt="Pragmatic Nutrition"/>
  {enquiry?<div className="booking-review"><span className="booking-check"><Check size={24}/></span><h2 id="booking-title">Your next step,<br/><em>made simple.</em></h2><p>Your enquiry is ready. Review it below, then share it with Meenu on WhatsApp to discuss availability.</p><pre>{enquiry}</pre><a className="pill" href={'https://wa.me/919790425908?text='+encodeURIComponent(enquiry)} target="_blank" rel="noopener noreferrer">Continue on WhatsApp<ArrowUpRight size={17}/></a><button className="booking-edit" onClick={()=>setEnquiry('')}>Edit my details</button></div>:<><h2 id="booking-title">Let’s find your<br/><em>starting point.</em></h2><p className="booking-description">Tell us a little about yourself and the support you’re looking for.</p>
  <form onSubmit={event=>{event.preventDefault();const data=new FormData(event.currentTarget);setDetails({name:String(data.get('name')),email:String(data.get('email')),phone:String(data.get('phone')),support:String(data.get('support')),goals:String(data.get('goals'))});setEnquiry(`Hi Meenu, I'd like to enquire about a nutrition consultation.\n\nName: ${String(data.get('name')).trim()}\nEmail: ${String(data.get('email')).trim()}\nPhone: ${String(data.get('phone')).trim()||'Not provided'}\nSupport: ${data.get('support')}\nGoals: ${String(data.get('goals')).trim()||'I would like to discuss these with you.'}`)}}>
   <div className="booking-fields"><label>Full name<input name="name" defaultValue={details.name} autoComplete="name" placeholder="Your name" required maxLength={100}/></label><label>Email address<input name="email" defaultValue={details.email} type="email" autoComplete="email" placeholder="you@example.com" required maxLength={150}/></label><label><div>Phone <span>(optional)</span></div><input name="phone" defaultValue={details.phone} type="tel" autoComplete="tel" placeholder="Include country code" maxLength={30}/></label><label>I’m looking for<select name="support" defaultValue={details.support} required><option value="" disabled>Select your focus</option><option>Gut health</option><option>Sports nutrition</option><option>Child nutrition</option><option>General nutrition guidance</option></select></label><label className="booking-goals"><div>What would you like help with? <span>(optional)</span></div><textarea name="goals" defaultValue={details.goals} placeholder="Share your goals or questions…" rows={3} maxLength={1000}/></label></div>
   <button className="pill booking-submit" type="submit">Review my enquiry<ArrowUpRight size={17}/></button><p className="booking-note">Review your details before sharing on WhatsApp. Your appointment is confirmed directly with Meenu.</p>
  </form></>}
  </div>
 </div></dialog>;
}
