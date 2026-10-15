'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ApplicationShell } from '@/components/ApplicationShell';
import { getAppState, saveAppState, type AppUser } from '@/lib/storage';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedEmail = email.trim().toLowerCase();
    const appState = getAppState();

    if (!name.trim() || !trimmedEmail || !password.trim()) {
      setError('Please complete all fields.');
      return;
    }

    const existing = appState.users.find((user) => user.email.toLowerCase() === trimmedEmail);
    if (existing) {
      setError('An account already exists for this email address.');
      return;
    }

    const user: AppUser = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: trimmedEmail,
      password,
      role: 'member',
      balance: 0,
      createdAt: new Date().toISOString(),
    };

    const nextState = {
      ...appState,
      users: [...appState.users, user],
      sessionUserId: user.id,
    };

    saveAppState(nextState);
    window.location.href = '/dashboard';
  };

  return (
    <ApplicationShell>
      <section className="container-shell py-12">
        <div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-lg">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">Create account</p>
          <h1 className="mt-3 text-3xl font-black text-navy">Join DailyEarn with JAY</h1>
          <p className="mt-3 text-slate-600">Free registration. No deposit required. No crypto wallet required.</p>

          <form className="mt-8 space-y-5" onSubmit={onSubmit}>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Full name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-teal-500" placeholder="Your full name" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Email address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-teal-500" placeholder="name@example.com" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-teal-500" placeholder="Create a password" />
            </div>

            {error ? <p className="rounded-2xl bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}

            <button type="submit" className="w-full rounded-2xl bg-navy px-5 py-3 font-semibold text-white hover:bg-sky-900">
              Create free account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-teal-600">Log in</Link>
          </p>
        </div>
      </section>
    </ApplicationShell>
  );
}
