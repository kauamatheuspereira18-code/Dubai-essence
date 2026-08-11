import Link from 'next/link';
import { products, brands } from '@/lib/products';
import { searchProductsAll } from '@/lib/search';
import { ProductCard } from '@/components/ProductCard';
import { MessageCircle, SlidersHorizontal } from 'lucide-react';

export const metadata = { title: 'Loja' };

export default async function Loja({ searchParams }: { searchParams?: Promise<{ genero?: string; marca?: string; tag?: string; busca?: string; tipo?: string }> }) {
  const sp = await searchParams;
  let list = products;
  if (sp?.genero) list = list.filter((p) => p.gender === sp.genero);
  if (sp?.marca) list = list.filter((p) => p.brand === sp.marca);
  if (sp?.tag) list = list.filter((p) => p.tags.includes(sp.tag!));
  if (sp?.tipo === 'lancamentos') list = list.filter((p) => p.launch === true);
  if (sp?.tipo === 'mais-vendidos') list = list.filter((p) => p.bestSeller === true);
  if (sp?.tipo === 'destaques') list = list.filter((p) => p.featured === true || p.bestSeller === true || p.launch === true);
  if (sp?.busca) list = searchProductsAll(list, sp.busca);

  const active = sp?.genero || sp?.marca || sp?.tag || sp?.busca || sp?.tipo;
  const tags = ['Árabe', 'Designer', 'Gourmand', 'Masculino', 'Feminino'];

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex flex-col justify-between gap-4 border-b border-gold/20 pb-6 md:flex-row md:items-end">
        <div>
          <p className="text-xs uppercase tracking-[.24em] text-oldgold">Dubai Essence</p>
          <h1 className="font-serif text-4xl text-coffee md:text-5xl">Loja</h1>
          <p className="mt-2 max-w-2xl text-coffee/65">Escolha seu perfume e compre direto pelo WhatsApp.</p>
        </div>
        <a href="https://wa.me/5541997095511?text=Olá! Vim pelo site da Dubai Essence e quero uma indicação de perfume." className="inline-flex w-fit items-center rounded-full border border-gold/35 px-5 py-3 text-sm font-semibold text-oldgold hover:bg-gold/10">
          <MessageCircle className="mr-2" size={16} /> Pedir indicação
        </a>
      </div>

      <div className="mb-8 grid gap-4 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit rounded-[1.6rem] border border-gold/25 bg-pearl p-5 shadow-sm lg:sticky lg:top-28">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-serif text-2xl text-coffee"><SlidersHorizontal size={20} className="text-oldgold" /> Filtros</h2>
            {active && <Link href="/loja" className="text-sm font-semibold text-oldgold">Limpar</Link>}
          </div>
          <Filter title="Gênero" items={['Masculino', 'Feminino', 'Unissex'].map((g) => ({ label: g, href: `/loja?genero=${encodeURIComponent(g)}` }))} />
          <Filter title="Marcas" items={brands.map((b) => ({ label: b, href: `/loja?marca=${encodeURIComponent(b)}` }))} />
          <Filter title="Estilos" items={tags.map((t) => ({ label: t, href: `/loja?tag=${encodeURIComponent(t)}` }))} />
        </aside>

        <div>
          <div className="mb-5 flex items-center justify-between rounded-[1.4rem] border border-gold/20 bg-white/70 px-5 py-4">
            <p className="text-sm text-coffee/70"><b className="text-coffee">{list.length}</b> produtos encontrados</p>
            <Link href="/loja" className="text-sm font-semibold text-oldgold">Ver todos</Link>
          </div>
          <div className="grid grid-cols-3 gap-3 lg:gap-5 2xl:grid-cols-4">
            {list.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

function Filter({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div className="border-t border-gold/20 py-5 first:border-t-0 first:pt-0">
      <h3 className="mb-3 text-xs font-bold uppercase tracking-[.22em] text-coffee/60">{title}</h3>
      <div className="flex flex-wrap gap-2 lg:block lg:space-y-2">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="inline-block rounded-full border border-gold/25 px-3 py-2 text-sm text-coffee/75 transition hover:border-gold hover:bg-gold/10 lg:block lg:text-center">
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
