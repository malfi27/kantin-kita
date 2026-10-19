'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Trash2 } from 'lucide-react';
import { useCart } from './cart-provider';
import { menuItems, rupiah } from '@/lib/menu';
import { QuantityControl } from './menu-card';
import { EmptyCart, Field, OrderSteps } from './ui';
import { OrderSummary } from './order-summary';
// Keranjang menampilkan data yang dipulihkan setelah provider siap membaca storage.
export function CartPage() {
  const { items, count, ready, note, setNote, setQuantity } = useCart();
  if (!ready)
    return (
      <p role="status" className="panel text-sm text-muted">
        Menyiapkan pesananmu…
      </p>
    );
  return (
    <>
      <OrderSteps current={2} />
      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            <section className="panel">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-base font-bold">Pilihan kamu</h2>
                <span className="text-[11px] text-muted">
                  {items.length} menu, {count} item
                </span>
              </div>
              <ul className="divide-y divide-line">
                {items.map((item) => {
                  const menu = menuItems.find((menu) => menu.id === item.id);
                  return (
                    <li
                      key={item.id}
                      className="grid grid-cols-[72px_1fr] items-center gap-4 py-5 sm:flex"
                    >
                      <Image
                        src={menu.image}
                        alt={menu.name}
                        width={88}
                        height={88}
                        className="size-18 rounded-xl object-cover sm:size-20"
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-bold">{menu.name}</h3>
                        <p className="mt-2 text-xs text-muted">{rupiah(menu.price)} / porsi</p>
                        <button
                          onClick={() => setQuantity(item.id, 0)}
                          aria-label={`Hapus ${menu.name}`}
                          className="mt-2 inline-flex items-center gap-1 py-1 text-[10px] text-muted hover:text-red-700"
                        >
                          <Trash2 size={12} />
                          Hapus
                        </button>
                      </div>
                      <div className="col-span-2 flex w-full items-center justify-between gap-4 sm:ml-auto sm:w-auto sm:flex-col sm:items-end sm:gap-3">
                        <strong className="text-sm tabular-nums">
                          {rupiah(menu.price * item.quantity)}
                        </strong>
                        <QuantityControl id={item.id} name={menu.name} quantity={item.quantity} />
                      </div>
                    </li>
                  );
                })}
              </ul>
              <Link
                href="/menu"
                className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-brand hover:underline"
              >
                <Plus size={15} />
                Tambah menu lainnya
              </Link>
            </section>
            <section className="panel">
              <Field id="order-note" label="Catatan untuk dapur" optional>
                <textarea
                  id="order-note"
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  maxLength={300}
                  rows={3}
                  className="input resize-y"
                  placeholder="Sambal dipisah, ya. Terima kasih!"
                />
              </Field>
              <div className="mt-2 flex justify-between gap-2 text-[10px] text-muted">
                <span>Ada permintaan khusus? Tulis di sini, ya.</span>
                <span>{note.length}/300</span>
              </div>
            </section>
          </div>
          <OrderSummary />
        </div>
      )}
    </>
  );
}
