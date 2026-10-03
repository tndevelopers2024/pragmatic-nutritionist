import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Sprout, Salad } from 'lucide-react';

export default function NotFound() {
  return <div className="lost-page">
    <header className="lost-header"><Link href="/" aria-label="Pragmatic Nutrition home"><img src="/images/logo.png" alt="Pragmatic Nutrition" width="2400" height="1063"/></Link><Link href="/">Back to home <ArrowUpRight size={16}/></Link></header>
    <main className="lost-main">
      <div className="lost-art" aria-hidden="true"><span className="lost-four">4</span><div className="lost-zero"><div className="lost-orbit"/><span className="lost-sprout"><Sprout size={28} strokeWidth={1.3}/></span><Salad className="lost-bowl" size={80} strokeWidth={1}/><span className="lost-leaf"/></div><span className="lost-four">4</span></div>
      <div className="lost-copy"><span className="lost-code">404 · Page not found</span><h1>A little off<br/>the <em>beaten path.</em></h1><p>This page has moved or doesn’t exist.<br/>Let’s find your way back to something nourishing.</p><Link className="pill lost-home" href="/">Take me home <ArrowRight size={17}/></Link></div>
      <nav className="lost-options" aria-label="Explore the homepage"><Link href="/#gut"><span>01</span>Gut health<ArrowUpRight size={16}/></Link><Link href="/#sports"><span>02</span>Sports nutrition<ArrowUpRight size={16}/></Link><Link href="/#contact"><span>03</span>Let’s talk<ArrowUpRight size={16}/></Link></nav>
    </main>
    <footer className="lost-footer"><span>Pragmatic Nutrition</span><span>Good science. Real food. Your life.</span></footer>
  </div>;
}
