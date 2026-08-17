'use client';

import Link from 'next/link';
import { Heart, MessageCircle, ShoppingBag, Star } from 'lucide-react';
import { money, Product, whatsappLink } from '@/lib/products';
import { ProductVisual } from './ProductVisual';

const isDesigner = (product: Product) => product.tags.includes('Designer') || product.tags.includes('Não árabe');

export function ProductCard({ product }: { product: Product }) {
  const badge = product.bestSeller ? 'Mais vendido' : product.launch ? 'Novidade' : isDesigner(product) ? 'Importado' : 'Árabe premium';

  return (
    <article className="group overflow-hidden rounded-[1.15rem] border border-gold/25 bg-pearl shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-gold md:rounded-[1.6rem]">
      <div className="relative">
        <div className="absolute left-2 top-2 z-10 max-w-[82%] rounded-full bg-gold/90 px-2 py-1 text-center text-[8px] font-bold uppercase leading-tight tracking-[.16em] text-coffee shadow-sm md:left-3 md:top-3 md:px-3 md:text-[11px] md:tracking-[.14em]">
          {badge}
        </div>
        <Link href={`/produto/${product.slug}`} className="block overflow-hidden bg-white">
          <div className="transition duration-500 group-hover:scale-[1.03]">
            <ProductVisual product={product} />
          </div>
        </Link>
      </div>

      <div className="p-2.5 md:p-5">
        <div className="mb-2 flex items-center justify-between gap-1 md:mb-3 md:gap-3">
          <span className="truncate rounded-full bg-gold/15 px-2 py-1 text-[10px] font-semibold text-oldgold md:px-3 md:text-xs">{product.family.split(' ')[0]}</span>
          <span className="flex shrink-0 items-center gap-0.5 text-[10px] text-oldgold md:gap-1 md:text-sm"><Star size={11} fill="currentColor" className="md:h-[15px] md:w-[15px]" /> 5.0</span>
        </div>

        <Link href={`/produto/${product.slug}`}>
          <h3 className="line-clamp-2 min-h-[2.15rem] font-serif text-[15px] leading-[1.08] text-coffee group-hover:text-oldgold md:min-h-[3.2rem] md:text-xl md:leading-tight">{product.name}</h3>
        </Link>

        <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-coffee/60 md:text-sm">{product.brand} • {product.gender}</p>
        <p className="mt-3 hidden line-clamp-2 text-sm leading-6 text-coffee/65 md:block">{product.family} · {product.longevity}</p>

        <div className="mt-3 rounded-xl bg-white/75 p-2 text-center ring-1 ring-gold/15 md:mt-4 md:rounded-2xl md:p-4 md:text-left">
          {product.oldPrice && <p className="text-[10px] text-coffee/40 line-through md:text-xs">{money(product.oldPrice)}</p>}
          <div className="flex flex-col items-center justify-between gap-2 md:flex-row md:items-end md:gap-3">
            <div className="min-w-0">
              <p className="whitespace-nowrap text-[15px] font-bold leading-tight text-coffee md:text-xl">{money(product.price)}</p>
            </div>
            <button onClick={() => localStorage.setItem('favorite:' + product.slug, '1')} className="hidden rounded-full border border-gold/30 bg-pearl p-2 text-oldgold transition hover:bg-gold/15 md:block" aria-label="Adicionar aos favoritos">
              <Heart size={18} />
            </button>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-2 md:mt-4 md:grid-cols-[1fr_auto]">
          <a href={whatsappLink(product.name)} target="_blank" className="btn-gold rounded-full px-2 py-2.5 text-center text-[12px] font-bold transition md:px-4 md:py-3 md:text-sm">
            <MessageCircle className="mr-1 inline h-3.5 w-3.5 md:h-4 md:w-4" /> Comprar
          </a>
          <button onClick={() => { const k = 'cart'; const cart = JSON.parse(localStorage.getItem(k) || '[]'); cart.push(product.slug); localStorage.setItem(k, JSON.stringify(cart)); alert('Produto adicionado ao carrinho.'); }} className="hidden rounded-full border border-gold/40 px-4 py-3 text-sm font-semibold text-coffee transition hover:bg-gold/10 md:block" aria-label="Adicionar à sacola">
            <ShoppingBag size={17} />
          </button>
        </div>
      </div>
    </article>
  );
}
