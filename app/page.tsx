import Link from 'next/link';
import { ArrowRight, Crown } from 'lucide-react';
import { products } from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-gold/20 bg-gradient-to-br from-pearl via-desert to-pearl text-coffee">
        <div className="absolute inset-0 grain opacity-25" />
        <div className="absolute -right-28 top-10 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />

        <div className="relative z-10 mx-auto flex min-h-[520px] max-w-7xl flex-col justify-center px-4 py-16">
          <div className="max-w-4xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/50 px-4 py-2 text-xs uppercase tracking-[.22em] text-oldgold"><Crown size={16} /> Dubai em Essence</p>
            <h1 className="font-serif text-5xl leading-tight md:text-7xl">Fragrâncias <span className="gold-text">exclusivas</span> com elegância.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-coffee/70">Curadoria de perfumes originais selecionados do Instagram da Dubai em Essence, com compra rápida pelo WhatsApp.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="btn-gold rounded-full px-7 py-4 transition" href="/loja">Ver loja <ArrowRight className="inline" size={18} /></Link>
              <Link className="rounded-full border border-gold/45 bg-white/45 px-7 py-4 font-semibold text-oldgold" href="https://wa.me/5541997095511">WhatsApp</Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-coffee/65">
              <span className="rounded-full border border-gold/25 bg-white/35 px-4 py-2">Perfumes originais</span>
              <span className="rounded-full border border-gold/25 bg-white/35 px-4 py-2">Atendimento direto</span>
              <span className="rounded-full border border-gold/25 bg-white/35 px-4 py-2">São José dos Pinhais</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[.24em] text-oldgold">Dubai em Essence</p>
          <h2 className="font-serif text-4xl text-coffee">Fragrâncias</h2>
          <p className="mt-2 text-coffee/65">Todos os perfumes disponíveis em uma única vitrine.</p>
        </div>

        <div className="grid grid-cols-3 gap-3 lg:gap-5 2xl:grid-cols-4">
          {products.map((product) => <ProductCard key={product.slug} product={product} />)}
        </div>
      </section>
    </>
  );
}
