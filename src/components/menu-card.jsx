'use client';
import Image from 'next/image';
import { Plus, Minus } from 'lucide-react';
import { rupiah } from '@/lib/menu';
import { useCart } from './cart-provider';
export function MenuCard({ item }) {
  const { add, items, ready } = useCart();
  const quantity = items.find((row) => row.id === item.id)?.quantity ?? 0;
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line/70 bg-white p-2.5 transition-shadow hover:shadow-[0_10px_30px_-15px_#49331d40]">
      <div className="relative aspect-[1.75] overflow-hidden rounded-xl bg-sand">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
          className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
        />
        {item.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-semibold shadow-sm">
            {item.badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col px-2.5 pb-3 pt-4">
        <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted">
          {item.category}
        </p>
        <h3 className="mt-1.5 text-base font-bold tracking-tight">{item.name}</h3>
        <p className="mt-1.5 text-xs leading-5 text-muted">{item.description}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <span className="text-sm font-bold tabular-nums">{rupiah(item.price)}</span>
          <button
            onClick={() => add(item.id)}
            disabled={!ready || quantity >= 99}
            aria-label={`Tambah ${item.name}`}
            className="flex min-h-9 items-center gap-2 rounded-full bg-peach px-3.5 text-[11px] font-semibold text-brand transition-colors hover:bg-brand hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {quantity >= 99 ? 'Maks. 99' : 'Tambah'}
            <Plus size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}
export function QuantityControl({ id, name, quantity }) {
  const { setQuantity } = useCart();
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-paper p-1">
      <button
        aria-label={`Kurangi ${name}`}
        onClick={() => setQuantity(id, quantity - 1)}
        className="flex size-8 items-center justify-center rounded-full transition-colors hover:bg-sand"
      >
        <Minus size={13} />
      </button>
      <span
        aria-label={`Jumlah ${name}`}
        className="min-w-5 text-center text-xs font-semibold tabular-nums"
      >
        {quantity}
      </span>
      <button
        aria-label={`Tambah jumlah ${name}`}
        onClick={() => setQuantity(id, quantity + 1)}
        disabled={quantity >= 99}
        className="flex size-8 items-center justify-center rounded-full bg-peach text-brand transition-colors hover:bg-brand hover:text-white disabled:opacity-40"
      >
        <Plus size={13} />
      </button>
    </div>
  );
}
