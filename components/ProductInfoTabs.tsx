import { Product } from '@/lib/products';
import { FragranceNotes } from './FragranceNotes';

export function ProductInfoTabs({ product }: { product: Product }) {
  const group = `product-tabs-${product.slug}`;

  return (
    <section className="product-info-tabs mt-8 rounded-[2rem] border border-gold/25 bg-pearl p-5 shadow-sm md:p-8">
      <input id={`${group}-descricao`} name={group} type="radio" defaultChecked className="product-tab-radio product-tab-descricao" tabIndex={-1} aria-hidden="true" style={{ position: 'absolute', opacity: 0, width: 0, height: 0, margin: 0, padding: 0, pointerEvents: 'none' }} />
      <input id={`${group}-notas`} name={group} type="radio" className="product-tab-radio product-tab-notas" tabIndex={-1} aria-hidden="true" style={{ position: 'absolute', opacity: 0, width: 0, height: 0, margin: 0, padding: 0, pointerEvents: 'none' }} />
      <input id={`${group}-modo`} name={group} type="radio" className="product-tab-radio product-tab-modo" tabIndex={-1} aria-hidden="true" style={{ position: 'absolute', opacity: 0, width: 0, height: 0, margin: 0, padding: 0, pointerEvents: 'none' }} />

      <div className="mb-8 overflow-x-auto border-b border-gold/25">
        <div className="flex min-w-max gap-8 md:gap-12">
          <label htmlFor={`${group}-descricao`} className="product-tab-label product-tab-label-descricao relative cursor-pointer pb-4 font-serif text-2xl font-bold transition md:text-3xl">
            Descrição
          </label>
          <label htmlFor={`${group}-notas`} className="product-tab-label product-tab-label-notas relative cursor-pointer pb-4 font-serif text-2xl font-bold transition md:text-3xl">
            Notas
          </label>
          <label htmlFor={`${group}-modo`} className="product-tab-label product-tab-label-modo relative cursor-pointer pb-4 font-serif text-2xl font-bold transition md:text-3xl">
            Modo de usar
          </label>
        </div>
      </div>

      <div className="product-tab-panel product-tab-panel-descricao">
        <DescriptionTab product={product} />
      </div>

      <div className="product-tab-panel product-tab-panel-notas">
        <NotesTab product={product} />
      </div>

      <div className="product-tab-panel product-tab-panel-modo">
        <UseTab product={product} />
      </div>
    </section>
  );
}

function DescriptionTab({ product }: { product: Product }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[.22em] text-oldgold">{product.brand}</p>
        <h2 className="mt-2 font-serif text-4xl text-coffee">{product.name}</h2>
        <p className="mt-5 text-lg leading-8 text-coffee/75">{product.description}</p>
        <p className="mt-5 leading-8 text-coffee/70">
          Uma fragrância selecionada para quem busca presença, sofisticação e uma assinatura olfativa marcante. A composição combina notas de saída,
          coração e fundo para criar uma evolução elegante ao longo do uso.
        </p>
      </div>

      <div className="rounded-[1.5rem] border border-gold/20 bg-white/60 p-5">
        <h3 className="font-serif text-2xl text-coffee">Resumo</h3>
        <dl className="mt-4 space-y-3 text-sm text-coffee/75">
          <div><dt className="font-bold text-oldgold">Família olfativa</dt><dd>{product.family}</dd></div>
          <div><dt className="font-bold text-oldgold">Fixação</dt><dd>{product.longevity}</dd></div>
          <div><dt className="font-bold text-oldgold">Projeção</dt><dd>{product.projection}</dd></div>
          <div><dt className="font-bold text-oldgold">Ocasiões</dt><dd>{product.occasions.join(', ')}</dd></div>
        </dl>
      </div>
    </div>
  );
}

function NotesTab({ product }: { product: Product }) {
  return (
    <div>
      <p className="mb-6 max-w-3xl text-coffee/70">
        Pirâmide olfativa organizada por etapas de evolução: notas de topo, notas de coração e notas de fundo.
      </p>
      <FragranceNotes product={product} />
    </div>
  );
}

function UseTab({ product }: { product: Product }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <UseCard title="Onde aplicar" text="Aplique nos pontos de pulsação: pescoço, nuca, punhos e atrás das orelhas. Essas áreas ajudam a fragrância a evoluir melhor na pele." />
      <UseCard title="Como aplicar" text="Borrife a uma distância aproximada de 15 a 20 cm da pele. Evite esfregar os punhos após aplicar, pois isso pode alterar a evolução das notas." />
      <UseCard title="Conservação" text="Guarde o perfume em local seco, fresco e longe da luz direta. Evite deixar o frasco em banheiro, carro ou locais com variação intensa de temperatura." />
      <div className="rounded-[1.5rem] border border-gold/20 bg-white/60 p-5 lg:col-span-3">
        <h3 className="font-serif text-2xl text-coffee">Sugestão de uso para {product.name}</h3>
        <p className="mt-3 leading-8 text-coffee/70">
          Indicado para: <b>{product.occasions.join(', ')}</b>. Por possuir perfil <b>{product.family.toLowerCase()}</b> e desempenho descrito como <b>{product.longevity.toLowerCase()}</b>, comece com poucas borrifadas e ajuste conforme a ocasião, clima e intensidade desejada.
        </p>
      </div>
    </div>
  );
}

function UseCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[1.5rem] border border-gold/20 bg-white/60 p-5">
      <h3 className="font-serif text-2xl text-coffee">{title}</h3>
      <p className="mt-3 leading-7 text-coffee/70">{text}</p>
    </div>
  );
}
