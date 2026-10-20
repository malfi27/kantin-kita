import { PageHeading } from '@/components/ui';
import { Checkout } from '@/components/checkout';
export const metadata = { title: 'Ringkasan Pemesanan' };
export default function RingkasanPage() {
  return (
    <main id="main" className="page-width py-10 sm:py-12">
      <PageHeading
        eyebrow="Satu langkah lagi"
        title="Ringkasan Pemesanan"
        description="Cek sekali lagi, yuk! Biar pesanan makan siangmu sesuai keinginan."
      />
      <Checkout />
    </main>
  );
}
