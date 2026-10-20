import { PageHeading } from '@/components/ui';
import { MenuBrowser } from '@/components/menu-browser';
export const metadata = { title: 'Menu' };
export default function MenuPage() {
  return (
    <main id="main" className="page-width py-10 sm:py-12">
      <PageHeading
        eyebrow="Dari dapur kita"
        title="Menu untuk setiap selera."
        description="Makanan rumahan, minuman segar, dan camilan untuk jeda kecilmu."
      />
      <MenuBrowser />
    </main>
  );
}
