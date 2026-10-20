import Link from 'next/link';
import { ArrowRight, Check, ChevronRight, ShoppingBag, Store } from 'lucide-react';
export function ButtonLink({ href, children, secondary = false, className = '' }) {
  return (
    <Link
      href={href}
      className={`${secondary ? 'button-secondary' : 'button-primary'} ${className}`}
    >
      {children}
      <ArrowRight size={16} />
    </Link>
  );
}
export function PageHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-8">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-[-0.045em] sm:text-[40px] sm:leading-tight">
        {title}
      </h1>
      <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
    </div>
  );
}
export function OrderSteps({ current }) {
  const steps = [
    { title: 'Pilih menu', href: '/menu' },
    { title: 'Pesanan', href: '/pesanan' },
    { title: 'Konfirmasi', href: '/ringkasan' },
  ];
  return (
    <nav
      aria-label="Tahapan pemesanan"
      className="mb-8 flex items-center justify-between rounded-xl bg-sand px-3 py-4 sm:px-6"
    >
      {steps.map((step, index) => (
        <div key={step.href} className="flex items-center gap-2 sm:gap-3">
          <Link
            href={step.href}
            aria-current={current === index + 1 ? 'step' : undefined}
            className={`flex items-center gap-2 text-[10px] sm:gap-3 sm:text-xs ${current === index + 1 ? 'font-semibold text-brand' : 'text-muted'}`}
          >
            <span
              className={`flex size-6 items-center justify-center rounded-full ${current === index + 1 ? 'bg-brand text-white' : 'bg-white'}`}
            >
              {index + 1 < current ? <Check size={12} /> : index + 1}
            </span>
            {step.title}
          </Link>
          {index < 2 && <ChevronRight className="ml-1 size-3 text-muted sm:ml-12" />}
        </div>
      ))}
    </nav>
  );
}
export function EmptyCart() {
  return (
    <div className="rounded-2xl border border-line bg-white px-6 py-16 text-center">
      <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-peach text-brand">
        <ShoppingBag size={28} />
      </span>
      <h2 className="mt-6 text-xl font-bold">Belum ada yang kamu pesan.</h2>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted">
        Mau makan apa hari ini? Pilih menu favoritmu, nanti kami bantu hitungkan.
      </p>
      <ButtonLink href="/menu" className="mt-7">
        Lihat menu
      </ButtonLink>
    </div>
  );
}
export function PickupInfo({ payment = false }) {
  return (
    <div className="rounded-xl bg-peach p-4">
      <div className="flex items-center gap-2 text-xs font-semibold">
        <Store size={16} className="text-brand" />
        {payment ? 'Bayar di kasir' : 'Ambil langsung di kantin'}
      </div>
      <p className="mt-2 text-[11px] leading-5 text-muted">
        {payment
          ? 'Tidak perlu bayar sekarang. Selesaikan pembayaran saat mengambil pesanan di kantin.'
          : 'Biar makan siangmu nggak habis buat antre. Pesan dulu, ambil nanti.'}
      </p>
    </div>
  );
}
export function Field({ id, label, error, children, optional = false }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs font-semibold">
        {label}
        {optional && <span className="ml-1 font-normal text-muted">(opsional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-xs text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
