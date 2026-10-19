'use client';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Check, X } from 'lucide-react';
import { cartTotal, parseCart, parseOrder, updateQuantity } from '@/lib/order';
import { menuItems } from '@/lib/menu';
const CartContext = createContext(null);
const CART_KEY = 'kantin-kita:cart';
const NOTE_KEY = 'kantin-kita:note';
const ORDER_KEY = 'kantin-kita:order';
// Provider menghubungkan lima route dengan satu state keranjang dan penyimpanan lokal.
export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [note, setNote] = useState('');
  const [lastOrder, setLastOrder] = useState(null);
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState('');
  const [storageWarning, setStorageWarning] = useState(false);
  const confirmed = useRef(false);
  const timer = useRef(null);
  useEffect(() => {
    // Baca storage setelah mount untuk menghindari perbedaan HTML server dan browser.
    try {
      setItems(parseCart(localStorage.getItem(CART_KEY)));
      setNote((localStorage.getItem(NOTE_KEY) ?? '').slice(0, 300));
      setLastOrder(parseOrder(localStorage.getItem(ORDER_KEY)));
    } catch {
      setStorageWarning(true);
    }
    setReady(true);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);
  useEffect(() => {
    if (!ready) return; // Jangan menimpa keranjang tersimpan dengan state awal yang kosong.
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
      localStorage.setItem(NOTE_KEY, note);
    } catch {
      setStorageWarning(true);
    }
  }, [items, note, ready]);
  // Satu notifikasi diganti setiap interaksi agar klik cepat tidak menumpuk toast.
  function notify(message) {
    if (timer.current) clearTimeout(timer.current);
    setToast(message);
    timer.current = setTimeout(() => setToast(''), 3200);
  }
  // Functional update menjaga jumlah tetap benar saat tombol ditekan berulang.
  function add(id) {
    const menu = menuItems.find((item) => item.id === id);
    if (!menu || !ready) return;
    confirmed.current = false;
    setItems((previous) =>
      updateQuantity(previous, id, (previous.find((item) => item.id === id)?.quantity ?? 0) + 1),
    );
    notify(`${menu.name} ditambahkan ke pesanan`);
  }
  // Ref mencegah konfirmasi ganda sebelum React menyelesaikan render berikutnya.
  function confirm(name, pickup) {
    if (!items.length || confirmed.current) return null;
    confirmed.current = true;
    const order = {
      id: `KK-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
      name: name.trim(),
      pickup,
      note,
      items: [...items],
      total: cartTotal(items),
      createdAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(ORDER_KEY, JSON.stringify(order));
    } catch {
      setStorageWarning(true);
    }
    setLastOrder(order);
    setItems([]);
    setNote('');
    return order;
  }
  return (
    <CartContext.Provider
      value={{
        items,
        count: items.reduce((sum, item) => sum + item.quantity, 0),
        total: cartTotal(items),
        ready,
        note,
        setNote,
        lastOrder,
        add,
        confirm,
        notify,
        setQuantity: (id, quantity) =>
          setItems((previous) => updateQuantity(previous, id, quantity)),
      }}
    >
      {storageWarning && (
        <div role="status" className="bg-amber-50 px-5 py-2 text-center text-xs text-amber-900">
          Penyimpanan browser tidak tersedia. Pesanan tetap bisa dicoba, tetapi perubahan mungkin
          hilang saat halaman dimuat ulang.
        </div>
      )}
      {children}
      <div
        className="pointer-events-none fixed inset-x-4 top-24 z-50 flex justify-center"
        aria-live="polite"
        aria-atomic="true"
      >
        {toast && (
          <div className="pointer-events-auto flex max-w-md items-center gap-3 rounded-2xl bg-ink px-5 py-4 text-sm text-white shadow-lg motion-safe:animate-toast">
            <Check size={18} className="shrink-0 text-orange-200" />
            <span>{toast}</span>
            <button
              onClick={() => setToast('')}
              aria-label="Tutup notifikasi"
              className="ml-2 rounded p-1 hover:bg-white/15"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>
    </CartContext.Provider>
  );
}
// Hook memastikan komponen hanya membaca keranjang di dalam provider.
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart harus berada dalam CartProvider.');
  return context;
}
