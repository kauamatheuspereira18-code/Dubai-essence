import { Product } from '@/lib/products';
import { ProductVisual } from './ProductVisual';

export function ProductGallery({ product }: { product: Product }) {
  return (
    <div className="overflow-hidden rounded-[2rem] bg-white ring-1 ring-gold/20">
      <ProductVisual product={product} variant={0} large />
    </div>
  );
}
