import type { Metadata } from 'next';
import './globals.css';
import { PagePreloader } from './preloader';
import { CustomCursor } from './custom-cursor';
export const metadata: Metadata = {title:'Pragmatic Nutrition | Nutrition for the life you live',description:'Personalised gut health and sports nutrition with Meenu Balaji, M.H.Sc Food Science & Nutrition. Practical, evidence-based support for everyday life.',icons:{icon:'/images/logo.png'}};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body><PagePreloader/>{children}<CustomCursor/></body></html>}
