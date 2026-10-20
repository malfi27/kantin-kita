import { PageHeading } from '@/components/ui';
import { CartPage } from '@/components/cart-page';
export const metadata = { title: 'Pesanan' };
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
