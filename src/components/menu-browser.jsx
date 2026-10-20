'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Search, X, Clock3, ShoppingBag, ArrowRight } from 'lucide-react';
import { menuItems, rupiah } from '@/lib/menu';
import { MenuCard } from './menu-card';
import { useCart } from './cart-provider';
export function MenuBrowser() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Semua menu');
  const { count, total } = useCart();
  const filtered = menuItems.filter(
    (item) =>
      (category === 'Semua menu' || item.category === category) &&
      item.name.toLowerCase().includes(query.toLowerCase().trim()),
  );
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-4 top-3.5 text-muted" size={17} />
          <input
            aria-label="Cari menu"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari makanan atau minuman favoritmu..."
            className="input rounded-full pr-11 pl-11"
          />
          {query && (
            <button
              aria-label="Hapus pencarian"
              onClick={() => setQuery('')}
              className="absolute right-3 top-2.5 rounded-full p-1.5 text-muted hover:bg-sand"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <p className="flex items-center gap-2 text-[11px] text-muted">
          <Clock3 size={14} />
          Dimasak segar setiap hari
        </p>
      </div>
      <div className="my-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Kategori menu">
          {['Semua menu', 'Makanan', 'Minuman', 'Camilan'].map((label) => (
            <button
              key={label}
              aria-pressed={category === label}
              onClick={() => setCategory(label)}
              className={`min-h-10 rounded-full px-4 text-xs transition-colors sm:px-5 ${category === label ? 'bg-ink font-semibold text-white' : 'text-muted hover:bg-sand'}`}
            >
              {label}
            </button>
          ))}
        </div>
        <span role="status" className="text-[11px] text-muted">
          {filtered.length} pilihan untukmu
        </span>
      </div>
      {filtered.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="panel py-16 text-center">
          <Search size={32} className="mx-auto text-brand" />
          <h2 className="mt-4 text-lg font-bold">Menu belum ketemu.</h2>
          <p className="mt-2 text-sm text-muted">
            Coba nama lain atau pilih kategori yang berbeda.
          </p>
          <button
            className="button-secondary mt-6"
            onClick={() => {
              setQuery('');
              setCategory('Semua menu');
            }}
          >
            Tampilkan semua menu
          </button>
        </div>
      )}
      {count > 0 && (
        <div className="sticky bottom-4 z-20 mt-7 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#ead4bf] bg-peach p-4 shadow-[0_5px_20px_-10px_#6a371b55] sm:px-5">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-white/80 text-brand">
              <ShoppingBag size={20} />
            </span>
            <div>
              <p className="text-xs font-bold">{count} item sudah ada di pesananmu</p>
              <p className="mt-1 text-[10px] text-muted">
                Tinggal selangkah lagi menuju makan enak.
              </p>
            </div>
          </div>
          <div className="flex w-full items-center justify-between gap-5 sm:w-auto">
            <span className="text-base font-bold tabular-nums">{rupiah(total)}</span>
            <Link href="/pesanan" className="button-primary">
              Lihat pesanan
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
