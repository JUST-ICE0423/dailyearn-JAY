'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ApplicationShell } from '@/components/ApplicationShell';
import { getAppState, getCurrentUser, saveAppState } from '@/lib/storage';
import { formatCurrency } from '@/lib/utils';

export default function LedgerPage() {
  const [rewards, setRewards] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const appState = getAppState();
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setRewards(appState.rewards.filter((reward) => reward.userId === currentUser?.id));
  }, []);

  return (
    <ApplicationShell>
      <section className="container-shell py-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">Reward ledger</p>
            <h1 className="mt-2 text-4xl font-black text-navy">Pending and confirmed rewards.</h1>
          </div>
          <Link href="/dashboard" className="text-sm font-semibold text-teal-600">Back to dashboard</Link>
        </div>

        <div className="mt-8 space-y-4">
          {rewards.length === 0 ? (
            <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
              <p className="text-slate-600">No reward activity has been recorded yet.</p>
            </div>
          ) : (
            rewards.map((reward) => (
              <div key={reward.id} className="rounded-3xl bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-lg font-bold text-navy">{reward.title}</p>
                    <p className="text-sm text-slate-500">{reward.offerType}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-xl font-black text-navy">{formatCurrency(reward.amount)}</p>
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${reward.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {reward.status}
                    </span>
                  </div>
                </div>
                <div className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
                  Added {new Date(reward.createdAt).toLocaleDateString('en-ZA')}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </ApplicationShell>
  );
}
