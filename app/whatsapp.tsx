'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';

export function WhatsAppWidget(){
 const [open,setOpen]=useState(false);
 const [topic,setTopic]=useState('Gut health');
 const root=useRef<HTMLDivElement>(null);
 const toggle=useRef<HTMLButtonElement>(null);
 const closeButton=useRef<HTMLButtonElement>(null);
 const close=()=>{setOpen(false);toggle.current?.focus()};
 useEffect(()=>{if(!open)return;closeButton.current?.focus();const outside=(event:PointerEvent)=>{if(root.current&&!root.current.contains(event.target as Node))setOpen(false)};const escape=(event:KeyboardEvent)=>{if(event.key==='Escape'){setOpen(false);toggle.current?.focus()}};document.addEventListener('pointerdown',outside);document.addEventListener('keydown',escape);return()=>{document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',escape)}},[open]);
 const message="Hi Meenu, I'd like to learn more about "+topic.toLowerCase()+" at Pragmatic Nutrition.";
 return <div className="whatsapp-widget" ref={root}>
 {open&&<div className="whatsapp-panel" id="nutrition-chat" role="dialog" aria-labelledby="nutrition-chat-title">
 <div className="whatsapp-panel-header"><span className="whatsapp-panel-logo"><img src="/images/logo.png" alt="Pragmatic Nutrition" width="2400" height="1063"/></span><button className="whatsapp-close" ref={closeButton} onClick={close} aria-label="Close nutrition chat"><X size={18}/></button></div>
 <div className="whatsapp-panel-body"><h2 id="nutrition-chat-title">Let’s talk <em>nutrition.</em></h2><p>A question about your health or finding the right plan? Start a conversation with Meenu.</p><fieldset><legend>What would you like help with?</legend><div className="whatsapp-topics">{['Gut health','Sports nutrition','General enquiry'].map(option=><label key={option}><input type="radio" name="nutrition-chat-topic" value={option} checked={topic===option} onChange={()=>setTopic(option)}/><span>{option}</span></label>)}</div></fieldset><a className="pill whatsapp-start" href={'https://wa.me/919790425908?text='+encodeURIComponent(message)} target="_blank" rel="noopener noreferrer">Continue on WhatsApp<ArrowUpRight size={16}/></a><span className="whatsapp-chat-note">Opens WhatsApp with your enquiry ready to send.</span></div>
 </div>}
 <button className="whatsapp circle" ref={toggle} onClick={()=>setOpen(v=>!v)} aria-label={open?'Close nutrition chat':'Open nutrition chat'} aria-expanded={open} aria-controls="nutrition-chat">{open?<X size={24}/>:<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.9 11.9 0 0 0 12.05 0C5.46 0 .1 5.36.1 11.95c0 2.1.55 4.15 1.6 5.96L0 24l6.24-1.64a11.96 11.96 0 0 0 5.81 1.48h.01C18.64 23.84 24 18.48 24 11.9c0-3.18-1.24-6.16-3.48-8.42ZM12.06 21.82a9.91 9.91 0 0 1-5.05-1.38l-.36-.21-3.7.97.99-3.6-.24-.37a9.92 9.92 0 0 1-1.52-5.28c0-5.48 4.46-9.94 9.95-9.94a9.87 9.87 0 0 1 7.03 2.91 9.87 9.87 0 0 1 2.91 7.03c0 5.48-4.47 9.94-9.95 9.94Zm5.45-7.44c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.18.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.06-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.08-.12-.28-.2-.58-.35Z"/></svg>}</button>
 </div>;
}
