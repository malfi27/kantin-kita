// Data contoh terpusat supaya harga di kartu dan ringkasan selalu sama.
export const menuItems = [
  {
    id: 'nasi-ayam',
    name: 'Nasi Ayam',
    category: 'Makanan',
    description: 'Ayam berbumbu, nasi hangat & sambal.',
    price: 18000,
    image: '/images/nasi-ayam.webp',
    badge: 'Favorit kita',
  },
  {
    id: 'nasi-goreng',
    name: 'Nasi Goreng',
    category: 'Makanan',
    description: 'Gurih khas rumahan, dengan telur mata sapi.',
    price: 15000,
    image: '/images/nasi-goreng.jpg',
    badge: 'Paling laris',
  },
  {
    id: 'mie-goreng',
    name: 'Mie Goreng',
    category: 'Makanan',
    description: 'Mie hangat yang bikin kenyang.',
    price: 14000,
    image: '/images/mie-goreng.jpg',
  },
  {
    id: 'es-teh',
    name: 'Es Teh',
    category: 'Minuman',
    description: 'Teh manis segar, teman setiap rasa.',
    price: 5000,
    image: '/images/es-teh.jpg',
  },
  {
    id: 'es-jeruk',
    name: 'Es Jeruk',
    category: 'Minuman',
    description: 'Manis segarnya jeruk dalam satu gelas.',
    price: 7000,
    image: '/images/es-jeruk.jpg',
  },
  {
    id: 'pisang-goreng',
    name: 'Pisang Goreng',
    category: 'Camilan',
    description: 'Renyah di luar, lembut manis di dalam.',
    price: 8000,
    image: '/images/pisang-goreng.jpg',
  },
];
// Formatter menerima angka rupiah dan menghasilkan harga tanpa desimal.
export function rupiah(value) {
  return `Rp${new Intl.NumberFormat('id-ID').format(value)}`;
}
