# Catatan pengujian Kantin Kita

Tanggal: 15 Oktober 2026. Build dan tes dijalankan di Node.js 24.14.1. Pengujian UI menggunakan hasil build statis di browser Codex.

Build produksi dan lima tes logika lulus. Audit dependensi tidak menemukan kerentanan.

## Tes otomatis

`npm test` mencakup lima skenario:

1. Menu yang sama digabung dan total 2 Nasi Ayam + 1 Es Teh menjadi Rp41.000.
2. Jumlah nol menghapus item; jumlah negatif, pecahan, dan id tidak dikenal ditolak.
3. Storage rusak aman; entri duplikat digabung dan jumlah dibatasi 99.
4. Checkout menolak nama kosong, pilihan waktu tidak dikenal, dan keranjang kosong.
5. Form kontak menolak nama spasi, email tidak valid, dan pesan terlalu pendek.

## Skenario browser

| Skenario | Hasil |
| --- | --- |
| Buka Beranda dan navigasi ke Menu | Berhasil |
| Filter Minuman + cari “jeruk” | Hanya Es Jeruk yang tampil |
| Cari menu yang tidak ada | Keadaan kosong dan tombol reset muncul |
| Tambah 2 Nasi Ayam dan 1 Es Teh | Jumlah 3 item, total Rp41.000 |
| Kurangi satu Nasi Ayam | Total berubah menjadi Rp23.000 |
| Kembalikan jumlah dan isi catatan, lalu reload | Keranjang Rp41.000 dan catatan dipulihkan |
| Konfirmasi dengan nama kosong | Error tampil dan fokus pindah ke nama |
| Konfirmasi nama valid, pengambilan 30 menit | Bukti pesanan muncul dan keranjang kosong |
| Kirim form kontak kosong | Tiga error tampil di field terkait |
| Kirim form kontak valid memakai data contoh | Notifikasi pesan lokal tersimpan muncul |
| Navigasi ponsel | Bisa dibuka dan dipilih, lalu tertutup |
| Layout 390 px dan 320 px | Diperiksa untuk overflow horizontal |

Screenshot hasil pengujian ada di folder `screenshots/` (lima halaman desktop dan dua halaman ponsel). Uji ulang setelah perbaikan memastikan tombol lanjut bisa dipakai saat notifikasi tampil dan kontrol jumlah tidak lagi bertumpuk. Review source independen tidak menemukan isu konkret tambahan.

Pengujian ponsel menemukan notifikasi menutupi tombol dan kontrol jumlah terlalu rapat. Notifikasi dipindah ke atas dan baris kontrol jumlah diberi baris sendiri pada layar kecil.

## Skenario demonstrasi 3–5 menit

1. Perkenalkan Beranda dan struktur lima halaman.
2. Buka Menu, coba pencarian, kategori, dan kondisi hasil kosong.
3. Tambah dua Nasi Ayam serta satu Es Teh, tunjukkan subtotal Rp41.000.
4. Ubah jumlah, isi catatan, dan reload untuk menunjukkan localStorage.
5. Buka Ringkasan, coba nama kosong, lalu konfirmasi dengan nama contoh.
6. Buka Kontak, tunjukkan validasi email/pesan dan status penyimpanan demo.
7. Ubah lebar browser untuk memperlihatkan navigasi dan susunan ponsel.

Tombol cetak memakai dialog cetak browser. Belum ada pengujian pada perangkat fisik atau browser lain. Tidak ada backend, pembayaran, maupun pengiriman pesan nyata yang diuji.

## Perubahan ke JavaScript

Komponen diubah dari `.tsx` ke `.jsx`, sedangkan data, fungsi, dan tes diubah dari `.ts` ke `.js`. Konfigurasi menggunakan `jsconfig.json` dan `next.config.mjs`. Tes sekarang dijalankan langsung dengan Node.js, tanpa `tsx` atau TypeScript.

Setelah konversi, kelima tes logika dan build produksi dengan Webpack berhasil. Pengujian browser pada tabel di atas dilakukan sebelum konversi; tidak diulang pada tahap ini.
