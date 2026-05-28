'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const form = new FormData(e.currentTarget);
    const result = await signIn('credentials', {
      email: form.get('email') as string,
      password: form.get('password') as string,
      redirect: false,
    });

    if (result?.error) {
      setError('Invalid email or password.');
      setLoading(false);
    } else {
      router.push('/admin');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--mode-bg-from)]">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="text-[10px] uppercase tracking-[5px] text-[var(--mode-text-tertiary)] mb-2">The Move</p>
          <h1 className="text-xl font-semibold tracking-widest uppercase text-[var(--mode-text-primary)]">Admin</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur border border-[var(--mode-border)] rounded-lg p-8 flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] uppercase tracking-[3px] text-[var(--mode-text-tertiary)]">Email</label>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="border border-[var(--mode-border)] rounded px-3 py-2.5 text-sm text-[var(--mode-text-primary)] bg-white focus:outline-none focus:ring-1 focus:ring-[var(--color-deep-earth)]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] uppercase tracking-[3px] text-[var(--mode-text-tertiary)]">Password</label>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="border border-[var(--mode-border)] rounded px-3 py-2.5 text-sm text-[var(--mode-text-primary)] bg-white focus:outline-none focus:ring-1 focus:ring-[var(--color-deep-earth)]"
            />
          </div>

          {error && (
            <p className="text-xs text-red-600 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-[var(--color-deep-earth)] text-white text-[11px] uppercase tracking-[3px] py-3 rounded hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
