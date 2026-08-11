import { notFound } from 'next/navigation';
import { products, bySlug, money, whatsappLink } from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';
import { ProductGallery } from '@/components/ProductGallery';
import { ProductInfoTabs } from '@/components/ProductInfoTabs';
import { MessageCircle, ShieldCheck, Sparkles, Star, Truck } from 'lucide-react';

export async function generateStaticParams() { return products.map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const p = bySlug(slug); return { title: p ? `${p.name} ${p.brand}` : 'Produto' }; }

export default async function Produto({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = bySlug(slug);
  if (!p) return notFound();
  const related = products.filter((x) => x.slug !== p.slug && (x.brand === p.brand || x.gender === p.gender)).slice(0, 4);
  const similar = products.filter((x) => x.slug !== p.slug && x.family.split(' ')[0] === p.family.split(' ')[0]).slice(0, 4);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-coffee/60">
        <span>Home</span><span>/</span><span>{p.brand}</span><span>/</span><b className="text-oldgold">{p.name}</b>
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,.95fr)]">
        <div>
          <ProductGallery product={p} />
          <ProductInfoTabs product={p} />
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[2rem] border border-gold/25 bg-pearl p-6 shadow-sm md:p-8">
            <div className="mb-4 flex flex-wrap gap-2">
              {p.tags.slice(0, 4).map((tag) => <span key={tag} className="rounded-full bg-gold/15 px-3 py-1 text-xs font-bold uppercase tracking-[.14em] text-oldgold">{tag}</span>)}
            </div>
            <p className="text-xs uppercase tracking-[.24em] text-oldgold">{p.brand}</p>
            <h1 className="mt-2 font-serif text-5xl leading-tight text-coffee">{p.name}</h1>
            <div className="mt-3 flex items-center gap-2 text-oldgold"><Star size={18} fill="currentColor" /> 5.0 estrelas</div>
            <p className="mt-5 text-lg leading-8 text-coffee/75">{p.description}</p>

            <div className="mt-6 rounded-[1.6rem] border border-gold/25 bg-white p-6 shadow-sm">
              <div className="flex items-end gap-4">
                {p.oldPrice && <span className="text-coffee/35 line-through">{money(p.oldPrice)}</span>}
                <span className="text-4xl font-bold text-coffee">{money(p.price)}</span>
              </div>
              <p className="mt-1 text-lg font-bold text-oldgold">{money(p.pixPrice)} via Pix</p>
              <p className="text-sm text-coffee/60">ou consulte parcelamento diretamente no atendimento.</p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-desert/70 p-4"><b>Estoque</b><p>{p.stock} unidades disponíveis</p></div>
                <div className="rounded-2xl bg-desert/70 p-4"><b>Frete</b><p>Consultar no WhatsApp</p></div>
              </div>

              <a className="btn-gold mt-6 block rounded-full px-7 py-4 text-center text-lg transition" href={whatsappLink(p.name)} target="_blank">
                <MessageCircle className="mr-2 inline" /> Comprar pelo WhatsApp
              </a>
              <p className="mt-3 text-center text-xs text-coffee/55">A mensagem será enviada automaticamente com o nome deste perfume.</p>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <Trust icon={<ShieldCheck />} title="Original" text="Produto autêntico" />
              <Trust icon={<Truck />} title="Entrega" text="SJP/CWB/SC" />
              <Trust icon={<Sparkles />} title="Curadoria" text="Dubai Essence" />
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && <Block title="Produtos relacionados" items={related} />}
      {similar.length > 0 && <Block title="Perfumes semelhantes" items={similar} />}
    </section>
  );
}

function Trust({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) { return <span className="rounded-2xl border border-gold/25 bg-white/70 p-4 text-center text-sm text-coffee"><span className="mx-auto mb-1 block w-fit text-gold">{icon}</span><b>{title}</b><small className="block text-coffee/55">{text}</small></span>; }
function Block({ title, items }: { title: string; items: typeof products }) { return <div className="mt-16"><h2 className="mb-6 font-serif text-3xl text-coffee">{title}</h2><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{items.map((p) => <ProductCard product={p} key={p.slug} />)}</div></div>; }
