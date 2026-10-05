import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import { SearchOverlay } from './SearchOverlay';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gold/25 bg-pearl/95 shadow-sm backdrop-blur">
      <div className="bg-gold/15 px-2 py-2 text-center text-[9px] font-semibold uppercase tracking-[.12em] text-oldgold sm:px-4 sm:text-[11px] sm:tracking-[.18em]">
        Perfumes originais • Atendimento pelo WhatsApp • São José dos Pinhais
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Dubai em Essence — início">
          <Image src="/logo.png" alt="Dubai em Essence" width={58} height={58} className="rounded-full ring-1 ring-gold/40" />
          <div className="hidden sm:block">
            <p className="font-serif text-xl tracking-[.18em] gold-text">DUBAI</p>
            <p className="-mt-1 text-[9px] tracking-[.28em] text-oldgold">EM ESSENCE</p>
          </div>
        </Link>

        <div className="flex shrink-0 items-center gap-3">
          <SearchOverlay />
          <Link href="/favoritos" className="hidden md:block" aria-label="Favoritos"><Heart size={20} /></Link>
          <Link href="/carrinho" className="hidden md:block" aria-label="Carrinho"><ShoppingBag size={20} /></Link>
        </div>
      </div>
    </header>
  );
}
