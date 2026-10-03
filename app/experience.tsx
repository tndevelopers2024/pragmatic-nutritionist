'use client';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

export function Experience({ menuOpen }: { menuOpen: boolean }) {
  const scroll = useRef<Lenis | null>(null);

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

  return null;
}
