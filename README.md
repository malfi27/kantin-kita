# Kantin Kita

Kantin Kita adalah website pemesanan makanan. Pengguna bisa melihat menu, memilih makanan dan minuman, lalu menentukan waktu pengambilan pesanan di kantin.

Project ini menggunakan Next.js,

Saat ini project baru mencakup bagian frontend. Data menu masih berupa contoh, sedangkan keranjang dan pesanan disimpan di `localStorage` browser.

## Cara menjalankan

Pastikan Node.js versi 20.9 atau lebih baru sudah terpasang, lalu jalankan perintah berikut dari folder project:

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser. Kalau port 3000 sedang dipakai, gunakan:

```bash
npm run dev -- --port 3001
```

Untuk mencoba hasil build:

```bash
npm run build
npm start
```

Hasil build tersimpan di folder `out/`.

## Halaman dan fitur

- **Beranda:** pengenalan kantin dan beberapa menu favorit.
- **Menu:** daftar makanan dan minuman, pencarian, serta filter kategori.
- **Pesanan:** daftar menu yang dipilih, pengaturan jumlah, hapus item, dan catatan untuk dapur. Total harga dihitung otomatis.
- **Ringkasan Pemesanan:** pengecekan pesanan, nama pelanggan, waktu pengambilan, dan konfirmasi. Ringkasan yang sudah dikonfirmasi bisa dicetak.
- **Kontak:** informasi kantin dan form pesan dengan validasi nama, email, serta isi pesan.

Tampilannya menyesuaikan ukuran layar komputer dan ponsel. Keranjang tetap tersimpan ketika halaman dimuat ulang.

Komponen tampilan menggunakan file `.jsx`, sedangkan data dan fungsi biasa menggunakan `.js`.

## Struktur folder

```text
src/
├── app/          # Halaman website dan style utama
├── components/   # Navbar, footer, kartu menu, form, dan komponen lainnya
└── lib/          # Data menu, perhitungan harga, dan validasi
public/images/    # Gambar makanan dan minuman
tests/            # Tes logika pesanan dan formulir
screenshots/      # Tangkapan layar website
```

Data menu dan harga bisa diubah di `src/lib/menu.js`. Warna dan style utama ada di `src/app/globals.css`. Pengaturan keranjang dan penyimpanan browser ada di `src/components/cart-provider.jsx`.

## Catatan

Pemesanan di website ini masih berupa simulasi. Konfirmasi tidak mengirim pesanan ke kantin dan belum ada pembayaran online. Form kontak juga hanya menyimpan pesan terakhir di browser, bukan mengirim email.

Alamat, peta, jam buka, dan email masih menggunakan data contoh. Foto menu menggunakan gambar pengganti, jadi belum sama persis dengan aset di Figma.

Mode development dan build menggunakan Webpack. Jika perubahan file tidak terbaca di macOS/Linux, coba jalankan:

```bash
WATCHPACK_POLLING=true npm run dev
```

## Pengujian

```bash
npm test
npm run build
```

Tes mencakup perhitungan total, perubahan jumlah pesanan, data penyimpanan yang rusak, dan validasi form. Catatan pengujian selengkapnya ada di [PENGUJIAN.md](PENGUJIAN.md).

## Sumber gambar

| Gambar | Sumber |
| --- | --- |
| Nasi Ayam | [Arise](https://www.arise-app.com/dish/Nasi-Ayam-Goreng-with-Sambal-and-Keropok) |
| Nasi Goreng | [Unsplash](https://images.unsplash.com/photo-1603133872878-684f208fb84b) |
| Mie Goreng | [Holidify](https://www.holidify.com/pages/street-food-in-indonesia-2286.html) |
| Es Teh | [Unsplash](https://images.unsplash.com/photo-1556679343-c7306c1976bc) |
| Es Jeruk | [Unsplash](https://images.unsplash.com/photo-1613478223719-2ab802602423) |
| Pisang Goreng | [Foodpanda](https://www.foodpanda.sg/contents/pisang-goreng-recipe) |

Gambar dipakai sebagai contoh tampilan untuk tugas. Untuk penggunaan di luar tugas, sesuaikan dengan izin penggunaan dari masing-masing sumber.
