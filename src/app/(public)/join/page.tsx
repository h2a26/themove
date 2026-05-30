import { signIn, auth } from '@/auth';
import { redirect } from 'next/navigation';

export const metadata = { title: 'Join | The Move' };

const googleConfigured = !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);

export default async function JoinPage() {
  const session = await auth();
  // Already signed in — send to profile
  if (session?.user && (session.user as { role?: string }).role !== 'admin') {
    redirect('/me');
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-10">
          <p
            className="text-[10px] uppercase tracking-[6px] text-[var(--mode-text-tertiary)] mb-3"
            style={{ fontFamily: 'var(--font-acaslon-pro)' }}
          >
            The Move
          </p>
          <h1
            className="text-3xl font-semibold tracking-wide text-[var(--mode-text-primary)] mb-4"
            style={{ fontFamily: 'var(--font-acaslon-pro)' }}
          >
            Join
          </h1>
          <p className="text-sm text-[var(--mode-text-secondary)] leading-relaxed max-w-xs mx-auto">
            Save projects, build your Moodboard, and book a free consultation with Pyae Thiri.
          </p>
        </div>

        {/* Sign-in form */}
        <div className="bg-white/80 backdrop-blur border border-[var(--mode-border)] rounded-2xl p-8">
          {googleConfigured ? (
            <form
              action={async () => {
                'use server';
                await signIn('google', { redirectTo: '/' });
              }}
            >
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm text-gray-700 text-sm font-medium py-3 px-5 rounded-xl transition-all"
              >
                {/* Google G logo */}
                <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                  <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
                  <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"/>
                  <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
                  <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"/>
                </svg>
                Continue with Google
              </button>
            </form>
          ) : (
            <div className="text-center py-2">
              <p className="text-sm text-[var(--mode-text-secondary)] mb-1">Google sign-in coming soon.</p>
              <p className="text-[11px] text-[var(--mode-text-tertiary)]">
                GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET need to be configured.
              </p>
            </div>
          )}

          <p className="text-[11px] text-[var(--mode-text-tertiary)] text-center mt-5 leading-relaxed">
            By joining, you agree to our terms of service.
            <br />Browsing The Move is always free — no account needed.
          </p>
        </div>
      </div>
    </div>
  );
}
