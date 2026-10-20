import { menuItems } from './menu.js';
export const pickupOptions = [
  { value: 'secepatnya', label: 'Secepatnya · sekitar 15–20 menit' },
  { value: '30-menit', label: '30 menit lagi' },
  { value: '60-menit', label: '1 jam lagi' },
];
export function updateQuantity(cart, id, quantity) {
  if (!menuItems.some((item) => item.id === id) || !Number.isInteger(quantity) || quantity < 0)
    return cart;
  if (quantity === 0) return cart.filter((item) => item.id !== id);
  const next = { id, quantity: Math.min(quantity, 99) };
  return cart.some((item) => item.id === id)
    ? cart.map((item) => (item.id === id ? next : item))
    : [...cart, next];
}
export function parseCart(raw) {
  try {
    const parsed = JSON.parse(raw ?? '[]');
    if (!Array.isArray(parsed)) return [];
    return parsed.reduce((cart, item) => {
      if (
        !item ||
        typeof item.id !== 'string' ||
        !Number.isInteger(item.quantity) ||
        item.quantity <= 0
      )
        return cart;
      const previous = cart.find((row) => row.id === item.id)?.quantity ?? 0;
      return updateQuantity(cart, item.id, Math.min(99, previous + item.quantity));
    }, []);
  } catch {
    return [];
  }
}
export function cartTotal(cart) {
  return cart.reduce(
    (total, item) =>
      total + (menuItems.find((menu) => menu.id === item.id)?.price ?? 0) * item.quantity,
    0,
  );
}
export function validateCheckout(name, pickup, count) {
  const errors = {};
  if (name.trim().length < 2 || name.trim().length > 60)
    errors.name = 'Isi nama pelanggan, minimal 2 dan maksimal 60 karakter.';
  if (!pickupOptions.some((option) => option.value === pickup))
    errors.pickup = 'Pilih waktu pengambilan dulu, ya.';
  if (count < 1) errors.cart = 'Tambahkan menu sebelum mengonfirmasi pesanan.';
  return errors;
}
export function validateContact(data) {
  const errors = {};
  if (data.name.trim().length < 2 || data.name.length > 60)
    errors.name = 'Isi nama minimal 2 dan maksimal 60 karakter.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()) || data.email.length > 120)
    errors.email = 'Masukkan alamat email yang valid.';
  if (data.message.trim().length < 10 || data.message.length > 1000)
    errors.message = 'Tulis pesan antara 10–1.000 karakter.';
  return errors;
}
export function parseOrder(raw) {
  try {
    const data = JSON.parse(raw ?? 'null');
    if (!data || typeof data !== 'object') return null;
    const order = data;
    if (
      typeof order.id !== 'string' ||
      typeof order.name !== 'string' ||
      typeof order.pickup !== 'string' ||
      typeof order.note !== 'string' ||
      typeof order.createdAt !== 'string' ||
      !Number.isFinite(Date.parse(order.createdAt))
    )
      return null;
    const items = parseCart(JSON.stringify(order.items));
    if (!items.length) return null;
    return {
      id: order.id.slice(0, 40),
      name: order.name.slice(0, 60),
      pickup: order.pickup.slice(0, 100),
      note: order.note.slice(0, 300),
      createdAt: order.createdAt,
      items,
      total: cartTotal(items),
    };
  } catch {
    return null;
  }
}
