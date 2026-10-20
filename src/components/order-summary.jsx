'use client';
import { menuItems, rupiah } from '@/lib/menu';
import { useCart } from './cart-provider';
import { ButtonLink, PickupInfo } from './ui';
export function OrderSummary({ checkout = false, children }) {
  const { items, total } = useCart();
  return (
    <aside className="panel h-fit lg:sticky lg:top-6">
      <h2 className="text-base font-bold">{checkout ? 'Total pembayaran' : 'Ringkasan pesanan'}</h2>
      <ul className="my-6 space-y-4">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between gap-4 text-xs">
            <span className="text-muted">
              {item.quantity} × {menuItems.find((menu) => menu.id === item.id)?.name}
            </span>
            <span className="shrink-0 font-medium tabular-nums">
              {rupiah((menuItems.find((menu) => menu.id === item.id)?.price ?? 0) * item.quantity)}
            </span>
          </li>
        ))}
      </ul>
      <div className="mb-6 flex items-center justify-between gap-3 border-t border-line pt-5">
        <span className="text-sm font-bold">{checkout ? 'Total' : 'Subtotal'}</span>
        <strong className="text-2xl tracking-tight text-brand tabular-nums">{rupiah(total)}</strong>
      </div>
      <PickupInfo payment={checkout} />
      {checkout ? (
        children
      ) : (
        <ButtonLink href="/ringkasan" className="mt-5 w-full">
          Lihat ringkasan
        </ButtonLink>
      )}
      <p className="mt-3 text-[10px] leading-5 text-muted">
        {checkout
          ? 'Ini simulasi pemesanan. Tidak ada pesanan atau pembayaran yang dikirim ke kantin.'
          : 'Bisa cek lagi, kok. Pesananmu belum dikonfirmasi di halaman ini.'}
      </p>
    </aside>
  );
}
