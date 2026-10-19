'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, ShoppingBag, Utensils, X } from 'lucide-react';
import { useCart } from './cart-provider';
const links = [
  { href: '/', label: 'Beranda' },
  { href: '/menu', label: 'Menu' },
  { href: '/pesanan', label: 'Pesanan' },
  { href: '/ringkasan', label: 'Ringkasan Pemesanan' },
  { href: '/kontak', label: 'Kontak' },
];
// Logo dipakai bersama oleh header dan footer supaya identitasnya konsisten.
export function Logo() {
  return (
    <Link
      href="/"
      aria-label="Kantin Kita — Beranda"
      className="inline-flex shrink-0 items-center gap-2.5 font-extrabold tracking-tight"
    >
      <span className="flex size-9 items-center justify-center rounded-xl bg-brand text-white">
        <Utensils size={21} strokeWidth={1.8} />
      </span>
      <span className="text-lg">kantin kita</span>
    </Link>
  );
}
// Navbar menampilkan route aktif dan jumlah item; versi ponsel memakai menu buka-tutup.
export function Navbar() {
  const pathname = usePathname();
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  return (
    <header className="relative z-30 border-b border-line bg-paper">
      <div className="page-width flex h-20 items-center justify-between gap-3 px-4 sm:px-8 lg:px-10">
        <Logo />
        <nav aria-label="Navigasi utama" className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={
                pathname.replace(/\/$/, '') === link.href.replace(/\/$/, '') ? 'page' : undefined
              }
              className={`border-b-2 py-2 text-xs font-medium transition-colors ${pathname.replace(/\/$/, '') === link.href.replace(/\/$/, '') ? 'border-brand text-brand' : 'border-transparent text-muted hover:text-brand'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <Link
            href="/pesanan"
            aria-label={`Lihat pesanan, ${count} item`}
            className="flex items-center gap-2 rounded-full border border-line bg-white px-3 py-2.5 text-xs whitespace-nowrap font-semibold transition-colors hover:border-brand"
          >
            <ShoppingBag size={15} className="text-brand" />
            <span>{count} item</span>
          </Link>
          <button
            aria-label={open ? 'Tutup navigasi' : 'Buka navigasi'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2.5 hover:bg-sand lg:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Navigasi ponsel"
          className="absolute inset-x-0 top-full flex flex-col border-b border-line bg-paper px-6 pb-5 shadow-lg lg:hidden"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`rounded-lg px-4 py-3 text-sm ${pathname.replace(/\/$/, '') === link.href.replace(/\/$/, '') ? 'bg-peach font-semibold text-brand' : 'hover:bg-sand'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
// Footer tetap ringkas dan menyebutkan bahwa situs merupakan prototipe.
export function Footer() {
  return (
    <footer className="mt-auto bg-sand">
      <div className="page-width py-10">
        <div className="grid gap-7 text-sm sm:grid-cols-[1.5fr_1fr_1fr] sm:items-center">
          <div>
            <Logo />
            <p className="mt-3 text-xs text-muted">Makan enak, harga bersahabat, dekat denganmu.</p>
          </div>
          <div>
            <p className="font-semibold">Sampai jumpa di kantin!</p>
            <p className="mt-2 text-xs text-muted">Senin–Jumat 08.00–16.00</p>
          </div>
          <Link
            href="/kontak"
            className="text-xs text-muted underline-offset-4 hover:text-brand hover:underline sm:text-right"
          >
            kantin@example.com
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap justify-between gap-3 border-t border-line pt-5 text-[11px] text-muted">
          <span>Prototipe · semua data hanya contoh.</span>
          <span>Dibuat untuk rasa kebersamaan.</span>
        </div>
      </div>
    </footer>
  );
}
