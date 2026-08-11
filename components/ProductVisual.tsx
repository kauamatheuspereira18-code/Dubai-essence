import Image from 'next/image';
import { Product } from '@/lib/products';

export function ProductVisual({ product, variant = 0, large = false }: { product: Product; variant?: number; large?: boolean }) {
  const src = product.images?.[variant] ?? product.images?.[0];
  const [a, b] = product.colors;

  if (src) {
    return (
      <div className={`relative overflow-hidden rounded-[2rem] bg-white ${large ? 'min-h-[520px]' : 'aspect-[4/5]'}`}>
        <Image
          src={src}
          alt={`${product.name} ${product.brand}`}
          fill
          sizes={large ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, 50vw'}
          className="object-contain p-5 transition duration-500"
          priority={large}
        />
        <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-gold/20" />
        <div className="absolute right-5 top-5 rounded-full bg-pearl/90 px-3 py-1 text-xs font-bold text-oldgold shadow-sm">
          {product.volume}
        </div>
      </div>
    );
  }

  return (
    <div className={`product-visual relative overflow-hidden rounded-[2rem] ${large ? 'min-h-[520px]' : 'aspect-[4/5]'}`} style={{ '--c1': a, '--c2': b } as React.CSSProperties}>
      <div className="absolute inset-0 grain opacity-30" />
      <div className="absolute left-1/2 top-[15%] h-[72%] w-[38%] -translate-x-1/2 rounded-b-[34px] rounded-t-[18px] border border-white/45 bg-white/20 bottle backdrop-blur-sm">
        <div className="absolute left-1/2 top-[-44px] h-16 w-16 -translate-x-1/2 rounded-t-xl border border-white/40 bg-black/45" />
        <div className="absolute left-1/2 top-[-66px] h-6 w-24 -translate-x-1/2 rounded-full bg-gold" />
        <div className="absolute inset-x-5 top-[34%] rounded-2xl border border-gold/40 bg-pearl/86 p-3 text-center shadow-gold">
          <p className="font-serif text-lg tracking-[.24em] text-coffee">DUBAI</p>
          <p className="text-[9px] tracking-[.32em] text-oldgold">ESSENCE</p>
          <div className="my-2 h-px bg-gold/40" />
          <p className="font-serif text-xl text-onyx">{product.name}</p>
          <p className="mt-1 text-xs uppercase tracking-[.18em] text-coffee/70">{product.brand}</p>
        </div>
      </div>
      <div className="absolute right-5 top-5 rounded-full bg-pearl/80 px-3 py-1 text-xs font-bold text-oldgold">{product.volume}</div>
    </div>
  );
}
