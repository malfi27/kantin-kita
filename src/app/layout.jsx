import './globals.css';
import { CartProvider } from '@/components/cart-provider';
import { Navbar, Footer } from '@/components/site-shell';
export const metadata = {
  title: { default: 'Kantin Kita — Makan enak, nggak perlu ribet', template: '%s | Kantin Kita' },
  description:
    'Makanan rumahan, harga bersahabat. Pilih menu favoritmu, pesan, lalu ambil di Kantin Kita.',
};
export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <CartProvider>
          <a
            href="#main"
            className="sr-only z-50 rounded bg-ink p-3 text-white focus:not-sr-only focus:absolute"
          >
            Lewati ke konten utama
          </a>
          <div className="flex min-h-dvh flex-col">
            <Navbar />
            {children}
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
