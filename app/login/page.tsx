'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ApplicationShell } from '@/components/ApplicationShell';
import { getAppState, saveAppState } from '@/lib/storage';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@dailyearn.co.za');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedEmail = email.trim().toLowerCase();
    const appState = getAppState();
    const user = appState.users.find((member) => member.email.toLowerCase() === trimmedEmail && member.password === password);

    if (!user) {
      setError('Incorrect email or password. Use the demo credentials to test the app.');
      return;
    }

    const nextState = { ...appState, sessionUserId: user.id };
    saveAppState(nextState);
    window.location.href = '/dashboard';
  };

  return (
    <ApplicationShell>
      <section className="container-shell py-12">
        <div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-lg">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">Welcome back</p>
          <h1 className="mt-3 text-3xl font-black text-navy">Log in to DailyEarn</h1>
          <p className="mt-3 text-slate-600">Use the demo account below to preview the admin and member dashboard.</p>

          <div className="mt-6 rounded-2xl bg-slate-100 p-4 text-sm text-slate-600">
            <p><span className="font-semibold text-navy">Admin:</span> admin@dailyearn.co.za / admin123</p>
            <p className="mt-1"><span className="font-semibold text-navy">Member:</span> member@dailyearn.co.za / member123</p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={onSubmit}>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Email address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-teal-500" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-teal-500" />
            </div>

            {error ? <p className="rounded-2xl bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}

            <button type="submit" className="w-full rounded-2xl bg-teal-600 px-5 py-3 font-semibold text-white hover:bg-teal-500">
              Log in
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            New to DailyEarn?{' '}
            <Link href="/register" className="font-semibold text-teal-600">Create account</Link>
          </p>
        </div>
      </section>
    </ApplicationShell>
  );
}
