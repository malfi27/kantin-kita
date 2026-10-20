import { Clock3, Mail } from 'lucide-react';
import { PageHeading } from '@/components/ui';
import { ContactForm } from '@/components/contact-form';
import { LocationMap } from '@/components/location-map';
export const metadata = { title: 'Kontak' };
export default function KontakPage() {
  return (
    <main id="main" className="page-width py-10 sm:py-12">
      <PageHeading
        eyebrow="Selalu dekat denganmu"
        title="Yuk, mampir atau sapa kami."
        description="Punya pertanyaan, saran, atau sekadar ingin bilang makanannya enak? Kami senang mendengarnya."
      />
      <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
        <div>
          <LocationMap />
          <h2 className="mt-6 text-xl font-bold tracking-tight">Ada tempat untukmu di sini.</h2>
          <p className="mt-2 text-xs leading-6 text-muted">
            Ilustrasi lokasi contoh untuk prototipe. Alamat lengkap bisa ditambahkan di sini.
          </p>
          <dl className="mt-6 space-y-5">
            <div className="flex gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-peach text-brand">
                <Clock3 size={18} />
              </span>
              <div>
                <dt className="text-[10px] text-muted">Jam buka</dt>
                <dd className="mt-1.5 text-xs font-semibold">Senin–Jumat 08.00–16.00</dd>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-peach text-brand">
                <Mail size={18} />
              </span>
              <div>
                <dt className="text-[10px] text-muted">Email contoh</dt>
                <dd className="mt-1.5 text-xs font-semibold">kantin@example.com</dd>
              </div>
            </div>
          </dl>
        </div>
        <ContactForm />
      </div>
    </main>
  );
}
