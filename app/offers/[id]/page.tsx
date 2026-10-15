'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ApplicationShell } from '@/components/ApplicationShell';
import { getAppState, getCurrentUser, saveAppState } from '@/lib/storage';
import { formatCurrency } from '@/lib/utils';

export default function OfferDetailPage({ params }: { params: { id: string } }) {
  const [offer, setOffer] = useState<any>(null);

  useEffect(() => {
    const appState = getAppState();
    const selected = appState.offers.find((item) => item.id === params.id) ?? appState.offers[0];
    setOffer(selected);
  }, [params.id]);

  if (!offer) return null;

  const completeOffer = () => {
    const appState = getAppState();
    const currentUser = getCurrentUser();
    if (!currentUser) {
      window.location.href = '/login';
      return;
    }

    const reward = {
      id: `reward-${Date.now()}`,
      userId: currentUser.id,
      offerId: offer.id,
      title: offer.title,
      amount: offer.reward,
      offerType: offer.category,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    saveAppState({ ...appState, rewards: [reward, ...appState.rewards] });
    window.location.href = '/ledger';
  };

  return (
    <ApplicationShell>
      <section className="container-shell py-10">
        <div className="mb-6">
          <Link href="/offers" className="text-sm font-semibold text-teal-600">← Back to offers</Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <div className="inline-flex rounded-full bg-teal-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-teal-700">
              {offer.category}
            </div>
            <h1 className="mt-5 text-4xl font-black text-navy">{offer.title}</h1>
            <p className="mt-4 text-lg text-slate-600">{offer.description}</p>
            <div className="mt-8 flex items-center gap-5">
              <div className="rounded-2xl bg-slate-100 p-4">
                <p className="text-sm text-slate-500">Reward</p>
                <p className="mt-2 text-3xl font-black text-navy">{formatCurrency(offer.reward)}</p>
              </div>
              <div className="rounded-2xl bg-slate-100 p-4">
                <p className="text-sm text-slate-500">Status</p>
                <p className="mt-2 text-lg font-bold text-green-700">Approved</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-navy p-8 text-white shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-teal-200">Before you proceed</p>
            <ul className="mt-6 space-y-4 text-slate-200">
              <li>• You must understand the task before accepting it.</li>
              <li>• No guaranteed earnings are promised.</li>
              <li>• No ad clicks are incentivized or rewarded automatically.</li>
              <li>• Offers must pass validation before payout.</li>
            </ul>
            <button onClick={completeOffer} className="mt-8 w-full rounded-2xl bg-teal-500 px-5 py-3 font-semibold text-white hover:bg-teal-400">
              I completed this offer
            </button>
          </div>
        </div>
      </section>
    </ApplicationShell>
  );
}
