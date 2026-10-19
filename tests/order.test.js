import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  updateQuantity,
  parseCart,
  cartTotal,
  validateCheckout,
  validateContact,
} from '../src/lib/order.js';
test('item yang sama digabung dan subtotal mengikuti jumlah terbaru', () => {
  const cart = updateQuantity([{ id: 'nasi-ayam', quantity: 1 }], 'nasi-ayam', 2);
  assert.deepEqual(cart, [{ id: 'nasi-ayam', quantity: 2 }]);
  assert.equal(cartTotal([...cart, { id: 'es-teh', quantity: 1 }]), 41000);
});
test('jumlah nol menghapus item; jumlah negatif dan pecahan tidak masuk', () => {
  assert.deepEqual(updateQuantity([{ id: 'es-teh', quantity: 1 }], 'es-teh', 0), []);
  assert.deepEqual(updateQuantity([], 'es-teh', -2), []);
  assert.deepEqual(updateQuantity([], 'es-teh', 1.5), []);
  assert.deepEqual(updateQuantity([], 'menu-tidak-ada', 2), []);
});
test('data storage rusak aman, duplikat digabung, dan jumlah dibatasi', () => {
  assert.deepEqual(parseCart('{rusak'), []);
  assert.deepEqual(parseCart('{"quantity":2}'), []);
  assert.deepEqual(
    parseCart('[null,{"id":"asing","quantity":1},{"id":"es-teh","quantity":-1}]'),
    [],
  );
  assert.deepEqual(
    parseCart(
      '[{"id":"es-teh","quantity":2},{"id":"es-teh","quantity":3},{"id":"nasi-ayam","quantity":999}]',
    ),
    [
      { id: 'es-teh', quantity: 5 },
      { id: 'nasi-ayam', quantity: 99 },
    ],
  );
});
test('checkout menolak nama kosong, waktu tak dikenal, dan keranjang kosong', () => {
  assert.ok(validateCheckout('   ', 'secepatnya', 1).name);
  assert.ok(validateCheckout('Budi', 'waktu-asing', 1).pickup);
  assert.ok(validateCheckout('Budi', 'secepatnya', 0).cart);
  assert.deepEqual(validateCheckout('Budi', 'secepatnya', 2), {});
});
test('kontak menolak spasi, email salah, dan pesan terlalu pendek', () => {
  const errors = validateContact({ name: ' ', email: 'budi@', message: ' ' });
  assert.ok(errors.name && errors.email && errors.message);
  assert.deepEqual(
    validateContact({
      name: 'Budi',
      email: 'budi@example.com',
      message: 'Apakah kantin buka hari Jumat?',
    }),
    {},
  );
});
