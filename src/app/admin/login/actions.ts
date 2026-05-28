'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function adminSignIn(
  _prevState: { error: string } | null,
  formData: FormData,
): Promise<{ error: string } | null> {
  try {
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirectTo: '/admin',
    });
  } catch (error) {
    // signIn throws a NEXT_REDIRECT on success — we must re-throw it
    if (error instanceof AuthError) {
      return { error: 'Invalid email or password.' };
    }
    throw error;
  }
  return null;
}
