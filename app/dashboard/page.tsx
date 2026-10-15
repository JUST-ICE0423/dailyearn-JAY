'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ApplicationShell } from '@/components/ApplicationShell';
import { StatCard } from '@/components/StatCard';
import { getAppState, getCurrentUser } from '@/lib/storage';
import { formatCurrency } from '@/lib/utils';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [rewards, setRewards] = useState<any[]>([]);

  useEffect(() => {
    const appState = getAppState();
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setRewards(appState.rewards.filter((reward) => reward.userId === currentUser?.id));
  }, []);

  const stats = useMemo(() => {
    const confirmed = rewards.filter((reward) => reward.status === 'confirmed').reduce((sum, reward) => sum + reward.amount, 0);
    const pending = rewards.filter((reward) => reward.status === 'pending').reduce((sum, reward) => sum + reward.amount, 0);
    return [
      { title: 'Confirmed earnings', value: formatCurrency(confirmed) },
      { title: 'Pending rewards', value: formatCurrency(pending) },
      { title: 'Available balance', value: formatCurrency((user?.balance ?? 0) + confirmed) },
    ];
  }, [rewards, user]);

  if (!user) {
    return (
      <ApplicationShell>
        <section className="container-shell py-16">
          <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">Not signed in</p>
            <h1 className="mt-3 text-3xl font-black text-navy">Please log in to view your dashboard.</h1>
            <Link href="/login" className="mt-6 inline-flex rounded-full bg-navy px-5 py-3 font-semibold text-white">
              Go to login
            </Link>
          </div>
        </section>
      </ApplicationShell>
    );
  }

  return (
    <ApplicationShell>
      <section className="container-shell py-10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">Dashboard</p>
            <h1 className="mt-2 text-4xl font-black text-navy">Welcome back, {user.name.split(' ')[0]}.</h1>
          </div>
          <Link href="/payout" className="rounded-full bg-teal-600 px-5 py-3 font-semibold text-white hover:bg-teal-500">
            Request payout
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {stats.map((item) => (
            <StatCard key={item.title} title={item.title} value={item.value} />
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-navy">Recent rewards</h2>
              <Link href="/ledger" className="text-sm font-semibold text-teal-600">View ledger</Link>
            </div>

            <div className="mt-6 space-y-4">
              {rewards.length === 0 ? (
                <p className="rounded-2xl bg-slate-100 p-5 text-slate-600">No reward activity yet. Start by exploring approved offers.</p>
              ) : (
                rewards.slice(0, 5).map((reward) => (
                  <div key={reward.id} className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
                    <div>
                      <p className="font-bold text-navy">{reward.title}</p>
                      <p className="text-sm text-slate-500">{reward.offerType}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-navy">{formatCurrency(reward.amount)}</p>
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${reward.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {reward.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-navy">Quick actions</h2>
            <div className="mt-6 space-y-3">
              <Link href="/offers" className="block rounded-2xl bg-slate-100 p-4 font-semibold text-navy hover:bg-slate-200">
                Browse approved offers
              </Link>
              <Link href="/ledger" className="block rounded-2xl bg-slate-100 p-4 font-semibold text-navy hover:bg-slate-200">
                Review reward history
              </Link>
              <Link href="/support" className="block rounded-2xl bg-slate-100 p-4 font-semibold text-navy hover:bg-slate-200">
                Contact support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </ApplicationShell>
  );
}
