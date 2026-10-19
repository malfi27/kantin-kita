import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock3, CookingPot, ShoppingBag, Wallet } from 'lucide-react';
import { MenuCard } from '@/components/menu-card';
import { ButtonLink } from '@/components/ui';
import { menuItems } from '@/lib/menu';
// Beranda adalah komponen server; hanya kartu menu yang memerlukan interaksi browser.
export default function Home() {
  const favorites = [menuItems[0], menuItems[1], menuItems[5]];
  return (
    <main id="main">
      <section className="page-width py-10 sm:py-14 lg:py-16">
        <div className="grid items-center gap-9 md:grid-cols-2 md:gap-12 lg:gap-20">
          <div>
            <p className="eyebrow">+ Rasa rumahan, harga bersahabat.</p>
            <h1 className="mt-5 max-w-lg text-[43px] leading-[1.1] font-extrabold tracking-[-0.055em] sm:text-[54px] lg:text-[62px]">
              Mau makan apa
              <br />
              hari ini?
            </h1>
            <p className="mt-5 max-w-[400px] text-sm leading-7 text-muted">
              Dari nasi hangat sampai minuman segar, selalu ada yang pas untuk menemani harimu. Yuk,
              pilih favoritmu di Kantin Kita.
            </p>
            <ButtonLink href="/menu" className="mt-7">
              Lihat menu
            </ButtonLink>
            <p className="mt-6 flex items-center gap-2 text-[11px] text-muted">
              <Clock3 size={14} />
              Buka Senin–Jumat, 08.00–16.00
            </p>
          </div>
          <div className="relative aspect-[1.18] overflow-hidden rounded-3xl bg-sand">
            <Image
              src="/images/nasi-ayam.webp"
              alt="Sepiring nasi ayam dengan sambal dan sayuran segar"
              fill
              priority
              sizes="(max-width: 767px) 100vw, 560px"
              className="object-cover"
            />
            <div className="absolute bottom-5 left-5 rounded-2xl bg-paper px-5 py-4 shadow-sm">
              <p className="text-[9px] font-bold uppercase tracking-wider text-brand">
                Favorit makan siang
              </p>
              <div className="mt-2 flex items-center gap-7">
                <span className="text-sm font-bold">Nasi Ayam</span>
                <span className="text-xs font-semibold">Rp18.000</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 grid gap-5 border-t border-line/60 pt-7 sm:mt-11 sm:grid-cols-3 sm:border-0 sm:pt-0">
          {[
            {
              icon: CookingPot,
              title: 'Dimasak dengan hati',
              text: 'Rasa rumahan, disajikan hangat.',
            },
            {
              icon: Wallet,
              title: 'Enak tanpa bikin boros',
              text: 'Pilihan nikmat untuk kantong bersahabat.',
            },
            {
              icon: ShoppingBag,
              title: 'Pesan, lalu ambil',
              text: 'Pilih menu, ambil saat waktu makan.',
            },
          ].map((feature) => (
            <div key={feature.title} className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-peach text-brand">
                <feature.icon size={20} strokeWidth={1.5} />
              </span>
              <div>
                <h2 className="text-xs font-bold">{feature.title}</h2>
                <p className="mt-1.5 text-[11px] leading-4 text-muted">{feature.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-sand py-10 sm:py-12">
        <div className="page-width">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Pilihan yang selalu dirindukan</p>
              <h2 className="mt-3 text-2xl font-extrabold tracking-[-0.035em] sm:text-[28px]">
                Favorit teman-teman kantin
              </h2>
            </div>
            <Link
              href="/menu"
              className="flex items-center gap-2 py-2 text-xs font-semibold text-brand hover:underline"
            >
              Lihat semua menu
              <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {favorites.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
      <section className="page-width flex flex-col justify-between gap-6 py-10 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-extrabold tracking-tight">
            Makan siang enak, nggak perlu ribet.
          </h2>
          <p className="mt-2 text-xs leading-6 text-muted">
            Pilih makanan favoritmu, bayar langsung saat ambil di kantin.
          </p>
        </div>
        <ButtonLink href="/menu" className="self-start sm:self-auto">
          Mulai pesan
        </ButtonLink>
      </section>
    </main>
  );
}
