import './globals.css';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
export const metadata: Metadata = { title: { default:'Dubai Essence | Perfumes Árabes Premium', template:'%s | Dubai Essence' }, description:'Loja premium de perfumes árabes originais. Fragrâncias exclusivas e marcantes em SJP, CWB e Itapoá SC.', icons:{ icon:'/logo.png' }, openGraph:{ title:'Dubai Essence', description:'Perfumes árabes originais com elegância e sofisticação.', images:['/logo.png'] } };
export default function RootLayout({children}:{children:React.ReactNode}){ return <html lang="pt-BR"><body><Header/><main>{children}</main><Footer/></body></html> }
