'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ApplicationShell } from '@/components/ApplicationShell';
import { getAppState, getCurrentUser, saveAppState } from '@/lib/storage';
import { formatCurrency } from '@/lib/utils';

export default function PayoutPage() {
  const [user, setUser] = useState<any>(null);
  const [requestAmount, setRequestAmount] = useState('500');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  const submitRequest = (event: React.FormEvent) => {
    event.preventDefault();
    const appState = getAppState();
    const currentUser = getCurrentUser();
    if (!currentUser) {
      window.location.href = '/login';
      return;
    }

    const amount = Number(requestAmount) || 0;
    if (amount < 100) {
      setMessage('Payout requests must be at least R100.');
      return;
    }

    const payout = {
      id: `payout-${Date.now()}`,
      userId: currentUser.id,
      amount,
      status: 'pending',
      createdAt: new Date().toISOString(),
      paymentMethod: 'Bank transfer',
    };

    saveAppState({ ...appState, payouts: [payout, ...appState.payouts] });
    setMessage('Your payout request has been submitted for admin review.');
    setRequestAmount('500');
  };

  if (!user) {
    return (
      <ApplicationShell>
        <section className="container-shell py-16">
          <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">Not available</p>
            <h1 className="mt-3 text-3xl font-black text-navy">Please sign in to request a payout.</h1>
            <Link href="/login" className="mt-6 inline-flex rounded-full bg-navy px-5 py-3 font-semibold text-white">Login</Link>
          </div>
        </section>
      </ApplicationShell>
    );
  }

  return (
    <ApplicationShell>
      <section className="container-shell py-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">Payout request</p>
            <h1 className="mt-3 text-4xl font-black text-navy">Cash out your verified rewards.</h1>
            <p className="mt-4 text-slate-600">Minimum payout is R100. DailyEarn reviews each request before settlement.</p>

            <form className="mt-8 space-y-5" onSubmit={submitRequest}>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Amount requested (ZAR)</label>
                <input type="number" min="100" value={requestAmount} onChange={(e) => setRequestAmount(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-teal-500" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Payment method</label>
                <input value="Bank transfer" readOnly className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" />
              </div>
              <button type="submit" className="w-full rounded-2xl bg-navy px-5 py-3 font-semibold text-white hover:bg-sky-900">
                Submit request
              </button>
            </form>
            {message ? <p className="mt-4 rounded-2xl bg-green-50 p-3 text-sm text-green-700">{message}</p> : null}
          </div>

          <div className="rounded-3xl bg-navy p-8 text-white shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-teal-200">Current status</p>
            <div className="mt-8 rounded-2xl bg-white/5 p-5">
              <p className="text-slate-300">Available balance</p>
              <p className="mt-3 text-4xl font-black text-white">{formatCurrency(user.balance ?? 0)}</p>
            </div>
            <ul className="mt-6 space-y-4 text-slate-200">
              <li>• All payout requests are reviewed by admin.</li>
              <li>• Confirmed rewards are eligible for cash-out.</li>
              <li>• No guaranteed payout timeline is promised.</li>
            </ul>
          </div>
        </div>
      </section>
    </ApplicationShell>
  );
}
