import { Product } from '@/lib/products';
import { NoteIcon } from './NoteIcon';

const accordColors = ['#FF5A3D', '#7A5A47', '#A17260', '#F05D67', '#B98743', '#F1C24E', '#D88455', '#C99A3D'];

const accordMap: Record<string, string[]> = {
  gourmand: ['doce', 'baunilha', 'gourmand', 'âmbar', 'cremoso'],
  oriental: ['âmbar', 'especiado quente', 'doce', 'amadeirado', 'resinoso'],
  amadeirado: ['amadeirado', 'âmbar', 'especiado', 'aromático', 'terroso'],
  floral: ['floral', 'floral branco', 'doce', 'almiscarado', 'fresco'],
  frutado: ['frutado', 'doce', 'tropical', 'fresco', 'floral'],
  aquático: ['fresco', 'marinho', 'salino', 'âmbar', 'amadeirado'],
  cítrico: ['cítrico', 'fresco', 'aromático', 'almiscarado', 'amadeirado'],
  âmbar: ['âmbar', 'amadeirado', 'especiado quente', 'doce', 'almiscarado'],
  couro: ['couro', 'âmbar', 'doce', 'especiado', 'amadeirado'],
};

export function FragranceNotes({ product }: { product: Product }) {
  const accordSeed = `${product.family} ${product.topNotes.join(' ')} ${product.heartNotes.join(' ')} ${product.baseNotes.join(' ')}`.toLowerCase();
  const mainAccords = Array.from(
    new Set(Object.entries(accordMap).find(([key]) => accordSeed.includes(key))?.[1] ?? product.family.toLowerCase().split(' ')),
  ).slice(0, 8);

  return (
    <section className="rounded-[2rem] border border-gold/25 bg-pearl p-5 shadow-sm md:p-8">
      <div className="grid gap-10 lg:grid-cols-[300px_1fr] lg:items-start">
        <aside>
          <p className="text-center text-xs uppercase tracking-[.22em] text-oldgold">Perfumaria</p>
          <h2 className="mt-2 text-center font-serif text-3xl text-coffee">Principais acordes</h2>
          <div className="mt-6 space-y-2">
            {mainAccords.map((accord, index) => (
              <div
                key={accord}
                className="mx-auto rounded-md px-4 py-2 text-center text-sm font-bold text-white shadow-sm"
                style={{ backgroundColor: accordColors[index % accordColors.length], width: `${100 - index * 6}%` }}
              >
                {accord}
              </div>
            ))}
          </div>
        </aside>

        <div className="space-y-8">
          <NoteTier title="Notas de topo" notes={product.topNotes} />
          <NoteTier title="Notas de coração" notes={product.heartNotes} />
          <NoteTier title="Notas de fundo" notes={product.baseNotes} />
        </div>
      </div>
    </section>
  );
}

function NoteTier({ title, notes }: { title: string; notes: string[] }) {
  return (
    <div>
      <div className="mb-5 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <span className="h-px bg-gold/25" />
        <h3 className="text-center text-sm font-semibold uppercase tracking-[.2em] text-coffee">{title}</h3>
        <span className="h-px bg-gold/25" />
      </div>

      <div className="flex flex-wrap justify-center gap-5">
        {notes.map((note) => (
          <div key={note} className="w-24 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-gold/20 bg-white shadow-sm">
              <NoteIcon note={note} />
            </div>
            <p className="mt-2 text-sm font-semibold leading-tight text-coffee/70">{note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
