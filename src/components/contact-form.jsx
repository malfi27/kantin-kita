'use client';
import { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { Field } from './ui';
import { validateContact } from '@/lib/order';
export function ContactForm() {
  const [data, setData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateContact(data);
    setErrors(nextErrors);
    setStatus('');
    if (Object.keys(nextErrors).length) {
      document.getElementById(`contact-${Object.keys(nextErrors)[0]}`)?.focus();
      return;
    }
    try {
      localStorage.setItem(
        'kantin-kita:message',
        JSON.stringify({
          name: data.name.trim(),
          email: data.email.trim(),
          message: data.message.trim(),
          createdAt: new Date().toISOString(),
        }),
      );
      setStatus('Pesan contoh tersimpan di browser. Pesan ini tidak dikirim ke pengelola kantin.');
      setData({ name: '', email: '', message: '' });
    } catch {
      setErrors({
        storage:
          'Pesan belum tersimpan karena penyimpanan browser tidak tersedia. Isianmu tetap ada, silakan coba lagi.',
      });
    }
  }
  return (
    <form noValidate onSubmit={handleSubmit} className="panel">
      <h2 className="text-xl font-bold tracking-tight">Kirim pesan</h2>
      <p className="mt-2 text-xs leading-6 text-muted">
        Lagi punya ide buat kami? Kami senang mendengarnya.
      </p>
      <div className="mt-6 space-y-5">
        <Field id="contact-name" label="Nama" error={errors.name}>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            maxLength={60}
            required
            value={data.name}
            onChange={(event) => setData({ ...data, name: event.target.value })}
            placeholder="Nama lengkap kamu"
            className="input"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
          />
        </Field>
        <Field id="contact-email" label="Email" error={errors.email}>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={120}
            required
            value={data.email}
            onChange={(event) => setData({ ...data, email: event.target.value })}
            placeholder="nama@email.com"
            className="input"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
          />
        </Field>
        <Field id="contact-message" label="Pesan" error={errors.message}>
          <textarea
            id="contact-message"
            name="message"
            maxLength={1000}
            required
            rows={4}
            value={data.message}
            onChange={(event) => setData({ ...data, message: event.target.value })}
            placeholder="Apa yang ingin kamu sampaikan?"
            className="input resize-y"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'contact-message-error' : undefined}
          />
        </Field>
      </div>
      <button type="submit" className="button-primary mt-5 w-full">
        Kirim pesan
        <ArrowUpRight size={16} />
      </button>
      <p className="mt-3 text-[10px] leading-5 text-muted">
        Form demo — pesan hanya disimpan di browser ini.
      </p>
      {status && (
        <p
          role="status"
          className="mt-4 flex gap-2 rounded-lg bg-green-50 p-3 text-xs leading-5 text-green-800"
        >
          <Check size={18} className="shrink-0" />
          {status}
        </p>
      )}
      {errors.storage && (
        <p role="alert" className="mt-4 text-xs leading-5 text-red-700">
          {errors.storage}
        </p>
      )}
    </form>
  );
}
