'use client';

import { useEffect, useState } from 'react';
import { ApplicationShell } from '@/components/ApplicationShell';
import { getAppState, getCurrentUser, saveAppState } from '@/lib/storage';
import { formatCurrency } from '@/lib/utils';

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    const appState = getAppState();
    setUser(currentUser);
    setState(appState);
  }, []);

  const updateReward = (rewardId: string, status: 'confirmed' | 'rejected') => {
    const appState = getAppState();
    const nextRewards = appState.rewards.map((reward) => 
      reward.id === rewardId ? { ...reward, status } : reward
    );
    const updatedUsers = appState.users.map((member) => {
      if (member.role !== 'member') return member;
      const memberTotal = nextRewards
        .filter((reward) => reward.userId === member.id && reward.status === 'confirmed')
        .reduce((sum, reward) => sum + reward.amount, 0);
      return { ...member, balance: memberTotal };
    });

    saveAppState({ ...appState, rewards: nextRewards, users: updatedUsers });
    setState({ ...appState, rewards: nextRewards, users: updatedUsers });
  };

  const handlePayout = (payoutId: string) => {
    const appState = getAppState();
    const updatedPayouts = appState.payouts.map((item) => item.id === payoutId ? { ...item, status: 'paid' } : item);
    saveAppState({ ...appState, payouts: updatedPayouts });
    setState({ ...appState, payouts: updatedPayouts });
  };

  if (!user || user.role !== 'admin') {
    return (
      <ApplicationShell>
        <section className="container-shell py-16">
          <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">Admin access only</p>
            <h1 className="mt-3 text-3xl font-black text-navy">Log in with the admin account to continue.</h1>
          </div>
        </section>
      </ApplicationShell>
    );
  }

  const pendingRewards = state?.rewards.filter((reward) => reward.status === 'pending') ?? [];
  const payoutRequests = state?.payouts ?? [];

  return (
    <ApplicationShell>
      <section className="container-shell py-10">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">Admin controls</p>
          <h1 className="mt-2 text-4xl font-black text-navy">Review rewards and payouts.</h1>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Members</p>
            <p className="mt-2 text-3xl font-black text-navy">{state?.users.filter((member) => member.role === 'member').length ?? 0}</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Pending rewards</p>
            <p className="mt-2 text-3xl font-black text-navy">{pendingRewards.length}</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Payout requests</p>
            <p className="mt-2 text-3xl font-black text-navy">{payoutRequests.length}</p>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-navy">Pending rewards</h2>
            <div className="mt-6 space-y-4">
              {pendingRewards.length === 0 ? (
                <p className="text-slate-600">No pending rewards to review.</p>
              ) : (
                pendingRewards.map((reward) => (
                  <div key={reward.id} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-bold text-navy">{reward.title}</p>
                        <p className="text-sm text-slate-500">{reward.offerType}</p>
                      </div>
                      <p className="font-black text-navy">{formatCurrency(reward.amount)}</p>
                    </div>
                    <div className="mt-4 flex gap-3">
                      <button onClick={() => updateReward(reward.id, 'confirmed')} className="rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white">Approve</button>
                      <button onClick={() => updateReward(reward.id, 'rejected')} className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white">Reject</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-navy">Payout requests</h2>
            <div className="mt-6 space-y-4">
              {payoutRequests.length === 0 ? (
                <p className="text-slate-600">No payout requests yet.</p>
              ) : (
                payoutRequests.map((payout) => (
                  <div key={payout.id} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-bold text-navy">Request: {formatCurrency(payout.amount)}</p>
                        <p className="text-sm text-slate-500">{payout.status}</p>
                      </div>
                      {payout.status !== 'paid' ? (
                        <button onClick={() => handlePayout(payout.id)} className="rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white">Mark paid</button>
                      ) : null}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </ApplicationShell>
  );
}
