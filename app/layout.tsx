import './globals.css';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
export const metadata: Metadata = { title: { default:'Dubai em Essence | Perfumes Árabes Premium', template:'%s | Dubai em Essence' }, description:'Loja premium de perfumes árabes originais em São José dos Pinhais. Fragrâncias exclusivas e marcantes.', icons:{ icon:'/logo.png' }, openGraph:{ title:'Dubai em Essence', description:'Perfumes árabes originais com elegância e sofisticação.', images:[{ url:'/og-image.png', width:1200, height:630, alt:'Dubai em Essence — Perfumes Árabes' }] } };
export default function RootLayout({children}:{children:React.ReactNode}){ return <html lang="pt-BR"><body><Header/><main>{children}</main><Footer/></body></html> }
