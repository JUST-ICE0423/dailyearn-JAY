'use client';

import { ApplicationShell } from '@/components/ApplicationShell';

export default function TermsPage() {
  return (
    <ApplicationShell>
      <section className="container-shell py-10">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">Terms and conditions</p>
          <h1 className="mt-3 text-4xl font-black text-navy">Terms of service for DailyEarn with JAY.</h1>

          <div className="mt-8 space-y-6 text-slate-600">
            <p>DailyEarn with JAY is a prototype and demonstration application intended for testing a lawful rewards experience in South Africa. It does not offer investment, deposit-based returns, or guaranteed earnings.</p>
            <p>Users may create a free account, review approved offers, and track reward activity. Rewards are subject to review, validation, and approval before becoming eligible for payout.</p>
            <p>No user is required to deposit funds, purchase a token, or connect a crypto wallet to use the MVP. DailyEarn does not pay for incentivized ad clicks or deceptive engagement.</p>
            <p>Users must complete offers honestly and according to the stated instructions. Misrepresentation, fraudulent activity, or manipulation of the system may result in the rejection of rewards or suspension of an account.</p>
            <p>All amounts displayed in the app are illustrative for testing purposes and may be presented in South African Rand (ZAR). Where a live product is deployed, these terms would be updated to reflect the actual legal structure and service terms.</p>
          </div>
        </div>
      </section>
    </ApplicationShell>
  );
}
