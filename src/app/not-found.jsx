import { ButtonLink } from '@/components/ui';
export default function NotFound() {
  return (
    <main id="main" className="page-width py-24 text-center">
      <p className="eyebrow">404 · Halaman tidak ditemukan</p>
      <h1 className="mt-4 text-3xl font-bold">Sepertinya salah meja.</h1>
      <p className="mt-4 text-sm text-muted">Yuk, kembali dan cari menu favoritmu.</p>
      <ButtonLink href="/" className="mt-7">
        Kembali ke beranda
      </ButtonLink>
    </main>
  );
}
