'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ApplicationShell } from '@/components/ApplicationShell';
import { OfferCard } from '@/components/OfferCard';
import { getAppState, getCurrentUser, saveAppState } from '@/lib/storage';
import { formatCurrency } from '@/lib/utils';

export default function OffersPage() {
  const [offers, setOffers] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const appState = getAppState();
    setOffers(appState.offers);
    setUser(getCurrentUser());
  }, []);

  const handleCompleteOffer = (offerId: string) => {
    const appState = getAppState();
    const currentUser = getCurrentUser();
    if (!currentUser) {
      window.location.href = '/login';
      return;
    }

    const reward = {
      id: `reward-${Date.now()}`,
      userId: currentUser.id,
      offerId,
      title: appState.offers.find((offer) => offer.id === offerId)?.title ?? 'Offer reward',
      amount: appState.offers.find((offer) => offer.id === offerId)?.reward ?? 0,
      offerType: appState.offers.find((offer) => offer.id === offerId)?.category ?? 'Offer',
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    const next = {
      ...appState,
      rewards: [reward, ...appState.rewards],
    };

    saveAppState(next);
    window.location.href = '/ledger';
  };

  return (
    <ApplicationShell>
      <section className="container-shell py-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">Approved offers</p>
            <h1 className="mt-2 text-4xl font-black text-navy">Earn through transparent, approved activities.</h1>
          </div>
          <Link href="/dashboard" className="text-sm font-semibold text-teal-600">Back to dashboard</Link>
        </div>

        <div className="mt-8 rounded-3xl bg-navy p-5 text-white">
          <p className="text-sm uppercase tracking-[0.2em] text-teal-200">Important</p>
          <p className="mt-3 max-w-3xl text-slate-200">
            DailyEarn does not guarantee income, does not require any deposit, and does not reward incentivized clicks. Rewards are only credited when the offer is approved and validated.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} onSelect={handleCompleteOffer} />
          ))}
        </div>
      </section>
    </ApplicationShell>
  );
}
