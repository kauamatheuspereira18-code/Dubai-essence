'use client';

import Link from 'next/link';
import { Heart, MessageCircle, ShoppingBag, Star } from 'lucide-react';
import { money, Product, whatsappLink } from '@/lib/products';
import { ProductVisual } from './ProductVisual';

const isDesigner = (product: Product) => product.tags.includes('Designer') || product.tags.includes('Não árabe');

export function ProductCard({ product }: { product: Product }) {
  const badge = product.bestSeller ? 'Mais vendido' : product.launch ? 'Novidade' : isDesigner(product) ? 'Importado' : 'Árabe premium';

  return (
    <article className="group overflow-hidden rounded-[1.6rem] border border-gold/25 bg-pearl shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-gold">
      <div className="relative">
        <div className="absolute left-3 top-3 z-10 rounded-full bg-gold/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[.14em] text-coffee shadow-sm">
          {badge}
        </div>
        <Link href={`/produto/${product.slug}`} className="block overflow-hidden bg-white">
          <div className="transition duration-500 group-hover:scale-[1.03]">
            <ProductVisual product={product} />
          </div>
        </Link>
      </div>

      <div className="p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-oldgold">{product.family.split(' ')[0]}</span>
          <span className="flex shrink-0 items-center gap-1 text-sm text-oldgold"><Star size={15} fill="currentColor" /> 5.0</span>
        </div>
        <Link href={`/produto/${product.slug}`}>
          <h3 className="line-clamp-2 min-h-[3.2rem] font-serif text-xl leading-tight text-coffee group-hover:text-oldgold">{product.name}</h3>
        </Link>
        <p className="mt-1 text-sm text-coffee/60">{product.brand} • {product.gender}</p>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-coffee/65">{product.family} · {product.longevity}</p>

        <div className="mt-4 rounded-2xl bg-white/75 p-4 ring-1 ring-gold/15">
          {product.oldPrice && <p className="text-xs text-coffee/40 line-through">{money(product.oldPrice)}</p>}
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-xl font-bold text-coffee">{money(product.price)}</p>
              <p className="text-sm font-semibold text-oldgold">{money(product.pixPrice)} via Pix</p>
            </div>
            <button onClick={() => localStorage.setItem('favorite:' + product.slug, '1')} className="rounded-full border border-gold/30 bg-pearl p-2 text-oldgold transition hover:bg-gold/15" aria-label="Adicionar aos favoritos">
              <Heart size={18} />
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
          <a href={whatsappLink(product.name)} target="_blank" className="btn-gold rounded-full px-4 py-3 text-center text-sm transition">
            <MessageCircle className="mr-1 inline" size={16} /> Comprar
          </a>
          <button onClick={() => { const k = 'cart'; const cart = JSON.parse(localStorage.getItem(k) || '[]'); cart.push(product.slug); localStorage.setItem(k, JSON.stringify(cart)); alert('Produto adicionado ao carrinho.'); }} className="rounded-full border border-gold/40 px-4 py-3 text-sm font-semibold text-coffee transition hover:bg-gold/10" aria-label="Adicionar à sacola">
            <ShoppingBag size={17} />
          </button>
        </div>
      </div>
    </article>
  );
}
