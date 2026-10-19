import { PageHeading } from '@/components/ui';
import { CartPage } from '@/components/cart-page';
export const metadata = { title: 'Pesanan' };
// Judul tetap berada di luar komponen stateful supaya route mudah dipahami.
export default function PesananPage() {
  return (
    <main id="main" className="page-width py-10 sm:py-12">
      <PageHeading
        eyebrow="Saatnya makan enak"
        title="Pesanan kamu"
        description="Sudah pas pilihannya? Atur jumlah dan tambahkan catatan sebelum lanjut."
      />
      <CartPage />
    </main>
  );
}
