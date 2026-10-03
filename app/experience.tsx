'use client';
import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { Sprout } from 'lucide-react';
import 'lenis/dist/lenis.css';

export function Experience({ menuOpen }: { menuOpen: boolean }) {
  const scroll = useRef<Lenis | null>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // A single scroll clock: native touch, responsive mouse-wheel interpolation.
    const lenis = new Lenis({ autoRaf: true, lerp: 0.045, smoothWheel: true, syncTouch: false,
      wheelMultiplier: 0.65, anchors: { offset: -105 }, stopInertiaOnNavigate: true });
    scroll.current = lenis;
    const top = () => lenis.scrollTo(0, { duration: 0.7 });
    window.addEventListener('pragmatic:top', top);
    return () => { window.removeEventListener('pragmatic:top', top); lenis.destroy(); scroll.current = null; };
  }, []);

  useEffect(() => { if (menuOpen || loading) scroll.current?.stop(); else scroll.current?.start(); }, [menuOpen, loading]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    const exitTimer = setTimeout(() => setDismissed(true), 1850);
    return () => { clearTimeout(timer); clearTimeout(exitTimer); };
  }, []);

  useEffect(() => {
    const allowed = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let frame = 0;
    let x = 0, y = 0;
    const hide = () => { cursor.current?.classList.remove('cursor-visible'); document.documentElement.classList.remove('custom-cursor-active'); };
    const move = (e: PointerEvent) => {
      if (!allowed.matches || e.pointerType !== 'mouse') { hide(); return; }
      x = e.clientX; y = e.clientY;
      const interactive = (e.target as Element).closest('a,button,input,textarea,select,[role="button"]');
      cursor.current?.classList.toggle('cursor-link', Boolean(interactive));
      if (!frame) frame = requestAnimationFrame(() => {
        if (cursor.current) {
          cursor.current.style.transform = `translate3d(${x}px,${y}px,0)`;
          cursor.current.classList.add('cursor-visible');
          document.documentElement.classList.add('custom-cursor-active');
        }
        frame = 0;
      });
    };
    const key = (e: KeyboardEvent) => { if (e.key === 'Tab') hide(); };
    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', hide);
    window.addEventListener('blur', hide);
    document.addEventListener('keydown', key);
    allowed.addEventListener('change', hide);
    return () => {
      cancelAnimationFrame(frame); hide();
      document.removeEventListener('pointermove', move); document.removeEventListener('pointerleave', hide);
      window.removeEventListener('blur', hide); document.removeEventListener('keydown', key); allowed.removeEventListener('change', hide);
    };
  }, []);

  return <>
    {!dismissed && <div className={'preloader ' + (!loading ? 'preloader-exit' : '')} aria-hidden="true">
      <div className="loader-brand"><img src="/images/logo.png" alt="" width="240" height="106" /></div>
      <div className="loader-seed"><span className="loader-orbit"/><Sprout size={36} strokeWidth={1.25}/></div>
      <p>Good science.<br/><em>Rooted in real life.</em></p>
      <span className="loader-line"/><span className="loader-caption">Preparing your next chapter of wellbeing</span>
    </div>}
    <div ref={cursor} className="custom-cursor" aria-hidden="true"><span className="cursor-ring"/><span className="cursor-dot"/></div>
  </>;
}
