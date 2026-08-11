import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, ShieldCheck, Truck, Gem } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-gold/25 bg-desert/45 text-coffee">
      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-8 md:grid-cols-3">
        <div className="flex gap-3"><Gem className="text-gold" /><div><b>Curadoria premium</b><p className="text-sm text-coffee/65">Fragrâncias originais e marcantes.</p></div></div>
        <div className="flex gap-3"><Truck className="text-gold" /><div><b>Atendimento regional</b><p className="text-sm text-coffee/65">SJP / CWB / Itapoá SC.</p></div></div>
        <div className="flex gap-3"><ShieldCheck className="text-gold" /><div><b>Compra segura</b><p className="text-sm text-coffee/65">Conversão direta pelo WhatsApp oficial.</p></div></div>
      </section>
      <div className="border-y border-gold/20 bg-pearl/60">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-4">
          <div><Image src="/logo.png" alt="Dubai Essence" width={96} height={96} className="rounded-full" /><p className="mt-4 text-sm text-coffee/65">Fragrâncias exclusivas e marcantes.</p></div>
          <div><h3 className="mb-3 font-serif text-lg text-oldgold">Loja</h3><Link className="block py-1 text-sm text-coffee/65" href="/loja">Todos os perfumes</Link><Link className="block py-1 text-sm text-coffee/65" href="/marcas">Marcas</Link><Link className="block py-1 text-sm text-coffee/65" href="/favoritos">Favoritos</Link><Link className="block py-1 text-sm text-coffee/65" href="/pedidos">Pedidos</Link></div>
          <div><h3 className="mb-3 font-serif text-lg text-oldgold">Institucional</h3>{[['Sobre', '/sobre'], ['Contato', '/contato'], ['FAQ', '/faq'], ['Privacidade', '/politica-de-privacidade'], ['Trocas', '/politica-de-troca'], ['Termos', '/termos-de-uso']].map((x) => <Link key={x[1]} className="block py-1 text-sm text-coffee/65" href={x[1]}>{x[0]}</Link>)}</div>
          <div><h3 className="mb-3 font-serif text-lg text-oldgold">Contato</h3><a className="mb-2 flex gap-2 text-sm text-coffee/75" href="https://wa.me/5541997095511"><MessageCircle size={18} /> (41) 99709-5511</a><a className="flex gap-2 text-sm text-coffee/75" href="https://www.instagram.com/dubaiemessence/"><span className="text-gold">◎</span> @dubaiemessence</a><p className="mt-4 text-xs text-coffee/45">Sem e-mail informado.</p></div>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 px-4 py-5 text-xs text-coffee/50 md:flex-row"><p>© 2026 Dubai Essence. Todos os direitos reservados.</p><p>Projeto autoral de e-commerce premium.</p></div>
    </footer>
  );
}
