import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'Pragmatic Nutrition | Nutrition for the life you live',description:'Personalised gut health and sports nutrition with Meenu Balaji, M.H.Sc Food Science & Nutrition. Practical, evidence-based support for everyday life.',icons:{icon:'/images/logo.jpg'}};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body>{children}</body></html>}
