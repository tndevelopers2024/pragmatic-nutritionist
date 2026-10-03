'use client';
import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
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

  useEffect(() => { if (menuOpen) scroll.current?.stop(); else scroll.current?.start(); }, [menuOpen]);

  useEffect(() => {
    let active = true;
    let timer: ReturnType<typeof setTimeout>;
    let exitTimer: ReturnType<typeof setTimeout>;
    const finish = () => {
      if (!active) return;
      setLoading(false);
      try { sessionStorage.setItem('pragmatic:visited', '1'); } catch { /* Storage is optional. */ }
      exitTimer = setTimeout(() => { if (active) setDismissed(true); }, 450);
    };
    let visited = false;
    try { visited = sessionStorage.getItem('pragmatic:visited') === '1'; } catch { /* Private browsing fallback. */ }
    if (visited || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLoading(false); setDismissed(true);
    } else {
      const start = performance.now();
      const hero = document.querySelector<HTMLImageElement>('.hero-image');
      const ready = hero?.decode().catch(() => undefined) ?? Promise.resolve();
      // Never hold the page hostage to a slow image or network request.
      timer = setTimeout(finish, 1800);
      ready.then(() => {
        if (!active) return;
        clearTimeout(timer);
        timer = setTimeout(finish, Math.max(0, 380 - (performance.now() - start)));
      });
    }
    return () => { active = false; clearTimeout(timer); clearTimeout(exitTimer); };
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
      <img src="/images/logo.png" alt="" width="180" height="73" />
      <p>Good science. <em>Real life.</em></p><span className="loader-line" />
    </div>}
    <div ref={cursor} className="custom-cursor" aria-hidden="true"><span className="cursor-ring"/><span className="cursor-dot"/></div>
  </>;
}
