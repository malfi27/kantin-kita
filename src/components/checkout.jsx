'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, CheckCheck, Clock3, Printer, UserRound } from 'lucide-react';
import { useCart } from './cart-provider';
import { menuItems, rupiah } from '@/lib/menu';
import { pickupOptions, validateCheckout } from '@/lib/order';
import { ButtonLink, EmptyCart, Field, OrderSteps } from './ui';
import { OrderSummary } from './order-summary';
// Bukti pesanan bersumber dari snapshot, sehingga tidak berubah ketika keranjang baru diisi.
function OrderReceipt({ order }) {
  return (
    <section className="panel mx-auto max-w-2xl text-center">
      <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#eaf0e5] text-[#566b3e]">
        <CheckCheck size={30} />
      </span>
      <p className="eyebrow mt-6">Konfirmasi berhasil</p>
      <h2 className="mt-3 text-2xl font-extrabold tracking-tight">Terima kasih, {order.name}!</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">
        Pesanan contohmu sudah tercatat di browser ini. Ini simulasi, jadi belum ada makanan yang
        disiapkan atau pembayaran yang ditagih.
      </p>
      <div className="my-7 rounded-xl bg-paper p-5 text-left">
        <div className="flex flex-wrap justify-between gap-3 border-b border-line pb-4">
          <div>
            <p className="text-[10px] text-muted">Nomor pesanan</p>
            <p className="mt-1 text-sm font-bold">{order.id}</p>
          </div>
          <div>
            <p className="text-[10px] text-muted">Waktu pengambilan</p>
            <p className="mt-1 text-xs font-semibold">{order.pickup}</p>
          </div>
        </div>
        <ul className="space-y-3 py-5">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between gap-4 text-xs">
              <span>
                {item.quantity} × {menuItems.find((menu) => menu.id === item.id)?.name}
              </span>
              <span>
                {rupiah(
                  (menuItems.find((menu) => menu.id === item.id)?.price ?? 0) * item.quantity,
                )}
              </span>
            </li>
          ))}
        </ul>
        {order.note && <p className="mb-4 text-xs leading-5 text-muted">Catatan: {order.note}</p>}
        <div className="flex justify-between border-t border-line pt-4 text-sm font-bold">
          <span>Total · bayar di kasir</span>
          <span className="text-brand">{rupiah(order.total)}</span>
        </div>
      </div>
      <div className="no-print flex flex-wrap justify-center gap-3">
        <ButtonLink href="/menu">Pesan lagi</ButtonLink>
        <button className="button-secondary" onClick={() => window.print()}>
          <Printer size={15} />
          Cetak ringkasan
        </button>
      </div>
    </section>
  );
}
// Form checkout memvalidasi input sebelum membuat bukti pesanan lokal.
export function Checkout() {
  const { items, count, note, ready, confirm, lastOrder } = useCart();
  const [name, setName] = useState('');
  const [pickup, setPickup] = useState('secepatnya');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  if (!ready)
    return (
      <p role="status" className="panel text-sm text-muted">
        Menyiapkan ringkasan…
      </p>
    );
  if (!items.length) return lastOrder ? <OrderReceipt order={lastOrder} /> : <EmptyCart />;
  // Validasi nama, jadwal, dan keranjang lebih dulu; fokus diarahkan ke input yang salah.
  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateCheckout(name, pickup, count);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      document.getElementById(nextErrors.name ? 'customer-name' : 'pickup-time')?.focus();
      return;
    }
    setSubmitting(true);
    confirm(name, pickupOptions.find((option) => option.value === pickup).label);
  }
  return (
    <>
      <OrderSteps current={3} />
      <form noValidate onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <section className="panel">
            <h2 className="mb-6 flex items-center gap-2 text-base font-bold">
              <UserRound size={17} className="text-brand" />
              Siapa yang mengambil pesanan?
            </h2>
            <div className="space-y-5">
              <Field id="customer-name" label="Nama pelanggan" error={errors.name}>
                <input
                  id="customer-name"
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={60}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'customer-name-error' : undefined}
                  placeholder="Nama kamu"
                  className="input"
                />
              </Field>
              <Field id="pickup-time" label="Waktu pengambilan" error={errors.pickup}>
                <div className="relative">
                  <Clock3
                    size={16}
                    className="pointer-events-none absolute left-3.5 top-3.5 text-brand"
                  />
                  <select
                    id="pickup-time"
                    value={pickup}
                    onChange={(event) => setPickup(event.target.value)}
                    aria-invalid={!!errors.pickup}
                    aria-describedby={errors.pickup ? 'pickup-time-error' : undefined}
                    className="input bg-paper pl-10"
                  >
                    {pickupOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </Field>
            </div>
            <p className="mt-3 text-[10px] leading-5 text-muted">
              Simulasi pengambilan saat jam buka kantin, Senin–Jumat 08.00–16.00.
            </p>
          </section>
          <section className="panel">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-base font-bold">Pesanan yang disiapkan</h2>
              <Link href="/pesanan" className="text-xs text-brand hover:underline">
                Ubah pesanan
              </Link>
            </div>
            <ul className="space-y-5">
              {items.map((item) => {
                const menu = menuItems.find((menu) => menu.id === item.id);
                return (
                  <li key={item.id} className="flex items-center gap-3">
                    <Image
                      src={menu.image}
                      alt={menu.name}
                      width={60}
                      height={60}
                      className="size-14 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-xs font-bold">{menu.name}</h3>
                      <p className="mt-2 text-[11px] text-muted">
                        {item.quantity} × {rupiah(menu.price)}
                      </p>
                    </div>
                    <span className="text-xs font-semibold tabular-nums">
                      {rupiah(menu.price * item.quantity)}
                    </span>
                  </li>
                );
              })}
            </ul>
            {note && (
              <div className="mt-6 border-t border-line pt-4">
                <p className="text-[9px] font-semibold uppercase tracking-wider text-muted">
                  Catatan untuk dapur
                </p>
                <p className="mt-2 text-xs leading-6">{note}</p>
              </div>
            )}
          </section>
        </div>
        <OrderSummary checkout>
          <button type="submit" disabled={submitting} className="button-primary mt-5 w-full">
            {submitting ? 'Menyimpan…' : 'Konfirmasi pesanan'}
            <Check size={16} />
          </button>
          {errors.cart && (
            <p role="alert" className="mt-2 text-xs text-red-700">
              {errors.cart}
            </p>
          )}
        </OrderSummary>
      </form>
    </>
  );
}
